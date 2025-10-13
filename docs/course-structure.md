# Структура курса "AI Web Learning"

> **Философия курса:** Понимание архитектуры и концепций через AI-assisted development (Vibe Coding)

## 📋 Обзор

**Цель курса:** Изучение современной веб-разработки для создания трёх типов проектов:
- **EngineCamPro v2** — FastAPI + React + Монетизация
- **Онлайн-школа** — RAG + AI агент для интерактивного обучения
- **Клиентские приложения** — Небольшие Next.js проекты

---

## 📘 Основные модули (30 уроков)

### Module 1: Основы (5 уроков)
**Путь:** `backend/data/lessons/module-1-basics/`

1. `lesson-01-client-server.md` — Архитектура клиент-сервер
2. `lesson-02-http-basics.md` — Основы HTTP протокола
3. `lesson-03-json-format.md` — Формат данных JSON
4. `lesson-04-rest-api.md` — Принципы REST API
5. `lesson-05-framework-choice.md` — Выбор фреймворка

**Дополнительные материалы:**
- `Объяснение к первому уроку.md`
- `Урок 1.1.1 - Структура проекта EngineCamPro v2.md`

---

### Module 2: Backend (8 уроков)
**Путь:** `backend/data/lessons/module-2-backend/`

1. `lesson-2-1-fastapi-intro.md` — Введение в FastAPI
2. `lesson-2-2-http-methods.md` — HTTP методы (GET, POST, PUT, DELETE)
3. `lesson-2-3-pydantic.md` — Валидация данных с Pydantic
4. `lesson-2-4-error-handling.md` — Обработка ошибок
5. `lesson-2-5-middleware-cors.md` — Middleware и CORS
6. `lesson-2-6-api-docs.md` — Автогенерация документации API
7. `lesson-2-7-best-practices.md` — Best practices FastAPI
8. `lesson-2-8-api-testing.md` — Тестирование API

---

### Module 3: Database (4 урока)
**Путь:** `backend/data/lessons/module-3-database/`

1. `lesson_3_1_sql_vs_nosql.txt` — SQL vs NoSQL: выбор БД
2. `lesson_3_2_postgresql_sqlalchemy.txt` — PostgreSQL + SQLAlchemy
3. `lesson_3_3_migrations.txt` — Миграции базы данных
4. `lesson_3_4_supabase_baas.txt` — Supabase (Backend as a Service)

---

### Module 4: Frontend (6 уроков)
**Путь:** `backend/data/lessons/module-4-frontend/`

1. `lesson-4-1-html-css-js.md` — Основы HTML, CSS, JavaScript
2. `lesson-4-2-fetch-api.md` — Fetch API для запросов
3. `lesson-4-3-react-intro.md` — Введение в React
4. `lesson-4-4-components-state.md` — Компоненты и состояние
5. `lesson-4-5-data-visualization.md` — Визуализация данных
6. `lesson-4-6-ui-libraries.md` — UI библиотеки

---

### Module 5: Integration (3 урока)
**Путь:** `backend/data/lessons/module-5-integration/`

1. `lesson-5-1-frontend-backend.md` — Связка Frontend + Backend
2. `lesson-5-2-error-loading.md` — Обработка ошибок и загрузки
3. `lesson-5-3-state-management.md` — State management

---

### Module 6: Monetization (2 урока)
**Путь:** `backend/data/lessons/module-6-monetization/`

1. `lesson-6-1-auth-clerk.md` — Аутентификация с Clerk
2. `lesson-6-2-payments-stripe.md` — Платежи через Stripe

---

### Module 7: Deploy (2 урока)
**Путь:** `backend/data/lessons/module-7-deploy/`

1. `lesson-7-1-hosting-platforms.md` — Платформы хостинга
2. `lesson-7-2-production-deploy.md` — Production деплой

---

## 📕 Опциональные модули (11 уроков)

### Module 8: Next.js Full-Stack (5 уроков) ⚡
**Путь:** `backend/data/lessons/module-8- Next.js Full-Stack/`

1. `lesson-8-0-fullstack.md` — Full-stack разработка
2. `lesson-8-1-monolith.md` — Монолитная архитектура
3. `lesson-8-2-server-actions.md` — Server Actions
4. `lesson-8-3-ssr-csr.md` — SSR vs CSR
5. `lesson-8-4-routing.md` — Роутинг в Next.js

**Дополнительные материалы:**
- `lesson-ntro.md`
- `Модуль 8: Next.js Full-Stack (опциональный).md`

---

### Module 9: RAG + AI Agent (5 уроков) 🤖
**Путь:** `backend/data/lessons/module-9 - RAG + AI Агент/`

1. `lesson-9-0-rag-intro.md` — Введение в RAG
2. `lesson-9-1-embeddings.md` — Embeddings и векторные БД
3. `lesson-9-2-langchain.md` — LangChain
4. `lesson-9-3-websocket.md` — WebSocket для real-time
5. `lesson-9-4-integration.md` — Интеграция RAG в проект
6. `lesson-9-5-long-context-vs-rag.md` — Long Context vs RAG
7. `lesson-9-6-gemini-ai-agent.md` — AI агент на Gemini
8. `lesson-9-7-production-optimization.md` — Production оптимизация

**Дополнительные материалы:**
- `module-9-overview.md`
- `ai-assistant-final-report-v2.md`
- `compass_AI Models.md`

---

### Module 10: Machine Learning (1 урок) 🧠
**Путь:** `backend/data/lessons/module-10 -  Введение в ML/`

1. `ml-intro-lesson.md` — Введение в ML для веб-приложений

---

## 🤖 Vibe Coding подход

**Философия разработки:**

| Роль | Ответственность |
|------|----------------|
| **Человек** | Концепции, архитектура, требования |
| **ИИ агент** | Написание кода, реализация |
| **Фреймворки** | Best practices, структура |
| **Анализ** | Понимание решений и улучшения |

**Инструменты:** Claude Code, GitHub Copilot, Cursor AI

---

## 📊 Статистика курса

| Категория | Количество модулей | Количество уроков |
|-----------|-------------------|-------------------|
| **Основные модули** | 7 | 30 |
| **Опциональные модули** | 3 | 11+ |
| **Всего** | 10 | 41+ |

---

## 🗂️ Формат файлов уроков

- **Markdown (`.md`)** — Основные уроки с форматированием
- **Text (`.txt`)** — Уроки по базам данных (Module 3)

---

## 🔗 Связанные документы

- **Главная страница проекта:** [README.md](../README.md)
- **Архитектура системы:** [architecture.md](architecture.md)
- **План развития:** [roadmap.md](../roadmap.md)

---

**Последнее обновление:** 2025-10-13
