#!/usr/bin/env node
/**
 * validate-context-ready.mjs
 *
 * Enforces the `context_ready` quality tier defined in
 * docs/connector-quality-standard.md against entries in registry.json.
 *
 * Until this validator landed (PR following the 2026-05-08 audit), the tier
 * was self-asserted: a connector could declare `quality.tier = "context_ready"`
 * without actually exposing a normalized handoff signal, a context contract
 * version, an entrypoint, or recommended downstream handoffs. This script
 * closes that gap.
 *
 * Rules enforced per `context_ready` connector:
 *
 *   R1. signals[] must include at least one of the four normalized context
 *       contracts: wellness_context, training_context, nutrition_context,
 *       exercise_context.
 *
 *   R2. quality.context_contract_version must be present and non-empty.
 *       Recommended value: "delx-wellness-context/v1".
 *
 *   R3. entrypoint must be set OR a usable substitute (package or
 *       repository) must be set. An npm package name OR a git repo URL is
 *       accepted; the field is used by agent runtimes to find the connector.
 *
 *   R4. recommended_handoffs[] (or singular recommended_handoff) must be
 *       present and non-empty for connectors that PRODUCE context. Terminal
 *       consumers/producers (e.g. Nourish, which closes the loop on intake
 *       advice) are exempt and listed in TERMINAL_CONNECTORS.
 *
 * Usage:
 *   node scripts/validate-context-ready.mjs            # human-readable report
 *   node scripts/validate-context-ready.mjs --json     # machine-readable
 *   node scripts/validate-context-ready.mjs --registry path/to/registry.json
 *
 * Exit code: 0 if every context_ready connector passes, 1 otherwise.
 *
 * No npm dependencies. Node 22+ built-ins only.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_REGISTRY = path.resolve(SCRIPT_DIR, "..", "registry.json");

const CONTEXT_CONTRACT_SIGNALS = [
  "wellness_context",
  "training_context",
  "nutrition_context",
  "exercise_context"
];

const EXPECTED_CONTRACT_VERSION = "delx-wellness-context/v1";

// Connectors that produce context but ALSO act as terminal consumers, so
// they don't need to hand off downstream. Make this explicit and editable
// rather than inferring it from signals — see docs/registry-validation.md
// for how to add a new terminal connector.
const TERMINAL_CONNECTORS = new Set([
  "nourish" // consumer/producer hybrid: ingests wellness/training, terminates on user advice
]);

const args = process.argv.slice(2);
const wantJson = args.includes("--json");
let registryPath = DEFAULT_REGISTRY;
const registryFlagIndex = args.indexOf("--registry");
if (registryFlagIndex !== -1 && args[registryFlagIndex + 1]) {
  registryPath = path.resolve(process.cwd(), args[registryFlagIndex + 1]);
}

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

function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}

function getRecommendedHandoffs(connector) {
  const plural = connector.recommended_handoffs;
  if (Array.isArray(plural)) return plural;
  const singular = connector.recommended_handoff;
  if (isNonEmptyString(singular)) return [singular];
  if (Array.isArray(singular)) return singular;
  return [];
}

function getEntrypoint(connector) {
  if (isNonEmptyString(connector.entrypoint)) return connector.entrypoint;
  if (isNonEmptyString(connector.package)) return connector.package;
  if (isNonEmptyString(connector.repository)) return connector.repository;
  return null;
}

function looksLikeUriOrPackage(value) {
  if (!isNonEmptyString(value)) return false;
  // git/https URL
  if (/^https?:\/\/\S+$/i.test(value)) return true;
  // npm package name (scoped or unscoped)
  if (/^(@[a-z0-9][\w.-]*\/)?[a-z0-9][\w.-]*$/i.test(value)) return true;
  return false;
}

function checkConnector(connector) {
  const failures = [];
  const id = connector.id ?? "(missing id)";
  const isTerminal = TERMINAL_CONNECTORS.has(id);

  // R1: contract signal presence
  const signals = Array.isArray(connector.signals) ? connector.signals : [];
  const hasContextSignal = signals.some((s) =>
    CONTEXT_CONTRACT_SIGNALS.includes(s)
  );
  if (!hasContextSignal) {
    failures.push({
      rule: "R1",
      message: `signals[] must include at least one of: ${CONTEXT_CONTRACT_SIGNALS.join(", ")}`
    });
  }

  // R2: context_contract_version
  const quality = connector.quality ?? {};
  const contractVersion = quality.context_contract_version;
  if (!isNonEmptyString(contractVersion)) {
    failures.push({
      rule: "R2",
      message: `quality.context_contract_version is missing or empty (recommended: "${EXPECTED_CONTRACT_VERSION}")`
    });
  }

  // R3: entrypoint (or accepted substitute)
  const entrypoint = getEntrypoint(connector);
  if (!entrypoint) {
    failures.push({
      rule: "R3",
      message: "entrypoint, package, or repository must be set so agents can locate the connector"
    });
  } else if (!looksLikeUriOrPackage(entrypoint)) {
    failures.push({
      rule: "R3",
      message: `entrypoint "${entrypoint}" is not a recognizable npm package name or http(s) URL`
    });
  }

  // R4: recommended_handoffs (skip for terminal connectors)
  if (!isTerminal) {
    const handoffs = getRecommendedHandoffs(connector);
    if (!isNonEmptyArray(handoffs)) {
      failures.push({
        rule: "R4",
        message:
          "recommended_handoffs[] (or recommended_handoff) must be non-empty for context-producing connectors. " +
          `If this connector is terminal (consumer/producer hybrid), add its id to TERMINAL_CONNECTORS in scripts/validate-context-ready.mjs.`
      });
    }
  }

  return {
    id,
    name: connector.name ?? id,
    terminal: isTerminal,
    pass: failures.length === 0,
    failures
  };
}

function renderHumanReport(results) {
  const lines = [];
  lines.push("# context_ready validator report");
  lines.push("");
  lines.push(`Registry: ${path.relative(process.cwd(), registryPath) || registryPath}`);
  lines.push(`Connectors checked: ${results.length}`);
  const passed = results.filter((r) => r.pass).length;
  const failed = results.length - passed;
  lines.push(`Passed: ${passed}`);
  lines.push(`Failed: ${failed}`);
  lines.push("");
  for (const r of results) {
    const status = r.pass ? "PASS" : "FAIL";
    const tag = r.terminal ? " [terminal]" : "";
    lines.push(`- ${status} ${r.id} (${r.name})${tag}`);
    for (const f of r.failures) {
      lines.push(`    - ${f.rule}: ${f.message}`);
    }
  }
  lines.push("");
  if (failed > 0) {
    lines.push(
      "Promotion to context_ready requires meeting all rules above. See docs/registry-validation.md."
    );
  } else {
    lines.push("All context_ready connectors satisfy the standard.");
  }
  return lines.join("\n");
}

function main() {
  const registry = loadRegistry(registryPath);
  const connectors = Array.isArray(registry.connectors) ? registry.connectors : [];
  const targets = connectors.filter(
    (c) => c && c.quality && c.quality.tier === "context_ready"
  );

  const results = targets.map(checkConnector);
  const failed = results.some((r) => !r.pass);

  if (wantJson) {
    process.stdout.write(
      JSON.stringify(
        {
          registry: path.relative(process.cwd(), registryPath) || registryPath,
          checked: results.length,
          passed: results.filter((r) => r.pass).length,
          failed: results.filter((r) => !r.pass).length,
          contract_signals: CONTEXT_CONTRACT_SIGNALS,
          expected_contract_version: EXPECTED_CONTRACT_VERSION,
          terminal_connectors: [...TERMINAL_CONNECTORS],
          results
        },
        null,
        2
      ) + "\n"
    );
  } else {
    process.stdout.write(renderHumanReport(results) + "\n");
  }

  process.exit(failed ? 1 : 0);
}

main();
