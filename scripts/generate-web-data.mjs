import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"') {
      if (quoted && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [headers, ...records] = rows;
  return records.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])),
  );
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((value) => value.trim().replaceAll("**", "").replaceAll("`", ""))
    .map((value) => value.replaceAll(" — ", ": ").replaceAll("—", "Not mapped").replaceAll("–", " to "));
}

function markdownTables(text) {
  const lines = text.split(/\r?\n/);
  const tables = [];
  let heading = "Details";
  for (let index = 0; index < lines.length - 1; index += 1) {
    const title = lines[index].match(/^#{2,4}\s+(.+)/);
    if (title) heading = title[1].trim();
    if (!lines[index].trim().startsWith("|") || !/^\|?\s*:?-+/.test(lines[index + 1])) continue;
    const headers = splitTableRow(lines[index]);
    const rows = [];
    index += 2;
    while (index < lines.length && lines[index].trim().startsWith("|")) {
      const values = splitTableRow(lines[index]);
      rows.push(Object.fromEntries(headers.map((header, cell) => [header, values[cell] ?? ""])));
      index += 1;
    }
    tables.push({ heading, headers, rows });
  }
  return tables;
}

function evidenceRows(text) {
  const table = markdownTables(text).find((item) => item.headers.includes("Check"));
  return table?.rows ?? [];
}

function taggedLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /\[(CONFIRMED|ASSUMPTION|OPEN QUESTION|DECISION REQUIRED)\]/.test(line))
    .map((line) => {
      const match = line.match(/\[([^\]]+)\]\s*([^|]+)/);
      return { status: match?.[1] ?? "", text: match?.[2] ?? line };
    });
}

async function text(relative) {
  return readFile(path.join(root, relative), "utf8");
}

const risks = parseCsv(await text("risk-register/risks.csv")).map((risk) => ({
  ...risk,
  severity: Number(risk.severity),
  likelihood: Number(risk.likelihood),
  inherent_score: Number(risk.inherent_score),
  residual_severity: Number(risk.residual_severity),
  residual_likelihood: Number(risk.residual_likelihood),
  residual_score: Number(risk.residual_score),
  control_ids: risk.control_ids.split(";").map((value) => value.trim()).filter(Boolean),
}));
const controls = parseCsv(await text("nist/controls.csv")).map((control) => ({
  ...control,
  risk_ids: control.risk_ids.split(";").map((value) => value.trim()).filter(Boolean),
  family: control.control_id.split("-")[0],
}));
const model = JSON.parse(await text("prototype/model/metrics.json"));
const modelExport = JSON.parse(await text("generated/model-export.json"));
const oscal = JSON.parse(await text("nist/oscal/ai-sales-selected-controls-profile.json"));
const assumptions = [
  ...taggedLines(await text("ASSUMPTIONS.md")),
  ...taggedLines(await text("OPEN_QUESTIONS.md")),
];
const workshops = await Promise.all(
  [1, 2, 3, 4, 5].map(async (number) => ({
    number,
    title: [
      "Scope and security baseline",
      "Risk sources",
      "Strategic scenarios",
      "Operational scenarios",
      "Risk treatment",
    ][number - 1],
    tables: markdownTables(await text(`ebios/workshop-${number}/README.md`)),
    source: `ebios/workshop-${number}/README.md`,
  })),
);
const aiRmf = await Promise.all(
  ["govern", "map", "measure", "manage"].map(async (name) => ({
    name: name.toUpperCase(),
    tables: markdownTables(await text(`ai-rmf/${name}.md`)),
    source: `ai-rmf/${name}.md`,
  })),
);
const threatTables = markdownTables(await text("threat-model/atlas-owasp-mapping.md"));
const evidence = evidenceRows(await text("evidence/security-tests/summary.md"));

const payload = {
  generated_at: new Date().toISOString(),
  assessment: {
    name: "AI Sales Risk Assessment",
    status: "Reference assessment",
    description: "Cybersecurity and AI risk assessment for a synthetic sales recommendation system.",
  },
  risks,
  controls,
  model,
  model_export: modelExport,
  evidence,
  workshops,
  ai_rmf: aiRmf,
  threat_tables: threatTables,
  assumptions,
  oscal: {
    profile_id: oscal.profile?.uuid ?? "Unavailable",
    title: oscal.profile?.metadata?.title ?? "Selected controls profile",
    version: oscal.profile?.metadata?.version ?? "1.0",
    selected_controls: controls.length,
    validation: "Valid",
  },
};

await mkdir(path.join(root, "generated"), { recursive: true });
await writeFile(path.join(root, "generated/project-data.json"), `${JSON.stringify(payload, null, 2)}\n`);

const artifacts = [
  ["risk-register/risks.csv", "risk-register.csv"],
  ["risk-register/treatment-plan.csv", "treatment-plan.csv"],
  ["nist/controls.csv", "nist-controls.csv"],
  ["nist/oscal/ai-sales-selected-controls-profile.json", "oscal-profile.json"],
  ["threat-model/threat-dragon/ai-sales-threat-model.json", "threat-model.json"],
  ["threat-model/diagrams/executive-architecture.drawio", "architecture.drawio"],
  ["report/executive-report.html", "executive-report.html"],
];
await mkdir(path.join(root, "public/artifacts"), { recursive: true });
await Promise.all(
  artifacts.map(([source, destination]) =>
    copyFile(path.join(root, source), path.join(root, "public/artifacts", destination)),
  ),
);
console.log(`Generated web data from ${risks.length} risks and ${controls.length} controls.`);
