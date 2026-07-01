# Delx Wellness Launch Assets

Use these assets when the hub needs a broad public launch post instead of a
connector-specific sprint. The current primary CTA is to star the canonical hub:
https://github.com/davidmosiah/delx-wellness

Secondary CTA for nutrition-focused audiences: try Nourish through
`wellness-nourish` after reading the hub.

## One-Minute Demo Script

1. Open the Delx Wellness hub and show the registry as the source of truth for
   local-first wellness MCP connectors.
2. Pick one connector path: Google Health for Fitbit or Pixel Watch context, or
   Nourish for local nutrition workflows.
3. Run a read-only setup or coverage command, for example:

```bash
npx -y google-health-mcp-unofficial coverage --json
```

4. Show the agent-facing surfaces: connection status, privacy audit, and daily
   summary or coverage output.
5. End with the privacy boundary: tokens and raw health data stay local, and
   public reports should only include redacted setup feedback.

## X Post

Local-first wellness MCPs should be boring in the right places:

- no hosted token vault
- no hidden health data copy
- readable privacy audits
- installable agent contracts

Delx Wellness is the public hub for the connector stack.

CTA: star the hub so more MCP builders can find it:
https://github.com/davidmosiah/delx-wellness

## LinkedIn Post

AI agents need better real-world context, but wellness data should not require a
hosted token vault or a new data silo.

Delx Wellness is an open-source registry for local-first MCP connectors across
wearables, recovery, nutrition, training, air quality and health exports. The
goal is simple: make useful agent workflows possible while keeping credentials
and raw personal data under the user's control.

The public hub includes connector metadata, privacy notes, release docs, and
setup paths for builders who want to test MCP-based wellness workflows.

CTA: star the hub if local-first agent infrastructure is useful to your work:
https://github.com/davidmosiah/delx-wellness

## Reddit Post

Title: I am building local-first wellness MCP connectors for AI agents

I have been working on an open-source hub for wellness MCP connectors. The main
idea is that an AI agent should be able to use recovery, activity, sleep,
nutrition or health-export context without sending OAuth tokens or raw personal
health data to a hosted middleware service.

The hub collects the connector registry, setup notes, privacy boundaries and
release docs:
https://github.com/davidmosiah/delx-wellness

The most useful feedback right now is from people who have tried MCP clients and
care about local-first data handling.

CTA: star the hub if you want to follow the project, or try Nourish if you want a
nutrition-focused starting point.

## Hacker News Submission

Title: Show HN: Local-first wellness MCP connectors for AI agents

Post:

I built a public hub for local-first wellness MCP connectors. The stack is meant
for AI agents that need wearable, recovery, training, nutrition or health-export
context without relying on a hosted token vault.

The hub includes a connector registry, privacy model, release index, setup docs
and distribution notes. The current practical focus is read-only validation and
safe setup feedback rather than medical advice or hidden cloud sync.

CTA: star the hub if the local-first MCP approach is useful, and share setup
feedback if you try one connector:
https://github.com/davidmosiah/delx-wellness

## Safe Visual Assets

- Use generated diagrams of the architecture or terminal screenshots with
  synthetic data.
- Use screenshots of docs, registry metadata, install commands and redacted
  coverage reports.
- Do not show OAuth tokens, client secrets, token paths, real health metrics,
  GPS traces, sleep details or account identifiers.
- Do not imply affiliation with Google, Fitbit, WHOOP, Garmin, Withings, Apple,
  Oura, Samsung or any other provider.
