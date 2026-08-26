# Evidence Index

| Evidence | Generator | Risk/control use | Status |
|---|---|---|---|
| Unit/security test results | `make test` / CI | R-01 R-04 R-07 R-08; AC-3 SI-7 SI-10 SI-4 | Generated on execution |
| Bandit JSON | `make scan-python` | R-03; SI-2 SA-12 | Generated on execution |
| pip-audit JSON | `make scan-python` | R-03; SI-2 SR-3 | Generated on execution |
| Python CycloneDX SBOM | `make sbom-python` | R-03; SR-4 | Generated on execution |
| Trivy image scan | `scripts/run_container_evidence.sh` or GitHub workflow | R-03; SI-2 | Requires Docker or CI |
| Syft image SBOM | `scripts/run_container_evidence.sh` or GitHub workflow | R-03; SR-4 | Requires Docker or CI |
| Model digest/metrics/card | `make train` | R-02 R-04 R-07 R-08; SI-7 CA-7 | Generated on execution |
| Production IAM/config/log/recovery evidence | Assessment plan | All | Not assessed |

Generated evidence may be gitignored to avoid stale results. CI artifacts should retain the exact commit SHA and tool versions.
