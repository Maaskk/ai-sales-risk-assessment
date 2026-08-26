import { ControlTable } from "@/components/ControlTable";
import { PageHeader } from "@/components/PageHeader";
import { data } from "@/lib/data";

export default function ControlsPage() {
  const statusCounts = Object.entries(data.controls.reduce<Record<string, number>>((counts, control) => {
    counts[control.production_status] = (counts[control.production_status] ?? 0) + 1;
    return counts;
  }, {}));
  return (
    <>
      <PageHeader title="Controls" description="Implementation status is kept separate from assessment effectiveness." />
      <section className="metric-grid">{statusCounts.map(([status, count]) => <div className="metric" key={status}><span>{status}</span><strong>{count}</strong></div>)}</section>
      <ControlTable controls={data.controls} />
    </>
  );
}
