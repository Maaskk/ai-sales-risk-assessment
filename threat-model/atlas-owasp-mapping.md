# AI/ML Threat-Intelligence Mapping

MITRE ATLAS is a living adversary knowledge base; the IDs/names below were checked against its official data on August 25, 2026. OWASP ML Security Top 10 2023 is draft and is used as a research prompt, not a control standard.

| Risk | MITRE ATLAS technique | OWASP ML item | Why relevant | Primary measures |
|---|---|---|---|---|
| R-02 | AML.T0020 Poison Training Data; AML.T0010.002 Data | ML02 Data Poisoning; ML08 Model Skewing | Training sources/labels can be influenced or corrupted | Lineage version digest validation separation approval |
| R-03 | AML.T0010 AI Supply Chain Compromise; AML.T0010.001 AI Software; AML.T0010.003 Model | ML06 AI Supply Chain Attacks; ML10 Model Poisoning | External packages/models can introduce code or behavior | Allowlist pin SBOM provenance isolation signatures |
| R-04 | AML.T0018 Manipulate AI Model; AML.T0018.000 Poison AI Model; AML.T0018.001 Modify AI Model Architecture | ML09 Output Integrity; ML10 Model Poisoning | Artifact/admin compromise changes predictions | Two-person promotion signed artifacts audit rollback |
| R-05 | AML.T0040 AI Model Inference API Access; AML.T0024 Exfiltration via AI Inference API; AML.T0024.000/.001/.002 | ML03 Model Inversion; ML04 Membership Inference; ML05 Model Theft | Adaptive queries can reveal data or approximate a model | Output minimization rate/abuse controls privacy testing |
| R-06 | AML.T0029 Denial of AI Service | — | Resource-heavy inference can be flooded | Limits capacity isolation fallback recovery |
| R-07/R-08 | — (non-adversarial lifecycle path) | ML08 Model Skewing | Distribution/behavior can change without an attacker | Segment metrics drift monitoring thresholds response |

## Important boundary

Not every enterprise attack step is AI-specific. Phishing, credential theft, privilege escalation, exfiltration and log compromise should also be modeled with conventional threat intelligence/architecture controls. ATLAS supplements rather than replaces those views.
