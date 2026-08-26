CREATE TABLE IF NOT EXISTS synthetic_customer_features (
    customer_reference VARCHAR(64) PRIMARY KEY,
    segment VARCHAR(32) NOT NULL,
    region VARCHAR(16) NOT NULL,
    tenure_months INTEGER NOT NULL CHECK (tenure_months BETWEEN 0 AND 600),
    purchases_90d INTEGER NOT NULL CHECK (purchases_90d BETWEEN 0 AND 500),
    avg_order_value NUMERIC(12, 2) NOT NULL CHECK (avg_order_value >= 0),
    support_contacts_90d INTEGER NOT NULL CHECK (support_contacts_90d BETWEEN 0 AND 100),
    days_since_last_purchase INTEGER NOT NULL CHECK (days_since_last_purchase BETWEEN 0 AND 3650)
);

CREATE TABLE IF NOT EXISTS recommendation_audit (
    recommendation_id UUID PRIMARY KEY,
    actor_reference VARCHAR(128) NOT NULL,
    customer_reference_hash CHAR(64) NOT NULL,
    recommended_product VARCHAR(32) NOT NULL,
    model_version VARCHAR(128) NOT NULL,
    human_review_required BOOLEAN NOT NULL DEFAULT TRUE,
    decision_outcome VARCHAR(32),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE recommendation_audit IS
'Minimized decision metadata. Raw feature bodies and direct customer identifiers must not be logged here.';
