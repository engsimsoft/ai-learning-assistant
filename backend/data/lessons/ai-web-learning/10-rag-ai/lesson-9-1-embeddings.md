# Урок 9.1: Векторные БД и Embeddings

> **Модуль 9:** RAG + AI Агент  
> **Урок:** 9.1  
> **Длительность:** 2.5 часа  
> **Prerequisite:** Урок 9.0

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать что такое embeddings (векторные представления)
- ✅ Знать как работает semantic search (семантический поиск)
- ✅ Понимать разницу между обычной БД и векторной
- ✅ Выбирать векторную БД (pgvector vs Pinecone vs ChromaDB)
- ✅ Создавать embeddings для своих уроков с OpenAI API
- ✅ Индексировать контент в векторную БД

---

## 📖 Часть 1: Что такое Embeddings?

### Главный вопрос

**"Как компьютер понимает смысл текста?"**

### Проблема: компьютеры не понимают слова

**Для человека:**
```
"кот" ≈ "кошка" ≈ "котёнок"  (похожий смысл)
"кот" ≠ "собака"              (разный смысл)
```

**Для компьютера:**
```
"кот"    = строка из 3 символов
"кошка"  = строка из 5 символов
"котёнок" = строка из 7 символов

Компьютер не знает что они связаны!
```

### Решение: Embeddings

**Простое определение:**
Embedding = превращение текста в список чисел (вектор), где похожий смысл = похожие числа.

**Визуализация:**
```
"кот"     → [0.8,  0.3, -0.1,  0.5, ...]  (1536 чисел)
"кошка"   → [0.79, 0.31, -0.09, 0.48, ...] (похожие числа!)
"котёнок" → [0.81, 0.29, -0.11, 0.52, ...] (тоже близко!)

"собака"  → [0.7, -0.2,  0.4, -0.3, ...]  (другие числа)
"машина"  → [-0.1, 0.8, -0.5,  0.2, ...]  (совсем другие!)
```

### Как создаются embeddings?

**Neural Network (нейросеть) обучена:**
```
Прочитала миллиарды текстов
        ↓
Поняла что:
- "кот" и "кошка" встречаются в похожих контекстах
- "кот мурлыкает", "кошка мурлыкает"
- "кот ловит мышей", "кошка ловит мышей"
        ↓
Создаёт похожие векторы для "кот" и "кошка"
```

### Математика за embeddings

**Косинусное расстояние (cosine similarity):**
```python
import numpy as np

def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    return dot_product / (norm1 * norm2)

# Пример
cat_vector = [0.8, 0.3, -0.1]
kitten_vector = [0.79, 0.31, -0.09]
dog_vector = [0.7, -0.2, 0.4]

similarity_cat_kitten = cosine_similarity(cat_vector, kitten_vector)
# 0.998 (очень похожи!)

similarity_cat_dog = cosine_similarity(cat_vector, dog_vector)
# 0.612 (менее похожи)
```

**Значения:**
- 1.0 = абсолютно одинаковые
- 0.9-0.99 = очень похожие
- 0.7-0.89 = похожие
- < 0.7 = разные

---

## 🔍 Часть 2: Semantic Search (семантический поиск)

### Keyword Search vs Semantic Search

#### Keyword Search (обычный поиск)

**Как работает:**
```sql
-- Ищет точное совпадение слов
SELECT * FROM lessons 
WHERE content LIKE '%Server Actions%'
```

**Пример:**
```
Запрос: "Server Actions"

Найдёт:
✅ "Server Actions — это функции..."
✅ "Next.js Server Actions работают..."

НЕ найдёт:
❌ "Функции на сервере Next.js" (другие слова)
❌ "Серверные функции" (синоним)
```

**Проблема:** Нужно угадать точные слова из урока!

---

#### Semantic Search (семантический поиск)

**Как работает:**
```python
# 1. Превращаем запрос в вектор
query_vector = embedding("Server Actions")

# 2. Ищем векторы с минимальным расстоянием
similar_vectors = vector_db.search(
    query_vector, 
    top_k=3  # Топ-3 похожих
)
```

**Пример:**
```
Запрос: "Server Actions"
Query vector: [0.2, -0.5, 0.8, ...]

Найдёт:
✅ "Server Actions — это функции..." (0.95 similarity)
✅ "Функции на сервере Next.js" (0.87 similarity)
✅ "Серверные функции в Next.js" (0.83 similarity)

Понимает СМЫСЛ, не только слова!
```

### Визуальное сравнение

```
KEYWORD SEARCH:
┌────────────────────────────────────┐
│ Запрос: "Server Actions"           │
└────────┬───────────────────────────┘
         │
         ↓
┌────────────────────────────────────┐
│ Ищет строку "Server Actions"       │
│ в документах                       │
└────────┬───────────────────────────┘
         │
         ↓
Найдено: 5 документов ✅


SEMANTIC SEARCH:
┌────────────────────────────────────┐
│ Запрос: "Server Actions"           │
└────────┬───────────────────────────┘
         │
         ↓
┌────────────────────────────────────┐
│ Embedding: [0.2, -0.5, 0.8, ...]   │
└────────┬───────────────────────────┘
         │
         ↓
┌────────────────────────────────────┐
│ Vector DB: находит похожие векторы │
└────────┬───────────────────────────┘
         │
         ↓
Найдено:
- "Server Actions" (0.95)
- "Функции на сервере" (0.87)  ← другие слова!
- "Серверные функции" (0.83)   ← синоним!
= 12 документов ✅ (больше релевантных результатов)
```

---

## 🗄️ Часть 3: Векторные базы данных

### Обычная БД vs Векторная БД

| **Аспект** | **PostgreSQL (обычная БД)** | **Векторная БД** |
|---|---|---|
| **Что хранит** | Строки, числа, JSON | Векторы (массивы чисел) |
| **Поиск** | `WHERE title = 'X'` | Similarity search |
| **Индекс** | B-tree, Hash | HNSW, IVF |
| **Для чего** | CRUD операции | Semantic search |
| **Пример** | Найти пользователя по ID | Найти похожие тексты |

### Три варианта векторных БД

#### 1. pgvector (PostgreSQL extension)

**Что это:**
- Расширение для PostgreSQL
- Добавляет тип данных `vector`
- Встроено в твою существующую БД

**Плюсы:**
- ✅ Бесплатно
- ✅ Уже используешь PostgreSQL
- ✅ Нет отдельного сервиса
- ✅ ACID транзакции

**Минусы:**
- ❌ Медленнее для >1M векторов
- ❌ Ручная настройка индексов

**Установка:**
```sql
-- В PostgreSQL
CREATE EXTENSION vector;

-- Создать таблицу с векторами
CREATE TABLE lesson_embeddings (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER,
    content TEXT,
    embedding VECTOR(1536)  -- OpenAI размерность
);

-- Создать индекс для быстрого поиска
CREATE INDEX ON lesson_embeddings 
USING ivfflat (embedding vector_cosine_ops);
```

**Пример поиска:**
```sql
-- Найти топ-3 похожих урока
SELECT lesson_id, content, 
       1 - (embedding <=> '[0.2, -0.5, ...]') AS similarity
FROM lesson_embeddings
ORDER BY embedding <=> '[0.2, -0.5, ...]'
LIMIT 3;
```

---

#### 2. Pinecone (managed service)

**Что это:**
- Облачная векторная БД
- Managed (не нужно настраивать)
- API для работы

**Плюсы:**
- ✅ Очень быстрая (оптимизирована)
- ✅ Масштабируется автоматически
- ✅ Простой API
- ✅ Dashboard для мониторинга

**Минусы:**
- ❌ Стоит $70/месяц (минимум)
- ❌ Данные у третьей стороны

**Установка:**
```bash
pip install pinecone-client
```

**Пример использования:**
```python
import pinecone

# Инициализация
pinecone.init(api_key="YOUR_API_KEY", environment="us-west1-gcp")

# Создать индекс
pinecone.create_index(
    name="ai-web-learning",
    dimension=1536,  # OpenAI embedding size
    metric="cosine"
)

# Подключиться к индексу
index = pinecone.Index("ai-web-learning")

# Добавить векторы
index.upsert(vectors=[
    ("lesson-1-1", [0.2, -0.5, ...], {"title": "Client-Server"}),
    ("lesson-1-2", [0.3, -0.4, ...], {"title": "HTTP Protocol"})
])

# Поиск похожих
results = index.query(
    vector=[0.25, -0.45, ...],  # Query embedding
    top_k=3,
    include_metadata=True
)
```

---

#### 3. ChromaDB (self-hosted)

**Что это:**
- Векторная БД на Python
- Локальная или на сервере
- Открытый код

**Плюсы:**
- ✅ Бесплатно
- ✅ Легко начать (pip install)
- ✅ Хорошо для разработки

**Минусы:**
- ❌ Медленнее Pinecone
- ❌ Нужно самому деплоить

**Установка:**
```bash
pip install chromadb
```

**Пример использования:**
```python
import chromadb

# Создать клиент
client = chromadb.Client()

# Создать коллекцию
collection = client.create_collection("ai-web-learning")

# Добавить документы
collection.add(
    documents=["Server Actions — это функции...", "REST API — это..."],
    metadatas=[{"lesson": "8.2"}, {"lesson": "1.4"}],
    ids=["lesson-8-2", "lesson-1-4"]
)

# Поиск похожих
results = collection.query(
    query_texts=["Что такое Server Actions?"],
    n_results=3
)
```

---

### Какую выбрать?

| **Сценарий** | **Рекомендация** |
|---|---|
| **Начало разработки** | ChromaDB (быстро стартовать) |
| **Production (<100K векторов)** | pgvector (бесплатно) |
| **Production (>1M векторов)** | Pinecone (скорость) |
| **Ограниченный бюджет** | pgvector ✅ |
| **Нужна максимальная скорость** | Pinecone |

**Для твоей школы (500 уроков ≈ 5000 векторов):**
→ **pgvector** идеально! ✅

---

## 🔧 Часть 4: Создание Embeddings с OpenAI

### OpenAI Embeddings API

**Модель:** `text-embedding-ada-002`
- Размерность: 1536
- Стоимость: $0.0001 за 1K токенов
- Лимит: 8191 токенов на запрос

### Пример кода

**Установка:**
```bash
pip install openai
```

**Создание embedding:**
```python
# backend/embeddings/create.py
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def create_embedding(text: str) -> list[float]:
    """Создать embedding для текста"""
    response = openai.Embedding.create(
        model="text-embedding-ada-002",
        input=text
    )
    
    embedding = response['data'][0]['embedding']
    return embedding

# Пример использования
text = "Server Actions — это функции в Next.js..."
vector = create_embedding(text)

print(f"Размерность: {len(vector)}")  # 1536
print(f"Первые 5 значений: {vector[:5]}")
# [0.234, -0.567, 0.890, -0.123, 0.456]
```

### Batch processing (пакетная обработка)

**Для экономии времени:**
```python
def create_embeddings_batch(texts: list[str]) -> list[list[float]]:
    """Создать embeddings для списка текстов"""
    response = openai.Embedding.create(
        model="text-embedding-ada-002",
        input=texts  # Можно до 2048 текстов за раз
    )
    
    embeddings = [item['embedding'] for item in response['data']]
    return embeddings

# Пример
texts = [
    "Урок 1.1: Client-Server архитектура...",
    "Урок 1.2: HTTP протокол...",
    "Урок 1.3: JSON формат..."
]

vectors = create_embeddings_batch(texts)
# Быстрее чем 3 отдельных запроса!
```

---

## 📦 Часть 5: Индексация контента

### Chunking (разбиение на части)

**Проблема:** Уроки длинные (2000+ слов), а embedding модель ограничена (8191 токенов).

**Решение:** Разбить урок на chunks (части) по 1000 токенов.

**Код:**
```python
# backend/embeddings/chunking.py
from langchain.text_splitter import RecursiveCharacterTextSplitter

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200):
    """Разбить текст на chunks с перекрытием"""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap,
        separators=["\n\n", "\n", ". ", " ", ""]
    )
    
    chunks = splitter.split_text(text)
    return chunks

# Пример
lesson_text = """
# Урок 1.1: Client-Server архитектура

## Введение
Client-Server архитектура...
[2000 слов]
"""

chunks = chunk_text(lesson_text)
print(f"Урок разбит на {len(chunks)} chunks")
# Урок разбит на 3 chunks

for i, chunk in enumerate(chunks):
    print(f"Chunk {i+1}: {len(chunk)} символов")
```

**Параметры:**
- `chunk_size=1000` — размер чанка (~750 токенов)
- `overlap=200` — перекрытие между чанками (для контекста)

**Почему overlap?**
```
Chunk 1: "...Server Actions выполняются на сервере."
              └─ overlap ─┐
Chunk 2:      "на сервере. Next.js автоматически..."
                          
Предложение не разорвано!
```

---

### Полный процесс индексации

**Код:**
```python
# backend/embeddings/index_lessons.py
import openai
from database import db
from chunking import chunk_text

async def index_lesson(lesson_id: int, content: str):
    """Индексировать один урок"""
    
    # 1. Разбить на chunks
    chunks = chunk_text(content)
    
    # 2. Создать embeddings для всех chunks
    embeddings = []
    for chunk in chunks:
        embedding = create_embedding(chunk)
        embeddings.append(embedding)
    
    # 3. Сохранить в векторную БД (pgvector)
    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        await db.lesson_embeddings.create({
            "lesson_id": lesson_id,
            "chunk_index": i,
            "content": chunk,
            "embedding": embedding
        })
    
    print(f"Lesson {lesson_id} indexed: {len(chunks)} chunks")

# Индексировать все уроки
async def index_all_lessons():
    lessons = await db.lessons.find_many()
    
    for lesson in lessons:
        print(f"Indexing lesson {lesson.id}...")
        await index_lesson(lesson.id, lesson.content)
    
    print(f"✅ Indexed {len(lessons)} lessons")
```

**Запуск:**
```bash
python -m backend.embeddings.index_lessons
```

**Результат:**
```
Indexing lesson 1...
Lesson 1 indexed: 3 chunks
Indexing lesson 2...
Lesson 2 indexed: 2 chunks
...
✅ Indexed 500 lessons (1,847 chunks total)
```

---

## 🔎 Часть 6: Semantic Search с векторной БД

### Поиск похожих chunks

**Код:**
```python
# backend/rag/search.py
import openai
from database import db

async def search_relevant_chunks(query: str, top_k: int = 3):
    """Найти топ-K релевантных chunks для запроса"""
    
    # 1. Создать embedding для запроса
    query_embedding = create_embedding(query)
    
    # 2. Поиск в векторной БД (pgvector)
    results = await db.execute(f"""
        SELECT 
            lesson_id,
            chunk_index,
            content,
            1 - (embedding <=> '{query_embedding}') AS similarity
        FROM lesson_embeddings
        ORDER BY embedding <=> '{query_embedding}'
        LIMIT {top_k}
    """)
    
    return results

# Пример использования
query = "Что такое Server Actions в Next.js?"
results = await search_relevant_chunks(query, top_k=3)

for result in results:
    print(f"Lesson {result['lesson_id']}, Chunk {result['chunk_index']}")
    print(f"Similarity: {result['similarity']:.3f}")
    print(f"Content: {result['content'][:100]}...")
    print()
```

**Вывод:**
```
Lesson 82, Chunk 2
Similarity: 0.924
Content: Server Actions — это функции в Next.js которые выполняются 
на сервере...

Lesson 81, Chunk 5
Similarity: 0.887
Content: В Next.js Full-Stack подходе, Server Actions заменяют 
традиционные REST API endpoints...

Lesson 80, Chunk 3
Similarity: 0.854
Content: Монолитная архитектура Next.js позволяет вызывать серверные 
функции напрямую...
```

---

## 📊 Часть 7: Метрики качества поиска

### Как оценить качество?

**1. Similarity score**
```
> 0.9  = очень релевантно ✅
0.8-0.9 = релевантно ✅
0.7-0.8 = возможно релевантно ⚠️
< 0.7  = не релевантно ❌
```

**2. Manual evaluation**
```python
# Тестовые запросы
test_queries = [
    "Что такое REST API?",
    "Как создать FastAPI endpoint?",
    "Разница между SSR и CSR?"
]

for query in test_queries:
    print(f"\nQuery: {query}")
    results = await search_relevant_chunks(query, top_k=3)
    
    for i, result in enumerate(results, 1):
        print(f"{i}. Lesson {result['lesson_id']} (score: {result['similarity']:.3f})")
        print(f"   {result['content'][:100]}...")
    
    # Вручную проверь: правильные ли уроки нашлись?
```

**3. A/B тестирование**
- Запусти RAG систему для части пользователей
- Собирай метрики: thumbs up/down, time on page
- Сравни с контрольной группой

---

## 🎯 Практическое задание

### Цель: Индексировать твои уроки

**Шаги:**

**1. Настрой pgvector**
```sql
-- В PostgreSQL
CREATE EXTENSION vector;

CREATE TABLE lesson_embeddings (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lessons(id),
    chunk_index INTEGER,
    content TEXT,
    embedding VECTOR(1536),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON lesson_embeddings 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

**2. Создай скрипт индексации**
```python
# backend/scripts/index_all.py
import asyncio
from backend.embeddings.index_lessons import index_all_lessons

async def main():
    await index_all_lessons()

if __name__ == "__main__":
    asyncio.run(main())
```

**3. Запусти**
```bash
export OPENAI_API_KEY="sk-..."
python backend/scripts/index_all.py
```

**4. Протестируй поиск**
```python
# backend/scripts/test_search.py
from backend.rag.search import search_relevant_chunks

query = "Объясни что такое embeddings"
results = await search_relevant_chunks(query, top_k=5)

for result in results:
    print(f"Lesson {result['lesson_id']}: {result['similarity']:.3f}")
```

---

## 🎓 Резюме урока

### Что такое Embeddings

**Embeddings = превращение текста в вектор чисел**
```
"Server Actions" → [0.2, -0.5, 0.8, ..., 1536 чисел]
```

### Semantic Search

**Поиск по смыслу, а не по словам:**
```
Query: "Server Actions"
Найдёт:
✅ "Server Actions"
✅ "Функции на сервере"
✅ "Серверные функции"
```

### Векторные БД

| **БД** | **Для чего** | **Стоимость** |
|---|---|---|
| pgvector | <100K векторов | Бесплатно ✅ |
| Pinecone | >1M векторов | $70/мес |
| ChromaDB | Разработка | Бесплатно |

### Процесс индексации

```
Урок → Chunking → Embeddings → Vector DB
                                    ↓
Query → Query Embedding → Similarity Search → Топ-K chunks
```

### Для твоего проекта

**500 уроков ≈ 1,847 chunks:**
- Стоимость индексации: ~$1
- Хранение: pgvector (бесплатно)
- Поиск: <100ms

---

## 📝 Проверка понимания

1. **Что такое embedding?**
   - Ответ: Вектор чисел (1536) представляющий смысл текста

2. **Чем semantic search лучше keyword search?**
   - Ответ: Понимает смысл, находит синонимы, не нужно угадывать слова

3. **Какую векторную БД выбрать для 500 уроков?**
   - Ответ: pgvector (бесплатно, достаточно быстро)

4. **Зачем нужен chunking?**
   - Ответ: Уроки длинные, embedding модель ограничена 8191 токенами

5. **Что такое overlap в chunking?**
   - Ответ: Перекрытие между chunks чтобы не разорвать контекст

---

## 🚀 Следующий шаг

В **Уроке 9.2** мы изучим:
- **LangChain** — фреймворк для RAG
- **Document Loaders** — загрузка уроков
- **Retrieval QA Chain** — цепочка вопрос-ответ
- **Memory** — контекст разговора
- **Создание полной RAG системы**

**Готов связать всё вместе с LangChain?** 🎯

---

**Конец урока 9.1** ✅
