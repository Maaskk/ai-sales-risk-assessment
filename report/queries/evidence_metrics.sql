-- Input row is assembled from the JUnit, Trivy and triage evidence referenced by
-- evidence/security-tests/summary.md.
SELECT
  passing_tests,
  unfixed_critical,
  unfixed_high
FROM automated_evidence;
