import { PageHeader } from "@/components/PageHeader";
import { Status } from "@/components/Status";

const flow = [
  ["Customer and CRM data", "Input"],
  ["Sales history", "Input"],
  ["Data preparation", "Process"],
  ["Training pipeline", "Process"],
  ["Model registry", "Store"],
  ["Recommendation API", "Service"],
  ["Sales application", "Interface"],
  ["Salesperson", "Human decision"],
];

const boundaries = [
  ["External supply chain", "Code, packages and models enter the engineering environment."],
  ["Business data to ML", "Customer and sales data enter preparation and training."],
  ["Engineering to production", "An approved model artifact enters the serving environment."],
  ["Model to human", "A recommendation reaches the salesperson, who retains the final decision."],
];

export default function SystemPage() {
  return (
    <>
      <PageHeader title="System" description="Reference architecture, data flow and trust boundaries used by the assessment." />
      <div className="notice warning"><Status>ASSUMPTION</Status> Components must be confirmed through architecture discovery before production use.</div>
      <h2 className="section-title">Reference flow</h2>
      <div className="flow">{flow.map(([name, type], index) => <div key={name} style={{ display: "contents" }}><div className="flow-step"><strong>{name}</strong><br /><small>{type}</small></div>{index < flow.length - 1 ? <div className="flow-arrow" aria-hidden="true">→</div> : null}</div>)}</div>
      <h2 className="section-title">Trust boundaries</h2>
      <div className="content-grid">{boundaries.map(([title, text]) => <section className="panel" key={title}><h3>{title}</h3><p>{text}</p></section>)}</div>
      <h2 className="section-title">Source artifacts</h2>
      <div className="header-actions">
        <a className="button" href="/artifacts/architecture.drawio" download>Draw.io source</a>
        <a className="button" href="/artifacts/threat-model.json" download>Threat Dragon model</a>
      </div>
    </>
  );
}
