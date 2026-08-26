from pathlib import Path

import pytest

from prototype.api.app.model_loader import ModelIntegrityError, VerifiedModel


def test_tampered_model_is_rejected(tmp_path: Path):
    source_model = Path("prototype/model/model.joblib")
    source_digest = Path("prototype/model/model.joblib.sha256")
    target_model = tmp_path / "model.joblib"
    target_digest = tmp_path / "model.joblib.sha256"
    target_model.write_bytes(source_model.read_bytes() + b"tampered")
    target_digest.write_text(source_digest.read_text(encoding="utf-8"), encoding="utf-8")

    with pytest.raises(ModelIntegrityError, match="digest verification failed"):
        VerifiedModel(target_model, target_digest)
