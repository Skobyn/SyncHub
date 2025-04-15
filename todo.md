Outstanding Steps
1. Backend (Django)
[X] Set up Google OAuth (django-allauth)
Configure with your Google Workspace credentials.
Restrict to your company domain (already handled by “Internal” app type).
[ ] Prepare for Cloud Run deployment
Add Dockerfile, production settings, and environment variable support.
Set up static/media file handling (Cloud Storage recommended for prod).
[ ] Set up Cloud SQL (PostgreSQL)
Create instance, database, and user.
Update Django settings for Cloud SQL.
[ ] Create sample data
Add “Benson Fresh Market” (dummy) and a placeholder for a real customer.
[ ] Deploy to Cloud Run
Build and deploy the container.
Set environment variables in Cloud Run.
Run migrations and create a superuser.
2. Frontend (Next.js on Vercel)
[ ] Update login page
Add “Sign in with Google” button that points to backend OAuth endpoint.
[ ] Update dashboard
Display sample data for “Benson Fresh Market” and placeholder customer.
[ ] Set NEXT_PUBLIC_API_URL
Point to your deployed backend in Vercel project settings.
3. Google Cloud Platform
[ ] Create OAuth credentials
Set up consent screen (Internal), create OAuth client, add redirect URIs.
[ ] Add backend and frontend URLs to OAuth allowed origins/redirects.
What I Need From You
Google OAuth Credentials
Client ID and Client Secret (or confirmation you’ll add them to your environment).
The redirect URI you’ll use for production (Cloud Run URL).
Cloud SQL Details
Database name, user, and password (or confirmation you’ll set these as environment variables).
Your Company Domain
(For reference, but “Internal” app type already restricts this.)
Backend and Frontend URLs
The URLs you’ll use for Cloud Run and Vercel (for OAuth and API config).
Any preferences for sample data
Name of the real customer placeholder (if you want something specific).
Once You Provide These:
I can generate:
A production-ready Dockerfile and Django settings.
Sample data fixture or admin instructions.
Frontend login button code.
Step-by-step deployment instructions for Cloud Run and Vercel.
Any additional documentation or scripts you need.
Quick Checklist for You
[ ] Create Google OAuth credentials (Client ID/Secret, add redirect URIs).
[ ] Set up Cloud SQL instance and database.
[ ] Decide on backend/frontend URLs.
[ ] Provide any sample data preferences.