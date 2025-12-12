# SymptoTwin - Deployment Guide

## Prerequisites

- Git account with GitHub
- Netlify account (free tier available)
- Render account (free tier available)
- Python 3.8+ installed locally
- Node.js 16+ installed locally

---

## Part 1: Backend Deployment (Render)

### Step 1: Prepare Your Backend

```bash
# Ensure all dependencies are listed
pip freeze > requirements.txt

# Test locally
python app.py
```

### Step 2: Push to GitHub

```bash
cd ..
git init
git add .
git commit -m "Initial SymptoTwin commit"
git branch -M main
git remote add origin https://github.com/yourusername/symptotwin.git
git push -u origin main
```

### Step 3: Deploy on Render

1. Visit [render.com](https://render.com)
2. Sign up/login to your account
3. Click "New Web Service"
4. Connect your GitHub repository
5. Fill in the configuration:
   - **Name**: `symptotwin-api`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Region**: Choose closest to you
6. Click "Deploy"

### Step 4: Update Backend for Production

1. Install gunicorn:
   ```bash
   pip install gunicorn
   pip freeze > requirements.txt
   ```

2. Update `backend/app.py` to set debug mode based on environment:
   ```python
   import os
   
   debug_mode = os.getenv('FLASK_ENV') == 'development'
   app.run(debug=debug_mode, host='0.0.0.0', port=int(os.getenv('PORT', 5000)))
   ```

3. Commit and push changes
4. Render will automatically redeploy

### Step 5: Get Your Backend URL

After deployment, you'll get a URL like: `https://symptotwin-api.onrender.com`

This is your `REACT_APP_API_URL` for the frontend.

---

## Part 2: Frontend Deployment (Netlify)

### Step 1: Build Your Frontend

```bash
cd frontend
npm run build
```

This creates a `dist/` folder.

### Step 2: Deploy on Netlify

#### Option A: GitHub Integration (Recommended)

1. Visit [netlify.com](https://netlify.com)
2. Sign up/login
3. Click "Add new site" → "Import an existing project"
4. Select GitHub and authorize
5. Choose your repository
6. Fill in:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
7. Click "Deploy site"

#### Option B: Direct Upload

1. Visit [netlify.com](https://netlify.com)
2. Drag and drop the `frontend/dist` folder
3. Wait for deployment

### Step 3: Configure Environment Variables

1. In Netlify dashboard, go to Settings → Build & Deploy
2. Set Environment Variables:
   - Key: `REACT_APP_API_URL`
   - Value: `https://symptotwin-api.onrender.com/api`
3. Trigger a redeploy

### Step 4: Enable Auto-Deploy

In Netlify, go to Deployments and enable auto-deploy from main branch.

---

## Part 3: Update Backend for CORS

Update `backend/app.py` to accept requests from your frontend:

```python
from flask_cors import CORS

# Development
CORS(app)

# Production
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://your-netlify-domain.netlify.app"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})
```

---

## Production Checklist

### Backend
- [ ] Update `app.py` for production settings
- [ ] Set `debug=False`
- [ ] Use environment variables for secrets
- [ ] Add rate limiting (optional)
- [ ] Set up logging
- [ ] Update CORS configuration
- [ ] Test all endpoints

### Frontend
- [ ] Build production bundle (`npm run build`)
- [ ] Set correct `REACT_APP_API_URL`
- [ ] Test all forms and flows
- [ ] Verify responsive design
- [ ] Test error handling
- [ ] Check performance

### Deployment
- [ ] Both services running
- [ ] CORS properly configured
- [ ] Environment variables set
- [ ] SSL certificates active
- [ ] Logs being captured
- [ ] Error monitoring in place

---

## Monitoring & Maintenance

### Render Dashboard
- Monitor logs in real-time
- Check CPU/Memory usage
- View recent deployments

### Netlify Dashboard
- Monitor build/deploy logs
- Check site analytics
- Monitor error rates

### Manual Tests
- Test health endpoint: `GET /api/health`
- Test symptoms endpoint: `GET /api/symptoms`
- Test prediction: `POST /api/predict`
- Test UI flows in browser

---

## Troubleshooting

### CORS Errors
```
Cross-Origin Request Blocked
```
**Solution**: Update CORS configuration in `backend/app.py`

### Backend Not Responding
```
Connection refused
```
**Solution**: 
1. Check Render dashboard for errors
2. Verify environment variables are set
3. Check API URL in frontend

### Slow Predictions
**Solution**:
1. Optimize prediction logic in `utils.py`
2. Add caching for repeated symptoms
3. Monitor server performance on Render

### Build Failures on Netlify
**Solution**:
1. Check build logs in Netlify
2. Ensure `package.json` is in `frontend/`
3. Verify Node version compatibility

---

## Custom Domain Setup

### Render
1. Go to Custom Domain in settings
2. Add your domain
3. Update DNS records

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Update DNS records

---

## Example Deployment Commands

```bash
# Local testing
cd backend && python app.py &
cd frontend && npm run dev

# Build for production
cd frontend && npm run build

# Test production build
cd frontend && npm run preview

# Deploy to GitHub
git add .
git commit -m "Production ready"
git push origin main

# Both Render and Netlify auto-deploy from main branch
```

---

## Environment Variables Summary

### Backend (.env)
```
FLASK_ENV=production
API_NINJAS_KEY=your-actual-api-key
PORT=5000
```

### Frontend (Netlify Environment Variables)
```
REACT_APP_API_URL=https://symptotwin-api.onrender.com/api
```

---

## Support & Resources

- [Render Docs](https://docs.render.com)
- [Netlify Docs](https://docs.netlify.com)
- [Flask Deployment](https://flask.palletsprojects.com/deployment/)
- [React Deployment](https://react.dev/learn/start-a-new-react-project#production-grade-tools)

---

Happy deploying! 🚀
