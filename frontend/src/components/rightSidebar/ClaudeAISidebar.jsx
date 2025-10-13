/**
 * ClaudeAISidebar Component
 * AI chat interface with Claude-style dark theme
 */
import { useState, useEffect } from 'react';
import apiService from '../../services/api';
import './ClaudeAISidebar.css';

export default function ClaudeAISidebar({ lessons, currentLessonId }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [includeAllLessons, setIncludeAllLessons] = useState(false);

  // Load available models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const data = await apiService.getModels();
        setModels(data.models || []);
        setSelectedModel(data.default_model);
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };
    loadModels();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Determine which lessons to include
      const lessonIds = includeAllLessons
        ? null  // null = all lessons
        : currentLessonId ? [currentLessonId] : null;

      const response = await apiService.sendMessage(
        inputMessage,
        lessonIds,
        selectedModel,
        messages
      );

      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        metadata: {
          model: response.model_used,
          tokens: response.tokens_used,
          lessons: response.lessons_used
        }
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="claude-ai-sidebar">
      {/* Header with model selector */}
      <div className="ai-header">
        <div className="ai-title">
          <span className="ai-icon">🤖</span>
          <span>AI Assistant</span>
        </div>

        <select
          className="model-selector"
          value={selectedModel || ''}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={isLoading}
        >
          {models.map(model => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      {/* Context selector */}
      <div className="context-selector">
        <label className="context-option">
          <input
            type="checkbox"
            checked={includeAllLessons}
            onChange={(e) => setIncludeAllLessons(e.target.checked)}
          />
          <span>Include all lessons in context</span>
        </label>
        {!includeAllLessons && currentLessonId && (
          <div className="context-info">
            Using current lesson only
          </div>
        )}
      </div>

      {/* Messages list */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <div className="empty-icon">💬</div>
            <h3>Start a conversation</h3>
            <p>Ask questions about the course materials</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role} ${msg.error ? 'error' : ''}`}
              >
                <div className="message-content">
                  {msg.content}
                </div>
                {msg.metadata && (
                  <div className="message-metadata">
                    <span className="model-badge">{msg.metadata.model}</span>
                    {msg.metadata.tokens && (
                      <span className="tokens-badge">{msg.metadata.tokens} tokens</span>
                    )}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant loading">
                <div className="loading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="input-container">
        <textarea
          className="message-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question..."
          rows={3}
          disabled={isLoading}
        />
        <div className="input-actions">
          <button
            className="btn-send"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
