import React from 'react';

/**
 * ResultCard Component - Displays a predicted condition
 * @param {Object} props - Component props
 * @param {string} props.name - Condition name
 * @param {number} props.probability - Probability percentage
 * @param {string} props.severity - Severity level (low, medium, high)
 */
export default function ResultCard({ name, probability, severity, suggestions = {} }) {
  const severityColors = {
    low: 'bg-health-low/10 border-health-low',
    medium: 'bg-health-medium/10 border-health-medium',
    high: 'bg-health-high/10 border-health-high',
  };

  const severityBadgeColors = {
    low: 'badge-low',
    medium: 'badge-medium',
    high: 'badge-high',
  };

  const severityIcons = {
    low: '✓',
    medium: '⚠',
    high: '🔴',
  };

  return (
    <div
      className={`card border-2 ${severityColors[severity]} p-5 hover:shadow-medium transform hover:translate-y-[-4px] animate-slide-up`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800 flex-1">{name}</h3>
        <span className="text-2xl ml-2">{severityIcons[severity]}</span>
      </div>

      <div className="space-y-3">
        {/* Probability Bar */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-semibold text-gray-600">Probability</p>
            <p className="text-xl font-bold text-primary-600">{probability}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-teal-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${probability}%` }}
            ></div>
          </div>
        </div>

        {/* Severity Badge */}
        <div className="pt-2">
          <span className={`${severityBadgeColors[severity]} uppercase text-xs tracking-wide`}>
            {severity} Severity
          </span>
        </div>

        {/* Info Text */}
        <p className="text-xs text-gray-500 pt-2 italic">
          Consult a healthcare professional for accurate diagnosis
        </p>

        {/* Suggestions: medicines / diet / precautions / advice */}
        {suggestions && Object.keys(suggestions).length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Suggestions</h4>

            {suggestions.medicines && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-600">Medicines</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {suggestions.medicines.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {suggestions.diet && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-600">Diet</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {suggestions.diet.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {suggestions.precautions && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-600">Precautions</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {suggestions.precautions.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {suggestions.advice && (
              <div className="mt-2">
                <p className="text-xs font-semibold text-gray-600">Advice</p>
                <p className="text-sm text-gray-700">{suggestions.advice}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
