import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ResultCard from '../components/ResultCard';

/**
 * Results Page - Display prediction results with charts
 */
export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || { results: null };

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-teal-50 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Results Available</h1>
          <p className="text-gray-600 mb-6">Please complete an assessment first.</p>
          <button
            onClick={() => navigate('/assessment')}
            className="btn-primary"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  const conditions = results.conditions || [];
  const chartData = conditions.map(c => ({
    name: c.name,
    probability: c.probability,
  }));

  // Colors for pie chart
  const colors = ['#2563eb', '#14b8a6', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-teal-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Assessment Results</h1>
          <p className="text-gray-600">Based on your symptoms and health profile</p>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800 text-sm">
            <span className="font-bold">ℹ️ Important:</span> These results are predictions only. Please consult with a healthcare professional for proper diagnosis and treatment.
          </p>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bar Chart */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Probability Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '2px solid #2563eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="probability" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Condition Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, probability }) => `${name}: ${probability}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="probability"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Results Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Predicted Conditions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {conditions.map((condition, index) => (
              <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                <ResultCard
                  name={condition.name}
                  probability={condition.probability}
                  severity={condition.severity}
                  suggestions={condition.suggestions}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Input Summary */}
        <div className="card bg-gray-50 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Assessment Summary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">Age</p>
              <p className="text-lg font-semibold text-gray-800">{results.input.age} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              <p className="text-lg font-semibold text-gray-800 capitalize">{results.input.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Symptoms Reported</p>
              <p className="text-lg font-semibold text-gray-800">{results.input.symptoms.length}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-600 mb-2">Symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {results.input.symptoms.map((symptom, idx) => (
                <span
                  key={idx}
                  className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {symptom.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/assessment')}
            className="btn-primary"
          >
            ↻ Re-assess
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            ← Back to Home
          </button>
        </div>

        {/* Final Disclaimer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            <span className="block font-semibold text-gray-800 mb-2">Medical Disclaimer</span>
            SymptoTwin is an informational tool and does not provide medical advice. The information provided is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding your health.
          </p>
        </div>
      </div>
    </div>
  );
}
