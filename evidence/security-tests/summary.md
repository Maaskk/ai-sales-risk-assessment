# Automated Evidence Summary

Generated: 2026-08-26T13:49:06.577669+00:00

| Check | Result | Interpretation |
|---|---:|---|
| Pytest | 9 passed | Functional and security regression procedures; passing tests do not prove production controls. |
| Ruff | Passed | Static quality checks. |
| Bandit findings | 0 | Requires human triage for exploitability and false positives. |
| API pip-audit vulnerabilities | 0 | Direct environment/dependency advisories at scan time; transitive resolution may vary by platform. |
| Trainer pip-audit vulnerabilities | 0 | Includes the optional MLflow client dependency set. |
| API CycloneDX SBOM | 9 components | `evidence/sbom/python.cdx.json`; inventory input, not proof of trust. |
| Trainer CycloneDX SBOM | 10 components | `evidence/sbom/trainer-python.cdx.json`; inventory input, not proof of trust. |
| Trivy repository scan | 0C/0H; 0 misconfig; 0 secret | Filesystem scan at evidence time; zero findings does not prove absence. |
| Trivy image scans | api: 3C/13H; trainer: 3C/13H; dashboard: 3C/13H | Raw fixed and unfixed findings are retained for human reachability and mitigation triage. |
| Syft repository SBOM | 34 components | Repository-level package inventory. |
| Syft image SBOMs | api 2833, trainer 2927, dashboard 2862 components | Per-image CycloneDX inventories; counts vary with transitive packages. |
| NIST OSCAL CLI | Valid | Profile model validation plus exact match to the 38-control CSV selection. |

## Evidence boundary

These results cover the synthetic repository state and local resolved environment only. Production images, infrastructure, identities, runtime configuration, data, alerts and recovery remain unassessed.
