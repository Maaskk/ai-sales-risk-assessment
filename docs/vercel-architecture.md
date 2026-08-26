# Vercel deployment architecture

## Decision

The public application uses Next.js on Vercel. Assessment data is generated from the repository during the build. Model inference runs in a Next.js server function using a safe JSON export of the existing scikit-learn logistic regression model.

The local Docker laboratory remains the engineering environment for Python training, FastAPI, PostgreSQL, MLflow, Streamlit, scanners and runtime tests.

Vercel Services was not selected because it is a private beta as of March 2026. The public portfolio does not require a persistent Python service or database.

## Vercel

- Next.js dashboard and assessment routes
- Server-side recommendation endpoint at `/api/recommend`
- Read-only repository data generated at build time
- Safe downloads for the risk register, control mapping, OSCAL profile and diagram sources
- Security headers and strict input bounds

## Local laboratory

- Python model training and export
- FastAPI reference service
- PostgreSQL and MLflow
- Streamlit reference dashboard
- Docker Compose
- pytest, Ruff, Bandit, pip-audit, Trivy, Syft and OSCAL validation

## Model loading

`scripts/export_model.py` exports the trained preprocessing parameters, logistic regression coefficients, class labels and provenance metadata to `generated/model-export.json`. The web endpoint applies the same one-hot encoding, numeric scaling, logits and softmax calculation. Parity tests compare the web implementation with recorded Python predictions.

The export avoids shipping a pickle or joblib file to the public runtime. Python object deserialization remains confined to the laboratory.

## Persistence

The public application is read only and does not need a database. Form inputs are used for one request and are not stored. Assessment changes are made through Git and regenerated on build.

## Security

- Synthetic input only
- No API key or company credential in the public application
- Input allowlists, numeric ranges and request-size limit
- No customer reference in the response
- No persistent form data
- Response caching disabled for recommendations
- Content type, frame, referrer and browser permission headers

## Limitations

- Public inference is a demonstration, not a production sales service.
- The JSON model export is not a signed production artifact.
- Vercel build data is a snapshot of the repository revision.
- MLflow remains local; the application displays exported metadata only.
- Production identity, rate limits, monitoring, data stores and model governance remain unassessed.
