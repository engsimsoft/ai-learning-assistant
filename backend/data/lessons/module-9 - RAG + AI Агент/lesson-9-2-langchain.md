# Урок 9.2: LangChain для RAG

> **Модуль 9:** RAG + AI Агент  
> **Урок:** 9.2  
> **Длительность:** 3 часа  
> **Prerequisite:** Уроки 9.0, 9.1

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать что такое LangChain и зачем он нужен
- ✅ Загружать документы с Document Loaders
- ✅ Разбивать текст с Text Splitters
- ✅ Работать с Vector Stores (векторными хранилищами)
- ✅ Создавать Retrieval QA Chain (цепочка вопрос-ответ)
- ✅ Использовать Memory для контекста разговора
- ✅ Построить полную RAG систему для образовательной платформы

---

## 📖 Часть 1: Что такое LangChain?

### Главный вопрос

**"Как связать все компоненты RAG системы вместе?"**

### Проблема: много компонентов

**Без LangChain нужно писать вручную:**
```python
# 1. Загрузить документы
docs = load_markdown_files()

# 2. Разбить на chunks
chunks = chunk_documents(docs)

# 3. Создать embeddings
embeddings = create_embeddings(chunks)

# 4. Сохранить в векторную БД
save_to_vector_db(embeddings)

# 5. При запросе: создать query embedding
query_embedding = create_embedding(query)

# 6. Найти похожие
results = search_vector_db(query_embedding)

# 7. Создать промпт для LLM
prompt = f"Контекст: {results}\nВопрос: {query}"

# 8. Получить ответ от LLM
answer = openai.chat(prompt)

# Много кода! 😰
```

### Решение: LangChain

**Простое определение:**
LangChain = фреймворк который связывает все компоненты RAG системы в удобные цепочки (chains).

**С LangChain:**
```python
from langchain.chains import RetrievalQA
from langchain.vectorstores import PGVector
from langchain.llms import OpenAI

# Всё в 5 строк!
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    retriever=PGVector.as_retriever()
)

answer = qa_chain.run("Что такое Server Actions?")
```

**Гораздо проще! ✅**

### Архитектура LangChain

```
┌──────────────────────────────────────────────────────┐
│             LANGCHAIN КОМПОНЕНТЫ                     │
├──────────────────────────────────────────────────────┤
│                                                      │
│  1. Document Loaders (загрузка документов)          │
│  ┌────────────────────────────────────────────┐    │
│  │  TextLoader, MarkdownLoader, PDFLoader     │    │
│  └──────────────┬─────────────────────────────┘    │
│                 ↓                                    │
│  2. Text Splitters (разбиение на chunks)            │
│  ┌────────────────────────────────────────────┐    │
│  │  RecursiveCharacterTextSplitter            │    │
│  └──────────────┬─────────────────────────────┘    │
│                 ↓                                    │
│  3. Embeddings (векторизация)                       │
│  ┌────────────────────────────────────────────┐    │
│  │  OpenAIEmbeddings                          │    │
│  └──────────────┬─────────────────────────────┘    │
│                 ↓                                    │
│  4. Vector Stores (векторные хранилища)             │
│  ┌────────────────────────────────────────────┐    │
│  │  PGVector, Pinecone, Chroma                │    │
│  └──────────────┬─────────────────────────────┘    │
│                 ↓                                    │
│  5. LLMs (языковые модели)                          │
│  ┌────────────────────────────────────────────┐    │
│  │  OpenAI, ChatOpenAI                        │    │
│  └──────────────┬─────────────────────────────┘    │
│                 ↓                                    │
│  6. Chains (цепочки)                                │
│  ┌────────────────────────────────────────────┐    │
│  │  RetrievalQA, ConversationalRetrievalChain │    │
│  └──────────────┬─────────────────────────────┘    │
│                 ↓                                    │
│  7. Memory (память разговора)                       │
│  ┌────────────────────────────────────────────┐    │
│  │  ConversationBufferMemory                  │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 📚 Часть 2: Document Loaders

### Что такое Document Loaders?

**Document Loader = компонент для загрузки документов в LangChain.**

### Установка LangChain

```bash
pip install langchain openai pgvector
```

### Пример: TextLoader

**Загрузка Markdown файлов:**
```python
# backend/rag/loaders.py
from langchain.document_loaders import TextLoader
from langchain.schema import Document

# Загрузить один файл
loader = TextLoader("lessons/module-1/lesson-1-1.md")
docs = loader.load()

print(docs[0].page_content[:100])
# "# Урок 1.1: Client-Server архитектура..."

print(docs[0].metadata)
# {'source': 'lessons/module-1/lesson-1-1.md'}
```

### Загрузка всех уроков

```python
# backend/rag/loaders.py
from pathlib import Path
from langchain.document_loaders import DirectoryLoader

def load_all_lessons() -> list[Document]:
    """Загрузить все Markdown уроки"""
    loader = DirectoryLoader(
        "lessons/",
        glob="**/*.md",  # Все .md файлы рекурсивно
        loader_cls=TextLoader
    )
    
    documents = loader.load()
    print(f"Loaded {len(documents)} lessons")
    return documents

# Пример
docs = load_all_lessons()
# Loaded 500 lessons
```

### Добавление метаданных

```python
def load_lessons_with_metadata() -> list[Document]:
    """Загрузить уроки с метаданными"""
    documents = []
    
    for filepath in Path("lessons").rglob("*.md"):
        # Парсим путь: lessons/module-1/lesson-1-1.md
        parts = filepath.parts
        module = parts[1]  # module-1
        lesson = parts[2].replace(".md", "")  # lesson-1-1
        
        loader = TextLoader(str(filepath))
        docs = loader.load()
        
        # Добавляем метаданные
        for doc in docs:
            doc.metadata.update({
                "module": module,
                "lesson": lesson,
                "filepath": str(filepath)
            })
        
        documents.extend(docs)
    
    return documents

# Пример
docs = load_lessons_with_metadata()
print(docs[0].metadata)
# {
#   'source': 'lessons/module-1/lesson-1-1.md',
#   'module': 'module-1',
#   'lesson': 'lesson-1-1',
#   'filepath': 'lessons/module-1/lesson-1-1.md'
# }
```

---

## ✂️ Часть 3: Text Splitters

### Зачем нужен Text Splitter?

**Проблема:**
- Уроки длинные (2000+ слов)
- Embedding модель ограничена (8191 токенов)
- Нужно разбить на chunks

**Решение:** Text Splitter делает это автоматически!

### RecursiveCharacterTextSplitter

**Самый популярный splitter:**
```python
from langchain.text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,      # Размер чанка (символы)
    chunk_overlap=200,    # Перекрытие между чанками
    separators=[          # Приоритет разделителей
        "\n\n",           # Сначала по двойному переносу
        "\n",             # Потом по одинарному
        ". ",             # Потом по точке
        " ",              # Потом по пробелу
        ""                # В крайнем случае разорвать
    ]
)

# Пример
text = """
# Урок 1.1: Client-Server архитектура

## Введение
Client-Server архитектура — это...
[2000 слов]
"""

chunks = splitter.split_text(text)
print(f"Разбито на {len(chunks)} chunks")

for i, chunk in enumerate(chunks):
    print(f"Chunk {i+1}: {len(chunk)} символов")
```

### Работа с Documents

```python
from langchain.schema import Document

# Загрузили документы
docs = load_all_lessons()

# Разбиваем все документы на chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

split_docs = splitter.split_documents(docs)

print(f"Было: {len(docs)} документов")
# Было: 500 документов

print(f"Стало: {len(split_docs)} chunks")
# Стало: 1847 chunks

# Метаданные сохраняются!
print(split_docs[0].metadata)
# {'module': 'module-1', 'lesson': 'lesson-1-1', ...}
```

---

## 🗄️ Часть 4: Vector Stores

### Что такое Vector Store в LangChain?

**Vector Store = обёртка над векторной БД с удобным API.**

### PGVector (PostgreSQL)

**Установка:**
```bash
pip install pgvector
```

**Настройка:**
```python
# backend/rag/vectorstore.py
from langchain.vectorstores import PGVector
from langchain.embeddings import OpenAIEmbeddings
import os

# Connection string для PostgreSQL
CONNECTION_STRING = os.getenv("DATABASE_URL")

# OpenAI embeddings
embeddings = OpenAIEmbeddings(
    model="text-embedding-ada-002"
)

# Создать Vector Store
vectorstore = PGVector(
    connection_string=CONNECTION_STRING,
    embedding_function=embeddings,
    collection_name="lesson_chunks"
)
```

### Индексация документов

```python
# backend/rag/index.py
from rag.loaders import load_lessons_with_metadata
from rag.vectorstore import vectorstore
from langchain.text_splitters import RecursiveCharacterTextSplitter

def index_all_lessons():
    """Индексировать все уроки"""
    
    # 1. Загрузить документы
    print("Loading documents...")
    docs = load_lessons_with_metadata()
    print(f"Loaded {len(docs)} documents")
    
    # 2. Разбить на chunks
    print("Splitting into chunks...")
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    chunks = splitter.split_documents(docs)
    print(f"Created {len(chunks)} chunks")
    
    # 3. Создать embeddings и сохранить в Vector Store
    print("Creating embeddings and indexing...")
    vectorstore.add_documents(chunks)
    # LangChain автоматически:
    # - Создаст embeddings для каждого chunk
    # - Сохранит в PostgreSQL (pgvector)
    
    print("✅ Indexing complete!")

# Запустить
if __name__ == "__main__":
    index_all_lessons()
```

**Запуск:**
```bash
python -m backend.rag.index
```

**Вывод:**
```
Loading documents...
Loaded 500 documents
Splitting into chunks...
Created 1847 chunks
Creating embeddings and indexing...
✅ Indexing complete!
```

### Поиск похожих документов

```python
# backend/rag/search.py
from rag.vectorstore import vectorstore

def search_similar_chunks(query: str, k: int = 3):
    """Найти топ-K похожих chunks"""
    
    # LangChain автоматически:
    # 1. Создаст embedding для query
    # 2. Найдёт похожие в Vector Store
    results = vectorstore.similarity_search(query, k=k)
    
    return results

# Пример
query = "Что такое Server Actions?"
chunks = search_similar_chunks(query, k=3)

for i, chunk in enumerate(chunks, 1):
    print(f"\n{i}. {chunk.metadata['lesson']}")
    print(f"Content: {chunk.page_content[:100]}...")
```

**Вывод:**
```
1. lesson-8-2
Content: Server Actions — это функции в Next.js которые 
выполняются на сервере...

2. lesson-8-1
Content: В монолитной архитектуре Next.js, Server Actions 
заменяют REST API endpoints...

3. lesson-8-0
Content: JavaScript Full-Stack подход использует Server Actions
вместо явных HTTP запросов...
```

### Поиск с метаданными

```python
# Найти только в Модуле 8
results = vectorstore.similarity_search(
    query="Server Actions",
    k=3,
    filter={"module": "module-8"}  # Фильтр
)
```

---

## 🔗 Часть 5: Chains (Цепочки)

### Что такое Chain?

**Chain = последовательность действий объединённых в одну цепочку.**

### RetrievalQA Chain

**Самая простая RAG цепочка:**
```python
# backend/rag/qa_chain.py
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from rag.vectorstore import vectorstore

# Создать Retriever (поисковик)
retriever = vectorstore.as_retriever(
    search_kwargs={"k": 3}  # Топ-3 результата
)

# Создать QA цепочку
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0),  # GPT-3.5-turbo
    chain_type="stuff",         # Простейший тип
    retriever=retriever,
    return_source_documents=True  # Вернуть источники
)

# Использование
def ask_question(question: str):
    """Задать вопрос AI помощнику"""
    result = qa_chain({"query": question})
    
    answer = result["result"]
    sources = result["source_documents"]
    
    return answer, sources

# Пример
question = "Объясни что такое Server Actions"
answer, sources = ask_question(question)

print(f"Вопрос: {question}\n")
print(f"Ответ: {answer}\n")
print(f"Источники:")
for source in sources:
    print(f"- {source.metadata['lesson']}")
```

**Вывод:**
```
Вопрос: Объясни что такое Server Actions

Ответ: Server Actions — это функции в Next.js которые 
выполняются только на сервере. Они вызываются как обычные 
JavaScript функции с клиента, но Next.js автоматически 
превращает это в HTTP запрос. Это альтернатива REST API 
endpoints для Next.js Full-Stack приложений.

Источники:
- lesson-8-2
- lesson-8-1
- lesson-8-0
```

### Как работает RetrievalQA?

```
┌─────────────────────────────────────────────────────┐
│         RETRIEVAL QA CHAIN                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Вопрос: "Что такое Server Actions?"               │
│      ↓                                              │
│  ┌────────────────────────────────┐                │
│  │  1. Retriever                  │                │
│  │  Ищет похожие chunks           │                │
│  └────────┬───────────────────────┘                │
│           ↓                                         │
│  Топ-3 chunks:                                      │
│  - Chunk 1: "Server Actions — это..."              │
│  - Chunk 2: "В Next.js Full-Stack..."              │
│  - Chunk 3: "Альтернатива REST API..."             │
│           ↓                                         │
│  ┌────────────────────────────────┐                │
│  │  2. Prompt Construction        │                │
│  │  Создаёт промпт для LLM        │                │
│  └────────┬───────────────────────┘                │
│           ↓                                         │
│  Промпт:                                            │
│  "Используй следующий контекст:                     │
│   [Chunk 1]                                         │
│   [Chunk 2]                                         │
│   [Chunk 3]                                         │
│                                                     │
│   Вопрос: Что такое Server Actions?                │
│   Ответ:"                                           │
│           ↓                                         │
│  ┌────────────────────────────────┐                │
│  │  3. LLM Generation             │                │
│  │  GPT генерирует ответ          │                │
│  └────────┬───────────────────────┘                │
│           ↓                                         │
│  Ответ + Источники                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Chain Types

**LangChain поддерживает разные типы:**

1. **stuff** — простейший (все chunks в один промпт)
2. **map_reduce** — для большого количества chunks
3. **refine** — итеративное улучшение ответа
4. **map_rerank** — ранжирование результатов

**Для образования:** `stuff` достаточно ✅

---

## 💬 Часть 6: Memory (Память разговора)

### Проблема: нет контекста

**Без Memory:**
```
Студент: "Что такое Server Actions?"
AI: "Server Actions — это функции..."

Студент: "А чем они отличаются от REST API?"
AI: "Не понимаю на что вы ссылаетесь..."  ❌
     (AI забыл предыдущий вопрос!)
```

### Решение: ConversationBufferMemory

```python
# backend/rag/conversational_chain.py
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.llms import OpenAI
from rag.vectorstore import vectorstore

# Создать память
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# Создать conversational цепочку
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=OpenAI(temperature=0),
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
    memory=memory,
    return_source_documents=True
)

def chat(question: str):
    """Чат с контекстом разговора"""
    result = qa_chain({"question": question})
    
    answer = result["answer"]
    sources = result["source_documents"]
    
    return answer, sources

# Пример использования
print("=== Диалог 1 ===")
answer1, _ = chat("Что такое Server Actions?")
print(f"AI: {answer1}\n")

print("=== Диалог 2 ===")
answer2, _ = chat("А чем они отличаются от REST API?")
print(f"AI: {answer2}\n")
# AI помнит что мы говорили про Server Actions! ✅
```

**Вывод:**
```
=== Диалог 1 ===
AI: Server Actions — это функции в Next.js которые 
выполняются на сервере...

=== Диалог 2 ===
AI: Server Actions отличаются от REST API тем, что:
1. Выглядят как обычный вызов функции
2. Next.js автоматически делает HTTP под капотом
3. Нет явного fetch() и URL endpoints

В то время как REST API — это явные HTTP запросы 
через fetch()...
```

### Как работает Memory?

```
┌──────────────────────────────────────────────────┐
│          CONVERSATION BUFFER MEMORY              │
├──────────────────────────────────────────────────┤
│                                                  │
│  История разговора:                              │
│  ┌────────────────────────────────────────┐    │
│  │ Human: "Что такое Server Actions?"     │    │
│  │ AI: "Server Actions — это..."          │    │
│  │                                        │    │
│  │ Human: "А чем они отличаются?"         │    │
│  │ AI: (генерируется сейчас)             │    │
│  └────────────────────────────────────────┘    │
│           ↓                                     │
│  Промпт для LLM:                                │
│  "История разговора:                            │
│   Human: Что такое Server Actions?              │
│   AI: Server Actions — это...                   │
│                                                  │
│   Контекст из векторной БД:                     │
│   [релевантные chunks]                          │
│                                                  │
│   Новый вопрос: А чем они отличаются?           │
│   Ответ:"                                        │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🏗️ Часть 7: Полная RAG система

### Финальный код

```python
# backend/rag/agent.py
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.llms import ChatOpenAI
from langchain.prompts import PromptTemplate
from rag.vectorstore import vectorstore

class EducationAIAgent:
    """AI помощник для образовательной платформы"""
    
    def __init__(self):
        # LLM (GPT-3.5-turbo)
        self.llm = ChatOpenAI(
            model_name="gpt-3.5-turbo",
            temperature=0
        )
        
        # Retriever
        self.retriever = vectorstore.as_retriever(
            search_kwargs={"k": 3}
        )
        
        # Custom промпт
        self.prompt_template = PromptTemplate(
            template="""Ты — AI помощник для курса веб-разработки.
Отвечай на вопросы студентов на основе контента уроков.

Контекст из уроков:
{context}

История разговора:
{chat_history}

Вопрос студента: {question}

Инструкции:
1. Отвечай на основе контекста из уроков
2. Если ответа нет в контексте — скажи "Не нашёл информацию в уроках"
3. Указывай номера уроков в конце ответа
4. Будь дружелюбным и понятным

Ответ:""",
            input_variables=["context", "chat_history", "question"]
        )
        
        # Memory для каждого студента
        self.memories = {}
    
    def get_memory(self, user_id: str) -> ConversationBufferMemory:
        """Получить память для студента"""
        if user_id not in self.memories:
            self.memories[user_id] = ConversationBufferMemory(
                memory_key="chat_history",
                return_messages=True
            )
        return self.memories[user_id]
    
    def ask(self, question: str, user_id: str):
        """Задать вопрос"""
        memory = self.get_memory(user_id)
        
        # Создать цепочку
        chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=self.retriever,
            memory=memory,
            combine_docs_chain_kwargs={"prompt": self.prompt_template},
            return_source_documents=True
        )
        
        # Получить ответ
        result = chain({"question": question})
        
        answer = result["answer"]
        sources = result["source_documents"]
        
        # Добавить ссылки на уроки
        source_lessons = set([
            s.metadata["lesson"] for s in sources
        ])
        
        answer += f"\n\n📚 Источники: {', '.join(source_lessons)}"
        
        return answer

# Глобальный экземпляр
ai_agent = EducationAIAgent()
```

### FastAPI endpoint

```python
# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from rag.agent import ai_agent

app = FastAPI()

class Question(BaseModel):
    question: str
    user_id: str

@app.post("/api/ai/ask")
async def ask_ai(q: Question):
    """AI помощник endpoint"""
    answer = ai_agent.ask(q.question, q.user_id)
    return {"answer": answer}
```

**Пример запроса:**
```bash
curl -X POST http://localhost:8000/api/ai/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Что такое Server Actions?",
    "user_id": "student_123"
  }'
```

**Ответ:**
```json
{
  "answer": "Server Actions — это функции в Next.js которые выполняются только на сервере. Они вызываются как обычные JavaScript функции с клиента, но Next.js автоматически превращает это в HTTP запрос. Это альтернатива REST API endpoints.\n\n📚 Источники: lesson-8-2, lesson-8-1"
}
```

---

## 🎯 Практическое задание

### Цель: Создать RAG систему

**Шаги:**

**1. Установи зависимости**
```bash
pip install langchain openai pgvector
```

**2. Индексируй уроки**
```python
# backend/scripts/index.py
from rag.index import index_all_lessons

index_all_lessons()
```

**3. Протестируй поиск**
```python
# backend/scripts/test_search.py
from rag.search import search_similar_chunks

results = search_similar_chunks("Что такое embeddings?", k=5)
for result in results:
    print(f"- {result.metadata['lesson']}")
```

**4. Создай AI агента**
```python
# backend/scripts/test_agent.py
from rag.agent import ai_agent

answer = ai_agent.ask(
    question="Объясни разницу между SSR и CSR",
    user_id="test_user"
)
print(answer)
```

---

## 🎓 Резюме урока

### LangChain компоненты

```
Document Loaders → загрузка уроков
Text Splitters → разбиение на chunks
Embeddings → OpenAI векторизация
Vector Stores → PGVector хранилище
LLMs → ChatOpenAI (GPT-3.5)
Chains → RetrievalQA, ConversationalRetrievalChain
Memory → ConversationBufferMemory
```

### RAG цепочка

```
Вопрос → Retriever → Топ-K chunks → LLM → Ответ + Источники
```

### Memory для контекста

```
Без Memory: каждый вопрос независим ❌
С Memory: AI помнит историю разговора ✅
```

### Для твоего проекта

**Полная RAG система готова:**
- ✅ Индексация 500 уроков
- ✅ Semantic search
- ✅ Контекст разговора
- ✅ Ссылки на источники
- ✅ FastAPI endpoint

---

## 📝 Проверка понимания

1. **Что такое LangChain?**
   - Ответ: Фреймворк для связывания компонентов RAG системы

2. **Зачем нужен Text Splitter?**
   - Ответ: Разбить длинные уроки на chunks (1000 символов)

3. **Что делает RetrievalQA Chain?**
   - Ответ: Находит релевантные chunks и передаёт их LLM для генерации ответа

4. **Зачем нужна Memory?**
   - Ответ: Запоминать историю разговора для контекста

5. **Как получить ссылки на источники?**
   - Ответ: `return_source_documents=True` в Chain

---

## 🚀 Следующий шаг

В **Уроке 9.3** мы изучим:
- **WebSocket** — real-time связь
- **Streaming ответов** от OpenAI
- **React чат компонент**
- **Обработка ошибок и переподключения**

**Готов сделать чат интерактивным?** 🎯

---

**Конец урока 9.2** ✅
