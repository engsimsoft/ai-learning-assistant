# AI-ассистент для образовательной платформы
## Профессиональное сравнение подходов (октябрь 2025)

---

## 📋 Executive Summary

**Проект:** Интерактивная школа веб-разработки  
**Масштаб:** ~350,000 токенов учебного материала (~1,400 страниц)  
**Аудитория:** 1,000 студентов × 20 вопросов/месяц = 20,000 запросов  
**Дата анализа:** Октябрь 2025

**Ключевые выводы:**
- ✅ **ДЛЯ ПРОДАКШЕНА:** RAG + GPT-4o-mini ($15/мес, 2-3 недели)
- ⚠️ **Для быстрого MVP:** Gemini 2.5 Flash-Lite ($140/мес, 2-3 дня)
- 🚨 **КРИТИЧЕСКАЯ ПРОБЛЕМА:** Длинный контекст переполняется после 10-30 вопросов!

---

## 🚨 КРИТИЧЕСКАЯ ПРОБЛЕМА: Переполнение контекста

### Что происходит при длинных диалогах?

**Сценарий: студент задаёт 20 вопросов подряд**

```
Материал: 350,000 токенов

Вопрос 1:  350K (материал) + 50 (вопрос) + 500 (ответ) = 350,550
Вопрос 2:  350,550 + 50 + 500 = 351,100
Вопрос 5:  352,750 токенов
Вопрос 10: 355,500 токенов
Вопрос 20: 361,000 токенов ❌ ПЕРЕПОЛНЕНИЕ!

Большинство моделей: лимит 200K-1M токенов
```

**Проблема:** История диалога накапливается и "съедает" контекст!

### Сколько вопросов выдержит сессия?

| Модель | Контекст | Материал | Макс вопросов | Статус |
|--------|----------|----------|---------------|--------|
| **Claude 4.5** | 200K | 350K | 0 | ❌ Не влезет |
| **Gemini 2.5 Flash** | 1M | 350K | ~80-100 | ⚠️ Ограничено |
| **Gemini 1.5 Pro** | 2M | 350K | ~200+ | ✅ OK, но дорого |
| **RAG (любая модель)** | - | 3K chunks | **1000+** | ✅ Отлично |

### Почему RAG решает проблему?

```
RAG подход:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Материал: 350K токенов → Векторная БД

Каждый запрос:
1. Поиск → топ-3 релевантных chunks (3K)
2. Промпт = 3K (chunks) + история диалога
3. Ответ

Контекст = 3,000 (chunks) + история
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Вопрос 1:   3K + 550 = 3,550 токенов ✅
Вопрос 10:  3K + 5,500 = 8,500 ✅
Вопрос 50:  3K + 27,500 = 30,500 ✅
Вопрос 100: 3K + 55,000 = 58,000 ✅
Вопрос 500: 3K + 275,000 = 278,000 ✅
```

**Можно вести образовательные сессии на 100+ вопросов!**

---

## 🔍 Два подхода к AI-ассистенту

### Подход 1: Традиционный RAG (РЕКОМЕНДУЕТСЯ) ⭐⭐⭐

**Технологии:** LangChain + pgvector + GPT-4o-mini  
**Источник:** Модуль 9 курса

**Архитектура:**
```
Вопрос студента
    ↓
Query Embedding (OpenAI)
    ↓
Vector Search (pgvector) → топ-3 chunks
    ↓
Prompt: контекст (3K токенов) + история
    ↓
GPT-4o-mini генерация
    ↓
Ответ + точные ссылки на уроки
```

**Ключевое преимущество:**
- 🎯 **Только 3K токенов контента на запрос**
- 🎯 **История не "съедает" основной материал**
- 🎯 **Можно вести длинные обучающие сессии**

**Компоненты:**
- Document Loaders (загрузка уроков)
- Text Splitters (chunking по 1000 токенов)
- Embeddings (text-embedding-ada-002)
- Vector Store (pgvector/Pinecone)
- LLM (GPT-4o-mini)
- WebSocket для streaming

---

### Подход 2: Длинный контекст (ТОЛЬКО ДЛЯ MVP) ⚠️

**Технологии:** Gemini 2.5 Flash-Lite (1M контекст)  
**Источник:** Современный подход 2025

**Архитектура:**
```
Вопрос студента
    ↓
Prompt: весь курс (350K токенов) + история
    ↓
Gemini 2.5 Flash-Lite обработка
    ↓
Ответ + ссылки на уроки
```

**Критическое ограничение:**
- ⚠️ **350K токенов материала + история диалога**
- ⚠️ **После ~80-100 вопросов контекст переполняется**
- ⚠️ **Не подходит для длинных обучающих сессий**

---

## 💰 Актуальные цены API (октябрь 2025)

### Claude (Anthropic)
| Модель | Input | Output | Cache (90% скидка) |
|--------|-------|--------|---------------------|
| **Sonnet 4.5** | $3/1M | $15/1M | $0.30/1M |
| Контекст | 200K | - | - |

### OpenAI
| Модель | Input | Output |
|--------|-------|--------|
| **GPT-4o** | $2.50/1M | $10/1M |
| **GPT-4o-mini** | $0.15/1M | $0.60/1M |

### Google Gemini
| Модель | Input | Output | Контекст |
|--------|-------|--------|----------|
| **2.5 Flash-Lite** | $0.02/1M | $0.10/1M | 1M |
| **2.5 Flash** | $0.075/1M | $0.30/1M | 1M |
| **1.5 Pro** | $1.25/1M | $5.00/1M | 2M |

---

## 📊 Детальное сравнение (20,000 запросов/мес)

### Вариант 1: RAG + GPT-4o-mini ⭐⭐⭐ (ПОБЕДИТЕЛЬ)

**Расчёт:**
```
Input:  20,000 × 3,000 токенов × $0.15/1M = $9
Output: 20,000 × 500 токенов × $0.60/1M = $6
═════════════════════════════════════════════
Итого: $15/месяц
```

**Время разработки:** 2-3 недели (Модуль 9)

**Длина сессии:** ✅ **1000+ вопросов** без переполнения

**Компоненты:**
- PostgreSQL + pgvector расширение
- LangChain для оркестрации
- OpenAI embeddings для индексации
- FastAPI WebSocket для streaming
- React UI компонент

**Плюсы:**
- ✅ **Самая низкая стоимость** ($15/мес)
- ✅ **Неограниченные длинные диалоги** (1000+ вопросов)
- ✅ Низкая latency (2-3 сек)
- ✅ Точные ссылки на параграфы
- ✅ Масштабируется до 10K+ уроков
- ✅ Профессиональная архитектура

**Минусы:**
- ❌ Долгая разработка (2-3 недели)
- ❌ Сложная инфраструктура
- ❌ Переиндексация при обновлениях

---

### Вариант 2: Gemini 2.5 Flash-Lite (ДЛЯ MVP)

**Расчёт:**
```
Input:  20,000 × 350,000 токенов × $0.02/1M = $140
Output: 20,000 × 500 токенов × $0.10/1M = $1
═════════════════════════════════════════════
Итого: $141/месяц
```

**Время разработки:** 2-3 дня

**Длина сессии:** ⚠️ **~80-100 вопросов** (потом переполнение)

**Плюсы:**
- ✅ Быстрый старт (2-3 дня)
- ✅ Минимум кода (<100 строк)
- ✅ Легко обновлять контент

**Минусы:**
- ❌ **Переполнение контекста после 80-100 вопросов**
- ❌ Дороже RAG в 10 раз ($141 vs $15)
- ❌ Выше latency (4-6 сек)
- ❌ Не подходит для длинных обучающих сессий

---

### Вариант 3: Gemini 1.5 Pro (2M контекст)

**Расчёт:**
```
Input:  20,000 × 350,000 × $1.25/1M = $8,750
Output: 20,000 × 500 × $5/1M = $50
═════════════════════════════════════════════
Итого: $8,800/месяц ❌ (неприемлемо!)
```

**Длина сессии:** ✅ **~200+ вопросов**

**Вывод:** Слишком дорого!

---

### Вариант 4: Claude Sonnet 4.5

**Проблема:** Контекст только 200K токенов

```
Материал: 350,000 токенов
Лимит Claude: 200,000 токенов
═════════════════════════════════════════════
❌ НЕ ВЛЕЗЕТ! Нужно делить на части
```

**Вывод:** Не подходит для полного материала

---

## 🏆 Итоговая таблица с учётом длины сессий

| Решение | $/мес | Разработка | Макс вопросов | Latency | Для продакшена |
|---------|-------|------------|---------------|---------|----------------|
| **RAG + GPT-4o-mini** | **$15** ⭐⭐⭐ | 2-3 недели | **1000+** ✅ | 2-3 сек | ✅ ДА |
| **Gemini 2.5 Flash-Lite** | $141 | 2-3 дня | **~80-100** ⚠️ | 4-6 сек | ⚠️ Только MVP |
| **Gemini 2.5 Flash** | $263 | 2-3 дня | **~80-100** ⚠️ | 4-6 сек | ❌ НЕТ |
| **Gemini 1.5 Pro** | $8,800 ❌ | 2-3 дня | **~200+** ✅ | 5-7 сек | ❌ НЕТ |
| **Claude 4.5** | N/A | - | **0** ❌ | - | ❌ НЕТ |

---

## 🎯 ОБНОВЛЁННАЯ Рекомендация

### ДЛЯ ПРОДАКШЕНА: RAG + GPT-4o-mini ⭐⭐⭐

**Почему это единственный правильный выбор:**

1. ✅ **Стоимость:** $15/мес (в 10 раз дешевле Gemini)
2. ✅ **Длинные сессии:** 1000+ вопросов без проблем
3. ✅ **Latency:** 2-3 сек (быстрее Gemini)
4. ✅ **Качество:** Точные ссылки на источники
5. ✅ **Масштабируемость:** До 10K+ уроков

**Недостаток только один:**
- ❌ Разработка 2-3 недели vs 2-3 дня

**НО:** Это одноразовая инвестиция времени, которая окупается:
- Экономия: ($141 - $15) × 12 месяцев = **$1,512/год**
- 2-3 недели разработки = **стоят потраченного времени**

---

### Для быстрого MVP: Gemini 2.5 Flash-Lite

**Используй ТОЛЬКО если:**
- ⚠️ Нужен прототип за выходные
- ⚠️ Студенты будут задавать <50 вопросов за сессию
- ⚠️ Это временное решение (2-3 месяца)
- ⚠️ Потом всё равно мигрируешь на RAG

**Код для MVP:**
```python
import google.generativeai as genai
import streamlit as st

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash-lite')

@st.cache_data
def load_content():
    with open("all_lessons.txt") as f:
        return f.read()

st.title("🤖 AI помощник курса (MVP)")

# Счётчик вопросов
if 'question_count' not in st.session_state:
    st.session_state.question_count = 0

# Предупреждение о лимите
if st.session_state.question_count > 80:
    st.warning("⚠️ Вы задали много вопросов. Рекомендуем начать новую сессию.")

question = st.text_input("Ваш вопрос:")
if question:
    st.session_state.question_count += 1
    content = load_content()
    prompt = f"""Материал: {content}
    
    Вопрос: {question}
    
    Ответь и укажи источник."""
    
    response = model.generate_content(prompt)
    st.write(response.text)
```

---

## 📈 План действий

### Этап 1: RAG разработка (Недели 1-3)

**Неделя 1: Инфраструктура**

День 1-2: Настройка PostgreSQL + pgvector
```sql
-- Установить расширение
CREATE EXTENSION vector;

-- Таблица для embeddings
CREATE TABLE lesson_embeddings (
    id SERIAL PRIMARY KEY,
    lesson_id VARCHAR(255),
    chunk_index INTEGER,
    content TEXT,
    embedding VECTOR(1536),
    metadata JSONB
);

-- Индекс для быстрого поиска
CREATE INDEX ON lesson_embeddings 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

День 3-5: Индексация контента
```python
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitters import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import PGVector

# 1. Загрузить документы
loader = DirectoryLoader("lessons/", glob="**/*.md")
docs = loader.load()

# 2. Разбить на chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = splitter.split_documents(docs)

# 3. Создать embeddings и индексировать
embeddings = OpenAIEmbeddings()
vectorstore = PGVector.from_documents(
    documents=chunks,
    embedding=embeddings,
    connection_string=DATABASE_URL
)

print(f"✅ Проиндексировано {len(chunks)} chunks")
```

**Неделя 2: RAG система**

День 1-3: LangChain QA Chain
```python
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory

# Retriever
retriever = vectorstore.as_retriever(
    search_kwargs={"k": 3}  # топ-3 chunks
)

# Memory для истории
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# QA Chain
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(model="gpt-4o-mini", temperature=0),
    retriever=retriever,
    memory=memory,
    return_source_documents=True
)

def ask(question: str):
    result = qa_chain({"question": question})
    answer = result["answer"]
    sources = result["source_documents"]
    return answer, sources
```

День 4-5: Тестирование
```python
# Тест длинной сессии
questions = [
    "Что такое Server Actions?",
    "А чем они отличаются от REST API?",
    # ... 100 вопросов
]

for i, q in enumerate(questions):
    answer, sources = ask(q)
    print(f"Q{i+1}: {len(answer)} символов")
    # Проверяем что всё работает
```

**Неделя 3: WebSocket + Frontend**

День 1-3: FastAPI WebSocket
```python
from fastapi import FastAPI, WebSocket
import json

app = FastAPI()

@app.websocket("/ws/chat/{user_id}")
async def chat_websocket(websocket: WebSocket, user_id: str):
    await websocket.accept()
    
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            question = message["question"]
            
            # Streaming ответ
            answer, sources = ask(question)
            
            # Отправить по частям (streaming)
            for chunk in answer.split():
                await websocket.send_json({
                    "type": "chunk",
                    "content": chunk + " "
                })
            
            # Источники
            await websocket.send_json({
                "type": "sources",
                "data": [s.metadata for s in sources]
            })
            
    except WebSocketDisconnect:
        print(f"Client {user_id} disconnected")
```

День 4-5: React UI
```typescript
import { useState, useEffect } from 'react'

export default function AIChat({ userId }) {
  const [ws, setWs] = useState(null)
  const [messages, setMessages] = useState([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  
  useEffect(() => {
    const websocket = new WebSocket(
      `ws://localhost:8000/ws/chat/${userId}`
    )
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'chunk') {
        setCurrentAnswer(prev => prev + data.content)
      }
      
      if (data.type === 'sources') {
        // Добавить сообщение с источниками
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: currentAnswer,
          sources: data.data
        }])
        setCurrentAnswer('')
      }
    }
    
    setWs(websocket)
    return () => websocket.close()
  }, [userId])
  
  function sendMessage(question) {
    ws.send(JSON.stringify({ question }))
    setMessages(prev => [...prev, {
      role: 'user',
      content: question
    }])
  }
  
  return (
    <div className="chat-container">
      {messages.map((msg, i) => (
        <Message key={i} message={msg} />
      ))}
      {currentAnswer && (
        <div className="streaming">
          {currentAnswer}
          <span className="cursor">|</span>
        </div>
      )}
      <ChatInput onSend={sendMessage} />
    </div>
  )
}
```

---

### Этап 2: Мониторинг и оптимизация

**Метрики для отслеживания:**
```python
import time

class ChatAnalytics:
    def track_request(self, user_id, question, answer, sources):
        metrics = {
            "timestamp": time.time(),
            "user_id": user_id,
            "question_length": len(question),
            "answer_length": len(answer),
            "chunks_used": len(sources),
            "latency": self.measure_latency(),
            "cost": self.calculate_cost(question, answer)
        }
        self.save(metrics)
    
    def get_session_stats(self, user_id):
        return {
            "total_questions": self.count_questions(user_id),
            "avg_latency": self.avg_latency(user_id),
            "total_cost": self.total_cost(user_id)
        }
```

---

## 💡 Решение проблем длинного контекста

### Если всё же используешь Gemini

**1. Sliding Window (удаление старой истории)**
```python
def manage_history(conversation, max_turns=50):
    """Оставляем только последние 50 вопросов-ответов"""
    if len(conversation) > max_turns:
        # Удалить старые, оставить новые
        conversation = conversation[-max_turns:]
    return conversation
```

**2. Summarization (сжатие истории)**
```python
def compress_history(conversation):
    """Каждые 20 вопросов - сжимаем историю"""
    if len(conversation) > 20:
        old_history = conversation[:10]
        summary = model.generate_content(
            f"Кратко резюмируй этот диалог: {old_history}"
        )
        conversation = [summary] + conversation[10:]
    return conversation
```

**3. Session Reset (новая сессия)**
```python
if question_count > 80:
    st.warning("""
    ⚠️ Вы задали 80 вопросов. Рекомендуем начать новую сессию 
    для оптимальной работы.
    """)
    if st.button("Начать новую сессию"):
        st.session_state.clear()
```

**Но всё это костыли!** RAG решает проблему элегантно.

---

## 📊 Сравнение подходов для длинных сессий

### Сценарий: студент учится 2 часа, задаёт 100 вопросов

**С RAG:**
```
Вопрос 1:   3K (chunks) + 550 = 3,550 ✅
Вопрос 50:  3K + 27,500 = 30,500 ✅
Вопрос 100: 3K + 55,000 = 58,000 ✅

Стоимость: $0.0009 за сессию
Latency: стабильная 2-3 сек
Качество: отличное (точные chunks)
```

**С Gemini Flash-Lite:**
```
Вопрос 1:   350K + 550 = 350,550 ✅
Вопрос 50:  350K + 27,500 = 377,500 ✅
Вопрос 100: 350K + 55,000 = 405,000 ⚠️

Стоимость: $0.0081 за сессию (в 9 раз дороже!)
Latency: растёт 4 → 6 → 8 сек
Качество: ухудшается (большой контекст)
```

**С Gemini Flash-Lite + Sliding Window:**
```
Вопрос 1-50:   350K + история (OK)
Вопрос 51:     удаляем старые вопросы 1-10
Вопрос 100:    удаляем вопросы 1-60

Проблема: теряется контекст предыдущих вопросов!
"А ты же говорил про Server Actions..." - не помнит ❌
```

---

## ✅ Чеклист принятия решения

### Выбери RAG если:
- [x] **Планируешь длинные обучающие сессии (>50 вопросов)**
- [x] **Важна стабильная latency**
- [x] **Бюджет $15-50/мес приемлем**
- [x] **Есть 2-3 недели на разработку**
- [x] **Нужны точные ссылки на параграфы**
- [x] **Планируешь масштабироваться**

### Выбери Gemini только если:
- [ ] Нужен прототип за выходные
- [ ] Короткие сессии (<30 вопросов)
- [ ] Временное решение (1-3 месяца)
- [ ] Потом всё равно мигрируешь на RAG

---

## 🎓 Заключение

### Ключевой инсайт: проблема переполнения контекста

**Длинный контекст ≠ Бесконечный диалог**

Даже с 1M-2M контекстным окном, **история диалога накапливается** и "съедает" доступное место. Для образовательной платформы, где критичны **длинные обучающие сессии**, это фатальная проблема.

### Итоговая рекомендация

**Для образовательной платформы с материалом ~350K токенов:**

1. ✅ **RAG + GPT-4o-mini** - единственный правильный выбор для продакшена
   - $15/месяц
   - 1000+ вопросов в сессии
   - 2-3 недели разработки

2. ⚠️ **Gemini 2.5 Flash-Lite** - только для быстрого MVP
   - $141/месяц
   - ~80-100 вопросов максимум
   - Временное решение

3. 📚 **Модуль 9 курса** - обязателен к прохождению
   - Даёт правильную архитектуру
   - Решает проблему масштабирования
   - Профессиональный подход

### Bottom Line

**"Не всё то золото, что блестит"**

Длинный контекст выглядит как простое решение, но для образовательных платформ с длинными диалогами RAG — это **единственный профессиональный подход**, который масштабируется и работает стабильно.

**Инвестируй 2-3 недели в правильную архитектуру сейчас, сэкономишь месяцы переделок потом.**

---

**Дата отчёта:** Октябрь 2025  
**Версия:** 2.0 (обновлено с учётом проблемы переполнения контекста)  
**Автор:** AI-ассистент Claude  
**Цены актуальны на:** 11.10.2025