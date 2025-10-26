/**
 * ChatInterface Component
 * Main component managing chat state and interactions
 */
import { useState, useEffect } from 'react';
import apiService from '../services/api';
import MessageList from './MessageList';
import InputForm from './InputForm';
import LessonSelector from './LessonSelector';
import ModelSelector from './ModelSelector';
import './ChatInterface.css';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [models, setModels] = useState([]);
  const [defaultModel, setDefaultModel] = useState('');
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load lessons and models on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check backend health
        const isHealthy = await apiService.checkHealth();
        if (!isHealthy) {
          setError('Backend is not responding. Please check if the server is running.');
          return;
        }

        // Load lessons
        const lessonsData = await apiService.getLessons();
        setLessons(lessonsData.lessons || []);

        // Load models
        const modelsData = await apiService.getModels();
        setModels(modelsData.models || []);
        setDefaultModel(modelsData.default_model || '');

      } catch (err) {
        console.error('Error loading data:', err);
        setError(`Failed to load data: ${err.message}`);
      }
    };

    loadData();
  }, []);

  const handleSendMessage = async (message, images = []) => {
    // Add user message to chat (with images if present)
    const userMessage = {
      role: 'user',
      content: message,
      images: images
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Send to API
      const response = await apiService.sendMessage(
        message,
        selectedLessons.length > 0 ? selectedLessons : null,
        selectedModel,
        messages,
        images
      );

      // Add AI response to chat
      const aiMessage = {
        role: 'assistant',
        content: response.response,
        metadata: {
          model_used: response.model_used,
          lessonsUsed: response.lessons_used,
          tokensUsed: response.tokens_used,
          contextLength: response.context_length
        }
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      console.error('Error sending message:', err);

      // Show error message in chat
      const errorMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${err.message}. Please try again.`,
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      setError(err.message);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h1>🎓 AI Learning Agent</h1>
        <p>Your AI tutor for web development</p>
        {error && (
          <div className="error-banner">
            ⚠️ {error}
          </div>
        )}
      </div>

      <div className="chat-controls">
        <LessonSelector
          lessons={lessons}
          selected={selectedLessons}
          onChange={setSelectedLessons}
        />
        <ModelSelector
          models={models}
          defaultModel={defaultModel}
          selected={selectedModel}
          onChange={setSelectedModel}
        />
      </div>

      <MessageList messages={messages} isLoading={isLoading} />

      <InputForm onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
