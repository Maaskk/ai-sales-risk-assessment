# Generated Synthetic Model Card

## Intended use

Demonstrate security and AI-risk assessment procedures for a synthetic sales recommendation classifier. It must not be used for real customers or automated decisions.

## Version and provenance

- Model: `synthetic-20260826133013`
- Dataset SHA-256: `638133b3aa94798b06d2680e1486a047e397d2926a69d364add4022c874fc817`
- Model SHA-256: `061650daf641ec2c8001e0a116838ca026479301d15d10f1fca8f1a9d70284d1`
- Rows: 900; holdout rows: 225

## Demonstration metrics

- Overall accuracy: 0.649
- `consumer` accuracy: 0.519
- `enterprise` accuracy: 0.657
- `small_business` accuracy: 0.769

## Limitations

- Synthetic relationships and labels have no real-world validity.
- The split is random rather than temporal.
- Accuracy does not measure calibration, business benefit, fairness, privacy, security or customer harm.
- Reason codes in the API are feature cues, not causal explanations.
- A human must review every recommendation.
