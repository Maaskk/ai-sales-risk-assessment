import os

import requests
import streamlit as st

API_URL = os.getenv("API_URL", "http://api:8000")
API_KEY = os.getenv("API_KEY", "local-development-only")

st.set_page_config(page_title="Synthetic AI Sales Lab", page_icon="🛡️")
st.title("Synthetic AI Sales Recommendation Lab")
st.warning("Synthetic data only. The recommendation is advisory and requires human review.")

with st.form("recommendation"):
    customer_reference = st.text_input("Synthetic customer reference", "SYNTH-0001")
    segment = st.selectbox("Segment", ["consumer", "small_business", "enterprise"])
    region = st.selectbox("Region", ["north", "south", "east", "west"])
    tenure_months = st.number_input("Tenure (months)", 0, 600, 36)
    purchases_90d = st.number_input("Purchases in 90 days", 0, 500, 8)
    avg_order_value = st.number_input("Average order value", 0.0, 1_000_000.0, 240.0)
    support_contacts_90d = st.number_input("Support contacts in 90 days", 0, 100, 1)
    days_since_last_purchase = st.number_input("Days since last purchase", 0, 3650, 12)
    submitted = st.form_submit_button("Request advisory recommendation")

if submitted:
    payload = {
        "customer_reference": customer_reference,
        "segment": segment,
        "region": region,
        "tenure_months": tenure_months,
        "purchases_90d": purchases_90d,
        "avg_order_value": avg_order_value,
        "support_contacts_90d": support_contacts_90d,
        "days_since_last_purchase": days_since_last_purchase,
    }
    try:
        response = requests.post(
            f"{API_URL}/v1/recommendations",
            json=payload,
            headers={"X-API-Key": API_KEY},
            timeout=10,
        )
        response.raise_for_status()
        result = response.json()
        st.success(f"Recommended product: {result['recommended_product']}")
        st.write(f"Confidence: {result['confidence']:.1%}")
        st.write(f"Model version: `{result['model_version']}`")
        st.write("Reason cues: " + ", ".join(result["reason_codes"]))
        st.error(
            "A salesperson must review context and remains responsible for the offer decision."
        )
    except requests.RequestException as exc:
        st.error(f"Recommendation service unavailable: {type(exc).__name__}")
