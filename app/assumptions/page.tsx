import { PageHeader } from "@/components/PageHeader";
import { Status } from "@/components/Status";
import { data } from "@/lib/data";

const categories = ["CONFIRMED", "ASSUMPTION", "OPEN QUESTION", "DECISION REQUIRED"];

export default function AssumptionsPage() {
  return (
    <>
      <PageHeader title="Assumptions and Decisions" description="Known facts are kept separate from working assumptions, questions and required decisions." />
      {categories.map((category) => {
        const items = data.assumptions.filter((item) => item.status === category);
        return <section className="section-block" key={category}><h2><Status>{category}</Status> {items.length}</h2>{items.length ? <ul className="plain-list">{items.map((item, index) => <li key={`${category}-${index}`}>{item.text}</li>)}</ul> : <p>No items recorded in the source files.</p>}</section>;
      })}
    </>
  );
}
