/**
 * ClaudeAISidebar Component
 * AI chat interface with Claude-style dark theme
 */
import { useState, useEffect } from 'react';
import apiService from '../../services/api';
import { ContextSelectorModal } from '../context';
import { getContextModeLabel } from '../../utils/lessonTree';
import './ClaudeAISidebar.css';
// REMOVED: import ArtifactCanvas - moved to CENTER

export default function ClaudeAISidebar({ lessons, currentLessonId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [attachedImages, setAttachedImages] = useState([]);
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

  // REMOVED: Tabs (chat | canvas) - Canvas moved to CENTER in Sprint 2
  // Canvas now lives in CenterContainer, RIGHT sidebar is chat-only

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
    if ((!inputMessage.trim() && attachedImages.length === 0) || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      images: attachedImages
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setAttachedImages([]);
    setIsLoading(true);

    try {
      // Use selected lesson IDs from context selector
      // selectedLessonIds can be null (all lessons), empty array, or array of IDs
      const lessonIds = selectedLessonIds;

      const response = await apiService.sendMessage(
        inputMessage,
        lessonIds,
        selectedModel,
        messages,
        attachedImages
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.type.startsWith('image/')) {
        e.preventDefault();

        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64 = event.target.result;
            setAttachedImages(prev => [...prev, base64]);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const removeImage = (index) => {
    setAttachedImages(prev => prev.filter((_, i) => i !== index));
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

  // Extract first fenced code block from message content
  const extractFirstCodeBlock = (text) => {
    if (!text) return null;
    const match = text.match(/```[a-zA-Z0-9_-]*\n([\s\S]*?)```/);
    return match ? match[1] : null;
  };

  // Send a message content to CENTER Artifact Viewer (code preferred, fallback to markdown)
  const handleSendToCanvas = (msg) => {
    if (!msg) return;
    const code = extractFirstCodeBlock(msg.content || '');
    if (code) {
      // NEW: Send to CENTER artifact viewer
      window.dispatchEvent(new CustomEvent('artifact:open', {
        detail: {
          type: 'code',
          title: 'From Chat',
          html: code,
          source: 'chat',
          tags: ['from-chat']
        }
      }));

      // LEGACY: Keep for backward compatibility
      window.dispatchEvent(new CustomEvent('canvas:add', {
        detail: {
          type: 'code',
          title: 'From Chat',
          html: code,
          source: 'chat',
          tags: ['from-chat']
        }
      }));
      return;
    }

    // Fallback: send markdown content
    window.dispatchEvent(new CustomEvent('artifact:open', {
      detail: {
        type: 'markdown',
        title: 'From Chat',
        markdown: msg.content || '',
        source: 'chat',
        tags: ['from-chat']
      }
    }));

    // LEGACY: Keep for backward compatibility
    window.dispatchEvent(new CustomEvent('canvas:add', {
      detail: {
        type: 'markdown',
        title: 'From Chat',
        markdown: msg.content || '',
        source: 'chat',
        tags: ['from-chat']
      }
    }));

    // If images present, also push them
    if (msg.images && msg.images.length) {
      window.dispatchEvent(new CustomEvent('artifact:open', {
        detail: {
          type: 'images',
          title: 'Images from Chat',
          images: msg.images,
          source: 'chat',
          tags: ['from-chat']
        }
      }));
    }
  };

  return (
    <div className="claude-ai-sidebar">
      {/* Header with model selector */}
      <div className="ai-header">
        <div className="ai-title-row">
          <div className="ai-title">
            <span className="ai-icon">🤖</span>
            <span>AI Assistant</span>
          </div>
          {onClose && (
            <button
              className="btn-close-sidebar"
              onClick={onClose}
              title="Close AI Chat"
              aria-label="Close right sidebar"
            >
              ✕
            </button>
          )}
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

      {/* REMOVED: Tabs UI - Canvas moved to CENTER */}

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

      {/* REMOVED: Canvas container - moved to CENTER */}

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
                {msg.images && msg.images.length > 0 && (
                  <div className="message-images">
                    {msg.images.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img}
                        alt={`Attached ${imgIndex + 1}`}
                        className="message-image"
                      />
                    ))}
                  </div>
                )}
                <div className="message-content">
                  {msg.content}
                </div>
                {msg.role === 'assistant' && (
                  <div className="message-actions">
                    <button
                      className="btn-send-to-canvas"
                      onClick={() => handleSendToCanvas(msg)}
                      title="Send this message to Canvas"
                    >
                      🧩 Canvas
                    </button>
                  </div>
                )}
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
        {attachedImages.length > 0 && (
          <div className="attached-images">
            {attachedImages.map((img, index) => (
              <div key={index} className="image-preview">
                <img src={img} alt={`Attached ${index + 1}`} />
                <button
                  type="button"
                  className="remove-image"
                  onClick={() => removeImage(index)}
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <textarea
          className="message-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="Ask a question... (Paste images with Ctrl+V)"
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
            disabled={(!inputMessage.trim() && attachedImages.length === 0) || isLoading}
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
