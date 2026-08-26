import os
from pathlib import Path

import pytest
from fastapi.testclient import TestClient


@pytest.fixture(scope="session", autouse=True)
def configured_environment() -> None:
    os.environ["API_KEY"] = "test-api-key-value"
    os.environ["MODEL_DIR"] = str(Path("prototype/model").resolve())


@pytest.fixture()
def client(configured_environment):
    from prototype.api.app.config import get_settings

    get_settings.cache_clear()
    from prototype.api.app.main import app

    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture()
def valid_payload() -> dict[str, object]:
    return {
        "customer_reference": "SYNTH-0001",
        "segment": "small_business",
        "region": "north",
        "tenure_months": 36,
        "purchases_90d": 8,
        "avg_order_value": 240.0,
        "support_contacts_90d": 1,
        "days_since_last_purchase": 12,
    }
