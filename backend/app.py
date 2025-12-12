"""
SymptoTwin Backend - Flask API for Health Assessment & Condition Prediction
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import logging
import os
from typing import Dict, Any
from utils import predict_conditions, get_condition_suggestions
from memorymate_routes import memorymate_bp
from medxplain_routes import medxplain_bp
from fakemed_routes import fakemed_bp

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Flask-Mail for email notifications
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', True)
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME', 'your-email@gmail.com')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD', 'your-app-password')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', 'MemoryMate <noreply@memorymate.com>')

mail = Mail(app)

# Register blueprints for new features
app.register_blueprint(memorymate_bp)
app.register_blueprint(medxplain_bp)
app.register_blueprint(fakemed_bp)

# Make mail available to blueprints
app.mail = mail

# Available symptoms list
AVAILABLE_SYMPTOMS = [
    "headache",
    "fever",
    "cough",
    "sore_throat",
    "chest_pain",
    "shortness_of_breath",
    "nausea",
    "diarrhea",
    "body_aches",
    "fatigue",
]


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    
    Returns:
        JSON response with server status
    """
    return jsonify({
        "status": "healthy",
        "service": "SymptoTwin API",
        "version": "1.0.0"
    }), 200


@app.route('/api/symptoms', methods=['GET'])
def get_symptoms():
    """
    Get list of available symptoms.
    
    Returns:
        JSON list of available symptoms
    """
    return jsonify({
        "symptoms": AVAILABLE_SYMPTOMS
    }), 200


@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Predict health conditions based on symptoms.
    
    Expected JSON body:
    {
        "age": 22,
        "gender": "female",
        "symptoms": ["headache", "fever"]
    }
    
    Returns:
        JSON response with predicted conditions
    """
    try:
        # Parse request data
        data = request.get_json()
        
        if not data:
            return jsonify({
                "error": "No JSON data provided",
                "status": "failed"
            }), 400
        
        # Validate required fields
        age = data.get('age')
        gender = data.get('gender')
        symptoms = data.get('symptoms', [])
        
        # Validation
        if age is None:
            return jsonify({
                "error": "Age is required",
                "status": "failed"
            }), 400
        
        if not isinstance(age, int) or age < 0 or age > 150:
            return jsonify({
                "error": "Age must be a valid integer between 0 and 150",
                "status": "failed"
            }), 400
        
        if not gender or gender.lower() not in ['male', 'female']:
            return jsonify({
                "error": "Gender must be 'male' or 'female'",
                "status": "failed"
            }), 400
        
        if not symptoms or not isinstance(symptoms, list) or len(symptoms) == 0:
            return jsonify({
                "error": "At least one symptom is required",
                "status": "failed"
            }), 400
        
        # Validate symptoms
        invalid_symptoms = [s for s in symptoms if s.lower() not in AVAILABLE_SYMPTOMS]
        if invalid_symptoms:
            return jsonify({
                "error": f"Invalid symptoms: {invalid_symptoms}",
                "status": "failed",
                "available_symptoms": AVAILABLE_SYMPTOMS
            }), 400
        
        logger.info(f"Predicting for age={age}, gender={gender}, symptoms={symptoms}")
        
        # Get predictions
        conditions = predict_conditions(age, gender, symptoms)
        
        if not conditions:
            return jsonify({
                "error": "No conditions found for given symptoms",
                "status": "failed"
            }), 404

        # Attach suggestions for each predicted condition
        for cond in conditions:
            try:
                cond_name = cond.get('name') if isinstance(cond, dict) else str(cond)
                cond['suggestions'] = get_condition_suggestions(cond_name)
            except Exception:
                cond['suggestions'] = {}
        
        # Build response
        response = {
            "status": "success",
            "input": {
                "age": age,
                "gender": gender,
                "symptoms": symptoms
            },
            "conditions": conditions,
            "message": "Prediction completed successfully. Please consult a medical professional for diagnosis."
        }
        
        logger.info(f"Successfully predicted {len(conditions)} conditions")
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Error in /api/predict: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "status": "failed",
            "details": str(e)
        }), 500


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({
        "error": "Endpoint not found",
        "status": "failed"
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return jsonify({
        "error": "Internal server error",
        "status": "failed"
    }), 500


if __name__ == '__main__':
    logger.info("Starting SymptoTwin Backend API...")
    app.run(debug=True, host='localhost', port=5000)
