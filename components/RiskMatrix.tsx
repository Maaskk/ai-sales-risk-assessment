import Link from "next/link";
import type { Risk } from "@/lib/data";

export function RiskMatrix({ risks, mode = "inherent" }: { risks: Risk[]; mode?: "inherent" | "residual" }) {
  return (
    <div className="risk-matrix" aria-label={`${mode} risk matrix`}>
      {[4, 3, 2, 1].map((severity) =>
        [1, 2, 3, 4].map((likelihood) => {
          const matches = risks.filter((risk) =>
            mode === "inherent"
              ? risk.severity === severity && risk.likelihood === likelihood
              : risk.residual_severity === severity && risk.residual_likelihood === likelihood,
          );
          const score = severity * likelihood;
          return (
            <div className={`matrix-cell score-${score}`} key={`${severity}-${likelihood}`}>
              <span>{severity} × {likelihood}</span>
              <div>
                {matches.map((risk) => <Link key={risk.risk_id} href={`/risks/${risk.risk_id}`}>{risk.risk_id}</Link>)}
              </div>
            </div>
          );
        }),
      )}
    </div>
  );
}
