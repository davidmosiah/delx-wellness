# OSS-300 inventory (frozen)

Frozen 2026-08-06 for the OSS **strategy** improvement campaign (session “mais 100 melhoras”).
Exactly **100** items. No boring-apps, ASA, MannaCup, or private-only product work.

Prior campaigns:

- [oss-100-inventory.md](./oss-100-inventory.md) — closed (package hygiene + series ship)
- [oss-200-inventory.md](./oss-200-inventory.md) — process/ADR/proof/SLA (**closed** 2026-08-06; 4 BLOCKED-EXTERNAL remain)

This list is **deeper strategy**: authority probe, contract stability, composition,
ecosystem federation, privacy, discoverability, commercial honesty, anti-sprawl
enforcement — not a re-run of OSS-100 or OSS-200 rows.

Columns: `id | package | critical | theme | outcome`

Themes: `authority` · `contract` · `compose` · `peer` · `privacy` · `discover` ·
`commerce` · `scorecard` · `longtail` · `ops` · `govern` · `engine` · `protocol` ·
`antisprawl` · `metrics`

| id | package | critical | theme | outcome |
|---:|---|:---:|---|---|
| 1 | delx-wellness | Y | authority | Written definition of “inbound of weight” with examples (job/partner/collab) vs vanity |
| 2 | delx-wellness | Y | authority | Public runway doc: authority probe ends 2026-09-30 — what counts as success/fail |
| 3 | delx-wellness | Y | metrics | Monthly authority scorecard: external issues/PRs, median npm, stars delta, DMs logged (no bots) |
| 4 | delx-wellness |  | authority | Single place (hub) listing real external humans who shipped/used (permission-gated quotes) |
| 5 | google-health-mcp | Y | authority | Close proof-loop #21 path: if no 2nd report by 2026-08-12, publish honest “1/2” status + next criteria |
| 6 | google-health-mcp |  | authority | Contributor map: headless OAuth (@jumpmanjay) + coverage (@maxgow) credited without overclaim |
| 7 | delx-wellness |  | authority | “When to DM Anthropic/MCP teams” decision tree (only after real inbound, never cold spray) |
| 8 | delx-wellness |  | authority | Archive note for Show HN / leaderboard push: re-entry conditions only |
| 9 | delx-wellness |  | metrics | Ignore-one-day-spike rule operationalized in growth scripts (median ≥7d required) |
| 10 | delx-wellness |  | metrics | Stars≠demand disclaimer on every growth snapshot |
| 11 | delx-wellness | Y | contract | Semver policy for agent-safe-series: which field bumps minor vs major |
| 12 | delx-mcp-kit | Y | contract | Publish agent-safe-series types as versioned export when ≥2 consumers import |
| 13 | mcp-scorecard | Y | contract | contract_version required on tools matching *_series / stream naming |
| 14 | mcp-scorecard |  | contract | Schema property max_points required (not only description regex) for dense tools |
| 15 | delx-wellness |  | contract | Compatibility window: keep prior series major readable ≥1 minor after bump |
| 16 | garmin-mcp |  | contract | Golden fixture: series envelope fields stable across 0.7.x patches |
| 17 | strava-mcp |  | contract | Golden fixture: activity_series envelope parity with garmin field names where shared |
| 18 | fitbit-mcp |  | contract | Golden fixture: heart_series resolution honesty (1sec vs 1min app types) |
| 19 | polar-mcp |  | contract | Golden fixture: continuous sample series caps |
| 20 | delx-wellness |  | contract | “Breaking change” checklist for any connector that agents pin |
| 21 | delx-living-body | Y | compose | Public compose matrix: which child tools are series-preferring vs summary-only |
| 22 | delx-living-body | Y | compose | Document failure modes when child pin drifts from hermes release-index |
| 23 | delx-living-body |  | compose | Series-mode counter + optional debug tool for operators (no PHI) |
| 24 | wellness-nourish | Y | compose | Wearable_context schema: fields accepted from WHOOP/Garmin/Strava without inventing |
| 25 | wellness-nourish |  | compose | Smoke: recovery/strain → meal suggest path with synthetic wearable_context |
| 26 | exercise-catalog-mcp |  | compose | Handoff contract note: nourish ↔ exercise-catalog IDs or honest none |
| 27 | delx-wellness |  | compose | “One agent, many connectors” recipe: Claude Desktop config snippet top3 only |
| 28 | delx-wellness-hermes |  | compose | Preset “body+nutrition” vs “training” vs “sleep” documented without new packages |
| 29 | whoop-mcp |  | compose | recovery → living-body input mapping note (if used) |
| 30 | google-health-mcp |  | compose | When GH is enough vs when to add a brand connector (decision doc) |
| 31 | garmin-mcp | Y | peer | Kindred #19 design log: open questions remaining + what we will not implement |
| 32 | delx-wellness | Y | peer | Peer federation page: how external local-first health MCPs interoperate on series |
| 33 | garmin-mcp |  | peer | Shared fixture format proposal (markdown issue) for cross-repo CI without monorepo |
| 34 | delx-wellness |  | peer | “How to propose a series field” template for peers (not just Kindred) |
| 35 | google-health-mcp |  | peer | Optional peer invite process for coverage (account-gated, no pressure) |
| 36 | delx-wellness |  | peer | Related-works section standard for top5 READMEs (upstream APIs + peers) |
| 37 | mcp-scorecard |  | peer | Scorecard can audit third-party series tools (document CLI path) |
| 38 | delx-wellness |  | peer | Monthly peer scan: 30 min, log new local-first health MCPs, no clone |
| 39 | delx-wellness | Y | privacy | PHI/PII redaction standard for issue screenshots and coverage reports |
| 40 | google-health-mcp | Y | privacy | Coverage report template: allowed fields / forbidden raw payloads |
| 41 | delx-wellness |  | privacy | SECURITY.md fleet: token storage, log scrubbing, no cloud default |
| 42 | delx-memory |  | privacy | Secret-blocking CI receipt linked from hub privacy model |
| 43 | delx-wellness |  | privacy | “Local-first” claim checklist: what never leaves the machine |
| 44 | whoop-mcp |  | privacy | API JSON boundary: raw export = user explicit only |
| 45 | wellness-nourish |  | privacy | Local DB path + wipe path above-the-fold |
| 46 | delx-wellness |  | privacy | Incident response stub for leaked token in public issue |
| 47 | google-health-mcp |  | privacy | Scope minimization guide: clinical vs wellness scopes |
| 48 | delx-wellness |  | privacy | No training-on-user-data claim language for all connectors |
| 49 | delx-wellness | Y | discover | Official MCP registry (server.json) status matrix for top5 |
| 50 | delx-wellness |  | discover | llms.txt parity audit top5 + hub |
| 51 | delx-wellness |  | discover | npm keywords + description SEO without keyword stuffing |
| 52 | delx-wellness |  | discover | GitHub topics standard: mcp, model-context-protocol, wellness, local-first |
| 53 | delx-wellness | Y | discover | Directory PR batch process: prepare all, submit only with OK |
| 54 | delx-wellness |  | discover | “Where Delx is listed” auto-check script (curl status of known URLs) |
| 55 | google-health-mcp |  | discover | Hero README: 30s install + first tool call above fold (no essay) |
| 56 | delx-wellness |  | discover | Hub homepage: top5 only; long-tail collapsed |
| 57 | mcp-leaderboard |  | discover | If alive: re-score top5 with current scorecard; if dead: archive badge |
| 58 | delx-wellness |  | discover | ClawHub / skill directory honesty: which skills exist vs stale |
| 59 | delx-wellness | Y | commerce | Support menu: free OSS vs paid concierge — one page, no paywall on protocol |
| 60 | delx-wellness |  | commerce | mcp-scorecard “Pro” remains frozen until written demand exists |
| 61 | delx-agent-utilities |  | commerce | Paid receipt path docs only for routes that already converted |
| 62 | delx-wellness |  | commerce | Setup help FAQ: what we answer free on GitHub vs not |
| 63 | delx-wellness |  | commerce | Explicit non-goals: hosted OAuth farm, multi-tenant health cloud |
| 64 | delx-wellness |  | commerce | x402 wellness SKUs: only if margin + dogfood; else leave Commerce experiment alone |
| 65 | mcp-scorecard | Y | scorecard | Top5 CI must fail below 90 (or document waiver with expiry) |
| 66 | mcp-scorecard |  | scorecard | Export machine-readable receipt JSON per package for hub links |
| 67 | mcp-scorecard |  | scorecard | Wellness profile: series caps + demo-contract + privacy checks weighted |
| 68 | delx-wellness |  | scorecard | Scorecard matrix page regenerated after each top5 release |
| 69 | mcp-scorecard |  | scorecard | Document how to run scorecard on a peer’s MCP without publishing their secrets |
| 70 | delx-wellness |  | scorecard | Badge SVG/CDN policy: only after green CI, never manual forever-green |
| 71 | apple-health-mcp |  | longtail | Honest status: series path exists or explicit gap; no feature invent |
| 72 | samsung-health-mcp |  | longtail | CSV/export gap inventory vs marketed tools |
| 73 | eight-sleep-mcp |  | longtail | Mutation gate + demo note; no “full smart bed” overclaim |
| 74 | wellness-cgm-mcp |  | longtail | glucose_series policy: implement only if agent demand documented |
| 75 | oura-mcp |  | longtail | HR list envelope caps parity with series vendors or honest summary-only |
| 76 | withings-mcp |  | longtail | Empty export behavior regression test |
| 77 | exercise-catalog-mcp |  | longtail | Scorecard + first-call README or mark maintenance-only |
| 78 | delx-wellness |  | longtail | Archive/unsupported connector list with last-good version |
| 79 | delx-wellness | Y | ops | Maintainer runbook: 15–30 min weekly top5 triage (issues/PRs only) |
| 80 | delx-wellness |  | ops | Release checklist single file used by all top5 (tag, GH release, pins, scorecard) |
| 81 | delx-wellness-hermes |  | ops | Pin matrix job: hermes presets == npm view == release-index |
| 82 | delx-wellness |  | ops | Dependabot high-only: monthly batch owner + max open PRs |
| 83 | delx-wellness |  | ops | npm audit --production on publish path for top5 |
| 84 | delx-wellness |  | ops | Fleet version matrix script output committed or CI artifact |
| 85 | delx-wellness |  | ops | Branch protection / required checks note for top5 (what exists today) |
| 86 | delx-wellness |  | ops | Stale-issue policy: human SLA 48h first reply; auto-close only with warning |
| 87 | delx-wellness | Y | govern | CODE_OF_CONDUCT present and linked on top5 + hub |
| 88 | delx-wellness |  | govern | CONTRIBUTING: series contract changes need fixture + scorecard |
| 89 | delx-wellness |  | govern | SECURITY contact path (email or GH private security advisories) |
| 90 | delx-wellness |  | govern | Issue templates: bug (redacted), coverage, feature (must show agent demand) |
| 91 | creative-forge | Y | engine | Root 5-min demo path green; rights gate + PAUSED-only in CONTRIBUTING |
| 92 | creative-forge |  | engine | OSS vs creative-forge-private boundary banner (no private ops leakage) |
| 93 | short-video-agent-kit |  | engine | dry-run default shouted; publish path separate and gated |
| 94 | uap-pulse |  | engine | Cultural archive / not-proof banner durable |
| 95 | agents-that-ship |  | engine | Link OSS MCP release contract from hub ops |
| 96 | delx-mcp-server |  | protocol | Public README: Protocol/witness free forever; never paywall care |
| 97 | delx-mcp-a2a-oss |  | protocol | Boundary doc: A2A OSS vs private platform; what outsiders can run |
| 98 | delx-wellness | Y | antisprawl | Kill criteria: new connector requires named external requester + use case |
| 99 | delx-wellness | Y | antisprawl | Kill criteria: no “100 README polish” sprints without proof/inbound |
| 100 | delx-wellness | Y | antisprawl | Freeze policy refresh: top5 locked until #21 proof loop + demos + directory OK resolved or re-dated |

## Strategy-critical (critical=Y)

Must end DONE-shipped / DONE-already on the local path when a ship campaign runs.
External-only slices (live coverage human, directory PR, public post, peer OK) may remain
BLOCKED-EXTERNAL with local prep complete.

## Anti-duplication notes

- Do not re-list OSS-100 demo/README first-call items already shipped.
- Do not re-list OSS-200 ADR/agent-safe-series.md/policies 95–100 as new work — reference them.
- Prefer **enforcement, instrumentation, federation, authority probe** over more process docs.
