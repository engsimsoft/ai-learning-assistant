/**
 * Progress Service
 * Manages student learning progress using localStorage
 */

const STORAGE_KEY = 'ai-learning-agent-progress';

class ProgressService {
  /**
   * Get progress data from localStorage
   * @returns {Object} Progress object
   */
  getProgress() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return this._getDefaultProgress();
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading progress:', error);
      return this._getDefaultProgress();
    }
  }

  /**
   * Get default progress structure
   * @returns {Object} Default progress
   */
  _getDefaultProgress() {
    return {
      completedLessons: [],     // Array of completed lesson IDs
      lastVisited: null,         // ID of last visited lesson
      lastVisitedDate: null,     // Date of last visit
      totalCompleted: 0,         // Total count of completed lessons
    };
  }

  /**
   * Save progress to localStorage
   * @param {Object} progress - Progress object
   */
  _saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  /**
   * Check if lesson is completed
   * @param {number} lessonId - Lesson ID
   * @returns {boolean} True if completed
   */
  isLessonCompleted(lessonId) {
    const progress = this.getProgress();
    return progress.completedLessons.includes(lessonId);
  }

  /**
   * Mark lesson as completed
   * @param {number} lessonId - Lesson ID
   */
  markLessonCompleted(lessonId) {
    const progress = this.getProgress();

    // Don't add if already completed
    if (progress.completedLessons.includes(lessonId)) {
      return;
    }

    progress.completedLessons.push(lessonId);
    progress.totalCompleted = progress.completedLessons.length;
    progress.lastVisited = lessonId;
    progress.lastVisitedDate = new Date().toISOString().split('T')[0];

    this._saveProgress(progress);
  }

  /**
   * Mark lesson as not completed
   * @param {number} lessonId - Lesson ID
   */
  markLessonIncomplete(lessonId) {
    const progress = this.getProgress();

    progress.completedLessons = progress.completedLessons.filter(id => id !== lessonId);
    progress.totalCompleted = progress.completedLessons.length;

    this._saveProgress(progress);
  }

  /**
   * Toggle lesson completion status
   * @param {number} lessonId - Lesson ID
   * @returns {boolean} New completion status
   */
  toggleLessonCompletion(lessonId) {
    if (this.isLessonCompleted(lessonId)) {
      this.markLessonIncomplete(lessonId);
      return false;
    } else {
      this.markLessonCompleted(lessonId);
      return true;
    }
  }

  /**
   * Update last visited lesson
   * @param {number} lessonId - Lesson ID
   */
  updateLastVisited(lessonId) {
    const progress = this.getProgress();
    progress.lastVisited = lessonId;
    progress.lastVisitedDate = new Date().toISOString().split('T')[0];
    this._saveProgress(progress);
  }

  /**
   * Get completed lessons for a specific module
   * @param {Array} lessons - Array of lessons
   * @param {string} course - Course ID
   * @param {string} module - Module ID
   * @returns {Object} { completed: number, total: number }
   */
  getModuleProgress(lessons, course, module) {
    const moduleLessons = lessons.filter(
      lesson => lesson.course === course && lesson.module === module
    );

    const completed = moduleLessons.filter(
      lesson => this.isLessonCompleted(lesson.id)
    ).length;

    return {
      completed,
      total: moduleLessons.length,
      percentage: moduleLessons.length > 0
        ? Math.round((completed / moduleLessons.length) * 100)
        : 0
    };
  }

  /**
   * Get completed lessons for a specific course
   * @param {Array} lessons - Array of lessons
   * @param {string} course - Course ID
   * @returns {Object} { completed: number, total: number }
   */
  getCourseProgress(lessons, course) {
    const courseLessons = lessons.filter(lesson => lesson.course === course);

    const completed = courseLessons.filter(
      lesson => this.isLessonCompleted(lesson.id)
    ).length;

    return {
      completed,
      total: courseLessons.length,
      percentage: courseLessons.length > 0
        ? Math.round((completed / courseLessons.length) * 100)
        : 0
    };
  }

  /**
   * Get overall progress across all lessons
   * @param {Array} lessons - Array of all lessons
   * @returns {Object} { completed: number, total: number }
   */
  getOverallProgress(lessons) {
    const completed = lessons.filter(
      lesson => this.isLessonCompleted(lesson.id)
    ).length;

    return {
      completed,
      total: lessons.length,
      percentage: lessons.length > 0
        ? Math.round((completed / lessons.length) * 100)
        : 0
    };
  }

  /**
   * Get next incomplete lesson
   * @param {Array} lessons - Array of all lessons
   * @returns {Object|null} Next lesson to study or null
   */
  getNextLesson(lessons) {
    // Sort lessons by course, module, then id
    const sortedLessons = [...lessons].sort((a, b) => {
      if (a.course !== b.course) return a.course.localeCompare(b.course);
      if (a.module !== b.module) return a.module.localeCompare(b.module);
      return a.id - b.id;
    });

    // Find first incomplete lesson
    return sortedLessons.find(lesson => !this.isLessonCompleted(lesson.id)) || null;
  }

  /**
   * Reset all progress
   */
  resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Export progress as JSON
   * @returns {string} JSON string of progress
   */
  exportProgress() {
    const progress = this.getProgress();
    return JSON.stringify(progress, null, 2);
  }

  /**
   * Import progress from JSON
   * @param {string} jsonString - JSON string of progress
   * @returns {boolean} Success status
   */
  importProgress(jsonString) {
    try {
      const progress = JSON.parse(jsonString);

      // Validate structure
      if (!Array.isArray(progress.completedLessons)) {
        throw new Error('Invalid progress format');
      }

      this._saveProgress(progress);
      return true;
    } catch (error) {
      console.error('Error importing progress:', error);
      return false;
    }
  }
}

// Export singleton instance
export default new ProgressService();
