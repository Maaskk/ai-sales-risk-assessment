# Security and AI Control Assessment Plan

## Purpose and rules

Assess whether selected controls are implemented, operating as intended, and producing the desired outcome. Use NIST SP 800-53A Rev. 5 for formal organization procedures; the cases below are tailored portfolio procedures.

Result values: `Effective`, `Partially effective`, `Ineffective`, or `Not assessed`. Prototype results must not be copied into the production column.

## Procedures

| Test ID | Risks | Control objective | Examine | Interview | Test | Expected evidence | Lab status |
|---|---|---|---|---|---|---|---|
| AP-01 | R-01 R-09 | Unique strong identity and authorization | IAM policy/roles/reviews | IAM and system owners | Request without/with wrong credential and prohibited role | Config export and denied requests | API-key boundary tested; enterprise IAM not assessed |
| AP-02 | R-02 | Training-data integrity | Data contract lineage versions approvals | Data/model owners | Change schema/label/digest and verify pipeline blocks or flags | Validation output dataset digest approval | Schema and metric procedures implemented; production not assessed |
| AP-03 | R-03 | OSS provenance and vulnerability management | Source allowlist lockfiles SBOM scans exceptions | Engineering/supply-chain owners | Introduce unapproved/tampered dependency and verify gate | Lockfile SBOM scan and blocked build | SBOM/scans scripted; signatures not implemented |
| AP-04 | R-04 | Model artifact integrity and promotion | Registry ACL manifest/signature approvals | Model platform/validator | Tamper model bytes and attempt load/deploy | Failed integrity test alert and audit event | SHA-256 tamper test implemented |
| AP-05 | R-05 | Inference abuse/privacy resistance | API output schema rate limits monitoring privacy test | Model/privacy/security owners | Adaptive/repeated query test and membership/inversion evaluation | Abuse alerts output minimization privacy report | Output minimized; gateway abuse controls not assessed |
| AP-06 | R-06 | Availability and recovery | RTO/RPO capacity fallback rollback plan | Service/business owner | Load dependency failure restore and manual fallback exercises | Timed results logs and lessons | Health endpoint only; Docker runtime pending |
| AP-07 | R-07 | Validity and group performance | Model card thresholds datasets and approvals | Business/model-risk/privacy owners | Reproduce overall and group metrics with sample-size checks | Signed validation report and issue decisions | Synthetic group metric test implemented |
| AP-08 | R-08 | Drift monitoring and response | Baseline thresholds schedule alert/runbook | Model operations/business | Shift input distribution beyond threshold | Alert ticket rollback/retrain decision | Synthetic drift detector test implemented |
| AP-09 | R-09 | Privileged change oversight | Role matrix changes logs alerts | Platform/security owners | Attempt self-approval or unauthorized promotion | Denial and alerted immutable event | Repository review only; production not assessed |
| AP-10 | R-10 | Log minimization and protection | Event schema ACL retention/redaction rules | Privacy/logging/security owners | Send sensitive canary and inspect logs; attempt unauthorized read/change | Redaction test access denial retention result | App avoids request-body logging; platform not assessed |

## Sampling and independence

- Sample at least one successful and one denied event per relevant role and interface.
- Sample each material model deployment and a risk-based set of data/code changes in the review period.
- The model's independent validator should not be the same person who developed/approved/deployed it.
- Findings require owner, severity, due date, remediation evidence and retest result.

## Evidence handling

Store only sanitized evidence in this public repository. Production screenshots/logs/config exports may contain sensitive information and should remain in an approved restricted evidence system, referenced here by durable IDs.

## Production assessment record template

| Test ID | Date | Assessor | Environment/version | Evidence IDs | Result | Finding IDs | Retest/date |
|---|---|---|---|---|---|---|---|
| _Complete during assessment_ | | | | | | | |
