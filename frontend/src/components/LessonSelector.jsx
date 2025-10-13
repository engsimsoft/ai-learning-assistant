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

  // Toggle all lessons in a course
  const handleToggleCourse = (courseKey, modules) => {
    const courseLessonIds = Object.values(modules)
      .flat()
      .map(lesson => lesson.id);

    const allSelected = courseLessonIds.every(id => selected.includes(id));

    if (allSelected) {
      // Deselect all lessons in this course
      onChange(selected.filter(id => !courseLessonIds.includes(id)));
    } else {
      // Select all lessons in this course
      const newSelected = [...new Set([...selected, ...courseLessonIds])];
      onChange(newSelected);
    }
  };

  // Check if all lessons in a course are selected
  const isAllCourseSelected = (modules) => {
    const courseLessonIds = Object.values(modules)
      .flat()
      .map(lesson => lesson.id);
    return courseLessonIds.length > 0 && courseLessonIds.every(id => selected.includes(id));
  };

  // Check if some (but not all) lessons in a course are selected
  const isSomeCourseSelected = (modules) => {
    const courseLessonIds = Object.values(modules)
      .flat()
      .map(lesson => lesson.id);
    const selectedCount = courseLessonIds.filter(id => selected.includes(id)).length;
    return selectedCount > 0 && selectedCount < courseLessonIds.length;
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
                const allSelected = isAllCourseSelected(modules);
                const someSelected = isSomeCourseSelected(modules);

                return (
                  <div key={courseKey} className="course-block">
                    <div className="course-header">
                      <input
                        type="checkbox"
                        className="course-checkbox"
                        checked={allSelected}
                        ref={input => {
                          if (input) input.indeterminate = someSelected;
                        }}
                        onChange={() => handleToggleCourse(courseKey, modules)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        className="course-button"
                        onClick={() => toggleCourse(courseKey)}
                      >
                        <span className="course-icon">{info.icon}</span>
                        <span className="course-title">{info.name}</span>
                        <span className="course-arrow">{isExpanded ? '▼' : '▶'}</span>
                      </button>
                    </div>

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
