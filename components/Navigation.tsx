import Link from "next/link";

const sections = [
  { label: "Sales workspace", links: [["Dashboard", "/"], ["New recommendation", "/demo"], ["Model performance", "/model"], ["System flow", "/system"]] },
  { label: "Risk and governance", links: [["Risk analysis", "/risks"], ["Controls", "/controls"], ["Evidence", "/evidence"], ["EBIOS RM", "/ebios"], ["NIST RMF", "/nist"], ["AI RMF", "/ai-rmf"], ["Threat model", "/threat-model"], ["Reports", "/reports"], ["Assumptions", "/assumptions"]] },
];

export function Navigation() {
  return (
    <>
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span>Internal sales</span>
          <strong>Product Recommendation</strong>
        </Link>
        <nav aria-label="Primary navigation">
          {sections.map((section) => <div className="nav-section" key={section.label}><p>{section.label}</p>{section.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>)}
        </nav>
        <Link className="presentation-link" href="/presentation">Presentation</Link>
      </aside>
      <details className="mobile-nav">
        <summary>Sales Recommendation</summary>
        <nav aria-label="Mobile navigation">
          {sections.flatMap((section) => section.links).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/presentation">Presentation</Link>
        </nav>
      </details>
    </>
  );
}
