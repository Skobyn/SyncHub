# Tech Context: GrocerySync Hub - Support Edition

## Technologies & Frameworks
- **Hub Backend:** Python (Django preferred), RESTful API, PostgreSQL
- **Hub Frontend:** Next.js (React, TypeScript)
- **Agent:** Go (preferred for Windows service/daemon, cross-platform potential)
- **Plugins:** Defined interfaces for POS connectors and destination adapters, loaded by Agent

## Setup & Constraints
- Multi-tenant DB schema (PostgreSQL)
- Secure credential storage (encryption at rest, hashed passwords)
- All agent-hub communication over HTTPS/TLS
- Modular, extensible codebase for both Hub and Agent
- CI/CD pipeline established via `cloudbuild.yaml` and Google Cloud Build
- CORS enabled for local development to allow Next.js frontend to communicate with Django backend.
- **All secrets (Django secret key, DB password, Google OAuth credentials) managed via Secret Manager and referenced in Cloud Build/Run.**
- **All non-secret env vars hardcoded in cloudbuild.yaml for reliability.**
- **Cloud SQL and GCS fully integrated for database and static/media file storage.**

## Dependencies
- Django, Django REST Framework, psycopg2 (backend)
- **`gunicorn` (required for WSGI serving in container deployments)**
- React, Vite, Axios (frontend)
- Go standard library, SFTP/CSV libraries (agent)

## Repository
- **GitHub Repo URL:** https://github.com/Skobyn/SyncHub
- Local Git repository initialized and initial commit pushed to GitHub.
- Initial commit includes directory structure for hub-backend, hub-frontend, agent, plugins, and memory-bank
- README.md at project root with setup instructions
- **Deployment via `cloudbuild.yaml` to Google Cloud Run.** 