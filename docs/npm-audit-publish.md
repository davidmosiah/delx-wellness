# npm audit production on publish

Before `npm publish` on top5: `npm audit --omit=dev` (or `--production`) clean or documented waiver. High/critical is a hard stop.

Canonical Node override set (2026-08-26): `hono@4.13.1`, `@hono/node-server@2.1.0`, `fast-uri@3.1.5`, `ip-address@10.4.0`, `nanoid@3.3.18` when pinned. Never freeze a security override below the current advisory floor — see `docs/oss-security-audit-2026-08-26.md`.
