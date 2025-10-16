/**
 * Layout size constants for the three-panel UI
 * Based on technical specification v2.0
 */

// Screen breakpoints (desktop only, no mobile)
export const BREAKPOINTS = {
  MIN: 1366,      // Minimum supported screen width
  OPTIMAL: 1920,  // Optimal screen width
};

// LEFT Sidebar (course navigation)
export const LEFT_SIDEBAR = {
  WIDTH_1920: 380,    // Width on 1920px screen
  WIDTH_1366: 350,    // Width on 1366px screen (minimum)
  WIDTH_CLOSED: 0,    // Width when collapsed
};

// RIGHT Sidebar (Claude AI chat)
export const RIGHT_SIDEBAR = {
  WIDTH_DEFAULT: 600,   // Default width
  WIDTH_MIN: 400,       // Minimum width when resizing
  WIDTH_MAX: 800,       // Maximum width when resizing
  WIDTH_1366_MIN: 350,  // Minimum width on 1366px screen
  WIDTH_1366_MAX: 600,  // Maximum width on 1366px screen
  WIDTH_CLOSED: 0,      // Width when collapsed
};

// CENTER (lesson viewer) - flexible, fills remaining space
export const CENTER = {
  // No fixed width, uses flex: 1
  PADDING: 40,  // Internal padding
};

// Header
export const HEADER = {
  HEIGHT: 48,  // Fixed height
};

// localStorage keys for persisting UI state
export const STORAGE_KEYS = {
  RIGHT_SIDEBAR_WIDTH: 'ai-learning-agent-right-sidebar-width',
  LEFT_SIDEBAR_OPEN: 'ai-learning-agent-left-sidebar-open',
  RIGHT_SIDEBAR_OPEN: 'ai-learning-agent-right-sidebar-open',
  PROGRESS: 'ai-learning-agent-progress',  // Learning progress data
};

// Animation durations (ms)
export const TRANSITIONS = {
  SIDEBAR_TOGGLE: 300,   // Sidebar open/close
  RESIZE: 100,           // Drag resize
  COURSE_EXPAND: 200,    // Course/module expand
};

// Helper function to get left sidebar width based on screen size
export const getLeftSidebarWidth = (screenWidth, isOpen) => {
  if (!isOpen) return LEFT_SIDEBAR.WIDTH_CLOSED;
  return screenWidth >= BREAKPOINTS.OPTIMAL
    ? LEFT_SIDEBAR.WIDTH_1920
    : LEFT_SIDEBAR.WIDTH_1366;
};

// Helper function to get right sidebar constraints based on screen size
export const getRightSidebarConstraints = (screenWidth) => {
  if (screenWidth < BREAKPOINTS.OPTIMAL) {
    return {
      min: RIGHT_SIDEBAR.WIDTH_1366_MIN,
      max: RIGHT_SIDEBAR.WIDTH_1366_MAX,
      default: RIGHT_SIDEBAR.WIDTH_1366_MIN,
    };
  }
  return {
    min: RIGHT_SIDEBAR.WIDTH_MIN,
    max: RIGHT_SIDEBAR.WIDTH_MAX,
    default: RIGHT_SIDEBAR.WIDTH_DEFAULT,
  };
};
