# Connector Quality Standard

This is the public release bar for Delx wellness MCP connectors. It keeps the open-source layer credible while the hosted hub remains optional/private.

## Quality Tiers

### `experimental`

Use for early connectors that are not ready for broad public use.

- README explains that the connector is experimental.
- No real user tokens, exports, secrets, or private data are committed.
- Basic install instructions exist.
- Provider API boundary is documented.

### `registry_ready`

Use for connectors that can be linked from `delx-wellness`.

- `README.md` has installation, auth, privacy, development, and project links.
- `server.json` exists for MCP registry metadata.
- `package.json` version, runtime version, and registry metadata are aligned.
- `SECURITY.md` exists and tells users not to disclose tokens or health exports.
- `.npmignore` excludes local secrets, generated noise, and private artifacts.
- CI runs the full connector test suite, not only a partial typecheck.
- Local test suite includes typecheck, build, tool smoke, HTTP smoke, summary fixture, privacy/cache/redaction, and CLI UX checks.
- Connector exposes a connection/status diagnostic tool.
- Connector exposes a privacy/audit diagnostic tool.
- README links back to `delx-wellness`.
- Public docs state that this is not medical advice.

### `agent_ready`

Use for connectors designed for delegated installation and agent operations.

- Meets `registry_ready`.
- Exposes an agent manifest tool or resource.
- Includes Hermes or equivalent agent-client setup guidance.
- Tests validate agent manifest output.
- Docs tell agents not to ask users to paste passwords, OAuth tokens, refresh tokens, or raw health exports into chat.

## Current Connector Status

| Connector | Tier | Notes |
| --- | --- | --- |
| WHOOP | `agent_ready` | Includes agent manifest, local OAuth/privacy model and Hermes setup checks. |
| Strava | `agent_ready` | Includes agent manifest and GPS privacy posture. |
| Fitbit | `agent_ready` | Includes agent manifest and scope diagnostics. |
| Garmin | `agent_ready` | Includes agent manifest and local credential boundary for unofficial Garmin Connect mode. |
| Oura | `agent_ready` | Includes Oura OAuth, v2 usercollection tools, summaries and Hermes manifest checks. |
| Withings | `agent_ready` | Includes signed Withings token flow, Public API tools, summaries and Hermes manifest checks. |
| Apple Health | `agent_ready` | Includes local export parser, summaries, privacy audit, agent manifest and Hermes setup checks. |

## Release Checklist

Before publishing or linking a connector:

- [ ] Run `npm test`.
- [ ] Confirm CI is green on `main`.
- [ ] Confirm `server.json` version matches `package.json`.
- [ ] Confirm runtime `SERVER_VERSION` matches `package.json` when present.
- [ ] Run a focused secret scan over changed files.
- [ ] Verify generated assets belong to the provider and are not copied from another connector.
- [ ] Confirm README links to the Delx Wellness registry.
- [ ] Confirm docs do not overstate provider support or medical claims.

## Asset Hygiene

Provider assets are part of trust. Do not publish copied or mismatched OG cards, favicons, screenshots, or brand colors across providers.

If a generated asset is duplicated locally with a Finder suffix such as `2`, inspect it before committing. Remove it when it belongs to another provider or is not referenced.
