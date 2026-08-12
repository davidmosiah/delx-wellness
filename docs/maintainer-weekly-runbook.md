# Maintainer weekly runbook (15–30 min)

Only the packages that already pull. No README polish sprint.

**Top triage surface:** `google-health-mcp` · `delx-living-body` · `delx-wellness` · `wellness-nourish` · `whoop-mcp` · `delx-memory` · `mcp-scorecard`.

## Checklist

1. `gh search issues --owner davidmosiah --state open --sort updated` — humans first. Dependabot is not a human.
2. First reply SLA: **48h** on human issues ([human-issues-sla.md](./human-issues-sla.md)).
3. PRs: review or say “not this week” with a reason. Do not leave silent.
4. High Dependabot only. Do not batch-merge moderate noise.
5. If someone posted a coverage JSON: check redaction before anything else. No PHI in the thread.
6. Stop at 30 minutes. Leftovers wait.

## Do not spend the slot on

- New connectors
- Directory PRs without owner OK
- Cosmetic badge/README waves
- Reopening #21 (closed **1/2**; new reports → [google-health-mcp#2](https://github.com/davidmosiah/google-health-mcp/issues/2))

## Monthly add-on (first week)

`node scripts/authority-scorecard.mjs` → [monthly-authority-scorecard.md](./monthly-authority-scorecard.md).
