---
last_mapped_commit: 02bb011
---
# Architecture

- `frontend/src/App.jsx` defines `/login`, `/register`, and an authenticated dashboard at `/` using React Router browser history.
- `frontend/src/context/authcontext.jsx` performs register/login and persists bearer tokens in localStorage; Axios adds `Authorization` automatically.
- Dashboard hooks under `frontend/src/pages/dashboard/hooks/` call REST endpoints and refresh state after mutations.
- `backend/app.js` currently constructs Express, HTTP and Socket.IO servers, connects MongoDB, mounts the router, and listens on port 3000 as an import side effect.
- `backend/routers.js` mounts only `/auth`, `/workspace`, and `/task` under `/api`.
- Backend routes delegate to service modules; Mongoose models persist users, workspaces, and tasks. Workspace ownership and task creator filters enforce active-route user isolation.
- Required deployment boundary: export an import-safe Express app, reuse a cached database connection per warm function, and retain local listening/socket startup in a separate entry or direct-invocation path.
- A Vercel API function can import that app while Vite static output serves the frontend. SPA rewrites must follow API routing so `/api` failures remain JSON errors rather than index HTML.
