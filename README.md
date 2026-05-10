<h1 align="center">Delx Wellness</h1>

<div align="center">
  <img src="assets/banner.png" alt="Delx Wellness — Local-first MCP connectors for wearables and nutrition" width="85%" />
</div>

<h3 align="center">
  Open-source MCP connectors for wearables, recovery, training and nutrition.<br>
  Give your AI agent your sleep, HRV, workouts and food &mdash; all local-first, all read-only.
</h3>

<p align="center">
  <a href="https://wellness.delx.ai"><img src="https://img.shields.io/badge/SITE-wellness.delx.ai-0EA5A3?style=for-the-badge&labelColor=0F172A" alt="Site" /></a>
  <a href="https://github.com/davidmosiah/delx-wellness-hermes"><img src="https://img.shields.io/badge/HERMES-one--command_setup-10B981?style=for-the-badge&labelColor=0F172A" alt="Hermes profile" /></a>
  <a href="https://github.com/davidmosiah/delx-wellness-openclaw"><img src="https://img.shields.io/badge/OPENCLAW-one--command_setup-FF6B35?style=for-the-badge&labelColor=0F172A" alt="OpenClaw profile" /></a>
  <a href="https://modelcontextprotocol.io"><img src="https://img.shields.io/badge/BUILT_FOR-MCP-7C3AED?style=for-the-badge&labelColor=0F172A" alt="Built for MCP" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/LICENSE-MIT-22C55E?style=for-the-badge&labelColor=0F172A" alt="License MIT" /></a>
</p>

<p align="center">
  <a href="https://github.com/davidmosiah/delx-wellness/stargazers"><img src="https://img.shields.io/github/stars/davidmosiah/delx-wellness?style=for-the-badge&labelColor=0F172A&logo=github&color=FBBF24" alt="GitHub stars" /></a>
  <a href="https://www.npmjs.com/~davidmosiah"><img src="https://img.shields.io/badge/NPM-11_packages-CB3837?style=for-the-badge&labelColor=0F172A&logo=npm&logoColor=white" alt="npm packages" /></a>
  <a href="https://github.com/davidmosiah/delx-wellness/discussions"><img src="https://img.shields.io/badge/DISCUSS-GitHub_Discussions-181717?style=for-the-badge&labelColor=0F172A&logo=github&logoColor=white" alt="Discussions" /></a>
  <a href="https://x.com/delx369"><img src="https://img.shields.io/badge/X-@delx369-000000?style=for-the-badge&labelColor=0F172A&logo=x&logoColor=white" alt="X / Twitter" /></a>
</p>

<p align="center">
  <strong>What is this?</strong> A registry of <strong>14 open-source MCP servers</strong> that turn your wearables, nutrition, room air quality, menstrual cycle, and continuous glucose into context any AI agent can read &mdash; with zero data ever leaving your machine.
</p>

<p align="center">
  <img src="assets/agent-workflow-demo.svg" alt="Delx Wellness local-first agent workflow: Telegram, Hermes and local MCP connectors" width="92%" />
</p>

<p align="center">
  ⭐ <strong>If this helps your agent workflow, star this hub.</strong><br>
  <em>Stars make the connector map easier for AI builders to find, and this is the canonical repo for the Delx Wellness ecosystem.</em>
</p>

---

## Start here

| Goal | Use this | Command |
|---|---|---|
| Install the whole wellness stack for Hermes | [`delx-wellness-hermes`](https://github.com/davidmosiah/delx-wellness-hermes) | `npx -y delx-wellness-hermes setup` |
| Install the whole wellness stack for OpenClaw | [`delx-wellness-openclaw`](https://github.com/davidmosiah/delx-wellness-openclaw) | `npx -y delx-wellness-openclaw setup` |
| Track food, barcode scans, hydration and meal summaries | [`wellness-nourish`](https://github.com/davidmosiah/wellness-nourish) | `npx -y wellness-nourish doctor` |
| Add recovery, strain, sleep and HRV | [`whoop-mcp`](https://github.com/davidmosiah/whoop-mcp) | `npx -y whoop-mcp-unofficial setup` |
| Add Body Battery, sleep, stress and training readiness | [`garminmcp`](https://github.com/davidmosiah/garminmcp) | `npx -y garmin-mcp-unofficial setup --auth` |
| Browse the human-friendly site | [`delx-wellness-site`](https://github.com/davidmosiah/delx-wellness-site) | [wellness.delx.ai](https://wellness.delx.ai) |

Agents should start with `agent_manifest`, `connection_status` or `capabilities` when a connector exposes them. Humans should start with the Hermes or OpenClaw profile packs when they want the whole stack installed as one local-first wellness agent.

---

## ✨ The 14 connectors

<table>
  <tr>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/whoop-mcp">
        <img src="https://img.shields.io/badge/WHOOP-FF0026?style=for-the-badge&labelColor=0F172A&logoColor=white" alt="WHOOP" /><br>
      </a>
      <code>whoop-mcp-unofficial</code><br>
      <sub>Recovery · HRV · Sleep · Strain</sub><br><br>
      <a href="https://github.com/davidmosiah/whoop-mcp"><img src="https://img.shields.io/github/stars/davidmosiah/whoop-mcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/whoop-mcp-unofficial"><img src="https://img.shields.io/npm/dm/whoop-mcp-unofficial?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/ouramcp">
        <img src="https://img.shields.io/badge/Oura-5C6068?style=for-the-badge&labelColor=0F172A&logoColor=white" alt="Oura" /><br>
      </a>
      <code>oura-mcp-unofficial</code><br>
      <sub>Readiness · Sleep · Activity · HRV</sub><br><br>
      <a href="https://github.com/davidmosiah/ouramcp"><img src="https://img.shields.io/github/stars/davidmosiah/ouramcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/oura-mcp-unofficial"><img src="https://img.shields.io/npm/dm/oura-mcp-unofficial?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/garminmcp">
        <img src="https://img.shields.io/badge/Garmin-007CC3?style=for-the-badge&labelColor=0F172A&logoColor=white" alt="Garmin" /><br>
      </a>
      <code>garmin-mcp-unofficial</code><br>
      <sub>Body Battery · Training Readiness · HRV</sub><br><br>
      <a href="https://github.com/davidmosiah/garminmcp"><img src="https://img.shields.io/github/stars/davidmosiah/garminmcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/garmin-mcp-unofficial"><img src="https://img.shields.io/npm/dm/garmin-mcp-unofficial?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/strava-mcp">
        <img src="https://img.shields.io/badge/Strava-FC4C02?style=for-the-badge&labelColor=0F172A&logoColor=white&logo=strava" alt="Strava" /><br>
      </a>
      <code>strava-mcp-unofficial</code><br>
      <sub>Activities · Streams · Routes · Segments</sub><br><br>
      <a href="https://github.com/davidmosiah/strava-mcp"><img src="https://img.shields.io/github/stars/davidmosiah/strava-mcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/strava-mcp-unofficial"><img src="https://img.shields.io/npm/dm/strava-mcp-unofficial?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/fitbitmcp">
        <img src="https://img.shields.io/badge/Fitbit-00B0B9?style=for-the-badge&labelColor=0F172A&logoColor=white&logo=fitbit" alt="Fitbit" /><br>
      </a>
      <code>fitbit-mcp-unofficial</code><br>
      <sub>Activity · Sleep · Heart · HRV</sub><br><br>
      <a href="https://github.com/davidmosiah/fitbitmcp"><img src="https://img.shields.io/github/stars/davidmosiah/fitbitmcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/fitbit-mcp-unofficial"><img src="https://img.shields.io/npm/dm/fitbit-mcp-unofficial?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/withingsmcp">
        <img src="https://img.shields.io/badge/Withings-00B6DE?style=for-the-badge&labelColor=0F172A&logoColor=white" alt="Withings" /><br>
      </a>
      <code>withings-mcp-unofficial</code><br>
      <sub>Body Measures · Sleep · Activity · Heart</sub><br><br>
      <a href="https://github.com/davidmosiah/withingsmcp"><img src="https://img.shields.io/github/stars/davidmosiah/withingsmcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/withings-mcp-unofficial"><img src="https://img.shields.io/npm/dm/withings-mcp-unofficial?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/apple-health-mcp">
        <img src="https://img.shields.io/badge/Apple_Health-FA243C?style=for-the-badge&labelColor=0F172A&logoColor=white&logo=apple" alt="Apple Health" /><br>
      </a>
      <code>apple-health-mcp-unofficial</code><br>
      <sub>Local export · Activity · Sleep · HRV · Workouts</sub><br><br>
      <a href="https://github.com/davidmosiah/apple-health-mcp"><img src="https://img.shields.io/github/stars/davidmosiah/apple-health-mcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/apple-health-mcp-unofficial"><img src="https://img.shields.io/npm/dm/apple-health-mcp-unofficial?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/samsung-health-mcp">
        <img src="https://img.shields.io/badge/Samsung_Health-1428A0?style=for-the-badge&labelColor=0F172A&logo=samsung&logoColor=white" alt="Samsung Health" /><br>
      </a>
      <code>samsung-health-mcp-unofficial</code><br>
      <sub>Galaxy Watch export · Sleep · HRV · Workouts</sub><br><br>
      <a href="https://github.com/davidmosiah/samsung-health-mcp"><img src="https://img.shields.io/github/stars/davidmosiah/samsung-health-mcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/samsung-health-mcp-unofficial"><img src="https://img.shields.io/npm/dm/samsung-health-mcp-unofficial?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/polarmcp">
        <img src="https://img.shields.io/badge/Polar-D7263D?style=for-the-badge&labelColor=0F172A&logoColor=white" alt="Polar" /><br>
      </a>
      <code>polar-mcp-unofficial</code><br>
      <sub>Nightly Recharge · Training Load · PPI / HRV</sub><br><br>
      <a href="https://github.com/davidmosiah/polarmcp"><img src="https://img.shields.io/github/stars/davidmosiah/polarmcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/polar-mcp-unofficial"><img src="https://img.shields.io/npm/dm/polar-mcp-unofficial?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/google-health-mcp">
        <img src="https://img.shields.io/badge/Google_Health-4285F4?style=for-the-badge&labelColor=0F172A&logo=google&logoColor=white" alt="Google Health" /><br>
      </a>
      <code>google-health-mcp-unofficial</code><br>
      <sub>Google Health API v4 · Fitbit migration · Rollups</sub><br><br>
      <a href="https://github.com/davidmosiah/google-health-mcp"><img src="https://img.shields.io/github/stars/davidmosiah/google-health-mcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/google-health-mcp-unofficial"><img src="https://img.shields.io/npm/dm/google-health-mcp-unofficial?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/wellness-nourish">
        <img src="https://img.shields.io/badge/Nourish-10B981?style=for-the-badge&labelColor=0F172A&logoColor=white" alt="Nourish" /><br>
      </a>
      <code>wellness-nourish</code><br>
      <sub>Food search · Barcodes · Intake · Hydration · Local</sub><br><br>
      <a href="https://github.com/davidmosiah/wellness-nourish"><img src="https://img.shields.io/github/stars/davidmosiah/wellness-nourish?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/wellness-nourish"><img src="https://img.shields.io/npm/dm/wellness-nourish?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/wellness-air">
        <img src="https://img.shields.io/badge/Air-0EA5A3?style=for-the-badge&labelColor=0F172A&logoColor=white" alt="Wellness Air" /><br>
      </a>
      <code>wellness-air</code><br>
      <sub>AirGradient · AQI · PM2.5 · CO₂ · Room quality</sub><br><br>
      <a href="https://github.com/davidmosiah/wellness-air"><img src="https://img.shields.io/github/stars/davidmosiah/wellness-air?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/wellness-air"><img src="https://img.shields.io/npm/dm/wellness-air?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/wellness-cycle-coach">
        <img src="https://img.shields.io/badge/Cycle_Coach-EC4899?style=for-the-badge&labelColor=0F172A&logoColor=white" alt="Cycle Coach" /><br>
      </a>
      <code>wellness-cycle-coach</code><br>
      <sub>Menstrual phase · Nutrition · Training · Stateless</sub><br><br>
      <a href="https://github.com/davidmosiah/wellness-cycle-coach"><img src="https://img.shields.io/github/stars/davidmosiah/wellness-cycle-coach?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/wellness-cycle-coach"><img src="https://img.shields.io/npm/dm/wellness-cycle-coach?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
    <td width="33%" align="center" valign="top">
      <a href="https://github.com/davidmosiah/wellness-cgm-mcp">
        <img src="https://img.shields.io/badge/CGM-DC2626?style=for-the-badge&labelColor=0F172A&logoColor=white" alt="CGM" /><br>
      </a>
      <code>wellness-cgm-mcp</code><br>
      <sub>Dexcom · Glucose · TIR · GMI · Meal response</sub><br><br>
      <a href="https://github.com/davidmosiah/wellness-cgm-mcp"><img src="https://img.shields.io/github/stars/davidmosiah/wellness-cgm-mcp?style=flat-square&labelColor=0F172A&color=FBBF24&logo=github" alt="stars" /></a>
      <a href="https://www.npmjs.com/package/wellness-cgm-mcp"><img src="https://img.shields.io/npm/dm/wellness-cgm-mcp?style=flat-square&labelColor=0F172A&color=0EA5A3&logo=npm&logoColor=white" alt="npm downloads" /></a>
    </td>
    <td width="33%" align="center" valign="top">
      <em>More connectors coming &mdash;<br>follow on <a href="https://x.com/delx369">X</a> for releases.</em>
    </td>
  </tr>
</table>

> Each connector is a standalone npm package. Install one or all fourteen &mdash; they coexist and the agent reconciles overlapping signals (WHOOP, Garmin, Apple Health, Samsung Health and Google Health all reporting sleep, etc.).

---

## 🚀 Quick Start &mdash; one command for the whole stack

The fastest path is a **profile pack**. One command creates a local-first wellness profile with onboarding, skills, MCP presets and setup checks for all 14 connectors:

```bash
npx -y delx-wellness-hermes setup
hermes -p delx-wellness
```

For OpenClaw:

```bash
npx -y delx-wellness-openclaw setup
openclaw --profile delx-wellness agent --local --message "Open Delx Wellness onboarding"
```

That's it. The setup wizard walks you through choosing which providers to wire up, checks the local Nourish preset (no OAuth required), and prints the next commands for model setup and per-provider auth.

> 📦 [`delx-wellness-hermes`](https://github.com/davidmosiah/delx-wellness-hermes) and [`delx-wellness-openclaw`](https://github.com/davidmosiah/delx-wellness-openclaw) are the first runtime-native profile packs &mdash; they preconfigure everything below so you don't have to glue 11 MCP configs by hand.

| Runtime | Profile pack | Repository | Page |
|---|---|---|---|
| **Hermes** | Delx Wellness for Hermes | [`delx-wellness-hermes`](https://github.com/davidmosiah/delx-wellness-hermes) | [wellness.delx.ai/hermes](https://wellness.delx.ai/hermes) |
| **OpenClaw** | Delx Wellness for OpenClaw | [`delx-wellness-openclaw`](https://github.com/davidmosiah/delx-wellness-openclaw) | [wellness.delx.ai/openclaw](https://wellness.delx.ai/openclaw) |

---

## 🔌 Or wire connectors individually

Each connector is a standalone npm package with its own guided setup CLI &mdash; use this path when you want to drop a single provider into Claude Desktop, Cursor, ChatGPT Desktop or any other MCP client.

```bash
npx -y whoop-mcp-unofficial         setup && npx -y whoop-mcp-unofficial         auth
npx -y oura-mcp-unofficial          setup && npx -y oura-mcp-unofficial          auth
npx -y garmin-mcp-unofficial        setup && npx -y garmin-mcp-unofficial        auth --install-helper
npx -y strava-mcp-unofficial        setup && npx -y strava-mcp-unofficial        auth
npx -y fitbit-mcp-unofficial        setup && npx -y fitbit-mcp-unofficial        auth
npx -y google-health-mcp-unofficial setup && npx -y google-health-mcp-unofficial auth
npx -y withings-mcp-unofficial      setup && npx -y withings-mcp-unofficial      auth
npx -y apple-health-mcp-unofficial  setup --export-path /path/to/export.zip
npx -y samsung-health-mcp-unofficial setup --export-path /path/to/SamsungHealth
npx -y polar-mcp-unofficial         setup && npx -y polar-mcp-unofficial         auth
npx -y wellness-nourish             manifest
```

Then drop one of the [client config examples](examples/) into your AI client:

| Client | Config | Notes |
|---|---|---|
| **Claude Desktop** | [`examples/claude-desktop.json`](examples/claude-desktop.json) | Drop into `claude_desktop_config.json` |
| **Claude Code** | [`examples/claude-code.md`](examples/claude-code.md) | Add with `claude mcp add-json` |
| **Codex** | [`examples/codex.toml`](examples/codex.toml) | Paste into `~/.codex/config.toml` or add with `codex mcp add` |
| **Cursor** | [`examples/cursor.json`](examples/cursor.json) | Drop into Cursor's MCP settings |
| **Windsurf** | [`examples/windsurf.json`](examples/windsurf.json) | Same shape as Cursor |
| **Hermes** | [`examples/hermes.md`](examples/hermes.md) | YAML + skill files (or use the profile pack above) |
| **OpenClaw** | [`examples/openclaw.md`](examples/openclaw.md) | OpenClaw `mcp.servers` config (or use the profile pack above) |
| **Generic / ChatGPT** | [`examples/generic-mcp.md`](examples/generic-mcp.md) | Standard `mcpServers` shape |

---

## 🏗️ How it fits together

```mermaid
flowchart LR
    subgraph A[" Your AI Agent "]
      direction LR
      Claude[Claude]
      Cursor[Cursor]
      Hermes[Hermes]
      OpenClaw[OpenClaw]
      ChatGPT[ChatGPT Desktop]
    end

    subgraph L[" Local on your machine "]
      direction TB
      MCP[profile pack<br/>or standalone MCP configs]
      W[whoop-mcp]
      O[oura-mcp]
      G[garmin-mcp]
      S[strava-mcp]
      F[fitbit-mcp]
      GH[google-health-mcp]
      Wi[withings-mcp]
      AH[apple-health-mcp]
      SH[samsung-health-mcp]
      P[polar-mcp]
      N[nourish]
    end

    subgraph P2[" Provider APIs "]
      direction TB
      WHOOP[WHOOP API]
      OURA[Oura API]
      GARMIN[Garmin Connect]
      STRAVA[Strava API]
      FITBIT[Fitbit API]
      GOOGLE[Google Health API]
      WITHINGS[Withings API]
      AHE[Apple Health export.zip]
      SHE[Samsung Health CSV export]
      POLAR[Polar Accesslink]
      LOCAL[Local food DB]
    end

    A --> MCP
    MCP --> W & O & G & S & F & GH & Wi & AH & SH & P & N
    W --> WHOOP
    O --> OURA
    G --> GARMIN
    S --> STRAVA
    F --> FITBIT
    GH --> GOOGLE
    Wi --> WITHINGS
    AH --> AHE
    SH --> SHE
    P --> POLAR
    N --> LOCAL

    style L fill:#0F172A,stroke:#0EA5A3,color:#fff
    style A fill:#0F172A,stroke:#10B981,color:#fff
    style P2 fill:#0F172A,stroke:#7C3AED,color:#fff
```

<p align="center"><em>One agent &rarr; one local profile &rarr; eleven connectors &rarr; your provider data. <strong>Tokens never leave your machine.</strong></em></p>

---

## 🧭 Which connector should I install first?

```text
Have a WHOOP?              → start with whoop-mcp        (recovery, HRV, sleep, strain)
Have a Garmin?             → start with garminmcp        (Body Battery, training readiness, HRV)
Have an Oura?              → start with ouramcp          (readiness, sleep, activity, HRV)
Have Withings devices?     → start with withingsmcp      (body measures, sleep, activity, heart)
Have an Apple Health export?→ add apple-health-mcp       (local export activity, sleep, HRV, workouts)
Have a Galaxy Watch export? → add samsung-health-mcp     (local CSV activity, sleep, HRV, workouts)
Have a Polar device?       → start with polarmcp         (Nightly Recharge, training load, PPI/HRV)
Run/ride/swim a lot?       → add strava-mcp              (activities, streams, routes)
Just bought a Fitbit?      → add fitbitmcp               (activity, sleep, heart, HRV)
Migrating Fitbit to Google?→ add google-health-mcp       (Google Health API v4, rollups, reconciled streams)
Tracking food?             → add wellness-nourish        (food search, barcode lookup, intake, hydration)
Multiple devices?          → install several. Each is independent and read-only.
```

The connectors are designed to coexist. When two providers cover the same signal (e.g. WHOOP and Garmin both report sleep), each tool returns provider-tagged data and your agent reconciles them.

---

## 💡 Why local-first?

Your wearable data is the most personal context an agent can have &mdash; sleep stages, heart rhythm, recovery scores, what you ate. Sending all of that through a hosted vault you don't control is the wrong default.

Delx Wellness flips it:

- **🔒 Tokens stay on your machine.** OAuth completes locally; refresh tokens live in your OS keychain or a `~/.config` file you own.
- **📖 Read-only by design.** Every connector is read-only. There is no "write to your Apple Health" tool, no surprise side effects.
- **🧱 Standalone packages.** Each connector is a separate npm package with a clear scope. Audit one without auditing nine.
- **🤝 Vendor-neutral.** You can mix providers, swap one out, or remove all of them without anything breaking on a hosted side.
- **🌐 No phone-home.** No analytics, no telemetry, no usage reporting baked into the connectors themselves.

The hosted commercial layer (token vault, billing, rate limits) **may stay private** &mdash; but the connectors that touch your data are open source, on this registry, forever.

---

## 📊 Open-source boundary

| Layer | Public | Notes |
|---|:---:|---|
| Local provider connectors | ✅ | 11 individual MCP servers (WHOOP · Strava · Fitbit · Google Health · Garmin · Oura · Withings · Apple Health · Samsung Health · Polar · Nourish) |
| Hermes profile pack | ✅ | [`delx-wellness-hermes`](https://github.com/davidmosiah/delx-wellness-hermes) &mdash; one-command setup |
| Connector registry & docs | ✅ | This repository |
| Normalized schemas | ✅ | Stable shared shapes for cross-provider tools &mdash; [`schemas/`](schemas/) |
| Hosted hub API | ⏳ | May remain private during product-market fit |
| Token vault, billing, rate limits | ⏳ | Sensitive commercial and security surface |
| Real user health data | ❌ | Never committed to GitHub |

Tiers and trust levels are defined in [`docs/connector-quality-standard.md`](docs/connector-quality-standard.md). Machine-readable catalog: [`registry.json`](registry.json).

---

## 📚 Reference docs

- [Connector quality standard](docs/connector-quality-standard.md) &mdash; release and trust checklist
- [Registry validation](docs/registry-validation.md) &mdash; what the `context_ready` CI validator enforces and how to extend it
- [Provider status](docs/provider-status.md) &mdash; current matrix and risks
- [Privacy model](docs/privacy-model.md) &mdash; local-first privacy boundary and hosted-hub considerations
- [Normalized schema](docs/normalized-schema.md) &mdash; shared cross-provider wellness snapshot shape
- [Growth playbook](docs/growth-playbook.md) and [MCP directory submissions](docs/mcp-directory-submissions.md) &mdash; ecosystem ops

---

## ⚠️ What this is not

- Not a medical device.
- Not medical advice, diagnosis, treatment or emergency support.
- Not a promise that every future hosted product will be open source.
- Not a place for real user health exports, OAuth tokens, API secrets or private deployment files.

---

## 🧭 Direction

The practical near-term path:

1. Keep provider MCPs independently installable.
2. Use this repository as the public connector registry and documentation hub.
3. Define shared normalized schemas before building cross-provider tools.
4. Keep hosted/commercial infrastructure private until the product direction is proven.

---

## 👤 Built by

[David Batista](https://github.com/davidmosiah) &mdash; founder of [Delx](https://delx.ai), building protocol layers for autonomous AI agents.

Follow on X: [@delx369](https://x.com/delx369) · Site: [wellness.delx.ai](https://wellness.delx.ai)

---

## 📜 License

MIT &mdash; see [LICENSE](LICENSE).

<sub>Delx Wellness is an open-source project. WHOOP, Oura, Garmin, Strava, Fitbit, Google Health, Withings, Apple Health, Samsung Health and Polar are trademarks of their respective owners. None of the connectors in this registry are affiliated with, endorsed by, or supported by those companies.</sub>
