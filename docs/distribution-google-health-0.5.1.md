# Distribution Sprint: Google Health MCP 0.5.1

Goal: turn the `google-health-mcp-unofficial@0.5.1` release into real-account
validation, stars and useful community feedback.

This sprint should send people to one simple action:

```bash
npx -y google-health-mcp-unofficial coverage --json
```

After OAuth setup:

```bash
npx -y google-health-mcp-unofficial coverage --live --json
```

The strongest public ask is not "try my repo". It is:

> If you have Fitbit, Pixel Watch, Android health data, or Google Health API v4
> access, run a read-only coverage check and help validate the new Google
> Health data-type surface for agents.

## Proof Points

- npm: `google-health-mcp-unofficial@0.5.1`
- Release: https://github.com/davidmosiah/google-health-mcp/releases/tag/v0.5.1
- Coverage doc: https://github.com/davidmosiah/google-health-mcp/blob/main/docs/data-coverage.md
- Beta feedback guide: https://github.com/davidmosiah/google-health-mcp/blob/main/docs/beta-feedback.md
- Issue for live reports: https://github.com/davidmosiah/google-health-mcp/issues/3
- Hub release index: https://github.com/davidmosiah/delx-wellness/blob/main/docs/release-index.md

## Target Audiences

| Audience | Why it matters | Primary CTA |
|---|---|---|
| Fitbit migration builders | Google Health is replacing the long-term Fitbit integration path for many workflows | Run coverage and report which data types work |
| Pixel Watch / Android users | They can validate wearable and Google-source families | Share redacted `coverage --live --json` output |
| MCP builders | They care about installability, schemas and safe agent workflows | Star the repo and test the MCP tool |
| Health-agent builders | They need read-only body context without hosted token custody | Try `delx-living-body` and one provider connector |
| Directory maintainers | They can improve discovery for public MCP packages | List the package with local-first privacy notes |

## One-Line Positioning

Google Health MCP is a local-first MCP server that lets Claude, Cursor, Codex,
Hermes, OpenClaw and other agents read user-authorized Google Health API v4 data
through safe tools while OAuth tokens stay on the user's machine.

## Short Post

```text
Shipped google-health-mcp-unofficial@0.5.1.

It adds a read-only Google Health API v4 data-type coverage harness for agents:

  npx -y google-health-mcp-unofficial coverage --json

After OAuth, testers can run:

  npx -y google-health-mcp-unofficial coverage --live --json

The report is designed for public issue comments: no raw health payloads, no
OAuth secrets, no local paths, only operation status and point-count buckets.

Looking for Fitbit / Pixel Watch / Android / Google Health API v4 testers:
https://github.com/davidmosiah/google-health-mcp/issues/3
```

## Technical Post

```text
I am looking for Google Health API v4 testers for an open-source MCP server.

The new 0.5.1 release added:
- a 39-type Google Health data-type catalog
- a MCP tool: google_health_data_type_coverage
- a CLI: google-health-mcp-server coverage --live --json
- redaction tests that prevent OAuth secrets, local paths and example health
  values from leaking into public reports

Repo:
https://github.com/davidmosiah/google-health-mcp

Live report issue:
https://github.com/davidmosiah/google-health-mcp/issues/3

This is not medical advice and not affiliated with Google or Fitbit. It is
local-first infrastructure for agents that need user-authorized body context.
```

## Directory Submission Copy

```text
Google Health MCP is a local-first MCP server for Google Health API v4. It lets
Claude, Codex, Cursor, Hermes, OpenClaw and other MCP-compatible agents inspect
user-authorized identity, profile, settings, data points, reconciled streams,
rollups and daily/weekly summaries while OAuth tokens stay on the user's
machine.

Install:
npx -y google-health-mcp-unofficial setup

Coverage validation:
npx -y google-health-mcp-unofficial coverage --json

Docs:
https://github.com/davidmosiah/google-health-mcp

Package:
https://www.npmjs.com/package/google-health-mcp-unofficial
```

## Seven-Day Checklist

- Day 1: open and pin the distribution sprint issue in `delx-wellness`.
- Day 1: submit Google Health MCP to the highest-fit MCP directories that accept npm-based MCP servers.
- Day 2: publish the short post and ask explicitly for Fitbit / Pixel Watch / Android testers.
- Day 3: publish the technical post for MCP builders and link the redaction/security proof.
- Day 4: comment on any related Google Health/Fitbit migration discussions only when the answer is directly useful.
- Day 5: add the best real-account finding to the Google Health README and release notes.
- Day 6: refresh `docs/open-source-growth-snapshot.md` and compare stars/downloads/issues.
- Day 7: close the sprint only if at least one outside tester has reported a live coverage result or a concrete setup blocker.

## Guardrails

- Do not post raw personal health measurements.
- Do not ask users to paste token files, OAuth secrets, local config paths or screenshots with account details.
- Do not imply affiliation with Google, Fitbit or Alphabet.
- Do not claim medical, diagnostic or treatment value.
- Keep the ask technical: coverage validation, setup friction and agent-readiness feedback.
