# GrocerySync Hub Backend

This is the Django backend for the GrocerySync Hub - Support Edition.

## Setup Instructions

1. **Create and activate a virtual environment:**
   ```
   python -m venv venv
   .\venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On Mac/Linux
   ```
2. **Install dependencies:**
   ```
   pip install django djangorestframework djangorestframework-simplejwt djangorestframework-authtoken psycopg2-binary
   ```
3. **Run migrations:**
   ```
   python manage.py migrate
   ```
4. **Run the development server:**
   ```
   python manage.py runserver
   ```

## API Structure
- **Authentication:**
  - Obtain token: `POST /api/auth/` (username, password)
- **API Root:**
  - All core API endpoints will be under `/api/` (see `core/api_urls.py` for details)

## Project Structure
- `hub_backend/` - Django project settings and URLs
- `core/` - Main app for core models and logic
- `venv/` - Python virtual environment (not committed to Git)

## Next Steps
- Implement authentication and core API endpoints for Users, Retailers, Agents, Destinations, and Jobs. 