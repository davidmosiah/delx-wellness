#!/usr/bin/env node
/**
 * validate-canonical-github-slugs.mjs
 *
 * Every first-party registry GitHub URL must be
 * https://github.com/davidmosiah/<canonical-slug>. Pre-rename aliases
 * (fitbitmcp, ouramcp, polarmcp, withingsmcp, garminmcp) still redirect
 * but must not appear as catalog repo links.
 *
 * Official MCP Registry server names (io.github.davidmosiah/fitbitmcp and
 * siblings, io.github.shkyyy18/mi-fitness-data-bridge) are published live
 * IDs. This script does not rewrite or flag them.
 *
 * Peer hops are not first-party. Their GitHub URL must match the verified
 * canonical full_name (hyphenated Kindred paths redirect to underscores).
 *
 * Catalog surfaces checked:
 *   - registry.json repository fields (source of truth)
 *   - STATUS.md generated links (must match registry)
 *   - README.md GitHub URLs
 *   - llms.txt hub URL
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
const OWNER = "davidmosiah";

const FIRST_PARTY = [
  { list: "agent_profiles", id: "delx-wellness-hermes", slug: "delx-wellness-hermes" },
  { list: "agent_profiles", id: "delx-wellness-openclaw", slug: "delx-wellness-openclaw" },
  { list: "meta_connectors", id: "delx-living-body", slug: "delx-living-body" },
  { list: "connectors", id: "apple-health", slug: "apple-health-mcp" },
  { list: "connectors", id: "eight-sleep", slug: "eight-sleep-mcp" },
  { list: "connectors", id: "fitbit", slug: "fitbit-mcp" },
  { list: "connectors", id: "garmin", slug: "garmin-mcp" },
  { list: "connectors", id: "google-health", slug: "google-health-mcp" },
  { list: "connectors", id: "oura", slug: "oura-mcp" },
  { list: "connectors", id: "polar", slug: "polar-mcp" },
  { list: "connectors", id: "samsung-health", slug: "samsung-health-mcp" },
  { list: "connectors", id: "strava", slug: "strava-mcp" },
  { list: "connectors", id: "wellness-air", slug: "wellness-air" },
  { list: "connectors", id: "wellness-cgm-mcp", slug: "wellness-cgm-mcp" },
  { list: "connectors", id: "wellness-cycle-coach", slug: "wellness-cycle-coach" },
  { list: "connectors", id: "nourish", slug: "wellness-nourish" },
  { list: "connectors", id: "whoop", slug: "whoop-mcp" },
  { list: "connectors", id: "withings", slug: "withings-mcp" },
  { list: "connectors", id: "exercise-catalog", slug: "exercise-catalog-mcp" },
  { list: "connectors", id: "google-ads", slug: "google-ads-mcp-unofficial" },
];

const RENAME_ALIASES = [
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
  {
    id: "garmin",
    canonicalSlug: "garmin-mcp",
    staleSlug: "garminmcp",
    publishedRegistryName: "io.github.davidmosiah/garminmcp",
  },
];

const PEERS = [
  {
    id: "mi-fitness-data-bridge",
    canonical: "https://github.com/shkyyy18/mi_fitness_data_bridge",
    staleGithubPaths: ["https://github.com/shkyyy18/mi-fitness-data-bridge"],
  },
];

const HUB = `https://github.com/${OWNER}/delx-wellness`;
const FIRST_PARTY_URL_RE = new RegExp(
  `^https://github\\.com/${OWNER}/[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$`,
);
const STALE_SLUGS = RENAME_ALIASES.map((c) => c.staleSlug);
const STALE_GITHUB_RE = new RegExp(
  `https?://github\\.com/${OWNER}/(${STALE_SLUGS.join("|")})(?=$|[\\s)\\]"'\`.,;:#?/])`,
  "gi",
);
const STALE_PEER_RE = new RegExp(
  `https?://github\\.com/shkyyy18/mi-fitness-data-bridge(?=$|[\\s)\\]"'\`.,;:#?/])`,
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
  return `https://github.com/${OWNER}/${slug}`;
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

function findStalePeerUrls(text) {
  return [...String(text ?? "").matchAll(STALE_PEER_RE)].map((m) => m[0]);
}

function findStaleGrowthNames(text) {
  return [...String(text ?? "").matchAll(STALE_GROWTH_NAME_RE)].map((m) => m[1]);
}

function firstPartyEntries(registry) {
  const rows = [];
  for (const list of ["agent_profiles", "meta_connectors", "connectors"]) {
    for (const entry of registry?.[list] ?? []) {
      if (entry?.id) rows.push({ list, entry });
    }
  }
  return rows;
}

function checkCatalog({ registry, status, readme, llms, releaseIndex, growthMetrics }) {
  const failures = [];
  const byKey = new Map();
  for (const { list, entry } of firstPartyEntries(registry)) {
    byKey.set(`${list}:${entry.id}`, entry);
  }

  const expectedIds = new Set(FIRST_PARTY.map((spec) => `${spec.list}:${spec.id}`));
  for (const spec of FIRST_PARTY) {
    const entry = byKey.get(`${spec.list}:${spec.id}`);
    if (!entry) {
      failures.push({
        rule: "G0",
        message: `registry.json is missing ${spec.list} id "${spec.id}"`,
      });
      continue;
    }
    const expected = githubUrl(spec.slug);
    const actual = normalizeRepo(entry.repository);
    if (actual !== expected) {
      failures.push({
        rule: "G0",
        message: `${spec.id} repository must be ${expected} (got ${entry.repository ?? "missing"})`,
      });
    } else if (!FIRST_PARTY_URL_RE.test(actual)) {
      failures.push({
        rule: "G0",
        message: `${spec.id} repository must match https://github.com/${OWNER}/<slug> (got ${entry.repository})`,
      });
    }
    if (!String(status ?? "").includes(expected)) {
      failures.push({
        rule: "G2",
        message: `STATUS.md must include generated link ${expected}`,
      });
    }
  }

  for (const { list, entry } of firstPartyEntries(registry)) {
    const key = `${list}:${entry.id}`;
    if (!expectedIds.has(key)) {
      failures.push({
        rule: "G0",
        message: `${list} id "${entry.id}" is not in the canonical GitHub slug list`,
      });
    }
  }

  const peers = Array.isArray(registry?.peers) ? registry.peers : [];
  const peerById = new Map(peers.map((p) => [p?.id, p]));
  for (const spec of PEERS) {
    const entry = peerById.get(spec.id);
    if (!entry) {
      failures.push({
        rule: "G7",
        message: `registry.json is missing peer id "${spec.id}"`,
      });
      continue;
    }
    const actual = normalizeRepo(entry.repository);
    if (actual !== spec.canonical) {
      failures.push({
        rule: "G7",
        message: `peer ${spec.id} repository must be ${spec.canonical} (got ${entry.repository ?? "missing"})`,
      });
    }
    if (!String(status ?? "").includes(spec.canonical)) {
      failures.push({
        rule: "G2",
        message: `STATUS.md must include generated peer link ${spec.canonical}`,
      });
    }
  }

  for (const spec of RENAME_ALIASES) {
    if (!String(growthMetrics ?? "").includes(`name: "${spec.canonicalSlug}"`)) {
      failures.push({
        rule: "G5",
        message: `collect-growth-metrics.mjs must query GitHub repo "${spec.canonicalSlug}"`,
      });
    }
  }

  if (!String(llms ?? "").includes(HUB)) {
    failures.push({
      rule: "G6",
      message: `llms.txt must cite canonical hub ${HUB}`,
    });
  }

  const staleSurfaces = [
    ["G2", "STATUS.md", status],
    ["G3", "README.md", readme],
    ["G4", "docs/release-index.md", releaseIndex],
    ["G5", "collect-growth-metrics.mjs", growthMetrics],
    ["G6", "llms.txt", llms],
  ];
  for (const [rule, label, text] of staleSurfaces) {
    const stale = [...findStaleGithubUrls(text), ...findStalePeerUrls(text)];
    if (stale.length > 0) {
      failures.push({
        rule,
        message: `${label} still links to pre-rename GitHub slugs: ${stale.join(", ")}`,
      });
    }
  }

  const staleGrowthNames = findStaleGrowthNames(growthMetrics);
  if (staleGrowthNames.length > 0) {
    failures.push({
      rule: "G5",
      message: `collect-growth-metrics.mjs still uses pre-rename GitHub slugs: ${staleGrowthNames.join(", ")}`,
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
  const officialPeer = "Official MCP Registry `io.github.shkyyy18/mi-fitness-data-bridge` is a live ID.";
  if (findStalePeerUrls(officialPeer).length > 0) {
    failures.push("self-check must not treat published peer registry names as GitHub repo URLs");
  }
  const staleLink = "see https://github.com/davidmosiah/fitbitmcp for history";
  if (findStaleGithubUrls(staleLink).length !== 1) {
    failures.push("self-check must detect a stale GitHub repo URL");
  }
  const stalePeer = "see https://github.com/shkyyy18/mi-fitness-data-bridge for history";
  if (findStalePeerUrls(stalePeer).length !== 1) {
    failures.push("self-check must detect a stale peer GitHub repo URL");
  }

  const goodRegistry = {
    agent_profiles: FIRST_PARTY.filter((s) => s.list === "agent_profiles").map((s) => ({
      id: s.id,
      repository: githubUrl(s.slug),
    })),
    meta_connectors: FIRST_PARTY.filter((s) => s.list === "meta_connectors").map((s) => ({
      id: s.id,
      repository: githubUrl(s.slug),
    })),
    connectors: FIRST_PARTY.filter((s) => s.list === "connectors").map((s) => ({
      id: s.id,
      repository: githubUrl(s.slug),
    })),
    peers: PEERS.map((p) => ({ id: p.id, repository: p.canonical })),
  };
  const goodStatus = [
    ...FIRST_PARTY.map((s) => `| [${s.id}](${githubUrl(s.slug)}) |`),
    ...PEERS.map((p) => `| [peer](${p.canonical}) |`),
  ].join("\n");
  const goodGrowth = RENAME_ALIASES.map((c) => `{ name: "${c.canonicalSlug}", vertical: "body" },`).join("\n");
  const good = checkCatalog({
    registry: goodRegistry,
    status: goodStatus,
    readme: "Have an Oura? start with oura-mcp",
    llms: `Canonical hub: ${HUB}`,
    releaseIndex: "| [repo](https://github.com/davidmosiah/withings-mcp) |",
    growthMetrics: goodGrowth,
  });
  if (good.length > 0) {
    failures.push(`self-check canonical catalog should pass: ${good.map((f) => f.message).join("; ")}`);
  }

  const staleRegistry = {
    agent_profiles: goodRegistry.agent_profiles,
    meta_connectors: goodRegistry.meta_connectors,
    connectors: FIRST_PARTY.filter((s) => s.list === "connectors").map((s) => ({
      id: s.id,
      repository: s.id === "fitbit" ? githubUrl("fitbitmcp") : githubUrl(s.slug),
    })),
    peers: PEERS.map((p) => ({ id: p.id, repository: p.staleGithubPaths[0] })),
  };
  const stale = checkCatalog({
    registry: staleRegistry,
    status: [
      "| [fitbit](https://github.com/davidmosiah/fitbitmcp) |",
      "| [peer](https://github.com/shkyyy18/mi-fitness-data-bridge) |",
    ].join("\n"),
    readme: "https://github.com/davidmosiah/ouramcp",
    llms: "https://github.com/davidmosiah/garminmcp",
    releaseIndex: "https://github.com/davidmosiah/withingsmcp",
    growthMetrics: RENAME_ALIASES.map((c) => `{ name: "${c.staleSlug}", vertical: "body" },`).join("\n"),
  });
  for (const rule of ["G0", "G2", "G3", "G4", "G5", "G6", "G7"]) {
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
    const llms = loadText(path.join(ROOT, "llms.txt"), "llms.txt");
    const releaseIndex = loadText(path.join(ROOT, "docs", "release-index.md"), "release-index");
    const growthMetrics = loadText(
      path.join(ROOT, "scripts", "collect-growth-metrics.mjs"),
      "collect-growth-metrics",
    );

    const catalogFailures = checkCatalog({
      registry,
      status,
      readme,
      llms,
      releaseIndex,
      growthMetrics,
    });
    const selfCheckFailures = selfCheck();
    const failed = catalogFailures.length > 0 || selfCheckFailures.length > 0;

    if (wantJson) {
      process.stdout.write(
        JSON.stringify(
          {
            first_party: FIRST_PARTY.map((s) => ({
              id: s.id,
              list: s.list,
              canonical: githubUrl(s.slug),
            })),
            rename_aliases: RENAME_ALIASES.map((c) => ({
              id: c.id,
              canonical: githubUrl(c.canonicalSlug),
              published_registry_name: c.publishedRegistryName,
            })),
            peers: PEERS,
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
        "Catalog surfaces: registry.json, STATUS.md, README.md, llms.txt, docs/release-index.md, scripts/collect-growth-metrics.mjs",
        "Official MCP registry names (io.github.davidmosiah/fitbitmcp and siblings) are live IDs and are left unchanged.",
        "",
        `First-party form: https://github.com/${OWNER}/<canonical-slug>`,
        `Hub: ${HUB}`,
      ];
      for (const spec of RENAME_ALIASES) {
        lines.push(`- ${spec.id}: ${githubUrl(spec.canonicalSlug)} (not ${spec.staleSlug})`);
      }
      for (const peer of PEERS) {
        lines.push(`- peer ${peer.id}: ${peer.canonical}`);
      }
      if (catalogFailures.length === 0) {
        lines.push("", "PASS — catalog GitHub links use verified canonical slugs.");
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
