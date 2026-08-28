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
| 2026-08-08 | external PR shipped | [@oysteinhagenpettersen](https://github.com/oysteinhagenpettersen) [garmin-mcp#20](https://github.com/davidmosiah/garmin-mcp/pull/20) Body Battery 404 → 0.7.2 (prior to runway) |
| 2026-08-13 | partner / collab | [@shkyyy18](https://github.com/shkyyy18) Kindred [`mi-fitness-data-bridge` v0.3.0](https://github.com/shkyyy18/mi-fitness-data-bridge) ships `agent-safe-series/v1` + reciprocal README. Design log: [garmin-mcp#19](https://github.com/davidmosiah/garmin-mcp/issues/19). Cross-link OK: [shkyyy18/mi-fitness-data-bridge#8](https://github.com/shkyyy18/mi-fitness-data-bridge/issues/8). **This row closes the probe success criterion.** |

New rows after 2026-08-12 close the [authority probe](./authority-probe.md). The 2026-08-13 Kindred row is that event. Runway still ends 2026-09-30; no megaphone.

Does **not** count (logged so we do not “forget” them into the table later):

- [delx-wellness-hermes#5](https://github.com/davidmosiah/delx-wellness-hermes/issues/5) Peloton (2026-08-24) — named connector request, replied, no ETA, no unofficial contract from the requester yet.
- Stars, forks, npm spikes, Dependabot, our own comments.

## Cadence

First week of the month, 15 minutes, after the [weekly runbook](./maintainer-weekly-runbook.md).
