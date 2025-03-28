# ScribeLight Production Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying ScribeLight to production environments. ScribeLight consists of two main components:

1. **Frontend**: React.js application built with Vite
2. **Backend**: Flask API server with Gemini AI integration

## Prerequisites

- Node.js (v18+) for the frontend
- Python (v3.10+) for the backend
- A Gemini API key
- Git

## Quick Deployment

We've provided deployment scripts to simplify the process:

```bash
# Deploy frontend
chmod +x deploy_frontend.sh
./deploy_frontend.sh

# Deploy backend
chmod +x deploy_backend.sh
./deploy_backend.sh
```

## Frontend Deployment

### Step 1: Configure Environment Variables

Create or update the `.env` file in the project root:

```
VITE_API_URL=https://your-backend-url.com
```

Replace `https://your-backend-url.com` with your actual backend URL.

### Step 2: Build the Frontend

```bash
npm install
npm run build
```

This creates a `dist` directory with production-ready files.

### Step 3: Deploy to Hosting Provider

#### Option 1: Vercel (Recommended)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel` and follow the prompts

Or connect your GitHub repository to Vercel for automatic deployments.

#### Option 2: Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy` and follow the prompts

Or connect your GitHub repository to Netlify for automatic deployments.

#### Option 3: Manual Deployment

Upload the contents of the `dist` directory to your web server.

## Backend Deployment

### Step 1: Prepare the Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
pip install gunicorn waitress
```

### Step 2: Configure Environment Variables

Ensure these environment variables are set in your production environment:

- `GEMINI_API_KEY`: Your Gemini API key
- `FLASK_ENV`: Set to `production`
- `CORS_ORIGIN`: Your frontend URL (e.g., `https://scribelight.vercel.app`)

### Step 3: Deploy to Hosting Provider

#### Option 1: Render (Recommended)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure the service:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
4. Add the environment variables

#### Option 2: Heroku

1. Install Heroku CLI and log in
2. Create a new Heroku app: `heroku create`
3. Set environment variables: `heroku config:set GEMINI_API_KEY=your_key`
4. Deploy: `git push heroku main`

#### Option 3: Manual Deployment

1. Transfer the backend files to your server
2. Set up environment variables
3. Run with Gunicorn: `gunicorn app:app`

## Production Considerations

1. **CORS Configuration**: The backend is configured to accept requests from the frontend domain specified in the `CORS_ORIGIN` environment variable.

2. **API Rate Limiting**: Consider implementing rate limiting for the API endpoints to prevent abuse.

3. **Error Handling**: The production configuration includes enhanced error handling.

4. **Logging**: Set up proper logging for the application.

5. **Monitoring**: Implement monitoring for the application.

6. **Security**: Ensure all API keys and secrets are properly secured.

## Continuous Integration/Deployment

Consider setting up CI/CD pipelines using GitHub Actions, GitLab CI, or similar tools to automate the deployment process.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the `CORS_ORIGIN` environment variable is set correctly.

2. **API Key Issues**: Verify that the `GEMINI_API_KEY` is set and valid.

3. **Build Failures**: Check the build logs for errors.

4. **Connection Issues**: Ensure the frontend is using the correct backend URL.

For additional help, refer to the deployment guide or contact the development team.