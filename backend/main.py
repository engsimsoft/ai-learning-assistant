"""
AI Learning Agent - FastAPI Backend
Main application file
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
from contextlib import asynccontextmanager
import os
import uuid
import base64
from datetime import datetime

from config import config
from models import (
    ChatRequest, ChatResponse, TokensUsage, CostInfo,
    LessonsListResponse, LessonInfo, LessonDetailResponse,
    ModelsListResponse, ModelInfo,
    HealthResponse,
    ContextPreviewRequest, ContextPreviewResponse,
    LessonsGroupedResponse,
    CreateArtifactRequest, ArtifactListResponse, Artifact, ArtifactMeta
)
from services import ContextService, OpenRouterService, PromptLoader

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Global service instances
context_service: ContextService = None
openrouter_service: OpenRouterService = None

# Artifacts storage (docs/artifacts)
ARTIFACTS_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "docs", "artifacts")
)
ASSETS_DIR = os.path.join(ARTIFACTS_DIR, "assets")


def _ensure_dir(path: str) -> None:
    os.makedirs(path, exist_ok=True)


def _generate_artifact_id() -> str:
    """Generate unique artifact id: YYYYMMDDHHMMSS-xxxxxx"""
    return datetime.utcnow().strftime("%Y%m%d%H%M%S") + "-" + uuid.uuid4().hex[:6]


def _frontmatter(meta: dict) -> str:
    """Build YAML-like frontmatter without external deps"""
    lines = ["---"]
    for k, v in meta.items():
        if isinstance(v, list):
            lines.append(f"{k}: [{', '.join(v)}]")
        else:
            lines.append(f"{k}: {v}")
    lines.append("---")
    return "\n".join(lines)


def _write_markdown_file(artifact_id: str, meta: dict, body: str) -> str:
    md_path = os.path.join(ARTIFACTS_DIR, f"{artifact_id}.md")
    content = _frontmatter(meta) + "\n\n" + (body or "")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(content)
    return md_path


def _save_images(images: list[str], artifact_id: str) -> list[str]:
    """
    Save data URL images to assets folder.
    Returns list of relative asset paths 'assets/<file>'.
    """
    saved: list[str] = []
    if not images:
        return saved
    _ensure_dir(ASSETS_DIR)
    for idx, data_url in enumerate(images, start=1):
        try:
            if not data_url.startswith("data:"):
                # skip non data URLs
                continue
            header, b64 = data_url.split(",", 1)
            # data:image/png;base64,...
            mime = header.split(";")[0].split(":")[1] if ":" in header else "image/png"
            ext = "png"
            if mime.endswith("jpeg") or mime.endswith("jpg"):
                ext = "jpg"
            elif mime.endswith("png"):
                ext = "png"
            elif mime.endswith("webp"):
                ext = "webp"
            else:
                # default to png if unknown
                ext = "png"
            binary = base64.b64decode(b64)
            filename = f"{artifact_id}-{idx}.{ext}"
            abs_path = os.path.join(ASSETS_DIR, filename)
            with open(abs_path, "wb") as out:
                out.write(binary)
            saved.append(f"assets/{filename}")
        except Exception as e:
            logger.error(f"Failed to save image {idx} for artifact {artifact_id}: {e}")
            continue
    return saved


def _parse_frontmatter(md_text: str) -> tuple[dict, str]:
    """
    Naive frontmatter parser: returns (meta_dict, body)
    Expects:
    ---
    key: value
    ---
    body...
    """
    if not md_text.startswith("---"):
        return {}, md_text
    parts = md_text.split("---", 2)
    if len(parts) < 3:
        return {}, md_text
    _, meta_str, body = parts
    meta: dict = {}
    for raw in meta_str.strip().splitlines():
        if ":" not in raw:
            continue
        k, v = raw.split(":", 1)
        key = k.strip()
        val = v.strip()
        if val.startswith("[") and val.endswith("]"):
            # list like [a, b]
            items = [x.strip() for x in val[1:-1].split(",") if x.strip()]
            meta[key] = items
        else:
            meta[key] = val
    return meta, body.lstrip("\n")


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

    logger.info(f"Loading prompts from: {config.PROMPTS_DIR}")
    prompt_loader = PromptLoader(config.PROMPTS_DIR)
    logger.info("Prompts loaded successfully")

    # Ensure artifacts directories exist
    _ensure_dir(ARTIFACTS_DIR)
    _ensure_dir(ASSETS_DIR)
    logger.info(f"Artifacts directory ready: {ARTIFACTS_DIR}")

    openrouter_service = OpenRouterService(
        api_key=config.OPENROUTER_API_KEY,
        api_base=config.OPENROUTER_API_BASE,
        default_model=config.DEFAULT_MODEL,
        fallback_model=config.FALLBACK_MODEL,
        prompt_loader=prompt_loader,
        model_configs=config.AVAILABLE_MODELS
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


@app.get("/lessons/grouped", response_model=LessonsGroupedResponse, tags=["Lessons"])
async def get_lessons_grouped():
    """
    Get lessons grouped by course and module
    Returns hierarchical structure for tree display
    """
    grouped = context_service.get_grouped_lessons()
    return LessonsGroupedResponse(groups=grouped)


@app.get("/lessons/{lesson_id}", response_model=LessonDetailResponse, tags=["Lessons"])
async def get_lesson(lesson_id: int):
    """
    Get detailed information about a specific lesson including its content
    Returns lesson with Markdown content
    """
    lesson = context_service.get_lesson(lesson_id)

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail=f"Lesson with ID {lesson_id} not found"
        )

    return LessonDetailResponse(
        id=lesson["id"],
        title=lesson["title"],
        filename=lesson["filename"],
        content=lesson["content"],
        course=lesson.get("course"),
        module=lesson.get("module"),
        category=lesson.get("category")
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


@app.post("/context/preview", response_model=ContextPreviewResponse, tags=["Context"])
async def preview_context(request: ContextPreviewRequest):
    """
    Preview context token count and estimated cost
    Useful for showing users impact of their lesson selection
    """
    try:
        # Estimate tokens
        estimated_tokens = context_service.estimate_tokens(request.lesson_ids)

        # Get lesson count
        if request.lesson_ids:
            lesson_count = len(request.lesson_ids)
            lessons = context_service.get_lesson_titles(request.lesson_ids)
        else:
            lesson_count = context_service.get_total_lessons()
            lessons = ["All available lessons"]

        # Calculate estimated cost (using default model pricing as baseline)
        # Using Gemini Flash 2.5 Preview: $0.075/1M input, $0.30/1M output
        input_cost_per_1m = 0.075
        output_cost_per_1m = 0.30

        estimated_cost_input = (estimated_tokens / 1_000_000) * input_cost_per_1m
        estimated_cost_output = (estimated_tokens / 1_000_000) * output_cost_per_1m

        return ContextPreviewResponse(
            lesson_count=lesson_count,
            estimated_tokens=estimated_tokens,
            estimated_cost_input=estimated_cost_input,
            estimated_cost_output=estimated_cost_output,
            lessons=lessons
        )

    except Exception as e:
        logger.error(f"Context preview error: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Error previewing context: {str(e)}"
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
            {
                "role": msg.role,
                "content": msg.content,
                "images": msg.images if msg.images else []
            }
            for msg in request.conversation_history
        ]

        # Send to OpenRouter
        result = await openrouter_service.chat(
            message=request.message,
            context=context,
            history=history,
            model=request.model,
            images=request.images
        )

        # Build response with tokens and cost info
        tokens_data = result.get("tokens_used")
        cost_data = result.get("cost")

        return ChatResponse(
            response=result["response"],
            model_used=result["model_used"],
            lessons_used=lessons_used,
            tokens_used=TokensUsage(**tokens_data) if tokens_data else None,
            cost=CostInfo(**cost_data) if cost_data else None,
            context_length=result.get("context_length")
        )

    except Exception as e:
        logger.error(f"Chat error: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat request: {str(e)}"
        )


# ---------------------------
# Artifacts API
# ---------------------------

@app.post("/artifacts", response_model=Artifact, tags=["Artifacts"])
async def create_artifact(request: CreateArtifactRequest):
    """
    Create and persist an artifact into docs/artifacts.
    - type=markdown: saves .md with frontmatter + body
    - type=code: saves .md with description and .html with code
    - type=images: saves images to assets/ and records paths
    """
    try:
        now_iso = datetime.utcnow().isoformat(timespec="seconds") + "Z"
        artifact_id = _generate_artifact_id()

        saved_images: list[str] = []
        if request.type == "images" and request.images:
            saved_images = _save_images(request.images, artifact_id)

        # Prepare meta
        meta = {
            "id": artifact_id,
            "title": request.title,
            "type": request.type,
            "source": (request.source or ""),
            "tags": request.tags or [],
            "created_at": now_iso,
            "updated_at": now_iso
        }

        # Build body and write files
        body = ""
        html_path = None
        if request.type == "markdown":
            body = request.content_markdown or ""
        elif request.type == "code":
            # Put optional description into body
            body = (request.content_markdown or "Code artifact")
            # Save HTML for execution/preview
            if request.html:
                html_path = os.path.join(ARTIFACTS_DIR, f"{artifact_id}.html")
                with open(html_path, "w", encoding="utf-8") as f:
                    f.write(request.html)
        elif request.type == "images":
            if saved_images:
                lines = ["# Images", ""]
                for rel in saved_images:
                    lines.append(f"![image]({rel})")
                body = "\n".join(lines)
            else:
                body = request.content_markdown or "Images artifact"

        _write_markdown_file(artifact_id, meta, body)

        return Artifact(
            id=artifact_id,
            title=request.title,
            type=request.type,
            content_markdown=body if request.type in ("markdown", "code") else None,
            html=request.html if request.type == "code" else None,
            images=saved_images if request.type == "images" else None,
            source=request.source,
            tags=request.tags or [],
            created_at=now_iso,
            updated_at=now_iso
        )
    except Exception as e:
        logger.error(f"Error creating artifact: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to create artifact")


@app.get("/artifacts", response_model=ArtifactListResponse, tags=["Artifacts"])
async def list_artifacts():
    """
    List artifacts by reading docs/artifacts/*.md (excluding specs/help docs)
    """
    try:
        if not os.path.exists(ARTIFACTS_DIR):
            return ArtifactListResponse(items=[])
        items: list[ArtifactMeta] = []
        for name in sorted(os.listdir(ARTIFACTS_DIR)):
            if not name.endswith(".md"):
                continue
            if name in ("ARTIFACTS_SPEC.md", "artifacts.md"):
                continue
            md_path = os.path.join(ARTIFACTS_DIR, name)
            with open(md_path, "r", encoding="utf-8") as f:
                text = f.read()
            meta, _ = _parse_frontmatter(text)
            if not meta:
                # fallback: derive id from filename
                art_id = name[:-3]
                items.append(ArtifactMeta(
                    id=art_id,
                    title=art_id,
                    type="markdown",
                    created_at="",
                    updated_at="",
                    tags=None
                ))
                continue
            items.append(ArtifactMeta(
                id=str(meta.get("id", name[:-3])),
                title=str(meta.get("title", name[:-3])),
                type=str(meta.get("type", "markdown")),  # type: ignore
                created_at=str(meta.get("created_at", "")),
                updated_at=str(meta.get("updated_at", "")),
                tags=meta.get("tags") if isinstance(meta.get("tags"), list) else None
            ))
        return ArtifactListResponse(items=items)
    except Exception as e:
        logger.error(f"Error listing artifacts: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to list artifacts")


@app.get("/artifacts/{artifact_id}", response_model=Artifact, tags=["Artifacts"])
async def get_artifact(artifact_id: str):
    """
    Read a single artifact by id from docs/artifacts
    """
    try:
        md_path = os.path.join(ARTIFACTS_DIR, f"{artifact_id}.md")
        if not os.path.exists(md_path):
            raise HTTPException(status_code=404, detail="Artifact not found")
        with open(md_path, "r", encoding="utf-8") as f:
            text = f.read()
        meta, body = _parse_frontmatter(text)

        # Load optional HTML for code type
        html_content = None
        if meta.get("type") == "code":
            html_file = os.path.join(ARTIFACTS_DIR, f"{artifact_id}.html")
            if os.path.exists(html_file):
                with open(html_file, "r", encoding="utf-8") as hf:
                    html_content = hf.read()

        # Collect images by file prefix
        images_list: list[str] = []
        if meta.get("type") == "images" and os.path.exists(ASSETS_DIR):
            for name in sorted(os.listdir(ASSETS_DIR)):
                if name.startswith(f"{artifact_id}-"):
                    images_list.append(f"assets/{name}")

        # Build config for react-component type
        config_dict = None
        if meta.get("type") == "react-component":
            config_dict = {
                "type": "react-component",
                "id": meta.get("componentId", artifact_id),
                "props": {
                    "title": meta.get("propsTitle"),
                    "message": meta.get("propsMessage"),
                    "timestamp": int(meta.get("propsTimestamp", 0)) if meta.get("propsTimestamp") else None
                }
            }

        return Artifact(
            id=str(meta.get("id", artifact_id)),
            title=str(meta.get("title", artifact_id)),
            type=str(meta.get("type", "markdown")),  # type: ignore
            content_markdown=body if meta.get("type") in ("markdown", "code", "react-component") else None,
            html=html_content if meta.get("type") == "code" else None,
            images=images_list if meta.get("type") == "images" else None,
            config=config_dict,
            source=meta.get("source"),
            tags=meta.get("tags") if isinstance(meta.get("tags"), list) else None,
            created_at=str(meta.get("created_at", "")),
            updated_at=str(meta.get("updated_at", ""))
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error reading artifact {artifact_id}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to read artifact")
        

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=config.PORT,
        reload=True
    )
