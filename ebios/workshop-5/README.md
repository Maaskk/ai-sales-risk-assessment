# Workshop 5 — Risk Treatment

## Treatment strategy

The provisional default is **Reduce** for all ten scenarios because the concept is not sufficiently defined for acceptance and because the proposed measures preserve the business purpose. Transfer/share may complement, but not replace, internal accountability for supplier risks.

## Prioritized roadmap

### Gate 0 — Before production assessment/approval

1. Name accountable business, system, data, model, security, privacy/legal and residual-risk owners.
2. Confirm intended/prohibited use, human authority, affected groups, data inventory, architecture and legal/contractual obligations.
3. Adopt risk appetite, scoring criteria and model acceptance/monitoring thresholds.
4. Inventory the AI system, dependencies, datasets, models, owners and deployments.

### Gate 1 — Before any production pilot

1. Enforce enterprise identity, MFA for privileged access, least privilege, separation of duties and access review.
2. Establish data contracts, minimization, lineage, versioning, validation and approved training snapshots.
3. Protect repositories/builds, pin dependencies, generate SBOMs, verify provenance/signatures and remove long-lived credentials.
4. Require independent model validation, model card, two-person approval, immutable registry, signed artifact and tested rollback.
5. Define secure API/UI behavior: authorization, validation, rate limits, minimal outputs, human-review cues and audit-safe events.

### Gate 2 — Before scaled operation

1. Demonstrate accuracy/calibration/group performance/robustness against approved thresholds.
2. Activate drift, performance, abuse, security and availability monitoring with named on-call response.
3. Exercise incident, data/model rollback, fallback, backup/restore, customer contest and redress procedures.
4. Complete privacy/AI impact and legal review; resolve high risks or obtain authorized time-bound exceptions.

## Residual-risk acceptance record

For each risk, the authorized owner must record: decision, rationale, accepted residual score, scope, evidence reviewed, compensating controls, expiry/review date, and signature/approval reference. A blank or role-only owner is not acceptance.

See `risk-register/treatment-plan.csv` for measure-level traceability and `nist/assessment-plan.md` for evidence procedures.
