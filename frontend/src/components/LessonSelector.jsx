/**
 * LessonSelector Component
 * Allows users to select specific lessons for context
 */
import { useState } from 'react';
import './LessonSelector.css';

export default function LessonSelector({ lessons, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [useAllLessons, setUseAllLessons] = useState(true);
  const [expandedCourses, setExpandedCourses] = useState({});
  const [expandedModules, setExpandedModules] = useState({});

  // Course display information
  const courseInfo = {
    'ai-web-learning': {
      name: 'AI Web Learning',
      icon: '🚀',
      description: 'Main technical course'
    },
    'project-setup-guide': {
      name: 'Project Setup Guide',
      icon: '📋',
      description: 'Project organization'
    },
    'extras': {
      name: 'Additional Materials',
      icon: '📄',
      description: 'Extra resources'
    }
  };

  // Natural sort for modules (1-basics, 2-backend, ..., 10-ml)
  const naturalSort = (a, b) => {
    const aNum = parseInt(a.split('-')[0]);
    const bNum = parseInt(b.split('-')[0]);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }
    return a.localeCompare(b);
  };

  // Group lessons by course, then by module
  const groupedLessons = lessons.reduce((acc, lesson) => {
    const course = lesson.course || 'ai-web-learning';
    const module = lesson.module || 'unknown';

    if (!acc[course]) acc[course] = {};
    if (!acc[course][module]) acc[course][module] = [];
    acc[course][module].push(lesson);

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

  const toggleCourse = (course) => {
    setExpandedCourses(prev => ({
      ...prev,
      [course]: !prev[course]
    }));
  };

  const toggleModule = (key) => {
    setExpandedModules(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
              {Object.entries(groupedLessons).sort().map(([courseKey, modules]) => {
                const info = courseInfo[courseKey] || { name: courseKey, icon: '📚' };
                const isExpanded = expandedCourses[courseKey];

                return (
                  <div key={courseKey} className="course-block">
                    <button
                      className="course-button"
                      onClick={() => toggleCourse(courseKey)}
                    >
                      <span className="course-icon">{info.icon}</span>
                      <span className="course-title">{info.name}</span>
                      <span className="course-arrow">{isExpanded ? '▼' : '▶'}</span>
                    </button>

                    {isExpanded && (
                      <div className="course-modules">
                        {Object.entries(modules)
                          .sort(([a], [b]) => naturalSort(a, b))
                          .map(([moduleName, moduleLessons]) => {
                            const moduleKey = `${courseKey}-${moduleName}`;
                            const isModuleExpanded = expandedModules[moduleKey];

                            return (
                              <div key={moduleKey} className="module-block">
                                <button
                                  className="module-button"
                                  onClick={() => toggleModule(moduleKey)}
                                >
                                  <span className="module-name">{moduleName}</span>
                                  <span className="module-count">({moduleLessons.length})</span>
                                  <span className="module-arrow">{isModuleExpanded ? '▼' : '▶'}</span>
                                </button>

                                {isModuleExpanded && (
                                  <div className="module-lessons">
                                    {moduleLessons.map(lesson => (
                                      <label key={lesson.id} className="lesson-checkbox">
                                        <input
                                          type="checkbox"
                                          checked={selected.includes(lesson.id)}
                                          onChange={() => handleToggleLesson(lesson.id)}
                                        />
                                        <span className="lesson-text">{lesson.title}</span>
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
