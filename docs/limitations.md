# Limitations

- This is a synthetic reference assessment; it cannot validate production architecture or controls.
- Risk ratings are provisional ordinal judgments and require workshop consensus and an approved risk appetite.
- The lab's API key is intentionally simple; a production design should use enterprise identity, short-lived tokens, MFA for privileged access, gateway enforcement, and centralized authorization.
- SHA-256 detects artifact changes only when the manifest is trusted. Production should use signing/attestation and protect the verification root.
- Synthetic accuracy/fairness/drift results demonstrate assessment procedures, not business fitness or absence of harm.
- The OWASP ML Security Top 10 is a draft threat-research input.
- Selected NIST controls are not a formal baseline or compliance claim; tailoring and organization-specific requirements are required.
- Automated scanners can miss vulnerabilities and report false positives. Results need triage and compensating-context review.
- Docker execution evidence depends on a running Docker daemon; static Compose validation does not prove runtime behavior.
