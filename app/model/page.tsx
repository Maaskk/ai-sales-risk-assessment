import { PageHeader } from "@/components/PageHeader";
import { data } from "@/lib/data";

export default function ModelPage() {
  const model = data.model as {
    model_version: string; accuracy: number; rows: number; test_rows: number; model_sha256: string;
    dataset_sha256: string; scikit_learn_version: string; accuracy_by_segment: Record<string, number>; limitations: string[];
  };
  return (
    <>
      <PageHeader title="Model performance" description="Test results and version details for the product prediction model." />
      <div className="notice warning"><strong>Test data</strong> The results come from synthetic records and must not be treated as production performance.</div>
      <section className="metric-grid">
        <div className="metric"><span>Model type</span><strong>Logistic regression</strong><small>Open source scikit-learn {model.scikit_learn_version}</small></div>
        <div className="metric"><span>Accuracy</span><strong>{(model.accuracy * 100).toFixed(1)}%</strong><small>{model.test_rows} holdout rows</small></div>
        <div className="metric"><span>Training rows</span><strong>{model.rows}</strong><small>Synthetic dataset</small></div>
        <div className="metric"><span>Version</span><strong style={{ fontSize: 15 }}>{model.model_version}</strong><small>Exported lab evidence</small></div>
      </section>
      <div className="content-grid">
        <section className="panel"><h2>Group accuracy</h2><div className="risk-bars">{Object.entries(model.accuracy_by_segment).map(([segment, value]) => <div className="bar-row" key={segment}><span>{segment.replaceAll("_", " ")}</span><div className="bar-track"><div className="bar-fill" style={{ width: `${value * 100}%` }} /></div><strong>{Math.round(value * 100)}</strong></div>)}</div></section>
        <section className="panel"><h2>Model files</h2><p><strong>Model digest</strong><br /><code>{model.model_sha256}</code></p><p><strong>Dataset digest</strong><br /><code>{model.dataset_sha256}</code></p><p>MLflow tracks training runs in the local Docker lab. The web application uses the exported model coefficients.</p></section>
      </div>
      <section className="section-block"><h2>Limitations</h2><ul className="plain-list">{model.limitations.map((item) => <li key={item}>{item}</li>)}</ul></section>
    </>
  );
}
