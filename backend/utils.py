"""
Utility functions for disease prediction and API integration.
"""

import requests
import logging
from collections import defaultdict
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

# Common symptoms and their mappings
SYMPTOM_MAPPINGS = {
    "headache": ["headache", "migraine"],
    "fever": ["fever", "high temperature"],
    "cough": ["cough", "persistent cough"],
    "sore_throat": ["sore throat", "pharyngitis"],
    "chest_pain": ["chest pain", "chest discomfort"],
    "shortness_of_breath": ["shortness of breath", "dyspnea"],
    "nausea": ["nausea", "feeling sick"],
    "diarrhea": ["diarrhea", "loose stools"],
    "body_aches": ["body aches", "muscle pain"],
    "fatigue": ["fatigue", "tiredness"],
}

# Severity classification based on condition characteristics
SEVERITY_MAPPING = {
    "low": ["common cold", "allergies", "rhinitis", "headache", "minor cuts"],
    "medium": ["flu", "bronchitis", "migraine", "gastroenteritis", "sinusitis"],
    "high": ["pneumonia", "meningitis", "appendicitis", "heart attack", "stroke"],
}


def fetch_diseases_for_symptom(symptom: str) -> List[Dict[str, Any]]:
    """
    Fetch diseases from api-ninjas for a given symptom.
    
    Args:
        symptom: Symptom name to search for
        
    Returns:
        List of disease dictionaries
    """
    try:
        url = "https://api.api-ninjas.com/v1/disease"
        params = {"name": symptom}
        headers = {
            "X-Api-Key": "your-api-key-here",  # Replace with actual API key
            "User-Agent": "SymptoTwin/1.0"
        }
        
        response = requests.get(url, params=params, headers=headers, timeout=5)
        
        if response.status_code == 200:
            return response.json()
        else:
            logger.warning(f"API returned status code {response.status_code} for symptom: {symptom}")
            return []
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching diseases for symptom '{symptom}': {e}")
        return []


def aggregate_conditions(symptoms: List[str]) -> Dict[str, float]:
    """
    Aggregate conditions from multiple symptoms.
    Uses mock data if real API isn't available.
    
    Args:
        symptoms: List of symptoms
        
    Returns:
        Dictionary mapping condition names to probability scores
    """
    condition_scores = defaultdict(float)
    
    # Mock data for demonstration (replace with real API integration)
    mock_conditions = {
        "headache": {
            "Migraine": 0.85,
            "Tension Headache": 0.70,
            "Cluster Headache": 0.40,
        },
        "fever": {
            "Flu": 0.90,
            "Common Cold": 0.80,
            "Pneumonia": 0.60,
            "COVID-19": 0.75,
        },
        "cough": {
            "Common Cold": 0.75,
            "Flu": 0.80,
            "Bronchitis": 0.85,
            "Pneumonia": 0.70,
        },
        "sore_throat": {
            "Strep Throat": 0.80,
            "Common Cold": 0.70,
            "Pharyngitis": 0.75,
        },
        "chest_pain": {
            "Angina": 0.80,
            "Heart Attack": 0.60,
            "Pneumonia": 0.50,
        },
        "shortness_of_breath": {
            "Asthma": 0.85,
            "Pneumonia": 0.75,
            "Heart Disease": 0.70,
        },
        "nausea": {
            "Gastroenteritis": 0.80,
            "Migraine": 0.60,
            "Food Poisoning": 0.75,
        },
        "diarrhea": {
            "Gastroenteritis": 0.90,
            "IBS": 0.60,
            "Food Poisoning": 0.85,
        },
        "body_aches": {
            "Flu": 0.85,
            "Common Cold": 0.60,
            "COVID-19": 0.80,
        },
        "fatigue": {
            "Anemia": 0.75,
            "Thyroid Disorder": 0.70,
            "Depression": 0.65,
            "COVID-19": 0.80,
        },
    }
    
    for symptom in symptoms:
        # Normalize symptom name
        symptom_key = symptom.lower().replace(" ", "_")
        
        # Get conditions for this symptom
        if symptom_key in mock_conditions:
            for condition, score in mock_conditions[symptom_key].items():
                condition_scores[condition] += score
    
    # Normalize scores by number of symptoms
    if symptoms:
        for condition in condition_scores:
            condition_scores[condition] /= len(symptoms)
    
    return condition_scores


def classify_severity(condition: str) -> str:
    """
    Classify severity of a condition.
    
    Args:
        condition: Condition name
        
    Returns:
        Severity level: 'low', 'medium', or 'high'
    """
    condition_lower = condition.lower()
    
    for severity, conditions in SEVERITY_MAPPING.items():
        for cond in conditions:
            if cond.lower() in condition_lower or condition_lower in cond.lower():
                return severity
    
    # Default to medium severity
    return "medium"


def get_severity_color(severity: str) -> str:
    """
    Get color code for severity level.
    
    Args:
        severity: Severity level ('low', 'medium', 'high')
        
    Returns:
        Color code
    """
    color_map = {
        "low": "green",
        "medium": "yellow",
        "high": "red",
    }
    return color_map.get(severity, "gray")


def predict_conditions(age: int, gender: str, symptoms: List[str], top_n: int = 5) -> List[Dict[str, Any]]:
    """
    Predict conditions based on age, gender, and symptoms.
    
    Args:
        age: Patient age
        gender: Patient gender (male/female)
        symptoms: List of symptoms
        top_n: Number of top conditions to return
        
    Returns:
        List of predicted conditions with probabilities and severity
    """
    if not symptoms:
        return []
    
    # Aggregate conditions from symptoms
    condition_scores = aggregate_conditions(symptoms)
    
    if not condition_scores:
        return []
    
    # Age and gender adjustments (simple heuristics)
    age_multiplier = 1.0
    if age < 12:
        age_multiplier = 0.9  # Children have different condition distributions
    elif age > 65:
        age_multiplier = 1.1  # Elderly have higher risk for chronic conditions
    
    # Build result list
    results = []
    for condition, score in sorted(condition_scores.items(), key=lambda x: x[1], reverse=True)[:top_n]:
        # Normalize score to 0-1 range
        normalized_score = min(score / 2.0, 1.0)  # Divide by 2 to normalize aggregate scores
        
        severity = classify_severity(condition)
        
        results.append({
            "name": condition,
            "probability": round(normalized_score * 100, 1),
            "severity": severity,
            "color": get_severity_color(severity),
            # suggestions will be filled by get_condition_suggestions
            "suggestions": {}
        })
    
    # Enrich each result with suggestions
    for r in results:
        try:
            name = r.get('name')
            r['suggestions'] = get_condition_suggestions(name)
        except Exception:
            r['suggestions'] = {}

    return results



# Suggestions for conditions: medicines (general/supportive), diet, and precautions.
# These are general educational suggestions for early-stage supportive care only.
# Always advise users to consult a healthcare professional for diagnosis and prescription.
SUGGESTIONS = {
    "Migraine": {
        "medicines": ["paracetamol (acetaminophen)", "ibuprofen (if tolerated)"] ,
        "diet": ["avoid known triggers (caffeine, aged cheese, processed meats)", "stay hydrated"],
        "precautions": ["rest in a quiet, dark room", "apply cold compress to forehead"],
        "advice": "If headaches are sudden, severe, or accompanied by weakness, seek urgent care."
    },
    "Tension Headache": {
        "medicines": ["paracetamol", "ibuprofen (if appropriate)"],
        "diet": ["maintain regular meals and hydration"],
        "precautions": ["practice relaxation and posture correction", "take regular breaks from screens"],
        "advice": "Regular sleep and stress reduction often help. See a clinician if persistent."
    },
    "Cluster Headache": {
        "medicines": ["seek medical review (some treatments require prescription)"],
        "diet": ["avoid alcohol during cluster periods"],
        "precautions": ["track attack patterns and triggers"],
        "advice": "Cluster headaches can be severe — consult a specialist."
    },
    "Flu": {
        "medicines": ["paracetamol for fever/pain", "rest and symptomatic care"],
        "diet": ["hydration, warm broths, light easily digestible foods"],
        "precautions": ["stay home to reduce spread", "hand hygiene and masks if needed"],
        "advice": "If shortness of breath or high fever develops, seek medical care."
    },
    "Common Cold": {
        "medicines": ["paracetamol or ibuprofen for symptoms", "saline nasal drops"],
        "diet": ["warm fluids, honey for cough in adults/older children"],
        "precautions": ["rest, hand hygiene, avoid close contact"],
        "advice": "Most colds resolve in a week; see a clinician if symptoms worsen."
    },
    "Pneumonia": {
        "medicines": ["medical assessment required (antibiotics may be needed)"],
        "diet": ["maintain hydration and nutrition"],
        "precautions": ["seek prompt medical attention for cough with fever and breathlessness"],
        "advice": "Pneumonia can be serious — seek urgent medical care."
    },
    "COVID-19": {
        "medicines": ["paracetamol for fever/pain", "follow local public health guidance"],
        "diet": ["hydration, easy-to-digest nutritious foods"],
        "precautions": ["isolate per guidelines, monitor breathing and oxygen levels"],
        "advice": "Seek care for worsening breathlessness or persistent high fever."
    },
    "Bronchitis": {
        "medicines": ["symptomatic care (expectorants, paracetamol)", "inhalers if previously prescribed"],
        "diet": ["fluids and warm teas"],
        "precautions": ["rest, avoid smoking/irritants"],
        "advice": "See a clinician if cough is severe or prolonged."
    },
    "Strep Throat": {
        "medicines": ["medical review — antibiotics may be required"],
        "diet": ["soft, cool foods if sore throat makes swallowing painful"],
        "precautions": ["avoid sharing utensils, practice hand hygiene"],
        "advice": "Get a clinical assessment for sore throat with fever."
    },
    "Pharyngitis": {
        "medicines": ["paracetamol for pain", "salt water gargles"],
        "diet": ["soft, soothing foods and fluids"],
        "precautions": ["rest voice if hoarse, seek care if severe"],
        "advice": "If symptoms persist or worsen, consult a clinician."
    },
    "Angina": {
        "medicines": ["medical review required — angina can need prescription therapy"],
        "diet": ["heart-healthy diet (low salt, low saturated fat)"],
        "precautions": ["seek urgent care for new/worsening chest pain"],
        "advice": "Chest pain should be evaluated urgently."
    },
    "Heart Attack": {
        "medicines": ["emergency care required — call emergency services immediately"],
        "diet": ["N/A in emergency"],
        "precautions": ["do not delay — seek immediate emergency care"],
        "advice": "Immediate emergency response is essential."
    },
    "Asthma": {
        "medicines": ["use prescribed inhaler (short-acting bronchodilator) if available"],
        "diet": ["maintain hydration and avoid known food triggers"],
        "precautions": ["avoid smoke and allergens, have inhaler accessible"],
        "advice": "If breathing worsens despite inhaler, seek urgent care."
    },
    "Heart Disease": {
        "medicines": ["medical management required — follow clinician guidance"],
        "diet": ["heart-healthy diet, reduce salt and saturated fats"],
        "precautions": ["monitor symptoms and seek care for chest pain or severe breathlessness"],
        "advice": "Regular follow-up with cardiology is important."
    },
    "Gastroenteritis": {
        "medicines": ["oral rehydration solutions for dehydration", "antiemetics if prescribed"],
        "diet": ["BRAT diet (bananas, rice, applesauce, toast) initially", "avoid dairy and heavy foods"],
        "precautions": ["maintain hydration, hand hygiene"],
        "advice": "Seek care if unable to keep fluids down or signs of dehydration."
    },
    "Food Poisoning": {
        "medicines": ["oral rehydration", "seek care if severe"],
        "diet": ["clear fluids then bland diet as tolerated"],
        "precautions": ["rest, avoid solid foods until vomiting subsides"],
        "advice": "Seek medical help for high fever, bloody stools, or dehydration."
    },
    "IBS": {
        "medicines": ["discuss with clinician; fibre modifications and antispasmodics may help"],
        "diet": ["consider low-FODMAP approach with dietitian guidance"],
        "precautions": ["track triggers, manage stress"],
        "advice": "See a gastroenterologist or dietitian for chronic symptoms."
    },
    "Anemia": {
        "medicines": ["iron supplements if diagnosed by a clinician"],
        "diet": ["iron-rich foods (red meat, leafy greens), vitamin C to enhance absorption"],
        "precautions": ["avoid self-medicating without testing"],
        "advice": "Investigate causes with blood tests and clinician advice."
    },
    "Thyroid Disorder": {
        "medicines": ["requires medical evaluation and blood tests"],
        "diet": ["balanced diet, avoid excessive iodine without guidance"],
        "precautions": ["do not self-prescribe thyroid hormone"],
        "advice": "Get thyroid function tests and follow clinician treatment."
    },
    "Depression": {
        "medicines": ["psychological support and clinician assessment for therapy/medication"],
        "diet": ["regular nutritious meals and maintaining social contact"],
        "precautions": ["seek help if suicidal thoughts or severe functional decline"],
        "advice": "Contact mental health services for assessment and support."
    }
}


def get_condition_suggestions(condition: str) -> Dict[str, Any]:
    """
    Return supportive suggestions for a condition: medicines, diet, precautions, and advice.
    This is educational and not a substitute for professional medical advice.
    """
    # Try direct match, then case-insensitive contains match
    if condition in SUGGESTIONS:
        return SUGGESTIONS[condition]

    cond_lower = condition.lower()
    for key, val in SUGGESTIONS.items():
        if key.lower() in cond_lower or cond_lower in key.lower():
            return val

    # Default generic supportive suggestions
    return {
        "medicines": ["paracetamol for fever/pain as needed"],
        "diet": ["stay hydrated, eat light nutritious meals"],
        "precautions": ["rest and monitor symptoms, seek care if worsening"],
        "advice": "Consult a healthcare professional for diagnosis and treatment."
    }


def send_medicine_reminder_email(mail, recipient_email: str, user_name: str, medicines: List[Dict[str, Any]]) -> bool:
    """
    Send medicine reminder email to user.
    
    Args:
        mail: Flask-Mail instance
        recipient_email: User's email address
        user_name: User's name for personalization
        medicines: List of medicine dictionaries with name, dosage, frequency
        
    Returns:
        True if email sent successfully, False otherwise
    """
    try:
        from flask_mail import Message
        
        # Build medicine list HTML
        medicine_html = ""
        for med in medicines:
            medicine_html += f"""
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #ddd;">
                    <strong>{med.get('name', 'Unknown')}</strong>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #ddd;">
                    {med.get('dosage', 'N/A')}
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #ddd;">
                    {med.get('frequency', 'N/A')}
                </td>
            </tr>
            """
        
        # Create email HTML body
        html_body = f"""
        <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }}
                    .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }}
                    .content {{ background: white; padding: 20px; }}
                    .medicine-table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
                    .medicine-table th {{ background: #667eea; color: white; padding: 12px; text-align: left; }}
                    .footer {{ background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }}
                    .button {{ background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 15px; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>💊 MemoryMate Medicine Reminder</h1>
                    </div>
                    <div class="content">
                        <p>Hi <strong>{user_name}</strong>,</p>
                        <p>This is your medicine reminder from MemoryMate. The following medicines are due now:</p>
                        
                        <table class="medicine-table">
                            <thead>
                                <tr>
                                    <th>Medicine Name</th>
                                    <th>Dosage</th>
                                    <th>Frequency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicine_html}
                            </tbody>
                        </table>
                        
                        <p><strong>⏰ Action Required:</strong> Please take your medications as prescribed.</p>
                        <p>If you have any questions about your medicines, consult your healthcare provider.</p>
                        
                        <center>
                            <a href="http://localhost:3000/memorymate" class="button">View MemoryMate Dashboard</a>
                        </center>
                        
                        <p style="margin-top: 30px; font-size: 12px; color: #999;">
                            You're receiving this email because you have medicine reminders enabled in MemoryMate.
                        </p>
                    </div>
                    <div class="footer">
                        <p>MemoryMate © 2025 - Your Personal Health Assistant</p>
                        <p><a href="http://localhost:3000" style="color: #667eea; text-decoration: none;">Visit MemoryMate</a></p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Create message
        msg = Message(
            subject="💊 MemoryMate - Medicine Reminder",
            recipients=[recipient_email],
            html=html_body,
            sender="MemoryMate <noreply@memorymate.com>"
        )
        
        # Send email
        mail.send(msg)
        logger.info(f"Medicine reminder email sent successfully to {recipient_email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send medicine reminder email to {recipient_email}: {str(e)}")
        return False

