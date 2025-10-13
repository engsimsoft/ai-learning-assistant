/**
 * InputForm Component
 * Handles user input and message submission
 */
import { useState } from 'react';
import './InputForm.css';

export default function InputForm({ onSend, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question about web development..."
        disabled={disabled}
        rows={3}
      />
      <button type="submit" disabled={disabled || !message.trim()}>
        {disabled ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
