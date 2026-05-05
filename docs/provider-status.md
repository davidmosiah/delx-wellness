# Provider Status

This matrix tracks public connector readiness. It is intentionally conservative: a provider is marked active only when a local MCP connector exists and can be installed independently.

| Provider | Public connector | Quality | Current role | Main risk |
| --- | --- | --- | --- | --- |
| WHOOP | Active | `agent_ready` | Recovery, strain, sleep, workouts | OAuth approval and API scope limits for hosted use. |
| Strava | Active | `agent_ready` | Activities, streams, routes, training context | App-level rate limits and GPS privacy. |
| Fitbit | Active | `agent_ready` | Activity, sleep, heart rate, HRV, nutrition | Google/Fitbit platform migration and scope changes. |
| Garmin Connect | Active | `agent_ready` | Sleep, HRV, Body Battery, stress, activities | Unofficial personal auth can drift; official Garmin Health is partner-gated. |
| Oura Ring | Active | `agent_ready` | Sleep, readiness, activity, heart context | Membership/device/scopes affect data availability. |
| Withings | Active | `agent_ready` | Weight, activity, workouts, cardiovascular and sleep signals | OAuth signed-token flow, API-plan and device coverage variance. |
| Apple Health | Active | `agent_ready` | Local export activity, sleep, heart, HRV and workouts | Export-file workflow is manual; live HealthKit bridge remains separate native work. |
| Polar | Active | `agent_ready` | Nightly Recharge, activity, sleep, training sessions, PPI/HRV and routes | Fine-grained AccessLink scopes and device/account feature variance. |
| Eight Sleep | Planned | `experimental` | Sleep environment and recovery context | API availability and account access model. |
| Nourish MCP | Active | `agent_ready` | Food lookup, barcode lookup, barcode photo lookup, meal photo estimates, calories, macros, local intake, hydration, goals, CSV export and summaries | USDA FoodData Central is primary; Open Food Facts barcode results carry ODbL attribution/share-alike metadata; meal photos require agent vision context and confirmation before logging. |

## Release Principle

Keep each provider connector independently useful. The registry should help users discover and install connectors; it should not force a monorepo migration before there is a concrete maintenance benefit.

## Future Backlog Notes

- The old `nutrition-catalog-mcp` research thread is now represented by Nourish MCP. It is public at `davidmosiah/wellness-nourish`, published as `wellness-nourish@0.1.2`, uses USDA FoodData Central and Open Food Facts data directly, includes local barcode image decoding, vision-assisted meal photo estimates, Hermes Telegram personal setup, and no GPL OpenNutriTracker app code was copied.
