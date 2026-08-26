# Scope and Assessment Charter

## Objective

[CONFIRMED] Assess a synthetic reference architecture for an internal system that uses customer and sales history plus an open-source predictive model to recommend products to salespeople. Produce traceable risks, controls, tests, and evidence that can be adapted after discovery of the real environment.

## Decision supported

Determine what must be validated and controlled before a responsible owner could decide whether the real system's residual cybersecurity, privacy, and AI risks are acceptable.

## In scope

- Business use and human decision point.
- Customer/sales data ingestion, preparation, training, registry, inference, sales application, logging, and administration.
- Identities, secrets, open-source dependencies, model and data provenance.
- Confidentiality, integrity, availability, privacy, reliability, bias/fairness, explainability, drift, accountability, and human oversight.
- Synthetic laboratory code and its generated evidence.

## Out of scope

- Any production penetration test, production data access, or claim about actual company controls.
- Legal opinion, compliance certification, authorization to operate, financial loss quantification, or formal privacy impact assessment.
- Generative-AI/agentic threats unless later discovery shows those technologies are used.
- Physical security and enterprise-wide controls except where inherited-control evidence is requested.

## Method and framework versions

- EBIOS Risk Manager, ANSSI English guide v1.0 (2018/2019 publication path).
- NIST SP 800-37 Rev. 2 for the RMF lifecycle.
- NIST SP 800-53 Rev. 5, including Release 5.2.0 updates noted by NIST in August 2025; selected controls only.
- NIST AI RMF 1.0 (NIST AI 100-1, January 2023) and Playbook. [CONFIRMED] NIST states AI RMF 1.0 is under revision as of August 25, 2026.
- MITRE ATLAS living data, retrieved August 25, 2026; predictive-AI-relevant techniques only.
- OWASP Machine Learning Security Top 10 2023 draft as threat research, not the governing standard.

## Analysis constraints

- Ratings are ordinal and provisional; they are not probabilities or financial estimates.
- Prototype implementation status does not establish production control status.
- Unknown facts remain in `ASSUMPTIONS.md` and `OPEN_QUESTIONS.md`.
- Risk owners are roles marked `[DECISION REQUIRED]`, never silently assigned people.

## Completion criteria

The portfolio assessment is complete when every risk has a feared event, scenario, provisional score rationale, treatment, mapped control objective, assessment procedure, evidence status, residual rating, owner role, and open production-validation step.
