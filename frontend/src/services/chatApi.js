import apiClient from './api';

/**
 * Send a user message to the backend chat endpoint
 * @param {string} message
 * @param {Array} history Optional conversation history
 */
export const sendChatMessage = async (message, history = []) => {
  try {
    const response = await apiClient.post('/chat', { message, history });
    return response.data;
  } catch (err) {
    console.error('Chat API error:', err);
    throw err.response?.data || err;
  }
};

export const getFaqList = async () => {
  try {
    const response = await apiClient.get('/faqs');
    return response.data.faqs || [];
  } catch (err) {
    console.error('Failed to load faqs:', err);
    return [];
  }
};

export default { sendChatMessage };
