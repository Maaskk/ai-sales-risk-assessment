from __future__ import annotations

from dataclasses import dataclass

import pandas as pd


@dataclass(frozen=True)
class GroupCheck:
    metric_by_group: dict[str, float]
    maximum_gap: float
    threshold: float
    passed: bool


def accuracy_gap(
    frame: pd.DataFrame,
    *,
    group_column: str,
    actual_column: str,
    predicted_column: str,
    threshold: float = 0.20,
    minimum_group_size: int = 20,
) -> GroupCheck:
    metrics: dict[str, float] = {}
    for group, rows in frame.groupby(group_column):
        if len(rows) < minimum_group_size:
            raise ValueError(f"Group {group!r} has fewer than {minimum_group_size} rows")
        metrics[str(group)] = float((rows[actual_column] == rows[predicted_column]).mean())
    if len(metrics) < 2:
        raise ValueError("At least two sufficiently sized groups are required")
    gap = max(metrics.values()) - min(metrics.values())
    return GroupCheck(metrics, gap, threshold, gap <= threshold)
