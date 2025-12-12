# API Testing Guide for SymptoTwin

## Using cURL

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Get Available Symptoms
```bash
curl http://localhost:5000/api/symptoms
```

### 3. Predict Conditions
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 22,
    "gender": "female",
    "symptoms": ["headache", "fever"]
  }'
```

## Using Postman

### Import Collection
1. Open Postman
2. File → New → HTTP Request
3. Create requests for each endpoint

### Example Request
- **URL**: `http://localhost:5000/api/predict`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body** (JSON):
```json
{
  "age": 25,
  "gender": "male",
  "symptoms": ["cough", "body_aches", "fatigue"]
}
```

## Using Python Requests

```python
import requests

# Health check
response = requests.get('http://localhost:5000/api/health')
print(response.json())

# Predict conditions
data = {
    "age": 30,
    "gender": "female",
    "symptoms": ["fever", "cough", "sore_throat"]
}
response = requests.post('http://localhost:5000/api/predict', json=data)
print(response.json())
```

## Test Data

### Test Case 1: Common Cold
```json
{
  "age": 20,
  "gender": "male",
  "symptoms": ["cough", "fever", "sore_throat"]
}
```

### Test Case 2: Migraine
```json
{
  "age": 35,
  "gender": "female",
  "symptoms": ["headache", "nausea"]
}
```

### Test Case 3: Gastroenteritis
```json
{
  "age": 28,
  "gender": "male",
  "symptoms": ["nausea", "diarrhea", "body_aches"]
}
```

### Test Case 4: Respiratory Issue
```json
{
  "age": 45,
  "gender": "female",
  "symptoms": ["cough", "shortness_of_breath", "chest_pain"]
}
```

## Expected Responses

### Success Response (200)
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
    {
      "name": "Tension Headache",
      "probability": 70.0,
      "severity": "low",
      "color": "green"
    }
  ],
  "message": "Prediction completed successfully. Please consult a medical professional for diagnosis."
}
```

### Error Response (400)
```json
{
  "error": "Age must be a valid integer between 0 and 150",
  "status": "failed"
}
```

### Error Response (500)
```json
{
  "error": "Internal server error",
  "status": "failed",
  "details": "Error details here"
}
```

## Validation Rules

### Age
- Must be integer
- Must be between 0 and 150

### Gender
- Must be "male" or "female" (case-insensitive)

### Symptoms
- Must be non-empty array
- Valid symptoms: headache, fever, cough, sore_throat, chest_pain, shortness_of_breath, nausea, diarrhea, body_aches, fatigue

## Performance Testing

### Load Test with Apache Bench
```bash
ab -n 100 -c 10 http://localhost:5000/api/health
```

### Response Time Test
```bash
time curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"age": 25, "gender": "male", "symptoms": ["headache"]}'
```

## Debugging Tips

1. **Check server logs** - Look for error messages in terminal
2. **Validate JSON** - Use `json.tool` to verify
3. **Enable Flask debug** - Set `FLASK_DEBUG=True` in .env
4. **Use browser DevTools** - Check Network tab for requests
5. **Test endpoints individually** - Start with /api/health

## Common Issues

### CORS Error
- Ensure Flask-CORS is installed
- Verify frontend URL in CORS configuration

### Connection Refused
- Check if backend is running on port 5000
- Run `python app.py` to start server

### 404 Not Found
- Verify endpoint path
- Check Flask route definitions

### Validation Error
- Check JSON format
- Verify field values match requirements
