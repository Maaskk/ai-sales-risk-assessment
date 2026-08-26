from __future__ import annotations

import numpy as np


def population_stability_index(
    expected: np.ndarray,
    actual: np.ndarray,
    *,
    bins: int = 10,
) -> float:
    expected = np.asarray(expected, dtype=float)
    actual = np.asarray(actual, dtype=float)
    if expected.size == 0 or actual.size == 0:
        raise ValueError("Expected and actual samples must not be empty")
    if bins < 2:
        raise ValueError("At least two bins are required")
    boundaries = np.unique(np.quantile(expected, np.linspace(0, 1, bins + 1)))
    if boundaries.size < 3:
        raise ValueError("Expected sample has insufficient variation")
    boundaries[0], boundaries[-1] = -np.inf, np.inf
    expected_counts, _ = np.histogram(expected, bins=boundaries)
    actual_counts, _ = np.histogram(actual, bins=boundaries)
    epsilon = 1e-6
    expected_ratio = np.clip(expected_counts / expected.size, epsilon, None)
    actual_ratio = np.clip(actual_counts / actual.size, epsilon, None)
    return float(np.sum((actual_ratio - expected_ratio) * np.log(actual_ratio / expected_ratio)))
