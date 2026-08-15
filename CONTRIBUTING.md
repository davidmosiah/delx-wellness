# Contributing

Contributions are welcome around connector metadata, install examples, registry accuracy, privacy docs and agent client examples.

## Local development

```bash
python3 -m json.tool registry.json >/dev/null
node scripts/validate-schema.mjs
node scripts/validate-peers.mjs
rg "<provider-or-package>"
```

## Design rules

- Keep `registry.json`, provider docs and connector tables in sync.
- Do not commit user health data, OAuth tokens, API secrets, private hub code, billing logic or token-vault details.
- Keep the open-source boundary explicit.
- Keep each connector installable and understandable on its own.
- Preserve the disclaimer: not a medical device and not medical advice.
- **Series contract (`agent-safe-series/v1`):** a field change needs a golden fixture **and** `mcp-scorecard` still ≥90. See [agent-safe-series.md](docs/agent-safe-series.md).
- **New connector:** named external requester + use case ([oss-strategy-policies.md](docs/oss-strategy-policies.md) #98). First-party connectors go in `connectors[]` and must meet the quality standard.
- **Peer catalog hop:** independent projects go in `peers[]`, not `connectors[]`. Do not add a `package` we `npm view`. Notes must say the hop is not Delx-operated and not medical advice, plus unofficial / region / auth caveats when those apply.

## Pull request checklist

- `registry.json` is valid JSON.
- Provider status docs are updated when connector status changes.
- README connector tables (and the peer table / decision-tree) are updated when registry entries change.
- Peer hops go in `peers[]` only. Do not add them to `connectors[]`.
- Examples remain copy-pasteable for agent clients.
