# AI Web Learning: Детальное содержание курса

> **Курс:** AI Web Learning - Веб-разработка от основ до Production  
> **Назначение:** Полное описание всех тем и концепций для точного определения границ знаний AI Agent  
> **Обновлено:** 13 октября 2025 г.  
> **Статус:** ✅ **Полностью документировано - 46/46 уроков (100%)**

---

## 🎯 Назначение документа

Этот документ содержит **исчерпывающее описание** курса **AI Web Learning** - комплексного курса веб-разработки с примером проекта EngineCamPro v2. 

**Использование:**
- 🤖 **Для AI Agent:** Четкое понимание границ знаний по веб-разработке
- 👨‍💻 **Для разработчиков:** Обзор всех технологий курса (FastAPI, React, Next.js, RAG, ML)
- 📚 **Для студентов:** Навигация по курсу и планирование обучения

**Принцип:** AI Agent может отвечать на вопросы **ТОЛЬКО** по темам из курса AI Web Learning. Вопросы по другим темам (медицина, автомобили, финансы и т.д.) - вежливо отклоняются.

---

## 📋 Структура курса AI Web Learning

```
AI Web Learning (46 уроков - Full-Stack веб-разработка)
├── 🎓 Основной путь (30 уроков) - от основ до Production ✅
│   ├── Модуль 1: Основы веб-архитектуры (5 уроков) ✅
│   ├── Модуль 2: Backend разработка - FastAPI (8 уроков) ✅
│   ├── Модуль 3: База данных - SQL/PostgreSQL (4 урока) ✅
│   ├── Модуль 4: Frontend разработка - React (6 уроков) ✅
│   ├── Модуль 5: Интеграция Frontend + Backend (3 урока) ✅
│   ├── Модуль 6: Монетизация - Clerk + Stripe (2 урока) ✅
│   └── Модуль 7: Deploy и Production (2 урока) ✅
├── ⚙️ Опциональные модули (16 уроков) ✅
│   ├── Модуль 8: Next.js Full-Stack альтернатива (6 уроков) ✅
│   ├── Модуль 9: RAG + AI Agent (9 уроков) ✅
│   └── Модуль 10: ML Integration (1 урок) ✅
└── 📊 Итого: 46 уроков - ВСЕ ДОКУМЕНТИРОВАНЫ ✅
│   ├── 6. Монетизация (Stripe, подписки)
│   ├── 7. Deployment (Railway, Vercel)
│   ├── 8. Next.js fullstack
│   ├── 9. RAG + AI интеграция
│   └── 10. Machine Learning интеграция
├── 🏗️ Project Setup Guide (21 урок) - как организовать
│   ├── 1. Основы организации проекта
│   ├── 2. FastAPI + React архитектура  
│   ├── 3. Next.js подход
│   ├── 5. AI-инструменты для разработки
│   └── 6. Шаблоны и boilerplate
└── 📁 Extras (3 файла) - дополнительные материалы
    ├── Структура проекта EngineCamPro v2
    ├── AI Assistant Final Report
    └── Compass AI Models
```

---

## 🎓 КУРС 1: AI Web Learning

### **Модуль 1: Основы веб-архитектуры** ✅ *Проанализировано*

#### **Урок 1.1: Client-Server архитектура**
**Основные концепции:**
- 🏗️ **Client-Server разделение:** Роли клиента и сервера, разделение ответственности
- 🔄 **Монолит vs Микросервисы:** Streamlit как монолит, переход к распределённой архитектуре
- 🌐 **HTTP коммуникация:** Основы взаимодействия через протокол HTTP
- 📡 **API концепция:** Понятие Application Programming Interface

**Технологии и инструменты:**
- FastAPI (создание простейшего сервера)
- HTTP протокол
- Uvicorn (ASGI сервер)

**Практические навыки:**
- Создание endpoint `/api/info`
- Запуск и тестирование API сервера
- Понимание архитектурных решений

**EngineCamPro контекст:**
- Переход от Streamlit монолита к Client-Server
- Разделение Frontend (Next.js) и Backend (FastAPI)
- Планирование архитектуры v2.0

---

#### **Урок 1.2: HTTP протокол основы**
**Основные концепции:**
- 🔧 **HTTP методы:** GET (получение), POST (создание), PUT (полная замена), PATCH (частичное обновление), DELETE (удаление)
- 📊 **HTTP статус коды:** 2xx (успех), 4xx (ошибка клиента), 5xx (ошибка сервера)
- 📝 **Структура запроса/ответа:** Заголовки, тело запроса, метаданные
- 🔍 **URL структура:** Путь, query параметры (?key=value&key2=value2)

**Технологии и инструменты:**
- HTTP/1.1 протокол
- Content-Type заголовки
- Authorization механизмы
- Query string параметры

**Практические навыки:**
- Правильное использование HTTP методов для CRUD операций
- Понимание семантики статус кодов
- Работа с query параметрами для фильтрации

**EngineCamPro контекст:**
- Проектирование endpoints для проектов: GET/POST/PUT/DELETE `/api/projects`
- Endpoints для кулачков: `/api/projects/{id}/cams`
- Обработка ошибок и правильные статус коды

---

#### **Урок 1.3: JSON - формат данных**
**Основные концепции:**
- 🏛️ **JSON структуры:** Объекты `{}` (key-value пары), Массивы `[]` (упорядоченные списки)
- 🎨 **Типы данных:** String, Number, Boolean, null, Array, Object (6 типов)
- ✍️ **Синтаксис правила:** Двойные кавычки, запятые, отсутствие комментариев
- 🔄 **Serialization/Deserialization:** Преобразование объектов в JSON и обратно

**Технологии и инструменты:**
- JSON формат (RFC 7159)
- Content-Type: application/json
- JSON валидаторы и форматтеры

**Практические навыки:**
- Чтение и создание сложных JSON структур
- Понимание вложенности объектов и массивов
- Работа с JSON в HTTP запросах/ответах

**EngineCamPro контекст:**
- JSON представление проектов: `{"id": 123, "name": "Project", "cams_count": 4}`
- JSON для кулачков: `{"lift": 11.5, "duration": 280, "type": "intake"}`
- JSON результатов расчётов: профили с массивами точек

---

#### **Урок 1.4: REST API концепции**
**Основные концепции:**
- 🏛️ **6 принципов REST:** Client-Server, Stateless, Cacheable, Uniform Interface, Layered System, Code on Demand
- 📐 **Resource-based architecture:** Ресурсы как существительные, действия как HTTP методы
- 🎯 **CRUD операции:** Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE)
- 🌐 **Идемпотентность:** Повторяемость операций без изменения результата

**Технологии и инструменты:**
- RESTful API design principles
- URL/URI структурирование
- HTTP методы в контексте REST
- API версионирование

**Практические навыки:**
- Проектирование RESTful URLs (`/api/projects/{id}/cams`)
- Использование HTTP методов по семантике
- Проектирование иерархических ресурсов
- Применение query параметров для фильтрации

**EngineCamPro контекст:**
- Полная REST API структура для проектов и кулачков
- Endpoints для расчётов: `POST /api/cams/{id}/calculate`
- Правильная обработка ошибок и статус коды

---

#### **Урок 1.5: Выбор технологий (FastAPI vs Next.js)**
**Основные концепции:**
- 🎯 **Критерии выбора фреймворка:** Python Backend needed, REST API для разделённой архитектуры, внешний доступ к API (MATLAB, Python scripts)
- ⚖️ **FastAPI vs Flask vs Django REST:** Сравнение по скорости (async), автодокументации (Swagger), валидации (Pydantic), type hints
- 🌐 **Когда НЕ нужен FastAPI:** Простые веб-сайты (блоги, лендинги) → Next.js Full-Stack, только веб-интерфейс без математики → Next.js
- 🚀 **Когда FastAPI идеален:** ML/AI проекты, Data Science, математические расчёты (NumPy, SciPy), работа с ИИ-ассистентами

**Технологии и инструменты:**
- FastAPI (современный, type-safe, async)
- Next.js Full-Stack (для SSR и простых проектов)
- Flask (минималистичный)
- Django REST Framework (полнофункциональный)

**Практические навыки:**
- Оценка требований проекта для выбора стека
- Понимание trade-offs между фреймворками
- Обоснование архитектурных решений

**EngineCamPro контекст:**
- Выбор FastAPI для математических расчётов кулачков (NumPy, SciPy)
- Разделённая архитектура: React Frontend + FastAPI Backend
- Swagger документация для пользователей API

---

### **Модуль 2: Backend разработка (FastAPI)** ✅ *Проанализировано*

#### **Урок 2.1: Введение в FastAPI**
**Основные концепции:**
- 🏗️ **Что такое веб-фреймворк:** Готовый "каркас" со встроенными решениями типичных задач (routing, валидация, error handling, CORS, security)
- 🧱 **Аналогия с конструктором Lego:** Готовые блоки вместо создания с нуля
- ⚡ **Автоматические возможности FastAPI:** Парсинг HTTP, валидация через Pydantic, конвертация типов, Swagger документация, обработка ошибок 422
- 🤖 **Работа с Claude Code:** Эффективный диалог с ИИ - чёткие требования, структура проекта, технологии, endpoints, итеративное улучшение

**Технологии и инструменты:**
- FastAPI framework (latest)
- Pydantic для валидации
- Uvicorn (ASGI сервер)
- CORS Middleware
- Swagger UI (автогенерация)
- Type hints (Python 3.10+)

**Практические навыки:**
- Создание FastAPI приложения через диалог с Claude Code
- Структура проекта: app/main.py, app/models.py, app/routers/, requirements.txt
- Запуск сервера: `uvicorn app.main:app --reload`
- Тестирование через Swagger UI (/docs)
- Формулирование требований для ИИ

**EngineCamPro контекст:**
- FastAPI как основа Backend для математических расчётов
- Endpoints для CRUD операций с кулачками
- Интеграция с NumPy, SciPy для расчётов профилей
- Архитектура: React (localhost:3000) ⟷ FastAPI (localhost:8000)

---

#### **Урок 2.2: HTTP методы и endpoints**
**Основные концепции:**
- 📋 **HTTP методы как глаголы:** GET ("покажи"), POST ("создай"), PUT ("замени полностью"), DELETE ("удали")
- 🔄 **CRUD операции:** Create → POST, Read → GET, Update → PUT, Delete → DELETE
- 🎯 **RESTful URL дизайн:** Существительные во множественном числе (/api/cams), иерархия через slash (/api/projects/{id}/cams), lowercase с дефисами
- 🏛️ **Идемпотентность и безопасность:** GET (safe, idempotent), POST (not safe, not idempotent), PUT/DELETE (not safe, idempotent)

**Технологии и инструменты:**
- FastAPI routing decorators (@app.get, @app.post, @app.put, @app.delete)
- Path parameters ({id})
- Query parameters (?limit=10&offset=0)
- HTTP status codes (200, 201, 204, 404, 422)

**Практические навыки:**
- Проектирование RESTful URLs для коллекций и ресурсов
- Создание CRUD endpoints через Claude Code
- Фильтрация (project_id) и пагинация (limit/offset)
- Правильные HTTP статус коды для операций
- Временное хранилище в памяти (список словарей)

**EngineCamPro контекст:**
- CRUD для кулачков: GET/POST /api/cams, GET/PUT/DELETE /api/cams/{id}
- Действия: POST /api/cams/{id}/calculate (расчёт профиля)
- Вложенные ресурсы: GET /api/projects/{id}/cams
- Фильтрация по project_id, пагинация для списков

---

#### **Урок 2.3: Pydantic модели и валидация**
**Основные концепции:**
- 🔍 **Валидация данных:** Автоматическая проверка через type hints, отклонение плохих данных (422) до обработки
- 🏭 **Аналогия с контролем качества:** Проверка деталей на заводе ДО сборки
- ⚙️ **Field валидаторы:** gt (>), ge (≥), lt (<), le (≤), min_length, max_length, description
- 🔄 **Иерархия моделей (DRY):** CamBase (общие поля) → CamCreate (наследует) → CamUpdate (опциональные) → CamResponse (+ id, timestamps)

**Технологии и инструменты:**
- Pydantic BaseModel
- Field() валидаторы (gt, ge, lt, le)
- @field_validator для кастомной валидации
- Type hints (str, float, int, Optional, list)
- Config: from_attributes = True (для ORM)

**Практические навыки:**
- Создание Pydantic моделей с валидацией
- Request vs Response модели (разделение)
- Кастомные валидаторы (@field_validator)
- Вложенные модели (ProfilePoint, ProfileResult)
- Интеграция с FastAPI endpoints (автоматическая валидация → 422)

**EngineCamPro контекст:**
- Модели для кулачков: base_radius (>0, ≤1000mm), lift (>0, ≤100mm), duration (0-360°)
- Модели для расчётов: ProfilePoint (angle, radius), CalculationParams, ProfileResult
- Автоматическая валидация входных параметров
- Swagger автодокументация из Pydantic моделей

---

#### **Урок 2.4: Обработка ошибок и HTTP статус коды**
**Основные концепции:**
- 🎯 **HTTP коды как сигналы:** 2xx = успех, 4xx = ошибка клиента, 5xx = ошибка сервера
- 🧭 **Аналогия с GPS навигатором:** 200 "маршрут построен", 404 "адрес не найден", 400 "некорректный адрес", 500 "ошибка GPS"
- 💡 **Информативные сообщения:** Конкретность (что не так), контекст (ID, параметры), помощь (как исправить), профессионализм
- 🛡️ **HTTPException в FastAPI:** raise HTTPException(status_code, detail, headers)

**Технологии и инструменты:**
- HTTPException (FastAPI)
- HTTP статус коды (200, 201, 204, 400, 404, 422, 500, 503)
- Try/except для обработки ошибок расчётов
- Глобальный exception handler

**Практические навыки:**
- Проверка существования ресурсов (404 если не найден)
- Валидация бизнес-правил (400 если lift > base_radius)
- Обработка ошибок расчётов (try/except → 400/500)
- Правильные статус коды для CRUD операций
- Глобальный exception handler для неожиданных ошибок

**EngineCamPro контекст:**
- 404 для несуществующих кулачков
- 422 для ошибок валидации (автоматически Pydantic)
- 400 для нарушения бизнес-правил (lift > base_radius)
- 500 для ошибок расчётов (NumPy division by zero)
- Информативные сообщения: "Cam with ID 123 not found. Use GET /api/cams to see all available cams."

---

#### **Урок 2.5: Middleware и CORS**
**Основные концепции:**
- 🛂 **Middleware как охранник:** Функция выполняется ПЕРЕД/ПОСЛЕ каждого запроса, общая логика для всех endpoints (logging, auth, CORS)
- 🌐 **Same-Origin Policy:** Браузеры блокируют запросы между разными origins (протокол+домен+порт)
- 🔓 **CORS решение:** Backend добавляет headers (Access-Control-Allow-Origin) разрешающие cross-origin запросы
- 🛡️ **Security Best Practices:** НЕ allow_origins=["*"], конкретные origins для dev/prod, allow_credentials для аутентификации

**Технологии и инструменты:**
- FastAPI Middleware (@app.middleware("http"))
- CORSMiddleware (allow_origins, allow_credentials, allow_methods, allow_headers)
- Preflight requests (OPTIONS)
- Environment variables для production origins

**Практические навыки:**
- Настройка CORS Middleware в FastAPI
- Создание custom middleware (logging)
- Тестирование CORS через HTML файл
- Правильные настройки для development и production
- Обработка preflight requests (автоматически)

**EngineCamPro контекст:**
- CORS для React (localhost:3000) ⟷ FastAPI (localhost:8000)
- Development: allow_origins=["http://localhost:3000", "http://localhost:3001"]
- Production: origins из env переменных (https://enginecampro.com)
- Logging middleware для мониторинга всех запросов
- Preflight requests для POST/PUT/DELETE

---

#### **Урок 2.6: Автодокументация API (Swagger)**
**Основные концепции:**
- 📘 **Документация API:** Инструкция для разработчиков - какие endpoints, параметры, форматы данных
- 🎨 **Swagger UI:** Интерактивный веб-интерфейс для просмотра документации и тестирования API в браузере
- 📱 **Аналогия с инструкцией к устройству:** Без документации = постоянные вопросы, с документацией = всё понятно за 5 минут
- 🤖 **Автогенерация FastAPI:** Код → OpenAPI Spec (JSON) → Swagger UI (автоматически!)

**Технологии и инструменты:**
- Swagger UI (/docs) - интерактивная документация
- ReDoc (/redoc) - красивая для чтения
- OpenAPI Specification (/openapi.json) - JSON схема
- FastAPI автогенерация из кода и Pydantic моделей

**Практические навыки:**
- Кастомизация FastAPI app (title, description, version, contact, license)
- Добавление descriptions в endpoints (summary, description)
- Улучшение Pydantic моделей (Field descriptions, examples, json_schema_extra)
- Группировка endpoints через tags (["Cams"], ["Projects"])
- Тестирование API через "Try it out" в Swagger UI

**EngineCamPro контекст:**
- Swagger документация для Frontend разработчиков
- Примеры запросов для пользователей MATLAB API
- Автоматическая актуализация документации при изменении кода
- Health check endpoint: GET /api/health

---

#### **Урок 2.7: REST API Best Practices**
**Основные концепции:**
- 📚 **REST Best Practices:** Правила дизайна API для удобства, расширяемости, предсказуемости
- 🔢 **Versioning:** Версионирование API (v1, v2) для обратной совместимости при breaking changes
- 📄 **Pagination:** Разделение больших списков на страницы (limit/offset или cursor) для производительности
- 🔍 **Filtering & Sorting:** Параметры запроса для фильтрации и сортировки данных (query parameters)
- 🗂️ **Resource Naming:** RESTful URL структуры (/api/v1/projects/{id}/cams) для интуитивности

**Технологии и инструменты:**
- URL versioning (/api/v1/, /api/v2/)
- Query parameters (limit, offset, sort, filter)
- Response metadata (total, page, page_size)
- Status codes best practices (200, 201, 404, 422, 500)
- HATEOAS (опционально - links в responses)

**Практические навыки:**
- Создание версионированных роутеров в FastAPI
- Реализация pagination (offset-based)
- Добавление filtering и sorting в endpoints
- Правильное использование HTTP статусов
- Структура error responses с деталями

**EngineCamPro контекст:**
- /api/v1/ для текущей версии, /api/v2/ для будущих breaking changes
- Pagination для списка проектов пользователя (limit=20, offset=0)
- Filtering по cam_type (intake/exhaust), sorting по lift или duration
- Metadata в ответах: {data: [...], total: 150, page: 1, limit: 20}
- Консистентные error responses для фронтенда

---

#### **Урок 2.8: Тестирование API (pytest)**
**Основные концепции:**
- 🧪 **Unit Testing API:** Автоматическая проверка endpoints работоспособности без ручного тестирования
- 🎯 **pytest Framework:** Python библиотека для написания и запуска тестов (простота, мощь, fixtures)
- 🔧 **Test Client:** FastAPI TestClient для симуляции HTTP requests без реального сервера
- 📊 **Test Coverage:** Процент кода покрытого тестами (цель: 80%+)
- 🚦 **TDD (Test-Driven Development):** Писать тесты ДО кода (опционально, но полезно)

**Технологии и инструменты:**
- pytest (test runner, assertions, fixtures)
- FastAPI TestClient (from fastapi.testclient)
- pytest-cov (coverage reporting)
- Fixtures для setup/teardown (test database)
- Async tests (@pytest.mark.asyncio)

**Практические навыки:**
- Настройка pytest (pytest.ini, conftest.py)
- Написание unit tests для endpoints (GET, POST, PUT, DELETE)
- Использование fixtures (test_client, test_db)
- Assertions (assert response.status_code == 200, assert data["name"] == ...)
- Running tests (pytest, pytest --cov)
- Mocking dependencies (override_get_db)

**EngineCamPro контекст:**
- tests/test_health.py для health check endpoint
- tests/test_projects.py для CRUD операций с проектами
- tests/test_cams.py для расчётов кулачков и валидации параметров
- Test database (SQLite in-memory) для изоляции
- CI/CD integration (GitHub Actions запускает pytest автоматически)

---

### **Модуль 3: Базы данных (Database)** 📊

**Статус:** ✅ Завершён (4/4 урока)

---

#### **Урок 3.1: SQL vs NoSQL - Выбор базы данных**
**Основные концепции:**
- 🗄️ **SQL vs NoSQL:** Фундаментальная разница структурированных (таблицы, схема) vs гибких (документы, JSON) баз данных
- 📚 **Аналогия Библиотека vs Склад:** SQL = каталоги с жёсткой структурой, NoSQL = коробки с произвольным содержимым
- 🔗 **Relationships:** SQL отлично для связей (User → Projects → Cams), NoSQL сложно (дублирование)
- 💾 **Целостность данных:** SQL ACID транзакции для критичных данных (платежи), NoSQL eventual consistency
- 🎯 **Выбор зависит от задачи:** Связанные данные = SQL, гибкая схема = NoSQL

**Технологии и инструменты:**
- PostgreSQL (SQL, рекомендуется для EngineCamPro)
- MongoDB (NoSQL, document-based)
- Firebase Firestore (NoSQL, real-time)
- SQLite (SQL, локальная разработка)
- pgvector (PostgreSQL extension для RAG систем)

**Практические навыки:**
- Обоснованный выбор БД для разных типов проектов
- Понимание когда нужны relationships (Foreign Keys, JOIN)
- Аргументация выбора БД через диалог с Claude Code
- Сравнение SQL vs NoSQL для конкретных use cases

**EngineCamPro контекст:**
- PostgreSQL выбран для чётких связей: User (1) → Projects (many) → Cams (many)
- Сложные запросы: "все кулачки пользователя с lift > 10mm"
- Целостность данных для Stripe subscriptions (транзакции)
- SQLAlchemy ORM для Python интеграции
- Альтернативы (MongoDB) не подходят из-за дублирования и отсутствия JOIN

---

#### **Урок 3.2: PostgreSQL и SQLAlchemy ORM**
**Основные концепции:**
- 🔄 **ORM (Object-Relational Mapping):** Переводчик между Python объектами и SQL запросами - работаешь с классами, ORM генерирует SQL
- 🗣️ **Аналогия Переводчик:** Без ORM = говоришь на SQL (сложно), с ORM = говоришь на Python (просто)
- 🔒 **SQL Injection Protection:** ORM автоматически защищает от SQL injection атак (параметризованные запросы)
- 🔗 **Relationships:** One-to-Many связи через relationship() и ForeignKey
- ⚡ **Async SQLAlchemy 2.0+:** Асинхронные операции для FastAPI (не блокируют другие запросы)

**Технологии и инструменты:**
- SQLAlchemy 2.0+ (async ORM для Python)
- AsyncSession (async database sessions)
- declarative_base() (Base class для моделей)
- Column, String, Integer, ForeignKey (типы данных)
- relationship() (связи между моделями)
- JSONB (PostgreSQL JSON column для сложных данных)

**Практические навыки:**
- Создание SQLAlchemy моделей с relationships
- Настройка async engine и session factory
- CRUD операции через ORM (create, read, update, delete)
- Использование Foreign Keys и cascade delete
- Type hints для работы с IDE и ИИ ассистентами

**EngineCamPro контекст:**
- User модель: id (Clerk UUID), email, subscription_status, relationship на projects
- Project модель: id, user_id FK, name, description, relationship на cams
- Cam модель: id, project_id FK, name, cam_type, lift, duration, profile_points (JSONB)
- Async SQLAlchemy для FastAPI endpoints
- Подключение к Supabase PostgreSQL через DATABASE_URL

---

#### **Урок 3.3: Миграции и схема БД (Alembic)**
**Основные концепции:**
- 📜 **Database Migrations:** Версионный контроль для схемы БД (как Git для кода, но для структуры таблиц)
- 🔄 **Безопасная эволюция БД:** Изменение схемы (добавить колонку) БЕЗ потери данных (миграции vs DROP TABLE)
- 🗂️ **Аналогия Version History:** Миграции = Google Docs версии (можно откатиться к любой версии)
- 🤝 **Team Sync:** Git + миграции = вся команда на одной версии схемы БД
- ⚙️ **Autogenerate:** Alembic сравнивает модели с БД и генерирует миграции автоматически

**Технологии и инструменты:**
- Alembic (миграции для SQLAlchemy)
- alembic revision --autogenerate (автогенерация)
- alembic upgrade head (применить миграции)
- alembic downgrade -1 (откат миграции)
- alembic/versions/ (папка с файлами миграций)

**Практические навыки:**
- Инициализация Alembic (alembic init)
- Настройка alembic/env.py (импорт моделей, DATABASE_URL)
- Создание initial миграции (все таблицы)
- Workflow изменения схемы: изменить модель → создать миграцию → применить
- Rollback миграций при проблемах
- Git workflow с миграциями в команде

**EngineCamPro контекст:**
- Initial migration: создание users, projects, cams таблиц
- Пример миграции: добавление поля status в projects
- Alembic autogenerate для SQLAlchemy моделей
- CI/CD автоматически применяет миграции на production
- Rollback стратегия если что-то пошло не так

---

#### **Урок 3.4: Backend-as-a-Service (Supabase)**
**Основные концепции:**
- 🏢 **Backend-as-a-Service (BaaS):** Готовый backend "из коробки" - PostgreSQL, Auth, Storage, Real-time без кода
- 🍱 **Аналогия Доставка vs Ресторан:** Supabase = заказал готовую еду (быстро, дёшево), собственный backend = строишь ресторан (долго, дорого)
- ⚡ **MVP & Startups:** BaaS идеален для быстрого запуска без backend экспертизы
- 🔐 **Row Level Security (RLS):** PostgreSQL policies на уровне строк - пользователь видит только свои данные
- 🔄 **Гибридный подход:** Supabase PostgreSQL + собственный backend для сложной логики (как EngineCamPro)

**Технологии и инструменты:**
- Supabase (PostgreSQL + Auth + Storage + Real-time)
- @supabase/supabase-js (JavaScript client)
- supabase Python library
- Row Level Security (RLS policies)
- Real-time subscriptions (WebSocket)

**Практические навыки:**
- Создание Supabase проекта (бесплатный tier)
- Подключение к Supabase из Next.js/React
- CRUD операции через Supabase client
- Настройка RLS policies для безопасности
- Real-time подписки на изменения БД
- Выбор между BaaS и собственным backend

**EngineCamPro контекст:**
- Гибридный подход: FastAPI backend (математика) + Supabase PostgreSQL (БД hosting)
- Supabase ТОЛЬКО для БД, бизнес-логика в FastAPI (NumPy, SciPy расчёты)
- Альтернативы для простых проектов: полностью Supabase для Next.js блога/SaaS
- Supabase vs Firebase: SQL vs NoSQL, PostgreSQL нужен для relationships
- Production: миграции Alembic применяются к Supabase PostgreSQL

---

---

### **Модуль 4: Frontend разработка (Frontend)** 💻

**Статус:** ✅ Завершён (6/6 уроков)

---

#### **Урок 4.1: HTML/CSS/JavaScript - Три кита веб-разработки**
**Основные концепции:**
- 🏗️ **Три слоя веб-страницы:** HTML (структура - ЧТО), CSS (оформление - КАК), JavaScript (интерактивность - ДЕЙСТВИЯ)
- 🏠 **Аналогия Строительство дома:** HTML = каркас, CSS = отделка, JavaScript = инженерные системы
- 🔀 **Разделение ответственности:** Каждый слой решает свою задачу, легко поддерживать и масштабировать
- 📐 **Imperative vs Declarative:** Vanilla JS (пошаговые инструкции КАК) vs React (описание результата ЧТО)

**Технологии и инструменты:**
- HTML5 (semantic markup, структура страницы)
- CSS3 (стилизация, layout, responsive design)
- JavaScript ES6+ (логика, события, DOM manipulation)
- Fetch API (HTTP запросы из браузера)

**Практические навыки:**
- Понимание роли каждого слоя (HTML/CSS/JS)
- Формулирование задач для Claude Code (структура → стиль → логика)
- Создание простых веб-страниц со встроенным CSS и JS
- Связь frontend с backend через HTTP запросы

**EngineCamPro контекст:**
- HTML создаёт формы ввода параметров кулачка
- CSS делает профессиональный адаптивный дизайн
- JavaScript отправляет данные на FastAPI, получает результаты, рисует графики
- Vanilla JS для понимания основ перед React

---

#### **Урок 4.2: Fetch API - Связь Frontend с Backend**
**Основные концепции:**
- 📮 **Fetch API:** Встроенный браузерный инструмент для HTTP запросов, мост между frontend (JavaScript) и backend (FastAPI)
- ⏱️ **Асинхронность:** Запросы не блокируют страницу (как официант обслуживает других пока блюдо готовится)
- 🔄 **HTTP методы из frontend:** GET (получить), POST (создать), PUT (обновить), DELETE (удалить)
- 📊 **JSON обмен:** Backend отправляет JSON, frontend парсит и отображает данные

**Технологии и инструменты:**
- Fetch API (браузерный, без библиотек)
- Promises и async/await (асинхронный JavaScript)
- JSON.parse() и JSON.stringify()
- HTTP headers (Content-Type, Authorization)
- CORS (Cross-Origin Resource Sharing)

**Практические навыки:**
- Отправка GET/POST/PUT/DELETE запросов через Fetch
- Обработка JSON ответов от backend
- Error handling (try-catch, response.ok проверка)
- Loading states и user feedback (spinner, disable кнопки)
- Controlled forms для сбора данных перед отправкой

**EngineCamPro контекст:**
- GET /api/projects → получить список проектов пользователя
- POST /api/cams → создать новый кулачок с параметрами
- POST /api/cams/{id}/calculate → отправить параметры, получить профиль
- PUT /api/cams/{id} → обновить параметры кулачка
- DELETE /api/cams/{id} → удалить кулачок

---

#### **Урок 4.3: Введение в React - Компонентный подход**
**Основные концепции:**
- 🧩 **React компоненты:** Переиспользуемые блоки UI (как блоки Lego), создал один раз → используй везде
- 📝 **Declarative style:** Описываешь ЧТО хочешь (результат), React сам разбирается КАК (отличается от Vanilla JS)
- 🎁 **Props vs State:** Props = данные от родителя (read-only), State = собственные данные компонента (mutable)
- 🔄 **Однонаправленный поток данных:** Данные текут сверху вниз (parent → child), изменение State → автоматический re-render

**Технологии и инструменты:**
- React 18+ (библиотека для UI)
- JSX (JavaScript + XML синтаксис)
- Vite (быстрый build tool для React)
- Components (функциональные компоненты)
- Props (передача данных между компонентами)

**Практические навыки:**
- Создание React проектов через Vite
- Разработка компонентной архитектуры (композиция, вложенность)
- Передача данных через props
- Понимание когда использовать React (большие приложения) vs Vanilla JS (простые страницы)
- Формулирование задач с детальной структурой компонентов

**EngineCamPro контекст:**
- <App /> содержит <Header />, <CamCalculator />, <Footer />
- <CamCalculator /> содержит <InputForm />, <ResultsDisplay />
- <InputForm /> содержит <Input /> (несколько), <Button />
- <ResultsDisplay /> содержит <Chart />, <Table />
- Переиспользуемые компоненты на всех страницах

---

#### **Урок 4.4: Компоненты и State - Управление данными**
**Основные концепции:**
- 🎮 **useState Hook:** Создание и управление State (const [count, setCount] = useState(0)), изменение через setter → автоматический re-render
- 🎛️ **Controlled Components:** Input значение контролируется React State (value={name} onChange={...}), полная синхронизация UI ↔ State
- ⚡ **useEffect Hook:** Побочные эффекты (side effects) - Fetch запросы, subscriptions, localStorage, таймеры
- 📋 **Списки и key:** Рендеринг массивов через .map(), key нужен для оптимизации (React понимает что изменилось)

**Технологии и инструменты:**
- useState (управление локальным State)
- useEffect (lifecycle events, побочные эффекты)
- Controlled inputs (двусторонняя связь)
- Conditional rendering (условный рендеринг - тернарный оператор, &&)
- Lists и key props (map, filter для массивов)

**Практические навыки:**
- Создание и изменение State через useState
- Валидация форм в реальном времени (controlled inputs)
- useEffect для загрузки данных при mount
- useEffect cleanup функции (отписка, очистка таймеров)
- Рендеринг списков с key
- Условный рендеринг (loading, error, success states)

**EngineCamPro контекст:**
- State для параметров кулачка (baseRadius, lift, duration)
- State для результатов (profile, velocity, acceleration, loading, error)
- useEffect для загрузки проектов при открытии страницы
- useEffect для автосохранения параметров в localStorage
- Controlled inputs для всех полей формы
- Список кулачков с key={cam.id} для оптимизации

---

#### **Урок 4.5: Визуализация данных - Графики и Charts**
**Основные концепции:**
- 📊 **Визуализация vs Таблицы:** 1000 чисел в таблице = непонятно, график = видна картина за секунды
- 📈 **Типы графиков:** Line (тренды, непрерывные данные), Bar (сравнение категорий), Pie (доли), Scatter (корреляции)
- 🎨 **Chart.js библиотека:** Простая, красивая, все основные типы графиков, легкая интеграция с React
- 🔄 **Интеграция:** Backend JSON → React State → преобразование в формат Chart.js → рендер через <Line /> компонент

**Технологии и инструменты:**
- Chart.js (библиотека графиков)
- react-chartjs-2 (React обёртка для Chart.js)
- Line Chart (линейные графики)
- Responsive charts (адаптивный размер)
- Tooltips и hover (интерактивность)
- Zoom и pan plugins (приближение, перемещение)

**Практические навыки:**
- Выбор правильного типа графика для данных
- Интеграция Chart.js в React компоненты
- Преобразование backend данных в формат Chart.js (labels, datasets)
- Настройка опций графиков (colors, scales, legends, tooltips)
- Responsive design для графиков
- Export графиков в PNG/SVG

**EngineCamPro контекст:**
- Line Chart для профиля кулачка (angle → radius)
- Line Chart для скорости толкателя (angle → velocity)
- Line Chart для ускорения (angle → acceleration)
- Multi-line Chart для сравнения нескольких кулачков
- Интерактивность: hover показывает точные координаты, zoom для детального анализа

---

#### **Урок 4.6: UI библиотеки - Профессиональный дизайн**
**Основные концепции:**
- 🏗️ **UI библиотеки vs с нуля:** Готовые компоненты с профессиональным дизайном (IKEA) vs создание всего вручную (плотник)
- 🎨 **Два подхода:** Utility-First CSS (Tailwind - маленькие классы, полный контроль) vs Component Libraries (готовые компоненты)
- ✨ **Tailwind CSS:** Строишь дизайн из утилитных классов прямо в JSX (bg-blue-500, hover:bg-blue-700), маленький bundle, ИИ отлично знает
- 🧩 **shadcn/ui:** Копируемые компоненты на базе Tailwind (Dialog, Dropdown, Tabs), код в твоём проекте, полная кастомизация

**Технологии и инструменты:**
- Tailwind CSS (utility-first CSS framework)
- shadcn/ui (компоненты на базе Tailwind)
- Responsive design (sm:, md:, lg: breakpoints)
- Dark mode (Tailwind dark: классы)
- Design System (цвета, spacing, typography)
- lucide-react (иконки)

**Практические навыки:**
- Настройка Tailwind CSS в React проекте
- Использование Tailwind утилитных классов
- Установка и использование shadcn/ui компонентов
- Создание адаптивного дизайна (mobile-first)
- Анимации и transitions через Tailwind
- Создание единообразного Design System

**EngineCamPro контекст:**
- Tailwind для базового дизайна (layout, формы, кнопки, карточки)
- shadcn/ui для сложных компонентов (Dialog, Dropdown, Tabs, Toast)
- Адаптивный Grid layout (1 колонка mobile → 3 колонки desktop)
- Единообразный Design System (цвета, spacing, typography)
- Professional UI без недель CSS кода
- Dark mode support для комфортной работы

---

---

### **Модуль 5: Интеграция Frontend + Backend** 🔗

**Статус:** ✅ Завершён (3/3 урока)

---

#### **Урок 5.1: Соединение Frontend и Backend - Полный цикл**
**Основные концепции:**
- 🔄 **Полный цикл запрос-ответ:** User input → Frontend (React) → HTTP → Backend (FastAPI) → расчёт → HTTP → Frontend → display результата
- 🍽️ **Аналогия Ресторан:** User (клиент) → Frontend (официант принимает заказ, показывает "готовим...") → Backend (кухня готовит) → Frontend (подаёт блюдо) → User видит результат
- 🏗️ **Разделение ответственности:** Backend = бизнес-логика + валидация + БД + безопасность, Frontend = UI/UX + интерактивность + визуализация + routing
- 🌐 **CORS настройка:** Same-Origin Policy блокирует разные origins, CORSMiddleware разрешает, allow_origins конкретные (НЕ "*" в production)

**Технологии и инструменты:**
- Fetch API (HTTP запросы из React)
- API Service Layer (централизованное управление API вызовов)
- Custom Hooks (useCamCalculation для state management)
- CORS Middleware (FastAPI)
- Environment variables (VITE_API_URL)
- Структура проекта (backend/, frontend/, services/api.js)

**Практические навыки:**
- Организация API вызовов: api.js service layer (НЕ прямой Fetch в компонентах)
- Создание custom hooks для API логики (result, loading, error, calculate)
- Настройка CORS в FastAPI (allow_origins, allow_credentials)
- Environment variables для API_URL (dev: localhost:8000, prod: enginecampro.com)
- Полный цикл интеграции: 2 терминала (backend :8000, frontend :5173)

**EngineCamPro контекст:**
- React (localhost:5173) ⟷ FastAPI (localhost:8000)
- API Service: camAPI.calculate(params), camAPI.getAll()
- Custom Hook: useCamCalculation() возвращает {result, loading, error, calculate}
- CORS: dev = ["http://localhost:5173"], prod = ["https://enginecampro.com"]
- Полный цикл: ввод параметров → POST /api/cams/calculate → NumPy расчёт → график профиля

---

#### **Урок 5.2: Обработка ошибок и Loading states - Профессиональный UX**
**Основные концепции:**
- 🚦 **Аналогия GPS:** Без обработки = пустой экран (не знаешь что происходит), с обработкой = "Поиск спутников..." (loading) или "GPS сигнал потерян" + "Что делать" (error)
- 🚨 **Типы ошибок:** Network (backend выключен), Validation (422), Not Found (404), Server (500)
- ⏳ **Loading states:** Spinner (универсальный), Progress bar (известный прогресс), Skeleton (списки), Inline text, Disabled button
- 💡 **UX принципы:** Немедленная обратная связь, понятные сообщения (НЕ "ECONNREFUSED"), предложение решения, Optimistic UI

**Технологии и инструменты:**
- Try-Catch + State (loading, error, result)
- Error Boundary (для критичных ошибок React)
- Toast notifications (sonner, react-hot-toast)
- Spinner компонент (sm/md/lg/fullscreen)
- SkeletonLoader (chart, card, list variants)
- Retry логика (auto retry для network, manual для других)

**Практические навыки:**
- Структурированные ошибки: {type, message, details, canRetry}
- Компонент <ErrorMessage /> с retry кнопкой
- parseError(response) функция для разбора backend ошибок
- Loading states: disable inputs, spinner на кнопке, skeleton для графика
- Toast: success (зелёный) и error (красный) notifications
- Exponential backoff для повторных попыток

**EngineCamPro контекст:**
- Network error: "Нет связи с сервером" + "Проверьте интернет" + Retry кнопка
- Validation error (422): "Некорректные параметры: lift > base_radius" + подсветить поля
- Loading state: форма disabled, кнопка "Calculating..." + spinner, график skeleton
- Success: toast "Расчёт завершён ✅", плавное появление графика (fade-in)
- Auto retry: network error → wait 3s → auto retry один раз

---

#### **Урок 5.3: State Management и кэширование - Оптимизация производительности**
**Основные концепции:**
- 🗂️ **Client State vs Server State:** Client = UI состояние (modal open, tab active, theme) живёт в браузере, Server = данные с backend (список кулачков, результаты) могут устареть
- 📚 **Аналогия Библиотека:** Client State = твой блокнот (закладки, заметки), Server State = книги в библиотеке (нужно запросить, могут измениться)
- 💾 **Кэширование:** Без кэша = каждый раз заново загружать (медленно), с кэшем = показать мгновенно + обновить в фоне (быстро)
- 🔄 **Стратегии кэша:** Cache-First (мгновенно из кэша, fetch в фоне), Network-First (fetch сначала, кэш fallback), Stale-While-Revalidate (показать устаревшие, обновить)

**Технологии и инструменты:**
- React Context (глобальный UI state, простой)
- Zustand (useState но глобальный, лёгкая библиотека)
- React Query / TanStack Query (для server state, индустриальный стандарт)
- useQuery (GET запросы с кэшем)
- useMutation (POST/PUT/DELETE с invalidation)
- QueryClient (управление кэшем)

**Практические навыки:**
- Когда useState достаточно vs Context vs Zustand vs React Query
- React Query setup: QueryClientProvider, staleTime, cacheTime, refetchOnWindowFocus
- Custom query hooks: useCams(), useCam(id), useCalculationHistory()
- Custom mutation hooks: useCalculateCam(), useCreateCam(), useDeleteCam()
- Optimistic updates: UI обновляется мгновенно, откат при ошибке
- Prefetching: hover на кулачке → prefetch детали (быстрый UX)

**EngineCamPro контекст:**
- Client State (Zustand): theme (dark/light), sidebar open/closed, active tab
- Server State (React Query): список кулачков (кэш 5 минут), результаты расчётов, история
- useCams(): кэш список, refetch при focus, stale через 5 минут
- useCalculateCam(): mutation с onSuccess → save to cache + invalidate history
- useDeleteCam(): Optimistic update (удалить из UI сразу), откат при ошибке
- Prefetching: hover на кулачке → prefetch детали для мгновенного открытия

---

---

### **Модуль 6: Монетизация (Monetization)** 💰

**Статус:** ✅ Завершён (2/2 урока)

---

#### **Урок 6.1: Аутентификация с Clerk - Профессиональный Auth из коробки**
**Основные концепции:**
- 🎫 **Аналогия Кинотеатр:** Без auth = любой заходит без билета (хаос), с auth = проверка билетов (контроль), VIP билет = разные права (авторизация)
- 🔐 **Аутентификация vs Авторизация:** Authentication = кто ты (проверка личности), Authorization = что можешь делать (проверка прав)
- 🛡️ **Clerk преимущества:** Готовые UI компоненты (SignIn/SignUp), JWT токены, OAuth (Google, GitHub), управление пользователями, 30 минут vs месяцы разработки
- 🔒 **JWT токены:** Frontend получает токен → сохраняет → отправляет в Authorization header → Backend проверяет → 401 если невалиден

**Технологии и инструменты:**
- Clerk (@clerk/clerk-react, clerk-backend-api)
- ClerkProvider (обёртка App)
- Clerk компоненты (<SignIn />, <SignUp />, <UserButton />, <SignedIn />, <SignedOut />)
- useAuth(), useUser() hooks
- JWT tokens (Authorization: Bearer <token>)
- Protected Routes (redirect если не залогинен)

**Практические навыки:**
- Регистрация на clerk.com, создание приложения, получение keys
- Frontend setup: ClerkProvider, SignIn/SignUp страницы, ProtectedRoute HOC, UserButton в Header
- API calls с токеном: getToken() → Authorization header
- Backend middleware: verify_token через Clerk API, Depends(get_current_user)
- Защита endpoints: user_id из токена → filter данные по user_id
- Database: добавить user_id колонку, Alembic migration

**EngineCamPro контекст:**
- Каждый user видит только свои кулачки (filter by user_id)
- Protected routes: Dashboard, Calculator, History (redirect на /sign-in если не залогинен)
- User profile: показать firstName в Header через useUser()
- Backend: GET /api/cams?user_id=xxx (автоматически из токена)
- Alembic migration: добавить user_id в cams таблицу

---

#### **Урок 6.2: Платежи и подписки с Stripe - Монетизация приложения**
**Основные концепции:**
- 💳 **Модели монетизации:** Freemium (free + premium), Subscription (подписка), Pay-per-use (за действие), One-time (разовый платёж)
- 🔄 **Stripe Checkout Flow:** User клик "Upgrade" → Backend создаёт Checkout Session → Redirect на Stripe → User платит → Webhook на backend → Обновить БД → User Pro
- 💰 **Freemium для EngineCamPro:** Free (5 расчётов/месяц, базовые функции, 7 дней хранения), Pro $19/мес (безлимит, экспорт, навсегда)
- 🔔 **Webhooks:** Stripe отправляет события (checkout.session.completed, invoice.payment_succeeded) → Backend обновляет subscription_status

**Технологии и инструменты:**
- Stripe (@stripe/stripe-js, stripe Python)
- Stripe Checkout (готовая страница оплаты)
- Stripe Dashboard (создание Products, Prices)
- Webhooks (POST /api/webhooks/stripe)
- Test cards (4242 4242 4242 4242 для тестирования)
- Subscription statuses (active, canceled, expired)

**Практические навыки:**
- Stripe setup: регистрация, создание Product и Price, получение keys
- Frontend: loadStripe, createCheckoutSession(), redirectToCheckout(), success/cancel URLs
- Backend: stripe.checkout.Session.create(), webhook handler (construct_event)
- Database: subscription_status, subscription_id, subscription_end, stripe_customer_id колонки
- Feature locks: check subscription перед premium endpoints (402 если нет подписки)
- Webhook обработка: checkout.session.completed → update user → subscription_status = "active"

**EngineCamPro контекст:**
- Free tier: max 5 кулачков, max 5 расчётов/месяц, нет экспорта
- Pro tier $19/мес: безлимит кулачков/расчётов, экспорт в CSV/PDF, расширенная аналитика
- Pricing page: карточки Free vs Pro с feature comparison, кнопка "Upgrade to Pro"
- Feature locks в UI: {!isPro && <UpgradePrompt />}, disable export button для Free
- Backend checks: if cam_count >= 5 and not has_subscription → raise HTTPException(402)
- Webhook: обновить user.subscription_end = now + 30 days при успешном платеже

---

---

### **Модуль 7: Deploy и Production** 🚀

**Статус:** ✅ Завершён (2/2 урока)

---

#### **Урок 7.1: Выбор платформы для Deploy - Где хостить приложение**
**Основные концепции:**
- 🖥️ **Development vs Production:** Development = localhost (только на компьютере, debug, hot reload, нет security), Production = интернет (доступно всем, оптимизировано, HTTPS, мониторинг)
- 🏢 **PaaS vs IaaS:** PaaS (Vercel, Railway) = git push и всё (простота, дорого), IaaS (DigitalOcean, AWS EC2) = полный контроль (сложно, дёшево при масштабе)
- 💰 **Стоимость хостинга:** 100 users = ~$20/мес (Vercel free + Railway $20), 1000 users = ~$115/мес операционных + $1900 revenue = $1785 profit
- 📊 **Рекомендации для EngineCamPro:** Frontend = Vercel (React оптимизирован, CDN, бесплатный SSL), Backend = Railway (PostgreSQL встроенная, простой, автоматический HTTPS)

**Технологии и инструменты:**
- Vercel (Frontend PaaS, git push deploy, CDN, Preview deployments)
- Railway (Backend PaaS, PostgreSQL, environment variables, logs)
- Alternatives: Netlify, Render, Fly.io, Heroku, DigitalOcean
- vercel.json (config для Vercel)
- railway.json (config для Railway)
- gunicorn (production WSGI server для Python)

**Практические навыки:**
- Подготовка Frontend: vercel.json, .env.production.template, build script проверка
- Подготовка Backend: railway.json, requirements.txt (gunicorn, psycopg2-binary), health check endpoint, production CORS
- Environment variables: разделение dev vs prod keys (VITE_API_URL, Clerk, Stripe)
- .gitignore: исключение всех секретов (.env*, __pycache__, node_modules)
- DEPLOY.md документация: пошаговые инструкции для team

**EngineCamPro контекст:**
- Frontend → Vercel: enginecampro.vercel.app, Free tier (100GB bandwidth достаточно)
- Backend → Railway: enginecampro-backend.railway.app, ~$20/мес (instance + PostgreSQL)
- Production CORS: allow_origins=["https://enginecampro.vercel.app", "https://*.vercel.app"]
- Stripe webhooks: https://enginecampro-backend.railway.app/api/webhooks/stripe
- Custom domain (опционально): enginecampro.com → DNS настройка

---

#### **Урок 7.2: Production Deploy - Финальный запуск приложения**
**Основные концепции:**
- 🔄 **Deploy pipeline:** git push → platform detects → clone → install deps → build → apply env vars → start → health checks → route traffic → Live!
- ✅ **Pre-launch checklist:** Frontend deployed, backend deployed, DB + migrations, environment variables, integrations (Clerk, Stripe), testing (sign up, payment, features)
- 🔧 **Troubleshooting:** Frontend blank screen = wrong API_URL or CORS, Backend 502 = crashed (check logs), DB connection error = wrong DATABASE_URL
- 📊 **Post-launch monitoring:** Active users, conversions, revenue, error rate (<1%), response time (<2s), Free→Pro conversion (>2%)

**Технологии и инструменты:**
- Vercel deploy: Import GitHub repo, Framework=Vite, Build=npm run build, Output=dist, Environment Variables
- Railway deploy: New Project from GitHub, Add PostgreSQL, Start Command=gunicorn, alembic upgrade head
- Stripe Webhooks: Developers → Add endpoint → Select events (checkout.session.completed) → Copy signing secret
- Health checks: GET /health endpoint для monitoring
- Logs monitoring: Railway dashboard, Vercel analytics

**Практические навыки:**
- Vercel deployment: Connect GitHub repo, configure build settings, add environment variables, custom domain
- Railway deployment: Deploy from GitHub, add PostgreSQL service, set Start Command, run migrations via Shell
- Connecting Frontend ↔ Backend: Update CORS on backend, update VITE_API_URL on frontend, redeploy
- Stripe production webhook: Add endpoint URL, select events, copy signing secret to Railway env
- Production testing: Sign up flow, calculations, upgrade to Pro, payment (test card 4242...)

**EngineCamPro контекст:**
- Vercel: https://enginecampro.vercel.app, Environment variables (VITE_API_URL, Clerk pk_live, Stripe pk_live)
- Railway: https://enginecampro-backend.railway.app, DATABASE_URL автоматически, gunicorn workers=2
- Production checklist: No console errors, API working, Clerk/Stripe production keys, webhooks configured
- Monitoring: Vercel analytics (traffic), Railway metrics (performance), Stripe dashboard (revenue), Clerk dashboard (users)
- Launch day: Double check, monitor logs, share link, gather feedback, iterate

---

---

### **Модуль 8: Next.js Full-Stack JavaScript (опциональный)** ⚙️

**Статус:** ✅ Завершён (6/6 уроков)  
**Назначение:** Альтернативный подход к веб-разработке - Full-Stack на одном языке (JavaScript/TypeScript)

---

#### **Урок 8-intro: Node.js, TypeScript и npm - JavaScript на сервере**
**Основные концепции:**
- 🖥️ **Node.js как runtime:** Node.js = JavaScript вне браузера (как Python интерпретатор), V8 engine от Google Chrome, асинхронная архитектура (event loop), пакетный менеджер npm
- 📘 **TypeScript = JavaScript + типы:** TypeScript компилируется в JavaScript (как coffee → espresso), статическая типизация предотвращает ошибки, лучше для ИИ code generation (типы = подсказки), автокомплит в IDE
- 📦 **npm - пакетный менеджер:** npm = pip для JavaScript (node_modules = site-packages), package.json = requirements.txt, npm install = pip install, огромная экосистема пакетов
- 🔄 **Python Backend vs JavaScript Full-Stack:** Python = 2 языка (Python backend + JavaScript frontend), JavaScript = 1 язык (JavaScript везде), выбор зависит от потребностей (Python для NumPy/ML, JavaScript для простоты)

**Технологии и инструменты:**
- Node.js (JavaScript runtime для сервера)
- TypeScript (типизированный JavaScript)
- npm (Node Package Manager)
- V8 Engine (JavaScript движок от Chrome)
- package.json (конфигурация проекта и зависимостей)
- tsconfig.json (настройки TypeScript компилятора)

**Практические навыки:**
- Установка Node.js и npm (nvm recommended)
- Создание package.json (npm init)
- Установка зависимостей (npm install express typescript)
- Написание TypeScript кода с типами (string, number, interface)
- Компиляция TypeScript → JavaScript (tsc)
- Понимание когда использовать Python vs JavaScript для backend

**EngineCamPro контекст:**
- EngineCamPro использует **Python + FastAPI** (не Next.js), почему?
- Причина: NumPy для математических расчётов кулачков (векторные операции)
- Python библиотеки для инженерных расчётов (SciPy, Matplotlib)
- JavaScript не имеет аналогов NumPy такого же уровня
- Но для простых CRUD приложений Next.js отличный выбор (блоги, CMS, e-commerce без сложной математики)

---

#### **Урок 8.0: Full-Stack на одном языке - JavaScript везде**
**Основные концепции:**
- 🏛️ **Monolithic vs Separated:** Monolithic (Next.js) = один проект, один язык, один деплой, все в frontend; Separated (FastAPI+React) = два проекта, два языка, два деплоя, явный REST API
- 🔄 **Когда Monolith лучше:** Простые CRUD (блоги, dashboards), команда знает только JavaScript, быстрый MVP (меньше настройки), не нужны Python библиотеки
- 🔄 **Когда Separated лучше:** Нужны Python библиотеки (NumPy, SciPy, ML), backend используется не только фронтом (мобильное app, API для партнёров), разные команды (backend/frontend специалисты)
- 📊 **Trade-offs:** Monolith = меньше кода, быстрая разработка, но меньше гибкости; Separated = больше контроля, масштабируемость, но больше complexity

**Технологии и инструменты:**
- Next.js (React framework для Full-Stack)
- FastAPI + React (Separated архитектура)
- Server Actions (Next.js функции на сервере)
- REST API (явные HTTP endpoints)
- Vercel (PaaS оптимизированный для Next.js)
- Railway/Render (Backend hosting)

**Практические навыки:**
- Создание Next.js проекта (npx create-next-app@latest)
- Структура Next.js: app/ directory, Server Components, Client Components
- Сравнение архитектур: один репозиторий vs два
- Выбор подхода для конкретного проекта (decision matrix)
- Понимание deployment differences (один build vs два)

**EngineCamPro контекст:**
- EngineCamPro выбрал **Separated architecture** (FastAPI + React):
  - Причина 1: NumPy для математики кулачков (Python обязателен)
  - Причина 2: Возможность интеграции с MATLAB/Simulink в будущем
  - Причина 3: API может использоваться мобильным приложением позже
- Если бы EngineCamPro был простым CRUD без математики → Next.js был бы хорошим выбором
- Trade-off: больше complexity setup, но больше flexibility

---

#### **Урок 8.1: Monolith vs Separated - Выбор архитектуры**
**Основные концепции:**
- 🏗️ **Monolithic архитектура:** Один проект, один codebase, frontend + backend вместе, deployment одной командой (git push → build → deploy), проще для небольших проектов
- 🔀 **Separated архитектура:** Два проекта (frontend repo + backend repo), разные языки/frameworks, два deployment процесса, нужен CORS setup, сложнее но масштабируемее
- 🎯 **Decision Matrix:** Простой CRUD + JavaScript команда + быстрый MVP → Monolith; Python нужен ИЛИ mobile app ИЛИ большая команда → Separated
- 🚀 **Deployment differences:** Monolith = Vercel (один клик), Separated = Vercel (frontend) + Railway (backend) + CORS настройка

**Технологии и инструменты:**
- Next.js (Monolithic framework)
- FastAPI + React (Separated stack)
- CORS (Cross-Origin Resource Sharing для Separated)
- Vercel (Next.js hosting)
- Railway (Backend hosting)
- Docker (опционально для orchestration)

**Практические навыки:**
- Сравнение project structures: single repo vs multi-repo
- CORS configuration для Separated (allow_origins)
- Deployment workflows: single build vs dual build
- Choosing architecture based on requirements
- Team structure considerations (full-stack vs specialists)

**EngineCamPro контекст:**
- Выбор: **Separated architecture**
- Причины:
  - NumPy/SciPy для расчётов кулачков (Python required)
  - Возможность API для MATLAB integration
  - Swagger documentation для партнёров
  - Mobile app в roadmap (React Native + same API)
- Trade-offs принятые:
  - (+) Flexibility: backend переиспользуется для mobile
  - (+) Scalability: можно масштабировать frontend/backend независимо
  - (-) Complexity: CORS setup, два деплоя, environment variables в двух местах
  - (-) Development: нужно запускать два сервера локально

---

#### **Урок 8.2: Server Actions vs REST API - Способы коммуникации**
**Основные концепции:**
- ⚡ **Server Actions (Next.js):** Функции помеченные "use server" автоматически становятся API endpoints, вызываются как обычные функции (magic), не нужен fetch(), нет явных HTTP методов
- 🌐 **REST API (FastAPI):** Явные HTTP endpoints (POST /api/users), используется fetch() на frontend, Swagger documentation автоматически, доступ из любого клиента (не только Next.js frontend)
- 🔄 **Trade-offs:** Server Actions = меньше кода, проще для internal logic, но только для Next.js; REST API = explicit, универсальный, documentable, но больше boilerplate
- 📊 **Когда что использовать:** Server Actions для internal (form submissions, mutations), REST API для public (mobile apps, партнёры, external integrations)

**Технологии и инструменты:**
- Next.js Server Actions (async functions with "use server")
- FastAPI REST endpoints (@app.post("/api/..."))
- fetch() API (для HTTP запросов)
- Swagger/OpenAPI (автоматическая документация REST API)
- Zod (validation для Server Actions)
- Pydantic (validation для FastAPI)

**Практические навыки:**
- Создание Server Actions в Next.js (async function + "use server")
- Создание REST endpoints в FastAPI (@app.post)
- Вызов Server Actions из Client Components (import и вызов)
- Вызов REST API через fetch() с error handling
- Понимание когда использовать каждый подход

**EngineCamPro контекст:**
- Выбор: **REST API (FastAPI)**
- Причины:
  - External access: планируется MATLAB plugin (вызов API из MATLAB)
  - Documentation: Swagger docs для демо клиентам и партнёрам
  - Mobile app: React Native будет использовать тот же API
  - Testing: легко тестировать через curl/Postman
- Server Actions не подходят:
  - Работают только с Next.js frontend
  - Нет Swagger documentation
  - MATLAB не может вызвать Server Actions
- Trade-off: больше кода (fetch на frontend), но универсальность

---

#### **Урок 8.3: SSR vs CSR - Рендеринг на сервере или клиенте**
**Основные концепции:**
- 🖥️ **CSR (Client-Side Rendering):** HTML создаётся в браузере через JavaScript, пустой HTML + большой JS bundle, React из Модуля 4, плохо для SEO (поисковики видят пустую страницу), быстрая навигация после загрузки
- 🌐 **SSR (Server-Side Rendering):** HTML создаётся на сервере, браузер получает готовый HTML, хорошо для SEO, быстрый First Contentful Paint, Next.js специализируется на SSR
- 📄 **SSG (Static Site Generation):** HTML создаётся при build time (не runtime), самый быстрый вариант, для контента который меняется редко (блоги, landing pages), Next.js поддерживает
- 💧 **Hydration:** Процесс "оживления" HTML от сервера → интерактивный React app, сначала видишь контент (SSR HTML), затем React подключает event handlers

**Технологии и инструменты:**
- Next.js SSR (Server Components, getServerSideProps)
- React CSR (Create React App, Vite)
- SSG (getStaticProps, generateStaticParams)
- Hydration process (React 18)
- Server Components vs Client Components (Next.js 13+)
- Loading states и Suspense

**Практические навыки:**
- Создание Server Components в Next.js (default в app directory)
- Создание Client Components ("use client" directive)
- Понимание когда использовать SSR vs CSR vs SSG
- SEO optimization через SSR
- Performance optimization (First Contentful Paint, Time to Interactive)

**EngineCamPro контекст:**
- Использует **CSR (Client-Side Rendering)** через Vite + React:
- Причины:
  - EngineCamPro = dashboard за логином (SEO не критично, Google не индексирует приватный контент)
  - Интерактивность важнее (графики, расчёты в реальном времени)
  - Простота deployment (Vercel static hosting бесплатный)
- SSR не нужен:
  - Нет публичного контента для SEO (всё за авторизацией)
  - Landing page может быть separate (simple HTML или SSG)
- Trade-off: медленнее First Load (bundle.js ~200KB), но быстрая навигация после

---

#### **Урок 8.4: File-Based Routing vs React Router - Организация навигации**
**Основные концепции:**
- 📂 **File-Based Routing (Next.js):** Структура папок = routes автоматически, app/dashboard/page.tsx → /dashboard, app/users/[id]/page.tsx → /users/123, не нужно писать Route конфигурацию
- 🗺️ **React Router (Vite/CRA):** Explicit route definitions в коде, createBrowserRouter с конфигурацией, больше flexibility в структуре папок, Route компоненты с path props
- 🎯 **Trade-offs:** File-Based = convention over configuration (быстрее для стандартных случаев), React Router = explicit control (гибкость для сложных случаев)
- 📊 **Layouts и nested routes:** File-Based использует layout.tsx для вложенных макетов, React Router использует Outlet для nested routes, оба поддерживают loading states и error boundaries

**Технологии и инструменты:**
- Next.js App Router (app directory, file-based routing)
- React Router v6 (createBrowserRouter, Routes, Route)
- Dynamic routes ([id] в Next.js, :id в React Router)
- Layouts (layout.tsx в Next.js, Outlet в React Router)
- Loading states (loading.tsx, Suspense)
- Error boundaries (error.tsx)

**Практические навыки:**
- Создание routes через файлы в Next.js (app/about/page.tsx)
- Создание routes через React Router (createBrowserRouter)
- Dynamic routes с параметрами ([id] или :id)
- Nested layouts и shared components
- Navigation (Link component, useRouter/useNavigate)

**EngineCamPro контекст:**
- Использует **React Router** (Vite + React):
- Причины:
  - Separated architecture (frontend отдельно от backend)
  - Flexibility: сложная навигация с условными routes (isPro check)
  - Опыт команды: React Router хорошо знаком
- Структура routes:
  - / → Landing page (public)
  - /dashboard → Authenticated layout → Cams list
  - /cams/new → Create cam form
  - /cams/:id → Cam details
  - /settings → User settings (subscription status)
- File-Based routing не нужен:
  - Нет SSR (routes не влияют на SEO)
  - Сложная логика (conditional redirects based on subscription)
  - Предпочтение explicit over implicit

---

---

### **Модуль 9: RAG + AI Agent для образовательной платформы (опциональный)** 🤖

**Статус:** ✅ Завершён (9/9 уроков)  
**Назначение:** Создание production-ready AI агента с длинным контекстом для образовательных платформ

---

#### **Урок 9-overview: Структура модуля RAG + AI**
**Основные концепции:**
- 🎯 **Цель модуля:** Создать AI помощника который знает весь курс (350K токенов) и отвечает на вопросы студентов в реальном времени
- 💰 **Стоимость системы:** Индексация: ~$50 one-time, Эксплуатация: $30-150/месяц (GPT-3.5 vs GPT-4), для 100 студентов × 20 вопросов/месяц
- 📚 **Технологии:** LangChain (RAG framework), OpenAI API (embeddings + GPT), pgvector или Pinecone (vector database), WebSocket (real-time chat)
- 🎓 **Use case:** Студент изучает урок → задаёт вопрос AI → AI ищет в курсе → отвечает с ссылками на уроки

**Технологии и инструменты:**
- LangChain (RAG orchestration framework)
- OpenAI API (text-embedding-ada-002, GPT-3.5-turbo/GPT-4)
- pgvector (PostgreSQL extension для векторов)
- Pinecone (managed vector database, $70/мес)
- ChromaDB (self-hosted vector DB, бесплатный)
- FastAPI WebSocket (real-time streaming)

**Практические навыки:**
- Understanding RAG architecture: Documents → Chunks → Embeddings → Vector DB → Similarity Search → LLM
- Cost estimation для AI features
- Choosing vector database (pgvector vs Pinecone vs ChromaDB)
- Prerequisites: Python, FastAPI, PostgreSQL (Modules 1-7)

**EngineCamPro контекст:**
- Применение: AI помощник для уроков по CAM design
- Студент спрашивает: "Как рассчитать радиус основания кулачка?"
- AI находит релевантные уроки (векторный поиск по всему курсу)
- Отвечает: "Радиус основания R₀ = ... (см. Урок 3.2: Базовая окружность)"
- Стоимость: ~$50-100/месяц для 100 студентов (предполагая 10-20 вопросов на студента)

---

#### **Урок 9.0: Введение в RAG - Retrieval-Augmented Generation**
**Основные концепции:**
- 🧠 **Проблема LLM:** Модели обучены на старых данных (training cutoff), не знают твой кастомный контент (курс, документация), hallucination (выдумывают факты)
- 🔍 **RAG решение:** Retrieval = поиск релевантных документов, Augmented = добавление найденного в промпт, Generation = LLM генерирует ответ на основе контекста
- 📊 **Архитектура RAG:** 1) Индексация: Документы → Chunking (разбить на части) → Embeddings (векторы) → Vector DB; 2) Запрос: Вопрос → Embedding → Similarity search → Top-K chunks → LLM
- ⚖️ **RAG vs Fine-tuning:** RAG дешевле ($1 vs $1000+), быстрее обновлять (просто добавить документы), показывает sources (ссылки на уроки), идеально для образования

**Технологии и инструменты:**
- RAG pipeline (indexing + retrieval + generation)
- Chunking strategies (1000 chars, 200 overlap)
- Text embeddings (OpenAI text-embedding-ada-002)
- Vector similarity search (cosine similarity)
- LLM prompting (context + question)

**Практические навыки:**
- Understanding RAG workflow end-to-end
- Chunking documents optimally (size vs overlap)
- Creating embeddings from text
- Similarity search mechanics (cosine distance)
- Prompt engineering with context

**EngineCamPro контекст:**
- Курс CAM design: 50 уроков → 1,500+ chunks (после chunking)
- Студент: "Что такое подъёмник кулачка?" → Embedding вопроса → Поиск топ-3 похожих chunks
- Найденные chunks: Урок 2.1 (определение), Урок 3.4 (формулы), Урок 5.2 (практика)
- LLM получает: "Контекст из уроков: [chunks] Вопрос: Что такое подъёмник?" → Ответ с источниками
- Hallucination prevention: LLM отвечает ТОЛЬКО на основе контекста (не выдумывает)

---

#### **Урок 9.1: Embeddings и векторные базы данных**
**Основные концепции:**
- 📐 **Embeddings:** Текст преобразуется в вектор из 1536 чисел (OpenAI text-embedding-ada-002), похожие тексты имеют близкие векторы, semantic search (поиск по смыслу, не по словам)
- 🔢 **Cosine similarity:** Мера близости векторов (от -1 до 1), >0.9 = очень похожи, <0.5 = разные, используется для поиска релевантных chunks
- 💾 **Vector databases:** Специальные БД для хранения и поиска векторов, pgvector (PostgreSQL extension, бесплатный), Pinecone (managed, $70/мес), ChromaDB (self-hosted, бесплатный)
- ✂️ **Chunking strategy:** Разбиение длинных документов на части (1000 chars, 200 overlap для сохранения контекста), 500 уроков → ~1,847 chunks после chunking

**Технологии и инструменты:**
- OpenAI Embeddings API (text-embedding-ada-002, $0.0001/1K tokens)
- pgvector (PostgreSQL extension, vector operations)
- Pinecone (managed vector DB, similarity search)
- ChromaDB (open-source vector DB)
- Cosine similarity (vector distance metric)
- RecursiveCharacterTextSplitter (LangChain chunking)

**Практические навыки:**
- Creating embeddings via OpenAI API
- Installing and configuring pgvector
- Storing vectors in database
- Performing similarity search (ORDER BY vector <=> query LIMIT k)
- Chunking documents with overlap
- Calculating cosine similarity

**EngineCamPro контекст:**
- Курс: 50 уроков × ~10 страниц = 500 страниц текста
- Chunking: 500 страниц → 1,500-2,000 chunks (1000 chars каждый)
- Embeddings: 2,000 chunks × $0.0001/1K tokens ≈ $0.20 (one-time indexing cost)
- Vector DB choice: **pgvector** (бесплатный, достаточно для <10K chunks, уже используем PostgreSQL)
- Поиск: "подъёмник кулачка" → embedding → топ-3 самых близких chunks (cosine similarity >0.85)

---

#### **Урок 9.2: LangChain - Framework для RAG систем**
**Основные концепции:**
- 🔗 **LangChain назначение:** Framework для соединения RAG компонентов в chains (цепочки), Document Loaders → Text Splitters → Vector Stores → Retrieval → QA Chains
- 📚 **Document Loaders:** Загрузка Markdown/PDF/HTML файлов с metadata (module, lesson, filepath), DirectoryLoader для batch обработки папок
- ✂️ **Text Splitters:** RecursiveCharacterTextSplitter (умное разбиение по параграфам/предложениям), сохраняет metadata для каждого chunk
- 💾 **Vector Stores:** PGVector wrapper (простой API для pgvector), add_documents() для индексации, similarity_search() для поиска
- 🤖 **QA Chains:** RetrievalQA (простая цепочка: вопрос → retrieval → LLM), ConversationalRetrievalChain (с памятью диалога), ConversationBufferMemory для истории

**Технологии и инструменты:**
- LangChain Python library (orchestration)
- DirectoryLoader (batch file loading)
- RecursiveCharacterTextSplitter (smart chunking)
- PGVector (vector store wrapper)
- RetrievalQA chain (question answering)
- ConversationalRetrievalChain (with memory)
- ConversationBufferMemory (chat history)

**Практические навыки:**
- Loading documents with metadata
- Splitting documents preserving structure
- Creating vector store with PGVector
- Building RetrievalQA chain
- Adding conversation memory
- Retrieving source documents (show_sources=True)

**EngineCamPro контекст:**
- Implementation:
  ```python
  # 1. Load lessons
  loader = DirectoryLoader("lessons/", glob="**/*.md")
  docs = loader.load()
  
  # 2. Split
  splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
  chunks = splitter.split_documents(docs)
  
  # 3. Create vector store
  vectorstore = PGVector.from_documents(chunks, embeddings, connection_string)
  
  # 4. Create QA chain
  qa = ConversationalRetrievalChain.from_llm(
      llm=ChatOpenAI(model="gpt-3.5-turbo"),
      retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
      memory=ConversationBufferMemory()
  )
  
  # 5. Ask question
  result = qa({"question": "Что такое подъёмник кулачка?"})
  print(result["answer"])  # Answer with sources
  ```

---

#### **Урок 9.3: WebSocket для real-time чата**
**Основные концепции:**
- 🔄 **HTTP vs WebSocket:** HTTP = request/response (новое соединение каждый раз, нет промежуточных обновлений), WebSocket = постоянное соединение (двунаправленное, streaming поддерживается)
- 📡 **Streaming ответов:** OpenAI API с stream=True → ответ приходит частями (как ChatGPT), каждый chunk отправляется через WebSocket → студент видит ответ в реальном времени
- 🛡️ **Error handling:** Reconnection автоматическое (при обрыве связи), Timeout защита (60 секунд), Rate limiting (10 запросов/минуту на пользователя)
- 💾 **Сохранение истории:** PostgreSQL таблицы (chat_sessions, chat_messages), сохранение каждого вопроса и ответа, загрузка истории при reconnect

**Технологии и инструменты:**
- FastAPI WebSocket (@app.websocket("/ws/chat"))
- OpenAI streaming (stream=True in ChatCompletion)
- WebSocket client (JavaScript WebSocket API)
- Reconnection logic (setTimeout for retry)
- Rate limiting (slowapi или custom)
- PostgreSQL (chat history storage)

**Практические навыки:**
- Creating WebSocket endpoint in FastAPI
- Handling WebSocket lifecycle (accept, receive, send, close)
- Streaming OpenAI responses via WebSocket
- Implementing reconnection on client
- Rate limiting WebSocket connections
- Storing chat messages in database

**EngineCamPro контекст:**
- Implementation:
  - WebSocket endpoint: `/ws/chat/{user_id}`
  - Student asks: "Объясни базовую окружность"
  - Backend: RAG поиск → OpenAI streaming → каждый chunk через WebSocket
  - Frontend: показывает ответ по мере получения (как ChatGPT)
  - UX improvement: студент видит прогресс (не кажется что зависло)
- Rate limiting: 10 вопросов/минуту на студента (защита от spam)
- History: сохранение в PostgreSQL для review преподавателем

---

#### **Урок 9.4: Интеграция AI агента в платформу**
**Основные концепции:**
- 🎨 **UI/UX дизайн:** Плавающая кнопка чата (fixed bottom-right), красивый дизайн с аватарами (Bot icon для AI, User icon), Markdown рендеринг ответов, показ источников (📚 Урок 3.2)
- 🎯 **Контекстная помощь:** AI знает текущий урок студента (lesson_id в WebSocket), приоритет текущему модулю при RAG поиске, быстрые подсказки ("Объясни проще", "Покажи пример")
- 📊 **Аналитика использования:** PostgreSQL таблица ai_chat_analytics (user_id, lesson_id, question, answer_length, response_time_ms, thumbs_up), Thumbs up/down feedback от студентов, Dashboard для преподавателя (топ вопросов, satisfaction rate)
- 🚀 **Production готовность:** Environment variables (OPENAI_API_KEY), Rate limiting, Monitoring (Prometheus metrics), Caching ответов (Redis, 1 час TTL)

**Технологии и инструменты:**
- React components (FloatingChatButton, AIChat, MessageWithFeedback)
- Tailwind CSS (beautiful chat UI)
- react-markdown (render AI responses)
- lucide-react (icons: Bot, User, Send, ThumbsUp)
- PostgreSQL (analytics table)
- Redis (response caching)
- Prometheus (metrics: ai_questions_total, ai_response_time)

**Практические навыки:**
- Creating floating chat button component
- Building real-time chat UI with streaming
- Context-aware RAG (filter by current module)
- Collecting analytics (response time, satisfaction)
- Caching common questions (Redis)
- Monitoring AI usage (Prometheus metrics)

**EngineCamPro контекст:**
- UI: плавающая кнопка 💬 на каждой странице урока
- Context: студент на "Урок 3.2: Базовая окружность" → AI знает контекст
- Quick prompts: "Объясни формулу проще", "Покажи пример расчёта", "Дай практическое задание"
- Analytics для преподавателя:
  - Топ вопросы: "Как рассчитать R₀?" (спрашивали 47 раз)
  - Satisfaction: 92% thumbs up (отличное качество ответов)
  - Average response time: 1.8 секунды
- Cost tracking: dashboard показывает $45 потрачено за месяц (100 студентов)

---

#### **Урок 9.5: Длинный контекст vs RAG - Выбор подхода**
**Основные концепции:**
- 🔀 **Два подхода:** RAG = передаём только релевантное (~30K токенов), Long Context = передаём ВСЁ (350K токенов курса сразу), разные trade-offs по стоимости и качеству
- 💰 **Стоимость сравнение:** RAG: ~$120/мес для 100 студентов (дешевле но сложнее), Long Context: ~$290-350/мес (дороже но проще и качественнее)
- 🎯 **Когда Long Context лучше:** Курс ≤1M токенов (влезает в контекст), стабильный контент (редко обновляется), нужны связи между темами (AI видит ВСЁ), быстрая разработка (MVP за выходные)
- 🤖 **Gemini 2.5 Flash рекомендация:** $0.30/1M входных токенов, Prompt Caching = 90% скидка ($0.075/1M кэшированных), итого $2.90-3.50 за студента/месяц, лучшее соотношение цена/качество

**Технологии и инструменты:**
- Gemini 2.5 Flash (1M context, prompt caching)
- GPT-4.1 Mini (1M context, 75% cache discount)
- Claude Sonnet 4.5 (1M context, 90% cache, дорого)
- Prompt Caching (cache static content)
- Long context models (1M+ tokens)

**Практические навыки:**
- Comparing RAG vs Long Context approaches
- Calculating costs for different models
- Understanding Prompt Caching mechanics
- Choosing optimal model (Gemini 2.5 Flash)
- Architectural decision-making

**EngineCamPro контекст:**
- Курс: 50 уроков ≈ 350K токенов (влезает в 1M контекст)
- Выбор: **Long Context с Gemini 2.5 Flash**
- Причины:
  - 350K токенов легко влезает в 1M контекст
  - AI видит ВСЕ связи между уроками (лучшее качество)
  - Prompt Caching экономит 90% (повторные запросы дешёвые)
  - Простота: один API вызов вместо RAG pipeline
- Стоимость: $2.90-3.50 за студента/месяц (приемлемо)
- Trade-off: дороже чем RAG ($1.20/студент), но качественнее и проще

---

#### **Урок 9.6: AI агент с Gemini 2.5 Flash**
**Основные концепции:**
- 🔑 **Google AI Studio setup:** ai.google.dev → Get API key → бесплатный tier (15 RPM, достаточно для тестирования), не нужна кредитная карта
- 📚 **Подготовка контента:** Объединить все уроки в один файл (all_lessons.txt), Python скрипт для обхода папок lessons/ и concatenation, итого ~350K токенов
- 💻 **Streamlit MVP:** Быстрый интерфейс за 1-2 часа (только Python, без React), Prompt Caching setup (explicit mode), тестирование на free tier
- 🚀 **Production (React + FastAPI):** Backend: FastAPI endpoint POST /api/chat, Gemini client с Prompt Caching, Frontend: React чат интерфейс, Markdown рендеринг, стоимость показывается

**Технологии и инструменты:**
- Google AI Studio (API key management)
- Gemini 2.5 Flash API (google-generativeai Python SDK)
- Prompt Caching (90% discount на cached tokens)
- Streamlit (rapid MVP prototyping)
- FastAPI backend (production API)
- React frontend (beautiful UI)

**Практические навыки:**
- Getting Google AI Studio API key
- Combining course lessons into single file
- Creating Streamlit chat interface
- Implementing Prompt Caching (cache course content)
- Building FastAPI endpoint for AI chat
- Monitoring costs (input_tokens, cached_tokens, cost per query)

**EngineCamPro контекст:**
- Setup:
  1. Google AI Studio → API key (free tier для тестирования)
  2. Python script: combine all 50 lessons → all_lessons.txt (350K tokens)
  3. Streamlit MVP: тестирование за день (prompt caching works!)
  4. Production: FastAPI backend + React frontend
- Prompt Caching:
  - Первый запрос: $0.105 (весь курс 350K без кэша)
  - Последующие: $0.026 (кэш активирован, экономия 75%)
  - Cache hit rate: 70-80% (большинство запросов используют кэш)
- Free tier testing: 15 RPM достаточно для 2-5 одновременных студентов

---

#### **Урок 9.7: Production оптимизация и масштабирование**
**Основные концепции:**
- 📊 **Мониторинг затрат:** Dashboard с метриками (Cost Per Query = $0.03-0.10, Cache Hit Rate >80%, TTFT <800ms), Prometheus для metrics, логирование каждого запроса
- 🛡️ **Rate Limiting и защита:** 3 уровня: провайдер (Gemini 15 RPM free tier), приложение (10 req/min на пользователя), бюджет (дневной лимит $20)
- 🔧 **Error handling:** Retry с exponential backoff (429, 503 ошибки), Fallback на GPT-4.1 Mini при outage Gemini, понятные сообщения студентам
- 📈 **Масштабирование:** Free tier (<50 студентов) → Tier 1 upgrade (50-100 студентов, $250+ spending) → Hybrid модели (100-300, дешёвая для простых + премиум для сложных) → Tier 2 или multiple API keys (300-500+)

**Технологии и инструменты:**
- Monitoring dashboard (Streamlit или custom)
- Prometheus metrics (ai_questions_total, ai_response_time)
- slowapi (rate limiting for FastAPI)
- Redis (budget tracking, response caching)
- Exponential backoff (retry logic)
- Multi-model routing (Gemini + GPT + Claude)

**Практические навыки:**
- Building monitoring dashboard (costs, latency, cache hit rate)
- Implementing multi-level rate limiting
- Handling API errors gracefully (retry, fallback)
- Optimizing costs (dynamic cache TTL, content compression)
- Scaling strategy (when to upgrade tier)
- Multi-model routing (simple → Gemini, complex → Claude)

**EngineCamPro контекст:**
- Production metrics для 100 студентов:
  - Cost: $290-350/месяц ($2.90-3.50/студент)
  - Cache hit rate: 78% (отлично)
  - TTFT p95: 850ms (быстро)
  - Error rate: 0.5% (низкий)
- Rate limiting: 10 вопросов/минуту на студента (защита от spam)
- Бюджет control: дневной лимит $20, алерты при 80% ($16)
- Масштабирование plan:
  - 50 студентов → Upgrade Tier 1 (1,000 RPM)
  - 300 студентов → Hybrid routing (Gemini для простых, Claude для сложных)
  - 500+ студентов → Multiple API keys или переговоры с Google

---

---

### **Модуль 10: Machine Learning Integration (опциональный)** 🧠

**Статус:** ✅ Завершён (1/1 урок)  
**Назначение:** Базовое понимание ML и интеграция простых моделей в веб-приложения

---

#### **Урок 10.1: Введение в ML - Добавляем "мозги" в веб-приложение**
**Основные концепции:**
- 🤖 **Machine Learning определение:** Программа учится на примерах вместо явных инструкций if-else, находит паттерны в данных сама, адаптируется к новым случаям
- 🎯 **Когда ML нужен:** Есть паттерны но нет очевидных правил (спам фильтр, рекомендации), много примеров для обучения (>1000 записей), задача сложна для if-else (распознавание лиц, sentiment analysis)
- ❌ **Когда ML не нужен:** Простые правила достаточно (if total > 100 → discount 10%), мало данных (<100 примеров), нужна 100% точность (медицина, финансы), CRUD операции
- 📊 **Типы ML задач:** Classification (спам/не спам, кот/собака), Regression (предсказать цену дома, продажи), Recommendations (Netflix, Amazon, Spotify)

**Технологии и инструменты:**
- scikit-learn (классический ML, рекомендуется для начала)
- TensorFlow/PyTorch (Deep Learning, для сложных задач)
- FastAPI integration (ML models as API endpoints)
- Pickle (model serialization)
- Pandas/NumPy (data processing)

**Практические навыки:**
- Understanding ML vs traditional programming
- Choosing when to use ML (decision matrix)
- Selecting library (scikit-learn vs TensorFlow)
- Integrating ML model into FastAPI (load model at startup, cached in memory)
- Working with Claude Code for ML projects (clear task formulation)

**EngineCamPro контекст:**
- Применение ML:
  - **Предсказание оптимальных параметров кулачка** (Regression)
    - Входные: тип двигателя, RPM, желаемая мощность
    - Выход: рекомендуемые параметры (подъём, базовый радиус, профиль)
    - Обучение на истории успешных designs
  - **Классификация типа кулачка** (Classification)
    - Входные: форма профиля (точки кривой)
    - Выход: тип (symmetric, asymmetric, polynomial, spline)
  - **Рекомендации похожих designs** (Similarity)
    - Входные: текущий дизайн кулачка
    - Выход: топ-5 похожих из базы (collaborative filtering)
- Best practices:
  - Модель обучается отдельно (train_model.py)
  - Сохраняется в model.pkl
  - Загружается при startup FastAPI (app.state.model)
  - Endpoint: POST /api/predict-cam-params
  - Не обучать при каждом запросе! (медленно)

---

---

## **Общие выводы по всем модулям**

### **Прогресс:**
- ✅ Модуль 1: Основы (5/5 уроков) - Client-Server, HTTP, JSON, REST, Frameworks
- ✅ Модуль 2: Backend разработка (8/8 уроков) - FastAPI, Pydantic, CORS, Swagger, Testing
- ✅ Модуль 3: Базы данных (4/4 уроков) - SQL vs NoSQL, ORM, Migrations, Supabase
- ✅ Модуль 4: Frontend разработка (6/6 уроков) - HTML/CSS/JS, Fetch API, React, State, Charts, UI libs
- ✅ Модуль 5: Интеграция (3/3 уроков) - Full-Stack integration, Error handling, State management, Caching
- ✅ Модуль 6: Монетизация (2/2 уроков) - Clerk authentication, Stripe subscriptions, Feature locks
- ✅ Модуль 7: Deploy (2/2 уроков) - Platform selection (Vercel+Railway), Production deployment, Monitoring
- ✅ Модуль 8: Next.js Full-Stack (6/6 уроков) - Node.js, TypeScript, Monolith vs Separated, SSR vs CSR
- ✅ Модуль 9: RAG + AI Agent (9/9 уроков) - RAG systems, Embeddings, LangChain, WebSocket, Gemini AI
- ✅ Модуль 10: ML Integration (1/1 урок) - Machine Learning basics, scikit-learn, FastAPI integration
- **Итого: 46/46 уроков (100%)** ✅ **КУРС ПОЛНОСТЬЮ ДОКУМЕНТИРОВАН!** 🎉
- **EngineCamPro v2: От идеи до Production - ЗАПУЩЕН!** 🚀
- **AI Agent с RAG: Production-ready система для образовательных платформ** 🤖
- **Готово для использования AI Agent в качестве базы знаний** 📚

