# Actions That Require You or Company Stakeholders

Codex can create the reference repository and synthetic evidence, but cannot ethically confirm company facts, decide risk appetite, grant authorization, or collect restricted evidence without access and authority.

## 1. Conduct discovery

1. Schedule 60–90 minutes with the business owner, sales-process owner, data/ML lead, platform/IAM lead, security and privacy/legal.
2. Use `architecture-discovery-questionnaire.md`.
3. Record each answer with speaker, date and evidence reference.
4. Update `ASSUMPTIONS.md`, `OPEN_QUESTIONS.md`, the DFD and asset inventory through a reviewed pull request.

## 2. Run human EBIOS workshops

1. Facilitate Workshop 1 and obtain consensus on scope, values, feared events and severity.
2. Validate source/objective relevance in Workshop 2 using organization threat context.
3. Confirm ecosystem dependencies and strategic scenarios in Workshop 3.
4. Walk technical owners through each Workshop 4 path and existing controls.
5. In Workshop 5, assign named owners, funding/dates and treatment decisions.
6. Preserve minutes, disagreements and approvals in the authorized evidence system.

## 3. Replace provisional ratings

1. Obtain the approved organizational risk method and appetite.
2. Re-score with business, security, privacy and technical stakeholders.
3. Document the rationale and evidence for each score.
4. Never mark residual risk accepted until controls are assessed and the authorized person records acceptance/expiry.

## 4. Obtain and assess production evidence

1. Get formal permission and read-only access to the relevant architecture, repositories, IAM, CI/CD, registry, logs, monitoring and recovery evidence.
2. Execute `nist/assessment-plan.md`; sanitize public outputs.
3. Open findings with owner, severity, due date and retest.
4. Update control status only from evidence, not verbal assurance alone.

## 5. Review the installed tools and repeat the workflow yourself

Codex installed and verified OWASP Threat Dragon 2.6.2, NIST OSCAL CLI 1.0.3, Trivy 0.74.0 and Syft 1.51.0, and used the existing Docker Desktop installation. These tools do not make the assessment automatically correct; you must understand and review their outputs.

1. Open `/Applications/Threat-Dragon-ng.app`. If macOS asks for first-launch confirmation, approve it only after checking the developer identity shown by macOS.
2. In Threat Dragon, choose **Open a model** and import `threat-model/threat-dragon/ai-sales-threat-model.json`.
3. Walk every trust boundary, process, store, flow and threat with the real system owners; update the model only from confirmed facts.
4. Open `threat-model/diagrams/ai-sales-dfd.drawio` at <https://app.diagrams.net/> and reconcile it with the Threat Dragon model.
5. From the repository root, run `make check`, then `scripts/run_container_evidence.sh`; read the JSON/SBOM files instead of relying only on exit codes.
6. For each HIGH/CRITICAL image finding, record whether it is fixed, unfixed, reachable, mitigated, accepted or false positive, with evidence and an owner.
7. Run `make oscal-validate`, then compare `nist/oscal/ai-sales-selected-controls-profile.json` to `nist/controls.csv` and explain why all 38 selected controls are present.

## 6. Review GitHub settings

1. Keep the repository private until a supervisor approves public release.
2. Enable private vulnerability reporting, secret scanning/push protection and Dependabot alerts where available.
3. Require pull requests, at least one approval and passing `CI`/`Container security` checks on `main` if the account/plan permits.
4. Replace the single CODEOWNER with actual accountable reviewers.
5. Never upload restricted production evidence to a public repository.

## 7. Make the decisions no tool can make

1. Ask the accountable business owner to approve the use case, users, prohibited uses and human-override boundary.
2. Ask privacy/legal to determine applicable obligations, lawful basis, retention, notices, contest/redress and cross-border constraints.
3. Ask the risk owner to approve appetite and treatment criteria; obtain a dated, expiring signature for any accepted residual risk.
4. Ask system/data/model owners to accept named actions and dates. Replace every `[DECISION REQUIRED]` placeholder through a reviewed pull request.
5. Keep the GitHub repository private until the company/supervisor explicitly approves publication and confirms that no restricted information is present.

## 8. Defend the work

1. Complete every blank “My own explanation” in `ebios-method-notes.md`.
2. Re-run the lab and scans without assistance.
3. Choose three risks and rehearse end-to-end traceability.
4. Present limitations first when asked whether the production system is secure.
