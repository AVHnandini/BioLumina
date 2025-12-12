"""
FakeMed - Detect fake medicines by image upload or photo capture
"""
from flask import Blueprint, request, jsonify
import base64
import io
from PIL import Image, ImageStat

fakemed_bp = Blueprint('fakemed', __name__, url_prefix='/api/fakemed')


def analyze_image_for_fake(image_bytes):
    """
    Very simple heuristic/fake detector for demo purposes.
    In production, this would call an ML model or remote API.
    We'll use simple heuristics: dimension checks & brightness variance.
    """
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        w, h = img.size
        stat = ImageStat.Stat(img)
        # Compute mean brightness approximation
        r, g, b = stat.mean
        brightness = (r + g + b) / 3.0
        contrast = stat.stddev[0] if stat.stddev else 0

        # Simple heuristics: very low brightness or very low contrast could indicate tampered/altered images.
        is_suspicious = False
        confidence = 0.5
        reasons = []
        if w < 200 or h < 200:
            is_suspicious = True
            reasons.append('Low image resolution')
            confidence += 0.15
        if brightness < 40 or brightness > 220:
            is_suspicious = True
            reasons.append('Unusual brightness')
            confidence += 0.15
        if contrast < 10:
            is_suspicious = True
            reasons.append('Low contrast')
            confidence += 0.1

        # Clamp confidence [0.2, 0.95]
        if confidence < 0.2: confidence = 0.2
        if confidence > 0.95: confidence = 0.95

        # Convert to percentage
        return {
            'is_fake': bool(is_suspicious),
            'confidence': round(float(confidence), 2),
            'reasons': reasons,
            'width': w,
            'height': h
        }
    except Exception as e:
        return {
            'error': str(e)
        }


@fakemed_bp.route('/upload', methods=['POST'])
def upload_image():
    """Endpoint to upload image (file or base64 payload) for fake detection."""
    try:
        image_bytes = None
        # Accept file (multipart/form-data)
        if 'file' in request.files:
            file = request.files['file']
            image_bytes = file.read()
        else:
            data = request.get_json(silent=True) or {}
            base64_data = data.get('image') or data.get('base64') or data.get('image_base64')
            if base64_data:
                # Trim the data URL header if present
                if base64_data.startswith('data:'):
                    base64_data = base64_data.split(',')[-1]
                image_bytes = base64.b64decode(base64_data)

        if not image_bytes:
            return jsonify({'error': 'No image provided'}), 400

        # Analyze image
        analysis = analyze_image_for_fake(image_bytes)

        if analysis.get('error'):
            return jsonify({'error': analysis.get('error')}), 500

        return jsonify({
            'success': True,
            'analysis': analysis
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@fakemed_bp.route('/demo', methods=['GET'])
def demo():
    return jsonify({'success': True, 'analysis': {'is_fake': False, 'confidence': 0.88, 'reasons': []}}), 200

