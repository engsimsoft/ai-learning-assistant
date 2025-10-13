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
    DEFAULT_MODEL: str = os.getenv("DEFAULT_MODEL", "google/gemini-2.5-flash-preview-09-2025")
    FALLBACK_MODEL: str = os.getenv("FALLBACK_MODEL", "x-ai/grok-4-fast")

    # Available models for user selection
    AVAILABLE_MODELS = [
        {
            "id": "google/gemini-2.5-flash-preview-09-2025",
            "name": "Gemini 2.5 Flash Preview",
            "description": "Latest Gemini, fast & cost-effective (default)",
            "context_length": 1000000
        },
        {
            "id": "x-ai/grok-4-fast",
            "name": "Grok 4 Fast",
            "description": "FREE now! 2M context, auto-cache, cheapest output",
            "context_length": 2000000
        },
        {
            "id": "openai/gpt-4.1-mini",
            "name": "GPT-4.1 Mini",
            "description": "Compact OpenAI model, balanced performance",
            "context_length": 1000000
        },
        {
            "id": "anthropic/claude-sonnet-4.5",
            "name": "Claude Sonnet 4.5",
            "description": "Best reasoning & code, premium quality",
            "context_length": 200000
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
