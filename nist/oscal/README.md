# OSCAL control profile

`ai-sales-selected-controls-profile.json` makes the repository's provisional control selection consumable by OSCAL-aware tooling. It imports NIST's official SP 800-53 Rev. 5 OSCAL catalog and includes the same 38 controls listed in `../controls.csv`.

The profile is deliberately a selection only. Organization-specific tailoring, parameters, inherited controls, implementation statements, assessment results, and authorization decisions require confirmed production context and accountable owners.

## Validate

```bash
make oscal-validate
```

The target first confirms that selected identifiers match `../controls.csv`, then invokes NIST OSCAL CLI for model validation. The vendored OSCAL 1.1.3 JSON Profile schema was extracted from NIST's official `oscal-1.1.3.zip` release asset; its SHA-256 is `d14c99b4bc48cb1ef370cd27a78c23e04bab847e737e11f478b37714db30851b`.

Validated locally with NIST OSCAL CLI 1.0.3 (the newest stable CLI release available at build time). The CLI bundles OSCAL 1.1.2 model code, while the profile declares OSCAL 1.1.3; therefore the vendored 1.1.3 schema remains included for reviewer/tooling use and future CLI upgrades.
