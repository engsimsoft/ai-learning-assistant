/**
 * CourseTree Component
 * Hierarchical tree: Courses → Modules → Lessons
 */
import { useState } from 'react';
import './CourseTree.css';

export default function CourseTree({ lessons, currentLessonId, onLessonSelect }) {
  // State for expanded courses and modules
  const [expandedCourses, setExpandedCourses] = useState({});
  const [expandedModules, setExpandedModules] = useState({});

  // Course metadata
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

  // Group lessons by course → module
  const groupedLessons = lessons.reduce((acc, lesson) => {
    const course = lesson.course || 'ai-web-learning';
    const module = lesson.module || 'unknown';

    if (!acc[course]) acc[course] = {};
    if (!acc[course][module]) acc[course][module] = [];
    acc[course][module].push(lesson);

    return acc;
  }, {});

  // Toggle course expansion
  const toggleCourse = (courseKey) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseKey]: !prev[courseKey]
    }));
  };

  // Toggle module expansion
  const toggleModule = (courseKey, moduleName) => {
    const key = `${courseKey}-${moduleName}`;
    setExpandedModules(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle lesson click
  const handleLessonClick = (lessonId) => {
    onLessonSelect(lessonId);
  };

  return (
    <div className="course-tree">
      {Object.entries(groupedLessons).sort().map(([courseKey, modules]) => {
        const info = courseInfo[courseKey] || { name: courseKey, icon: '📚' };
        const isExpanded = expandedCourses[courseKey];
        const moduleCount = Object.keys(modules).length;
        const lessonCount = Object.values(modules).flat().length;

        return (
          <div key={courseKey} className="course-block">
            {/* Course Header */}
            <button
              className={`course-header ${isExpanded ? 'expanded' : ''}`}
              onClick={() => toggleCourse(courseKey)}
            >
              <span className="course-icon">{info.icon}</span>
              <span className="course-title">{info.name}</span>
              <span className="course-count">({lessonCount})</span>
              <span className="course-arrow">{isExpanded ? '▼' : '▶'}</span>
            </button>

            {/* Course Modules */}
            {isExpanded && (
              <div className="course-modules">
                {Object.entries(modules)
                  .sort(([a], [b]) => naturalSort(a, b))
                  .map(([moduleName, moduleLessons]) => {
                    const moduleKey = `${courseKey}-${moduleName}`;
                    const isModuleExpanded = expandedModules[moduleKey];

                    return (
                      <div key={moduleKey} className="module-block">
                        {/* Module Header */}
                        <button
                          className={`module-header ${isModuleExpanded ? 'expanded' : ''}`}
                          onClick={() => toggleModule(courseKey, moduleName)}
                        >
                          <span className="module-icon">📂</span>
                          <span className="module-name">{moduleName}</span>
                          <span className="module-count">({moduleLessons.length})</span>
                          <span className="module-arrow">{isModuleExpanded ? '▼' : '▶'}</span>
                        </button>

                        {/* Module Lessons */}
                        {isModuleExpanded && (
                          <div className="module-lessons">
                            {moduleLessons.map(lesson => (
                              <button
                                key={lesson.id}
                                className={`lesson-item ${currentLessonId === lesson.id ? 'active' : ''}`}
                                onClick={() => handleLessonClick(lesson.id)}
                              >
                                <span className="lesson-icon">📄</span>
                                <span className="lesson-title">{lesson.title}</span>
                              </button>
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
  );
}
