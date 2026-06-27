# Registry Validation

This repository ships a validator that turns the `context_ready` quality tier from
[`connector-quality-standard.md`](./connector-quality-standard.md) into a machine
check rather than a self-asserted promise. Until this validator landed, a connector
could declare `quality.tier = "context_ready"` in `registry.json` without exposing
the documented context contracts; this doc explains what is now enforced and how
to extend it.

## What runs

Two checks run on every push and pull request targeting `main`
([`.github/workflows/validate-registry.yml`](../.github/workflows/validate-registry.yml)):

1. **Schema validation** — [`scripts/validate-schema.mjs`](../scripts/validate-schema.mjs)
   checks `registry.json` against
   [`schemas/provider-capabilities.schema.json`](../schemas/provider-capabilities.schema.json):
   required fields, `status` enum, `agentReadiness` score range, `quality` object shape, and
   `additionalProperties: false`. This catches the kind of drift that used to
   slip through silently (e.g. the `npm_version` field that
   `scripts/sync-registry.mjs` writes, or a quality tier landing in `status`).
2. **Quality-tier enforcement** — [`scripts/validate-context-ready.mjs`](../scripts/validate-context-ready.mjs)
   turns the `context_ready` tier into a machine check (rules below).

Both scripts have zero npm dependencies. They use Node 22+ built-ins (`node:fs`,
`JSON.parse`, `node:path`, `node:url`) so the registry stays a docs/JSON-only repo.
The schema validator is schema-driven — it reads the schema file, so extending
the schema automatically extends the check.

## Rules

The validator only inspects connectors whose `quality.tier` is `context_ready`.
For each, it checks:

| Rule | Subject | Requirement |
| --- | --- | --- |
| R1 | `signals[]` | Must include at least one of `wellness_context`, `training_context`, `nutrition_context`, `exercise_context`. These are the four normalized handoff contracts in the standard. |
| R2 | `quality.context_contract_version` | Must be a non-empty string. Recommended value: `"delx-wellness-context/v1"`. |
| R3 | `entrypoint` (or substitute) | `entrypoint`, `package`, or `repository` must be set. The validator accepts both npm package names and `https://` URLs so connectors published via either route pass. |
| R4 | `recommended_handoffs[]` | Non-terminal connectors must have a non-empty `recommended_handoffs` array (or non-empty `recommended_handoff` string). Terminal connectors are exempt. |

The script exits `0` when all rules pass and `1` when any connector fails, so it
gates CI cleanly.

## Terminal connectors

Some connectors produce context but also act as the terminal step in a flow,
where there is no meaningful downstream connector to hand off to. Today the only
terminal connector is **Nourish**, which closes the loop by producing
`nutrition_context` advice for the user.

Terminal connectors are listed in `TERMINAL_CONNECTORS` in
`scripts/validate-context-ready.mjs`. To add another terminal connector, edit
that constant and document why in this file.

## Running locally

```bash
node scripts/validate-schema.mjs                   # schema check, exit 0/1
node scripts/validate-context-ready.mjs            # tier check, exit 0/1
node scripts/validate-context-ready.mjs --json     # machine-readable report
node scripts/validate-context-ready.mjs --registry path/to/registry.json
```

Sample passing schema-validation output:

```
# registry schema validation

Schema:   schemas/provider-capabilities.schema.json
Registry: registry.json

PASS — registry.json satisfies the schema.
```

Sample passing tier output:

```
# context_ready validator report

Registry: registry.json
Connectors checked: 5
Passed: 5
Failed: 0

- PASS whoop (WHOOP)
- PASS strava (Strava)
- PASS garmin (Garmin Connect)
- PASS exercise-catalog (Exercise Catalog MCP)
- PASS nourish (Nourish MCP) [terminal]

All context_ready connectors satisfy the standard.
```

## Extending the validator

The validator is intentionally small and dependency-free. To add a new rule:

1. Add a check inside `checkConnector(connector)` in
   `scripts/validate-context-ready.mjs`.
2. Push a clear `failures.push({ rule: "R5", message: "..." })` so the human
   report surfaces the violation, including a hint at how to remediate.
3. Update the rules table above.
4. If the new field needs to live in `registry.json`, also extend
   [`schemas/provider-capabilities.schema.json`](../schemas/provider-capabilities.schema.json)
   so schema-level validation accepts it — `scripts/validate-schema.mjs`
   enforces `additionalProperties: false`, so an unrecognized field fails CI
   until the schema is updated.

If a future connector type shouldn't be subject to a particular rule, prefer
explicit allowlists (like `TERMINAL_CONNECTORS`) over inference; that keeps the
validator's behavior obvious from a single read.

## Why this exists

PR #4 (merged 2026-05-08) defined the `context_ready` tier and bumped WHOOP,
Strava, Garmin, Nourish, and Exercise Catalog to it, but added no enforcement.
The 2026-05-08 audit flagged that the promotions were self-asserted: nothing
prevented a connector from declaring the tier without actually exposing a
normalized handoff signal or a context contract version. This validator and the
fields it requires (added in the same change) close that gap.
