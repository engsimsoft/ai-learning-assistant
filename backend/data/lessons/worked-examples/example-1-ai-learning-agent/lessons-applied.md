# Lessons Applied: AI Learning Agent

> Детальная карта применения уроков из курса в реальном проекте

## 📚 Overview

Этот документ показывает **где именно** и **как конкретно** применён каждый урок из курса "AI Web Learning" и "Project Setup Guide".

**Философия:** Проект сам демонстрирует принципы, которым учит.

---

## 🎯 Project Setup Guide (26 уроков)

### Module 1: Fundamentals

#### Lesson 1.1: Философия правильной организации проекта

**Принципы применены:**

✅ **Separation of Concerns**
```
backend/
├── main.py              # Entry point
├── config.py            # Configuration
├── services/            # Business logic
│   ├── context_service.py
│   ├── openrouter_service.py
│   └── prompt_loader.py
├── prompts/             # AI prompts (data)
└── data/lessons/        # Course materials (data)
```

**Где применено:**
- `backend/services/` — каждый сервис отвечает за одну задачу
- `backend/main.py` — только FastAPI endpoints, бизнес-логика в services
- `backend/config.py` — вся конфигурация в одном месте

✅ **DRY (Don't Repeat Yourself)**
```python
# Плохо (до рефакторинга):
# Hardcoded prompt в openrouter_service.py
# Hardcoded temperature в _send_request()

# Хорошо (после рефакторинга):
# Prompt в backend/prompts/system_prompt.md
# Settings в backend/config.py AVAILABLE_MODELS
```

✅ **Layered Architecture**
```
Frontend (React)
   ↓ HTTP/REST
Backend (FastAPI)
   ↓ Services Layer
External APIs (OpenRouter)
```

**Исходный код:**
- [backend/services/](../../../backend/services/) - Services layer
- [backend/config.py](../../../backend/config.py) - Configuration layer
- [backend/main.py](../../../backend/main.py) - API layer

---

#### Lesson 1.2: Инициализация проекта: первые шаги

**Применено:**

✅ **Git initialization**
```bash
git init
git add .
git commit -m "Initial commit"
```

✅ **README.md** с описанием проекта
- [README.md](../../../README.md) - Главная документация

✅ **LICENSE** файл для open source

**Исходный код:**
- [.git/](../../../.git/) - Git repository
- [README.md](../../../README.md) - Project overview

---

#### Lesson 1.3: Dependencies (управление зависимостями)

**Применено:**

✅ **Backend dependencies** (requirements.txt)
```txt
fastapi==0.110.0
uvicorn==0.27.1
httpx==0.27.0
python-dotenv==1.0.1
```

✅ **Frontend dependencies** (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

**Исходный код:**
- [backend/requirements.txt](../../../backend/requirements.txt)
- [frontend/package.json](../../../frontend/package.json)

---

#### Lesson 1.4: Virtual Environment (venv)

**Применено:**

✅ **Python virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
```

✅ **Node.js dependencies isolation**
```bash
cd frontend
npm install  # Creates node_modules/
```

✅ **.gitignore** excludes venv and node_modules
```gitignore
venv/
node_modules/
```

**Исходный код:**
- [.gitignore](../../../.gitignore) - Excludes venv, node_modules

---

#### Lesson 1.5: Environment Variables (.env)

**Применено:**

✅ **Backend .env file**
```env
# backend/.env (not in Git)
OPENROUTER_API_KEY=sk-or-v1-xxxxx
PORT=8000
FRONTEND_URL=http://localhost:5173
DEFAULT_MODEL=google/gemini-2.5-flash-preview-09-2025
FALLBACK_MODEL=x-ai/grok-4-fast
```

✅ **Frontend .env file**
```env
# frontend/.env (not in Git)
VITE_API_BASE_URL=http://localhost:8000/api
```

✅ **Loading environment variables**
```python
# backend/config.py
from dotenv import load_dotenv
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
```

✅ **.env.example** files для документации
```env
# backend/.env.example (in Git)
OPENROUTER_API_KEY=your_key_here
PORT=8000
```

**Исходный код:**
- [backend/config.py](../../../backend/config.py) - Loads .env
- [backend/.env.example](../../../backend/.env.example) - Template
- [frontend/.env.example](../../../frontend/.env.example) - Template

---

#### Lesson 1.6: Git и .gitignore

**Применено:**

✅ **.gitignore** excludes sensitive and generated files
```gitignore
# Environment variables
.env

# Virtual environments
venv/
node_modules/

# Python
__pycache__/
*.pyc

# OS files
.DS_Store
```

✅ **Git workflow**
```bash
git add .
git commit -m "refactor: Move prompts to Markdown files following Lesson 1.7 principles"
git push origin main
```

**Исходный код:**
- [.gitignore](../../../.gitignore) - Git ignore rules
- [.git/](../../../.git/) - Git history

---

#### Lesson 1.7: Документация: правильная организация

**Применено:**

✅ **SSOT (Single Source of Truth)** - THE CORE PRINCIPLE

**Examples:**

1. **Prompts (SSOT)**
```
backend/prompts/        ← ЕДИНСТВЕННЫЙ источник правды
├── system_prompt.md
├── boundaries.md
└── model_settings.md

docs/prompt-system.md   ← Только объяснение + ссылки на backend/prompts/
```

2. **Model Settings (SSOT)**
```python
# backend/config.py - SSOT
AVAILABLE_MODELS = [
    {
        "id": "google/gemini-2.5-flash-preview-09-2025",
        "temperature": 0.7,  # ← ЕДИНСТВЕННОЕ место определения
        "max_tokens": 4000
    }
]

# backend/prompts/model_settings.md - Документация (объясняет, не дублирует)
```

3. **API Endpoints (SSOT)**
```python
# backend/main.py - SSOT
@app.post("/api/chat")
async def chat(request: ChatRequest):
    ...

# docs/architecture.md - Документация (ссылается, не копирует код)
```

✅ **Links instead of copying**
```markdown
<!-- docs/prompt-system.md -->
## Files
- [system_prompt.md](../backend/prompts/system_prompt.md) - AI tutor instructions
- [config.py](../backend/config.py) - Model settings
```

✅ **Logical structure**
```
backend/              # Source code (SSOT)
├── prompts/          # Configuration data
├── services/         # Business logic
└── data/lessons/     # Course materials

docs/                 # Documentation (explains SSOT)
├── architecture.md
├── prompt-system.md
└── course-structure.md
```

✅ **Markdown for documentation**
- All docs in `.md` format
- Supports formatting, code blocks, links
- Human-readable, Git-friendly

**Why this matters:**
> "Это курс по обучению. Ты сам этот курс писал для меня. Это будет неправильно, если архитектура и структура данного курса будут расходиться с тем, что ты меня учил."
>
> — User's key insight (2025-10-16)

**The project MUST follow the principles it teaches.**

**Исходный код:**
- [backend/prompts/](../../../backend/prompts/) - Prompts SSOT
- [backend/config.py](../../../backend/config.py) - Config SSOT
- [docs/](../../../docs/) - Documentation (explains, doesn't duplicate)
- [docs/prompt-system.md](../../../docs/prompt-system.md) - Prompt system explanation

---

#### Lesson 1.9: Рефакторинг: когда и как

**Применено:**

✅ **Code smell identified: Hardcoded prompt**
```python
# BEFORE (openrouter_service.py:173-191)
system_prompt = """
You are an AI tutor for web development.
...
(29 lines of hardcoded text)
"""
```

✅ **Refactoring: Extract to Markdown**
```markdown
# AFTER (backend/prompts/system_prompt.md)
# AI Tutor System Prompt

You are an AI tutor for web development...
```

✅ **Code smell identified: Magic numbers**
```python
# BEFORE
temperature = 0.7
max_tokens = 4000
```

✅ **Refactoring: Extract to configuration**
```python
# AFTER (backend/config.py)
AVAILABLE_MODELS = [
    {
        "id": "google/gemini-2.5-flash-preview-09-2025",
        "temperature": 0.7,      # ← Named, documented
        "max_tokens": 4000,
        "top_p": 1.0
    }
]
```

✅ **Refactoring process followed Lesson 1.9 steps:**
1. ✅ Identified problem (hardcoded prompt)
2. ✅ Created plan (10 steps)
3. ✅ Wrote tests (manual verification)
4. ✅ Implemented refactoring (new PromptLoader service)
5. ✅ Updated documentation (CHANGELOG.md, docs/)
6. ✅ Committed with descriptive message

**Git commit:**
```
d423a97 refactor: Move prompts to Markdown files following Lesson 1.7 principles

- Created backend/prompts/ with Markdown files (SSOT)
- Created PromptLoader service for loading prompts
- Moved model settings to config.py (temperature, max_tokens)
- Removed hardcoded prompt from openrouter_service.py
- Added docs/prompt-system.md explaining the architecture
- Follows Lesson 1.7 principles: SSOT, Separation of Concerns

Statistics:
- 13 files changed, +597 lines, -2026 lines (eliminated duplication)
```

**Исходный код:**
- Git history shows refactoring: `git log --oneline`
- [backend/services/prompt_loader.py](../../../backend/services/prompt_loader.py) - New service
- [backend/prompts/](../../../backend/prompts/) - Extracted prompts

---

### Module 2: FastAPI + React

#### Lesson 2.1: Инициализация Backend (FastAPI)

**Применено:**

✅ **FastAPI app initialization**
```python
# backend/main.py
from fastapi import FastAPI

app = FastAPI(title="AI Learning Agent API")

@app.get("/")
async def root():
    return {"message": "AI Learning Agent API is running"}
```

✅ **CORS middleware**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

✅ **Uvicorn server**
```bash
uvicorn main:app --reload --port 8000
```

**Исходный код:**
- [backend/main.py](../../../backend/main.py) - FastAPI app

---

#### Lesson 2.2: Структура папок Backend (FastAPI)

**Применено:**

✅ **Recommended structure**
```
backend/
├── main.py              # FastAPI app
├── config.py            # Configuration
├── requirements.txt     # Dependencies
├── services/            # Business logic
│   ├── __init__.py
│   ├── context_service.py
│   ├── openrouter_service.py
│   └── prompt_loader.py
├── prompts/             # AI prompts
└── data/                # Application data
    └── lessons/
```

**Follows pattern from Lesson 2.2:**
```
app/
├── main.py              # ✅
├── config.py            # ✅
├── services/            # ✅ (our "models" equivalent)
└── data/                # ✅ (our "static files")
```

**Исходный код:**
- [backend/](../../../backend/) - Project structure

---

#### Lesson 2.3: Инициализация Frontend (React + Vite)

**Применено:**

✅ **Vite + React initialization**
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

✅ **Vite configuration**
```javascript
// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
```

**Исходный код:**
- [frontend/vite.config.js](../../../frontend/vite.config.js)
- [frontend/package.json](../../../frontend/package.json)

---

#### Lesson 2.4: Структура папок Frontend (React)

**Применено:**

✅ **Component-based structure**
```
frontend/src/
├── main.jsx             # Entry point
├── App.jsx              # Main component
├── config.js            # Configuration
├── components/
│   ├── layout/          # Layout components
│   ├── chat/            # Chat components
│   ├── leftSidebar/     # Sidebar components
│   └── rightSidebar/
└── services/
    └── api.js           # API calls
```

**Исходный код:**
- [frontend/src/](../../../frontend/src/) - Frontend structure

---

#### Lesson 2.5: Связка Backend + Frontend

**Применено:**

✅ **API integration**
```javascript
// frontend/src/services/api.js
import { API_BASE } from '../config.js'

export async function sendMessage(message, lessonIds, model) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, lesson_ids: lessonIds, model })
  })
  return await response.json()
}
```

✅ **CORS configuration** (allows Frontend → Backend)
```python
# backend/main.py
ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Frontend development server
    "http://localhost:5174"
]
```

**Исходный код:**
- [frontend/src/services/api.js](../../../frontend/src/services/api.js)
- [backend/main.py](../../../backend/main.py) - CORS config

---

## 🎓 AI Web Learning (41+ уроков)

### Module 1: Основы (5 уроков)

#### Lesson 1.1: Архитектура клиент-сервер

**Применено:**

✅ **Client-Server architecture**
```
React Frontend (Client)
   ↓ HTTP requests
   ↓ Port 5173 → 8000
   ↓
FastAPI Backend (Server)
   ↓ HTTP requests
   ↓
OpenRouter API (External Service)
```

**Где применено:**
- Frontend runs on port 5173
- Backend runs on port 8000
- Communication via HTTP/REST

---

#### Lesson 1.2: Основы HTTP протокола

**Применено:**

✅ **HTTP methods**
- GET `/api/models` - Get available models
- GET `/api/lessons` - Get lesson structure
- POST `/api/chat` - Send message to AI

✅ **HTTP status codes**
```python
# backend/main.py
if response.status_code != 200:
    raise HTTPException(status_code=500, detail="API error")
```

✅ **HTTP headers**
```python
self.headers = {
    "Authorization": f"Bearer {self.api_key}",
    "Content-Type": "application/json",
    "HTTP-Referer": "https://github.com/ai-learning-agent",
    "X-Title": "AI Learning Agent"
}
```

**Исходный код:**
- [backend/main.py](../../../backend/main.py) - HTTP endpoints
- [backend/services/openrouter_service.py](../../../backend/services/openrouter_service.py) - HTTP headers

---

#### Lesson 1.3: Формат данных JSON

**Применено:**

✅ **JSON request/response**
```json
// POST /api/chat request
{
  "message": "Что такое FastAPI?",
  "lesson_ids": ["ai-web-learning/2-backend/lesson-2-1-fastapi-intro"],
  "model": "google/gemini-2.5-flash-preview-09-2025"
}

// Response
{
  "response": "FastAPI — это современный веб-фреймворк...",
  "model_used": "google/gemini-2.5-flash-preview-09-2025",
  "tokens_used": 1250,
  "context_length": 3500
}
```

**Исходный код:**
- All API communication uses JSON format

---

#### Lesson 1.4: Принципы REST API

**Применено:**

✅ **RESTful endpoints**
```
GET  /api/models    - Collection of models
GET  /api/lessons   - Collection of lessons
POST /api/chat      - Create new chat completion
```

✅ **Resource-based URLs**
- `/api/models` - models resource
- `/api/lessons` - lessons resource
- `/api/chat` - chat resource

✅ **Stateless** - каждый запрос независимый

**Исходный код:**
- [backend/main.py](../../../backend/main.py) - REST endpoints

---

#### Lesson 1.5: Выбор фреймворка

**Применено:**

✅ **Backend choice: FastAPI**
- Modern Python framework
- Automatic API documentation
- Async support
- Type hints with Pydantic

✅ **Frontend choice: React + Vite**
- Component-based UI
- Fast development with Vite
- Large ecosystem

**Why these choices:**
- FastAPI: Best for Python AI/ML projects
- React: Industry standard for SPAs
- Vite: Modern, fast build tool

---

### Module 2: Backend (8 уроков)

#### Lesson 2.1: Введение в FastAPI

**Применено:**

✅ **FastAPI basic app** (см. выше Lesson 2.1 из Project Setup Guide)

---

#### Lesson 2.2: HTTP методы (GET, POST, PUT, DELETE)

**Применено:**

✅ **GET endpoints**
```python
@app.get("/api/models")
async def get_models():
    return {"models": config.AVAILABLE_MODELS}

@app.get("/api/lessons")
async def get_lessons():
    return context_service.get_all_lessons()
```

✅ **POST endpoint**
```python
@app.post("/api/chat")
async def chat(request: ChatRequest):
    result = await openrouter_service.chat(...)
    return ChatResponse(**result)
```

**Исходный код:**
- [backend/main.py](../../../backend/main.py) - HTTP methods

---

#### Lesson 2.3: Валидация данных с Pydantic

**Применено:**

✅ **Request validation**
```python
from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    message: str = Field(..., description="User's question")
    lesson_ids: List[str] = Field(default_factory=list)
    model: Optional[str] = Field(None)
    history: Optional[List[Dict]] = Field(default_factory=list)
```

✅ **Response model**
```python
class ChatResponse(BaseModel):
    response: str
    model_used: str
    tokens_used: Optional[int]
    context_length: int
```

**Benefits:**
- Automatic validation
- Type checking
- API documentation generation

**Исходный код:**
- [backend/main.py](../../../backend/main.py) - Pydantic models

---

#### Lesson 2.4: Обработка ошибок

**Применено:**

✅ **Try-except blocks**
```python
@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        context = context_service.get_context(request.lesson_ids)
        result = await openrouter_service.chat(...)
        return ChatResponse(**result)
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
```

✅ **Fallback mechanism**
```python
# OpenRouterService.chat()
try:
    # Try primary model
    result = await self._send_request(..., selected_model)
except Exception as e:
    # Try fallback model
    if selected_model != self.fallback_model:
        result = await self._send_request(..., self.fallback_model)
```

**Исходный код:**
- [backend/main.py](../../../backend/main.py) - Error handling
- [backend/services/openrouter_service.py](../../../backend/services/openrouter_service.py) - Fallback

---

#### Lesson 2.5: Middleware и CORS

**Применено:**

✅ **CORS middleware** (см. выше Lesson 2.1)

**Исходный код:**
- [backend/main.py](../../../backend/main.py) - CORS configuration

---

#### Lesson 2.6: Автогенерация документации API

**Применено:**

✅ **FastAPI auto-generated docs**
```
http://localhost:8000/docs       # Swagger UI
http://localhost:8000/redoc      # ReDoc
```

✅ **Docstrings for endpoints**
```python
@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    Chat with AI using selected lessons as context

    Request Body:
        message: User's question
        lesson_ids: List of lesson identifiers
        model: Optional model ID
    """
```

**Try it:** Start backend and open http://localhost:8000/docs

---

### Module 4: Frontend (6 уроков)

#### Lesson 4.3: Введение в React

**Применено:**

✅ **React components**
```javascript
// frontend/src/App.jsx
function App() {
  const [selectedLessons, setSelectedLessons] = useState([])
  const [messages, setMessages] = useState([])

  return (
    <AppLayout
      selectedLessons={selectedLessons}
      messages={messages}
      onLessonSelect={setSelectedLessons}
    />
  )
}
```

✅ **JSX syntax**
```jsx
<div className="app-layout">
  <LeftSidebar />
  <ChatPanel messages={messages} />
  <RightSidebar />
</div>
```

**Исходный код:**
- [frontend/src/App.jsx](../../../frontend/src/App.jsx)
- [frontend/src/components/](../../../frontend/src/components/)

---

#### Lesson 4.4: Компоненты и состояние

**Применено:**

✅ **useState hook**
```javascript
const [messages, setMessages] = useState([])
const [isLoading, setIsLoading] = useState(false)
```

✅ **useEffect hook**
```javascript
useEffect(() => {
  // Auto-scroll to bottom when new messages arrive
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [messages])
```

✅ **Props passing**
```jsx
<ChatPanel
  selectedLessons={selectedLessons}
  availableModels={availableModels}
  onModelChange={handleModelChange}
/>
```

**Исходный код:**
- [frontend/src/components/chat/ChatPanel.jsx](../../../frontend/src/components/chat/ChatPanel.jsx)

---

#### Lesson 4.2: Fetch API для запросов

**Применено:**

✅ **Fetch API**
```javascript
const response = await fetch(`${API_BASE}/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message, lesson_ids, model })
})
```

**Исходный код:**
- [frontend/src/services/api.js](../../../frontend/src/services/api.js)

---

### Module 5: Integration (3 урока)

#### Lesson 5.1: Связка Frontend + Backend

**Применено:**

✅ **Full integration** (см. выше Lesson 2.5 из Project Setup Guide)

---

#### Lesson 5.2: Обработка ошибок и загрузки

**Применено:**

✅ **Loading states**
```javascript
const [isLoading, setIsLoading] = useState(false)

const handleSendMessage = async (messageText) => {
  setIsLoading(true)
  try {
    const response = await sendMessage(...)
    setMessages(prev => [...prev, response])
  } catch (error) {
    // Show error message
  } finally {
    setIsLoading(false)
  }
}
```

✅ **Error UI**
```jsx
{isLoading && <div className="loading">AI is thinking...</div>}
{error && <div className="error">{error.message}</div>}
```

**Исходный код:**
- [frontend/src/components/chat/ChatPanel.jsx](../../../frontend/src/components/chat/ChatPanel.jsx)

---

### Module 9: RAG + AI Agent (8 уроков)

#### Lesson 9.5: Long Context vs RAG

**Применено:**

✅ **Long Context approach**
```python
# We use long context instead of RAG/embeddings
# Load selected lessons directly into prompt
context = "\n\n---\n\n".join([
    load_lesson(id) for id in lesson_ids
])

# Send full context to AI
system_prompt = f"""
{instructions}

## Course Materials

{context}
"""
```

**Why Long Context:**
- ✅ Simpler implementation
- ✅ Gemini 2.5 has 1M context window
- ✅ No need for vector database
- ✅ User controls which lessons to include

**Исходный код:**
- [backend/services/context_service.py](../../../backend/services/context_service.py)
- [backend/services/openrouter_service.py](../../../backend/services/openrouter_service.py)

---

#### Lesson 9.6: AI агент на Gemini

**Применено:**

✅ **Multi-model support**
- Google Gemini 2.5 Flash (default)
- Anthropic Claude Sonnet 4.5
- OpenAI GPT-4.1 Mini
- xAI Grok 4 Fast

✅ **OpenRouter integration**
```python
async with httpx.AsyncClient(timeout=60.0) as client:
    response = await client.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=self.headers,
        json=payload
    )
```

✅ **Model-specific parameters**
```python
model_config = self._get_model_config(model)
payload = {
    "model": model,
    "messages": messages,
    "temperature": model_config.get("temperature", 0.7),
    "max_tokens": model_config.get("max_tokens", 4000)
}
```

**Исходный код:**
- [backend/services/openrouter_service.py](../../../backend/services/openrouter_service.py)
- [backend/config.py](../../../backend/config.py) - Model configs

---

#### Lesson 9.7: Production оптимизация

**Применено:**

✅ **Caching**
```python
# PromptLoader caches Markdown files
self._cache: Dict[str, str] = {}
```

✅ **Async operations**
```python
# FastAPI async endpoints
@app.post("/api/chat")
async def chat(request: ChatRequest):
    result = await openrouter_service.chat(...)
```

✅ **Fallback mechanism** (см. выше Lesson 2.4)

✅ **Logging**
```python
logger.info(f"Sending request to OpenRouter with model: {model}")
logger.debug(f"Context length: {len(context)} characters")
```

**Исходный код:**
- [backend/services/prompt_loader.py](../../../backend/services/prompt_loader.py) - Caching
- [backend/services/openrouter_service.py](../../../backend/services/openrouter_service.py) - Async, fallback

---

## 📊 Summary

### Courses Coverage

| Course | Modules Used | Lessons Applied |
|--------|-------------|----------------|
| **Project Setup Guide** | 2/6 | 15/26 |
| **AI Web Learning** | 5/10 | 22/41+ |
| **Total** | 7/16 | 37/67+ |

### Most Important Lessons

1. ⭐⭐⭐ **Lesson 1.7 (Project Setup Guide)**: SSOT, Documentation
   - Foundation of entire architecture
2. ⭐⭐⭐ **Lesson 1.1 (Project Setup Guide)**: Separation of Concerns
   - Services layer, layered architecture
3. ⭐⭐ **Lesson 1.5 (Project Setup Guide)**: Environment Variables
   - Configuration management
4. ⭐⭐ **Lesson 9.6 (AI Web Learning)**: AI Agent
   - Core functionality
5. ⭐⭐ **Lesson 2.3 (AI Web Learning)**: Pydantic
   - Request/response validation

### Key Takeaway

**The project itself is a living example of the principles it teaches.**

Every architectural decision can be traced back to a specific lesson:
- Markdown prompts → Lesson 1.7 (SSOT)
- Services layer → Lesson 1.1 (Separation of Concerns)
- .env files → Lesson 1.5 (Configuration)
- Fallback mechanism → Lesson 2.4 (Error Handling)
- Multi-model support → Lesson 9.6 (AI Agent)

---

## 🔗 Связанные документы

- [Overview](overview.md) - Общий обзор проекта
- [Architecture](architecture.md) - Архитектура системы
- [Implementation](implementation.md) - Детали реализации
- [Integration Guide](integration-guide.md) - Как интегрировать

---

**Последнее обновление:** 2025-10-16
