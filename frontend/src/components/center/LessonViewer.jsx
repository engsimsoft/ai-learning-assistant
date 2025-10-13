/**
 * LessonViewer Component
 * Displays lesson content with Markdown rendering
 */
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import apiService from '../../services/api';
import LessonNavigation from './LessonNavigation';
import './LessonViewer.css';

export default function LessonViewer({ lessonId, lessons, onLessonChange }) {
  const [lessonContent, setLessonContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);

  // Find current lesson metadata
  const currentLesson = lessons.find(l => l.id === lessonId);

  // Find prev/next lessons
  const currentIndex = lessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  // Load lesson content when lessonId changes
  useEffect(() => {
    if (!lessonId) {
      setLessonContent('');
      return;
    }

    const loadLessonContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch lesson content from backend
        const lessonData = await apiService.getLesson(lessonId);
        setLessonContent(lessonData.content);

      } catch (err) {
        console.error('Error loading lesson content:', err);
        setError('Failed to load lesson content');
        setLessonContent('');
      } finally {
        setLoading(false);
      }
    };

    loadLessonContent();
  }, [lessonId, currentLesson]);

  // Scroll to top when lesson changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lessonId]);

  if (!lessonId) {
    return (
      <div className="lesson-viewer">
        <div className="lesson-empty">
          <div className="lesson-empty-content">
            <span className="lesson-empty-icon">📚</span>
            <h2>Select a lesson to start learning</h2>
            <p>Choose a lesson from the left sidebar to view its content.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-viewer" ref={contentRef}>
      {loading && (
        <div className="lesson-loading">
          <div className="lesson-loading-spinner"></div>
          <p>Loading lesson...</p>
        </div>
      )}

      {error && (
        <div className="lesson-error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && lessonContent && (
        <div className="lesson-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom rendering for code blocks
              code({node, inline, className, children, ...props}) {
                return inline ? (
                  <code className="inline-code" {...props}>
                    {children}
                  </code>
                ) : (
                  <pre className="code-block">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                );
              }
            }}
          >
            {lessonContent}
          </ReactMarkdown>

          {/* Navigation */}
          <LessonNavigation
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            onNavigate={onLessonChange}
          />
        </div>
      )}
    </div>
  );
}
