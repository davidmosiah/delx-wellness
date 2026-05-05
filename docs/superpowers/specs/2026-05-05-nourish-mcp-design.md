# Nourish MCP Design

Date: 2026-05-05
Status: Pending user review before implementation planning
Target repository: `wellness-nourish`
Product name: Nourish MCP

## Purpose

Nourish MCP is the nutrition layer for `wellness.delx.ai`: a local-first, agent-ready MCP server that lets humans and agents search foods, resolve barcodes, normalize nutrients, estimate meals, log intake, and combine nutrition context with wearable/exercise context.

The product should feel useful to humans on day one, but the primary architecture is agent-first. The MCP contract, tool schemas, safety rules, source attribution, and deterministic output shapes are the core product. A CLI and lightweight human views sit on top of the same services.

## Positioning

Nourish MCP should not be just a calorie counter. It should be a nutrition intelligence adapter for agents:

- Search and identify food reliably.
- Normalize calories, macros, units, portions, and provenance.
- Keep personal intake private and local by default.
- Return source-aware summaries that agents can safely combine with WHOOP, Garmin, Oura, Apple Health, Fitbit, Polar, Strava, Withings, and Exercise Catalog context.
- Make licensing and attribution explicit for every data source.

## Licensing Strategy

The core repo should use MIT licensing and avoid copying GPL-3.0 code from OpenNutriTracker, FoodYou, Waistline, or similar apps.

The default data path is:

1. USDA FoodData Central as the primary food database because it is the cleanest permissive source for public nutrition data.
2. Open Food Facts as an optional provider for packaged food and barcode lookup, with ODbL attribution and cache policy clearly documented.
3. OpenNutrition/Open Food Facts bulk imports as separate optional importers with explicit ODbL/share-alike warnings, not bundled into the MIT core database.

This keeps the agent/tooling layer reusable while allowing richer data coverage when the user opts into sources with stronger license obligations.

## Architecture

The repo should follow the existing Delx wellness connector shape:

- TypeScript, Node 20+.
- `@modelcontextprotocol/sdk` for stdio and Streamable HTTP transports.
- `zod` schemas for every tool input/output boundary.
- Local storage under `~/.wellness-nourish/`.
- No committed user logs, secrets, API keys, or downloaded bulk datasets.
- `server.json`, `SECURITY.md`, `.npmignore`, README, fixtures, and readiness scripts.

Core modules:

- `providers/usda`: FoodData Central search/detail client, nutrient mapping, rate-limit handling.
- `providers/open-food-facts`: optional barcode/product lookup with required user-agent and attribution.
- `services/food-normalization`: maps upstream records into one `FoodItem` shape.
- `services/portion-engine`: grams/ml/serving conversion, common portion inference, confidence scoring.
- `services/intake-store`: local SQLite or JSONL-backed user intake log with export/delete controls.
- `services/meal-estimator`: deterministic meal estimate from text plus optional agent-provided context.
- `services/summary`: daily/weekly nutrition summaries and wearable-aware context.
- `services/agent-manifest`, `connection-status`, `privacy-audit`, `capabilities`.
- `cli`: setup, status, provider checks, local log inspection, export, delete.

SQLite is preferred for the local store if dependency weight stays reasonable; otherwise the MVP can use structured JSONL with a storage interface that allows SQLite later without changing tool contracts.

## MCP Tool Contract

Required agent-ready tools:

- `nourish_agent_manifest`: supported clients, install instructions, safety rules, first-call sequence, source/license policy.
- `nourish_capabilities`: explains provider coverage, local storage, attribution, and intended agent workflows.
- `nourish_connection_status`: checks local config, USDA key presence if required, Open Food Facts status, local store health, and cache posture.
- `nourish_privacy_audit`: reports exactly what personal data can be stored, where it lives, and how to delete/export it.
- `nourish_search_food`: search normalized foods across enabled providers with bounded limits and source metadata.
- `nourish_lookup_barcode`: resolve packaged food using Open Food Facts first, with optional fallback/source notes.
- `nourish_get_food`: fetch one normalized food by source and source id.
- `nourish_estimate_meal`: parse natural-language meals into candidate items, portions, calories/macros, confidence, and unresolved questions.
- `nourish_log_intake`: add a meal/intake entry to local storage; requires explicit caller intent and returns the stored normalized entry.
- `nourish_update_intake`: edit quantity, meal type, timestamp, notes, or source link for a stored entry.
- `nourish_delete_intake`: delete a stored entry; destructive annotation required.
- `nourish_daily_summary`: calories, macros, fiber, sugar, meal breakdown, confidence, and source coverage for a date.
- `nourish_weekly_summary`: trend summary and agent-ready narrative, not medical advice.
- `nourish_export_data`: local export for the user.

Optional v1.1 tools:

- `nourish_hydration_log`.
- `nourish_goals`.
- `nourish_recipe_estimate`.
- `nourish_compare_foods`.
- `nourish_context_for_training_day`.

Tools must support `response_format: "json" | "markdown"` where useful, matching the existing connector style.

## Data Shapes

`FoodItem` should include:

- `id`, `source`, `source_id`, `source_url`.
- `name`, `brand`, `barcode`, `locale`.
- `serving`, `available_portions`.
- `nutrients_per_100g`: calories, protein, carbs, fat, fiber, sugar, saturated fat, sodium when available.
- `nutrients_per_serving` when a serving is known.
- `data_quality`: completeness, confidence, warnings.
- `license`: provider license, attribution text, share-alike flag.

`IntakeEntry` should include:

- `id`, `timestamp`, `date`, `meal_type`.
- `food_ref` or `custom_food`.
- `quantity`, `unit`, `grams_estimate`.
- calculated nutrients and confidence.
- `source_trace`: whether logged from exact food, barcode, estimate, manual entry, or agent inference.
- `notes`, `tags`, optional `wellness_context_refs`.

All summaries must preserve provenance and confidence. Agents should be able to distinguish exact barcode logs from estimated natural-language meals.

## Human UX

The first human interface is CLI plus clear markdown responses:

- `npx wellness-nourish setup`
- `npx wellness-nourish status`
- `npx wellness-nourish search "banana"`
- `npx wellness-nourish barcode 737628064502`
- `npx wellness-nourish log "2 eggs and toast" --meal breakfast`
- `npx wellness-nourish today`
- `npx wellness-nourish export`
- `npx wellness-nourish delete --entry <id>`

README should provide copy-paste setup for Claude, Codex, Cursor, Windsurf, Hermes, OpenClaw, and generic MCP clients. The human-facing language should emphasize privacy, source attribution, and editable estimates.

## Agent UX

Agents should follow this default sequence:

1. Call `nourish_connection_status`.
2. Call `nourish_capabilities` or `nourish_agent_manifest` if operating unattended or installing.
3. Use `nourish_search_food` or `nourish_lookup_barcode` for exact foods.
4. Use `nourish_estimate_meal` for natural language, but return uncertainty instead of pretending estimates are exact.
5. Ask for confirmation before `nourish_log_intake` when the user did not explicitly request logging.
6. Combine `nourish_daily_summary` with wearable summaries only as wellness context, not medical advice.

Agent rules must explicitly forbid asking users to paste provider secrets, raw health exports, or private food logs into chat.

## Privacy And Safety

The connector is not a medical device and does not provide medical diagnosis, treatment, or emergency support.

Privacy defaults:

- Food search is read-only.
- Personal intake logs are local-only by default.
- Logs can be exported and deleted.
- Raw API keys, user tokens, and private logs must never be returned by MCP tools.
- The connector should include a redaction test that fails if known secret-like fields appear in tool output.

Destructive tools must carry destructive annotations and require precise ids.

## Testing And Release Bar

The repo must meet `agent_ready` before registry publication:

- `npm test` runs typecheck, build, tool smoke, HTTP smoke, agent readiness, Hermes manifest, CLI UX, provider fixture tests, privacy/redaction tests, and summary fixture tests.
- Fixtures cover USDA search/detail, Open Food Facts barcode, meal estimation, intake log add/update/delete, daily summary, and source attribution.
- Live checks are separate from CI and bounded to avoid provider abuse.
- `server.json`, package version, runtime version, README, and registry metadata stay aligned.
- Secret scan over changed files before publish.

## MVP Scope

MVP should ship:

- Local MCP server with stdio and Streamable HTTP.
- Agent manifest, capabilities, status, and privacy audit.
- USDA search/detail using live API or fixture fallback.
- Optional Open Food Facts barcode lookup.
- Normalized food item shape.
- Natural-language meal estimate with explicit confidence.
- Local intake log add/delete/list and daily summary.
- CLI setup/status/search/log/today/export/delete.
- Full agent readiness test suite.

Deferred:

- Hosted account sync.
- Billing.
- Coach/team accounts.
- Recipe database.
- Photo recognition.
- Automated diet advice.
- Bundled ODbL bulk database.

## Integration With Wellness Hub

`delx-wellness` should list Nourish MCP as a nutrition connector once it reaches `agent_ready`.

`wellness-mcp-hub` can later consume Nourish MCP as either:

- a local connector in the open-source registry, or
- a hosted nutrition service with managed provider keys and account sync.

The shared normalized wellness context should gain optional nutrition fields after the standalone connector contract is stable.

## Open Questions Resolved For MVP

- Name: Nourish MCP.
- Repo: `wellness-nourish`.
- Core license: MIT.
- Primary source: USDA FoodData Central.
- Barcode source: Open Food Facts optional with attribution.
- No GPL code copying.
- Local-first personal log.
- Agent-ready from first public release.
