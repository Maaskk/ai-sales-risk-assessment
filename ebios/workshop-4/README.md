# Workshop 4 — Operational Scenarios

Plausibility ratings use the repository likelihood criteria and must be re-evaluated using real exposure and controls.

## OS-01 — Compromised identity to customer-data disclosure

```text
Phish/reuse/steal credential → authenticate to sales/API/admin surface → abuse excessive access
→ enumerate or export customer-linked responses/data → evade weak monitoring → FE-01
```

- **Plausibility:** 3 Likely (provisional).
- **Control points:** phishing-resistant MFA, gateway authorization, least privilege, query/data minimization, rate/anomaly controls, protected exports and alerts.
- **Evidence:** IAM policy/config, access tests, gateway logs, alert simulation.
- **Risks:** R-01, R-09.

## OS-02 — Training-data poisoning

```text
Obtain source/pipeline/label access → insert targeted or low-quality records → bypass validation
→ training job consumes poisoned version → candidate passes incomplete aggregate checks
→ promotion changes recommendation behavior → FE-02/03/06
```

- **Plausibility:** 3 Likely (provisional).
- **MITRE ATLAS:** AML.T0020 Poison Training Data; possible AML.T0010.002 Data supply-chain path.
- **OWASP research:** ML02 Data Poisoning; ML08 Model Skewing.
- **Control points:** immutable/versioned data, lineage/digest, schema/distribution/label tests, separation of duties, segment/backdoor tests, approval.
- **Risks:** R-02, R-07, R-08.

## OS-03 — Open-source supply-chain compromise

```text
Compromise/publish dependency or model input → build resolves untrusted artifact → install/load executes code
→ steal build/service credentials → access data/registry or alter model → FE-01/02/03/04
```

- **Plausibility:** 3 Likely (provisional).
- **MITRE ATLAS:** AML.T0010 AI Supply Chain Compromise; AML.T0010.001 AI Software; AML.T0010.003 Model.
- **OWASP research:** ML06 AI Supply Chain Attacks; ML10 Model Poisoning.
- **Control points:** allowlisted registries, hashes/lockfiles, signature/provenance, SBOM, vulnerability/license gates, isolated build, short-lived least-privilege credentials, safe model format.
- **Risks:** R-03.

## OS-04 — Unauthorized model modification or replacement

```text
Gain registry/deployment/admin access → replace artifact or manifest → deployment loads changed model
→ recommendations altered and attribution obscured → FE-03/07
```

- **Plausibility:** 3 Likely (provisional).
- **MITRE ATLAS:** AML.T0018 Manipulate AI Model; AML.T0018.000 Poison AI Model; AML.T0018.001 Modify AI Model Architecture.
- **OWASP research:** ML09 Output Integrity Attack; ML10 Model Poisoning.
- **Control points:** separation of build/approve/deploy, immutable registry, signed provenance, trusted verification root, deployment allowlist, audit/alert, rapid rollback.
- **Risks:** R-04, R-09.

## OS-05 — Inference-enabled model/privacy extraction

```text
Obtain legitimate/compromised API access → send adaptive high-volume queries → collect outputs/confidence
→ infer training membership/invert records or train a substitute model → FE-01/05
```

- **Plausibility:** 3 Likely (provisional; depends on output detail and rate limits).
- **MITRE ATLAS:** AML.T0040 AI Model Inference API Access; AML.T0024 Exfiltration via AI Inference API; AML.T0024.000 membership inference; AML.T0024.001 inversion; AML.T0024.002 model extraction.
- **OWASP research:** ML03 Model Inversion, ML04 Membership Inference, ML05 Model Theft.
- **Control points:** minimize outputs/precision, authorize purpose, rate/query-pattern controls, privacy/robustness testing, monitoring, contractual enforcement.
- **Risks:** R-05.

## OS-06 — Denial of recommendation service

```text
Flood costly/invalid requests or exhaust dependency → inference queue/compute saturated
→ timeout/cascading failure → sales users lose recommendations → FE-04
```

- **Plausibility:** 3 Likely (provisional).
- **MITRE ATLAS:** AML.T0029 Denial of AI Service.
- **Control points:** rate/size limits, timeouts, concurrency/bulkheads, autoscaling/capacity, graceful fallback, health monitoring and recovery tests.
- **Risks:** R-06.

## OS-07 — Drift or invalid group performance

```text
Population/product/process changes → feature/outcome distribution shifts → aggregate metric hides segment failure
→ stale model continues serving → customers receive unsuitable or unfair offers → FE-06
```

- **Plausibility:** 3 Likely (provisional; non-malicious).
- **OWASP research:** ML08 Model Skewing.
- **Control points:** business-approved metrics by relevant groups, drift/performance monitoring, minimum sample sizes, alert/rollback/retrain rules, human review and contest.
- **Risks:** R-07, R-08.

## OS-08 — Sensitive information in logs

```text
Raw request/features/confidence written to broadly accessible logs → retention/exports multiply copies
→ internal account or breached observability platform accesses data → FE-01/07
```

- **Plausibility:** 2 Possible (provisional).
- **Control points:** structured allowlist logging, pseudonymous reference, redaction tests, restricted access, retention/deletion, immutability for audit metadata.
- **Risks:** R-10.
