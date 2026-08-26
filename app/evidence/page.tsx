import { PageHeader } from "@/components/PageHeader";
import { Status } from "@/components/Status";
import { data } from "@/lib/data";

const artifacts: Record<string, string> = {
  "NIST OSCAL CLI": "/artifacts/oscal-profile.json",
};

export default function EvidencePage() {
  return (
    <>
      <PageHeader title="Evidence" description="Automated test, scan, SBOM and validation results retained by the local lab." />
      <div className="notice warning"><strong>Evidence boundary</strong> Automated checks cover the synthetic repository and local containers. Zero findings does not prove security.</div>
      <div className="table-wrap"><table><thead><tr><th>Check</th><th>Result</th><th>Interpretation</th><th>Artifact</th></tr></thead><tbody>{data.evidence.map((item) => <tr key={item.Check}><td>{item.Check}</td><td><Status>{item.Result}</Status></td><td>{item.Interpretation}</td><td>{artifacts[item.Check] ? <a className="table-link" href={artifacts[item.Check]}>View</a> : "Repository evidence"}</td></tr>)}</tbody></table></div>
      <section className="section-block" style={{ marginTop: 18 }}><h2>Container findings</h2><p>Each lab image currently reports 3 critical and 13 high Debian package advisories. Full JSON evidence remains in the repository and requires reachability and remediation triage.</p></section>
    </>
  );
}
