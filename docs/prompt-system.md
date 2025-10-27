# AI Agent Prompt System

> Архитектура системы промптов для AI Learning Agent (актуализировано: добавлены Boundaries и Canvas Demo Rules)

## 📁 Структура

Все промпты находятся в `backend/prompts/` (SSOT — см. Урок 1.7):

```
backend/prompts/
├── README.md              # Обзор системы промптов
├── system_prompt.md       # Основная инструкция AI tutor (+ Canvas Demo Rules + {boundaries})
├── boundaries.md          # Границы знаний (что можно/нельзя)
└── model_settings.md      # Документация настроек моделей
```

## 🔧 Как работает

### 1) Загрузка промптов и сборка полного промпта

При старте backend:
1. PromptLoader считывает Markdown из `backend/prompts/`
2. Кэширует содержимое
3. При чате:
   - Загружает `system_prompt.md`
   - Подставляет `{context}` (выбранные уроки)
   - Подмешивает `boundaries.md` через `{boundaries}` или добавляет секцию автоматически
   - Возвращает полный системный промпт

Реализация:
- Сборка промпта: [PromptLoader.build_full_prompt()](backend/services/prompt_loader.py:43)
- Загрузка системного промпта: [PromptLoader.load_system_prompt()](backend/services/prompt_loader.py:25)
- Загрузка границ: [PromptLoader.load_boundaries()](backend/services/prompt_loader.py:34)
- Передача в LLM: [OpenRouterService._build_system_prompt()](backend/services/openrouter_service.py:238) → используется внутри [openrouter_service._send_request()](backend/services/openrouter_service.py:100)

### 2) Архитектура (следует Уроку 1.7)

```
User Question
    ↓
OpenRouterService (формирует messages)
    ↓
PromptLoader.build_full_prompt(context)
    ├── читает backend/prompts/system_prompt.md
    ├── заменяет {context} → выбранные уроки
    └── подставляет {boundaries} (или добавляет секцию из boundaries.md)
    ↓
OpenRouter API → AI Response
```

## ✏️ Что теперь находится в system_prompt.md

Наряду с блоком руководящих правил и `{context}`, в промпте добавлен раздел **Canvas Demo Rules** — чтобы агент целенаправленно формировал короткие, самодостаточные HTML‑демо для Canvas (iframe sandbox в правой панели UI). См. [system_prompt.md](../backend/prompts/system_prompt.md).

Ключевые тезисы Canvas Demo Rules:
- Возвращать ровно ОДИН fenced-блок с языком `html`
- Сниппет самодостаточный: без внешних зависимостей, импортов и сетевых запросов
- Минимальный объём, читаемость важнее сложности
- Код без пояснений внутри блока (пояснения — при необходимости после блока)

## 🧩 Переменные (плейсхолдеры) в промптах

- `{context}` — подставляется текст уроков из `backend/data/lessons/` согласно выбранному режиму контекста (Current Lesson, Module, All, Custom)
- `{boundaries}` — подставляется содержимое `backend/prompts/boundaries.md` (если плейсхолдер отсутствует в `system_prompt.md`, границы будут автоматически добавлены секцией в конец системного промпта)

Реализация плейсхолдеров см. [PromptLoader.build_full_prompt()](backend/services/prompt_loader.py:43).

## 🔐 Boundaries (границы знаний)

Источник правды: [backend/prompts/boundaries.md](../backend/prompts/boundaries.md)
- Формулировки нейтральны относительно точного количества уроков (SSOT, без жёсткого «72 урока»)
- Шаблон вежливого отказа для оффтопа
- Список тематик, на которые агент не отвечает

Boundaries гарантированно попадают в системный промпт либо через `{boundaries}`, либо авто-добавлением секции.

## ⚙️ Модельные настройки

Конфигурация моделей: [backend/config.py](../backend/config.py)
- Температура/токены и цены: `AVAILABLE_MODELS`
- Выбранная модель передаётся в OpenRouter с настройками: [openrouter_service._send_request()](backend/services/openrouter_service.py:100)

Пример (фрагмент):
```
AVAILABLE_MODELS = [
  {
    "id": "google/gemini-2.5-flash-preview-09-2025",
    "temperature": 0.7,
    "max_tokens": 4000,
    "top_p": 1.0
  },
  ...
]
```

## ✍️ Как редактировать промпты

1) Открой нужный файл:
```
nano backend/prompts/system_prompt.md
nano backend/prompts/boundaries.md
```
2) Измени Markdown, сохрани
3) Backend с `--reload` применит изменения автоматически (или перезапусти)

## 🧪 Тестирование (обновлено)

1) Загрузка промптов при старте
```
uvicorn main:app --reload
# Логи:
# Loading prompts from: .../backend/prompts
# PromptLoader initialized ...
# Prompts loaded successfully
```

2) Проверка границ
- Вопрос: «Как лечить простуду?»
- Ожидание: вежливый отказ по шаблону из Boundaries, редирект к темам веб‑разработки

3) Проверка Canvas Demo Rules
- Вопрос: «Сделай минимальную демо‑кнопку, при клике выводит время. Верни один self‑contained HTML блок.»
- Ожидание: один fenced‑блок ```html …```; кнопка «🧩 Canvas» в UI запускает демо без доработок

4) Проверка настроек модели
- Выбор отличной от дефолтной модели в UI → в логах появятся соответствующие `temperature`, `max_tokens`

## 🧭 Связь с документацией (SSOT)

- Конфигурация промптов: `backend/prompts/` (источник правды)
- Механика загрузки/сборки: [PromptLoader](../backend/services/prompt_loader.py)
- Вызов моделей: [OpenRouterService](../backend/services/openrouter_service.py)
- Этот файл (`docs/prompt-system.md`) — описание и ссылки, без дублирования фактов

## 📌 Чек-лист при изменениях (из DOCUMENTATION_GUIDE)

После изменений в промпт‑системе нужно:
- Обновить документацию (этот файл) — выполнено
- Добавить запись в [CHANGELOG.md](../CHANGELOG.md)
- При необходимости отметить в [roadmap.md](../roadmap.md)

## 🗂️ История изменений (кратко)

- Добавлены Canvas Demo Rules в `system_prompt.md`
- Включены Boundaries в сборку системного промпта через `{boundaries}` или секцию
- `boundaries.md` приведён к нейтральным формулировкам (без жёсткого числа уроков)

## 🔗 См. также

- [architecture.md](architecture.md) — Архитектура системы
- [ai-web-learning-structure.md](ai-web-learning-structure.md) — Структура курса "AI Web Learning"
- [ARTIFACTS_SPEC.md](artifacts/ARTIFACTS_SPEC.md) — Спецификация Canvas/Artifacts
