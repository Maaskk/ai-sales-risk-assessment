import rawData from "@/generated/project-data.json";

export type Risk = {
  risk_id: string;
  title: string;
  feared_event: string;
  strategic_scenario: string;
  operational_scenario: string;
  risk_source: string;
  severity: number;
  likelihood: number;
  inherent_score: number;
  inherent_rating: string;
  treatment: string;
  control_ids: string[];
  residual_severity: number;
  residual_likelihood: number;
  residual_score: number;
  residual_rating: string;
  residual_status: string;
  owner: string;
  status: string;
  rationale: string;
};

export type Control = {
  control_id: string;
  title: string;
  risk_ids: string[];
  control_objective: string;
  reference_implementation: string;
  production_status: string;
  evidence_required: string;
  family: string;
};

export type DataTable = {
  heading: string;
  headers: string[];
  rows: Record<string, string>[];
};

export type ProjectData = {
  generated_at: string;
  assessment: { name: string; status: string; description: string };
  risks: Risk[];
  controls: Control[];
  model: Record<string, unknown>;
  evidence: Record<string, string>[];
  workshops: { number: number; title: string; tables: DataTable[]; source: string }[];
  ai_rmf: { name: string; tables: DataTable[]; source: string }[];
  threat_tables: DataTable[];
  assumptions: { status: string; text: string }[];
  oscal: {
    profile_id: string;
    title: string;
    version: string;
    selected_controls: number;
    validation: string;
  };
};

export const data = rawData as ProjectData;

export function risksForControl(controlId: string) {
  return data.risks.filter((risk) => risk.control_ids.includes(controlId));
}

export function controlsForRisk(risk: Risk) {
  return data.controls.filter((control) => risk.control_ids.includes(control.control_id));
}

export function cleanLabel(value: string) {
  return value.replace(/^\[(?:ASSUMPTION|CONFIRMED|OPEN QUESTION|DECISION REQUIRED)\]\s*/i, "");
}
