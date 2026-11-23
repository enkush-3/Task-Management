---
last_mapped_commit: 02bb011
---
# Validation

- `backend/package.json` has only a placeholder failing `test` script. No original backend tests were found.
- `frontend/package.json` offers `build` and `lint`. The original checkout has no dedicated frontend test suite.
- Run clean dependency installs using the chosen deployment layout, then the production Vite build.
- Add focused HTTP checks for import-safe serverless startup, health/readiness, missing/invalid bearer tokens, supported mutation methods, and safe database failure handling.
- Use a fresh test account on the provisioned database to verify registration, login, workspace create/update/list/delete, task create/update/list/delete, and persistence across requests.
- Verify cross-user access denial using a second test account where practical. Clean up test task/workspace data and avoid logging passwords/tokens.
- Verify live `/login`, `/register`, frontend assets, API JSON routing, HTTPS, custom-domain certificate, and DNS resolution.
- Report existing unrelated lint failures separately from deployment regressions; do not expand this task into an unrelated UI refactor.
