# Architecture Overview

## System Architecture

```
┌──────────────┐
│   Student    │  Asks question + selects model + selects lessons
└──────┬───────┘
       │
       ↓
┌────────────────────────────────────────────┐
│         React Frontend                     │
│  • ChatInterface                           │
│  • MessageList                             │
│  • InputForm                               │
│  • LessonSelector                          │
│  • ModelSelector                           │
└──────┬─────────────────────────────────────┘
       │ HTTP POST /chat
       │ { message, lesson_ids, model, history }
       ↓
┌────────────────────────────────────────────┐
│       FastAPI Backend                      │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  main.py                             │ │
│  │  • GET /lessons                      │ │
│  │  • GET /lessons/grouped              │ │
│  │  • GET /models                       │ │
│  │  • POST /chat                        │ │
│  │  • POST /context/preview             │ │
│  │  • CORS middleware                   │ │
│  └────────┬─────────────────────────────┘ │
│           │                                │
│  ┌────────▼─────────────────────────────┐ │
│  │  context_service.py                  │ │
│  │  • Loads 72 lessons                  │ │
│  │  • Builds context                    │ │
│  │  • Groups lessons by course/module   │ │
│  │  • Estimates tokens                  │ │
│  │  • Selects requested lessons         │ │
│  └────────┬─────────────────────────────┘ │
│           │                                │
│  ┌────────▼─────────────────────────────┐ │
│  │  openrouter_service.py               │ │
│  │  • Builds system prompt              │ │
│  │  • Selects model                     │ │
│  │  • Sends to OpenRouter               │ │
│  │  • Handles fallback                  │ │
│  │  • Returns response                  │ │
│  └────────┬─────────────────────────────┘ │
└───────────┼────────────────────────────────┘
            │
            ↓
   ┌────────────────────────────────────────┐
   │      OpenRouter API                    │
   │                                        │
   │  ┌──────────────────────────────────┐ │
   │  │ Claude 3.5 Sonnet                │ │
   │  │ GPT-4 Turbo                      │ │
   │  │ Gemini Pro                       │ │
   │  │ Llama 3 70B                      │ │
   │  │ ... and 100+ more models         │ │
   │  └──────────────────────────────────┘ │
   │                                        │
   │  • Unified API interface               │
   │  • Automatic fallback                  │
   │  • Load balancing                      │
   └────────────────────────────────────────┘
```

## Data Flow

### 1. Student Asks Question

```
Student: "What is REST API?"
Model: "Claude 3.5 Sonnet"
Lessons: [1, 2, 3] or "All"
         ↓
ChatInterface (React)
```

### 2. Frontend Sends Request

```javascript
POST /chat
{
  "message": "What is REST API?",
  "lesson_ids": [1, 2, 3],
  "model": "anthropic/claude-3.5-sonnet",
  "conversation_history": [...],
  "images": ["data:image/jpeg;base64,..."]  // Optional: for Vision API
}
```

### 3. Backend Processing

```python
# main.py → endpoint
context_service.build_context([1,2,3])
  ↓
openrouter_service.chat(message, context, history, model, images)
  ↓
If images present → format as multimodal content
  ↓
OpenRouter API → Selected model (with vision support) → Response
  ↓
If error → fallback to another model
  ↓
return ChatResponse
```

### 4. Frontend Displays Response

```
MessageList updates → AI response appears
Metadata: model used, tokens consumed, lessons used
```

## Architectural Layers

### Presentation Layer (Routes)
- `main.py` - FastAPI endpoints
- Pydantic validation (`models.py`)
- CORS configuration for frontend

### Business Logic Layer (Services)
- `openrouter_service.py` - LLM communication
- `context_service.py` - Lesson management
- Isolated from HTTP concerns
- Supports multiple AI models
- Automatic fallback handling

### Data Layer
- `data/lessons/` - 50+ lessons in Markdown
- In-memory caching for MVP
- No database (stateless for now)

## Key Design Decisions

### Why OpenRouter?

See [decisions/001-why-openrouter.md](decisions/001-why-openrouter.md)

**Benefits:**
1. **Unified API** - One interface for all models
2. **Flexibility** - Easy to switch models without code changes
3. **Reliability** - Built-in fallback mechanism
4. **Cost-effective** - Choose best model for the task
5. **Convenience** - Single API key for everything

### Why No Database?

**MVP Strategy:**
- Conversation history stored in-memory (session-based)
- Lessons loaded at startup and cached
- No need for persistence yet

**Future Enhancement:**
- PostgreSQL for conversation history
- User accounts and preferences
- Analytics and usage tracking

### Stateless Architecture

**Current:**
- Each request is independent
- No server-side session storage
- Frontend manages conversation history

**Benefits:**
- Easy to scale horizontally
- Simple deployment
- No session management overhead

**Trade-offs:**
- History lost on page refresh
- No conversation persistence
- Limited to current session

## Component Responsibilities

### Backend Components

**config.py**
- Environment variable management
- Model configuration
- CORS settings

**models.py**
- Request/response validation
- Type safety with Pydantic
- API contract definition

**context_service.py**
- Lesson file loading (72 lessons from 2 courses)
- Context building
- Lesson metadata extraction
- Module organization
- Lesson grouping by course and module
- Token estimation (1 token ≈ 4 characters)
- Lesson IDs in module retrieval

**openrouter_service.py**
- OpenRouter API communication
- Prompt construction
- Model selection
- Error handling and fallback
- Response parsing

### Frontend Components

**ChatInterface.jsx**
- Main container
- State management
- Orchestrates child components

**MessageList.jsx**
- Display messages
- Auto-scroll
- Loading indicators

**InputForm.jsx**
- User input
- Message submission
- Keyboard shortcuts

**LessonSelector.jsx**
- Lesson selection UI
- Module grouping
- Select all/none

**ModelSelector.jsx**
- AI model selection
- Model information display
- Default model handling

**ContextSelectorModal.jsx** (NEW - v2.0)
- Smart context selector modal
- 4 modes: Current Lesson, Current Module, All Lessons, Custom
- Real-time token and cost estimation
- Hierarchical lesson tree
- Shows selected context description

**LessonTree.jsx** (NEW - v2.0)
- Hierarchical tree with checkboxes
- Expand/collapse courses and modules
- Select entire courses or modules
- Indeterminate checkbox state support

**ContextEstimate.jsx** (NEW - v2.0)
- Displays estimated token count
- Shows input/output cost preview
- Loading and error states
- Real-time updates with debounce

## Security Considerations

**API Keys:**
- Stored in `.env` files (never committed)
- Backend-only (not exposed to frontend)
- OpenRouter handles rate limiting

**CORS:**
- Configured for specific origins
- Prevents unauthorized frontend access
- Production URLs must be whitelisted

**Input Validation:**
- Pydantic models validate all inputs
- FastAPI automatic validation
- Prevents malformed requests

**Error Handling:**
- Graceful degradation
- User-friendly error messages
- Logs for debugging

## Performance Considerations

**Caching:**
- Lessons loaded once at startup
- In-memory access for fast retrieval
- No database queries

**Context Size:**
- Smart context selector with 4 modes
- Token estimation before sending (prevents expensive mistakes)
- Select specific lessons, modules, or entire courses
- Reduces token usage significantly
- Faster response times
- Cost preview (e.g., "$0.03 in / $0.10 out")

**Model Selection:**
- Choose appropriate model for task
- Balance between quality and cost
- Fallback to cheaper models on error

**Vision API (Multimodal):**
- Images converted to base64 on client side
- Sent with text in multimodal format
- Image processing cost: ~85-255 tokens per image
- All 4 models support vision capabilities
- Images preserved in conversation history

## Vision API Support

**Capabilities:**
- Paste images directly into chat with Ctrl+V / Cmd+V
- Automatic base64 encoding
- Real-time image preview before sending
- Images displayed in conversation history
- Support for multiple images per message

**Supported Models:**
- ✅ Gemini 2.5 Flash Preview ($0.075/1M in, $0.30/1M out)
- ✅ Grok 4 Fast ($0.05/1M in, $0.15/1M out)
- ✅ GPT-4.1 Mini ($0.15/1M in, $0.60/1M out)
- ✅ Claude Sonnet 4.5 ($3.00/1M in, $15.00/1M out)

**Technical Implementation:**
- Frontend: `handlePaste()` in ClaudeAISidebar.jsx
- Base64 encoding via FileReader API
- Backend: Multimodal content formatting in openrouter_service.py
- OpenRouter Vision API format: `{"type": "image_url", "image_url": {"url": "data:..."}}`

**Use Cases:**
- Analyzing UI screenshots
- Debugging code from images
- Explaining diagrams and charts
- Reviewing design mockups

## Scalability

**Current Limitations:**
- Single instance
- In-memory state
- No load balancing

**Future Enhancements:**
- Horizontal scaling with Railway
- Redis for session management
- Database for persistence
- CDN for frontend assets
- Message queue for async processing

## Monitoring & Logging

**Current:**
- Python logging to stdout
- Error tracking in console
- Basic health check endpoint

**Recommended Additions:**
- Structured logging (JSON)
- Application monitoring (Sentry)
- Performance metrics
- User analytics
- Token usage tracking
