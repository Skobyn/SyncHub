# Active Context: GrocerySync Hub - Support Edition

## Current Focus
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
- Created and configured `cloudbuild.yaml` for automated Docker build and Cloud Run deployment.
- Added and referenced all required secrets in Secret Manager.
- Updated Cloud Run and Cloud Build service accounts with Secret Manager access.
- Hardcoded all non-secret environment variables in the deployment pipeline.
- Verified Cloud SQL and GCS integration.
- Pushed all changes to GitHub for automated deployment.
- Python virtual environment created in hub-backend/.
- Django, Django REST Framework, and psycopg2-binary installed.
- Django project (hub_backend) and app (core) created.
- Documentation updated (hub-backend/README.md, root README.md).
- Initial models and migrations complete.
- Migrations created and applied.
- **Created `cloudbuild.yaml` for Docker build and Cloud Run deployment.**
- **Added `gunicorn` to `requirements.txt` to fix deployment.**

## Immediate Next Steps
- **Verify the deployed Cloud Run service is functioning correctly (check logs, basic requests).**
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