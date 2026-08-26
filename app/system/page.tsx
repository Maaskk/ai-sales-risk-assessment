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
      <PageHeader title="System flow" description="How customer and sales data become a product suggestion for the salesperson." />
      <div className="notice warning"><Status>ASSUMPTION</Status> The technical components must be checked against the company system.</div>
      <div className="content-grid">
        <section className="panel"><h2>Business purpose</h2><p>Help sales staff choose the most relevant product to offer to a customer.</p></section>
        <section className="panel"><h2>Model output</h2><p>A product suggestion, confidence score and customer signals. The seller makes the final decision.</p></section>
      </div>
      <h2 className="section-title">Data and prediction flow</h2>
      <div className="flow">{flow.map(([name, type], index) => <div key={name} style={{ display: "contents" }}><div className="flow-step"><strong>{name}</strong><br /><small>{type}</small></div>{index < flow.length - 1 ? <div className="flow-arrow" aria-hidden="true">→</div> : null}</div>)}</div>
      <h2 className="section-title">Trust boundaries</h2>
      <div className="content-grid">{boundaries.map(([title, text]) => <section className="panel" key={title}><h3>{title}</h3><p>{text}</p></section>)}</div>
      <h2 className="section-title">Architecture files</h2>
      <div className="header-actions">
        <a className="button" href="/artifacts/architecture.drawio" download>Draw.io source</a>
        <a className="button" href="/artifacts/threat-model.json" download>Threat Dragon model</a>
      </div>
    </>
  );
}
