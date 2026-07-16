# Changelog

All notable changes to the Delx Wellness registry hub are documented here.
Connector runtime code lives in sibling repositories; this repo tracks the
canonical catalog, docs and install examples.

## [2026-07-16]

### Changed

- Classified all 16 wellness connectors by executable boundary contract: remote API, multi-provider API, local export, or computational engine.
- Added CI validation for boundary declarations and the required class-specific test evidence.
- Synchronized the registry and status table to the live npm releases for Polar, Garmin, Oura, Fitbit, Withings, WHOOP, Strava, Google Health, Eight Sleep, Wellness Air, Wellness CGM, and Cycle Coach.
- Hardened endpoint-specific date/time handling, structured payload preservation, summary error propagation, and dependency security across the affected connector repositories.
- Updated Polar to `0.3.9` after correcting the training-session endpoint's local ISO date-time serialization.

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
