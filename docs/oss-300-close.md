# OSS-300 close notes (local path)

Decision + pointer file so remaining inventory rows are checkable without a 100-doc sprint.

## Authority

| id | Close |
|---|---|
| 4 | Quotes page: **none approved**. [human-quote-permission.md](./human-quote-permission.md). Do not invent testimonials. |
| 6 | Credits without overclaim: [@maxgow](https://github.com/maxgow) = one live coverage report → v0.7.2 fixes. [@jumpmanjay](https://github.com/jumpmanjay) = headless OAuth → v0.7.3. Not “validated on all devices.” |
| 7 | DM Anthropic/MCP teams **only after** an inbound-of-weight event ([authority-probe.md](./authority-probe.md)). Never cold spray. |
| 8 | Show HN / leaderboard push stay archived. Re-entry: written owner OK + a real inbound event already logged. |

## Contract / compose / peer

| id | Close |
|---|---|
| 12 | `delx-mcp-kit` already exports series types (`export * from "./series.js"`). Consumers: google-health-mcp, whoop-mcp. |
| 15 | Compat window: [agent-safe-series.md](./agent-safe-series.md) semver — prior major readable ≥1 minor. |
| 16–19 | Golden fixtures: garmin/strava `scripts/synthetic-series-fixture.mjs`; fitbit/polar ship `*_series` + same envelope. Shared Kindred ride profile documented in garmin fixture header. |
| 20 | Breaking change for pinned connectors: fixture + scorecard + registry/hermes pin in the **same** PR. See CONTRIBUTING. |
| 26 | nourish ↔ exercise-catalog: **no shared IDs**. Honest none. |
| 27 | One agent, many connectors: top3 only — living-body + google-health + nourish. Snippet in README front door. |
| 28 | Hermes presets already split body / nutrition / training / sleep in the pack. No new packages. |
| 29 | WHOOP recovery → living-body: `whoop_wellness_context` / `whoop_daily_summary` only (no series). |
| 30 | Google Health is enough when the user lives in Fitbit/Pixel/Health Connect. Add a brand connector only for a vendor-only metric (Body Battery, WHOOP strain, Strava effort). |
| 32–34 | Peers interop on [agent-safe-series/v1](./agent-safe-series.md). Propose a field: issue with fixture + why agents need it. Template: [builder-series-review-template.md](./builder-series-review-template.md). |
| 35 | Coverage invite: optional, account-gated, no pressure — [google-health-mcp#2](https://github.com/davidmosiah/google-health-mcp/issues/2). |
| 36 | Related-works: upstream API + peers (Kindred, etc.) in top READMEs; do not claim affiliation. |
| 37 | Peer audit: `npx -y mcp-scorecard --path /path/to/their/server` — no secrets. [scorecard-receipts.md](./scorecard-receipts.md). |
| 38 | Monthly peer scan: 30 min in the [weekly runbook](./maintainer-weekly-runbook.md) first week. Log names; **do not clone**. |

## Privacy / discover / commerce

| id | Close |
|---|---|
| 39–40 | PHI: booleans/errors only. [coverage-report-template.md](https://github.com/davidmosiah/google-health-mcp/blob/main/docs/coverage-report-template.md) + [privacy-model.md](./privacy-model.md). Forbidden: raw samples, names, tokens, GPS. |
| 41 | [security-md-template.md](./security-md-template.md) + repo `SECURITY.md`. |
| 42 | [delx-memory secret-blocking CI](https://github.com/davidmosiah/delx-memory/blob/main/docs/secret-blocking-ci.md). |
| 43 | Local-first: tokens, DB, exports never leave the machine unless the user copies them. |
| 44 | WHOOP raw API JSON = explicit user only ([whoop no-1hz](https://github.com/davidmosiah/whoop-mcp/blob/main/docs/no-1hz-stream.md)). |
| 45 | Nourish: `~/.wellness-nourish/` + wipe via documented doctor/clear path in README. |
| 46 | Leaked token in a public issue: rotate, ask the reporter to edit/redact, open a private advisory. Do not repeat the secret in the reply. |
| 47 | [clinical-scope-presets.md](https://github.com/davidmosiah/google-health-mcp/blob/main/docs/clinical-scope-presets.md). |
| 48 | We do **not** train models on user connector data. Connectors are local. |
| 49 | server.json status: follow [server-json-ci-convention.md](./server-json-ci-convention.md) + each package `server.json`. |
| 50–52 | [llms-txt-server-card-checklist.md](./llms-txt-server-card-checklist.md), [npm-keywords-audit.md](./npm-keywords-audit.md). Topics: `mcp`, `model-context-protocol`, `wellness`, `local-first`. |
| 53–54 | Prepare always; submit only with OK ([directory-ok-gate.md](./directory-ok-gate.md)). Check script: `node scripts/listed-check.mjs`. |
| 55–56 | GH README already has 30s install above the fold. Hub README flagships only; long-tail in STATUS. |
| 57 | [mcp-leaderboard rescore-or-archive](https://github.com/davidmosiah/mcp-leaderboard/blob/main/docs/rescore-or-archive.md). |
| 58 | ClawHub/skills: only list skills that exist in the hermes pack; stale names stay out. |
| 59–64 | [open-source-support.md](./open-source-support.md). Scorecard Pro **frozen**. x402 wellness SKUs: only with margin + dogfood; else leave Commerce alone. Non-goals: hosted OAuth farm, multi-tenant health cloud. |

## Scorecard / longtail / ops / govern / engine

| id | Close |
|---|---|
| 65–70 | [scorecard-blocking-top5.md](./scorecard-blocking-top5.md), [scorecard-receipts.md](./scorecard-receipts.md), [wellness-profile](https://github.com/davidmosiah/mcp-scorecard/blob/main/docs/wellness-profile.md), [scorecard-matrix-refresh.md](./scorecard-matrix-refresh.md). Badge only after green CI. |
| 71–78 | Honest gaps: apple/samsung = export path, no series. Eight Sleep = mutation gated. CGM series only with demand ([cgm-glucose-series-policy.md](./cgm-glucose-series-policy.md)). Oura HR list envelope ([oura-hr-envelope-note.md](./oura-hr-envelope-note.md)). Withings empty-export tests in package. exercise-catalog = maintenance / first-call or skip. Archive list: [archive-dead-connectors.md](./archive-dead-connectors.md). |
| 80–86 | [release-cadence.md](./release-cadence.md) + [tag-github-release-always.md](./tag-github-release-always.md). Pins: `validate-release-index.mjs`. Dependabot high-only. npm audit on publish. `scripts/fleet-versions.sh`. Branch protection note: [codeowners-branch-protection.md](./codeowners-branch-protection.md). Stale issues: 48h SLA, no silent auto-close ([human-issues-sla.md](./human-issues-sla.md)). |
| 88–90 | CONTRIBUTING: series change = fixture + scorecard. SECURITY.md contact. Issue templates in `.github/ISSUE_TEMPLATE/`. |
| 91–97 | creative-forge OSS checklist + private boundary. short-video dry-run default. uap-pulse not-proof banner. agents-that-ship contract link. Protocol README: witness free. A2A OSS vs platform: what outsiders can run is the public repo only. |

## Still BLOCKED-EXTERNAL

None on the OSS-300 local path.

| id | Why it is no longer blocked |
|---|---|
| 31 | Kindred cross-link shipped 2026-08-11 after [mi-fitness-data-bridge#8](https://github.com/shkyyy18/mi-fitness-data-bridge/issues/8). Reciprocal README + `v0.3.0` `agent-safe-series/v1` landed 2026-08-13. [garmin-mcp#19](https://github.com/davidmosiah/garmin-mcp/issues/19) stays open as the **peer design log**, not a blocker. |
