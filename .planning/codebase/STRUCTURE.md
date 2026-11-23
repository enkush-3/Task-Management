---
last_mapped_commit: 02bb011
---
# Structure

- `frontend/src/api/axios.js`: API base URL and token interceptor.
- `frontend/src/App.jsx`: SPA routes and route guard.
- `frontend/src/pages/dashboard/hooks/`: workspace/task fetching and mutation adapters.
- `backend/app.js`: original monolithic runtime bootstrap.
- `backend/routers.js`: active API module mounts.
- `backend/modules/auth/`: user model, JWT middleware, login/register routes/services.
- `backend/modules/workspace/`: ownership-scoped workspace CRUD and task listing.
- `backend/modules/task/`: creator-scoped task CRUD.
- `backend/modules/folder/`, `note/`, `members/`: additional modules currently not mounted by the router.
- `backend/middleware/Authorization.js`: legacy HTTP middleware with a typo, plus socket auth. Active REST routes use `backend/modules/auth/auth.js` instead.
- `.planning/phases/01-vercel-deployment/PLAN.md`: deployment tasks and acceptance criteria.
