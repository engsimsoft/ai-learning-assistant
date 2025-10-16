# Integration Guide: AI Learning Agent

> Как адаптировать AI Learning Agent для своего проекта

## 🎯 Для кого этот гайд

Этот гайд поможет вам интегрировать AI Learning Agent (или его компоненты) в:
- 📚 **Онлайн-школу** — интерактивный помощник для студентов
- 📖 **Документацию** — AI-ассистент для поиска по docs
- 🏢 **Корпоративное обучение** — внутренний учебный портал
- 💼 **Любое приложение** с контентом + AI-помощником

## 🔧 Уровни интеграции

### Level 1: Полная копия (Easiest)

Клонируйте весь проект и адаптируйте контент.

**Что нужно изменить:**

1. **Замените контент** в `backend/data/lessons/`
```bash
# Удалите примеры
rm -rf backend/data/lessons/ai-web-learning
rm -rf backend/data/lessons/project-setup-guide

# Добавьте свои курсы
mkdir backend/data/lessons/my-course
# Создайте .md файлы с вашими уроками
```

2. **Обновите boundaries** в `backend/prompts/boundaries.md`
```markdown
# Knowledge Boundaries

## What I Know

### My Course Name (XX lessons)

**Module 1:** Topic 1 (5 lessons)
- Lesson 1.1: Title
- Lesson 1.2: Title
...
```

3. **Настройте system prompt** в `backend/prompts/system_prompt.md`
```markdown
# AI Tutor System Prompt

You are an AI tutor for [YOUR DOMAIN] with access to course materials.
Your role is to help students learn [YOUR TOPIC]...
```

4. **Обновите .env файлы**
```env
# backend/.env
OPENROUTER_API_KEY=your_key_here
```

5. **Запустите**
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

**Готово!** У вас есть AI-ассистент для вашего контента.

---

### Level 2: Backend Only (Medium)

Используйте только backend API, создайте свой frontend.

**Шаги:**

1. **Установите backend** (см. Level 1, шаги 1-4)

2. **Используйте API endpoints:**

```javascript
// Your custom frontend

// Get available models
const models = await fetch('http://localhost:8000/api/models')

// Get lessons structure
const lessons = await fetch('http://localhost:8000/api/lessons')

// Chat with AI
const response = await fetch('http://localhost:8000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "User's question",
    lesson_ids: ["course/module/lesson-1", "course/module/lesson-2"],
    model: "google/gemini-2.5-flash-preview-09-2025",
    history: []  // Optional conversation history
  })
})

const data = await response.json()
// data.response - AI's answer
// data.model_used - Model that answered
// data.tokens_used - Token usage
```

3. **Создайте свой UI:**
- Ваш дизайн
- Ваша навигация
- Ваша логика отображения

**Преимущества:**
- ✅ Полный контроль над UI
- ✅ Можно интегрировать в существующее приложение
- ✅ Backend handling AI logic

---

### Level 3: Specific Components (Advanced)

Используйте только нужные компоненты.

#### 3.1. Только Prompt System

**Use case:** У вас уже есть AI интеграция, нужна Markdown-based конфигурация.

**Что взять:**
```
backend/
├── prompts/                    # Copy this
│   ├── system_prompt.md
│   ├── boundaries.md
│   └── model_settings.md
├── services/
│   └── prompt_loader.py        # Copy this
└── config.py                   # Adapt PROMPTS_DIR
```

**Как использовать:**
```python
from services.prompt_loader import PromptLoader

# Initialize
prompt_loader = PromptLoader("path/to/prompts")

# Load prompt
system_prompt = prompt_loader.load_system_prompt()

# Build with context
full_prompt = prompt_loader.build_full_prompt(context="Your context here")

# Use with your AI API
response = your_ai_api.generate(full_prompt, user_message)
```

**Преимущества:**
- ✅ Easy prompt editing (Markdown files)
- ✅ Git version control for prompts
- ✅ SSOT principle (Lesson 1.7)

---

#### 3.2. Только OpenRouter Service

**Use case:** Нужна multi-model интеграция с fallback.

**Что взять:**
```
backend/
├── services/
│   └── openrouter_service.py   # Copy this
└── config.py                   # Copy AVAILABLE_MODELS
```

**Как использовать:**
```python
from services.openrouter_service import OpenRouterService
from services.prompt_loader import PromptLoader

# Initialize
prompt_loader = PromptLoader("prompts/")
openrouter = OpenRouterService(
    api_key="your-key",
    api_base="https://openrouter.ai/api/v1",
    default_model="google/gemini-2.5-flash-preview-09-2025",
    fallback_model="x-ai/grok-4-fast",
    prompt_loader=prompt_loader,
    model_configs=YOUR_MODEL_CONFIGS
)

# Use
response = await openrouter.chat(
    message="User question",
    context="Your context",
    model="google/gemini-2.5-flash-preview-09-2025"
)
```

**Преимущества:**
- ✅ Multiple AI models (Gemini, Claude, GPT, Grok)
- ✅ Automatic fallback if model fails
- ✅ Model-specific settings (temperature, max_tokens)

---

#### 3.3. Только Three-Panel Layout

**Use case:** Нужен Claude-style UI для своего приложения.

**Что взять:**
```
frontend/src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.jsx       # Copy this
│   │   ├── ResizeHandle.jsx    # Copy this
│   │   └── ResizeHandle.css
│   └── [adapt other components]
└── index.css                   # Copy color scheme
```

**Как адаптировать:**
```jsx
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <AppLayout
      leftPanel={<YourLeftSidebar />}
      centerPanel={<YourMainContent />}
      rightPanel={<YourRightSidebar />}  // Optional
    />
  )
}
```

**CSS Variables:**
```css
:root {
  --bg-primary: #1e1e1e;
  --bg-secondary: #252525;
  --text-primary: #e0e0e0;
  --accent-primary: #f97316;  /* Your brand color */
}
```

**Преимущества:**
- ✅ Professional Claude-style layout
- ✅ Resizable panels
- ✅ Dark theme
- ✅ Responsive design

---

## 📚 Use Case Examples

### Example 1: Онлайн-школа программирования

**Сценарий:** Студенты учат Python, нужен AI-помощник.

**Решение:** Level 1 (Full Copy)

**Изменения:**
1. Заменить уроки на курс по Python
2. Обновить `system_prompt.md`:
   ```markdown
   You are an AI tutor for Python programming.
   Help students learn Python by answering questions based on course materials.
   ```
3. Добавить специфичные инструкции:
   ```markdown
   ## Guidelines
   - Always show code examples
   - Explain concepts step-by-step
   - Encourage students to try code themselves
   ```

**Результат:**
- ✅ Students select Python lessons
- ✅ AI answers based on course materials
- ✅ Multi-model support (choose fastest/cheapest)

---

### Example 2: Документация компании

**Сценарий:** Большая документация, сотрудникам сложно найти ответы.

**Решение:** Level 2 (Backend Only)

**Изменения:**
1. Backend:
   - Загрузить документацию как "lessons" в `backend/data/lessons/company-docs/`
   - Обновить `boundaries.md` со списком документов
2. Frontend:
   - Создать минималистичный UI (просто search bar + chat)
   - Интегрировать в корпоративный портал

**Результат:**
- ✅ Employees ask questions
- ✅ AI answers from company docs
- ✅ Faster onboarding, less support tickets

---

### Example 3: Уже есть AI, нужна лучшая архитектура

**Сценарий:** AI уже интегрирован, но prompt hardcoded, сложно редактировать.

**Решение:** Level 3.1 (Prompt System Only)

**Изменения:**
1. Скопировать `prompt_loader.py`
2. Создать `prompts/` папку с Markdown файлами
3. Заменить hardcoded prompt на `prompt_loader.build_full_prompt()`

**Результат:**
- ✅ Prompts в Git
- ✅ Легко редактировать (открыть .md файл)
- ✅ Follows SSOT principle (Lesson 1.7)

---

### Example 4: Multi-model support для существующего приложения

**Сценарий:** Используете только OpenAI, хотите добавить Gemini/Claude.

**Решение:** Level 3.2 (OpenRouter Service Only)

**Изменения:**
1. Скопировать `openrouter_service.py`
2. Настроить `AVAILABLE_MODELS` в config
3. Заменить `openai.chat()` на `openrouter_service.chat()`

**Результат:**
- ✅ Users choose model
- ✅ Automatic fallback if model fails
- ✅ Save costs (use cheapest model)

---

## 🔐 Security Considerations

### 1. API Keys

**❌ NEVER commit .env files to Git**
```gitignore
# .gitignore
.env
```

**✅ Use .env.example for documentation**
```env
# .env.example
OPENROUTER_API_KEY=your_key_here
```

### 2. CORS Configuration

**Restrict allowed origins:**
```python
# backend/config.py
ALLOWED_ORIGINS = [
    "https://your-production-domain.com",
    "http://localhost:5173"  # Only for development
]
```

### 3. Rate Limiting

**Add rate limiting for production:**
```python
from fastapi import FastAPI
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/chat")
@limiter.limit("10/minute")  # Max 10 requests per minute
async def chat(request: ChatRequest):
    ...
```

### 4. Input Validation

**Already implemented with Pydantic:**
```python
class ChatRequest(BaseModel):
    message: str = Field(..., max_length=5000)  # Limit message length
    lesson_ids: List[str] = Field(..., max_items=20)  # Limit lessons
```

---

## 💰 Cost Optimization

### 1. Choose Right Model

**For cost-sensitive applications:**
```python
DEFAULT_MODEL = "x-ai/grok-4-fast"  # Currently FREE on OpenRouter
FALLBACK_MODEL = "google/gemini-2.5-flash-preview-09-2025"  # Very cheap
```

**For quality-sensitive applications:**
```python
DEFAULT_MODEL = "anthropic/claude-sonnet-4.5"  # Best quality
FALLBACK_MODEL = "google/gemini-2.5-flash-preview-09-2025"  # Good quality, cheaper
```

### 2. Limit Context Length

**Only load selected lessons:**
```python
# Good: User selects 3 lessons
context = context_service.get_context(["lesson-1", "lesson-2", "lesson-3"])

# Bad: Load all 72 lessons
# context = context_service.get_context(all_lesson_ids)  # ❌ Too expensive
```

### 3. Cache Responses

**Add caching for common questions:**
```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_cached_response(question: str, context_hash: str):
    # Return cached response if exists
    ...
```

### 4. Use Lower Temperature

**Lower temperature = fewer tokens:**
```python
"temperature": 0.3,  # More deterministic, cheaper
"max_tokens": 2000   # Limit response length
```

---

## 🚀 Deployment

### Option 1: Traditional Hosting

**Backend (FastAPI):**
```bash
# Install dependencies
pip install -r requirements.txt

# Run with Gunicorn (production)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

**Frontend (React):**
```bash
# Build for production
npm run build

# Serve with nginx or any static host
# Output: dist/ folder
```

**Platforms:**
- Railway.app (easiest for FastAPI)
- Vercel (for frontend)
- DigitalOcean, AWS, Google Cloud

---

### Option 2: Docker

**Create Dockerfile for backend:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Create Dockerfile for frontend:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    env_file:
      - ./backend/.env

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

---

## 📊 Monitoring & Analytics

### Add Logging

**Already implemented:**
```python
import logging
logger = logging.getLogger(__name__)

logger.info(f"Sending request to OpenRouter with model: {model}")
logger.debug(f"Context length: {len(context)} characters")
logger.error(f"API error: {e}")
```

### Track Usage

**Add to ChatResponse:**
```python
class ChatResponse(BaseModel):
    response: str
    model_used: str
    tokens_used: Optional[int]
    context_length: int
    timestamp: datetime  # Add this
```

**Store in database or log:**
```python
# Log usage for analytics
usage_logger.info({
    "user_id": user_id,
    "model": model_used,
    "tokens": tokens_used,
    "timestamp": datetime.now()
})
```

---

## 🔗 Дополнительные ресурсы

### Документация проекта
- [Overview](overview.md) - Общий обзор
- [Architecture](architecture.md) - Архитектура системы
- [Implementation](implementation.md) - Детали реализации
- [Lessons Applied](lessons-applied.md) - Применённые уроки

### Внешние ресурсы
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [OpenRouter API Docs](https://openrouter.ai/docs)
- [Vite Documentation](https://vitejs.dev/)

### Курсы (используемые в проекте)
- [Lesson 1.7: Documentation](../../../project-setup-guide/1-fundamentals/1.7%20Документация:%20правильная%20организация.md) - SSOT principles
- [Lesson 1.1: Project Organization](../../../project-setup-guide/1-fundamentals/1.1%20Философия%20правильной%20организации%20проекта.md) - Separation of Concerns
- [Lesson 9.6: Gemini AI Agent](../../../ai-web-learning/9-rag-ai/lesson-9-6-gemini-ai-agent.md) - AI integration

---

## 💬 Поддержка

**Вопросы по интеграции?**
- Изучите [architecture.md](architecture.md) для понимания системы
- Посмотрите [implementation.md](implementation.md) для деталей кода
- Проверьте [lessons-applied.md](lessons-applied.md) для концепций

**Нашли баг?**
- Проверьте логи backend: `uvicorn main:app --reload --log-level debug`
- Проверьте console frontend: F12 → Console

---

**Последнее обновление:** 2025-10-16

**Удачи с интеграцией! 🚀**
