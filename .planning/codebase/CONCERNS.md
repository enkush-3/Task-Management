---
last_mapped_commit: 02bb011
---
# Deployment concerns

## Must resolve before public deployment

- `backend/.env` is tracked. Remove from tracking and replace production database/JWT credentials with newly generated values; do not reuse or print tracked values.
- `frontend/src/api/axios.js` points to localhost, preventing remote API access.
- `backend/app.js` has permanent-server import side effects and exits the process on MongoDB failure. Vercel requires an import-safe handler and request-safe connection lifecycle.
- `backend/modules/task/routes.js` uses `Router.use` for mutation handlers. This permits inappropriate methods, including authenticated GET requests reaching deletion. Register explicit POST/PATCH/DELETE methods.
- Unknown API URLs must not fall through to SPA HTML; provide API JSON 404 handling.

## Existing limitations to preserve or assess separately

- Socket.IO cannot be served as a permanent server by ordinary Vercel Functions. Current frontend does not depend on it; retain sockets only in local standalone mode.
- Active auth services lack strict scalar input validation; reject object-valued credentials to avoid query-selector input and inconsistent errors when hardening public entry points.
- Task create ignores a supplied `endAt`; unrelated to deployment unless smoke testing demonstrates a blocking workflow defect.
- Workspace patch returns success with null when the user does not own the workspace; owner filters prevent unauthorized writes, but response semantics could be improved separately.
- Legacy HTTP Authorization middleware has a typo but is not used by active REST routes.
- No original automated backend suite exists. Live CRUD and routing validation are necessary before declaring completion.
