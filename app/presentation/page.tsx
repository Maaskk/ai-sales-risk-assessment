import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { RiskMatrix } from "@/components/RiskMatrix";
import { data } from "@/lib/data";

const r03 = data.risks.find((risk) => risk.risk_id === "R-03");

export default function PresentationPage() {
  return (
    <div className="presentation">
      <PageHeader title="Presentation" description="A short review of the business use case, method, evidence and remaining validation." actions={<Link className="button" href="/">Exit</Link>} />
      <section><p className="eyebrow">1. Business use case</p><h2>Recommendation support for sales staff</h2><p>The reference system uses synthetic customer and sales features to recommend a product. The salesperson keeps the final decision.</p></section>
      <section><p className="eyebrow">2. Architecture</p><h2>Data, model and human decision boundaries</h2><p>The assessment follows data preparation, training, model promotion, inference and human review. Every production component remains subject to discovery.</p></section>
      <section><p className="eyebrow">3. EBIOS RM</p><h2>Five workshops connect business impact to treatment</h2><p>Scope and feared events lead to risk sources, strategic scenarios, operational paths and treatment decisions.</p></section>
      <section><p className="eyebrow">4. Risk picture</p><h2>Ten provisional scenarios</h2><RiskMatrix risks={data.risks} /></section>
      {r03 ? <section><p className="eyebrow">5. R-03</p><h2>{r03.title}</h2><div className="trace"><div className="trace-step"><span>Path</span><strong>{r03.strategic_scenario} → {r03.operational_scenario}</strong></div><div className="trace-step"><span>Controls</span><strong>{r03.control_ids.join(", ")}</strong></div><div className="trace-step"><span>Risk change</span><strong>{r03.inherent_rating} {r03.inherent_score}/16 → {r03.residual_rating} {r03.residual_score}/16 projected</strong></div></div></section> : null}
      <section><p className="eyebrow">6. Evidence</p><h2>Tests and scans support bounded claims</h2><p>Nine tests passed. SBOMs, dependency audits, container scans and OSCAL validation are retained. They cover the synthetic lab, not production controls.</p></section>
      <section><p className="eyebrow">7. Remaining validation</p><h2>Stakeholders must confirm the real system</h2><p>Architecture, data, legal duties, control effectiveness, owners, risk appetite and residual risk acceptance remain open.</p></section>
    </div>
  );
}
