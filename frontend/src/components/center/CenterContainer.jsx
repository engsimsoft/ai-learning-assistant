/**
 * CenterContainer Component
 * Dynamic container that can show:
 * - LESSON_ONLY: Lesson viewer at 100% width
 * - LESSON_ARTIFACT: Split view (lesson | artifact) with resizable handle
 * - ARTIFACT_ONLY: Artifact at 100% width
 */
import { useState, useEffect, useRef } from 'react';
import LessonViewer from './LessonViewer';
import ArtifactViewer from './ArtifactViewer';
import CenterResizeHandle from './CenterResizeHandle';
import './CenterContainer.css';

// CENTER states
export const CENTER_STATES = {
  LESSON_ONLY: 'LESSON_ONLY',
  LESSON_ARTIFACT: 'LESSON_ARTIFACT',
  ARTIFACT_ONLY: 'ARTIFACT_ONLY'
};

/**
 * @typedef {Object} CenterState
 * @property {string} state - One of CENTER_STATES
 * @property {number} lessonWidth - Percentage width of lesson (when split)
 * @property {number} artifactWidth - Percentage width of artifact (when split)
 * @property {string|null} currentLessonId - Current lesson ID
 * @property {Object|null} currentArtifact - Current artifact data
 */

export default function CenterContainer({
  lessonId,
  lessons,
  onLessonChange,
  centerState,
  onCenterStateChange
}) {
  // Local state for split resize
  const [splitRatio, setSplitRatio] = useState({
    lesson: 40,
    artifact: 60
  });

  const containerRef = useRef(null);

  /**
   * Handle artifact open event from external sources
   * Event detail: { type, title, content, source, tags, ... }
   */
  useEffect(() => {
    const handleArtifactOpen = (evt) => {
      const detail = evt.detail || {};

      // Determine new state based on source
      let newState;
      if (detail.source === 'lesson') {
        // Artifact from lesson → split view
        newState = CENTER_STATES.LESSON_ARTIFACT;
      } else if (detail.source === 'chat') {
        // Artifact from AI → artifact only
        newState = CENTER_STATES.ARTIFACT_ONLY;
      } else {
        // Default: artifact only
        newState = CENTER_STATES.ARTIFACT_ONLY;
      }

      onCenterStateChange({
        state: newState,
        lessonWidth: splitRatio.lesson,
        artifactWidth: splitRatio.artifact,
        currentLessonId: lessonId,
        currentArtifact: detail
      });
    };

    window.addEventListener('artifact:open', handleArtifactOpen);
    return () => window.removeEventListener('artifact:open', handleArtifactOpen);
  }, [lessonId, splitRatio, onCenterStateChange]);

  /**
   * Handle artifact close event
   */
  const handleArtifactClose = () => {
    onCenterStateChange({
      state: CENTER_STATES.LESSON_ONLY,
      lessonWidth: 100,
      artifactWidth: 0,
      currentLessonId: lessonId,
      currentArtifact: null
    });
  };

  /**
   * Handle resize between lesson and artifact
   * @param {number} lessonPercent - New lesson width percentage
   */
  const handleResize = (lessonPercent) => {
    const artifactPercent = 100 - lessonPercent;
    setSplitRatio({
      lesson: lessonPercent,
      artifact: artifactPercent
    });

    // Update parent state
    if (onCenterStateChange && centerState) {
      onCenterStateChange({
        ...centerState,
        lessonWidth: lessonPercent,
        artifactWidth: artifactPercent
      });
    }
  };

  /**
   * Show lesson when hidden (from artifact toolbar)
   */
  const handleShowLesson = () => {
    if (centerState.state === CENTER_STATES.ARTIFACT_ONLY) {
      onCenterStateChange({
        ...centerState,
        state: CENTER_STATES.LESSON_ARTIFACT,
        lessonWidth: splitRatio.lesson,
        artifactWidth: splitRatio.artifact
      });
    }
  };

  // Listen for show lesson event
  useEffect(() => {
    window.addEventListener('center:showLesson', handleShowLesson);
    return () => window.removeEventListener('center:showLesson', handleShowLesson);
  }, [centerState, splitRatio]);

  // Render based on state
  const currentState = centerState?.state || CENTER_STATES.LESSON_ONLY;

  return (
    <div className="center-container" ref={containerRef}>
      {currentState === CENTER_STATES.LESSON_ONLY && (
        <div className="center-lesson-only">
          <LessonViewer
            lessonId={lessonId}
            lessons={lessons}
            onLessonChange={onLessonChange}
          />
        </div>
      )}

      {currentState === CENTER_STATES.LESSON_ARTIFACT && (
        <div className="center-split">
          <div
            className="center-split-lesson"
            style={{ width: `${splitRatio.lesson}%` }}
          >
            <LessonViewer
              lessonId={lessonId}
              lessons={lessons}
              onLessonChange={onLessonChange}
            />
          </div>

          <CenterResizeHandle
            onResize={handleResize}
            initialLessonPercent={splitRatio.lesson}
            containerRef={containerRef}
          />

          <div
            className="center-split-artifact"
            style={{ width: `${splitRatio.artifact}%` }}
          >
            <ArtifactViewer
              artifact={centerState.currentArtifact}
              onClose={handleArtifactClose}
              showLessonButton={false}
            />
          </div>
        </div>
      )}

      {currentState === CENTER_STATES.ARTIFACT_ONLY && (
        <div className="center-artifact-only">
          <ArtifactViewer
            artifact={centerState.currentArtifact}
            onClose={handleArtifactClose}
            showLessonButton={true}
          />
        </div>
      )}
    </div>
  );
}
