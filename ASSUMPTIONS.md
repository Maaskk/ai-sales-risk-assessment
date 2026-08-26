# Assumption Register

All entries are provisional until a named stakeholder confirms them.

| ID | Assumption | Why needed | Validation owner | If false |
|---|---|---|---|---|
| A-01 | [ASSUMPTION] The system is internal and recommendations are shown to authenticated sales employees. | Defines users and access boundary. | Business owner / IAM owner | Redraw architecture and reassess external exposure. |
| A-02 | [ASSUMPTION] A salesperson, not the model, makes the final offer decision. | Defines human oversight and impact. | Sales process owner | Reassess automation, legal impact, and safeguards. |
| A-03 | [ASSUMPTION] Customer and historical sales data are used to train a predictive classifier. | Enables the synthetic demonstrator. | Data/ML owner | Change data model, threat paths, and metrics. |
| A-04 | [ASSUMPTION] The production technology stack is unknown; PostgreSQL, scikit-learn, MLflow, FastAPI, and Streamlit exist only in the lab. | Prevents prototype choices becoming company facts. | Technical owner | Replace lab-to-production mappings. |
| A-05 | [ASSUMPTION] Recommendations and model lifecycle events should be auditable without logging raw sensitive features. | Supports accountability and privacy design. | Security/privacy owners | Revise logging and retention controls. |
| A-06 | [ASSUMPTION] Risk scores use the repository's 4×4 ordinal method solely for prioritization. | Allows a complete provisional treatment plan. | Risk owner | Re-score using the organization's method and appetite. |
| A-07 | [ASSUMPTION] Customer segment is used in the synthetic lab as a fairness monitoring group, not as a legally protected attribute. | Demonstrates group metric testing. | Legal/privacy/model-risk owners | Select lawful monitoring groups and protected-attribute handling. |
| A-08 | [ASSUMPTION] The model is refreshed periodically and can experience data/concept drift. | Justifies drift monitoring. | ML owner | Revise operational monitoring and retraining triggers. |
