# Security Policy

## Scope

This repository is an educational synthetic laboratory. Do not submit real customer data, production credentials, proprietary model artifacts, internal architecture, or exploitable company details in public issues.

## Reporting a vulnerability

Use GitHub's private vulnerability reporting feature if enabled. Otherwise contact the repository owner privately. Include affected commit, reproduction steps using synthetic data, impact, and a proposed mitigation if available.

## Secret and data handling

- Never commit `.env`, tokens, private keys, passwords, raw production logs, or personal data.
- Use a secrets manager in a real deployment; environment variables are a local-lab convenience only.
- Rotate any credential that is accidentally exposed and remove it from Git history using an approved incident procedure.
- Model files can execute code when deserialized. The lab verifies a SHA-256 manifest before `joblib.load`; production should add signed provenance and an isolated loading process.

## Supported versions

Only the default branch is maintained. No production support or security warranty is provided.
