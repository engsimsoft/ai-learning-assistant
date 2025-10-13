# Урок 9.3: WebSocket для real-time чата

> **Модуль 9:** RAG + AI Агент  
> **Урок:** 9.3  
> **Длительность:** 2.5 часа  
> **Prerequisite:** Уроки 9.0, 9.1, 9.2

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать разницу между HTTP и WebSocket
- ✅ Создавать WebSocket endpoints в FastAPI
- ✅ Подключаться к WebSocket из React
- ✅ Реализовывать streaming ответов от OpenAI
- ✅ Обрабатывать ошибки и переподключения
- ✅ Создать полноценный real-time чат с AI

---

## 📖 Часть 1: HTTP vs WebSocket

### Главный вопрос

**"Как сделать чат с AI интерактивным в реальном времени?"**

### Проблема с обычным HTTP

**HTTP — request/response модель:**
```
┌──────────────────────────────────────────────────┐
│              HTTP REQUEST/RESPONSE               │
├──────────────────────────────────────────────────┤
│                                                  │
│  Frontend              Backend                   │
│                                                  │
│  ┌──────────┐          ┌──────────┐            │
│  │          │─POST────→│          │            │
│  │          │ вопрос   │          │            │
│  │          │          │ думает.. │            │
│  │  ждёт... │          │ думает.. │            │
│  │  ждёт... │          │ думает.. │            │
│  │          │←─────────│          │            │
│  │          │  ответ   │          │            │
│  └──────────┘          └──────────┘            │
│                                                  │
│  ❌ Нет промежуточных обновлений                │
│  ❌ Ответ приходит целиком в конце              │
│                                                  │
└──────────────────────────────────────────────────┘
```

**UX проблема:**
```
Студент: "Объясни что такое RAG система"
         [ждёт... 5 секунд]
         [ждёт... 10 секунд]
AI: "RAG система — это..." (весь текст сразу)

❌ Кажется что зависло!
❌ Не видно прогресса
```

### Решение: WebSocket + Streaming

**WebSocket — постоянное соединение:**
```
┌──────────────────────────────────────────────────┐
│              WEBSOCKET CONNECTION                │
├──────────────────────────────────────────────────┤
│                                                  │
│  Frontend              Backend                   │
│                                                  │
│  ┌──────────┐          ┌──────────┐            │
│  │          │──────────│          │            │
│  │          │ постоянное│          │            │
│  │          │ соединение│          │            │
│  │          │          │          │            │
│  │          │←─────────│"RAG"     │            │
│  │          │←─────────│" система"│            │
│  │          │←─────────│" — это"  │            │
│  │          │←─────────│"..."     │            │
│  └──────────┘          └──────────┘            │
│                                                  │
│  ✅ Streaming ответа (по частям)                │
│  ✅ Как ChatGPT — слово за словом               │
│                                                  │
└──────────────────────────────────────────────────┘
```

**UX улучшение:**
```
Студент: "Объясни что такое RAG система"
AI: "RAG"
AI: " система"
AI: " — это"
AI: " технология..."
AI: " которая..."

✅ Видно что AI думает!
✅ Ответ появляется постепенно
```

### Сравнительная таблица

| **Аспект** | **HTTP** | **WebSocket** |
|---|---|---|
| **Соединение** | Новое для каждого запроса | Одно постоянное |
| **Направление** | Только client → server | Двунаправленное |
| **Latency** | Высокая (новый TCP) | Низкая |
| **Streaming** | ❌ Нет | ✅ Да |
| **Для чата** | ❌ Не оптимально | ✅ Идеально |

---

## 🔌 Часть 2: WebSocket в FastAPI

### Установка

WebSocket встроен в FastAPI! Ничего устанавливать не нужно.

### Простой пример

```python
# backend/main.py
from fastapi import FastAPI, WebSocket

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # 1. Принять соединение
    await websocket.accept()
    
    # 2. Цикл получения/отправки сообщений
    while True:
        # Получить сообщение от клиента
        data = await websocket.receive_text()
        print(f"Получено: {data}")
        
        # Отправить ответ клиенту
        await websocket.send_text(f"Эхо: {data}")
```

**Тест:**
```bash
# Установить wscat для тестирования
npm install -g wscat

# Подключиться
wscat -c ws://localhost:8000/ws

# Отправить сообщение
> Hello
< Эхо: Hello
```

### WebSocket для AI чата

```python
# backend/routers/chat.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from rag.agent import ai_agent
import json

router = APIRouter()

@router.websocket("/ws/chat/{user_id}")
async def chat_websocket(websocket: WebSocket, user_id: str):
    """WebSocket endpoint для чата с AI"""
    await websocket.accept()
    
    try:
        while True:
            # Получить вопрос от студента
            data = await websocket.receive_text()
            message = json.loads(data)
            question = message["question"]
            
            # Получить ответ от AI агента
            answer = ai_agent.ask(question, user_id)
            
            # Отправить ответ студенту
            await websocket.send_json({
                "type": "answer",
                "content": answer
            })
    
    except WebSocketDisconnect:
        print(f"Client {user_id} disconnected")
```

### Подключение из React

```typescript
// frontend/src/hooks/useAIChat.ts
import { useEffect, useState } from 'react'

export function useAIChat(userId: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  
  useEffect(() => {
    // Подключиться к WebSocket
    const websocket = new WebSocket(
      `ws://localhost:8000/ws/chat/${userId}`
    )
    
    websocket.onopen = () => {
      console.log('Connected to AI chat')
    }
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'answer') {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.content
        }])
      }
    }
    
    websocket.onclose = () => {
      console.log('Disconnected from AI chat')
    }
    
    setWs(websocket)
    
    return () => websocket.close()
  }, [userId])
  
  function sendMessage(question: string) {
    if (!ws) return
    
    // Добавить вопрос в UI
    setMessages(prev => [...prev, {
      role: 'user',
      content: question
    }])
    
    // Отправить на сервер
    ws.send(JSON.stringify({ question }))
  }
  
  return { messages, sendMessage }
}
```

---

## 📡 Часть 3: Streaming ответов от OpenAI

### Что такое Streaming?

**Обычный режим:**
```python
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Explain RAG"}]
)

answer = response.choices[0].message.content
# Ждём 5 секунд → получаем весь ответ сразу
```

**Streaming режим:**
```python
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Explain RAG"}],
    stream=True  # ← Streaming!
)

for chunk in response:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end='')  # "RAG" " is" " a" " technique"...
```

### Streaming через WebSocket

```python
# backend/routers/chat.py
from fastapi import WebSocket
import openai
import json

@router.websocket("/ws/chat/{user_id}")
async def chat_websocket(websocket: WebSocket, user_id: str):
    await websocket.accept()
    
    try:
        while True:
            # Получить вопрос
            data = await websocket.receive_text()
            message = json.loads(data)
            question = message["question"]
            
            # Получить релевантные chunks из RAG
            from rag.search import search_similar_chunks
            chunks = search_similar_chunks(question, k=3)
            
            # Создать контекст
            context = "\n\n".join([c.page_content for c in chunks])
            
            # Промпт
            prompt = f"""Используй следующий контекст из уроков:

{context}

Вопрос студента: {question}

Ответ:"""
            
            # Streaming от OpenAI
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                stream=True  # Streaming!
            )
            
            # Отправлять каждый chunk студенту
            for chunk in response:
                delta = chunk.choices[0].delta.content
                if delta:
                    await websocket.send_json({
                        "type": "chunk",
                        "content": delta
                    })
            
            # Конец ответа
            await websocket.send_json({
                "type": "end"
            })
    
    except WebSocketDisconnect:
        print(f"Client disconnected")
```

### React компонент с streaming

```typescript
// frontend/src/components/AIChat.tsx
'use client'

import { useState, useEffect } from 'react'

export default function AIChat({ userId }: { userId: string }) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  
  useEffect(() => {
    const websocket = new WebSocket(
      `ws://localhost:8000/ws/chat/${userId}`
    )
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'chunk') {
        // Добавить chunk к текущему ответу
        setCurrentAnswer(prev => prev + data.content)
        setIsStreaming(true)
      }
      
      if (data.type === 'end') {
        // Ответ закончен
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: currentAnswer
        }])
        setCurrentAnswer('')
        setIsStreaming(false)
      }
    }
    
    setWs(websocket)
    return () => websocket.close()
  }, [userId])
  
  function sendMessage(question: string) {
    if (!ws) return
    
    // Добавить вопрос
    setMessages(prev => [...prev, {
      role: 'user',
      content: question
    }])
    
    // Отправить
    ws.send(JSON.stringify({ question }))
  }
  
  return (
    <div className="chat-container">
      {/* История сообщений */}
      {messages.map((msg, i) => (
        <div key={i} className={`message ${msg.role}`}>
          {msg.content}
        </div>
      ))}
      
      {/* Текущий streaming ответ */}
      {isStreaming && (
        <div className="message assistant streaming">
          {currentAnswer}
          <span className="cursor">|</span>
        </div>
      )}
      
      {/* Форма ввода */}
      <ChatInput onSend={sendMessage} disabled={isStreaming} />
    </div>
  )
}
```

**Результат:**
```
Студент: "Что такое embeddings?"

AI: "Em"
AI: "beddings"
AI: " — это"
AI: " векторные"
AI: " представления"
AI: " текста..."

✅ Как в ChatGPT!
```

---

## 🛡️ Часть 4: Обработка ошибок

### Reconnection (переподключение)

```typescript
// frontend/src/hooks/useWebSocket.ts
export function useWebSocket(url: string, userId: string) {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const reconnectTimeout = useRef<NodeJS.Timeout>()
  
  function connect() {
    const websocket = new WebSocket(url)
    
    websocket.onopen = () => {
      console.log('WebSocket connected')
      setIsConnected(true)
    }
    
    websocket.onclose = () => {
      console.log('WebSocket disconnected')
      setIsConnected(false)
      
      // Переподключиться через 3 секунды
      reconnectTimeout.current = setTimeout(() => {
        console.log('Reconnecting...')
        connect()
      }, 3000)
    }
    
    websocket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    
    setWs(websocket)
  }
  
  useEffect(() => {
    connect()
    
    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current)
      }
      ws?.close()
    }
  }, [url])
  
  return { ws, isConnected }
}
```

### Timeout защита

```python
# backend/routers/chat.py
import asyncio
from fastapi import WebSocket, WebSocketDisconnect

@router.websocket("/ws/chat/{user_id}")
async def chat_websocket(websocket: WebSocket, user_id: str):
    await websocket.accept()
    
    try:
        while True:
            # Timeout 60 секунд
            data = await asyncio.wait_for(
                websocket.receive_text(),
                timeout=60.0
            )
            
            # Обработка...
            
    except asyncio.TimeoutError:
        await websocket.send_json({
            "type": "error",
            "message": "Connection timeout"
        })
        await websocket.close()
    
    except WebSocketDisconnect:
        print(f"Client {user_id} disconnected")
```

### Rate limiting

```python
# backend/routers/chat.py
from collections import defaultdict
from datetime import datetime, timedelta

# Хранилище последних запросов
user_requests = defaultdict(list)

@router.websocket("/ws/chat/{user_id}")
async def chat_websocket(websocket: WebSocket, user_id: str):
    await websocket.accept()
    
    try:
        while True:
            data = await websocket.receive_text()
            
            # Rate limiting: максимум 10 запросов в минуту
            now = datetime.now()
            user_requests[user_id] = [
                t for t in user_requests[user_id]
                if now - t < timedelta(minutes=1)
            ]
            
            if len(user_requests[user_id]) >= 10:
                await websocket.send_json({
                    "type": "error",
                    "message": "Too many requests. Please wait."
                })
                continue
            
            user_requests[user_id].append(now)
            
            # Обработка вопроса...
            
    except WebSocketDisconnect:
        del user_requests[user_id]
```

---

## 💾 Часть 5: Сохранение истории чатов

### База данных для чатов

```sql
-- PostgreSQL
CREATE TABLE chat_sessions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES chat_sessions(id),
    role VARCHAR(50) NOT NULL,  -- 'user' or 'assistant'
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_session 
ON chat_messages(session_id);
```

### Сохранение сообщений

```python
# backend/routers/chat.py
from database import db

@router.websocket("/ws/chat/{user_id}")
async def chat_websocket(websocket: WebSocket, user_id: str):
    await websocket.accept()
    
    # Создать новую сессию чата
    session = await db.chat_sessions.create({
        "user_id": user_id
    })
    
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            question = message["question"]
            
            # Сохранить вопрос пользователя
            await db.chat_messages.create({
                "session_id": session.id,
                "role": "user",
                "content": question
            })
            
            # Получить ответ от AI
            answer = ""
            for chunk in stream_answer(question, user_id):
                answer += chunk
                await websocket.send_json({
                    "type": "chunk",
                    "content": chunk
                })
            
            # Сохранить ответ AI
            await db.chat_messages.create({
                "session_id": session.id,
                "role": "assistant",
                "content": answer
            })
            
            await websocket.send_json({"type": "end"})
    
    except WebSocketDisconnect:
        pass
```

### Загрузка истории

```python
# backend/routers/chat.py
@app.get("/api/chat/history/{user_id}")
async def get_chat_history(user_id: str):
    """Получить историю чатов пользователя"""
    sessions = await db.chat_sessions.find_many(
        where={"user_id": user_id},
        include={"messages": True},
        order_by={"created_at": "desc"},
        take=10
    )
    
    return sessions
```

---

## 🎨 Часть 6: UI для чата

### Полный компонент чата

```typescript
// app/components/AIChat.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChat({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Автоскролл вниз
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, currentAnswer])
  
  // WebSocket подключение
  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8000/ws/chat/${userId}`
    )
    
    ws.onopen = () => setIsConnected(true)
    ws.onclose = () => setIsConnected(false)
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'chunk') {
        setCurrentAnswer(prev => prev + data.content)
        setIsStreaming(true)
      }
      
      if (data.type === 'end') {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: currentAnswer
        }])
        setCurrentAnswer('')
        setIsStreaming(false)
      }
      
      if (data.type === 'error') {
        alert(data.message)
      }
    }
    
    wsRef.current = ws
    return () => ws.close()
  }, [userId])
  
  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || !wsRef.current || isStreaming) return
    
    // Добавить вопрос в UI
    setMessages(prev => [...prev, {
      role: 'user',
      content: input
    }])
    
    // Отправить на сервер
    wsRef.current.send(JSON.stringify({
      question: input
    }))
    
    setInput('')
  }
  
  return (
    <div className="flex flex-col h-[600px] border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <h3 className="font-semibold">AI Помощник</h3>
        <p className="text-sm text-gray-600">
          {isConnected ? '🟢 Подключен' : '🔴 Отключен'}
        </p>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        
        {/* Streaming ответ */}
        {isStreaming && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100">
              {currentAnswer}
              <span className="animate-pulse">|</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Задайте вопрос..."
            disabled={!isConnected || isStreaming}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!isConnected || isStreaming || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isStreaming ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
```

---

## 🎓 Резюме урока

### HTTP vs WebSocket

**HTTP:**
- Request/response модель
- Новое соединение каждый раз
- Нет streaming

**WebSocket:**
- Постоянное соединение
- Двунаправленное
- Streaming поддерживается ✅

### Streaming ответов

```python
# OpenAI streaming
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[...],
    stream=True  # ← Streaming
)

for chunk in response:
    # Отправить chunk через WebSocket
    await websocket.send_json({
        "type": "chunk",
        "content": chunk.choices[0].delta.content
    })
```

### Обработка ошибок

- Reconnection автоматическое
- Timeout защита (60 секунд)
- Rate limiting (10 req/min)

### Сохранение истории

```sql
chat_sessions → chat_messages (role, content)
```

---

## 📝 Проверка понимания

1. **Чем WebSocket отличается от HTTP?**
   - Ответ: Постоянное соединение vs новое для каждого запроса

2. **Что такое streaming?**
   - Ответ: Отправка ответа частями по мере генерации

3. **Как включить streaming в OpenAI?**
   - Ответ: `stream=True` в `ChatCompletion.create()`

4. **Зачем нужно reconnection?**
   - Ответ: Автоматически переподключиться при обрыве связи

5. **Где хранить историю чатов?**
   - Ответ: В PostgreSQL (chat_sessions + chat_messages)

---

## 🚀 Следующий шаг

В **Уроке 9.4** (финальный) мы:
- Интегрируем AI чат в образовательную платформу
- Добавим UI/UX улучшения
- Настроим аналитику использования
- Подготовим к production deployment

**Готов завершить модуль?** 🎯

---

**Конец урока 9.3** ✅
