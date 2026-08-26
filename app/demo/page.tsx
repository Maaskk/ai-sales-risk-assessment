import { DemoForm } from "@/components/DemoForm";
import { PageHeader } from "@/components/PageHeader";

export default function DemoPage() {
  return (
    <>
      <PageHeader title="New product recommendation" description="Enter customer activity and sales history to calculate the product suggestion." />
      <div className="notice warning"><strong>Use synthetic data only</strong> Do not enter customer names, account numbers or company records.</div>
      <DemoForm />
    </>
  );
}
