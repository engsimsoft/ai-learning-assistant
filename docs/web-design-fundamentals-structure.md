# Структура курса "Web Design Fundamentals"

> **Философия курса:** Изучение UI/UX терминологии и артефактов дизайна для эффективной коммуникации с ИИ при разработке интерфейсов (Vibe Coding для дизайна)

## 📋 Обзор

**Цель курса:** Научиться правильно называть UI элементы и работать с артефактами дизайна для точного описания интерфейсов ИИ-ассистентам.

**Для кого:** Разработчики, работающие с ИИ-инструментами (Claude Code, GitHub Copilot, Cursor AI), которым нужно создавать UI и коммуницировать с ИИ на языке дизайна.

---

## 🎯 Ключевые принципы курса

### 1. **Точная терминология для ИИ**
Правильные названия UI элементов помогают ИИ точно понимать требования:
- **Navigation Bar** (не "меню сверху")
- **Modal Dialog** (не "всплывающее окно")
- **Tooltip** (не "подсказка при наведении")

### 2. **Визуальная иерархия**
Понимание как элементы организуются:
- Containers (Card, Panel, Section)
- Layout patterns (Grid, Flex, Stack)
- Spacing и alignment

### 3. **Интерактивность и feedback**
Элементы для взаимодействия:
- Interactive elements (Button, Input, Dropdown)
- Feedback components (Toast, Progress, Loading)
- State indicators (Badge, Status, Chip)

### 4. **Артефакты дизайна**
Правильное использование дизайн-документов:
- Wireframes для структуры
- Mockups для визуала
- Design Systems для консистентности
- Handoff документы для передачи

---

## 📘 Module 1: UI Terminology (5 уроков)

**Путь:** `backend/data/lessons/web-design-fundamentals/1-ui-terminology/`

**Статус:** ✅ ЗАВЕРШЕН (2025-10-16)

### 1.1 Layout Elements (Элементы макета)
**Файл:** `lesson-1-1-layout-elements.md`

**Содержание:**
- Container patterns (Card, Panel, Section, Hero)
- Layout systems (Grid, Flexbox, Stack)
- Spacing и alignment
- Responsive breakpoints

**Применение:** Описание структуры страницы для ИИ

---

### 1.2 Navigation Elements (Элементы навигации)
**Файл:** `lesson-1-2-navigation-elements.md`

**Содержание:**
- Navigation Bar (горизонтальная/вертикальная)
- Sidebar Navigation
- Breadcrumbs
- Tabs и Tab Bar
- Pagination

**Применение:** Правильное название навигационных компонентов

---

### 1.3 Interactive Elements (Интерактивные элементы)
**Файл:** `lesson-1-3-interactive-elements.md`

**Содержание:**
- Buttons (Primary, Secondary, Ghost, Icon)
- Form controls (Input, Textarea, Select, Checkbox, Radio)
- Dropdowns и Combobox
- Toggle и Switch
- Slider и Range

**Применение:** Точное описание элементов форм и действий

---

### 1.4 Feedback Elements (Элементы обратной связи)
**Файл:** `lesson-1-4-feedback-elements.md`

**Содержание:**
- Modal Dialog и Alert Dialog
- Toast Notification
- Tooltip
- Progress Bar и Spinner
- Badge и Status Indicator
- Skeleton Loading

**Применение:** Описание состояний и уведомлений в UI

---

### 1.5 Prompting Best Practices (Лучшие практики промптов)
**Файл:** `lesson-1-5-prompting-best-practices.md`

**Содержание:**
- Как описывать UI для ИИ
- Структура промпта для дизайна
- Примеры эффективных промптов
- Типичные ошибки в описании UI
- Итеративное уточнение с ИИ

**Применение:** Эффективная коммуникация с ИИ при создании интерфейсов

---

## 📕 Module 2: Artifacts (6 уроков)

**Путь:** `backend/data/lessons/web-design-fundamentals/2-artifacts/`

**Статус:** ✅ ЗАВЕРШЕН (2025-10-16)

### 2.1 What are Artifacts (Что такое артефакты дизайна)
**Файл:** `lesson-2-1-what-are-artifacts.md`

**Содержание:**
- Определение design artifacts
- Типы артефактов: Wireframe, Mockup, Prototype, Design System
- Зачем нужны артефакты
- Жизненный цикл артефактов
- Инструменты (Figma, Sketch, Adobe XD, Balsamiq)
- Артефакты в Vibe Coding

**Применение:** Понимание экосистемы артефактов дизайна

---

### 2.2 Wireframes, Mockups, Prototypes
**Файл:** `lesson-2-2-wireframes-mockups.md`

**Содержание:**
- Fidelity levels (Low-Fi, Mid-Fi, High-Fi)
- Детальный разбор Wireframe (структура, схемы, ASCII примеры)
- Детальный разбор Mockup (визуал, цвета, шрифты, CSS specs)
- Детальный разбор Prototype (интерактивность, user flows)
- Сравнительная таблица
- Когда использовать каждый тип
- Claude Code промпты для всех типов
- Типичные ошибки

**Применение:** Выбор правильного артефакта и работа с ним

---

### 2.3 Design Systems and Style Guides
**Файл:** `lesson-2-3-design-systems.md`

**Содержание:**
- Что такое Design System vs Style Guide
- Atomic Design (Atoms → Molecules → Organisms → Templates → Pages)
- Design Tokens (Colors, Spacing, Typography, Shadows, Border Radius)
- Популярные системы: Material Design, Ant Design, Chakra UI, Bootstrap, Tailwind
- Сравнительная таблица систем
- Создание собственной минимальной design system
- Claude Code промпты для использования design systems
- Примеры компонентов (Button, Form, Dashboard)

**Применение:** Работа с design systems и применение в проектах

---

### 2.4 Component Libraries and UI Kits
**Файл:** `lesson-2-4-component-libraries.md`

**Содержание:**
- Что такое Component Library
- Разница между Design System и Component Library
- Обзор библиотек: Material-UI, Ant Design, Chakra UI, Tailwind UI, shadcn/ui
- Сравнительная таблица (размер, кастомизация, сложность)
- Storybook для документации
- Theming и кастомизация
- Pros/Cons использования библиотек vs custom components
- Claude Code промпты для интеграции библиотек
- Примеры использования

**Применение:** Выбор и интеграция component libraries

---

### 2.5 Design → Dev Handoff
**Файл:** `lesson-2-5-handoff-artifacts.md`

**Содержание:**
- Что такое design handoff
- Форматы handoff: Figma, Sketch, Zeplin, InVision
- Figma Inspect Panel (подробно)
- Извлечение specs: Colors, Typography, Spacing, Shadows, Border-radius
- Экспорт assets (SVG, PNG, JPG)
- Responsive design specs
- Handoff checklist (что должен получить developer)
- Типичные проблемы и решения
- Claude Code промпты для реализации Figma specs
- Практический пример: AI Learning Agent Header

**Применение:** Эффективный handoff от дизайнера к разработчику

---

### 2.6 Prompting with Artifacts (Мастер-класс)
**Файл:** `lesson-2-6-prompting-with-artifacts.md`

**Содержание:**
- Философия artifact-based prompting
- Структура идеальных промптов
- Промптинг по типу артефакта (6 разделов)
- Progressive prompting workflow (Lo-Fi → Hi-Fi)
- Anti-patterns: 10+ плохих промптов с исправлениями
- Advanced techniques (multi-step prompts, context management, iterative refinement)
- Чит-лист (printable templates)
- Masterclass examples: полные workflows (E-commerce Product Page)
- Handling complex scenarios: layouts, responsive, animations, state, errors, a11y

**Применение:** Профессиональный уровень промптинга с артефактами

---

## 💼 Worked Examples (Практические примеры)

**Путь:** `backend/data/lessons/worked-examples/example-1-ai-learning-agent/`

### Example 1: UI Terminology Guide
**Файл:** `ui-terminology-guide.md`

**Статус:** ✅ Завершен (Module 1)

**Описание:** Полноценная карта всех UI элементов проекта AI Learning Agent с правильными названиями и промптами.

**Содержание:**
- ASCII диаграммы three-panel layout
- Разбор всех компонентов по секциям (Header, Left Sidebar, Center, Right Sidebar, Modals)
- Правильные названия для каждого элемента
- Ссылки на файлы компонентов (Layout.jsx, CourseTree.jsx, и т.д.)
- 20+ готовых Claude Code промптов
- Терминология: русский ↔ английский

**Охватывает:**
- Layout: Three-panel layout, Sidebar, Main content area
- Navigation: Tab-based navigation, Panel switching
- Interactive: Buttons, Textareas, Dropdowns
- Feedback: Loading states, Error messages, Toast notifications

**Применение:**
- Шаблон для описания UI в своих проектах
- Референс для работы с ИИ
- Checklist терминологии Module 1

---

### Example 2: Design Artifacts Guide
**Файл:** `design-artifacts-guide.md`

**Статус:** ✅ Завершен (Module 2)

**Описание:** Полное руководство по design artifacts на примере проекта AI Learning Agent.

**Содержание:**
- Wireframes: Lo-Fi схемы three-panel layout
- Mockups: Hi-Fi спецификации с цветами, шрифтами, spacing
- Prototypes: Описание интерактивности (модалы, анимации, user flows)
- Design System: Полная дизайн-система проекта
  - Color palette (Primary, Secondary, Neutral, Semantic colors)
  - Typography scale (H1-H6, body, small, micro)
  - Spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px)
  - Shadow elevations
  - Component specifications (Button, Input, Tree Nav, Modal, Badge)
- Component Library: Какие компоненты используются
- Figma Handoff Examples: Примеры specs из Figma
- Progressive Examples: Button и Tree Item (Wireframe → Mockup → Design System → Code)
- 7 полных Claude Code промптов для реализации

**Применение:**
- Референс для создания артефактов дизайна
- Примеры для Module 2
- Templates для своих проектов

---

## 📊 Статистика курса

| Модуль | Тема | Количество уроков | Статус |
|--------|------|-------------------|--------|
| **Module 1** | UI Terminology | 5 | ✅ ЗАВЕРШЕН |
| **Module 2** | Artifacts | 6 | ✅ ЗАВЕРШЕН |
| **Worked Examples** | AI Learning Agent | 2 | ✅ ЗАВЕРШЕНО |
| **Всего** | | **13** (11 уроков + 2 примера) | **✅ ГОТОВ** |

---

## 🔗 Связь с другими курсами

### Связь с "AI Web Learning":
- **Web Design Fundamentals** учит **КАК НАЗЫВАТЬ** UI элементы
- **AI Web Learning** учит **ЧТО СОЗДАВАТЬ** (Backend, Frontend, Database)
- Вместе: правильная терминология + технические знания = точные промпты для ИИ

### Связь с "Project Setup Guide":
- **Project Setup Guide** учит **КАК ОРГАНИЗОВАТЬ** проект
- **Web Design Fundamentals** учит **КАК ОПИСЫВАТЬ** интерфейсы
- Вместе: правильная структура + точная терминология = качественный проект

---

## 🎯 Рекомендуемый порядок изучения

### Вариант 1: Начинаешь новый проект с UI
1. **Project Setup Guide** (Часть 1: Основы) - создай правильную структуру
2. **Web Design Fundamentals** (Module 1) - изучи терминологию UI
3. **AI Web Learning** (Module 4: Frontend) - создай интерфейс
4. **Web Design Fundamentals** (Module 2: Artifacts) - работай с дизайн-документами

### Вариант 2: Уже есть проект, хочешь улучшить UI
1. **Web Design Fundamentals** (Module 1) - изучи терминологию
2. **Web Design Fundamentals** (Worked Example) - посмотри на практический пример
3. **AI Web Learning** (Module 4: Frontend) - улучши компоненты
4. Примени новые знания к своему проекту

### Вариант 3: Полное обучение с нуля
1. **Project Setup Guide** (все части) - научись создавать проекты правильно
2. **AI Web Learning** (Module 1-3) - изучи Backend и Database
3. **Web Design Fundamentals** (Module 1) - изучи UI терминологию
4. **AI Web Learning** (Module 4-5) - создай Frontend + интеграцию
5. **Web Design Fundamentals** (Module 2) - работай с артефактами дизайна
6. **AI Web Learning** (Module 6-7) - добавь монетизацию и деплой

---

## 🤖 Vibe Coding для дизайна

**Философия:**

| Роль | Ответственность |
|------|----------------|
| **Человек** | Определяет UX, выбирает паттерны, знает терминологию |
| **ИИ ассистент** | Генерирует компоненты, предлагает решения, пишет код |
| **Design System** | Обеспечивает консистентность, переиспользование |
| **Feedback** | Итеративное улучшение через точные промпты |

**Инструменты:**
- **Для кода:** Claude Code, GitHub Copilot, Cursor AI
- **Для дизайна:** Figma, Sketch, Adobe XD
- **UI библиотеки:** Shadcn/ui, Material UI, Chakra UI, Ant Design

---

## 💡 Главный takeaway курса

> **"Правильная терминология = точные промпты = качественный UI"**

**Без знания терминологии:**
```
Создай меню сверху с кнопками и логотипом слева
```

**С правильной терминологией:**
```
Создай Navigation Bar с:
- Logo в левой части
- Horizontal Nav Links (Home, About, Courses)
- Call-to-Action Button (Primary) справа
- Sticky positioning при скролле
```

Результат: ИИ точно понимает что создавать! 🎯

---

## 🎓 Для кого этот курс

### ✅ Курс подойдет если:
- Работаешь с ИИ-ассистентами для создания UI
- Хочешь говорить на языке дизайнеров
- Нужно точно описывать интерфейсы в промптах
- Создаешь веб-приложения с современным UI
- Хочешь понимать дизайн-артефакты (wireframes, mockups)

### ⚠️ Курс НЕ учит:
- Графическому дизайну (это отдельная профессия)
- Работе в Figma/Sketch (это отдельные курсы)
- UX исследованиям и тестированию
- Продвинутым дизайн-паттернам
- CSS верстке (это в "AI Web Learning")

---

## 🔗 Связанные документы

- **Структура основного курса:** [course-structure.md](course-structure.md)
- **Структура Project Setup Guide:** [project-setup-guide-structure.md](project-setup-guide-structure.md)
- **Главная страница проекта:** [README.md](../README.md)
- **Архитектура системы:** [architecture.md](architecture.md)
- **План развития:** [roadmap.md](../roadmap.md)

---

**Последнее обновление:** 2025-10-16
