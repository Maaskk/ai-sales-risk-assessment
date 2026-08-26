from __future__ import annotations

import hashlib
import hmac
import io
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import joblib
import pandas as pd


class ModelIntegrityError(RuntimeError):
    """Raised when the model artifact cannot be tied to its trusted digest."""


@dataclass(frozen=True)
class Prediction:
    product: str
    confidence: float
    model_version: str
    reason_codes: list[str]


class VerifiedModel:
    def __init__(self, model_path: Path, digest_path: Path) -> None:
        raw = model_path.read_bytes()
        expected = digest_path.read_text(encoding="utf-8").strip().split()[0].lower()
        actual = hashlib.sha256(raw).hexdigest()
        if len(expected) != 64 or not hmac.compare_digest(actual, expected):
            raise ModelIntegrityError("Model artifact digest verification failed")

        # joblib/pickle formats can execute code. The digest is useful only when its manifest
        # is trusted; production should use signed provenance and an isolated loading process.
        bundle: dict[str, Any] = joblib.load(io.BytesIO(raw))
        required = {"pipeline", "model_version", "feature_names"}
        if not required.issubset(bundle):
            raise ModelIntegrityError("Model bundle is missing required metadata")
        self._pipeline = bundle["pipeline"]
        self.model_version = str(bundle["model_version"])
        self.feature_names = tuple(bundle["feature_names"])

    def predict(self, features: dict[str, str | int | float]) -> Prediction:
        if tuple(features.keys()) != self.feature_names:
            raise ValueError("Feature schema does not match approved model metadata")
        frame = pd.DataFrame([features])
        probabilities = self._pipeline.predict_proba(frame)[0]
        classes = self._pipeline.classes_
        best_index = int(probabilities.argmax())
        return Prediction(
            product=str(classes[best_index]),
            confidence=float(probabilities[best_index]),
            model_version=self.model_version,
            reason_codes=self._reason_codes(features),
        )

    @staticmethod
    def _reason_codes(features: dict[str, str | int | float]) -> list[str]:
        # These are transparent business feature cues, not causal explanations.
        scored = [
            (float(features["purchases_90d"]), "RECENT_PURCHASE_ACTIVITY"),
            (float(features["avg_order_value"]) / 100.0, "ORDER_VALUE_PATTERN"),
            (float(features["tenure_months"]) / 12.0, "RELATIONSHIP_TENURE"),
        ]
        return [code for _, code in sorted(scored, reverse=True)[:2]]
