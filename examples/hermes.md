# Hermes Example

Install each connector independently, then reload or test MCP from Hermes.

```bash
npx -y whoop-mcp-unofficial setup
npx -y strava-mcp-unofficial setup --client hermes --no-auth
npx -y fitbit-mcp-unofficial setup --client hermes --no-auth
npx -y garmin-mcp-unofficial setup --client hermes
```

Then connect providers locally:

```bash
npx -y whoop-mcp-unofficial auth
npx -y strava-mcp-unofficial auth
npx -y fitbit-mcp-unofficial auth
npx -y garmin-mcp-unofficial auth --install-helper
```

Recommended first checks:

```text
whoop_connection_status
strava_connection_status
fitbit_connection_status
garmin_connection_status
```

Do not paste passwords, OAuth tokens, refresh tokens, or raw health exports into chat.
