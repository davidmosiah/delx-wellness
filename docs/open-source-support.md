# Open Source Support

Delx Wellness keeps the connector layer MIT-licensed and local-first. The public
packages should stay useful without a hosted account, telemetry, token vault or
paid gate.

The commercial layer belongs above the connectors: setup help, MCP audits,
hosted OAuth convenience, support, and private deployments.

## What Stays Free

- Individual MCP connectors for wearables, nutrition, air quality, cycle context
  and related local data sources.
- The `delx-living-body` meta-MCP entrypoint for composing installed
  connectors.
- Registry metadata, install examples, `llms.txt`, `server.json`, Glama metadata
  and MCP client snippets.
- Privacy, security and readiness checks that help users decide what to install.

## Paid Support Paths

- **Setup concierge:** help installing Delx Wellness in Claude Desktop, Cursor,
  Hermes, OpenClaw, Goose or another MCP client.
- **MCP audit:** use `mcp-scorecard` plus manual review to harden a server for
  agent discovery, privacy, annotations, schemas and registry submission.
- **Private deployment:** hosted or self-hosted connector stacks for teams that
  need managed OAuth, rate limits, secrets handling and support.
- **Custom connector work:** scoped implementation for a provider, domain or
  internal API when the result can be maintained cleanly.

Start with GitHub Sponsors for open-ended support:

```text
https://github.com/sponsors/davidmosiah
```

For project or setup work, use:

```text
support@delx.ai
```

## Boundaries

- Do not send OAuth tokens, refresh tokens, provider secrets, raw health exports,
  GPS traces or private logs by email, issue, PR or chat.
- Paid support does not turn the connectors into medical devices or clinical
  tools.
- Provider terms still apply. Unofficial connectors remain unofficial.
- Hosted/private work must keep the open-source boundary explicit: no private
  token vault, billing code, user data or partner-only API details should be
  copied into the public repos.

## Maintainer Loop

Before promoting a repo publicly, verify:

- `README.md` explains the value in the first screen.
- `server.json`, `mcpName`, `llms.txt`, `glama.json`, license and package
  metadata are current.
- `SECURITY.md`, `CONTRIBUTING.md`, issue templates and funding metadata exist.
- `npm test` or the repo-specific CI gate passes.
- The README asks for a star only after showing practical value.
