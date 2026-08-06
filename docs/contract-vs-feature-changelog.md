# Contract vs feature changelog convention

- **Contract** changes (agent-safe-series field rename, required envelope keys, scorecard hard fails): bump **minor** of affected MCP if additive; **major** if agents break.
- **Feature** changes (new optional tool, demo polish): patch or minor without contract bump.
- Always mention `agent-safe-series/v1` when series envelope changes.
- Hub ADR: [adr/001-agent-safe-series-v1.md](./adr/001-agent-safe-series-v1.md).
