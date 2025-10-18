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
import CenterContainer from '../center/CenterContainer';
import { CENTER_STATES } from '../center/CenterContainer';
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

  // CENTER state management
  const [centerState, setCenterState] = useState({
    state: CENTER_STATES.LESSON_ONLY,
    lessonWidth: 100,
    artifactWidth: 0,
    currentLessonId: null,
    currentArtifact: null
  });

  /**
   * Handle CENTER state changes with auto-hide logic
   * Scenario 1: Artifact from lesson → hide RIGHT sidebar
   * Scenario 2: Artifact from AI → hide LEFT sidebar
   */
  const handleCenterStateChange = (newCenterState) => {
    setCenterState(newCenterState);

    // Auto-hide logic based on artifact source
    if (newCenterState.state !== CENTER_STATES.LESSON_ONLY && newCenterState.currentArtifact) {
      const source = newCenterState.currentArtifact.source;

      if (source === 'lesson') {
        // Scenario 1: Artifact from lesson → hide RIGHT (chat not needed)
        setRightSidebarOpen(false);
      } else if (source === 'chat') {
        // Scenario 2: Artifact from AI → hide LEFT (course tree not needed)
        setLeftSidebarOpen(false);
      }
    }

    // When returning to LESSON_ONLY, don't auto-restore panels
    // (user might have manually hidden them - respect user preference)
  };

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
        rightSidebarOpen={rightSidebarOpen}
        onToggleRightSidebar={toggleRightSidebar}
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

        {/* CENTER - Dynamic Container (Lesson / Artifact / Both) */}
        <main className="layout-center">
          <CenterContainer
            lessonId={currentLessonId}
            lessons={lessons}
            onLessonChange={setCurrentLessonId}
            centerState={centerState}
            onCenterStateChange={handleCenterStateChange}
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
                  onClose={toggleRightSidebar}
                />
              </div>
            </>
          )}
        </aside>
      </div>

      {/* REMOVED: reopen-right-sidebar button - now in Header */}
    </div>
  );
}
