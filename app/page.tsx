import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Status } from "@/components/Status";
import { data } from "@/lib/data";
import { predict, type RecommendationInput } from "@/lib/model";

const customers: RecommendationInput[] = [
  { customer_reference: "SYN-00001", segment: "consumer", region: "east", tenure_months: 164, purchases_90d: 6, avg_order_value: 10, support_contacts_90d: 3, days_since_last_purchase: 1 },
  { customer_reference: "SYN-00002", segment: "small_business", region: "north", tenure_months: 14, purchases_90d: 3, avg_order_value: 543.39, support_contacts_90d: 2, days_since_last_purchase: 40 },
  { customer_reference: "SYN-00003", segment: "enterprise", region: "north", tenure_months: 114, purchases_90d: 26, avg_order_value: 758.35, support_contacts_90d: 0, days_since_last_purchase: 35 },
  { customer_reference: "SYN-00004", segment: "enterprise", region: "north", tenure_months: 148, purchases_90d: 12, avg_order_value: 716.18, support_contacts_90d: 1, days_since_last_purchase: 68 },
  { customer_reference: "SYN-00005", segment: "enterprise", region: "north", tenure_months: 92, purchases_90d: 12, avg_order_value: 1192.8, support_contacts_90d: 1, days_since_last_purchase: 89 },
  { customer_reference: "SYN-00006", segment: "small_business", region: "north", tenure_months: 148, purchases_90d: 6, avg_order_value: 212.69, support_contacts_90d: 1, days_since_last_purchase: 73 },
];

const productNames: Record<string, string> = {
  product_a: "Product A",
  product_b: "Product B",
  product_c: "Product C",
};

function label(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function DashboardPage() {
  const model = data.model as {
    accuracy: number;
    rows: number;
    model_version: string;
    scikit_learn_version: string;
    accuracy_by_segment: Record<string, number>;
  };
  const recommendations = customers
    .map((customer) => ({ customer, result: predict(customer) }))
    .sort((left, right) => right.result.confidence - left.result.confidence);
  const averageConfidence = recommendations.reduce((total, item) => total + item.result.confidence, 0) / recommendations.length;
  const productMix = Object.keys(productNames).map((product) => ({
    product,
    count: recommendations.filter((item) => item.result.recommended_product === product).length,
  }));

  return (
    <>
      <PageHeader
        title="Sales recommendation dashboard"
        description="Customer activity and sales history are used to suggest the next product for a salesperson to offer."
        actions={<Link className="button primary" href="/demo">New recommendation</Link>}
      />

      <div className="notice"><strong>Demonstration environment</strong> All customer records and outcomes on this page are synthetic.</div>

      <section className="metric-grid" aria-label="Sales recommendation metrics">
        <div className="metric"><span>Customer records</span><strong>{model.rows}</strong><small>Training dataset</small></div>
        <div className="metric"><span>Model accuracy</span><strong>{(model.accuracy * 100).toFixed(1)}%</strong><small>225 holdout records</small></div>
        <div className="metric"><span>Products</span><strong>{Object.keys(productNames).length}</strong><small>Available recommendations</small></div>
        <div className="metric"><span>Average confidence</span><strong>{(averageConfidence * 100).toFixed(1)}%</strong><small>Current review queue</small></div>
      </section>

      <section className="section-block dashboard-table">
        <div className="section-heading">
          <div>
            <h2>Recommendations to review</h2>
            <p>The salesperson checks the suggestion before presenting an offer to the customer.</p>
          </div>
          <Link className="table-link" href="/demo">Evaluate another customer</Link>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Segment</th><th>Region</th><th>Purchases in 90 days</th><th>Suggested product</th><th>Confidence</th><th>Decision</th></tr></thead>
            <tbody>
              {recommendations.map(({ customer, result }) => (
                <tr key={customer.customer_reference}>
                  <td><strong>{customer.customer_reference}</strong></td>
                  <td>{label(customer.segment)}</td>
                  <td>{label(customer.region)}</td>
                  <td>{customer.purchases_90d}</td>
                  <td><strong>{productNames[result.recommended_product]}</strong></td>
                  <td>{(result.confidence * 100).toFixed(1)}%</td>
                  <td><Status>{result.confidence >= 0.7 ? "Ready for review" : "Check carefully"}</Status></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="content-grid">
        <section className="panel">
          <h2>Recommendation mix</h2>
          <p>Products suggested for the current review queue.</p>
          <div className="risk-bars">
            {productMix.map(({ product, count }) => (
              <div className="bar-row" key={product}>
                <span>{productNames[product]}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${(count / recommendations.length) * 100}%` }} /></div>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <h2>Accuracy by customer segment</h2>
          <p>Holdout results from the synthetic dataset.</p>
          <div className="risk-bars">
            {Object.entries(model.accuracy_by_segment).map(([segment, value]) => (
              <div className="bar-row" key={segment}>
                <span>{label(segment)}</span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${value * 100}%` }} /></div>
                <strong>{Math.round(value * 100)}%</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <div><h2>How a recommendation is produced</h2><p>The model supports the seller. It does not make the final sales decision.</p></div>
          <Link className="table-link" href="/system">View system details</Link>
        </div>
        <div className="sales-flow" aria-label="Recommendation workflow">
          <div><span>1</span><strong>Customer data</strong><small>Segment, region and relationship history</small></div>
          <div><span>2</span><strong>Sales history</strong><small>Purchases, order value and recent activity</small></div>
          <div><span>3</span><strong>Prediction model</strong><small>Open source scikit-learn classifier</small></div>
          <div><span>4</span><strong>Product suggestion</strong><small>Product and confidence score</small></div>
          <div><span>5</span><strong>Seller review</strong><small>The salesperson accepts or rejects the suggestion</small></div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><h2>Project controls</h2><p>Security and model governance are tracked separately from the sales workflow.</p></div>
          <Link className="table-link" href="/risks">Open risk analysis</Link>
        </div>
        <div className="project-summary">
          <div><strong>{data.risks.length}</strong><span>Risk scenarios</span></div>
          <div><strong>{data.controls.length}</strong><span>NIST controls</span></div>
          <div><strong>{data.evidence.length}</strong><span>Evidence checks</span></div>
          <div><strong>{model.scikit_learn_version}</strong><span>scikit-learn version</span></div>
        </div>
      </section>
    </>
  );
}
