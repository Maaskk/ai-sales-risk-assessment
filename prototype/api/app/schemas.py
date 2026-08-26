from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class RecommendationRequest(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    customer_reference: str = Field(pattern=r"^[A-Za-z0-9_-]{1,64}$")
    segment: Literal["consumer", "small_business", "enterprise"]
    region: Literal["north", "south", "east", "west"]
    tenure_months: int = Field(ge=0, le=600)
    purchases_90d: int = Field(ge=0, le=500)
    avg_order_value: float = Field(ge=0, le=1_000_000)
    support_contacts_90d: int = Field(ge=0, le=100)
    days_since_last_purchase: int = Field(ge=0, le=3_650)

    def model_features(self) -> dict[str, str | int | float]:
        return self.model_dump(exclude={"customer_reference"})


class RecommendationResponse(BaseModel):
    recommendation_id: str
    recommended_product: Literal["product_a", "product_b", "product_c"]
    confidence: float = Field(ge=0, le=1)
    model_version: str
    reason_codes: list[str]
    human_review_required: Literal[True] = True


class HealthResponse(BaseModel):
    status: Literal["ready", "degraded"]
    model_version: str | None
