#!/bin/bash

# SymptoTwin - Quick Start Script
# This script sets up and runs both backend and frontend

echo "🏥 SymptoTwin - Health Assessment & Condition Predictor"
echo "=================================================="
echo ""

# Check if running on Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    WINDOWS=true
else
    WINDOWS=false
fi

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    if [ "$WINDOWS" = true ]; then
        python -m venv venv
        venv\Scripts\activate
    else
        python3 -m venv venv
        source venv/bin/activate
    fi
fi

echo "Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "✅ Backend ready!"
echo ""

# Frontend Setup
cd ../frontend

echo "📦 Setting up Frontend..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "✅ Frontend ready!"
echo ""

# Instructions
echo "=================================================="
echo "🚀 Ready to Start!"
echo "=================================================="
echo ""
echo "To start the Backend:"
echo "  cd backend"
if [ "$WINDOWS" = true ]; then
    echo "  venv\Scripts\activate"
else
    echo "  source venv/bin/activate"
fi
echo "  python app.py"
echo ""
echo "To start the Frontend (in a new terminal):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open your browser to http://localhost:3000"
echo ""
