"""
Prompt Loader Service - Loads prompts from Markdown files
"""
import os
import logging
from typing import Dict

logger = logging.getLogger(__name__)


class PromptLoader:
    """Service for loading prompts from Markdown files"""

    def __init__(self, prompts_dir: str):
        """
        Initialize PromptLoader

        Args:
            prompts_dir: Path to prompts directory
        """
        self.prompts_dir = prompts_dir
        self._cache: Dict[str, str] = {}
        logger.info(f"PromptLoader initialized with directory: {prompts_dir}")

    def load_system_prompt(self) -> str:
        """
        Load main system prompt from system_prompt.md

        Returns:
            System prompt content
        """
        return self._load_file("system_prompt.md")

    def load_boundaries(self) -> str:
        """
        Load boundaries from boundaries.md

        Returns:
            Boundaries content
        """
        return self._load_file("boundaries.md")

    def build_full_prompt(self, context: str) -> str:
        """
        Build complete system prompt with context and boundaries.

        - Replaces {context}
        - If {boundaries} is present in system prompt, replaces it
        - Otherwise appends a "Knowledge Boundaries" section at the end
        """
        system_prompt = self.load_system_prompt()

        # Replace {context} variable with actual lessons
        full_prompt = system_prompt.replace("{context}", context)

        # Try to load boundaries (be resilient if file is missing)
        boundaries_text = ""
        try:
            boundaries_text = self.load_boundaries()
        except FileNotFoundError:
            logger.warning("boundaries.md not found; proceeding without boundaries section")
        except Exception as e:
            logger.error(f"Error loading boundaries.md: {e}")

        if boundaries_text:
            if "{boundaries}" in full_prompt:
                full_prompt = full_prompt.replace("{boundaries}", boundaries_text)
            else:
                full_prompt = (
                    f"{full_prompt}\n\n---\n## Knowledge Boundaries\n\n{boundaries_text}"
                )

        logger.debug(f"Built full prompt, length: {len(full_prompt)} characters")
        return full_prompt

    def _load_file(self, filename: str) -> str:
        """
        Load markdown file with caching

        Args:
            filename: Name of the file in prompts directory

        Returns:
            File content as string

        Raises:
            FileNotFoundError: If prompt file doesn't exist
        """
        # Check cache first
        if filename in self._cache:
            logger.debug(f"Loading {filename} from cache")
            return self._cache[filename]

        filepath = os.path.join(self.prompts_dir, filename)

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                self._cache[filename] = content
                logger.info(f"Loaded prompt from {filename} ({len(content)} chars)")
                return content
        except FileNotFoundError:
            logger.error(f"Prompt file not found: {filepath}")
            raise FileNotFoundError(
                f"Prompt file not found: {filename}. "
                f"Make sure the file exists in {self.prompts_dir}"
            )
        except Exception as e:
            logger.error(f"Error loading prompt {filename}: {e}")
            raise

    def reload_cache(self):
        """Clear cache to force reload of prompts"""
        self._cache.clear()
        logger.info("Prompt cache cleared")
