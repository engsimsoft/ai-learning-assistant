# AI Learning Agent

AI-наставник с доступом к 72 урокам веб-разработки. Отвечает на вопросы студентов с поддержкой множества LLM через OpenRouter (Claude, GPT-4, Gemini и др.).

## Быстрый старт

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Настрой OPENROUTER_API_KEY
uvicorn main:app --reload
```

Backend: http://localhost:8000

### Frontend

```bash
cd frontend
npm install
cp .env.example .env      # Настрой VITE_API_URL
npm run dev
```

Frontend: http://localhost:5173

## Документация

- [Детальная установка](docs/setup.md) - пошаговая инструкция
- [Архитектура](docs/architecture.md) - как работает система
- [Deployment](docs/deployment.md) - деплой на Railway
- [Troubleshooting](docs/troubleshooting.md) - решение проблем

## Технологии

**Backend:**
- FastAPI 0.104.1
- OpenRouter API (доступ ко всем LLM)
- Поддержка: Claude 3.5, GPT-4, Gemini Pro, Llama и др.
- Python 3.11+

**Frontend:**
- React 18
- Vite 5
- Fetch API

**Deployment:**
- Railway (backend + frontend)

## Структура проекта

```
backend/
├── main.py              # FastAPI приложение
├── config.py            # Конфигурация
├── models.py            # Pydantic модели
├── services/
│   ├── openrouter_service.py  # Работа с LLM через OpenRouter
│   └── context_service.py     # Управление уроками
└── data/lessons/        # 72 урока (10 модулей + Project Setup Guide)

frontend/
├── src/
│   ├── components/      # React компоненты
│   │   ├── ChatInterface.jsx
│   │   ├── MessageList.jsx
│   │   ├── InputForm.jsx
│   │   ├── LessonSelector.jsx
│   │   └── ModelSelector.jsx
│   └── services/        # API клиент
└── package.json
```

## Возможности

- **Множество AI моделей** - выбор из Claude 3.5, GPT-4, Gemini Pro, Llama 3
- **Контекстно-зависимые ответы** - AI знает 72 урока
- **Гибкий выбор уроков** - используй все или выбери конкретные модули
- **Автоматический fallback** - переключение на резервную модель при ошибке
- **Real-time чат** - интерактивный диалог с историей

## Roadmap

См. [roadmap.md](roadmap.md) для плана разработки.

## Для разработчиков

- [Руководство по документации](DOCUMENTATION_GUIDE.md) - как правильно вести документацию проекта

## Лицензия

MIT
