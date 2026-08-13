# Dependabot high-only monthly batch

Policy: open Dependabot for **high/critical** only; batch monthly.
Ignore noise minors unless security advisory.

Hub wiring: [`.github/dependabot.yml`](../.github/dependabot.yml). Version-update PRs are disabled (`open-pull-requests-limit: 0`). Security updates are grouped into one monthly-cadence PR per ecosystem. Dependabot.yml has no CVSS filter; ignore moderate/low alerts in triage.
