# What You Need to Learn and Be Able to Defend

The goal is not memorization. For every topic, be able to explain the idea, locate it in this repository, apply it to a changed scenario, and state the evidence/limitations.

## 1. System and data foundations

Learn: business mission vs technical component; actor/process/data store/flow/trust boundary; data lifecycle; business value vs supporting asset; confidentiality/integrity/availability/privacy; threat vs vulnerability vs risk vs control; inherent vs residual risk.

Demonstrate: redraw the DFD without notes, explain every boundary/flow, and identify what changes if the API is public or the recommendation becomes automatic.

## 2. EBIOS Risk Manager

Learn the purpose and handoff of all five workshops:

1. scope, values/assets, feared events, severity and baseline;
2. relevant risk-source/objective pairs;
3. ecosystem and strategic paths;
4. technical operational scenarios and plausibility;
5. treatment, residual risk, roadmap and acceptance.

Demonstrate: follow `BV/FE → RSO → SS → OS → R → M` for three risks and justify why severity appears before plausibility.

## 3. NIST RMF and SP 800-53

Learn: Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor; control tailoring; common/inherited/system-specific controls; implementation statement vs assessment result; examine/interview/test; authorization and ongoing monitoring.

Focus control families: AC, AU, CA, CM, CP, IA, IR, PM, PT, RA, SA, SC, SI and SR.

Demonstrate: start from R-04 and explain why CM-3, CM-5, SI-7, AU-2, AC-5 and AC-6 are relevant, how each would be implemented, and what evidence would show effectiveness.

## 4. NIST AI RMF

Learn: GOVERN/MAP/MEASURE/MANAGE; trustworthy characteristics; socio-technical risk; lifecycle actors; validity/reliability, safety, security/resilience, accountability/transparency, explainability, privacy and fairness; TEVV; why the Playbook is not a checklist.

Demonstrate: distinguish model accuracy from system usefulness and explain why human oversight, UI design, incentives, contest and redress matter.

## 5. Predictive ML fundamentals

Learn: features, labels, classification, train/validation/test split, leakage, overfitting, class imbalance, precision/recall, confusion matrix, calibration, temporal validation, distribution vs concept drift, fairness metric tradeoffs, uncertainty and sample size.

Demonstrate: run the training script, explain the pipeline, interpret the metrics without claiming real-world validity, and describe how historical decisions can encode bias.

## 6. AI/ML security threats

Learn: data/model poisoning, adversarial/input manipulation, model inversion, membership inference, model extraction, model skew/drift, unsafe serialization, supply-chain compromise and denial of AI service. Learn to navigate MITRE ATLAS by platform/tactic/technique and to treat OWASP ML Top 10 as draft research.

Demonstrate: explain OS-02 through OS-06 and show where ordinary enterprise attacks combine with AI-specific steps.

## 7. Secure MLOps and supply chain

Learn: source/version pinning, lockfiles, hashes vs digital signatures, artifact provenance/attestations, SBOM formats (CycloneDX/SPDX), isolated/reproducible builds, workload identity, registry immutability, separation of duties, model approval/promotion/rollback and vulnerability triage.

Demonstrate: explain why the lab hash catches tampering but cannot prove publisher authenticity when the manifest is compromised.

## 8. API, application and container security

Learn: authentication vs authorization; MFA/SSO/tokens; input validation; rate limits; safe error/logging; secrets; TLS; least privilege; network boundaries; non-root/read-only containers; health checks; image scanning; backup/recovery.

Demonstrate: call the API with missing/wrong/correct credentials, trigger validation failure, describe what the lab API key does not provide, and review the Docker controls.

## 9. Security testing and evidence

Learn what pytest, Ruff, Bandit, pip-audit, Trivy and Syft can and cannot prove; false positives/negatives; tool/version/commit provenance; evidence sanitation; remediation and retest; control effectiveness vs implementation existence.

Demonstrate: produce the evidence, triage each finding, link it to a risk/control, and state the coverage boundary.

### Hands-on tool mastery

- **Threat Dragon:** import the model, edit the DFD, attach threats and mitigations, and explain why a diagram is not evidence that a control works.
- **NIST OSCAL CLI:** validate the profile, explain the catalog/profile distinction, and reconcile the 38 selected controls with the CSV matrix.
- **Trivy:** distinguish filesystem, dependency, secret, configuration and image results; filter fixed vs unfixed findings without hiding the raw scan.
- **Syft/CycloneDX:** generate repository and image SBOMs, identify package provenance gaps, and explain why inventory is not authenticity.
- **Docker Compose:** build, start, inspect health/logs, exercise the API/dashboard, and safely stop the stack without deleting unrelated data.
- **GitHub security:** read CI logs and SARIF, review Dependabot alerts, protect `main`, and understand what private-plan restrictions may prevent.

## 10. Privacy, governance and communication

Learn: minimization, purpose limitation, retention/deletion, data-subject/affected-person rights, privacy impact assessment, logging risk, role accountability, risk appetite, time-bound exceptions, incident notification and executive communication. Confirm applicable law with qualified counsel; do not self-certify legal compliance.

Demonstrate: present the executive summary in five minutes, then answer technical traceability questions without overstating evidence.

## Suggested mastery sequence

1. Read official EBIOS guide and rewrite each blank "My own explanation" section.
2. Rebuild the DFD and conduct a live discovery interview.
3. Facilitate Workshop 1 and re-score only after stakeholder agreement.
4. Trace and challenge every source/scenario in Workshops 2–4.
5. Study RMF/selected controls and execute two full assessment procedures.
6. Run/modify the lab and explain each security decision.
7. Study AI RMF and define real metrics/thresholds with business/privacy/model experts.
8. Rehearse the defense questions below.

## Defense questions you must answer yourself

- Why is this a business-system assessment rather than a vulnerability list?
- Which claims are confirmed, assumed, open or decision-required?
- Why is R-03 plausible and how does each proposed measure break its attack path?
- Why are risk ratings provisional, and what evidence would change them?
- What is the difference between a control objective, implementation and assessment result?
- Why can a model be accurate and still unsafe, unfair or unsuitable?
- What does the salesperson need to understand and control?
- Why does an SBOM not establish provenance or absence of vulnerabilities?
- Why is a hash insufficient when an attacker can change both model and manifest?
- What production evidence is still missing, and who must accept residual risk?
