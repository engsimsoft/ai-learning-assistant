"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class ChatMessage(BaseModel):
    """Single message in conversation"""
    role: str = Field(..., description="Role: 'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    """Request model for /chat endpoint"""
    message: str = Field(..., description="User's question", min_length=1)
    lesson_ids: Optional[List[int]] = Field(
        default=None,
        description="List of lesson IDs to include in context. None = all lessons"
    )
    model: Optional[str] = Field(
        default=None,
        description="Model to use (e.g., 'anthropic/claude-3.5-sonnet'). None = default model"
    )
    conversation_history: Optional[List[ChatMessage]] = Field(
        default_factory=list,
        description="Previous messages in conversation"
    )


class ChatResponse(BaseModel):
    """Response model for /chat endpoint"""
    response: str = Field(..., description="AI's response")
    model_used: str = Field(..., description="Which model was used")
    lessons_used: List[str] = Field(..., description="Titles of lessons included in context")
    tokens_used: Optional[int] = Field(default=None, description="Total tokens used")
    context_length: Optional[int] = Field(default=None, description="Length of context in characters")


class LessonInfo(BaseModel):
    """Information about a single lesson"""
    id: int = Field(..., description="Lesson ID")
    title: str = Field(..., description="Lesson title")
    filename: str = Field(..., description="Filename")
    course: Optional[str] = Field(default=None, description="Course name (ai-web-learning, project-setup-guide, extras)")
    module: Optional[str] = Field(default=None, description="Module name")


class LessonsListResponse(BaseModel):
    """Response model for /lessons endpoint"""
    total: int = Field(..., description="Total number of lessons")
    lessons: List[LessonInfo] = Field(..., description="List of lessons")


class ModelInfo(BaseModel):
    """Information about available AI model"""
    id: str = Field(..., description="Model identifier")
    name: str = Field(..., description="Display name")
    description: str = Field(..., description="Model description")
    context_length: int = Field(..., description="Maximum context length")


class ModelsListResponse(BaseModel):
    """Response model for /models endpoint"""
    models: List[ModelInfo] = Field(..., description="Available models")
    default_model: str = Field(..., description="Default model ID")


class HealthResponse(BaseModel):
    """Response model for /health endpoint"""
    status: str = Field(..., description="Service status")
    version: str = Field(default="1.0.0", description="API version")
    lessons_loaded: int = Field(..., description="Number of lessons loaded")
