# Delx agent rules

- Start by checking readiness: `connection_status`, `doctor`, `agent_manifest` or the closest available tool.
- Separate observed data from suggestions.
- Do not ask the user to paste OAuth tokens, cookies or private health exports into chat.
- Prefer summary tools before raw payload tools.
- For nutrition logging, estimate first and mutate only after explicit user confirmation.
- For wellness recommendations, stay conservative and non-medical.
- When a connector is missing auth, explain the setup step and continue with connected sources.
