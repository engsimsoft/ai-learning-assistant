/**
 * MessageList Component
 * Displays the conversation history
 */
import { useEffect, useRef } from 'react';
import './MessageList.css';

export default function MessageList({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="message-list">
      {messages.length === 0 && (
        <div className="welcome-message">
          <h2>Welcome to AI Learning Agent</h2>
          <p>Ask me anything about web development!</p>
          <p className="hint">You can select specific lessons or models below before asking.</p>
        </div>
      )}

      {messages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          <div className="message-header">
            <span className="role-label">
              {message.role === 'user' ? '🧑 You' : '🤖 AI Tutor'}
            </span>
            {message.metadata && (
              <span className="message-metadata">
                Model: {message.metadata.model_used || 'N/A'}
              </span>
            )}
          </div>
          <div className="message-content">
            {message.content}
          </div>
          {message.metadata && message.metadata.lessonsUsed && (
            <div className="message-footer">
              <small>
                📚 Using: {message.metadata.lessonsUsed.length > 3
                  ? `${message.metadata.lessonsUsed.slice(0, 3).join(', ')} +${message.metadata.lessonsUsed.length - 3} more`
                  : message.metadata.lessonsUsed.join(', ')}
              </small>
              {message.metadata.tokensUsed && (
                <small> | 🔤 {message.metadata.tokensUsed} tokens</small>
              )}
            </div>
          )}
          {message.isError && (
            <div className="error-indicator">⚠️ Error</div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="message assistant loading">
          <div className="message-header">
            <span className="role-label">🤖 AI Tutor</span>
          </div>
          <div className="message-content">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
