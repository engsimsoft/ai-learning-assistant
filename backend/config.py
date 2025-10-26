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
            "context_length": 1000000,
            "context_display": "1M",
            "input_cost_per_1m": 0.075,
            "output_cost_per_1m": 0.30,
            "temperature": 0.7,
            "max_tokens": 4000,
            "top_p": 1.0
        },
        {
            "id": "x-ai/grok-4-fast",
            "name": "Grok 4 Fast",
            "description": "2M context, auto-cache, affordable pricing",
            "context_length": 2000000,
            "context_display": "2M",
            "input_cost_per_1m": 0.05,
            "output_cost_per_1m": 0.15,
            "temperature": 0.7,
            "max_tokens": 4000,
            "top_p": 1.0
        },
        {
            "id": "openai/gpt-4.1-mini",
            "name": "GPT-4.1 Mini",
            "description": "Compact OpenAI model, balanced performance",
            "context_length": 1000000,
            "context_display": "1M",
            "input_cost_per_1m": 0.15,
            "output_cost_per_1m": 0.60,
            "temperature": 0.6,
            "max_tokens": 3000,
            "top_p": 0.95
        },
        {
            "id": "anthropic/claude-sonnet-4.5",
            "name": "Claude Sonnet 4.5",
            "description": "Best reasoning & code, premium quality",
            "context_length": 200000,
            "context_display": "200K",
            "input_cost_per_1m": 3.0,
            "output_cost_per_1m": 15.0,
            "temperature": 0.5,
            "max_tokens": 8000,
            "top_p": 0.95
        }
    ]

    # Server Configuration
    PORT: int = int(os.getenv("PORT", "8000"))
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")

    # Lessons Configuration
    LESSONS_DIR: str = os.path.join(os.path.dirname(__file__), "data", "lessons")

    # Prompts Configuration
    PROMPTS_DIR: str = os.path.join(os.path.dirname(__file__), "prompts")

    # CORS Configuration
    ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:5174",
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
