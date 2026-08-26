"""Check deterministic repository constraints around the OSCAL profile."""

from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROFILE_PATH = ROOT / "nist/oscal/ai-sales-selected-controls-profile.json"
CONTROLS_PATH = ROOT / "nist/controls.csv"


def main() -> None:
    profile_document = json.loads(PROFILE_PATH.read_text(encoding="utf-8"))
    profile = profile_document.get("profile")
    if not isinstance(profile, dict):
        raise SystemExit("OSCAL document must contain a profile object")
    if profile.get("metadata", {}).get("oscal-version") != "1.1.3":
        raise SystemExit("OSCAL profile must declare OSCAL 1.1.3")

    selected = set(profile["imports"][0]["include-controls"][0]["with-ids"])
    with CONTROLS_PATH.open(newline="", encoding="utf-8") as handle:
        expected = {row["control_id"].lower() for row in csv.DictReader(handle)}

    if selected != expected:
        raise SystemExit(
            "OSCAL/control CSV mismatch: "
            f"missing={sorted(expected - selected)}, extra={sorted(selected - expected)}"
        )

    print(f"OSCAL selection consistent: {len(selected)} controls match nist/controls.csv")


if __name__ == "__main__":
    main()
