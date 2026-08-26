# GitHub hardening checklist

Record the verification date and evidence before marking a setting complete.

## Repository rules

- Protect `main` with a ruleset.
- Require pull requests and at least one approval.
- Dismiss stale approvals after new commits.
- Require the `CI` and `Container security` checks.
- Block force pushes and branch deletion.

## Security features

- Enable Dependabot alerts and security updates.
- Enable secret scanning and push protection when available.
- Enable private vulnerability reporting.
- Keep workflow permissions read only unless a job needs a narrower write permission.

## Review ownership

- Replace the placeholder CODEOWNER with accountable project reviewers.
- Use the pull request template for changes to risk scores, control status or evidence claims.
- Store restricted production evidence outside the public repository.

These settings are not claimed as enabled until they are verified in GitHub.
