import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function FakeMed({ onResult }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload'|'camera'
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(f.type)) {
      setError('Supported types: JPG, PNG');
      return;
    }
    setFile(f); setFileName(f.name); setError('');
    try { setPreviewUrl(URL.createObjectURL(f)); } catch(e){}
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current.play().catch(()=>{});
        setCameraActive(true);
      }
    } catch (err) {
      setError('Error accessing camera: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current; const c = canvasRef.current; const ctx = c.getContext('2d');
    c.width = v.videoWidth; c.height = v.videoHeight;
    ctx.drawImage(v, 0, 0, c.width, c.height);
    c.toBlob(blob => {
      const f = new File([blob], `fakemed-${Date.now()}.png`, { type: 'image/png' });
      setFile(f); setFileName(f.name); setCameraActive(false);
      try { setPreviewUrl(URL.createObjectURL(f)); } catch(e){}
      stopCamera();
    }, 'image/png', 0.95);
  };

  // Open the dedicated camera page in a new window (popup)
  const popupRef = useRef(null);
  const popupPollRef = useRef(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const openCameraWindow = () => {
    // Try to reuse existing popup if open
    try {
      const url = '/desktop-camera.html?source=fakemed';
        if (!popupRef.current || popupRef.current.closed) {
        popupRef.current = window.open(url, 'SymptoTwinCamera', 'width=900,height=700');
          setPopupOpen(true);
          // Start polling to detect when popup closes
          popupPollRef.current = setInterval(() => {
            try { if (!popupRef.current || popupRef.current.closed) { setPopupOpen(false); clearInterval(popupPollRef.current); popupPollRef.current = null; } } catch(_) {}
          }, 400);
      } else {
        popupRef.current.focus();
      }
    } catch (err) {
      setError('Unable to open camera window: ' + err.message);
    }
  };

  // Handler for messages from popup camera window (postMessage)
  useEffect(() => {
    const onMessage = async (ev) => {
      try {
        // Validate origin: check hostname and port match
        const originUrl = new URL(ev.origin);
        if (originUrl.hostname !== window.location.hostname || originUrl.port !== window.location.port) return;
        const payload = ev.data || {};
        if (payload.type === 'fakemed-capture' && payload.image) {
          // payload.image is a dataURL (base64). Convert to blob and create File
          const resp = await fetch(payload.image);
          const blob = await resp.blob();
          const newFile = new File([blob], `fakemed-${Date.now()}.jpg`, { type: blob.type || 'image/jpeg' });
          setFile(newFile);
          setFileName(newFile.name);
          try { setPreviewUrl(URL.createObjectURL(newFile)); } catch(e){}
          setCameraActive(false);
          // Close popup if still open
          try { if (popupRef.current && !popupRef.current.closed) popupRef.current.close(); } catch(_){}
        }
      } catch (err) {
        console.error('Unable to process message from camera popup', err);
      }
    };
    window.addEventListener('message', onMessage);
    return () => { window.removeEventListener('message', onMessage); if (popupPollRef.current) { clearInterval(popupPollRef.current); popupPollRef.current = null; } try { if (popupRef.current && !popupRef.current.closed) popupRef.current.close(); } catch(_) {} };
  }, []);

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    if (!file) { setError('Please upload or capture an image'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const form = new FormData(); form.append('file', file);
      const resp = await axios.post('http://localhost:5000/api/fakemed/upload', form);
      if (resp.data.success) {
        setResult(resp.data.analysis);
        if (onResult) onResult(resp.data.analysis);
      } else {
        setError(resp.data.error || 'No result');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error analyzing');
    } finally { setLoading(false); }
  };

  const reset = () => { if (previewUrl) { try { URL.revokeObjectURL(previewUrl); } catch(e){} } setPreviewUrl(''); setFile(null); setFileName(''); setResult(null); setError(''); };
  useEffect(() => {
    return () => { if (previewUrl) { try { URL.revokeObjectURL(previewUrl); } catch(e){} } };
  }, [previewUrl]);

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-3">💊 FakeMed - Detect Fake Meds</h3>
      <p className="text-sm text-gray-600 mb-4">Upload a medicine bottle/package photo or take a photo to analyze authenticity.</p>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="flex gap-3 mb-4">
        <button onClick={() => setActiveTab('upload')} className={`px-4 py-2 rounded ${activeTab==='upload' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}>Upload</button>
        <button onClick={() => setActiveTab('camera')} className={`px-4 py-2 rounded ${activeTab==='camera' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}>Camera</button>
      </div>

      {activeTab === 'upload' && (
        <form onSubmit={handleAnalyze} className="space-y-4">
          <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFileChange} />
          {file && <div className="text-sm">Selected: {fileName}</div>}
          {previewUrl && <div className="mt-3"><img src={previewUrl} alt="preview" className="rounded-md shadow-sm max-h-56 object-contain"/></div>}
          <div className="flex gap-3">
            <button type="submit" className="btn-primary">Analyze Image</button>
            <button type="button" onClick={reset} className="btn-secondary">Reset</button>
          </div>
        </form>
      )}

      {activeTab === 'camera' && (
        <div className="space-y-3">
          {!cameraActive && !file && (
            <div>
              <div className="flex gap-3 mb-2">
                <button onClick={startCamera} className="btn-primary">Start Camera</button>
                <button onClick={openCameraWindow} className="btn-secondary">Open Camera (New Window)</button>
              </div>
              {popupOpen && <div className="text-sm text-gray-600">🔔 Camera window open — capture and click 'Send to Parent' to return the photo to this page.</div>}
            </div>
          )}
          {cameraActive && (
            <div>
              <div className="w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56%' }}>
                <video ref={videoRef} autoPlay playsInline muted style={{ position:'absolute', width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={capturePhoto} className="btn-primary">Capture</button>
                <button onClick={stopCamera} className="btn-secondary">Cancel</button>
              </div>
            </div>
          )}
          {file && !cameraActive && (
            <div>
              <div className="mb-3">Selected: {fileName}</div>
              {previewUrl && <div className="mb-3"><img src={previewUrl} alt="preview" className="rounded-md shadow-sm max-h-56 object-contain"/></div>}
              <div className="flex gap-3">
                <button onClick={handleAnalyze} className="btn-primary">Analyze Photo</button>
                <button onClick={() => { reset(); startCamera();}} className="btn-secondary">Retake</button>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {loading && <div className="text-sm text-gray-600 mt-3">Analyzing...</div>}
      {result && (
        <div className="mt-4 p-3 border rounded bg-white">
          <div className="font-bold mb-2">Result</div>
          <div className="text-sm">Fake Detected: {String(result.is_fake)}</div>
          <div className="text-sm">Confidence: {result.confidence}</div>
          {result.reasons && result.reasons.length>0 && <div className="text-sm mt-2">Reasons: {result.reasons.join(', ')}</div>}
        </div>
      )}
    </div>
  );
}
