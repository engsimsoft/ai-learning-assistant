/**
 * ModelSelector Component
 * Allows users to select AI model
 */
import { useState } from 'react';
import './ModelSelector.css';

export default function ModelSelector({ models, defaultModel, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedModel = models.find(m => m.id === selected) ||
                       models.find(m => m.id === defaultModel);

  return (
    <div className="model-selector">
      <button
        className="selector-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        🤖 Model: {selectedModel?.name || 'Default'}
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="selector-dropdown">
          <div className="models-list">
            <label className="model-item">
              <input
                type="radio"
                name="model"
                checked={selected === null}
                onChange={() => {
                  onChange(null);
                  setIsOpen(false);
                }}
              />
              <div className="model-info">
                <div className="model-name">Default ({models.find(m => m.id === defaultModel)?.name})</div>
                <div className="model-description">Use system default</div>
              </div>
            </label>
            {models.map(model => (
              <label key={model.id} className="model-item">
                <input
                  type="radio"
                  name="model"
                  checked={selected === model.id}
                  onChange={() => {
                    onChange(model.id);
                    setIsOpen(false);
                  }}
                />
                <div className="model-info">
                  <div className="model-name">{model.name}</div>
                  <div className="model-description">{model.description}</div>
                  <div className="model-context">Context: {model.context_length.toLocaleString()} tokens</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
