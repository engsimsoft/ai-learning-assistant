# Example 1: AI Learning Agent

> Полноценное веб-приложение для интерактивного обучения с AI-ассистентом

## 🎯 Что это

**AI Learning Agent** — образовательная платформа с AI-ассистентом, который помогает студентам изучать веб-разработку, отвечая на вопросы на основе курсовых материалов.

## 📊 Технический стек

### Backend
- **Framework:** FastAPI (Python)
- **API Gateway:** OpenRouter (multi-model support)
- **Models:** Gemini 2.5 Flash, Claude Sonnet 4.5, GPT-4.1 Mini, Grok 4 Fast

### Frontend
- **Framework:** React + Vite
- **Styling:** CSS Modules
- **Layout:** Three-panel Claude-style interface

### Architecture
- **Pattern:** Layered Architecture (Lesson 1.1)
- **Data Flow:** REST API (Lesson 1.4)
- **Configuration:** Environment variables (Lesson 1.5)
- **Documentation:** SSOT principle (Lesson 1.7)

## 🎨 Интерфейс

```
┌─────────────┬────────────────────┬─────────────────┐
│             │                    │                 │
│  Left       │   Center           │   Right         │
│  Sidebar    │   Chat             │   Sidebar       │
│             │                    │                 │
│  Course     │   AI Responses     │   Claude AI     │
│  Modules    │   User Questions   │   Context       │
│  Lessons    │                    │   (Optional)    │
│             │                    │                 │
└─────────────┴────────────────────┴─────────────────┘
```

## ✨ Ключевые возможности

### 1. Multi-Model Support
Пользователь выбирает модель AI:
- **Gemini 2.5 Flash** (default) - быстрый, экономичный
- **Claude Sonnet 4.5** - лучший для кода и рассуждений
- **GPT-4.1 Mini** - сбалансированный OpenAI
- **Grok 4 Fast** - доступный, 2M context

### 2. Context-Aware Responses
AI отвечает на основе **выбранных уроков**:
```python
# User selects lessons → Context
selected_lessons = ["lesson-2-1-fastapi-intro.md", "lesson-2-2-http-methods.md"]

# AI uses only these lessons for context
context = load_lessons(selected_lessons)
response = ai_model.generate(question, context)
```

### 3. Markdown-Based Prompts
Системные промпты хранятся в Markdown (Lesson 1.7: SSOT):
```
backend/prompts/
├── system_prompt.md     # AI tutor instructions
├── boundaries.md        # Knowledge boundaries (72 lessons)
└── model_settings.md    # Temperature, max_tokens docs
```

### 4. Model-Specific Settings
Каждая модель имеет оптимальные параметры:
```python
# Claude: Focused for code
"temperature": 0.5,
"max_tokens": 8000

# Gemini: Balanced
"temperature": 0.7,
"max_tokens": 4000
```

## 🏗️ Архитектура

### Backend Structure
```
backend/
├── main.py                      # FastAPI app entry point
├── config.py                    # Configuration (SSOT)
├── prompts/                     # Markdown prompts (SSOT)
│   ├── system_prompt.md
│   ├── boundaries.md
│   └── model_settings.md
├── services/                    # Business logic layer
│   ├── context_service.py       # Lesson loading
│   ├── openrouter_service.py    # AI API integration
│   └── prompt_loader.py         # Markdown → Python
└── data/lessons/                # Course materials (SSOT)
    ├── ai-web-learning/
    ├── project-setup-guide/
    └── worked-examples/
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/              # Three-panel layout
│   │   ├── chat/                # Chat interface
│   │   ├── leftSidebar/         # Course navigation
│   │   └── rightSidebar/        # Claude AI context
│   ├── services/
│   │   └── api.js               # Backend communication
│   └── config.js                # API endpoints
```

## 🎓 Применённые концепции из курса

### Module 1: Основы
- ✅ **Client-Server** (Lesson 1.1) - React ↔ FastAPI
- ✅ **HTTP** (Lesson 1.2) - POST /api/chat
- ✅ **JSON** (Lesson 1.3) - Data format
- ✅ **REST API** (Lesson 1.4) - RESTful endpoints

### Module 2: Backend
- ✅ **FastAPI** (Lesson 2.1) - Backend framework
- ✅ **HTTP Methods** (Lesson 2.2) - GET, POST
- ✅ **Pydantic** (Lesson 2.3) - Request validation
- ✅ **Error Handling** (Lesson 2.4) - Try/except + fallback
- ✅ **CORS** (Lesson 2.5) - Frontend-Backend communication
- ✅ **API Docs** (Lesson 2.6) - Auto-generated /docs

### Module 4: Frontend
- ✅ **React** (Lesson 4.3) - Component-based UI
- ✅ **State Management** (Lesson 4.4) - useState, useEffect
- ✅ **Fetch API** (Lesson 4.2) - Backend requests

### Module 5: Integration
- ✅ **Frontend-Backend** (Lesson 5.1) - Full integration
- ✅ **Error Handling** (Lesson 5.2) - Loading states, error messages

### Module 9: RAG + AI
- ✅ **AI Agent** (Lesson 9.6-9.7) - Gemini/Claude integration
- ✅ **Long Context** (Lesson 9.5) - Using course materials as context

### Project Setup Guide
- ✅ **Separation of Concerns** (Lesson 1.1) - Services, config, data
- ✅ **Dependencies** (Lesson 1.3) - requirements.txt, package.json
- ✅ **Virtual Environment** (Lesson 1.4) - venv
- ✅ **Environment Variables** (Lesson 1.5) - .env file
- ✅ **Git** (Lesson 1.6) - Version control, .gitignore
- ✅ **Documentation** (Lesson 1.7) - SSOT, Markdown, links
- ✅ **Refactoring** (Lesson 1.9) - Prompt system refactoring

## 🚀 Основные преимущества

### 1. Следует принципам курса
Проект **сам является примером** правильной архитектуры:
- SSOT для промптов, конфигурации, уроков
- Layered Architecture (services, config, data)
- Separation of Concerns

### 2. Легко модифицировать
Markdown-based prompts позволяют:
```bash
# Изменить поведение AI:
nano backend/prompts/system_prompt.md
# Перезапустить backend → готово
```

### 3. Multi-model flexibility
Добавить новую модель:
```python
# backend/config.py
AVAILABLE_MODELS.append({
    "id": "new-model-id",
    "name": "New Model",
    "temperature": 0.7,
    "max_tokens": 4000
})
```

### 4. Масштабируемость
- Легко добавлять новые уроки
- Легко менять AI models
- Легко расширять функциональность

## 📈 Реальное применение

**Этот проект используется для:**
1. Обучения веб-разработке
2. Демонстрации Vibe Coding подхода (AI-assisted development)
3. Примера правильной архитектуры для онлайн-школ

**Можно адаптировать для:**
- Корпоративных учебных платформ
- Документации с AI-помощником
- Интерактивных туториалов

## 🔗 Дальнейшее изучение

- [Architecture Details](architecture.md) - Подробная архитектура
- [Implementation Guide](implementation.md) - Детали реализации
- [Lessons Applied](lessons-applied.md) - Какие уроки где использованы
- [Integration Guide](integration-guide.md) - Как интегрировать в свой проект

---

**Дата создания:** 2025-10-16
**Статус:** Production-ready
**Лицензия:** Open Source
