# Using the Delx Wellness fleet with Goose

[Goose](https://block.github.io/goose/) is Block's open-source, MCP-native AI agent. Every Delx Wellness connector is a **local-first stdio MCP server** invokable via `npx`, so it drops straight into Goose as a command-line extension.

> Always check the latest extension syntax in the [official Goose docs](https://block.github.io/goose/docs/getting-started/using-extensions) — Goose evolves quickly and this guide favors the stable `config.yaml` + `goose configure` paths.

---

## 1. Set up the connector locally first (one time)

These servers are **local-first**: OAuth tokens are stored on *your* machine (`~/.<vendor>-mcp/`, chmod 600), never on a cloud. Before adding a connector to Goose, run its one-time setup/auth (see each connector's README — most are `npx -y <package> setup` then, for OAuth vendors, `npx -y <package> auth`). Example:

```bash
npx -y whoop-mcp-unofficial setup
npx -y whoop-mcp-unofficial auth     # OAuth vendors only
```

Nothing leaves your machine except calls to the vendor's own API.

---

## 2. Add to Goose — option A: `goose configure` (interactive)

```text
goose configure
  → Add Extension
  → Command-line Extension
  → Name:    whoop
  → Command: npx -y whoop-mcp-unofficial
  → Timeout: 300
  → (add env vars if the connector needs them)
```

Repeat per connector you want.

## 3. Add to Goose — option B: edit `config.yaml`

Goose reads `~/.config/goose/config.yaml`. Paste the connectors you want under `extensions:`:

```yaml
extensions:
  whoop:
    type: stdio
    cmd: npx
    args: ["-y", "whoop-mcp-unofficial"]
    enabled: true
    timeout: 300
  oura:
    type: stdio
    cmd: npx
    args: ["-y", "oura-mcp-unofficial"]
    enabled: true
    timeout: 300
  garmin:
    type: stdio
    cmd: npx
    args: ["-y", "garmin-mcp-unofficial"]
    enabled: true
    timeout: 300
  fitbit:
    type: stdio
    cmd: npx
    args: ["-y", "fitbit-mcp-unofficial"]
    enabled: true
    timeout: 300
  withings:
    type: stdio
    cmd: npx
    args: ["-y", "withings-mcp-unofficial"]
    enabled: true
    timeout: 300
  strava:
    type: stdio
    cmd: npx
    args: ["-y", "strava-mcp-unofficial"]
    enabled: true
    timeout: 300
  polar:
    type: stdio
    cmd: npx
    args: ["-y", "polar-mcp-unofficial"]
    enabled: true
    timeout: 300
  apple_health:
    type: stdio
    cmd: npx
    args: ["-y", "apple-health-mcp-unofficial"]
    enabled: true
    timeout: 300
  samsung_health:
    type: stdio
    cmd: npx
    args: ["-y", "samsung-health-mcp-unofficial"]
    enabled: true
    timeout: 300
  google_health:
    type: stdio
    cmd: npx
    args: ["-y", "google-health-mcp-unofficial"]
    enabled: true
    timeout: 300
  eight_sleep:
    type: stdio
    cmd: npx
    args: ["-y", "eight-sleep-mcp-unofficial"]
    enabled: true
    timeout: 300
  nourish:
    type: stdio
    cmd: npx
    args: ["-y", "wellness-nourish"]
    enabled: true
    timeout: 300
  air:
    type: stdio
    cmd: npx
    args: ["-y", "wellness-air"]
    enabled: true
    timeout: 300
  cgm:
    type: stdio
    cmd: npx
    args: ["-y", "wellness-cgm-mcp"]
    enabled: true
    timeout: 300
  cycle:
    type: stdio
    cmd: npx
    args: ["-y", "wellness-cycle-coach"]
    enabled: true
    timeout: 300
```

> **Keep it lean.** Goose loads every enabled tool across all extensions, so enable only the connectors you actually use — the wearable servers alone expose 20–50 tools each.

### Bonus (agent infrastructure)

```yaml
  living_body:
    type: stdio
    cmd: npx
    args: ["-y", "delx-living-body"]   # meta-MCP: composes the fleet into one body layer
    enabled: true
    timeout: 300
  memory:
    type: stdio
    cmd: npx
    args: ["-y", "delx-memory"]        # shared local memory across sessions + tools
    enabled: true
    timeout: 300
```

---

## 4. Optional: a `.goosehints` for the wellness stack

Drop a `.goosehints` (plain text/markdown, injected into every Goose request when the Developer extension is enabled) in your project root so the agent inherits the fleet's operating contract:

```text
# Delx Wellness MCPs (local-first, read-first)
- Start with each server's *_connection_status / *_daily_summary before deep calls.
- privacy_mode: summary | structured | raw (default summary). Prefer summary unless asked.
- Writes (log meals, set goals, profile updates) require explicit_user_intent: true — only on a fresh user request.
- Never paste OAuth codes, client secrets, or tokens into prompts.
- This is wellness tooling, not medical advice.
- For Brazilian foods, pass locale pt-BR to nourish.
```

---

## 5. Try it

> "Should I train hard today?" → Goose reads WHOOP recovery + Garmin Body Battery + last 3 nights of sleep and gives a go/caution/rest call with reasoning.

Full connector list + per-connector setup: [delx-wellness registry](https://github.com/davidmosiah/delx-wellness) · [wellness.delx.ai](https://wellness.delx.ai)
