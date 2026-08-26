# Risk Scoring Method

This is a transparent **[ASSUMPTION] 4×4 ordinal method** for prioritizing the reference scenarios. It is not the organization's approved method and does not imply quantitative probability.

## Severity

| Score | Label | Working criterion |
|---:|---|---|
| 1 | Limited | Local, quickly reversible impact; negligible sensitive-data/customer/business effect. |
| 2 | Moderate | Contained operational or data-quality impact requiring planned remediation. |
| 3 | Significant | Material customer, privacy, operational, financial, contractual or reputation impact. |
| 4 | Severe | Widespread/systemic or potentially serious legal, customer, strategic or prolonged operational impact. |

## Likelihood/plausibility

| Score | Label | Working criterion |
|---:|---|---|
| 1 | Unlikely | Requires exceptional capability/access and strong controls make the path difficult. |
| 2 | Possible | Credible path but meaningful preconditions or controls constrain it. |
| 3 | Likely | Common capability/access or expected lifecycle failure with incomplete/unknown controls. |
| 4 | Highly likely | Repeated/ongoing exposure or trivial path with ineffective controls. |

## Rating bands

`Score = Severity × Likelihood`

- 1–3 Low
- 4–6 Medium
- 8–9 High
- 12–16 Critical

The missing value 7, 10, 11, 13–15 cannot occur under the multiplication combinations used. Owners must record score rationale separately from the label.

## Residual scoring rule

Residual scores assume planned controls are correctly implemented and assessed. Until that occurs, operational decision-making should use inherent risk and mark residual status `Projected`, not `Accepted`.
