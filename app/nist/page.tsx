import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

const phases = [
  ["Prepare", "Define context, stakeholders, assumptions and assessment boundaries."],
  ["Categorize", "Confirm information types and impact with business and privacy owners."],
  ["Select", "Tailor controls to identified risks and organizational requirements."],
  ["Implement", "Record how each selected control is implemented and by whom."],
  ["Assess", "Examine, interview and test controls against defined procedures."],
  ["Authorize", "An accountable official decides whether residual risk is acceptable."],
  ["Monitor", "Track change, evidence, findings, model drift and risk conditions."],
];

export default function NistPage() {
  return (
    <>
      <PageHeader title="NIST RMF" description="Security and privacy lifecycle applied to the reference assessment." />
      <div className="notice"><strong>Method boundary</strong> RMF structures control selection, assessment and authorization. EBIOS RM provides the scenario analysis.</div>
      <div className="flow">{phases.map(([phase], index) => <div key={phase} style={{ display: "contents" }}><div className="flow-step"><strong>{phase}</strong><br /><small>Phase {index + 1}</small></div>{index < phases.length - 1 ? <div className="flow-arrow">→</div> : null}</div>)}</div>
      <div className="content-grid" style={{ marginTop: 22 }}>{phases.map(([phase, description]) => <section className="panel" key={phase}><h3>{phase}</h3><p>{description}</p></section>)}</div>
      <div className="header-actions">
        <Link className="button primary" href="/nist/controls">SP 800-53 controls</Link>
        <Link className="button" href="/nist/oscal">OSCAL profile</Link>
        <a className="button" href="/artifacts/nist-controls.csv" download>Download mapping</a>
      </div>
    </>
  );
}
