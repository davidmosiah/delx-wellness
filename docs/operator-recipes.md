# Operator Recipes

Operator recipes are runnable wellness loops for local AI agents. Each recipe
must be useful on a fresh install, name its data requirements, and keep secrets
out of chat.

Use these when you want a concrete outcome instead of a connector list.

## Available Today

| Outcome | Runtime | Recipe | Command |
|---|---|---|---|
| Daily recovery, nutrition and missing-setup plan | Hermes | [Hermes Daily Operator](hermes-daily-operator.md) | `hermes -p delx-wellness -z "$(npx -y delx-wellness-hermes operator --prompt-only)"` |
| Daily recovery, nutrition and missing-setup plan | OpenClaw | [OpenClaw Daily Operator](openclaw-daily-operator.md) | `openclaw --profile delx-wellness agent --local --message "$(npx -y delx-wellness-openclaw operator --prompt-only)"` |
| Prove the body layer without accounts | Any terminal | [Living Body Zero-Secret Demo](living-body-zero-secret-demo.md) | `npx -y delx-living-body demo` |
| One unified wellness brief across installed connectors | Any MCP client | `delx-living-body` daily brief | Ask your client to call `living_body_daily_brief` after starting `npx -y delx-living-body` |
| No-OAuth nutrition first run | Any MCP client | Nourish local estimate | Start `npx -y wellness-nourish`, then ask for a meal estimate without logging unless you explicitly confirm |

## Security Standard

Every public recipe must satisfy this bar:

- It works without pasting OAuth tokens, refresh tokens, cookies, passwords,
  API keys, or raw secret files into chat.
- It starts with setup or readiness checks before asking for health data.
- It separates observed data from suggestions.
- It treats health, nutrition, sleep and training context as sensitive.
- It does not write logs, saved meals, goals, hydration or profile updates
  unless the user explicitly asks for a save.
- It avoids diagnosis and treatment claims.

## Recipe Template

When adding a new recipe, include:

1. Outcome: the useful job the agent completes in one run.
2. Runtime: OpenClaw, Hermes, Claude Desktop, Cursor, Goose, Codex or generic
   MCP.
3. Prerequisites: profile pack, connectors and optional provider auth.
4. Command: the smallest command or prompt that starts the loop.
5. Output contract: the sections the agent must return.
6. Safety contract: write gates, secret handling and medical boundaries.
7. Verification: local command, CI check, package version or release link that
   proves the recipe is current.

## Next Recipes To Ship

- Living Body One-Entry Brief: a generic MCP prompt for Claude Desktop, Cursor,
  Goose and Codex that calls only the meta-MCP surface after the zero-secret
  demo proves the package.
- Recovery-to-Meal Loop: combines wearable readiness with Nourish suggestions
  while keeping food logging behind explicit confirmation.
