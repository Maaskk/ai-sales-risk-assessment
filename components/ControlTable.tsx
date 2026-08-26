"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Control } from "@/lib/data";
import { Status } from "@/components/Status";

export function ControlTable({ controls }: { controls: Control[] }) {
  const [family, setFamily] = useState("All");
  const [status, setStatus] = useState("All");
  const families = [...new Set(controls.map((control) => control.family))];
  const statuses = [...new Set(controls.map((control) => control.production_status))];
  const filtered = useMemo(() => controls.filter((control) =>
    (family === "All" || control.family === family) &&
    (status === "All" || control.production_status === status),
  ), [controls, family, status]);
  return (
    <>
      <div className="filters">
        <label>Family<select value={family} onChange={(event) => setFamily(event.target.value)}><option>All</option>{families.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Production status<select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <div className="table-wrap"><table><thead><tr><th>Control</th><th>Objective</th><th>Risks</th><th>Status</th><th>Required evidence</th></tr></thead>
        <tbody>{filtered.map((control) => <tr key={control.control_id} id={control.control_id}>
          <td><Link className="table-link" href={`/controls/${control.control_id}`}>{control.control_id}</Link><br />{control.title}</td>
          <td>{control.control_objective}</td><td>{control.risk_ids.join(", ")}</td><td><Status>{control.production_status}</Status></td><td>{control.evidence_required}</td>
        </tr>)}</tbody></table></div>
    </>
  );
}
