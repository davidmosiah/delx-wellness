# Hermes Daily Operator

This is the fastest path from "I installed the stack" to "my Hermes agent did
something useful today." It uses `delx-wellness-hermes@0.3.0` and the Daily
Operator prompt shipped in that package. It is part of the
[Operator Recipes](operator-recipes.md) catalog.

## Install

```bash
npx -y delx-wellness-hermes setup
hermes -p delx-wellness model
```

`setup` creates a dedicated `delx-wellness` Hermes profile, writes local MCP
connector presets, installs wellness skills, creates onboarding files, installs
`DAILY_OPERATOR.md`, and checks the Nourish preset. Nourish works without
OAuth, so the operator can produce value before any wearable is connected.

## Run The Operator

```bash
hermes -p delx-wellness -z "$(npx -y delx-wellness-hermes operator --prompt-only)"
```

The operator asks Hermes to:

1. Check setup and data availability.
2. Prefer `delx-living-body` when available because it composes multiple
   connectors.
3. Fall back to direct provider tools and Nourish when the unified layer is not
   available.
4. Return one daily read, evidence bullets, one training or recovery action,
   one nutrition or hydration action, and a missing-setup checklist.

## Preview Or Reinstall The Prompt

```bash
npx -y delx-wellness-hermes operator
npx -y delx-wellness-hermes operator --prompt-only
npx -y delx-wellness-hermes operator --write
```

`--write` copies `DAILY_OPERATOR.md` into the active Hermes profile without
running the full setup again.

## No-OAuth First Run

If WHOOP, Garmin, Oura, Strava, Fitbit, Google Health, Withings, Apple Health,
Samsung Health, Polar, or other providers are not connected yet, start with
Nourish:

```text
Run the Delx Wellness Daily Operator loop, but use Nourish first. Estimate a
practical breakfast idea for today and do not log anything unless I explicitly
confirm.
```

This keeps the first experience useful while still respecting local-first
credentials and explicit user intent for writes.

## Security Rules

- Do not paste OAuth tokens, refresh tokens, cookies, passwords, API keys, or
  raw secret files into chat.
- Configure credentials through each connector's local setup command.
- Do not log food, water, goals, or saved meals unless you explicitly ask the
  agent to save.
- Treat health, nutrition, sleep, and training data as sensitive.
- The operator gives wellness guidance, not medical diagnosis or treatment.

## Troubleshooting

Check the profile:

```bash
npx -y delx-wellness-hermes doctor --profile delx-wellness --run-hermes
hermes -p delx-wellness mcp list
```

Check a no-OAuth connector:

```bash
hermes -p delx-wellness mcp test nourish
```

If the agent cannot answer with provider data, ask:

```text
Use delx-wellness-setup. Check the Delx Wellness Hermes profile, list available
MCP servers, and give me the smallest next setup command. Do not ask me to
paste secrets into chat.
```
