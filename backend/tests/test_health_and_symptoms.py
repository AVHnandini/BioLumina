import json
import pytest

import os
import sys

# Make backend importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app as flask_app


def test_health(client):
    r = client.get('/api/health')
    assert r.status_code == 200
    data = r.get_json()
    assert data.get('status') == 'healthy'
    assert 'service' in data and 'version' in data


def test_get_symptoms(client):
    r = client.get('/api/symptoms')
    assert r.status_code == 200
    data = r.get_json()
    assert isinstance(data.get('symptoms'), list)


def test_predict_validation(client):
    # Missing body
    r = client.post('/api/predict', data='{}', content_type='application/json')
    assert r.status_code == 400

    # Invalid age
    body = {"age": -1, "gender": "male", "symptoms": ["fever"]}
    r = client.post('/api/predict', data=json.dumps(body), content_type='application/json')
    assert r.status_code == 400

    # Valid request
    body = {"age": 30, "gender": "male", "symptoms": ["fever"]}
    r = client.post('/api/predict', data=json.dumps(body), content_type='application/json')
    assert r.status_code == 200
    data = r.get_json()
    assert data.get('status') == 'success'
