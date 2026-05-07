# Generic MCP Client

Most MCP clients (ChatGPT Desktop with MCP enabled, OpenClaw, custom MCP hosts, etc.) accept the standard `mcpServers` shape. Use the same JSON snippet that works for Claude Desktop and Cursor:

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
npx -y garmin-mcp-unofficial  setup && npx -y garmin-mcp-unofficial  auth --install-helper
npx -y oura-mcp-unofficial    setup && npx -y oura-mcp-unofficial    auth
npx -y withings-mcp-unofficial setup && npx -y withings-mcp-unofficial auth
npx -y apple-health-mcp-unofficial setup --export-path /path/to/export.zip
npx -y samsung-health-mcp-unofficial setup --export-path /path/to/SamsungHealth
npx -y polar-mcp-unofficial setup && npx -y polar-mcp-unofficial auth
```

The MCP client never sees your client secrets, OAuth tokens or Garmin credentials. Tools never return tokens.

## Recommended first calls

After installing, ask your agent to verify each connector:

```text
whoop_connection_status
strava_connection_status
fitbit_connection_status
garmin_connection_status
oura_connection_status
withings_connection_status
apple_health_connection_status
samsung_health_connection_status
polar_connection_status
```

Then use the workflow tools:

```text
whoop_daily_summary, strava_daily_summary, fitbit_daily_summary, garmin_daily_summary, oura_daily_summary, withings_daily_summary, apple_health_daily_summary, samsung_health_daily_summary, polar_daily_summary
```

## Safety reminders

- Don't paste OAuth tokens, refresh tokens, Garmin passwords or raw health exports into chat.
- Each connector defaults to a privacy-conscious mode (`structured` or `summary`). Raw payloads are opt-in.
- This is **not medical advice**. Use connectors for personal AI workflows, not diagnosis or treatment.
