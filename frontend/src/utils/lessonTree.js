/**
 * Lesson tree utilities
 * Provides functions for grouping, filtering, and navigating lesson hierarchies
 */

/**
 * Group lessons by course and module
 *
 * @param {Array} lessons - Flat array of lesson objects
 * @returns {Object} Nested object: {course: {module: [lessons]}}
 */
export function groupLessonsByStructure(lessons) {
  if (!lessons || !Array.isArray(lessons)) return {};

  const tree = {};

  lessons.forEach(lesson => {
    const course = lesson.course || 'Unknown';
    const module = lesson.module || 'Unknown';

    if (!tree[course]) {
      tree[course] = {};
    }

    if (!tree[course][module]) {
      tree[course][module] = [];
    }

    tree[course][module].push(lesson);
  });

  return tree;
}

/**
 * Get all lesson IDs from a specific course
 *
 * @param {Object} tree - Lesson tree from groupLessonsByStructure
 * @param {string} courseName - Course name
 * @returns {Array} Array of lesson IDs
 */
export function getLessonIdsInCourse(tree, courseName) {
  if (!tree[courseName]) return [];

  const ids = [];
  Object.values(tree[courseName]).forEach(lessons => {
    lessons.forEach(lesson => ids.push(lesson.id));
  });

  return ids;
}

/**
 * Get all lesson IDs from a specific module
 *
 * @param {Object} tree - Lesson tree from groupLessonsByStructure
 * @param {string} courseName - Course name
 * @param {string} moduleName - Module name
 * @returns {Array} Array of lesson IDs
 */
export function getLessonIdsInModule(tree, courseName, moduleName) {
  if (!tree[courseName] || !tree[courseName][moduleName]) return [];

  return tree[courseName][moduleName].map(lesson => lesson.id);
}

/**
 * Get lessons in the same module as the given lesson ID
 *
 * @param {number} lessonId - Current lesson ID
 * @param {Array} lessons - Flat array of all lessons
 * @returns {Array} Array of lesson IDs in the same module
 */
export function getLessonsInSameModule(lessonId, lessons) {
  if (!lessonId || !lessons || lessons.length === 0) return [];

  const currentLesson = lessons.find(l => l.id === lessonId);
  if (!currentLesson) return [];

  return lessons
    .filter(l => l.course === currentLesson.course && l.module === currentLesson.module)
    .map(l => l.id);
}

/**
 * Get lesson IDs based on context mode
 *
 * @param {string} mode - Context mode: 'current', 'module', 'all', 'custom'
 * @param {number} currentLessonId - Current lesson ID
 * @param {Array} lessons - Flat array of all lessons
 * @param {Array} customIds - Custom selection (for 'custom' mode)
 * @returns {Array|null} Array of lesson IDs, or null for 'all'
 */
export function getLessonIdsForMode(mode, currentLessonId, lessons, customIds = []) {
  switch (mode) {
    case 'current':
      return currentLessonId ? [currentLessonId] : [];

    case 'module':
      return getLessonsInSameModule(currentLessonId, lessons);

    case 'all':
      return null; // null means all lessons

    case 'custom':
      return customIds;

    default:
      return [];
  }
}

/**
 * Get human-readable label for context mode
 *
 * @param {string} mode - Context mode
 * @param {number} lessonCount - Number of lessons (for custom mode)
 * @returns {string} Human-readable label
 */
export function getContextModeLabel(mode, lessonCount = 0) {
  switch (mode) {
    case 'current':
      return 'Current Lesson';

    case 'module':
      return 'Current Module';

    case 'all':
      return 'All Lessons';

    case 'custom':
      return lessonCount > 0 ? `Custom (${lessonCount})` : 'Custom';

    default:
      return 'Unknown';
  }
}

/**
 * Count total lessons in tree
 *
 * @param {Object} tree - Lesson tree
 * @returns {number} Total lesson count
 */
export function countLessonsInTree(tree) {
  let count = 0;
  Object.values(tree).forEach(course => {
    Object.values(course).forEach(lessons => {
      count += lessons.length;
    });
  });
  return count;
}

/**
 * Count lessons in a course
 *
 * @param {Object} tree - Lesson tree
 * @param {string} courseName - Course name
 * @returns {number} Lesson count in course
 */
export function countLessonsInCourse(tree, courseName) {
  if (!tree[courseName]) return 0;

  let count = 0;
  Object.values(tree[courseName]).forEach(lessons => {
    count += lessons.length;
  });
  return count;
}

/**
 * Count lessons in a module
 *
 * @param {Object} tree - Lesson tree
 * @param {string} courseName - Course name
 * @param {string} moduleName - Module name
 * @returns {number} Lesson count in module
 */
export function countLessonsInModule(tree, courseName, moduleName) {
  if (!tree[courseName] || !tree[courseName][moduleName]) return 0;
  return tree[courseName][moduleName].length;
}

/**
 * Get display name for course
 * Converts internal course names to user-friendly labels
 *
 * @param {string} courseName - Internal course name
 * @returns {string} Display name
 */
export function getCourseDisplayName(courseName) {
  const nameMap = {
    'ai-web-learning': 'AI Web Learning',
    'project-setup-guide': 'Project Setup Guide',
    'extras': 'Additional Materials',
    'worked-examples': 'Worked Examples'
  };

  return nameMap[courseName] || courseName;
}

/**
 * Get emoji for course
 *
 * @param {string} courseName - Internal course name
 * @returns {string} Emoji
 */
export function getCourseEmoji(courseName) {
  const emojiMap = {
    'ai-web-learning': '🚀',
    'project-setup-guide': '📦',
    'extras': '📚',
    'worked-examples': '💡'
  };

  return emojiMap[courseName] || '📖';
}

/**
 * Search lessons by text query
 *
 * @param {Array} lessons - Flat array of lessons
 * @param {string} query - Search query
 * @returns {Array} Filtered lessons
 */
export function searchLessons(lessons, query) {
  if (!query || !query.trim()) return lessons;

  const lowerQuery = query.toLowerCase().trim();

  return lessons.filter(lesson => {
    const title = (lesson.title || '').toLowerCase();
    const filename = (lesson.filename || '').toLowerCase();
    const course = (lesson.course || '').toLowerCase();
    const module = (lesson.module || '').toLowerCase();

    return title.includes(lowerQuery) ||
           filename.includes(lowerQuery) ||
           course.includes(lowerQuery) ||
           module.includes(lowerQuery);
  });
}
