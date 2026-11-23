# Plan: Vercel production deployment

## Scope and authorization

Deploy the existing application from `enkush-3/Task-Management` to Vercel, provision a free MongoDB database, and connect `task.enkush.site`. The user explicitly requested autonomous execution without further participation. This authorization covers necessary deployment fixes, ordinary remote persistence of those fixes, service provisioning within the free tier, environment configuration, and the requested DNS record. Do not purchase paid products or change unrelated DNS records.

## 1. Map and inspect

- Confirm repository identity, branch, clean status, applicable policies, and any branch protection.
- Review `.planning/codebase/` findings and account/team access. Never emit secret values from the tracked environment file.
- Confirm free MongoDB tier and Vercel routing behavior from current official documentation or live provider interfaces.

## 2. Adapt the application

Implementation owner: one worker owns application/deployment files to avoid overlapping edits.

- Add root deployment/package configuration and an API function entry as required by the selected Vercel layout. Retain frontend Vite static output and API routes on one origin.
- Refactor `backend/app.js` into an import-safe app with reusable cached MongoDB connection logic and a local standalone server entry. Require production secrets from environment variables and return sanitized failures without `process.exit`.
- Add health/readiness and JSON API 404/error handling; limit body size and trim allowed CORS origins.
- Change `frontend/src/api/axios.js` to use `VITE_API_URL` when provided, otherwise same-origin `/api`. Preserve local development through the documented env value or Vite proxy.
- Replace task mutation `Router.use` calls with explicit POST/PATCH/DELETE registration. Add scalar credential validation if needed for safe public auth entry points.
- Stop tracking `backend/.env`, add a placeholder-only `.env.example`, ignore Vercel local metadata, and document deployment configuration without credentials.

## 3. Provision infrastructure

Coordinator owns external changes.

- Use the existing authorized Vercel team. Create or reuse only a project linked to this repository.
- Provision MongoDB Atlas free storage with a new database user restricted to the application database; configure only network access required for Vercel connectivity.
- Generate a new strong `JWT_SECRET`. Store `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL=https://task.enkush.site`, and required runtime values as Vercel environment secrets.
- Use production Node runtime compatible with Vite 8/Mongoose 9. Do not expose secrets via Vite-prefixed variables or tracked files.

## 4. Validate, review, and publish

- Install dependencies and run the frontend production build plus focused backend HTTP checks.
- Have an independent reviewer inspect the final app/config diff for serverless behavior, route methods, credential handling, isolation, and SPA/API routing.
- Resolve critical findings before publication. Inspect status/index, fetch upstream if concurrent edits are possible, respect branch protection, and use the requested git-pushing helper for intended files.
- Create production deployment and inspect deployment state/build logs. Verify live auth/workspace/task CRUD against the new database with temporary test data.

## 5. Connect and verify the domain

- Add `task.enkush.site` to the intended Vercel project, obtain its exact recommended DNS record, and inspect authoritative nameservers.
- Add or update only the requested subdomain DNS record through an already authorized provider. Do not replace apex nameservers or unrelated records.
- Verify DNS resolution, Vercel domain validation, HTTPS certificate, frontend navigation, API health, persistence, and CRUD through the custom domain.

## Acceptance

- Source is cloned locally and deployment fixes are preserved remotely as permitted by repository policy.
- A successful production deployment serves the SPA and working API on `https://task.enkush.site` with valid TLS.
- Registration/login and workspace/task persistence work against a free MongoDB database.
- No secrets are introduced into Git, logs, frontend assets, or the final response.
- Report any genuine access blocker explicitly rather than claiming completion.
