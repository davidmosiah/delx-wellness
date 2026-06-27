#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const owner = "davidmosiah";
const timeZone = "America/Fortaleza";
const snapshotRoot = path.join(process.cwd(), ".growth-metrics");
const snapshotDir = path.join(snapshotRoot, "snapshots");

const repos = [
  { name: "delx-wellness", vertical: "body", role: "registry", strategic: true },
  { name: "delx-wellness-site", vertical: "body", role: "site" },
  { name: "delx-living-body", vertical: "body", role: "meta-connector", npm: "delx-living-body", strategic: true },
  { name: "delx-mcp-server", vertical: "coordination", role: "bridge", npm: "delx-mcp-server", strategic: true },
  { name: "delx-memory", vertical: "coordination", role: "agent-memory", npm: "delx-memory", strategic: true },
  { name: "mcp-scorecard", vertical: "coordination", role: "quality", npm: "mcp-scorecard", strategic: true },
  { name: "whoop-mcp", vertical: "body", role: "connector", npm: "whoop-mcp-unofficial" },
  { name: "garmin-mcp", vertical: "body", role: "connector", npm: "garmin-mcp-unofficial" },
  { name: "google-health-mcp", vertical: "body", role: "connector", npm: "google-health-mcp-unofficial", strategic: true },
  { name: "strava-mcp", vertical: "body", role: "connector", npm: "strava-mcp-unofficial" },
  { name: "fitbitmcp", vertical: "body", role: "connector", npm: "fitbit-mcp-unofficial" },
  { name: "ouramcp", vertical: "body", role: "connector", npm: "oura-mcp-unofficial" },
  { name: "withingsmcp", vertical: "body", role: "connector", npm: "withings-mcp-unofficial" },
  { name: "apple-health-mcp", vertical: "body", role: "connector", npm: "apple-health-mcp-unofficial" },
  { name: "samsung-health-mcp", vertical: "body", role: "connector", npm: "samsung-health-mcp-unofficial" },
  { name: "polarmcp", vertical: "body", role: "connector", npm: "polar-mcp-unofficial" },
  { name: "wellness-nourish", vertical: "body", role: "nutrition", npm: "wellness-nourish" },
  { name: "openclaw-delx-plugin", vertical: "coordination", role: "plugin" },
  { name: "short-video-agent-kit", vertical: "reach", role: "creator-stack", npm: "short-video-agent-kit" },
  { name: "tiktok-agent-publisher", vertical: "reach", role: "creator-stack", npm: "tiktok-agent-publisher" },
  { name: "youtube-shorts-agent", vertical: "reach", role: "creator-stack", npm: "youtube-shorts-agent" },
  { name: "agent-seo-engine", vertical: "reach", role: "content-ops" },
  { name: "google-ads-intent-mcp", vertical: "reach", role: "ads-ops" }
];

const npmPackages = [...new Set(repos.map((repo) => repo.npm).filter(Boolean))].sort();

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

function number(value) {
  return Number.isFinite(value) ? value : 0;
}

function formatNumber(value) {
  return number(value).toLocaleString("en-US");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sanitizeError(error) {
  const text = String(error?.stderr || error?.message || error || "unknown error");
  return text.replace(/gho_[A-Za-z0-9_]+/g, "gho_***").trim().slice(0, 800);
}

function ghJson(endpoint) {
  try {
    const output = execFileSync("gh", ["api", endpoint], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
    return JSON.parse(output);
  } catch (error) {
    return { error: sanitizeError(error) };
  }
}

async function fetchJson(url, attempts = 4) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch(url, {
        headers: { "user-agent": "delx-growth-metrics/1.0" },
        signal: controller.signal
      });

      if (response.ok) {
        return await response.json();
      }

      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable || attempt === attempts) {
        return { error: `${response.status} ${response.statusText}` };
      }
    } catch (error) {
      if (attempt === attempts) {
        return { error: sanitizeError(error) };
      }
    } finally {
      clearTimeout(timeout);
    }

    await sleep(1_000 * attempt);
  }

  return { error: "exhausted retries" };
}

function topItems(items, key, limit = 6) {
  return [...items]
    .filter((item) => number(key(item)) > 0)
    .sort((a, b) => number(key(b)) - number(key(a)))
    .slice(0, limit);
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
  if (!previous && previous !== 0) return "n/a";
  const delta = number(current) - number(previous);
  if (delta > 0) return `+${formatNumber(delta)}`;
  if (delta < 0) return `-${formatNumber(Math.abs(delta))}`;
  return "0";
}

function sumDownloads(days) {
  return days.reduce((sum, day) => sum + number(day.downloads), 0);
}

async function collectGitHub() {
  return repos.map((repo) => {
    const fullName = `${owner}/${repo.name}`;
    const repository = ghJson(`/repos/${fullName}`);
    const canonicalFullName = repository.full_name ?? fullName;
    const views = ghJson(`/repos/${fullName}/traffic/views`);
    const clones = ghJson(`/repos/${fullName}/traffic/clones`);
    const referrers = ghJson(`/repos/${fullName}/traffic/popular/referrers`);
    const paths = ghJson(`/repos/${fullName}/traffic/popular/paths`);
    const openIssuesSearch = ghJson(
      `/search/issues?q=${encodeURIComponent(`repo:${canonicalFullName} is:issue is:open`)}&per_page=1`
    );

    return {
      owner,
      name: repository.name ?? repo.name,
      requestedName: repo.name,
      fullName: canonicalFullName,
      vertical: repo.vertical,
      role: repo.role,
      npm: repo.npm ?? null,
      strategic: Boolean(repo.strategic),
      url: repository.html_url ?? `https://github.com/${fullName}`,
      description: repository.description ?? null,
      stars: repository.stargazers_count ?? null,
      forks: repository.forks_count ?? null,
      subscribers: repository.subscribers_count ?? null,
      openIssues: openIssuesSearch.total_count ?? null,
      pushedAt: repository.pushed_at ?? null,
      traffic: {
        views: views.count ?? null,
        uniqueViews: views.uniques ?? null,
        clones: clones.count ?? null,
        uniqueCloners: clones.uniques ?? null,
        topReferrers: Array.isArray(referrers) ? referrers.slice(0, 5) : [],
        topPaths: Array.isArray(paths) ? paths.slice(0, 5) : []
      },
      errors: {
        repository: repository.error ?? null,
        views: views.error ?? null,
        clones: clones.error ?? null,
        referrers: referrers.error ?? null,
        paths: paths.error ?? null,
        openIssues: openIssuesSearch.error ?? null
      }
    };
  });
}

async function collectNpm() {
  const packages = [];

  for (const packageName of npmPackages) {
    const encoded = encodeURIComponent(packageName);
    const range = await fetchJson(`https://api.npmjs.org/downloads/range/last-month/${encoded}`);
    await sleep(500);
    const days = Array.isArray(range.downloads) ? range.downloads : [];

    packages.push({
      name: packageName,
      url: `https://www.npmjs.com/package/${packageName}`,
      downloadsLastDay: days.at(-1)?.downloads ?? null,
      downloads7d: sumDownloads(days.slice(-7)),
      downloads30d: sumDownloads(days),
      errors: {
        range: range.error ?? null
      }
    });
  }

  return packages;
}

function totalsFor(githubRepos, npmStats) {
  return {
    github: {
      stars: githubRepos.reduce((sum, repo) => sum + number(repo.stars), 0),
      forks: githubRepos.reduce((sum, repo) => sum + number(repo.forks), 0),
      views14d: githubRepos.reduce((sum, repo) => sum + number(repo.traffic.views), 0),
      uniqueViews14d: githubRepos.reduce((sum, repo) => sum + number(repo.traffic.uniqueViews), 0),
      clones14d: githubRepos.reduce((sum, repo) => sum + number(repo.traffic.clones), 0),
      uniqueCloners14d: githubRepos.reduce((sum, repo) => sum + number(repo.traffic.uniqueCloners), 0)
    },
    npm: {
      downloadsLastDay: npmStats.reduce((sum, pkg) => sum + number(pkg.downloadsLastDay), 0),
      downloads7d: npmStats.reduce((sum, pkg) => sum + number(pkg.downloads7d), 0),
      downloads30d: npmStats.reduce((sum, pkg) => sum + number(pkg.downloads30d), 0)
    }
  };
}

function markdown(snapshot, previous) {
  const previousTotals = previous?.totals;
  const topViewRepos = topItems(snapshot.github.repos, (repo) => repo.traffic.uniqueViews);
  const topCloneRepos = topItems(snapshot.github.repos, (repo) => repo.traffic.uniqueCloners);
  const topNpmPackages = topItems(snapshot.npm.packages, (pkg) => pkg.downloads7d);

  const repoRow = (repo) =>
    `| [${repo.name}](${repo.url}) | ${repo.vertical} | ${formatNumber(repo.stars)} | ${formatNumber(repo.forks)} | ${formatNumber(repo.traffic.views)} | ${formatNumber(repo.traffic.uniqueViews)} | ${formatNumber(repo.traffic.clones)} | ${formatNumber(repo.traffic.uniqueCloners)} |`;

  const packageRow = (pkg) =>
    `| [${pkg.name}](${pkg.url}) | ${formatNumber(pkg.downloadsLastDay)} | ${formatNumber(pkg.downloads7d)} | ${formatNumber(pkg.downloads30d)} |`;

  return `# Delx Open Source Growth Snapshot

Generated: ${snapshot.generatedAt}

GitHub traffic is a rolling 14-day window. npm downloads use the public npm downloads API. Snapshots are written locally under \`.growth-metrics/\`, which is intentionally gitignored.

## Totals

| Metric | Current | Delta vs previous snapshot |
|---|---:|---:|
| GitHub stars | ${formatNumber(snapshot.totals.github.stars)} | ${deltaLabel(snapshot.totals.github.stars, previousTotals?.github?.stars)} |
| GitHub forks | ${formatNumber(snapshot.totals.github.forks)} | ${deltaLabel(snapshot.totals.github.forks, previousTotals?.github?.forks)} |
| GitHub unique views, 14d | ${formatNumber(snapshot.totals.github.uniqueViews14d)} | ${deltaLabel(snapshot.totals.github.uniqueViews14d, previousTotals?.github?.uniqueViews14d)} |
| GitHub unique cloners, 14d | ${formatNumber(snapshot.totals.github.uniqueCloners14d)} | ${deltaLabel(snapshot.totals.github.uniqueCloners14d, previousTotals?.github?.uniqueCloners14d)} |
| npm downloads, last day | ${formatNumber(snapshot.totals.npm.downloadsLastDay)} | ${deltaLabel(snapshot.totals.npm.downloadsLastDay, previousTotals?.npm?.downloadsLastDay)} |
| npm downloads, 7d | ${formatNumber(snapshot.totals.npm.downloads7d)} | ${deltaLabel(snapshot.totals.npm.downloads7d, previousTotals?.npm?.downloads7d)} |
| npm downloads, 30d | ${formatNumber(snapshot.totals.npm.downloads30d)} | ${deltaLabel(snapshot.totals.npm.downloads30d, previousTotals?.npm?.downloads30d)} |

## Top Repos By Unique Views

| Repo | Vertical | Stars | Forks | Views | Unique views | Clones | Unique cloners |
|---|---|---:|---:|---:|---:|---:|---:|
${topViewRepos.map(repoRow).join("\n") || "| n/a | n/a | 0 | 0 | 0 | 0 | 0 | 0 |"}

## Top Repos By Unique Cloners

| Repo | Vertical | Stars | Forks | Views | Unique views | Clones | Unique cloners |
|---|---|---:|---:|---:|---:|---:|---:|
${topCloneRepos.map(repoRow).join("\n") || "| n/a | n/a | 0 | 0 | 0 | 0 | 0 | 0 |"}

## Top npm Packages

| Package | Last day | 7d | 30d |
|---|---:|---:|---:|
${topNpmPackages.map(packageRow).join("\n") || "| n/a | 0 | 0 | 0 |"}

## Action Loop

- Turn high-clone, low-star repos into public asks: stronger README CTA, pinned examples, X/Reddit follow-up, and one comment asking users to star if the project saved them time.
- Prioritize docs for repos with high unique cloners because those are real install attempts.
- Prioritize demos and screenshots for repos with high unique views but lower clones because those visitors need faster proof.
- Push directory submissions after each package has \`mcpName\`, \`server.json\`, install commands and a clear local-first privacy boundary.
`;
}

function packageByName(snapshot) {
  return new Map(snapshot.npm.packages.map((pkg) => [pkg.name, pkg]));
}

function repoDownloads7d(repo, packages) {
  return repo.npm ? number(packages.get(repo.npm)?.downloads7d) : 0;
}

function repoDownloads30d(repo, packages) {
  return repo.npm ? number(packages.get(repo.npm)?.downloads30d) : 0;
}

function tractionScore(repo, packages) {
  return number(repo.stars) * 10 + number(repo.forks) * 20 + repoDownloads7d(repo, packages);
}

function nextActionFor(repo, packages) {
  const downloads7d = repoDownloads7d(repo, packages);

  if (repo.role === "registry") {
    return "Keep the hub as the canonical map: release index, growth snapshot, directory links and first-install paths.";
  }

  if (repo.role === "meta-connector") {
    return "Promote as the default install path; add demos that show one question composed across multiple connectors.";
  }

  if (repo.role === "quality") {
    return "Use as the trust layer for every MCP repo; publish score examples and make bad scores actionable.";
  }

  if (repo.role === "agent-memory") {
    return "Package as reusable agent infrastructure; show privacy-safe memory examples for Claude, Cursor and Codex.";
  }

  if (downloads7d >= 100 && number(repo.stars) < 10) {
    return "High install intent but low public proof: improve above-the-fold CTA, examples and star ask.";
  }

  if (number(repo.stars) >= 10 && downloads7d < 100) {
    return "Discovery is working; improve install conversion with a shorter quickstart and troubleshooting path.";
  }

  if (number(repo.openIssues) > 0) {
    return "Triage open issues and convert recurring support questions into docs.";
  }

  return "Keep release hygiene strong and add one concrete agent workflow example.";
}

function publicStrategyMarkdown(snapshot) {
  const packages = packageByName(snapshot);
  const reposWithPublicSignals = snapshot.github.repos
    .filter((repo) => repo.strategic || number(repo.stars) > 0 || repoDownloads7d(repo, packages) > 0)
    .sort((a, b) => tractionScore(b, packages) - tractionScore(a, packages));

  const publicTotals = {
    stars: reposWithPublicSignals.reduce((sum, repo) => sum + number(repo.stars), 0),
    forks: reposWithPublicSignals.reduce((sum, repo) => sum + number(repo.forks), 0),
    openIssues: reposWithPublicSignals.reduce((sum, repo) => sum + number(repo.openIssues), 0),
    downloads7d: snapshot.npm.packages.reduce((sum, pkg) => sum + number(pkg.downloads7d), 0),
    downloads30d: snapshot.npm.packages.reduce((sum, pkg) => sum + number(pkg.downloads30d), 0)
  };

  const row = (repo) => {
    const pkg = repo.npm ? packages.get(repo.npm) : null;
    const packageCell = pkg ? `[${pkg.name}](${pkg.url})` : "—";

    return `| [${repo.name}](${repo.url}) | ${repo.role} | ${formatNumber(repo.stars)} | ${formatNumber(repo.forks)} | ${formatNumber(repo.openIssues)} | ${packageCell} | ${formatNumber(repoDownloads7d(repo, packages))} | ${formatNumber(repoDownloads30d(repo, packages))} | ${nextActionFor(repo, packages)} |`;
  };

  const topPackages = topItems(snapshot.npm.packages, (pkg) => pkg.downloads7d, 10);
  const packageRow = (pkg) =>
    `| [${pkg.name}](${pkg.url}) | ${formatNumber(pkg.downloadsLastDay)} | ${formatNumber(pkg.downloads7d)} | ${formatNumber(pkg.downloads30d)} |`;

  return `# Open Source Growth Snapshot

Generated: ${snapshot.generatedAt}

This public snapshot uses GitHub repository metadata and the public npm downloads API. Private GitHub traffic data stays local in \`.growth-metrics/latest.md\` and is not committed.

## Public Totals

| Metric | Value |
|---|---:|
| Tracked repos with public signals | ${formatNumber(reposWithPublicSignals.length)} |
| GitHub stars | ${formatNumber(publicTotals.stars)} |
| GitHub forks | ${formatNumber(publicTotals.forks)} |
| Open GitHub issues | ${formatNumber(publicTotals.openIssues)} |
| npm downloads, 7d | ${formatNumber(publicTotals.downloads7d)} |
| npm downloads, 30d | ${formatNumber(publicTotals.downloads30d)} |

## Focus Queue

| Repo | Role | Stars | Forks | Issues | npm package | 7d downloads | 30d downloads | Next action |
|---|---|---:|---:|---:|---|---:|---:|---|
${reposWithPublicSignals.map(row).join("\n") || "| n/a | n/a | 0 | 0 | 0 | — | 0 | 0 | Collect a fresh snapshot. |"}

## Top npm Packages

| Package | Last day | 7d | 30d |
|---|---:|---:|---:|
${topPackages.map(packageRow).join("\n") || "| n/a | 0 | 0 | 0 |"}

## Expansion Rules

- Treat stars as discovery proof, npm downloads as install intent and forks as builder intent.
- Promote repos with high downloads and low stars because they already solve a real install need but need clearer public proof.
- Improve repos with high stars and lower downloads by shortening setup, adding screenshots or publishing a runnable agent recipe.
- Keep the hub, release index and scorecard connected so a new visitor can evaluate trust without opening every repository.
`;
}

mkdirSync(snapshotDir, { recursive: true });

const date = localDate();
const snapshotPath = path.join(snapshotDir, `${date}.json`);
const previousPath = previousSnapshotPath(snapshotPath);
const previous = previousPath ? JSON.parse(readFileSync(previousPath, "utf8")) : null;

const githubRepos = await collectGitHub();
const npmStats = await collectNpm();
const snapshot = {
  generatedAt: new Date().toISOString(),
  timeZone,
  source: {
    github: "gh api /repos/:owner/:repo and /traffic endpoints",
    npm: "https://api.npmjs.org/downloads"
  },
  github: { repos: githubRepos },
  npm: { packages: npmStats },
  totals: totalsFor(githubRepos, npmStats)
};

writeFileSync(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
writeFileSync(path.join(snapshotRoot, "latest.md"), markdown(snapshot, previous));
writeFileSync(path.join(process.cwd(), "docs", "open-source-growth-snapshot.md"), publicStrategyMarkdown(snapshot));

console.log(`Wrote ${path.relative(process.cwd(), snapshotPath)}`);
console.log(`Wrote ${path.relative(process.cwd(), path.join(snapshotRoot, "latest.md"))}`);
console.log("Wrote docs/open-source-growth-snapshot.md");
console.log(`GitHub stars: ${formatNumber(snapshot.totals.github.stars)}`);
console.log(`GitHub unique views 14d: ${formatNumber(snapshot.totals.github.uniqueViews14d)}`);
console.log(`GitHub unique cloners 14d: ${formatNumber(snapshot.totals.github.uniqueCloners14d)}`);
console.log(`npm downloads 7d: ${formatNumber(snapshot.totals.npm.downloads7d)}`);
