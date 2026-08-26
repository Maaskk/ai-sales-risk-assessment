import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Status } from "@/components/Status";
import { data, risksForControl } from "@/lib/data";

export function generateStaticParams() {
  return data.controls.map((control) => ({ id: control.control_id }));
}

export default async function ControlDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const control = data.controls.find((item) => item.control_id === id);
  if (!control) notFound();
  const risks = risksForControl(control.control_id);
  return (
    <>
      <PageHeader title={`${control.control_id}: ${control.title}`} description="Control objective, reference implementation, related risks and evidence needs." actions={<Link className="button" href="/controls">Back to controls</Link>} />
      <section className="metric-grid">
        <div className="metric"><span>Family</span><strong>{control.family}</strong></div>
        <div className="metric"><span>Related risks</span><strong>{risks.length}</strong></div>
        <div className="metric"><span>Production status</span><strong style={{ fontSize: 15 }}><Status>{control.production_status}</Status></strong></div>
      </section>
      <section className="section-block"><h2>Objective</h2><p>{control.control_objective}</p></section>
      <section className="section-block"><h2>Reference implementation</h2><p>{control.reference_implementation}</p></section>
      <section className="section-block"><h2>Required evidence</h2><p>{control.evidence_required}</p></section>
      <section className="section-block"><h2>Related risks</h2><div className="table-wrap"><table><thead><tr><th>Risk</th><th>Scenario</th><th>Inherent</th><th>Residual</th></tr></thead><tbody>{risks.map((risk) => <tr key={risk.risk_id}><td><Link className="table-link" href={`/risks/${risk.risk_id}`}>{risk.risk_id}</Link></td><td>{risk.title}</td><td>{risk.inherent_rating} {risk.inherent_score}/16</td><td>{risk.residual_rating} {risk.residual_score}/16</td></tr>)}</tbody></table></div></section>
    </>
  );
}
