export function Status({ children }: { children: string }) {
  const normalized = children.toLowerCase();
  const tone = normalized.includes("critical") || normalized.includes("required")
    ? "critical"
    : normalized.includes("high") || normalized.includes("partial") || normalized.includes("question")
      ? "warning"
      : normalized.includes("valid") || normalized.includes("passed") || normalized.includes("confirmed")
        ? "positive"
        : "neutral";
  return <span className={`status status-${tone}`}>{children}</span>;
}
