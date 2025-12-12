# 📷 MedXplain Camera Integration Guide

## Overview
Complete camera integration module for your MedXplain biomedical web application. Pure HTML/CSS/JavaScript implementation using native Web APIs - **no frameworks required**.

---

## ✨ Features

- ✅ **Real-time Camera Preview** - Live video feed from device camera
- ✅ **Photo Capture** - Capture images from video stream using Canvas API
- ✅ **Base64 Encoding** - Automatic conversion to Base64 for backend transmission
- ✅ **Error Handling** - Comprehensive error handling for camera access issues
- ✅ **Mobile Friendly** - Responsive UI works on desktop, tablet, and mobile
- ✅ **No Dependencies** - Pure JavaScript, no external libraries
- ✅ **Reusable Function** - `captureImage()` function for programmatic use

---

## 🚀 Quick Start

### 1. Access the Camera Interface
Open in your browser:
```
http://localhost:3002/camera.html
```

### 2. Using the UI
1. Click **"Start Camera"** to request camera access
2. Grant permission when prompted
3. Position your prescription in the **yellow focus frame**
4. Click **"Capture Photo"** to take a snapshot
5. Review the captured image
6. Click **"Send to Backend"** to analyze

### 3. Using Programmatically

```javascript
// Simple usage - returns Promise
const base64 = await MedXplainCamera.captureImage();
console.log(base64); // Use Base64 string wherever needed

// Send to your backend
const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64 })
});
```

---

## 🔧 API Reference

### Main Function

#### `MedXplainCamera.captureImage()`
**Returns:** `Promise<string>` - Base64 encoded JPEG image

**Usage:**
```javascript
try {
    const base64Image = await MedXplainCamera.captureImage();
    // Do something with base64Image
    sendToBackend(base64Image);
} catch (error) {
    console.error('Camera error:', error);
    // Handle error (permission denied, no camera, etc.)
}
```

### Helper Functions

#### `MedXplainCamera.startCamera()`
Opens camera and displays preview

```javascript
await MedXplainCamera.startCamera();
```

#### `MedXplainCamera.stopCamera()`
Stops camera stream and cleanup

```javascript
MedXplainCamera.stopCamera();
```

#### `MedXplainCamera.getBase64()`
Returns currently captured Base64 string

```javascript
const base64 = MedXplainCamera.getBase64();
if (base64) {
    console.log('Image captured:', base64.substring(0, 50) + '...');
}
```

---

## 📋 Detailed Implementation

### Step 1: Basic Camera Access

```javascript
// Request camera permission and get stream
const stream = await navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: 'user', // 'user' for front, 'environment' for back
        width: { ideal: 1280 },
        height: { ideal: 960 }
    },
    audio: false
});

// Attach to video element
const video = document.getElementById('video');
video.srcObject = stream;
```

### Step 2: Capture Photo from Video

```javascript
// Create canvas with same dimensions as video
const canvas = document.createElement('canvas');
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

// Draw current video frame to canvas
const context = canvas.getContext('2d');
context.drawImage(video, 0, 0);

// Get Base64 (JPEG format, 95% quality)
const base64 = canvas.toDataURL('image/jpeg', 0.95);
```

### Step 3: Convert to Base64

```javascript
// Automatic in toDataURL() method
// Format: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."

// Extract just the Base64 part (remove data URL prefix)
const justBase64 = base64.split(',')[1];

// Send to backend
const response = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64 })
});
```

### Step 4: Handle Errors

```javascript
try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // Use stream
} catch (error) {
    if (error.name === 'NotAllowedError') {
        console.error('Camera permission denied');
    } else if (error.name === 'NotFoundError') {
        console.error('No camera device found');
    } else if (error.name === 'NotReadableError') {
        console.error('Camera is in use by another app');
    } else {
        console.error('Unknown camera error:', error);
    }
}
```

---

## 🖼️ UI Components

### File Structure
```
frontend/
├── public/
│   └── camera.html          ← Complete standalone HTML file
└── src/
    └── components/
        └── MedXplainUpload.jsx  ← React component with camera integration
```

### Standalone HTML File (`camera.html`)
The `camera.html` file is a **complete, standalone** application that includes:
- All HTML markup
- Complete CSS styling
- Full JavaScript implementation
- No dependencies required

**Direct access:** `http://localhost:3002/camera.html`

### React Component Integration

You can also use the camera in your React application:

```jsx
// In MedXplainUpload.jsx, the camera is already integrated
// Access at: http://localhost:3002/medxplain
// Navigate to the "📷 Take Photo" tab
```

---

## 🔐 Security Considerations

### Camera Permissions
- Camera access requires **HTTPS** in production (HTTP only works on localhost)
- User must grant permission explicitly
- Permission status persists across sessions

### Data Privacy
- Image data is captured locally on the device
- Base64 transmission over HTTPS is secure
- No data stored on the frontend
- Server handles image processing

### Best Practices

```javascript
// Always cleanup camera streams
function cleanup() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup);

// Cleanup on navigation
window.addEventListener('pagehide', cleanup);
```

---

## 📱 Mobile vs Desktop

### Desktop (Front Camera)
- Uses front-facing camera by default
- Video is mirrored (scaleX(-1))
- Better for document capture

### Mobile (Back Camera)
- To use back camera, change `facingMode`:
```javascript
const constraints = {
    video: {
        facingMode: 'environment' // Back camera
    }
};
```

### Responsive Design
- Adapts to screen size (mobile-first)
- Touch-friendly buttons (min 44px)
- Maintains 4:3 aspect ratio

---

## 🎯 Backend Integration

### Send Base64 to Your Backend

```javascript
// Complete example
async function sendImageToBackend(base64) {
    try {
        const response = await fetch('http://localhost:5000/api/medxplain/upload_base64', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: base64,           // Full Base64 with data URL prefix
                timestamp: new Date().toISOString(),
                source: 'camera'
            })
        });

        const result = await response.json();
        if (result.success) {
            console.log('Analysis:', result.analysis);
        }
    } catch (error) {
        console.error('Send error:', error);
    }
}
```

### Expected Backend Endpoint
Your backend should implement:
```
POST /api/medxplain/upload_base64
Content-Type: application/json

{
    "image": "data:image/jpeg;base64,...",
    "timestamp": "2025-12-12T10:30:00.000Z",
    "source": "camera"
}

Response:
{
    "success": true,
    "analysis": { ... }
}
```

---

## 🛠️ Customization

### Change Camera Camera (Mobile)
```javascript
// Line in startCamera() function:
const constraints = {
    video: {
        facingMode: 'environment', // Change to 'environment' for back camera
        width: { ideal: 1920 },     // Higher resolution
        height: { ideal: 1440 }
    }
};
```

### Adjust Image Quality
```javascript
// In capturePhoto() function:
currentBase64 = canvasElement.toDataURL('image/jpeg', 0.85); // 0-1, lower = smaller file
```

### Change Image Format
```javascript
// WebP (better compression, less browser support)
currentBase64 = canvasElement.toDataURL('image/webp', 0.9);

// PNG (larger file, lossless)
currentBase64 = canvasElement.toDataURL('image/png');
```

### Modify Focus Guide
```css
/* In CSS, change focus guide size and color */
.focus-guide {
    width: 85%;      /* Adjust width */
    height: 75%;     /* Adjust height */
    border-color: rgba(255, 193, 7, 0.8); /* Different color */
}
```

---

## 🐛 Troubleshooting

### Camera Not Showing
1. **Check browser compatibility** - Use Chrome, Firefox, Safari, or Edge
2. **Check HTTPS/localhost** - HTTPS required in production
3. **Check permissions** - Allow camera in browser settings
4. **Check device** - Ensure device has a camera

### Blurry Images
- Ensure good lighting
- Allow camera time to focus
- Use higher resolution constraints

### Permission Denied
1. Check browser camera settings
2. Reset site permissions
3. Try incognito/private mode
4. Restart browser

### Base64 Too Large
- Reduce image quality: `toDataURL('image/jpeg', 0.7)`
- Use WebP format for better compression
- Compress on backend before storage

---

## 📊 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | Excellent camera access |
| Firefox | ✅ Full | Excellent support |
| Safari  | ✅ Full | iOS 11+ required |
| Edge    | ✅ Full | Chromium-based |
| Opera   | ✅ Full | Chromium-based |
| IE 11   | ❌ None | Not supported |

---

## 📚 Code Examples

### Example 1: Simple Capture Flow
```javascript
async function simpleCaptureFlow() {
    try {
        // Capture image
        const base64 = await MedXplainCamera.captureImage();
        
        // Send to backend
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 })
        });
        
        const result = await response.json();
        console.log('Result:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### Example 2: Multiple Captures
```javascript
async function captureMultiple(count) {
    const images = [];
    
    for (let i = 0; i < count; i++) {
        const base64 = await MedXplainCamera.captureImage();
        images.push(base64);
        console.log(`Captured image ${i + 1}/${count}`);
    }
    
    return images;
}
```

### Example 3: With Progress Tracking
```javascript
async function captureWithProgress(onProgress) {
    onProgress({ status: 'requesting', percent: 10 });
    
    const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
    });
    
    onProgress({ status: 'ready', percent: 50 });
    
    // Wait for user to position camera
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onProgress({ status: 'capturing', percent: 75 });
    
    const base64 = captureFrame(stream);
    
    onProgress({ status: 'complete', percent: 100 });
    
    stream.getTracks().forEach(t => t.stop());
    
    return base64;
}
```

---

## 🔗 Integration with React Component

The camera is already integrated into your React app at:

```
MedXplainUpload.jsx → "📷 Take Photo" tab
```

**React Integration Features:**
- Tab-based interface
- State management for camera status
- Automatic cleanup on component unmount
- Integration with existing API calls
- Photo preview before sending

**To use in React:**
```jsx
import { useRef, useState } from 'react';

export function CameraCapture() {
    const videoRef = useRef(null);
    const [base64, setBase64] = useState(null);
    
    const handleCapture = async () => {
        const b64 = await window.MedXplainCamera.captureImage();
        setBase64(b64);
    };
    
    return (
        <button onClick={handleCapture}>Capture</button>
    );
}
```

---

## 📝 Summary

This camera integration provides:

1. **Standalone HTML** - Use independently or integrate into existing app
2. **React Component** - Already integrated in MedXplainUpload.jsx
3. **Reusable Function** - `captureImage()` for programmatic use
4. **Error Handling** - Comprehensive error messages
5. **Mobile Support** - Works on all modern devices
6. **Base64 Output** - Ready for backend transmission
7. **No Dependencies** - Pure JavaScript, no frameworks
8. **Well Documented** - Fully commented code

---

## ✅ Checklist

- [x] Camera preview with live indicator
- [x] Photo capture with canvas
- [x] Base64 encoding
- [x] Error handling for permissions
- [x] Mobile-friendly UI
- [x] Responsive design
- [x] Focus guide overlay
- [x] Copy Base64 to clipboard
- [x] Send to backend API
- [x] Reusable functions
- [x] Comprehensive documentation

---

**Questions? Check the inline code comments in `camera.html` for detailed explanations of each section.**
