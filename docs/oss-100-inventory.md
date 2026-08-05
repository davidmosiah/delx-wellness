# OSS-100 inventory (frozen)

Frozen 2026-08-05 for the OSS-only improvement campaign. Exactly **100** items.  
No boring-apps, ASA, MannaCup, or private-only product work.

Columns: `id | package | p0 | outcome | disposition | proof`

Disposition values: `PENDING` | `DONE-shipped` | `DONE-already` | `BLOCKED-EXTERNAL`

| id | package | p0 | outcome |
|---:|---|:---:|---|
| 1 | google-health-mcp | Y | Local prep for 2nd coverage report (#21): template + CLI flags + issue status |
| 2 | google-health-mcp | Y | Headless auth 60s walkthrough docs (#22) |
| 3 | google-health-mcp | | Beta-testers issue #2 updated for 0.7.3 reality |
| 4 | google-health-mcp | | Demo-contract gate (anti demo-drift) |
| 5 | google-health-mcp | | FAQ first agent call PT+EN in README |
| 6 | google-health-mcp | | Scorecard ≥90 CI badge or workflow note in README |
| 7 | google-health-mcp | | Coverage CLI booleans-only privacy default documented/enforced |
| 8 | google-health-mcp | | Clinical scope preset docs + smoke path |
| 9 | google-health-mcp | | Honest gap: no dense series without real need (doc) |
| 10 | google-health-mcp | | Issue template coverage report |
| 11 | google-health-mcp | | Connector packageVersion pins aligned to npm |
| 12 | google-health-mcp | | llms.txt agent discoverability present |
| 13 | google-health-mcp | | CHANGELOG linked from releases/docs |
| 14 | google-health-mcp | | Dependabot/security note or green check |
| 15 | google-health-mcp | | server.json MCP registry version sync |
| 16 | google-health-mcp | | Synthetic multi-day rollup regression fixture/test |
| 17 | google-health-mcp | | Witness invite path documented (no bot) |
| 18 | google-health-mcp | | Growth post: blocked without explicit OK → process doc |
| 19 | delx-wellness | Y | registry.json single source for public connector data |
| 20 | delx-wellness | | Directory/awesome-list submission checklist (OK-gated) |
| 21 | delx-wellness | | Distribution sprint issue #13 closed or rewritten |
| 22 | delx-wellness | Y | Release index pins garmin 0.7.1 strava/fitbit 0.6.0 gh 0.7.3 |
| 23 | delx-wellness | | Growth snapshot script/doc for npm+stars |
| 24 | delx-wellness | | Honest-growth playbook CTA cadence |
| 25 | delx-wellness | | Connector cards first agent call |
| 26 | delx-wellness | | Scorecard link per connector |
| 27 | delx-wellness | | npm version badges on registry surface |
| 28 | delx-wellness | | Kindred related link only if OK (process) |
| 29 | delx-wellness | | Archive/unsupported connectors honesty |
| 30 | delx-wellness | | Open-source growth snapshot without fabricated metrics |
| 31 | delx-wellness-hermes | Y | Pin series packages + google-health 0.7.3 |
| 32 | delx-wellness-hermes | | Skill: series > raw streams |
| 33 | delx-wellness-hermes | | Setup dry-run without real token docs |
| 34 | delx-wellness-hermes | | First useful prompt per connector |
| 35 | delx-wellness-openclaw | | Dormant gateway state explicit in README |
| 36 | delx-wellness-hermes | | One-command setup connection_status path |
| 37 | delx-wellness-hermes | | living-body pin 0.3.4 aligned |
| 38 | delx-wellness-hermes | | Changelog when connector major bumps |
| 39 | delx-wellness-hermes | | Sampling disabled default documented |
| 40 | delx-wellness-hermes | | hermes mcp test docs |
| 41 | wellness-nourish | Y | Agent-first first meal in 2 minutes docs |
| 42 | wellness-nourish | | Demo-contract gate or proof exists |
| 43 | wellness-nourish | | Pairing load → meal suggest smoke/docs |
| 44 | wellness-nourish | | Barcode error states honesty |
| 45 | wellness-nourish | | Photo USER_ACTION_REQUIRED path |
| 46 | wellness-nourish | | pt-BR food locale notes |
| 47 | wellness-nourish | | Agent manifest first_calls aligned |
| 48 | wellness-nourish | | Scorecard CI note |
| 49 | wellness-nourish | | USDA fixture regression path |
| 50 | wellness-nourish | | exercise-catalog handoff contract note |
| 51 | whoop-mcp | Y | README recovery demo (synthetic if no device) |
| 52 | whoop-mcp | | Explicit no 1 Hz stream API limit |
| 53 | whoop-mcp | | Demo-contract gate or proof |
| 54 | whoop-mcp | | data_quality on summaries |
| 55 | whoop-mcp | | Scorecard CI note |
| 56 | whoop-mcp | | Hermes skill recovery first call |
| 57 | whoop-mcp | | Privacy raw = API JSON boundary |
| 58 | whoop-mcp | | Security/deps note |
| 59 | garmin-mcp | Y | README daily-brief demo (#15) |
| 60 | garmin-mcp | | #19 status + Kindred/0.7.1 links |
| 61 | garmin-mcp | | series start_offset zoom (or doc backlog closed as shipped baseline) |
| 62 | garmin-mcp | | multi-metric series note/doc |
| 63 | delx-mcp-kit | | series shaper export plan or first export |
| 64 | garmin-mcp | | package-lock version hygiene |
| 65 | garmin-mcp | | Dependabot note |
| 66 | garmin-mcp | | Fixture port note for Kindred |
| 67 | garmin-mcp | | demo-contract green proof |
| 68 | garmin-mcp | | npm downloads badge |
| 69 | strava-mcp | | README first call activity_series |
| 70 | strava-mcp | | Synthetic activity demo in README |
| 71 | strava-mcp | | multi-key series note |
| 72 | fitbit-mcp | | README first call heart_series |
| 73 | fitbit-mcp | | 1sec app-type limit docs |
| 74 | fitbit-mcp | | full-day 1min fixture CI proof |
| 75 | strava-mcp | | scorecard CI note |
| 76 | delx-wellness-hermes | Y | hermes pins strava/fitbit 0.6.0 |
| 77 | polar-mcp | Y | agent-safe-series on continuous samples |
| 78 | polar-mcp | | data_quality on summaries |
| 79 | oura-mcp | | heartrate list cap/envelope |
| 80 | withings-mcp | | empty export warn docs/behavior |
| 81 | apple-health-mcp | | series path if samples exist or honest gap |
| 82 | samsung-health-mcp | | inventory honesty vs CSV gaps |
| 83 | eight-sleep-mcp | | mutation gate docs + demo note |
| 84 | wellness-cgm-mcp | | glucose_series envelope or honest dense path |
| 85 | delx-mcp-kit | | buildAgentSafeSeries types export |
| 86 | mcp-scorecard | | dense tool without max_points check |
| 87 | mcp-scorecard | | badge/README generator note |
| 88 | delx-living-body | | synthesizer prefers series tools |
| 89 | delx-living-body | | capabilities smoke schemas green |
| 90 | delx-memory | | secret-blocking write tests/docs |
| 91 | creative-forge | | 5-min demo path docs |
| 92 | creative-forge | | rights gate + receipt path docs |
| 93 | creative-forge | | PAUSED-only publish fail-closed docs |
| 94 | creative-forge | | agent-ready first call README |
| 95 | creative-forge | | OSS vs private separation note |
| 96 | agents-that-ship | | OSS MCP release contract page |
| 97 | delx-agent-utilities | | discovery + receipt path docs |
| 98 | short-video-agent-kit | | dry-run default shouted in README |
| 99 | uap-pulse | | not-proof / cultural archive banner |
| 100 | oss-community | Y | Human-response SLA process for top OSS issues |

## Notes
- P0 rows must end DONE-shipped or DONE-already (except true external-only slices of #1 live second coverage).
- Public posts / awesome-list PRs require user OK → BLOCKED-EXTERNAL with local checklist complete.
