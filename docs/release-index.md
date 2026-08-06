# Verified Release Index

This page tracks strategic Delx open-source releases. Last reconcile: **2026-08-06** (OSS-200).

Canonical connector versions: [`registry.json`](../registry.json) via `node scripts/sync-registry.mjs` (single source).

## Strategic verified releases (CI format)

Rows below are validated by `node scripts/validate-release-index.mjs` (npm URL + GitHub Release tag).

| Project | npm package | npm version | GitHub Release | Verification |
|---|---|---|---|---|
| Google Health MCP | [`google-health-mcp-unofficial`](https://www.npmjs.com/package/google-health-mcp-unofficial/v/0.7.3) | `0.7.3` | [`v0.7.3`](https://github.com/davidmosiah/google-health-mcp/releases/tag/v0.7.3) | `npm test` + prod audit + pack dry-run |
| Garmin MCP | [`garmin-mcp-unofficial`](https://www.npmjs.com/package/garmin-mcp-unofficial/v/0.7.1) | `0.7.1` | [`v0.7.1`](https://github.com/davidmosiah/garmin-mcp/releases/tag/v0.7.1) | `npm test` + prod audit + pack dry-run |

## Series fleet (agent-safe-series/v1) — npm pins

| Project | npm package | npm version |
|---|---|---:|
| Garmin MCP | [`garmin-mcp-unofficial`](https://www.npmjs.com/package/garmin-mcp-unofficial/v/0.7.1) | `0.7.1` |
| Strava MCP | [`strava-mcp-unofficial`](https://www.npmjs.com/package/strava-mcp-unofficial/v/0.6.0) | `0.6.0` |
| Fitbit MCP | [`fitbit-mcp-unofficial`](https://www.npmjs.com/package/fitbit-mcp-unofficial/v/0.6.0) | `0.6.0` |
| Polar MCP | [`polar-mcp-unofficial`](https://www.npmjs.com/package/polar-mcp-unofficial/v/0.5.0) | `0.5.0` |
| Google Health MCP | [`google-health-mcp-unofficial`](https://www.npmjs.com/package/google-health-mcp-unofficial/v/0.7.3) | `0.7.3` |
| Delx Wellness Hermes | [`delx-wellness-hermes`](https://www.npmjs.com/package/delx-wellness-hermes/v/0.3.5) | `0.3.5` |

## Wellness stack — npm pins (registry-synced)

| Project | npm package | npm version | GitHub | Verification |
|---|---|---:|---|---|
| Delx Living Body | [`delx-living-body`](https://www.npmjs.com/package/delx-living-body/v/0.3.4) | `0.3.4` | [repo](https://github.com/davidmosiah/delx-living-body) | `npm view` + registry sync |
| Wellness Nourish | [`wellness-nourish`](https://www.npmjs.com/package/wellness-nourish/v/0.8.0) | `0.8.0` | [repo](https://github.com/davidmosiah/wellness-nourish) | `npm view` + registry sync |
| WHOOP MCP | [`whoop-mcp-unofficial`](https://www.npmjs.com/package/whoop-mcp-unofficial/v/0.6.1) | `0.6.1` | [repo](https://github.com/davidmosiah/whoop-mcp) | `npm view` + registry sync |
| Withings MCP | [`withings-mcp-unofficial`](https://www.npmjs.com/package/withings-mcp-unofficial/v/0.5.1) | `0.5.1` | [repo](https://github.com/davidmosiah/withingsmcp) | `npm view` + registry sync |

## Infrastructure — npm pins

| Project | npm package | npm version | Verification |
|---|---|---:|---|
| MCP Scorecard | [`mcp-scorecard`](https://www.npmjs.com/package/mcp-scorecard/v/0.5.5) | `0.5.5` | `npm view` (0.5.6 pending publish) |
| Delx MCP Kit | [`delx-mcp-kit`](https://www.npmjs.com/package/delx-mcp-kit/v/0.1.1) | `0.1.1` | `npm view` + registry sync |
| Delx Memory | [`delx-memory`](https://www.npmjs.com/package/delx-memory/v/0.2.5) | `0.2.5` | `npm view` + registry sync |
| Delx MCP Server | [`delx-mcp-server`](https://www.npmjs.com/package/delx-mcp-server/v/0.2.9) | `0.2.9` | `npm view` + registry sync |
| Delx Wellness Hermes | [`delx-wellness-hermes`](https://www.npmjs.com/package/delx-wellness-hermes/v/0.3.5) | `0.3.5` | `npm view` + registry sync |

## Maintainer rule

After publishing a package:

1. Push the release commit and tag.
2. Verify `npm view <package> version dist-tags.latest`.
3. Create a GitHub Release for the tag when strategic.
4. Run `node scripts/sync-registry.mjs` in this repo.
5. Add/update a **Strategic verified releases** row when tag + npm match.
6. Run `node scripts/validate-release-index.mjs`.
