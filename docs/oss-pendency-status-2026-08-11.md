# OSS pendency status — 2026-08-11

Sweep after “deixar tudo sem pendências”. Distinguishes **actionable**, **SLA-met open**, and **intentional / external**.

## Closed this sweep

| Item | Action |
| --- | --- |
| `delx-memory` #7 (external human) | **Replied** with honest footprint (~76 MB RSS stdio), already-SQLite/FTS (no embeddings), lightweight mode = backlog. Issue **left open** as tracker (not fake-closed). |
| `delx-wellness-hermes` #1 | **Shipped** `docs/setup-transcript.md` + README link; closed. |
| `openclaw-delx-plugin` #2 | **Shipped** `docs/recovery-workflow-transcript.md` + README link; closed. |
| Dependabot high (green CI) | Merged: `delx-mcp-server` #1 (undici), `google-ads-mcp-unofficial` #6/#8/#9. |
| `garmin-mcp` / `whoop-mcp` high transitive | Overrides → `fast-uri@3.1.5`, `ip-address@10.4.0`; patch releases **0.7.3** / **0.6.2**. |
| `delx-witness-protocol` high Python | Combined PR #7 (aiohttp 3.14.3 + cryptography 50.0.0) — single PR so OSV can pass (supersedes stuck #5/#6). |

## Intentional open (not debt)

| Item | Why open |
| --- | --- |
| `delx-wellness` #2 directories | Tracker for awesome/list submissions already opened; wait on **external maintainers** (MERGEABLE PRs). |
| `delx-wellness` #3 site↔registry | **Hub side done** (`registry.json` + `sync-registry.mjs --check`). Remaining work is **delx-wellness-site** codegen/join — separate product slice. |
| `garmin-mcp` #19 Kindred design log | Cross-builder collab record; reciprocal README is on **their** side. |
| `google-health-mcp` #2 beta testers | Intentional `help wanted` / external humans. |
| `delx-memory` #7 lightweight mode | Backlog until RSS moves; SLA met via reply. |
| `delx-protocol` #24–32 etc. | **Protocol product backlog**, not wellness fleet hygiene. Do not “close for cleanliness.” |
| awesome-mcp-servers + other list PRs | External queue — rebase already done; no spam. |
| Dependabot **moderate/low** / monthly batch | Policy: `docs/dependabot-high-only.md`. |

## Not in scope this sweep

- BodyPort / mediagen resale
- New connectors or sprawl
- Paid directory submissions
- Site pipeline implementation for #3 (deferred on purpose)

## Next (only if prioritized)

1. Merge witness #7 when OSV green; close #5/#6.
2. Site slice for hub #3 (generated registry versions + CI drift check).
3. delx-memory lean profile (dynamic import HTTP / tools-only).
4. Monthly high-only Dependabot batch for remaining fleet.
