# Unified doctor — money MCPs (not wellness registry)

These unofficial packages are David Life dogfood. They must **not** appear in `registry.json`.

```bash
node dist/index.js doctor --json   # in each repo after npm test
```

| Package | Prefix | Pin (2026-09-01) |
| --- | --- | --- |
| ifood-mcp-unofficial | `ifood_` | 0.1.5 |
| rappi-mcp-unofficial | `rappi_` | 0.1.8 |
| ninenine-mcp-unofficial | `ninenine_` | 0.1.2 |
| ze-mcp-unofficial | `ze_` | 0.1.4 |
| clickbus-mcp-unofficial | `clickbus_` | 0.1.2 |

Token capture stays local (`tokens.json` 0600). Prefer DevTools copy of `Authorization` into `auth --from-header` on the machine — never paste Bearer into chat, Drive, or git.

Chrome DevTools MCP can open the consumer site and list Network headers; the agent then runs `auth --from-header` locally. Do not echo the token.
