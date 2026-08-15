#!/usr/bin/env node
/**
 * validate-peers.mjs
 *
 * Honesty gate for registry.json peers[] — independent catalog hops, not
 * Delx-operated first-party packages. Schema validation already rejects
 * unknown fields; this script enforces the boundary the schema cannot:
 * peers must not look like connectors we publish, pin, or npm-view.
 *
 * Rules:
 *   P1. No package / npm_version / quality / agentReadiness (first-party shape).
 *   P2. Peer id must not collide with connectors[], meta_connectors[], or
 *       agent_profiles[].
 *   P3. Peer repository must not be under github.com/davidmosiah/.
 *   P4. Required honesty fields are present (belt-and-suspenders with schema).
 *
 * Usage:
 *   node scripts/validate-peers.mjs            # live registry + self-check
 *   node scripts/validate-peers.mjs --json
 *   node scripts/validate-peers.mjs --registry path/to/registry.json
 *
 * Exit code: 0 if peers satisfy the boundary, 1 otherwise.
 * Node 22+ built-ins only. No npm view.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_REGISTRY = path.resolve(SCRIPT_DIR, "..", "registry.json");

const FIRST_PARTY_FIELDS = ["package", "npm_version", "quality", "agentReadiness"];
const FIRST_PARTY_HOST = /^https?:\/\/github\.com\/davidmosiah\//i;

const args = process.argv.slice(2);
const wantJson = args.includes("--json");

function flagValue(name, fallback) {
  const i = args.indexOf(name);
  if (i !== -1 && args[i + 1]) return path.resolve(process.cwd(), args[i + 1]);
  return fallback;
}

const registryPath = flagValue("--registry", DEFAULT_REGISTRY);

function loadRegistry(p) {
  let raw;
  try {
    raw = readFileSync(p, "utf8");
  } catch (err) {
    throw new Error(`failed to read registry at ${p}: ${err.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`failed to parse registry JSON: ${err.message}`);
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function occupiedIds(registry) {
  const ids = new Set();
  for (const list of ["connectors", "meta_connectors", "agent_profiles"]) {
    for (const entry of registry[list] ?? []) {
      if (entry?.id) ids.add(entry.id);
    }
  }
  return ids;
}

function checkPeer(peer, takenIds) {
  const failures = [];
  const id = peer?.id ?? "(missing id)";

  for (const field of FIRST_PARTY_FIELDS) {
    if (peer && Object.hasOwn(peer, field)) {
      failures.push({
        rule: "P1",
        message: `peers must not declare ${field} — Delx does not publish, pin, or npm-view peers`,
      });
    }
  }

  if (peer?.id && takenIds.has(peer.id)) {
    failures.push({
      rule: "P2",
      message: `peer id "${peer.id}" collides with a first-party registry entry`,
    });
  }

  if (isNonEmptyString(peer?.repository) && FIRST_PARTY_HOST.test(peer.repository)) {
    failures.push({
      rule: "P3",
      message: `peer repository "${peer.repository}" is a Delx first-party URL; peers must be independent`,
    });
  }

  for (const field of ["id", "name", "repository", "maintainer", "license", "notes"]) {
    if (!isNonEmptyString(peer?.[field])) {
      failures.push({
        rule: "P4",
        message: `missing required honesty field "${field}"`,
      });
    }
  }

  return { id, name: peer?.name ?? id, pass: failures.length === 0, failures };
}

function selfCheck() {
  const taken = new Set(["garmin"]);
  const cases = [
    {
      label: "rejects first-party package field",
      peer: {
        id: "example-peer",
        name: "Example",
        repository: "https://github.com/example/peer",
        maintainer: "example",
        license: "MIT",
        notes: "catalog hop",
        package: "example-peer",
      },
      expectFailRule: "P1",
    },
    {
      label: "rejects id collision with connectors",
      peer: {
        id: "garmin",
        name: "Garmin peer",
        repository: "https://github.com/example/garmin-fork",
        maintainer: "example",
        license: "MIT",
        notes: "catalog hop",
      },
      expectFailRule: "P2",
    },
    {
      label: "rejects davidmosiah repository",
      peer: {
        id: "fake-peer",
        name: "Fake",
        repository: "https://github.com/davidmosiah/garmin-mcp",
        maintainer: "someone",
        license: "MIT",
        notes: "catalog hop",
      },
      expectFailRule: "P3",
    },
    {
      label: "accepts a lean catalog hop",
      peer: {
        id: "example-peer",
        name: "Example",
        repository: "https://github.com/example/peer",
        maintainer: "example",
        license: "MIT",
        notes: "Independent catalog hop. Not Delx-operated. Not medical advice.",
      },
      expectFailRule: null,
    },
  ];

  const failures = [];
  for (const c of cases) {
    const result = checkPeer(c.peer, taken);
    const hit = result.failures.some((f) => f.rule === c.expectFailRule);
    const ok = c.expectFailRule ? !result.pass && hit : result.pass;
    if (!ok) {
      failures.push(
        c.expectFailRule
          ? `self-check "${c.label}" should fail ${c.expectFailRule}`
          : `self-check "${c.label}" should pass`,
      );
    }
  }
  return failures;
}

function main() {
  const registry = loadRegistry(registryPath);
  const peers = Array.isArray(registry.peers) ? registry.peers : [];
  const taken = occupiedIds(registry);
  const results = peers.map((peer) => checkPeer(peer, taken));
  const selfCheckFailures = selfCheck();
  const failed = results.some((r) => !r.pass) || selfCheckFailures.length > 0;

  if (wantJson) {
    process.stdout.write(
      JSON.stringify(
        {
          registry: path.relative(process.cwd(), registryPath) || registryPath,
          checked: results.length,
          passed: results.filter((r) => r.pass).length,
          failed: results.filter((r) => !r.pass).length,
          self_check_failures: selfCheckFailures,
          results,
        },
        null,
        2,
      ) + "\n",
    );
  } else {
    const lines = [
      "# peers[] honesty gate",
      "",
      `Registry: ${path.relative(process.cwd(), registryPath) || registryPath}`,
      `Peers checked: ${results.length}`,
      "",
    ];
    if (results.length === 0) {
      lines.push("PASS — no peers listed (empty catalog hop list is valid).");
    }
    for (const r of results) {
      lines.push(`- ${r.pass ? "PASS" : "FAIL"} ${r.id} (${r.name})`);
      for (const f of r.failures) lines.push(`    - ${f.rule}: ${f.message}`);
    }
    if (selfCheckFailures.length === 0) {
      lines.push("", "PASS — boundary self-check (package / id collision / first-party URL).");
    } else {
      lines.push("", "FAIL — boundary self-check:");
      for (const s of selfCheckFailures) lines.push(`  - ${s}`);
    }
    if (!failed) {
      lines.push("", "Peers are catalog hops, not Delx-operated connectors.");
    }
    process.stdout.write(lines.join("\n") + "\n");
  }

  process.exit(failed ? 1 : 0);
}

main();
