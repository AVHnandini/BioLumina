# SymptoTwin - Installation & Verification Guide

## ✅ Pre-Installation Checklist

Before starting, ensure you have:
- [ ] Python 3.8+ installed
- [ ] Node.js 16+ installed
- [ ] npm or yarn installed
- [ ] Git installed (optional, for version control)
- [ ] A code editor (VS Code recommended)
- [ ] 2+ GB free disk space
- [ ] Internet connection

---

## 🔍 System Requirements Verification

### Check Python
```bash
python --version
# Output should be: Python 3.8.0 or higher
# OR try: python3 --version
```

### Check Node.js
```bash
node --version
# Output should be: v16.0.0 or higher
```

### Check npm
```bash
npm --version
# Output should be: 8.0.0 or higher
```

### Check Git (optional)
```bash
git --version
# Output should be: git version 2.0.0 or higher
```

---

## 📦 Installation Steps

### Step 1: Navigate to Project
```bash
cd C:\Users\nandi\Documents\symptotwin
```

### Step 2: Backend Setup

#### Create Virtual Environment
```bash
cd backend
python -m venv venv
```

**On Windows:**
```bash
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

**Verify activation:**
- Windows: You should see `(venv)` at the start of command prompt
- Mac/Linux: You should see `(venv)` at the start of terminal

#### Install Dependencies
```bash
pip install -r requirements.txt
```

**This will install:**
- Flask (web framework)
- Flask-CORS (cross-origin support)
- Requests (HTTP library)
- python-dotenv (environment variables)
- Gunicorn (production server)

**Verify installation:**
```bash
pip list
# Should show Flask, Flask-CORS, requests, python-dotenv, gunicorn
```

### Step 3: Frontend Setup

#### Navigate to Frontend
```bash
cd ../frontend
# or
cd frontend  # if in project root
```

#### Install Dependencies
```bash
npm install
```

**This will install:**
- React (UI framework)
- React Router (navigation)
- Axios (HTTP client)
- Recharts (charts library)
- Tailwind CSS (styling)
- Vite (build tool)

**Verify installation:**
```bash
npm list
# Should show all dependencies listed
```

---

## ✅ Verification Steps

### Backend Verification

#### Check Python Packages
```bash
cd backend
venv\Scripts\activate  # Windows
pip list
```

Should show:
- Flask 2.3.2
- Flask-CORS 4.0.0
- requests 2.31.0
- python-dotenv 1.0.0
- gunicorn 21.2.0
- plus dependencies

#### Test Backend Import
```bash
python -c "import flask; print(flask.__version__)"
# Output: 2.3.2

python -c "import flask_cors; print('CORS OK')"
# Output: CORS OK
```

#### Check Required Files
```bash
# Make sure these files exist:
# - backend/app.py
# - backend/utils.py
# - backend/.env
# - backend/requirements.txt
```

### Frontend Verification

#### Check Node Packages
```bash
cd frontend
npm list --depth=0
```

Should show:
- react@18.2.0
- react-dom@18.2.0
- react-router-dom@6.14.0
- axios@1.4.0
- recharts@2.7.2

#### Check Required Files
```bash
# Make sure these exist:
# - frontend/src/App.jsx
# - frontend/src/main.jsx
# - frontend/index.html
# - frontend/package.json
# - frontend/tailwind.config.js
# - frontend/vite.config.js
```

---

## 🚀 Quick Test

### Terminal 1 - Start Backend
```bash
cd backend
venv\Scripts\activate  # Windows: venv\Scripts\activate OR source venv/bin/activate (Mac/Linux)
python app.py
```

**Expected output:**
```
WARNING in app.run() is not recommended for production use. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit.
```

**Test in another terminal:**
```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{"status":"healthy","service":"SymptoTwin API","version":"1.0.0"}
```

### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v4.4.5 ready in XXX ms

> Local: http://localhost:3000/
> Press q to quit
```

### Browser Test
1. Open `http://localhost:3000` in your browser
2. You should see the SymptoTwin landing page
3. Click "Start Assessment"
4. You should see the assessment form

---

## 🐛 Troubleshooting Installation

### Problem: Python not found
```bash
python --version  # Returns 'not recognized'
```
**Solution:**
1. Install Python from https://www.python.org/downloads/
2. Add Python to PATH during installation
3. Restart terminal/command prompt
4. Try again

### Problem: Node.js not found
```bash
node --version  # Returns 'not recognized'
```
**Solution:**
1. Install Node.js from https://nodejs.org/
2. Choose LTS version
3. Add to PATH during installation
4. Restart terminal
5. Try again

### Problem: Virtual environment won't activate
```bash
# Windows: venv\Scripts\activate returns error
```
**Solution:**
```bash
# Try this instead
python -m venv venv
venv\Scripts\activate.bat
```

### Problem: pip install fails
```bash
pip install -r requirements.txt  # Returns error
```
**Solutions:**
1. Ensure virtual environment is activated
2. Check internet connection
3. Try upgrading pip:
   ```bash
   python -m pip install --upgrade pip
   ```
4. Try installing with no cache:
   ```bash
   pip install --no-cache-dir -r requirements.txt
   ```

### Problem: npm install fails
```bash
npm install  # Returns error
```
**Solutions:**
1. Check internet connection
2. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
3. Try again:
   ```bash
   npm install
   ```
4. Use npm ci instead:
   ```bash
   npm ci
   ```

### Problem: Port already in use
```bash
# Error: Address already in use
```
**Solution:**
1. Find process using port:
   - Windows: `netstat -ano | findstr :5000`
   - Mac/Linux: `lsof -i :5000`
2. Kill the process or change port
3. For different port: Update config files

### Problem: CORS errors
```bash
# Error: Cross-Origin Request Blocked
```
**Solution:**
1. Make sure backend is running on port 5000
2. Check `frontend/.env.local`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
3. Verify CORS is enabled in `backend/app.py`

---

## 📊 Verification Checklist

### Environment Setup
- [ ] Python 3.8+ installed
- [ ] Node.js 16+ installed
- [ ] Virtual environment created
- [ ] Virtual environment activated
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed

### File Structure
- [ ] `backend/app.py` exists
- [ ] `backend/utils.py` exists
- [ ] `frontend/src/App.jsx` exists
- [ ] `frontend/src/main.jsx` exists
- [ ] `frontend/index.html` exists
- [ ] `frontend/package.json` exists

### Configuration
- [ ] `backend/.env` exists
- [ ] `frontend/.env.local` exists
- [ ] Tailwind config exists
- [ ] Vite config exists
- [ ] Flask config is correct

### Backend Running
- [ ] Backend starts without errors
- [ ] Health check endpoint responds
- [ ] Symptoms endpoint returns list
- [ ] API accepts POST requests

### Frontend Running
- [ ] Frontend starts without errors
- [ ] Page loads in browser
- [ ] No console errors (F12)
- [ ] API calls succeed
- [ ] Forms are responsive

---

## 🔄 Reinstall if Needed

### Complete Reinstall (Backend)
```bash
cd backend
deactivate  # Deactivate virtual environment if active
rm -rf venv  # Remove virtual environment (Windows: rmdir /s venv)
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Complete Reinstall (Frontend)
```bash
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Verification Commands Summary

```bash
# Check versions
python --version
node --version
npm --version

# Test backend
cd backend
venv\Scripts\activate
python -c "import flask; print(flask.__version__)"
python app.py

# Test frontend
cd ../frontend
npm run dev

# Test API
curl http://localhost:5000/api/health
curl http://localhost:5000/api/symptoms
```

---

## ✨ Success Indicators

You'll know everything is working when:

✅ **Backend**
- Shows "Running on http://127.0.0.1:5000"
- No error messages in terminal
- Health check returns JSON response

✅ **Frontend**
- Shows "Local: http://localhost:3000/"
- No error messages in terminal
- Page loads in browser

✅ **Integration**
- Forms submit successfully
- No CORS errors
- Results display correctly
- Charts render properly

---

## 🎯 Next Steps After Verification

1. ✅ Test the application thoroughly
2. ✅ Review documentation
3. ✅ Explore the code
4. ✅ Make modifications as needed
5. ✅ Prepare for deployment

---

## 📞 Need Help?

Check these resources in order:
1. `GETTING_STARTED.md` - Setup guide
2. `QUICK_REFERENCE.md` - Common commands
3. `API_TESTING.md` - API testing
4. Browser console (F12) - Frontend errors
5. Terminal output - Backend errors

---

## ✅ All Set!

If all checks pass, your SymptoTwin application is ready to use!

**Happy coding!** 🚀

---

Last Updated: December 2024
