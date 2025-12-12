import json
import os
import sys

# Ensure backend package is importable when running tests from project root
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app as flask_app


def test_get_faqs(client):
    r = client.get('/api/faqs')
    assert r.status_code == 200
    data = r.get_json()
    assert data.get('success') is True
    assert isinstance(data.get('faqs'), list)


def test_chat_faq_match(client):
    payload = {"message": "How does Symptom Prediction work?"}
    r = client.post('/api/chat', data=json.dumps(payload), content_type='application/json')
    assert r.status_code == 200
    data = r.get_json()
    assert data.get('success') is True
    # FAQ path should return source == 'faq' when matches
    assert data.get('source') == 'faq'


def test_chat_empty_message(client):
    payload = {"message": ""}
    r = client.post('/api/chat', data=json.dumps(payload), content_type='application/json')
    assert r.status_code == 400
    data = r.get_json()
    assert 'error' in data
