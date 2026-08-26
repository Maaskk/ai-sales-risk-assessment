import model from "@/generated/model-export.json";

export type RecommendationInput = {
  customer_reference: string;
  segment: "consumer" | "small_business" | "enterprise";
  region: "north" | "south" | "east" | "west";
  tenure_months: number;
  purchases_90d: number;
  avg_order_value: number;
  support_contacts_90d: number;
  days_since_last_purchase: number;
};

export type Recommendation = {
  recommendation_id: string;
  recommended_product: string;
  confidence: number;
  model_version: string;
  reason_codes: string[];
  human_review_required: true;
};

type ExportedModel = {
  model_version: string;
  categorical: { name: "segment" | "region"; categories: string[] }[];
  numeric: {
    name: keyof Omit<RecommendationInput, "customer_reference" | "segment" | "region">;
    mean: number;
    scale: number;
  }[];
  classes: string[];
  coefficients: number[][];
  intercepts: number[];
};

const exported = model as ExportedModel;

export function validateInput(value: unknown): RecommendationInput {
  if (!value || typeof value !== "object") throw new Error("Request body is required.");
  const input = value as Record<string, unknown>;
  const customerReference = String(input.customer_reference ?? "");
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(customerReference)) {
    throw new Error("Customer reference must use 1 to 64 letters, numbers, underscores or hyphens.");
  }
  if (!["consumer", "small_business", "enterprise"].includes(String(input.segment))) {
    throw new Error("Select a valid segment.");
  }
  if (!["north", "south", "east", "west"].includes(String(input.region))) {
    throw new Error("Select a valid region.");
  }
  const ranges: Record<string, [number, number]> = {
    tenure_months: [0, 600],
    purchases_90d: [0, 500],
    avg_order_value: [0, 1_000_000],
    support_contacts_90d: [0, 100],
    days_since_last_purchase: [0, 3650],
  };
  const numeric: Record<string, number> = {};
  for (const [key, [minimum, maximum]] of Object.entries(ranges)) {
    const candidate = Number(input[key]);
    if (!Number.isFinite(candidate) || candidate < minimum || candidate > maximum) {
      throw new Error(`${key.replaceAll("_", " ")} is outside the accepted range.`);
    }
    numeric[key] = candidate;
  }
  return {
    customer_reference: customerReference,
    segment: input.segment as RecommendationInput["segment"],
    region: input.region as RecommendationInput["region"],
    tenure_months: numeric.tenure_months,
    purchases_90d: numeric.purchases_90d,
    avg_order_value: numeric.avg_order_value,
    support_contacts_90d: numeric.support_contacts_90d,
    days_since_last_purchase: numeric.days_since_last_purchase,
  };
}

export function predict(input: RecommendationInput): Recommendation {
  const encoded: number[] = [];
  for (const feature of exported.categorical) {
    const selected = input[feature.name];
    encoded.push(...feature.categories.map((category) => (category === selected ? 1 : 0)));
  }
  for (const feature of exported.numeric) {
    encoded.push((input[feature.name] - feature.mean) / feature.scale);
  }
  const logits = exported.coefficients.map(
    (row, classIndex) =>
      exported.intercepts[classIndex] +
      row.reduce((total, coefficient, index) => total + coefficient * encoded[index], 0),
  );
  const maximum = Math.max(...logits);
  const exponentials = logits.map((value) => Math.exp(value - maximum));
  const total = exponentials.reduce((sum, value) => sum + value, 0);
  const probabilities = exponentials.map((value) => value / total);
  const bestIndex = probabilities.indexOf(Math.max(...probabilities));
  const reasons: [number, string][] = [
    [input.purchases_90d, "Recent purchase activity"],
    [input.avg_order_value / 100, "Order value pattern"],
    [input.tenure_months / 12, "Relationship tenure"],
  ];
  return {
    recommendation_id: crypto.randomUUID(),
    recommended_product: exported.classes[bestIndex],
    confidence: Number(probabilities[bestIndex].toFixed(4)),
    model_version: exported.model_version,
    reason_codes: reasons.sort((left, right) => right[0] - left[0]).slice(0, 2).map((item) => item[1]),
    human_review_required: true,
  };
}
