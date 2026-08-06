# ADR 001: Freeze agent-safe-series/v1

## Status
Accepted 2026-08-06

## Context
Dense health time-series blow agent context. Garmin, Strava, Fitbit, Polar, and Kindred Mi Fitness Data Bridge converged on a shared envelope via garmin-mcp#19.

## Decision
- Contract string: `agent-safe-series/v1` is frozen.
- Required fields: `contract_version`, `t_unit: seconds_from_start`, `points[]`, `stats` (full-res), `downsampled`, `source_points`, `returned_points`, `method`, `data_quality` (incl. `coverage_anchor` when duration known), optional `time_in_zone.reference_source`.
- Additive fields require a proposal comment on garmin-mcp#19 (or successor ADR) before any side bumps the version string.
- GPS/latlng never enters series tools.

## Consequences
Scorecard and kit types treat v1 as stable. New dense tools must speak v1 or document an explicit exception.
