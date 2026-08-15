# agent-safe-series/v1 (canonical)

Shared dense time-series contract for Delx wellness MCPs and compatible external builders (Kindred).

## Design rules
1. Stats always on full-resolution samples.
2. Series hard-capped (`max_points`, server hard max 500).
3. Honest loss metadata (`downsampled`, `method`, `source_points`, `returned_points`).
4. `coverage_anchor`: `nominal_duration` | `sample_span`.
5. Zones declare `reference_source`.

## Semver (contract vs package)

`agent-safe-series/v1` is a **contract major**. Field rules:

| Change | Bump |
|---|---|
| Add optional field agents may ignore | **minor** of the *package* that emits it; contract stays `v1` |
| New required field, rename, or change meaning of an existing field | **major** of the package **and** new contract tag (`v2`) |
| Tighten a hard cap (`max_points` / server max) so old clients get less | **major** |
| Raise a cap (more points allowed) | **minor** |
| Bugfix that keeps the envelope identical | **patch** |

Keep the previous contract major readable for **≥1 minor** after a bump (compat window).
Do not silently reinterpret `v1` fields.

## Implementations
| Package | Tool | npm |
|---|---|---|
| garmin-mcp-unofficial | `garmin_activity_series` | 0.7.2+ |
| strava-mcp-unofficial | `strava_activity_series` | 0.6.0+ |
| fitbit-mcp-unofficial | `fitbit_heart_series` | 0.6.0+ |
| polar-mcp-unofficial | `polar_heart_series` | 0.5.0+ |
| Kindred mi-fitness-data-bridge (peer; not a Delx npm pin) | `workout_series` | Official MCP Registry `io.github.shkyyy18/mi-fitness-data-bridge` v0.3.1 — see garmin-mcp#19 |

## ADR
See [adr/001-agent-safe-series-v1.md](./adr/001-agent-safe-series-v1.md).

## Compat fields
See [series-compat-matrix.md](./series-compat-matrix.md).

## Public narrative
Builder post: [Discussion #14](https://github.com/davidmosiah/delx-wellness/discussions/14) · archive [drafts/2026-08-agent-safe-series-v1-post.md](./drafts/2026-08-agent-safe-series-v1-post.md).
