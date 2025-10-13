/**
 * Layout Component
 * Three-panel layout: LEFT (course tree), CENTER (lesson viewer), RIGHT (AI chat)
 */
import { useState, useEffect } from 'react';
import {
  LEFT_SIDEBAR,
  RIGHT_SIDEBAR,
  STORAGE_KEYS,
  getLeftSidebarWidth,
  getRightSidebarConstraints,
} from '../../constants/layoutSizes';
import Header from './Header';
import ResizeHandle from './ResizeHandle';
import LeftSidebar from '../leftSidebar/LeftSidebar';
import LessonViewer from '../center/LessonViewer';
import ClaudeAISidebar from '../rightSidebar/ClaudeAISidebar';
import './Layout.css';

export default function Layout() {
  // Screen width
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Sidebar states
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.LEFT_SIDEBAR_OPEN);
    return stored !== null ? JSON.parse(stored) : true;
  });

  const [rightSidebarOpen, setRightSidebarOpen] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.RIGHT_SIDEBAR_OPEN);
    return stored !== null ? JSON.parse(stored) : true;
  });

  const [rightSidebarWidth, setRightSidebarWidth] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.RIGHT_SIDEBAR_WIDTH);
    if (stored) return parseInt(stored, 10);

    const constraints = getRightSidebarConstraints(screenWidth);
    return constraints.default;
  });

  // Current lesson state
  const [currentLessonId, setCurrentLessonId] = useState(null);

  // Lessons list for navigation
  const [lessons, setLessons] = useState([]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save sidebar states to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEFT_SIDEBAR_OPEN, JSON.stringify(leftSidebarOpen));
  }, [leftSidebarOpen]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RIGHT_SIDEBAR_OPEN, JSON.stringify(rightSidebarOpen));
  }, [rightSidebarOpen]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RIGHT_SIDEBAR_WIDTH, rightSidebarWidth.toString());
  }, [rightSidebarWidth]);

  // Calculate panel widths
  const leftWidth = getLeftSidebarWidth(screenWidth, leftSidebarOpen);
  const rightWidth = rightSidebarOpen ? rightSidebarWidth : 0;

  // Toggle functions
  const toggleLeftSidebar = () => setLeftSidebarOpen(prev => !prev);
  const toggleRightSidebar = () => setRightSidebarOpen(prev => !prev);

  // Resize handler
  const handleRightSidebarResize = (newWidth) => {
    setRightSidebarWidth(newWidth);
  };

  // Get resize constraints
  const resizeConstraints = getRightSidebarConstraints(screenWidth);

  return (
    <div className="layout">
      <Header
        leftSidebarOpen={leftSidebarOpen}
        onToggleLeftSidebar={toggleLeftSidebar}
      />

      <div className="layout-body">
        {/* LEFT SIDEBAR - Course Navigation */}
        <aside
          className={`layout-left ${leftSidebarOpen ? 'open' : 'closed'}`}
          style={{ width: `${leftWidth}px` }}
        >
          {leftSidebarOpen && (
            <LeftSidebar
              currentLessonId={currentLessonId}
              onLessonSelect={setCurrentLessonId}
              onClose={toggleLeftSidebar}
              onLessonsLoad={setLessons}
            />
          )}
        </aside>

        {/* CENTER - Lesson Viewer */}
        <main className="layout-center">
          <LessonViewer
            lessonId={currentLessonId}
            lessons={lessons}
            onLessonChange={setCurrentLessonId}
          />
        </main>

        {/* RIGHT SIDEBAR - AI Chat */}
        <aside
          className={`layout-right ${rightSidebarOpen ? 'open' : 'closed'}`}
          style={{ width: `${rightWidth}px` }}
        >
          {rightSidebarOpen && (
            <>
              <ResizeHandle
                onResize={handleRightSidebarResize}
                minWidth={resizeConstraints.min}
                maxWidth={resizeConstraints.max}
                initialWidth={rightSidebarWidth}
              />
              <div className="right-content">
                <ClaudeAISidebar
                  lessons={lessons}
                  currentLessonId={currentLessonId}
                />
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Show button to reopen right sidebar when closed */}
      {!rightSidebarOpen && (
        <button
          className="reopen-right-sidebar"
          onClick={toggleRightSidebar}
          title="Open AI Chat"
        >
          💬
        </button>
      )}
    </div>
  );
}
