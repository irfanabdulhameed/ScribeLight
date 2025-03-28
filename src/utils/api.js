// API configuration for ScribeLight

// Get the API URL from environment variables or use a fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

// API endpoints
const ENDPOINTS = {
  TRANSCRIBE: `${API_URL}/api/transcribe`,
  PROCESS_TEXT: `${API_URL}/api/process-text`,
};

/**
 * Transcribe a YouTube video
 * @param {string} url - YouTube video URL
 * @returns {Promise} - Promise with the transcription result
 */
export const transcribeVideo = async (url) => {
  try {
    const response = await fetch(ENDPOINTS.TRANSCRIBE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to transcribe video');
    }

    return await response.json();
  } catch (error) {
    console.error('Transcription error:', error);
    throw error;
  }
};

/**
 * Process text with Gemini AI
 * @param {string} text - User input text
 * @param {string} transcript - Video transcript
 * @returns {Response} - Streaming response
 */
export const processText = async (text, transcript) => {
  try {
    return await fetch(ENDPOINTS.PROCESS_TEXT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        transcript,
      }),
    });
  } catch (error) {
    console.error('Process text error:', error);
    throw error;
  }
};