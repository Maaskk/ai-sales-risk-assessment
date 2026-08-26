from __future__ import annotations

import hashlib
import json
import os
import platform
from datetime import UTC, datetime
from pathlib import Path

import joblib
import pandas as pd
import sklearn
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = ROOT / "data/synthetic/sales_training.csv"
MODEL_DIR = Path(os.getenv("MODEL_DIR", ROOT / "prototype/model"))
RANDOM_STATE = 42

CATEGORICAL = ["segment", "region"]
NUMERIC = [
    "tenure_months",
    "purchases_90d",
    "avg_order_value",
    "support_contacts_90d",
    "days_since_last_purchase",
]
FEATURE_NAMES = CATEGORICAL + NUMERIC
TARGET = "accepted_product"


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def build_pipeline() -> Pipeline:
    preprocess = ColumnTransformer(
        [
            ("categorical", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL),
            ("numeric", StandardScaler(), NUMERIC),
        ]
    )
    return Pipeline(
        [
            ("preprocess", preprocess),
            (
                "classifier",
                LogisticRegression(
                    max_iter=800, random_state=RANDOM_STATE, class_weight="balanced"
                ),
            ),
        ]
    )


def train() -> dict[str, object]:
    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    frame = pd.read_csv(DATA_PATH)
    missing = set(FEATURE_NAMES + [TARGET]) - set(frame.columns)
    if missing:
        raise ValueError(f"Training data is missing required columns: {sorted(missing)}")
    if frame[FEATURE_NAMES + [TARGET]].isna().any().any():
        raise ValueError("Training data contains null values in required fields")

    x_train, x_test, y_train, y_test = train_test_split(
        frame[FEATURE_NAMES],
        frame[TARGET],
        test_size=0.25,
        random_state=RANDOM_STATE,
        stratify=frame[TARGET],
    )
    pipeline = build_pipeline()
    pipeline.fit(x_train, y_train)
    predictions = pipeline.predict(x_test)
    overall_accuracy = float(accuracy_score(y_test, predictions))

    evaluation = x_test.copy()
    evaluation["actual"] = y_test.values
    evaluation["predicted"] = predictions
    group_accuracy = {
        str(group): float((rows["actual"] == rows["predicted"]).mean())
        for group, rows in evaluation.groupby("segment")
    }
    model_version = f"synthetic-{datetime.now(UTC).strftime('%Y%m%d%H%M%S')}"
    dataset_digest = sha256_file(DATA_PATH)
    bundle = {
        "pipeline": pipeline,
        "model_version": model_version,
        "feature_names": FEATURE_NAMES,
        "dataset_sha256": dataset_digest,
        "trained_at": datetime.now(UTC).isoformat(),
    }
    model_path = MODEL_DIR / "model.joblib"
    joblib.dump(bundle, model_path, compress=3)
    model_digest = sha256_file(model_path)
    (MODEL_DIR / "model.joblib.sha256").write_text(
        f"{model_digest}  model.joblib\n", encoding="utf-8"
    )

    metrics: dict[str, object] = {
        "model_version": model_version,
        "dataset": str(DATA_PATH.relative_to(ROOT)),
        "dataset_sha256": dataset_digest,
        "model_sha256": model_digest,
        "rows": int(len(frame)),
        "test_rows": int(len(x_test)),
        "accuracy": overall_accuracy,
        "accuracy_by_segment": group_accuracy,
        "classification_report": classification_report(
            y_test, predictions, output_dict=True, zero_division=0
        ),
        "python_version": platform.python_version(),
        "scikit_learn_version": sklearn.__version__,
        "limitations": [
            "Synthetic data and labels do not establish business validity.",
            "Group accuracy is only a demonstration signal and is not proof of fairness.",
            "Random split does not replace temporal or out-of-population validation.",
        ],
    }
    (MODEL_DIR / "metrics.json").write_text(
        json.dumps(metrics, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    write_model_card(metrics)
    log_to_mlflow(metrics, model_path)
    return metrics


def write_model_card(metrics: dict[str, object]) -> None:
    group_lines = "\n".join(
        f"- `{group}` accuracy: {value:.3f}"
        for group, value in metrics["accuracy_by_segment"].items()
    )
    body = f"""# Generated Synthetic Model Card

## Intended use

Demonstrate security and AI-risk assessment procedures for a synthetic sales recommendation classifier. It must not be used for real customers or automated decisions.

## Version and provenance

- Model: `{metrics["model_version"]}`
- Dataset SHA-256: `{metrics["dataset_sha256"]}`
- Model SHA-256: `{metrics["model_sha256"]}`
- Rows: {metrics["rows"]}; holdout rows: {metrics["test_rows"]}

## Demonstration metrics

- Overall accuracy: {metrics["accuracy"]:.3f}
{group_lines}

## Limitations

- Synthetic relationships and labels have no real-world validity.
- The split is random rather than temporal.
- Accuracy does not measure calibration, business benefit, fairness, privacy, security or customer harm.
- Reason codes in the API are feature cues, not causal explanations.
- A human must review every recommendation.
"""
    (MODEL_DIR / "model-card.generated.md").write_text(body, encoding="utf-8")


def log_to_mlflow(metrics: dict[str, object], model_path: Path) -> None:
    tracking_uri = os.getenv("MLFLOW_TRACKING_URI")
    if not tracking_uri:
        return
    try:
        import mlflow

        mlflow.set_tracking_uri(tracking_uri)
        mlflow.set_experiment("synthetic-ai-sales")
        with mlflow.start_run(run_name=str(metrics["model_version"])):
            mlflow.log_param("dataset_sha256", metrics["dataset_sha256"])
            mlflow.log_param("scikit_learn_version", metrics["scikit_learn_version"])
            mlflow.log_metric("accuracy", float(metrics["accuracy"]))
            for segment, value in metrics["accuracy_by_segment"].items():
                mlflow.log_metric(f"accuracy_{segment}", float(value))
            mlflow.log_artifact(str(model_path), artifact_path="model")
            mlflow.log_artifact(str(MODEL_DIR / "metrics.json"), artifact_path="evidence")
    except Exception as exc:  # MLflow must not make the local evidence build non-deterministic.
        print(f"MLflow logging skipped: {type(exc).__name__}: {exc}")


if __name__ == "__main__":
    result = train()
    print(json.dumps({"model_version": result["model_version"], "accuracy": result["accuracy"]}))
