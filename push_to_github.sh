#!/bin/bash

# HaiLan Project - Push Script
# Run this script in your local terminal to push the code to GitHub

# Exit on error
set -e

echo "🌊 Initializing HaiLan Git Repository..."

# Check if .git exists
if [ ! -d ".git" ]; then
  git init
  echo "✅ Git repository initialized."
else
  echo "ℹ️  Git repository already initialized."
fi

# Add all files
echo "📦 Adding files..."
git add .

# Commit
echo "💾 Committing changes..."
# Use a default message or the first argument
COMMIT_MSG="${1:-feat: initial project structure and core features}"
git commit -m "$COMMIT_MSG"

# Rename branch to main
git branch -M main

# Add remote if not exists
if ! git remote | grep -q origin; then
  echo "🔗 Adding remote origin..."
  git remote add origin https://github.com/YYC-Cube/hailan-pro-prototype.git
else
  echo "ℹ️  Remote origin already exists. Updating URL..."
  git remote set-url origin https://github.com/YYC-Cube/hailan-pro-prototype.git
fi

# Push
echo "🚀 Pushing to GitHub..."
echo "You may be asked to enter your GitHub credentials."
git push -u origin main

echo "✨ Done! Project pushed to https://github.com/YYC-Cube/hailan-pro-prototype"
