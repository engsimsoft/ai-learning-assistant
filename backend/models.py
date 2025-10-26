"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Literal


class ChatMessage(BaseModel):
    """Single message in conversation"""
    role: str = Field(..., description="Role: 'user' or 'assistant'")
    content: str = Field(..., description="Message content")
    images: Optional[List[str]] = Field(default=None, description="Base64 encoded images")


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
    images: Optional[List[str]] = Field(
        default=None,
        description="Base64 encoded images (data:image/jpeg;base64,...)"
    )


class TokensUsage(BaseModel):
    """Token usage breakdown"""
    input: int = Field(..., description="Input tokens (prompt)")
    output: int = Field(..., description="Output tokens (completion)")
    total: int = Field(..., description="Total tokens")


class CostInfo(BaseModel):
    """Cost information"""
    usd: float = Field(..., description="Cost in USD")
    rub: float = Field(..., description="Cost in RUB (1 USD = 90 RUB)")


class ChatResponse(BaseModel):
    """Response model for /chat endpoint"""
    response: str = Field(..., description="AI's response")
    model_used: str = Field(..., description="Which model was used")
    lessons_used: List[str] = Field(..., description="Titles of lessons included in context")
    tokens_used: Optional[TokensUsage] = Field(default=None, description="Token usage breakdown")
    cost: Optional[CostInfo] = Field(default=None, description="Cost information")
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


class LessonDetailResponse(BaseModel):
    """Response model for /lessons/:id endpoint"""
    id: int = Field(..., description="Lesson ID")
    title: str = Field(..., description="Lesson title")
    filename: str = Field(..., description="Filename")
    content: str = Field(..., description="Lesson content in Markdown format")
    course: Optional[str] = Field(default=None, description="Course name")
    module: Optional[str] = Field(default=None, description="Module name")
    category: Optional[str] = Field(default=None, description="Lesson category")


class ModelInfo(BaseModel):
    """Information about available AI model"""
    id: str = Field(..., description="Model identifier")
    name: str = Field(..., description="Display name")
    description: str = Field(..., description="Model description")
    context_length: int = Field(..., description="Maximum context length")
    context_display: str = Field(..., description="Human-readable context size (e.g., '1M', '2M')")
    input_cost_per_1m: float = Field(..., description="Cost per 1M input tokens in USD")
    output_cost_per_1m: float = Field(..., description="Cost per 1M output tokens in USD")


class ModelsListResponse(BaseModel):
    """Response model for /models endpoint"""
    models: List[ModelInfo] = Field(..., description="Available models")
    default_model: str = Field(..., description="Default model ID")


class HealthResponse(BaseModel):
    """Response model for /health endpoint"""
    status: str = Field(..., description="Service status")
    version: str = Field(default="1.0.0", description="API version")
    lessons_loaded: int = Field(..., description="Number of lessons loaded")


class ContextPreviewRequest(BaseModel):
    """Request model for /context/preview endpoint"""
    lesson_ids: Optional[List[int]] = Field(
        default=None,
        description="List of lesson IDs to preview. None = all lessons"
    )


class ContextPreviewResponse(BaseModel):
    """Response model for /context/preview endpoint"""
    lesson_count: int = Field(..., description="Number of lessons in selection")
    estimated_tokens: int = Field(..., description="Estimated token count")
    estimated_cost_input: float = Field(..., description="Estimated cost for input in USD")
    estimated_cost_output: float = Field(..., description="Estimated cost for output in USD (4x input)")
    lessons: List[str] = Field(..., description="Titles of selected lessons")


class LessonsGroupedResponse(BaseModel):
    """Response model for /lessons/grouped endpoint"""
    groups: Dict[str, Dict[str, List[Dict[str, Any]]]] = Field(
        ...,
        description="Lessons grouped by course and module"
    )

# ---------------------------
# Canvas Artifacts (for Canvas MVP)
# ---------------------------

ArtifactType = Literal["markdown", "code", "images", "plot", "calculator", "react-component"]


class Artifact(BaseModel):
    id: str = Field(..., description="Artifact identifier")
    title: str = Field(..., description="Title")
    type: ArtifactType = Field(..., description="Artifact type")
    content_markdown: Optional[str] = Field(
        default=None,
        description="Markdown content when type=markdown or description for code/images"
    )
    html: Optional[str] = Field(
        default=None,
        description="HTML content when type=code"
    )
    images: Optional[List[str]] = Field(
        default=None,
        description="List of images (base64 data URLs) when type=images"
    )
    config: Optional[dict] = Field(
        default=None,
        description="Configuration for plot/calculator artifacts (JSON)"
    )
    source: Optional[str] = Field(
        default=None,
        description="Source reference (lesson/chat)"
    )
    tags: Optional[List[str]] = Field(default=None, description="Tags")
    created_at: str = Field(..., description="Creation timestamp (ISO 8601)")
    updated_at: str = Field(..., description="Update timestamp (ISO 8601)")


class ArtifactMeta(BaseModel):
    id: str = Field(..., description="Artifact identifier")
    title: str = Field(..., description="Title")
    type: ArtifactType = Field(..., description="Artifact type")
    created_at: str = Field(..., description="Creation timestamp (ISO 8601)")
    updated_at: str = Field(..., description="Update timestamp (ISO 8601)")
    tags: Optional[List[str]] = Field(default=None, description="Tags")


class ArtifactListResponse(BaseModel):
    items: List[ArtifactMeta] = Field(..., description="List of artifacts")


class CreateArtifactRequest(BaseModel):
    title: str = Field(..., description="Title")
    type: ArtifactType = Field(..., description="Artifact type")
    content_markdown: Optional[str] = Field(default=None, description="Markdown content")
    html: Optional[str] = Field(default=None, description="HTML content when type=code")
    images: Optional[List[str]] = Field(
        default=None,
        description="List of images (base64 data URLs) when type=images"
    )
    config: Optional[dict] = Field(
        default=None,
        description="Configuration for plot/calculator artifacts (JSON)"
    )
    source: Optional[str] = Field(default=None, description="Source reference (lesson/chat)")
    tags: Optional[List[str]] = Field(default=None, description="Tags")
