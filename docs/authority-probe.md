# Authority probe (2026-08-12 → 2026-09-30)

This is the public definition of **inbound of weight** and the **success/fail
runway** for Delx OSS. It is not a product FOCO. It is the career/authority
experiment attached to the packages that already pull.

See also: [oss-operating-mode.md](https://github.com/davidmosiah/davidmosiah/blob/main/docs/oss-operating-mode.md) ·
[monthly authority scorecard](./monthly-authority-scorecard.md) ·
[strategy policies](./oss-strategy-policies.md).

## Inbound of weight (counts)

A signal **counts** only if an **external human** (not the maintainer, not a
bot, not a scanner) does one of:

| Counts | Examples | Evidence we keep |
|---|---|---|
| Job / hiring conversation | Recruiter or hiring manager names a public OSS package as the reason | Private note + date. No names in the repo unless they ask. |
| Partner / collab with a named org | Another MCP maintainer, device vendor, or agent runtime wants to interop | Public issue/PR **or** written OK to mention |
| Acquisition / “let’s talk” of substance | A company asks about the code, not ads | Private note. Never marketed. |
| External PR that ships | Headless OAuth from [@jumpmanjay](https://github.com/jumpmanjay) | Commit + PR |
| Independent live coverage / bug with a fixture | [@maxgow](https://github.com/maxgow) coverage → v0.7.2 | Redacted report, no PHI |

## Vanity (does **not** count)

- Stars, forks, watchers
- One-day npm spikes (CI, `npx`, scanners)
- Bot / Dependabot / stale / “first issue” noise
- Our own comments, our own scorecard runs
- Directory listings we submitted
- “Looks popular” screenshots
- DMs that are “cool project” with no next step

Stars and npm **median ≥ 7 days** stay on the [monthly scorecard](./monthly-authority-scorecard.md)
as **discovery / install proxies**. They never close the probe.

## Runway

| | |
|---|---|
| **Opens** | 2026-08-12 (this doc) |
| **Closes** | **2026-09-30** (America/Fortaleza) |
| **Success** | ≥1 inbound-of-weight event in the table above, logged with date + evidence class |
| **Fail** | Zero such events. Probe ends. No extra megaphone (Show HN, cold DMs to Anthropic/MCP teams, leaderboard push). |
| **Extend** | Only with a written owner decision **and** a new end date. Silence = fail. |

## What we do until 2026-09-30

1. Deepen top packages that already pull. No new connector without a named requester.
2. 15–30 min/week human issue/PR triage ([runbook](./maintainer-weekly-runbook.md)).
3. Monthly scorecard. Ignore one-day spikes.
4. Honest copy: proof loop is **1/2** external Google Health coverage reports.

## What we will not do

- Cold-spray Anthropic / MCP teams
- Re-open Show HN / leaderboard push without a re-entry note
- Invent a second coverage report
- Treat SuperGrok / mediagen as a public OSS gateway
