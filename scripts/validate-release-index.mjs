#!/usr/bin/env node
/**
 * validate-release-index.mjs — verifies that docs/release-index.md points to
 * real npm versions and non-draft GitHub Releases.
 *
 * This intentionally uses Node built-ins only. The release index is the public
 * "what we verified" surface, so CI should fail if a row drifts from npm or
 * GitHub after a release, or if a promoted repo stops linking back to the
 * verified release surface.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RELEASE_INDEX_PATH = path.join(ROOT, 'docs', 'release-index.md');

const offline = process.argv.includes('--offline');
const quiet = process.argv.includes('--quiet');
const log = (...args) => { if (!quiet) console.log(...args); };

function fail(message) {
  throw new Error(message);
}

function parseReleaseRows(markdown) {
  const rows = [];
  for (const line of markdown.split('\n')) {
    if (!line.startsWith('| ')) continue;
    if (line.includes('|---')) continue;
    if (line.includes('| Project |')) continue;

    // Strategic rows include npm URL + GitHub release tag URL.
    // Other tables (series fleet, short npm-only rows) are skipped.
    const match = line.match(
      /^\| (?<project>.+?) \| \[`(?<pkg>[^`]+)`\]\((?<npmUrl>[^)]+)\) \| `(?<version>[^`]+)` \| \[`(?<tag>v[^`]+)`\]\((?<releaseUrl>[^)]+)\) \| (?<verification>.+) \|$/,
    );
    if (!match?.groups) {
      continue;
    }

    const release = match.groups.releaseUrl.match(
      /^https:\/\/github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)\/releases\/tag\/(?<releaseTag>[^/]+)$/,
    );
    if (!release?.groups) {
      fail(`Invalid GitHub release URL for ${match.groups.pkg}: ${match.groups.releaseUrl}`);
    }

    const npmUrl = new URL(match.groups.npmUrl);
    if (npmUrl.hostname !== 'www.npmjs.com') {
      fail(`Invalid npm host for ${match.groups.pkg}: ${match.groups.npmUrl}`);
    }
    const expectedNpmPath = `/package/${match.groups.pkg}/v/${match.groups.version}`;
    if (npmUrl.pathname !== expectedNpmPath) {
      fail(`Invalid npm URL for ${match.groups.pkg}: expected ${expectedNpmPath}, got ${npmUrl.pathname}`);
    }

    rows.push({
      project: match.groups.project,
      pkg: match.groups.pkg,
      version: match.groups.version,
      tag: match.groups.tag,
      npmUrl: match.groups.npmUrl,
      releaseUrl: match.groups.releaseUrl,
      verification: match.groups.verification,
      owner: release.groups.owner,
      repo: release.groups.repo,
      releaseTag: release.groups.releaseTag,
    });
  }
  return rows;
}

async function fetchJson(url, headers = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': 'delx-release-index-validator/1.0',
        ...headers,
      },
      signal: controller.signal,
    });
    if (!response.ok) {
      fail(`${url} returned ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function verifyNpm(row) {
  const url = `https://registry.npmjs.org/${encodeURIComponent(row.pkg)}/${encodeURIComponent(row.version)}`;
  const data = await fetchJson(url);
  if (data.version !== row.version) {
    fail(`${row.pkg}: npm returned version ${data.version}, expected ${row.version}`);
  }
}

async function verifyGitHubRelease(row) {
  const headers = {};
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const url = `https://api.github.com/repos/${row.owner}/${row.repo}/releases/tags/${encodeURIComponent(row.tag)}`;
  const data = await fetchJson(url, headers);
  if (data.tag_name !== row.tag) {
    fail(`${row.pkg}: GitHub release tag ${data.tag_name}, expected ${row.tag}`);
  }
  if (data.draft) fail(`${row.pkg}: GitHub release ${row.tag} is still a draft`);
  if (data.prerelease) fail(`${row.pkg}: GitHub release ${row.tag} is marked prerelease`);
  if (data.html_url !== row.releaseUrl) {
    fail(`${row.pkg}: GitHub release URL ${data.html_url}, expected ${row.releaseUrl}`);
  }
}

async function verifyGitHubReadme(row) {
  const headers = {};
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const url = `https://api.github.com/repos/${row.owner}/${row.repo}/contents/README.md`;
  const data = await fetchJson(url, headers);
  if (data.encoding !== 'base64' || typeof data.content !== 'string') {
    fail(`${row.pkg}: README.md response was not base64 content`);
  }

  const readme = Buffer.from(data.content, 'base64').toString('utf8');
  const markers = [
    `https://github.com/${row.owner}/${row.repo}/releases/latest`,
    `github/v/release/${row.owner}/${row.repo}`,
    'https://github.com/davidmosiah/delx-wellness/blob/main/docs/release-index.md',
  ];
  for (const marker of markers) {
    if (!readme.includes(marker)) {
      fail(`${row.pkg}: README.md is missing promoted-release marker: ${marker}`);
    }
  }
}

function verifyStatic(row) {
  if (row.tag !== `v${row.version}`) {
    fail(`${row.pkg}: tag ${row.tag} does not match version ${row.version}`);
  }
  if (row.releaseTag !== row.tag) {
    fail(`${row.pkg}: release URL tag ${row.releaseTag} does not match table tag ${row.tag}`);
  }
  for (const required of ['npm test', 'prod audit', 'pack dry-run']) {
    if (!row.verification.includes(required)) {
      fail(`${row.pkg}: verification column must mention "${required}"`);
    }
  }
}

async function main() {
  const markdown = fs.readFileSync(RELEASE_INDEX_PATH, 'utf8');
  const rows = parseReleaseRows(markdown);
  if (rows.length === 0) fail('docs/release-index.md has no release rows');

  const seen = new Set();
  for (const row of rows) {
    const key = `${row.pkg}@${row.version}`;
    if (seen.has(key)) fail(`Duplicate release row: ${key}`);
    seen.add(key);
    verifyStatic(row);
  }

  if (!offline) {
    for (const row of rows) {
      await verifyNpm(row);
      await verifyGitHubRelease(row);
      await verifyGitHubReadme(row);
    }
  }

  log(`# release-index validation\n\nRows checked: ${rows.length}`);
  for (const row of rows) {
    log(`- PASS ${row.pkg}@${row.version} (${row.owner}/${row.repo} ${row.tag})`);
  }
  log(
    offline
      ? '\nStatic checks passed (offline mode).'
      : '\nAll release-index rows resolve on npm/GitHub and promoted READMEs link back.',
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
