---
last_mapped_commit: 02bb011
---
# Conventions

- ESM imports with `.js` extensions in backend; JSX frontend uses Vite extension resolution.
- Backend services export named Express handlers and use Mongoose models directly.
- Active protected REST routes use `Auth` from `backend/modules/auth/auth.js`; decoded token payload is `req.user.userId`.
- API response shapes vary: workspace endpoints use `success/data`; task endpoints use `message/data`; preserve existing shapes during infrastructure changes.
- Backend code largely uses four spaces and double quotes; frontend commonly uses single quotes.
- No applicable `AGENTS.md` was found in the repository or parent directory chain.
- Preserve the current branch during planning. Stage only intended files and never stage secrets. Use the invoked git-pushing helper for an ordinary implementation push after validation and policy checks.
