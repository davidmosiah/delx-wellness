#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const owner = "davidmosiah";
const npmMaintainer = "davidbatista";
const timeZone = "America/Fortaleza";
const snapshotRoot = path.join(process.cwd(), ".growth-metrics");
const snapshotDir = path.join(snapshotRoot, "account-snapshots");
const workspaceRoot = path.resolve(process.cwd(), "..");

function execJson(command, args, options = {}) {
  const output = execFileSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options
  });
  return JSON.parse(output);
}

function execText(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options
  });
}

function sanitizeError(error) {
  return String(error?.stderr || error?.message || error || "unknown error")
    .replace(/gho_[A-Za-z0-9_]+/g, "gho_***")
    .replace(/npm_[A-Za-z0-9_]+/g, "npm_***")
    .trim()
    .slice(0, 800);
}

function number(value) {
  return Number.isFinite(value) ? value : 0;
}

function formatNumber(value) {
  return number(value).toLocaleString("en-US");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function localDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

function previousSnapshotPath(todayPath) {
  if (!existsSync(snapshotDir)) return null;
  const files = readdirSync(snapshotDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.join(snapshotDir, file))
    .filter((file) => file !== todayPath)
    .sort();
  return files.at(-1) ?? null;
}

function deltaLabel(current, previous) {
  if (previous === undefined || previous === null) return "n/a";
  const delta = number(current) - number(previous);
  if (delta > 0) return `+${formatNumber(delta)}`;
  if (delta < 0) return `-${formatNumber(Math.abs(delta))}`;
  return "0";
}

function topItems(items, key, limit = 10) {
  return [...items]
    .filter((item) => number(key(item)) > 0)
    .sort((a, b) => number(key(b)) - number(key(a)))
    .slice(0, limit);
}

function githubRepoSlug(input) {
  if (!input) return null;
  const cleaned = input
    .replace(/^git\+/, "")
    .replace(/^https:\/\/github\.com\//, "")
    .replace(/^git:\/\/github\.com\//, "")
    .replace(/^ssh:\/\/git@github\.com\//, "")
    .replace(/^git@github\.com:/, "")
    .replace(/\.git$/, "")
    .replace(/#.*$/, "");
  const parts = cleaned.split("/");
  if (parts.length < 2) return null;
  return `${parts[0]}/${parts[1]}`;
}

function readLocalPackageMap() {
  const map = new Map();
  if (!existsSync(workspaceRoot)) return map;

  for (const entry of readdirSync(workspaceRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const packagePath = path.join(workspaceRoot, entry.name, "package.json");
    if (!existsSync(packagePath)) continue;
    try {
      const pkg = JSON.parse(readFileSync(packagePath, "utf8"));
      if (pkg.private === true || !pkg.name) continue;
      map.set(pkg.name, {
        repoName: entry.name,
        packagePath,
        version: pkg.version ?? null
      });
    } catch {
      // Ignore non-standard package manifests.
    }
  }

  return map;
}

async function fetchJson(url, attempts = 4) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "delx-account-growth-metrics/1.0" },
        signal: controller.signal
      });
      if (response.ok) return await response.json();
      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable || attempt === attempts) {
        return { error: `${response.status} ${response.statusText}` };
      }
    } catch (error) {
      if (attempt === attempts) return { error: sanitizeError(error) };
    } finally {
      clearTimeout(timeout);
    }
    await sleep(1_000 * attempt);
  }
  return { error: "exhausted retries" };
}

function ghJson(endpoint) {
  try {
    return execJson("gh", ["api", endpoint]);
  } catch (error) {
    return { error: sanitizeError(error) };
  }
}

async function collectGitHubRepos() {
  const query = `
    query($login: String!) {
      user(login: $login) {
        repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER, orderBy: {field: NAME, direction: ASC}) {
          totalCount
          nodes {
            name
            nameWithOwner
            isArchived
            isFork
            url
            description
            stargazerCount
            forkCount
            watchers { totalCount }
            issues(states: OPEN) { totalCount }
            pullRequests(states: OPEN) { totalCount }
            updatedAt
            pushedAt
            primaryLanguage { name }
          }
        }
      }
    }`;

  const result = execJson("gh", ["api", "graphql", "-f", `login=${owner}`, "-f", `query=${query}`]);
  const repos = result.data.user.repositories.nodes;

  return repos.map((repo) => {
    const views = ghJson(`/repos/${repo.nameWithOwner}/traffic/views`);
    const clones = ghJson(`/repos/${repo.nameWithOwner}/traffic/clones`);
    const referrers = ghJson(`/repos/${repo.nameWithOwner}/traffic/popular/referrers`);
    const paths = ghJson(`/repos/${repo.nameWithOwner}/traffic/popular/paths`);

    return {
      name: repo.name,
      fullName: repo.nameWithOwner,
      url: repo.url,
      description: repo.description ?? null,
      language: repo.primaryLanguage?.name ?? null,
      isArchived: repo.isArchived,
      isFork: repo.isFork,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      watchers: repo.watchers.totalCount,
      openIssues: repo.issues.totalCount,
      openPullRequests: repo.pullRequests.totalCount,
      updatedAt: repo.updatedAt,
      pushedAt: repo.pushedAt,
      traffic: {
        views: views.count ?? null,
        uniqueViews: views.uniques ?? null,
        clones: clones.count ?? null,
        uniqueCloners: clones.uniques ?? null,
        topReferrers: Array.isArray(referrers) ? referrers.slice(0, 8) : [],
        topPaths: Array.isArray(paths) ? paths.slice(0, 8) : []
      },
      errors: {
        views: views.error ?? null,
        clones: clones.error ?? null,
        referrers: referrers.error ?? null,
        paths: paths.error ?? null
      }
    };
  });
}

function searchNpmPackages() {
  try {
    return execJson("npm", ["search", "--json", "--searchlimit=250", `maintainer:${npmMaintainer}`]);
  } catch (error) {
    return { error: sanitizeError(error), packages: [] };
  }
}

function npmDownloads(days) {
  return days.reduce((sum, day) => sum + number(day.downloads), 0);
}

async function collectNpmPackages(localPackageMap, githubRepoNames) {
  const searchResult = searchNpmPackages();
  const packages = Array.isArray(searchResult) ? searchResult : [];
  const byName = new Map();

  for (const item of packages) {
    byName.set(item.name, {
      name: item.name,
      version: item.version ?? null,
      description: item.description ?? null,
      date: item.date ?? null,
      npmUrl: item.links?.npm ?? `https://www.npmjs.com/package/${item.name}`,
      repository: item.links?.repository ?? null,
      homepage: item.links?.homepage ?? null,
      maintainer: npmMaintainer,
      source: "npm-search"
    });
  }

  for (const [name, local] of localPackageMap) {
    if (!byName.has(name)) {
      byName.set(name, {
        name,
        version: local.version,
        description: null,
        date: null,
        npmUrl: `https://www.npmjs.com/package/${name}`,
        repository: null,
        homepage: null,
        maintainer: npmMaintainer,
        source: "local-package-json"
      });
    }
  }

  const packageStats = [];
  for (const pkg of [...byName.values()].sort((a, b) => a.name.localeCompare(b.name))) {
    const encoded = encodeURIComponent(pkg.name);
    const range = await fetchJson(`https://api.npmjs.org/downloads/range/last-month/${encoded}`);
    const days = Array.isArray(range.downloads) ? range.downloads : [];
    const latest = days.at(-1) ?? null;
    const repoSlug = githubRepoSlug(pkg.repository);
    const localRepoName = localPackageMap.get(pkg.name)?.repoName ?? null;
    const repoSlugExists = repoSlug?.startsWith(`${owner}/`) && githubRepoNames.has(repoSlug.split("/")[1]);

    packageStats.push({
      ...pkg,
      repoFullName: repoSlugExists ? repoSlug : localRepoName ? `${owner}/${localRepoName}` : repoSlug,
      localRepoName,
      downloadsLastAvailableDay: latest?.downloads ?? null,
      latestDownloadDay: latest?.day ?? null,
      downloads7d: npmDownloads(days.slice(-7)),
      downloads30d: npmDownloads(days),
      downloadDays: days,
      errors: {
        downloads: range.error ?? null
      }
    });

    await sleep(350);
  }

  return packageStats;
}

function totalsFor(repos, packages) {
  const ownRepos = repos.filter((repo) => !repo.isFork);
  return {
    github: {
      publicRepos: repos.length,
      ownRepos: ownRepos.length,
      forks: repos.filter((repo) => repo.isFork).length,
      archived: repos.filter((repo) => repo.isArchived).length,
      stars: repos.reduce((sum, repo) => sum + number(repo.stars), 0),
      forkCount: repos.reduce((sum, repo) => sum + number(repo.forks), 0),
      watchers: repos.reduce((sum, repo) => sum + number(repo.watchers), 0),
      openIssues: repos.reduce((sum, repo) => sum + number(repo.openIssues), 0),
      openPullRequests: repos.reduce((sum, repo) => sum + number(repo.openPullRequests), 0),
      views14d: repos.reduce((sum, repo) => sum + number(repo.traffic.views), 0),
      uniqueViews14d: repos.reduce((sum, repo) => sum + number(repo.traffic.uniqueViews), 0),
      clones14d: repos.reduce((sum, repo) => sum + number(repo.traffic.clones), 0),
      uniqueCloners14d: repos.reduce((sum, repo) => sum + number(repo.traffic.uniqueCloners), 0)
    },
    npm: {
      packages: packages.length,
      downloadsLastAvailableDay: packages.reduce((sum, pkg) => sum + number(pkg.downloadsLastAvailableDay), 0),
      downloads7d: packages.reduce((sum, pkg) => sum + number(pkg.downloads7d), 0),
      downloads30d: packages.reduce((sum, pkg) => sum + number(pkg.downloads30d), 0)
    }
  };
}

function linkedNpmDownloads(repo, packages, key) {
  return packages
    .filter((pkg) => pkg.repoFullName === repo.fullName || pkg.localRepoName === repo.name)
    .reduce((sum, pkg) => sum + number(pkg[key]), 0);
}

function markdownTable(rows, fallback) {
  return rows.length ? rows.join("\n") : fallback;
}

function publicMarkdown(snapshot, previous) {
  const repos = snapshot.github.repos;
  const packages = snapshot.npm.packages;
  const totals = snapshot.totals;
  const previousTotals = previous?.totals;

  const repoRow = (repo) => {
    const npm7d = linkedNpmDownloads(repo, packages, "downloads7d");
    const npm30d = linkedNpmDownloads(repo, packages, "downloads30d");
    return `| [${repo.name}](${repo.url}) | ${repo.isFork ? "fork" : repo.isArchived ? "archived" : "own"} | ${repo.language ?? "-"} | ${formatNumber(repo.stars)} | ${formatNumber(repo.forks)} | ${formatNumber(repo.openIssues)} | ${formatNumber(repo.openPullRequests)} | ${formatNumber(npm7d)} | ${formatNumber(npm30d)} |`;
  };

  const packageRow = (pkg) =>
    `| [${pkg.name}](${pkg.npmUrl}) | ${pkg.version ?? "-"} | ${pkg.repoFullName ? `[${pkg.repoFullName}](https://github.com/${pkg.repoFullName})` : "-"} | ${formatNumber(pkg.downloadsLastAvailableDay)} | ${formatNumber(pkg.downloads7d)} | ${formatNumber(pkg.downloads30d)} |`;

  const totalsRows = [
    ["Public GitHub repos", totals.github.publicRepos, previousTotals?.github?.publicRepos],
    ["Own public repos", totals.github.ownRepos, previousTotals?.github?.ownRepos],
    ["Fork repos", totals.github.forks, previousTotals?.github?.forks],
    ["Archived repos", totals.github.archived, previousTotals?.github?.archived],
    ["GitHub stars", totals.github.stars, previousTotals?.github?.stars],
    ["GitHub forks", totals.github.forkCount, previousTotals?.github?.forkCount],
    ["GitHub watchers", totals.github.watchers, previousTotals?.github?.watchers],
    ["Open GitHub issues", totals.github.openIssues, previousTotals?.github?.openIssues],
    ["Open GitHub PRs", totals.github.openPullRequests, previousTotals?.github?.openPullRequests],
    ["npm packages", totals.npm.packages, previousTotals?.npm?.packages],
    ["npm downloads, latest available day", totals.npm.downloadsLastAvailableDay, previousTotals?.npm?.downloadsLastAvailableDay],
    ["npm downloads, 7d", totals.npm.downloads7d, previousTotals?.npm?.downloads7d],
    ["npm downloads, 30d", totals.npm.downloads30d, previousTotals?.npm?.downloads30d]
  ];

  const activeOwnRepos = repos.filter((repo) => !repo.isFork && !repo.isArchived);
  const topRepos = [...activeOwnRepos]
    .sort((a, b) => {
      const bScore = number(b.stars) * 20 + number(b.forks) * 25 + linkedNpmDownloads(b, packages, "downloads7d");
      const aScore = number(a.stars) * 20 + number(a.forks) * 25 + linkedNpmDownloads(a, packages, "downloads7d");
      return bScore - aScore;
    })
    .slice(0, 20);

  return `# Open Source Growth Snapshot

Generated: ${snapshot.generatedAt}

This public snapshot uses GitHub public repository metadata and the public npm
downloads API. GitHub traffic, referrers, path analytics and clone data are kept
only in \`.growth-metrics/account-latest.md\`, which is not committed.

## Public Totals

| Metric | Current | Delta vs previous account snapshot |
|---|---:|---:|
${totalsRows.map(([label, current, previous]) => `| ${label} | ${formatNumber(current)} | ${deltaLabel(current, previous)} |`).join("\n")}

## Top Public Repos

| Repo | Type | Language | Stars | Forks | Issues | PRs | npm 7d | npm 30d |
|---|---|---|---:|---:|---:|---:|---:|---:|
${markdownTable(topRepos.map(repoRow), "| n/a | - | - | 0 | 0 | 0 | 0 | 0 | 0 |")}

## All npm Packages

| Package | Version | Linked repo | Latest day | 7d | 30d |
|---|---:|---|---:|---:|---:|
${markdownTable(topItems(packages, (pkg) => pkg.downloads7d, packages.length).map(packageRow), "| n/a | - | - | 0 | 0 | 0 |")}

## Signal Rules

- Stars are the strongest public discovery proof.
- Forks are builder intent.
- npm downloads are install intent, but single-day spikes are noisy.
- GitHub uniques, referrers and paths are stronger traction evidence than raw clones, but they stay in the private local snapshot.
- Repos with high npm downloads and low stars need better public proof: screenshots, examples, README CTA and distribution posts.
`;
}

function privateMarkdown(snapshot, previous) {
  const totals = snapshot.totals;
  const previousTotals = previous?.totals;
  const repos = snapshot.github.repos;
  const packages = snapshot.npm.packages;

  const totalRow = (label, current, previous) =>
    `| ${label} | ${formatNumber(current)} | ${deltaLabel(current, previous)} |`;

  const trafficRow = (repo) =>
    `| [${repo.name}](${repo.url}) | ${formatNumber(repo.traffic.views)} | ${formatNumber(repo.traffic.uniqueViews)} | ${formatNumber(repo.traffic.clones)} | ${formatNumber(repo.traffic.uniqueCloners)} | ${formatNumber(repo.stars)} | ${formatNumber(linkedNpmDownloads(repo, packages, "downloads7d"))} |`;

  const referrerLines = topItems(repos, (repo) => repo.traffic.uniqueViews, 12).flatMap((repo) => {
    const refs = repo.traffic.topReferrers.map((ref) => `${ref.referrer} (${ref.uniques}u/${ref.count})`).join(", ");
    const paths = repo.traffic.topPaths.map((item) => `${item.path} (${item.uniques}u/${item.count})`).join(", ");
    return [
      `### ${repo.name}`,
      "",
      `Referrers: ${refs || "n/a"}`,
      "",
      `Paths: ${paths || "n/a"}`
    ];
  });

  return `# Delx Account Growth Snapshot

Generated: ${snapshot.generatedAt}

## Totals

| Metric | Current | Delta vs previous account snapshot |
|---|---:|---:|
${[
    totalRow("Public GitHub repos", totals.github.publicRepos, previousTotals?.github?.publicRepos),
    totalRow("GitHub stars", totals.github.stars, previousTotals?.github?.stars),
    totalRow("GitHub forks", totals.github.forkCount, previousTotals?.github?.forkCount),
    totalRow("GitHub unique views, 14d", totals.github.uniqueViews14d, previousTotals?.github?.uniqueViews14d),
    totalRow("GitHub unique cloners, 14d", totals.github.uniqueCloners14d, previousTotals?.github?.uniqueCloners14d),
    totalRow("npm packages", totals.npm.packages, previousTotals?.npm?.packages),
    totalRow("npm downloads, 7d", totals.npm.downloads7d, previousTotals?.npm?.downloads7d),
    totalRow("npm downloads, 30d", totals.npm.downloads30d, previousTotals?.npm?.downloads30d)
  ].join("\n")}

## Top Repos By Traffic And Install Intent

| Repo | Views | Unique views | Clones | Unique cloners | Stars | npm 7d |
|---|---:|---:|---:|---:|---:|---:|
${markdownTable(topItems(repos, (repo) => number(repo.traffic.uniqueViews) + number(repo.traffic.uniqueCloners), 20).map(trafficRow), "| n/a | 0 | 0 | 0 | 0 | 0 | 0 |")}

## Referrers And Paths

${referrerLines.join("\n\n") || "n/a"}
`;
}

mkdirSync(snapshotDir, { recursive: true });

const date = localDate();
const snapshotPath = path.join(snapshotDir, `${date}.json`);
const previousPath = previousSnapshotPath(snapshotPath);
const previous = previousPath ? JSON.parse(readFileSync(previousPath, "utf8")) : null;
const localPackageMap = readLocalPackageMap();
const githubRepos = await collectGitHubRepos();
const githubRepoNames = new Set(githubRepos.map((repo) => repo.name));
const npmPackages = await collectNpmPackages(localPackageMap, githubRepoNames);
const snapshot = {
  generatedAt: new Date().toISOString(),
  timeZone,
  source: {
    github: "GitHub GraphQL public repo metadata plus REST traffic endpoints",
    npm: `npm search maintainer:${npmMaintainer} plus npm downloads API`
  },
  github: { repos: githubRepos },
  npm: { packages: npmPackages },
  totals: totalsFor(githubRepos, npmPackages)
};

writeFileSync(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
writeFileSync(path.join(snapshotRoot, "account-latest.md"), privateMarkdown(snapshot, previous));
writeFileSync(path.join(process.cwd(), "docs", "open-source-growth-snapshot.md"), publicMarkdown(snapshot, previous));

console.log(`Wrote ${path.relative(process.cwd(), snapshotPath)}`);
console.log(`Wrote ${path.relative(process.cwd(), path.join(snapshotRoot, "account-latest.md"))}`);
console.log("Wrote docs/open-source-growth-snapshot.md");
console.log(`Public GitHub repos: ${formatNumber(snapshot.totals.github.publicRepos)}`);
console.log(`GitHub stars: ${formatNumber(snapshot.totals.github.stars)}`);
console.log(`GitHub unique views 14d: ${formatNumber(snapshot.totals.github.uniqueViews14d)}`);
console.log(`GitHub unique cloners 14d: ${formatNumber(snapshot.totals.github.uniqueCloners14d)}`);
console.log(`npm packages: ${formatNumber(snapshot.totals.npm.packages)}`);
console.log(`npm downloads 7d: ${formatNumber(snapshot.totals.npm.downloads7d)}`);
