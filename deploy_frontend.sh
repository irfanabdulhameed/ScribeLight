#!/bin/bash

# ScribeLight Frontend Deployment Script

echo "Starting ScribeLight frontend deployment..."

# Ensure we're in the project root directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project for production
echo "Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "Build successful! The production files are in the 'dist' directory."
  echo "You can now deploy these files to your hosting provider."
  echo ""
  echo "Deployment options:"
  echo "1. Vercel: Use 'vercel' or connect your GitHub repository"
  echo "2. Netlify: Use 'netlify deploy' or connect your GitHub repository"
  echo "3. Manual: Copy the 'dist' directory to your web server"
  echo ""
  echo "Make sure your backend API is deployed and update the VITE_API_URL in .env accordingly."
else
  echo "Build failed. Please check the errors above."
  exit 1
fi