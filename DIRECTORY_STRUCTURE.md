# SymptoTwin - Complete Directory Structure

```
symptotwin/
│
├── README.md                          # Main project documentation
├── GETTING_STARTED.md                 # Setup and getting started guide
├── DEPLOYMENT.md                      # Production deployment instructions
├── API_TESTING.md                     # API testing guide with examples
├── QUICK_REFERENCE.md                 # Quick lookup card
├── PROJECT_SUMMARY.md                 # Project overview and summary
├── DIRECTORY_STRUCTURE.md             # This file - detailed structure
│
├── .gitignore                         # Git ignore patterns
├── setup.sh                           # Linux/Mac automated setup
├── setup.bat                          # Windows automated setup
│
├── frontend/                          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx             # Top navigation bar component
│   │   │   ├── Footer.jsx             # Bottom footer component
│   │   │   ├── AssessmentForm.jsx     # Symptom form with validation
│   │   │   ├── ResultCard.jsx         # Individual condition result card
│   │   │   └── LoadingSpinner.jsx     # Animated loading indicator
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Landing/home page
│   │   │   ├── Assessment.jsx         # Assessment form page
│   │   │   └── Results.jsx            # Results display page with charts
│   │   │
│   │   ├── services/
│   │   │   └── api.js                 # Axios HTTP client for backend
│   │   │
│   │   ├── App.jsx                    # Main application component with routing
│   │   ├── main.jsx                   # React application entry point
│   │   └── index.css                  # Global Tailwind CSS and custom styles
│   │
│   ├── index.html                     # HTML template and root element
│   │
│   ├── package.json                   # React dependencies and scripts
│   │   ├── scripts: dev, build, preview
│   │   └── dependencies: react, react-router-dom, axios, recharts, tailwindcss
│   │
│   ├── tailwind.config.js             # Tailwind CSS customization
│   ├── postcss.config.js              # PostCSS configuration
│   ├── vite.config.js                 # Vite build tool configuration
│   │
│   ├── .gitignore                     # Frontend git ignore patterns
│   ├── .env.local                     # Environment variables (development)
│   ├── .env.example                   # Environment variables template
│   │
│   └── README.md                      # Frontend specific documentation
│
└── backend/                           # Flask REST API
    ├── app.py                         # Flask application and API routes
    │   ├── /api/health (GET)          # Server health check
    │   ├── /api/symptoms (GET)        # Get available symptoms list
    │   └── /api/predict (POST)        # Main prediction endpoint
    │
    ├── utils.py                       # Business logic and utilities
    │   ├── fetch_diseases_for_symptom()
    │   ├── aggregate_conditions()
    │   ├── classify_severity()
    │   ├── predict_conditions()
    │   └── Mock disease data
    │
    ├── requirements.txt               # Python dependencies
    │   ├── Flask==2.3.2
    │   ├── Flask-CORS==4.0.0
    │   ├── requests==2.31.0
    │   ├── python-dotenv==1.0.0
    │   └── gunicorn==21.2.0
    │
    ├── .env                           # Environment variables (development)
    ├── .gitignore                     # Backend git ignore patterns
    │
    └── README.md                      # Backend specific documentation

```

---

## 📄 File Descriptions

### Root Level Documentation

| File | Purpose | Audience |
|------|---------|----------|
| README.md | Project overview, features, tech stack | Everyone |
| GETTING_STARTED.md | Local setup, development guide | Developers |
| DEPLOYMENT.md | Production deployment steps | DevOps/Developers |
| API_TESTING.md | API endpoint testing examples | Backend developers |
| QUICK_REFERENCE.md | Quick lookup commands | Developers |
| PROJECT_SUMMARY.md | Complete project summary | Everyone |
| DIRECTORY_STRUCTURE.md | This file | Everyone |

### Frontend Files

#### Components (5 components)
1. **Header.jsx** (50 lines)
   - Navigation bar
   - Logo and branding
   - Responsive header

2. **Footer.jsx** (40 lines)
   - Footer section
   - Links and info
   - Copyright

3. **AssessmentForm.jsx** (150 lines)
   - Age input field
   - Gender radio buttons
   - Symptom multi-select dropdown
   - Form validation
   - Error messages

4. **ResultCard.jsx** (60 lines)
   - Condition name display
   - Probability percentage bar
   - Severity level badge
   - Medical disclaimer

5. **LoadingSpinner.jsx** (20 lines)
   - Animated spinner
   - Loading message

#### Pages (3 pages)
1. **Home.jsx** (150 lines)
   - Hero section with gradient
   - Feature highlights
   - How it works section
   - Call-to-action buttons
   - Medical disclaimer banner

2. **Assessment.jsx** (80 lines)
   - Form component integration
   - API submission handling
   - Loading state management
   - Error handling
   - State management

3. **Results.jsx** (200 lines)
   - Results display
   - Recharts bar chart
   - Recharts pie chart
   - Results summary table
   - Re-assess functionality
   - Navigation controls

#### Services
- **api.js** (70 lines)
  - getSymptoms()
  - predictConditions()
  - healthCheck()
  - Axios configuration
  - Error handling

#### Core Files
- **App.jsx** (25 lines)
  - React Router setup
  - Route definitions
  - Layout wrapper

- **main.jsx** (10 lines)
  - React DOM render
  - App initialization

- **index.css** (80 lines)
  - Tailwind imports
  - Global styles
  - Custom utilities
  - Badge styles
  - Button styles

#### Configuration Files
- **package.json** (25 lines)
  - 5 dependencies
  - 3 dev dependencies
  - 3 npm scripts

- **tailwind.config.js** (50 lines)
  - Custom colors
  - Custom shadows
  - Custom animations
  - Font configuration

- **postcss.config.js** (10 lines)
  - Tailwind CSS plugin
  - Autoprefixer

- **vite.config.js** (15 lines)
  - React plugin
  - Dev server config
  - Port 3000

#### HTML & Documentation
- **index.html** (20 lines)
  - Root element
  - Meta tags
  - Script injection

- **.env.local** (1 line)
  - API URL configuration

- **.env.example** (5 lines)
  - Template with comments

- **README.md** (100 lines)
  - Frontend specific guide

---

### Backend Files

#### Main Application
- **app.py** (180 lines)
  - Flask initialization
  - CORS configuration
  - 3 API routes
  - Error handlers
  - Logging setup

#### Business Logic
- **utils.py** (250 lines)
  - Symptom mappings
  - Condition database
  - Severity classification
  - Prediction algorithm
  - Probability calculation

#### Configuration & Dependencies
- **requirements.txt** (5 lines)
  - Flask
  - Flask-CORS
  - Requests
  - python-dotenv
  - Gunicorn

- **.env** (3 lines)
  - Flask environment
  - Debug flag
  - API keys

- **README.md** (100 lines)
  - Backend specific guide

---

## 🔍 Key Statistics

### Frontend
- **Files**: 20+
- **Components**: 5
- **Pages**: 3
- **Lines of Code**: ~1200
- **Imports**: React, Router, Axios, Recharts, Tailwind
- **NPM Dependencies**: 5 main, 3 dev

### Backend
- **Files**: 4
- **Routes**: 3
- **Functions**: 6+
- **Lines of Code**: ~450
- **Python Dependencies**: 5

### Documentation
- **Files**: 7
- **Total Lines**: 1000+
- **Formats**: Markdown

### Total
- **Files**: 30+
- **Total Lines**: 3000+
- **Languages**: JavaScript, Python, CSS, HTML, Markdown

---

## 📦 Dependencies

### Frontend (package.json)
```
react@18.2.0
react-dom@18.2.0
react-router-dom@6.14.0
axios@1.4.0
recharts@2.7.2
tailwindcss@3.3.2
postcss@8.4.24
autoprefixer@10.4.14
vite@4.4.5
@vitejs/plugin-react@4.0.0
```

### Backend (requirements.txt)
```
Flask==2.3.2
Flask-CORS==4.0.0
requests==2.31.0
python-dotenv==1.0.0
gunicorn==21.2.0
```

---

## 🎯 Development Workflow

1. **Frontend Development**
   - Edit files in `frontend/src/`
   - Changes auto-reload with Vite
   - Run `npm run dev`

2. **Backend Development**
   - Edit files in `backend/`
   - Changes auto-reload with Flask debug
   - Run `python app.py`

3. **Styling**
   - Use Tailwind utility classes
   - Customize in `tailwind.config.js`
   - Add global styles in `index.css`

4. **API Communication**
   - Update endpoints in `backend/app.py`
   - Update client calls in `frontend/src/services/api.js`
   - Test with `API_TESTING.md` examples

---

## 🚀 Build Output

After `npm run build` in frontend, generates:
```
frontend/dist/
├── index.html
├── assets/
│   ├── index-xxxxx.js      # Bundled JavaScript
│   ├── index-xxxxx.css     # Bundled CSS
│   └── ...
```

---

## 🔐 Environment Variables

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
FLASK_ENV=development
FLASK_DEBUG=True
API_NINJAS_KEY=your-key-here
```

---

## 📚 Important Notes

1. **Virtual Environment**
   - Backend uses Python venv (in `/backend/venv/`)
   - Created with `python -m venv venv`
   - Activated before running backend

2. **Node Modules**
   - Frontend uses npm (in `/frontend/node_modules/`)
   - Created with `npm install`
   - Not committed to Git (in .gitignore)

3. **Distribution Files**
   - Frontend dist: `/frontend/dist/` (production build)
   - Not committed to Git

4. **Development Files**
   - Python cache: `__pycache__/`
   - Node cache: `.cache/`
   - Not committed to Git

---

## 📋 Checklist for New Files

When adding new files, ensure:
- [ ] File location follows structure
- [ ] Naming convention matches (PascalCase for components)
- [ ] Import statement organized
- [ ] Comments for complex logic
- [ ] Error handling included
- [ ] Responsive design (frontend)
- [ ] Added to appropriate .gitignore
- [ ] Documentation updated

---

Last Updated: December 2024
Version: 1.0.0
