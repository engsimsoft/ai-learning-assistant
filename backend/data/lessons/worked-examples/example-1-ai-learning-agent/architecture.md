# Architecture: AI Learning Agent

> Детальное описание архитектуры приложения

## 🏗️ Общая схема

```
┌─────────────────────────────────────────────────────────┐
│                     User Browser                         │
│  ┌──────────┐  ┌──────────┐  ┌─────────────────────┐  │
│  │  Left    │  │  Center  │  │  Right              │  │
│  │ Sidebar  │  │   Chat   │  │ Sidebar (optional)  │  │
│  └──────────┘  └──────────┘  └─────────────────────┘  │
└────────────┬────────────────────────────────────────────┘
             │ HTTP/REST
             ▼
┌────────────────────────────────────────────────────────┐
│                 Backend (FastAPI)                      │
│  ┌──────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │  main.py │→ │   Services   │→ │  OpenRouter API │ │
│  │  config  │  │ContextService│  │                 │ │
│  │          │  │PromptLoader  │  │  Gemini/Claude/ │ │
│  │          │  │OpenRouter    │  │  GPT/Grok       │ │
│  └──────────┘  └──────────────┘  └─────────────────┘ │
│       ↓              ↓                                 │
│  ┌──────────┐  ┌──────────────┐                       │
│  │ prompts/ │  │    data/     │                       │
│  │  (MD)    │  │  lessons/    │                       │
│  └──────────┘  └──────────────┘                       │
└────────────────────────────────────────────────────────┘
```

## 📂 Структура проекта (Lesson 1.1: Separation of Concerns)

### Backend Directory Structure

```
backend/
├── main.py                          # Точка входа (FastAPI app)
├── config.py                        # Конфигурация (SSOT)
├── requirements.txt                 # Python dependencies
│
├── prompts/                         # AI Prompts (SSOT - Lesson 1.7)
│   ├── README.md                    # Обзор системы промптов
│   ├── system_prompt.md             # Инструкции для AI tutor
│   ├── boundaries.md                # 72 урока, границы знаний
│   └── model_settings.md            # Документация параметров
│
├── services/                        # Бизнес-логика (Lesson 1.1)
│   ├── __init__.py
│   ├── context_service.py           # Загрузка уроков
│   ├── openrouter_service.py        # Интеграция с AI API
│   └── prompt_loader.py             # Markdown → Python
│
└── data/                            # Данные приложения (SSOT)
    └── lessons/                     # Курсовые материалы
        ├── ai-web-learning/         # 41+ уроков
        ├── project-setup-guide/     # 26 уроков
        └── worked-examples/         # Примеры (этот документ)
```

### Frontend Directory Structure

```
frontend/
├── package.json                     # Node dependencies
├── vite.config.js                   # Vite configuration
├── index.html                       # Entry point
│
└── src/
    ├── main.jsx                     # React entry
    ├── App.jsx                      # Main app component
    ├── config.js                    # API endpoints (SSOT)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── AppLayout.jsx        # Three-panel layout
    │   │   ├── ResizeHandle.jsx     # Draggable resize
    │   │   └── ResizeHandle.css
    │   │
    │   ├── leftSidebar/
    │   │   ├── LeftSidebar.jsx      # Course navigation
    │   │   └── LeftSidebar.css
    │   │
    │   ├── chat/
    │   │   ├── ChatPanel.jsx        # Main chat interface
    │   │   ├── ChatMessage.jsx      # Single message
    │   │   ├── ChatInput.jsx        # User input
    │   │   └── [styles].css
    │   │
    │   └── rightSidebar/
    │       ├── ClaudeAISidebar.jsx  # Optional context panel
    │       └── ClaudeAISidebar.css
    │
    └── services/
        └── api.js                    # Backend API calls
```

## 🔄 Data Flow (Request Lifecycle)

### 1. User Asks Question

```
User types: "Что такое FastAPI?"
   ↓
ChatPanel.jsx → handleSendMessage()
   ↓
api.sendMessage(question, selectedLessons, model)
```

### 2. Frontend → Backend

```javascript
// frontend/src/services/api.js
export async function sendMessage(message, lessonIds, model) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      lesson_ids: lessonIds,
      model: model || null  // null = use default
    })
  })
  return await response.json()
}
```

### 3. Backend Processing

```python
# backend/main.py
@app.post("/api/chat")
async def chat(request: ChatRequest):
    # 1. Load context from selected lessons
    context = context_service.get_context(request.lesson_ids)

    # 2. Send to AI with prompt
    result = await openrouter_service.chat(
        message=request.message,
        context=context,
        history=request.history,
        model=request.model  # User's choice
    )

    return ChatResponse(**result)
```

### 4. OpenRouter Service Flow

```python
# backend/services/openrouter_service.py
async def chat(message, context, history, model):
    # 1. Build system prompt with context
    system_prompt = self._build_system_prompt(context)

    # 2. Get model-specific config
    model_config = self._get_model_config(model)

    # 3. Prepare messages
    messages = [
        {"role": "system", "content": system_prompt},
        *history,
        {"role": "user", "content": message}
    ]

    # 4. Send to OpenRouter API
    payload = {
        "model": model,
        "messages": messages,
        "temperature": model_config.get("temperature", 0.7),
        "max_tokens": model_config.get("max_tokens", 4000),
        "top_p": model_config.get("top_p", 1.0)
    }

    response = await client.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=self.headers,
        json=payload
    )

    return response.json()
```

### 5. Prompt Building

```python
# backend/services/prompt_loader.py
def build_full_prompt(context: str) -> str:
    # Load from Markdown file (SSOT)
    system_prompt = self.load_system_prompt()

    # Replace {context} variable
    full_prompt = system_prompt.replace("{context}", context)

    return full_prompt
```

**Пример результата:**

```
You are an AI tutor for web development...

## Course Materials

# Lesson 2.1: Введение в FastAPI

FastAPI — современный веб-фреймворк для Python...
[полный текст выбранных уроков]

---

Now, please answer the student's question based on these materials.
```

### 6. Backend → Frontend → User

```
OpenRouter API Response
   ↓
OpenRouterService parses response
   ↓
main.py returns ChatResponse
   ↓
Frontend api.js receives JSON
   ↓
ChatPanel updates messages state
   ↓
User sees AI response
```

## 🔐 Configuration Management (Lesson 1.5)

### Backend Configuration (SSOT)

```python
# backend/config.py
class Config:
    # API Keys from .env
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "")

    # Model settings (SSOT)
    DEFAULT_MODEL: str = "google/gemini-2.5-flash-preview-09-2025"
    FALLBACK_MODEL: str = "x-ai/grok-4-fast"

    # Available models with parameters
    AVAILABLE_MODELS = [
        {
            "id": "google/gemini-2.5-flash-preview-09-2025",
            "name": "Gemini 2.5 Flash Preview",
            "description": "Latest Gemini, fast & cost-effective (default)",
            "context_length": 1000000,
            "temperature": 0.7,      # Balanced
            "max_tokens": 4000,
            "top_p": 1.0
        },
        {
            "id": "anthropic/claude-sonnet-4.5",
            "name": "Claude Sonnet 4.5",
            "description": "Best reasoning & code, premium quality",
            "context_length": 200000,
            "temperature": 0.5,      # More focused for code
            "max_tokens": 8000,      # Higher for detailed explanations
            "top_p": 0.95
        },
        # ... other models
    ]

    # Directory paths (SSOT)
    LESSONS_DIR = "backend/data/lessons"
    PROMPTS_DIR = "backend/prompts"

    # CORS settings
    ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:5174"
    ]
```

### Frontend Configuration (SSOT)

```javascript
// frontend/src/config.js
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
export const APP_NAME = 'AI Learning Agent';
export const APP_VERSION = '1.0.0';
```

### Environment Variables

**Backend (.env):**
```env
OPENROUTER_API_KEY=your_key_here
PORT=8000
FRONTEND_URL=http://localhost:5173
DEFAULT_MODEL=google/gemini-2.5-flash-preview-09-2025
FALLBACK_MODEL=x-ai/grok-4-fast
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🎨 UI Architecture (Three-Panel Layout)

### Component Hierarchy

```
App.jsx
  └── AppLayout.jsx
        ├── LeftSidebar.jsx
        │     └── Course/Module/Lesson tree with checkboxes
        │
        ├── ResizeHandle.jsx (left)
        │
        ├── ChatPanel.jsx
        │     ├── ModelSelector (dropdown)
        │     ├── ChatMessage[] (history)
        │     └── ChatInput (textarea + send button)
        │
        ├── ResizeHandle.jsx (right, optional)
        │
        └── ClaudeAISidebar.jsx (optional)
              └── Context information display
```

### State Management

```javascript
// App.jsx (main state)
const [selectedLessons, setSelectedLessons] = useState([])
const [messages, setMessages] = useState([])
const [selectedModel, setSelectedModel] = useState(null)
const [availableModels, setAvailableModels] = useState([])
const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(false)
```

### CSS Architecture

**Color Scheme (Claude-style):**
```css
:root {
  --bg-primary: #1e1e1e;      /* Dark background */
  --bg-secondary: #252525;    /* Slightly lighter */
  --bg-tertiary: #2d2d2d;     /* Hover states */

  --text-primary: #e0e0e0;    /* Main text */
  --text-secondary: #a0a0a0;  /* Secondary text */

  --accent-primary: #f97316;  /* Orange accent */
  --accent-hover: #fb923c;    /* Lighter orange */

  --border: #3a3a3a;          /* Borders */
}
```

**Layout:**
```css
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.left-sidebar {
  flex: 0 0 300px;  /* Fixed width */
  overflow-y: auto;
}

.chat-panel {
  flex: 1;          /* Takes remaining space */
  display: flex;
  flex-direction: column;
}

.right-sidebar {
  flex: 0 0 350px;  /* Fixed width, optional */
}
```

## 🔌 API Endpoints

### GET /api/models
Получить список доступных AI моделей.

**Response:**
```json
{
  "models": [
    {
      "id": "google/gemini-2.5-flash-preview-09-2025",
      "name": "Gemini 2.5 Flash Preview",
      "description": "Latest Gemini, fast & cost-effective (default)"
    },
    // ... other models
  ]
}
```

### GET /api/lessons
Получить структуру всех курсов и уроков.

**Response:**
```json
{
  "courses": [
    {
      "id": "ai-web-learning",
      "title": "AI Web Learning",
      "modules": [
        {
          "id": "1-basics",
          "title": "Module 1: Основы",
          "lessons": [
            {
              "id": "lesson-01-client-server",
              "title": "Архитектура клиент-сервер",
              "file_path": "backend/data/lessons/ai-web-learning/1-basics/lesson-01-client-server.md"
            },
            // ... other lessons
          ]
        },
        // ... other modules
      ]
    },
    // ... other courses
  ]
}
```

### POST /api/chat
Отправить вопрос AI и получить ответ.

**Request:**
```json
{
  "message": "Что такое FastAPI?",
  "lesson_ids": [
    "ai-web-learning/2-backend/lesson-2-1-fastapi-intro",
    "ai-web-learning/2-backend/lesson-2-2-http-methods"
  ],
  "model": "google/gemini-2.5-flash-preview-09-2025",
  "history": [
    {
      "role": "user",
      "content": "Previous question"
    },
    {
      "role": "assistant",
      "content": "Previous answer"
    }
  ]
}
```

**Response:**
```json
{
  "response": "FastAPI — это современный веб-фреймворк для Python...",
  "model_used": "google/gemini-2.5-flash-preview-09-2025",
  "tokens_used": 1250,
  "context_length": 3500
}
```

## 🔄 Error Handling (Lesson 2.4)

### Backend Error Handling

```python
# Fallback mechanism
async def chat(...):
    try:
        # Try primary model
        result = await self._send_request(..., selected_model)
        return result
    except Exception as e:
        logger.warning(f"Primary model {selected_model} failed: {e}")

        # Try fallback model
        if selected_model != self.fallback_model:
            logger.info(f"Attempting fallback to {self.fallback_model}")
            try:
                result = await self._send_request(..., self.fallback_model)
                return result
            except Exception as fallback_error:
                logger.error(f"Fallback model also failed: {fallback_error}")
                raise Exception("Both models failed. Please try again later.")
        else:
            raise
```

### Frontend Error Handling

```javascript
// frontend/src/services/api.js
async function sendMessage(message, lessonIds, model) {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, lesson_ids: lessonIds, model })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to send message')
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
```

## 📊 Performance Optimization

### 1. Caching
```python
# PromptLoader caches Markdown files
class PromptLoader:
    def __init__(self, prompts_dir: str):
        self._cache: Dict[str, str] = {}

    def _load_file(self, filename: str) -> str:
        if filename in self._cache:
            return self._cache[filename]

        # Load and cache
        content = open(filepath).read()
        self._cache[filename] = content
        return content
```

### 2. Context Length Management
```python
# Only load selected lessons (not all 72)
context = context_service.get_context(selected_lesson_ids)
```

### 3. Async Operations
```python
# FastAPI async endpoints
@app.post("/api/chat")
async def chat(request: ChatRequest):
    result = await openrouter_service.chat(...)
    return result
```

## 🔗 Связанные документы

- [Overview](overview.md) - Общий обзор проекта
- [Implementation Guide](implementation.md) - Детали реализации
- [Lessons Applied](lessons-applied.md) - Применённые уроки

---

**Последнее обновление:** 2025-10-16
