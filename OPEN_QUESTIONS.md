# Open Questions

These questions block a decision-ready production assessment. Record answers with the source, date, approver, and affected artifact.

## Critical before production risk acceptance

1. [OPEN QUESTION] What is the authoritative business purpose, prohibited use, and acceptable-use boundary?
2. [OPEN QUESTION] Does the salesperson always make the final decision, and can they reject/override a recommendation?
3. [OPEN QUESTION] What customer attributes, special-category data, and derived features are processed?
4. [OPEN QUESTION] Which jurisdictions, contracts, privacy notices, sector rules, and retention requirements apply?
5. [OPEN QUESTION] What are the actual sources, interfaces, hosting environments, network zones, and third parties?
6. [OPEN QUESTION] Which open-source model, packages, repositories, and licenses are used, and how is provenance verified?
7. [OPEN QUESTION] Who can read source data, modify training code/data, approve a model, deploy it, query the API, and view logs?
8. [OPEN QUESTION] What identity provider, MFA, secrets manager, key management, and privileged-access controls exist?
9. [OPEN QUESTION] What model quality, fairness, explainability, latency, availability, and drift thresholds have business approval?
10. [OPEN QUESTION] What incident, rollback, customer redress, and model retirement procedures exist?
11. [DECISION REQUIRED] Who owns every risk and who has authority to accept residual risk?
12. [DECISION REQUIRED] What risk appetite and scoring method supersede the provisional 4×4 scale?

## Evidence to request

- Current architecture/DFD, data inventory and records of processing.
- IAM roles, access reviews, authentication settings, and privileged activity logs.
- Source repositories, branch protection, CI/CD policy, dependency lockfiles, SBOMs, and provenance attestations.
- Dataset/version lineage, validation results, approval records, model cards, registry permissions, hashes/signatures, and rollback logs.
- API gateway/WAF/rate-limit configuration and representative audit logs with sensitive data redacted.
- Monitoring dashboards, alerts, incident tickets, backup/restore tests, and recovery objectives.
- Applicable policy, contractual, privacy, and legal requirements.
