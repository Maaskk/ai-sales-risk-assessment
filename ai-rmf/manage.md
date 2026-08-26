# MANAGE — Prioritization, Treatment and Operation

## Prioritization

Prioritize scenarios with severe customer/data/recommendation impact and credible identity, insider, supply-chain or lifecycle paths. Use `risk-register/risks.csv` as the provisional ordering, not as acceptance.

## Response pattern

| Condition | Required action |
|---|---|
| Unknown/unauthorized use or data | Stop design/deployment; resolve authority and scope |
| Failed security/privacy gate or untrusted artifact | Block build/deployment; quarantine and investigate |
| Model metric below approved threshold | Do not promote, or roll back/disable affected use under runbook |
| Drift/data-quality alert | Validate source and business change; assess performance; retrain only through full gate |
| Harm/contest pattern | Pause affected use when necessary; investigate process/model/data and provide redress |
| Supplier/advisory vulnerability | Triage exploitability and exposure; remediate within SLA or approve time-bound exception |
| Security/privacy/AI incident | Execute coordinated response, notification, evidence preservation, rollback and lessons learned |

## Monitoring record

Every operational review should link system/model/data/dependency versions; metric period/population; thresholds; alerts; human overrides/contests; incidents; vulnerabilities; access and model changes; decisions; owners; and next review date.

## Decommissioning

- Remove inference and administrative access and revoke workload credentials.
- Archive or delete data, models, logs and evidence under approved retention requirements.
- Notify downstream users/integrations and preserve decision records needed for accountability.
- Check that retired artifacts cannot be redeployed and update the inventory/risk register.

## Continuous improvement

Review after incident, threshold breach, supplier compromise, regulatory/policy change, new data source, model/feature change, expanded population, changed decision authority, or at the approved periodic interval.
