"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Risk } from "@/lib/data";
import { Status } from "@/components/Status";

export function RiskTable({ risks }: { risks: Risk[] }) {
  const [rating, setRating] = useState("All");
  const [severity, setSeverity] = useState("All");
  const [source, setSource] = useState("All");
  const [owner, setOwner] = useState("All");
  const [status, setStatus] = useState("All");
  const [family, setFamily] = useState("All");
  const sources = [...new Set(risks.map((risk) => risk.risk_source))];
  const owners = [...new Set(risks.map((risk) => risk.owner))];
  const statuses = [...new Set(risks.map((risk) => risk.status))];
  const families = [...new Set(risks.flatMap((risk) => risk.control_ids.map((control) => control.split("-")[0])))];
  const filtered = useMemo(
    () => risks.filter((risk) =>
      (rating === "All" || risk.inherent_rating === rating) &&
      (severity === "All" || risk.severity === Number(severity)) &&
      (source === "All" || risk.risk_source === source) &&
      (owner === "All" || risk.owner === owner) &&
      (status === "All" || risk.status === status) &&
      (family === "All" || risk.control_ids.some((control) => control.startsWith(`${family}-`))),
    ),
    [family, owner, rating, risks, severity, source, status],
  );
  return (
    <>
      <div className="filters">
        <label>Rating<select value={rating} onChange={(event) => setRating(event.target.value)}><option>All</option>{["Critical", "High", "Medium", "Low"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Severity<select value={severity} onChange={(event) => setSeverity(event.target.value)}><option>All</option>{[4, 3, 2, 1].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Risk source<select value={source} onChange={(event) => setSource(event.target.value)}><option>All</option>{sources.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Owner<select value={owner} onChange={(event) => setOwner(event.target.value)}><option>All</option>{owners.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Control family<select value={family} onChange={(event) => setFamily(event.target.value)}><option>All</option>{families.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Scenario</th><th>Source</th><th>Inherent</th><th>Residual</th><th>Owner</th></tr></thead>
          <tbody>{filtered.map((risk) => (
            <tr key={risk.risk_id}>
              <td><Link className="table-link" href={`/risks/${risk.risk_id}`}>{risk.risk_id}</Link></td>
              <td>{risk.title}</td><td>{risk.risk_source}</td>
              <td><Status>{`${risk.inherent_rating} ${risk.inherent_score}/16`}</Status></td>
              <td><Status>{`${risk.residual_rating} ${risk.residual_score}/16`}</Status></td>
              <td>{risk.owner}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}
