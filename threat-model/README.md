# Threat Model

## Artifacts

- `diagrams/security-dfd.md` — reviewable Mermaid DFD with trust boundaries and flows.
- `diagrams/executive-architecture.drawio` — editable diagrams.net architecture.
- `threat-dragon/ai-sales-threat-model.json` — OWASP Threat Dragon v2 model with STRIDE threats and mitigations.
- `atlas-owasp-mapping.md` — predictive-AI threat-intelligence crosswalk.

## Review procedure

1. Replace reference components and boundaries with confirmed architecture.
2. Open the JSON in Threat Dragon Desktop and review every node/flow.
3. Add/remove STRIDE threats based on actual exposure; retain links to risk IDs.
4. Confirm existing mitigations using evidence rather than changing `Open` to `Mitigated` from documentation alone.
5. Export the Threat Dragon report and save a sanitized copy or screenshot under `evidence/screenshots/`.

The Mermaid and Threat Dragon diagrams intentionally overlap: Mermaid supports review/version diffs; Threat Dragon supports interactive threat/mitigation workflow.
