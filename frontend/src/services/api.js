/**
 * API Service - Handles all communication with backend
 */
import { API_URL } from '../config';

class APIService {
  /**
   * Get list of all available lessons
   */
  async getLessons() {
    try {
      const response = await fetch(`${API_URL}/lessons`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch lessons`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  }

  /**
   * Get detailed lesson by ID including content
   * @param {number} lessonId - Lesson ID
   */
  async getLesson(lessonId) {
    try {
      const response = await fetch(`${API_URL}/lessons/${lessonId}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch lesson ${lessonId}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching lesson ${lessonId}:`, error);
      throw error;
    }
  }

  /**
   * Get list of available AI models
   */
  async getModels() {
    try {
      const response = await fetch(`${API_URL}/models`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch models`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }

  /**
   * Send chat message to AI
   *
   * @param {string} message - User's message
   * @param {number[]|null} lessonIds - Array of lesson IDs or null for all
   * @param {string|null} model - Model ID or null for default
   * @param {Array} history - Conversation history
   * @param {Array} images - Array of base64 encoded images
   */
  async sendMessage(message, lessonIds = null, model = null, history = [], images = []) {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          lesson_ids: lessonIds,
          model: model,
          conversation_history: history,
          images: images
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP ${response.status}: Failed to send message`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Get lessons grouped by course and module
   */
  async getLessonsGrouped() {
    try {
      const response = await fetch(`${API_URL}/lessons/grouped`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch grouped lessons`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching grouped lessons:', error);
      throw error;
    }
  }

  /**
   * Preview context token count and estimated cost
   * @param {number[]|null} lessonIds - Array of lesson IDs or null for all
   */
  async previewContext(lessonIds = null) {
    try {
      const response = await fetch(`${API_URL}/context/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lesson_ids: lessonIds
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP ${response.status}: Failed to preview context`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error previewing context:', error);
      throw error;
    }
  }

  /**
   * Check backend health
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_URL}/health`);
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      return data.status === 'healthy';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export default new APIService();
