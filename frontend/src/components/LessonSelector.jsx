/**
 * LessonSelector Component
 * Allows users to select specific lessons for context
 */
import { useState, useEffect } from 'react';
import './LessonSelector.css';

export default function LessonSelector({ lessons, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [useAllLessons, setUseAllLessons] = useState(true);

  // Group lessons by module
  const lessonsByModule = lessons.reduce((acc, lesson) => {
    const module = lesson.module || 'Other';
    if (!acc[module]) acc[module] = [];
    acc[module].push(lesson);
    return acc;
  }, {});

  const handleToggleLesson = (lessonId) => {
    if (selected.includes(lessonId)) {
      onChange(selected.filter(id => id !== lessonId));
    } else {
      onChange([...selected, lessonId]);
    }
  };

  const handleToggleAll = (checked) => {
    setUseAllLessons(checked);
    if (checked) {
      onChange([]);
    }
  };

  return (
    <div className="lesson-selector">
      <button
        className="selector-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        📚 Lessons: {useAllLessons ? 'All' : selected.length > 0 ? `${selected.length} selected` : 'None'}
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="selector-dropdown">
          <div className="selector-header">
            <label>
              <input
                type="checkbox"
                checked={useAllLessons}
                onChange={(e) => handleToggleAll(e.target.checked)}
              />
              Use all lessons
            </label>
            {!useAllLessons && (
              <span className="lesson-count">
                {selected.length} / {lessons.length} selected
              </span>
            )}
          </div>

          {!useAllLessons && (
            <div className="lessons-list">
              {Object.entries(lessonsByModule).map(([module, moduleLessons]) => (
                <div key={module} className="module-group">
                  <div className="module-header">{module}</div>
                  {moduleLessons.map(lesson => (
                    <label key={lesson.id} className="lesson-item">
                      <input
                        type="checkbox"
                        checked={selected.includes(lesson.id)}
                        onChange={() => handleToggleLesson(lesson.id)}
                      />
                      <span className="lesson-title">{lesson.title}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
