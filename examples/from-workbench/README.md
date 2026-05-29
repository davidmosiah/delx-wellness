# Workbench prompt templates

Copyable, client-agnostic agent prompt templates salvaged from the retired
`delx-agent-workbench` repo. Unlike the MCP client configs in the parent
`examples/` folder (which tell a client *which servers to run*), these tell the
agent *what to do first* and *how to behave* once the wellness connectors are
wired up.

| File | Use it as |
|---|---|
| [`agent-rules.md`](agent-rules.md) | A short rules block to drop into your agent's system/`AGENTS.md` — readiness-first, privacy-safe, non-medical. |
| [`wellness-operator-profile.md`](wellness-operator-profile.md) | A `SOUL.md`-style operator persona for a local-first wellness agent, including a default daily-brief structure. |

Both are local-first and privacy-safe by design: they never ask the user to
paste OAuth tokens or health exports into chat, and they keep wellness output
conservative and non-medical.
