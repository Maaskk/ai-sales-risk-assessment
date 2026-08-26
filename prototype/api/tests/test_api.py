def test_health_ready(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ready"
    assert response.json()["model_version"]


def test_liveness_and_readiness(client):
    assert client.get("/health/live").json()["status"] == "ready"
    assert client.get("/health/ready").json()["status"] == "ready"


def test_missing_api_key_is_rejected(client, valid_payload):
    response = client.post("/v1/recommendations", json=valid_payload)
    assert response.status_code == 401


def test_wrong_api_key_is_rejected(client, valid_payload):
    response = client.post(
        "/v1/recommendations",
        json=valid_payload,
        headers={"X-API-Key": "incorrect-key-value"},
    )
    assert response.status_code == 403


def test_recommendation_requires_human_review(client, valid_payload):
    response = client.post(
        "/v1/recommendations",
        json=valid_payload,
        headers={"X-API-Key": "test-api-key-value"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["human_review_required"] is True
    assert body["recommended_product"] in {"product_a", "product_b", "product_c"}
    assert 0 <= body["confidence"] <= 1
    assert "customer_reference" not in body
    assert response.headers["X-Request-ID"]


def test_extra_and_out_of_range_input_is_rejected(client, valid_payload):
    valid_payload["avg_order_value"] = -1
    valid_payload["unexpected"] = "field"
    response = client.post(
        "/v1/recommendations",
        json=valid_payload,
        headers={"X-API-Key": "test-api-key-value"},
    )
    assert response.status_code == 422
