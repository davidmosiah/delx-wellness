#!/usr/bin/env bash
# Run mcp-scorecard with min-score 90 against local top5 package paths.
# Usage: from delx-wellness: bash scripts/scorecard-top5.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# sibling repos under 02-mcp-servers
BASE="$(cd "$ROOT/.." && pwd)"
SCORECARD=(npx -y mcp-scorecard@0.5.6)
MIN=90
fail=0
for dir in google-health-mcp wellness-nourish whoop-mcp garmin-mcp; do
  path="$BASE/$dir"
  if [[ ! -d "$path" ]]; then
    echo "SKIP missing $path"
    continue
  fi
  echo "=== scorecard $dir min=$MIN ==="
  if ! "${SCORECARD[@]}" --path "$path" --min-score "$MIN"; then
    echo "FAIL $dir"
    fail=1
  fi
done
# creative-forge may live under tools
cf="$BASE/../06-tools-scripts/creative-forge"
if [[ -d "$cf" ]]; then
  echo "=== scorecard creative-forge (advisory if not stdio MCP) ==="
  "${SCORECARD[@]}" --path "$cf" --min-score "$MIN" || echo "advisory fail creative-forge"
fi
exit $fail
