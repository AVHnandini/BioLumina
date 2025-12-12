# SymptoTwin - Getting Started Guide

## 📋 Quick Overview

SymptoTwin is a full-stack health assessment application with:
- **Frontend**: Modern React app with Tailwind CSS
- **Backend**: Flask REST API with prediction logic
- **Features**: Symptom analysis, condition prediction, probability charts

---

## 🎯 What You'll Build

1. A beautiful landing page
2. An interactive symptom assessment form
3. AI-powered condition predictions
4. Results page with charts and visualizations

---

## ⚙️ Prerequisites

### Required
- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

### Verify Installation
```bash
python --version      # Should be 3.8+
node --version       # Should be 16+
npm --version        # Should be 8+
git --version        # Should be 2.0+
```

---

## 🚀 Local Development Setup

### Step 1: Clone/Navigate to Project
```bash
cd C:\Users\nandi\Documents\symptotwin
```

### Step 2: Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Activate virtual environment (macOS/Linux)
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

✅ Backend running at `http://localhost:5000`

### Step 3: Setup Frontend (in new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running at `http://localhost:3000`

### Step 4: Test the Application

1. Open browser to `http://localhost:3000`
2. Click "Start Assessment"
3. Fill in form:
   - Age: 25
   - Gender: Female
   - Symptoms: Select "Headache" and "Fever"
4. Click "Start Assessment"
5. View results with charts

---

## 📁 Project Structure

```
symptotwin/
├── frontend/                          # React application
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   │   ├── Header.jsx            # Top navigation
│   │   │   ├── Footer.jsx            # Bottom footer
│   │   │   ├── AssessmentForm.jsx    # Symptom form
│   │   │   ├── ResultCard.jsx        # Condition card
│   │   │   └── LoadingSpinner.jsx    # Loading animation
│   │   ├── pages/                    # Full pages
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Assessment.jsx        # Assessment page
│   │   │   └── Results.jsx           # Results page
│   │   ├── services/
│   │   │   └── api.js                # API client
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── index.html                    # HTML template
│   ├── package.json                  # Dependencies
│   ├── tailwind.config.js            # Tailwind config
│   ├── vite.config.js                # Vite config
│   └── README.md                     # Frontend docs
│
├── backend/                           # Flask application
│   ├── app.py                        # Main Flask app
│   ├── utils.py                      # Prediction logic
│   ├── requirements.txt              # Python packages
│   ├── .env                          # Environment variables
│   └── README.md                     # Backend docs
│
├── README.md                         # Main documentation
├── DEPLOYMENT.md                     # Deployment guide
├── API_TESTING.md                    # API testing guide
├── setup.sh                          # Linux/Mac setup
├── setup.bat                         # Windows setup
└── .gitignore                        # Git ignore rules
```

---

## 🔧 Common Development Tasks

### Add a New Symptom

1. **Backend** (`backend/utils.py`):
```python
SYMPTOM_MAPPINGS = {
    "new_symptom": ["alias1", "alias2"],
    # Add your symptom mapping here
}

mock_conditions = {
    "new_symptom": {
        "Condition1": 0.85,
        "Condition2": 0.60,
    },
}
```

2. **Backend** (`backend/app.py`):
```python
AVAILABLE_SYMPTOMS = [
    # ... existing symptoms
    "new_symptom",  # Add here
]
```

### Modify Styling

Edit Tailwind CSS in `frontend/src/index.css`:
```css
.custom-class {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg;
}
```

### Update API Response

Modify `backend/utils.py` → `predict_conditions()` function:
```python
def predict_conditions(age, gender, symptoms, top_n=5):
    # Your logic here
    return results
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check Python version
python --version

# Make sure virtual environment is activated
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Check port 5000 is not in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Mac/Linux
```

### Frontend Won't Load
```bash
# Clear cache
npm cache clean --force

# Reinstall node_modules
rm -rf node_modules package-lock.json  # Mac/Linux
rmdir /s node_modules                  # Windows
npm install

# Check port 3000 is not in use
npm run dev -- --host 0.0.0.0
```

### CORS Errors
Make sure backend is running and update `REACT_APP_API_URL`:
```bash
# In frontend/.env.local
REACT_APP_API_URL=http://localhost:5000/api
```

### Form Not Submitting
1. Check console for errors (F12)
2. Verify backend is running
3. Check network tab in DevTools
4. See API_TESTING.md for manual testing

---

## 📚 File-by-File Guide

### Frontend Components

**Header.jsx** - Navigation bar
- Logo and title
- Responsive design
- Gradient background

**AssessmentForm.jsx** - Main form
- Age input validation
- Gender radio buttons
- Symptom multi-select dropdown
- Form validation with error messages

**ResultCard.jsx** - Result display
- Condition name and probability
- Severity badge (low/medium/high)
- Progress bar visualization

**LoadingSpinner.jsx** - Loading state
- Animated spinner
- Loading message
- Smooth transitions

### Frontend Pages

**Home.jsx** - Landing page
- Hero section with gradient
- Feature highlights
- How it works section
- CTA buttons

**Assessment.jsx** - Assessment page
- Form submission handling
- Loading state management
- Error handling
- API integration

**Results.jsx** - Results page
- Results display
- Bar chart (Recharts)
- Pie chart (Recharts)
- Results summary
- Re-assess button

### Backend Files

**app.py** - Flask server
- Routes and endpoints
- Request validation
- Error handling
- CORS configuration
- Logging setup

**utils.py** - Business logic
- Condition prediction
- Probability calculation
- Severity classification
- Mock data for demo

---

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563eb`
- **Teal**: `#14b8a6`
- **Success Green**: `#10b981`
- **Warning Yellow**: `#f59e0b`
- **Error Red**: `#ef4444`

### Components
- **Cards**: Rounded corners, soft shadows, hover effects
- **Buttons**: Gradient backgrounds, scale on hover
- **Inputs**: Blue outline focus, rounded borders
- **Badges**: Pill-shaped, color-coded

### Animations
- **Fade In**: 0.5s ease-in
- **Slide Up**: 0.4s ease-out
- **Spin**: 3s linear infinite (for loading)

---

## 📖 API Documentation

See `API_TESTING.md` for:
- cURL examples
- Postman setup
- Python testing code
- Test data
- Expected responses

---

## 🚢 Deployment

See `DEPLOYMENT.md` for:
- Render backend deployment
- Netlify frontend deployment
- Environment setup
- Production checklist
- Troubleshooting

---

## 💡 Tips & Best Practices

### Development
- Use VS Code with Prettier and ESLint extensions
- Keep components small and focused
- Use meaningful variable names
- Comment complex logic

### Performance
- Lazy load images
- Minimize API calls
- Use React.memo for expensive components
- Optimize bundle size

### Security
- Never commit `.env` files
- Use HTTPS in production
- Validate all inputs
- Sanitize user data

---

## 📞 Support

### Getting Help
1. Check `README.md` in relevant folder
2. Review `API_TESTING.md` for API issues
3. Check browser console for errors
4. Check server logs

### Common Questions

**Q: How do I change the port?**
A: 
- Frontend: Update `vite.config.js` port
- Backend: Update `app.py` port and firewall rules

**Q: How do I add more symptoms?**
A: Update `AVAILABLE_SYMPTOMS` and `mock_conditions` in `backend/utils.py`

**Q: Can I use real medical APIs?**
A: Yes! Update `fetch_diseases_for_symptom()` in `backend/utils.py`

**Q: How do I deploy to production?**
A: See `DEPLOYMENT.md`

---

## 🎓 Learning Resources

### React
- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com)
- [Component Examples](https://tailwindui.com)

### Flask
- [Flask Documentation](https://flask.palletsprojects.com)
- [Flask-CORS Guide](https://flask-cors.readthedocs.io)

### Recharts
- [Recharts Documentation](https://recharts.org)
- [Chart Examples](https://recharts.org/en-US/examples)

---

## 🎉 Next Steps

1. ✅ Complete local setup
2. ✅ Test the application
3. ✅ Explore the code
4. ✅ Make modifications
5. ✅ Deploy to production

Happy coding! 🚀
