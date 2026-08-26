import { DemoForm } from "@/components/DemoForm";
import { PageHeader } from "@/components/PageHeader";

export default function DemoPage() {
  return (
    <>
      <PageHeader title="AI Recommendation Demo" description="Run the existing synthetic classifier through the integrated application." />
      <div className="notice warning"><strong>Synthetic data only</strong> Do not enter names, account numbers, customer records or company information.</div>
      <DemoForm />
    </>
  );
}
