# Структура курса "Project Setup Guide"

> **Философия курса:** Правильная организация и инициализация проектов для работы с AI-assisted development

## 📋 Обзор

**Цель курса:** Научиться создавать правильно структурированные проекты с первого дня разработки, понимать архитектурные принципы и эффективно работать с ИИ-помощниками.

**Для кого:** Разработчики, которые хотят создавать чистые, масштабируемые проекты с использованием AI-инструментов (Claude Code, GitHub Copilot, Cursor AI).

---

## 🎯 Ключевые принципы курса

### 1. **Layered Architecture (Слоистая архитектура)**
Разделение кода на слои по функциональности:
- **Presentation Layer** (Routes/API) - HTTP логика
- **Business Logic Layer** (Services) - бизнес-логика
- **Data Access Layer** (Models) - работа с БД

### 2. **Single Source of Truth (SSOT)**
Каждая информация живет в ОДНОМ месте:
- Нет дублирования кода
- Нет дублирования документации
- Ссылки вместо копирования

### 3. **Separation of Concerns**
Каждый модуль отвечает за одну задачу:
- Routes не знают про БД
- Services не знают про HTTP
- Models не знают про бизнес-логику

### 4. **AI-First Development**
Правильная коммуникация с ИИ:
- Детальные промпты со структурой
- Объяснение "ЗАЧЕМ" для каждого элемента
- Итеративное улучшение

---

## 📘 Содержание курса (по частям)

### Часть 1: Основы организации проекта (9 уроков) 🏗️
**Путь:** `backend/data/lessons/project-setup-guide/1-fundamentals/`

1. **1.1 Философия правильной организации проекта.md**
   - Почему структура проекта критична
   - Слоистая архитектура (Layered Architecture)
   - Признаки хорошей vs плохой структуры
   - Принципы: SRP, DRY, Separation of Concerns

2. **1.2 Инициализация проекта: первые шаги.md**
   - Создание структуры проекта
   - Правильная инициализация
   - Best practices с первого дня

3. **1.3 Dependencies (управление зависимостями).md**
   - Зачем нужен requirements.txt / package.json
   - Управление версиями библиотек
   - Dependency management best practices

4. **1.4 Virtual Environment (venv).md**
   - Зачем нужна изоляция окружения
   - Создание и активация venv
   - Работа с виртуальными окружениями

5. **1.5 Environment Variables (.env).md**
   - Секреты не в коде!
   - Работа с .env файлами
   - .env.example как шаблон

6. **1.6 Git и .gitignore.md**
   - Правильная настройка Git
   - Что добавлять в .gitignore
   - Workflow с Git

7. **1.7 Документация: правильная организация.md**
   - Single Source of Truth для документации
   - Структура docs/ папки
   - README компактный (50-150 строк)
   - ADR (Architecture Decision Records)
   - Уровни документации для разных проектов

8. **1.8 Планирование и Roadmap.md**
   - Как планировать разработку
   - Roadmap vs TodoWrite
   - Отслеживание прогресса

9. **1.9 Рефакторинг: когда и как.md**
   - Когда нужен рефакторинг
   - Как рефакторить правильно
   - Работа с legacy code

---

### Часть 2: FastAPI + React Setup (6 уроков) 🚀
**Путь:** `backend/data/lessons/project-setup-guide/2-fastapi-react/`

**Тип проекта:** Разделенный Backend (FastAPI) + Frontend (React)

1. **2.1 Инициализация Backend (FastAPI).md**
   - Создание venv
   - Установка FastAPI и Uvicorn
   - Создание requirements.txt
   - Первый запуск

2. **2.2 Структура папок Backend (FastAPI).md**
   - app/routers/ - API endpoints
   - app/services/ - бизнес-логика
   - app/models/ - SQLAlchemy модели
   - app/schemas/ - Pydantic схемы
   - app/core/ - конфигурация

3. **2.3 Инициализация Frontend (React + Vite).md**
   - npm create vite@latest
   - Установка зависимостей
   - Настройка .env

4. **2.4 Структура папок Frontend (React).md**
   - src/components/ - React компоненты
   - src/pages/ - страницы
   - src/services/ - API клиент
   - src/utils/ - вспомогательные функции

5. **2.5 Связка Backend + Frontend.md**
   - CORS настройка
   - API клиент в React
   - Взаимодействие между частями

6. **2.6 Чек-лист FastAPI + React.md**
   - Проверка правильности структуры
   - Что должно работать
   - Типичные ошибки

---

### Часть 3: Next.js Setup (4 урока) ⚡
**Путь:** `backend/data/lessons/project-setup-guide/3-nextjs/`

**Тип проекта:** Full-stack монолит (Next.js App Router)

1. **3.1 Инициализация Next.js проекта.md**
   - npx create-next-app@latest
   - Выбор опций (App Router, TypeScript, Tailwind)
   - Первый запуск

2. **3.2 Структура папок Next.js (App Router).md**
   - app/ - file-based routing
   - app/api/ - API routes (backend)
   - components/ - React компоненты
   - lib/ - утилиты, database

3. **3.3 Environment Variables в Next.js.md**
   - .env.local для локальной разработки
   - NEXT_PUBLIC_ префикс для frontend
   - Переменные для API routes

4. **3.4 Чек-лист Next.js проекта.md**
   - Проверка структуры
   - Routing работает
   - API routes настроены

---

### Часть 5: Работа с ИИ (1 урок) 🤖
**Путь:** `backend/data/lessons/project-setup-guide/5-ai-tools/`

1. **5.1 Работа с ИИ для правильной структуры.md**
   - Как правильно просить ИИ создать структуру
   - Шаблон промпта для Claude Code
   - Ключевые элементы хорошего промпта
   - Итеративное улучшение с ИИ
   - Проверка структуры от ИИ

---

### Часть 6: Шаблоны и чек-листы (1 урок) ✅
**Путь:** `backend/data/lessons/project-setup-guide/6-templates/`

1. **6.1 Шаблоны и чек-листы.md**
   - Готовые шаблоны структур
   - Чек-листы для проверки
   - Best practices в одном месте

---

## 📊 Статистика курса

| Часть | Тема | Количество уроков |
|-------|------|-------------------|
| **Часть 1** | Основы организации | 9 |
| **Часть 2** | FastAPI + React Setup | 6 |
| **Часть 3** | Next.js Setup | 4 |
| **Часть 5** | Работа с ИИ | 1 |
| **Часть 6** | Шаблоны и чек-листы | 1 |
| **Всего** | | **21 урок** |

**Примечание:** Части 4 не существует (пропуск в нумерации).

---

## 🏗️ Типы проектов, которые учит создавать курс

### 1. **FastAPI + React (Разделенный stack)**
- Backend: FastAPI (Python)
- Frontend: React + Vite (JavaScript)
- Deployment: Раздельный (Railway backend, Vercel frontend)
- Когда использовать: Микросервисы, API для мобильных приложений

### 2. **Next.js (Full-stack монолит)**
- Frontend + Backend: Next.js (JavaScript/TypeScript)
- API Routes: встроенные в Next.js
- Deployment: Vercel
- Когда использовать: Full-stack приложения, быстрый старт

---

## 🎯 Ключевые концепции курса

### Layered Architecture для FastAPI:
```
app/
├── routers/          # Presentation Layer (HTTP)
├── services/         # Business Logic Layer
├── models/           # Data Access Layer
├── schemas/          # Pydantic validation
└── core/             # Configuration
```

### Структура для Next.js:
```
src/
├── app/              # File-based routing + API routes
├── components/
│   ├── ui/          # Переиспользуемые UI
│   └── features/    # Бизнес-компоненты
└── lib/             # Utilities, database
```

---

## 📝 Документация по стандартам курса

### Структура документации (из Части 1, Урок 1.7):

```
project/
├── README.md            # ТОЧКА ВХОДА (50-150 строк)
├── CHANGELOG.md         # История изменений
├── .env.example         # Шаблон переменных
└── docs/
    ├── setup.md         # Детальная установка
    ├── architecture.md  # Архитектура системы
    ├── deployment.md    # Деплой инструкции
    ├── troubleshooting.md
    ├── api/             # API документация
    └── decisions/       # ADR (Architecture Decision Records)
```

---

## 🤖 Философия AI-Assisted Development

### Правильный промпт для ИИ (из Части 5):

```
Создай [TYPE] проект для [ОПИСАНИЕ].

СТРУКТУРА: [ASCII дерево папок с комментариями]

ТРЕБОВАНИЯ:
- [Требование 1]
  ЗАЧЕМ: [объяснение]
- [Требование 2]
  ЗАЧЕМ: [объяснение]

BEST PRACTICES:
- [Practice 1]
- [Practice 2]

Создай минимальную работающую структуру.
```

---

## ✅ Чек-листы из курса

### Чек-лист правильной структуры (из Части 1):

- [ ] Код разделён на логические слои (routes, services, models)
- [ ] Нет бизнес-логики в routes
- [ ] Нет HTTP логики в services
- [ ] Конфиги вынесены в отдельные файлы
- [ ] Секреты в .env, не в коде
- [ ] Тесты отражают структуру кода
- [ ] Понятно где искать код для фичи X
- [ ] Нет файлов utils.py, helpers.py, stuff.py
- [ ] Файлы названы по функциональности
- [ ] Дублирование кода минимально

### Чек-лист документации:

- [ ] README.md компактный (50-150 строк)
- [ ] README - точка входа со ссылками
- [ ] .env.example создан
- [ ] docs/ папка для деталей
- [ ] Нет дублирования (SSOT)
- [ ] Ссылки между файлами

---

## 🎓 Для кого этот курс

### ✅ Курс подойдет если:
- Начинаешь новый проект и хочешь сделать правильно
- Работаешь с ИИ-помощниками (Claude Code, Copilot, Cursor)
- Хочешь понимать архитектурные принципы
- Создаешь FastAPI + React или Next.js приложения
- Нужна правильная структура для масштабирования

### ⚠️ Курс НЕ учит:
- Синтаксису Python/JavaScript (это базовые знания)
- Глубокой работе с БД (есть в "AI Web Learning")
- Deploy деталям (есть в основном курсе)
- Продвинутым паттернам проектирования

---

## 🔗 Связь с другими курсами

### Связь с "AI Web Learning":
- **Project Setup Guide** учит **КАК** организовать проект
- **AI Web Learning** учит **ЧТО** создавать (API, Frontend, RAG, ML)

**Рекомендация:** Сначала пройди уроки из "Project Setup Guide" (особенно Часть 1), затем переходи к модулям "AI Web Learning".

---

## 🔗 Связанные документы

- **Структура основного курса:** [course-structure.md](course-structure.md)
- **Главная страница проекта:** [README.md](../README.md)
- **Архитектура системы:** [architecture.md](architecture.md)
- **План развития:** [roadmap.md](../roadmap.md)

---

## 💡 Главный takeaway курса

> **"В 2025 году ИИ пишет код, ты задаёшь направление."**

Твоя задача:
- Понимать архитектурные принципы
- Формулировать четкие требования для ИИ
- Проверять качество структуры
- Поддерживать чистоту кода

ИИ сделает остальное! 🚀

---

**Последнее обновление:** 2025-10-13
