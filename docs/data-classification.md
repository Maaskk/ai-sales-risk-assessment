# Data Classification and Logging Rules

| Data category | Lab example | Provisional classification | Default handling |
|---|---|---|---|
| Direct identifiers | None in committed dataset | Restricted if introduced | Tokenize/pseudonymize; exclude when not needed |
| Customer features | segment, region, tenure, purchase counts | Confidential | Purpose limit, minimize, encrypt, restrict and audit |
| Sales outcomes | synthetic product outcome | Confidential | Validate lineage/labels; version and restrict |
| Model artifact | serialized scikit-learn pipeline | Confidential / integrity critical | Verify hash/signature; approve and restrict promotion |
| Recommendations | product, confidence, model version | Confidential | Limit to authorized case; record decision metadata |
| Security logs | actor, request ID, action, result | Confidential | No raw features/secrets; integrity and retention controls |
| Metrics | aggregate quality/fairness/drift | Internal | Minimum group sizes and disclosure review |

## Prohibited in logs

Passwords, API keys, connection strings, full customer records, unredacted request bodies, raw model artifacts, and special-category attributes unless explicitly justified and protected.
