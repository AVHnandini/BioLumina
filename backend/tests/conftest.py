import os
import sys

# Make backend importable when tests run from workspace root
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import werkzeug
if not hasattr(werkzeug, '__version__'):
    # Some Werkzeug builds (recent) don't expose __version__; provide a safe default for Flask test client
    werkzeug.__version__ = '3.0.0'

from app import app as flask_app
import pytest


@pytest.fixture
def client():
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as client:
        yield client
