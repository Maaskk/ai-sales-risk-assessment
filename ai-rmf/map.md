# MAP — Context, Actors and Impacts

## Intended context

- [ASSUMPTION] Predictive classification/ranking recommends a product to an authenticated salesperson.
- [ASSUMPTION] The salesperson reviews contextual information and remains the final decision maker.
- [ASSUMPTION] The model uses structured customer/sales features and historical outcomes, not generative AI.
- [OPEN QUESTION] The customer impact, product types, jurisdictions, channels and materiality are unknown.

## Actors

| Actor | Responsibility to confirm |
|---|---|
| Business owner | Purpose, success/harm definition, fallback and residual risk |
| Data owner/steward | Authority, quality, lineage, access, retention and correction |
| Model developer | Reproducible development, documentation and limitations |
| Independent validator | Threshold design, testing, challenge and exception reporting |
| Platform/API operator | Secure deployment, integrity, availability, logging and rollback |
| Sales employee | Contextual review, override, explanation and escalation |
| Security/privacy/legal | Threat, control, privacy, legal and incident oversight |
| Customer/affected person | Receives impact and needs appropriate transparency/contest/redress |

## Potential benefits

- More relevant offers and consistent decision support.
- Reduced search time for sales staff.
- Measurable feedback on recommendation effectiveness.

Benefits are hypotheses until validated against business metrics and customer outcomes; they do not offset rights or safety obligations automatically.

## Potential harms

- Intrusive or inappropriate profiling/offers and loss of customer autonomy/trust.
- Systematic exclusion, steering or disparate quality across groups.
- Data disclosure, membership inference or commercial-intelligence theft.
- Manipulated, invalid, stale or unexplained recommendations.
- Automation bias: users over-trust a score or default.
- Service failure disrupts work or produces inconsistent manual treatment.
- Inability to correct data, contest an outcome or reconstruct responsibility.

## Impact analysis questions

- What is the worst plausible effect on a customer from a recommendation or non-recommendation?
- Are products financial, health, insurance, employment, housing, communications or otherwise high impact?
- Which attributes/proxies could create unfair or unlawful treatment?
- Can customers know data is used and obtain correction/contest/redress?
- What alternative non-AI or lower-data solution could meet the purpose?
- How do sales targets and incentives interact with model outputs?

## Dependencies and limitations

The model depends on historical decisions/outcomes that may encode past policy, sales incentives, incomplete labels and selection bias. Aggregate accuracy cannot prove suitability for current customers or fairness. Open-source components reduce development cost but introduce provenance, vulnerability, license and maintenance dependencies.
