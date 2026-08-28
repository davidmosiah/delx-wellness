## 2026-08-28 — Authority probe success + ledger honesty

- Logged Kindred / Mi Fitness Data Bridge `v0.3.0` (2026-08-13) as inbound-of-weight. Probe success criterion met; runway still ends 2026-09-30. No megaphone.
- OSS-300 #31 and Kindred README rows are no longer `BLOCKED-EXTERNAL`. [garmin-mcp#19](https://github.com/davidmosiah/garmin-mcp/issues/19) stays open as the peer design log.
- `sync-registry.mjs --check` no longer fails on a calendar rollover when npm pins match.
- `docs/release-index.md` reconciled to live npm + GitHub Releases (GH `0.7.7`, Garmin `0.7.5`).
- Receipt: `docs/oss-pendency-status-2026-08-28.md`.

## 2026-08-26 — OSS security fleet re-audit

- Local scan of 39 Node OSS checkouts: 36 `npm audit --omit=dev` clean of high/critical; no git-tracked tokens.
- Stale `nanoid@3.3.17` override on `delx-wellness-site` (GHSA-2v37-7h3g-55p8) bumped to `3.3.18`. Same class as the 11/08 hono pins.
- Method and residuals: `docs/oss-security-audit-2026-08-26.md`.
- Dependabot [#40](https://github.com/davidmosiah/delx-wellness-site/security/dependabot/40) is **fixed**. Eight Sleep default docs no longer ship a copyable mutation assignment; hub pin `eight-sleep-mcp-unofficial@0.2.12`.

## 2026-08-18 — Canonical GitHub slug guard

- Catalog GitHub URLs for Fitbit, Oura, Polar and Withings stay on the
  public hyphenated repos (`fitbit-mcp`, `oura-mcp`, `polar-mcp`, `withings-mcp`).
  Official MCP registry IDs (`io.github.davidmosiah/fitbitmcp` and siblings)
  remain the published live names.
- Local gate: `scripts/validate-canonical-github-slugs.mjs` (wired into `npm test`)
  so `registry.json`, generated `STATUS.md`, README, release-index, and the
  growth collector cannot rot back to the pre-rename slugs.

## 2026-08-15 — Peer catalog honesty follow-up (#18 review)

- Credentials: user’s local OS keyring, not the peer maintainer’s store.
- Contract evidence: synthetic fixtures; this registry stores no live Xiaomi tokens; Delx does not independently validate live Xiaomi data.
- `sync-registry` snapshot counts tolerate `package: null`.
- `validate-peers`: `--registry` requires a path; duplicate peer ids fail; `exitCode` instead of `process.exit`.

## 2026-08-15 — Xiaomi Mi Fitness peer catalog hop (#17)

- Schema: optional `peers[]` on the registry root (`additionalProperties: false`).
- Registry: Kindred `mi-fitness-data-bridge` as a **peer** row (not `connectors[]`). Official MCP Registry `io.github.shkyyy18/mi-fitness-data-bridge` v0.3.1 is listed metadata, not an npm pin.
- Docs: README decision-tree + provider-status + STATUS name the hop as not Delx-operated and not medical advice (unofficial China-region adapter; OS keyring; synthetic fixtures). No integration promise.
- Local gate: `scripts/validate-peers.mjs` (no `package` / `npm_version`; no first-party id or `davidmosiah` repo).

## 2026-08-14 — Google Health 0.7.6 + Kindred peer note

- Registry/STATUS: `google-health-mcp-unofficial` `0.7.5` → `0.7.6` (Claude Desktop `outputSchema` 2020-12, [#23](https://github.com/davidmosiah/google-health-mcp/issues/23)).
- README: honest **peer** pointer to Kindred `mi-fitness-data-bridge` ([#17](https://github.com/davidmosiah/delx-wellness/issues/17)). Not a first-party `connectors[]` row.

## 2026-08-13 — Publish oura 0.7.0 + kit 0.2.0

- `oura-mcp-unofficial` `0.6.3` → `0.7.0` on npm (honest `next_token` pagination).
- `delx-mcp-kit` `0.1.1` → `0.2.0` on npm (`buildAgentSafeSeries` + series tests).
- Registry/STATUS synced from live npm. Release index kit pin updated.

## 2026-08-13 — Live docs no longer point at archived workbench

- Operator prompt templates in `examples/from-workbench/` now send people to
  this hub's [Run it in your agent](README.md#run-it-in-your-agent),
  [`delx-wellness-hermes`](https://github.com/davidmosiah/delx-wellness-hermes),
  and [`delx-living-body`](https://github.com/davidmosiah/delx-living-body).
- Dated plans and directory-submission inventory still mention
  `delx-agent-workbench` as history only.

## 2026-08-13 — Canonical GitHub slugs + Dependabot policy wiring

- Catalog GitHub URLs for Fitbit, Oura, Polar and Withings now point at the
  public repos (`fitbit-mcp`, `oura-mcp`, `polar-mcp`, `withings-mcp`).
  Official MCP registry IDs (`io.github.davidmosiah/fitbitmcp` and siblings)
  are unchanged.
- Added `.github/dependabot.yml` matching [docs/dependabot-high-only.md](docs/dependabot-high-only.md)
  (security-only, grouped, monthly; no version-update noise).

## 2026-08-12 — OSS-300 wave 2 (close local path)

- Local inventory **PENDING=0** (1 BLOCKED-EXTERNAL: Kindred #19 peer OK)
- [oss-300-close.md](docs/oss-300-close.md) pointers + [ledger](docs/oss-300-ledger.md)
- Growth collector: **median daily** npm, ignore one-day spikes
- `scripts/listed-check.mjs` — HEAD known listing URLs (no submit)
- Issue templates + CONTRIBUTING series/fixture rule + SECURITY advisory path
- Scorecard **0.5.8**: `contract_version` schema property required

## 2026-08-12 — OSS-300 wave 1 (authority + honesty)

- [Authority probe](docs/authority-probe.md) runway to **2026-09-30** (inbound of weight vs vanity)
- Monthly [authority scorecard](docs/monthly-authority-scorecard.md) (`scripts/authority-scorecard.mjs`)
- [Weekly maintainer runbook](docs/maintainer-weekly-runbook.md)
- [Policies 98–100](docs/oss-strategy-policies.md) re-dated: #21 closed honest 1/2; no new connector without a named requester
- Contributor Covenant [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## 2026-08-08 — fleet pin wave (post-garmin #20)

Published / pinned:
- `garmin-mcp-unofficial@0.7.2` (Body Battery #20)
- `whoop-mcp-unofficial@0.6.1` (README contract)
- `mcp-scorecard@0.5.6` (dense_series schema hard cap)
- `delx-living-body@0.3.5` (series routing + child pins)
- `delx-wellness-hermes@0.3.7` (whoop/withings/garmin pins)

## 2026-08-06 — garmin Body Battery #20

- Pins: `garmin-mcp-unofficial@0.7.2`, `delx-wellness-hermes@0.3.6`
- External PR: Body Battery daily report query-param fix (thanks @oysteinhagenpettersen)

## 2026-08-06 — OSS-200 strategy hub

- ADR 001 + canonical [agent-safe-series/v1](docs/agent-safe-series.md)
- [proof/](docs/proof/) hub, scorecard-top5 + fleet-versions scripts
- Process: directory OK gate, human issues SLA, anti-sprawl policies
- Inventories: OSS-200 (ship campaign), OSS-300 (frozen list)

## 2026-08-06 — OSS-200 strategy campaign

### Added
- ADR 001 agent-safe-series/v1, canonical series docs, proof hub, fleet-versions + scorecard-top5 scripts
- Strategy policies, growth/release/quality process docs, validate-release-index helpers


## 2026-08-05 — OSS-100 campaign

### Changed
- Registry sync to live npm (fitbit/strava/garmin series releases, hermes 0.3.5).
- Release index series fleet table; registry single-source + growth/SLA docs.


# Changelog

All notable changes to the Delx Wellness registry hub are documented here.
Connector runtime code lives in sibling repositories; this repo tracks the
canonical catalog, docs and install examples.

## [2026-07-30]

### Changed

- Synced `registry.json` + `STATUS.md` to live npm:
  - `google-health-mcp-unofficial` `0.5.3` → `0.5.4` (nutrition-log
    `daily_rollup` page_size clamp; fixes external issue google-health-mcp#15)
  - `oura-mcp-unofficial` `0.4.7` → `0.4.8`
  - `polar-mcp-unofficial` `0.3.10` → `0.3.11`
  - `withings-mcp-unofficial` `0.4.8` → `0.4.9` (npm live; GH Release tag still
    `v0.4.8` until cut)
- README flagship order: Google Health first as discovery magnet (33★), Garmin
  kept as highest agent-readiness scorecard entry.
- Refreshed MCP directory tracker: Glama **29/29** live; awesome-mcp-servers
  still 7 merged / 22 open; MCPFind PR #91 closed unmerged — no new spam.
- Google Health OSS proof-loop doc + growth playbook pointed at npm **0.5.4**;
  experiment window still ends 2026-08-12 (external `coverage --live` reports).
- Release index: Google Health dual-verified at npm `0.5.4` / GH `v0.5.4`
  (GH Release now exists). npm-ahead lag examples moved to Withings `0.4.9`
  and `mcp-scorecard@0.5.2` (no matching GH Releases yet).
- `wellness-nourish@0.7.1` not on npm — hub stays at dual-verified `0.7.0`.

## [2026-07-16]

### Changed

- Classified all 16 wellness connectors by executable boundary contract: remote API, multi-provider API, local export, or computational engine.
- Added CI validation for boundary declarations and the required class-specific test evidence.
- Synchronized the registry and status table to the live npm releases for Polar, Garmin, Oura, Fitbit, Withings, WHOOP, Strava, Google Health, Eight Sleep, Wellness Air, Wellness CGM, and Cycle Coach.
- Hardened endpoint-specific date/time handling, structured payload preservation, summary error propagation, and dependency security across the affected connector repositories.
- Updated Polar to `0.3.9` after correcting the training-session endpoint's local ISO date-time serialization.
- Updated Polar to `0.3.10` after aligning Markdown previews with the confirmed v4 training and sleep payloads.

## [2026-07-12]

### Changed

- Synced `registry.json` + `STATUS.md` to live npm versions:
  - `wellness-nourish` `0.6.11` → `0.7.0` (TACO 4 pt-BR meal estimator)
  - `polar-mcp-unofficial` `0.3.5` → `0.3.6`
  - `google-health-mcp-unofficial` `0.5.1` → `0.5.2` (scorecard fixes + Smithery)
- Expanded agent discovery (`llms.txt`) and client examples to cover Eight
  Sleep, Wellness Air, CGM, and Cycle Coach.
- Added dynamic GitHub stars / CI badges on the README front door.

### Added

- This changelog, so hub freshness is visible without digging into ops logs.

## [2026-07-03]

### Changed

- Recorded Glama / MCP directory submission status and growth snapshots under
  `docs/`.
