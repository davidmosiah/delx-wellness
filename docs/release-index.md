# Verified Release Index

This page tracks the latest Delx open-source releases that were verified from
both npm and GitHub on 2026-07-16. Use it as the human-readable companion to
[`registry.json`](../registry.json) and [`STATUS.md`](../STATUS.md).

## Wellness Stack

| Project | npm package | npm version | GitHub release | Verification |
|---|---|---:|---|---|
| Delx Living Body | [`delx-living-body`](https://www.npmjs.com/package/delx-living-body/v/0.3.0) | `0.3.0` | [`v0.3.0`](https://github.com/davidmosiah/delx-living-body/releases/tag/v0.3.0) | `npm test`, prod audit, pack dry-run |
| Google Health MCP | [`google-health-mcp-unofficial`](https://www.npmjs.com/package/google-health-mcp-unofficial/v/0.5.3) | `0.5.3` | [`v0.5.3`](https://github.com/davidmosiah/google-health-mcp/releases/tag/v0.5.3) | `npm test`, prod audit, pack dry-run |
| Garmin MCP | [`garmin-mcp-unofficial`](https://www.npmjs.com/package/garmin-mcp-unofficial/v/0.5.4) | `0.5.4` | [`v0.5.4`](https://github.com/davidmosiah/garmin-mcp/releases/tag/v0.5.4) | `npm test`, prod audit, pack dry-run |
| Wellness Nourish | [`wellness-nourish`](https://www.npmjs.com/package/wellness-nourish/v/0.7.0) | `0.7.0` | [`v0.7.0`](https://github.com/davidmosiah/wellness-nourish/releases/tag/v0.7.0) | `npm test`, prod audit, pack dry-run |
| WHOOP MCP | [`whoop-mcp-unofficial`](https://www.npmjs.com/package/whoop-mcp-unofficial/v/0.5.4) | `0.5.4` | [`v0.5.4`](https://github.com/davidmosiah/whoop-mcp/releases/tag/v0.5.4) | `npm test`, prod audit, pack dry-run |
| Withings MCP | [`withings-mcp-unofficial`](https://www.npmjs.com/package/withings-mcp-unofficial/v/0.4.8) | `0.4.8` | [`v0.4.8`](https://github.com/davidmosiah/withings-mcp/releases/tag/v0.4.8) | `npm test`, prod audit, pack dry-run |

## Infrastructure

| Project | npm package | npm version | GitHub release | Verification |
|---|---|---:|---|---|
| MCP Scorecard | [`mcp-scorecard`](https://www.npmjs.com/package/mcp-scorecard/v/0.5.1) | `0.5.1` | [`v0.5.1`](https://github.com/davidmosiah/mcp-scorecard/releases/tag/v0.5.1) | `npm test`, self-score 100/100, prod audit, pack dry-run |
| Delx Memory | [`delx-memory`](https://www.npmjs.com/package/delx-memory/v/0.2.3) | `0.2.3` | [`v0.2.3`](https://github.com/davidmosiah/delx-memory/releases/tag/v0.2.3) | `npm test`, prod audit, pack dry-run |
| Delx MCP Server | [`delx-mcp-server`](https://www.npmjs.com/package/delx-mcp-server/v/0.2.8) | `0.2.8` | [`v0.2.8`](https://github.com/davidmosiah/delx-mcp-server/releases/tag/v0.2.8) | `npm test`, `npm run health`, prod audit, pack dry-run |

## Maintainer Rule

After publishing a package:

1. Push the release commit and tag.
2. Verify `npm view <package> version dist-tags.latest`.
3. Create a GitHub Release for the tag with npm and verification links.
4. Run `node scripts/sync-registry.mjs` in this repo.
5. Update this index when the release is strategic enough to promote from the hub.
6. Run `node scripts/validate-release-index.mjs` to prove npm, GitHub Releases and promoted README backlinks agree.
