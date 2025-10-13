"""
AI Learning Agent - FastAPI Backend
Main application file
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
from contextlib import asynccontextmanager

from config import config
from models import (
    ChatRequest, ChatResponse,
    LessonsListResponse, LessonInfo,
    ModelsListResponse, ModelInfo,
    HealthResponse
)
from services import ContextService, OpenRouterService

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Global service instances
context_service: ContextService = None
openrouter_service: OpenRouterService = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup/shutdown"""
    # Startup
    global context_service, openrouter_service

    logger.info("Starting AI Learning Agent Backend...")

    # Validate configuration
    try:
        config.validate()
        logger.info("Configuration validated successfully")
    except Exception as e:
        logger.error(f"Configuration validation failed: {e}")
        raise

    # Initialize services
    logger.info(f"Loading lessons from: {config.LESSONS_DIR}")
    context_service = ContextService(config.LESSONS_DIR)
    logger.info(f"Loaded {context_service.get_total_lessons()} lessons")

    openrouter_service = OpenRouterService(
        api_key=config.OPENROUTER_API_KEY,
        api_base=config.OPENROUTER_API_BASE,
        default_model=config.DEFAULT_MODEL,
        fallback_model=config.FALLBACK_MODEL
    )
    logger.info(f"OpenRouter service initialized with model: {config.DEFAULT_MODEL}")

    logger.info("Backend startup complete!")

    yield

    # Shutdown
    logger.info("Shutting down AI Learning Agent Backend...")


# Create FastAPI app
app = FastAPI(
    title="AI Learning Agent API",
    description="Backend API for AI-powered learning assistant with access to course materials",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["General"])
async def root():
    """Root endpoint - API information"""
    return {
        "message": "AI Learning Agent API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "endpoints": {
            "health": "/health",
            "lessons": "/lessons",
            "models": "/models",
            "chat": "/chat"
        }
    }


@app.get("/health", response_model=HealthResponse, tags=["General"])
async def health_check():
    """
    Health check endpoint
    Returns service status and number of loaded lessons
    """
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        lessons_loaded=context_service.get_total_lessons()
    )


@app.get("/lessons", response_model=LessonsListResponse, tags=["Lessons"])
async def get_lessons():
    """
    Get list of all available lessons
    Returns lesson IDs, titles, and module information
    """
    lessons_list = context_service.get_lessons_list()

    return LessonsListResponse(
        total=len(lessons_list),
        lessons=[LessonInfo(**lesson) for lesson in lessons_list]
    )


@app.get("/models", response_model=ModelsListResponse, tags=["Models"])
async def get_models():
    """
    Get list of available AI models
    Returns model IDs, names, descriptions, and context lengths
    """
    return ModelsListResponse(
        models=[ModelInfo(**model) for model in config.AVAILABLE_MODELS],
        default_model=config.DEFAULT_MODEL
    )


@app.post("/chat", response_model=ChatResponse, tags=["Chat"])
async def chat(request: ChatRequest):
    """
    Main chat endpoint
    Accepts user message, optional lesson IDs, model selection, and conversation history
    Returns AI response with metadata
    """
    try:
        logger.info(f"Chat request: message length={len(request.message)}, "
                   f"lessons={request.lesson_ids}, model={request.model}")

        # Build context from lessons
        context = context_service.build_context(request.lesson_ids)

        # Determine which lessons were used
        if request.lesson_ids:
            lessons_used = context_service.get_lesson_titles(request.lesson_ids)
        else:
            # All lessons
            lessons_used = ["All available lessons"]

        # Convert Pydantic models to dicts for the service
        history = [
            {"role": msg.role, "content": msg.content}
            for msg in request.conversation_history
        ]

        # Send to OpenRouter
        result = await openrouter_service.chat(
            message=request.message,
            context=context,
            history=history,
            model=request.model
        )

        return ChatResponse(
            response=result["response"],
            model_used=result["model_used"],
            lessons_used=lessons_used,
            tokens_used=result.get("tokens_used"),
            context_length=result.get("context_length")
        )

    except Exception as e:
        logger.error(f"Chat error: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat request: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=config.PORT,
        reload=True
    )
