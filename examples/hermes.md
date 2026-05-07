# Hermes Example

## Recommended profile setup

If you want the full wellness agent experience, use the Delx Wellness Hermes profile pack. It creates a dedicated `delx-wellness` profile with onboarding, SOUL.md, wellness skills, MCP presets and setup checks.

```bash
npx -y delx-wellness-hermes setup
hermes -p delx-wellness
```

If the profile does not have a model/provider yet:

```bash
hermes -p delx-wellness model
npx -y delx-wellness-hermes doctor --profile delx-wellness --run-hermes --test-chat
```

## Manual connector setup

Install each connector independently, then reload or test MCP from Hermes.

```bash
npx -y whoop-mcp-unofficial  setup --client hermes
npx -y strava-mcp-unofficial setup --client hermes --no-auth
npx -y fitbit-mcp-unofficial setup --client hermes --no-auth
npx -y google-health-mcp-unofficial setup --client hermes --no-auth
npx -y garmin-mcp-unofficial setup --client hermes
npx -y oura-mcp-unofficial setup --client hermes --no-auth
npx -y withings-mcp-unofficial setup --client hermes --no-auth
npx -y apple-health-mcp-unofficial setup --client hermes --export-path /path/to/export.zip
npx -y samsung-health-mcp-unofficial setup --client hermes --export-path /path/to/SamsungHealth
npx -y polar-mcp-unofficial setup --client hermes --no-auth
```

Then connect providers locally:

```bash
npx -y whoop-mcp-unofficial   auth
npx -y strava-mcp-unofficial  auth
npx -y fitbit-mcp-unofficial  auth
npx -y google-health-mcp-unofficial auth
npx -y garmin-mcp-unofficial  auth --install-helper
npx -y oura-mcp-unofficial    auth
npx -y withings-mcp-unofficial auth
npx -y polar-mcp-unofficial auth
```

Each `setup --client hermes` writes `~/.hermes/config.yaml` (with a backup), pins the npm package to a known-good version, and installs a per-connector skill under `~/.hermes/skills/<connector>/SKILL.md`.

## Verify before using

```bash
npx -y whoop-mcp-unofficial   doctor --client hermes
npx -y strava-mcp-unofficial  doctor --client hermes
npx -y fitbit-mcp-unofficial  doctor --client hermes
npx -y google-health-mcp-unofficial doctor --client hermes
npx -y garmin-mcp-unofficial  doctor --client hermes
npx -y oura-mcp-unofficial    doctor --client hermes
npx -y withings-mcp-unofficial doctor --client hermes
npx -y apple-health-mcp-unofficial doctor --client hermes
npx -y samsung-health-mcp-unofficial doctor --client hermes
npx -y polar-mcp-unofficial doctor --client hermes
```

Then in Hermes:

```bash
hermes mcp test whoop
hermes mcp test strava
hermes mcp test fitbit
hermes mcp test google_health
hermes mcp test garmin
hermes mcp test oura
hermes mcp test withings
hermes mcp test apple_health
hermes mcp test samsung_health
hermes mcp test polar
```

After config changes use `/reload-mcp` or the `hermes mcp test <name>` command. Don't restart the gateway for normal data access.

## Recommended first calls

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

Then drill into the workflow tools (`*_daily_summary`, `*_weekly_summary`) and the prefixed prompts (`whoop_daily_performance_coach`, `strava_daily_training_director`, `google_health_daily_checkin`, `garmin_daily_checkin`, `fitbit_daily_checkin`, `oura_daily_checkin`, `withings_daily_checkin`, `apple_health_daily_review`, `samsung_health_daily_review`, `polar_daily_checkin`).

## Safety reminders

- Don't paste passwords, OAuth tokens, refresh tokens or raw health exports into chat.
- Each connector stores its own tokens locally with `0600` permissions. The MCP client never receives them.
- This is **not medical advice**.
