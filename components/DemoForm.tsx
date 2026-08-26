"use client";

import { FormEvent, useState } from "react";
import type { Recommendation } from "@/lib/model";

const initial = {
  customer_reference: "SYNTH-001",
  segment: "small_business",
  region: "north",
  tenure_months: 36,
  purchases_90d: 8,
  avg_order_value: 240,
  support_contacts_90d: 1,
  days_since_last_purchase: 12,
};

function title(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function DemoForm() {
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState<Recommendation | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(name: string, value: string | number) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Recommendation failed.");
      setResult(body);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Recommendation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="section-block">
      <div className="form-heading"><h2>Customer and sales data</h2><p>The fields match the features used by the trained model.</p></div>
      <div className="form-grid">
        <label>Customer ID<input name="customer_reference" value={form.customer_reference} onChange={(event) => update(event.target.name, event.target.value)} required /></label>
        <label>Segment<select name="segment" value={form.segment} onChange={(event) => update(event.target.name, event.target.value)}><option value="consumer">Consumer</option><option value="small_business">Small business</option><option value="enterprise">Enterprise</option></select></label>
        <label>Region<select name="region" value={form.region} onChange={(event) => update(event.target.name, event.target.value)}><option value="north">North</option><option value="south">South</option><option value="east">East</option><option value="west">West</option></select></label>
        <label>Tenure in months<input type="number" min="0" max="600" value={form.tenure_months} onChange={(event) => update("tenure_months", Number(event.target.value))} required /></label>
        <label>Purchases in 90 days<input type="number" min="0" max="500" value={form.purchases_90d} onChange={(event) => update("purchases_90d", Number(event.target.value))} required /></label>
        <label>Average order value<input type="number" min="0" max="1000000" step="0.01" value={form.avg_order_value} onChange={(event) => update("avg_order_value", Number(event.target.value))} required /></label>
        <label>Support contacts in 90 days<input type="number" min="0" max="100" value={form.support_contacts_90d} onChange={(event) => update("support_contacts_90d", Number(event.target.value))} required /></label>
        <label>Days since last purchase<input type="number" min="0" max="3650" value={form.days_since_last_purchase} onChange={(event) => update("days_since_last_purchase", Number(event.target.value))} required /></label>
        <div className="full"><button className="button primary" type="submit" disabled={loading}>{loading ? "Calculating" : "Calculate product suggestion"}</button></div>
      </div>
      {error ? <p className="error" role="alert">{error}</p> : null}
      {result ? <section className="result" aria-live="polite"><p className="eyebrow">Suggested product</p><div className="result-product">{title(result.recommended_product)}</div><div className="content-grid" style={{ marginTop: 16 }}><div><strong>Confidence</strong><br />{(result.confidence * 100).toFixed(1)}%</div><div><strong>Model version</strong><br />{result.model_version}</div></div><h3>Customer signals</h3><ul className="plain-list">{result.reason_codes.map((reason) => <li key={reason}>{reason}</li>)}</ul><div className="notice warning" style={{ marginTop: 18, marginBottom: 0 }}><strong>Seller review</strong> Check the customer context before making the offer.</div></section> : null}
    </form>
  );
}
