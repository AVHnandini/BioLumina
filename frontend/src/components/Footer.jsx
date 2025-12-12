import React from 'react';

/**
 * Footer Component
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-3">About SymptoTwin</h3>
            <p className="text-sm text-gray-400">
              An AI-powered health assessment tool to help identify potential health conditions.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Disclaimer</h3>
            <p className="text-sm text-gray-400">
              This tool is for informational purposes only. Always consult with a healthcare professional for diagnosis.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <p className="text-sm text-gray-400">
              Email: info@symptotwin.com<br/>
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <hr className="border-gray-700 mb-6" />
        <div className="flex justify-between items-center text-sm">
          <p>&copy; 2024 SymptoTwin. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
