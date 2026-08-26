# Executive Summary

## Executive Summary

- **The concept is assessable, but production risk is not yet decision-ready.** The reference analysis identifies credible confidentiality, integrity, availability, supply-chain, model-quality, privacy and governance scenarios, while the real architecture, data, owners, controls and risk appetite remain open.
- **The most consequential provisional paths are loss of customer-data confidentiality and manipulation of recommendations.** The paths include compromised identities, poisoned data, open-source supply-chain compromise, and unauthorized model changes.
- **A defensible decision depends on traceability and evidence.** Each provisional risk is connected to an EBIOS scenario, selected NIST control objectives, AI RMF outcomes, a treatment, an assessment procedure and a residual-risk decision owner.
- **The laboratory proves procedures, not production effectiveness.** It demonstrates synthetic training, authenticated/validated inference, artifact-integrity verification, audit-safe logging, drift/fairness checks, SBOM generation and security scanning.

## The immediate decision is to complete discovery before accepting risk

The organization should not treat this repository as evidence that production controls exist. First confirm the business purpose, human decision boundary, actual data and architecture, third parties, identities, legal obligations, model lifecycle, quality thresholds and accountable owners. Then replace every `[ASSUMPTION]` and execute the assessment plan against production-approved evidence.

## Priority treatment themes

1. Establish governance, owners, risk appetite, prohibited uses, approval gates and a model/system inventory.
2. Protect customer data and privileged identities through minimization, strong authentication, least privilege, encryption, access review and audit.
3. Secure the ML supply chain with trusted sources, pinned dependencies, SBOMs, vulnerability/license review, isolated builds, provenance and signed artifacts.
4. Protect recommendation integrity through data validation/lineage, separation of duties, model approval, integrity verification, rollback and change monitoring.
5. Define and continuously monitor business-approved accuracy, calibration, group performance, drift, latency, availability and abuse thresholds.
6. Maintain meaningful human oversight, explanation, override/contest, incident and redress mechanisms.

## What could change the conclusion

External exposure, automated decisions, sensitive attributes, weak identity controls, uncontrolled retraining, untrusted model formats, absent lineage, high-impact customer outcomes, or strict regulatory obligations would materially increase scope or priority. Strong inherited controls and independently verified lifecycle governance could reduce residual risk.

## Decision requested

[DECISION REQUIRED] Name the business/system, data, ML, security, privacy/legal and residual-risk owners; approve the discovery workshop; and decide which production evidence can be reviewed. No residual-risk acceptance should occur until these roles and evidence are confirmed.
