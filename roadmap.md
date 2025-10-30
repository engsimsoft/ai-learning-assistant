# Roadmap: AI Learning Agent v3.0

## 🎯 Цель проекта

Полный рефакторинг UI в стиле Claude + новые фичи (отображение стоимости с кэшированием, умный поиск по официальной документации).

**Подход:** Long Context Window (1M-2M токенов) вместо классического RAG - весь курс загружается в контекст модели.

**Технологии:**
- Backend: FastAPI + Python 3.13 + OpenRouter (4 модели: Gemini 2.5 Flash, Grok 4 Fast, GPT-4.1 Mini, Claude Sonnet 4.5)
- Frontend: React 18 + Vite 5 (трёхпанельный layout в стиле Claude)
- Deployment: Railway (2 сервиса)

---

## 📊 Текущий статус
- **Версия:** v3.1 (Artifact System Complete: Plot, Calculator, Templates, Markdown Links)
- **Фаза:** Фаза 1-2 + Artifact System (Sprint 4-6) завершены ✅ / 4
- **Прогресс:** 48/67 задач (72%)
- **Следующее:** Фаза 3 (Cost Display) или Sprint 7 (Testing & Documentation)
- **Контент:** Module 4 (Express + React Setup) добавлен в Project Setup Guide (8 уроков) ✅ 2025-10-30

---

## 🚀 Фазы разработки

### Фаза 1: UI Рефакторинг (трёхпанельный layout) ⏳ В РАБОТЕ
**Цель:** Полностью новый UI в стиле Claude с трёхпанельной компоновкой

**Сроки:** 3-4 недели

#### 1.1 Подготовка и планирование
- [X] Проанализировать текущую структуру компонентов (30 мин)
- [X] Создать структуру папок для новых компонентов (30 мин)
- [X] Создать базовые константы для размеров панелей (30 мин)
- [X] Обновить index.css с новой цветовой схемой (1 час)

#### 1.2 Layout - основная структура (3-4 часа)
- [X] Создать Layout.jsx (трёхпанельная структура) (2 часа)
- [X] Добавить Header с кнопкой сворачивания (1 час)
- [X] Реализовать логику сворачивания панелей (1 час)

#### 1.3 LEFT Sidebar - навигация по курсам (4-5 часов) ✅ ЗАВЕРШЕН
- [X] Создать LeftSidebar.jsx (базовая структура) (1 час)
- [X] Создать CourseTree.jsx (дерево курсов/модулей/уроков) (2 часа)
- [X] Добавить иконки и стили для курсов/модулей/уроков (1 час)
- [X] Реализовать раскрытие/сворачивание курсов и модулей (1 час)
- [X] Добавить выделение выбранного урока (30 мин)
- [X] Добавить кнопку "Hide Sidebar" (30 мин)

#### 1.4 CENTER - просмотр урока (3-4 часа) ✅ ЗАВЕРШЕН
- [X] Создать LessonViewer.jsx (просмотр урока) (1 час)
- [X] Интегрировать Markdown рендеринг (react-markdown) (1 час)
- [X] Добавить стили для Markdown (H1-H6, code, lists) (1 час)
- [X] Добавить навигацию Prev/Next между уроками (1 час)
- [X] Реализовать scroll to top при смене урока (30 мин)
- [X] Добавить синхронизацию с LEFT sidebar (30 мин)

#### 1.5 RIGHT Sidebar - Claude AI чат (5-6 часов) ✅ ЗАВЕРШЕН
- [X] Создать ClaudeAISidebar.jsx (базовая структура) (1 час)
- [X] Создать ModelSelector dropdown (выбор модели) (1 час)
- [X] Переработать MessageList для темной темы (1 час)
- [X] Добавить метаданные сообщения (tokens, lessons used) (1 час)
- [X] Создать Input с кнопками Search Docs и Send (1 час)
- [X] Добавить кнопку закрытия sidebar (30 мин)

#### 1.6 Drag-resize для RIGHT sidebar (2-3 часа) ✅ ЗАВЕРШЕН
- [X] Создать ResizeHandle компонент (1 час)
- [X] Реализовать drag-resize логику (min 400px, max 800px) (1 час)
- [X] Добавить сохранение размера в localStorage (30 мин)
- [X] Добавить плавные transitions (30 мин)

#### 1.7 Адаптивность (только десктоп) (2-3 часа)
- [ ] Добавить поддержку 1920px экранов (1 час)
- [ ] Добавить поддержку 1366px минимум (1 час)
- [ ] Тестирование на разных разрешениях (1 час)

#### 1.8 Backend - загрузка контента урока (2 часа) ✅ ЗАВЕРШЕН
- [X] Создать endpoint GET /lessons/:id (получить урок) (1 час)
- [X] Обновить models.py (добавить LessonDetailResponse) (30 мин)
- [X] Обновить context_service.py (метод get_lesson уже существует) (30 мин)

#### 1.9 Layout Redesign - Dynamic CENTER (6-8 часов) ✅ ЗАВЕРШЕН (2025-10-18)
**См. детальный план:** [layout-redesign-roadmap-md.md](layout-redesign-roadmap-md.md)

**Phase 1: Refactor CENTER Container**
- [X] Создать CenterContainer.jsx с state machine (3 states) (2 часа)
- [X] Добавить CENTER state management в Layout.jsx (1 час)
- [X] Реализовать CSS layout для split view (1 час)
- [X] Создать CenterResizeHandle для Lesson/Artifact split (1 час)

**Phase 2: Extract Artifact from RIGHT Sidebar**
- [X] Создать ArtifactViewer.jsx компонент (1 час)
- [X] Удалить табы из ClaudeAISidebar.jsx (RIGHT = chat only) (30 мин)
- [X] Расширить событийную систему (artifact:open, center:showLesson) (30 мин)

**Phase 3: Auto-hide Logic**
- [X] Реализовать panel visibility state machine (1 час)
- [X] Scenario 1: Artifact from lesson → hide RIGHT (30 мин)
- [X] Scenario 2: Artifact from AI → hide LEFT (30 мин)

**Phase 4: Control Buttons**
- [X] Добавить [💬] кнопку в Header (show/hide RIGHT) (30 мин)
- [X] Добавить [×] и [📄 Show Lesson] в Artifact toolbar (30 мин)

**Результат:**
- ✅ Artifacts получают до 100% ширины CENTER (vs 400-800px в старом sidebar)
- ✅ Context-aware layout (адаптируется под workflow)
- ✅ Lesson + Artifact одновременно в split view
- ✅ Smooth transitions (300ms CSS)

#### 1.10 Artifact System - Plot & Calculator Templates (12-15 часов) ✅ ЗАВЕРШЕН (2025-10-18)
**См. детальный план:** [artifact-system-roadmap.md](artifact-system-roadmap.md)

**Sprint 1: Install Libraries (1 час)**
- [X] Установить plotly.js-dist-min@3.1.2 (30 мин)
- [X] Установить mathjs@15.0.0 (30 мин)

**Sprint 2: Type System Extension (2 часа)**
- [X] Обновить backend/models.py (ArtifactType: 5 типов, config field) (1 час)
- [X] Обновить frontend ArtifactCanvas (5 вкладок вместо 3) (1 час)

**Sprint 3: InteractivePlot Component (3-4 часа)**
- [X] Создать InteractivePlot.jsx с Plotly.js (2 часа)
- [X] Добавить Export PNG, Reset, Fullscreen (1 час)
- [X] Интегрировать в ArtifactCanvas с sample data (1 час)

**Sprint 4: Calculator Component (3-4 часа)**
- [X] Создать Calculator.jsx с Math.js (2 часа)
- [X] Добавить sliders, formulas, live calculations (1 час)
- [X] Интегрировать в ArtifactCanvas с sample config (1 час)

**Sprint 5: Templates System (3-4 часа)**
- [X] Создать templates/ directory structure (30 мин)
- [X] Создать line-chart.js template (1 час)
- [X] Создать scatter-plot.js template (1 час)
- [X] Создать generic-calculator.js template (1 час)
- [X] Создать artifactTemplates.js registry (30 мин)
- [X] Добавить template selector UI в ArtifactCanvas (1 час)

**Sprint 6: Markdown Links (3 часа) ✅ ЗАВЕРШЕН (2025-10-19)**
- [X] Парсер markdown ссылок в LessonViewer (1 час)
- [X] Поддержка синтаксиса `[Text](artifact:template-id)` и `[Text](artifact:template-id:example-name)` (1 час)
- [X] Стили для artifact links (indigo #6366f1, light theme) (30 мин)
- [X] Создан demo урок `artifact-gallery.md` с примерами (30 мин)
- [X] **FIX: ReactMarkdown urlTransform** для поддержки `artifact:` протокола (2 часа)
  - Проблема: remark-gfm не распознает нестандартные протоколы
  - Решение: добавлен `customUrlTransform` согласно официальной документации
  - Результат: ссылки `[📊 Chart](artifact:line-chart)` открывают артефакты в CENTER, а не новые вкладки

**Sprint 7: Testing & Documentation (отложен)**
- [ ] Тестирование всех artifact типов (1 час)
- [ ] Тестирование template loading (1 час)
- [ ] Обновление документации (1 час)

**Результат:**
- ✅ 5 типов артефактов: markdown, code, images, plot, calculator
- ✅ Интерактивные Plotly.js графики (zoom, pan, export, fullscreen)
- ✅ Живые Math.js вычисления (sliders, formulas, results)
- ✅ 3 универсальных шаблона (line-chart, scatter-plot, generic-calculator)
- ✅ Template selector в Canvas UI
- ✅ **Markdown artifact links** - `[Text](artifact:template-id)` синтаксис
- ✅ Canvas доступен через кнопку [🎨] в Header

**📊 Artifact System Roadmap B: 100% ЗАВЕРШЁН ✅**

---

### Фаза 2: Стоимость и кэширование 📋 В РАБОТЕ
**Цель:** Отображение стоимости с учётом кэширования промптов + умное управление контекстом

**Сроки:** 1-2 недели

#### 2.0 Smart Context Selector (8-10 часов) ✅ ЗАВЕРШЕН
- [X] Backend - добавить `/context/preview` endpoint (1 час)
- [X] Backend - добавить `/lessons/grouped` endpoint (1 час)
- [X] Backend - добавить методы в `ContextService` (1 час)
- [X] Frontend - создать `ContextSelectorModal` компонент (2 часа)
- [X] Frontend - создать `LessonTree` с чекбоксами (2 часа)
- [X] Frontend - создать `ContextEstimate` компонент (1 час)
- [X] Frontend - добавить утилиты `tokenEstimation.js`, `lessonTree.js` (1 час)
- [X] Frontend - интегрировать в `ClaudeAISidebar` (1 час)
- [X] Светлая тема UI в соответствии с дизайном проекта (1 час)

#### 2.1 Backend - цены моделей (2 часа)
- [ ] Обновить config.py (добавить цены для каждой модели) (1 час)
- [ ] Добавить поля: input_price, output_price, cached_price (30 мин)
- [ ] Обновить AVAILABLE_MODELS с ценами (30 мин)

#### 2.2 Backend - расчёт стоимости (3-4 часа)
- [ ] Создать cost_calculator.py в services/ (2 часа)
- [ ] Реализовать функцию calculate_cost() (1 час)
- [ ] Добавить расчёт экономии от кэша (1 час)

#### 2.3 Backend - интеграция в openrouter_service (2 часа)
- [ ] Обновить chat() для возврата cost метаданных (1 час)
- [ ] Обновить models.py (добавить CostMetadata в ChatResponse) (1 час)

#### 2.4 Frontend - отображение метаданных (2-3 часа)
- [ ] Создать MessageMetadata.jsx компонент (1 час)
- [ ] Добавить отображение токенов (input/cached/output) (1 час)
- [ ] Добавить отображение стоимости и экономии (1 час)

---

### Фаза 3: Ограничение Claude Sonnet 📋 ЗАПЛАНИРОВАНО
**Цель:** Специальный UI для выбора уроков при использовании Claude Sonnet 4.5 (лимит 100K/20 уроков)

**Сроки:** 1 неделя

#### 3.1 Backend - логика лимита (2-3 часа)
- [ ] Создать claude_limiter.py в services/ (1 час)
- [ ] Добавить валидацию (max 20 lessons, max 100K tokens) (1 час)
- [ ] Обновить endpoint POST /chat с валидацией (1 час)

#### 3.2 Frontend - UI выбора модулей (3-4 часа)
- [ ] Создать ClaudeLessonSelector.jsx (2 часа)
- [ ] Добавить счётчики в реальном времени (18/20, 90K/100K) (1 час)
- [ ] Добавить quick select для курсов (1 час)
- [ ] Блокировать превышение лимита (1 час)

#### 3.3 Frontend - интеграция в RIGHT sidebar (1-2 часа)
- [ ] Показывать предупреждение при выборе Claude Sonnet (30 мин)
- [ ] Переключать LEFT sidebar → ClaudeLessonSelector (1 час)
- [ ] Добавить стили для блокированного состояния (30 мин)

---

### Фаза 4: Поиск по официальной документации 📋 ЗАПЛАНИРОВАНО
**Цель:** Двухэтапный процесс - сначала ответ из курса, затем опционально поиск в официальных документах

**Сроки:** 2 недели

#### 4.1 Backend - база официальных источников (1 час)
- [ ] Создать docs_sources.py (список официальных URL) (1 час)

#### 4.2 Backend - определение технологии (2 часа)
- [ ] Создать tech_detector.py (keyword matching) (2 часа)

#### 4.3 Backend - интеграция Brave Search API (3-4 часа)
- [ ] Создать brave_search_service.py (2 часа)
- [ ] Добавить BRAVE_API_KEY в config (30 мин)
- [ ] Реализовать fetch_official_docs() (1-2 часа)

#### 4.4 Backend - двухэтапный процесс (2-3 часа)
- [ ] Обновить openrouter_service.py (определение needs_docs) (1 час)
- [ ] Добавить флаг search_docs в POST /chat (1 час)
- [ ] Обновить models.py (добавить needs_docs, detected_tech) (1 час)

#### 4.5 Frontend - кнопка поиска документации (2-3 часа)
- [ ] Создать SearchDocsButton.jsx (1 час)
- [ ] Показывать кнопку если needs_docs=true (30 мин)
- [ ] Обработать клик → новый запрос с search_docs=true (1 час)
- [ ] Отображать источники в метаданных (30 мин)

---

## 📝 Текущая сессия

**2025-10-16:**
- ✅ Реализован Smart Context Selector для AI чата
- ✅ 4 режима выбора контекста: Current Lesson, Current Module, All Lessons, Custom
- ✅ Добавлено иерархическое дерево с чекбоксами для выбора уроков
- ✅ Реализована оценка токенов и стоимости в реальном времени
- ✅ Добавлены backend endpoints: `/context/preview`, `/lessons/grouped`
- ✅ Создано 3 новых React компонента + 2 utility файла
- ✅ Светлая тема UI в соответствии с дизайном проекта
- ✅ Исправлены баги с отображением токенов в сообщениях
- ✅ Обновлена документация: docs/prompt-system.md, добавлен docs/artifacts.md, обновлен CHANGELOG.md

**2025-10-13:**
- ✅ Изучена техническая спецификация AI Learning Agent v2.0
- ✅ Изучен урок "1.8 Планирование и Roadmap" из Project Setup Guide
- ✅ Проанализирована текущая структура проекта v1.0
- ✅ Создан детальный roadmap для v2.0 (58 задач, 4 фазы)
- ✅ Roadmap v1.0 сохранён как roadmap-v1.0.md
- ⏸️ Следующее: Начать Фазу 1 - UI Рефакторинг

**Решения:**
- Drag-resize для RIGHT sidebar → сохранять в localStorage
- История чата → пока только в React state (в v2.1+ сделать полноценную с БД)
- Scroll to top при смене урока → обязательно добавить
- Навигация Prev/Next → синхронизировать с LEFT sidebar
- Поиск документации → гибридный подход (показать 1-2 кнопки с технологиями)

---

## 💡 Правила работы

1. **Одна задача за раз** - не делай несколько задач одновременно
2. **Обновляй roadmap** - отмечай [X] выполненные задачи сразу после завершения
3. **Тестируй каждую задачу** - убедись что работает перед переходом дальше
4. **Коммить после важных задач** - git commit с понятным сообщением
5. **Записывай проблемы** - в секции "Текущая сессия"
6. **Следуй принципу SSOT** - никаких дублей, обновляй документацию

---

## 🤖 Работа с Claude Code

**Формат задачи:**
```
Смотри roadmap.md.

Текущая фаза: [Фаза X]
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

---

## 📊 Оценка времени

**Итого:** ~6-8 недель на полный v2.0

- **Фаза 1:** 3-4 недели (UI рефакторинг - самая большая)
- **Фаза 2:** 1-2 недели (стоимость и кэширование)
- **Фаза 3:** 1 неделя (ограничение Claude Sonnet)
- **Фаза 4:** 2 недели (поиск по документации)

**Примечание:** При работе 2-3 часа в день

---

## 🔗 Ссылки

- [Техническая спецификация v2.0](TECH_SPEC_v2.0.md) - детальный дизайн
- [Roadmap v1.0](roadmap-v1.0.md) - история разработки v1.0
- [CHANGELOG.md](CHANGELOG.md) - история изменений
- [CLAUDE.md](CLAUDE.md) - правила работы с проектом
- [DOCUMENTATION_GUIDE.md](DOCUMENTATION_GUIDE.md) - принципы документации
