"""
Database models for MemoryMate and user authentication.
Using simple JSON-based storage instead of heavy database.
"""

import json
import os
from datetime import datetime
from typing import List, Dict, Any

# Data directory
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
os.makedirs(DATA_DIR, exist_ok=True)

USERS_FILE = os.path.join(DATA_DIR, 'users.json')
MEDICINES_FILE = os.path.join(DATA_DIR, 'medicines.json')

# Initialize files if they don't exist
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        json.dump({}, f)

if not os.path.exists(MEDICINES_FILE):
    with open(MEDICINES_FILE, 'w') as f:
        json.dump({}, f)


class User:
    """User model for authentication."""
    
    @staticmethod
    def register(email: str, name: str, password: str) -> Dict[str, Any]:
        """Register a new user."""
        try:
            # Normalize email
            email = str(email).lower().strip()
            name = str(name).strip()
            password = str(password).strip()
            
            with open(USERS_FILE, 'r') as f:
                users = json.load(f)
            
            # Ensure users is a dict
            if not isinstance(users, dict):
                users = {}
            
            # Check if user already exists
            if email in users:
                return {'success': False, 'error': 'User already exists'}
            
            # Store user (in production, hash password with bcrypt)
            users[email] = {
                'name': name,
                'email': email,
                'password': password,  # WARNING: Never store plain passwords in production!
                'created_at': datetime.now().isoformat(),
                'email_notifications_enabled': False  # Initialize email preference
            }
            
            with open(USERS_FILE, 'w') as f:
                json.dump(users, f, indent=2, default=str)
            
            return {'success': True, 'message': 'User registered successfully'}
        except Exception as e:
            import traceback
            return {'success': False, 'error': str(e), 'details': traceback.format_exc()}
    
    @staticmethod
    def login(email: str, password: str) -> Dict[str, Any]:
        """Login user."""
        try:
            # Normalize email
            email = str(email).lower().strip()
            password = str(password).strip()
            
            with open(USERS_FILE, 'r') as f:
                users = json.load(f)
            
            if not isinstance(users, dict) or email not in users:
                return {'success': False, 'error': 'User not found'}
            
            user = users[email]
            if user['password'] != password:
                return {'success': False, 'error': 'Invalid password'}
            
            return {
                'success': True,
                'user': {
                    'email': email,
                    'name': user['name']
                }
            }
        except Exception as e:
            import traceback
            return {'success': False, 'error': str(e), 'details': traceback.format_exc()}
    
    @staticmethod
    def get_user(email: str) -> Dict[str, Any]:
        """Get user details."""
        try:
            # Normalize email
            email = str(email).lower().strip()
            
            with open(USERS_FILE, 'r') as f:
                users = json.load(f)
            
            if not isinstance(users, dict) or email not in users:
                return None
            
            return users[email]
        except Exception as e:
            return None
    
    @staticmethod
    def set_email_preference(email: str, enabled: bool) -> Dict[str, Any]:
        """Set email notification preference for user."""
        try:
            # Normalize email
            email = str(email).lower().strip()
            enabled = bool(enabled)
            
            with open(USERS_FILE, 'r') as f:
                users = json.load(f)
            
            if not isinstance(users, dict):
                users = {}
            
            if email not in users:
                return {'success': False, 'error': 'User not found'}
            
            users[email]['email_notifications_enabled'] = enabled
            
            with open(USERS_FILE, 'w') as f:
                json.dump(users, f, indent=2, default=str)
            
            status = 'enabled' if enabled else 'disabled'
            return {
                'success': True,
                'message': f'Email notifications {status}',
                'email_notifications_enabled': enabled
            }
        except Exception as e:
            import traceback
            return {'success': False, 'error': str(e), 'details': traceback.format_exc()}


class Medicine:
    """Medicine reminder model."""
    
    @staticmethod
    def add_medicine(email: str, medicine_data: Dict[str, Any]) -> Dict[str, Any]:
        """Add a new medicine."""
        try:
            # Ensure email is a string
            email = str(email).lower().strip()
            
            with open(MEDICINES_FILE, 'r') as f:
                medicines = json.load(f)
            
            # Ensure medicines is a dict
            if not isinstance(medicines, dict):
                medicines = {}
            
            if email not in medicines:
                medicines[email] = []
            
            # Ensure medicines[email] is a list
            if not isinstance(medicines[email], list):
                medicines[email] = []
            
            medicine = {
                'id': len(medicines[email]) + 1,
                'name': str(medicine_data.get('name', '')).strip(),
                'dosage': str(medicine_data.get('dosage', '')).strip(),
                'frequency': str(medicine_data.get('frequency', 'once')).strip(),
                'time_of_day': str(medicine_data.get('time_of_day', 'morning')).strip(),
                'start_date': str(medicine_data.get('start_date', '')).strip(),
                'end_date': str(medicine_data.get('end_date', '')).strip(),
                'created_at': datetime.now().isoformat()
            }
            
            medicines[email].append(medicine)
            
            with open(MEDICINES_FILE, 'w') as f:
                json.dump(medicines, f, indent=2, default=str)
            
            return {'success': True, 'message': 'Medicine added', 'medicine': medicine}
        except Exception as e:
            import traceback
            return {'success': False, 'error': str(e), 'details': traceback.format_exc()}
    
    @staticmethod
    def get_medicines(email: str) -> List[Dict[str, Any]]:
        """Get all medicines for a user."""
        try:
            email = str(email).lower().strip()
            
            with open(MEDICINES_FILE, 'r') as f:
                medicines = json.load(f)
            
            if not isinstance(medicines, dict):
                return []
            
            return medicines.get(email, [])
        except Exception as e:
            return []
    
    @staticmethod
    def update_medicine(email: str, medicine_id: int, medicine_data: Dict[str, Any]) -> Dict[str, Any]:
        """Update a medicine."""
        try:
            email = str(email).lower().strip()
            
            with open(MEDICINES_FILE, 'r') as f:
                medicines = json.load(f)
            
            if not isinstance(medicines, dict) or email not in medicines:
                return {'success': False, 'error': 'No medicines found'}
            
            for medicine in medicines[email]:
                if medicine['id'] == medicine_id:
                    # Update with string conversions
                    medicine['name'] = str(medicine_data.get('name', medicine['name'])).strip()
                    medicine['dosage'] = str(medicine_data.get('dosage', medicine['dosage'])).strip()
                    medicine['frequency'] = str(medicine_data.get('frequency', medicine['frequency'])).strip()
                    medicine['time_of_day'] = str(medicine_data.get('time_of_day', medicine['time_of_day'])).strip()
                    medicine['start_date'] = str(medicine_data.get('start_date', medicine['start_date'])).strip()
                    medicine['end_date'] = str(medicine_data.get('end_date', medicine['end_date'])).strip()
                    
                    with open(MEDICINES_FILE, 'w') as f:
                        json.dump(medicines, f, indent=2, default=str)
                    
                    return {'success': True, 'message': 'Medicine updated', 'medicine': medicine}
            
            return {'success': False, 'error': 'Medicine not found'}
        except Exception as e:
            import traceback
            return {'success': False, 'error': str(e), 'details': traceback.format_exc()}
    
    @staticmethod
    def delete_medicine(email: str, medicine_id: int) -> Dict[str, Any]:
        """Delete a medicine."""
        try:
            email = str(email).lower().strip()
            
            with open(MEDICINES_FILE, 'r') as f:
                medicines = json.load(f)
            
            if not isinstance(medicines, dict) or email not in medicines:
                return {'success': False, 'error': 'No medicines found'}
            
            original_count = len(medicines[email])
            medicines[email] = [m for m in medicines[email] if m['id'] != medicine_id]
            
            if len(medicines[email]) == original_count:
                return {'success': False, 'error': 'Medicine not found'}
            
            with open(MEDICINES_FILE, 'w') as f:
                json.dump(medicines, f, indent=2, default=str)
            
            return {'success': True, 'message': 'Medicine deleted'}
        except Exception as e:
            import traceback
            return {'success': False, 'error': str(e), 'details': traceback.format_exc()}
