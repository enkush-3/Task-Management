---
last_mapped_commit: 02bb011
---
# Deployment integrations

- MongoDB is accessed through Mongoose models. `backend/app.js` reads `MONGODB_URI` with a localhost fallback.
- `backend/modules/auth/service.js` and `backend/modules/auth/auth.js` require `JWT_SECRET` for seven-day bearer tokens.
- `backend/app.js` reads comma-separated `CLIENT_URL` values for CORS. Origin strings currently are not trimmed.
- `frontend/src/api/axios.js` hardcodes `http://localhost:3000/api`; change to configurable same-origin `/api` for deployment.
- Backend Socket.IO infrastructure exists, but active frontend source has no socket client. Active workspace updates only emit when `app.get('io')` exists.
- Target infrastructure: Vercel project, free MongoDB Atlas database, and `task.enkush.site` DNS/TLS. Never store provisioning credentials or connection-string values in this map.
- `backend/.env` is tracked in the original Git checkout despite `.gitignore`; stop tracking it and generate new production credentials.
