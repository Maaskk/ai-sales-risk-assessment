import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { data } from "@/lib/data";

const boundaries = ["Open source ecosystem", "Data and ML environment", "Model promotion", "Recommendation and human decision"];

export default function ThreatModelPage() {
  return (
    <>
      <PageHeader title="Threat Model" description="Strategic and operational scenarios linked to AI specific threat research." actions={<><a className="button" href="/artifacts/threat-model.json" download>Threat Dragon</a><a className="button" href="/artifacts/architecture.drawio" download>Draw.io</a></>} />
      <section className="content-grid">{boundaries.map((boundary) => <div className="panel" key={boundary}><h3>{boundary}</h3><p>Reference trust boundary. Confirm data flows, ownership and enforcement with the system team.</p></div>)}</section>
      <div className="notice"><strong>Research use</strong> MITRE ATLAS and OWASP ML mappings validate plausible techniques. They do not replace EBIOS RM scoring or organizational controls.</div>
      {data.threat_tables.map((table) => <DataTable key={table.heading} table={table} />)}
    </>
  );
}
