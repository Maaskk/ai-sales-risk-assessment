# Synthetic Demonstrator

This laboratory turns control statements into testable evidence without using company data.

## Components

- `model/train.py` — reproducible scikit-learn training, validation metadata, dataset/artifact digests and optional MLflow logging.
- `api/app/` — authenticated and input-constrained FastAPI inference service with artifact-integrity verification and minimized structured logs.
- `dashboard/app.py` — small Streamlit user interface that makes human review explicit.
- `database/init.sql` — reference PostgreSQL tables for synthetic inputs and minimized decision/audit metadata.
- `docker/` and root `compose.yaml` — isolated multi-service lab.

## Security properties demonstrated

- Synthetic-only data generation and explicit schema.
- Pinned direct dependencies and reproducible CI environment.
- SHA-256 manifest checked before deserialization from the same verified byte buffer.
- API authentication boundary, numeric/range validation and versioned output.
- No raw input body or customer reference in application logs.
- Human-review flag; the API does not perform an offer automatically.
- Tests for tampering, authentication, validation, fairness signal and drift signal.

## Deliberate limitations

The API key is a lab mechanism, SHA-256 is not signed provenance, `joblib` is a code-executing format, and the dashboard is not an enterprise sales application. Production replacements are documented in the assessment.
