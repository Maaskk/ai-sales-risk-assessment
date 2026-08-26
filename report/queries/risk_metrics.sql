-- Input table `risks` is imported from risk-register/risks.csv.
SELECT
  COUNT(*) AS risk_count,
  SUM(CASE WHEN inherent_rating = 'Critical' THEN 1 ELSE 0 END) AS critical_count
FROM risks;

SELECT
  inherent_rating AS rating,
  COUNT(*) AS count
FROM risks
GROUP BY inherent_rating
ORDER BY CASE inherent_rating
  WHEN 'Critical' THEN 1
  WHEN 'High' THEN 2
  WHEN 'Medium' THEN 3
  ELSE 4
END;

SELECT
  risk_id,
  title,
  inherent_score AS score,
  treatment,
  'Before pilot' AS target_gate
FROM risks
WHERE inherent_rating = 'Critical'
ORDER BY inherent_score DESC, risk_id ASC;
