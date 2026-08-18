#!/usr/bin/env node
/**
 * validate-canonical-github-slugs.mjs
 *
 * Prevents hub catalog GitHub links for Fitbit, Oura, Polar, and Withings
 * from rotting back to the pre-rename slugs (fitbitmcp, ouramcp, polarmcp,
 * withingsmcp). Canonical public repos are hyphenated.
 *
 * Official MCP Registry server names (io.github.davidmosiah/fitbitmcp and
 * siblings) are published live IDs. This script does not rewrite or flag them.
 *
 * Catalog surfaces checked:
 *   - registry.json repository fields (source of truth)
 *   - STATUS.md generated links (must match registry)
 *   - README.md GitHub URLs
 *   - docs/release-index.md GitHub URLs
 *   - scripts/collect-growth-metrics.mjs repo names
 *
 * Usage:
 *   node scripts/validate-canonical-github-slugs.mjs
 *   node scripts/validate-canonical-github-slugs.mjs --json
 *
 * Exit code: 0 if catalog slugs are canonical, 1 otherwise.
 * Node 22+ built-ins only. No npm view. No GitHub Actions.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");

const CONNECTORS = [
  {
    id: "fitbit",
    canonicalSlug: "fitbit-mcp",
    staleSlug: "fitbitmcp",
    publishedRegistryName: "io.github.davidmosiah/fitbitmcp",
  },
  {
    id: "oura",
    canonicalSlug: "oura-mcp",
    staleSlug: "ouramcp",
    publishedRegistryName: "io.github.davidmosiah/ouramcp",
  },
  {
    id: "polar",
    canonicalSlug: "polar-mcp",
    staleSlug: "polarmcp",
    publishedRegistryName: "io.github.davidmosiah/polarmcp",
  },
  {
    id: "withings",
    canonicalSlug: "withings-mcp",
    staleSlug: "withingsmcp",
    publishedRegistryName: "io.github.davidmosiah/withingsmcp",
  },
];

const STALE_SLUGS = CONNECTORS.map((c) => c.staleSlug);
const STALE_GITHUB_RE = new RegExp(
  `https?://github\\.com/davidmosiah/(${STALE_SLUGS.join("|")})(?=$|[\\s)\\]"'\`.,;:#?/])`,
  "gi",
);
const STALE_GROWTH_NAME_RE = new RegExp(
  `name:\\s*"(${STALE_SLUGS.join("|")})"`,
  "g",
);

const args = process.argv.slice(2);
const wantJson = args.includes("--json");

function loadJson(filePath, label) {
  let raw;
  try {
    raw = readFileSync(filePath, "utf8");
  } catch (err) {
    throw new Error(`failed to read ${label} at ${filePath}: ${err.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`failed to parse ${label} JSON: ${err.message}`);
  }
}

function loadText(filePath, label) {
  try {
    return readFileSync(filePath, "utf8");
  } catch (err) {
    throw new Error(`failed to read ${label} at ${filePath}: ${err.message}`);
  }
}

function githubUrl(slug) {
  return `https://github.com/davidmosiah/${slug}`;
}

function normalizeRepo(url) {
  return String(url ?? "")
    .trim()
    .replace(/\.git$/i, "")
    .replace(/\/+$/, "");
}

function findStaleGithubUrls(text) {
  return [...String(text ?? "").matchAll(STALE_GITHUB_RE)].map((m) => m[0]);
}

function findStaleGrowthNames(text) {
  return [...String(text ?? "").matchAll(STALE_GROWTH_NAME_RE)].map((m) => m[1]);
}

function checkCatalog({ registry, status, readme, releaseIndex, growthMetrics }) {
  const failures = [];
  const connectors = Array.isArray(registry?.connectors) ? registry.connectors : [];
  const byId = new Map(connectors.map((entry) => [entry?.id, entry]));

  for (const spec of CONNECTORS) {
    const entry = byId.get(spec.id);
    if (!entry) {
      failures.push({
        rule: "G1",
        message: `registry.json is missing connector id "${spec.id}"`,
      });
      continue;
    }
    const expected = githubUrl(spec.canonicalSlug);
    const actual = normalizeRepo(entry.repository);
    if (actual !== expected) {
      failures.push({
        rule: "G1",
        message: `${spec.id} repository must be ${expected} (got ${entry.repository ?? "missing"})`,
      });
    }
    if (!String(status ?? "").includes(expected)) {
      failures.push({
        rule: "G2",
        message: `STATUS.md must include generated link ${expected}`,
      });
    }
    if (!String(growthMetrics ?? "").includes(`name: "${spec.canonicalSlug}"`)) {
      failures.push({
        rule: "G5",
        message: `collect-growth-metrics.mjs must query GitHub repo "${spec.canonicalSlug}"`,
      });
    }
  }

  const staleStatus = findStaleGithubUrls(status);
  if (staleStatus.length > 0) {
    failures.push({
      rule: "G2",
      message: `STATUS.md still links to pre-rename GitHub slugs: ${staleStatus.join(", ")}`,
    });
  }

  const staleReadme = findStaleGithubUrls(readme);
  if (staleReadme.length > 0) {
    failures.push({
      rule: "G3",
      message: `README.md still links to pre-rename GitHub slugs: ${staleReadme.join(", ")}`,
    });
  }

  const staleIndex = findStaleGithubUrls(releaseIndex);
  if (staleIndex.length > 0) {
    failures.push({
      rule: "G4",
      message: `docs/release-index.md still links to pre-rename GitHub slugs: ${staleIndex.join(", ")}`,
    });
  }

  const staleGrowthUrls = findStaleGithubUrls(growthMetrics);
  const staleGrowthNames = findStaleGrowthNames(growthMetrics);
  if (staleGrowthUrls.length > 0 || staleGrowthNames.length > 0) {
    const details = [...staleGrowthUrls, ...staleGrowthNames].join(", ");
    failures.push({
      rule: "G5",
      message: `collect-growth-metrics.mjs still uses pre-rename GitHub slugs: ${details}`,
    });
  }

  return failures;
}

function selfCheck() {
  const failures = [];
  const official = "Official MCP Registry `io.github.davidmosiah/fitbitmcp` is a live ID.";
  if (findStaleGithubUrls(official).length > 0) {
    failures.push("self-check must not treat published registry names as GitHub repo URLs");
  }
  const staleLink = "see https://github.com/davidmosiah/fitbitmcp for history";
  if (findStaleGithubUrls(staleLink).length !== 1) {
    failures.push("self-check must detect a stale GitHub repo URL");
  }

  const goodRegistry = {
    connectors: CONNECTORS.map((c) => ({
      id: c.id,
      repository: githubUrl(c.canonicalSlug),
    })),
  };
  const goodStatus = CONNECTORS.map((c) => `| [${c.id}](${githubUrl(c.canonicalSlug)}) |`).join("\n");
  const goodGrowth = CONNECTORS.map((c) => `{ name: "${c.canonicalSlug}", vertical: "body" },`).join("\n");
  const good = checkCatalog({
    registry: goodRegistry,
    status: goodStatus,
    readme: "Have an Oura? start with oura-mcp",
    releaseIndex: "| [repo](https://github.com/davidmosiah/withings-mcp) |",
    growthMetrics: goodGrowth,
  });
  if (good.length > 0) {
    failures.push(`self-check canonical catalog should pass: ${good.map((f) => f.message).join("; ")}`);
  }

  const staleRegistry = {
    connectors: CONNECTORS.map((c) => ({
      id: c.id,
      repository: githubUrl(c.staleSlug),
    })),
  };
  const stale = checkCatalog({
    registry: staleRegistry,
    status: CONNECTORS.map((c) => `| [${c.id}](${githubUrl(c.staleSlug)}) |`).join("\n"),
    readme: "https://github.com/davidmosiah/ouramcp",
    releaseIndex: "https://github.com/davidmosiah/withingsmcp",
    growthMetrics: CONNECTORS.map((c) => `{ name: "${c.staleSlug}", vertical: "body" },`).join("\n"),
  });
  for (const rule of ["G1", "G2", "G3", "G4", "G5"]) {
    if (!stale.some((f) => f.rule === rule)) {
      failures.push(`self-check stale catalog should fail ${rule}`);
    }
  }

  return failures;
}

function main() {
  try {
    const registry = loadJson(path.join(ROOT, "registry.json"), "registry");
    const status = loadText(path.join(ROOT, "STATUS.md"), "STATUS.md");
    const readme = loadText(path.join(ROOT, "README.md"), "README.md");
    const releaseIndex = loadText(path.join(ROOT, "docs", "release-index.md"), "release-index");
    const growthMetrics = loadText(
      path.join(ROOT, "scripts", "collect-growth-metrics.mjs"),
      "collect-growth-metrics",
    );

    const catalogFailures = checkCatalog({
      registry,
      status,
      readme,
      releaseIndex,
      growthMetrics,
    });
    const selfCheckFailures = selfCheck();
    const failed = catalogFailures.length > 0 || selfCheckFailures.length > 0;

    if (wantJson) {
      process.stdout.write(
        JSON.stringify(
          {
            connectors: CONNECTORS.map((c) => ({
              id: c.id,
              canonical: githubUrl(c.canonicalSlug),
              published_registry_name: c.publishedRegistryName,
            })),
            catalog_failures: catalogFailures,
            self_check_failures: selfCheckFailures,
          },
          null,
          2,
        ) + "\n",
      );
    } else {
      const lines = [
        "# canonical GitHub slug guard",
        "",
        "Catalog surfaces: registry.json, STATUS.md, README.md, docs/release-index.md, scripts/collect-growth-metrics.mjs",
        "Official MCP registry names (io.github.davidmosiah/fitbitmcp and siblings) are live IDs and are left unchanged.",
        "",
      ];
      for (const spec of CONNECTORS) {
        lines.push(`- ${spec.id}: ${githubUrl(spec.canonicalSlug)}`);
      }
      if (catalogFailures.length === 0) {
        lines.push("", "PASS — catalog GitHub links use hyphenated canonical slugs.");
      } else {
        lines.push("", "FAIL — catalog GitHub slugs:");
        for (const f of catalogFailures) lines.push(`  - ${f.rule}: ${f.message}`);
      }
      if (selfCheckFailures.length === 0) {
        lines.push("PASS — slug-guard self-check (stale URLs fail; published registry names do not).");
      } else {
        lines.push("FAIL — slug-guard self-check:");
        for (const s of selfCheckFailures) lines.push(`  - ${s}`);
      }
      process.stdout.write(lines.join("\n") + "\n");
    }

    process.exitCode = failed ? 1 : 0;
  } catch (err) {
    process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
    process.exitCode = 1;
  }
}

main();
