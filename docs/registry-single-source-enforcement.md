# Registry single-source enforcement

1. `registry.json` is canonical (see also oss-registry-single-source.md).
2. `STATUS.md` is generated only by `node scripts/sync-registry.mjs`.
3. Site/connectors must not hardcode version tables.
4. CI: `node scripts/sync-registry.mjs --check` fails on drift when available.
5. `docs/release-index.md` strategic tables must match npm after sync.
