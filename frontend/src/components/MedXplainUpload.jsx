import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * MedXplain Upload and Analysis Component
 */
export default function MedXplainUpload({ onAnalysisComplete }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload', 'text', or 'camera'
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  // Cleanup camera when component unmounts or camera is deactivated
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Play video when stream is set
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
      });
    }
  }, [cameraActive]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a JPG, PNG, or PDF file');
        return;
      }

      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/medxplain/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        onAnalysisComplete(response.data.analysis);
        // Reset form
        setFile(null);
        setFileName('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze prescription');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeText = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError('Please enter prescription text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/medxplain/analyze_text',
        { text: inputText }
      );

      if (response.data.success) {
        onAnalysisComplete(response.data.analysis);
        setInputText('');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze text');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAnalysis = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        'http://localhost:5000/api/medxplain/demo'
      );

      if (response.data.success) {
        onAnalysisComplete(response.data.analysis);
      }
    } catch (err) {
      setError('Failed to load demo');
    } finally {
      setLoading(false);
    }
  };

  // Camera Functions
  const startCamera = async () => {
    try {
      setCameraPermissionDenied(false);
      setError('');
      
      const constraints = {
        video: { 
          facingMode: 'user', // Use front camera on desktop
          width: { ideal: 1280 },
          height: { ideal: 960 }
        },
        audio: false
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(err => console.error('Play error:', err));
        };
        setCameraActive(true);
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setCameraPermissionDenied(true);
        setError('Camera permission denied. Please allow camera access in your browser settings.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera device found on this device.');
      } else {
        setError('Failed to access camera: ' + err.message);
      }
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const video = videoRef.current;
      
      // Set canvas size to match video
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      // Convert canvas to blob and create file
      canvasRef.current.toBlob((blob) => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const cameraFile = new File(
          [blob],
          `prescription-${timestamp}.png`,
          { type: 'image/png' }
        );
        setFile(cameraFile);
        setFileName(cameraFile.name);
        stopCamera();
        setError('');
      }, 'image/png', 0.95);
    }
  };

  const retakPhoto = () => {
    setFile(null);
    setFileName('');
    startCamera();
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">📋 MedXplain - Prescription Analyzer</h2>
      <p className="text-gray-600 mb-6">
        Upload a prescription image or enter prescription text to get an easy-to-understand explanation
        of your medications and dosage instructions.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => { setActiveTab('upload'); setError(''); }}
          className={`pb-2 px-4 font-semibold ${
            activeTab === 'upload'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600'
          }`}
        >
          📸 Upload Prescription
        </button>
        <button
          onClick={() => { setActiveTab('camera'); setError(''); }}
          className={`pb-2 px-4 font-semibold ${
            activeTab === 'camera'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600'
          }`}
        >
          📷 Take Photo
        </button>
        <button
          onClick={() => { setActiveTab('text'); setError(''); }}
          className={`pb-2 px-4 font-semibold ${
            activeTab === 'text'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600'
          }`}
        >
          ✏️ Enter Text
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              id="file-upload"
              disabled={loading}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-lg font-semibold text-gray-700 mb-1">
                {fileName || 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-gray-500">
                JPG, PNG, or PDF (Max 5MB)
              </p>
            </label>
          </div>

          {file && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex justify-between items-center">
              <span>✅ {fileName} selected</span>
              <button
                type="button"
                onClick={() => { setFile(null); setFileName(''); }}
                className="text-sm underline hover:no-underline"
              >
                Change
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !file}
            className="btn-primary w-full"
          >
            {loading ? '🔄 Analyzing...' : '🚀 Analyze Prescription'}
          </button>
        </form>
      )}

      {/* Camera Tab */}
      {activeTab === 'camera' && (
        <div className="space-y-4">
          {cameraPermissionDenied && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
              <p className="font-semibold">📷 Camera Permission Required</p>
              <p className="text-sm mt-2">
                To use the camera, please allow camera access in your browser settings and refresh the page.
              </p>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
            <p className="font-semibold text-sm">📋 Instructions</p>
            <ol className="text-xs mt-2 space-y-1 ml-2">
              <li>✅ Click <span className="font-semibold">"Start Camera"</span> to open your device camera</li>
              <li>✅ Position your prescription clearly in the frame</li>
              <li>✅ Click <span className="font-semibold">"Capture Photo"</span> to take a snapshot</li>
              <li>✅ Review the photo and click <span className="font-semibold">"Analyze Prescription"</span> or retake if needed</li>
            </ol>
          </div>

          {/* Camera is OFF - Show Start Button */}
          {!cameraActive && !file && (
            <button
              onClick={startCamera}
              disabled={loading}
              className="btn-primary w-full py-3 text-lg"
            >
              📷 Start Camera
            </button>
          )}

          {/* Camera is ACTIVE - Show Live Preview */}
          {cameraActive && (
            <div className="space-y-4">
              <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl border-4 border-primary-500">
                {/* Video Container with proper aspect ratio */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '75%',
                  backgroundColor: '#000',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  {/* Video Element - Main Camera Feed */}
                  <video
                    ref={videoRef}
                    autoPlay={true}
                    playsInline={true}
                    muted={true}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      backgroundColor: '#000',
                      transform: 'scaleX(-1)'
                    }}
                  />
                </div>
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Camera Status Indicator */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg z-10">
                  <span className="animate-pulse">●</span> RECORDING
                </div>

                {/* Focus Guide Frame */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
                  <div className="border-3 border-yellow-400 w-2/3 h-3/4 rounded-lg opacity-60"></div>
                </div>

                {/* Corners Highlight */}
                <div className="absolute top-8 left-8 w-8 h-8 border-l-4 border-t-4 border-green-400 opacity-75 z-5"></div>
                <div className="absolute top-8 right-8 w-8 h-8 border-r-4 border-t-4 border-green-400 opacity-75 z-5"></div>
                <div className="absolute bottom-8 left-8 w-8 h-8 border-l-4 border-b-4 border-green-400 opacity-75 z-5"></div>
                <div className="absolute bottom-8 right-8 w-8 h-8 border-r-4 border-b-4 border-green-400 opacity-75 z-5"></div>
              </div>

              <p className="text-center text-gray-700 text-sm font-semibold bg-gray-100 py-3 rounded">
                📸 Position your prescription clearly in the yellow frame above
              </p>

              <div className="flex gap-3">
                <button
                  onClick={capturePhoto}
                  disabled={loading}
                  className="btn-primary flex-1 py-4 text-lg font-bold"
                >
                  📸 Capture Photo
                </button>
                <button
                  onClick={stopCamera}
                  disabled={loading}
                  className="btn-secondary flex-1 py-3 text-base"
                >
                  ✖️ Cancel
                </button>
              </div>
            </div>
          )}

          {/* Photo Captured - Show Preview */}
          {file && !cameraActive && (
            <div className="space-y-4">
              <div className="bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-bold">Photo Captured Successfully</p>
                  <p className="text-sm">{fileName}</p>
                </div>
              </div>

              <div className="relative bg-gray-200 rounded-lg overflow-hidden shadow-xl border-4 border-green-500">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Captured prescription"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    minHeight: '400px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded text-sm">
                <p className="font-semibold mb-1">📋 Review Your Photo</p>
                <p>Make sure the prescription is clear and readable. You can retake if needed.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={retakPhoto}
                  disabled={loading}
                  className="btn-secondary flex-1 py-3 text-base font-semibold"
                >
                  🔄 Retake Photo
                </button>
                <form onSubmit={handleUpload} className="flex-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 text-base font-semibold"
                  >
                    {loading ? '🔄 Analyzing...' : '🚀 Analyze Prescription'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Text Tab */}
      {activeTab === 'text' && (
        <form onSubmit={handleAnalyzeText} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Enter or paste prescription text:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Example: Paracetamol 500mg, 1 tablet every 6 hours. Do not exceed 4 tablets in 24 hours..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 min-h-32"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="btn-primary w-full"
          >
            {loading ? '🔄 Analyzing...' : '🚀 Analyze Text'}
          </button>
        </form>
      )}

      {/* Demo Button */}
      <div className="mt-6 pt-6 border-t">
        <p className="text-sm text-gray-600 mb-3">Want to see how it works?</p>
        <button
          onClick={handleDemoAnalysis}
          disabled={loading}
          className="btn-secondary w-full"
        >
          {loading ? '🔄 Loading Demo...' : '👀 View Demo Analysis'}
        </button>
      </div>
    </div>
  );
}
