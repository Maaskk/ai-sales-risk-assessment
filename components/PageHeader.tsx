import type { ReactNode } from "react";

export function PageHeader({ title, description, actions, eyebrow = "Internal sales recommendation system" }: { title: string; description: string; actions?: ReactNode; eyebrow?: string }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions ? <div className="header-actions">{actions}</div> : null}
    </header>
  );
}
