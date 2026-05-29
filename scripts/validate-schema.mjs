#!/usr/bin/env node
/**
 * validate-schema.mjs
 *
 * Validates registry.json against schemas/provider-capabilities.schema.json.
 *
 * Why this exists: until now nothing checked the canonical manifest against
 * its own declared schema — CI only ran `JSON.parse`. The schema had silently
 * drifted from the data (it rejected `meta_connectors`, `last_updated`, and the
 * `npm_version` field that `scripts/sync-registry.mjs` writes on every entry),
 * and three connector records carried a quality tier in `status` instead of a
 * lifecycle value. A self-asserted schema that doesn't validate the file it
 * documents is worse than none. This guard keeps them honest.
 *
 * Deliberately dependency-free (no ajv): this repo is docs/JSON-only and the
 * sibling validator (validate-context-ready.mjs) is hand-rolled too. This
 * implements the subset of JSON Schema the registry schema actually uses:
 * type, required, enum, items, additionalProperties:false, and the
 * ["string","null"] union form. It is schema-driven — it reads the schema
 * file, so extending the schema automatically extends the check.
 *
 * Usage:
 *   node scripts/validate-schema.mjs            # human-readable report
 *   node scripts/validate-schema.mjs --json     # machine-readable
 *   node scripts/validate-schema.mjs --registry path/to/registry.json
 *   node scripts/validate-schema.mjs --schema   path/to/schema.json
 *
 * Exit code: 0 if registry.json satisfies the schema, 1 otherwise.
 * Node 22+ built-ins only.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const DEFAULT_REGISTRY = path.join(ROOT, "registry.json");
const DEFAULT_SCHEMA = path.join(ROOT, "schemas", "provider-capabilities.schema.json");

const args = process.argv.slice(2);
const wantJson = args.includes("--json");

function flagValue(name, fallback) {
  const i = args.indexOf(name);
  if (i !== -1 && args[i + 1]) return path.resolve(process.cwd(), args[i + 1]);
  return fallback;
}

const registryPath = flagValue("--registry", DEFAULT_REGISTRY);
const schemaPath = flagValue("--schema", DEFAULT_SCHEMA);

function readJson(p, label) {
  let raw;
  try {
    raw = readFileSync(p, "utf8");
  } catch (err) {
    throw new Error(`failed to read ${label} at ${p}: ${err.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`failed to parse ${label} JSON: ${err.message}`);
  }
}

// Normalize a schema "type" into a set of allowed JSON types.
function allowedTypes(schema) {
  const t = schema.type;
  if (t === undefined) return null; // no constraint
  return new Set(Array.isArray(t) ? t : [t]);
}

function jsonType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value; // "string" | "number" | "boolean" | "object"
}

// Recursively validate `value` against `schema`, collecting human-readable
// errors keyed by JSON pointer-ish path.
function validate(schema, value, pathStr, errors) {
  const types = allowedTypes(schema);
  if (types) {
    const actual = jsonType(value);
    // JSON Schema "integer"/"number" both map to JS number; treat leniently.
    const ok =
      types.has(actual) ||
      (actual === "number" && (types.has("integer") || types.has("number")));
    if (!ok) {
      errors.push(`${pathStr || "(root)"}: expected type ${[...types].join("|")}, got ${actual}`);
      return; // type mismatch — deeper checks are meaningless
    }
  }

  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    errors.push(
      `${pathStr || "(root)"}: value ${JSON.stringify(value)} is not one of ${JSON.stringify(schema.enum)}`,
    );
  }

  if (jsonType(value) === "object") {
    const props = schema.properties ?? {};
    for (const req of schema.required ?? []) {
      if (!(req in value)) {
        errors.push(`${pathStr || "(root)"}: missing required property "${req}"`);
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!(key in props)) {
          errors.push(`${pathStr || "(root)"}: unexpected property "${key}" (additionalProperties is false)`);
        }
      }
    }
    for (const [key, child] of Object.entries(value)) {
      if (props[key]) validate(props[key], child, `${pathStr}/${key}`, errors);
    }
  }

  if (jsonType(value) === "array" && schema.items) {
    value.forEach((item, i) => validate(schema.items, item, `${pathStr}/${i}`, errors));
  }
}

function main() {
  const schema = readJson(schemaPath, "schema");
  const registry = readJson(registryPath, "registry");

  const errors = [];
  validate(schema, registry, "", errors);

  const result = {
    schema: path.relative(process.cwd(), schemaPath) || schemaPath,
    registry: path.relative(process.cwd(), registryPath) || registryPath,
    valid: errors.length === 0,
    errors,
  };

  if (wantJson) {
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  } else {
    const lines = [
      "# registry schema validation",
      "",
      `Schema:   ${result.schema}`,
      `Registry: ${result.registry}`,
      "",
    ];
    if (result.valid) {
      lines.push("PASS — registry.json satisfies the schema.");
    } else {
      lines.push(`FAIL — ${errors.length} violation(s):`);
      for (const e of errors) lines.push(`  - ${e}`);
      lines.push("");
      lines.push("See docs/registry-validation.md for how to keep the schema and registry in sync.");
    }
    process.stdout.write(lines.join("\n") + "\n");
  }

  process.exit(result.valid ? 0 : 1);
}

main();
