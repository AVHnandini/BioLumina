# SymptoTwin - Quick Reference Guide

## 🚀 Application Status

**✅ ALL SYSTEMS OPERATIONAL** - December 11, 2025

- Backend: Running on http://localhost:5000
- Frontend: Running on http://localhost:3000
- All Features: Fully Integrated and Tested

---

## 🎯 Three Main Features

### 1️⃣ SymptoTwin - Health Assessment (Original)
**Home → Assessment**
- Enter age and gender
- Select symptoms from the list
- Get AI-powered condition predictions
- View probability scores and severity levels
- Interactive charts for visualization

### 2️⃣ MemoryMate - Medicine Reminder (NEW)
**Home → MemoryMate (or navigation menu)**
- Register new account (email + password)
- Add medicines with dosage and timing
- Set frequency (once/twice/thrice daily)
- Choose time of day (morning/afternoon/night)
- Get browser notifications for reminders
- Manage medicines (view, delete)

### 3️⃣ MedXplain - Prescription Analyzer (NEW)
**Home → MedXplain (or navigation menu)**
- Upload prescription image (JPG/PNG/PDF)
- OR enter prescription text manually
- Get simplified explanations
- View detailed medicine instructions
- Read dosage information and warnings
- Try demo mode to see how it works

---

## 📂 Project Structure

```
symptotwin/
├── backend/              # Flask API (Port 5000)
│   ├── app.py           # Main application with routes
│   ├── models.py        # User & Medicine data models
│   ├── memorymate_routes.py   # MemoryMate API
│   ├── medxplain_routes.py    # MedXplain API
│   ├── utils.py         # Business logic
│   ├── requirements.txt  # Python dependencies
│   └── data/            # JSON storage
│       ├── users.json
│       └── medicines.json
│
├── frontend/            # React/Vite UI (Port 3000)
│   ├── src/
│   │   ├── App.jsx      # Main router
│   │   ├── pages/       # Page components
│   │   │   ├── Home.jsx (with feature cards)
│   │   │   ├── Assessment.jsx
│   │   │   ├── MemoryMate.jsx (NEW)
│   │   │   └── MedXplain.jsx (NEW)
│   │   └── components/  # UI components
│   │       ├── Header.jsx (updated nav)
│   │       ├── MemoryMateLogin.jsx (NEW)
│   │       ├── MemoryMateDashboard.jsx (NEW)
│   │       ├── MedXplainUpload.jsx (NEW)
│   │       └── MedXplainResults.jsx (NEW)
│   └── package.json     # NPM dependencies
│
└── Documentation/
    ├── README.md
    ├── NEW_FEATURES_SUMMARY.md
    └── TEST_REPORT.md
```

---

## 🔗 API Endpoints

### Health & Symptoms
```
GET  http://localhost:5000/api/health
GET  http://localhost:5000/api/symptoms
POST http://localhost:5000/api/predict
```

### MemoryMate
```
POST http://localhost:5000/api/memorymate/register
POST http://localhost:5000/api/memorymate/login
POST http://localhost:5000/api/memorymate/add_medicine
GET  http://localhost:5000/api/memorymate/list_medicines/<email>
PUT  http://localhost:5000/api/memorymate/edit_medicine/<email>/<id>
DELETE http://localhost:5000/api/memorymate/delete_medicine/<email>/<id>
GET  http://localhost:5000/api/memorymate/check_medicines/<email>
```

### MedXplain
```
GET  http://localhost:5000/api/medxplain/demo
POST http://localhost:5000/api/medxplain/upload
POST http://localhost:5000/api/medxplain/analyze_text
```

---

## 🎨 Technology Stack

**Backend**: Python 3.8+ with Flask 2.3.2
- CORS enabled for API requests
- JSON file storage
- Debug mode ON (development)

**Frontend**: React 18.3.1 with Vite 4.4.5
- Tailwind CSS for styling
- React Router 6.30.2 for navigation
- Axios 1.13.2 for HTTP requests
- Recharts 2.15.4 for charts

---

## 🧪 Test the Features

### Test MemoryMate
1. Go to http://localhost:3000/memorymate
2. Click "Register"
3. Enter: name, email, password
4. Click "Register"
5. Login with same credentials
6. Click "Add New Medicine"
7. Fill: Paracetamol, 500mg, Once, Morning, Today, Today+30days
8. Click "Save Medicine"
9. See medicine appears in list

### Test MedXplain
1. Go to http://localhost:3000/medxplain
2. Click "View Demo Analysis"
3. See sample prescription analysis
4. Or click "Upload Prescription" and add a file
5. Or click "Enter Text" and paste prescription text

### Test Original SymptoTwin
1. Go to http://localhost:3000/assessment
2. Select age, gender, and symptoms
3. Click "Get Predictions"
4. See conditions with probability scores

---

## 🛠️ Starting the Application

### Step 1: Start Backend
```powershell
cd C:\Users\nandi\Documents\symptotwin\backend
. .\venv\Scripts\Activate.ps1
python app.py
```
Wait for: "Running on http://localhost:5000"

### Step 2: Start Frontend (New Terminal)
```powershell
cd C:\Users\nandi\Documents\symptotwin\frontend
npm run dev
```
Wait for: "Local: http://127.0.0.1:3000/"

### Step 3: Open in Browser
Visit: http://localhost:3000

---

## 📊 Sample Data

### Test User for MemoryMate
```
Email: test@example.com
Password: password123
Name: Test User
```

### Sample Medicines
```
Paracetamol - 500mg - Once daily - Morning
Aspirin - 100mg - Once daily - Morning  
Amoxicillin - 1 tablet - Thrice daily - Morning/Afternoon/Night
```

---

## ⚠️ Important Notes

1. **Data is temporary**: Uses JSON files, data persists in `/backend/data/`
2. **No password hashing**: For development only
3. **Mock AI**: MedXplain uses mock responses (ready for OpenAI integration)
4. **Demo mode**: Use "View Demo Analysis" to test MedXplain without uploading

---

## 🔄 Common Tasks

### Check if backend is running
```powershell
Invoke-WebRequest http://localhost:5000/api/health
```

### Check if frontend is running
```
Open http://localhost:3000 in browser
```

### Stop backend
Press `Ctrl + C` in backend terminal

### Stop frontend
Press `Ctrl + C` in frontend terminal

### Clear browser cache
Press `Ctrl + Shift + Delete` in browser

---

## 📞 Features Overview

| Feature | Type | Status | Access |
|---------|------|--------|--------|
| Health Assessment | Original | ✅ Working | /assessment |
| Symptom Prediction | Original | ✅ Working | /assessment |
| Medicine Reminder | NEW | ✅ Working | /memorymate |
| Prescription Analysis | NEW | ✅ Working | /medxplain |
| Notifications | NEW | ✅ Working | Browser permission needed |

---

## 🎓 User Guide

### For Healthcare Providers
- Use SymptoTwin for patient pre-assessment
- Quick symptom-to-condition mapping
- Helps triage patient concerns

### For Patients
- Self-assess symptoms using SymptoTwin
- Track medicines with MemoryMate
- Understand prescriptions with MedXplain
- Set reminders for doses

### For Developers
- Clean API structure
- Easy to add new features
- JSON storage (can migrate to database)
- Modular frontend components
- Flask blueprints for scaling

---

## 🚀 Ready to Deploy

The application is ready for:
- ✅ Local testing and development
- ✅ Feature demonstration
- ✅ User feedback collection
- ⏳ Production deployment (needs: password hashing, database, SSL)

---

**Last Updated**: December 11, 2025  
**Application Status**: ✅ FULLY OPERATIONAL  
**All Features**: READY FOR USE 🎉
