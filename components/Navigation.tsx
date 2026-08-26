import Link from "next/link";

const links = [
  ["Dashboard", "/"],
  ["System", "/system"],
  ["EBIOS RM", "/ebios"],
  ["Risks", "/risks"],
  ["NIST", "/nist"],
  ["AI RMF", "/ai-rmf"],
  ["Threat Model", "/threat-model"],
  ["AI Demo", "/demo"],
  ["Model", "/model"],
  ["Evidence", "/evidence"],
  ["Controls", "/controls"],
  ["Reports", "/reports"],
  ["Assumptions", "/assumptions"],
];

export function Navigation() {
  return (
    <>
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span>AI Sales</span>
          <strong>Risk Assessment</strong>
        </Link>
        <nav aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <Link className="presentation-link" href="/presentation">Presentation</Link>
      </aside>
      <details className="mobile-nav">
        <summary>AI Sales Risk Assessment</summary>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
          <Link href="/presentation">Presentation</Link>
        </nav>
      </details>
    </>
  );
}
