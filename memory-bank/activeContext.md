# Active Context: GrocerySync Hub - Support Edition

## Current Focus
- Finish backend token-exchange endpoint and get Cloud Run container healthy.
- Frontend Google sign‑in now uses built‑in provider; build passes.
- Backend and frontend codebases are structured for cloud deployment (previously on Cloud Run, now aiming for Vercel for frontend).
- Backend API (Django) is assumed functional, focus is on frontend build/deployment.
- **Latest deployment attempt failed due to ESLint errors in `pages/api/auth/[...nextauth].ts` and `components/RetailerList.tsx`.**
- Backend and frontend codebases are now fully cloud-native and deployed via Google Cloud Run.
- Automated CI/CD pipeline established using `cloudbuild.yaml` in the repo root.
- All sensitive environment variables (Django secret key, DB password, Google OAuth credentials) are managed via Google Secret Manager and referenced in Cloud Build and Cloud Run.
- Non-secret environment variables (DB host, name, user, allowed hosts, GCS bucket names, etc.) are hardcoded in `cloudbuild.yaml` for simplicity and reliability.
- Cloud SQL (PostgreSQL) and Google Cloud Storage (GCS) are fully integrated for database and static/media file storage.
- Cloud Run service and Cloud Build service account permissions are configured for Secret Manager and Cloud SQL access.
- Project is ready for further feature development (authentication, RBAC, API endpoints, etc.).
- Backend setup: Django project and core app initialized in hub-backend/.
- Backend README and root README updated with setup instructions and status.
- Initial models for Users, Retailers, Agents, Destinations, Jobs defined.
- Custom user model configured and migrations applied.
- Django REST Framework and token authentication endpoint enabled.
- API structure scaffolded (core/api_urls.py, backend URLs updated).
- Backend README updated with API/auth instructions.
- Memory Bank and task list aligned with PRD for next steps.
- Ready to implement authentication and core API endpoints for Users, Retailers, Agents, Destinations, and Jobs, enforcing RBAC and multi-tenancy as per PRD.
- Next.js frontend initialized in hub-frontend/.
- Backend CORS configured for local integration with Next.js frontend.
- **Cloud Build configuration (`cloudbuild.yaml`) created and successfully deployed the backend to Cloud Run.**
- **Resolved Cloud Run startup failure by adding `gunicorn` to `requirements.txt`.**
- **Project Memory Bank updated to reflect current status.**

## Recent Changes
- Switched NextAuth provider to built‑in GoogleProvider; added backend token exchange in JWT callback.
- Added components path alias; added global SessionProvider via Providers client component.
- Fixed tsconfig and import paths; login page now shows Google sign‑in.
- Updated Dockerfile and backend requirements with Django, DRF, gunicorn.
- Cloud Run deployment still failing but now due to gunicorn missing earlier – fixed; waiting for new build.

## Immediate Next Steps
- **Address the ESLint errors reported by the Vercel build process in `pages/api/auth/[...nextauth].ts` and `components/RetailerList.tsx`.**
- Attempt frontend deployment again after fixing ESLint issues.
- Continue implementation of authentication and core API endpoints for Users, Retailers, Agents, Destinations, and Jobs, with RBAC and multi-tenancy.
- Update documentation and commit changes.

## Initial project setup
- Initial project setup: Memory Bank creation, documentation, and repo preparation.
- Moving planning.md and task.md into memory-bank/ as per operating procedures.
- Drafting core Memory Bank files (projectbrief.md, productContext.md, systemPatterns.md, techContext.md, activeContext.md).

## Memory Bank directory
- Memory Bank directory created and populated with planning.md and task.md.

## Core context files
- Core context files (projectbrief.md, productContext.md, systemPatterns.md, techContext.md, activeContext.md) drafted from PRD and planning documents.

## Git repository
- Initialize Git repository and document repo URL in techContext.md.

## Project directory structure
- Create initial project directory structure: hub-backend/, hub-frontend/, agent/, plugins/, memory-bank/.

## Root README.md
- Draft root README.md with project overview and setup instructions.

## Commit initial structure and documentation to Git
- Commit initial structure and documentation to Git.

## Backend and frontend framework setup
- Begin backend and frontend framework setup as per task list. 