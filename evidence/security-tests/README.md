# Security-Test Evidence

The automated suite covers:

- missing/wrong API credentials are rejected;
- malformed/extra/out-of-range input is rejected;
- approved responses require human review and expose version metadata;
- a tampered model artifact fails integrity verification;
- group metric and drift detection procedures produce expected signals.

Save CI output or a sanitized local transcript with commit SHA, environment and date. Do not store secrets or real customer input.
