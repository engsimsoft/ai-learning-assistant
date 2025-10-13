"""
Configuration management for AI Learning Agent Backend
"""
import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    """Application configuration"""

    # OpenRouter API Configuration
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "")
    OPENROUTER_API_BASE: str = "https://openrouter.ai/api/v1"

    # Model Configuration
    DEFAULT_MODEL: str = os.getenv("DEFAULT_MODEL", "anthropic/claude-3.5-sonnet")
    FALLBACK_MODEL: str = os.getenv("FALLBACK_MODEL", "google/gemini-pro")

    # Available models for user selection
    AVAILABLE_MODELS = [
        {
            "id": "anthropic/claude-3.5-sonnet",
            "name": "Claude 3.5 Sonnet",
            "description": "Best for reasoning and code",
            "context_length": 200000
        },
        {
            "id": "openai/gpt-4-turbo",
            "name": "GPT-4 Turbo",
            "description": "Good all-rounder",
            "context_length": 128000
        },
        {
            "id": "google/gemini-pro",
            "name": "Gemini Pro",
            "description": "Large context window",
            "context_length": 1000000
        },
        {
            "id": "meta-llama/llama-3-70b",
            "name": "Llama 3 70B",
            "description": "Open source, cost-effective",
            "context_length": 8000
        }
    ]

    # Server Configuration
    PORT: int = int(os.getenv("PORT", "8000"))
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")

    # Lessons Configuration
    LESSONS_DIR: str = os.path.join(os.path.dirname(__file__), "data", "lessons")

    # CORS Configuration
    ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:3000",
        FRONTEND_URL
    ]

    @classmethod
    def validate(cls) -> bool:
        """Validate required configuration"""
        if not cls.OPENROUTER_API_KEY:
            raise ValueError(
                "OPENROUTER_API_KEY is required. "
                "Get your key at https://openrouter.ai"
            )
        return True


# Create a singleton instance
config = Config()
