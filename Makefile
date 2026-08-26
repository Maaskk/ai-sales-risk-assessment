.PHONY: setup data train test lint scan-python sbom-python scan-filesystem sbom-repository oscal-validate evidence check docker-validate container-evidence

PYTHON ?= python3.12
VENV ?= .venv
BIN := $(VENV)/bin

setup:
	$(PYTHON) -m venv $(VENV)
	$(BIN)/python -m pip install --upgrade pip
	$(BIN)/python -m pip install -r prototype/api/requirements-dev.txt

data:
	$(BIN)/python scripts/generate_synthetic_data.py

train: data
	PYTHONPATH=. MODEL_DIR=prototype/model $(BIN)/python prototype/model/train.py

test: train
	mkdir -p evidence/security-tests
	PYTHONPATH=. MODEL_DIR=prototype/model API_KEY=test-api-key $(BIN)/pytest -q --junitxml=evidence/security-tests/pytest-junit.xml

lint:
	$(BIN)/ruff check prototype scripts

scan-python:
	mkdir -p evidence/scans
	$(BIN)/bandit -r prototype scripts -x prototype/api/tests,prototype/model/tests -f json -o evidence/scans/bandit.json || test $$? -eq 1
	$(BIN)/pip-audit -r prototype/api/requirements.txt --format json --output evidence/scans/pip-audit.json
	$(BIN)/pip-audit -r prototype/api/requirements-trainer.txt --format json --output evidence/scans/pip-audit-trainer.json

sbom-python:
	mkdir -p evidence/sbom
	$(BIN)/cyclonedx-py requirements prototype/api/requirements.txt --output-file evidence/sbom/python.cdx.json
	$(BIN)/cyclonedx-py requirements prototype/api/requirements-trainer.txt --output-file evidence/sbom/trainer-python.cdx.json

scan-filesystem:
	mkdir -p evidence/scans
	trivy filesystem --scanners vuln,secret,misconfig --format json --output evidence/scans/trivy-fs.json .

sbom-repository:
	mkdir -p evidence/sbom
	syft dir:. -o cyclonedx-json=evidence/sbom/repository-syft.cdx.json

oscal-validate:
	$(BIN)/python scripts/validate_oscal.py
	JAVA_TOOL_OPTIONS="--enable-native-access=ALL-UNNAMED" oscal-cli --no-color profile validate --as=json nist/oscal/ai-sales-selected-controls-profile.json

docker-validate:
	docker compose config --quiet

container-evidence:
	scripts/run_container_evidence.sh

evidence: test lint scan-python sbom-python oscal-validate
	$(BIN)/python scripts/summarize_evidence.py

check: evidence docker-validate
