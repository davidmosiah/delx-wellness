# Privacy Model

Wellness data is sensitive. The default design is local-first for open connectors and stricter for any future hosted hub.

## Public Connector Boundary

- Tokens and provider credentials stay on the user's machine.
- MCP tools must not return OAuth tokens, refresh tokens, client secrets, passwords, or raw private credentials.
- Summary or structured payloads should be the default.
- Raw upstream API payloads should be opt-in and clearly labeled.
- GPS, location, profile, and health identifiers should be minimized unless explicitly requested by the user.

## Hosted Hub Boundary

The hosted hub is not part of this repository today. If built, it should treat the following as private infrastructure:

- Token vault and encryption implementation.
- API key issuance and hashing.
- Billing and x402/payment handling.
- Rate limiting and quota enforcement.
- Provider approval workflows.
- User audit logs and support tooling.

## Data That Must Never Be Committed

- Real wearable exports from users.
- OAuth access tokens or refresh tokens.
- Provider client secrets.
- Supabase service-role keys or database URLs.
- Medical reports, psychological reports, or identifiable health documents.
- Production deployment scripts containing secrets.

## Product Safety

These connectors expose user-authorized wellness context for AI agents. They are not medical devices and should not claim to diagnose, treat, cure, or prevent disease.
