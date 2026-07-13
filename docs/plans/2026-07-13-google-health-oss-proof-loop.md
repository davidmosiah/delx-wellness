# Google Health OSS Proof Loop Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the existing Google Health MCP discovery traffic into redacted real-account validation and repeat participation by 2026-08-12.

**Architecture:** Keep `google-health-mcp` as the single acquisition anchor, `davidmosiah` as the profile entrypoint, `delx-wellness` as the public growth source of truth, and `PAINEL.md` as the portfolio gate. Every public surface points to the existing privacy-safe `coverage --live --json` workflow and issue #3; no new repository, directory campaign, leaderboard work, billing work, or connector feature is added.

**Tech Stack:** Markdown, GitHub profile pins, GitHub Issues, npm CLI, GitHub API/CLI.

---

### Task 1: Record the portfolio experiment

**Files:**
- Modify: `/Users/davidmosiah/Developer/00-workspace-index/PAINEL.md`

**Step 1: Add the second focus**

Record the baseline, the single CTA, the 2026-08-12 verdict, and the rule that the slot becomes empty again if the criterion is not met.

**Step 2: Validate the focus limit and verdict**

Run:

```bash
rg -n "^### [12]\\.|Google Health OSS Proof Loop|2026-08-12" PAINEL.md
```

Expected: exactly two numbered focuses and an explicit 2026-08-12 verdict.

**Step 3: Commit and push**

```bash
git add PAINEL.md
git commit -m "portfolio: start Google Health OSS proof loop"
git push origin main
```

### Task 2: Make the hub the canonical execution source

**Files:**
- Create: `/Users/davidmosiah/Developer/02-mcp-servers/delx-wellness/docs/plans/2026-07-13-google-health-oss-proof-loop.md`
- Modify: `/Users/davidmosiah/Developer/02-mcp-servers/delx-wellness/docs/growth-playbook.md`
- Modify: `/Users/davidmosiah/Developer/02-mcp-servers/delx-wellness/docs/distribution-google-health-0.5.1.md`
- Modify: `/Users/davidmosiah/Developer/02-mcp-servers/delx-wellness/docs/mcp-directory-submissions.md`

**Step 1: Replace broad distribution with one proof loop**

Set the current window to 2026-07-13 through 2026-08-12 and the success criterion to two independent external reports plus one repeat interaction.

**Step 2: Record the live directory baseline**

Record 7 merged and 22 open `awesome-mcp-servers` PRs as of 2026-07-13. State that no new directory targets are opened during the proof loop.

**Step 3: Validate links and scope**

Run:

```bash
rg -n "2026-08-12|issues/3|coverage --live --json|7 merged|22 open|no new" docs
python3 -m json.tool registry.json >/dev/null
```

Expected: the verdict, CTA, directory baseline, and negative scope are present; registry JSON remains valid.

**Step 4: Commit and push**

```bash
git add docs/plans/2026-07-13-google-health-oss-proof-loop.md docs/growth-playbook.md docs/distribution-google-health-0.5.1.md docs/mcp-directory-submissions.md
git commit -m "docs: focus OSS growth on Google Health proof"
git push origin main
```

### Task 3: Put the real-account CTA above the fold

**Files:**
- Modify: `/Users/davidmosiah/Developer/02-mcp-servers/google-health-mcp/README.md`

**Step 1: Add the current proof-loop callout**

Place this action before the long product overview:

```bash
npx -y google-health-mcp-unofficial coverage --live --json
```

Link directly to `https://github.com/davidmosiah/google-health-mcp/issues/3` and repeat the redaction warning.

**Step 2: Run the full connector gate**

Run:

```bash
npm test
```

Expected: exit 0 with the complete repository test chain passing.

**Step 3: Commit and push**

```bash
git add README.md
git commit -m "docs: lead Google Health with real-account validation"
git push origin main
```

### Task 4: Concentrate the GitHub profile

**Files:**
- Modify: `/Users/davidmosiah/Developer/02-mcp-servers/davidmosiah/README.md`

**Step 1: Add one current OSS experiment**

Feature Google Health and issue #3 before the three-vertical catalog. Remove stale numeric claims that cannot remain current automatically.

**Step 2: Verify links and stale claims**

Run:

```bash
rg -n "Google Health|issues/3|coverage --live --json" README.md
! rg -n "35 public repos|29 npm|35k npm|Métricas atualizadas em 2026-06-05" README.md
```

Expected: the CTA is present and stale portfolio totals are absent.

**Step 3: Commit and push**

```bash
git add README.md
git commit -m "profile: focus OSS discovery on Google Health"
git push origin main
```

### Task 5: Align public pins and verify live state

**Files:**
- External GitHub profile state only

**Step 1: Update pins**

Pin `google-health-mcp` first and remove archived `delx-agent-workbench`. Preserve the other active pins unless the six-item limit requires reordering.

**Step 2: Verify through GitHub GraphQL**

Run a fresh `pinnedItems` query and confirm `google-health-mcp` is first and `delx-agent-workbench` is absent.

**Step 3: Verify remote commits and public links**

Check each repo's `origin/main`, open the profile and Google Health README, and confirm issue #3 is still open. Do not claim external tester success until an outside account actually posts a report.
