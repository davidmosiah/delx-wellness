# Series field compatibility matrix

| Field | Garmin | Strava | Fitbit | Polar | Kindred |
|---|:---:|:---:|:---:|:---:|:---:|
| contract_version | ✓ | ✓ | ✓ | ✓ | ✓ |
| start_time / t_unit | ✓ | ✓ | ✓ | ✓ | ✓ |
| points[].t offset | ✓ | ✓ | ✓ | ✓ | ✓ |
| stats full-res | ✓ | ✓ | ✓ | ✓ | ✓ |
| percentile_method | ✓ | ✓ | ✓ | ✓ | ✓ |
| requested_resolution_seconds | ✓ | ✓ | ✓ | ✓ | ✓ |
| downsampled / method | ✓ | ✓ | ✓ | ✓ | ✓ |
| coverage_anchor | ✓ | ✓ | ✓ | ✓ | ✓ |
| reference_source | ✓ | ✓ | ✓ | ✓ | ✓ |
| GPS in series | never | never | n/a | n/a | never |

Design log: https://github.com/davidmosiah/garmin-mcp/issues/19
