import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const model = JSON.parse(await readFile(new URL("../../generated/model-export.json", import.meta.url)));

function score(input) {
  const encoded = [];
  for (const feature of model.categorical) {
    encoded.push(...feature.categories.map((category) => category === input[feature.name] ? 1 : 0));
  }
  for (const feature of model.numeric) {
    encoded.push((input[feature.name] - feature.mean) / feature.scale);
  }
  const logits = model.coefficients.map((row, classIndex) =>
    model.intercepts[classIndex] + row.reduce((sum, value, index) => sum + value * encoded[index], 0),
  );
  const maximum = Math.max(...logits);
  const exponentials = logits.map((value) => Math.exp(value - maximum));
  const total = exponentials.reduce((sum, value) => sum + value, 0);
  const probabilities = exponentials.map((value) => value / total);
  const best = probabilities.indexOf(Math.max(...probabilities));
  return { class: model.classes[best], confidence: probabilities[best] };
}

test("web inference matches scikit-learn verification vectors", () => {
  for (const vector of model.verification_vectors) {
    const actual = score(vector.input);
    assert.equal(actual.class, vector.class);
    assert.ok(Math.abs(actual.confidence - vector.confidence) < 1e-12);
  }
});

test("model export contains provenance fields", () => {
  assert.equal(model.format, "sklearn-logistic-regression-export-v1");
  assert.match(model.dataset_sha256, /^[a-f0-9]{64}$/);
  assert.equal(model.classes.length, 3);
});
