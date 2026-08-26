from __future__ import annotations

import json
import logging
import time
from contextlib import asynccontextmanager
from uuid import uuid4

from fastapi import Depends, FastAPI, HTTPException, Request, status

from .config import get_settings
from .model_loader import ModelIntegrityError, VerifiedModel
from .schemas import HealthResponse, RecommendationRequest, RecommendationResponse
from .security import require_api_key

settings = get_settings()
logging.basicConfig(level=getattr(logging, settings.log_level.upper(), logging.INFO))
logger = logging.getLogger("ai-sales-api")


def audit_event(event: str, **fields: object) -> None:
    safe = {"event": event, **fields}
    logger.info(json.dumps(safe, separators=(",", ":"), sort_keys=True))


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        app.state.model = VerifiedModel(settings.model_path, settings.digest_path)
        audit_event("model_loaded", model_version=app.state.model.model_version)
    except (OSError, ModelIntegrityError) as exc:
        app.state.model = None
        audit_event("model_load_failed", error_type=type(exc).__name__)
    yield


app = FastAPI(
    title="Synthetic AI Sales Recommendation API",
    version="1.0.0",
    description="Laboratory API. Recommendations require human review and use synthetic data only.",
    lifespan=lifespan,
)


@app.middleware("http")
async def request_context(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid4()))[:128]
    started = time.monotonic()
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    audit_event(
        "http_request",
        request_id=request_id,
        method=request.method,
        path=request.url.path,
        status=response.status_code,
        duration_ms=round((time.monotonic() - started) * 1000, 2),
    )
    return response


@app.get("/health/live", response_model=HealthResponse)
def liveness(request: Request) -> HealthResponse:
    model = request.app.state.model
    return HealthResponse(
        status="ready",
        model_version=model.model_version if model is not None else None,
    )


@app.get("/health", response_model=HealthResponse)
@app.get("/health/ready", response_model=HealthResponse)
def readiness(request: Request) -> HealthResponse:
    model = request.app.state.model
    return HealthResponse(
        status="ready" if model is not None else "degraded",
        model_version=model.model_version if model is not None else None,
    )


@app.post(
    "/v1/recommendations",
    response_model=RecommendationResponse,
    dependencies=[Depends(require_api_key)],
)
def recommend(payload: RecommendationRequest, request: Request) -> RecommendationResponse:
    model: VerifiedModel | None = request.app.state.model
    if model is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Approved model is unavailable",
        )
    prediction = model.predict(payload.model_features())
    recommendation_id = str(uuid4())
    audit_event(
        "recommendation_created",
        recommendation_id=recommendation_id,
        recommended_product=prediction.product,
        model_version=prediction.model_version,
        human_review_required=True,
    )
    return RecommendationResponse(
        recommendation_id=recommendation_id,
        recommended_product=prediction.product,
        confidence=round(prediction.confidence, 4),
        model_version=prediction.model_version,
        reason_codes=prediction.reason_codes,
        human_review_required=True,
    )
