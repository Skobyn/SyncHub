# Deploying SyncHub Django Backend to Google Cloud Run

## 1. Prerequisites
- Google Cloud Project
- Cloud SQL (PostgreSQL) instance and database
- Google Cloud Storage bucket(s) for static/media
- Google OAuth credentials (Client ID/Secret)
- Google Cloud SDK installed locally

## 2. Prepare Environment Variables
Copy `.env.example` to use as a reference. You will set these in Cloud Run (not in the repo):
- Django secret key, DB credentials, OAuth credentials, GCS bucket names, etc.

## 3. Build and Deploy to Cloud Run
```
gcloud builds submit --tag gcr.io/<your-project-id>/sync-hub-backend

gcloud run deploy sync-hub-backend \
  --image gcr.io/<your-project-id>/sync-hub-backend \
  --platform managed \
  --region <your-region> \
  --allow-unauthenticated \
  --set-env-vars "$(cat .env | grep -v '^#' | xargs)"
```
- Set environment variables in the Cloud Run console if not using the above command.

## 4. Cloud SQL Connection
- Use the Cloud SQL Auth Proxy or set `DB_HOST=/cloudsql/<instance-connection-name>` in your env vars.
- Grant Cloud Run service account access to Cloud SQL.

## 5. Google Cloud Storage for Static/Media
- Create a bucket for static/media files.
- Grant Cloud Run service account access to the bucket.
- Set `USE_GCS=True`, `GS_BUCKET_NAME`, and `GS_STATIC_BUCKET_NAME` in your env vars.

## 6. Google OAuth Setup
- Add your Cloud Run URL to the OAuth redirect URIs:
  `https://<your-cloud-run-service>.a.run.app/accounts/google/login/callback/`
- Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in your env vars.

## 7. Database Migrations and Superuser
- Use Cloud Shell or a Cloud Run job to run:
```
gcloud run jobs create migrate-job --image gcr.io/<your-project-id>/sync-hub-backend --command "python manage.py migrate"
gcloud run jobs execute migrate-job
```
- Create a superuser similarly if needed.

## 8. Collect Static Files
- Run `python manage.py collectstatic` (can be done in a Cloud Run job or locally and uploaded to GCS).

## 9. Test
- Visit your Cloud Run URL and test login, dashboard, and API endpoints.

---

**For more details, see Google Cloud Run and Django documentation.** 