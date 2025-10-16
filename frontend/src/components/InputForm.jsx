/**
 * InputForm Component
 * Handles user input and message submission
 * Supports pasting images from clipboard (Ctrl+V / Cmd+V)
 */
import { useState } from 'react';
import './InputForm.css';

export default function InputForm({ onSend, disabled }) {
  const [message, setMessage] = useState('');
  const [attachedImages, setAttachedImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if ((trimmed || attachedImages.length > 0) && !disabled) {
      onSend(trimmed, attachedImages);
      setMessage('');
      setAttachedImages([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handlePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Check if the item is an image
      if (item.type.startsWith('image/')) {
        e.preventDefault();

        const file = item.getAsFile();
        if (file) {
          // Convert to base64
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

  return (
    <form className="input-form" onSubmit={handleSubmit}>
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder="Ask a question about web development... (Paste images with Ctrl+V)"
        disabled={disabled}
        rows={3}
      />
      <button type="submit" disabled={disabled || (!message.trim() && attachedImages.length === 0)}>
        {disabled ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
