# NIST RMF Mapping

NIST SP 800-37 Rev. 2 defines seven steps: Prepare, Categorize, Select, Implement, Assess, Authorize and Monitor. This mapping uses RMF as a lifecycle around the EBIOS scenario analysis; it does not claim a federal authorization package.

| RMF step | Repository output | Current status | Production completion requirement |
|---|---|---|---|
| Prepare | Scope, assumptions, discovery questions, roles, business values, risk method | Lab complete / production partial | Confirm context, stakeholders, requirements, assets, risk appetite and common controls |
| Categorize | Feared-event severity and data classification | Provisional | Determine impact using the organization's method and applicable information types |
| Select | Risk-to-control matrix and treatment plan | Provisional selected controls | Tailor an approved baseline/profile and document rationale, dependencies and inherited controls |
| Implement | Synthetic API/model integrity/logging/CI controls | Prototype only | Document production implementation, responsibility and configuration |
| Assess | Assessment plan and automated lab evidence | Lab partial | Independent assessors execute examine/interview/test procedures against production evidence |
| Authorize | Residual-risk template | Not performed | Authorized official reviews risks, assessment results and remediation plan, then records a time-bound decision |
| Monitor | Drift/fairness/security test patterns and evidence workflow | Prototype only | Define frequency, ownership, metrics, change triggers, vulnerability response and ongoing authorization inputs |

## Categorization note

The EBIOS severity scale in this repository is not a FIPS 199 categorization. If the organization uses NIST federal baselines, perform the formal information-type and confidentiality/integrity/availability impact process separately.

## Control selection principles

- Controls are selected because they treat named scenarios, not because they appear on a generic checklist.
- SP 800-53 controls are outcome-oriented and require tailoring; this is not a full low/moderate/high baseline.
- AI-specific measures are implemented through system controls plus NIST AI RMF governance and measurement outcomes.
- A production control is not `Implemented` until implementation evidence and an assessment result exist.

## Authorization inputs still missing

Confirmed system/security/privacy plans, production architecture and boundary, control implementation statements, inherited-control evidence, assessment report, remediation plan/POA&M, risk appetite, owner approvals and an authorization decision.
