import React from 'react';
import { formatTokenCountShort, formatCostPrecise } from '../../utils/tokenEstimation';
import './ContextEstimate.css';

/**
 * ContextEstimate Component
 * Displays token count and estimated cost for selected context
 */
const ContextEstimate = ({ estimate, loading, error }) => {
  if (loading) {
    return (
      <div className="context-estimate loading">
        <div className="estimate-spinner"></div>
        <span>Calculating...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="context-estimate error">
        <span className="error-icon">⚠️</span>
        <span className="error-text">Error: {error}</span>
      </div>
    );
  }

  if (!estimate) {
    return null;
  }

  const {
    lesson_count,
    estimated_tokens,
    estimated_cost_input,
    estimated_cost_output
  } = estimate;

  return (
    <div className="context-estimate">
      <div className="estimate-row">
        <span className="estimate-label">Selected:</span>
        <span className="estimate-value">
          {lesson_count} {lesson_count === 1 ? 'lesson' : 'lessons'}
        </span>
      </div>

      <div className="estimate-row">
        <span className="estimate-label">Tokens:</span>
        <span className="estimate-value estimate-tokens">
          ~{formatTokenCountShort(estimated_tokens)}
        </span>
      </div>

      <div className="estimate-row">
        <span className="estimate-label">Est. cost:</span>
        <span className="estimate-value estimate-cost">
          {formatCostPrecise(estimated_cost_input)} in / {formatCostPrecise(estimated_cost_output)} out
        </span>
      </div>
    </div>
  );
};

export default ContextEstimate;
