"""
Context Service - Manages lessons and builds context for AI
"""
import os
from pathlib import Path
from typing import List, Dict, Optional
import logging

logger = logging.getLogger(__name__)


class ContextService:
    """Service for managing lessons and building context"""

    def __init__(self, lessons_dir: str):
        """
        Initialize context service

        Args:
            lessons_dir: Path to directory containing lesson Markdown files
        """
        self.lessons_dir = Path(lessons_dir)
        self.lessons_cache: Dict[int, Dict] = {}
        self._load_lessons()

    def _load_lessons(self) -> None:
        """Load all lessons into memory at startup"""
        if not self.lessons_dir.exists():
            logger.warning(f"Lessons directory not found: {self.lessons_dir}")
            return

        lesson_id = 1  # Counter for lesson IDs

        # Walk through all subdirectories
        for root, dirs, files in os.walk(self.lessons_dir):
            for filename in sorted(files):
                if filename.endswith(('.md', '.txt')) and not filename.startswith('.'):
                    file_path = Path(root) / filename

                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()

                        # Extract course and module from path
                        # Examples:
                        #   ai-web-learning/1-basics/lesson-01.md -> course=ai-web-learning, module=1-basics
                        #   extras/report.md -> course=extras, module=extras
                        relative_path = file_path.relative_to(self.lessons_dir)
                        course = relative_path.parts[0] if len(relative_path.parts) > 0 else "root"

                        # For extras, module is same as course
                        if course == "extras":
                            module = "extras"
                        else:
                            module = relative_path.parts[1] if len(relative_path.parts) > 1 else "root"

                        title = self._extract_title(content, filename)
                        category = self._categorize_lesson(course, module, filename)

                        self.lessons_cache[lesson_id] = {
                            "id": lesson_id,
                            "filename": filename,
                            "filepath": str(file_path),
                            "content": content,
                            "title": title,
                            "course": course,
                            "module": module,
                            "category": category
                        }

                        lesson_id += 1
                        logger.info(f"Loaded lesson {lesson_id - 1}: {title} [{course}/{module}]")

                    except Exception as e:
                        logger.error(f"Error loading {file_path}: {e}")

        logger.info(f"Total lessons loaded: {len(self.lessons_cache)}")

    def _extract_title(self, content: str, filename: str) -> str:
        """
        Extract title from Markdown content

        Args:
            content: Markdown content
            filename: Fallback filename if no title found

        Returns:
            Extracted title or filename
        """
        lines = content.split('\n')

        for line in lines:
            line = line.strip()
            # Look for # Title or ## Title
            if line.startswith('# '):
                return line.lstrip('# ').strip()
            elif line.startswith('## ') and len(line) > 3:
                return line.lstrip('## ').strip()

        # Fallback to filename without extension
        return filename.replace('.md', '').replace('.txt', '').replace('-', ' ').replace('_', ' ')

    def _categorize_lesson(self, course: str, module: str, filename: str) -> str:
        """
        Categorize lesson based on course, module and filename

        Args:
            course: Course directory name (ai-web-learning, project-setup-guide, web-design-fundamentals, artifact-system-guide, extras)
            module: Module name from directory structure
            filename: Lesson filename

        Returns:
            Category: 'ai-web-learning', 'project-setup-guide', 'web-design-fundamentals', 'artifact-system-guide', or 'extras'
        """
        course_lower = course.lower()

        # Direct mapping based on course directory
        if 'ai-web-learning' in course_lower:
            return 'ai-web-learning'
        elif 'project-setup-guide' in course_lower:
            return 'project-setup-guide'
        elif 'web-design-fundamentals' in course_lower:
            return 'web-design-fundamentals'
        elif 'artifact-system-guide' in course_lower:
            return 'artifact-system-guide'
        elif 'extras' in course_lower:
            return 'extras'

        # Fallback to AI Web Learning
        return 'ai-web-learning'

    def get_lessons_list(self) -> List[Dict]:
        """
        Get list of all lessons with metadata

        Returns:
            List of lesson info dictionaries with course, module, and title
        """
        return [
            {
                "id": lesson["id"],
                "title": lesson["title"],
                "filename": lesson["filename"],
                "course": lesson.get("course", "unknown"),
                "module": lesson.get("module", "unknown")
            }
            for lesson in sorted(self.lessons_cache.values(), key=lambda x: x["id"])
        ]

    def build_context(self, lesson_ids: Optional[List[int]] = None) -> str:
        """
        Build context string from selected lessons

        Args:
            lesson_ids: List of lesson IDs to include. If None, includes all lessons

        Returns:
            Combined context string
        """
        if lesson_ids is None or len(lesson_ids) == 0:
            # Include all lessons
            lesson_ids = list(self.lessons_cache.keys())

        context_parts = []
        lessons_included = 0

        for lesson_id in lesson_ids:
            if lesson_id in self.lessons_cache:
                lesson = self.lessons_cache[lesson_id]
                context_parts.append(f"\n{'=' * 80}")
                context_parts.append(f"LESSON {lesson['id']}: {lesson['title']}")
                context_parts.append(f"Module: {lesson.get('module', 'N/A')}")
                context_parts.append(f"{'=' * 80}\n")
                context_parts.append(lesson['content'])
                context_parts.append("\n")
                lessons_included += 1

        context = "\n".join(context_parts)
        logger.info(f"Built context with {lessons_included} lessons, {len(context)} characters")

        return context

    def get_lesson(self, lesson_id: int) -> Optional[Dict]:
        """
        Get specific lesson by ID

        Args:
            lesson_id: Lesson ID

        Returns:
            Lesson dictionary or None if not found
        """
        return self.lessons_cache.get(lesson_id)

    def get_lessons_by_module(self, module: str) -> List[Dict]:
        """
        Get all lessons from a specific module

        Args:
            module: Module name

        Returns:
            List of lessons from that module
        """
        return [
            lesson for lesson in self.lessons_cache.values()
            if lesson.get("module", "").lower() == module.lower()
        ]

    def get_lesson_titles(self, lesson_ids: List[int]) -> List[str]:
        """
        Get titles for a list of lesson IDs

        Args:
            lesson_ids: List of lesson IDs

        Returns:
            List of lesson titles
        """
        titles = []
        for lesson_id in lesson_ids:
            if lesson_id in self.lessons_cache:
                titles.append(self.lessons_cache[lesson_id]["title"])
        return titles

    def get_total_lessons(self) -> int:
        """Get total number of loaded lessons"""
        return len(self.lessons_cache)

    def get_grouped_lessons(self) -> Dict[str, Dict[str, List[Dict]]]:
        """
        Get lessons grouped by course and module

        Returns:
            Dictionary structured as {course: {module: [lessons]}}
        """
        grouped = {}

        for lesson in self.lessons_cache.values():
            course = lesson.get("course", "unknown")
            module = lesson.get("module", "unknown")

            if course not in grouped:
                grouped[course] = {}

            if module not in grouped[course]:
                grouped[course][module] = []

            grouped[course][module].append({
                "id": lesson["id"],
                "title": lesson["title"],
                "filename": lesson["filename"]
            })

        return grouped

    def get_lessons_in_module(self, course: str, module: str) -> List[int]:
        """
        Get all lesson IDs from a specific course and module

        Args:
            course: Course name
            module: Module name

        Returns:
            List of lesson IDs in that module
        """
        return [
            lesson["id"] for lesson in self.lessons_cache.values()
            if lesson.get("course") == course and lesson.get("module") == module
        ]

    def estimate_tokens(self, lesson_ids: Optional[List[int]] = None) -> int:
        """
        Estimate number of tokens for given lessons
        Uses approximation: 1 token ≈ 4 characters

        Args:
            lesson_ids: List of lesson IDs. If None, estimates for all lessons

        Returns:
            Estimated token count
        """
        context = self.build_context(lesson_ids)
        # Rough estimate: 1 token ≈ 4 characters for English text
        return len(context) // 4
