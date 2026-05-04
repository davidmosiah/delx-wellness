# Provider Status

This matrix tracks public connector readiness. It is intentionally conservative: a provider is marked active only when a local MCP connector exists and can be installed independently.

| Provider | Public connector | Current role | Main risk |
| --- | --- | --- | --- |
| WHOOP | Active | Recovery, strain, sleep, workouts | OAuth approval and API scope limits for hosted use. |
| Strava | Active | Activities, streams, routes, training context | App-level rate limits and GPS privacy. |
| Fitbit | Active | Activity, sleep, heart rate, HRV, nutrition | Google/Fitbit platform migration and scope changes. |
| Garmin Connect | Active | Sleep, HRV, Body Battery, stress, activities | Unofficial personal auth can drift; official Garmin Health is partner-gated. |
| Oura Ring | Planned | Sleep, readiness, activity | Production OAuth review and scope validation. |
| Apple Health | Planned | Local device health aggregate | Native bridge and local consent design. |
| Eight Sleep | Planned | Sleep environment and recovery context | API availability and account access model. |
| Withings | Planned | Weight, cardiovascular and sleep signals | OAuth scope and device coverage variance. |

## Release Principle

Keep each provider connector independently useful. The registry should help users discover and install connectors; it should not force a monorepo migration before there is a concrete maintenance benefit.
