import { PageHeader } from "@/components/PageHeader";
import { RiskMatrix } from "@/components/RiskMatrix";
import { RiskTable } from "@/components/RiskTable";
import { data } from "@/lib/data";

export default function RisksPage() {
  return (
    <>
      <PageHeader title="Risk Register" description="Provisional EBIOS scenarios with control and evidence traceability." actions={<a className="button" href="/artifacts/risk-register.csv" download>Export CSV</a>} />
      <div className="notice warning"><strong>Scoring</strong> The 4 × 4 scores are workshop inputs. They are not measured probabilities or approved risk acceptance.</div>
      <section className="section-block"><h2>Inherent risk matrix</h2><RiskMatrix risks={data.risks} /></section>
      <section className="section-block"><h2>Residual risk matrix</h2><p>Projected results assume the listed treatments are implemented and effective.</p><RiskMatrix risks={data.risks} mode="residual" /></section>
      <h2 className="section-title">All risks</h2>
      <RiskTable risks={data.risks} />
    </>
  );
}
