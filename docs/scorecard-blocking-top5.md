# Scorecard ≥90 blocking path (top5)

```bash
bash scripts/scorecard-top5.sh
```

Uses `mcp-scorecard --min-score 90` against local sibling package paths.
CI on individual packages may pin an older scorecard minor; hub script is the fleet gate.
Waiver requires written expiry note in scorecard-receipts.md.
