import { ControlTable } from "@/components/ControlTable";
import { PageHeader } from "@/components/PageHeader";
import { data } from "@/lib/data";

export default function NistControlsPage() {
  return (
    <>
      <PageHeader title="SP 800-53 Controls" description="Selected controls, related risks, reference implementation and required evidence." actions={<a className="button" href="/artifacts/nist-controls.csv" download>Export CSV</a>} />
      <div className="notice warning"><strong>Scope</strong> This selection is not a formal baseline and does not establish compliance.</div>
      <ControlTable controls={data.controls} />
    </>
  );
}
