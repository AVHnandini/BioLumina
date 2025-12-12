import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentForm from '../components/AssessmentForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { predictConditions } from '../services/api';

/**
 * Assessment Page - Form and submission handling
 */
export default function Assessment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      // Call API
      const result = await predictConditions(data);

      // Navigate to results with data
      navigate('/results', { state: { results: result } });
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setError(
        err.error || 'Failed to analyze symptoms. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-teal-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 animate-fade-in">
            <p className="text-red-700 font-semibold">⚠️ Error</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="animate-fade-in">
            <AssessmentForm onSubmit={handleSubmit} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
}
