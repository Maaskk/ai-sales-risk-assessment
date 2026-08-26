import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Status } from "@/components/Status";
import { controlsForRisk, data } from "@/lib/data";

export function generateStaticParams() {
  return data.risks.map((risk) => ({ id: risk.risk_id }));
}

export default async function RiskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const risk = data.risks.find((item) => item.risk_id === id);
  if (!risk) notFound();
  const controls = controlsForRisk(risk);
  return (
    <>
      <PageHeader title={`${risk.risk_id}: ${risk.title}`} description="End to end traceability for this provisional risk scenario." actions={<Link className="button" href="/risks">Back to register</Link>} />
      <section className="metric-grid">
        <div className="metric"><span>Inherent risk</span><strong>{risk.inherent_score} / 16</strong><small><Status>{risk.inherent_rating}</Status></small></div>
        <div className="metric"><span>Residual risk</span><strong>{risk.residual_score} / 16</strong><small><Status>{risk.residual_rating}</Status></small></div>
        <div className="metric"><span>Treatment</span><strong>{risk.treatment}</strong><small>{risk.residual_status}</small></div>
        <div className="metric"><span>Status</span><strong>{risk.status}</strong><small>{risk.owner}</small></div>
      </section>
      <div className="trace">
        <div className="trace-step"><span>Feared event</span><strong>{risk.feared_event}</strong></div>
        <div className="trace-step"><span>Risk source</span><strong>{risk.risk_source}</strong></div>
        <div className="trace-step"><span>Strategic scenario</span><strong>{risk.strategic_scenario}</strong></div>
        <div className="trace-step"><span>Operational scenario</span><strong>{risk.operational_scenario}</strong></div>
        <div className="trace-step"><span>NIST controls</span><div>{controls.map((control) => <Link className="table-link" key={control.control_id} href={`/controls/${control.control_id}`}>{control.control_id}{" "}</Link>)}</div></div>
        <div className="trace-step"><span>Evidence</span><strong>{controls.map((control) => control.evidence_required).join("; ")}</strong></div>
        <div className="trace-step"><span>Decision owner</span><strong>{risk.owner}</strong></div>
      </div>
      <section className="section-block" style={{ marginTop: 18 }}><h2>Rationale</h2><p>{risk.rationale}</p></section>
      <section className="section-block"><h2>Mapped controls</h2><div className="table-wrap"><table><thead><tr><th>Control</th><th>Objective</th><th>Reference implementation</th><th>Production status</th></tr></thead><tbody>{controls.map((control) => <tr key={control.control_id}><td>{control.control_id} {control.title}</td><td>{control.control_objective}</td><td>{control.reference_implementation}</td><td><Status>{control.production_status}</Status></td></tr>)}</tbody></table></div></section>
    </>
  );
}
