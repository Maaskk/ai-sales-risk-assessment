# Reference Architecture

The diagram is an **[ASSUMPTION] reference architecture**, not a statement about a real company. Replace nodes and flows after discovery.

```mermaid
flowchart LR
    CRM["CRM / Customer source\n[ASSUMPTION]"]
    SALES["Sales history source\n[ASSUMPTION]"]
    DP["Data preparation pipeline\nLab: Python"]
    TRAIN["Training pipeline\nLab: scikit-learn"]
    REG["Model registry / artifacts\nLab: MLflow + hash manifest"]
    API["Recommendation API\nLab: FastAPI"]
    APP["Sales application\nLab: Streamlit"]
    USER["Salesperson\nHuman decision maker"]
    LOG["Audit / monitoring store"]
    OSS["Open-source package and model sources"]

    CRM -->|customer features| DP
    SALES -->|historical outcomes| DP
    OSS -->|pinned dependencies / provenance| TRAIN
    DP -->|versioned training set| TRAIN
    TRAIN -->|evaluated model + metadata| REG
    REG -->|approved artifact| API
    APP -->|authenticated request| API
    API -->|recommendation + confidence + review flag| APP
    APP -->|decision support| USER
    TRAIN -->|lifecycle events| LOG
    API -->|security and inference metadata; no raw features| LOG
```

## Design intent

- The AI provides decision support; the salesperson remains accountable for the offer.
- Training and inference are separated so model change requires an explicit promotion path.
- Model artifacts are verified before loading; production should replace the lab hash with signed provenance.
- Logs record who/what/when and outcome metadata while minimizing customer feature content.
- External dependencies cross a supply-chain trust boundary and require provenance, scanning, and approval.

## Deployment views

- **Laboratory:** all components run locally or through Docker Compose with synthetic data.
- **Production:** [OPEN QUESTION] cloud/on-premise topology, zones, services, high availability, and inherited controls are unknown.
