# Delx Open Source Growth Playbook

This playbook keeps the open-source work aligned with the larger Delx brand: local-first, agent-first infrastructure that real users can install today and that AI teams can trust tomorrow.

## Positioning

Delx is the agent-first protocol layer for real-world context. The public repos should make three ideas obvious within five seconds:

- Agents can connect to real user data through clean MCP contracts.
- The user stays in control: tokens and private data stay local unless the chosen client is explicitly asked to use context.
- The work is reusable infrastructure, not a one-off demo.

## Metrics That Matter

- GitHub stars: public proof and discovery signal.
- GitHub forks: serious builder intent.
- GitHub unique cloners: install intent, even before stars show up.
- npm downloads: usage and repeat install signal.
- Site visits and connector page engagement: top-of-funnel interest for future consulting and Delx product work.

Run the local collector:

```bash
node scripts/collect-account-growth-metrics.mjs
```

Outputs are local only:

- `.growth-metrics/account-snapshots/YYYY-MM-DD.json`
- `.growth-metrics/account-latest.md`

The collector also writes a public, commit-safe snapshot:

- `docs/open-source-growth-snapshot.md`

That public document uses only GitHub repository metadata and public npm
download counts. GitHub traffic, referrers and path analytics stay local under
`.growth-metrics/`.

DIY growth without paid vanity: see [`honest-growth-playbook.md`](./honest-growth-playbook.md) and ready posts in [`launch-assets.md`](./launch-assets.md).

## Current Experiment — Google Health OSS Proof Loop

**Window:** 2026-07-13 through 2026-08-12.

The current OSS job is not to add more repositories or directory targets. It is
to convert the strongest existing discovery signal into human proof through one
privacy-safe action:

```bash
npx -y google-health-mcp-unofficial coverage --live --json
```

After reviewing the redacted output, external testers post it to
[`google-health-mcp` issue #21](https://github.com/davidmosiah/google-health-mcp/issues/21).

Success requires **two independent external real-account reports and at least
one repeat interaction** from either tester (a follow-up comment, issue, PR or
integration). If that does not happen by 2026-08-12, close the experiment
without extending it and leave the portfolio slot empty.

During this window this section overrides the broad daily and weekly expansion
loops below: no new repos, no new directory targets, no leaderboard revival,
and no redesign without user or traffic evidence.

## Daily Loop

1. Run the growth collector.
2. Check the highest-cloned repos with low stars.
3. Improve one friction point: install command, quickstart, screenshot, example prompt, or troubleshooting note.
4. Post one useful update on X, Reddit, or a targeted builder community.
5. Ask clearly for stars only after showing practical value.

Current experiment: [Google Health MCP OSS Proof Loop](distribution-google-health-0.5.1.md)
focuses on real-account coverage reports from Fitbit, Pixel Watch, Android and
Google Health API v4 testers. The filename is retained because the original
distribution asset began with the 0.5.1 release; the live package is **0.7.3**
(2026-08-03; 36★ magnet; 1/2 external coverage reports). Directory expansion stays frozen through 2026-08-12.

Broad launch copy for X, LinkedIn, Reddit and Hacker News lives in
[Delx Wellness Launch Assets](launch-assets.md).

## Public Authority Flywheel

The GitHub profile should route visitors into one clear path:

1. Profile README explains the thesis and says where to start.
2. `delx-wellness` acts as the flagship registry and source of truth.
3. Runtime profile packs and Operator Recipes turn the ecosystem into runnable
   daily loops.
4. Individual connector repos prove the stack with install commands, demos, privacy notes and readiness checks.
5. Field notes explain the decisions in public and link back to the repos.
6. Public roadmap issues show momentum and invite contribution.

This is the pattern to copy from high-signal builders: one flagship narrative, installable projects, visible proof, and repeated writing around the same technical point of view.

## Weekly Loop

1. Compare `.growth-metrics/latest.md` with the previous snapshot.
2. Promote the top two repos by install intent.
3. Submit or refresh packages in MCP directories.
4. Add one real-world agent recipe per vertical: Body, Reach, Coordination.
5. Review profile README, pinned repos, repo descriptions, topics and homepage URLs.

## Repo Conversion Checklist

- Strong one-line value proposition above the fold.
- npm version, npm downloads, GitHub stars, license and agent-ready badges.
- Clear install command that works with `npm exec`, `npx`, `pipx`, or direct MCP client config.
- `agent_manifest`, `connection_status` and `privacy_audit` surfaces documented.
- `mcpName` in package metadata where the package is published to npm.
- `server.json` in the package when the repo exposes an MCP server.
- Canonical website or repo URL in GitHub About metadata.
- A direct star ask that explains why stars help other builders discover the project.

## Content Angles

- "Your AI agent should understand your recovery before recommending training."
- "Local-first MCP connectors for wearables: no hosted token vault, no hidden data copy."
- "Agent-first is not a landing page. It is installable metadata, readiness tools, privacy audits and dry-run defaults."
- "Downloads are usage. Stars are distribution. We need both."

## Boundaries

- Do not submit private repos or private APIs to public directories.
- Do not expose credentials, local snapshots or user health data in public docs.
- Do not scrape partner data or private services for growth content.
- Do not overclaim medical, health, financial or advertising outcomes.
