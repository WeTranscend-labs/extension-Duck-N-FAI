import axios from 'axios';

interface GeminiResponse {
  message?: string;
  error?: string;
}

const BASE_URL = 'http://localhost:8080';

export const geminiService = {
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await axios.post<GeminiResponse>(
        `${BASE_URL}/api/chat`,
        { message },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      }

      return data.message || '';
    } catch (error: any) {
      console.error('Error sending message to Gemini:', error.message || error);
      throw new Error(error.response?.data?.error || 'Something went wrong');
    }
  },
};
