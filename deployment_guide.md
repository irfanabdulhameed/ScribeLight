# ScribeLight Deployment Guide

This guide outlines the steps to deploy the ScribeLight application to production environments.

## Project Overview

ScribeLight consists of two main components:

1. **Frontend**: React.js application built with Vite
2. **Backend**: Flask API server with Gemini AI integration

## Prerequisites

- Node.js (v18+) for the frontend
- Python (v3.10+) for the backend
- A Gemini API key
- Git

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Prepare your project**:
   - Ensure your `vite.config.js` is properly configured
   - Create a `.env` file with the production backend URL:
     ```
     VITE_API_URL=https://your-backend-url.com
     ```

2. **Deploy to Vercel**:
   - Sign up for a Vercel account if you don't have one
   - Connect your GitHub repository
   - Configure the build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
   - Add environment variables in the Vercel dashboard
   - Deploy

### Option 2: Netlify

Similar steps to Vercel, with the same build configuration.

### Option 3: Manual Deployment

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` directory to your web server

## Backend Deployment

### Option 1: Render (Recommended)

1. **Prepare your project**:
   - Create a `Procfile` in the backend directory:
     ```
     web: gunicorn app:app
     ```
   - Ensure `gunicorn` is in your `requirements.txt`

2. **Deploy to Render**:
   - Sign up for a Render account
   - Create a new Web Service
   - Connect your GitHub repository
   - Configure the service:
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `gunicorn app:app`
   - Add environment variables:
     - `GEMINI_API_KEY`: Your Gemini API key
     - `FLASK_ENV`: production
   - Deploy

### Option 2: Heroku

Similar steps to Render, with the same configuration.

### Option 3: AWS Elastic Beanstalk

1. Install the EB CLI
2. Initialize your EB application
3. Deploy your application

## Environment Configuration

### Frontend Environment Variables

Create a `.env` file in the root directory with:

```
VITE_API_URL=https://your-backend-url.com
```

### Backend Environment Variables

Ensure these environment variables are set in your production environment:

- `GEMINI_API_KEY`: Your Gemini API key
- `FLASK_ENV`: production
- `CORS_ORIGIN`: Your frontend URL (e.g., https://scribelight.vercel.app)

## Production Considerations

1. **CORS Configuration**: Update the CORS settings in `app.py` to allow requests from your production frontend domain

2. **API Rate Limiting**: Implement rate limiting for the API endpoints

3. **Error Handling**: Enhance error handling for production

4. **Logging**: Set up proper logging for the application

5. **Monitoring**: Implement monitoring for the application

6. **Security**: Ensure all API keys and secrets are properly secured

## Continuous Integration/Deployment

Consider setting up CI/CD pipelines using GitHub Actions, GitLab CI, or similar tools to automate the deployment process.