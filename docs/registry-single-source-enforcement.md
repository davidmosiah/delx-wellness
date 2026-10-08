# Registry single-source enforcement

1. `registry.json` is canonical (see also oss-registry-single-source.md).
2. `STATUS.md` is generated only by `node scripts/sync-registry.mjs`.
3. Site/connectors must not hardcode version tables.
4. Local: `node scripts/sync-registry.mjs --check` fails on drift. Prove it on a machine; this hub does not rely on a paid GitHub Actions plan.
5. `docs/release-index.md` strategic tables must match npm after sync.
6. `peers[]` is catalog metadata only. Never `npm view` or pin a peer.
7. Every first-party GitHub `repository` URL must be `https://github.com/davidmosiah/<canonical-slug>`. Fitbit, Oura, Polar, Withings, and Garmin keep the hyphenated public slugs (`fitbit-mcp`, `oura-mcp`, `polar-mcp`, `withings-mcp`, `garmin-mcp`); the pre-rename aliases still redirect and must not appear as catalog repo links. Official MCP Registry names (`io.github.davidmosiah/fitbitmcp` and siblings) are published live IDs and stay unchanged. The Kindred peer GitHub URL is `https://github.com/shkyyy18/mi_fitness_data_bridge` (hyphenated path redirects); `io.github.shkyyy18/mi-fitness-data-bridge` stays the published registry name. Local gate: `node scripts/validate-canonical-github-slugs.mjs`.
