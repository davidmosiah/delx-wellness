# Living Body Zero-Secret Demo

This recipe proves the Delx Wellness body layer without requiring any wearable
account, OAuth flow, API key, export file, or network access.

## Run

```bash
npx -y delx-living-body demo
```

The demo boots the real `delx-living-body` MCP server, fakes three installed
connectors with bundled synthetic WHOOP, Oura, and Garmin child MCPs, then asks:

```text
What should I do today?
Should I train hard today?
```

It exercises the same path an agent uses:

1. `living_body_status` detects available connectors.
2. `living_body_ask` composes child connector context.
3. The rule-based synthesizer returns a recommendation, confidence, sources,
   and reasoning trace.

## Low-Readiness Scenario

```bash
npx -y delx-living-body demo --scenario=red
```

Use this to verify the conservative branch: low recovery, poor sleep, depleted
Body Battery, and high load should produce an easy-day recommendation.

## Security Contract

- No real credentials are read.
- No provider network calls are made.
- No LLM call is made by `delx-living-body`.
- Synthetic child MCPs run only inside the demo process.
- The demo still proves the real detector, server transport, composer,
  normalizer, and synthesizer code path.

## Verification

The `v0.3.0` release verified:

- `npm test`
- `npm audit --audit-level=low`
- `npm pack --dry-run`
- GitHub CI and CodeQL
