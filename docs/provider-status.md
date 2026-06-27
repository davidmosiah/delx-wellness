# Provider Status

This matrix tracks public connector readiness. It is intentionally conservative: a provider is marked active only when a local MCP connector exists and can be installed independently.

| Provider | Public connector | Quality | Current role | Main risk |
| --- | --- | --- | --- | --- |
| WHOOP | Active | `context_ready` | Recovery, strain, sleep, workouts, normalized wellness_context | OAuth approval and API scope limits for hosted use. |
| Strava | Active | `context_ready` | Activities, streams, routes, normalized training_context | App-level rate limits and GPS privacy. |
| Fitbit | Active | `agent_ready` | Activity, sleep, heart rate, HRV, nutrition | Google/Fitbit platform migration and scope changes. |
| Google Health | Active | `agent_ready` | Google Health API v4 identity, profile, settings, data points, reconcile, rollups and summaries | API is live for builders but still evolving; check Google's release notes for scope and data-type changes before production launch decisions. |
| Garmin Connect | Active | `context_ready` | Sleep, HRV, Body Battery, stress, activities, normalized wellness_context | Unofficial personal auth can drift; official Garmin Health is partner-gated. |
| Oura Ring | Active | `agent_ready` | Sleep, readiness, activity, heart context | Membership/device/scopes affect data availability. |
| Withings | Active | `agent_ready` | Weight, activity, workouts, cardiovascular and sleep signals | OAuth signed-token flow, API-plan and device coverage variance. |
| Apple Health | Active | `agent_ready` | Local export activity, sleep, heart, HRV, respiratory rate, oxygen saturation, body mass, workouts and data inventory | Managed auto-import can find/copy transferred exports locally; live HealthKit bridge remains separate native work. |
| Samsung Health | Active | `agent_ready` | Local CSV/ZIP export activity, steps, sleep, heart, HRV, respiratory rate, oxygen saturation, body metrics, workouts and data inventory | No desktop OAuth/API; live access requires separate Android work through Samsung Health Data SDK or Health Connect. |
| Polar | Active | `agent_ready` | Nightly Recharge, activity, sleep, training sessions, PPI/HRV and routes | Fine-grained AccessLink scopes and device/account feature variance. |
| Eight Sleep | Active | `context_ready` | Smart-mattress sleep trends, temperature program, alarms, adjustable base, nightly summary, normalized `wellness_context`; optional gated mutations (temperature, alarms, away mode) | Unofficial mobile-app API (`auth-api.8slp.net` + `client-api.8slp.net` + `app-api.8slp.net`); endpoints may change without notice. Tracks `lukas-clarke/eight_sleep` and `mezz64/pyEight`. |
| Exercise Catalog MCP | Private active | `context_ready` | Private exercise/workout catalog adapter, wellness_context intake, URL-only media policy, provider orchestrator/source-metadata gate before public expansion | Private provider data must remain separated from open/public sources. |
| Nourish MCP | Active | `context_ready` | Food lookup, TACO/BR local search, pt-BR meal estimates, barcode lookup, barcode photo lookup, mixed food-image routing, label OCR parsing, meal photo estimates, personal meal memory, coach loop, nutrition_context-compatible summaries, calories, macros, carbon summaries, bulk logging, undo, compare-days, local intake, hydration, goals, CSV export and summaries | USDA FoodData Central is primary; Open Food Facts barcode/name results carry ODbL attribution/share-alike metadata; TACO values are an attributed curated subset while redistribution-license confirmation remains a 1.0 gate; coach outputs are heuristic and missing confirmation returns `USER_ACTION_REQUIRED`, not a server failure. |

## Release Principle

Keep each provider connector independently useful. The registry should help users discover and install connectors; it should not force a monorepo migration before there is a concrete maintenance benefit.

## Future Backlog Notes

- The old `nutrition-catalog-mcp` research thread is now represented by Nourish MCP. It is public at `davidmosiah/wellness-nourish`, published as `wellness-nourish@0.6.8`, uses USDA FoodData Central, Open Food Facts, local BR aliases, and an attributed curated TACO subset, includes carbon-aware summaries, local barcode image decoding, Open Food Facts product-name search, honest pt-BR unresolved/confidence handling, Brazilian meal aliases and kitchen units, provider food_ref auto-resolution, bulk logging, undo_last, compare_days, quantity update rescaling, mixed food-image routing, label OCR parsing, vision-assisted meal photo estimates, personal meal memory, wearable-aware coach reasoning, structured MCP responses, Hermes personal setup, and no GPL OpenNutriTracker app code was copied.
