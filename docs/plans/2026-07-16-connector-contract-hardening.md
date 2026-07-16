# Connector Contract Hardening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply the Polar 0.3.8 lessons to all 16 maintained Delx Wellness connectors so request formatting, payload extraction, structured privacy, summaries, and partial failures are protected by executable contracts.

**Architecture:** Each provider keeps its own explicit boundary contract because dates, pagination, feature expansion, and payload envelopes differ by API. A shared quality standard defines invariants, while provider-local tests exercise the real client URL/body builder and privacy/summary code without network credentials. Local-export and computational connectors implement only the applicable payload-preservation and normalization invariants; they do not gain artificial HTTP abstractions.

**Tech Stack:** TypeScript, Node.js, MCP TypeScript SDK, Zod, provider-local `.mjs` regression scripts, npm, GitHub Actions, npm registry.

---

## Scope and classification

| Family | Connectors | Required contract |
| --- | --- | --- |
| Remote provider APIs | WHOOP, Oura, Garmin, Strava, Fitbit, Google Health, Withings, Polar, Eight Sleep | Request serialization, pagination/expansion, payload envelope extraction, structured privacy, summary path, observable failures |
| Multi-provider remote APIs | Air (PurpleAir, Airthings, AirGradient), CGM (Dexcom, LibreLink) | Provider-specific auth/query/body contracts, payload extraction, redaction, observable failures |
| Local exports | Apple Health, Samsung Health | Parser envelope, unknown-field preservation where structured output promises it, freshness/incremental import, malformed-record visibility |
| Computational/context connectors | Nourish, Cycle Coach, Exercise Catalog | Provider/source normalization without data loss, source attribution, deterministic error/fallback contracts |

Polar 0.3.8 is the reference implementation and regression baseline. It should be re-verified but not changed again unless the cross-connector audit finds a concrete regression.

## Global acceptance criteria

1. Every remote provider client has at least one HTTP-boundary test that inspects the actual outgoing URL, repeated query parameters or request body produced by production code.
2. Endpoint-specific differences are represented explicitly in a contract table or by endpoint-scoped serializers; no global date or pagination rule may silently apply to incompatible endpoints.
3. Structured mode preserves upstream fields and nested objects after secret/GPS redaction. Normalized aliases are additive. Summary mode may return a flattened-only representation.
4. Summary/context tools use the same production client boundary as direct list tools, rather than rebuilding provider query parameters independently.
5. Partial aggregations log each underlying provider/domain failure to stderr and clearly report partial confidence/status in the returned payload.
6. Each new behavior follows RED -> GREEN: the regression test must fail for the expected reason before production code changes.
7. Each affected package passes its complete `npm test`, `npm pack --dry-run`, metadata consistency, GitHub CI and CodeQL gates.
8. Every affected public npm package receives one patch release only after the repository gate is green. Registry/hub metadata is updated after npm publication is verified.
9. No tokens, real health records, private user identifiers, or live request dumps enter fixtures, logs, commits, or release artifacts.

## Task 1: Publish the cross-connector quality contract

**Files:**
- Modify: `delx-wellness/docs/connector-quality-standard.md`
- Create: `delx-wellness/docs/connector-contract-standard.md`
- Modify: `delx-wellness/README.md`

**Step 1: Write a failing registry documentation check**

Extend the hub validation so every catalog connector declares a boundary type: `remote_api`, `multi_provider_api`, `local_export`, or `computational`. The test must fail while the field is absent.

**Step 2: Run the check and record RED**

Run: `npm test`

Expected: FAIL listing the 16 connector entries missing `quality.boundary_contract`.

**Step 3: Document the standard and update registry entries**

Define request, envelope, privacy, summary and error-observability invariants. Add the boundary classification to all 16 entries without changing their tier.

**Step 4: Run the hub gate**

Run: `npm test && python3 -m json.tool registry.json >/dev/null`

Expected: PASS with all connector-quality and registry checks green.

**Step 5: Commit and push**

```bash
git add README.md registry.json docs/connector-quality-standard.md docs/connector-contract-standard.md scripts
git commit -m "Define executable connector boundary contracts"
git push origin main
```

## Task 2: Harden the OAuth wearable template family

**Repositories:** `whoop-mcp`, `oura-mcp`, `strava-mcp`, `fitbit-mcp`, `google-health-mcp`, `withings-mcp-release`

**Files in each repository:**
- Create: `scripts/endpoint-contract-test.mjs` or the provider-equivalent name
- Modify: `src/services/*-client.ts`
- Modify: `src/services/privacy.ts`
- Modify: `src/services/summary.ts` when it bypasses the production client
- Modify: `scripts/privacy-cache-test.mjs`
- Modify: `scripts/summary-fixture-test.mjs`
- Modify: `package.json`, `package-lock.json`, `server.json`, `src/constants.ts`, `CHANGELOG.md`, `README.md`

**Step 1: Audit official/current provider contracts**

For each registered tool, map endpoint, HTTP method, date representation, pagination keys, repeated/array parameters, response envelope and detail-expansion limits. Record only distinctions exercised by the connector.

**Step 2: Write provider-local failing HTTP-boundary tests**

Instantiate the production client with a temporary token store and replace `globalThis.fetch`. Assert exact URL/body serialization and record extraction for at least one date-filtered collection and one paginated or expanded collection. Tests must fail on a real missing or over-generalized contract, not on a renamed internal helper.

**Step 3: Write failing structured-preservation tests**

Pass a synthetic record containing both a nested upstream object and a colliding normalized alias. Assert that structured mode retains the upstream value/object, removes secret/GPS fields, and keeps non-colliding aliases additive. Assert that summary mode returns only the documented compact projection.

**Step 4: Verify RED**

Run the new focused scripts before editing production code. Save the exact expected mismatch for the execution report.

**Step 5: Implement the minimum endpoint contract**

Use an explicit provider-local map when two endpoints differ. Preserve upstream fields with merge order `{ ...normalizedAliases, ...upstreamRecord }`, followed by secret/GPS redaction. Do not add feature flags, endpoints or abstractions that the provider does not require.

**Step 6: Route summaries through the production client**

Replace any summary-only query construction with the same list/get method used by direct tools. Keep partial aggregation, but emit every underlying error through the existing redacted stderr logger.

**Step 7: Verify GREEN and full gate**

Run: `npm test && npm pack --dry-run && git diff --check`

Expected: all existing and new tests pass, package metadata is consistent, and no secret-like fixture appears in the tarball.

**Step 8: Commit and push each repository separately**

Commit message: `Harden <Provider> endpoint and payload contracts`

## Task 3: Harden Garmin and Eight Sleep private/undocumented APIs

**Repositories:** `garmin-mcp`, `eight-sleep-mcp`

**Files:** provider clients, privacy normalizers, summary/context builders, new boundary tests, existing fixture tests, release metadata and docs.

**Step 1: Derive contracts from production client/tool pairs and sanitized fixtures**

Do not invent official guarantees for undocumented endpoints. Treat currently supported URL shapes, query keys and envelopes as versioned connector contracts and cover them at the HTTP boundary.

**Step 2: Write failing regressions for divergent endpoint shapes**

Garmin must cover endpoints that use date-only values and nested DTO envelopes. Eight Sleep must cover `client` versus `app` API bases and trend range serialization.

**Step 3: Write failing nested-payload preservation tests**

Garmin must prove nested `dailySleepDTO` data is not replaced by flattened aliases. Eight Sleep must prove structured trend/session data remains complete after redaction.

**Step 4: Implement minimal contract maps/serializers and preservation fixes**

Keep endpoint knowledge local to each provider. Reject unsupported contract combinations with actionable errors.

**Step 5: Run complete gates, commit and push each repository**

Run: `npm test && npm pack --dry-run && git diff --check`

## Task 4: Harden multi-provider Air and CGM connectors

**Repositories:** `wellness-air`, `wellness-cgm-mcp`

**Files:** each provider client, tools/services that normalize responses, new provider-contract tests, package scripts, release metadata and docs.

**Step 1: Synchronize repository state safely**

`wellness-air` is currently behind its remote. Pull only after obtaining its lock and confirming a clean worktree. Never repair or rewrite history as part of this task.

**Step 2: Write one failing boundary test per provider implementation**

Air: PurpleAir, Airthings and AirGradient. CGM: Dexcom and LibreLink. Assert provider-specific auth placement, date/range serialization, pagination where present and payload envelope extraction.

**Step 3: Write failing normalization/redaction tests**

Assert source attribution and preservation of unknown/nested physiological/environmental fields while credentials, precise device identifiers and any sensitive location fields remain redacted.

**Step 4: Implement only demonstrated fixes**

Keep separate provider contracts. Do not force the same parameter names or envelopes across providers.

**Step 5: Run complete gates, commit and push each repository**

Run: `npm test && npm pack --dry-run && git diff --check`

## Task 5: Harden local-export connectors

**Repositories:** `apple-health-mcp`, `samsung-health-mcp`

**Files:** export parsers, privacy normalizers, export/parser tests, incremental-cache/freshness tests, release metadata and docs.

**Step 1: Write failing parser-contract fixtures**

Add synthetic records with provider-specific known fields, an unknown future field, nested metadata and malformed siblings. Assert valid records survive, unknown structured data is preserved when promised, and malformed rows produce observable diagnostics instead of silently erasing the batch.

**Step 2: Verify RED**

Run the focused export test and confirm the failure represents data loss or swallowed diagnostics.

**Step 3: Implement minimal parser/normalizer changes**

Preserve forward-compatible fields only in structured output, maintain secret/privacy rules, and keep summary output compact.

**Step 4: Run complete import/freshness gates**

Run: `npm test && npm pack --dry-run && git diff --check`

**Step 5: Commit and push each repository**

## Task 6: Harden computational and source-normalizing connectors

**Repositories:** `wellness-nourish`, `wellness-cycle-coach`, `exercise-catalog-mcp`

**Files:** provider/source normalization services, context/summary builders, focused fixtures, package scripts, release metadata and docs.

**Step 1: Protect existing unrelated work**

`exercise-catalog-mcp/package-lock.json` is already modified. Inspect and preserve it; do not overwrite or include unrelated changes. Obtain the repository lock before any edit.

**Step 2: Write failing source-contract tests**

Nourish must preserve provider attribution and unrecognized nutrient fields. Cycle Coach must preserve supplied history metadata while deriving deterministic phase aliases. Exercise Catalog must preserve provider/source fields and surface fallback/provider failures explicitly.

**Step 3: Implement additive normalization**

Derived aliases must not replace source facts. Fallback results must identify the chosen provider and why fallback occurred.

**Step 4: Run complete gates, commit and push each repository**

Run: `npm test && npm pack --dry-run && git diff --check`

## Task 7: Re-verify Polar and the meta-connector consumer

**Repositories:** `polar-mcp`, `delx-living-body`

**Step 1: Re-run Polar 0.3.8 gates**

Run: `npm test && npm pack --dry-run`

Expected: endpoint/date split, sleep hydration, structured preservation and summary extraction remain green.

**Step 2: Verify meta-connector compatibility**

Run the `delx-living-body` full suite against synthetic outputs containing nested upstream objects plus additive normalized fields. Add a consumer regression only if the current parser drops or misinterprets those outputs.

**Step 3: Commit only if a demonstrated consumer bug exists**

No version bump or release for a no-change verification.

## Task 8: Publish and reconcile the catalog

**Files:** affected connector metadata plus `delx-wellness/registry.json`, `STATUS.md`, provider status/docs and public tables.

**Step 1: Publish affected packages one at a time**

Run: `npm publish --access public`

Expected: `prepublishOnly` repeats the full package gate and npm accepts the patch version.

**Step 2: Verify each public package**

Run: `npm view <package> version dist-tags.latest --json`

Expected: both values match the new patch version.

**Step 3: Verify repository delivery**

For each changed repo, confirm local HEAD equals `origin/main`, the worktree is clean, CI is successful and CodeQL is successful where configured.

**Step 4: Update the hub from verified live versions**

Update catalog metadata only after npm verification. Run the full hub gate, commit and push.

**Step 5: Produce the final audit table**

For all 16 connectors report: boundary type, demonstrated RED, fix/no-change verdict, package version, commit SHA, npm state, CI state and remaining need for real-account testing.

## Execution order

1. Hub standard and inventory.
2. High-risk copied-template family: Garmin, Oura, Fitbit, Withings.
3. Remaining remote APIs: WHOOP, Strava, Google Health, Eight Sleep.
4. Multi-provider Air and CGM.
5. Apple/Samsung export parsers.
6. Nourish/Cycle/Exercise computational contracts.
7. Polar and Living Body verification.
8. Publication and hub reconciliation.

This order maximizes early risk reduction while keeping every repository independently releasable and reversible.
