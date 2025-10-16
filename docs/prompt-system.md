# AI Agent Prompt System

> Архитектура системы промптов для AI Learning Agent

## 📁 Структура

Все промпты находятся в `backend/prompts/` (следует принципу SSOT из Урока 1.7):

```
backend/prompts/
├── README.md              # Обзор системы промптов
├── system_prompt.md       # Основная инструкция AI tutor
├── boundaries.md          # Границы знаний (72 урока)
└── model_settings.md      # Документация настроек моделей
```

## 🔧 Как работает

### 1. Загрузка промптов

При старте backend:
1. **PromptLoader** читает Markdown файлы из `backend/prompts/`
2. Кэширует содержимое для быстрого доступа
3. При запросе от пользователя:
   - Загружает `system_prompt.md`
   - Заменяет `{context}` на выбранные уроки
   - OpenRouterService отправляет промпт в API

### 2. Архитектура (следует Уроку 1.7)

```
User Question
    ↓
OpenRouterService
    ↓
PromptLoader.build_full_prompt()
    ├── Читает backend/prompts/system_prompt.md
    ├── Заменяет {context} → уроки из backend/data/lessons/
    └── Возвращает полный промпт
    ↓
OpenRouter API → AI Response
```

## ✏️ Как редактировать

### Изменить поведение AI:

1. Открой нужный файл:
   ```bash
   # Основной промпт
   nano backend/prompts/system_prompt.md

   # Границы знаний
   nano backend/prompts/boundaries.md
   ```

2. Внеси изменения в Markdown

3. Сохрани файл

4. Перезапусти backend:
   ```bash
   uvicorn main:app --reload
   ```

Изменения применятся автоматически.

### Настроить температуру модели:

Настройки моделей хранятся в [`backend/config.py`](../backend/config.py):

```python
AVAILABLE_MODELS = [
    {
        "id": "google/gemini-2.5-flash-preview-09-2025",
        "temperature": 0.7,  # ← Измени здесь
        "max_tokens": 4000,
        "top_p": 1.0
    },
    # ...
]
```

Перезапусти backend для применения.

## 📝 Переменные в промптах

- `{context}` - Заменяется на выбранные уроки из `backend/data/lessons/`

## 🔗 Файлы системы (SSOT - Урок 1.7)

### Конфигурация (backend)
- [system_prompt.md](../backend/prompts/system_prompt.md) - Основной промпт AI tutor
- [boundaries.md](../backend/prompts/boundaries.md) - Границы знаний (что можно/нельзя)
- [model_settings.md](../backend/prompts/model_settings.md) - Документация настроек
- [PromptLoader](../backend/services/prompt_loader.py) - Сервис загрузки промптов

### Документация (docs)
- [course-structure.md](course-structure.md) - Структура курса AI Web Learning
- [architecture.md](architecture.md) - Общая архитектура системы

**Принцип:** Информация о промптах хранится в `backend/prompts/` (источник правды), эта документация только ссылается на неё.

## 🧪 Тестирование промптов

### Тест 1: Проверить загрузку

```bash
# Запустить backend
cd backend
uvicorn main:app --reload

# В логах должно быть:
# INFO: Loading prompts from: /path/to/backend/prompts
# INFO: Loaded prompt from system_prompt.md (XXX chars)
# INFO: Prompts loaded successfully
```

### Тест 2: Проверить промпт

1. Открой frontend: http://localhost:5173
2. Выбери модель (например, Gemini 2.5 Flash)
3. Отправь вопрос: "Что такое FastAPI?"
4. AI должен ответить на основе уроков

### Тест 3: Проверить границы

1. Отправь вопрос вне темы: "Как лечить простуду?"
2. AI должен вежливо отклонить:
   ```
   "I'm specialized in web development education.
   This question is outside my expertise area..."
   ```

### Тест 4: Проверить настройки модели

1. Выбери Claude Sonnet 4.5
2. В логах backend должно быть:
   ```
   "temperature": 0.5,    # Более фокусированный для кода
   "max_tokens": 8000     # Больше для детальных объяснений
   ```

3. Выбери Gemini 2.5 Flash
4. В логах:
   ```
   "temperature": 0.7,    # Сбалансированный
   "max_tokens": 4000
   ```

## 📚 Принципы из Урока 1.7

Эта система следует принципам из [Урока 1.7: Документация](../backend/data/lessons/project-setup-guide/1-fundamentals/1.7%20Документация:%20правильная%20организация.md):

1. ✅ **SSOT (Single Source of Truth)**
   - Промпты хранятся ТОЛЬКО в `backend/prompts/`
   - Эта документация ссылается на них, не дублирует

2. ✅ **Ссылки вместо копирования**
   - `docs/prompt-system.md` ссылается на `backend/prompts/`
   - Обновил промпт → везде актуально

3. ✅ **Логическая структура**
   - `backend/prompts/` - конфигурация AI (как `backend/data/`)
   - `docs/` - объяснение для разработчиков

4. ✅ **Separation of Concerns**
   - `PromptLoader` - загрузка промптов
   - `OpenRouterService` - API запросы
   - `config.py` - настройки моделей

## 🔍 Troubleshooting

### Ошибка: "Prompt file not found"

**Решение:**
```bash
# Проверь что файлы существуют
ls backend/prompts/
# Должны быть: README.md, system_prompt.md, boundaries.md, model_settings.md
```

### Промпт не обновляется

**Решение:**
1. Очисти кэш PromptLoader (перезапусти backend)
2. Проверь что изменения сохранены в `.md` файле

### AI отвечает не так как в промпте

**Решение:**
1. Проверь `backend/prompts/system_prompt.md`
2. Убедись что `{context}` заменяется на уроки
3. Проверь логи backend для деталей

## См. также

- [Architecture](architecture.md) - Общая архитектура системы
- [Course Structure](course-structure.md) - Структура курсов (72 урока)
- [Урок 1.7](../backend/data/lessons/project-setup-guide/1-fundamentals/1.7%20Документация:%20правильная%20организация.md) - Принципы документации
