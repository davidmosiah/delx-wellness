# MCP Directory Submission Tracker

Use this checklist to keep public MCP discovery consistent across directories, package registries and community lists.

## Submit First

| Project | Package | Canonical page | Registry name |
|---|---|---|---|
| WHOOP MCP | `whoop-mcp-unofficial` | `https://wellness.delx.ai/connectors/whoop` | `io.github.davidmosiah/whoop-mcp` |
| Garmin MCP | `garmin-mcp-unofficial` | `https://wellness.delx.ai/connectors/garmin` | `io.github.davidmosiah/garminmcp` |
| Strava MCP | `strava-mcp-unofficial` | `https://wellness.delx.ai/connectors/strava` | `io.github.davidmosiah/strava-mcp` |
| Apple Health MCP | `apple-health-mcp-unofficial` | `https://wellness.delx.ai/connectors/apple-health` | `io.github.davidmosiah/apple-health-mcp` |
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

## Submission Copy Template

```text
Delx <PROJECT> is a local-first MCP server for <PROVIDER/DOMAIN>. It lets Claude, Codex, Cursor, Hermes, OpenClaw and other MCP-compatible agents inspect <SIGNALS/ACTIONS> through structured tools while tokens and private data stay on the user's machine by default.

Install: <NPM_OR_REPO_INSTALL_COMMAND>
Docs: <CANONICAL_URL>
Repository: <GITHUB_URL>
```
