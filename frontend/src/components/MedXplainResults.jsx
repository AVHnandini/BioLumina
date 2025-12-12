import React from 'react';

/**
 * MedXplain Results Display Component
 */
export default function MedXplainResults({ analysis, onNewAnalysis }) {
  if (!analysis) return null;

  const {
    extracted_text = '',
    simplified_meaning = '',
    medicine_instructions = [],
    dosage_guide = '',
    warnings = []
  } = analysis;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">📊 Analysis Results</h2>
        <button onClick={onNewAnalysis} className="btn-secondary">
          ➕ New Analysis
        </button>
      </div>

      {/* Extracted Text */}
      {extracted_text && (
        <div className="card bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📄 Extracted Text</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{extracted_text}</p>
        </div>
      )}

      {/* Simplified Meaning */}
      {simplified_meaning && (
        <div className="card bg-blue-50 border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">In Simple Terms</h3>
              <p className="text-blue-800">{simplified_meaning}</p>
            </div>
          </div>
        </div>
      )}

      {/* Medicine Instructions */}
      {medicine_instructions.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">💊 Medicine Instructions</h3>
          <div className="space-y-3">
            {medicine_instructions.map((instruction, index) => (
              <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4">
                <h4 className="font-bold text-gray-800 mb-1">{instruction.name}</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  {instruction.dosage && <p>💉 <strong>Dosage:</strong> {instruction.dosage}</p>}
                  {instruction.frequency && <p>⏱️ <strong>How Often:</strong> {instruction.frequency}</p>}
                  {instruction.timing && <p>🕐 <strong>When to Take:</strong> {instruction.timing}</p>}
                  {instruction.notes && <p>📝 <strong>Special Notes:</strong> {instruction.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dosage Guide */}
      {dosage_guide && (
        <div className="card bg-amber-50 border-2 border-amber-200">
          <div className="flex items-start gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">Dosage Information</h3>
              <p className="text-amber-800 whitespace-pre-wrap">{dosage_guide}</p>
            </div>
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="card bg-red-50 border-2 border-red-200">
          <h3 className="text-lg font-bold text-red-900 mb-3">⛔ Important Warnings</h3>
          <ul className="space-y-2">
            {warnings.map((warning, index) => (
              <li key={index} className="flex items-start gap-2 text-red-800">
                <span className="text-lg">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="card bg-yellow-50 border-2 border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>⚕️ Disclaimer:</strong> This analysis is for informational purposes only.
          Always consult with your doctor or pharmacist for medical advice. Never change your
          medication without professional guidance.
        </p>
      </div>
    </div>
  );
}
