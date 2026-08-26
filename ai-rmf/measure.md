# MEASURE — Test, Evaluation, Verification and Validation

Metrics require business-approved definitions, populations, time windows, thresholds and actions. Synthetic results demonstrate code paths only.

| Characteristic | Measurement plan | Minimum evidence | Trigger/action owner |
|---|---|---|---|
| Validity/accuracy | Holdout and temporal validation; confusion matrix; per-product precision/recall | Reproducible dataset/model versions and independent report | Model-risk owner |
| Calibration | Reliability curve/Brier or class calibration; confidence-use review | Calibration report and UI decision | Model-risk/business owner |
| Reliability | Repeatability deterministic versioning error/latency rates | Service/model SLO dashboard | Service owner |
| Fairness | Compare error/selection/benefit metrics across legally and contextually relevant groups with sample sizes and uncertainty | Approved fairness rationale metrics thresholds and exceptions | Business/privacy/legal/model-risk |
| Explainability | User research plus stable reason codes appropriate to model/use | Sales-user test and explanation limitations | Product/business owner |
| Privacy | Minimization review access tests membership/inversion assessment and log-content tests | Privacy impact record and test report | Privacy/data owner |
| Security/resilience | Threat model tamper/authorization/abuse/dependency/recovery tests | Security assessment and remediation | Security/system owner |
| Drift | Feature prediction and outcome drift; data-quality change; performance when labels arrive | Baseline threshold alert and response record | Model owner |
| Human oversight | Override rate reason distribution escalation/contest outcomes and automation-bias research | UX test and periodic monitoring | Business/product owner |
| Transparency/accountability | Complete model card lineage decision and deployment traceability | Version-linked records and audit sampling | Model/system owner |

## Lab checks

- Training script emits overall and group performance, version, dataset digest and package metadata.
- `fairness_check.py` flags accuracy gaps above a configurable threshold and never calls that proof of fairness.
- `drift_check.py` uses population stability index (PSI) as a demonstration signal; production requires domain-specific thresholds and performance outcomes.
- API tests cover missing/wrong authentication, constrained input validation, versioned output and artifact tampering.
- Security scans and SBOMs address only the built artifact/dependency view they inspect.

## Validation design requirements

1. Separate development, validation and final evaluation data; prevent leakage.
2. Use a temporal/out-of-population test when deployment conditions can shift.
3. Report class/group sample sizes and uncertainty; do not overinterpret small groups.
4. Test business harm and user behavior, not only model metrics.
5. Predefine thresholds and actions before viewing final evaluation results.
6. Re-evaluate after material data, feature, model, threshold, interface or business-process change.

## Open measurement decisions

[DECISION REQUIRED] outcome label, baseline, acceptance thresholds, confidence display, relevant groups, fairness conception, minimum sample size, drift threshold, alert frequency, rollback/retrain rules, retention period and independent validator.
