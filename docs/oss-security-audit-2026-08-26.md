# OSS security audit — 2026-08-26

Follow-up to [oss-security-audit-2026-08-11.md](./oss-security-audit-2026-08-11.md).
Local scan of public Node OSS under `02-mcp-servers/` (git-tracked trees, not `_archive`).

## Method

1. Enumerate local git checkouts with `package.json` (39 Node packages).
2. Git-tracked secret-shaped files (`.env`, `tokens.json`, `*.pem`, private-key blobs).
3. `package.json` `files` and `overrides` vs the 2026-08-11 pin set.
4. `npm audit --omit=dev` high/critical.
5. Fail-closed copy: `RAPPI_ALLOW_MUTATIONS=true` / `IFOOD_ALLOW_MUTATIONS=true` in README / `llms.txt` / `examples/`.

## Result

| Check | Result |
| --- | --- |
| Git-tracked `.env` / `tokens.json` / live private keys | **none** |
| Stale `hono` / `fast-uri` / `ip-address` overrides | **none** (still `hono@4.13.1`, `fast-uri@3.1.5`, `ip-address@10.4.0`) |
| `npm audit --omit=dev` high/critical | **36 CLEAN**, 1 DIRTY (fixed this pass), 2 no lockfile |
| Rappi / iFood README+examples copyable `*_ALLOW_MUTATIONS=true` | **none** |

### DIRTY → fixed

`delx-wellness-site`: stale security override `nanoid@3.3.17` (GHSA-2v37-7h3g-55p8 wants `>=3.3.18`). Transitively flagged `postcss` and `next`. Bumped override to `3.3.18`. Re-audit: **0 vulnerabilities**.

This is the same class as 11/08: a pin that once fixed an advisory froze below the next floor.

### False positives (not shipped secrets)

| Hit | Why ignored |
| --- | --- |
| `mcp-leaderboard` test matches `BEGIN … PRIVATE KEY` | systemd `LoadCredential=….pem` **path**, not a key blob |
| Untracked `.env` on disk in some checkouts | not in `git ls-files` |
| `files: ["src"]` on the three JS video kits | they publish source as the package; no tokens in those trees |
| `files: ["fixtures"]` on nourish / exercise-catalog | demo fixtures, not live credentials |

### Residual

| Item | Status |
| --- | --- |
| `delx-wellness` hub and `openclaw-delx-plugin` | no `package-lock.json` (docs/plugin; not npm-auditable) |
| `eight-sleep-mcp` `llms.txt` still has `EIGHT_SLEEP_ALLOW_MUTATIONS=true` as prose | not money; leftover copyable assignment. Do not treat as a publish blocker |
| Search/home iFood Akamai WAF from datacenter IPs | documented; not a CVE |
| Dependabot still disabled on several public repos | same residual as 11/08 |

## Canonical Node override set (updated)

- `hono`: `4.13.1`
- `@hono/node-server`: `2.1.0`
- `fast-uri`: `3.1.5`
- `ip-address`: `10.4.0`
- `nanoid` (when overridden): `3.3.18`
- `undici`: `>=7.29.0` when present

Command that produced the audit counts:

```bash
# per repo with package-lock.json
npm audit --omit=dev
```
