# agent-safe-series/v1 (canonical)

Shared dense time-series contract for Delx wellness MCPs and compatible external builders (Kindred).

## Design rules
1. Stats always on full-resolution samples.
2. Series hard-capped (`max_points`, server hard max 500).
3. Honest loss metadata (`downsampled`, `method`, `source_points`, `returned_points`).
4. `coverage_anchor`: `nominal_duration` | `sample_span`.
5. Zones declare `reference_source`.

## Implementations
| Package | Tool | npm |
|---|---|---|
| garmin-mcp-unofficial | `garmin_activity_series` | 0.7.2+ |
| strava-mcp-unofficial | `strava_activity_series` | 0.6.0+ |
| fitbit-mcp-unofficial | `fitbit_heart_series` | 0.6.0+ |
| polar-mcp-unofficial | `polar_heart_series` | 0.5.0+ |
| Kindred mi-fitness-data-bridge | `workout_series` | see garmin-mcp#19 |

## ADR
See [adr/001-agent-safe-series-v1.md](./adr/001-agent-safe-series-v1.md).

## Compat fields
See [series-compat-matrix.md](./series-compat-matrix.md).

## Public narrative (draft)
Long-form builder post (not published until owner OK): [drafts/2026-08-agent-safe-series-v1-post.md](./drafts/2026-08-agent-safe-series-v1-post.md).
