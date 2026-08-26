# OSS security audit — 2026-08-11

Triggered by the **stale “security override” anti-pattern**: pins that once fixed advisories
were never raised when new CVEs landed (classic: `hono@4.12.27` still vulnerable after
MCP SDK advisories moved the floor to `>=4.12.34` / preferably `4.13.1`).

## Method

1. List public non-archived `davidmosiah/*` repos.
2. Local scan of `package.json` **overrides** for known-bad pins:
   - `hono <= 4.12.33`
   - `fast-uri < 3.1.5`
   - `ip-address < 10.3.1` (fleet standard: `10.4.0`)
   - `nanoid < 3.3.17` (where pinned)
   - `minimatch 9.0.0–9.0.6` (where pinned)
3. GitHub Dependabot **high/critical** open alerts (where enabled).
4. Per-package `npm install` + `npm audit` + `npm test` + publish when fixed.
5. Hub `registry.json` sync for wellness fleet versions.

## Critical finding (class)

| Pattern | Risk |
| --- | --- |
| **Stale security overrides** | `overrides.hono` / `fast-uri` / `ip-address` frozen below current fixed versions → `npm audit` stays red **because of our pin**, not because upstream ignored us |
| **Dependabot disabled** on some public repos | No continuous high/critical signal (403) — reliance on periodic audits |
| **Duplicate/stale trees** | `_archive/*`, `withings-mcp-release` worktree at old HEAD — not production, but confuse local scanners |

## Fixed this audit (published unless noted)

### Wave A — wellness MCP fleet (earlier same day)

All public wellness connectors + `delx-living-body` + `mcp-scorecard` + `delx-memory` + `delx-wellness-hermes`:

- `hono@4.13.1`, `@hono/node-server@2.1.0`
- (prior wave) `fast-uri@3.1.5`, `ip-address@10.4.0`
- Site: `postcss@8.5.26`, `nanoid@3.3.17`, `minimatch@9.0.9` / nested `10.2.6` → **0 audit vulns**
- Witness (`delx-witness-protocol`): `aiohttp==3.14.3`, `cryptography==50.0.0` (PR #7)

### Wave B — remaining public OSS with bad pins (this pass)

| Package | Version | Notes |
| --- | --- | --- |
| `short-video-agent-kit` | 0.1.10 | was hono 4.12.32 + fast-uri/ip high |
| `tiktok-agent-publisher` | 0.1.7 | same |
| `youtube-shorts-agent` | 0.1.8 | same |
| `astral-mcp` | 0.3.1 | added full secure override set |
| `google-ads-mcp-unofficial` | 0.1.4 | same |
| `exercise-catalog-mcp-private` | 0.1.1 | **private** package; commit only |
| `delx-mcp-server` | 0.3.1 | **undici high** + hono overrides |

## Dependabot high/critical snapshot (scan)

- **6 open high alerts** before Wave B — all on the three video kits (`fast-uri`, `ip-address`).
- **30 / 46** scanned repos clean (0 high/critical).
- **~12 repos**: Dependabot alerts **disabled** (403) — treat as “no continuous signal”, not “secure”.

Repos with Dependabot disabled (non-exhaustive): `delx-protocol`, `delx-agent-commerce`, `delx-site`, `delx-security`, `delx-platform`, `delx-plugins`, `delx-mcp-kit`, `creative-forge`, `agents-that-ship`, `mcp-leaderboard`, `timeline-pulse`, `uap-pulse`, `astral-mcp` (at scan time).

## Residual / not production

| Item | Status |
| --- | --- |
| `02-mcp-servers/_archive/*` | Corrupt/archive copies with old pins — **do not publish**; leave or delete later |
| `withings-mcp-release/` | Stale local checkout of `withings-mcp` at old version — canonical is `withings-mcp` main |
| Low severity leftovers | e.g. astral-mcp **1 low** after fix — not blocking |
| Python product monorepos | `delx-protocol` production path fixed via witness PR #7; some product `requirements` use floor pins (`>=`) which is OK |
| iOS / boring-apps | Out of this OSS npm audit scope |

## Follow-up

Re-audit 2026-08-26: [oss-security-audit-2026-08-26.md](./oss-security-audit-2026-08-26.md). Stale `nanoid@3.3.17` on the public wellness site was the only high.

## Security policy going forward

1. **Never freeze a “security override” without a ceiling review.** Prefer `>=fixed` only when lockfile enforces; otherwise pin **exact latest fixed** and re-run fleet audit after each MCP SDK bump.
2. **Canonical override set (Node MCP packages, 2026-08-11):**
   - `hono`: `4.13.1`
   - `@hono/node-server`: `2.1.0`
   - `fast-uri`: `3.1.5`
   - `ip-address`: `10.4.0`
   - `undici`: `>=7.29.0` when present
3. **Gates before publish:** `npm audit` (0 high/critical; prefer 0 total) + full `npm test` + registry sync for wellness packages.
4. **Enable Dependabot high-only** on remaining public repos (or monthly `npm audit` cron) — open follow-up if product wants it.

## Proof commands

```bash
# Local pin scan (Developer tree)
rg -n '"hono":\s*"4\.12' ~/Developer/02-mcp-servers/*/package.json

# Per package
npm audit && npm test

# Hub registry
cd ~/Developer/02-mcp-servers/delx-wellness && npm test
```
