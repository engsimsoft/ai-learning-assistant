# Implementation Details: AI Learning Agent

> Детальный разбор ключевых компонентов реализации

## 📁 Основные компоненты

### 1. Prompt System (Lesson 1.7: SSOT)

**Проблема до рефакторинга:**
```python
# Hardcoded prompt in openrouter_service.py
system_prompt = """
You are an AI tutor for web development.
...
(29 lines of hardcoded text)
"""

# Magic numbers
temperature = 0.7
max_tokens = 4000
```

**Решение (следует Lesson 1.7):**

#### 1.1. PromptLoader Service

[backend/services/prompt_loader.py](../../../backend/services/prompt_loader.py):
```python
class PromptLoader:
    """Service for loading prompts from Markdown files"""

    def __init__(self, prompts_dir: str):
        self.prompts_dir = prompts_dir
        self._cache: Dict[str, str] = {}

    def load_system_prompt(self) -> str:
        """Load main system prompt from system_prompt.md"""
        return self._load_file("system_prompt.md")

    def build_full_prompt(self, context: str) -> str:
        """Build complete system prompt with context"""
        system_prompt = self.load_system_prompt()
        # Replace {context} variable with actual lessons
        full_prompt = system_prompt.replace("{context}", context)
        return full_prompt

    def _load_file(self, filename: str) -> str:
        """Load markdown file with caching"""
        if filename in self._cache:
            return self._cache[filename]

        filepath = os.path.join(self.prompts_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            self._cache[filename] = content
            return content
```

**Преимущества:**
- ✅ Кэширование файлов для производительности
- ✅ Единственный источник правды (SSOT)
- ✅ Легко редактировать (просто открой Markdown файл)
- ✅ Git version control для промптов

#### 1.2. System Prompt Template

[backend/prompts/system_prompt.md](../../../backend/prompts/system_prompt.md):
```markdown
# AI Tutor System Prompt

You are an AI tutor for web development with access to course materials.
Your role is to help students learn by answering their questions using the provided lessons.

## Your Guidelines

1. **Answer based on lessons** - Use the course materials provided below
2. **Explain clearly** - Simple language, avoid unnecessary jargon
3. **Use examples** - Analogies and practical examples help understanding
4. **Be honest** - If information is not in the lessons, say so

## Course Materials

{context}

---

Now, please answer the student's question based on these materials.
```

**Ключевая особенность:**
- `{context}` — переменная, заменяется на выбранные уроки
- Markdown формат — легко читать и редактировать

#### 1.3. Model Settings Configuration

[backend/config.py](../../../backend/config.py):
```python
AVAILABLE_MODELS = [
    {
        "id": "google/gemini-2.5-flash-preview-09-2025",
        "name": "Gemini 2.5 Flash Preview",
        "description": "Latest Gemini, fast & cost-effective (default)",
        "context_length": 1000000,
        "temperature": 0.7,      # Balanced creativity/precision
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
```

**Почему такие настройки:**
- **Gemini 2.5 Flash:** `temperature=0.7` (сбалансированный) для общих вопросов
- **Claude Sonnet 4.5:** `temperature=0.5` (более фокусированный) для кода, `max_tokens=8000` для детальных объяснений

**Документация:** [backend/prompts/model_settings.md](../../../backend/prompts/model_settings.md)

### 2. OpenRouter Service (Multi-Model Support)

[backend/services/openrouter_service.py](../../../backend/services/openrouter_service.py)

#### 2.1. Initialization with Dependencies

```python
class OpenRouterService:
    def __init__(
        self,
        api_key: str,
        api_base: str,
        default_model: str,
        fallback_model: str,
        prompt_loader: PromptLoader,      # ← Dependency injection
        model_configs: List[Dict]         # ← From config.py
    ):
        self.api_key = api_key
        self.api_base = api_base
        self.default_model = default_model
        self.fallback_model = fallback_model
        self.prompt_loader = prompt_loader
        self.model_configs = {m["id"]: m for m in model_configs}

        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://github.com/ai-learning-agent",
            "X-Title": "AI Learning Agent"
        }
```

#### 2.2. Chat Method with Fallback

```python
async def chat(
    self,
    message: str,
    context: str,
    history: List[Dict] = None,
    model: Optional[str] = None
) -> Dict[str, Any]:
    """Send chat request with automatic fallback"""
    if history is None:
        history = []

    # Use specified model or default
    selected_model = model or self.default_model

    # Try primary model
    try:
        result = await self._send_request(message, context, history, selected_model)
        return result
    except Exception as e:
        logger.warning(f"Primary model {selected_model} failed: {e}")

        # Try fallback model
        if selected_model != self.fallback_model:
            logger.info(f"Attempting fallback to {self.fallback_model}")
            try:
                result = await self._send_request(message, context, history, self.fallback_model)
                return result
            except Exception as fallback_error:
                logger.error(f"Fallback model also failed: {fallback_error}")
                raise Exception(
                    f"Both primary ({selected_model}) and fallback ({self.fallback_model}) "
                    f"models failed. Please try again later."
                )
        else:
            raise
```

**Логика fallback:**
1. Попытка с выбранной моделью
2. Если ошибка → попытка с fallback моделью
3. Если обе failed → информативное сообщение пользователю

#### 2.3. Request Building

```python
async def _send_request(
    self,
    message: str,
    context: str,
    history: List[Dict],
    model: str
) -> Dict[str, Any]:
    # 1. Build system prompt with context
    system_prompt = self._build_system_prompt(context)

    # 2. Build messages array
    messages = [{"role": "system", "content": system_prompt}]

    # Add conversation history
    for msg in history:
        messages.append({
            "role": msg.get("role", "user"),
            "content": msg.get("content", "")
        })

    # Add current user message
    messages.append({"role": "user", "content": message})

    # 3. Get model-specific configuration
    model_config = self._get_model_config(model)

    # 4. Prepare request payload
    payload = {
        "model": model,
        "messages": messages,
        "temperature": model_config.get("temperature", 0.7),
        "max_tokens": model_config.get("max_tokens", 4000),
        "top_p": model_config.get("top_p", 1.0)
    }

    logger.info(f"Sending request to OpenRouter with model: {model}")
    logger.debug(f"Context length: {len(context)} characters")
    logger.debug(f"Total messages: {len(messages)}")

    # 5. Send request
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            f"{self.api_base}/chat/completions",
            headers=self.headers,
            json=payload
        )

        if response.status_code != 200:
            error_text = response.text
            logger.error(f"OpenRouter API error {response.status_code}: {error_text}")
            raise Exception(f"OpenRouter API error: {error_text}")

        data = response.json()

    # 6. Extract response
    ai_response = data["choices"][0]["message"]["content"]
    tokens_used = data.get("usage", {}).get("total_tokens")

    logger.info(f"Received response, tokens used: {tokens_used}")

    return {
        "response": ai_response,
        "model_used": model,
        "tokens_used": tokens_used,
        "context_length": len(context)
    }
```

#### 2.4. Helper Methods

```python
def _build_system_prompt(self, context: str) -> str:
    """Build system prompt using PromptLoader"""
    return self.prompt_loader.build_full_prompt(context)

def _get_model_config(self, model_id: str) -> Dict:
    """Get configuration for specific model"""
    return self.model_configs.get(model_id, {})
```

### 3. Context Service (Lesson Loading)

[backend/services/context_service.py](../../../backend/services/context_service.py)

```python
class ContextService:
    """Service for loading lesson context"""

    def __init__(self, lessons_dir: str):
        self.lessons_dir = lessons_dir

    def get_context(self, lesson_ids: List[str]) -> str:
        """
        Load multiple lessons and combine into context

        Args:
            lesson_ids: List of lesson identifiers
                       (e.g., ["ai-web-learning/1-basics/lesson-01-client-server"])

        Returns:
            Combined lessons text
        """
        if not lesson_ids:
            return ""

        lessons = []
        for lesson_id in lesson_ids:
            try:
                lesson_content = self._load_lesson(lesson_id)
                lessons.append(lesson_content)
            except FileNotFoundError:
                logger.warning(f"Lesson not found: {lesson_id}")
                continue

        return "\n\n---\n\n".join(lessons)

    def _load_lesson(self, lesson_id: str) -> str:
        """Load single lesson file"""
        # Convert lesson_id to file path
        # "ai-web-learning/1-basics/lesson-01-client-server"
        # → "backend/data/lessons/ai-web-learning/1-basics/lesson-01-client-server.md"

        lesson_path = os.path.join(self.lessons_dir, f"{lesson_id}.md")

        if not os.path.exists(lesson_path):
            # Try .txt extension
            lesson_path = os.path.join(self.lessons_dir, f"{lesson_id}.txt")

        if not os.path.exists(lesson_path):
            raise FileNotFoundError(f"Lesson file not found: {lesson_id}")

        with open(lesson_path, 'r', encoding='utf-8') as f:
            return f.read()

    def get_all_lessons(self) -> Dict:
        """
        Scan lessons directory and return structure

        Returns:
            Dictionary with courses, modules, lessons
        """
        # Implementation scans backend/data/lessons/
        # and builds hierarchical structure
        # Used by GET /api/lessons endpoint
        ...
```

### 4. Main Application (FastAPI)

[backend/main.py](../../../backend/main.py)

#### 4.1. Initialization

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services import ContextService, OpenRouterService, PromptLoader
from config import config

# Validate configuration
config.validate()

app = FastAPI(title="AI Learning Agent API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
logger.info(f"Loading prompts from: {config.PROMPTS_DIR}")
prompt_loader = PromptLoader(config.PROMPTS_DIR)
logger.info("Prompts loaded successfully")

context_service = ContextService(config.LESSONS_DIR)

openrouter_service = OpenRouterService(
    api_key=config.OPENROUTER_API_KEY,
    api_base=config.OPENROUTER_API_BASE,
    default_model=config.DEFAULT_MODEL,
    fallback_model=config.FALLBACK_MODEL,
    prompt_loader=prompt_loader,
    model_configs=config.AVAILABLE_MODELS
)
```

#### 4.2. Endpoints

```python
@app.get("/api/models")
async def get_models():
    """Get available AI models"""
    return {"models": config.AVAILABLE_MODELS}

@app.get("/api/lessons")
async def get_lessons():
    """Get lesson structure"""
    lessons_structure = context_service.get_all_lessons()
    return lessons_structure

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    Chat with AI using selected lessons as context

    Request Body:
        message: User's question
        lesson_ids: List of lesson identifiers
        model: Optional model ID (uses default if not specified)
        history: Optional conversation history
    """
    try:
        # Load context from selected lessons
        context = context_service.get_context(request.lesson_ids)

        # Send to AI
        result = await openrouter_service.chat(
            message=request.message,
            context=context,
            history=request.history or [],
            model=request.model
        )

        return ChatResponse(**result)

    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
```

#### 4.3. Pydantic Models (Lesson 2.3)

```python
from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class ChatRequest(BaseModel):
    """Request model for /api/chat endpoint"""
    message: str = Field(..., description="User's question")
    lesson_ids: List[str] = Field(default_factory=list, description="Selected lesson IDs")
    model: Optional[str] = Field(None, description="AI model to use")
    history: Optional[List[Dict]] = Field(default_factory=list, description="Conversation history")

class ChatResponse(BaseModel):
    """Response model for /api/chat endpoint"""
    response: str = Field(..., description="AI's response")
    model_used: str = Field(..., description="Model that generated response")
    tokens_used: Optional[int] = Field(None, description="Tokens consumed")
    context_length: int = Field(..., description="Context size in characters")
```

### 5. Frontend API Service

[frontend/src/services/api.js](../../../frontend/src/services/api.js)

```javascript
import { API_BASE } from '../config.js'

/**
 * Fetch available AI models
 */
export async function fetchModels() {
  try {
    const response = await fetch(`${API_BASE}/models`)
    if (!response.ok) throw new Error('Failed to fetch models')
    return await response.json()
  } catch (error) {
    console.error('Error fetching models:', error)
    throw error
  }
}

/**
 * Fetch lesson structure
 */
export async function fetchLessons() {
  try {
    const response = await fetch(`${API_BASE}/lessons`)
    if (!response.ok) throw new Error('Failed to fetch lessons')
    return await response.json()
  } catch (error) {
    console.error('Error fetching lessons:', error)
    throw error
  }
}

/**
 * Send message to AI
 */
export async function sendMessage(message, lessonIds, model = null, history = []) {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        lesson_ids: lessonIds,
        model,
        history
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to send message')
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}
```

### 6. React Chat Component

[frontend/src/components/chat/ChatPanel.jsx](../../../frontend/src/components/chat/ChatPanel.jsx)

```javascript
import React, { useState, useEffect, useRef } from 'react'
import { sendMessage } from '../../services/api.js'
import ChatMessage from './ChatMessage.jsx'
import ChatInput from './ChatInput.jsx'
import ModelSelector from './ModelSelector.jsx'

function ChatPanel({ selectedLessons, availableModels, selectedModel, onModelChange }) {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return

    // Add user message to UI
    const userMessage = { role: 'user', content: messageText }
    setMessages(prev => [...prev, userMessage])

    setIsLoading(true)

    try {
      // Send to backend
      const response = await sendMessage(
        messageText,
        selectedLessons,
        selectedModel,
        messages  // Send conversation history
      )

      // Add AI response to UI
      const aiMessage = {
        role: 'assistant',
        content: response.response,
        model: response.model_used,
        tokens: response.tokens_used
      }
      setMessages(prev => [...prev, aiMessage])

    } catch (error) {
      console.error('Error:', error)
      // Show error message in chat
      const errorMessage = {
        role: 'system',
        content: `Error: ${error.message}. Please try again.`
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <ModelSelector
          models={availableModels}
          selectedModel={selectedModel}
          onModelChange={onModelChange}
        />
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="loading-indicator">AI is thinking...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSend={handleSendMessage}
        disabled={isLoading || selectedLessons.length === 0}
      />
    </div>
  )
}

export default ChatPanel
```

## 🔧 Key Implementation Decisions

### 1. Why Markdown for Prompts?

**Альтернативы:**
- Hardcoded в Python ❌
- JSON файлы ❌
- Database ❌
- **Markdown ✅**

**Причины выбора Markdown:**
- ✅ Человекочитаемый формат
- ✅ Git version control
- ✅ Легко редактировать (любой текстовый редактор)
- ✅ Supports formatting (headers, lists, code blocks)
- ✅ Follows Lesson 1.7 (SSOT, documentation)

### 2. Why Separate PromptLoader Service?

**Follows Lesson 1.1 (Separation of Concerns):**
- `PromptLoader` — отвечает ТОЛЬКО за загрузку промптов
- `OpenRouterService` — отвечает ТОЛЬКО за API запросы
- `ContextService` — отвечает ТОЛЬКО за загрузку уроков

**Преимущества:**
- ✅ Легко тестировать каждый сервис отдельно
- ✅ Легко заменить реализацию (например, на database)
- ✅ Чистая архитектура

### 3. Why Model-Specific Settings in config.py?

**Альтернативы:**
- Hardcoded в OpenRouterService ❌
- Переданы от frontend ❌
- **Централизовано в config.py ✅**

**Причины:**
- ✅ SSOT (Lesson 1.7) - одно место для всех настроек моделей
- ✅ Легко добавить новую модель
- ✅ Документировано в model_settings.md
- ✅ Backend контролирует параметры (безопасность)

### 4. Why Fallback Mechanism?

**Причины:**
- ✅ Надёжность: если одна модель недоступна, используется другая
- ✅ User experience: пользователь не видит ошибку
- ✅ Логирование: можно отследить проблемы

**Пример из логов:**
```
WARNING: Primary model google/gemini-2.5-flash-preview-09-2025 failed: Rate limit exceeded
INFO: Attempting fallback to x-ai/grok-4-fast
INFO: Received response, tokens used: 1250
```

### 5. Why Three-Panel Layout?

**Inspired by:** Claude.ai interface

**Преимущества:**
- ✅ Left: Course navigation (всегда видна структура)
- ✅ Center: Chat (основной фокус)
- ✅ Right: Optional context (можно скрыть для большего пространства)
- ✅ Resizable panels (пользователь настраивает под себя)

## 🔗 Связанные документы

- [Overview](overview.md) - Общий обзор проекта
- [Architecture](architecture.md) - Архитектура системы
- [Lessons Applied](lessons-applied.md) - Применённые уроки из курса
- [Integration Guide](integration-guide.md) - Как интегрировать в свой проект

---

**Последнее обновление:** 2025-10-16
