---
last_mapped_commit: 02bb011
---
# Deployment stack

- `frontend/package.json`: React 19, React Router 7, Vite 8, Tailwind 4; ESM JavaScript/JSX. Build command: `npm run build`; output: `frontend/dist`.
- `backend/package.json`: Express 5, Mongoose 9, bcrypt 6, jsonwebtoken 9, dotenv 17, Socket.IO 4; ESM JavaScript. Local entry: `backend/app.js`.
- Node 22 or newer is appropriate for current dependencies; available local runtime is Node 24.
- Independent npm lockfiles exist under `frontend/` and `backend/`; no root package or Vercel configuration exists in the original checkout.
- Existing Docker/Nginx configuration targets a permanent server deployment rather than Vercel Functions.
