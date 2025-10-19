/**
 * LessonViewer Component
 * Displays lesson content with Markdown rendering
 */
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import apiService from '../../services/api';
import progressService from '../../services/progressService';
import { getTemplate, hasTemplate } from '../../templates/artifactTemplates';
import LessonNavigation from './LessonNavigation';
import './LessonViewer.css';

export default function LessonViewer({ lessonId, lessons, onLessonChange }) {
  const [lessonContent, setLessonContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const contentRef = useRef(null);

  /**
   * Custom URL transform to allow artifact: protocol
   * By default, ReactMarkdown only allows http, https, mailto, tel, etc.
   * We need to explicitly allow artifact: protocol for our custom artifact links
   *
   * @see https://github.com/remarkjs/react-markdown#urltransform
   */
  const customUrlTransform = (url) => {
    // Allow artifact: protocol (our custom protocol for opening artifacts)
    if (url && url.startsWith('artifact:')) {
      console.log('✅ urlTransform: Allowing artifact URL:', url);
      return url;
    }

    // For all other URLs, return as-is (ReactMarkdown will apply default security)
    return url;
  };

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
      setIsCompleted(false);
      return;
    }

    // Update completion status
    setIsCompleted(progressService.isLessonCompleted(lessonId));

    const loadLessonContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch lesson content from backend
        const lessonData = await apiService.getLesson(lessonId);
        setLessonContent(lessonData.content);

        // Update last visited
        progressService.updateLastVisited(lessonId);

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

  // Global click handler for artifact links (to prevent browser navigation)
  useEffect(() => {
    const handleGlobalClick = (e) => {
      console.log('🔍 Global click detected', e.target);

      // Find closest anchor with artifact: href
      const link = e.target.closest('a[href^="artifact:"]');
      if (link) {
        console.log('✅ Found artifact link!', link.href);
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const href = link.getAttribute('href');
        console.log('🎨 Artifact link clicked:', href);
        handleArtifactLink(e, href);
        return false;
      } else {
        console.log('❌ Not an artifact link');
      }
    };

    console.log('🚀 Installing global click handler');
    // Use capture phase to intercept before React
    document.addEventListener('click', handleGlobalClick, true);
    return () => {
      console.log('🛑 Removing global click handler');
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  // Handle completion toggle
  const handleToggleCompletion = () => {
    const newCompletionState = progressService.toggleLessonCompletion(lessonId);
    setIsCompleted(newCompletionState);

    // Trigger CourseTree re-render by dispatching custom event
    window.dispatchEvent(new CustomEvent('progressUpdated'));
  };

  // Open current selection or whole lesson in Canvas (CENTER artifact viewer)
  const handleOpenInCanvas = () => {
    // Prefer user selection within page, fallback to whole lesson content
    let selected = '';
    const sel = window.getSelection && window.getSelection();
    if (sel && typeof sel.toString === 'function') {
      const text = sel.toString();
      if (text && text.trim()) {
        selected = text.trim();
      }
    }

    const markdown = selected || lessonContent || '';
    const title = (currentLesson && currentLesson.title) ? currentLesson.title : 'Lesson';

    // NEW: Send to CENTER artifact viewer (artifact:open event)
    window.dispatchEvent(new CustomEvent('artifact:open', {
      detail: {
        type: 'markdown',
        title,
        markdown,
        source: 'lesson',
        tags: [currentLesson?.course, currentLesson?.module].filter(Boolean)
      }
    }));

    // LEGACY: Keep old event for backward compatibility (will be removed in Sprint 2)
    window.dispatchEvent(new CustomEvent('canvas:add', {
      detail: {
        type: 'markdown',
        title,
        markdown,
        source: 'lesson',
        tags: [currentLesson?.course, currentLesson?.module].filter(Boolean)
      }
    }));
  };

  // Handle artifact links: artifact:template-id or artifact:template-id:example-name
  const handleArtifactLink = (e, href) => {
    e.preventDefault();

    // Parse artifact URL: artifact:template-id or artifact:template-id:example-name
    const artifactMatch = href.match(/^artifact:([^:]+)(?::(.+))?$/);
    if (!artifactMatch) {
      console.warn('Invalid artifact link format:', href);
      return;
    }

    const [, templateId, exampleName] = artifactMatch;

    // Check if template exists
    if (!hasTemplate(templateId)) {
      console.warn('Template not found:', templateId);
      return;
    }

    // Get full template object (not just config)
    const template = getTemplate(templateId);
    if (!template) {
      console.warn('Template not found:', templateId);
      return;
    }

    // Determine artifact type based on template category
    let artifactType = 'markdown';
    if (template.category === 'plots') {
      artifactType = 'plot';
    } else if (template.category === 'calculators') {
      artifactType = 'calculator';
    } else if (template.category === 'react') {
      artifactType = 'react-component';
    }

    // Get config (default or example)
    let config = template.config;
    let title = template.name || templateId;

    if (exampleName && template.examples && template.examples[exampleName]) {
      const example = template.examples[exampleName];
      // Merge template.config with example (example overrides template)
      config = {
        ...template.config,
        ...example,
        // Preserve display settings from template if not in example
        display: example.display || template.config.display
      };
      title = example.title || title;
    }

    // Dispatch artifact:open event
    window.dispatchEvent(new CustomEvent('artifact:open', {
      detail: {
        type: artifactType,
        title: title,
        config: config,
        source: 'lesson',
        templateId: templateId,
        exampleName: exampleName
      }
    }));
  };

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
            urlTransform={customUrlTransform}
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
              },
              // Custom rendering for links (handle artifact: protocol)
              a({node, href, children, ...props}) {
                console.log('📝 ReactMarkdown rendering link, href received:', href, 'children:', children);

                // Check if it's an artifact link
                if (href && href.startsWith('artifact:')) {
                  console.log('🎨 Rendering artifact link:', href);
                  return (
                    <a
                      href={href}
                      className="artifact-link"
                      style={{ color: '#6366f1', cursor: 'pointer', textDecoration: 'underline' }}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }

                // Regular link (artifact links handled by global click handler)
                console.log('🌐 Rendering regular link:', href);
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                    {children}
                  </a>
                );
              }
            }}
          >
            {lessonContent}
          </ReactMarkdown>

          {/* Progress Action */}
          <div className="lesson-progress-action">
            <button
              className={`lesson-complete-button ${isCompleted ? 'completed' : ''}`}
              onClick={handleToggleCompletion}
            >
              <span className="button-icon">
                {isCompleted ? '✓' : '☐'}
              </span>
              <span className="button-text">
                {isCompleted ? 'Completed' : 'Mark as completed'}
              </span>
            </button>
          </div>

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
