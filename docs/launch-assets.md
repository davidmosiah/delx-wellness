# Delx Wellness Launch Assets

**Updated:** 2026-08-04

Use these when you want a **public post**. Prefer **one channel per day**, one
primary CTA. Full DIY growth rules: [`honest-growth-playbook.md`](./honest-growth-playbook.md).

## Primary CTA stack (pick one per post)

| Audience | Primary CTA | Secondary |
| --- | --- | --- |
| MCP / agent builders | Star hub [`delx-wellness`](https://github.com/davidmosiah/delx-wellness) | Try Google Health |
| Wearable / Fitbit / Pixel | Install GH + coverage report on [#21](https://github.com/davidmosiah/google-health-mcp/issues/21) | Hub registry |
| Nutrition / no-OAuth | `npx -y wellness-nourish@0.8.0` | Hub |
| Hermes users | `npx -y delx-wellness-hermes@0.3.4 setup` | living-body |

## One-minute demo script

1. Open the hub: https://github.com/davidmosiah/delx-wellness  
2. Hero path (wearables):

```bash
npx -y google-health-mcp-unofficial@0.7.3 setup
npx -y google-health-mcp-unofficial@0.7.3 auth          # or: auth --manual on SSH
npx -y google-health-mcp-unofficial@0.7.3 coverage --live --json
```

3. No-OAuth path (nutrition):

```bash
npx -y wellness-nourish@0.8.0
```

4. Show privacy boundary: tokens stay local; public reports are redacted only.  
5. End with **one** CTA (star hub **or** post redacted coverage on #21 — not both).

---

## X / Twitter (ready to paste)

### A — hub discovery

Local-first wellness MCPs for agents:

- no hosted token vault
- no hidden health data copy
- installable agent contracts
- mcp-scorecard 100/A fleet

Hub: https://github.com/davidmosiah/delx-wellness  
Hero: Google Health API v4 MCP (36★) · `npx -y google-health-mcp-unofficial@0.7.3`

If this is useful, a star on the hub helps more builders find it.

### B — proof loop (highest leverage through 2026-08-12)

Need 1 more redacted real-account `coverage --live --json` for Google Health MCP
(Fitbit / Pixel / Android). Different person from the first report.

```bash
npx -y google-health-mcp-unofficial@0.7.3 coverage --live --json
```

Template → https://github.com/davidmosiah/google-health-mcp/issues/21

### C — nourish (no OAuth)

Nutrition MCP for agents — USDA + barcode + local meal log. No cloud account for search.

```bash
npx -y wellness-nourish@0.8.0
```

https://github.com/davidmosiah/wellness-nourish

---

## LinkedIn (ready to paste)

AI agents need real-world body context, but wellness data should not require a
hosted token vault.

I maintain **Delx Wellness** — an open-source registry of local-first MCP
connectors (wearables, recovery, nutrition, health exports). Credentials and raw
personal data stay on the user’s machine.

Current discovery hero: **Google Health API v4 MCP** (Fitbit / Pixel Watch path),
with headless OAuth for servers and redacted coverage tooling for safe public
feedback.

- Hub: https://github.com/davidmosiah/delx-wellness  
- Google Health: https://github.com/davidmosiah/google-health-mcp  
- Nutrition (no OAuth): https://github.com/davidmosiah/wellness-nourish  

If you build with Claude / Cursor / Hermes and care about local-first agent data,
a star on the hub is the highest-signal help.

---

## Reddit (ready to paste)

**Title:** Local-first wellness MCP connectors for AI agents (Google Health, WHOOP, Garmin, nutrition)

I maintain an open-source hub for wellness MCP servers aimed at agent builders.
Goal: recovery / sleep / activity / nutrition context for Claude, Cursor, Hermes
without sending OAuth tokens or raw health data to a hosted middleware.

Hub (registry + privacy notes + install paths):  
https://github.com/davidmosiah/delx-wellness

Most useful feedback right now:

1. Redacted Google Health coverage report  
   https://github.com/davidmosiah/google-health-mcp/issues/21  
2. Or try nutrition with no OAuth: `npx -y wellness-nourish@0.8.0`

Not medical advice. Unofficial connectors — not affiliated with device vendors.

---

## Hacker News — Show HN (ready to paste)

**Title:** Show HN: Local-first Google Health MCP for AI agents (Fitbit / Pixel)

**Post:**

I built a local-first MCP server for Google Health API v4 so agents can use
user-authorized Fitbit / Pixel Watch / Android health data without a hosted
token vault.

```bash
npx -y google-health-mcp-unofficial@0.7.3 setup
npx -y google-health-mcp-unofficial@0.7.3 auth --manual   # works on SSH/headless
npx -y google-health-mcp-unofficial@0.7.3 coverage --live --json
```

Recent: external real-account coverage reports, headless OAuth from a community
PR, privacy limits enforced with tests (not just docs).

Looking for one more redacted live coverage report (different account):  
https://github.com/davidmosiah/google-health-mcp/issues/21

Full wellness hub: https://github.com/davidmosiah/delx-wellness

Not affiliated with Google/Fitbit. Not medical advice.

---

## Safe visual assets

- Architecture diagrams, terminal screenshots with **synthetic** data  
- Docs, registry, install commands, redacted coverage JSON  
- **Never:** tokens, secrets, real measurements, GPS, emails, account IDs  
- **Never** imply affiliation with device vendors
