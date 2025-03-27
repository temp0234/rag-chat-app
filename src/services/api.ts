import axios from 'axios';

// Define the ENV interface for TypeScript
declare global {
  interface Window {
    ENV: {
      REACT_APP_N8N_WEBHOOK_URL: string;
    };
  }
}

// Use the environment variable from config.js, then env variable, or fall back to a default
const N8N_WEBHOOK_URL = window.ENV?.REACT_APP_N8N_WEBHOOK_URL || 
                        process.env.REACT_APP_N8N_WEBHOOK_URL || 
                        'https://your-n8n-instance.cloud/webhook/e104e40e-6134-4825-a6f0-8a646d882662';

export const sendMessage = async (message: string, sessionId: string) => {
  try {
    const response = await axios.post(N8N_WEBHOOK_URL, {
      chatInput: message,
      sessionId: sessionId,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending message to n8n:', error);
    throw error;
  }
}; 