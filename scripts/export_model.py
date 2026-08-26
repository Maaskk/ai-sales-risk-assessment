from __future__ import annotations

import json
from pathlib import Path

import joblib

ROOT = Path(__file__).resolve().parents[1]
MODEL_PATH = ROOT / "prototype/model/model.joblib"
OUTPUT_PATH = ROOT / "generated/model-export.json"


def export_model() -> dict[str, object]:
    bundle = joblib.load(MODEL_PATH)
    pipeline = bundle["pipeline"]
    preprocess = pipeline.named_steps["preprocess"]
    classifier = pipeline.named_steps["classifier"]
    categorical = preprocess.named_transformers_["categorical"]
    numeric = preprocess.named_transformers_["numeric"]

    verification_inputs = [
        {
            "segment": "small_business",
            "region": "north",
            "tenure_months": 36,
            "purchases_90d": 8,
            "avg_order_value": 240.0,
            "support_contacts_90d": 1,
            "days_since_last_purchase": 12,
        },
        {
            "segment": "consumer",
            "region": "west",
            "tenure_months": 8,
            "purchases_90d": 2,
            "avg_order_value": 45.0,
            "support_contacts_90d": 3,
            "days_since_last_purchase": 40,
        },
        {
            "segment": "enterprise",
            "region": "east",
            "tenure_months": 82,
            "purchases_90d": 18,
            "avg_order_value": 1200.0,
            "support_contacts_90d": 0,
            "days_since_last_purchase": 4,
        },
    ]
    import pandas as pd

    probabilities = pipeline.predict_proba(pd.DataFrame(verification_inputs))
    classes = [str(value) for value in classifier.classes_]
    payload: dict[str, object] = {
        "format": "sklearn-logistic-regression-export-v1",
        "model_version": bundle["model_version"],
        "dataset_sha256": bundle["dataset_sha256"],
        "feature_names": bundle["feature_names"],
        "categorical": [
            {"name": name, "categories": [str(value) for value in categories]}
            for name, categories in zip(
                ["segment", "region"], categorical.categories_, strict=True
            )
        ],
        "numeric": [
            {"name": name, "mean": float(mean), "scale": float(scale)}
            for name, mean, scale in zip(
                [
                    "tenure_months",
                    "purchases_90d",
                    "avg_order_value",
                    "support_contacts_90d",
                    "days_since_last_purchase",
                ],
                numeric.mean_,
                numeric.scale_,
                strict=True,
            )
        ],
        "classes": [str(value) for value in classifier.classes_],
        "coefficients": classifier.coef_.tolist(),
        "intercepts": classifier.intercept_.tolist(),
        "verification_vectors": [
            {
                "input": values,
                "class": classes[int(row.argmax())],
                "confidence": float(row.max()),
            }
            for values, row in zip(verification_inputs, probabilities, strict=True)
        ],
    }
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    return payload


if __name__ == "__main__":
    exported = export_model()
    print(json.dumps({"model_version": exported["model_version"], "path": str(OUTPUT_PATH)}))
