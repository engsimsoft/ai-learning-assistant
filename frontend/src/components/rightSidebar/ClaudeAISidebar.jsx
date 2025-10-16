/**
 * ClaudeAISidebar Component
 * AI chat interface with Claude-style dark theme
 */
import { useState, useEffect } from 'react';
import apiService from '../../services/api';
import { ContextSelectorModal } from '../context';
import { getContextModeLabel } from '../../utils/lessonTree';
import './ClaudeAISidebar.css';

export default function ClaudeAISidebar({ lessons, currentLessonId }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);

  // Context management
  const [contextMode, setContextMode] = useState('current');
  const [selectedLessonIds, setSelectedLessonIds] = useState(
    currentLessonId ? [currentLessonId] : []
  );
  const [showContextModal, setShowContextModal] = useState(false);

  const [showStatsModal, setShowStatsModal] = useState(false);

  // Conversation statistics
  const [conversationStats, setConversationStats] = useState({
    totalMessages: 0,
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    costUsd: 0,
    costRub: 0
  });

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

  // Update selectedLessonIds when currentLessonId changes (for 'current' mode only)
  useEffect(() => {
    if (contextMode === 'current' && currentLessonId) {
      setSelectedLessonIds([currentLessonId]);
    }
  }, [currentLessonId, contextMode]);

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
      // Use selected lesson IDs from context selector
      // selectedLessonIds can be null (all lessons), empty array, or array of IDs
      const lessonIds = selectedLessonIds;

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

      // Update conversation statistics
      if (response.tokens_used && response.cost) {
        setConversationStats(prev => ({
          totalMessages: prev.totalMessages + 1,
          inputTokens: prev.inputTokens + (response.tokens_used.input || 0),
          outputTokens: prev.outputTokens + (response.tokens_used.output || 0),
          totalTokens: prev.totalTokens + (response.tokens_used.total || 0),
          costUsd: prev.costUsd + (response.cost.usd || 0),
          costRub: prev.costRub + (response.cost.rub || 0)
        }));
      }
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

  const handleContextSave = (mode, lessonIds) => {
    setContextMode(mode);
    setSelectedLessonIds(lessonIds);
  };

  const getContextSummary = () => {
    const label = getContextModeLabel(contextMode, selectedLessonIds?.length || 0);

    if (contextMode === 'custom' && selectedLessonIds?.length > 0) {
      return `${label} lessons`;
    }

    return label;
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
          {models.map(model => {
            const isFree = model.input_cost_per_1m === 0 && model.output_cost_per_1m === 0;
            const pricingInfo = isFree
              ? 'FREE!'
              : `$${model.input_cost_per_1m} in / $${model.output_cost_per_1m} out`;

            return (
              <option key={model.id} value={model.id}>
                {model.name} · {model.context_display} · {pricingInfo}
              </option>
            );
          })}
        </select>
      </div>

      {/* Context selector */}
      <div className="context-selector">
        <div className="context-summary">
          <span className="context-label">Context:</span>
          <span className="context-value">{getContextSummary()}</span>
        </div>
        <button
          className="btn-configure-context"
          onClick={() => setShowContextModal(true)}
          disabled={isLoading}
          title="Configure context selection"
        >
          ⚙️
        </button>
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
                      <span className="tokens-badge">
                        {msg.metadata.tokens.total || msg.metadata.tokens} tokens
                      </span>
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
            className="btn-stats"
            onClick={() => setShowStatsModal(true)}
            title="View conversation statistics"
          >
            📊
          </button>
          <button
            className="btn-send"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>

      {/* Context Selector Modal */}
      <ContextSelectorModal
        isOpen={showContextModal}
        onClose={() => setShowContextModal(false)}
        lessons={lessons}
        currentLessonId={currentLessonId}
        initialMode={contextMode}
        initialSelectedIds={selectedLessonIds || []}
        onSave={handleContextSave}
      />

      {/* Statistics Modal */}
      {showStatsModal && (
        <div className="stats-modal-overlay" onClick={() => setShowStatsModal(false)}>
          <div className="stats-modal" onClick={(e) => e.stopPropagation()}>
            <div className="stats-modal-header">
              <h3>Conversation Statistics</h3>
              <button
                className="stats-modal-close"
                onClick={() => setShowStatsModal(false)}
              >
                ×
              </button>
            </div>

            <div className="stats-modal-content">
              <div className="stats-section">
                <h4>Messages</h4>
                <div className="stats-value">{conversationStats.totalMessages}</div>
              </div>

              <div className="stats-section">
                <h4>Tokens Used</h4>
                <div className="stats-grid">
                  <div className="stats-item">
                    <span className="stats-label">Input:</span>
                    <span className="stats-value">{conversationStats.inputTokens.toLocaleString()}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">Output:</span>
                    <span className="stats-value">{conversationStats.outputTokens.toLocaleString()}</span>
                  </div>
                  <div className="stats-item stats-total">
                    <span className="stats-label">Total:</span>
                    <span className="stats-value">{conversationStats.totalTokens.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="stats-section">
                <h4>Cost</h4>
                <div className="stats-grid">
                  <div className="stats-item">
                    <span className="stats-label">USD:</span>
                    <span className="stats-value">${conversationStats.costUsd.toFixed(4)}</span>
                  </div>
                  <div className="stats-item">
                    <span className="stats-label">RUB:</span>
                    <span className="stats-value">₽{conversationStats.costRub.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
