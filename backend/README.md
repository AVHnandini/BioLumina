# SymptoTwin - Backend API

## Setup Instructions

### Prerequisites
- Python 3.8+
- pip

### Installation

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Running the Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "SymptoTwin API",
  "version": "1.0.0"
}
```

### GET /api/symptoms
Get list of available symptoms.

**Response:**
```json
{
  "symptoms": ["headache", "fever", "cough", ...]
}
```

### POST /api/predict
Predict conditions based on symptoms.

**Request:**
```json
{
  "age": 22,
  "gender": "female",
  "symptoms": ["headache", "fever"]
}
```

**Response:**
```json
{
  "status": "success",
  "input": {
    "age": 22,
    "gender": "female",
    "symptoms": ["headache", "fever"]
  },
  "conditions": [
    {
      "name": "Migraine",
      "probability": 85.5,
      "severity": "medium",
      "color": "yellow"
    },
    ...
  ],
  "message": "Prediction completed successfully. Please consult a medical professional for diagnosis."
}
```

## Available Symptoms

- headache
- fever
- cough
- sore_throat
- chest_pain
- shortness_of_breath
- nausea
- diarrhea
- body_aches
- fatigue

## Project Structure

```
backend/
  app.py           # Main Flask application
  utils.py         # Utility functions and prediction logic
  requirements.txt # Python dependencies
  .env             # Environment variables (create this)
```

## Configuration

Create a `.env` file:

```
FLASK_ENV=development
FLASK_DEBUG=True
```

## Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set start command: `python app.py`
5. Deploy!

## Technologies

- **Flask** - Web framework
- **Flask-CORS** - Cross-Origin Resource Sharing
- **Requests** - HTTP client
- **Python** - Programming language

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad request
- `404` - Not found
- `500` - Server error

All errors include a JSON response with error details.

## CORS Configuration

CORS is enabled for all routes. In production, restrict to specific domains:

```python
CORS(app, resources={r"/api/*": {"origins": ["https://yourdomain.com"]}})
```

## Logging

The application logs all requests and errors. Check logs in the terminal output.

## Future Enhancements

- [ ] Integration with real medical APIs (API Ninjas, Infermedica)
- [ ] Database for result history
- [ ] User authentication
- [ ] Advanced ML model for better predictions
- [ ] Multi-language support
