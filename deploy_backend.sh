#!/bin/bash

# ScribeLight Backend Deployment Script

echo "Starting ScribeLight backend deployment..."

# Ensure we're in the project root directory
cd "$(dirname "$0")/backend"

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python -m venv venv
fi

# Activate the virtual environment
echo "Activating virtual environment..."
source venv/bin/activate || source venv/Scripts/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt
pip install gunicorn waitress

# Check if GEMINI_API_KEY is set
if [ -z "$GEMINI_API_KEY" ]; then
  echo "Warning: GEMINI_API_KEY environment variable is not set."
  echo "Make sure to set it in your production environment."
fi

# Copy production app.py
if [ -f "app.py.production" ]; then
  echo "Copying production app.py..."
  cp app.py.production app.py
fi

echo ""
echo "Backend preparation complete!"
echo ""
echo "Deployment options:"
echo "1. Render: Connect your GitHub repository and use the Procfile"
echo "2. Heroku: Use 'heroku create' and 'git push heroku main'"
echo "3. Manual: Use 'gunicorn app:app' to run the server"
echo ""
echo "Make sure to set these environment variables in your production environment:"
echo "- GEMINI_API_KEY: Your Gemini API key"
echo "- FLASK_ENV: production"
echo "- CORS_ORIGIN: Your frontend URL (e.g., https://scribelight.vercel.app)"