# Connector Boundary Contract Standard

This standard turns provider assumptions into executable tests. It was added after real Polar account testing showed that two neighboring v4 endpoints required different date formats and that a valid sleep response could still lose its physiological payload during normalization.

The rule is simple: a connector may normalize data for agents, but it must not invent one global provider contract or erase the upstream facts it received.

## Boundary families

### `remote_api`

One remote provider API. Tests must exercise the production client at the HTTP boundary and assert endpoint-specific method, auth placement, query/body serialization, pagination or feature expansion, and response envelope extraction.

### `multi_provider_api`

Multiple remote APIs behind one MCP. Every provider keeps a separate executable contract. Shared normalization may unify output fields, but it must not force one provider's auth, date, pagination or envelope rules onto another.

### `local_export`

Local files supplied by the user. Tests cover parser envelopes, malformed-record diagnostics, incremental/freshness behavior and forward-compatible structured fields. No artificial HTTP test is required.

### `computational`

Local reasoning, storage or source normalization. Tests cover deterministic derivation, source attribution, fallback visibility and preservation of supplied source facts.

## Required invariants

1. **Endpoint-specific requests.** When endpoints differ, the distinction lives in an explicit contract map or endpoint-scoped serializer and is exercised through production code.
2. **Real boundary tests.** Remote clients are tested by replacing network transport and inspecting the actual outgoing URL/body, not by testing a duplicate helper.
3. **Envelope extraction.** Tests include the provider's real top-level collection/detail envelope and prove records are not silently reduced to identifiers.
4. **Additive structured normalization.** Structured output preserves upstream fields and nested objects after secret/GPS redaction. Normalized aliases are additive; on a name collision the upstream fact wins. Summary output may be a compact flattened projection.
5. **One client path.** Summary and context tools use the same request serializers and envelope extractors as direct tools.
6. **Observable partial failure.** Aggregators may return useful partial data, but every swallowed provider/domain failure is also emitted through the redacted stderr logger and reflected in confidence/status metadata.
7. **Sanitized fixtures.** Contract fixtures are synthetic and contain no real token, health record, GPS trace, account identifier or private export.

## Minimum regression proof

Before a remote connector patch release, CI must include:

- one exact request-serialization assertion for every distinct endpoint contract family;
- one pagination, repeated-parameter or expansion assertion when the provider supports it;
- one real response-envelope extraction assertion;
- one structured preservation/redaction collision assertion;
- one summary/context assertion using the production client path;
- one partial-failure observability assertion when aggregation is supported.

Local-export and computational connectors apply only the relevant parser, preservation, source and failure contracts. A boundary classification never justifies adding unused infrastructure.

## Real-account validation

Mocked HTTP tests prevent known regressions but do not replace provider validation. Releases must distinguish automated contract proof from a real-account smoke test. A tester report can add a new endpoint distinction; once confirmed, that distinction becomes a permanent regression fixture without copying the tester's private data.
