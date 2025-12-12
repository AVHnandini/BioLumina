"""
AI Chat routes - Proxy to OpenAI Chat API or provide fallback responses
"""
from flask import Blueprint, request, jsonify, current_app
import os
import openai
import logging
import json
from pathlib import Path

ai_bp = Blueprint('ai', __name__, url_prefix='/api')

logger = logging.getLogger(__name__)


def openai_client():
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        return None
    openai.api_key = api_key
    return openai


def load_faqs():
    """Load FAQ JSON dataset from backend/data/faqs.json"""
    try:
        data_path = Path(__file__).parent / 'data' / 'faqs.json'
        if data_path.exists():
            return json.loads(data_path.read_text(encoding='utf-8'))
    except Exception as e:
        logger.error(f"Failed to load FAQs: {e}")
    return []


FAQS = load_faqs()


def find_faq_answer(user_message):
    """Simple keyword-based FAQ matching. Returns best answer or None."""
    if not user_message:
        return None
    text = user_message.lower()
    # Check for exact question match first
    for entry in FAQS:
        if entry.get('question', '').strip().lower() == text:
            return entry

    # Keyword match scoring
    best = None
    best_score = 0
    for entry in FAQS:
        keywords = entry.get('keywords', [])
        score = 0
        for kw in keywords:
            if kw.lower() in text:
                score += 1
        if score > best_score:
            best_score = score
            best = entry

    # Accept matches with at least one keyword hit
    if best_score > 0:
        return best
    return None


def _with_security_flag(payload: dict):
    """Attach whether the request was over HTTPS (useful to remind about HTTPS in production)."""
    try:
        payload['secure'] = bool(request.is_secure)
    except Exception:
        payload['secure'] = False
    return payload


def fallback_response(message, history=None):
    # Very simple fallback: echo with helpful suggestions
    reply = f"I heard you say: '{message}'. I'm a simple chatbot that can help with basic guidance. "
    reply += "You can ask me about symptom checks, how to use SymptoTwin features, or how to get help."
    return reply


CHATBOT_SYSTEM_PROMPT = (
    "You are the SymptoTwin assistant. Help users navigate the BioLumina website and explain these features in simple, non-technical language:\n"
    "1) Symptom Prediction: guides users to predict possible conditions using age, gender, and symptoms.\n"
    "2) Fake Medicine Detection: explains how to upload or scan medicines to look for tampering signs.\n"
    "3) MedXplain: simplifies prescriptions and test reports into easy-to-understand text.\n"
    "4) MemoryMate: helps users set medication reminders and track schedules.\n"
    "Always include the following disclaimer at the end of every reply: 'This chatbot provides guidance on website features only and is not a medical diagnosis tool.'"
)


@ai_bp.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json(force=True)
        user_message = data.get('message', '').strip()
        history = data.get('history', [])

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        client = openai_client()
        if client:
            # Build messages list for chat completion
            # Build messages list for chat completion with system prompt that describes the site
            messages = [{"role": "system", "content": CHATBOT_SYSTEM_PROMPT}]
            # Append conversation history if provided
            for item in history:
                # Expecting history items like {role: 'user'|'assistant', content: '...'}
                if 'role' in item and 'content' in item:
                    messages.append({"role": item['role'], "content": item['content']})

            messages.append({"role": "user", "content": user_message})

            # Check FAQ first (quick path) before sending to OpenAI
            faq = find_faq_answer(user_message)
            if faq:
                answer = faq.get('answer')
                disclaimer = "This chatbot provides guidance on website features only and is not a medical diagnosis tool."
                return jsonify(_with_security_flag({"success": True, "reply": answer, "source": "faq", "disclaimer": disclaimer})), 200

            logger.info('Forwarding chat to OpenAI API')
            try:
                resp = client.ChatCompletion.create(
                    model=os.getenv('OPENAI_MODEL', 'gpt-3.5-turbo'),
                    messages=messages,
                    max_tokens=300,
                    temperature=0.6,
                )
                assistant_text = resp.choices[0].message['content'].strip()
                # Ensure disclaimer appended (in case model doesn't include it)
                disclaimer = "This chatbot provides guidance on website features only and is not a medical diagnosis tool."
                if disclaimer not in assistant_text:
                    assistant_text = assistant_text + "\n\n" + disclaimer
                return jsonify(_with_security_flag({"success": True, "reply": assistant_text, "source": "openai", "disclaimer": disclaimer})), 200
            except Exception as e:
                logger.error(f"OpenAI API error: {e}")
                # Fall back to non-OpenAI responder
                fallback = fallback_response(user_message, history)
                disclaimer = "This chatbot provides guidance on website features only and is not a medical diagnosis tool."
                if disclaimer not in fallback:
                    fallback = fallback + "\n\n" + disclaimer
                return jsonify(_with_security_flag({"success": True, "reply": fallback, "warning": "OpenAI API error, returning fallback reply.", "disclaimer": disclaimer})), 200
        else:
            # No OpenAI API key configured — fallback
            logger.warning('No OPENAI_API_KEY configured — using fallback responses')
            faq = find_faq_answer(user_message)
            if faq:
                answer = faq.get('answer')
                disclaimer = "This chatbot provides guidance on website features only and is not a medical diagnosis tool."
                return jsonify(_with_security_flag({"success": True, "reply": answer, "source": "faq", "disclaimer": disclaimer, "warning": "OpenAI API key not configured; using FAQ or fallback."})), 200

            fallback = fallback_response(user_message, history)
            disclaimer = "This chatbot provides guidance on website features only and is not a medical diagnosis tool."
            if disclaimer not in fallback:
                fallback = fallback + "\n\n" + disclaimer
            return jsonify(_with_security_flag({"success": True, "reply": fallback, "warning": "OpenAI API key not configured; using fallback responses.", "disclaimer": disclaimer})), 200
    except Exception as e:
        logger.error(f"Chat endpoint error: {e}")
        return jsonify({"error": str(e)}), 500


@ai_bp.route('/faqs', methods=['GET'])
def faqs():
    """Return a brief list of FAQs to the frontend for quick replies."""
    try:
        simple = [{"id": f.get('id'), "question": f.get('question')} for f in FAQS]
        return jsonify({"success": True, "faqs": simple}), 200
    except Exception as e:
        logger.error(f"Failed to return faqs: {e}")
        return jsonify({"success": False, "error": str(e)}), 500
