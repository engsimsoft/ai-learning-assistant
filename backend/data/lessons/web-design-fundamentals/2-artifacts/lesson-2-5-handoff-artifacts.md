# Урок 2.5: Design → Dev Handoff Process (Процесс передачи дизайна разработчикам)

> **Модуль 2:** Artifacts
> **Урок:** 2.5
> **Длительность:** 45-60 минут
> **Prerequisite:** Lessons 2.1-2.4

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Объяснить что такое design handoff (передача дизайна)
- ✅ Понимать какие форматы используются (Figma, Sketch, Zeplin, InVision)
- ✅ Знать что разработчику нужно от дизайнера
- ✅ Извлекать design specs (цвета, spacing, шрифты, assets)
- ✅ Работать с Figma inspect panel
- ✅ Формулировать задачи для Claude Code на основе дизайна
- ✅ Избегать типичных проблем при handoff

---

## 📖 Концепция: Что такое Design Handoff?

### Простое определение

**Design Handoff (передача дизайна)** — это процесс передачи дизайна от дизайнера к разработчику с полной информацией, необходимой для реализации.

**Важно:** Handoff — это не просто "вот тебе макет, делай". Это структурированный процесс передачи всех спецификаций, ресурсов и знаний.

---

## 🔄 Процесс Handoff: Общая схема

```
ДИЗАЙНЕР                          РАЗРАБОТЧИК
    │                                  │
    │ 1. Создал дизайн                 │
    │    ├── Mockups                   │
    │    ├── Prototypes                │
    │    └── Design Specs              │
    │                                  │
    │ 2. Подготовил handoff ──────────► 3. Получил файлы
    │    ├── Figma файл                │    ├── Открыл Figma
    │    ├── Assets (SVG, PNG)         │    ├── Изучил структуру
    │    ├── Specifications            │    └── Задал вопросы
    │    └── Notes/Comments            │
    │                                  │
    │ 4. Ответил на вопросы ◄──────────┤
    │                                  │
    │                                  │ 5. Разработал
    │                                  │    ├── Извлек specs
    │                                  │    ├── Написал код
    │                                  │    └── Экспортировал assets
    │                                  │
    │ 6. Review дизайна ◄──────────────┤ Показал результат
    │    ├── Проверка соответствия     │
    │    ├── Коррекция деталей         │
    │    └── Одобрение                 │
    │                                  │
    ▼                                  ▼
  DONE                              DONE
```

---

## 🎨 Форматы Handoff: Инструменты

### 1. Figma (Самый популярный)

**Что это:**
- Браузерный инструмент для дизайна
- Встроенный inspect mode (режим инспектора)
- Разработчик получает доступ к файлу

**Как работает:**
```
ДИЗАЙНЕР                    РАЗРАБОТЧИК
│                           │
├── Создает дизайн в Figma  │
├── Шарит ссылку ──────────►├── Открывает в браузере
│                           ├── Включает Inspect mode
│                           ├── Видит все specs
│                           │   ├── Размеры
│                           │   ├── Цвета
│                           │   ├── Отступы
│                           │   └── Code snippets
│                           │
│                           └── Экспортирует assets
```

**Преимущества:**
- ✅ Бесплатная для просмотра
- ✅ Браузерная (не нужно устанавливать)
- ✅ Показывает CSS/iOS/Android код
- ✅ Экспорт assets в 1 клик
- ✅ Комментарии прямо в дизайне

**Недостатки:**
- ⚠️ Требует интернет
- ⚠️ Дизайнер должен дать доступ

---

### 2. Sketch (Mac only)

**Что это:**
- Desktop приложение для macOS
- Нужен плагин для handoff (Zeplin, Avocode)

**Как работает:**
```
ДИЗАЙНЕР                    РАЗРАБОТЧИК
│                           │
├── Создает в Sketch        │
├── Экспортирует в Zeplin ─►├── Открывает Zeplin
│   или Avocode             ├── Видит specs
│                           └── Экспортирует assets
```

**Преимущества:**
- ✅ Мощный инструмент дизайна
- ✅ Много плагинов

**Недостатки:**
- ❌ Только macOS
- ❌ Платный ($99/год)
- ❌ Нужны дополнительные инструменты для handoff

---

### 3. Zeplin (Handoff platform)

**Что это:**
- Специальная платформа для handoff
- Работает с Figma, Sketch, Adobe XD

**Как работает:**
```
ДИЗАЙНЕР                    РАЗРАБОТЧИК
│                           │
├── Импортирует из Figma ──►├── Видит все в Zeplin
│   или Sketch              ├── Автогенерация CSS
│                           ├── Style guide
│                           └── Assets
```

**Преимущества:**
- ✅ Автоматические CSS/Swift/Android snippets
- ✅ Version control (история версий)
- ✅ Styleguide автогенерация

**Недостатки:**
- ❌ Платный (для больших команд)
- ❌ Дополнительный инструмент

---

### 4. InVision (Prototype + Handoff)

**Что это:**
- Платформа для прототипов
- Inspect mode для handoff

**Как работает:**
```
ДИЗАЙНЕР                    РАЗРАБОТЧИК
│                           │
├── Создает prototype ─────►├── Кликабельный prototype
├── Включает Inspect ──────►├── Видит specs
│                           └── Экспортирует assets
```

**Преимущества:**
- ✅ Prototype + handoff в одном
- ✅ Комментарии и feedback

**Недостатки:**
- ❌ Платный
- ❌ Менее популярен чем Figma

---

## 📊 Сравнение инструментов

| Инструмент | Тип | Платный? | Inspect Mode | CSS Export | Популярность |
|-----------|-----|----------|--------------|------------|--------------|
| **Figma** | Design + Handoff | Бесплатно (view) | ✅ Да | ✅ Да | ⭐⭐⭐⭐⭐ |
| **Sketch** | Design only | $99/год | ❌ Нет* | ❌ Нет* | ⭐⭐⭐⭐ |
| **Zeplin** | Handoff only | $10+/мес | ✅ Да | ✅ Да | ⭐⭐⭐ |
| **InVision** | Prototype + Handoff | $15+/мес | ✅ Да | ✅ Да | ⭐⭐⭐ |
| **Adobe XD** | Design + Handoff | Бесплатно (starter) | ✅ Да | ✅ Да | ⭐⭐⭐ |

*Sketch нужен Zeplin/Avocode для handoff

**Вывод:** Figma — лучший выбор для большинства команд.

---

## 🎯 Что разработчику нужно от дизайнера?

### Полный Handoff Checklist

**1. Design Files (файлы дизайна)**
- [ ] Доступ к Figma файлу (или Sketch/XD)
- [ ] Организованные слои (понятные названия)
- [ ] Все экраны/состояния
  - [ ] Default state (обычное состояние)
  - [ ] Hover state (при наведении)
  - [ ] Active/Focus state (при клике)
  - [ ] Disabled state (недоступное)
  - [ ] Error state (ошибка)
  - [ ] Loading state (загрузка)
  - [ ] Empty state (пустое)

**2. Responsive Design (адаптивность)**
- [ ] Desktop (1920px, 1440px, 1280px)
- [ ] Tablet (768px, 1024px)
- [ ] Mobile (375px, 414px)
- [ ] Правила адаптации (что прячется, что сворачивается)

**3. Design Specs (спецификации)**
- [ ] Colors (все цвета в hex/rgba)
- [ ] Typography (шрифты, размеры, weights, line-height)
- [ ] Spacing (отступы, paddings, margins)
- [ ] Shadows (тени)
- [ ] Border-radius (скругления)
- [ ] Opacity (прозрачность)
- [ ] Transitions/Animations (анимации)

**4. Assets (ресурсы)**
- [ ] Icons (SVG формат)
- [ ] Images (оптимизированные PNG/JPG)
- [ ] Logos (SVG + PNG)
- [ ] Illustrations (SVG предпочтительно)
- [ ] @2x и @3x версии (для Retina)

**5. Interactions (интерактивность)**
- [ ] Что происходит при клике
- [ ] Анимации переходов
- [ ] Scroll behavior
- [ ] Модальные окна
- [ ] Tooltips/Popovers

**6. Copy & Content (тексты)**
- [ ] Все тексты написаны (не Lorem Ipsum)
- [ ] Правильная длина текстов
- [ ] Примеры реальных данных

**7. Documentation (документация)**
- [ ] Комментарии в дизайне
- [ ] Notes о нестандартных решениях
- [ ] Link на style guide/design system
- [ ] Примеры использования компонентов

---

## 🔍 Работа с Figma: Inspect Panel

### Как извлечь спецификации из Figma

**Шаг 1: Получи доступ**
```
Дизайнер отправляет ссылку:
https://www.figma.com/file/ABC123/ProjectName

Открываешь → Включаешь Inspect Mode (правая панель)
```

**Шаг 2: Figma Interface**
```
┌─────────────────────────────────────────────────────────┐
│ [←] ProjectName               [Share] [⚙️] [👤]         │
├──────────┬──────────────────────────────────┬───────────┤
│          │                                  │           │
│ Pages    │  Canvas (дизайн)                 │ Inspect   │
│          │                                  │ Panel     │
│ • Home   │  ┌────────────────────┐          │           │
│ • Login  │  │                    │          │ Selected: │
│ • Dash   │  │   [Button ◄─────────────────► Button     │
│          │  │    "Click me"       │          │           │
│          │  │                    │          │ Size:     │
│          │  └────────────────────┘          │ 200×48px  │
│          │                                  │           │
│          │                                  │ Fill:     │
│          │                                  │ #007BFF   │
│          │                                  │           │
│          │                                  │ Border-r: │
│          │                                  │ 8px       │
│          │                                  │           │
│          │                                  │ Text:     │
│          │                                  │ Inter,16px│
│          │                                  │           │
│          │                                  │ Code ▼    │
│          │                                  │ [CSS]     │
└──────────┴──────────────────────────────────┴───────────┘
```

**Шаг 3: Что видишь в Inspect Panel**

При выборе элемента справа появляется:

```
┌─────────────────────────┐
│ INSPECT PANEL           │
├─────────────────────────┤
│                         │
│ Button                  │ ← Название
│                         │
│ Size:                   │
│ W: 200px  H: 48px       │ ← Размеры
│                         │
│ Position:               │
│ X: 120px  Y: 340px      │ ← Позиция
│                         │
│ Fill:                   │
│ ■ #007BFF               │ ← Цвет фона
│                         │
│ Border:                 │
│ None                    │ ← Граница
│                         │
│ Effects:                │
│ ⚡ Drop Shadow           │ ← Тень
│   X:0 Y:2 B:4           │
│   rgba(0,0,0,0.1)       │
│                         │
│ Border Radius:          │
│ 8px                     │ ← Скругление
│                         │
│ Text:                   │
│ "Click me"              │ ← Текст
│ Inter, Bold, 16px       │ ← Шрифт
│ #FFFFFF                 │ ← Цвет текста
│ Line-height: 24px       │ ← Высота строки
│                         │
│ Code ▼                  │
│ ┌─────────────────────┐ │
│ │ CSS    iOS  Android │ │
│ └─────────────────────┘ │
│                         │
│ [Export]                │ ← Экспорт
│                         │
└─────────────────────────┘
```

**Шаг 4: CSS Code Export**

Нажимаешь на "Code" → выбираешь "CSS":

```css
/* Figma автоматически генерирует: */

.button {
  width: 200px;
  height: 48px;
  background: #007BFF;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  /* Text */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
}
```

**Важно:** Код из Figma — это отправная точка, не финальный код!

---

## 📐 Извлечение Design Specs

### 1. Colors (Цвета)

**Где искать:**
- В Figma Inspect Panel → Fill
- В Figma Design Tokens (если есть)
- В Style Guide

**Что извлекать:**

```
PRIMARY COLORS
├── Primary: #007BFF (кнопки, ссылки)
├── Secondary: #6C757D (второстепенные элементы)
└── Accent: #28A745 (акценты)

SEMANTIC COLORS
├── Success: #28A745
├── Warning: #FFC107
├── Error: #DC3545
└── Info: #17A2B8

TEXT COLORS
├── Primary Text: #212529 (основной текст)
├── Secondary Text: #6C757D (подписи)
└── Disabled Text: #ADB5BD (недоступный)

BACKGROUND COLORS
├── Background: #FFFFFF
├── Surface: #F8F9FA
└── Hover: #E9ECEF
```

**Как организовать в коде:**

```css
/* colors.css */
:root {
  /* Primary */
  --color-primary: #007BFF;
  --color-secondary: #6C757D;
  --color-accent: #28A745;

  /* Semantic */
  --color-success: #28A745;
  --color-warning: #FFC107;
  --color-error: #DC3545;
  --color-info: #17A2B8;

  /* Text */
  --color-text-primary: #212529;
  --color-text-secondary: #6C757D;
  --color-text-disabled: #ADB5BD;

  /* Background */
  --color-bg: #FFFFFF;
  --color-surface: #F8F9FA;
  --color-hover: #E9ECEF;
}
```

---

### 2. Typography (Шрифты)

**Где искать:**
- Figma Inspect Panel → Text
- Type styles в левой панели

**Что извлекать:**

```
FONT FAMILY
└── Primary: Inter (Google Fonts)

TYPE SCALE
├── Display: 64px / 72px (line-height) / Bold
├── H1: 48px / 56px / Bold
├── H2: 40px / 48px / Bold
├── H3: 32px / 40px / Semibold
├── H4: 24px / 32px / Semibold
├── H5: 20px / 28px / Semibold
├── H6: 16px / 24px / Semibold
├── Body Large: 18px / 28px / Regular
├── Body: 16px / 24px / Regular
├── Body Small: 14px / 20px / Regular
└── Caption: 12px / 16px / Regular

WEIGHTS
├── Regular: 400
├── Semibold: 600
└── Bold: 700
```

**Как организовать в коде:**

```css
/* typography.css */
:root {
  /* Font families */
  --font-primary: 'Inter', sans-serif;

  /* Font sizes */
  --font-size-display: 64px;
  --font-size-h1: 48px;
  --font-size-h2: 40px;
  --font-size-h3: 32px;
  --font-size-h4: 24px;
  --font-size-h5: 20px;
  --font-size-h6: 16px;
  --font-size-body-large: 18px;
  --font-size-body: 16px;
  --font-size-body-small: 14px;
  --font-size-caption: 12px;

  /* Line heights */
  --line-height-display: 72px;
  --line-height-h1: 56px;
  --line-height-body: 24px;
  /* ... */

  /* Weights */
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

h1 {
  font-family: var(--font-primary);
  font-size: var(--font-size-h1);
  line-height: var(--line-height-h1);
  font-weight: var(--font-weight-bold);
}
```

---

### 3. Spacing (Отступы)

**Где искать:**
- Figma Inspect Panel → расстояние между элементами
- При выборе двух элементов → показывает gap

**Что извлекать:**

```
SPACING SCALE (8px base)
├── XXS: 4px   (tight spacing)
├── XS:  8px   (base unit)
├── S:   12px
├── M:   16px  (default)
├── L:   24px
├── XL:  32px
├── XXL: 48px
└── 3XL: 64px  (large gaps)
```

**Как организовать в коде:**

```css
/* spacing.css */
:root {
  --spacing-xxs: 4px;
  --spacing-xs: 8px;
  --spacing-s: 12px;
  --spacing-m: 16px;
  --spacing-l: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --spacing-3xl: 64px;
}

/* Utility classes */
.p-m { padding: var(--spacing-m); }
.m-l { margin: var(--spacing-l); }
.gap-m { gap: var(--spacing-m); }
```

---

### 4. Shadows (Тени)

**Где искать:**
- Figma Inspect Panel → Effects → Drop Shadow

**Что извлекать:**

```
SHADOW LEVELS
├── Shadow XS: 0px 1px 2px rgba(0,0,0,0.05)
├── Shadow S:  0px 2px 4px rgba(0,0,0,0.1)
├── Shadow M:  0px 4px 8px rgba(0,0,0,0.15)
├── Shadow L:  0px 8px 16px rgba(0,0,0,0.2)
└── Shadow XL: 0px 16px 32px rgba(0,0,0,0.25)
```

**Как организовать в коде:**

```css
:root {
  --shadow-xs: 0px 1px 2px rgba(0,0,0,0.05);
  --shadow-s: 0px 2px 4px rgba(0,0,0,0.1);
  --shadow-m: 0px 4px 8px rgba(0,0,0,0.15);
  --shadow-l: 0px 8px 16px rgba(0,0,0,0.2);
  --shadow-xl: 0px 16px 32px rgba(0,0,0,0.25);
}

.card {
  box-shadow: var(--shadow-m);
}
```

---

### 5. Border Radius (Скругления)

**Где искать:**
- Figma Inspect Panel → Border Radius

**Что извлекать:**

```
RADIUS SCALE
├── None: 0px
├── XS: 4px    (small elements)
├── S: 8px     (buttons, inputs)
├── M: 12px    (cards)
├── L: 16px    (large cards)
└── Full: 9999px (pills, avatars)
```

**Как организовать в коде:**

```css
:root {
  --radius-none: 0px;
  --radius-xs: 4px;
  --radius-s: 8px;
  --radius-m: 12px;
  --radius-l: 16px;
  --radius-full: 9999px;
}
```

---

## 📦 Экспорт Assets

### Настройки экспорта в Figma

**Шаг 1: Выбери элемент для экспорта**

**Шаг 2: В правой панели → Export**

```
┌─────────────────────────┐
│ EXPORT                  │
├─────────────────────────┤
│                         │
│ [+] Add export setting  │
│                         │
│ Format: PNG ▼           │
│   ├── PNG               │
│   ├── JPG               │
│   ├── SVG               │ ← Для иконок/лого
│   ├── PDF               │
│   └── WebP              │
│                         │
│ Size: 1x ▼              │
│   ├── 0.5x              │
│   ├── 1x                │
│   ├── 2x  (@2x)         │ ← Retina
│   ├── 3x  (@3x)         │
│   └── 4x                │
│                         │
│ [Export Button]         │
│                         │
└─────────────────────────┘
```

**Шаг 3: Рекомендации по форматам**

| Тип | Формат | Разрешение | Когда использовать |
|-----|--------|------------|-------------------|
| **Иконки** | SVG | Vector | Всегда предпочтительно |
| **Лого** | SVG + PNG | Vector + @2x | SVG для современных браузеров, PNG fallback |
| **Фото** | JPG | @1x, @2x | Фотографии, сложные изображения |
| **Иллюстрации** | SVG или PNG | Vector или @2x | SVG если возможно |
| **UI элементы** | SVG | Vector | Кнопки, декоративные элементы |

---

### Export Checklist

**Для иконок:**
- [ ] Формат: SVG
- [ ] Optimize SVG (убрать лишний код)
- [ ] Цвет: currentColor (чтобы можно было перекрашивать)
- [ ] Viewbox: правильный размер

**Для изображений:**
- [ ] Формат: JPG (фото) или PNG (прозрачность)
- [ ] Размеры: @1x и @2x
- [ ] Оптимизация: сжатие без потери качества
- [ ] WebP версия (опционально, для лучшей производительности)

**Для лого:**
- [ ] SVG для масштабирования
- [ ] PNG @2x для fallback
- [ ] Все варианты (цветной, монохромный, white version)

---

## 🎨 Responsive Design Specs

### Как извлечь адаптивность из Figma

**Breakpoints (точки переключения):**

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  DESKTOP (1440px+)                              │
│  ┌─────────────────────────────────────────┐   │
│  │ [Logo]  Nav Nav Nav Nav      [Button]   │   │
│  │                                          │   │
│  │  ┌────────┐ ┌────────┐ ┌────────┐      │   │
│  │  │ Card 1 │ │ Card 2 │ │ Card 3 │      │   │
│  │  └────────┘ └────────┘ └────────┘      │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘

┌──────────────────────────────┐
│                              │
│  TABLET (768px - 1439px)     │
│  ┌─────────────────────────┐ │
│  │ [☰] [Logo]    [Button]  │ │
│  │                          │ │
│  │  ┌────────┐ ┌────────┐  │ │
│  │  │ Card 1 │ │ Card 2 │  │ │ ← 2 колонки
│  │  └────────┘ └────────┘  │ │
│  │  ┌────────┐              │ │
│  │  │ Card 3 │              │ │
│  │  └────────┘              │ │
│  └─────────────────────────┘ │
│                              │
└──────────────────────────────┘

┌───────────────┐
│               │
│  MOBILE       │
│  (<768px)     │
│  ┌──────────┐ │
│  │ [☰] Logo │ │
│  │          │ │
│  │┌────────┐│ │
│  ││ Card 1 ││ │ ← 1 колонка
│  │└────────┘│ │
│  │┌────────┐│ │
│  ││ Card 2 ││ │
│  │└────────┘│ │
│  │┌────────┐│ │
│  ││ Card 3 ││ │
│  │└────────┘│ │
│  └──────────┘ │
│               │
└───────────────┘
```

**Что спрашивать у дизайнера:**

1. **Breakpoints:**
   - При каких ширинах меняется layout?
   - Использовать стандартные (768px, 1024px, 1440px)?

2. **Адаптация элементов:**
   - Что скрывается на мобилке?
   - Какие элементы сворачиваются в меню?
   - Как изменяются отступы?

3. **Grid/Layout:**
   - Сколько колонок на разных экранах?
   - Как изменяются gap между элементами?

---

## 💬 Vibe Coding: Промпты для Claude Code

### Шаблон 1: Реализация компонента по Figma specs

```
📝 PROMPT:
Создай React компонент Button по этим спецификациям из Figma:

Визуал:
- Размер: 200px × 48px
- Background: #007BFF
- Border-radius: 8px
- Text: Inter, Bold, 16px, #FFFFFF
- Padding: 12px 24px
- Shadow: 0px 2px 4px rgba(0,0,0,0.1)

Состояния:
- Hover: фон #0056B3
- Active: фон #004494
- Disabled: фон #6C757D, opacity 0.5

Используй CSS-in-JS (styled-components).
```

**Результат:** Claude создаст точный компонент.

---

### Шаблон 2: Полный экран по Figma

```
📝 PROMPT:
Реализуй страницу Login по Figma дизайну:

Структура:
┌─────────────────────┐
│   [Logo centered]   │
│                     │
│   Email: [_______]  │
│   Password: [_____] │
│   □ Remember me     │
│                     │
│   [Login Button]    │
│   Forgot password?  │
│                     │
│   Or sign in with:  │
│   [G] [F] [Apple]   │
└─────────────────────┘

Design Specs:
Colors:
- Background: #F8F9FA
- Input border: #DEE2E6
- Primary button: #007BFF
- Text: #212529

Typography:
- Logo: Inter, 32px, Bold
- Labels: Inter, 14px, Regular
- Button: Inter, 16px, Semibold

Spacing:
- Отступы между полями: 16px
- Padding в inputs: 12px
- Border-radius: 8px

Используй React + Tailwind CSS.
Сделай адаптивным (mobile-first).
```

---

### Шаблон 3: Извлечение Design Tokens

```
📝 PROMPT:
Из этого Figma дизайна извлеки design tokens и создай CSS variables:

Цвета (из Color Styles):
- Primary: #007BFF
- Secondary: #6C757D
- Success: #28A745
- Warning: #FFC107
- Error: #DC3545

Шрифты:
- Family: Inter
- Sizes: 12px, 14px, 16px, 20px, 24px, 32px
- Weights: 400, 600, 700

Spacing (8px grid):
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

Создай:
1. CSS файл с :root переменными
2. Utility classes для spacing
3. TypeScript типы для design tokens
```

---

### Шаблон 4: Адаптивность по Figma фреймам

```
📝 PROMPT:
Реализуй адаптивный Header по 3 фреймам из Figma:

Desktop (1440px+):
[Logo] [Nav Nav Nav Nav]          [Search] [Button]

Tablet (768px - 1439px):
[Logo] [Nav Nav]          [☰]

Mobile (<768px):
[☰] [Logo]                [🔍]

Требования:
- Используй CSS Grid
- Breakpoints: 768px, 1440px
- Навигация на tablet/mobile → в burger menu
- Анимация открытия меню: slide-in left
- Используй React + CSS Modules
```

---

## ⚠️ Типичные проблемы и решения

### Проблема 1: Нет доступа к Figma файлу

**Симптомы:**
- Дизайнер прислал только скриншоты
- Нельзя измерить размеры

**Решение:**
```
✅ Попроси у дизайнера:
1. Ссылку на Figma с правом "Can view"
2. Или экспорт в Zeplin/Avocode
3. Или детальный Style Guide

❌ Не пытайся угадывать размеры/цвета!
```

---

### Проблема 2: Отсутствуют состояния (hover, error, etc)

**Симптомы:**
- В Figma только default состояние
- Не понятно как выглядит hover

**Решение:**
```
✅ Спроси у дизайнера:
- "Как выглядит кнопка при hover?"
- "Где дизайн error state для форм?"
- "Что показывать во время loading?"

📝 Или следуй стандартным паттернам:
- Hover: фон темнее/светлее на 10%
- Error: красная рамка + текст ошибки
- Loading: spinner или skeleton
```

---

### Проблема 3: Нет адаптивных версий

**Симптомы:**
- В Figma только desktop версия
- Нет mobile/tablet

**Решение:**
```
✅ Уточни у дизайнера:
1. Какие breakpoints использовать?
2. Что скрывать на mobile?
3. Как адаптировать grid?

📝 Или используй стандартные подходы:
- Mobile-first design
- Стандартные breakpoints (768px, 1024px, 1440px)
- Adaptive grid (12 → 6 → 3 → 1 колонка)
```

---

### Проблема 4: Экспортированные SVG слишком большие

**Симптомы:**
- SVG файл 50KB вместо 2KB
- Много лишнего кода в SVG

**Решение:**
```
✅ Оптимизируй SVG:
1. Используй https://jakearchibald.github.io/svgomg/
2. Убери лишние атрибуты
3. Используй SVGO в build процессе

npm install -g svgo
svgo icon.svg -o icon-optimized.svg
```

---

### Проблема 5: Дизайн не совпадает с реализацией

**Симптомы:**
- Дизайнер говорит "это не так выглядит"
- Размеры/цвета немного отличаются

**Решение:**
```
✅ Проверь:
1. Pixel-perfect comparison (используй Figma overlay)
2. Правильные цвета (скопируй hex из Figma)
3. Правильные шрифты (загружены ли font-family?)
4. Правильные размеры (px, а не em/rem если не договорились)

🛠️ Используй browser extension:
- PerfectPixel (Chrome) - overlay дизайна
```

---

### Проблема 6: Шрифты выглядят иначе

**Симптомы:**
- В браузере шрифт тоньше/толще чем в Figma
- Размеры не совпадают

**Решение:**
```
✅ Проверь:
1. Загружен ли шрифт? (font-family правильный?)
2. Font-weight совпадает? (400, 600, 700)
3. Line-height задан? (часто забывают)
4. Antialiasing: добавь
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
```

---

## 📋 Developer Handoff Checklist

### Перед началом разработки

**Получил от дизайнера:**
- [ ] Доступ к Figma файлу (view mode)
- [ ] Все экраны/страницы готовы
- [ ] Есть все состояния (default, hover, error, loading)
- [ ] Есть адаптивные версии (mobile, tablet, desktop)
- [ ] Style guide или design system
- [ ] Exported assets (icons, images)
- [ ] Комментарии/notes в дизайне

**Проверил:**
- [ ] Все слои имеют понятные названия
- [ ] Цвета используют color styles (не random hex)
- [ ] Шрифты используют text styles
- [ ] Components правильно используются
- [ ] Нет missing fonts

**Задал вопросы:**
- [ ] Уточнил breakpoints
- [ ] Уточнил анимации/transitions
- [ ] Уточнил edge cases (что если текст длинный?)
- [ ] Уточнил loading/error states

---

### Во время разработки

**Извлек specs:**
- [ ] Colors → CSS variables
- [ ] Typography → CSS variables
- [ ] Spacing → CSS variables
- [ ] Shadows → CSS variables
- [ ] Border-radius → CSS variables

**Экспортировал assets:**
- [ ] Icons → SVG (оптимизированные)
- [ ] Images → JPG/PNG (@1x, @2x)
- [ ] Logo → SVG + PNG fallback

**Реализовал:**
- [ ] Desktop версию
- [ ] Tablet версию
- [ ] Mobile версию
- [ ] Все состояния (hover, active, error, etc)
- [ ] Анимации/transitions

---

### После разработки

**Проверка:**
- [ ] Pixel-perfect сравнение (overlay)
- [ ] Правильные цвета
- [ ] Правильные шрифты
- [ ] Правильные размеры
- [ ] Все состояния работают
- [ ] Адаптивность работает

**Design Review:**
- [ ] Показал дизайнеру результат
- [ ] Получил feedback
- [ ] Исправил замечания
- [ ] Получил approval

---

## 🎓 Практический пример: AI Learning Agent Header

### Сценарий: Дизайнер передал Figma дизайн Header

**Шаг 1: Открываем Figma**

Получили ссылку: `https://figma.com/file/ABC/AI-Learning-Agent`

**Шаг 2: Изучаем дизайн**

```
┌────────────────────────────────────────────────┐
│ [🤖 AI Learning] Courses | Lessons    [👤 User]│ ← Desktop
├────────────────────────────────────────────────┤
│                                                │
│  Content...                                    │
│                                                │
└────────────────────────────────────────────────┘
```

**Шаг 3: Включаем Inspect mode → кликаем на Header**

```
INSPECT PANEL показывает:
- Size: 1440×64px
- Background: #FFFFFF
- Border-bottom: 1px solid #E9ECEF
- Padding: 0 32px
- Display: flex, justify-content: space-between
```

**Шаг 4: Извлекаем specs для каждого элемента**

**Logo:**
- Text: "AI Learning"
- Font: Inter, 20px, Bold
- Color: #212529
- Icon: 🤖 (32×32px)

**Navigation:**
- Items: "Courses", "Lessons"
- Font: Inter, 16px, Regular
- Color: #6C757D
- Hover: #007BFF
- Gap: 32px

**User menu:**
- Avatar: 40×40px, border-radius: 50%
- Border: 2px solid #007BFF

**Шаг 5: Формулируем prompt для Claude**

```
📝 PROMPT:
Создай React компонент Header для AI Learning Agent по Figma specs:

Структура:
[Logo + Icon] [Nav: Courses, Lessons] [User Avatar]

Design Specs:
Container:
- Height: 64px
- Background: #FFFFFF
- Border-bottom: 1px solid #E9ECEF
- Padding: 0 32px
- Display: flex, justify-content: space-between, align-items: center

Logo:
- Icon: 🤖 (32×32px)
- Text: "AI Learning"
- Font: Inter, 20px, Bold, #212529
- Gap: 12px

Navigation:
- Items: ["Courses", "Lessons"]
- Font: Inter, 16px, Regular, #6C757D
- Hover: color #007BFF
- Gap между items: 32px

User Avatar:
- Size: 40×40px
- Border-radius: 50%
- Border: 2px solid #007BFF

Responsive:
- На mobile (<768px): скрыть навигацию, показать burger menu

Используй React + Tailwind CSS.
```

**Шаг 6: Claude генерирует код**

```tsx
// Header.tsx
import React from 'react';

export const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">🤖</span>
        <span className="text-xl font-bold text-gray-900">
          AI Learning
        </span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-8">
        <a href="/courses" className="text-gray-600 hover:text-blue-600">
          Courses
        </a>
        <a href="/lessons" className="text-gray-600 hover:text-blue-600">
          Lessons
        </a>
      </nav>

      {/* User */}
      <div className="w-10 h-10 rounded-full border-2 border-blue-600 overflow-hidden">
        <img src="/user-avatar.jpg" alt="User" />
      </div>
    </header>
  );
};
```

**Шаг 7: Проверяем результат**

- ✅ Размеры совпадают
- ✅ Цвета правильные
- ✅ Шрифты загружены
- ✅ Responsive работает

**Шаг 8: Design Review с дизайнером**

- Показываем результат
- Получаем approval или feedback
- Исправляем детали если нужно

---

## 🚀 Следующие шаги

В следующем уроке:

- **Урок 2.6:** Prompting with Artifacts — мастер-класс по формулировке задач для Claude Code с использованием артефактов

**Дополнительная практика:**
- Открой любой популярный сайт
- Найди его дизайн в Dribbble/Behance
- Попробуй извлечь specs (цвета, шрифты, spacing)
- Сформулируй prompt для реализации

---

## 📝 Резюме

**Ключевые концепции:**

1. **Design Handoff** — процесс передачи дизайна от дизайнера к разработчику
2. **Инструменты:**
   - Figma (самый популярный, бесплатный для просмотра)
   - Sketch + Zeplin
   - Adobe XD
   - InVision
3. **Что нужно разработчику:**
   - Доступ к design files
   - Все состояния (hover, error, loading)
   - Адаптивные версии (mobile, tablet, desktop)
   - Design specs (colors, typography, spacing, shadows)
   - Assets (icons, images)
   - Documentation/comments
4. **Figma Inspect Panel** — главный инструмент для извлечения specs
5. **Design Specs:**
   - Colors → CSS variables
   - Typography → font families, sizes, weights
   - Spacing → 8px grid система
   - Shadows, border-radius
6. **Assets Export:**
   - Icons → SVG (оптимизированные)
   - Images → JPG/PNG @2x
   - Logo → SVG + PNG
7. **Vibe Coding:** Детальные specs из Figma → четкие промпты → точная реализация
8. **Типичные проблемы:**
   - Нет доступа → попросить у дизайнера
   - Нет состояний → уточнить или использовать стандарты
   - Нет адаптива → использовать mobile-first
   - Большие SVG → оптимизировать через SVGO

**Handoff Checklist:**
> ✅ Доступ к Figma → ✅ Все экраны готовы → ✅ Извлек specs → ✅ Экспортировал assets → ✅ Реализовал → ✅ Design review → ✅ Approval

**Главное:**
> Хороший handoff = вся информация доступна = нет вопросов = быстрая разработка без переделок

---

## 🔗 Полезные ресурсы

- **Figma** - https://www.figma.com (регистрация бесплатная)
- **Figma Tutorials** - https://www.youtube.com/c/Figma (официальные видео)
- **Zeplin** - https://zeplin.io (handoff platform)
- **SVGO** - https://github.com/svg/svgo (SVG оптимизация)
- **SVGOMG** - https://jakearchibald.github.io/svgomg/ (онлайн SVG оптимизатор)
- **PerfectPixel** - Chrome extension для pixel-perfect проверки

---

**Готов к следующему уроку?** → Переходи к **Lesson 2.6: Prompting with Artifacts**
