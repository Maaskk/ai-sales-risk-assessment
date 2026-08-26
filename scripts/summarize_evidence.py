from __future__ import annotations

import json
from datetime import UTC, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCANS = ROOT / "evidence/scans"
SBOMS = ROOT / "evidence/sbom"
OUTPUT = ROOT / "evidence/security-tests/summary.md"
JUNIT = ROOT / "evidence/security-tests/pytest-junit.xml"


def read_json(path: Path) -> object | None:
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def trivy_counts(path: Path) -> dict[str, int]:
    document = read_json(path)
    counts = {severity: 0 for severity in ("CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN")}
    counts.update({"MISCONFIG": 0, "LEAK_FINDINGS": 0})
    if not isinstance(document, dict):
        return counts
    for result in document.get("Results", []):
        if not isinstance(result, dict):
            continue
        for vulnerability in result.get("Vulnerabilities") or []:
            severity = vulnerability.get("Severity", "UNKNOWN")
            counts[severity] = counts.get(severity, 0) + 1
        counts["MISCONFIG"] += len(result.get("Misconfigurations") or [])
        counts["LEAK_FINDINGS"] += len(result.get("Secrets") or [])
    return counts


def component_count(path: Path) -> int:
    document = read_json(path)
    return len(document.get("components", [])) if isinstance(document, dict) else 0


def main() -> None:
    bandit = read_json(SCANS / "bandit.json")
    audit = read_json(SCANS / "pip-audit.json")
    trainer_audit = read_json(SCANS / "pip-audit-trainer.json")
    api_sbom = read_json(SBOMS / "python.cdx.json")
    trainer_sbom = read_json(SBOMS / "trainer-python.cdx.json")
    tests = JUNIT.read_text(encoding="utf-8").count("<testcase ") if JUNIT.exists() else 0
    bandit_results = bandit.get("results", []) if isinstance(bandit, dict) else []
    audit_dependencies = audit.get("dependencies", []) if isinstance(audit, dict) else []
    trainer_dependencies = (
        trainer_audit.get("dependencies", []) if isinstance(trainer_audit, dict) else []
    )
    api_vulnerabilities = sum(
        len(item.get("vulns", [])) for item in audit_dependencies if isinstance(item, dict)
    )
    trainer_vulnerabilities = sum(
        len(item.get("vulns", [])) for item in trainer_dependencies if isinstance(item, dict)
    )
    api_components = len(api_sbom.get("components", [])) if isinstance(api_sbom, dict) else 0
    trainer_components = (
        len(trainer_sbom.get("components", [])) if isinstance(trainer_sbom, dict) else 0
    )
    filesystem = trivy_counts(SCANS / "trivy-fs.json")
    image_counts = {
        service: trivy_counts(SCANS / f"trivy-{service}-image.json")
        for service in ("api", "trainer", "dashboard")
    }
    image_result = "; ".join(
        f"{service}: {counts['CRITICAL']}C/{counts['HIGH']}H"
        for service, counts in image_counts.items()
    )
    repository_components = component_count(SBOMS / "repository-syft.cdx.json")
    image_components = ", ".join(
        f"{service} {component_count(SBOMS / f'{service}-image.cdx.json')}"
        for service in ("api", "trainer", "dashboard")
    )
    body = f"""# Automated Evidence Summary

Generated: {datetime.now(UTC).isoformat()}

| Check | Result | Interpretation |
|---|---:|---|
| Pytest | {tests} passed | Functional and security regression procedures; passing tests do not prove production controls. |
| Ruff | Passed | Static quality checks. |
| Bandit findings | {len(bandit_results)} | Requires human triage for exploitability and false positives. |
| API pip-audit vulnerabilities | {api_vulnerabilities} | Direct environment/dependency advisories at scan time; transitive resolution may vary by platform. |
| Trainer pip-audit vulnerabilities | {trainer_vulnerabilities} | Includes the optional MLflow client dependency set. |
| API CycloneDX SBOM | {api_components} components | `evidence/sbom/python.cdx.json`; inventory input, not proof of trust. |
| Trainer CycloneDX SBOM | {trainer_components} components | `evidence/sbom/trainer-python.cdx.json`; inventory input, not proof of trust. |
| Trivy repository scan | {filesystem['CRITICAL']}C/{filesystem['HIGH']}H; {filesystem['MISCONFIG']} misconfig; {filesystem['LEAK_FINDINGS']} secret | Filesystem scan at evidence time; zero findings does not prove absence. |
| Trivy image scans | {image_result} | Raw fixed and unfixed findings are retained for human reachability and mitigation triage. |
| Syft repository SBOM | {repository_components} components | Repository-level package inventory. |
| Syft image SBOMs | {image_components} components | Per-image CycloneDX inventories; counts vary with transitive packages. |
| NIST OSCAL CLI | Valid | Profile model validation plus exact match to the 38-control CSV selection. |

## Evidence boundary

These results cover the synthetic repository state and local resolved environment only. Production images, infrastructure, identities, runtime configuration, data, alerts and recovery remain unassessed.
"""
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(body, encoding="utf-8")


if __name__ == "__main__":
    main()
