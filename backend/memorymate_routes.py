"""
MemoryMate - Medicine Reminder System Routes
"""

from flask import Blueprint, request, jsonify, current_app
from models import User, Medicine
from datetime import datetime
from utils import send_medicine_reminder_email

memorymate_bp = Blueprint('memorymate', __name__, url_prefix='/api/memorymate')


@memorymate_bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('name') or not data.get('password'):
            return jsonify({'error': 'Missing required fields'}), 400
        
        result = User.register(data['email'], data['name'], data['password'])
        
        if result['success']:
            return jsonify(result), 201
        else:
            return jsonify(result), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@memorymate_bp.route('/login', methods=['POST'])
def login():
    """Login user."""
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Missing email or password'}), 400
        
        result = User.login(data['email'], data['password'])
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@memorymate_bp.route('/add_medicine', methods=['POST'])
def add_medicine():
    """Add a new medicine reminder."""
    try:
        data = request.get_json()
        email = str(data.get('email', '')).lower().strip()
        
        if not email:
            return jsonify({'error': 'Email required'}), 400
        
        required_fields = ['name', 'dosage', 'frequency', 'time_of_day', 'start_date', 'end_date']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        result = Medicine.add_medicine(email, {
            'name': data['name'],
            'dosage': data['dosage'],
            'frequency': data['frequency'],
            'time_of_day': data['time_of_day'],
            'start_date': data['start_date'],
            'end_date': data['end_date']
        })
        
        if result['success']:
            return jsonify(result), 201
        else:
            return jsonify(result), 400
    except Exception as e:
        import traceback
        return jsonify({'error': str(e), 'details': traceback.format_exc()}), 500


@memorymate_bp.route('/list_medicines/<email>', methods=['GET'])
def list_medicines(email):
    """Get all medicines for a user."""
    try:
        email = str(email).lower().strip()
        medicines = Medicine.get_medicines(email)
        return jsonify({'medicines': medicines}), 200
    except Exception as e:
        import traceback
        return jsonify({'error': str(e), 'details': traceback.format_exc()}), 500


@memorymate_bp.route('/edit_medicine/<email>/<int:medicine_id>', methods=['PUT'])
def edit_medicine(email, medicine_id):
    """Edit a medicine."""
    try:
        email = str(email).lower().strip()
        data = request.get_json()
        
        result = Medicine.update_medicine(email, medicine_id, data)
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 400
    except Exception as e:
        import traceback
        return jsonify({'error': str(e), 'details': traceback.format_exc()}), 500


@memorymate_bp.route('/delete_medicine/<email>/<int:medicine_id>', methods=['DELETE'])
def delete_medicine(email, medicine_id):
    """Delete a medicine."""
    try:
        email = str(email).lower().strip()
        
        result = Medicine.delete_medicine(email, medicine_id)
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 400
    except Exception as e:
        import traceback
        return jsonify({'error': str(e), 'details': traceback.format_exc()}), 500


@memorymate_bp.route('/check_medicines/<email>', methods=['GET'])
def check_medicines(email):
    """Check if any medicines are due now and send email notifications if enabled."""
    try:
        email = str(email).lower().strip()
        send_email = request.args.get('send_email', 'false').lower() == 'true'
        
        medicines = Medicine.get_medicines(email)
        user = User.get_user(email)
        current_time = datetime.now().strftime('%H:%M')
        current_hour = int(datetime.now().strftime('%H'))
        
        due_medicines = []
        
        for medicine in medicines:
            # Simple time matching logic
            time_of_day = str(medicine.get('time_of_day', '')).lower().strip()
            should_remind = False
            
            if time_of_day == 'morning' and 6 <= current_hour < 12:
                should_remind = True
            elif time_of_day == 'afternoon' and 12 <= current_hour < 18:
                should_remind = True
            elif time_of_day == 'night' and (current_hour >= 18 or current_hour < 6):
                should_remind = True
            
            if should_remind:
                due_medicines.append({
                    'name': medicine['name'],
                    'dosage': medicine['dosage'],
                    'frequency': medicine['frequency'],
                    'message': f"Time to take {medicine['name']} - {medicine['dosage']}"
                })
        
        # Send email notification if requested and medicines are due
        email_sent = False
        if send_email and due_medicines and user:
            try:
                email_sent = send_medicine_reminder_email(
                    current_app.mail,
                    email,
                    user.get('name', 'User'),
                    due_medicines
                )
            except Exception as e:
                import logging
                logger = logging.getLogger(__name__)
                logger.error(f"Failed to send email notification: {str(e)}")
        
        return jsonify({
            'due_medicines': due_medicines,
            'email_sent': email_sent,
            'timestamp': datetime.now().isoformat()
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@memorymate_bp.route('/email_preference/<email>', methods=['GET', 'POST'])
def email_preference(email):
    """Get or set email notification preferences."""
    try:
        email = str(email).lower().strip()
        
        if request.method == 'GET':
            # Get current preference
            user = User.get_user(email)
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            email_enabled = user.get('email_notifications_enabled', False)
            return jsonify({
                'email': email,
                'email_notifications_enabled': email_enabled
            }), 200
        
        elif request.method == 'POST':
            # Set preference
            data = request.get_json()
            enabled = data.get('enabled', False)
            
            result = User.set_email_preference(email, enabled)
            
            if result['success']:
                return jsonify(result), 200
            else:
                return jsonify(result), 400
    except Exception as e:
        import traceback
        return jsonify({'error': str(e), 'details': traceback.format_exc()}), 500
