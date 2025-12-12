import React, { useState, useEffect } from 'react';
import { getSymptoms } from '../services/api';

/**
 * AssessmentForm Component - User input form for assessment
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {boolean} props.loading - Loading state
 */
export default function AssessmentForm({ onSubmit, loading }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch available symptoms on component mount
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const symptoms = await getSymptoms();
        // Convert snake_case to Title Case
        const formattedSymptoms = symptoms.map(s =>
          s.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        );
        setAvailableSymptoms(formattedSymptoms);
      } catch (error) {
        console.error('Failed to load symptoms:', error);
        // Fallback symptoms if API fails
        setAvailableSymptoms([
          'Headache', 'Fever', 'Cough', 'Sore Throat', 'Chest Pain',
          'Shortness of Breath', 'Nausea', 'Diarrhea', 'Body Aches', 'Fatigue'
        ]);
      }
    };
    fetchSymptoms();
  }, []);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!age || age < 0 || age > 150) {
      newErrors.age = 'Please enter a valid age (0-150)';
    }
    if (!gender) {
      newErrors.gender = 'Please select a gender';
    }
    if (selectedSymptoms.length === 0) {
      newErrors.symptoms = 'Please select at least one symptom';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert symptoms back to snake_case
      const symptomsSnakeCase = selectedSymptoms.map(s =>
        s.toLowerCase().replace(/\s+/g, '_')
      );
      onSubmit({
        age: parseInt(age),
        gender: gender.toLowerCase(),
        symptoms: symptomsSnakeCase,
      });
    }
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Health Assessment</h2>

      {/* Age Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Age</label>
        <input
          type="number"
          min="0"
          max="150"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={`input-field ${errors.age ? 'border-red-500 ring-2 ring-red-200' : ''}`}
          placeholder="Enter your age"
          disabled={loading}
        />
        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
      </div>

      {/* Gender Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Gender</label>
        <div className="flex gap-4">
          {['male', 'female'].map(g => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={gender === g}
                onChange={(e) => setGender(e.target.value)}
                className="w-4 h-4"
                disabled={loading}
              />
              <span className="capitalize">{g}</span>
            </label>
          ))}
        </div>
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
      </div>

      {/* Symptoms Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Symptoms</label>
        
        {/* Dropdown */}
        <div className="relative mb-3">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className={`input-field text-left flex justify-between items-center ${
              errors.symptoms ? 'border-red-500 ring-2 ring-red-200' : ''
            }`}
            disabled={loading}
          >
            <span className="text-gray-600">Select symptoms...</span>
            <span className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
              {availableSymptoms.map(symptom => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`w-full text-left px-4 py-3 hover:bg-primary-50 transition ${
                    selectedSymptoms.includes(symptom) ? 'bg-primary-100 text-primary-700' : ''
                  }`}
                >
                  <span className="mr-2">{selectedSymptoms.includes(symptom) ? '✓' : '○'}</span>
                  {symptom}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Symptoms Chips */}
        {selectedSymptoms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedSymptoms.map(symptom => (
              <div
                key={symptom}
                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold"
              >
                {symptom}
                <button
                  type="button"
                  onClick={() => removeSymptom(symptom)}
                  className="hover:text-primary-900 transition"
                  disabled={loading}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {errors.symptoms && <p className="text-red-500 text-sm mt-1">{errors.symptoms}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`btn-primary w-full ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Analyzing Symptoms...' : 'Start Assessment'}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        ⚕️ Disclaimer: This is an informational tool. Always consult a healthcare professional.
      </p>
    </form>
  );
}
