import { PageHeader } from "@/components/PageHeader";
import { Status } from "@/components/Status";
import { data } from "@/lib/data";

export default function OscalPage() {
  return (
    <>
      <PageHeader title="OSCAL" description="Machine readable representation of the selected control set." actions={<a className="button" href="/artifacts/oscal-profile.json" download>Download profile</a>} />
      <div className="notice"><strong>Purpose</strong> OSCAL supports consistent control information. It is not a risk analysis method.</div>
      <section className="metric-grid">
        <div className="metric"><span>Profile version</span><strong>{data.oscal.version}</strong></div>
        <div className="metric"><span>Selected controls</span><strong>{data.oscal.selected_controls}</strong></div>
        <div className="metric"><span>Validation</span><strong><Status>{data.oscal.validation}</Status></strong></div>
        <div className="metric"><span>Consistency</span><strong>Exact match</strong><small>OSCAL and controls.csv</small></div>
      </section>
      <section className="section-block"><h2>{data.oscal.title}</h2><p>Profile identifier</p><code>{data.oscal.profile_id}</code></section>
    </>
  );
}
