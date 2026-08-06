# Before / after series (token story)

**Before:** A 3h ride at 1 Hz (~10,800 samples) dumped into agent context wastes the window; agents invent precision from truncated dumps.

**After (agent-safe-series/v1):** Exact avg/min/max/percentiles + ~180–400 points under a hard cap; payload states downsampling. Typical reduction >95% on sample count for multi-hour rides while stats remain full-resolution.

Measure locally with fixture size vs series JSON size (`scripts/synthetic-series-fixture.mjs` in garmin-mcp).
