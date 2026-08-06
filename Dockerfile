# Use the official Python runtime
FROM python:3.12-slim

# Prevent Python from writing .pyc files to disk and buffer output
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies and keep image size small
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Copy dependency definitions
COPY requirements.txt .
COPY backend/requirements.txt backend/requirements.txt

# Copy backend source and model artifacts
COPY backend/ /app/backend/

# Install Python dependencies
RUN python -m pip install --upgrade pip setuptools wheel \
  && python -m pip install -r requirements.txt

WORKDIR /app/backend

EXPOSE 8000

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
