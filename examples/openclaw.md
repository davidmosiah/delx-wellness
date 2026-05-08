# OpenClaw Example

## Recommended profile setup

If you want the full wellness agent experience in OpenClaw, use the Delx Wellness OpenClaw profile pack. It creates a dedicated `delx-wellness` profile with onboarding, SOUL.md, AGENTS.md, wellness skills, MCP presets and setup checks.

```bash
npx -y delx-wellness-openclaw setup
openclaw --profile delx-wellness agent --local --message "Open Delx Wellness onboarding"
```

If the profile does not have a model/provider yet:

```bash
openclaw --profile delx-wellness models
npx -y delx-wellness-openclaw doctor --profile delx-wellness --run-openclaw --test-chat
```

## Manual connector config

OpenClaw stores MCP servers under `mcp.servers` in `~/.openclaw-<profile>/openclaw.json`. The profile pack writes this for you, but the shape is:

```json
{
  "mcp": {
    "servers": {
      "nourish": {
        "command": "npx",
        "args": ["-y", "wellness-nourish"]
      },
      "whoop": {
        "command": "npx",
        "args": ["-y", "whoop-mcp-unofficial"]
      }
    }
  }
}
```

For the full stack, prefer:

```bash
npx -y delx-wellness-openclaw setup --dry-run
npx -y delx-wellness-openclaw setup
```

## Verify before using

```bash
npx -y delx-wellness-openclaw doctor --profile delx-wellness --run-openclaw
openclaw --profile delx-wellness mcp list
openclaw --profile delx-wellness mcp show nourish --json
```

Use `--test-chat` only after a model/provider is configured:

```bash
npx -y delx-wellness-openclaw doctor --profile delx-wellness --run-openclaw --test-chat
```

## Safety reminders

- Do not paste passwords, OAuth tokens, refresh tokens or raw health exports into chat.
- Each connector stores its own tokens locally with restrictive file permissions.
- Apple Health and Samsung Health use local export paths, not OAuth.
- This is not medical advice.
