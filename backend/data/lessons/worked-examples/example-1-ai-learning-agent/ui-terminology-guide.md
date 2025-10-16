# UI Terminology Guide: AI Learning Agent

> Полная карта всех UI элементов проекта с правильными названиями и примерами промптов

---

## 🗺️ Общая структура интерфейса

### Three-Panel Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Header (fixed, 60px height)                                  │
│ • Toggle button (левый sidebar)                              │
│ • Title: "AI Learning Agent"                                 │
├──────────┬───────────────────────────┬───────────────────────┤
│ LEFT     │ CENTER                    │ RIGHT                 │
│ Sidebar  │ Main Content              │ Sidebar               │
│          │                           │                       │
│ 280px    │ flexible                  │ 600px                 │
│ fixed    │ (occupies remaining)      │ (resizable 400-800)   │
│          │                           │                       │
│ Course   │ Lesson                    │ AI Chat               │
│ Tree     │ Viewer                    │ Interface             │
│          │                           │                       │
│ [Hide]   │ [◄ Prev]    [Next ►]     │ [Model ▼] [⚙️] [📊]   │
│          │                           │ [Send]                │
└──────────┴───────────────────────────┴───────────────────────┘
```

---

## 1️⃣ Header (Шапка)

### Компонент
`components/layout/Header.jsx`

### Элементы

**Toggle Button** (кнопка сворачивания)
- Назначение: Свернуть/развернуть Left Sidebar
- Расположение: Левый верхний угол
- Иконка: ☰ (три горизонтальные линии)
- Терминология: "hamburger menu button", "toggle button"

**Промпт для Claude Code:**
```
Создай Header компонент:
- Fixed position top (z-index: 1000)
- Height: 60px
- Background: white
- Border-bottom: 1px solid #E5E7EB
- Содержит:
  - Toggle button слева (30×30px, иконка ☰)
  - Title "AI Learning Agent" (h1, 18px, bold)
- On click toggle button → вызвать onToggleLeftSidebar()
```

---

## 2️⃣ Left Sidebar (Левая панель навигации)

### Компонент
`components/leftSidebar/LeftSidebar.jsx` + `CourseTree.jsx`

### Элементы

#### Tree Navigation (Древовидная навигация)

**Структура:**
```
📁 AI Web Learning                    ← Course (Level 1)
  📂 1. Basics                        ← Module (Level 2)
    📄 Lesson 1.1: Client-Server      ← Lesson (Level 3)
    📄 Lesson 1.2: HTTP Basics
  📂 2. Backend
    📄 Lesson 2.1: FastAPI Intro

📁 Project Setup Guide
  📂 1. Fundamentals
    📄 Lesson 1.1: Philosophy
```

**Термины:**
- **Tree Navigation** - древовидная навигация
- **Node** - узел дерева (Course, Module, Lesson)
- **Expand/Collapse** - раскрыть/свернуть
- **Active item** - выбранный элемент (подсвечен)

**Состояния:**
- **Expanded** (раскрыто): иконка ▼, показаны дочерние элементы
- **Collapsed** (свернуто): иконка ►, дочерние элементы скрыты
- **Active** (активно): фон #DBEAFE, левая граница 3px #3B82F6
- **Hover** (наведение): фон #F3F4F6

**Промпт для Claude Code:**
```
Создай Tree Navigation для курсов:

DATA структура:
- courses: [{id, title, modules: []}]
- modules: [{id, title, lessons: []}]
- lessons: [{id, title}]

ИЕРАРХИЯ:
Level 1: Course (📁, padding-left: 12px)
Level 2: Module (📂, padding-left: 28px)
Level 3: Lesson (📄, padding-left: 44px)

ФУНКЦИОНАЛЬНОСТЬ:
- Клик на Course/Module → toggle expand/collapse
- Клик на Lesson → onLessonSelect(lessonId)
- Подсветка active lesson (фон #DBEAFE)

СТИЛИ:
- Each item: height 36px, cursor pointer
- Hover: background #F3F4F6
- Active lesson: background #DBEAFE, border-left 3px solid #3B82F6
- Expand icon: ► (collapsed) / ▼ (expanded)
```

#### Hide Sidebar Button (Кнопка сворачивания)

**Расположение:** Внизу Left Sidebar (footer)
**Текст:** "← Hide Sidebar"
**Функция:** Свернуть sidebar → Center panel расширяется

---

## 3️⃣ Center Panel (Центральная панель)

### Компонент
`components/center/LessonViewer.jsx`

### Элементы

#### Main Content Area (Основная область контента)

**Содержит:**
- Markdown-rendered lesson content
- Заголовки (H1-H6)
- Code blocks
- Lists (упорядоченные/неупорядоченные)
- Tables

**Термины:**
- **Markdown renderer** - рендеринг Markdown
- **Code block** - блок кода (с подсветкой синтаксиса)
- **Inline code** - инлайн код (`код`)

#### Prev/Next Navigation (Навигация между уроками)

**Компонент:** `LessonNavigation.jsx`

**Структура:**
```
┌─────────────────────────────────────────────────┐
│ ◄ Previous: Lesson 1.1    Next: Lesson 1.3 ►   │
└─────────────────────────────────────────────────┘
```

**Термины:**
- **Previous button** - кнопка назад
- **Next button** - кнопка вперед
- **Disabled state** - неактивное состояние (первый/последний урок)

**Промпт для Claude Code:**
```
Создай Prev/Next Navigation:

PROPS:
- prevLesson: {id, title} | null
- nextLesson: {id, title} | null
- onNavigate: (lessonId) => void

LAYOUT:
Horizontal flex, space-between

BUTTONS:
- Prev button: "◄ Previous: {title}"
- Next button: "Next: {title} ►"
- Disabled если null (opacity 0.5, cursor not-allowed)
- Hover: background #F3F4F6

СТИЛИ:
- Padding: 12px 24px
- Border-radius: 6px
- Text: 14px
```

#### Progress Button (Кнопка прогресса)

**Текст:**
- "☐ Mark as completed" (не завершён)
- "✓ Completed" (завершён)

**Функция:** Toggle статус урока (completed/not completed)

---

## 4️⃣ Right Sidebar (Правая панель AI чата)

### Компонент
`components/rightSidebar/ClaudeAISidebar.jsx`

### Элементы

#### Model Selector (Dropdown выбора модели)

**Тип:** Dropdown / Select
**Опции:**
- Gemini 2.5 Flash · 2M ctx · $0.075 in / $0.30 out
- Grok 4 Fast · 2M ctx · FREE!
- GPT-4.1 Mini · 200K ctx · $0.15 in / $0.60 out
- Claude Sonnet 4.5 · 200K ctx · $3 in / $15 out

**Термины:**
- **Dropdown** - выпадающий список
- **Select** - элемент выбора
- **Option** - вариант выбора
- **Selected value** - выбранное значение

**Промпт для Claude Code:**
```
Создай Model Selector dropdown:

DATA: models = [
  {id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", context: "2M", inputCost: 0.075, outputCost: 0.30},
  ...
]

DISPLAY FORMAT: "{name} · {context} ctx · ${inputCost} in / ${outputCost} out"

СТИЛИ:
- Width: 100%
- Padding: 8px 12px
- Border: 1px solid #D1D5DB
- Border-radius: 6px
- Background: white
- Font-size: 14px

ФУНКЦИОНАЛЬНОСТЬ:
- On change → setSelectedModel(modelId)
- Disabled when loading
```

#### Context Selector (Выбор контекста)

**Элементы:**
- **Summary text** - "Context: Current Lesson" / "Context: 5 lessons"
- **Configure button** (⚙️) - открывает modal

**Modal:** `ContextSelectorModal.jsx`

**Термины:**
- **Context** - контекст (какие уроки использует AI)
- **Radio buttons** - переключатели режима
- **Checkbox tree** - дерево с checkbox для выбора

---

#### Messages Container (Контейнер сообщений)

**Структура:**
```
┌─────────────────────────────────┐
│ 💬 Start a conversation         │ ← Empty state
├─────────────────────────────────┤
│ User: What is REST API?         │ ← User message
├─────────────────────────────────┤
│ Assistant: REST API is...       │ ← Assistant message
│ [Model badge] [Tokens badge]    │ ← Metadata
├─────────────────────────────────┤
│ ...                              │ ← Loading dots
└─────────────────────────────────┘
```

**Типы сообщений:**
- **User message** - сообщение пользователя (правое выравнивание, светлый фон)
- **Assistant message** - ответ AI (левое выравнивание, белый фон)
- **Error message** - сообщение об ошибке (красная граница)

**Metadata (метаданные):**
- **Model badge** - какая модель ответила (Badge компонент)
- **Tokens badge** - сколько токенов использовано (Badge компонент)

**Термины:**
- **Message** - сообщение
- **Metadata** - метаданные
- **Badge** - бейдж (метка с информацией)
- **Loading indicator** - индикатор загрузки

#### Input Area (Область ввода)

**Элементы:**
- **Textarea** - многострочное поле ввода
- **Send button** - кнопка отправки
- **Stats button** (📊) - открывает статистику

**Термины:**
- **Textarea** - текстовое поле (многострочное)
- **Placeholder** - текст-подсказка ("Ask a question...")
- **Disabled state** - неактивное состояние (во время загрузки)

**Промпт для Claude Code:**
```
Создай Input Area для чата:

LAYOUT:
┌───────────────────────────────┐
│ Textarea (3 rows)             │
├───────────────────────────────┤
│ [📊] Stats    [Send] Button   │
└───────────────────────────────┘

TEXTAREA:
- Placeholder: "Ask a question..."
- Rows: 3 (expandable)
- On Enter: отправить (Shift+Enter: новая строка)
- Disabled when loading

BUTTONS:
- Stats button: иконка 📊, on click → open stats modal
- Send button: "Send" текст, primary style
- Send disabled when: empty input OR loading

СТИЛИ:
- Textarea: border 1px #D1D5DB, border-radius 6px, padding 12px
- Send button: background #3B82F6, color white, padding 10px 20px
```

#### Resize Handle (Перетаскивание для изменения ширины)

**Компонент:** `ResizeHandle.jsx`
**Расположение:** Левый край Right Sidebar
**Визуал:** Вертикальная линия (cursor: col-resize)

**Функция:** Drag handle для изменения ширины sidebar (400-800px)

**Термины:**
- **Resize handle** - ручка изменения размера
- **Drag handle** - ручка перетаскивания
- **Min/Max width** - минимальная/максимальная ширина

---

## 5️⃣ Modals (Модальные окна)

### Context Selector Modal

**Компонент:** `ContextSelectorModal.jsx`

**Структура:**
```
┌────────────────────────────────────┐
│ Configure Context            [×]   │ ← Header
├────────────────────────────────────┤
│ Quick Modes:                       │
│ ◉ Current Lesson                   │ ← Radio buttons
│ ○ Current Module                   │
│ ○ All Lessons                      │
│ ○ Custom Selection                 │
│                                    │
│ [LessonTree with checkboxes]      │ ← Checkbox tree (if Custom)
│                                    │
│ Estimated: 5,000 tokens            │ ← Estimate
│ Cost: $0.04 in / $0.15 out        │
├────────────────────────────────────┤
│ [Cancel]        [Apply Context]    │ ← Footer
└────────────────────────────────────┘
```

**Элементы:**

**Modal overlay** - затемнение фона (rgba(0,0,0,0.5))
**Modal content** - основной контент (600px width)
**Header** - заголовок + кнопка закрытия (×)
**Body** - основной контент
**Footer** - кнопки действий

**Radio buttons** - выбор режима (только один активный)
**Checkbox tree** - дерево с checkbox (множественный выбор)
**Estimate component** - оценка токенов и стоимости

**Термины:**
- **Modal** - модальное окно
- **Overlay** - затемнённый фон
- **Close button** - кнопка закрытия (×)
- **Radio button** - переключатель (выбрать один)
- **Checkbox** - галочка (выбрать несколько)

**Промпт для Claude Code:**
```
Создай Modal для выбора контекста:

СТРУКТУРА:
Overlay (затемнение) + Modal content (600px width)

HEADER:
- Title: "Configure Context"
- Close button (×) right aligned

BODY:
1. Radio buttons (Quick Modes):
   - Current Lesson
   - Current Module
   - All Lessons
   - Custom Selection

2. If Custom selected → show LessonTree with checkboxes

3. Context Estimate:
   - Estimated tokens: X,XXX
   - Cost: $X.XX in / $X.XX out

FOOTER:
- Cancel button (secondary style)
- Apply Context button (primary style)

ФУНКЦИОНАЛЬНОСТЬ:
- Click overlay → close modal
- Click × → close modal
- ESC key → close modal
- Apply → save selection, close modal
```

### Stats Modal

**Компонент:** Внутри `ClaudeAISidebar.jsx`

**Структура:**
```
┌────────────────────────────────┐
│ Conversation Statistics   [×]  │
├────────────────────────────────┤
│ Messages                       │
│ 5                              │
│                                │
│ Tokens Used                    │
│ Input: 12,450                  │
│ Output: 3,890                  │
│ Total: 16,340                  │
│                                │
│ Cost                           │
│ USD: $0.1234                   │
│ RUB: ₽12.34                    │
└────────────────────────────────┘
```

**Термины:**
- **Statistics** - статистика
- **Total** - всего
- **Currency** - валюта (USD, RUB)

---

## 6️⃣ Other UI Elements (Другие элементы)

### Badges (Бейджи/Метки)

**Примеры в проекте:**
- Model badge: "Gemini 2.5 Flash"
- Tokens badge: "1,234 tokens"

**Стили:**
- Background: #E5E7EB (серый)
- Padding: 4px 8px
- Border-radius: 4px
- Font-size: 12px

### Loading Indicators (Индикаторы загрузки)

**Loading dots** (в чате):
```
...  (три точки анимируются)
```

**Loading spinner** (если используется):
```
◐ (крутящийся кружок)
```

### Empty States (Пустые состояния)

**Empty chat:**
```
💬
Start a conversation
Ask questions about the course materials
```

**No lesson selected:**
```
📚
Select a lesson to start learning
Choose a lesson from the left sidebar
```

---

## 📝 Шпаргалка терминов

### Layout
| Русский | English | Пример |
|---------|---------|--------|
| Шапка | Header | Header.jsx |
| Подвал | Footer | - |
| Боковая панель | Sidebar | LeftSidebar.jsx |
| Основной контент | Main Content | LessonViewer.jsx |
| Контейнер | Container | - |

### Navigation
| Русский | English | Пример |
|---------|---------|--------|
| Панель навигации | Navbar | - |
| Дерево | Tree Navigation | CourseTree.jsx |
| Хлебные крошки | Breadcrumbs | - |
| Вкладки | Tabs | - |
| Назад/Вперёд | Prev/Next | LessonNavigation.jsx |

### Interactive
| Русский | English | Пример |
|---------|---------|--------|
| Кнопка | Button | Send button |
| Поле ввода | Input | - |
| Текстовое поле | Textarea | Message input |
| Выпадающий список | Dropdown/Select | ModelSelector |
| Галочка | Checkbox | LessonTree (Custom mode) |
| Переключатель | Radio button | ContextSelectorModal modes |

### Feedback
| Русский | English | Пример |
|---------|---------|--------|
| Модальное окно | Modal | ContextSelectorModal |
| Уведомление | Toast/Notification | - |
| Загрузка | Loading | Loading dots |
| Бейдж/Метка | Badge | Token count badge |
| Подсказка | Tooltip | - |

---

## 🎯 Практическое применение

### Пример 1: Формулировка задачи

**❌ Плохо:**
"Сделай окошко где можно выбрать уроки для чата"

**✅ Хорошо:**
"Создай Modal (ContextSelectorModal) для выбора контекста AI чата:
- Radio buttons для Quick Modes (Current/Module/All/Custom)
- Checkbox tree для Custom selection
- Estimate component для показа токенов и стоимости
- Кнопки Cancel и Apply Context в footer"

### Пример 2: Обсуждение с командой

**❌ Плохо:**
"Надо добавить штуку слева с уроками"

**✅ Хорошо:**
"Надо добавить Left Sidebar с Tree Navigation для курсов. Структура: Course → Module → Lesson. С expand/collapse и подсветкой active lesson."

---

**Дата создания:** 2025-10-16
**Версия:** 1.0
**Статус:** Актуально для AI Learning Agent v2.0
