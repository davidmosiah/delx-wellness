# Monthly authority scorecard

Machine-readable collector: `node scripts/authority-scorecard.mjs`.

Writes `.growth-metrics/authority/YYYY-MM.json` (gitignored with other growth
snapshots unless an owner commits a public copy).

## What it measures

| Field | Meaning | Counts as inbound of weight? |
|---|---|---|
| `external_issues_30d` | Issues opened by someone other than `davidmosiah` / bots | No (intent proxy) |
| `external_prs_30d` | Same for PRs | Only if merged and human |
| `stars` + `stars_delta` | GitHub stargazers | **No** — discovery |
| `npm_median_daily_30d` | Median of last-30 daily downloads | **No** — install proxy |
| `inbound_of_weight` | Manual list in this file / probe log | **Yes** |

Stars ≠ demand. A 1-day npm spike is discarded; the script uses **median**.

## How to run

```bash
cd delx-wellness
node scripts/authority-scorecard.mjs
```

Needs `gh` auth for issue/PR search. npm downloads are public.

## Manual inbound log (owner)

Record inbound-of-weight **here or in a private note**, never fabricate:

| date | class | public evidence |
|---|---|---|
| 2026-08-03 | external coverage | [@maxgow](https://github.com/maxgow) on google-health-mcp (counts as prior, before this runway) |
| 2026-08 (PR) | external PR shipped | [@jumpmanjay](https://github.com/jumpmanjay) headless OAuth → 0.7.3 (prior) |

New rows after 2026-08-12 close the [authority probe](./authority-probe.md).

## Cadence

First week of the month, 15 minutes, after the [weekly runbook](./maintainer-weekly-runbook.md).
