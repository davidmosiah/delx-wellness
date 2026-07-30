# MCP Scorecard Compare — Delx Wellness surface

_Generated 2026-07-30T18:35:00.000Z with local `mcp-scorecard` v0.5.4 offline probes. Regenerated after SOTA wave (fleet 100 + `delx-mcp-kit` + pin republish)._

**Bar:** MCP packages target **≥90/A**. All rows meet **100/A**.

| Package | Local | npm latest | Hermes pin | Score | Grade | Dual-verify npm |
|---|---:|---:|---:|---:|:---:|:---:|
| [`google-health-mcp-unofficial`](https://www.npmjs.com/package/google-health-mcp-unofficial) | `0.5.7` | `0.5.7` | `0.5.7` | **100** | A | YES |
| [`whoop-mcp-unofficial`](https://www.npmjs.com/package/whoop-mcp-unofficial) | `0.5.7` | `0.5.7` | `0.5.7` | **100** | A | YES |
| [`garmin-mcp-unofficial`](https://www.npmjs.com/package/garmin-mcp-unofficial) | `0.5.8` | `0.5.8` | `0.5.8` | **100** | A | YES |
| [`oura-mcp-unofficial`](https://www.npmjs.com/package/oura-mcp-unofficial) | `0.4.11` | `0.4.11` | `0.4.11` | **100** | A | YES |
| [`strava-mcp-unofficial`](https://www.npmjs.com/package/strava-mcp-unofficial) | `0.4.11` | `0.4.11` | `0.4.11` | **100** | A | YES |
| [`fitbit-mcp-unofficial`](https://www.npmjs.com/package/fitbit-mcp-unofficial) | `0.4.11` | `0.4.11` | `0.4.11` | **100** | A | YES |
| [`withings-mcp-unofficial`](https://www.npmjs.com/package/withings-mcp-unofficial) | `0.4.11` | `0.4.11` | `0.4.11` | **100** | A | YES |
| [`polar-mcp-unofficial`](https://www.npmjs.com/package/polar-mcp-unofficial) | `0.3.14` | `0.3.14` | `0.3.14` | **100** | A | YES |
| [`eight-sleep-mcp-unofficial`](https://www.npmjs.com/package/eight-sleep-mcp-unofficial) | `0.2.8` | `0.2.8` | `0.2.8` | **100** | A | YES |
| [`apple-health-mcp-unofficial`](https://www.npmjs.com/package/apple-health-mcp-unofficial) | `0.5.1` | `0.5.1` | `0.5.1` | **100** | A | YES |
| [`samsung-health-mcp-unofficial`](https://www.npmjs.com/package/samsung-health-mcp-unofficial) | `0.5.1` | `0.5.1` | `0.5.1` | **100** | A | YES |
| [`wellness-nourish`](https://www.npmjs.com/package/wellness-nourish) | `0.7.3` | `0.7.3` | `0.7.3` | **100** | A | YES |
| [`wellness-air`](https://www.npmjs.com/package/wellness-air) | `0.5.8` | `0.5.8` | `0.5.8` | **100** | A | YES |
| [`wellness-cgm-mcp`](https://www.npmjs.com/package/wellness-cgm-mcp) | `0.4.3` | `0.4.3` | `0.4.3` | **100** | A | YES |
| [`wellness-cycle-coach`](https://www.npmjs.com/package/wellness-cycle-coach) | `0.3.7` | `0.3.7` | `0.3.7` | **100** | A | YES |
| [`delx-living-body`](https://www.npmjs.com/package/delx-living-body) | `0.3.3` | `0.3.3` | `—` | **100** | A | YES |
| [`delx-memory`](https://www.npmjs.com/package/delx-memory) | `0.2.5` | `0.2.5` | `—` | **100** | A | YES |
| [`mcp-scorecard`](https://www.npmjs.com/package/mcp-scorecard) | `0.5.4` | `0.5.4` | `—` | **100*** | A | YES |
| [`delx-mcp-kit`](https://www.npmjs.com/package/delx-mcp-kit) | `0.1.0` | `0.1.0` | `—` | **n/a** | — | YES |

## Notes

- **Score** is offline `mcp-scorecard` against the local package dir.
- **Hermes pin** from `delx-wellness-hermes` connector presets (OpenClaw mirrors). Pins ship in profile packs (`delx-wellness-hermes` / `delx-wellness-openclaw`).
- **Dual-verify npm** = local version equals `npm view` at generation time.
- **SOTA wave 2026-07-30:** residual 94–97 (Oura/Strava/Fitbit/Withings/Polar/Apple/Samsung) closed to **100** via exchange_code wording + reimport patterns + scorecard import rules. Shared privacy primitives live in [`delx-mcp-kit`](https://www.npmjs.com/package/delx-mcp-kit) (WHOOP + Google Health consumers first).
- `mcp-scorecard` self-score (`*`) is package-quality; it is not a stdio MCP subject.
- `delx-mcp-kit` is a library (privacy/TokenStore/annotations/ERROR_CODES), not an MCP server — score n/a by design.
- See [release-index.md](./release-index.md) for GitHub dual-verify of promoted rows.

## How to regenerate

```bash
node path/to/mcp-scorecard/dist/index.js <package-dir>
# then rewrite this table from the matrix
```
