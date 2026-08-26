import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { data } from "@/lib/data";

export default function AiRmfPage() {
  return (
    <>
      <PageHeader title="NIST AI RMF" description="Governance, context, measurement and management of AI risks." />
      <div className="notice warning"><strong>Evidence boundary</strong> Synthetic accuracy, group performance and drift checks do not establish production suitability.</div>
      <nav className="tabs">{data.ai_rmf.map((section) => <a key={section.name} href={`#${section.name.toLowerCase()}`}>{section.name}</a>)}</nav>
      {data.ai_rmf.map((section) => <section id={section.name.toLowerCase()} key={section.name}><h2 className="section-title">{section.name}</h2><p className="source-note">Source of truth: {section.source}</p>{section.tables.map((table) => <DataTable key={`${section.name}-${table.heading}`} table={table} />)}</section>)}
    </>
  );
}
