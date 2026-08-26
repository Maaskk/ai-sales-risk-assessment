import type { DataTable as TableData } from "@/lib/data";

export function DataTable({ table, limit }: { table: TableData; limit?: number }) {
  const rows = limit ? table.rows.slice(0, limit) : table.rows;
  if (!rows.length) return null;
  return (
    <section className="section-block">
      <h3>{table.heading}</h3>
      <div className="table-wrap">
        <table>
          <thead><tr>{table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${table.heading}-${index}`}>
                {table.headers.map((header) => <td key={header}>{row[header]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
