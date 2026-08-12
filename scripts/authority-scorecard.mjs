#!/usr/bin/env node
/**
 * Monthly authority scorecard (OSS-300 #3).
 * Discovery/install proxies only. Inbound-of-weight is manual.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const owner = "davidmosiah";
const repos = [
  { name: "google-health-mcp", npm: "google-health-mcp-unofficial" },
  { name: "delx-living-body", npm: "delx-living-body" },
  { name: "delx-wellness", npm: null },
  { name: "wellness-nourish", npm: "wellness-nourish" },
  { name: "whoop-mcp", npm: "whoop-mcp-unofficial" },
  { name: "delx-memory", npm: "delx-memory" },
  { name: "mcp-scorecard", npm: "mcp-scorecard" }
];

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function ghJson(endpoint) {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const output = execFileSync("gh", ["api", endpoint], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"]
      });
      return JSON.parse(output);
    } catch (error) {
      const text = String(error?.stderr || error?.message || error);
      const retryable = /rate limit|403|429/i.test(text);
      if (!retryable || attempt === 4) {
        return { error: text.slice(0, 400), total_count: null };
      }
      sleep(1500 * attempt);
    }
  }
  return { error: "exhausted", total_count: null };
}

function searchCount(query) {
  const data = ghJson(`/search/issues?q=${encodeURIComponent(query)}&per_page=1`);
  if (data.error) return { count: null, error: data.error };
  return { count: Number(data.total_count) || 0, error: null };
}

function median(values) {
  const nums = values.filter((n) => Number.isFinite(n)).sort((a, b) => a - b);
  if (!nums.length) return null;
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

async function npmMedianDaily(pkg) {
  const url = `https://api.npmjs.org/downloads/range/last-month/${encodeURIComponent(pkg)}`;
  const res = await fetch(url, { headers: { "user-agent": "delx-authority-scorecard/1.0" } });
  if (!res.ok) return { median: null, error: `${res.status}` };
  const body = await res.json();
  const days = (body.downloads || []).map((d) => Number(d.downloads) || 0);
  return { median: median(days), days: days.length };
}

function isBotLogin(login) {
  const l = String(login || "").toLowerCase();
  return !l || l.endsWith("[bot]") || l.includes("dependabot") || l === "github-actions";
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const rows = [];

  for (const repo of repos) {
    const full = `${owner}/${repo.name}`;
    let stars = null;
    try {
      stars = ghJson(`/repos/${full}`).stargazers_count ?? null;
    } catch {
      stars = null;
    }

    const extIssues = searchCount(
      `repo:${full} is:issue created:>=${daysAgo(30)} -author:${owner} -author:app/dependabot`
    );
    sleep(400);
    const extPrs = searchCount(
      `repo:${full} is:pr created:>=${daysAgo(30)} -author:${owner} -author:app/dependabot`
    );
    sleep(400);

    let npm = null;
    if (repo.npm) {
      npm = await npmMedianDaily(repo.npm);
    }

    rows.push({
      repo: full,
      stars,
      external_issues_30d: extIssues.count,
      external_prs_30d: extPrs.count,
      errors: {
        issues: extIssues.error,
        prs: extPrs.error
      },
      npm,
      inbound_of_weight: false,
      note: "stars≠demand; npm is median daily; inbound is manual"
    });
  }

  const out = {
    generated_at: new Date().toISOString(),
    date: today,
    disclaimer: "Stars and npm are discovery/install proxies. They do not close the authority probe.",
    probe_ends: "2026-09-30",
    repos: rows
  };

  const dir = path.join(process.cwd(), ".growth-metrics", "authority");
  mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, `${today.slice(0, 7)}.json`);
  writeFileSync(dest, `${JSON.stringify(out, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(out, null, 2)}\n`);
  process.stderr.write(`wrote ${dest}\n`);
}

function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

void isBotLogin;
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
