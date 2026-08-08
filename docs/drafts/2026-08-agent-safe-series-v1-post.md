# PUBLISHED

**Live:** https://github.com/davidmosiah/delx-wellness/discussions/14  
**Channel:** GitHub Discussion (Show and tell) · 2026-08-08  
**Do not re-post** without a new OK (one surface is enough for this wave).

Original draft body kept below for edit history.

---

# agent-safe-series/v1: how local-first health MCPs budget tokens for dense time-series

*Working title. ~1,200–1,500 words. English for international builders.*

---

## Hook (first 80 words)

A three-hour ride at 1 Hz is roughly **10,800 samples**. Drop that JSON into an agent context window and you spend the budget on noise: the model invents “precision” from a truncated dump, forgets the hard max, and still cannot compute honest zones.

We stopped shipping that shape. **agent-safe-series/v1** is a frozen envelope for dense health series: full-resolution **stats**, a **hard point cap**, honest **downsampling metadata**, and **no GPS** in series tools. It is live on Garmin / Strava / Fitbit / Polar MCPs and was co-designed with Kindred’s Mi Fitness Data Bridge.

---

## The problem (agent-shaped, not API-shaped)

Vendor APIs are happy to return dense streams. Agents are not.

| Failure mode | What agents actually do |
|---|---|
| Unbounded series | Truncate silently mid-JSON and reason on garbage |
| Stats on downsampled points | Report “avg HR” that never existed in the ride |
| Absolute timestamps per sample | Waste tokens repeating the same calendar day |
| GPS in the same tool | Leak location into a recovery brief by accident |
| “Use max_points please” in docs only | Models ignore prose; schema is law |

The fix is not “hope the model downsamples.” The fix is a **tool contract** the server enforces.

---

## Design rules (the contract in five lines)

Canonical doc: [agent-safe-series.md](https://github.com/davidmosiah/delx-wellness/blob/main/docs/agent-safe-series.md)  
ADR freeze: [ADR 001](https://github.com/davidmosiah/delx-wellness/blob/main/docs/adr/001-agent-safe-series-v1.md)

1. **Stats always on full-resolution samples** — min / max / mean / percentiles are truthful even when the curve is sparse.
2. **Hard cap on returned points** — `max_points` in the tool schema; server ceiling (e.g. 500) even if the caller asks for more.
3. **Honest loss metadata** — `downsampled`, `method`, `source_points`, `returned_points` so the agent can say “I saw a shape, not every beat.”
4. **Time as offset** — `t_unit: seconds_from_start` (+ `start_time` when needed) instead of thousands of ISO strings.
5. **Coverage honesty** — `coverage_anchor`: `nominal_duration` vs `sample_span` (Kindred duration-anchored pattern). Zones declare `reference_source`. **GPS never enters series tools.**

Contract string: **`agent-safe-series/v1`** — frozen. Additive fields go through the design log before anyone bumps the version.

---

## Before / after (token story)

**Before:** multi-hour activity → tens of thousands of sample objects in context.  
**After:** exact stats + on the order of **180–400 points** under the hard cap, with downsample flags. Typical **sample-count reduction >95%** on multi-hour rides while stats remain full-resolution.

Measure locally with fixtures in `garmin-mcp` (`scripts/synthetic-series-fixture.mjs` / activity-series tests) — do not trust marketing numbers without running them.

---

## Who speaks v1 today

| Package (npm) | Tool |
|---|---|
| `garmin-mcp-unofficial@0.7.2+` | `garmin_activity_series` |
| `strava-mcp-unofficial@0.6.0+` | `strava_activity_series` |
| `fitbit-mcp-unofficial@0.6.0+` | `fitbit_heart_series` |
| `polar-mcp-unofficial@0.5.0+` | `polar_heart_series` |
| Kindred `mi-fitness-data-bridge` | `workout_series` (peer; design log [#19](https://github.com/davidmosiah/garmin-mcp/issues/19)) |

Field matrix: [series-compat-matrix.md](https://github.com/davidmosiah/delx-wellness/blob/main/docs/series-compat-matrix.md)

**Explicit non-goals:** inventing continuous 1 Hz series for vendors that do not expose them (e.g. WHOOP public API). Summaries stay summaries.

---

## Scorecard enforces the boring part

Docs lie. Schemas do not.

`mcp-scorecard@0.5.6` check **`dense_series_caps`**:

- **Hard cap:** `max_points` / `maxPoints` must appear in **`inputSchema.properties`**. Description-only “we have a hard cap” does **not** pass.
- **Contract marker (separate):** `agent-safe-series/v1` and/or `contract_version` in description or schema. Contract text is **never** counted as a hard cap.

```bash
npx -y mcp-scorecard@0.5.6 --path ./your-mcp --min-score 90
```

That is how a peer (or CI) can grade a third-party series tool without sharing secrets.

---

## Peer design, not a monorepo

The interesting part of this story is not Delx alone. On [garmin-mcp#19](https://github.com/davidmosiah/garmin-mcp/issues/19), Kindred’s Mi Fitness Data Bridge converged on the same envelope: offset times, max_points, full-res stats, duration-anchored coverage. Fixture pairing works **across repos** without a shared monorepo.

That is the OSS model we want: **interop by contract**, not by absorbing every vendor into one org.

---

## Minimal agent recipe

Prefer series tools over raw stream dumps. On Hermes: skills already say no raw continuous dumps without `explicit_user_intent`.

```bash
# Install a series-capable connector
npx -y garmin-mcp-unofficial@0.7.2

# Or compose several connectors offline
npx -y delx-living-body@0.3.5 demo
```

Hub (registry + ADR + proof links): https://github.com/davidmosiah/delx-wellness

---

## What this post is not

- Not a star campaign.
- Not “we hit 2/2 coverage reports” (honest status: **1 independent external** Google Health live report; standing invite remains on the beta issue).
- Not medical advice.
- Not an invitation to dump PHI into public issues.

---

## Closing CTA (pick **one** when publishing)

**A (preferred for builders):** Star the hub if the contract is useful; open an issue if your series tool should appear on the compat matrix.  
**B:** Try `garmin_activity_series` on a synthetic demo path before OAuth.  
**C:** Peer: comment on [#19](https://github.com/davidmosiah/garmin-mcp/issues/19) with a proposal for an additive field — do not silently fork the version string.

---

## Author notes (not for the public post)

- Publish only after David OK; update `docs/launch-assets.md` with final URL.
- Versions cited: garmin 0.7.2 · scorecard 0.5.6 · living-body 0.3.5 · hermes 0.3.7 pins — re-check `npm view` before publish day.
- Optional figures: one before/after token bar from local fixture (generate via mediagen only if needed; receipt for rights gate if ads ever reuse).
- Do not link BodyPort, mediagen public gateway, or private ops.
- Portuguese version only if David wants a BR-only channel; default is English for MCP discovery.

## Checklist before any publish click

- [ ] David OK for **this** channel
- [ ] Versions re-checked with `npm view`
- [ ] No claim of 2/2 coverage or fabricated users
- [ ] Links 200 on hub ADR + scorecard + #19
- [ ] One CTA only
- [ ] Log URL in launch-assets “Published” section after ship
