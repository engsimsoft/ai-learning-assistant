import React, { useState, useMemo } from 'react';
import {
  groupLessonsByStructure,
  getLessonIdsInCourse,
  getLessonIdsInModule,
  countLessonsInCourse,
  countLessonsInModule,
  getCourseDisplayName,
  getCourseEmoji
} from '../../utils/lessonTree';
import './LessonTree.css';

/**
 * LessonTree Component
 * Hierarchical tree view with checkboxes for lesson selection
 */
const LessonTree = ({ lessons, selectedIds = [], onChange }) => {
  const [expandedCourses, setExpandedCourses] = useState({});
  const [expandedModules, setExpandedModules] = useState({});

  const tree = useMemo(() => groupLessonsByStructure(lessons), [lessons]);

  const toggleCourse = (courseName) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseName]: !prev[courseName]
    }));
  };

  const toggleModule = (courseName, moduleName) => {
    const key = `${courseName}/${moduleName}`;
    setExpandedModules(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCourseCheckbox = (courseName) => {
    const courseIds = getLessonIdsInCourse(tree, courseName);
    const allSelected = courseIds.every(id => selectedIds.includes(id));

    if (allSelected) {
      // Unselect all
      onChange(selectedIds.filter(id => !courseIds.includes(id)));
    } else {
      // Select all
      onChange([...new Set([...selectedIds, ...courseIds])]);
    }
  };

  const handleModuleCheckbox = (courseName, moduleName) => {
    const moduleIds = getLessonIdsInModule(tree, courseName, moduleName);
    const allSelected = moduleIds.every(id => selectedIds.includes(id));

    if (allSelected) {
      // Unselect all
      onChange(selectedIds.filter(id => !moduleIds.includes(id)));
    } else {
      // Select all
      onChange([...new Set([...selectedIds, ...moduleIds])]);
    }
  };

  const handleLessonCheckbox = (lessonId) => {
    if (selectedIds.includes(lessonId)) {
      onChange(selectedIds.filter(id => id !== lessonId));
    } else {
      onChange([...selectedIds, lessonId]);
    }
  };

  const isCourseChecked = (courseName) => {
    const courseIds = getLessonIdsInCourse(tree, courseName);
    return courseIds.length > 0 && courseIds.every(id => selectedIds.includes(id));
  };

  const isCourseIndeterminate = (courseName) => {
    const courseIds = getLessonIdsInCourse(tree, courseName);
    const someSelected = courseIds.some(id => selectedIds.includes(id));
    const allSelected = courseIds.every(id => selectedIds.includes(id));
    return someSelected && !allSelected;
  };

  const isModuleChecked = (courseName, moduleName) => {
    const moduleIds = getLessonIdsInModule(tree, courseName, moduleName);
    return moduleIds.length > 0 && moduleIds.every(id => selectedIds.includes(id));
  };

  const isModuleIndeterminate = (courseName, moduleName) => {
    const moduleIds = getLessonIdsInModule(tree, courseName, moduleName);
    const someSelected = moduleIds.some(id => selectedIds.includes(id));
    const allSelected = moduleIds.every(id => selectedIds.includes(id));
    return someSelected && !allSelected;
  };

  return (
    <div className="lesson-tree">
      {Object.entries(tree).map(([courseName, modules]) => {
        const isExpanded = expandedCourses[courseName];
        const lessonCount = countLessonsInCourse(tree, courseName);
        const isChecked = isCourseChecked(courseName);
        const isIndeterminate = isCourseIndeterminate(courseName);

        return (
          <div key={courseName} className="tree-course">
            <div className="tree-item tree-course-header">
              <button
                className="tree-expand-btn"
                onClick={() => toggleCourse(courseName)}
              >
                {isExpanded ? '▼' : '▶'}
              </button>

              <label className="tree-checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={() => handleCourseCheckbox(courseName)}
                />
                <span className="tree-item-text">
                  <span className="tree-emoji">{getCourseEmoji(courseName)}</span>
                  <span className="tree-name">{getCourseDisplayName(courseName)}</span>
                  <span className="tree-count">({lessonCount})</span>
                </span>
              </label>
            </div>

            {isExpanded && (
              <div className="tree-modules">
                {Object.entries(modules).map(([moduleName, moduleLessons]) => {
                  const moduleKey = `${courseName}/${moduleName}`;
                  const isModuleExpanded = expandedModules[moduleKey];
                  const moduleCount = countLessonsInModule(tree, courseName, moduleName);
                  const isModuleCheckedValue = isModuleChecked(courseName, moduleName);
                  const isModuleIndeterminateValue = isModuleIndeterminate(courseName, moduleName);

                  return (
                    <div key={moduleKey} className="tree-module">
                      <div className="tree-item tree-module-header">
                        <button
                          className="tree-expand-btn"
                          onClick={() => toggleModule(courseName, moduleName)}
                        >
                          {isModuleExpanded ? '▼' : '▶'}
                        </button>

                        <label className="tree-checkbox-label">
                          <input
                            type="checkbox"
                            checked={isModuleCheckedValue}
                            ref={(el) => {
                              if (el) el.indeterminate = isModuleIndeterminateValue;
                            }}
                            onChange={() => handleModuleCheckbox(courseName, moduleName)}
                          />
                          <span className="tree-item-text">
                            <span className="tree-name">{moduleName}</span>
                            <span className="tree-count">({moduleCount})</span>
                          </span>
                        </label>
                      </div>

                      {isModuleExpanded && (
                        <div className="tree-lessons">
                          {moduleLessons.map(lesson => (
                            <div key={lesson.id} className="tree-item tree-lesson">
                              <span className="tree-spacer"></span>
                              <label className="tree-checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(lesson.id)}
                                  onChange={() => handleLessonCheckbox(lesson.id)}
                                />
                                <span className="tree-item-text tree-lesson-title">
                                  {lesson.title}
                                </span>
                              </label>
                            </div>
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
};

export default LessonTree;
