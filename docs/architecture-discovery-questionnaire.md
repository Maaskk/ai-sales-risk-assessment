# Architecture Discovery Questionnaire

Record each answer as `[CONFIRMED]`, cite the evidence, name the answer owner, and date it. Do not infer unanswered facts.

## Business and users

1. What decision does the recommendation support, and what outcomes define success or harm?
2. Who uses the recommendation, who is affected, and who can override or contest it?
3. Are recommendations advisory, defaulted, ranked, or automatically executed?
4. What uses are prohibited, and how are they enforced?
5. What availability and recovery objectives matter to sales operations?

## Data

1. Which CRM/ERP/source systems and attributes are used? Which field is the outcome label?
2. Does the data contain identifiers, protected/special-category attributes, inferred attributes, free text, or purchased data?
3. What purpose, lawful basis/permission, notice, retention, deletion, and data-subject processes apply?
4. How are schema, quality, lineage, consent restrictions, duplicates, missing values, and label errors controlled?
5. Can users or third parties influence training data or labels?

## Application and interfaces

1. What services, APIs, queues, batch jobs, admin consoles, and user interfaces exist?
2. Which interfaces are internet-accessible or callable by other systems?
3. How are inputs validated, outputs explained, failures handled, and overrides recorded?
4. What rate limits, quotas, caching, and abuse protections exist?

## Infrastructure and network

1. Where are development, training, registry, inference, database, logging, backup, and disaster-recovery environments hosted?
2. What trust zones, ingress/egress rules, private endpoints, encryption mechanisms, and key stores exist?
3. Does training or inference have internet access? Is workload isolation enforced?
4. What is inherited from cloud/platform/enterprise teams, and where is evidence kept?

## Machine-learning lifecycle

1. What algorithm/model/library and version are used? Is any pre-trained artifact loaded?
2. Who develops, reviews, validates, approves, promotes, monitors, retrains, rolls back, and retires models?
3. How are code, dataset, features, parameters, metrics, artifacts, approvals, and deployments linked?
4. What acceptance thresholds cover accuracy, calibration, segment performance, explainability, robustness, latency, and safety?
5. What drift is monitored, at what frequency, with which threshold and response?

## Identity and access

1. Which human and service identities exist and how are they authenticated?
2. Is MFA enforced for privileged and remote access? How are joiner/mover/leaver events handled?
3. Who can export data, change labels/features/code, approve/deploy a model, change thresholds, view logs, or retrieve secrets?
4. How often are access and service-account permissions reviewed?

## Supply chain

1. Which package/model registries, base images, datasets, vendors, and build services are trusted?
2. Are versions and hashes pinned? Are signatures/provenance verified before use?
3. Are SBOMs generated and vulnerabilities/licenses reviewed with defined SLAs?
4. Are builds isolated, reproducible, protected by review/branch rules, and free of long-lived credentials?

## Logging, monitoring, and response

1. Which security, data-quality, model-quality, recommendation, override, and administrative events are logged?
2. Are raw features, identifiers, confidence values, or secrets present in logs?
3. Who monitors alerts and how are incidents classified, contained, rolled back, communicated, and learned from?
4. Are clocks synchronized, logs immutable, and retention/access rules defined?

## Privacy, legal, and governance

1. Is a privacy impact, AI impact, or legal review required? Which jurisdictions and contracts apply?
2. Who is accountable for the business process, data, model, security, privacy, validation, and residual risk?
3. How can affected people obtain information, correct data, contest an outcome, or receive redress?
4. What independent validation and periodic review are required?
