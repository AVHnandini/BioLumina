import axios from 'axios';

// API base URL - change for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Get available symptoms from backend
 * @returns {Promise} Array of symptoms
 */
export const getSymptoms = async () => {
  try {
    const response = await apiClient.get('/symptoms');
    return response.data.symptoms;
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    throw error;
  }
};

/**
 * Predict conditions based on user input
 * @param {Object} data - Prediction data
 * @param {number} data.age - Patient age
 * @param {string} data.gender - Patient gender
 * @param {Array<string>} data.symptoms - Array of symptoms
 * @returns {Promise} Prediction results
 */
export const predictConditions = async (data) => {
  try {
    const response = await apiClient.post('/predict', data);
    return response.data;
  } catch (error) {
    console.error('Error predicting conditions:', error);
    throw error.response?.data || error;
  }
};

/**
 * Health check endpoint
 * @returns {Promise} Health status
 */
export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

export default apiClient;
