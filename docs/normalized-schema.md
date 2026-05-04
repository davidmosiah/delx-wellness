# Normalized Wellness Schema

The long-term value of Delx wellness connectors is not just reading provider APIs. It is giving agents a stable cross-provider shape.

## Snapshot Shape

Use `WellnessSnapshot` for "what is true about the user now or today?"

```json
{
  "date": "2026-05-04",
  "timezone": "America/Fortaleza",
  "providers": ["whoop", "garmin"],
  "recovery": {
    "score": 82,
    "band": "green",
    "source": "whoop",
    "confidence": "high"
  },
  "sleep": {
    "total_asleep_minutes": 496,
    "efficiency_percent": 91,
    "source": "garmin",
    "confidence": "medium"
  },
  "strain": {
    "score": 12.4,
    "source": "whoop",
    "confidence": "high"
  },
  "activity": {
    "steps": 8200,
    "workouts": 1,
    "source": "garmin",
    "confidence": "medium"
  },
  "notes": []
}
```

## Design Rules

- Preserve provider provenance with every normalized value.
- Prefer explicit null/missing fields over invented values.
- Include confidence when providers disagree or data is incomplete.
- Keep medical interpretation out of the schema. Agents can reason over context, but the connector should expose data and boundaries.
- Keep raw provider payloads separate from normalized summaries.
