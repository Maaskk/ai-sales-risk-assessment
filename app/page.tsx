import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { RiskMatrix } from "@/components/RiskMatrix";
import { Status } from "@/components/Status";
import { data } from "@/lib/data";

export default function DashboardPage() {
  const counts = Object.fromEntries(["Critical", "High", "Medium", "Low"].map((rating) => [rating, data.risks.filter((risk) => risk.inherent_rating === rating).length]));
  const decisions = data.assumptions.filter((item) => item.status === "DECISION REQUIRED").length;
  const questions = data.assumptions.filter((item) => item.status === "OPEN QUESTION").length;
  return (
    <>
      <PageHeader title="Dashboard" description="Current assessment status, provisional risk exposure and evidence coverage." actions={<Link className="button" href="/presentation">Presentation</Link>} />
      <div className="notice warning"><strong>Assessment boundary</strong> The data and model are synthetic. Production architecture and control effectiveness remain unverified.</div>
      <section className="metric-grid" aria-label="Assessment metrics">
        <div className="metric"><span>Risks</span><strong>{data.risks.length}</strong><small>{counts.Critical} critical, {counts.High} high</small></div>
        <div className="metric"><span>NIST controls</span><strong>{data.controls.length}</strong><small>Selected and mapped</small></div>
        <div className="metric"><span>EBIOS RM</span><strong>5 / 5</strong><small>Reference workshops drafted</small></div>
        <div className="metric"><span>Evidence checks</span><strong>{data.evidence.length}</strong><small>Lab evidence only</small></div>
      </section>
      <div className="content-grid">
        <section className="panel">
          <h2>Inherent risk</h2>
          <div className="risk-bars">
            {["Critical", "High", "Medium", "Low"].map((rating) => <div className="bar-row" key={rating}><span>{rating}</span><div className="bar-track"><div className="bar-fill" style={{ width: `${counts[rating] * 20}%` }} /></div><strong>{counts[rating]}</strong></div>)}
          </div>
        </section>
        <section className="panel">
          <h2>Governance gaps</h2>
          <p>Items that require company input before this assessment can support a production decision.</p>
          <div className="metric-grid">
            <div className="metric"><span>Open questions</span><strong>{questions}</strong></div>
            <div className="metric"><span>Decisions required</span><strong>{decisions}</strong></div>
          </div>
          <Link className="button" href="/assumptions">Review items</Link>
        </section>
      </div>
      <section className="section-block">
        <h2>Risk matrix</h2>
        <p>Provisional inherent scores. Select a risk for full traceability.</p>
        <RiskMatrix risks={data.risks} />
      </section>
      <section className="section-block">
        <h2>Evidence status</h2>
        <div className="table-wrap"><table><thead><tr><th>Check</th><th>Result</th><th>Interpretation</th></tr></thead><tbody>{data.evidence.slice(0, 5).map((item) => <tr key={item.Check}><td>{item.Check}</td><td><Status>{item.Result}</Status></td><td>{item.Interpretation}</td></tr>)}</tbody></table></div>
        <p><Link className="table-link" href="/evidence">View all evidence</Link></p>
      </section>
    </>
  );
}
