/**
 * LessonSelector Component
 * Allows users to select specific lessons for context
 */
import { useState, useEffect } from 'react';
import './LessonSelector.css';

export default function LessonSelector({ lessons, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [useAllLessons, setUseAllLessons] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedModules, setExpandedModules] = useState({});

  // Category names and display text
  const categoryInfo = {
    'ai-web-learning': {
      name: 'AI Web Learning',
      icon: '🚀',
      description: 'Main technical course'
    },
    'project-setup-guide': {
      name: 'Project Setup Guide',
      icon: '📋',
      description: 'Project organization methodology'
    },
    'additional-materials': {
      name: 'Additional Materials',
      icon: '📄',
      description: 'Reference documents and analysis'
    }
  };

  // Group lessons by category, then by module
  const lessonsByCategory = lessons.reduce((acc, lesson) => {
    const category = lesson.category || 'ai-web-learning';
    const module = lesson.module || 'Other';

    if (!acc[category]) acc[category] = {};
    if (!acc[category][module]) acc[category][module] = [];
    acc[category][module].push(lesson);

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

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleModule = (categoryModuleKey) => {
    setExpandedModules(prev => ({
      ...prev,
      [categoryModuleKey]: !prev[categoryModuleKey]
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
              {Object.entries(lessonsByCategory).map(([categoryKey, modules]) => {
                const catInfo = categoryInfo[categoryKey] || {
                  name: categoryKey,
                  icon: '📚',
                  description: ''
                };
                const isCategoryExpanded = expandedCategories[categoryKey];

                return (
                  <div key={categoryKey} className="category-group">
                    <div
                      className="category-header"
                      onClick={() => toggleCategory(categoryKey)}
                    >
                      <span className="category-icon">{catInfo.icon}</span>
                      <span className="category-name">{catInfo.name}</span>
                      <span className="category-arrow">{isCategoryExpanded ? '▼' : '▶'}</span>
                    </div>

                    {isCategoryExpanded && (
                      <div className="category-content">
                        {Object.entries(modules).map(([module, moduleLessons]) => {
                          const moduleKey = `${categoryKey}-${module}`;
                          const isModuleExpanded = expandedModules[moduleKey];

                          return (
                            <div key={moduleKey} className="module-group">
                              <div
                                className="module-header"
                                onClick={() => toggleModule(moduleKey)}
                              >
                                <span className="module-name">{module}</span>
                                <span className="module-count">({moduleLessons.length})</span>
                                <span className="module-arrow">{isModuleExpanded ? '▼' : '▶'}</span>
                              </div>

                              {isModuleExpanded && (
                                <div className="module-content">
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
