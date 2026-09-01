# npx doctor matrix

First-call health:

| Package | Doctor / status |
|---|---|
| google-health-mcp-unofficial | `doctor` / setup |
| wellness-nourish | `doctor` |
| whoop-mcp-unofficial | connection_status tools |
| garmin-mcp-unofficial | setup --auth |

Pins must match [release-index.md](./release-index.md).

Money MCPs (David Life dogfood, **not** in `registry.json`):

```bash
npx -y ifood-mcp-unofficial@0.1.4 doctor --json
npx -y rappi-mcp-unofficial@0.1.8 doctor --json
npx -y ninenine-mcp-unofficial@0.1.2 doctor --json
npx -y ze-mcp-unofficial@0.1.3 doctor --json
npx -y clickbus-mcp-unofficial@0.1.2 doctor --json
```

Expect `unofficial: true`, `never_pays_by_default: true`, `mutations_enabled: false`.

Refreshed 2026-09-01 against live pins: GH `0.7.7` · Garmin `0.7.5` · Whoop `0.6.4` · nourish `0.8.2` · hermes `0.3.11` · living-body `0.3.6`.
