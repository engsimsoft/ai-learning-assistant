/**
 * LessonNavigation Component
 * Previous/Next lesson navigation buttons
 */
import './LessonNavigation.css';

export default function LessonNavigation({ prevLesson, nextLesson, onNavigate }) {
  if (!prevLesson && !nextLesson) {
    return null;
  }

  return (
    <div className="lesson-navigation">
      <div className="lesson-nav-buttons">
        {prevLesson ? (
          <button
            className="lesson-nav-btn lesson-nav-prev"
            onClick={() => onNavigate(prevLesson.id)}
          >
            <span className="lesson-nav-arrow">←</span>
            <div className="lesson-nav-text">
              <span className="lesson-nav-label">Previous</span>
              <span className="lesson-nav-title">{prevLesson.title}</span>
            </div>
          </button>
        ) : (
          <div className="lesson-nav-placeholder"></div>
        )}

        {nextLesson ? (
          <button
            className="lesson-nav-btn lesson-nav-next"
            onClick={() => onNavigate(nextLesson.id)}
          >
            <div className="lesson-nav-text">
              <span className="lesson-nav-label">Next</span>
              <span className="lesson-nav-title">{nextLesson.title}</span>
            </div>
            <span className="lesson-nav-arrow">→</span>
          </button>
        ) : (
          <div className="lesson-nav-placeholder"></div>
        )}
      </div>
    </div>
  );
}
