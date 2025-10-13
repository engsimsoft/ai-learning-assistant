# Roadmap: AI Learning Agent

## 🎯 Цель проекта
Создать AI-агента наставника с доступом к 72 урокам в Markdown. Агент отвечает на вопросы студентов, используя 4 оптимальные LLM модели через OpenRouter.

**Технологии:**
- Backend: FastAPI + Python 3.13 + OpenRouter (Gemini 2.5 Flash, Grok 4 Fast, GPT-4.1 Mini, Claude Sonnet 4.5)
- Frontend: React 18 + Vite 5
- Deployment: Railway (2 сервиса)
- Version Control: Git + GitHub (github.com/engsimsoft/ai-learning-assistant)

---

## 📊 Текущий статус
- **Этап:** Готово к Production Deployment
- **Прогресс:** 32/32 задач (100%)
- **Следующее:** Deployment на Railway

---

## 🚀 Этапы разработки

### Этап 1: Базовая структура ✅ ЗАВЕРШЕН
**Цель:** Запустить FastAPI сервер с первым endpoint

- [X] Создать структуру папок проекта (backend + frontend)
- [X] Скопировать все 72 урока в backend/data/lessons/
- [X] Настроить .gitignore и Git
- [X] Создать базовый FastAPI сервер (main.py)
- [X] Добавить CORS middleware для localhost:5173
- [X] Создать health check endpoint GET /health
- [X] Тест: готово к запуску

**Результат:** ✅ FastAPI готов к работе на localhost:8000

---

### Этап 2: Backend - Управление уроками ✅ ЗАВЕРШЕН
**Цель:** Backend умеет загружать и отдавать уроки

- [X] Создать config.py (загрузка env переменных)
- [X] Создать models.py (Pydantic модели для запросов/ответов)
- [X] Создать context_service.py (загрузка всех уроков, построение контекста)
- [X] Создать endpoint GET /lessons (список всех уроков)
- [X] Тест: готово к проверке

**Результат:** ✅ API готов возвращать список 72 уроков с метаданными

---

### Этап 3: Backend - Интеграция OpenRouter ✅ ЗАВЕРШЕН
**Цель:** AI отвечает на вопросы используя уроки, поддержка разных моделей

- [X] Создать openrouter_service.py (работа с OpenRouter API)
- [X] Добавить выбор модели (Claude, GPT-4, Gemini и др.)
- [X] Настроить system prompt для AI наставника
- [X] Создать endpoint POST /chat (принимает вопрос, возвращает ответ)
- [X] Интегрировать выбор уроков для контекста
- [X] Добавить обработку истории разговора
- [X] Добавить fallback на другую модель при ошибке
- [X] Создать endpoint GET /models (список доступных моделей)

**Результат:** ✅ AI готов отвечать на вопросы с поддержкой множества моделей

---

### Этап 4: Frontend - Базовая структура ✅ ЗАВЕРШЕН
**Цель:** React приложение запущено

- [X] Инициализировать Vite + React проект
- [X] Создать базовые компоненты (App, ChatInterface)
- [X] Создать config.js (API_URL из env)
- [X] Создать api.js (fetch запросы к backend)
- [X] Тест: готово к запуску

**Результат:** ✅ React готов к работе на localhost:5173

---

### Этап 5: Frontend - UI чата ✅ ЗАВЕРШЕН
**Цель:** Полноценный интерфейс чата с AI

- [X] Создать MessageList компонент (отображение сообщений)
- [X] Создать InputForm компонент (форма ввода)
- [X] Создать LessonSelector компонент (выбор уроков)
- [X] Создать ModelSelector компонент (выбор AI модели)
- [X] Интегрировать ChatInterface (state, API запросы)
- [X] Добавить обработку ошибок
- [X] Тест: готово к проверке

**Результат:** ✅ Готов полноценный интерфейс для общения с AI

---

### Этап 6: Полировка и документация ✅ ЗАВЕРШЕН
**Цель:** Готово к деплою

- [X] Добавить современные стили (gradient, animations)
- [X] Улучшить UX (автопрокрутка, typing indicators, loading states)
- [X] Добавить responsive design (mobile-friendly)
- [X] Написать README.md для проекта
- [X] Создать детальную документацию (setup, architecture, deployment, troubleshooting)
- [X] Обновить .env.example файлы
- [X] Создать CHANGELOG.md
- [X] Написать ADR документы

**Результат:** ✅ Приложение полностью документировано и готово к использованию

---

### Этап 7: Deployment на Railway (1 день)
**Цель:** Приложение в production

- [ ] Создать проект на Railway
- [ ] Настроить backend сервис (environment variables)
- [ ] Настроить frontend сервис
- [ ] Проверить CORS для production URL
- [ ] Протестировать production версию
- [ ] Обновить документацию с production URLs

**Результат:** Приложение доступно онлайн

---

## 📝 Текущая сессия

**2025-10-13:**
- ✅ Создали полную структуру проекта
- ✅ Реализовали Backend (FastAPI + OpenRouter)
- ✅ Реализовали Frontend (React + Vite)
- ✅ Скопировали все 72 урока в backend/data/lessons (включая Project Setup Guide)
- ✅ Создали всю документацию по принципу SSOT
- ✅ Завершили все 6 этапов разработки
- ✅ Настроили 4 оптимальные AI модели (Gemini 2.5 Flash, Grok 4 Fast, GPT-4.1 Mini, Claude Sonnet 4.5)
- ✅ Обновили зависимости для Python 3.13 (FastAPI 0.115+, Pydantic 2.10+)
- ✅ Создали Git репозиторий и залили на GitHub
- ✅ Локальное тестирование пройдено успешно (backend + frontend работают)
- ✅ Реорганизовали структуру курсов в backend/data/lessons/
- ✅ Создали три категории: ai-web-learning, project-setup-guide, extras
- ✅ Упростили названия модулей (удалили префиксы "module-" и "part-")
- ✅ Обновили context_service.py для поддержки новой структуры
- ✅ Создали документацию курсов (docs/course-structure.md, docs/project-setup-guide-structure.md)
- ✅ Добавили критически важное правило в CLAUDE.md о предкоммитном обновлении документации
- ✅ Исправлена критическая проблема UI с отображением названий курсов
- ✅ Установлен и использован Playwright MCP для диагностики CSS проблем
- ✅ Добавлена недостающая CSS переменная --secondary-color в index.css
- ✅ Переписан LessonSelector.jsx с улучшенной структурой и natural sorting
- ✅ Обновлен backend для возврата поля course вместо category

**Что сделано:**
1. Backend с поддержкой 4 оптимальных LLM через OpenRouter
2. Context service для управления 72 уроками
3. Полноценный React интерфейс с 5 компонентами
4. Современный responsive дизайн
5. Comprehensive документация (README, CLAUDE.md, DOCUMENTATION_GUIDE.md, setup, architecture, deployment, troubleshooting)
6. ADR документы и CHANGELOG (актуализированы)
7. Git + GitHub интеграция (github.com/engsimsoft/ai-learning-assistant)
8. Virtual environment setup (backend/venv)
9. Node modules setup (frontend/node_modules)

**Следующие шаги:**
1. ✅ Локальное тестирование (ЗАВЕРШЕНО)
2. Deployment на Railway (см. docs/deployment.md)
3. Production проверка

---

## 💡 Правила работы

1. **Одна задача за раз** - не делай несколько задач одновременно
2. **Обновляй roadmap** - отмечай [X] выполненные задачи
3. **Тестируй каждый этап** - убедись что работает перед переходом дальше
4. **Коммить после каждой задачи** - git commit с понятным сообщением
5. **Записывай проблемы** - в секции "Текущая сессия"

---

## 🤖 Работа с Claude Code

**Формат задачи:**
```
Смотри roadmap.md.

Текущий этап: [Этап X]
Следующая задача: [Название задачи из roadmap]

[Краткое описание что нужно сделать]

После завершения отметь [X] задачу в roadmap.md.
```

**Claude Code сам решает:**
- Какой код писать
- Как организовать файлы
- Какие библиотеки использовать
- Как обрабатывать ошибки

**Твоя роль:**
- Давать направление (что делать)
- Проверять результат (работает ли)
- Тестировать (запускать и пробовать)
- Корректировать курс (если что-то не так)