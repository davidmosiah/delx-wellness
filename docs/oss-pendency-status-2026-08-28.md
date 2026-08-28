# OSS pendency status — 2026-08-28

Follow-up to [oss-pendency-status-2026-08-11.md](./oss-pendency-status-2026-08-11.md) after a live review of the public fleet (GitHub + npm + local git). Distinguishes **closed this pass**, **intentional open**, and **out of scope**.

## Closed this pass

| Item | Action |
| --- | --- |
| Authority probe success row | Logged Kindred `v0.3.0` (2026-08-13) on [monthly-authority-scorecard.md](./monthly-authority-scorecard.md). Criterion ≥1 inbound-of-weight **met**. |
| OSS-300 #31 `BLOCKED-EXTERNAL` | **DONE-shipped**. Cross-link + reciprocal README already existed; the ledger was stale. |
| OSS-200 #15/#91 Kindred README | **DONE-shipped**. Same evidence. |
| OSS-200 #1 second coverage | **DONE-shipped** as honest 1/2 (proof-loop already closed 2026-08-08). Stop pretending we are waiting. |
| OSS-200 #92 Kindred coverage invite | **DONE-already**. No-pressure policy; no invite sent. |
| OSS-100 #28 Kindred README | **DONE-shipped**. |
| `sync-registry.mjs --check` calendar fail | `--check` no longer bumps `last_updated` in memory. A new day is not npm drift. |
| `docs/release-index.md` pin lag | Strategic rows now GH `0.7.7` / Garmin `0.7.5`. Other tables match `registry.json`. |
| Rappi / iFood Dependabot | High-only monthly `dependabot.yml` + vulnerability alerts enabled. |
| `openclaw-delx-plugin` local git | Remote already had the #2 transcript. Local checkout was corrupt; recloned. |

## Intentional open (not debt)

| Item | Why open |
| --- | --- |
| `garmin-mcp` #19 Kindred design log | Peer contract freeze. Reciprocal README is done. Do not close for cleanliness. |
| `google-health-mcp` #2 beta testers | Permanent `help wanted`. Proof loop is 1/2. |
| `delx-wellness` #2 directories | Owner-OK gate. Local checklist exists. No spam-submit. |
| `delx-wellness-hermes` #5 Peloton | Named requester. Replied 2026-08-26: no official API, no ETA. Waiting on *their* unofficial contract if they have one. |
| OSS-100 #18 public post | Needs owner OK. |
| OSS-100 #20 directory PRs | Same gate as hub #2. |
| `delx-protocol` #24–32 | Protocol product backlog, not wellness fleet hygiene. |

## Not in scope this pass

- Peloton connector
- Rappi / iFood catalog expansion or wellness registry rows
- BodyPort / mediagen resale
- Show HN / Anthropic cold DM (probe success does not authorize push)
- Closing Kindred #19 or GH #2 for optics

## Next (only if prioritized)

1. First week of September: run `node scripts/authority-scorecard.mjs` (monthly cadence).
2. Peloton only if `@ampersandru` pastes a local unofficial contract they already use.
3. Directory PRs only with explicit owner OK on #2.
