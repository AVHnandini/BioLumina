import React, { useState } from 'react';
import MedXplainUpload from '../components/MedXplainUpload';
import MedXplainResults from '../components/MedXplainResults';

/**
 * MedXplain Full Page
 */
export default function MedXplainPage() {
  const [analysis, setAnalysis] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysis(result);
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleNewAnalysis = () => {
    setAnalysis(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              📋 MedXplain
            </h1>
            <p className="text-gray-600 text-lg">
              Understand your prescriptions in simple language
            </p>
          </div>

          {/* Content */}
          {!analysis ? (
            <MedXplainUpload onAnalysisComplete={handleAnalysisComplete} />
          ) : (
            <MedXplainResults analysis={analysis} onNewAnalysis={handleNewAnalysis} />
          )}

          {/* Features Section */}
          {!analysis && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                ✨ Features
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="card text-center">
                  <div className="text-4xl mb-3">📸</div>
                  <h3 className="font-bold text-gray-800 mb-2">Upload Images</h3>
                  <p className="text-sm text-gray-600">
                    Take a photo of your prescription and upload it for instant analysis.
                  </p>
                </div>

                <div className="card text-center">
                  <div className="text-4xl mb-3">✏️</div>
                  <h3 className="font-bold text-gray-800 mb-2">Enter Text</h3>
                  <p className="text-sm text-gray-600">
                    Type or paste prescription text directly for quick analysis.
                  </p>
                </div>

                <div className="card text-center">
                  <div className="text-4xl mb-3">💡</div>
                  <h3 className="font-bold text-gray-800 mb-2">Simple Explanation</h3>
                  <p className="text-sm text-gray-600">
                    Get easy-to-understand explanations of your medications and dosages.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
