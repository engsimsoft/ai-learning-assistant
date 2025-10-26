# Canvas и Артефакты — Руководство пользователя

Цель: как быстро создавать визуальные демонстрации (HTML/CSS/JS), заметки и галереи изображений в правой панели Canvas, а также сохранять их в репозитории.

SSOT-ссылки:
- Спецификация: [ARTIFACTS_SPEC.md](artifacts/ARTIFACTS_SPEC.md)
- Логика UI (правый сайдбар): [ClaudeAISidebar.jsx](../frontend/src/components/rightSidebar/ClaudeAISidebar.jsx:1), [ArtifactCanvas.jsx](../frontend/src/components/rightSidebar/ArtifactCanvas.jsx:1), [ArtifactCanvas.css](../frontend/src/components/rightSidebar/ArtifactCanvas.css:1)
- Интеграция из уроков: [LessonViewer.jsx](../frontend/src/components/center/LessonViewer.jsx:79)
- Backend API артефактов: [main.app.post()](../backend/main.py:227), [main.app.get()](../backend/main.py:124)
- Система промптов (Canvas правила + границы): [system_prompt.md](../backend/prompts/system_prompt.md:1), сборка промпта: [PromptLoader.build_full_prompt()](../backend/services/prompt_loader.py:43)

## 1. Где находится Canvas

- Правая панель, вкладка "Canvas" в компоненте [ClaudeAISidebar.jsx](../frontend/src/components/rightSidebar/ClaudeAISidebar.jsx:280)
- Три режима: Markdown, Code, Images — реализовано в [ArtifactCanvas.jsx](../frontend/src/components/rightSidebar/ArtifactCanvas.jsx:18)

## 2. Как отправить контент в Canvas

Способ A — из чата (ответ бота):
- Нажмите кнопку "🧩 Canvas" у сообщения ассистента — код/текст/картинки попадут в Canvas
- Реализация: отправка события `canvas:add` из [ClaudeAISidebar.jsx](../frontend/src/components/rightSidebar/ClaudeAISidebar.jsx:194)

Способ B — из урока:
- В центре нажмите "Open in Canvas" — отправится выделенный фрагмент или весь урок (Markdown)
- Реализация: [LessonViewer.jsx](../frontend/src/components/center/LessonViewer.jsx:165)

## 3. Режимы и базовые действия

- Markdown: текстовое поле + предпросмотр (MVP). Вставьте конспект или инструкцию. См. [ArtifactCanvas.jsx](../frontend/src/components/rightSidebar/ArtifactCanvas.jsx:277)
- Code: три поля (HTML/CSS/JS) и предпросмотр в iframe (`▶ Run`). См. [ArtifactCanvas.jsx](../frontend/src/components/rightSidebar/ArtifactCanvas.jsx:292)
- Images: загрузка файлов или вставка из буфера (Ctrl+V). См. [ArtifactCanvas.jsx](../frontend/src/components/rightSidebar/ArtifactCanvas.jsx:316)

Общие действия:
- "Clear" — очистка текущего режима
- "Save Artifact" — сохранение на диск (см. раздел 4)
- Поля meta: title, source, tags — сверху на тулбаре (см. [ArtifactCanvas.jsx](../frontend/src/components/rightSidebar/ArtifactCanvas.jsx:220))

## 4. Сохранение и формат

- Нажмите "Save Artifact" в Canvas — отправка на POST /artifacts (см. [main.app.post()](../backend/main.py:227))
- Хранилище: `docs/artifacts/` — создаются Markdown файлы с frontmatter, для кода дополнительно может сохраняться `.html` (см. [ARTIFACTS_SPEC.md](artifacts/ARTIFACTS_SPEC.md))
- Сообщение об успешном сохранении с id показывается внизу Canvas (см. [ArtifactCanvas.jsx](../frontend/src/components/rightSidebar/ArtifactCanvas.jsx:355))

## 5. Рекомендации по демо (Canvas Demo Rules)

Агент обучен возвращать один самодостаточный HTML‑блок для быстрых демо:
- Правила сформулированы в [system_prompt.md](../backend/prompts/system_prompt.md:1) (раздел "Canvas Demo Rules")
- Попросите: "Верни один self‑contained HTML блок для Canvas…" — и нажмите "🧩 Canvas" у ответа

## 6. Безопасность и ограничения (MVP)

- Превью запускается в iframe sandbox: `allow-scripts allow-modals` (см. [ArtifactCanvas.jsx](../frontend/src/components/rightSidebar/ArtifactCanvas.jsx:305))
- Не даём доступ к origin, запрещаем внешние импорты и сетевые вызовы в демо
- Санитайзинг HTML — следующий шаг (см. TODO в [ARTIFACTS_SPEC.md](artifacts/ARTIFACTS_SPEC.md))
- Изображения: вставка base64; рекомендуемый размер ≤ 1 MB на файл; количество изображений — до 5 (мягкое правило)

## 7. Траблшутинг

- Демо не работает: проверьте, что HTML‑фрагмент самодостаточный, без внешних зависимостей
- Кнопка не реагирует: убедитесь, что добавили `id` и подписались на событие в JS (см. пример в [ArtifactCanvas.jsx](../frontend/src/components/rightSidebar/ArtifactCanvas.jsx:58))
- Ошибка сохранения: смотрите сообщение в Canvas и логи backend (терминал с Uvicorn)

## 8. Связанные документы

- Полная спецификация Canvas/Artifacts: [ARTIFACTS_SPEC.md](artifacts/ARTIFACTS_SPEC.md)
- Система промптов и плейсхолдеры: [prompt-system.md](prompt-system.md)
- Архитектура: [architecture.md](architecture.md)

## 9. Чек‑лист для изменений (из DOCUMENTATION_GUIDE)

- [x] Обновить документацию (этот файл + prompt-system)
- [x] Обновить CHANGELOG.md — раздел 2.0.0 (Prompt System Updates)
- [ ] Обновить roadmap.md — отметить прогресс по Canvas/Prompt System

