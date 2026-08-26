# AI Sales Risk Assessment

[![CI](https://github.com/Maaskk/ai-sales-risk-assessment/actions/workflows/ci.yml/badge.svg)](https://github.com/Maaskk/ai-sales-risk-assessment/actions/workflows/ci.yml)

An integrated risk assessment and working laboratory for a synthetic sales recommendation system.

Status: reference assessment. It is not an authorization to operate. Company facts, owners, legal requirements and risk ratings require validation. No real customer data is included.

## Web application

The Next.js application provides one interface for the dashboard, EBIOS RM, risk register, NIST controls, OSCAL, AI RMF, threat model, model evidence, reports and synthetic recommendation demo.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## What is included

- Five complete EBIOS RM workshop artifacts with traceable scenario IDs.
- Architecture discovery questionnaire, executive architecture, security DFD, and an importable OWASP Threat Dragon model.
- Provisional risk register and treatment plan with explicit scoring criteria.
- NIST RMF lifecycle mapping, selected SP 800-53 control matrix, and assessment procedures.
- NIST AI RMF 1.0 GOVERN/MAP/MEASURE/MANAGE assessment (the repository records that 1.0 is under revision as of August 25, 2026).
- MITRE ATLAS and OWASP ML threat mappings.
- Integrated Next.js dashboard and model demo for Vercel.
- Dockerized local lab with PostgreSQL, training pipeline, FastAPI, MLflow and Streamlit.
- Automated tests for authentication, validation, model integrity, fairness signals, and drift signals.
- CI, Bandit, pip-audit, Trivy, and Syft workflows/evidence scripts.
- A self-contained, portable executive HTML report in `report/executive-report.html`.

## Traceability

```text
Business value / feared event
          ↓
EBIOS strategic scenario
          ↓
EBIOS operational scenario + ATLAS / OWASP
          ↓
Risk register entry
          ↓
NIST control objective and implementation
          ↓
Assessment procedure and evidence
          ↓
Residual-risk decision by an authorized owner
```

## Quick start (local Python)

Requirements: Python 3.12 or 3.13 is recommended. Docker is optional for this path.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r prototype/api/requirements-dev.txt
make data train test scan-python sbom-python
API_KEY=change-me MODEL_DIR=prototype/model uvicorn prototype.api.app.main:app --reload
```

The API requires `X-API-Key: change-me` in this local example. Never use that value outside a local laboratory.

## Quick start (Docker)

```bash
cp .env.example .env
# Change every value in .env before using outside an isolated local lab.
docker compose up --build
```

- API docs: <http://localhost:8000/docs>
- Dashboard: <http://localhost:8501>
- MLflow: <http://localhost:5001>

## Recommended review order

1. [`docs/executive-summary.md`](docs/executive-summary.md)
2. [`docs/scope.md`](docs/scope.md) and [`OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md)
3. [`docs/architecture.md`](docs/architecture.md) and [`docs/data-flow.md`](docs/data-flow.md)
4. `ebios/workshop-1` through `ebios/workshop-5`
5. [`risk-register/risks.csv`](risk-register/risks.csv)
6. [`nist/controls.csv`](nist/controls.csv) and [`nist/assessment-plan.md`](nist/assessment-plan.md)
7. `ai-rmf/`
8. `prototype/`, tests, and `evidence/`

## Evidence rules

- `[CONFIRMED]` means confirmed for this repository or directly supported by an authoritative source.
- `[ASSUMPTION]` means a working hypothesis, not a company fact.
- `[OPEN QUESTION]` must be answered by an appropriate stakeholder.
- `[DECISION REQUIRED]` requires an accountable human decision.
- `Implemented (prototype)` never means implemented in the real company environment.

## Safety

Only synthetic data is permitted by default. See [`SECURITY.md`](SECURITY.md), [`docs/limitations.md`](docs/limitations.md), and [`data/README.md`](data/README.md).

## License

Code is MIT licensed. Assessment content is provided for educational and portfolio use and must be validated before operational use.
