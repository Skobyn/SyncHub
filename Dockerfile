# Use official Python image
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install dependencies first (layer caching)
COPY hub-backend/requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy backend source code into the image
COPY hub-backend/ ./

# Expose port 8080 (Cloud Run default)
ENV PORT 8080

CMD gunicorn hub_backend.wsgi:application --bind 0.0.0.0:${PORT} 