# Урок 9.6: AI агент с Gemini 2.5 Flash

> **Модуль 9:** RAG + AI Агент  
> **Урок:** 9.6  
> **Длительность:** 3-4 часа  
> **Prerequisite:** Урок 9.5

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Настроить Google AI Studio и получить API ключ
- ✅ Объединить все уроки курса в один текстовый файл
- ✅ Создать AI агента с Prompt Caching
- ✅ Построить Streamlit интерфейс (MVP за день)
- ✅ Построить React + FastAPI интерфейс (production)
- ✅ Эффективно общаться с Claude Code для реализации
- ✅ Протестировать и оптимизировать затраты

---

## 📖 Часть 1: Настройка Google AI Studio

### Что такое Google AI Studio?

**Простое определение:**
Google AI Studio = веб-платформа где можно тестировать Gemini модели и получить API ключ.

### Аналогия: AI Studio как кухонная лаборатория

```
┌────────────────────────────────────────┐
│       GOOGLE AI STUDIO                 │
│       (Лаборатория для тестов)         │
├────────────────────────────────────────┤
│                                        │
│  🧪 Экспериментальный стол:            │
│     - Пробуй разные модели             │
│     - Тестируй промпты                 │
│     - Смотри стоимость                 │
│                                        │
│  🔑 Выдача ключей:                     │
│     - Получи API ключ бесплатно        │
│     - Free tier: 15 RPM                │
│                                        │
│  📊 Мониторинг:                        │
│     - Сколько потратил                 │
│     - Какие модели используешь         │
│                                        │
└────────────────────────────────────────┘
```

---

### Шаг 1: Регистрация в AI Studio

**Инструкции:**

1. Открой браузер → `https://ai.google.dev/`
2. Нажми **"Get started"** или **"Get API key"**
3. Войди через Google аккаунт
4. Соглашение с Terms of Service

**Не требуется:**
- ❌ Кредитная карта (free tier доступен сразу)
- ❌ Оплата (тестируешь бесплатно)
- ❌ VPN (доступно из России/СНГ)

---

### Шаг 2: Получение API ключа

**В AI Studio:**

1. Боковое меню → **"Get API key"**
2. Нажми **"Create API key"**
3. Выбери проект (создай новый если нет)
4. Скопируй ключ (формат: `AIzaSy...`)

**⚠️ ВАЖНО:**
```
API ключ = пароль к твоему аккаунту

✅ ХРАНИ В БЕЗОПАСНОСТИ:
- .env файл (не коммить в git!)
- Environment variables
- Secrets manager

❌ НЕ ПУБЛИКУЙ:
- В коде на GitHub
- В скриншотах
- В публичных чатах
```

---

### Шаг 3: Free Tier лимиты

**Бесплатный план:**
```
Лимиты Free Tier:
├─ 15 RPM (requests per minute)
├─ 250,000 TPM (tokens per minute)
├─ 1,500 RPD (requests per day)
└─ Prompt caching: 1M tokens/hour

Достаточно для:
✅ Тестирования и разработки
✅ 2-5 одновременных студентов
❌ НЕ достаточно для 100 студентов
```

**Когда нужен платный план:**
- При \u003e 15 одновременных запросов
- Для production с 50+ студентами
- Upgrade до Tier 1: $250+ spending → 1,000 RPM

---

## 📚 Часть 2: Подготовка контента курса

### Объединение всех уроков в один файл

**Зачем:**
Gemini нужен ВЕСЬ курс в одном промпте для Prompt Caching.

### Структура итогового файла

```
all_lessons.txt
├─ Введение в курс
├─ Модуль 1: Основы веб-архитектуры
│  ├─ Урок 1.1: Client-Server
│  ├─ Урок 1.2: HTTP протокол
│  └─ ...
├─ Модуль 2: Backend разработка
│  ├─ Урок 2.1: FastAPI intro
│  └─ ...
├─ Модуль 3-10...
└─ Итого: ~350,000 токенов
```

---

### Работа с Claude Code: Создание скрипта объединения

**Откройте терминал в папке проекта:**

```bash
cd ~/projects/ai-web-learning
claude
```

**Диалог с Claude Code:**

```
Ты: Привет Claude! Помоги создать скрипт который объединит 
    все уроки курса в один текстовый файл.

Claude Code: Конечно! Расскажи о структуре проекта.

Ты: Структура такая:
    
    lessons/
    ├── module-1-basics/
    │   ├── lesson-01-client-server/
    │   │   └── lesson-01-client-server.md
    │   ├── lesson-02-http-basics/
    │   │   └── lesson-02-http-basics.md
    ├── module-2-backend/
    │   ├── 01-fastapi-intro.md
    │   ├── 02-http-methods.md
    └── ... (всего 10 модулей)
    
    Нужно:
    1. Пройти по всем папкам lessons/
    2. Найти все .md файлы
    3. Объединить в один all_lessons.txt
    4. Добавить заголовки модулей и номера уроков
    5. Посчитать итоговое количество токенов (примерно: слова / 0.75)

Claude Code: Создам Python скрипт для этого. 
             Какие модули включить?

Ты: Включи Модули 1-9 (основные + опциональные).
    Модуль 10 (ML) можно пропустить пока.

Claude Code: Понял. Создам scripts/combine_lessons.py с функциями:
             - walk_lessons_dir() для обхода папок
             - read_markdown() для чтения .md файлов
             - count_tokens() для подсчёта
             - combine_all() для объединения
             
             Применить изменения? [Y/n]

Ты: Y

Claude Code: ✓ Создан scripts/combine_lessons.py
             ✓ Добавлена логика обхода папок
             ✓ Подсчёт токенов включён
             
             Запустить скрипт?

Ты: Да, запусти

Claude Code: [запускает python scripts/combine_lessons.py]

             Обрабатываю модули...
             ✓ Module 1: 5 уроков обработано
             ✓ Module 2: 8 уроков обработано
             ✓ Module 3: 4 урока обработано
             ...
             ✓ Module 9: 5 уроков обработано
             
             Итого:
             ✓ Обработано 38 уроков
             ✓ Модули 1-9 включены
             ✓ Размер: 175,234 слова
             ✓ Токены (оценка): ~350,468 токенов
             ✓ Файл создан: all_lessons.txt
             
             Готово!
```

**Результат:** Файл `all_lessons.txt` с полным курсом готов к использованию

---

## 🤖 Часть 3: MVP интерфейс на Streamlit

### Что такое Streamlit?

**Простое определение:**
Streamlit = Python фреймворк для быстрого создания веб-интерфейсов (без JavaScript).

**Плюсы для MVP:**
- ✅ Пишешь только Python
- ✅ MVP за 1-2 часа
- ✅ Не нужен frontend (React, HTML)
- ✅ Идеально для тестирования

**Минусы:**
- ❌ Менее красивый чем React
- ❌ Не для production с 100+ студентами
- ❌ Ограниченная кастомизация

---

### Работа с Claude Code: Создание Streamlit чата

**Диалог:**

```
Ты: Claude, создай Streamlit приложение для AI чата 
    с образовательным курсом.

Требования:
1. Использовать Gemini 2.5 Flash через google-generativeai SDK
2. Загрузить all_lessons.txt в промпт
3. Настроить Prompt Caching (explicit mode)
4. UI: простой чат с историей сообщений
5. Показывать стоимость каждого запроса
6. Структура: streamlit_app/main.py

Claude Code: Отличная задача! Начну с установки зависимостей.
             Создать requirements.txt?

Ты: Да

Claude Code: ✓ Создан streamlit_app/requirements.txt
             ✓ Добавлены: streamlit, google-generativeai, python-dotenv
             
             Теперь создам main.py с чатом. Применить?

Ты: Да

Claude Code: ✓ Создан streamlit_app/main.py
             ✓ Добавлен импорт библиотек
             ✓ Функция load_course() для загрузки all_lessons.txt
             ✓ Функция create_cache() для Prompt Caching
             ✓ Функция ask_ai() для отправки вопросов
             ✓ UI с st.chat_message() для истории
             
             Что ещё добавить?

Ты: Добавь мониторинг стоимости для каждого запроса.

Claude Code: ✓ Добавлена функция calculate_cost()
             ✓ Расчёт: input_tokens × $0.30/1M + output × $2.50/1M
             ✓ Учёт кэшированных токенов × $0.075/1M
             ✓ Отображение через st.metric()
             
             Применить?

Ты: Y

Claude Code: Готово! Создать .env файл для API ключа?

Ты: Да

Claude Code: ✓ Создан .env с шаблоном GOOGLE_API_KEY
             
             Замените your_api_key_here на свой ключ из AI Studio.

Ты: Отлично! Как запустить?

Claude Code: Выполните команды:
             
             cd streamlit_app
             pip install -r requirements.txt
             streamlit run main.py
             
             Приложение откроется на http://localhost:8501
```

**Результат:** Работающий Streamlit чат за 1-2 часа!

---

### Тестирование Streamlit MVP

**Проверь функциональность:**

1. **Загрузка курса:**
   ```
   ✅ all_lessons.txt успешно загружен
   ✅ Размер: 350K токенов
   ✅ Prompt cache создан
   ```

2. **Первый вопрос:**
   ```
   Студент: "Объясни что такое Client-Server архитектура"
   
   AI: "Client-Server архитектура - это модель где..."
   
   Стоимость: $0.105 (первая загрузка, без кэша)
   ```

3. **Второй вопрос (кэш работает):**
   ```
   Студент: "Что такое FastAPI?"
   
   AI: "FastAPI - это современный Python фреймворк..."
   
   Стоимость: $0.026 (кэш активирован, экономия 75%)
   ```

**Ожидаемая экономия:**
- Первый запрос: ~$0.105
- Последующие: ~$0.026-0.030
- Cache hit rate: \u003e 70%

---

## 🚀 Часть 4: Production интерфейс (React + FastAPI)

### Архитектура production решения

```
┌─────────────────────────────────────────────┐
│              PRODUCTION STACK               │
├─────────────────────────────────────────────┤
│                                             │
│  💻 FRONTEND (React)                        │
│  ┌─────────────────────────────────────┐   │
│  │  - Красивый UI с Tailwind           │   │
│  │  - История чатов                    │   │
│  │  - Markdown рендеринг ответов       │   │
│  │  - Loading состояния                │   │
│  └─────────────┬───────────────────────┘   │
│                │ HTTP POST                  │
│                ↓                            │
│  🖥️ BACKEND (FastAPI)                       │
│  ┌─────────────────────────────────────┐   │
│  │  - Endpoint: POST /api/chat         │   │
│  │  - Gemini 2.5 Flash интеграция      │   │
│  │  - Prompt Caching управление        │   │
│  │  - Мониторинг стоимости             │   │
│  └─────────────┬───────────────────────┘   │
│                │                            │
│                ↓                            │
│  🤖 GOOGLE AI (Gemini 2.5 Flash)            │
│                                             │
└─────────────────────────────────────────────┘
```

---

### Работа с Claude Code: Backend (FastAPI)

**Диалог:**

```
Ты: Claude, создай FastAPI backend для AI агента.

Требования:
1. Endpoint: POST /api/chat
2. Input: { "message": "string", "session_id": "string" }
3. Output: { "response": "string", "cost": number }
4. Использовать Gemini 2.5 Flash с Prompt Caching
5. Структура:
   backend/
   ├── main.py
   ├── routers/
   │   └── chat.py
   ├── core/
   │   ├── gemini_client.py
   │   └── prompt_cache.py
   ├── requirements.txt
   └── .env

Claude Code: Отличная архитектура! Начну с core модулей.

Создам prompt_cache.py для управления кэшем Gemini.

Применить?

Ты: Да

Claude Code: [создаёт backend/core/prompt_cache.py]

from google.generativeai import caching
import datetime

class PromptCacheManager:
    """Управление Prompt Cache для курса"""
    
    def __init__(self, course_content: str):
        self.course_content = course_content
        self.cache = None
    
    def create_cache(self, ttl_hours: int = 1):
        """Создать кэш для курса"""
        # Логика создания explicit cache
        pass
    
    def get_or_create_cache(self):
        """Получить существующий или создать новый"""
        # Проверка на существование, создание если нужно
        pass

Применить?

Ты: Y

Claude Code: Отлично! Теперь создам gemini_client.py 
             для работы с API.

[создаёт backend/core/gemini_client.py]

import google.generativeai as genai

class GeminiClient:
    """Клиент для Gemini 2.5 Flash"""
    
    def __init__(self, api_key: str, cache_manager):
        genai.configure(api_key=api_key)
        self.cache_manager = cache_manager
        self.model = None
    
    async def ask(self, question: str, session_id: str):
        """Задать вопрос AI агенту"""
        # Получить кэш
        # Создать модель с кэшем
        # Отправить запрос
        # Вернуть ответ + метрики
        pass

Применить?

Ты: Y

Claude Code: Теперь создам FastAPI endpoint в routers/chat.py

[создаёт backend/routers/chat.py]

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    session_id: str

class ChatResponse(BaseModel):
    response: str
    cost: float
    cached: bool

@router.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """AI чат endpoint"""
    # Вызов GeminiClient
    # Обработка ответа
    # Расчёт стоимости
    pass

Применить?

Ты: Y

Claude Code: Создам main.py для запуска сервера.

[создаёт backend/main.py]

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat
import os

app = FastAPI(title="AI Education Agent")

# CORS для frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(chat.router)

@app.get("/")
async def root():
    return {"status": "AI Agent Backend Running"}

Применить?

Ты: Y

Claude Code: Backend готов! Создать requirements.txt?

Ты: Да

Claude Code: [создаёт backend/requirements.txt]

fastapi==0.104.0
uvicorn==0.24.0
google-generativeai==0.3.0
python-dotenv==1.0.0
pydantic==2.4.0

Всё готово! Запустить сервер:

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

API будет на http://localhost:8000
Swagger docs: http://localhost:8000/docs
```

**Результат:** Работающий FastAPI backend!

---

### Работа с Claude Code: Frontend (React)

**Диалог:**

```
Ты: Claude, создай React frontend для чата с AI агентом.

Требования:
1. Использовать Next.js + TypeScript
2. Tailwind CSS для стилей
3. Компоненты:
   - ChatMessage (сообщение)
   - ChatInput (ввод)
   - ChatHistory (история)
4. Подключение к backend API: http://localhost:8000
5. Markdown рендеринг для ответов AI
6. Показывать стоимость запросов

Claude Code: Отличные требования! Создать Next.js проект?

Ты: Да

Claude Code: [запускает npx create-next-app@latest frontend]
             
             Настройка проекта:
             ✓ TypeScript: Yes
             ✓ Tailwind CSS: Yes  
             ✓ App Router: Yes
             
             Проект создан в frontend/
             
             Теперь создам компоненты. Начну с ChatMessage.

Ты: Да

Claude Code: ✓ Создан frontend/components/ChatMessage.tsx
             ✓ Props: role, content, cost
             ✓ Условный рендеринг для user/assistant
             ✓ Использует react-markdown для форматирования
             ✓ Tailwind стили для красивого отображения
             
             Применить?

Ты: Y

Claude Code: Создам ChatInput для ввода вопросов.

Ту: Да

Claude Code: ✓ Создан frontend/components/ChatInput.tsx
             ✓ State для текста сообщения
             ✓ Функция handleSend() для отправки
             ✓ Кнопка отправки
             ✓ Disabled режим при загрузке
             
             Применить?

Ту: Y

Claude Code: Создам главную страницу чата.

Ты: Да

Claude Code: ✓ Создан frontend/app/page.tsx
             ✓ useState для messages и loading
             ✓ Функция sendMessage() с fetch к backend
             ✓ Обработка ответа и обновление UI
             ✓ Отображение истории чата
             ✓ Показ стоимости каждого запроса
             
             Применить?

Ты: Y

Claude Code: Frontend готов! Установить зависимости:
             
             cd frontend
             npm install react-markdown
             
             Запустить dev сервер:
             npm run dev
             
             Приложение на http://localhost:3000
```

**Результат:** Полноценный React интерфейс готов!

---

## 🧪 Часть 5: Тестирование и оптимизация

### Тестовый сценарий

**1. Первый запрос (холодный старт):**

```
Студент: "Что такое Client-Server архитектура?"

Backend:
├─ Загрузка all_lessons.txt (350K токенов)
├─ Создание Prompt Cache
├─ Отправка в Gemini 2.5 Flash
└─ Получение ответа

Метрики:
├─ Время ответа: ~2-3 секунды
├─ Входные токены: 350,050 (курс + вопрос)
├─ Выходные токены: ~500
├─ Кэшированные: 0 (первый раз)
├─ Стоимость: $0.106
└─ Cache status: CREATED ✅
```

**2. Второй запрос (кэш работает):**

```
Студент: "А что такое FastAPI?"

Backend:
├─ Использование существующего Prompt Cache
├─ Курс уже в кэше (350K токенов)
├─ Добавляем только вопрос (50 токенов)
└─ Отправка в Gemini

Метрики:
├─ Время ответа: ~1-2 секунды (быстрее!)
├─ Входные токены: 50 (только вопрос)
├─ Выходные токены: ~500
├─ Кэшированные: 350,000 ✅
├─ Стоимость: $0.027 (в 4 раза дешевле!)
└─ Cache status: HIT ✅
```

**3. Третий запрос (длинная сессия):**

```
Студент: "Сравни FastAPI и Next.js"

Метрики:
├─ Время ответа: ~1.5 секунды
├─ Кэшированные: 350,000 ✅
├─ Стоимость: $0.028
└─ Cache hit rate: 100% ✅

Итого за 3 запроса: $0.161
Экономия vs без кэша: 66%
```

---

### Мониторинг затрат

**Добавь логирование в backend:**

**Диалог с Claude Code:**

```
Ты: Claude, добавь подробное логирование метрик в chat.py

Требования:
1. Логировать каждый запрос с timestamp
2. Метрики: input_tokens, output_tokens, cached_tokens
3. Расчёт стоимости каждого запроса
4. Cache hit status (true/false)
5. Latency в миллисекундах
6. Сохранять в backend/logs/chat.log

Claude Code: Отлично! Добавлю logging в chat.py
             
             Изменения:
             ✓ import logging в начале файла
             ✓ Настройка логгера с файловым handler
             ✓ В функции chat() записывать метрики перед return
             ✓ JSON формат для удобного парсинга
             
             Применить?

Ты: Y

Claude Code: ✓ Логирование добавлено
             ✓ Создана папка backend/logs/
             ✓ Файл chat.log будет создан автоматически
             
             Пример лога:
             {
               "timestamp": "2025-10-12T14:30:00",
               "session_id": "user_123",
               "input_tokens": 350050,
               "cached_tokens": 350000,
               "cost": 0.027,
               "latency_ms": 1850
             }
```

**Анализ логов:**

```bash
# Просмотр последних запросов
tail -f backend/logs/chat.log

# Расчёт средней стоимости
grep "cost" logs/chat.log | awk '{sum+=$NF} END {print sum/NR}'

# Cache hit rate
grep "cache_hit" logs/chat.log | grep "true" | wc -l
```

---

## 💰 Часть 6: Оптимизация затрат

### Стратегия 1: Умное TTL кэша

**Проблема:** Кэш живёт 1 час → $0.35/час × 24 = $8.40/день

**Решение: Динамическое создание кэша**

**Диалог с Claude Code:**

```
Ты: Claude, оптимизируй prompt_cache.py - создавать кэш 
    только когда нужен, а не 24/7.

Требования:
1. Отслеживать время последнего запроса
2. Если прошло >10 минут без запросов → удалить кэш
3. При новом запросе → создать кэш с TTL 15 минут
4. Экономить на хранении кэша

Claude Code: Отличная идея! Создам SmartCacheManager

Изменения:
✓ Добавлю поле last_request_time
✓ Метод get_cache() проверяет время последнего запроса
✓ Если >10 минут → self.cache = None
✓ Создаём кэш только при необходимости
✓ TTL = 15 минут вместо 1 часа

Применить?

Ты: Y

Claude Code: ✓ Обновлён prompt_cache.py
             ✓ Динамическое создание кэша работает
             
             Экономия:
             Было: $0.35/час × 24 = $8.40/день
             Стало: $0.35/час × активные часы (~8) = $2.80/день
             
             Экономия: $5.60/день = $168/месяц!
```

**Результат:** Платишь только за активное использование

---

### Стратегия 2: Компрессия курса

**Проблема:** 350K токенов → много платить

**Решение:** Удали избыточность

```
Исходный курс: 350,000 токенов
├─ Примеры кода: 80,000 (23%)
├─ Повторения: 30,000 (9%)
└─ Пояснения: 240,000 (68%)

Оптимизированный:
├─ Примеры → ссылки: -70,000
├─ Удалить повторения: -20,000
└─ Сжатый курс: 260,000 токенов ✅

Экономия: 26% меньше токенов
Новая стоимость: $215-260/мес (было $290-350)
```

---

### Стратегия 3: Rate limiting

**Защита от runaway costs:**

**Диалог с Claude Code:**

```
Ты: Claude, добавь rate limiting в FastAPI чтобы защитить от spam

Требования:
1. Максимум 10 запросов в минуту на пользователя
2. Использовать библиотеку slowapi
3. Вернуть 429 Too Many Requests при превышении
4. Добавить в main.py

Claude Code: Отлично! Добавлю rate limiting

Изменения:
✓ Установка: pip install slowapi
✓ Импорт Limiter в main.py
✓ Декоратор @limiter.limit("10/minute") на /api/chat
✓ Exception handler для 429 ошибки

Применить?

Ты: Y

Claude Code: ✓ Rate limiting добавлен
             ✓ Максимум 10 запросов/минуту
             
             Тестирование:
             - Отправь 11 запросов подряд
             - 11-й вернёт 429 Too Many Requests
```

**Цель:** Предотвратить случайное превышение бюджета от spam или ошибок

---

## 📝 Резюме урока

### Что создали

```
✅ Google AI Studio аккаунт
✅ API ключ для Gemini 2.5 Flash
✅ Скрипт объединения уроков → all_lessons.txt
✅ Streamlit MVP (быстрый тест за день)
✅ FastAPI Backend (production)
✅ React Frontend (красивый UI)
✅ Prompt Caching (экономия 90%)
✅ Мониторинг и логирование
```

### Два интерфейса

```
STREAMLIT MVP:
├─ Время разработки: 1-2 часа
├─ Подходит для: Тестирование, demo
├─ Сложность: Низкая (только Python)
└─ Ограничения: Не для 100+ студентов

REACT + FASTAPI:
├─ Время разработки: 1-2 дня
├─ Подходит для: Production, масштаб
├─ Сложность: Средняя (Frontend + Backend)
└─ Преимущества: Красиво, быстро, надёжно
```

### Ожидаемые затраты

```
100 студентов × смешанный паттерн:
├─ Стоимость: $290-350/месяц
├─ За студента: $2.90-3.50/месяц
└─ Cache hit rate: 70-80%

Free tier (тестирование):
├─ 15 RPM → 2-5 студентов
├─ Достаточно для MVP
└─ Upgrade при росте
```

---

## ❓ Вопросы для самопроверки

1. **Как получить API ключ Gemini?**
   - Ответ: ai.google.dev → Get API key → Create API key

2. **Зачем объединять уроки в один файл?**
   - Ответ: Для Prompt Caching нужен весь курс в одном промпте

3. **В чём разница Streamlit vs React?**
   - Ответ: Streamlit быстрее для MVP, React лучше для production

4. **Как работает Prompt Caching экономия?**
   - Ответ: Первый запрос $0.30/1M, повторные $0.075/1M (90% скидка)

5. **Какой cache hit rate ожидать?**
   - Ответ: 70-80% для смешанного паттерна (короткие + длинные сессии)

---

## 🔗 Связь с другими уроками

**Основано на уроках:**
- Урок 9.5: Выбрали Long Context + Gemini 2.5 Flash
- Модули 1-7: Применяем знания FastAPI, React

**Подготавливает к урокам:**
- Урок 9.7: Production оптимизация и мониторинг

**Связь с проектом:**
Ты создал работающего AI агента для твоей образовательной платформы! Теперь студенты могут задавать вопросы по курсу и получать качественные ответы с экономией 90% на кэшировании.

---

## ✅ Критерии завершения урока

**Настройка:**
- [ ] Создал аккаунт Google AI Studio
- [ ] Получил API ключ
- [ ] Протестировал на free tier

**Подготовка контента:**
- [ ] Создал скрипт combine_lessons.py с Claude Code
- [ ] Объединил уроки → all_lessons.txt (~350K токенов)
- [ ] Проверил итоговый размер

**Streamlit MVP:**
- [ ] Создал streamlit_app/ с Claude Code
- [ ] Настроил Prompt Caching
- [ ] Протестировал первый запрос ($0.10)
- [ ] Проверил второй запрос с кэшем ($0.03)

**Production (опционально):**
- [ ] Создал FastAPI backend с Claude Code
- [ ] Создал React frontend с Claude Code
- [ ] Интеграция работает
- [ ] Логирование настроено

**Оптимизация:**
- [ ] Cache hit rate \u003e 70%
- [ ] Понимаю как снизить затраты
- [ ] Готов к production deployment

---

## 🛠️ Практическое задание

### Задача: Создать AI агента для своего курса

**Что нужно сделать:**

1. **Настройка (30 минут):**
   - Зарегистрируйся на ai.google.dev
   - Получи API ключ
   - Создай .env файл с ключом

2. **Подготовка контента (1 час):**
   - Используй Claude Code для создания скрипта
   - Объедини все уроки в all_lessons.txt
   - Проверь размер (должно быть ~350K токенов)

3. **Streamlit MVP (2 часа):**
   - Используй Claude Code для создания приложения
   - Настрой Prompt Caching
   - Протестируй на 5-10 вопросах
   - Проверь cache hit rate

4. **Тестирование (30 минут):**
   - Первый вопрос → запиши стоимость
   - Второй вопрос → проверь кэш работает
   - Посчитай экономию

**Ожидаемый результат:**
- ✅ Работающий Streamlit чат
- ✅ Prompt Caching экономит 70-90%
- ✅ Стоимость на free tier $0-0.50 для теста
- ✅ Готовность к production (при желании)

---

**Статус урока:** ⏸️ Не начат  
**Следующий урок:** 9.7 - Production оптимизация

**Конец урока 9.6** ✅