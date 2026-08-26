from __future__ import annotations

import csv
import hashlib
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data/synthetic/sales_training.csv"
SEED = 20260825


def generate(rows: int = 900) -> str:
    rng = random.Random(SEED)  # nosec B311  # noqa: S311 - deterministic synthetic data
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "customer_id",
        "segment",
        "region",
        "tenure_months",
        "purchases_90d",
        "avg_order_value",
        "support_contacts_90d",
        "days_since_last_purchase",
        "accepted_product",
    ]
    records: list[dict[str, str | int | float]] = []
    for index in range(1, rows + 1):
        segment = rng.choice(["consumer", "small_business", "enterprise"])
        region = rng.choice(["north", "south", "east", "west"])
        tenure = rng.randint(1, 180)
        purchases = max(
            0, int(rng.gauss({"consumer": 4, "small_business": 9, "enterprise": 15}[segment], 4))
        )
        order_value = round(
            max(
                10,
                rng.gauss({"consumer": 80, "small_business": 300, "enterprise": 950}[segment], 120),
            ),
            2,
        )
        support = max(0, int(rng.gauss(2, 1.5)))
        recency = rng.randint(0, 180)

        scores = {
            "product_a": 1.2 * purchases - 0.03 * recency + (2 if segment == "consumer" else 0),
            "product_b": 0.012 * order_value
            + 0.02 * tenure
            + (2 if segment == "small_business" else 0),
            "product_c": 0.7 * support
            + 0.008 * order_value
            + (3 if segment == "enterprise" else 0),
        }
        for product in scores:
            scores[product] += rng.gauss(0, 2.2)
        accepted = max(scores, key=scores.get)
        records.append(
            {
                "customer_id": f"SYN-{index:05d}",
                "segment": segment,
                "region": region,
                "tenure_months": tenure,
                "purchases_90d": purchases,
                "avg_order_value": order_value,
                "support_contacts_90d": support,
                "days_since_last_purchase": recency,
                "accepted_product": accepted,
            }
        )
    with OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(records)
    return hashlib.sha256(OUTPUT.read_bytes()).hexdigest()


if __name__ == "__main__":
    print(f"Generated {OUTPUT.relative_to(ROOT)} sha256={generate()}")
