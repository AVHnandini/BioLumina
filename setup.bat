@echo off
REM SymptoTwin - Quick Start Script for Windows

echo.
echo ======================================================
echo 7F SymptoTwin - Health Assessment 7F Condition Predictor
echo ======================================================
echo.

REM Backend Setup
echo 6E Setting up Backend...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Successfully set up Backend!
echo.

REM Frontend Setup
cd ..\frontend

echo 6E Setting up Frontend...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo Successfully set up Frontend!
echo.

REM Instructions
echo ======================================================
echo Ready to Start!
echo ======================================================
echo.
echo To start the Backend:
echo   cd backend
echo   venv\Scripts\activate
echo   python app.py
echo.
echo To start the Frontend (in a new terminal):
echo   cd frontend
echo   npm run dev
echo.
echo Then open your browser to http://localhost:3000
echo.
pause
