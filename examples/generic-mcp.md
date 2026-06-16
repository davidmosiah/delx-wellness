# Generic MCP Client

Most MCP clients (ChatGPT Desktop with MCP enabled, OpenClaw, custom MCP hosts, etc.) accept the standard `mcpServers` shape.

## Fastest path — one MCP that pulls in all the others

If you want a single entry instead of wiring up a dozen servers, use [`delx-living-body`](https://github.com/davidmosiah/delx-living-body). It auto-detects whichever Delx Wellness connectors you already have installed locally and composes them into one unified surface (`living_body_status`, `living_body_daily_brief`, `living_body_ask`, `living_body_health_check`). Synthesis is rule-based and offline — no extra LLM calls, no tokens leave your machine.

```json
{
  "mcpServers": {
    "living_body": {
      "command": "npx",
      "args": ["-y", "delx-living-body"]
    }
  }
}
```

You still install and authenticate the individual connectors below (each handles its own credentials); `delx-living-body` just discovers them and gives the agent one place to ask "how am I doing today?".

## Or wire each connector individually

Use the standard `mcpServers` shape — the same JSON that works for Claude Desktop and Cursor:

```json
{
  "mcpServers": {
    "whoop": {
      "command": "npx",
      "args": ["-y", "whoop-mcp-unofficial"]
    },
    "strava": {
      "command": "npx",
      "args": ["-y", "strava-mcp-unofficial"]
    },
    "fitbit": {
      "command": "npx",
      "args": ["-y", "fitbit-mcp-unofficial"]
    },
    "google_health": {
      "command": "npx",
      "args": ["-y", "google-health-mcp-unofficial"]
    },
    "garmin": {
      "command": "npx",
      "args": ["-y", "garmin-mcp-unofficial"]
    },
    "oura": {
      "command": "npx",
      "args": ["-y", "oura-mcp-unofficial"]
    },
    "withings": {
      "command": "npx",
      "args": ["-y", "withings-mcp-unofficial"]
    },
    "apple_health": {
      "command": "npx",
      "args": ["-y", "apple-health-mcp-unofficial"]
    },
    "samsung_health": {
      "command": "npx",
      "args": ["-y", "samsung-health-mcp-unofficial"]
    },
    "polar": {
      "command": "npx",
      "args": ["-y", "polar-mcp-unofficial"]
    }
  }
}
```

## OAuth setup runs locally first

Each connector wraps its own OAuth (or, for Garmin, a local helper) and stores tokens under user-only permissions in `~/.<provider>-mcp/`. Run setup before adding the snippet to your client:

```bash
npx -y whoop-mcp-unofficial   setup && npx -y whoop-mcp-unofficial   auth
npx -y strava-mcp-unofficial  setup && npx -y strava-mcp-unofficial  auth
npx -y fitbit-mcp-unofficial  setup && npx -y fitbit-mcp-unofficial  auth
npx -y google-health-mcp-unofficial setup && npx -y google-health-mcp-unofficial auth
npx -y garmin-mcp-unofficial  setup && npx -y garmin-mcp-unofficial  auth --install-helper
npx -y oura-mcp-unofficial    setup && npx -y oura-mcp-unofficial    auth
npx -y withings-mcp-unofficial setup && npx -y withings-mcp-unofficial auth
npx -y apple-health-mcp-unofficial setup --export-path /path/to/export.zip
npx -y samsung-health-mcp-unofficial setup --export-path /path/to/SamsungHealth
npx -y polar-mcp-unofficial setup && npx -y polar-mcp-unofficial auth
```

The MCP client never sees your client secrets, OAuth tokens or Garmin credentials. Tools never return tokens.

## Recommended first calls

If you installed `delx-living-body`, start there — one call tells you which connectors it found and whether they're healthy:

```text
living_body_status
living_body_health_check
living_body_daily_brief
```

Otherwise, ask your agent to verify each connector:

```text
whoop_connection_status
strava_connection_status
fitbit_connection_status
google_health_connection_status
garmin_connection_status
oura_connection_status
withings_connection_status
apple_health_connection_status
samsung_health_connection_status
polar_connection_status
```

Then use the workflow tools:

```text
whoop_daily_summary, strava_daily_summary, fitbit_daily_summary, google_health_daily_summary, garmin_daily_summary, oura_daily_summary, withings_daily_summary, apple_health_daily_summary, samsung_health_daily_summary, polar_daily_summary
```

## Safety reminders

- Don't paste OAuth tokens, refresh tokens, Garmin passwords or raw health exports into chat.
- Each connector defaults to a privacy-conscious mode (`structured` or `summary`). Raw payloads are opt-in.
- This is **not medical advice**. Use connectors for personal AI workflows, not diagnosis or treatment.
