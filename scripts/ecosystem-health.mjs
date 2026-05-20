#!/usr/bin/env node
/**
 * ecosystem-health.mjs — at-a-glance ecosystem snapshot.
 *
 * Pulls from registry.json + npm + GitHub and prints a per-package
 * scorecard: version, weekly downloads, stars, forks, open issues,
 * last commit, last published, drift status.
 *
 * Usage:
 *   node scripts/ecosystem-health.mjs            # human-readable table
 *   node scripts/ecosystem-health.mjs --json     # machine-readable JSON
 *   node scripts/ecosystem-health.mjs --owner X  # override (default: davidmosiah)
 *
 * Read-only, no auth required beyond npm registry and the GitHub
 * unauthenticated API (subject to ~60 req/h rate limit; with `gh`
 * CLI installed this script falls back to authenticated requests).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile, execFileSync } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT, 'registry.json');

const args = process.argv.slice(2);
const wantJson = args.includes('--json');
const ownerIdx = args.indexOf('--owner');
const owner = ownerIdx >= 0 ? args[ownerIdx + 1] : 'davidmosiah';

function hasGhCli() {
  try {
    execFileSync('which', ['gh'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

const USE_GH = hasGhCli();

async function fetchJson(url) {
  if (USE_GH && url.startsWith('https://api.github.com/')) {
    const ghPath = url.replace('https://api.github.com/', '');
    try {
      const { stdout } = await execFileAsync('gh', ['api', ghPath], { timeout: 10_000 });
      return JSON.parse(stdout);
    } catch {
      return null;
    }
  }
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function npmInfo(pkg) {
  try {
    const { stdout } = await execFileAsync('npm', ['view', pkg, '--json'], { timeout: 10_000 });
    return JSON.parse(stdout);
  } catch {
    return null;
  }
}

async function npmDownloadsLastWeek(pkg) {
  const d = await fetchJson(`https://api.npmjs.org/downloads/point/last-week/${pkg}`);
  return d?.downloads ?? 0;
}

async function npmDownloadsLastMonth(pkg) {
  const d = await fetchJson(`https://api.npmjs.org/downloads/point/last-month/${pkg}`);
  return d?.downloads ?? 0;
}

async function gatherForEntry(entry) {
  const pkg = entry.package;
  const isPrivate = pkg.endsWith('-private');
  const repoSlug = entry.repository?.replace('https://github.com/', '');

  const [
    npmData,
    weekDl,
    monthDl,
    repoData,
  ] = await Promise.all([
    isPrivate ? Promise.resolve(null) : npmInfo(pkg),
    isPrivate ? Promise.resolve(0) : npmDownloadsLastWeek(pkg),
    isPrivate ? Promise.resolve(0) : npmDownloadsLastMonth(pkg),
    repoSlug ? fetchJson(`https://api.github.com/repos/${repoSlug}`) : Promise.resolve(null),
  ]);

  const npmLatest = npmData?.version ?? null;
  const npmModified = npmData?.time?.modified ?? null;
  const registryVersion = entry.npm_version ?? null;
  const drift = !isPrivate && registryVersion && npmLatest && registryVersion !== npmLatest;

  return {
    name: entry.name,
    package: pkg,
    private: isPrivate,
    npm_version: npmLatest,
    registry_version: registryVersion,
    drift,
    downloads_week: weekDl,
    downloads_month: monthDl,
    stars: repoData?.stargazers_count ?? null,
    forks: repoData?.forks_count ?? null,
    open_issues: repoData?.open_issues_count ?? null,
    last_pushed: repoData?.pushed_at?.slice(0, 10) ?? null,
    last_published: npmModified?.slice(0, 10) ?? null,
    repository: entry.repository ?? null,
  };
}

function formatTable(rows) {
  const headers = ['PACKAGE', 'npm', 'reg', 'WEEK', 'MONTH', '⭐', '🍴', 'iss', 'PUSHED', 'PUBLISHED', 'DRIFT'];
  const lines = [];
  lines.push(
    `${'PACKAGE'.padEnd(36)} ${'npm'.padEnd(8)} ${'reg'.padEnd(8)} ${'WEEK'.padStart(6)} ${'MONTH'.padStart(7)} ${'⭐'.padStart(4)} ${'🍴'.padStart(4)} ${'iss'.padStart(4)} ${'PUSHED'.padStart(10)} ${'PUBLISHED'.padStart(10)} DRIFT`,
  );
  lines.push('-'.repeat(125));
  for (const r of rows) {
    const npm = r.npm_version ?? '—';
    const reg = r.registry_version ?? '—';
    const week = String(r.downloads_week ?? 0).padStart(6);
    const month = String(r.downloads_month ?? 0).padStart(7);
    const stars = String(r.stars ?? '—').padStart(4);
    const forks = String(r.forks ?? '—').padStart(4);
    const issues = String(r.open_issues ?? '—').padStart(4);
    const pushed = (r.last_pushed ?? '—').padStart(10);
    const published = (r.last_published ?? '—').padStart(10);
    const drift = r.drift ? '⚠️  ' : (r.private ? '(private)' : '');
    lines.push(
      `${(r.package).padEnd(36)} ${String(npm).padEnd(8)} ${String(reg).padEnd(8)} ${week} ${month} ${stars} ${forks} ${issues} ${pushed} ${published} ${drift}`,
    );
  }
  return lines.join('\n');
}

function formatSummary(rows) {
  const totalWeek = rows.reduce((s, r) => s + (r.downloads_week ?? 0), 0);
  const totalMonth = rows.reduce((s, r) => s + (r.downloads_month ?? 0), 0);
  const totalStars = rows.reduce((s, r) => s + (r.stars ?? 0), 0);
  const totalIssues = rows.reduce((s, r) => s + (r.open_issues ?? 0), 0);
  const driftCount = rows.filter((r) => r.drift).length;
  const publicCount = rows.filter((r) => !r.private).length;

  return [
    '',
    `Summary across ${rows.length} entries (${publicCount} public, ${rows.length - publicCount} private):`,
    `  Weekly downloads total:  ${totalWeek.toLocaleString('en-US')}`,
    `  Monthly downloads total: ${totalMonth.toLocaleString('en-US')}`,
    `  Total stars:             ${totalStars}`,
    `  Total open issues:       ${totalIssues}`,
    `  Registry drift:          ${driftCount > 0 ? `⚠️  ${driftCount} packages out of sync — run \`node scripts/sync-registry.mjs\`` : '✓ in sync'}`,
    '',
  ].join('\n');
}

async function main() {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const all = [
    ...(registry.agent_profiles ?? []),
    ...(registry.connectors ?? []),
  ];

  const rows = await Promise.all(all.map(gatherForEntry));

  if (wantJson) {
    console.log(JSON.stringify({ generated_at: new Date().toISOString(), entries: rows }, null, 2));
    return;
  }

  console.log(`Delx Wellness — Ecosystem Health (${new Date().toISOString().slice(0, 16)} UTC)`);
  console.log('');
  console.log(formatTable(rows));
  console.log(formatSummary(rows));
}

main().catch((err) => {
  console.error('ecosystem-health failed:', err.message);
  process.exit(1);
});
