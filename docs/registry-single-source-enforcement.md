# Registry single-source enforcement

1. `registry.json` is canonical (see also oss-registry-single-source.md).
2. `STATUS.md` is generated only by `node scripts/sync-registry.mjs`.
3. Site/connectors must not hardcode version tables.
4. Local: `node scripts/sync-registry.mjs --check` fails on drift. Prove it on a machine; this hub does not rely on a paid GitHub Actions plan.
5. `docs/release-index.md` strategic tables must match npm after sync.
6. `peers[]` is catalog metadata only. Never `npm view` or pin a peer.
7. Fitbit, Oura, Polar, and Withings GitHub `repository` URLs must use hyphenated canonical slugs (`fitbit-mcp`, `oura-mcp`, `polar-mcp`, `withings-mcp`). Official MCP Registry names (`io.github.davidmosiah/fitbitmcp` and siblings) are published live IDs and stay unchanged. Local gate: `node scripts/validate-canonical-github-slugs.mjs`.
