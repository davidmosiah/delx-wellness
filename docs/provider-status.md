# Provider Status

This matrix tracks public connector readiness. It is intentionally conservative: a provider is marked active only when a local MCP connector exists and can be installed independently.

| Provider | Public connector | Quality | Current role | Main risk |
| --- | --- | --- | --- | --- |
| WHOOP | Active | `agent_ready` | Recovery, strain, sleep, workouts | OAuth approval and API scope limits for hosted use. |
| Strava | Active | `agent_ready` | Activities, streams, routes, training context | App-level rate limits and GPS privacy. |
| Fitbit | Active | `agent_ready` | Activity, sleep, heart rate, HRV, nutrition | Google/Fitbit platform migration and scope changes. |
| Google Health | Active | `agent_ready` | Google Health API v4 identity, profile, settings, data points, reconcile, rollups and summaries | Beta launch window; Google warns breaking changes may occur until end of May 2026. |
| Garmin Connect | Active | `agent_ready` | Sleep, HRV, Body Battery, stress, activities | Unofficial personal auth can drift; official Garmin Health is partner-gated. |
| Oura Ring | Active | `agent_ready` | Sleep, readiness, activity, heart context | Membership/device/scopes affect data availability. |
| Withings | Active | `agent_ready` | Weight, activity, workouts, cardiovascular and sleep signals | OAuth signed-token flow, API-plan and device coverage variance. |
| Apple Health | Active | `agent_ready` | Local export activity, sleep, heart, HRV, respiratory rate, oxygen saturation, body mass, workouts and data inventory | Managed auto-import can find/copy transferred exports locally; live HealthKit bridge remains separate native work. |
| Samsung Health | Active | `agent_ready` | Local CSV/ZIP export activity, steps, sleep, heart, HRV, respiratory rate, oxygen saturation, body metrics, workouts and data inventory | No desktop OAuth/API; live access requires separate Android work through Samsung Health Data SDK or Health Connect. |
| Polar | Active | `agent_ready` | Nightly Recharge, activity, sleep, training sessions, PPI/HRV and routes | Fine-grained AccessLink scopes and device/account feature variance. |
| Eight Sleep | Planned | `experimental` | Sleep environment and recovery context | API availability and account access model. |
| Nourish MCP | Active | `agent_ready` | Food lookup, pt-BR meal estimates, barcode lookup, barcode photo lookup, meal photo estimates, calories, macros, local intake, hydration, goals, CSV export and summaries | USDA FoodData Central is primary; Open Food Facts barcode results carry ODbL attribution/share-alike metadata; missing confirmation returns `USER_ACTION_REQUIRED`, not a server failure. |

## Release Principle

Keep each provider connector independently useful. The registry should help users discover and install connectors; it should not force a monorepo migration before there is a concrete maintenance benefit.

## Future Backlog Notes

- The old `nutrition-catalog-mcp` research thread is now represented by Nourish MCP. It is public at `davidmosiah/wellness-nourish`, published as `wellness-nourish@0.1.7`, uses USDA FoodData Central and Open Food Facts data directly, includes local barcode image decoding, honest pt-BR unresolved/confidence handling, Brazilian meal aliases and kitchen units, provider food_ref auto-resolution, quantity update rescaling, vision-assisted meal photo estimates, Hermes Telegram personal setup with a secrets-sourcing wrapper, and no GPL OpenNutriTracker app code was copied.
