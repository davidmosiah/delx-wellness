# Connector Quality Standard

This is the public release bar for Delx wellness MCP connectors. It keeps the open-source layer credible while the hosted hub remains optional/private.

## Quality Tiers

### `experimental`

Use for early connectors that are not ready for broad public use.

- README explains that the connector is experimental.
- No real user tokens, exports, secrets, or private data are committed.
- Basic install instructions exist.
- Provider API boundary is documented.

### `registry_ready`

Use for connectors that can be linked from `delx-wellness`.

- `README.md` has installation, auth, privacy, development, and project links.
- `server.json` exists for MCP registry metadata.
- `package.json` version, runtime version, and registry metadata are aligned.
- `SECURITY.md` exists and tells users not to disclose tokens or health exports.
- `.npmignore` excludes local secrets, generated noise, and private artifacts.
- CI runs the full connector test suite, not only a partial typecheck.
- Local test suite includes typecheck, build, tool smoke, HTTP smoke, summary fixture, privacy/cache/redaction, and CLI UX checks.
- Connector exposes a connection/status diagnostic tool.
- Connector exposes a privacy/audit diagnostic tool.
- README links back to `delx-wellness`.
- Public docs state that this is not medical advice.

### `agent_ready`

Use for connectors designed for delegated installation and agent operations.

- Meets `registry_ready`.
- Exposes an agent manifest tool or resource.
- Includes Hermes or equivalent agent-client setup guidance.
- Tests validate agent manifest output.
- Docs tell agents not to ask users to paste passwords, OAuth tokens, refresh tokens, or raw health exports into chat.

### `context_ready`

Use for connectors that can safely exchange normalized context with other wellness MCPs and Telegram agents. This is the bar for cross-connector workflows such as WHOOP/Garmin/Strava -> Exercise Catalog -> Nourish.

- Meets `agent_ready`.
- Exposes one normalized handoff tool or documents why it is not applicable:
  - `wellness_context` for recovery/readiness/sleep/body-battery style signals.
  - `training_context` for recent endurance or strength load.
  - `nutrition_context` for daily intake, hydration, calories, macros and carbon context.
  - `exercise_context` for normalized exercise/workout catalog results.
- Context payloads include `source`, bounded scores, `recent_training_load`, `soreness`, `injury_flags`, `notes` and a `data_quality` or `limitations` block when the source is heuristic or partial.
- Context tools are read-only, fixture-testable, and never require network auth tests in CI.
- Manifest and capabilities explicitly name the normalized handoff tool and recommended downstream tool sequence.
- Markdown output is Telegram-friendly: concise bullets, no raw JSON dumps, no pipe tables, no secrets, no raw exports.
- Write tools require explicit user intent and must expose undo/delete/export paths when personal data can be stored.

## Shared Context Contracts

The family uses these stable cross-MCP handoff names. Individual connectors may return a subset, but must not silently rename fields when publishing a context tool.

### `wellness_context`

- `source`: provider id such as `whoop`, `garmin`, `oura`, `apple_health`, `fitbit`, `polar`, or `manual`.
- `recovery_score`, `readiness_score`, `sleep_score`, `body_battery`: optional 0-100 scores.
- `strain_score`: optional WHOOP-style 0-30 recent strain/load score.
- `recent_training_load`: `low`, `normal`, `high`, or `unknown`.
- `soreness`: normalized muscle/body-area strings supplied by the user or a trusted connector.
- `injury_flags`: user-supplied caution flags; agents must treat them as conservative constraints, not diagnosis.
- `notes`: short human-readable explanation, safe for Telegram.
- `data_quality`: `{ completeness, confidence, warnings }` or equivalent limitations block.

### `training_context`

- `source`: provider id such as `strava`, `garmin`, `fitbit`, `apple_health`, or `manual`.
- `recent_training_load`: `low`, `normal`, `high`, or `unknown`.
- `activity_count`, `workout_count`, `distance_m`, `duration_min`, `elevation_m`, `strain_proxy`: optional bounded aggregates.
- `privacy`: indicates whether GPS/routes are withheld, summarized, or explicit raw mode.
- `recommended_handoff`: downstream tool suggestions, usually Exercise Catalog.

### `nutrition_context`

- `source`: usually `nourish`.
- `date`, `calories_kcal`, `protein_g`, `carbohydrates_g`, `fat_g`, `fiber_g`, `hydration_ml`.
- `goal_gaps`: compact gaps vs configured local goals.
- `recent_intake_refs`: local IDs only; never raw private logs unless the user explicitly asked.
- `next_action`: concise Telegram-safe suggestion.

### `exercise_context`

- `source`: provider or orchestrator id, e.g. `exercise_catalog`.
- `provider_policy`: selected provider/mode, fallback and dedupe behavior.
- `source_metadata`: license, attribution and private/open boundary per exercise.
- `media_policy`: always URL-only; no automated bulk media downloads.
- `items`: normalized exercises/workout steps.

## Agent UX and Safety Invariants

- First-call path: `*_connection_status` -> `*_capabilities` or `*_agent_manifest` -> task-specific read/preview -> explicit user-confirmed write only if needed.
- Telegram output must prefer short sections and bullets. Avoid tables in bot replies even if docs use tables.
- Never ask the user to paste OAuth tokens, refresh tokens, API keys, cookies, raw health exports, private food logs, GPS traces, or exercise provider secrets into chat.
- For user data mutation, the tool name/description and schema must make explicit intent obvious (`explicit_user_intent`, `delete`, `clear`, `undo`, `revoke`).
- Every connector must keep fixture mode or mocked clients available for local CI.
- Every connector must have at least one regression test that proves secrets/tokens are redacted from status/audit/manifest surfaces.


## Current Connector Status

| Connector | Tier | Notes |
| --- | --- | --- |
| WHOOP | `context_ready` | Includes agent manifest, local OAuth/privacy model, Hermes setup checks and `wellness_context` handoff. |
| Strava | `context_ready` | Includes agent manifest, GPS privacy posture and compact `training_context` handoff. |
| Fitbit | `agent_ready` | Includes agent manifest and scope diagnostics. |
| Garmin | `context_ready` | Includes agent manifest, local credential boundary and `wellness_context` handoff for unofficial Garmin Connect mode. |
| Oura | `agent_ready` | Includes Oura OAuth, v2 usercollection tools, summaries and Hermes manifest checks. |
| Withings | `agent_ready` | Includes signed Withings token flow, Public API tools, summaries and Hermes manifest checks. |
| Apple Health | `agent_ready` | Includes local export parser, data inventory, summary-mode privacy enforcement, managed auto-import, summaries, privacy audit, agent manifest and Hermes setup checks. |
| Samsung Health | `agent_ready` | Includes local CSV/ZIP export parser, data inventory, summary-mode privacy enforcement, managed auto-import, summaries, privacy audit, agent manifest and Hermes setup checks. |
| Nourish MCP | `context_ready` | Includes nutrition previews, explicit-intent writes, local delete/export/undo, privacy audit, Hermes setup checks and `nutrition_context`-compatible summaries. |
| Exercise Catalog | `context_ready` | Private adapter with provider boundary, URL-only media policy, wellness_context intake and orchestrator/source-metadata requirements before public provider expansion. |

## Release Checklist

Before publishing or linking a connector:

- [ ] Run `npm test`.
- [ ] Confirm CI is green on `main`.
- [ ] Confirm `server.json` version matches `package.json`.
- [ ] Confirm runtime `SERVER_VERSION` matches `package.json` when present.
- [ ] Run a focused secret scan over changed files.
- [ ] Verify generated assets belong to the provider and are not copied from another connector.
- [ ] Confirm README links to the Delx Wellness registry.
- [ ] Confirm docs do not overstate provider support or medical claims.
- [ ] Confirm context tools use the shared field names above or document any intentional omission.
- [ ] Confirm Telegram examples avoid raw JSON dumps, tables, secrets and private exports.
- [ ] Confirm every write/delete/revoke/log action has explicit user intent and recovery/undo guidance when applicable.

## Asset Hygiene

Provider assets are part of trust. Do not publish copied or mismatched OG cards, favicons, screenshots, or brand colors across providers.

If a generated asset is duplicated locally with a Finder suffix such as `2`, inspect it before committing. Remove it when it belongs to another provider or is not referenced.
