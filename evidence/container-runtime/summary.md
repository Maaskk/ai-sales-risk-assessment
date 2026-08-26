# Container runtime verification

Verified locally on August 26, 2026.

| Procedure | Result |
|---|---|
| PostgreSQL | Healthy; schema initialization completed |
| MLflow | Healthy; experiment and run created; model and metrics artifacts uploaded |
| Trainer | Completed successfully as a non-root user |
| Model volume | Trainer write and API read succeeded |
| API liveness and readiness | Ready; model `synthetic-20260826133952` |
| Authenticated recommendation | Success; `product_a`; confidence `0.758`; human review required |
| Streamlit health | Healthy on `127.0.0.1:8501` |
| Network exposure | API, dashboard and MLflow bind to localhost only; database has no host port |

The test used synthetic input and the default local-only API key. The Docker laboratory is not a production deployment.
