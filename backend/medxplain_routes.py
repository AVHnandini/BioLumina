"""
MedXplain - Medical Report & Prescription AI Translator Routes
"""

from flask import Blueprint, request, jsonify
import base64
import os
from PIL import Image
import io

medxplain_bp = Blueprint('medxplain', __name__, url_prefix='/api/medxplain')

# Mock AI responses (in production, use OpenAI API)
MOCK_AI_RESPONSES = {
    'default': {
        'extracted_text': 'Amoxicillin 500mg, Take 1 tablet every 8 hours for 7 days',
        'simplified_meaning': 'This is an antibiotic used to fight bacterial infections.',
        'medicine_instructions': {
            'how_to_take': 'Take one tablet by mouth with a glass of water. Can be taken with or without food.',
            'why_prescribed': 'To treat bacterial infections such as ear infections, urinary tract infections, and respiratory infections.',
            'common_side_effects': 'Nausea, diarrhea, allergic reactions (rash, itching)',
            'interactions': 'May interact with birth control pills. Avoid alcohol. Do not mix with certain antibiotics.'
        },
        'dosage_guide': 'Standard adult dosage: 500mg every 8 hours (3 times daily). Duration: 7-10 days.'
    }
}


def extract_text_from_image(image_data):
    """
    Extract text from image using OCR.
    In production, use pytesseract for real OCR.
    """
    try:
        # For demo, return mock extracted text
        # In production: use pytesseract.image_to_string(image)
        return "Extracted text from prescription image"
    except Exception as e:
        return f"Error extracting text: {str(e)}"


def get_ai_explanation(extracted_text):
    """
    Get AI explanation using OpenAI or mock data.
    In production, call OpenAI API.
    """
    try:
        # For demo, return mock AI response
        # In production: use openai.ChatCompletion.create()
        return MOCK_AI_RESPONSES['default']
    except Exception as e:
        return {
            'error': str(e),
            'extracted_text': extracted_text,
            'simplified_meaning': 'Unable to get AI explanation at this time.'
        }


@medxplain_bp.route('/upload', methods=['POST'])
def upload_prescription():
    """Upload and analyze prescription image."""
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        # Validate file type
        allowed_extensions = {'jpg', 'jpeg', 'png', 'pdf'}
        if not file.filename.split('.')[-1].lower() in allowed_extensions:
            return jsonify({'error': 'Invalid file type. Allowed: JPG, PNG, PDF'}), 400
        
        # Read file content
        file_content = file.read()
        
        # Extract text (OCR)
        extracted_text = extract_text_from_image(file_content)
        
        # Get AI explanation
        ai_response = get_ai_explanation(extracted_text)
        
        return jsonify({
            'success': True,
            'extracted_text': extracted_text,
            'simplified_meaning': ai_response.get('simplified_meaning'),
            'medicine_instructions': ai_response.get('medicine_instructions'),
            'dosage_guide': ai_response.get('dosage_guide'),
            'filename': file.filename
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@medxplain_bp.route('/analyze_text', methods=['POST'])
def analyze_text():
    """Analyze prescription text (if user types it)."""
    try:
        data = request.get_json()
        text = data.get('text')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Get AI explanation
        ai_response = get_ai_explanation(text)
        
        return jsonify({
            'success': True,
            'input_text': text,
            'simplified_meaning': ai_response.get('simplified_meaning'),
            'medicine_instructions': ai_response.get('medicine_instructions'),
            'dosage_guide': ai_response.get('dosage_guide')
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@medxplain_bp.route('/demo', methods=['GET'])
def demo():
    """Get demo response for testing."""
    return jsonify(MOCK_AI_RESPONSES['default']), 200
