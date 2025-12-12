# SymptoTwin - Health Assessment & Condition Predictor

A full-stack web application for AI-powered health assessment and condition prediction.

## 🎯 Features

### Frontend (React + Tailwind CSS)
- ✅ Modern, responsive UI with gradient designs
- ✅ Multi-symptom selection with dropdown
- ✅ Real-time form validation
- ✅ Smooth animations and transitions
- ✅ Data visualization (bar & pie charts)
- ✅ Medical-themed design
- ✅ Mobile-friendly layout

### Backend (Flask)
- ✅ RESTful API with CORS support
- ✅ Symptom-to-condition prediction
- ✅ Probability calculation
- ✅ Severity classification
- ✅ Comprehensive error handling
- ✅ Structured logging

## 📁 Project Structure

```
symptotwin/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── index.html
├── backend/
│   ├── app.py                 # Flask application
│   ├── utils.py               # Prediction logic
│   ├── requirements.txt
│   └── .env
└── README.md
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Run server
python app.py
```

Server will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

App will open at `http://localhost:3000`

## 📝 API Documentation

### POST /api/predict

**Request:**
```json
{
  "age": 25,
  "gender": "female",
  "symptoms": ["headache", "fever"]
}
```

**Response:**
```json
{
  "status": "success",
  "conditions": [
    {
      "name": "Migraine",
      "probability": 85.5,
      "severity": "medium"
    }
  ]
}
```

## 🎨 Design Highlights

- **Color Scheme**: Blue (#2563eb), Teal (#14b8a6), White
- **Components**: Rounded cards, shadow effects, smooth transitions
- **Typography**: Clean, readable fonts
- **Animations**: Fade-in effects, smooth loading spinners
- **Responsive**: Mobile-first design with Tailwind CSS

## 🏗️ Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- Recharts
- Tailwind CSS

### Backend
- Flask
- Flask-CORS
- Requests
- Python 3.8+

## 📦 Deployment

### Frontend (Netlify)
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set environment: `REACT_APP_API_URL=https://backend-url/api`

### Backend (Render)
1. Connect GitHub repo
2. Start command: `python app.py`
3. Set PORT: 5000

## 📋 Available Symptoms

- Headache
- Fever
- Cough
- Sore Throat
- Chest Pain
- Shortness of Breath
- Nausea
- Diarrhea
- Body Aches
- Fatigue

## ⚕️ Medical Disclaimer

This tool is **FOR INFORMATIONAL PURPOSES ONLY**. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional.

## 🔐 Privacy

- No data is stored on servers
- All predictions are processed in real-time
- HTTPS encryption recommended for production

## 📞 Support

For issues or questions, please create an issue on GitHub.

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

**Built with ❤️ for health**

## 🤖 AI Chatbot (Optional)

You can enable an on-site assistant powered by OpenAI that answers user questions and helps navigate SymptoTwin. Add the following to your backend `.env` file (copy from `.env.example`):

```
OPENAI_API_KEY=<your-openai-api-key>
OPENAI_MODEL=gpt-3.5-turbo
```

Once configured, the frontend will load a floating chatbot icon which opens a helpful assistant. The backend proxies chat messages to the OpenAI Chat Completions API. If no API key is set, the application will return a simple, safe fallback response.

Security & Usage Tips:
- Treat the OpenAI API key as a secret and never commit it to source control.
- For production, configure the environment using your hosting provider's secure variables.
- Keep message sizes reasonable; the app uses a moderate limit for max tokens to avoid high usage costs.

Example API call (curl):
```
curl -X POST -H "Content-Type: application/json" -d '{"message": "How do I use SymptoTwin?"}' http://localhost:5000/api/chat
```

