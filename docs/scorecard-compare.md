# MCP Scorecard Compare — Delx Wellness surface

_Generated 2026-07-30T18:01:59.550Z with local `mcp-scorecard` offline probes. Regenerated after security + agent-ready residual close._

**Bar:** MCP packages target **≥90/A**. All rows meet ≥90.

| Package | Local | npm latest | Hermes pin | Score | Grade | Dual-verify npm |
|---|---:|---:|---:|---:|:---:|:---:|
| [`google-health-mcp-unofficial`](https://www.npmjs.com/package/google-health-mcp-unofficial) | `0.5.6` | `0.5.6` | `0.5.6` | **100** | A | YES |
| [`whoop-mcp-unofficial`](https://www.npmjs.com/package/whoop-mcp-unofficial) | `0.5.6` | `0.5.6` | `0.5.6` | **100** | A | YES |
| [`garmin-mcp-unofficial`](https://www.npmjs.com/package/garmin-mcp-unofficial) | `0.5.8` | `0.5.8` | `0.5.8` | **100** | A | YES |
| [`oura-mcp-unofficial`](https://www.npmjs.com/package/oura-mcp-unofficial) | `0.4.10` | `0.4.10` | `0.4.10` | **97** | A | YES |
| [`strava-mcp-unofficial`](https://www.npmjs.com/package/strava-mcp-unofficial) | `0.4.10` | `0.4.10` | `0.4.10` | **97** | A | YES |
| [`fitbit-mcp-unofficial`](https://www.npmjs.com/package/fitbit-mcp-unofficial) | `0.4.10` | `0.4.10` | `0.4.10` | **97** | A | YES |
| [`withings-mcp-unofficial`](https://www.npmjs.com/package/withings-mcp-unofficial) | `0.4.10` | `0.4.10` | `0.4.10` | **97** | A | YES |
| [`polar-mcp-unofficial`](https://www.npmjs.com/package/polar-mcp-unofficial) | `0.3.13` | `0.3.13` | `0.3.13` | **97** | A | YES |
| [`eight-sleep-mcp-unofficial`](https://www.npmjs.com/package/eight-sleep-mcp-unofficial) | `0.2.8` | `0.2.8` | `0.2.8` | **100** | A | YES |
| [`apple-health-mcp-unofficial`](https://www.npmjs.com/package/apple-health-mcp-unofficial) | `0.5.0` | `0.5.0` | `0.5.0` | **94** | A | YES |
| [`samsung-health-mcp-unofficial`](https://www.npmjs.com/package/samsung-health-mcp-unofficial) | `0.5.0` | `0.5.0` | `0.5.0` | **94** | A | YES |
| [`wellness-nourish`](https://www.npmjs.com/package/wellness-nourish) | `0.7.3` | `0.7.3` | `0.7.3` | **100** | A | YES |
| [`wellness-air`](https://www.npmjs.com/package/wellness-air) | `0.5.8` | `0.5.8` | `0.5.8` | **100** | A | YES |
| [`wellness-cgm-mcp`](https://www.npmjs.com/package/wellness-cgm-mcp) | `0.4.3` | `0.4.3` | `0.4.3` | **100** | A | YES |
| [`wellness-cycle-coach`](https://www.npmjs.com/package/wellness-cycle-coach) | `0.3.7` | `0.3.7` | `0.3.7` | **100** | A | YES |
| [`delx-living-body`](https://www.npmjs.com/package/delx-living-body) | `0.3.2` | `0.3.2` | `—` | **100** | A | YES |
| [`delx-memory`](https://www.npmjs.com/package/delx-memory) | `0.2.4` | `0.2.4` | `—` | **100** | A | YES |
| [`mcp-scorecard`](https://www.npmjs.com/package/mcp-scorecard) | `0.5.3` | `0.5.3` | `—` | **100*** | A | YES |

## Notes

- **Score** is offline `mcp-scorecard` against the local package dir.
- **Hermes pin** from `delx-wellness-hermes` connector presets (OpenClaw mirrors).
- **Dual-verify npm** = local version equals `npm view` at generation time.
- Residual 94–97 grades are agent-DX polish (not security fails). Heroes and air/cgm/cycle are **100**.
- See [release-index.md](./release-index.md) for GitHub dual-verify of promoted rows.

## How to regenerate

```bash
node path/to/mcp-scorecard/dist/index.js <package-dir>
# then rewrite this table from the matrix
```
