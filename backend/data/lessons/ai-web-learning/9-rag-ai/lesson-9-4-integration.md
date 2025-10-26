# Урок 9.4: Интеграция AI агента в платформу

> **Модуль 9:** RAG + AI Агент  
> **Урок:** 9.4 (финальный)  
> **Длительность:** 2 часа  
> **Prerequisite:** Уроки 9.0, 9.1, 9.2, 9.3

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Интегрировать AI чат в Next.js + FastAPI архитектуру
- ✅ Создать красивый UI для чата
- ✅ Добавить контекстную помощь (чат знает текущий урок)
- ✅ Настроить аналитику использования AI
- ✅ Подготовить систему к production deployment
- ✅ Понимать best practices для AI помощников

---

## 🏗️ Часть 1: Архитектура интеграции

### Общая картина

```
┌──────────────────────────────────────────────────────┐
│        ОБРАЗОВАТЕЛЬНАЯ ПЛАТФОРМА С AI                │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Next.js Frontend (Vercel)                           │
│  ┌────────────────────────────────────────────┐    │
│  │  Уроки (SSG)                               │    │
│  │  ┌──────────────────────────────────────┐ │    │
│  │  │  # Урок 8.2: Server Actions          │ │    │
│  │  │  [контент урока...]                  │ │    │
│  │  │                                      │ │    │
│  │  │  ┌────────────────────────────────┐ │ │    │
│  │  │  │  💬 AI Помощник (плавающий)   │ │ │    │
│  │  │  │  Спросите что-то по уроку...  │ │ │    │
│  │  │  └────────────────────────────────┘ │ │    │
│  │  └──────────────────────────────────────┘ │    │
│  └────────────┬───────────────────────────────┘    │
│               │ WebSocket                           │
│               ↓                                     │
│  FastAPI Backend (Railway)                          │
│  ┌────────────────────────────────────────────┐    │
│  │  RAG System                                │    │
│  │  ├── Vector DB (pgvector)                 │    │
│  │  ├── LangChain QA Chain                   │    │
│  │  └── OpenAI GPT-3.5                       │    │
│  │                                            │    │
│  │  WebSocket /ws/chat/{lesson_id}           │    │
│  │  REST API /api/chat/history                │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 📱 Часть 2: UI/UX дизайн чата

### Варианты размещения чата

#### 1. Плавающая кнопка (рекомендуется)

```typescript
// app/components/FloatingChatButton.tsx
'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import AIChat from './AIChat'

export default function FloatingChatButton({ lessonId }: { lessonId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      {/* Плавающая кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Чат панель */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50">
          <AIChat lessonId={lessonId} />
        </div>
      )}
    </>
  )
}
```

#### 2. Sidebar (альтернатива)

```typescript
// app/lessons/[id]/layout.tsx
export default function LessonLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Контент урока */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      
      {/* AI чат sidebar */}
      <aside className="w-96 border-l">
        <AIChat lessonId={params.id} />
      </aside>
    </div>
  )
}
```

### Красивый дизайн компонента

```typescript
// app/components/AIChat.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Loader2, Bot, User } from 'lucide-react'

export default function AIChat({ lessonId }: { lessonId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState('')
  
  // ... WebSocket логика из Урока 9.3 ...
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white">
      {/* Header с градиентом */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">AI Помощник</h3>
            <p className="text-xs opacity-90">Задайте вопрос по уроку</p>
          </div>
        </div>
      </div>
      
      {/* Messages с улучшенным дизайном */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="w-16 h-16 mx-auto mb-4 text-blue-300" />
            <p className="text-sm">Привет! Я помогу разобраться с уроком.</p>
            <p className="text-xs mt-2">Задайте любой вопрос 👇</p>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* Avatar для AI */}
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
            )}
            
            {/* Message bubble */}
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-900 rounded-tl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              
              {/* Источники */}
              {msg.sources && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    📚 {msg.sources.join(', ')}
                  </p>
                </div>
              )}
            </div>
            
            {/* Avatar для пользователя */}
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {/* Streaming ответ с анимацией */}
        {isStreaming && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div className="max-w-[80%] p-3 rounded-2xl rounded-tl-none bg-gray-100">
              <p className="text-sm">{currentAnswer}</p>
              <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input с улучшенным дизайном */}
      <form onSubmit={sendMessage} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напишите вопрос..."
            disabled={isStreaming}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {isStreaming ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI может ошибаться. Проверяйте важную информацию.
        </p>
      </form>
    </div>
  )
}
```

---

## 🎯 Часть 3: Контекстная помощь

### Передача контекста урока

**Backend:**
```python
# backend/routers/chat.py
@router.websocket("/ws/chat/{lesson_id}/{user_id}")
async def chat_websocket(
    websocket: WebSocket,
    lesson_id: str,
    user_id: str
):
    await websocket.accept()
    
    # Получить текущий урок
    lesson = await db.lessons.find_unique(
        where={"id": lesson_id}
    )
    
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            question = message["question"]
            
            # RAG поиск с фильтром по текущему модулю
            chunks = await search_similar_chunks(
                query=question,
                k=3,
                filter={"module": lesson.module_id}  # Приоритет текущему модулю
            )
            
            # Добавить текущий урок в контекст
            context = f"Текущий урок: {lesson.title}\n\n"
            context += "\n\n".join([c.page_content for c in chunks])
            
            # Промпт с контекстом
            prompt = f"""Ты — AI помощник для образовательной платформы.

Студент сейчас изучает: {lesson.title}

Контекст из уроков:
{context}

Вопрос студента: {question}

Инструкции:
1. Если вопрос про текущий урок — используй информацию из него
2. Если нужна информация из других уроков — используй контекст
3. Будь понятным и дружелюбным
4. Укажи номера уроков-источников в конце

Ответ:"""
            
            # Streaming от OpenAI
            # ... (код из Урока 9.3)
            
    except WebSocketDisconnect:
        pass
```

### Быстрые подсказки

```typescript
// app/components/AIChat.tsx
const quickPrompts = [
  "Объясни проще",
  "Покажи пример",
  "В чём отличие от...",
  "Дай практическое задание"
]

return (
  <div className="chat-container">
    {messages.length === 0 && (
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">Быстрые вопросы:</p>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    )}
    
    {/* Messages */}
  </div>
)
```

---

## 📊 Часть 4: Аналитика использования

### Tracking в базе данных

```sql
-- PostgreSQL
CREATE TABLE ai_chat_analytics (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    lesson_id VARCHAR(255),
    question TEXT,
    answer_length INTEGER,
    sources TEXT[],
    response_time_ms INTEGER,
    thumbs_up BOOLEAN,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_lesson ON ai_chat_analytics(lesson_id);
CREATE INDEX idx_analytics_user ON ai_chat_analytics(user_id);
```

### Сохранение метрик

```python
# backend/routers/chat.py
import time

@router.websocket("/ws/chat/{lesson_id}/{user_id}")
async def chat_websocket(websocket, lesson_id, user_id):
    # ...
    
    while True:
        data = await websocket.receive_text()
        question = message["question"]
        
        start_time = time.time()
        
        # Получить ответ
        chunks = []
        answer = ""
        for chunk in stream_answer(question, lesson_id):
            answer += chunk
            chunks.append(chunk)
            await websocket.send_json({"type": "chunk", "content": chunk})
        
        response_time = int((time.time() - start_time) * 1000)
        
        # Сохранить аналитику
        await db.ai_chat_analytics.create({
            "user_id": user_id,
            "lesson_id": lesson_id,
            "question": question,
            "answer_length": len(answer),
            "sources": [c.metadata["lesson"] for c in sources],
            "response_time_ms": response_time
        })
```

### Thumbs up/down

```typescript
// app/components/AIChat.tsx
function MessageWithFeedback({ message, onFeedback }) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)
  
  async function handleFeedback(type: 'up' | 'down') {
    setFeedback(type)
    
    // Отправить на backend
    await fetch('/api/ai/feedback', {
      method: 'POST',
      body: JSON.stringify({
        message_id: message.id,
        feedback: type
      })
    })
  }
  
  return (
    <div className="message">
      <p>{message.content}</p>
      
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => handleFeedback('up')}
          className={feedback === 'up' ? 'text-green-500' : 'text-gray-400'}
        >
          👍
        </button>
        <button
          onClick={() => handleFeedback('down')}
          className={feedback === 'down' ? 'text-red-500' : 'text-gray-400'}
        >
          👎
        </button>
      </div>
    </div>
  )
}
```

### Dashboard для аналитики

```typescript
// app/admin/analytics/page.tsx
export default async function AnalyticsPage() {
  const stats = await fetch('/api/ai/analytics').then(r => r.json())
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">AI Chat Analytics</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Questions</p>
          <p className="text-3xl font-bold">{stats.totalQuestions}</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Avg Response Time</p>
          <p className="text-3xl font-bold">{stats.avgResponseTime}ms</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Satisfaction</p>
          <p className="text-3xl font-bold">{stats.satisfactionRate}%</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
        </div>
      </div>
      
      {/* Топ вопросов */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Top Questions</h2>
        <ul className="space-y-2">
          {stats.topQuestions.map((q, i) => (
            <li key={i} className="flex justify-between">
              <span className="text-sm">{q.question}</span>
              <span className="text-sm text-gray-500">{q.count}x</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

---

## 🚀 Часть 5: Production Deployment

### Environment Variables

```bash
# backend/.env
DATABASE_URL=postgresql://user:pass@host:5432/db
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...  # если используешь Pinecone
REDIS_URL=...  # для rate limiting (опционально)
```

```bash
# frontend/.env.local
NEXT_PUBLIC_WS_URL=wss://api.yourapp.com
NEXT_PUBLIC_API_URL=https://api.yourapp.com
```

### Rate Limiting с Redis

```python
# backend/middleware/rate_limit.py
import redis
from fastapi import HTTPException

redis_client = redis.Redis.from_url(os.getenv("REDIS_URL"))

async def check_rate_limit(user_id: str):
    """Проверить rate limit (10 запросов в минуту)"""
    key = f"rate_limit:{user_id}"
    
    count = redis_client.incr(key)
    
    if count == 1:
        redis_client.expire(key, 60)  # Истекает через 60 секунд
    
    if count > 10:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please wait."
        )
```

### Monitoring

```python
# backend/main.py
from prometheus_client import Counter, Histogram
import time

# Метрики
ai_questions_total = Counter(
    'ai_questions_total',
    'Total AI questions'
)

ai_response_time = Histogram(
    'ai_response_time_seconds',
    'AI response time'
)

@router.websocket("/ws/chat/{lesson_id}/{user_id}")
async def chat_websocket(websocket, lesson_id, user_id):
    # ...
    
    while True:
        question = await websocket.receive_text()
        
        start = time.time()
        
        # Получить ответ
        answer = get_ai_answer(question)
        
        # Метрики
        ai_questions_total.inc()
        ai_response_time.observe(time.time() - start)
        
        await websocket.send_text(answer)
```

### Caching ответов

```python
# backend/cache.py
import redis
import hashlib
import json

redis_client = redis.Redis.from_url(os.getenv("REDIS_URL"))

def get_cached_answer(question: str, lesson_id: str):
    """Получить кэшированный ответ"""
    key = hashlib.md5(f"{question}:{lesson_id}".encode()).hexdigest()
    cached = redis_client.get(f"answer:{key}")
    
    if cached:
        return json.loads(cached)
    
    return None

def cache_answer(question: str, lesson_id: str, answer: str):
    """Кэшировать ответ на 1 час"""
    key = hashlib.md5(f"{question}:{lesson_id}".encode()).hexdigest()
    redis_client.setex(
        f"answer:{key}",
        3600,  # 1 час
        json.dumps(answer)
    )
```

---

## 🎯 Часть 6: Best Practices

### 1. Промпт инжиниринг

```python
SYSTEM_PROMPT = """Ты — AI помощник для образовательной платформы по веб-разработке.

Твоя цель: помочь студентам понять материал.

Правила:
1. ✅ Отвечай на основе контекста из уроков
2. ✅ Если ответа нет — скажи "Не нашёл информацию"
3. ✅ Используй простые объяснения и примеры
4. ✅ Укажи номера уроков-источников
5. ❌ Не выдумывай факты
6. ❌ Не пиши код если не уверен
7. ❌ Не решай задачи за студента (подсказывай)

Тон: дружелюбный, как опытный наставник."""
```

### 2. Фильтрация вопросов

```python
def is_appropriate_question(question: str) -> bool:
    """Проверить что вопрос подходящий"""
    inappropriate_keywords = [
        "hack", "взлом", "пароль", "вирус"
    ]
    
    question_lower = question.lower()
    
    for keyword in inappropriate_keywords:
        if keyword in question_lower:
            return False
    
    return True
```

### 3. Fallback ответы

```python
FALLBACK_RESPONSES = [
    "Извините, я не нашёл информацию об этом в уроках. Попробуйте переформулировать вопрос.",
    "Этот вопрос выходит за рамки курса. Могу помочь с чем-то по текущему уроку?",
    "Я пока не знаю ответа на этот вопрос. Вы можете задать его преподавателю."
]

def get_fallback_response(question: str) -> str:
    # Выбрать случайный fallback
    return random.choice(FALLBACK_RESPONSES)
```

### 4. Безопасность

```python
# Не логировать чувствительную информацию
def log_question(question: str, user_id: str):
    # ❌ НЕ ТАК:
    logger.info(f"User {user_id} asked: {question}")
    
    # ✅ ТАК:
    logger.info(f"User {user_id[:8]}... asked question (length: {len(question)})")
```

---

## 🎓 Резюме урока

### Полная интеграция

```
Next.js (уроки) → Плавающая кнопка → AI Chat
                                       ↓
                               WebSocket + Streaming
                                       ↓
                           FastAPI + RAG + OpenAI
                                       ↓
                           Analytics + Caching
```

### UI/UX фичи

- ✅ Плавающая кнопка чата
- ✅ Streaming ответов
- ✅ Аватары для AI и пользователя
- ✅ Быстрые подсказки
- ✅ Thumbs up/down feedback

### Production готовность

- ✅ Environment variables
- ✅ Rate limiting
- ✅ Monitoring (Prometheus)
- ✅ Caching (Redis)
- ✅ Error handling
- ✅ Analytics dashboard

---

## 🎉 Модуль 9 завершён!

### Что ты создал

**Полноценный AI помощник для образовательной платформы:**

1. ✅ **RAG система** (500 уроков индексированы)
2. ✅ **Semantic search** (векторная БД)
3. ✅ **LangChain интеграция** (QA цепочки)
4. ✅ **Real-time чат** (WebSocket + Streaming)
5. ✅ **Контекстная помощь** (знает текущий урок)
6. ✅ **Аналитика** (метрики использования)
7. ✅ **Production ready** (rate limiting, caching)

### Стоимость

**Для 1000 студентов × 20 вопросов/месяц:**
- OpenAI API (GPT-3.5): ~$30/мес
- Хостинг (Railway): ~$20/мес
- **Итого: ~$50/месяц** ✅

### Следующие шаги

**Улучшения (опционально):**
1. Мультиязычность (переводы)
2. Голосовой ввод (Speech-to-Text)
3. Картинки в ответах
4. Персонализация под студента
5. A/B тестирование промптов

**Для твоей школы:**
- ✅ Готов к внедрению
- ✅ Можно масштабировать
- ✅ Метрики для улучшения

---

## 📝 Финальная проверка

1. **Что такое RAG?**
   - Ответ: Retrieval (поиск) + Augmented (дополнение) + Generation (генерация)

2. **Почему векторная БД?**
   - Ответ: Semantic search по смыслу, а не по словам

3. **Зачем LangChain?**
   - Ответ: Связывает все компоненты RAG системы

4. **Почему WebSocket для чата?**
   - Ответ: Постоянное соединение, streaming ответов

5. **Сколько стоит для 1000 студентов?**
   - Ответ: ~$50/месяц (OpenAI + хостинг)

---

## 🚀 Поздравляю!

**Ты освоил продвинутую AI интеграцию! 🎉**

Теперь ты можешь:
- Создавать RAG системы
- Интегрировать AI в веб-приложения
- Работать с векторными БД
- Строить production-ready чат-ботов

**Успехов в разработке твоей образовательной платформы! 💪**

---

## 📚 Полезные ресурсы

**Документация:**
- [LangChain Docs](https://python.langchain.com/)
- [OpenAI API](https://platform.openai.com/docs)
- [pgvector](https://github.com/pgvector/pgvector)
- [FastAPI WebSocket](https://fastapi.tiangolo.com/advanced/websockets/)

**Примеры проектов:**
- [LangChain Templates](https://github.com/langchain-ai/langchain/tree/master/templates)
- [OpenAI Cookbook](https://github.com/openai/openai-cookbook)

---

**Конец урока 9.4 и Модуля 9** ✅

**🎓 Модуль 9: RAG + AI Агент полностью завершён! 🎉**
