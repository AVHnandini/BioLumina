import os
import sys

# Make backend importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app as flask_app


def test_fakemed_demo(client):
    r = client.get('/api/fakemed/demo')
    assert r.status_code == 200
    data = r.get_json()
    assert data.get('success') is True
    analysis = data.get('analysis')
    assert isinstance(analysis, dict)
    assert 'confidence' in analysis


def test_medxplain_demo(client):
    r = client.get('/api/medxplain/demo')
    assert r.status_code == 200
    data = r.get_json()
    assert data.get('success') is True
    analysis = data.get('analysis')
    assert isinstance(analysis, dict)
    assert 'simplified_meaning' in analysis
