#!/usr/bin/env bash
# Print npm latest for Delx wellness fleet packages (read-only).
set -euo pipefail
pkgs=(
  google-health-mcp-unofficial
  garmin-mcp-unofficial
  strava-mcp-unofficial
  fitbit-mcp-unofficial
  polar-mcp-unofficial
  whoop-mcp-unofficial
  wellness-nourish
  delx-wellness-hermes
  delx-living-body
  delx-mcp-kit
  mcp-scorecard
)
printf '%-40s %s\n' "package" "npm_latest"
printf '%-40s %s\n' "-------" "----------"
for p in "${pkgs[@]}"; do
  v=$(npm view "$p" version 2>/dev/null || echo "?")
  printf '%-40s %s\n' "$p" "$v"
done
