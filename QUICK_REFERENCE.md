# SymptoTwin - Quick Reference

## 🚀 Start Backend
```bash
cd backend
venv\Scripts\activate
python app.py
```
Backend runs at `http://localhost:5000`

## 🚀 Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs at `http://localhost:3000`

---

## 📍 Key URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Main app |
| Backend | http://localhost:5000 | API server |
| API Health | http://localhost:5000/api/health | Check if API works |
| API Symptoms | http://localhost:5000/api/symptoms | Get symptom list |
| API Predict | POST http://localhost:5000/api/predict | Make prediction |

---

## 🔑 Main Files

**Frontend**
- `frontend/src/App.jsx` - Main app with routing
- `frontend/src/pages/Home.jsx` - Landing page
- `frontend/src/pages/Assessment.jsx` - Symptom form
- `frontend/src/pages/Results.jsx` - Results display
- `frontend/src/services/api.js` - API calls

**Backend**
- `backend/app.py` - Flask server & routes
- `backend/utils.py` - Prediction logic
- `backend/requirements.txt` - Dependencies

---

## 📝 Common Commands

```bash
# Install dependencies
cd frontend && npm install
cd backend && pip install -r requirements.txt

# Build for production
cd frontend && npm run build

# Test API
curl http://localhost:5000/api/health

# Run tests
npm test  # Frontend
pytest    # Backend (if tests exist)
```

---

## 🐛 Quick Fixes

**Frontend not loading?**
```bash
cd frontend
npm cache clean --force
rm -rf node_modules
npm install
npm run dev
```

**Backend not responding?**
```bash
# Check if running
http://localhost:5000/api/health

# Restart
python app.py
```

**CORS errors?**
```bash
# Make sure backend is running
# Check REACT_APP_API_URL in frontend/.env.local
# Should be: http://localhost:5000/api
```

---

## 📊 API Test

```bash
# Windows PowerShell
$body = @{
    age = 25
    gender = "female"
    symptoms = @("headache", "fever")
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:5000/api/predict `
    -Method POST `
    -Body $body `
    -ContentType application/json
```

---

## 🎨 Styling Quick Tips

**Add a custom button:**
```jsx
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Click me
</button>
```

**Add a card:**
```jsx
<div className="bg-white rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-bold">Card Title</h2>
</div>
```

**Add responsive layout:**
```jsx
<div className="grid md:grid-cols-2 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

---

## 📦 Add New Package

**Frontend:**
```bash
cd frontend
npm install package-name
```

**Backend:**
```bash
cd backend
pip install package-name
pip freeze > requirements.txt
```

---

## 🚢 Deploy Checklist

- [ ] Backend API running smoothly
- [ ] Frontend builds without errors
- [ ] All forms validated
- [ ] Charts displaying correctly
- [ ] Responsive design working
- [ ] Error messages helpful
- [ ] No console errors
- [ ] Environment variables set
- [ ] README files complete
- [ ] Code committed to Git

---

## 🆘 Support Resources

| Issue | Solution |
|-------|----------|
| Port already in use | Kill process using port or change port |
| Module not found | Run `npm install` or `pip install -r requirements.txt` |
| CORS error | Check backend URL in frontend .env |
| Form not submitting | Check browser console (F12) for errors |
| Charts not showing | Check if data is passed correctly to Recharts |

---

## 📚 Documentation Files

- `README.md` - Project overview
- `GETTING_STARTED.md` - Detailed setup guide
- `DEPLOYMENT.md` - Production deployment
- `API_TESTING.md` - API endpoint testing
- `frontend/README.md` - Frontend specific
- `backend/README.md` - Backend specific

---

## 🔗 Useful Links

- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [Flask Docs](https://flask.palletsprojects.com)
- [Axios Docs](https://axios-http.com)
- [Recharts Docs](https://recharts.org)

---

## ⚡ Performance Tips

- Use lazy loading for images
- Minimize API calls
- Cache symptom list
- Optimize bundle size with `npm run build`
- Use CDN for production

---

## 🔐 Security Notes

- Don't commit `.env` files
- Use HTTPS in production
- Validate all inputs
- Sanitize API responses
- Keep dependencies updated

---

## 📝 Version Info

- React: 18.2.0
- Vite: 4.4.5
- Tailwind: 3.3.2
- Flask: 2.3.2
- Python: 3.8+
- Node: 16+

---

Last Updated: December 2024
