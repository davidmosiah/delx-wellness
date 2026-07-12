# MCP Directory Submission Tracker

Use this checklist to keep public MCP discovery consistent across directories, package registries and community lists.

## Submit First

| Project | Package | Canonical page | Registry name |
|---|---|---|---|
| WHOOP MCP | `whoop-mcp-unofficial` | `https://wellness.delx.ai/connectors/whoop` | `io.github.davidmosiah/whoop-mcp` |
| Garmin MCP | `garmin-mcp-unofficial` | `https://wellness.delx.ai/connectors/garmin` | `io.github.davidmosiah/garminmcp` |
| Google Health MCP | `google-health-mcp-unofficial` | `https://wellness.delx.ai/connectors/google-health` | `io.github.davidmosiah/google-health-mcp` |
| Strava MCP | `strava-mcp-unofficial` | `https://wellness.delx.ai/connectors/strava` | `io.github.davidmosiah/strava-mcp` |
| Apple Health MCP | `apple-health-mcp-unofficial` | `https://wellness.delx.ai/connectors/apple-health` | `io.github.davidmosiah/apple-health-mcp` |
| Samsung Health MCP | `samsung-health-mcp-unofficial` | `https://wellness.delx.ai/connectors/samsung-health` | `io.github.davidmosiah/samsung-health-mcp` |
| Wellness Nourish MCP | `wellness-nourish` | `https://wellness.delx.ai/nutrition` | `io.github.davidmosiah/wellness-nourish` |

## Submit Next

| Project | Package | Canonical page | Registry name |
|---|---|---|---|
| Fitbit MCP | `fitbit-mcp-unofficial` | `https://wellness.delx.ai/connectors/fitbit` | `io.github.davidmosiah/fitbitmcp` |
| Oura MCP | `oura-mcp-unofficial` | `https://wellness.delx.ai/connectors/oura` | `io.github.davidmosiah/ouramcp` |
| Withings MCP | `withings-mcp-unofficial` | `https://wellness.delx.ai/connectors/withings` | `io.github.davidmosiah/withingsmcp` |
| Polar MCP | `polar-mcp-unofficial` | `https://wellness.delx.ai/connectors/polar` | `io.github.davidmosiah/polarmcp` |
| Short Video Agent Kit | `short-video-agent-kit` | `https://github.com/davidmosiah/short-video-agent-kit` | `io.github.davidmosiah/short-video-agent-kit` |
| TikTok Agent Publisher | `tiktok-agent-publisher` | `https://github.com/davidmosiah/tiktok-agent-publisher` | `io.github.davidmosiah/tiktok-agent-publisher` |
| YouTube Shorts Agent | `youtube-shorts-agent` | `https://github.com/davidmosiah/youtube-shorts-agent` | `io.github.davidmosiah/youtube-shorts-agent` |

## Hold Back

- `exercise-catalog-mcp`: private repo and partner/API caution.
- `wellness-mcp-hub`: private/undecided, not ready for public hardening.
- Python packages not yet on PyPI: submit as GitHub projects only until package distribution is formalized.

## Pre-Submission Checklist

- Repo is public and MIT licensed.
- README has badges, install command, privacy boundary, star CTA and canonical website/repo link.
- Package has `mcpName` if published to npm.
- Package includes `server.json` when it exposes an MCP server.
- `server.json` package version matches the published package version.
- GitHub About description, topics and homepage are set.
- No secrets, local token paths, private data snapshots or unpublished partner endpoints are exposed.

## Directory Targets

- Official MCP registry: prioritize npm packages with `mcpName`, `server.json` and clear package metadata.
- Smithery: submit after Docker/command config is clear and the README shows the local-first auth model.
- Glama: submit public MCP repos with stable READMEs and install commands.
- PulseMCP/community lists: submit the strongest public projects after GitHub topics and screenshots/social preview are ready.

## Submission Log

### 2026-07-04

Completed:

- `awesome-mcp-servers` maintainer closed the multi-server PRs without merge and requested one server per PR:
  - #9155: `Add Delx Wellness MCP servers`
  - #9159: `Add Delx agent MCP servers`
- Split #9155 into one ready PR per wellness/server entry. All are open, non-draft, include Glama score badges, and pass `check-submission`:
  - #9228 `apple-health-mcp`
  - #9229 `delx-living-body`
  - #9230 `eight-sleep-mcp`
  - #9231 `fitbit-mcp`
  - #9232 `garmin-mcp`
  - #9233 `google-health-mcp`
  - #9234 `oura-mcp`
  - #9235 `polar-mcp`
  - #9236 `samsung-health-mcp`
  - #9237 `strava-mcp`
  - #9238 `wellness-air`
  - #9239 `wellness-cgm-mcp`
  - #9240 `wellness-cycle-coach`
  - #9241 `wellness-nourish`
  - #9242 `whoop-mcp`
  - #9243 `withings-mcp`
- Split #9159 into one ready PR per non-wellness/server entry. All are open, non-draft, include Glama score badges, and pass `check-submission`:
  - #9244 `delx-agent-utilities`
  - #9245 `delx-mcp-server`
  - #9246 `mcp-scorecard`
  - #9247 `delx-memory`
  - #9248 `agent-seo-engine`
  - #9249 `google-ads-intent-mcp`
  - #9250 `google-ads-mcp-unofficial`
  - #9251 `short-video-agent-kit`
  - #9252 `timeline-pulse`
  - #9253 `uap-pulse`
  - #9254 `tiktok-agent-publisher`
  - #9255 `youtube-shorts-agent`
  - #9256 `astral-mcp`
- Posted maintainer-facing follow-up comments on closed PRs #9155 and #9159 with the split PR maps.
- Glama direct pages and score badges were rechecked for all 29 split entries and returned HTTP 200 before opening the replacement PRs.

### 2026-07-03

Completed:

- Official MCP Registry updated with current npm versions:
  - `io.github.davidmosiah/whoop-mcp` `0.5.3`
  - `io.github.davidmosiah/garminmcp` `0.5.3`
  - `io.github.davidmosiah/google-health-mcp` `0.5.1`
  - `io.github.davidmosiah/wellness-nourish` `0.6.11`
- Official MCP Registry already had current versions for `strava-mcp`, `apple-health-mcp`, `samsung-health-mcp`, `fitbitmcp`, `ouramcp`, and `polarmcp`.
- MCPFind public pages verified for all 11 wellness registry names in this tracker.
- PulseMCP submission flow verified: PulseMCP ingests from the Official MCP Registry daily and asks maintainers to email `hello@pulsemcp.com` only if an entry is still missing after a week.
- `awesome-mcp-servers` PR opened for the public wellness/health entries and later marked ready for maintainer review.
  - PR: `https://github.com/punkpeye/awesome-mcp-servers/pull/9155`
- `awesome-mcp-servers` PR #9155 expanded from 3 to 16 entries and verified with `check-submission` success:
  - `apple-health-mcp`
  - `delx-living-body`
  - `eight-sleep-mcp`
  - `fitbit-mcp`
  - `garmin-mcp`
  - `google-health-mcp`
  - `oura-mcp`
  - `polar-mcp`
  - `samsung-health-mcp`
  - `strava-mcp`
  - `wellness-air`
  - `wellness-cgm-mcp`
  - `wellness-cycle-coach`
  - `wellness-nourish`
  - `whoop-mcp`
  - `withings-mcp`
- `smithery.yaml` metadata committed and pushed to all 11 wellness connector repositories:
  - `whoop-mcp`
  - `garmin-mcp`
  - `google-health-mcp`
  - `strava-mcp`
  - `apple-health-mcp`
  - `samsung-health-mcp`
  - `wellness-nourish`
  - `fitbit-mcp`
  - `oura-mcp`
  - `withings-mcp`
  - `polar-mcp`
- Public-repo expansion started from live GitHub inventory:
  - `43` public repos on `davidmosiah`.
  - `7` public forks excluded from owned-server submission scope.
  - `1` archived owned repo excluded from active submission scope: `delx-agent-workbench`.
  - `35` active, non-fork repos classified as MCP/public-distribution candidates.
  - `29` active, non-fork repos have `server.json`.
  - `26` npm-backed MCP server repos now have `smithery.yaml` on the default branch.
- Additional `smithery.yaml` metadata committed and pushed to all remaining npm-backed MCP server repos:
  - `timeline-pulse`
  - `delx-memory`
  - `mcp-scorecard`
  - `wellness-cycle-coach`
  - `wellness-cgm-mcp`
  - `wellness-air`
  - `google-ads-mcp-unofficial`
  - `eight-sleep-mcp`
  - `uap-pulse`
  - `astral-mcp`
  - `delx-living-body`
  - `tiktok-agent-publisher`
  - `youtube-shorts-agent`
  - `short-video-agent-kit`
- Registry metadata fixes committed and pushed where the official validator rejected long descriptions or stale schema/version metadata:
  - `timeline-pulse`
  - `wellness-cycle-coach`
  - `google-ads-mcp-unofficial`
  - `uap-pulse`
  - `delx-agent-utilities`
- Official MCP Registry follow-up completed and verified through `GET /v0.1/servers/{serverName}/versions/{version}`:
  - `io.github.davidmosiah/withingsmcp` `0.4.7`
  - `io.github.davidmosiah/timeline-pulse` `0.1.1`
  - `io.github.davidmosiah/delx-memory` `0.2.3`
  - `io.github.davidmosiah/mcp-scorecard` `0.5.1`
  - `io.github.davidmosiah/wellness-cycle-coach` `0.3.5`
  - `io.github.davidmosiah/wellness-air` `0.5.6`
  - `io.github.davidmosiah/google-ads-mcp` `0.1.3`
  - `io.github.davidmosiah/uap-pulse` `0.3.2`
  - `io.github.davidmosiah/delx-living-body` `0.3.0`
  - `io.github.davidmosiah/delx-mcp-server` `0.2.8`
  - `io.github.davidmosiah/delx-agent-utilities` `0.1.2`
  - `io.github.davidmosiah/google-ads-intent-mcp` `0.1.1`
  - `io.github.davidmosiah/agent-seo-engine` `0.1.1`
- Package ownership metadata releases shipped for Registry validation:
  - `timeline-pulse@0.1.1` on npm with `mcpName`.
  - `uap-pulse@0.3.2` on npm with `mcpName` and `hono` lockfile updated to `4.12.27`.
  - `delx-agent-utilities==0.1.2` on PyPI with `mcp-name`.
  - `google-ads-intent-mcp==0.1.1` on PyPI with `mcp-name`.
  - `agent-seo-engine==0.1.1` on PyPI with `mcp-name`.
- Full public package-backed Registry sweep verified `29/29` active, non-fork public repos with `server.json` by checking each package's latest npm/PyPI version against the official versioned endpoint.
- `uap-pulse@0.3.3` shipped on npm and the Official MCP Registry after fixing GitHub MIT license detection and npm repository/homepage metadata.
- Second `awesome-mcp-servers` PR opened for non-wellness public MCP servers and marked ready for maintainer review:
  - PR: `https://github.com/punkpeye/awesome-mcp-servers/pull/9159`
  - Initial entries: `mcp-scorecard`, `delx-memory`, `agent-seo-engine`, `google-ads-intent-mcp`.
- `awesome-mcp-servers` PR #9159 expanded to 13 total entries and verified with `check-submission` success:
  - `mcp-scorecard`
  - `delx-memory`
  - `agent-seo-engine`
  - `google-ads-intent-mcp`
  - `delx-agent-utilities`
  - `delx-mcp-server`
  - `google-ads-mcp-unofficial`
  - `short-video-agent-kit`
  - `tiktok-agent-publisher`
  - `youtube-shorts-agent`
  - `timeline-pulse`
  - `uap-pulse`
  - `astral-mcp`
- MCPFind public API currently resolves `21/29` public package-backed Registry entries.
- MCPFind PR opened for the 8 missing API slugs and locally validated with `scripts/verify-submission-liveness.mjs --all`:
  - PR: `https://github.com/MCPFind/mcp-find/pull/91`
  - Entries: `timeline-pulse`, `wellness-cycle-coach`, `wellness-air`, `google-ads-mcp-unofficial`, `uap-pulse`, `delx-agent-utilities`, `google-ads-intent-mcp`, `agent-seo-engine`.
- Smithery publication completed for all `29/29` public package-backed MCP repos:
  - `26/26` npm-backed repos published as stdio MCPB bundles.
  - `3/3` PyPI-backed repos published as Python stdio MCPB bundles via `uvx --from "<package>[mcp]==<version>" <entrypoint>`.
  - Final Smithery release sweep verified `29/29` through `GET /servers/delx%2F{slug}/releases`: latest release `SUCCESS`, type `stdio`.
  - Workaround used: Smithery CLI/API bundle publishing requires each `serverCard.tools[*]` to include `inputSchema` when tools are supplied; the batch publication omitted synthetic tool lists except for `mcp-scorecard`.
- Glama submission follow-up completed:
  - Glama FAQ confirms server submissions are made through the Servers page by providing a GitHub repo URL, display name and short description, and that `glama.json` controls indexing metadata.
  - All `29/29` public package-backed MCP repos already have `glama.json` with maintainer `davidmosiah`.
  - Direct Glama pages currently resolve `200` for `9/29`: `apple-health-mcp`, `fitbit-mcp`, `garmin-mcp`, `google-health-mcp`, `oura-mcp`, `polar-mcp`, `samsung-health-mcp`, `wellness-nourish`, `withings-mcp`.
  - The Glama Add Server form posts to `/api/mcp/servers/submit`; unauthenticated POST redirects to `/sign-up?returnPath=%2Fapi%2Fmcp%2Fservers%2Fsubmit`.
  - Authenticated Chrome submission completed for the remaining `20/29` direct-page gaps. Glama showed `Your server has been submitted for review` for accepted submissions; duplicate checks on `strava-mcp` and `whoop-mcp` showed `A submission for this repository is already pending review`.
- Live coverage refresh after expanding the community-list PRs:
  - GitHub inventory: `43` public repos = `7` forks, `1` archived owned repo, and `35` active owned repos.
  - Active owned repos with `server.json`: `29/35`; these are the MCP directory submission targets.
  - Active owned repos without `server.json`: `davidmosiah` (profile repo), `delx-wellness` (connector registry/docs hub), `delx-wellness-hermes` (Hermes profile pack), `delx-wellness-openclaw` (OpenClaw profile pack), `mcp-leaderboard` (benchmark/leaderboard site), `openclaw-delx-plugin` (OpenClaw plugin). These are public distribution/support repos, not standalone MCP servers for server directories.
  - Official MCP Registry rechecked from GitHub `server.json` files against `GET /v0.1/servers/{serverName}/versions/{version}`: `29/29`.
  - Smithery public server pages rechecked at `https://smithery.ai/server/delx/{repo}` with title and install command present: `29/29`.
  - Glama direct pages rechecked: still `9/29` public and `20/29` pending review/crawl after submission.
  - `awesome-mcp-servers` PRs #9155 and #9159 rechecked: both open, non-draft, mergeable, and passing `check-submission`.
  - MCPFind PR #91 rechecked: open, non-draft and mergeable.
- External PR follow-up comments posted:
  - `awesome-mcp-servers` PR #9159 now has a maintainer-facing note explaining that the non-wellness entries were submitted to Glama, that direct Glama pages are still pending review/crawl, and that badges will be added only once the pages are live to avoid broken badge links.
  - MCPFind PR #91 now has a validation note explaining that the submission set was locally verified and that the Vercel preview requires MCPFind team authorization.
- Glama recheck after #9159 follow-up:
  - `GET /api/mcp/v1/servers/davidmosiah/{slug}` still returns `404` for all `20/29` direct-page gaps.
  - Public Glama search did not return alternate matching server URLs for the non-wellness PR #9159 entries (`mcp-scorecard`, `delx-memory`, `agent-seo-engine`, `google-ads-intent-mcp`, `delx-agent-utilities`, `delx-mcp-server`, `google-ads-mcp-unofficial`, `short-video-agent-kit`, `tiktok-agent-publisher`, `youtube-shorts-agent`, `timeline-pulse`, `uap-pulse`, `astral-mcp`).
  - No real Glama score badge is available for PR #9159 yet; adding one now would create a broken or misleading badge link.

Still needs follow-up:

- `awesome-mcp-servers` split PRs #9228-#9256 are open, non-draft, include Glama score badges, and pass `check-submission`; they still need upstream maintainer merge.
- MCPFind PR #91 is open and validated locally; it still needs upstream maintainer merge before the 8 missing entries become public API results.
- Official MCP Registry is current for all npm/PyPI package-backed public MCP servers classified in this sweep. Future package releases still need a matching `server.json` publish.
- Local checkouts for `withings-mcp` and `polar-mcp` still need repair for future local work, but fresh temporary clones were used for the public metadata work above.

## Submission Copy Template

```text
Delx <PROJECT> is a local-first MCP server for <PROVIDER/DOMAIN>. It lets Claude, Codex, Cursor, Hermes, OpenClaw and other MCP-compatible agents inspect <SIGNALS/ACTIONS> through structured tools while tokens and private data stay on the user's machine by default.

Install: <NPM_OR_REPO_INSTALL_COMMAND>
Docs: <CANONICAL_URL>
Repository: <GITHUB_URL>
```
