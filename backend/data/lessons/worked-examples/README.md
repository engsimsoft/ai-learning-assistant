# Worked Examples

> Реальные примеры внедрения веб-приложений с использованием принципов из курса "AI Web Learning"

## 📋 О разделе

Этот раздел содержит **полноценные примеры проектов**, демонстрирующие применение знаний из всех модулей курса на практике.

**Цель:** Показать как теория превращается в работающее приложение.

## 📚 Доступные примеры

### Example 1: AI Learning Agent
**Путь:** `example-1-ai-learning-agent/`

Веб-приложение для интерактивного обучения с AI-ассистентом:
- **Stack:** FastAPI + React + OpenRouter API
- **Архитектура:** Three-panel Claude-style layout
- **Охватывает модули:**
  - Module 1: Client-Server, HTTP, REST API
  - Module 2: FastAPI backend
  - Module 4: React frontend
  - Module 5: Frontend-Backend integration
  - Module 9: AI agent integration

**Особенности:**
- Prompt system на базе Markdown (следует Lesson 1.7)
- Multi-model support (Gemini, Claude, GPT, Grok)
- Context-aware responses с использованием уроков
- Model-specific settings (temperature, max_tokens)

---

## 🎯 Как использовать примеры

1. **Изучить документацию** → Начни с `overview.md` в папке примера
2. **Понять архитектуру** → Читай `architecture.md`
3. **Изучить реализацию** → Смотри ссылки на исходный код
4. **Применить в своем проекте** → Адаптируй под свои нужды

---

## 🔗 Связь с курсом

Каждый пример:
- ✅ Следует принципам из [Lesson 1.7](../project-setup-guide/1-fundamentals/1.7%20Документация:%20правильная%20организация.md) (SSOT, DRY)
- ✅ Использует архитектуру из Module 2 (Layered Architecture)
- ✅ Демонстрирует реальное применение концепций

---

## 📊 Структура примера

```
example-X-название/
├── overview.md           # Что это и зачем
├── architecture.md       # Как устроено
├── implementation.md     # Детали реализации
├── lessons-applied.md    # Какие уроки использованы
└── integration-guide.md  # Как интегрировать в свой проект
```

---

## 🔗 Связанные документы

- [Course Structure](../../../docs/course-structure.md) - Структура всего курса
- [README](../../../README.md) - Главная страница проекта
- [Architecture](../../../docs/architecture.md) - Общая архитектура

---

**Последнее обновление:** 2025-10-16
