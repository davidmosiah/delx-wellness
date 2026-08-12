#!/usr/bin/env node
/**
 * Curl known public listing URLs. Does not submit anything (OSS-300 #54).
 */
const urls = [
  "https://github.com/davidmosiah/delx-wellness",
  "https://github.com/davidmosiah/google-health-mcp",
  "https://www.npmjs.com/package/google-health-mcp-unofficial",
  "https://www.npmjs.com/package/delx-living-body",
  "https://www.npmjs.com/package/wellness-nourish",
  "https://www.npmjs.com/package/delx-memory",
  "https://www.npmjs.com/package/mcp-scorecard",
  "https://wellness.delx.ai"
];

const rows = [];
for (const url of urls) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "user-agent": "delx-listed-check/1.0" },
      signal: AbortSignal.timeout(15_000)
    });
    // npm/GitHub often 403 HEAD to bots; treat 2xx/3xx/403 as "URL exists".
    const reachable = res.ok || res.status === 403 || (res.status >= 300 && res.status < 400);
    rows.push({ url, status: res.status, ok: reachable });
  } catch (error) {
    rows.push({ url, status: null, ok: false, error: String(error).slice(0, 200) });
  }
}

const out = {
  generated_at: new Date().toISOString(),
  note: "HEAD status only. Not a popularity metric. Directory PRs still need owner OK.",
  rows
};
process.stdout.write(`${JSON.stringify(out, null, 2)}\n`);
const failed = rows.filter((r) => !r.ok);
process.exit(failed.length ? 1 : 0);
