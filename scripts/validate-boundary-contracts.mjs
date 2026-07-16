#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const registry = JSON.parse(readFileSync(path.resolve(SCRIPT_DIR, "..", "registry.json"), "utf8"));

const WELLNESS_CONNECTORS = new Set([
  "apple-health",
  "eight-sleep",
  "fitbit",
  "garmin",
  "google-health",
  "oura",
  "polar",
  "samsung-health",
  "strava",
  "wellness-air",
  "wellness-cgm-mcp",
  "wellness-cycle-coach",
  "nourish",
  "whoop",
  "withings",
  "exercise-catalog"
]);

const VALID_BOUNDARIES = new Set([
  "remote_api",
  "multi_provider_api",
  "local_export",
  "computational"
]);

const connectors = registry.connectors.filter((connector) => WELLNESS_CONNECTORS.has(connector.id));
const failures = [];

for (const connector of connectors) {
  const boundary = connector.quality?.boundary_contract;
  if (!VALID_BOUNDARIES.has(boundary)) {
    failures.push(`${connector.id}: quality.boundary_contract must be one of ${[...VALID_BOUNDARIES].join(", ")}`);
  }
}

for (const id of WELLNESS_CONNECTORS) {
  if (!connectors.some((connector) => connector.id === id)) failures.push(`${id}: connector missing from registry`);
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}

process.stdout.write(`PASS: ${connectors.length} wellness connectors declare executable boundary contracts.\n`);
