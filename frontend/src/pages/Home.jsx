import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Home Page - Landing page with hero section
 */
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Health,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-600">
                {' '}
                Simplified
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              SymptoTwin is an intelligent health assessment tool that helps you understand your symptoms and identify potential health conditions. Quick, accurate, and confidential.
            </p>

            {/* Key Features */}
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <span>Fast and accurate symptom analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <span>100% confidential and secure</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">🏥</span>
                <span>AI-powered medical insights</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <span>Works on all devices</span>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="pt-6 flex gap-4">
              <button
                onClick={() => navigate('/assessment')}
                className="btn-primary"
              >
                Start Assessment →
              </button>
              <button
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Animated background circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-100 to-teal-100 animate-pulse"></div>
              <div className="absolute inset-8 rounded-full bg-white shadow-medium flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl mb-4">⚕️</p>
                  <p className="text-xl font-bold text-primary-600">SymptoTwin</p>
                  <p className="text-sm text-gray-600 mt-2">Health Analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-white py-20 mt-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Enter Your Details</h3>
              <p className="text-gray-600 text-sm">
                Provide your age, gender, and describe the symptoms you're experiencing.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Our advanced AI analyzes your symptoms against medical databases.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Get Results</h3>
              <p className="text-gray-600 text-sm">
                Receive a detailed report of potential conditions with probabilities.
              </p>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mt-12">
            <p className="text-gray-800 text-center">
              <span className="font-bold text-yellow-700">⚠️ Important:</span> This tool provides informational guidance only and should not replace professional medical advice. Always consult with a qualified healthcare professional for accurate diagnosis and treatment.
            </p>
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="bg-gradient-to-br from-primary-50 to-teal-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            🎯 Additional Tools
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our suite of health management tools to track medications and understand prescriptions.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* MemoryMate Card */}
            <div className="card hover:shadow-lg transition transform hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">💊</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">MemoryMate</h3>
                  <p className="text-sm text-gray-600">Medicine Reminder</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                Never miss a dose again! MemoryMate helps you track your medications with timely reminders.
              </p>

              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <p>✓ Set medication reminders</p>
                <p>✓ Track dosage schedules</p>
                <p>✓ Get timely notifications</p>
                <p>✓ Manage multiple medicines</p>
              </div>

              <button
                onClick={() => navigate('/memorymate')}
                className="btn-primary w-full"
              >
                Start MemoryMate →
              </button>
            </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* FakeMed Card */}
            <div className="card hover:shadow-lg transition transform hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">🔍</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">FakeMed</h3>
                  <p className="text-sm text-gray-600">Detect Fake Medicine</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                Upload a photo of a medication package or take a new photo to detect signs of tampering or counterfeiting (demo heuristics).
              </p>

              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <p>✓ Upload photo or take photo</p>
                <p>✓ Get a quick authenticity assessment</p>
                <p>✓ Simple, demo-only analysis</p>
              </div>

              <button
                onClick={() => navigate('/fakemed')}
                className="btn-primary w-full"
              >
                Try FakeMed →
              </button>
            </div>
          </div>

            {/* MedXplain Card */}
            <div className="card hover:shadow-lg transition transform hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">📋</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">MedXplain</h3>
                  <p className="text-sm text-gray-600">Prescription Translator</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                Understand your prescriptions in simple language with our smart prescription analyzer.
              </p>

              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <p>✓ Upload prescription photos</p>
                <p>✓ Automatic text extraction</p>
                <p>✓ Simple explanations</p>
                <p>✓ Dosage guidance</p>
              </div>

              <button
                onClick={() => navigate('/medxplain')}
                className="btn-primary w-full"
              >
                Try MedXplain →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
