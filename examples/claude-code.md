# Claude Code Example

Claude Code can add MCP servers from JSON with `claude mcp add-json`.

```bash
claude mcp add-json whoop '{"command":"npx","args":["-y","whoop-mcp-unofficial"]}'
claude mcp add-json garmin '{"command":"npx","args":["-y","garmin-mcp-unofficial"]}'
claude mcp add-json oura '{"command":"npx","args":["-y","oura-mcp-unofficial"]}'
claude mcp add-json strava '{"command":"npx","args":["-y","strava-mcp-unofficial"]}'
claude mcp add-json fitbit '{"command":"npx","args":["-y","fitbit-mcp-unofficial"]}'
claude mcp add-json google_health '{"command":"npx","args":["-y","google-health-mcp-unofficial"]}'
claude mcp add-json withings '{"command":"npx","args":["-y","withings-mcp-unofficial"]}'
claude mcp add-json apple_health '{"command":"npx","args":["-y","apple-health-mcp-unofficial"]}'
claude mcp add-json samsung_health '{"command":"npx","args":["-y","samsung-health-mcp-unofficial"]}'
claude mcp add-json polar '{"command":"npx","args":["-y","polar-mcp-unofficial"]}'
claude mcp add-json nourish '{"command":"npx","args":["-y","wellness-nourish"]}'
```

Verify:

```bash
claude mcp list
```

Keep provider credentials in each connector's local setup flow. Do not paste OAuth tokens, API keys, cookies or raw health exports into chat.
