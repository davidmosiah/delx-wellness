# Google Health OSS Proof Loop (0.5.4)

Goal: turn the existing Google Health discovery signal into real-account
validation and repeat participation around
`google-health-mcp-unofficial@0.5.4`.

The filename is retained so existing links to the original 0.5.1 distribution
asset do not break. Live npm: **0.5.4** (2026-07-30). Last fully verified
GitHub Release on the hub index: **v0.5.3** (cut GH `v0.5.4` when ready).

## Experiment Contract

- **Window:** 2026-07-13 through 2026-08-12.
- **Baseline (loop start):** 23 stars, 198 unique visitors, 84 unique cloners and
  142 unique Google referrals in the preceding 14-day GitHub traffic window;
  coverage issue #3 had zero external comments.
- **Live snapshot 2026-07-30:** **33★** on `google-health-mcp` (portfolio magnet);
  npm `0.5.4` shipped; external issue
  [#15](https://github.com/davidmosiah/google-health-mcp/issues/15)
  (`nutrition-log` daily_rollup default `page_size`) fixed and closed.
  Coverage issue [#3](https://github.com/davidmosiah/google-health-mcp/issues/3)
  still has **no** external redacted `coverage --live --json` report.
- **Success:** two independent external users post redacted real-account
  coverage reports and at least one returns for a second interaction.
- **Stop:** if the success condition is not met by 2026-08-12, close the loop
  without extension and leave the portfolio slot empty.
- **Negative scope:** no new repo, connector feature, directory target,
  leaderboard work, billing work or evidence-free redesign.

This proof loop sends people to one simple action after OAuth setup:

```bash
npx -y google-health-mcp-unofficial coverage --live --json
```

Before OAuth, the static preflight remains available:

```bash
npx -y google-health-mcp-unofficial coverage --json
```

The strongest public ask is not "try my repo". It is:

> If you have Fitbit, Pixel Watch, Android health data, or Google Health API v4
> access, run a read-only coverage check and help validate the new Google
> Health data-type surface for agents.

## Proof Points

- npm: `google-health-mcp-unofficial@0.5.4` (shipped 2026-07-30; commit `ae76359`)
- Prior verified GitHub Release: https://github.com/davidmosiah/google-health-mcp/releases/tag/v0.5.3
- Coverage doc: https://github.com/davidmosiah/google-health-mcp/blob/main/docs/data-coverage.md
- Beta feedback guide: https://github.com/davidmosiah/google-health-mcp/blob/main/docs/beta-feedback.md
- Issue for live reports: https://github.com/davidmosiah/google-health-mcp/issues/3
- Recent external bug fixed: https://github.com/davidmosiah/google-health-mcp/issues/15
- Hub release index: https://github.com/davidmosiah/delx-wellness/blob/main/docs/release-index.md

## Target Audiences

| Audience | Why it matters | Primary CTA |
|---|---|---|
| Fitbit migration builders | Google Health is replacing the long-term Fitbit integration path for many workflows | Run coverage and report which data types work |
| Pixel Watch / Android users | They can validate wearable and Google-source families | Share redacted `coverage --live --json` output |
| MCP builders | They care about installability, schemas and safe agent workflows | Star the repo and test the MCP tool |
| Health-agent builders | They need read-only body context without hosted token custody | Try `delx-living-body` and one provider connector |
| Directory maintainers | They can improve discovery for public MCP packages | List the package with local-first privacy notes |

## One-Line Positioning

Google Health MCP is a local-first MCP server that lets Claude, Cursor, Codex,
Hermes, OpenClaw and other agents read user-authorized Google Health API v4 data
through safe tools while OAuth tokens stay on the user's machine.

## Short Post

```text
Shipped google-health-mcp-unofficial@0.5.4.

It keeps the read-only Google Health API v4 coverage harness for agents and
fixes daily_rollup for nutrition-log (default page_size now respects Google's
90-day cap):

  npx -y google-health-mcp-unofficial@0.5.4 coverage --json

After OAuth, testers can run:

  npx -y google-health-mcp-unofficial@0.5.4 coverage --live --json

The report is designed for public issue comments: no raw health payloads, no
OAuth secrets, no local paths, only operation status and point-count buckets.

Looking for Fitbit / Pixel Watch / Android / Google Health API v4 testers:
https://github.com/davidmosiah/google-health-mcp/issues/3
```

## Technical Post

```text
I am looking for Google Health API v4 testers for an open-source MCP server.

The 0.5.4 line includes:
- a 39-type Google Health data-type catalog
- MCP tool: google_health_data_type_coverage
- CLI: google-health-mcp-unofficial coverage --live --json
- nutrition-log daily_rollup defaults clamped to Google's per-type duration caps
- redaction tests that prevent OAuth secrets, local paths and example health
  values from leaking into public reports

Repo:
https://github.com/davidmosiah/google-health-mcp

Live report issue:
https://github.com/davidmosiah/google-health-mcp/issues/3

This is not medical advice and not affiliated with Google or Fitbit. It is
local-first infrastructure for agents that need user-authorized body context.
```

## Directory Submission Copy

```text
Google Health MCP is a local-first MCP server for Google Health API v4. It lets
Claude, Codex, Cursor, Hermes, OpenClaw and other MCP-compatible agents inspect
user-authorized identity, profile, settings, data points, reconciled streams,
rollups and daily/weekly summaries while OAuth tokens stay on the user's
machine.

Install:
npx -y google-health-mcp-unofficial@0.5.4 setup

Coverage validation:
npx -y google-health-mcp-unofficial@0.5.4 coverage --json

Docs:
https://github.com/davidmosiah/google-health-mcp

Package:
https://www.npmjs.com/package/google-health-mcp-unofficial
```

## 30-Day Proof Loop

- Day 1: align the Google Health README, GitHub profile and profile pins to issue #3.
- Day 1: record the live baseline and stop new directory expansion.
- Weekly: recheck issue #3 for external reports and answer actionable setup blockers.
- First external report: verify redaction, reproduce the result when possible,
  and turn the finding into a field note or release proof without exposing health data.
- Second interaction: record the return event in the portfolio source of truth.
- 2026-08-12: execute the verdict exactly as written; do not substitute stars,
  npm spikes or automated clones for human validation.

## Guardrails

- Do not post raw personal health measurements.
- Do not ask users to paste token files, OAuth secrets, local config paths or screenshots with account details.
- Do not imply affiliation with Google, Fitbit or Alphabet.
- Do not claim medical, diagnostic or treatment value.
- Keep the ask technical: coverage validation, setup friction and agent-readiness feedback.
