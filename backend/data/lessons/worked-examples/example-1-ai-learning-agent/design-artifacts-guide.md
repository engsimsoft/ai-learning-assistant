# Design Artifacts Guide: AI Learning Agent

> Практическое руководство по дизайн-артефактам проекта с реальными спецификациями

---

## 🎯 Что такое дизайн-артефакты

**Дизайн-артефакты (Design Artifacts)** — это визуальные и текстовые документы, которые передают требования к интерфейсу от дизайнера к разработчику.

### Иерархия артефактов (от низкого к высокому уровню детализации)

```
Wireframes (Lo-Fi)      → Базовая структура, расположение блоков
     ↓
Mockups (Hi-Fi)         → Цвета, шрифты, точные размеры
     ↓
Prototypes              → Интерактивность, анимации, переходы
     ↓
Design System           → Переиспользуемые паттерны и токены
     ↓
Component Library       → Готовые React-компоненты
```

---

## 📐 1. Wireframes (Вайрфреймы) — Lo-Fi

**Wireframe** — схематичный набросок интерфейса без цветов и деталей. Показывает структуру и расположение элементов.

### Пример: Three-Panel Layout для AI Learning Agent

```
┌────────────────────────────────────────────────────────────┐
│ [☰]  AI Learning Agent                           [v2.0]    │  ← Header (48px)
├──────────┬─────────────────────────────┬───────────────────┤
│          │                             │                   │
│  LEFT    │         CENTER              │      RIGHT        │
│ SIDEBAR  │       MAIN CONTENT          │     SIDEBAR       │
│          │                             │                   │
│  280px   │      flex (остальное)       │  600px (resize)   │
│  fixed   │                             │   400-800px       │
│          │                             │                   │
│ ┌──────┐ │ ┌─────────────────────────┐ │ ┌───────────────┐ │
│ │Course│ │ │ # Lesson Title          │ │ │ [Model ▼]     │ │
│ │ Tree │ │ │                         │ │ │               │ │
│ │      │ │ │ Lesson Content...       │ │ │ [Context ⚙️]  │ │
│ │ ├─ 1 │ │ │                         │ │ │               │ │
│ │ ├─ 2 │ │ │ [Code Block]            │ │ │ Messages...   │ │
│ │ └─ 3 │ │ │                         │ │ │               │ │
│ │      │ │ │                         │ │ │               │ │
│ │      │ │ └─────────────────────────┘ │ │ [Textarea]    │ │
│ │      │ │                             │ │ [Send]        │ │
│ └──────┘ │ [◄ Prev]          [Next ►] │ └───────────────┘ │
│          │                             │                   │
│[← Hide]  │                             │                   │
└──────────┴─────────────────────────────┴───────────────────┘
```

### Wireframe: Header Component

```
┌────────────────────────────────────────────────────────────┐
│  [☰]  AI Learning Agent                         [v2.0]     │
│   ↑          ↑                                     ↑        │
│ Toggle    Title                                 Version     │
│ Button   (bold)                                  Badge      │
└────────────────────────────────────────────────────────────┘
```

**Спецификация:**
- Высота: 48px
- Padding: 0 16px
- Border-bottom: 1px
- Toggle button: 40×40px слева
- Title: по центру от toggle
- Badge: справа

### Wireframe: Tree Navigation (Left Sidebar)

```
┌──────────────────────────┐
│ 📁 Course Name       [3] │ ← Level 1: Course
│   📂 1. Module Name  [2] │ ← Level 2: Module
│     📄 1.1 Lesson    [☐]│ ← Level 3: Lesson + Checkbox
│     📄 1.2 Lesson    [✓]│
│   📂 2. Module Name  [1] │
│     📄 2.1 Lesson    [☐]│
│                          │
│ 📁 Another Course    [5] │
│   ...                    │
└──────────────────────────┘
```

**Спецификация:**
- Level 1 (Course): padding-left 16px
- Level 2 (Module): padding-left 32px
- Level 3 (Lesson): padding-left 48px + checkbox 32px слева
- Item height: 36-40px
- Icon size: 14-16px

### Wireframe: AI Chat (Right Sidebar)

```
┌─────────────────────────────────┐
│ 🤖 AI Assistant                 │
│ [Model Selector ▼]              │ ← Dropdown
├─────────────────────────────────┤
│ Context: Current Lesson    [⚙️] │ ← Context selector
├─────────────────────────────────┤
│                                 │
│ ┌────────────────────────────┐  │
│ │ User: What is REST?        │  │ ← User message
│ └────────────────────────────┘  │
│                                 │
│ ┌────────────────────────────┐  │
│ │ Assistant: REST is...      │  │ ← AI message
│ │ [gemini-2.5][1,234 tokens] │  │ ← Badges
│ └────────────────────────────┘  │
│                                 │
├─────────────────────────────────┤
│ [Textarea for input...]         │ ← 3 rows
│ [📊 Stats]            [Send]    │ ← Buttons
└─────────────────────────────────┘
```

### Claude Code Промпт для Wireframe

```
Создай wireframe (вайрфрейм) для AI Learning Agent в формате ASCII:

ЗАДАЧА: Показать базовую структуру three-panel layout

ТРЕБОВАНИЯ:
- Header: 48px высота, toggle кнопка слева, title по центру, badge справа
- Left Sidebar: 280px, course tree с 3 уровнями (Course → Module → Lesson)
- Center Panel: flex, lesson viewer + prev/next навигация
- Right Sidebar: 600px (resizable), AI chat интерфейс

ВЫХОД:
ASCII диаграмма размером ~60-80 символов ширина, показывающая:
- Расположение всех панелей
- Размеры (px или "flex")
- Основные элементы (кнопки, списки, inputs)
- БЕЗ цветов, БЕЗ детальных стилей (это Lo-Fi)
```

---

## 🎨 2. Mockups (Мокапы) — Hi-Fi

**Mockup** — детальная визуализация интерфейса с цветами, шрифтами, точными размерами и spacing.

### Mockup: Header Component

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  [☰]  AI Learning Agent                            v2.0      │
│   ↑          ↑                                       ↑        │
│ #111827    #111827                                 #6b7280   │
│ 20px       16px bold                                12px     │
│ 40×40px    600 weight                             #f9fafb bg │
└─────────────────────────────────────────────────────────────┘
  ↑
#ffffff background
1px solid #e5e7eb border-bottom
padding: 0 16px
height: 48px
```

**Детальная спецификация:**

| Элемент | Свойство | Значение |
|---------|----------|----------|
| Header Container | Height | 48px |
| | Background | #ffffff |
| | Border-bottom | 1px solid #e5e7eb |
| | Padding | 0 16px |
| Toggle Button | Size | 40×40px |
| | Font-size | 20px |
| | Color | #111827 |
| | Border-radius | 4px |
| | Hover bg | #f3f4f6 |
| | Active bg | #e5e7eb |
| Title | Font-size | 16px |
| | Font-weight | 600 |
| | Color | #111827 |
| | Margin-left | 12px (от toggle) |
| Version Badge | Font-size | 12px |
| | Font-weight | 500 |
| | Color | #6b7280 |
| | Background | #f9fafb |
| | Padding | 4px 8px |
| | Border-radius | 4px |

### Mockup: Button Component (все варианты)

#### Primary Button

```
┌────────────────┐
│     Send       │ ← 14px, 500 weight, #1f2937 color
└────────────────┘
     ↑
Background: #9ca3af
Padding: 8px 16px
Border-radius: 6px
Border: 1px solid #e5e7eb

Hover: background #f3f4f6
Disabled: opacity 0.5
```

**Спецификация Primary Button:**
```css
.btn-primary {
  padding: 8px 16px;
  background-color: #9ca3af;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: #f3f4f6;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### Secondary Button

```
┌────────────────┐
│    Cancel      │ ← 14px, 500 weight, #111827 color
└────────────────┘
     ↑
Background: #ffffff
Padding: 10px 20px
Border-radius: 8px
Border: 1px solid #e5e7eb

Hover: background #f3f4f6, border #6b7280
```

**Спецификация Secondary Button:**
```css
.btn-secondary {
  padding: 10px 20px;
  background-color: #ffffff;
  color: #111827;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.1s ease;
}

.btn-secondary:hover {
  background-color: #f3f4f6;
  border-color: #6b7280;
}
```

#### Accent Button (Apply Context)

```
┌────────────────────┐
│  Apply Context     │ ← 14px, 500 weight, #ffffff color
└────────────────────┘
        ↑
Background: #6366f1 (indigo)
Padding: 10px 20px
Border-radius: 8px
Border: none

Hover: background #5558e3
```

**Спецификация Accent Button:**
```css
.btn-accent {
  padding: 10px 20px;
  background-color: #6366f1;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.btn-accent:hover {
  background-color: #5558e3;
}
```

### Mockup: Tree Navigation Item (Lesson Level)

```
┌──────────────────────────────────────────────────────┐
│ [☐]  📄  Lesson 1.1: Introduction to REST APIs      │
│  ↑    ↑        ↑                                     │
│ 14px 13px    13px, 400 weight, #111827              │
│#6b7280 #111827                                       │
└──────────────────────────────────────────────────────┘
     ↑
Padding: 8px 16px 8px 8px
Margin-left: 48px (для checkbox)
Border-left: 3px solid transparent
Background: transparent

Active State:
- Background: #e5e7eb
- Border-left: 3px solid #6366f1
- Font-weight: 500

Hover State:
- Background: #f3f4f6

Completed State:
- Text opacity: 0.6
- Text-decoration: line-through
- Checkbox color: #10b981 (green)
```

**Детальная спецификация Lesson Item:**

| Элемент | Состояние | Значение |
|---------|-----------|----------|
| Container | Default | bg: transparent, border-left: 3px transparent |
| | Hover | bg: #f3f4f6 |
| | Active | bg: #e5e7eb, border-left: 3px solid #6366f1 |
| | Completed | text opacity: 0.6, line-through |
| Checkbox | Size | 14px |
| | Color (unchecked) | #6b7280 |
| | Color (checked) | #10b981 |
| | Margin-left | 48px |
| Lesson Icon | Font-size | 13px |
| | Color | #111827 |
| | Opacity | 0.7 |
| Lesson Title | Font-size | 13px |
| | Font-weight | 400 (active: 500) |
| | Color | #111827 |
| Padding | | 8px 16px 8px 8px |
| Transition | | all 0.1s ease |

### Mockup: Message Bubble (User & Assistant)

#### User Message

```
┌─────────────────────────────────────────┐
│  What is REST API?                      │ ← 14px, #1f2937
└─────────────────────────────────────────┘
          ↑
Background: #f3f4f6
Padding: 12px 16px
Border-radius: 8px
Border: 1px solid #e5e7eb
Margin-left: 20% (align right)
Line-height: 1.6
```

#### Assistant Message

```
┌─────────────────────────────────────────┐
│  REST API is an architectural style...  │ ← 14px, #1f2937
│                                         │
│  [gemini-2.5-flash] [1,234 tokens]     │ ← 11px badges
└─────────────────────────────────────────┘
          ↑
Background: #f9fafb
Padding: 12px 16px
Border-radius: 8px
Border: 1px solid #e5e7eb
Margin-right: 20% (align left)
Line-height: 1.6
```

**Спецификация Message:**

| Элемент | User | Assistant |
|---------|------|-----------|
| Background | #f3f4f6 | #f9fafb |
| Border | 1px solid #e5e7eb | 1px solid #e5e7eb |
| Padding | 12px 16px | 12px 16px |
| Border-radius | 8px | 8px |
| Font-size | 14px | 14px |
| Line-height | 1.6 | 1.6 |
| Color | #1f2937 | #1f2937 |
| Alignment | margin-left: 20% | margin-right: 20% |
| Badge bg | - | #f9fafb |
| Badge border | - | 1px solid #e5e7eb |
| Badge padding | - | 2px 6px |
| Badge font-size | - | 11px |
| Badge color | - | #6b7280 |

### Claude Code Промпт для Mockup

```
Создай Hi-Fi mockup (мокап) для Header компонента AI Learning Agent:

LAYOUT:
- Container: 48px height, #ffffff background
- Border-bottom: 1px solid #e5e7eb
- Padding: 0 16px
- Display: flex, align-items center, justify-content space-between

ЭЛЕМЕНТЫ:

1. Toggle Button (слева):
   - Size: 40×40px
   - Icon: ☰ (20px, #111827)
   - Background: transparent
   - Border-radius: 4px
   - Hover: background #f3f4f6
   - Active: background #e5e7eb
   - Transition: 0.1s ease

2. Title (центр):
   - Text: "AI Learning Agent"
   - Font-size: 16px
   - Font-weight: 600
   - Color: #111827
   - Margin-left: 12px от toggle

3. Version Badge (справа):
   - Text: "v2.0"
   - Font-size: 12px
   - Font-weight: 500
   - Color: #6b7280
   - Background: #f9fafb
   - Padding: 4px 8px
   - Border-radius: 4px

РЕАЛИЗАЦИЯ: React + CSS (используй CSS variables из index.css)
```

---

## 🎬 3. Prototypes (Прототипы) — Интерактивность

**Prototype** — кликабельный макет, демонстрирующий поведение интерфейса, переходы между экранами, анимации.

### Prototype: Context Selector Modal — User Flow

```
[SCREEN 1] Right Sidebar (Closed State)
┌─────────────────────────────────┐
│ Context: Current Lesson    [⚙️] │ ← Click на ⚙️
└─────────────────────────────────┘
              ↓ (click)
              ↓ (fade in overlay 0.2s, scale modal 0.15s)

[SCREEN 2] Modal Opened
┌─────────────────────────────────────────────────────────┐
│                  [Overlay rgba(0,0,0,0.4)]              │
│         ┌────────────────────────────────┐              │
│         │ Configure Context         [×] │ ← Header     │
│         ├────────────────────────────────┤              │
│         │ Quick Modes:               │                  │
│         │ ◉ Current Lesson           │ ← Radio (checked)│
│         │ ○ Current Module           │                  │
│         │ ○ All Lessons              │                  │
│         │ ○ Custom Selection         │                  │
│         │                            │                  │
│         │ Estimated: 2,500 tokens    │ ← Estimate       │
│         │ Cost: $0.02 in / $0.08 out │                  │
│         ├────────────────────────────────┤              │
│         │ [Cancel]  [Apply Context]  │ ← Footer        │
│         └────────────────────────────────┘              │
└─────────────────────────────────────────────────────────┘
              ↓ (click "Custom Selection")
              ↓ (expand tree with slide-down 0.2s)

[SCREEN 3] Custom Selection Mode
┌────────────────────────────────┐
│ ◉ Custom Selection             │ ← Now checked
│                                │
│ [LessonTree with checkboxes]   │ ← Appears
│ ☐ 📁 Course 1                  │
│   ☐ 📂 Module 1.1              │
│     ☑ 📄 Lesson 1.1.1          │ ← User checks
│     ☐ 📄 Lesson 1.1.2          │
│                                │
│ Estimated: 4,200 tokens        │ ← Updates live
│ Cost: $0.03 in / $0.13 out     │
└────────────────────────────────┘
              ↓ (click "Apply Context")
              ↓ (fade out modal 0.15s)

[SCREEN 4] Right Sidebar (Updated State)
┌─────────────────────────────────┐
│ Context: 1 lesson          [⚙️] │ ← Updated text
└─────────────────────────────────┘
```

### Prototype: Tree Navigation — Expand/Collapse

```
[STATE 1] Course Collapsed
┌──────────────────────────┐
│ 📁► AI Web Learning  [5] │ ← Click here
└──────────────────────────┘
         ↓ (click)
         ↓ (rotate arrow 90° in 0.2s, slide-down modules 0.2s)

[STATE 2] Course Expanded
┌──────────────────────────┐
│ 📁▼ AI Web Learning  [5] │ ← Arrow rotated
│   📂► 1. Basics      [2] │ ← Modules visible
│   📂► 2. Backend     [3] │
└──────────────────────────┘
         ↓ (click "1. Basics")
         ↓ (rotate arrow, slide-down lessons)

[STATE 3] Module Expanded
┌──────────────────────────┐
│ 📁▼ AI Web Learning  [5] │
│   📂▼ 1. Basics      [2] │ ← Arrow rotated
│     📄 1.1 Client... [☐]│ ← Lessons visible
│     📄 1.2 HTTP...   [☐]│
│   📂► 2. Backend     [3] │
└──────────────────────────┘
         ↓ (click "1.1 Client...")
         ↓ (highlight active, load lesson in Center Panel)

[STATE 4] Lesson Active
┌──────────────────────────┐
│ 📁▼ AI Web Learning  [5] │
│   📂▼ 1. Basics      [2] │
│ ┃   📄 1.1 Client... [☐]│ ← Active (left border #6366f1)
│     📄 1.2 HTTP...   [☐]│   bg: #e5e7eb, font-weight: 500
│   📂► 2. Backend     [3] │
└──────────────────────────┘
```

### Prototype: Loading States

```
[STATE 1] User sends message
┌─────────────────────────────────┐
│ [Textarea with text]            │
│ [Send] button clicked           │ ← Click
└─────────────────────────────────┘
         ↓ (0.1s)

[STATE 2] Loading indicator appears
┌─────────────────────────────────┐
│ User: What is REST?             │
│                                 │
│ ...                             │ ← Loading dots (animate)
└─────────────────────────────────┘
         ↓ (2-5 seconds, API response)

[STATE 3] Response appears
┌─────────────────────────────────┐
│ User: What is REST?             │
│                                 │
│ Assistant: REST is...           │ ← Fade in (0.2s)
│ [gemini-2.5][1,234 tokens]     │
└─────────────────────────────────┘
```

**Анимация Loading Dots:**
```css
@keyframes loading-dot {
  0%, 80%, 100% { opacity: 0.3; }
  40% { opacity: 1; }
}

.loading-dots span:nth-child(1) { animation-delay: 0s; }
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
```

### Prototype: Resize Right Sidebar

```
[INTERACTION] User drags resize handle
┌─────────┬───────────────┬║├─────────┐
│  LEFT   │    CENTER     │║│  RIGHT  │ ← ║ = resize handle
│ SIDEBAR │  MAIN CONTENT │║│ SIDEBAR │   (cursor: col-resize)
│  280px  │     flex      │║│  600px  │
└─────────┴───────────────┴║├─────────┘
                           ↑
                    User drags left/right
                           ↓
                    Width changes 400-800px
                    Center panel adjusts (flex)
```

**Спецификация Resize Handle:**
```css
.resize-handle {
  width: 4px;
  cursor: col-resize;
  background: transparent;
  transition: background 0.2s ease;
  position: relative;
}

.resize-handle:hover {
  background: #6366f1;
}

/* Resize logic (JavaScript) */
const MIN_WIDTH = 400;
const MAX_WIDTH = 800;

onMouseMove = (e) => {
  const newWidth = windowWidth - e.clientX;
  const clampedWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
  rightSidebar.style.width = `${clampedWidth}px`;
};
```

### Claude Code Промпт для Prototype

```
Создай интерактивный prototype для Context Selector Modal в AI Learning Agent:

USER FLOW:
1. User clicks [⚙️] button в Right Sidebar
   → Modal opens (fade in overlay 0.2s, scale modal from 0.95 to 1 in 0.15s)

2. User sees Quick Modes (radio buttons):
   - Current Lesson (по умолчанию checked)
   - Current Module
   - All Lessons
   - Custom Selection

3. User clicks "Custom Selection" radio
   → LessonTree with checkboxes appears (slide-down animation 0.2s)

4. User checks/unchecks lessons
   → ContextEstimate updates live (tokens, cost recalculated)

5. User clicks "Apply Context"
   → Modal closes (fade out 0.15s)
   → Context summary updates в Right Sidebar ("Context: 3 lessons")

АНИМАЦИИ:
- Modal overlay: fade in/out (opacity 0 → 1, duration 0.2s)
- Modal content: scale + fade (transform scale(0.95) → scale(1), duration 0.15s)
- Tree expand: slide-down (height 0 → auto, duration 0.2s)
- Estimate update: number transition (counter animation for tokens/cost)

ИНТЕРАКТИВНОСТЬ:
- Click overlay → close modal
- Click × button → close modal
- ESC key → close modal
- Click radio → update mode, show/hide tree
- Check lesson → recalculate estimate
- Click Cancel → close without saving
- Click Apply → save and close

РЕАЛИЗАЦИЯ: React + CSS transitions + useState для состояния
```

---

## 🎨 4. Design System — Система дизайна

**Design System** — набор переиспользуемых дизайн-токенов, компонентов и паттернов. Обеспечивает консистентность UI.

### 4.1. Color Palette (Цветовая палитра)

#### Primary Colors (Основные цвета)

```
INDIGO (Primary Accent)
#6366f1 ███████  var(--primary-color)      [Buttons, active states, accents]
#5558e3 ███████  var(--primary-hover)      [Hover state for primary]

PURPLE (Secondary Accent)
#7c3aed ███████  var(--secondary-color)    [Alternative accent, rarely used]
```

#### Neutral Colors (Нейтральные цвета)

```
GRAYSCALE (Текст, фоны, границы)
#ffffff ███████  var(--surface)            [White backgrounds]
#f9fafb ███████  var(--left-bg)            [Left sidebar bg, light surfaces]
#f3f4f6 ███████  var(--left-hover)         [Hover states, input bg]
#e5e7eb ███████  var(--left-selected)      [Selected items, borders]
#d1d5db ███████  (scrollbar thumb)         [Borders, dividers]
#9ca3af ███████  var(--right-accent)       [Send button, neutral accent]
#6b7280 ███████  var(--text-secondary)     [Secondary text, muted text]
#374151 ███████  var(--center-secondary)   [Tertiary text]
#1f2937 ███████  var(--right-text)         [Primary text (dark)]
#111827 ███████  var(--text-primary)       [Primary text (darkest)]
```

#### Semantic Colors (Семантические цвета)

```
SUCCESS (Успех)
#10b981 ███████  var(--success)            [Completed checkmarks, success states]

ERROR (Ошибка)
#ef4444 ███████  var(--error)              [Error messages, destructive actions]

WARNING (Предупреждение)
#f59e0b ███████  var(--warning)            [Warnings, alerts]
```

#### Right Sidebar Specific (Для AI чата)

```
RIGHT SIDEBAR THEME (Light, похож на Cline/Claude interface)
#ffffff ███████  var(--right-bg)           [Main background]
#f9fafb ███████  var(--right-surface)      [Surface, assistant messages]
#f3f4f6 ███████  var(--right-user-msg)     [User message background]
#e5e7eb ███████  var(--right-border)       [Borders]
#1f2937 ███████  var(--right-text)         [Text color]
#6b7280 ███████  var(--right-text-secondary) [Secondary text]
#9ca3af ███████  var(--right-accent)       [Accent (Send button)]
```

### 4.2. Typography (Типографика)

#### Font Families

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
             'Helvetica Neue', sans-serif;

--font-mono: 'Courier New', Courier, monospace;
```

#### Typography Scale

| Элемент | Size | Weight | Line-height | Применение |
|---------|------|--------|-------------|------------|
| **H1** | 24px | 700 | 1.3 | Page titles |
| **H2** | 20px | 600 | 1.4 | Section headers |
| **H3** | 18px | 600 | 1.4 | Subsection headers, modal titles |
| **H4** | 16px | 600 | 1.5 | Component titles (Header, LeftSidebar) |
| **H5** | 14px | 600 | 1.5 | Small headers |
| **H6** | 13px | 600 | 1.5 | Tiny headers |
| **Body** | 14px | 400 | 1.6 | Default text (messages, paragraphs) |
| **Small** | 13px | 400 | 1.5 | Secondary info (tree items, nav) |
| **Tiny** | 12px | 400-500 | 1.4 | Badges, metadata, version |
| **Micro** | 11px | 400-500 | 1.3 | Token count, model badge |
| **Icon** | 20px | - | - | Large icons (Header toggle) |
| **Icon-md** | 16px | - | - | Medium icons (Course icon) |
| **Icon-sm** | 14px | - | - | Small icons (Module icon) |
| **Icon-xs** | 13px | - | - | Tiny icons (Lesson icon) |

#### Примеры использования Typography

```css
/* Header Title */
.header-title {
  font-size: 16px;      /* H4 */
  font-weight: 600;
  line-height: 1.5;
  color: var(--text-primary); /* #111827 */
}

/* Left Sidebar Title */
.left-sidebar-title {
  font-size: 18px;      /* H3 */
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

/* Course Header */
.course-header {
  font-size: 14px;      /* H5 */
  font-weight: 600;
  line-height: 1.5;
  color: var(--text-primary);
}

/* Module Header */
.module-header {
  font-size: 13px;      /* Small */
  font-weight: 500;
  line-height: 1.5;
  color: var(--text-primary);
}

/* Lesson Item */
.lesson-item {
  font-size: 13px;      /* Small */
  font-weight: 400;     /* 500 when active */
  line-height: 1.5;
  color: var(--text-primary);
}

/* Message Content */
.message-content {
  font-size: 14px;      /* Body */
  font-weight: 400;
  line-height: 1.6;
  color: var(--right-text); /* #1f2937 */
}

/* Badge (Model, Tokens) */
.badge {
  font-size: 11px;      /* Micro */
  font-weight: 500;
  line-height: 1.3;
  color: var(--right-text-secondary); /* #6b7280 */
}

/* Version Badge */
.version-badge {
  font-size: 12px;      /* Tiny */
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-secondary); /* #6b7280 */
}
```

### 4.3. Spacing Scale (Шкала отступов)

```
--spacing-0:   0px
--spacing-1:   4px    [Tiny gaps, icon spacing]
--spacing-2:   8px    [Small gaps, button internal spacing]
--spacing-3:   12px   [Medium gaps, header elements gap]
--spacing-4:   16px   [Default padding (header, sidebar, messages)]
--spacing-5:   20px   [Large padding (modal header)]
--spacing-6:   24px   [Extra large padding (modal body)]
--spacing-8:   32px   [Module indent (left sidebar)]
--spacing-10:  40px   [Button size (toggle button)]
--spacing-12:  48px   [Lesson indent, header height]
```

#### Применение Spacing

| Компонент | Padding | Margin | Gap |
|-----------|---------|--------|-----|
| **Header** | 0 16px | - | 12px (между элементами) |
| **Left Sidebar Header** | 20px 16px 16px | - | - |
| **Left Sidebar Content** | 8px 0 | - | - |
| **Course Item** | 10px 16px | - | 8px (gap) |
| **Module Item** | 8px 16px 8px 32px | - | 8px |
| **Lesson Item** | 8px 16px 8px 48px | - | 8px |
| **Right Sidebar Header** | 16px | - | 12px |
| **Message** | 12px 16px | 16px (gap) | - |
| **Input Container** | 16px | - | 8px (buttons) |
| **Modal Header** | 20px 24px | - | - |
| **Modal Body** | 24px | - | 24px (sections) |
| **Modal Footer** | 20px 24px | - | 12px (buttons) |
| **Button** | 8-10px 16-20px | - | - |

### 4.4. Border Radius (Скругление углов)

```
--radius-sm:  4px     [Badges, small buttons, inline elements]
--radius-md:  6px     [Buttons, inputs, tree items]
--radius-lg:  8px     [Messages, cards, modal sections]
--radius-xl:  12px    [Modals]
```

#### Применение Border Radius

| Элемент | Border Radius |
|---------|---------------|
| Toggle Button | 4px |
| Version Badge | 4px |
| Hide Sidebar Button | 6px |
| Lesson Navigation Button | 6px |
| Model Selector | 6px |
| Configure Context Button | 6px |
| Message Input | 6px |
| Send Button | 6px |
| Message Bubble | 8px |
| Code Block | 8px |
| Modal Content | 12px |

### 4.5. Shadows (Тени)

```css
/* Small shadow (default, для buttons/cards) */
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
          0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Large shadow (для modals) */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
             0 4px 6px -4px rgb(0 0 0 / 0.1);
```

#### Применение Shadows

| Элемент | Shadow |
|---------|--------|
| Buttons (hover) | var(--shadow) [опционально] |
| Modal Content | var(--shadow-lg) |
| Dropdown (active) | var(--shadow) [опционально] |

### 4.6. Transitions (Переходы)

```css
--transition-fast:   0.1s ease   [Buttons, hover states]
--transition-normal: 0.2s ease   [Modals, dropdowns, expand/collapse]
--transition-slow:   0.3s ease   [Progress bars, complex animations]
```

#### Применение Transitions

| Компонент | Transition | Duration |
|-----------|------------|----------|
| Button hover | background-color | 0.1s ease |
| Tree item hover | background-color | 0.1s ease |
| Modal overlay | opacity | 0.2s ease |
| Modal content | transform, opacity | 0.15s ease |
| Tree expand | height, opacity | 0.2s ease |
| Progress bar | width | 0.3s ease |
| Resize handle | background | 0.2s ease |

### 4.7. Scrollbar Styling

```css
/* Webkit browsers (Chrome, Safari, Edge) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Left Sidebar (narrower scrollbar) */
.left-sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.left-sidebar-content::-webkit-scrollbar-thumb {
  background: var(--border); /* #e5e7eb */
  border-radius: 3px;
}

.left-sidebar-content::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary); /* #6b7280 */
}
```

### Claude Code Промпт для Design System

```
Создай Design System файл (design-system.css) для AI Learning Agent:

ЗАДАЧА: Определить все дизайн-токены (CSS variables) в :root

ЦВЕТОВАЯ ПАЛИТРА:
/* Primary */
--primary-color: #6366f1;
--primary-hover: #5558e3;
--secondary-color: #7c3aed;

/* Left Sidebar */
--left-bg: #f9fafb;
--left-hover: #f3f4f6;
--left-selected: #e5e7eb;
--left-border: 3px solid #6366f1;

/* Center Panel */
--center-bg: #ffffff;
--center-text: #1f2937;
--center-heading: #111827;
--center-secondary: #374151;

/* Right Sidebar */
--right-bg: #ffffff;
--right-surface: #f9fafb;
--right-user-msg: #f3f4f6;
--right-text: #1f2937;
--right-text-secondary: #6b7280;
--right-border: #e5e7eb;
--right-accent: #9ca3af;
--right-hover: #f3f4f6;

/* Common */
--background: #f9fafb;
--surface: #ffffff;
--border: #e5e7eb;
--text-primary: #111827;
--text-secondary: #6b7280;
--error: #ef4444;
--success: #10b981;
--warning: #f59e0b;

ТИПОГРАФИКА:
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...;
--font-mono: 'Courier New', Courier, monospace;

SPACING:
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;

BORDER RADIUS:
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;

SHADOWS:
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

TRANSITIONS:
--transition-fast: 0.1s ease;
--transition-normal: 0.2s ease;
--transition-slow: 0.3s ease;

ПРИМЕНЕНИЕ:
После определения токенов используй их во всех компонентах через var().
Пример: background-color: var(--primary-color);
```

---

## 📦 5. Component Library (Библиотека компонентов)

### 5.1. Button Component (Кнопка)

#### Спецификация всех вариантов

```jsx
// /frontend/src/components/common/Button.jsx

/**
 * Button Component
 *
 * Variants:
 * - primary: Main action (Send, Apply)
 * - secondary: Cancel, alternative actions
 * - accent: Important actions (Apply Context)
 * - icon: Icon-only buttons (Toggle, Close)
 */

<Button variant="primary" size="md" disabled={false} onClick={handleClick}>
  Send
</Button>
```

#### CSS Спецификация

```css
/* Base Button */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
  font-family: inherit;
}

/* Primary Button (Send) */
.btn-primary {
  background-color: var(--right-accent); /* #9ca3af */
  color: var(--right-text);
  border: 1px solid var(--right-border);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--right-hover); /* #f3f4f6 */
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Secondary Button (Cancel) */
.btn-secondary {
  background-color: var(--surface); /* #ffffff */
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 10px 20px;
  border-radius: 8px;
}

.btn-secondary:hover {
  background-color: var(--left-hover); /* #f3f4f6 */
  border-color: var(--text-secondary);
}

/* Accent Button (Apply Context) */
.btn-accent {
  background-color: var(--primary-color); /* #6366f1 */
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
}

.btn-accent:hover {
  background-color: var(--primary-hover); /* #5558e3 */
}

/* Icon Button (Toggle, Close) */
.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text-primary);
}

.btn-icon:hover {
  background-color: var(--left-hover);
}

.btn-icon:active {
  background-color: var(--left-selected);
}
```

#### Реальные примеры в проекте

| Button | Файл | Variant | Specs |
|--------|------|---------|-------|
| Send | `ClaudeAISidebar.jsx` | Primary | 8px 16px, #9ca3af, 14px |
| Cancel | `ContextSelectorModal.jsx` | Secondary | 10px 20px, #ffffff, 14px |
| Apply Context | `ContextSelectorModal.jsx` | Accent | 10px 20px, #6366f1, 14px |
| Toggle (☰) | `Header.jsx` | Icon | 40×40px, 20px icon |
| Close (×) | `ContextSelectorModal.jsx` | Icon | 32×32px, 24px icon |
| Configure (⚙️) | `ClaudeAISidebar.jsx` | Icon | 6px 12px, 16px icon |

### 5.2. Input Component (Поле ввода)

#### Textarea (Message Input)

```css
/* /frontend/src/components/rightSidebar/ClaudeAISidebar.css */

.message-input {
  width: 100%;
  padding: 12px;
  background-color: var(--right-bg); /* #ffffff */
  border: 1px solid var(--right-border); /* #e5e7eb */
  border-radius: 6px;
  color: var(--right-text); /* #1f2937 */
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 60px;
  line-height: 1.5;
  transition: border-color 0.2s ease;
}

.message-input:focus {
  outline: none;
  border-color: var(--right-accent); /* #9ca3af */
}

.message-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.message-input::placeholder {
  color: #666;
}
```

#### Select (Model Selector)

```css
/* /frontend/src/components/rightSidebar/ClaudeAISidebar.css */

.model-selector {
  width: 100%;
  padding: 8px 12px;
  background-color: var(--right-surface); /* #f9fafb */
  border: 1px solid var(--right-border); /* #e5e7eb */
  border-radius: 6px;
  color: var(--right-text); /* #1f2937 */
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.model-selector:hover {
  border-color: var(--right-accent); /* #9ca3af */
}

.model-selector:focus {
  outline: none;
  border-color: var(--right-accent);
}

.model-selector:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### 5.3. Tree Navigation Component (Древовидная навигация)

```css
/* /frontend/src/components/leftSidebar/CourseTree.css */

/* Course Level (Level 1) */
.course-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: transparent;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  text-align: left;
}

.course-header:hover {
  background-color: var(--left-hover); /* #f3f4f6 */
}

.course-header.expanded {
  background-color: var(--left-selected); /* #e5e7eb */
}

/* Module Level (Level 2) */
.module-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 8px 32px; /* Indent 32px */
  background-color: transparent;
  border: none;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  text-align: left;
}

.module-header:hover {
  background-color: var(--left-hover);
}

.module-header.expanded {
  background-color: var(--left-selected);
}

/* Lesson Level (Level 3) */
.lesson-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 8px 8px;
  margin-left: 48px; /* Indent 48px + 32px checkbox */
  background-color: transparent;
  border: none;
  border-left: 3px solid transparent;
  font-size: 13px;
  font-weight: 400;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.lesson-item:hover {
  background-color: var(--left-hover);
}

.lesson-item.active {
  background-color: var(--left-selected);
  border-left-color: var(--primary-color); /* #6366f1 */
  font-weight: 500;
}

/* Expand/Collapse Animation */
.course-modules,
.module-lessons {
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 5.4. Modal Component (Модальное окно)

```css
/* /frontend/src/components/context/ContextSelectorModal.css */

/* Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

/* Modal Content */
.modal-content {
  background: var(--surface); /* #ffffff */
  border-radius: 12px;
  border: 1px solid var(--border); /* #e5e7eb */
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
}

/* Modal Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.modal-close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all var(--transition-fast);
}

.modal-close-btn:hover {
  background: var(--left-hover); /* #f3f4f6 */
  color: var(--text-primary);
}

/* Modal Body */
.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid var(--border);
}
```

### 5.5. Badge Component (Бейдж)

```css
/* Version Badge (Header) */
.version-badge {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary); /* #6b7280 */
  background-color: var(--left-bg); /* #f9fafb */
  padding: 4px 8px;
  border-radius: 4px;
}

/* Model Badge (Message metadata) */
.model-badge {
  padding: 2px 6px;
  background-color: var(--right-surface); /* #f9fafb */
  border: 1px solid var(--right-border); /* #e5e7eb */
  border-radius: 4px;
  color: var(--right-text-secondary); /* #6b7280 */
  font-size: 11px;
  font-weight: 500;
}

/* Tokens Badge (Message metadata) */
.tokens-badge {
  padding: 2px 6px;
  background-color: var(--right-surface);
  border: 1px solid var(--right-border);
  border-radius: 4px;
  color: var(--right-text-secondary);
  font-size: 11px;
  font-weight: 500;
}
```

### Claude Code Промпт для Component Library

```
Создай переиспользуемый Button компонент для AI Learning Agent:

ФАЙЛ: /frontend/src/components/common/Button.jsx

VARIANTS:
1. Primary (Send button):
   - Background: #9ca3af
   - Color: #1f2937
   - Border: 1px solid #e5e7eb
   - Padding: 8px 16px
   - Border-radius: 6px
   - Font: 14px, 500 weight
   - Hover: background #f3f4f6
   - Disabled: opacity 0.5

2. Secondary (Cancel button):
   - Background: #ffffff
   - Color: #111827
   - Border: 1px solid #e5e7eb
   - Padding: 10px 20px
   - Border-radius: 8px
   - Font: 14px, 500 weight
   - Hover: background #f3f4f6, border #6b7280

3. Accent (Apply Context button):
   - Background: #6366f1
   - Color: #ffffff
   - Border: none
   - Padding: 10px 20px
   - Border-radius: 8px
   - Font: 14px, 500 weight
   - Hover: background #5558e3

4. Icon (Toggle, Close buttons):
   - Size: 40×40px (or 32×32px для close)
   - Background: transparent
   - Border: none
   - Border-radius: 4px (or 6px)
   - Font-size: 20px (icon)
   - Hover: background #f3f4f6
   - Active: background #e5e7eb

PROPS:
- variant: 'primary' | 'secondary' | 'accent' | 'icon'
- size: 'sm' | 'md' | 'lg' (опционально)
- disabled: boolean
- onClick: function
- children: ReactNode

ИСПОЛЬЗОВАНИЕ CSS VARIABLES:
Используй var(--right-accent), var(--primary-color), var(--text-primary) и т.д.

TRANSITIONS:
Все состояния (hover, active, disabled) с transition: all var(--transition-fast)
```

---

## 🎨 6. Figma Handoff — Передача из Figma в код

**Figma Handoff** — процесс передачи дизайна от дизайнера к разработчику через Figma Inspect Panel.

### 6.1. Figma Specs для Header Component

```
┌─────────────────────────────────────────────────────────┐
│ FIGMA INSPECT: Header                                   │
├─────────────────────────────────────────────────────────┤
│ Frame: Header                                           │
│ Size: 1920 × 48px                                       │
│ Fill: #FFFFFF                                           │
│ Border: Bottom (1px, #E5E7EB)                           │
│ Auto Layout: Horizontal                                 │
│   - Spacing: 12px                                       │
│   - Padding: 0px 16px                                   │
│   - Align: Space between                                │
├─────────────────────────────────────────────────────────┤
│ [Toggle Button]                                         │
│   Type: Icon Button                                     │
│   Size: 40 × 40px                                       │
│   Fill: Transparent                                     │
│   Border-radius: 4px                                    │
│   Icon: ☰ (20px, #111827)                               │
│   Hover: Fill #F3F4F6                                   │
│                                                         │
│ [Title]                                                 │
│   Type: Text                                            │
│   Content: "AI Learning Agent"                          │
│   Font: SF Pro / 16px / Semibold (600)                  │
│   Fill: #111827                                         │
│   Margin-left: 12px                                     │
│                                                         │
│ [Version Badge]                                         │
│   Type: Frame                                           │
│   Size: Auto × 24px                                     │
│   Fill: #F9FAFB                                         │
│   Border-radius: 4px                                    │
│   Padding: 4px 8px                                      │
│   Text: "v2.0" (12px, 500, #6B7280)                     │
└─────────────────────────────────────────────────────────┘

EXPORT:
- SVG для иконок (☰)
- CSS variables для цветов
- Измерения в px
```

### 6.2. Figma Specs для Button Component (все варианты)

```
┌─────────────────────────────────────────────────────────┐
│ FIGMA INSPECT: Button / Primary (Send)                  │
├─────────────────────────────────────────────────────────┤
│ Frame: Button Primary                                   │
│ Size: Auto × Auto (min-width: 80px)                     │
│ Fill: #9CA3AF                                           │
│ Border: 1px solid #E5E7EB                               │
│ Border-radius: 6px                                      │
│ Padding: 8px 16px                                       │
│ Text: "Send"                                            │
│   - Font: SF Pro / 14px / Medium (500)                  │
│   - Fill: #1F2937                                       │
│   - Align: Center                                       │
│ Hover State:                                            │
│   - Fill: #F3F4F6                                       │
│ Disabled State:                                         │
│   - Opacity: 50%                                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ FIGMA INSPECT: Button / Secondary (Cancel)              │
├─────────────────────────────────────────────────────────┤
│ Frame: Button Secondary                                 │
│ Size: Auto × Auto                                       │
│ Fill: #FFFFFF                                           │
│ Border: 1px solid #E5E7EB                               │
│ Border-radius: 8px                                      │
│ Padding: 10px 20px                                      │
│ Text: "Cancel"                                          │
│   - Font: SF Pro / 14px / Medium (500)                  │
│   - Fill: #111827                                       │
│ Hover State:                                            │
│   - Fill: #F3F4F6                                       │
│   - Border: 1px solid #6B7280                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ FIGMA INSPECT: Button / Accent (Apply Context)          │
├─────────────────────────────────────────────────────────┤
│ Frame: Button Accent                                    │
│ Size: Auto × Auto                                       │
│ Fill: #6366F1                                           │
│ Border: None                                            │
│ Border-radius: 8px                                      │
│ Padding: 10px 20px                                      │
│ Text: "Apply Context"                                   │
│   - Font: SF Pro / 14px / Medium (500)                  │
│   - Fill: #FFFFFF                                       │
│ Hover State:                                            │
│   - Fill: #5558E3                                       │
└─────────────────────────────────────────────────────────┘

ASSETS TO EXPORT:
- Button-Primary.svg (для документации)
- Button-Secondary.svg
- Button-Accent.svg
```

### 6.3. Figma Specs для Tree Navigation Item

```
┌─────────────────────────────────────────────────────────┐
│ FIGMA INSPECT: Tree Navigation / Lesson Item (Active)   │
├─────────────────────────────────────────────────────────┤
│ Frame: Lesson Item Wrapper                              │
│ Size: 280 × 36px                                        │
│ Fill: #E5E7EB (Active bg)                               │
│ Border-left: 3px solid #6366F1 (Active border)          │
│ Auto Layout: Horizontal                                 │
│   - Spacing: 8px                                        │
│   - Padding: 8px 16px 8px 8px                           │
│   - Align: Left                                         │
│   - Margin-left: 48px (indent Level 3)                  │
├─────────────────────────────────────────────────────────┤
│ [Checkbox]                                              │
│   Type: Icon                                            │
│   Size: 14 × 14px                                       │
│   Fill: #6B7280 (unchecked) / #10B981 (checked)        │
│   Icon: ☐ / ✓                                           │
│   Margin-left: 32px (before lesson item)                │
│                                                         │
│ [Lesson Icon]                                           │
│   Type: Icon                                            │
│   Size: 13 × 13px                                       │
│   Fill: #111827                                         │
│   Opacity: 70%                                          │
│   Icon: 📄                                              │
│                                                         │
│ [Lesson Title]                                          │
│   Type: Text                                            │
│   Content: "Lesson 1.1: Introduction to REST APIs"     │
│   Font: SF Pro / 13px / Regular (400)                   │
│   Font-weight: 500 (when active)                        │
│   Fill: #111827                                         │
│   Text-overflow: Ellipsis                               │
├─────────────────────────────────────────────────────────┤
│ STATES:                                                 │
│                                                         │
│ Default:                                                │
│   - Fill: Transparent                                   │
│   - Border-left: Transparent                            │
│   - Font-weight: 400                                    │
│                                                         │
│ Hover:                                                  │
│   - Fill: #F3F4F6                                       │
│                                                         │
│ Active:                                                 │
│   - Fill: #E5E7EB                                       │
│   - Border-left: 3px solid #6366F1                      │
│   - Font-weight: 500                                    │
│                                                         │
│ Completed:                                              │
│   - Text opacity: 60%                                   │
│   - Text-decoration: Line-through                       │
│   - Checkbox: #10B981 (green)                           │
└─────────────────────────────────────────────────────────┘

EXPORT:
- Icon-Check-Unchecked.svg
- Icon-Check-Checked.svg
- Icon-Lesson.svg
```

### Claude Code Промпт для Figma Handoff

```
Реализуй Header компонент по спецификациям из Figma:

FIGMA SPECS (из Inspect Panel):

Frame: Header
- Size: 1920 × 48px (width: 100%, height: 48px)
- Fill: #FFFFFF
- Border-bottom: 1px solid #E5E7EB
- Auto Layout: Horizontal, Space between
- Padding: 0px 16px
- Gap: 12px

Toggle Button:
- Size: 40 × 40px
- Fill: Transparent
- Border-radius: 4px
- Icon: ☰ (20px, #111827)
- Hover: Fill #F3F4F6
- Active: Fill #E5E7EB

Title:
- Text: "AI Learning Agent"
- Font: SF Pro Display / 16px / Semibold (600)
- Fill: #111827
- Margin-left: 12px

Version Badge:
- Size: Auto × 24px
- Fill: #F9FAFB
- Border-radius: 4px
- Padding: 4px 8px
- Text: "v2.0" (12px, 500, #6B7280)

РЕАЛИЗАЦИЯ:

1. Создай Header.jsx и Header.css
2. Используй CSS variables:
   - var(--surface) для #FFFFFF
   - var(--border) для #E5E7EB
   - var(--text-primary) для #111827
   - var(--text-secondary) для #6B7280
   - var(--left-hover) для #F3F4F6
   - var(--left-selected) для #E5E7EB
3. Используй flexbox (display: flex, justify-content: space-between)
4. Transitions: all 0.1s ease для hover/active
5. Props:
   - onToggleLeftSidebar: function (для toggle button)
```

---

## 🔄 7. Прогрессивные примеры (от Wireframe к Code)

### Пример: Button Component (Send)

#### Этап 1: Wireframe (Lo-Fi)

```
┌────────────┐
│   Send     │ ← Button, ~80px width, ~40px height
└────────────┘
```

**Требования:**
- Кнопка для отправки сообщения
- Расположение: справа внизу (input area)
- Размер: средний (не маленькая, не огромная)

#### Этап 2: Mockup (Hi-Fi)

```
┌────────────┐
│   Send     │ ← 14px, 500 weight, #1f2937
└────────────┘
     ↑
Background: #9ca3af
Padding: 8px 16px
Border-radius: 6px
Border: 1px solid #e5e7eb

Hover: background #f3f4f6
```

**Детальные спецификации:**
- Background: #9ca3af
- Text: "Send", 14px, 500 weight, #1f2937
- Padding: 8px 16px
- Border-radius: 6px
- Border: 1px solid #e5e7eb
- Hover: background #f3f4f6
- Disabled: opacity 0.5

#### Этап 3: Design System

```css
/* Design Token */
--button-primary-bg: var(--right-accent); /* #9ca3af */
--button-primary-text: var(--right-text); /* #1f2937 */
--button-primary-border: var(--right-border); /* #e5e7eb */
--button-primary-hover-bg: var(--right-hover); /* #f3f4f6 */
--button-padding-md: 8px 16px;
--button-radius-md: 6px;
--button-font-size: 14px;
--button-font-weight: 500;
--transition-fast: 0.1s ease;
```

#### Этап 4: Component Code

```jsx
// /frontend/src/components/common/Button.jsx
import React from 'react';
import './Button.css';

const Button = ({
  variant = 'primary',
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
```

```css
/* /frontend/src/components/common/Button.css */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
  font-family: inherit;
}

.btn-primary {
  background-color: var(--right-accent); /* #9ca3af */
  color: var(--right-text); /* #1f2937 */
  border: 1px solid var(--right-border); /* #e5e7eb */
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--right-hover); /* #f3f4f6 */
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### Этап 5: Использование в проекте

```jsx
// /frontend/src/components/rightSidebar/ClaudeAISidebar.jsx
import Button from '../common/Button';

const ClaudeAISidebar = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    // Send message logic...
  };

  return (
    <div className="input-container">
      <textarea
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a question..."
      />
      <div className="input-actions">
        <Button
          variant="primary"
          onClick={handleSend}
          disabled={!message.trim() || loading}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
```

### Пример: Tree Navigation Item (Lesson)

#### Этап 1: Wireframe

```
┌────────────────────────────────┐
│ [☐] 📄 Lesson Title           │ ← Level 3, indented
└────────────────────────────────┘
```

**Требования:**
- Отображает урок
- Checkbox слева (для completed state)
- Icon (📄) для типа элемента
- Title (текст урока)
- Indent (отступ) для иерархии
- Кликабельно (открывает урок)

#### Этап 2: Mockup

```
┌──────────────────────────────────────────┐
│ [☐]  📄  Lesson 1.1: REST API Intro     │
│  ↑    ↑        ↑                         │
│ 14px 13px    13px, 400 weight, #111827  │
│#6b7280 opacity:0.7                       │
└──────────────────────────────────────────┘
     ↑
Padding: 8px 16px 8px 8px
Margin-left: 48px (Level 3 indent) + 32px (checkbox)
Border-left: 3px solid transparent
Background: transparent

Active:
- Background: #e5e7eb
- Border-left: 3px solid #6366f1
- Font-weight: 500

Hover:
- Background: #f3f4f6
```

#### Этап 3: Design System

```css
/* Design Tokens */
--tree-item-padding: 8px 16px 8px 8px;
--tree-item-gap: 8px;
--tree-item-font-size: 13px;
--tree-item-font-weight: 400;
--tree-item-font-weight-active: 500;
--tree-item-color: var(--text-primary); /* #111827 */
--tree-item-bg-hover: var(--left-hover); /* #f3f4f6 */
--tree-item-bg-active: var(--left-selected); /* #e5e7eb */
--tree-item-border-active: 3px solid var(--primary-color); /* #6366f1 */
--tree-indent-level-1: 16px;  /* Course */
--tree-indent-level-2: 32px;  /* Module */
--tree-indent-level-3: 48px;  /* Lesson */
--checkbox-margin-left: 32px;
```

#### Этап 4: Component Code

```jsx
// /frontend/src/components/leftSidebar/LessonItem.jsx
import React from 'react';
import './LessonItem.css';

const LessonItem = ({
  lesson,
  isActive,
  isCompleted,
  onSelect,
  onToggleComplete
}) => {
  return (
    <div className={`lesson-item-wrapper ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
      <button
        className="lesson-checkbox"
        onClick={(e) => {
          e.stopPropagation();
          onToggleComplete(lesson.id);
        }}
      >
        <span className="checkbox-icon">
          {isCompleted ? '✓' : '☐'}
        </span>
      </button>
      <button
        className={`lesson-item ${isActive ? 'active' : ''}`}
        onClick={() => onSelect(lesson.id)}
      >
        <span className="lesson-icon">📄</span>
        <span className="lesson-title">{lesson.title}</span>
      </button>
    </div>
  );
};

export default LessonItem;
```

```css
/* /frontend/src/components/leftSidebar/LessonItem.css */
.lesson-item-wrapper {
  display: flex;
  align-items: stretch;
  width: 100%;
  transition: all var(--transition-fast);
}

.lesson-item-wrapper.active {
  background-color: var(--left-selected); /* #e5e7eb */
}

.lesson-item-wrapper.active .lesson-item {
  border-left-color: var(--primary-color); /* #6366f1 */
  font-weight: 500;
}

.lesson-checkbox {
  width: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 48px; /* Level 3 indent */
  transition: background-color var(--transition-fast);
}

.lesson-checkbox:hover {
  background-color: var(--left-hover); /* #f3f4f6 */
}

.checkbox-icon {
  font-size: 14px;
  color: var(--text-secondary); /* #6b7280 */
  transition: all var(--transition-fast);
}

.lesson-item-wrapper.completed .checkbox-icon {
  color: #10b981; /* green */
  font-weight: 600;
}

.lesson-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 8px 8px;
  background-color: transparent;
  border: none;
  border-left: 3px solid transparent;
  font-size: 13px;
  font-weight: 400;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.lesson-item:hover {
  background-color: var(--left-hover);
}

.lesson-icon {
  font-size: 13px;
  opacity: 0.7;
  flex-shrink: 0;
}

.lesson-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-item-wrapper.completed .lesson-title {
  opacity: 0.6;
  text-decoration: line-through;
}
```

#### Этап 5: Использование в CourseTree

```jsx
// /frontend/src/components/leftSidebar/CourseTree.jsx
import LessonItem from './LessonItem';

const CourseTree = ({ courses, activeLessonId, completedLessons, onSelectLesson, onToggleComplete }) => {
  return (
    <div className="course-tree">
      {courses.map(course => (
        <div key={course.id} className="course-block">
          {/* Course header ... */}
          {course.expanded && (
            <div className="course-modules">
              {course.modules.map(module => (
                <div key={module.id} className="module-block">
                  {/* Module header ... */}
                  {module.expanded && (
                    <div className="module-lessons">
                      {module.lessons.map(lesson => (
                        <LessonItem
                          key={lesson.id}
                          lesson={lesson}
                          isActive={activeLessonId === lesson.id}
                          isCompleted={completedLessons.includes(lesson.id)}
                          onSelect={onSelectLesson}
                          onToggleComplete={onToggleComplete}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```

---

## 📝 8. Claude Code Промпты для реализации компонентов

### Промпт 1: Создание Header из дизайн-спецификаций

```
Создай Header компонент для AI Learning Agent по следующим спецификациям:

СТРУКТУРА:
Three-panel layout header с элементами:
1. Toggle button (☰) — слева
2. Title ("AI Learning Agent") — по центру
3. Version badge ("v2.0") — справа

ДИЗАЙН (из Design System):

Container:
- Height: 48px
- Background: var(--surface) = #ffffff
- Border-bottom: 1px solid var(--border) = #e5e7eb
- Padding: 0 16px
- Display: flex, align-items center, justify-content space-between
- Flex-shrink: 0 (fixed height)

Toggle Button:
- Size: 40×40px
- Background: transparent
- Border: none
- Border-radius: 4px
- Font-size: 20px (для иконки ☰)
- Color: var(--text-primary) = #111827
- Cursor: pointer
- Transition: background-color var(--transition-fast) = 0.1s ease
- Hover: background var(--left-hover) = #f3f4f6
- Active: background var(--left-selected) = #e5e7eb
- Display: flex, align-items center, justify-content center

Title:
- Font-size: 16px
- Font-weight: 600
- Color: var(--text-primary) = #111827
- Margin: 0
- Margin-left: 12px (от toggle button)

Version Badge:
- Font-size: 12px
- Font-weight: 500
- Color: var(--text-secondary) = #6b7280
- Background: var(--left-bg) = #f9fafb
- Padding: 4px 8px
- Border-radius: 4px

ФАЙЛЫ:
- /frontend/src/components/layout/Header.jsx
- /frontend/src/components/layout/Header.css

ФУНКЦИОНАЛЬНОСТЬ:
- Props: onToggleLeftSidebar (function)
- Click на toggle button → вызвать onToggleLeftSidebar()

РЕАЛИЗАЦИЯ:
1. Используй React functional component
2. Используй CSS variables (var(--...))
3. Импорт CSS в JSX
4. Semantic HTML (header, button, h1)
```

### Промпт 2: Создание Tree Navigation с expand/collapse

```
Создай CourseTree компонент для Left Sidebar с древовидной навигацией и expand/collapse:

СТРУКТУРА (3 уровня):
Level 1: Course (📁)
  Level 2: Module (📂)
    Level 3: Lesson (📄) + Checkbox

ДИЗАЙН (из Design System):

Course Level:
- Padding: 10px 16px
- Font-size: 14px
- Font-weight: 600
- Color: var(--text-primary) = #111827
- Background: transparent (expanded: var(--left-selected) = #e5e7eb)
- Hover: background var(--left-hover) = #f3f4f6
- Display: flex, align-items center, gap 8px
- Cursor: pointer
- Border: none
- Width: 100%
- Text-align: left

Module Level:
- Padding: 8px 16px 8px 32px (indent 32px)
- Font-size: 13px
- Font-weight: 500
- (остальное аналогично Course)

Lesson Level:
- Wrapper: display flex, align-items stretch
- Checkbox: 32px width, margin-left 48px (Level 3 indent)
- Lesson Item: padding 8px 16px 8px 8px, flex 1
- Font-size: 13px, font-weight: 400 (500 when active)
- Border-left: 3px solid transparent (active: 3px solid var(--primary-color) = #6366f1)
- Background: transparent (active: var(--left-selected) = #e5e7eb)
- Hover: background var(--left-hover) = #f3f4f6

Expand/Collapse Icons:
- Course: ► (collapsed) / ▼ (expanded)
- Module: ► (collapsed) / ▼ (expanded)
- Arrow font-size: 10px (course), 9px (module)
- Arrow opacity: 0.7 (course), 0.6 (module)

Animation:
- Expand/collapse: slide-down (0.2s ease)
- From: opacity 0, transform translateY(-4px)
- To: opacity 1, transform translateY(0)

ДАННЫЕ:
courses: [
  {
    id: 'course-1',
    title: 'AI Web Learning',
    expanded: false,
    modules: [
      {
        id: 'module-1-1',
        title: '1. Basics',
        expanded: false,
        lessons: [
          {id: 'lesson-1-1-1', title: '1.1 Client-Server'},
          {id: 'lesson-1-1-2', title: '1.2 HTTP Basics'}
        ]
      }
    ]
  }
]

ФУНКЦИОНАЛЬНОСТЬ:
- Click на Course/Module → toggle expand/collapse
- Click на Lesson → onSelectLesson(lessonId)
- Click на Checkbox → onToggleComplete(lessonId)
- Active lesson → подсветка (border-left #6366f1, bg #e5e7eb, font-weight 500)
- Completed lesson → opacity 0.6, line-through, checkbox green (#10b981)

ФАЙЛЫ:
- /frontend/src/components/leftSidebar/CourseTree.jsx
- /frontend/src/components/leftSidebar/CourseTree.css

РЕАЛИЗАЦИЯ:
1. Используй useState для expanded state
2. Используй CSS transitions для анимаций
3. Используй CSS variables
4. Props: courses, activeLessonId, completedLessons, onSelectLesson, onToggleComplete
```

### Промпт 3: Создание Modal с Context Selector

```
Создай ContextSelectorModal компонент для выбора контекста AI чата:

СТРУКТУРА:

Overlay:
- Position: fixed (top 0, left 0, right 0, bottom 0)
- Background: rgba(0, 0, 0, 0.4)
- Display: flex, align-items center, justify-content center
- Z-index: 1000
- Padding: 20px

Modal Content:
- Background: var(--surface) = #ffffff
- Border-radius: 12px
- Border: 1px solid var(--border) = #e5e7eb
- Max-width: 600px
- Width: 100%
- Max-height: 90vh
- Display: flex, flex-direction column
- Box-shadow: var(--shadow-lg)

Header:
- Padding: 20px 24px
- Border-bottom: 1px solid var(--border)
- Display: flex, align-items center, justify-content space-between
- Title: "Configure Context" (18px, 600 weight, var(--text-primary))
- Close button (×): 32×32px, 24px font, var(--text-secondary)
  - Hover: background var(--left-hover), color var(--text-primary)

Body:
- Padding: 24px
- Overflow-y: auto
- Flex: 1

Quick Modes Section:
- Label: "Quick Modes" (14px, 600 weight)
- Radio buttons (4 options):
  1. Current Lesson
  2. Current Module
  3. All Lessons
  4. Custom Selection
- Mode options: grid 2 columns, gap 12px
- Each option: padding 12px 14px, border 2px solid var(--border), border-radius 8px
  - Hover: background var(--left-hover), border var(--primary-color)
  - Radio: 18×18px, accent-color var(--primary-color) = #6366f1

Custom Selection Section (показывается если "Custom Selection" выбран):
- Background: var(--left-hover) = #f9fafb
- Border: 1px solid var(--border)
- Border-radius: 8px
- Padding: 16px
- Contains: LessonTree with checkboxes

Context Estimate Section:
- Margin-top: 24px
- Shows: "Estimated: X,XXX tokens"
- Shows: "Cost: $X.XX in / $X.XX out"
- Font-size: 13px, color var(--text-secondary)

Footer:
- Padding: 20px 24px
- Border-top: 1px solid var(--border)
- Display: flex, align-items center, justify-content flex-end
- Gap: 12px
- Buttons:
  - Cancel: btn-secondary
  - Apply Context: btn-accent

ФУНКЦИОНАЛЬНОСТЬ:
- Click overlay → close modal
- Click × button → close modal
- ESC key → close modal
- Change mode → update UI (show/hide LessonTree)
- Check/uncheck lessons → update estimate (tokens, cost)
- Click Apply → save selection, call onApply(), close modal
- Click Cancel → close modal without saving

АНИМАЦИИ:
- Overlay fade in: opacity 0 → 1 (0.2s ease)
- Modal scale + fade: transform scale(0.95) → scale(1), opacity 0 → 1 (0.15s ease)
- On close: reverse animations

ФАЙЛЫ:
- /frontend/src/components/context/ContextSelectorModal.jsx
- /frontend/src/components/context/ContextSelectorModal.css
- /frontend/src/components/context/LessonTree.jsx (checkbox tree)
- /frontend/src/components/context/ContextEstimate.jsx

PROPS:
- isOpen: boolean
- onClose: function
- onApply: function (receives selected context)
- courses: array (lesson data)
- currentLessonId: string
- currentModuleId: string
- selectedModel: object (для расчёта стоимости)

РЕАЛИЗАЦИЯ:
1. Используй React Portal для modal overlay
2. Используй useState для mode, selectedLessons
3. Используй useEffect для расчёта estimate при изменении selection
4. Используй CSS transitions для анимаций
5. Используй CSS variables
```

### Промпт 4: Создание AI Chat Interface (Right Sidebar)

```
Создай ClaudeAISidebar компонент для AI чата:

СТРУКТУРА:

Container:
- Display: flex, flex-direction column
- Height: 100%
- Background: var(--right-bg) = #ffffff
- Color: var(--right-text) = #1f2937

Header Section:
- Padding: 16px
- Border-bottom: 1px solid var(--right-border) = #e5e7eb
- Title: "🤖 AI Assistant" (16px, 600 weight, flex with gap 8px)
- Model Selector (dropdown):
  - Width: 100%
  - Padding: 8px 12px
  - Background: var(--right-surface) = #f9fafb
  - Border: 1px solid var(--right-border)
  - Border-radius: 6px
  - Font-size: 13px
  - Hover: border-color var(--right-accent) = #9ca3af

Context Selector:
- Padding: 12px 16px
- Border-bottom: 1px solid var(--right-border)
- Background: var(--right-surface)
- Display: flex, align-items center, justify-content space-between
- Summary: "Context: Current Lesson" (13px, 600 weight)
- Configure button (⚙️): 6px 12px, 16px icon
  - Hover: background var(--right-accent), border var(--right-accent)

Messages Container:
- Flex: 1
- Overflow-y: auto
- Padding: 16px
- Empty state (no messages):
  - Icon: 💬 (48px)
  - Title: "Start a conversation" (18px, 600 weight)
  - Text: "Ask questions about the course materials" (14px, #999)
  - Center aligned

Messages List:
- Display: flex, flex-direction column
- Gap: 16px

Message (User):
- Background: var(--right-user-msg) = #f3f4f6
- Color: var(--right-text) = #1f2937
- Padding: 12px 16px
- Border-radius: 8px
- Border: 1px solid var(--right-border)
- Margin-left: 20% (align right)
- Font-size: 14px
- Line-height: 1.6

Message (Assistant):
- Background: var(--right-surface) = #f9fafb
- Color: var(--right-text)
- Padding: 12px 16px
- Border-radius: 8px
- Border: 1px solid var(--right-border)
- Margin-right: 20% (align left)
- Font-size: 14px
- Line-height: 1.6
- Metadata (badges):
  - Model badge: 11px, var(--right-text-secondary) = #6b7280
  - Tokens badge: 11px, var(--right-text-secondary)
  - Gap: 8px, margin-top: 8px

Loading Dots:
- Display: flex, gap 4px
- Animation: loading-dot 1.4s infinite
- Each dot: animation-delay 0s, 0.2s, 0.4s
- Keyframes: opacity 0.3 (0%, 80%, 100%) → 1 (40%)

Input Container:
- Padding: 16px
- Border-top: 1px solid var(--right-border)
- Background: var(--right-surface)

Message Input (Textarea):
- Width: 100%
- Padding: 12px
- Background: var(--right-bg)
- Border: 1px solid var(--right-border)
- Border-radius: 6px
- Font-size: 14px
- Min-height: 60px
- Resize: vertical
- Placeholder: "Ask a question..."
- Focus: border-color var(--right-accent)
- Disabled: opacity 0.5

Input Actions:
- Display: flex, justify-content flex-end
- Gap: 8px
- Margin-top: 8px
- Stats button (📊): 18px font, padding 8px 16px
- Send button: btn-primary (8px 16px, var(--right-accent))

ФУНКЦИОНАЛЬНОСТЬ:
- Select model → setSelectedModel()
- Click configure (⚙️) → open ContextSelectorModal
- Type message → setMessage()
- Press Enter (no Shift) → send message
- Click Send → send message, add to messages, show loading
- Receive response → add assistant message with metadata
- Click Stats (📊) → open StatsModal (shows message count, tokens, cost)
- Auto-scroll to bottom on new message

ФАЙЛЫ:
- /frontend/src/components/rightSidebar/ClaudeAISidebar.jsx
- /frontend/src/components/rightSidebar/ClaudeAISidebar.css

PROPS:
- selectedModel: object
- onModelChange: function
- context: object
- onContextChange: function

STATE:
- messages: array [{role: 'user'|'assistant', content: string, model: string, tokens: number}]
- message: string (current input)
- loading: boolean
- showContextModal: boolean
- showStatsModal: boolean

РЕАЛИЗАЦИЯ:
1. Используй useState для messages, message, loading
2. Используй useEffect для auto-scroll on new message
3. Используй useRef для textarea, messages container
4. Используй CSS variables
5. Implement Enter to send (Shift+Enter for new line)
6. Calculate total tokens/cost for stats
```

### Промпт 5: Создание Responsive Resize Handle

```
Создай ResizeHandle компонент для изменения ширины Right Sidebar:

ДИЗАЙН:

Resize Handle:
- Width: 4px
- Height: 100%
- Background: transparent (hover: var(--primary-color) = #6366f1)
- Cursor: col-resize
- Position: absolute или flex item
- Transition: background 0.2s ease
- Z-index: 10

Visual Indicator (optional, on hover):
- Vertical line (4px width, 100% height)
- Color: var(--primary-color)

ФУНКЦИОНАЛЬНОСТЬ:

1. Mouse Events:
   - onMouseDown → start resize
   - onMouseMove (when dragging) → update width
   - onMouseUp → end resize

2. Width Constraints:
   - Min width: 400px
   - Max width: 800px
   - Default width: 600px

3. Resize Logic:
   ```js
   const handleMouseDown = (e) => {
     setIsResizing(true);
     // Store initial mouse position
   };

   const handleMouseMove = (e) => {
     if (!isResizing) return;

     // Calculate new width
     const newWidth = window.innerWidth - e.clientX;

     // Clamp between MIN_WIDTH and MAX_WIDTH
     const clampedWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));

     // Update right sidebar width
     setRightSidebarWidth(clampedWidth);
   };

   const handleMouseUp = () => {
     setIsResizing(false);
   };
   ```

4. Global Event Listeners:
   - Add mousemove/mouseup to document when resizing
   - Remove listeners when not resizing

5. Cursor Feedback:
   - Show col-resize cursor on handle
   - Show col-resize cursor on body during resize (optional)

CSS:

```css
.resize-handle {
  width: 4px;
  height: 100%;
  background: transparent;
  cursor: col-resize;
  position: relative;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
  user-select: none;
}

.resize-handle:hover {
  background-color: var(--primary-color); /* #6366f1 */
}

.resize-handle.resizing {
  background-color: var(--primary-color);
}

/* Optional: prevent text selection during resize */
body.resizing {
  cursor: col-resize;
  user-select: none;
}
```

LAYOUT INTEGRATION:

```jsx
// /frontend/src/components/layout/Layout.jsx
<div className="layout">
  <Header />
  <div className="layout-body">
    {leftSidebarVisible && <LeftSidebar />}
    <CenterPanel />
    <ResizeHandle onResize={setRightSidebarWidth} />
    <RightSidebar width={rightSidebarWidth} />
  </div>
</div>
```

ФАЙЛЫ:
- /frontend/src/components/layout/ResizeHandle.jsx
- /frontend/src/components/layout/ResizeHandle.css

PROPS:
- onResize: function (receives new width)
- initialWidth: number (default 600)
- minWidth: number (default 400)
- maxWidth: number (default 800)

РЕАЛИЗАЦИЯ:
1. Используй useState для isResizing
2. Используй useEffect для document event listeners (mousemove, mouseup)
3. Cleanup listeners on unmount
4. Используй CSS cursor styling
5. Optional: persist width to localStorage
```

### Промпт 6: Создание Loading States и Empty States

```
Создай универсальные компоненты для Loading и Empty States:

1. LOADING DOTS (для AI chat)

Визуал:
...  (три точки, анимация wave)

CSS:
```css
.loading-dots {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 12px 16px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background-color: var(--right-text-secondary); /* #6b7280 */
  border-radius: 50%;
  animation: loading-dot 1.4s infinite;
  opacity: 0.3;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loading-dot {
  0%, 80%, 100% {
    opacity: 0.3;
  }
  40% {
    opacity: 1;
  }
}
```

Использование:
```jsx
{loading && (
  <div className="loading-dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
)}
```

2. EMPTY CHAT STATE

Визуал:
```
        💬
Start a conversation
Ask questions about the course materials
```

CSS:
```css
.empty-chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #999;
  padding: 40px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-chat h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--right-text); /* #1f2937 */
}

.empty-chat p {
  font-size: 14px;
  color: #999;
}
```

3. NO LESSON SELECTED STATE

Визуал:
```
        📚
Select a lesson to start learning
Choose a lesson from the left sidebar
```

CSS: (аналогичен empty-chat)

4. LOADING SPINNER (альтернатива dots)

Визуал:
◐ (rotating circle)

CSS:
```css
.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--border); /* #e5e7eb */
  border-top-color: var(--primary-color); /* #6366f1 */
  border-radius: 50%;
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
```

5. ERROR STATE

Визуал:
```
    ❌
Something went wrong
Please try again later
```

CSS:
```css
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-state h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--error); /* #ef4444 */
}

.error-state p {
  font-size: 14px;
  color: var(--text-secondary); /* #6b7280 */
}
```

ФАЙЛЫ:
- /frontend/src/components/common/LoadingDots.jsx
- /frontend/src/components/common/LoadingSpinner.jsx
- /frontend/src/components/common/EmptyState.jsx
- /frontend/src/components/common/ErrorState.jsx

РЕАЛИЗАЦИЯ:
1. Создай переиспользуемые компоненты
2. Props для EmptyState: icon, title, message
3. Props для ErrorState: title, message
4. Используй CSS animations (keyframes)
5. Используй CSS variables для цветов
```

### Промпт 7: Создание полного Design System файла

```
Создай полный Design System файл (design-tokens.css) для AI Learning Agent:

ЗАДАЧА: Определить все дизайн-токены (CSS variables) в :root для использования во всех компонентах

СТРУКТУРА ФАЙЛА:

1. COLOR PALETTE (Цветовая палитра)
   - Primary colors (Indigo, Purple)
   - Left Sidebar colors (Light gray theme)
   - Center Panel colors (White theme)
   - Right Sidebar colors (Light theme, like Cline)
   - Common colors (Background, Surface, Border)
   - Semantic colors (Success, Error, Warning)

2. TYPOGRAPHY (Типографика)
   - Font families (Sans, Mono)
   - Font sizes (H1-H6, Body, Small, Tiny, Micro)
   - Font weights (Regular, Medium, Semibold, Bold)
   - Line heights

3. SPACING (Отступы)
   - Spacing scale (0, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px)

4. BORDER RADIUS (Скругления)
   - Small (4px), Medium (6px), Large (8px), Extra Large (12px)

5. SHADOWS (Тени)
   - Default shadow (для buttons, cards)
   - Large shadow (для modals)

6. TRANSITIONS (Переходы)
   - Fast (0.1s), Normal (0.2s), Slow (0.3s)

7. Z-INDEX (Слои)
   - Header (100), Modal overlay (1000), etc.

8. BREAKPOINTS (Точки адаптивности)
   - Tablet (768px), Desktop (1366px), Large desktop (1920px)

ФАЙЛ: /frontend/src/design-tokens.css

СОДЕРЖИМОЕ:

```css
/**
 * Design System - AI Learning Agent
 * Version: 2.0
 * Single Source of Truth для всех дизайн-токенов
 */

:root {
  /* ===== COLOR PALETTE ===== */

  /* Primary Colors (Accent) */
  --primary-color: #6366f1;      /* Indigo - main accent */
  --primary-hover: #5558e3;      /* Indigo hover */
  --secondary-color: #7c3aed;    /* Purple - alternative accent */

  /* Left Sidebar Colors (Light gray theme) */
  --left-bg: #f9fafb;            /* Background */
  --left-hover: #f3f4f6;         /* Hover state */
  --left-selected: #e5e7eb;      /* Selected/Active state */
  --left-border: 3px solid #6366f1; /* Active border */

  /* Center Panel Colors (White theme) */
  --center-bg: #ffffff;          /* Background */
  --center-text: #1f2937;        /* Primary text */
  --center-heading: #111827;     /* Headings */
  --center-secondary: #374151;   /* Secondary text */

  /* Right Sidebar Colors (Light theme) */
  --right-bg: #ffffff;           /* Background */
  --right-surface: #f9fafb;      /* Surface, assistant messages */
  --right-user-msg: #f3f4f6;     /* User message background */
  --right-text: #1f2937;         /* Primary text */
  --right-text-secondary: #6b7280; /* Secondary text */
  --right-border: #e5e7eb;       /* Borders */
  --right-accent: #9ca3af;       /* Neutral accent (Send button) */
  --right-hover: #f3f4f6;        /* Hover state */

  /* Common Colors */
  --background: #f9fafb;         /* Global background */
  --surface: #ffffff;            /* White surfaces */
  --border: #e5e7eb;             /* Default borders */
  --text-primary: #111827;       /* Primary text (darkest) */
  --text-secondary: #6b7280;     /* Secondary text (gray) */

  /* Semantic Colors */
  --success: #10b981;            /* Green - success, completed */
  --error: #ef4444;              /* Red - errors */
  --warning: #f59e0b;            /* Orange - warnings */

  /* ===== TYPOGRAPHY ===== */

  /* Font Families */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
               'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
               'Helvetica Neue', sans-serif;
  --font-mono: 'Courier New', Courier, monospace;

  /* Font Sizes */
  --font-size-h1: 24px;
  --font-size-h2: 20px;
  --font-size-h3: 18px;
  --font-size-h4: 16px;
  --font-size-h5: 14px;
  --font-size-h6: 13px;
  --font-size-body: 14px;
  --font-size-small: 13px;
  --font-size-tiny: 12px;
  --font-size-micro: 11px;

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;

  /* ===== SPACING ===== */

  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;

  /* ===== BORDER RADIUS ===== */

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  /* ===== SHADOWS ===== */

  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
            0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
               0 4px 6px -4px rgb(0 0 0 / 0.1);

  /* ===== TRANSITIONS ===== */

  --transition-fast: 0.1s ease;
  --transition-normal: 0.2s ease;
  --transition-slow: 0.3s ease;

  /* ===== Z-INDEX ===== */

  --z-header: 100;
  --z-modal-overlay: 1000;
  --z-modal-content: 1001;

  /* ===== BREAKPOINTS (for reference, use in media queries) ===== */

  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1366px;
  --breakpoint-large: 1920px;
}

/* ===== GLOBAL STYLES ===== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  font-size: var(--font-size-body);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
  background-color: var(--background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1366px; /* Desktop only */
  overflow-x: auto;
}

button {
  font-family: inherit;
  cursor: pointer;
}

input, textarea, select {
  font-family: inherit;
}

/* ===== SCROLLBAR STYLING ===== */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
```

ИСПОЛЬЗОВАНИЕ:

В каждом CSS файле компонента используй:
```css
.my-component {
  background-color: var(--surface);
  color: var(--text-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}
```

ИМПОРТ:

В главном index.css или App.css:
```css
@import './design-tokens.css';
```
```

---

## 🎓 Итоги и лучшие практики

### Когда использовать каждый тип артефакта

| Этап проекта | Артефакт | Зачем |
|--------------|----------|-------|
| **Начало проекта** | Wireframes | Быстро набросать структуру, согласовать с командой |
| **Проектирование** | Mockups | Детально проработать визуал, определить цвета/шрифты |
| **Тестирование UX** | Prototypes | Проверить интерактивность, user flow, анимации |
| **Разработка** | Design System | Обеспечить консистентность, ускорить разработку |
| **Масштабирование** | Component Library | Переиспользуемые компоненты, единый code style |
| **Handoff** | Figma Specs | Передать точные спецификации от дизайнера к разработчику |

### Принципы работы с дизайн-артефактами

1. **Single Source of Truth (SSOT)**
   - Design System — единственный источник токенов
   - Все компоненты используют CSS variables из Design System
   - Изменение токена → автоматически применяется везде

2. **Progressive Enhancement**
   - Начинай с Lo-Fi (wireframe)
   - Постепенно добавляй детали (mockup → prototype)
   - Финализируй в Design System

3. **Consistency (Консистентность)**
   - Используй одинаковые spacing, colors, typography во всех компонентах
   - Следуй паттернам (hover states, active states, disabled states)
   - Документируй все варианты компонентов

4. **Accessibility (Доступность)**
   - Контраст текста: минимум 4.5:1 (WCAG AA)
   - Размер кликабельных элементов: минимум 40×40px
   - Keyboard navigation (Tab, Enter, Escape)
   - Screen reader support (semantic HTML, ARIA labels)

5. **Performance (Производительность)**
   - Оптимизируй анимации (CSS transitions лучше JS)
   - Используй CSS variables вместо inline styles
   - Lazy load компоненты (React.lazy())

### Чек-лист перед реализацией компонента

- [ ] Есть ли wireframe (структура)?
- [ ] Есть ли mockup (детальный дизайн)?
- [ ] Определены ли все состояния (default, hover, active, disabled)?
- [ ] Используются ли CSS variables из Design System?
- [ ] Есть ли анимации/transitions?
- [ ] Проверена ли accessibility (контраст, размеры, keyboard)?
- [ ] Компонент переиспользуемый (props, variants)?
- [ ] Есть ли документация (JSDoc, Storybook)?

---

**Файл:** `/backend/data/lessons/worked-examples/example-1-ai-learning-agent/design-artifacts-guide.md`
**Размер:** ~1100 строк
**Статус:** Готов к использованию
**Версия:** 1.0
**Дата создания:** 2025-10-16

---

## 📚 Связанные ресурсы

- [ui-terminology-guide.md](ui-terminology-guide.md) — Терминология UI элементов
- [README.md](/README.md) — Документация проекта
- [frontend/src/index.css](/frontend/src/index.css) — Реальный Design System проекта
- [Figma Design Guidelines](https://www.figma.com/best-practices/) — Лучшие практики Figma
