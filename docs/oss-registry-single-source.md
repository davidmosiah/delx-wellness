# registry.json is the single source

All public connector version/status surfaces must derive from `registry.json`:

1. Edit only via `node scripts/sync-registry.mjs` (or intentional metadata fields).
2. `STATUS.md` is auto-generated — do not hand-edit.
3. Site/connectors UIs must read registry (or STATUS generated from it), never a parallel table.
4. After any connector publish: run sync, commit, push.

Validated by: `node scripts/validate-schema.mjs`, `node scripts/validate-peers.mjs`, `node scripts/validate-canonical-github-slugs.mjs`, and `npm test` on a local/VM machine. Do not rely on a paid GitHub Actions plan.

`peers[]` is part of the canonical registry. It is a catalog hop list, not a version-synced npm pin list. `scripts/sync-registry.mjs` never `npm view`s peers.
