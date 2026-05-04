# delx-wellness

[![Status](https://img.shields.io/badge/status-WIP-yellow?style=flat-square)](https://github.com/davidmosiah/delx-wellness) [![MCP Compatible](https://img.shields.io/badge/MCP-compatible-7C3AED?style=flat-square)](https://modelcontextprotocol.io) [![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://opensource.org/licenses/MIT)

Public reference hub for Delx wellness MCP connectors.

This repository is the public map for local-first wellness connectors that bring user-authorized wearable data into AI agents through Model Context Protocol. It does not currently contain the hosted/commercial hub, token vault, billing system, private user data, or provider approval workflows.

## What This Is

- A registry of wellness MCP connectors maintained under the Delx ecosystem.
- A shared reference for provider capabilities, privacy expectations, and normalized wellness shapes.
- A stable entrypoint for agents and developers who want to discover WHOOP, Strava, Fitbit, Garmin, Oura, Apple Health, and adjacent health-data connectors.

## What This Is Not

- Not a medical device.
- Not medical advice, diagnosis, treatment, or emergency support.
- Not a promise that every future hosted product will be open source.
- Not a place for real user health exports, OAuth tokens, API secrets, or private deployment files.

## Open Source Boundary

The local connector repositories can be open source. Hosted infrastructure may stay private.

| Layer | Public now | Notes |
| --- | --- | --- |
| Local provider connectors | Yes | Individual MCP servers such as WHOOP, Strava, Fitbit, and Garmin. |
| Connector registry and docs | Yes | This repository. |
| Normalized schemas | Yes | Stable shared shapes for wellness summaries and capabilities. |
| Hosted hub API | Not yet | May remain private while product-market fit is tested. |
| Token vault, billing, rate limits | No | Sensitive commercial and security surface. |
| Real user health data | Never | Keep out of GitHub repositories. |

## Connectors

| Provider | Status | Quality | Repository | Package |
| --- | --- | --- | --- | --- |
| WHOOP | Active local connector | `agent_ready` | [`whoop-mcp`](https://github.com/davidmosiah/whoop-mcp) | `whoop-mcp-unofficial` |
| Strava | Active local connector | `agent_ready` | [`strava-mcp`](https://github.com/davidmosiah/strava-mcp) | `strava-mcp-unofficial` |
| Fitbit | Active local connector | `agent_ready` | [`fitbitmcp`](https://github.com/davidmosiah/fitbitmcp) | `fitbit-mcp-unofficial` |
| Garmin Connect | Active local connector | `agent_ready` | [`garminmcp`](https://github.com/davidmosiah/garminmcp) | `garmin-mcp-unofficial` |
| Oura Ring | Active local connector | `agent_ready` | [`ouramcp`](https://github.com/davidmosiah/ouramcp) | `oura-mcp-unofficial` |
| Withings | Active local connector | `agent_ready` | [`withingsmcp`](https://github.com/davidmosiah/withingsmcp) | `withings-mcp-unofficial` |
| Apple Health | Planned | `experimental` | TBD | TBD |
| Eight Sleep | Planned | `experimental` | TBD | TBD |

See [`registry.json`](registry.json) for the machine-readable connector catalog.

## Reference Docs

- [`docs/provider-status.md`](docs/provider-status.md) - current provider matrix and risks.
- [`docs/privacy-model.md`](docs/privacy-model.md) - local-first privacy boundary and hosted-hub considerations.
- [`docs/normalized-schema.md`](docs/normalized-schema.md) - common wellness snapshot model for cross-provider tools.
- [`docs/connector-quality-standard.md`](docs/connector-quality-standard.md) - release and trust checklist for public connectors.

## Example Client Configs

- [`examples/claude-desktop.json`](examples/claude-desktop.json)
- [`examples/hermes.md`](examples/hermes.md)

## Direction

The practical near-term path is:

1. Keep provider MCPs independently installable.
2. Use this repository as the public connector registry and documentation hub.
3. Define shared normalized schemas before building cross-provider tools.
4. Keep hosted/commercial infrastructure private until the product direction is proven.

## Built By

[David Batista](https://github.com/davidmosiah) - founder of [Delx](https://delx.ai), building protocol layers for autonomous AI agents.

Follow on X: [@delx369](https://x.com/delx369)
