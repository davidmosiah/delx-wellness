# Contributing

Contributions are welcome around connector metadata, install examples, registry accuracy, privacy docs and agent client examples.

## Local development

```bash
python3 -m json.tool registry.json >/dev/null
rg "<provider-or-package>"
```

## Design rules

- Keep `registry.json`, provider docs and connector tables in sync.
- Do not commit user health data, OAuth tokens, API secrets, private hub code, billing logic or token-vault details.
- Keep the open-source boundary explicit.
- Keep each connector installable and understandable on its own.
- Preserve the disclaimer: not a medical device and not medical advice.

## Pull request checklist

- `registry.json` is valid JSON.
- Provider status docs are updated when connector status changes.
- README connector tables are updated when registry entries change.
- Examples remain copy-pasteable for agent clients.
