import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { data } from "@/lib/data";

export default function EbiosPage() {
  return (
    <>
      <PageHeader title="EBIOS RM" description="Five linked workshops, from scope and feared events to treatment decisions." />
      <div className="notice warning"><strong>Validation status</strong> Scenario content and scores are provisional until facilitated workshops with accountable stakeholders.</div>
      <nav className="tabs" aria-label="Workshop sections">{data.workshops.map((workshop) => <a key={workshop.number} href={`#workshop-${workshop.number}`}>Workshop {workshop.number}</a>)}</nav>
      {data.workshops.map((workshop) => (
        <section id={`workshop-${workshop.number}`} key={workshop.number}>
          <h2 className="section-title">Workshop {workshop.number}: {workshop.title}</h2>
          <p className="source-note">Source of truth: {workshop.source}</p>
          {workshop.tables.length ? workshop.tables.map((table) => <DataTable key={`${workshop.number}-${table.heading}`} table={table} />) : <div className="section-block">No structured table is available in the source artifact.</div>}
        </section>
      ))}
    </>
  );
}
