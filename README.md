# delx-wellness

[![Status](https://img.shields.io/badge/status-active-0ea5a3?style=flat-square)](https://github.com/davidmosiah/delx-wellness)
[![MCP Compatible](https://img.shields.io/badge/MCP-compatible-7C3AED?style=flat-square)](https://modelcontextprotocol.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://opensource.org/licenses/MIT)

**The public registry of local-first wellness MCP connectors.** One stable map for agents and developers to discover, install and combine wearable connectors that bring user-authorized health data into AI agents.

This repository is documentation and metadata. It does **not** contain the hosted hub, token vault, billing system, private user data or provider approval workflows. Each connector lives in its own repo and stays installable on its own.

## Connectors

| Provider | Connector | Tier | Repository | Package |
|---|---|---|---|---|
| WHOOP | Active | `agent_ready` | [`whoop-mcp`](https://github.com/davidmosiah/whoop-mcp) | `whoop-mcp-unofficial` |
| Strava | Active | `agent_ready` | [`strava-mcp`](https://github.com/davidmosiah/strava-mcp) | `strava-mcp-unofficial` |
| Fitbit | Active | `agent_ready` | [`fitbitmcp`](https://github.com/davidmosiah/fitbitmcp) | `fitbit-mcp-unofficial` |
| Garmin Connect | Active | `agent_ready` | [`garminmcp`](https://github.com/davidmosiah/garminmcp) | `garmin-mcp-unofficial` |
| Oura Ring | Active | `agent_ready` | [`ouramcp`](https://github.com/davidmosiah/ouramcp) | `oura-mcp-unofficial` |
| Withings | Active | `agent_ready` | [`withingsmcp`](https://github.com/davidmosiah/withingsmcp) | `withings-mcp-unofficial` |
| Apple Health | Planned | — | TBD | TBD |
| Eight Sleep | Planned | — | TBD | TBD |

Tiers are defined in [`docs/connector-quality-standard.md`](docs/connector-quality-standard.md). Machine-readable catalog: [`registry.json`](registry.json).

## Which connector should I install first?

```text
Have a WHOOP?           → start with whoop-mcp        (recovery, HRV, sleep, strain)
Have a Garmin?          → start with garminmcp        (Body Battery, training readiness, HRV)
Have an Oura?           → start with ouramcp          (readiness, sleep, activity, HRV)
Have Withings devices?  → start with withingsmcp      (body measures, sleep, activity, heart)
Run/ride/swim a lot?    → add strava-mcp              (activities, streams, routes)
Just bought a Fitbit?   → add fitbitmcp               (activity, sleep, heart, HRV)
Multiple devices?       → install several. Each is independent and read-only.
```

The connectors are designed to coexist. When two providers cover the same signal (e.g. WHOOP and Garmin both report sleep), each tool returns provider-tagged data and your agent can reconcile them.

## Install the active connectors in 60 seconds

Each connector is a standalone npm package with a guided setup CLI:

```bash
npx -y whoop-mcp-unofficial   setup && npx -y whoop-mcp-unofficial   auth
npx -y strava-mcp-unofficial  setup && npx -y strava-mcp-unofficial  auth
npx -y fitbit-mcp-unofficial  setup && npx -y fitbit-mcp-unofficial  auth
npx -y garmin-mcp-unofficial  setup && npx -y garmin-mcp-unofficial  auth --install-helper
npx -y oura-mcp-unofficial    setup && npx -y oura-mcp-unofficial    auth
npx -y withings-mcp-unofficial setup && npx -y withings-mcp-unofficial auth
```

Then drop one of the [client config examples](examples/) into your AI client.

## Client examples

| Client | Config | Notes |
|---|---|---|
| Claude Desktop | [`examples/claude-desktop.json`](examples/claude-desktop.json) | Drop into `claude_desktop_config.json` |
| Cursor | [`examples/cursor.json`](examples/cursor.json) | Drop into Cursor's MCP settings |
| Windsurf | [`examples/windsurf.json`](examples/windsurf.json) | Same shape as Cursor |
| Hermes | [`examples/hermes.md`](examples/hermes.md) | YAML + skill files |
| Generic / ChatGPT / OpenClaw | [`examples/generic-mcp.md`](examples/generic-mcp.md) | Standard `mcpServers` shape |

## Open-source boundary

The local connector layer can be open source. The hosted commercial layer may stay private.

| Layer | Public now | Notes |
|---|:---:|---|
| Local provider connectors | ✓ | Individual MCP servers (WHOOP, Strava, Fitbit, Garmin, Oura, Withings) |
| Connector registry and docs | ✓ | This repository |
| Normalized schemas | ✓ | Stable shared shapes for cross-provider tools |
| Hosted hub API | — | May remain private during product-market fit |
| Token vault, billing, rate limits | — | Sensitive commercial and security surface |
| Real user health data | — | Never committed to GitHub |

## Reference docs

- [Connector quality standard](docs/connector-quality-standard.md) — release and trust checklist
- [Provider status](docs/provider-status.md) — current matrix and risks
- [Privacy model](docs/privacy-model.md) — local-first privacy boundary and hosted-hub considerations
- [Normalized schema](docs/normalized-schema.md) — shared cross-provider wellness snapshot shape

## What this is not

- Not a medical device.
- Not medical advice, diagnosis, treatment or emergency support.
- Not a promise that every future hosted product will be open source.
- Not a place for real user health exports, OAuth tokens, API secrets or private deployment files.

## Direction

The practical near-term path:

1. Keep provider MCPs independently installable.
2. Use this repository as the public connector registry and documentation hub.
3. Define shared normalized schemas before building cross-provider tools.
4. Keep hosted/commercial infrastructure private until the product direction is proven.

## Built by

[David Batista](https://github.com/davidmosiah) — founder of [Delx](https://delx.ai), building protocol layers for autonomous AI agents.

Follow on X: [@delx369](https://x.com/delx369)

## License

MIT — see [LICENSE](LICENSE).
