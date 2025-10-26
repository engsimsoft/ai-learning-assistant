import React, { useState, useEffect, useCallback } from 'react';
import apiService from '../../services/api';
import { getLessonIdsForMode, getContextModeLabel } from '../../utils/lessonTree';
import ContextEstimate from './ContextEstimate';
import LessonTree from './LessonTree';
import './ContextSelectorModal.css';

/**
 * ContextSelectorModal Component
 * Modal for selecting lessons to include in AI context
 */
const ContextSelectorModal = ({
  isOpen,
  onClose,
  lessons,
  currentLessonId,
  initialMode = 'current',
  initialSelectedIds = [],
  onSave
}) => {
  const [mode, setMode] = useState(initialMode);
  const [customSelectedIds, setCustomSelectedIds] = useState(initialSelectedIds);
  const [estimate, setEstimate] = useState(null);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [estimateError, setEstimateError] = useState(null);

  // Get current selection based on mode
  const getCurrentSelection = useCallback(() => {
    return getLessonIdsForMode(mode, currentLessonId, lessons, customSelectedIds);
  }, [mode, currentLessonId, lessons, customSelectedIds]);

  // Fetch estimate when selection changes
  useEffect(() => {
    if (!isOpen) return;

    const fetchEstimate = async () => {
      setEstimateLoading(true);
      setEstimateError(null);

      try {
        const selection = getCurrentSelection();
        const result = await apiService.previewContext(selection);
        setEstimate(result);
      } catch (error) {
        console.error('Error fetching estimate:', error);
        const errorMsg = error?.message || error?.toString() || 'Failed to load estimate';
        setEstimateError(errorMsg);
      } finally {
        setEstimateLoading(false);
      }
    };

    // Debounce the fetch
    const timer = setTimeout(fetchEstimate, 300);
    return () => clearTimeout(timer);
  }, [isOpen, mode, customSelectedIds, getCurrentSelection]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    // If switching to custom mode, initialize with current selection
    if (newMode === 'custom' && customSelectedIds.length === 0) {
      const currentSelection = getLessonIdsForMode(
        mode,
        currentLessonId,
        lessons,
        customSelectedIds
      );
      if (currentSelection && Array.isArray(currentSelection)) {
        setCustomSelectedIds(currentSelection);
      }
    }
  };

  const handleCustomSelectionChange = (newSelection) => {
    setCustomSelectedIds(newSelection);
  };

  const handleSave = () => {
    const selection = getCurrentSelection();
    onSave(mode, selection);
    onClose();
  };

  const handleCancel = () => {
    // Reset to initial values
    setMode(initialMode);
    setCustomSelectedIds(initialSelectedIds);
    onClose();
  };

  // Get description of selected context for quick modes
  const getQuickModeDescription = () => {
    if (mode === 'custom') return null;

    if (mode === 'all') {
      return 'All available lessons';
    }

    if (mode === 'current' && currentLessonId) {
      const lesson = lessons.find(l => l.id === currentLessonId);
      return lesson ? lesson.title : 'Current lesson';
    }

    if (mode === 'module' && currentLessonId) {
      const lesson = lessons.find(l => l.id === currentLessonId);
      if (lesson) {
        return `${lesson.course} → ${lesson.module}`;
      }
      return 'Current module';
    }

    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Configure Context</h2>
          <button className="modal-close-btn" onClick={handleCancel}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Quick Modes */}
          <div className="context-modes">
            <div className="mode-label-container">
              <label className="mode-label">Quick Modes:</label>
              {mode !== 'custom' && getQuickModeDescription() && (
                <span className="mode-description">{getQuickModeDescription()}</span>
              )}
            </div>
            <div className="mode-options">
              <label className="mode-option">
                <input
                  type="radio"
                  name="context-mode"
                  value="current"
                  checked={mode === 'current'}
                  onChange={() => handleModeChange('current')}
                />
                <span>Current Lesson</span>
              </label>

              <label className="mode-option">
                <input
                  type="radio"
                  name="context-mode"
                  value="module"
                  checked={mode === 'module'}
                  onChange={() => handleModeChange('module')}
                />
                <span>Current Module</span>
              </label>

              <label className="mode-option">
                <input
                  type="radio"
                  name="context-mode"
                  value="all"
                  checked={mode === 'all'}
                  onChange={() => handleModeChange('all')}
                />
                <span>All Lessons</span>
              </label>

              <label className="mode-option">
                <input
                  type="radio"
                  name="context-mode"
                  value="custom"
                  checked={mode === 'custom'}
                  onChange={() => handleModeChange('custom')}
                />
                <span>Custom Selection</span>
              </label>
            </div>
          </div>

          {/* Custom Selection Tree */}
          {mode === 'custom' && (
            <div className="custom-selection-section">
              <div className="section-header">
                <label className="section-label">Select Lessons:</label>
                <button
                  className="clear-selection-btn"
                  onClick={() => setCustomSelectedIds([])}
                  disabled={customSelectedIds.length === 0}
                >
                  Clear All
                </button>
              </div>
              <LessonTree
                lessons={lessons}
                selectedIds={customSelectedIds}
                onChange={handleCustomSelectionChange}
              />
            </div>
          )}

          {/* Estimate */}
          <div className="estimate-section">
            <ContextEstimate
              estimate={estimate}
              loading={estimateLoading}
              error={estimateError}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Apply Context
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextSelectorModal;
