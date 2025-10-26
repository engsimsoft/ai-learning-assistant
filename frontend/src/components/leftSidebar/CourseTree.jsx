/**
 * CourseTree Component
 * Hierarchical tree: Courses → Modules → Lessons
 * With progress tracking
 */
import { useState, useEffect } from 'react';
import progressService from '../../services/progressService';
import './CourseTree.css';

export default function CourseTree({ lessons, currentLessonId, onLessonSelect }) {
  // State for expanded courses and modules
  const [expandedCourses, setExpandedCourses] = useState({});
  const [expandedModules, setExpandedModules] = useState({});

  // Force re-render when progress changes
  const [, forceUpdate] = useState(0);

  // Listen for progress updates from LessonViewer
  useEffect(() => {
    const handleProgressUpdate = () => {
      forceUpdate(prev => prev + 1);
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
  }, []);

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
    'worked-examples': {
      name: 'Worked Examples',
      icon: '💼',
      description: 'Real-world examples'
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
    progressService.updateLastVisited(lessonId);
    onLessonSelect(lessonId);
  };

  // Handle checkbox click (toggle completion)
  const handleCheckboxClick = (e, lessonId) => {
    e.stopPropagation(); // Prevent lesson selection
    progressService.toggleLessonCompletion(lessonId);
    forceUpdate(prev => prev + 1); // Force re-render
  };

  return (
    <div className="course-tree">
      {Object.entries(groupedLessons).sort().map(([courseKey, modules]) => {
        const info = courseInfo[courseKey] || { name: courseKey, icon: '📚' };
        const isExpanded = expandedCourses[courseKey];
        const moduleCount = Object.keys(modules).length;

        // Calculate course progress
        const courseProgress = progressService.getCourseProgress(lessons, courseKey);

        return (
          <div key={courseKey} className="course-block">
            {/* Course Header */}
            <button
              className={`course-header ${isExpanded ? 'expanded' : ''}`}
              onClick={() => toggleCourse(courseKey)}
            >
              <span className="course-icon">{info.icon}</span>
              <span className="course-title">{info.name}</span>
              <span className="course-progress">
                ({courseProgress.completed}/{courseProgress.total})
              </span>
              <span className="course-arrow">{isExpanded ? '▼' : '▶'}</span>
            </button>

            {/* Course Progress Bar */}
            {courseProgress.total > 0 && (
              <div className="course-progress-bar">
                <div
                  className="course-progress-fill"
                  style={{ width: `${courseProgress.percentage}%` }}
                ></div>
              </div>
            )}

            {/* Course Modules */}
            {isExpanded && (
              <div className="course-modules">
                {Object.entries(modules)
                  .sort(([a], [b]) => naturalSort(a, b))
                  .map(([moduleName, moduleLessons]) => {
                    const moduleKey = `${courseKey}-${moduleName}`;
                    const isModuleExpanded = expandedModules[moduleKey];

                    // Calculate module progress
                    const moduleProgress = progressService.getModuleProgress(
                      lessons,
                      courseKey,
                      moduleName
                    );

                    return (
                      <div key={moduleKey} className="module-block">
                        {/* Module Header */}
                        <button
                          className={`module-header ${isModuleExpanded ? 'expanded' : ''}`}
                          onClick={() => toggleModule(courseKey, moduleName)}
                        >
                          <span className="module-icon">📂</span>
                          <span className="module-name">{moduleName}</span>
                          <span className="module-progress">
                            ({moduleProgress.completed}/{moduleProgress.total})
                          </span>
                          <span className="module-arrow">{isModuleExpanded ? '▼' : '▶'}</span>
                        </button>

                        {/* Module Progress Bar */}
                        {moduleProgress.total > 0 && (
                          <div className="module-progress-bar">
                            <div
                              className="module-progress-fill"
                              style={{ width: `${moduleProgress.percentage}%` }}
                            ></div>
                          </div>
                        )}

                        {/* Module Lessons */}
                        {isModuleExpanded && (
                          <div className="module-lessons">
                            {moduleLessons.map(lesson => {
                              const isCompleted = progressService.isLessonCompleted(lesson.id);
                              const isActive = currentLessonId === lesson.id;

                              return (
                                <div
                                  key={lesson.id}
                                  className={`lesson-item-wrapper ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                                >
                                  {/* Completion Checkbox */}
                                  <button
                                    className="lesson-checkbox"
                                    onClick={(e) => handleCheckboxClick(e, lesson.id)}
                                    title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                                  >
                                    <span className="checkbox-icon">
                                      {isCompleted ? '✓' : '☐'}
                                    </span>
                                  </button>

                                  {/* Lesson Link */}
                                  <button
                                    className="lesson-item"
                                    onClick={() => handleLessonClick(lesson.id)}
                                  >
                                    <span className="lesson-icon">📄</span>
                                    <span className="lesson-title">{lesson.title}</span>
                                  </button>
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
        );
      })}
    </div>
  );
}
