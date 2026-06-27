#!/usr/bin/env node
/**
 * sync-registry.mjs — pulls current npm versions for every entry in
 * registry.json and rewrites the file in place. Also regenerates
 * STATUS.md from the canonical registry.json.
 *
 * Run on demand:  node scripts/sync-registry.mjs
 * Or in CI:        node scripts/sync-registry.mjs --check (exits 1 if drift)
 *
 * Why this exists: previously the registry was hand-maintained — drift
 * between registry.json and the actual npm-live versions happened
 * within hours of any publish. This script reconciles in one shot.
 *
 * Side effects:
 *   - mutates registry.json (rewrites with current npm_version per entry)
 *   - mutates STATUS.md (regenerates from registry.json)
 *   - bumps last_updated timestamp
 *
 * Also runs a README coverage guard (read-only): every wellness connector
 * and the meta-MCP in registry.json must be referenced in README.md. The
 * README card grid / decision-tree stay hand-styled, so this reports gaps
 * for a human to fill rather than rewriting that prose.
 *
 * Network: fetches npm registry via `npm view <pkg> version` per
 * package. Reads only — does not publish or auth.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT, 'registry.json');
const STATUS_PATH = path.join(ROOT, 'STATUS.md');
const README_PATH = path.join(ROOT, 'README.md');

const checkOnly = process.argv.includes('--check');
const quiet = process.argv.includes('--quiet');
const log = (...args) => { if (!quiet) console.log(...args); };

function fetchNpmVersion(pkg) {
  try {
    const result = execFileSync('npm', ['view', pkg, 'version'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 10_000,
    });
    return result.trim() || null;
  } catch {
    return null;
  }
}

function loadRegistry() {
  const raw = fs.readFileSync(REGISTRY_PATH, 'utf8');
  return JSON.parse(raw);
}

function writeJsonAtomically(filePath, data) {
  const tmp = `${filePath}.tmp.${process.pid}`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n');
  fs.renameSync(tmp, filePath);
}

function writeFileAtomically(filePath, content) {
  const tmp = `${filePath}.tmp.${process.pid}`;
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, filePath);
}

function buildStatusMarkdown(reg) {
  const lines = [
    '# Delx Wellness — Ecosystem Status',
    '',
    `_Auto-generated from \`registry.json\` on ${reg.last_updated} by \`scripts/sync-registry.mjs\`. Do not hand-edit — re-run the script._`,
    '',
    '## Agent profiles',
    '',
    '| Profile | npm version | Status |',
    '|---|---|---|',
  ];
  for (const prof of reg.agent_profiles ?? []) {
    lines.push(
      `| [${prof.name}](${prof.repository ?? '#'}) | \`${prof.npm_version ?? '—'}\` | ${prof.status ?? '—'} |`,
    );
  }

  lines.push('', '## Meta-connectors', '');
  lines.push('| Meta-connector | Package | npm version | Composes |');
  lines.push('|---|---|---|---|');
  for (const m of reg.meta_connectors ?? []) {
    lines.push(
      `| [${m.name}](${m.repository ?? '#'}) | \`${m.package}\` | \`${m.npm_version ?? '—'}\` | ${(m.tools ?? []).length} tools |`,
    );
  }

  lines.push('', '## Connectors', '');
  lines.push('| Connector | Package | npm version | Quality | Signals |');
  lines.push('|---|---|---|---|---|');
  for (const c of reg.connectors ?? []) {
    const signalsCount = (c.signals ?? []).length;
    const previewSignals = (c.signals ?? []).slice(0, 4).join(', ');
    const sigs = signalsCount > 4 ? `${previewSignals}…` : previewSignals;
    lines.push(
      `| [${c.name}](${c.repository ?? '#'}) | \`${c.package}\` | \`${c.npm_version ?? '—'}\` | ${c.quality?.tier ?? c.quality ?? '—'} | ${sigs} |`,
    );
  }

  const publicCount = (reg.connectors ?? []).filter((c) => !c.package.endsWith('-private')).length;
  const privateCount = (reg.connectors ?? []).filter((c) => c.package.endsWith('-private')).length;
  const profileCount = (reg.agent_profiles ?? []).length;
  const metaCount = (reg.meta_connectors ?? []).length;

  lines.push(
    '',
    '## Snapshot',
    '',
    `- **Total public connectors**: ${publicCount}`,
    `- **Private lab connectors**: ${privateCount}`,
    `- **Meta-connectors**: ${metaCount}`,
    `- **Profile packs**: ${profileCount}`,
    `- **Last registry update**: ${reg.last_updated}`,
    '',
    'See [registry.json](registry.json) for the canonical machine-readable manifest.',
    '',
  );

  return lines.join('\n');
}

/**
 * Drift guard for the human-facing README. The README card grid and the
 * "Which connector should I install first?" decision-tree are hand-styled
 * (brand colors, logo flags, repo short-names, tuned copy) so this script
 * does NOT rewrite that prose. But the most common drift is forgetting to
 * surface a brand-new registry entry in the README at all (e.g. Eight Sleep
 * shipped to registry.json long before it had a card). This check catches
 * exactly that: every wellness connector (and the meta-MCP) in registry.json
 * must be mentioned somewhere in README.md by package name or repo slug.
 *
 * Returns an array of human-readable problem strings (empty = all covered).
 */
function checkReadmeCoverage(reg) {
  let readme;
  try {
    readme = fs.readFileSync(README_PATH, 'utf8');
  } catch {
    return ['README.md not found — skipping coverage check.'];
  }

  const problems = [];
  const isWellness = (c) =>
    !(c.signals ?? []).includes('non_wellness') && !String(c.package ?? '').endsWith('-private');

  const checkEntry = (entry, label) => {
    const pkg = entry.package;
    const slug = entry.repository ? entry.repository.replace(/^https?:\/\/github\.com\//, '') : null;
    const mentioned =
      (pkg && readme.includes(pkg)) || (slug && readme.includes(slug));
    if (!mentioned) {
      problems.push(`${label} "${entry.name}" (${pkg}) is in registry.json but not referenced in README.md`);
    }
  };

  for (const c of reg.connectors ?? []) {
    if (isWellness(c)) checkEntry(c, 'connector');
  }
  for (const m of reg.meta_connectors ?? []) {
    checkEntry(m, 'meta-connector');
  }

  return problems;
}

function main() {
  const reg = loadRegistry();
  const changes = [];

  for (const list of ['agent_profiles', 'meta_connectors', 'connectors']) {
    for (const entry of reg[list] ?? []) {
      const pkg = entry.package;
      if (!pkg || pkg.endsWith('-private')) continue;
      const fresh = fetchNpmVersion(pkg);
      if (!fresh) {
        log(`  ! could not fetch version for ${pkg}`);
        continue;
      }
      const previous = entry.npm_version;
      if (previous !== fresh) {
        changes.push({ pkg, from: previous ?? '—', to: fresh });
        entry.npm_version = fresh;
      }
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const previousDate = reg.last_updated;
  if (changes.length > 0 || previousDate !== today) {
    reg.last_updated = today;
  }

  const readmeGaps = checkReadmeCoverage(reg);
  const nextStatus = buildStatusMarkdown(reg);
  const currentStatus = fs.existsSync(STATUS_PATH) ? fs.readFileSync(STATUS_PATH, 'utf8') : null;
  const statusDrift = currentStatus !== nextStatus;

  if (checkOnly) {
    if (readmeGaps.length > 0) {
      console.error('README.md is missing registry entries:');
      for (const g of readmeGaps) console.error(`  - ${g}`);
      console.error('Add a card + decision-tree line in README.md (hand-styled — not auto-generated).');
    }
    if (statusDrift) {
      console.error('STATUS.md is out of date with registry.json.');
      console.error('Run `node scripts/sync-registry.mjs` to regenerate it.');
    }
    if (changes.length > 0) {
      console.error('Registry is out of date with npm:');
      for (const c of changes) {
        console.error(`  ${c.pkg}: ${c.from} → ${c.to}`);
      }
      console.error('\nRun `node scripts/sync-registry.mjs` to update.');
      process.exit(1);
    }
    if (statusDrift) process.exit(1);
    log('Registry is in sync with npm.');
    if (readmeGaps.length === 0) log('README references every registry connector.');
    log('STATUS.md is in sync with registry.json.');
    process.exit(0);
  }

  if (readmeGaps.length > 0) {
    log('! README coverage gaps (add cards/decision-tree lines by hand):');
    for (const g of readmeGaps) log(`    - ${g}`);
  }

  if (changes.length === 0 && previousDate === today && !statusDrift) {
    log('No changes — registry is already in sync.');
    return;
  }

  writeJsonAtomically(REGISTRY_PATH, reg);
  writeFileAtomically(STATUS_PATH, nextStatus);

  if (changes.length === 0 && previousDate !== today) {
    log(`Bumped last_updated to ${today}. No npm-version drift detected.`);
  } else if (changes.length === 0) {
    log('Regenerated STATUS.md. No npm-version drift detected.');
  } else {
    log(`Synced ${changes.length} version change(s):`);
    for (const c of changes) {
      log(`  ${c.pkg}: ${c.from} → ${c.to}`);
    }
  }
  log(`Wrote ${path.relative(ROOT, REGISTRY_PATH)} and ${path.relative(ROOT, STATUS_PATH)}.`);
}

main();
