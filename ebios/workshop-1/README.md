# Workshop 1 — Scope and Security Baseline

## Mission

M-01 — [ASSUMPTION] Increase sales effectiveness by giving salespeople relevant, data-driven product recommendations while preserving lawful, fair and secure customer treatment.

## Business values

| ID | Business value | Security needs |
|---|---|---|
| BV-01 | Customer information and trust | Confidentiality, integrity, privacy, accountability |
| BV-02 | Sales and transaction information | Confidentiality, integrity, availability |
| BV-03 | Recommendation correctness | Integrity, reliability, explainability |
| BV-04 | Commercial strategy/model intelligence | Confidentiality, integrity |
| BV-05 | Sales decision process | Availability, human oversight, traceability |
| BV-06 | Revenue and customer relationship | Integrity, availability, fairness |

## Supporting assets

| ID | Supporting asset | Production status |
|---|---|---|
| SA-01 | Customer/CRM source | [OPEN QUESTION] |
| SA-02 | Sales-history source | [OPEN QUESTION] |
| SA-03 | Data preparation and feature pipeline | [OPEN QUESTION] |
| SA-04 | Versioned training dataset/feature definitions | [OPEN QUESTION] |
| SA-05 | Training environment and code repository | [OPEN QUESTION] |
| SA-06 | Open-source packages/model inputs | [CONFIRMED] Concept says open source; exact items unknown |
| SA-07 | Model artifact and registry | [OPEN QUESTION] |
| SA-08 | Recommendation service/API | [OPEN QUESTION] |
| SA-09 | Sales application and endpoint | [OPEN QUESTION] |
| SA-10 | IAM, secrets and cryptographic keys | [OPEN QUESTION] |
| SA-11 | Audit, quality and security monitoring | [OPEN QUESTION] |
| SA-12 | Personnel, governance and procedures | [OPEN QUESTION] |

## Feared events and provisional severity

Severity is impact only; likelihood is addressed in Workshop 4. Ratings require stakeholder validation.

| ID | Feared event | Affected values | Provisional severity | Rationale |
|---|---|---|---:|---|
| FE-01 | Unauthorized disclosure of customer information | BV-01, BV-02 | 4 Severe | Potential material privacy, trust, contractual and legal harm; data scope unknown. |
| FE-02 | Corruption of customer/sales/training information | BV-01, BV-02, BV-03 | 4 Severe | Can systematically corrupt training and business decisions. |
| FE-03 | Manipulation or unauthorized replacement of the model/recommendations | BV-03, BV-05, BV-06 | 4 Severe | May scale incorrect or self-serving offers across customers. |
| FE-04 | Recommendation service unavailable | BV-05, BV-06 | 3 Significant | Sales process may degrade; manual fallback and RTO are unknown. |
| FE-05 | Theft of model or commercial intelligence | BV-04 | 3 Significant | Could expose strategy/IP; actual model value is unknown. |
| FE-06 | Unfair, invalid, unexplained or drifting recommendations cause harm | BV-01, BV-03, BV-05, BV-06 | 4 Severe | Can harm customers and business trust; decision impact and protected groups are unknown. |
| FE-07 | Actions and decisions cannot be reconstructed or contested | BV-01, BV-05 | 3 Significant | Weakens accountability, incident response and redress. |

## Security baseline review

Because production evidence has not been provided, every baseline area is `Not assessed` rather than `Absent`.

| Area | Baseline objective | Production status | Evidence needed |
|---|---|---|---|
| Governance | Roles, policies, risk acceptance and AI lifecycle gates | Not assessed | Policies, RACI, approvals |
| IAM | Strong authentication, least privilege, reviews, separation of duties | Not assessed | IAM exports/configuration/reviews |
| Data protection | Inventory, minimization, lawful use, encryption, retention | Not assessed | Data inventory, DPIA, keys/config |
| Secure development | Review, protected branches, tests, secrets and dependency management | Not assessed | Repository/CI evidence |
| ML lifecycle | Lineage, validation, approval, integrity, rollback, monitoring | Not assessed | Registry, model card, promotion records |
| Operations | Logging, alerting, incident, backup, continuity and recovery | Not assessed | SIEM, playbooks, recovery tests |
| Supply chain | Trusted sources, SBOM, provenance, vulnerability/license response | Not assessed | SBOM, attestations, tickets |

## Workshop decisions required

- Validate mission, values, assets, feared events and severity with business, privacy, security and ML stakeholders.
- Identify applicable regulatory/contractual baseline and organization policies.
- Record baseline deviations that should become scenarios or immediate compliance measures.
