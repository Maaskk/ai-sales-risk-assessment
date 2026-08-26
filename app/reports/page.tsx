import { PageHeader } from "@/components/PageHeader";

const reports = [
  ["Executive summary", "Decision focused overview of the reference assessment.", "/artifacts/executive-report.html"],
  ["Risk register", "Provisional scenarios, scores, treatments and ownership gaps.", "/artifacts/risk-register.csv"],
  ["Treatment plan", "Reference measures, target gates and residual risk.", "/artifacts/treatment-plan.csv"],
  ["NIST control mapping", "Selected SP 800-53 controls and required evidence.", "/artifacts/nist-controls.csv"],
  ["OSCAL profile", "Machine readable selected control profile.", "/artifacts/oscal-profile.json"],
  ["Threat model", "OWASP Threat Dragon source model.", "/artifacts/threat-model.json"],
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Assessment outputs generated from the same repository sources used by the dashboard." />
      <div className="content-grid">{reports.map(([name, description, href]) => <section className="panel" key={name}><h2>{name}</h2><p>{description}</p><a className="button" href={href}>Open artifact</a></section>)}</div>
    </>
  );
}
