/**
 * LeftSidebar Component
 * Navigation panel with course tree
 */
import { useState, useEffect } from 'react';
import CourseTree from './CourseTree';
import apiService from '../../services/api';
import './LeftSidebar.css';

export default function LeftSidebar({ currentLessonId, onLessonSelect, onClose, onLessonsLoad }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load lessons on mount
  useEffect(() => {
    const loadLessons = async () => {
      try {
        setLoading(true);
        const data = await apiService.getLessons();
        const loadedLessons = data.lessons || [];
        setLessons(loadedLessons);
        // Pass lessons to parent
        if (onLessonsLoad) {
          onLessonsLoad(loadedLessons);
        }
      } catch (err) {
        console.error('Error loading lessons:', err);
        setError('Failed to load lessons');
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, [onLessonsLoad]);

  return (
    <div className="left-sidebar">
      <div className="left-sidebar-header">
        <h2 className="left-sidebar-title">Courses</h2>
      </div>

      <div className="left-sidebar-content">
        {loading && (
          <div className="left-sidebar-loading">
            <p>Loading courses...</p>
          </div>
        )}

        {error && (
          <div className="left-sidebar-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && lessons.length > 0 && (
          <CourseTree
            lessons={lessons}
            currentLessonId={currentLessonId}
            onLessonSelect={onLessonSelect}
          />
        )}

        {!loading && !error && lessons.length === 0 && (
          <div className="left-sidebar-empty">
            <p>No courses available</p>
          </div>
        )}
      </div>

      <div className="left-sidebar-footer">
        <button className="hide-sidebar-btn" onClick={onClose}>
          ← Hide Sidebar
        </button>
      </div>
    </div>
  );
}
