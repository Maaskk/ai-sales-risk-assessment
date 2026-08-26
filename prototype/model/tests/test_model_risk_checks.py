import numpy as np
import pandas as pd

from prototype.model.drift_check import population_stability_index
from prototype.model.fairness_check import accuracy_gap


def test_accuracy_gap_passes_equal_groups():
    frame = pd.DataFrame(
        {
            "group": ["a"] * 20 + ["b"] * 20,
            "actual": [1] * 40,
            "predicted": ([1] * 18 + [0] * 2) * 2,
        }
    )
    result = accuracy_gap(
        frame,
        group_column="group",
        actual_column="actual",
        predicted_column="predicted",
        threshold=0.05,
    )
    assert result.passed
    assert result.maximum_gap == 0


def test_population_stability_index_detects_shift():
    rng = np.random.default_rng(42)
    baseline = rng.normal(0, 1, 2_000)
    stable = rng.normal(0, 1, 2_000)
    shifted = rng.normal(2, 1, 2_000)
    assert population_stability_index(baseline, stable) < 0.1
    assert population_stability_index(baseline, shifted) > 0.25
