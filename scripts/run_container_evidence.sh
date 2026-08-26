#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"
mkdir -p evidence/scans evidence/sbom

docker compose config --quiet
docker compose build api trainer dashboard

if command -v trivy >/dev/null 2>&1; then
  for service in api trainer dashboard; do
    trivy image --scanners vuln,secret,misconfig --format json \
      --output "evidence/scans/trivy-${service}-image.json" \
      "ai-sales-risk-lab-${service}:latest"
  done
else
  echo "Trivy not installed; use the GitHub Actions security workflow or install from https://trivy.dev/."
fi

if command -v syft >/dev/null 2>&1; then
  for service in api trainer dashboard; do
    syft "ai-sales-risk-lab-${service}:latest" \
      -o "cyclonedx-json=evidence/sbom/${service}-image.cdx.json"
  done
else
  echo "Syft not installed; use the GitHub Actions security workflow or install from https://github.com/anchore/syft."
fi
