# delx-wellness

[![Status](https://img.shields.io/badge/status-WIP-yellow?style=flat-square)](https://github.com/davidmosiah/delx-wellness) [![MCP Compatible](https://img.shields.io/badge/MCP-compatible-7C3AED?style=flat-square)](https://modelcontextprotocol.io) [![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://opensource.org/licenses/MIT)

> 🚧 **Work in progress.** Unified MCP hub for wellness data — WHOOP, Strava, Fitbit, Garmin, Oura, Apple Health.

## What this is

A single MCP server that aggregates your wellness data across multiple providers, so your AI agents can reason about your full physiology in one place — not bouncing between four separate MCPs.

## Goals

- **One MCP, all wearables.** Install once, configure once, ask anything.
- **Provider-agnostic queries.** "How was my recovery this week?" works the same whether your data is on WHOOP, Garmin, Oura, or all three.
- **Privacy-first.** All credentials stay local. No data leaves your machine without your consent.
- **Open source.** MIT licensed. Built in public.

## Currently planned providers

- [x] WHOOP — via [`whoop-mcp`](https://github.com/davidmosiah/whoop-mcp)
- [x] Strava — via [`strava-mcp`](https://github.com/davidmosiah/strava-mcp)
- [x] Fitbit — via [`fitbitmcp`](https://github.com/davidmosiah/fitbitmcp)
- [ ] Garmin Connect
- [ ] Oura Ring
- [ ] Apple Health
- [ ] Eight Sleep
- [ ] Withings

Suggestions for additional providers? [Open an issue](https://github.com/davidmosiah/delx-wellness/issues).

## Built by

[David Batista](https://github.com/davidmosiah) — founder of [Delx](https://delx.ai), building the protocol layer for autonomous AI agents.

Follow on X: [@delx369](https://x.com/delx369)
