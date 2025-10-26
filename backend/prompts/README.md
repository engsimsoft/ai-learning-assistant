# AI Agent Prompts

Система промптов для AI Learning Agent на базе Markdown файлов.

## 📁 Файлы

- `system_prompt.md` - Основная инструкция AI tutor
- `boundaries.md` - Границы знаний (что можно/нельзя отвечать)
- `model_settings.md` - Документация настроек моделей (temperature, tokens)

## 🔧 Как использовать

Промпты автоматически загружаются через `PromptLoader` сервис при старте backend.

## 📝 Переменные в промптах

- `{context}` - Заменяется на выбранные уроки из `backend/data/lessons/`

## ✏️ Как редактировать

1. Открой нужный `.md` файл
2. Внеси изменения
3. Сохрани файл
4. Перезапусти backend: `uvicorn main:app --reload`

Изменения применятся автоматически.

## 🔗 См. также

- [PromptLoader](../services/prompt_loader.py) - сервис загрузки промптов
- [docs/prompt-system.md](../../docs/prompt-system.md) - документация системы
