# Урок 2.3: Design Systems and Style Guides (Дизайн-системы и гайды стиля)

> **Модуль 2:** Artifacts
> **Урок:** 2.3
> **Длительность:** 60-90 минут
> **Prerequisite:** Уроки 2.1-2.2

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Объяснить разницу между Design System и Style Guide
- ✅ Понимать методологию Atomic Design (атомы, молекулы, организмы)
- ✅ Работать с Design Tokens (цвета, spacing, типографика)
- ✅ Читать и использовать существующие дизайн-системы (Material Design, Ant Design, Chakra UI)
- ✅ Формулировать промпты для Claude Code с использованием дизайн-систем
- ✅ Создавать простые дизайн-системы для своих проектов

---

## 📖 Концепция: Design System vs Style Guide

### Простые определения

**Style Guide (гайд стиля)** — это документ с правилами: какие цвета, шрифты, отступы использовать.

**Design System (дизайн-система)** — это Style Guide + библиотека готовых UI компонентов + документация по использованию.

**Важно:** Style Guide говорит "как должно выглядеть". Design System даёт "готовые компоненты, которые уже выглядят правильно".

---

## 🏗️ Аналогия: LEGO vs Инструкция

### Style Guide — это инструкция:

```
📖 ИНСТРУКЦИЯ:
- Используй только красные, синие и жёлтые блоки
- Все блоки должны быть стандартного размера
- Крепи блоки ровными рядами
```
→ Ты знаешь правила, но собираешь сам

### Design System — это набор LEGO:

```
🧱 НАБОР LEGO:
- ✅ Готовые блоки правильных цветов
- ✅ Инструкция как их использовать
- ✅ Примеры готовых конструкций
- ✅ Можно комбинировать и создавать новое
```
→ Ты просто берёшь готовые детали и собираешь

**Ключевое отличие:**
- **Style Guide** — набор правил (design principles)
- **Design System** — готовые компоненты + правила (living product)

---

## 🎨 Зачем нужна Design System?

### Проблема: Разработка без системы

❌ **Без Design System:**
```
Дизайнер 1: Кнопка 40px высотой, синяя #007BFF
Дизайнер 2: Кнопка 44px высотой, синяя #0066CC
Разработчик 1: Сделал свою кнопку 38px, синяя #0080FF
Разработчик 2: Взял Bootstrap кнопку

Результат:
- 4 разных оттенка синего
- 4 разных размера кнопок
- Нет консистентности
- Всё выглядит как склеенное из разных сайтов
```

✅ **С Design System:**
```
Design System: Button Component
- Высота: 40px
- Цвет: colors.primary (#007BFF)
- Скругление: borderRadius.medium (8px)
- Padding: spacing.medium (12px 24px)

Все используют ОДИН компонент Button:
→ Везде одинаковый вид
→ Изменил Button → изменилось везде
→ Консистентность автоматически
```

### Основные преимущества Design System

1. **Консистентность** — всё выглядит как одно приложение
2. **Скорость разработки** — не создаёшь кнопки с нуля, берёшь готовые
3. **Масштабируемость** — легко добавлять новые страницы
4. **Поддержка** — изменил систему → обновилось везде
5. **Коммуникация** — дизайнеры и разработчики говорят на одном языке

---

## ⚛️ Atomic Design — методология создания Design System

**Atomic Design** — это методология, которая делит интерфейс на уровни, как в химии:

```
ATOMIC DESIGN HIERARCHY

⚛️ ATOMS (Атомы)
  ↓ комбинируются в
🧪 MOLECULES (Молекулы)
  ↓ комбинируются в
🦠 ORGANISMS (Организмы)
  ↓ используются в
📄 TEMPLATES (Шаблоны)
  ↓ превращаются в
🖼️ PAGES (Страницы)
```

---

### 1. ⚛️ Atoms (Атомы) — самые простые элементы

**Что это:** Неделимые UI элементы, которые нельзя разбить дальше.

**Примеры:**
- Button (кнопка)
- Input (поле ввода)
- Label (надпись)
- Icon (иконка)
- Color (цвет)
- Font (шрифт)

**Визуализация:**
```
⚛️ ATOMS:

[Button]   [Input Field]   [Label]   [Icon]   [Color: #007BFF]
```

**В коде:**
```jsx
// Atom: Button
<Button>Click me</Button>

// Atom: Input
<Input type="text" />

// Atom: Label
<Label>Email:</Label>

// Atom: Icon
<Icon name="search" />
```

**Важно:** Атомы сами по себе могут быть бесполезны (что толку от одной кнопки?), но они — строительные блоки для всего остального.

---

### 2. 🧪 Molecules (Молекулы) — простые комбинации атомов

**Что это:** Группы атомов, которые работают вместе как единое целое.

**Примеры:**
- Search Box = Input + Button + Icon
- Form Field = Label + Input + Error Message
- Card Header = Avatar + Name + Badge

**Визуализация:**
```
🧪 MOLECULE: Search Box

┌─────────────────────────────┐
│ [🔍]  [Input Field]  [Button] │
└─────────────────────────────┘
  Icon      Atom         Atom

🧪 MOLECULE: Form Field

Email:           ← Label (atom)
┌─────────────┐
│ [_________] │  ← Input (atom)
└─────────────┘
❌ Invalid email ← Error (atom)
```

**В коде:**
```jsx
// Molecule: SearchBox
function SearchBox() {
  return (
    <div className="search-box">
      <Icon name="search" />        {/* Atom */}
      <Input placeholder="Search" /> {/* Atom */}
      <Button>Go</Button>           {/* Atom */}
    </div>
  );
}

// Molecule: FormField
function FormField({ label, error }) {
  return (
    <div className="form-field">
      <Label>{label}</Label>     {/* Atom */}
      <Input />                  {/* Atom */}
      {error && <Error>{error}</Error>} {/* Atom */}
    </div>
  );
}
```

**Принцип:** Молекула делает ОДНУ простую вещь (поиск, ввод поля).

---

### 3. 🦠 Organisms (Организмы) — сложные комбинации молекул

**Что это:** Большие, сложные секции интерфейса, состоящие из молекул и атомов.

**Примеры:**
- Header = Logo + Navigation Menu + Search Box + User Menu
- Product Card = Image + Title + Price + Button + Rating
- Login Form = Form Fields + Submit Button + Social Buttons

**Визуализация:**
```
🦠 ORGANISM: Header

┌────────────────────────────────────────────────────┐
│ [Logo]  [Nav Menu]  [Search Box]  [User Avatar]   │
│  Atom    Molecule     Molecule      Molecule       │
└────────────────────────────────────────────────────┘


🦠 ORGANISM: Product Card

┌─────────────────┐
│ [  Image  ]     │ ← Atom
│                 │
│ Product Name    │ ← Atom (Text)
│ $99.99          │ ← Atom (Price)
│ ⭐⭐⭐⭐⭐          │ ← Molecule (Rating)
│                 │
│ [Add to Cart]   │ ← Atom (Button)
└─────────────────┘
```

**В коде:**
```jsx
// Organism: Header
function Header() {
  return (
    <header>
      <Logo />              {/* Atom */}
      <NavigationMenu />    {/* Molecule */}
      <SearchBox />         {/* Molecule */}
      <UserMenu />          {/* Molecule */}
    </header>
  );
}

// Organism: ProductCard
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Image src={product.image} />      {/* Atom */}
      <Title>{product.name}</Title>      {/* Atom */}
      <Price>{product.price}</Price>     {/* Atom */}
      <Rating value={product.rating} />  {/* Molecule */}
      <Button>Add to Cart</Button>       {/* Atom */}
    </div>
  );
}
```

**Принцип:** Организм — это самодостаточная секция интерфейса (можно переиспользовать на разных страницах).

---

### 4. 📄 Templates (Шаблоны) — структура страницы

**Что это:** Layout страницы без реального контента (с placeholder'ами).

**Визуализация:**
```
📄 TEMPLATE: E-commerce Page

┌─────────────────────────────────────────────┐
│  HEADER (organism)                          │
├─────────┬───────────────────────────────────┤
│         │  HERO BANNER (organism)           │
│ SIDEBAR │                                   │
│ FILTER  │  PRODUCT GRID                     │
│ (org.)  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
│         │  │Card │ │Card │ │Card │ │Card │ │ ← Organisms
│         │  └─────┘ └─────┘ └─────┘ └─────┘ │
│         │                                   │
│         │  PAGINATION (molecule)            │
├─────────┴───────────────────────────────────┤
│  FOOTER (organism)                          │
└─────────────────────────────────────────────┘
```

**В коде:**
```jsx
// Template: E-commerce Page Layout
function EcommerceTemplate({ children }) {
  return (
    <div className="ecommerce-layout">
      <Header />                    {/* Organism */}
      <div className="main-content">
        <Sidebar>
          <FilterPanel />           {/* Organism */}
        </Sidebar>
        <main>
          <HeroBanner />            {/* Organism */}
          {children}                {/* Product Grid */}
          <Pagination />            {/* Molecule */}
        </main>
      </div>
      <Footer />                    {/* Organism */}
    </div>
  );
}
```

**Принцип:** Template показывает СТРУКТУРУ, но не финальный контент.

---

### 5. 🖼️ Pages (Страницы) — финальный результат

**Что это:** Template с реальными данными и контентом.

**Визуализация:**
```
🖼️ PAGE: iPhone 15 Product Page

┌─────────────────────────────────────────────┐
│  🍎 Apple Store  [Products] [Support] 🛒    │ ← Header
├─────────┬───────────────────────────────────┤
│ Price   │  🌟 New iPhone 15 - Pre-order!    │ ← Hero
│ $999    │                                   │
│         │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
│ Color   │  │iPhone│ │AirPods│ │Watch│ │Mac│ │ ← Real
│ ⚫⚪🔵   │  │$999 │ │$249 │ │$399│ │$1299│ │   products
│         │  └─────┘ └─────┘ └─────┘ └─────┘ │
│ Storage │                                   │
│ 128GB   │  « 1 2 3 4 5 »                    │ ← Pagination
├─────────┴───────────────────────────────────┤
│  © 2024 Apple Inc. | Terms | Privacy        │ ← Footer
└─────────────────────────────────────────────┘
```

**Принцип:** Page = Template + Real Data.

---

### Atomic Design: Полная структура

```
ATOMIC DESIGN HIERARCHY

⚛️ ATOMS (Базовые элементы)
├── Button
├── Input
├── Label
├── Icon
├── Text
└── Color

🧪 MOLECULES (Простые группы)
├── SearchBox (Icon + Input + Button)
├── FormField (Label + Input + Error)
└── Rating (5x Icon)

🦠 ORGANISMS (Сложные секции)
├── Header (Logo + Nav + Search + UserMenu)
├── ProductCard (Image + Title + Price + Rating + Button)
└── LoginForm (2x FormField + Button + Links)

📄 TEMPLATES (Структуры страниц)
├── EcommerceLayout
├── DashboardLayout
└── BlogLayout

🖼️ PAGES (Финальные страницы)
├── HomePage (EcommerceLayout + real data)
├── ProductPage (ProductLayout + real data)
└── CheckoutPage (CheckoutLayout + real data)
```

---

## 🎨 Design Tokens — язык дизайн-системы

**Design Tokens** — это переменные с именами, которые хранят значения дизайна (цвета, размеры, шрифты).

**Зачем нужны:** Вместо `#007BFF` пишешь `colors.primary` — понятнее и легче менять.

---

### 1. Color Tokens (Цвета)

**Плохой подход (без токенов):**
```css
.button { background: #007BFF; }      /* Что это? */
.link { color: #0066CC; }             /* Другой оттенок? */
.badge { background: #0080FF; }       /* Третий? */
```
❌ Проблемы: непонятно, нет консистентности, сложно менять

**Хороший подход (с токенами):**
```css
/* Design Tokens */
:root {
  --color-primary: #007BFF;
  --color-primary-dark: #0056B3;
  --color-secondary: #6C757D;
  --color-success: #28A745;
  --color-danger: #DC3545;
  --color-warning: #FFC107;
  --color-info: #17A2B8;

  /* Neutral colors */
  --color-gray-50: #F8F9FA;
  --color-gray-100: #E9ECEF;
  --color-gray-200: #DEE2E6;
  --color-gray-300: #CED4DA;
  --color-gray-400: #ADB5BD;
  --color-gray-500: #6C757D;
  --color-gray-600: #495057;
  --color-gray-700: #343A40;
  --color-gray-800: #212529;
  --color-gray-900: #000000;
}

.button { background: var(--color-primary); }
.link { color: var(--color-primary); }
.badge { background: var(--color-info); }
```
✅ Преимущества: понятно, консистентно, легко менять

**Семантические цвета (semantic colors):**
```css
/* Не привязаны к конкретному цвету */
:root {
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-disabled: var(--color-gray-400);

  --color-background-primary: #FFFFFF;
  --color-background-secondary: var(--color-gray-50);

  --color-border-default: var(--color-gray-300);
  --color-border-focus: var(--color-primary);
}
```

**Примеры реальных палитр:**

**Material Design (Google):**
```css
/* Primary */
--color-primary-50: #E3F2FD;
--color-primary-100: #BBDEFB;
--color-primary-200: #90CAF9;
--color-primary-300: #64B5F6;
--color-primary-400: #42A5F5;
--color-primary-500: #2196F3;  /* Main */
--color-primary-600: #1E88E5;
--color-primary-700: #1976D2;
--color-primary-800: #1565C0;
--color-primary-900: #0D47A1;
```

**Tailwind CSS:**
```css
--color-blue-50: #EFF6FF;
--color-blue-100: #DBEAFE;
--color-blue-200: #BFDBFE;
--color-blue-300: #93C5FD;
--color-blue-400: #60A5FA;
--color-blue-500: #3B82F6;  /* Main */
--color-blue-600: #2563EB;
--color-blue-700: #1D4ED8;
--color-blue-800: #1E40AF;
--color-blue-900: #1E3A8A;
```

---

### 2. Spacing Tokens (Отступы)

**Плохой подход:**
```css
.card { padding: 15px; }
.button { padding: 10px 20px; }
.section { margin: 25px; }
```
❌ Случайные значения, нет системы

**Хороший подход (spacing scale):**
```css
/* Design Tokens: Spacing Scale (8px base) */
:root {
  --spacing-0: 0;
  --spacing-1: 4px;    /* 0.5x */
  --spacing-2: 8px;    /* 1x - base */
  --spacing-3: 12px;   /* 1.5x */
  --spacing-4: 16px;   /* 2x */
  --spacing-5: 20px;   /* 2.5x */
  --spacing-6: 24px;   /* 3x */
  --spacing-8: 32px;   /* 4x */
  --spacing-10: 40px;  /* 5x */
  --spacing-12: 48px;  /* 6x */
  --spacing-16: 64px;  /* 8x */
  --spacing-20: 80px;  /* 10x */
  --spacing-24: 96px;  /* 12x */
}

.card { padding: var(--spacing-6); }        /* 24px */
.button { padding: var(--spacing-3) var(--spacing-6); } /* 12px 24px */
.section { margin: var(--spacing-10); }     /* 40px */
```

**Визуализация spacing scale:**
```
SPACING SCALE (8px base)

0px   ·
4px   ··
8px   ····              ← BASE
12px  ······
16px  ········
24px  ················
32px  ························
48px  ····································
64px  ························································
```

**Популярные подходы:**

**Material Design (4dp base):**
```
4, 8, 12, 16, 24, 32, 40, 48, 56, 64
```

**Tailwind CSS (4px base):**
```
0, 1(4px), 2(8px), 3(12px), 4(16px), 5(20px), 6(24px),
8(32px), 10(40px), 12(48px), 16(64px), 20(80px), 24(96px)
```

---

### 3. Typography Tokens (Типографика)

**Плохой подход:**
```css
h1 { font-size: 32px; font-weight: bold; }
h2 { font-size: 26px; font-weight: 600; }
p { font-size: 16px; line-height: 1.5; }
```
❌ Нет системы, сложно поддерживать

**Хороший подход (type scale):**
```css
/* Design Tokens: Typography */
:root {
  /* Font Families */
  --font-primary: 'Inter', -apple-system, system-ui, sans-serif;
  --font-monospace: 'Fira Code', 'Courier New', monospace;

  /* Font Sizes (Type Scale 1.250 - Major Third) */
  --font-size-xs: 0.64rem;    /* 10.24px */
  --font-size-sm: 0.8rem;     /* 12.8px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-md: 1.25rem;    /* 20px */
  --font-size-lg: 1.563rem;   /* 25px */
  --font-size-xl: 1.953rem;   /* 31.25px */
  --font-size-2xl: 2.441rem;  /* 39.06px */
  --font-size-3xl: 3.052rem;  /* 48.83px */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}

/* Typography Components */
h1 {
  font-family: var(--font-primary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

h2 {
  font-family: var(--font-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

body {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
}
```

**Визуализация type scale:**
```
TYPE SCALE (1.250 ratio - Major Third)

3xl  48px  ████████████ Heading 1
2xl  39px  ██████████ Heading 2
xl   31px  ████████ Heading 3
lg   25px  ██████ Heading 4
md   20px  ████ Heading 5
base 16px  ███ Body Text
sm   13px  ██ Small Text
xs   10px  █ Tiny Text
```

**Популярные type scale ratios:**
- **1.125** (Major Second) — слабый контраст
- **1.200** (Minor Third) — умеренный
- **1.250** (Major Third) — хороший баланс ✅
- **1.333** (Perfect Fourth) — сильный контраст
- **1.500** (Perfect Fifth) — очень выраженный

---

### 4. Shadow Tokens (Тени)

```css
/* Design Tokens: Shadows */
:root {
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);

  /* Inner shadows */
  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.card { box-shadow: var(--shadow-md); }
.modal { box-shadow: var(--shadow-2xl); }
```

**Визуализация shadows:**
```
SHADOW ELEVATION

No shadow    ▭

xs           ▭̲
sm           ▭̲̲
md           ▭̲̲̲
lg           ▭̲̲̲̲
xl           ▭̲̲̲̲̲
2xl          ▭̲̲̲̲̲̲
```

---

### 5. Border Radius Tokens (Скругления)

```css
/* Design Tokens: Border Radius */
:root {
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;  /* Круг */
}

.button { border-radius: var(--radius-md); }    /* 8px */
.card { border-radius: var(--radius-lg); }      /* 12px */
.avatar { border-radius: var(--radius-full); }  /* Круг */
```

**Визуализация radius:**
```
BORDER RADIUS

none  ┌─┐  Square
sm    ╭─╮  Slightly rounded
md    ╭──╮ Standard rounded
lg    ╭───╮ Very rounded
full  ●    Circle
```

---

### Design Tokens: Полная структура

```
DESIGN TOKENS SYSTEM

🎨 COLORS
├── Primary Palette (50-900)
├── Secondary Palette
├── Semantic Colors (success, error, warning, info)
├── Neutral Grays (50-900)
└── Text/Background Colors

📏 SPACING
├── Base: 8px
└── Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

✍️ TYPOGRAPHY
├── Font Families (primary, monospace)
├── Font Sizes (xs → 3xl, ratio 1.250)
├── Font Weights (300-700)
└── Line Heights (tight, normal, relaxed)

🌑 SHADOWS
├── Elevation (xs → 2xl)
└── Inner Shadow

⭕ BORDER RADIUS
├── Sharp (none → sm)
├── Rounded (md → xl)
└── Circle (full)

⏱️ ANIMATIONS
├── Duration (fast: 150ms, normal: 300ms, slow: 500ms)
└── Easing (ease-in, ease-out, ease-in-out)
```

---

## 📚 Популярные Design Systems — обзор

### 1. Material Design (Google)

**Что это:** Самая популярная дизайн-система, созданная Google в 2014 году.

**Философия:** "Material" (материал) — интерфейс как физические объекты с тенями, слоями.

**Основные принципы:**
- **Material is the metaphor** — интерфейс ведёт себя как физический материал
- **Bold, graphic, intentional** — яркие цвета, чёткая типографика
- **Motion provides meaning** — анимации объясняют что происходит

**Палитра цветов:**
```css
/* Material Design Colors */
--md-blue-500: #2196F3;      /* Primary */
--md-pink-500: #E91E63;       /* Accent */
--md-red-500: #F44336;        /* Error */
--md-green-500: #4CAF50;      /* Success */
--md-orange-500: #FF9800;     /* Warning */
```

**Типичные компоненты:**
```
Material Design Components:
├── Button (Raised, Flat, Outlined)
├── Card (Elevated)
├── Chip
├── Dialog (Modal)
├── FAB (Floating Action Button)
├── TextField (Outlined, Filled)
├── AppBar (Top navigation)
├── Drawer (Side navigation)
└── Snackbar (Notifications)
```

**Spacing:** 4dp base (1dp = 1px on mdpi screens)

**Typography:** Roboto font

**Где используется:** Gmail, Google Drive, Android apps, YouTube

**React библиотеки:**
- Material-UI (MUI) — https://mui.com
- React Material (rmwc) — https://rmwc.io

**Плюсы:**
- ✅ Очень детальная документация
- ✅ Проверено миллионами пользователей
- ✅ Много готовых компонентов
- ✅ Хорошо знакомо пользователям Android

**Минусы:**
- ❌ Узнаваемый "Google" стиль (сложно сделать уникальным)
- ❌ Некоторым кажется "тяжёлым" (много теней, анимаций)

---

### 2. Ant Design (Alibaba)

**Что это:** Дизайн-система от китайского гиганта Alibaba, популярная в enterprise приложениях.

**Философия:** "Natural" (естественный) — интерфейс должен быть интуитивным и эффективным.

**Основные принципы:**
- **Natural** — следуй законам природы, естественное поведение
- **Certain** — уверенность в действиях, предсказуемость
- **Meaningful** — осмысленные действия, не просто красиво
- **Growing** — система развивается вместе с продуктом

**Палитра цветов:**
```css
/* Ant Design Colors */
--ant-blue-6: #1890FF;        /* Primary (Daybreak Blue) */
--ant-red-6: #F5222D;         /* Error */
--ant-green-6: #52C41A;       /* Success */
--ant-gold-6: #FAAD14;        /* Warning */
```

**Типичные компоненты:**
```
Ant Design Components:
├── Button (Primary, Default, Dashed, Link, Text)
├── Table (Data table with sorting, filtering)
├── Form (Complex forms with validation)
├── DatePicker (Calendar)
├── Upload (File uploader)
├── Tree (Tree view)
├── Steps (Wizard)
└── Layout (Sider, Header, Content, Footer)
```

**Spacing:** 8px grid

**Typography:** -apple-system, BlinkMacSystemFont, 'Segoe UI'

**Где используется:** Enterprise apps, admin panels, dashboards

**React библиотека:**
- Ant Design — https://ant.design

**Плюсы:**
- ✅ Идеально для сложных enterprise приложений
- ✅ Много компонентов для data management (таблицы, формы)
- ✅ Хорошая производительность
- ✅ Встроенная internationalization (i18n)

**Минусы:**
- ❌ Выглядит "корпоративно" (не подходит для креативных проектов)
- ❌ Большой bundle size
- ❌ Сложно кастомизировать дизайн

---

### 3. Chakra UI

**Что это:** Современная дизайн-система, фокус на доступности (accessibility) и developer experience.

**Философия:** "Simple, Modular, and Accessible" — просто использовать, легко кастомизировать, доступно всем.

**Основные принципы:**
- **Style Props** — стилизация через props (как Tailwind, но с компонентами)
- **Composable** — компоненты легко комбинируются
- **Accessible by default** — WAI-ARIA из коробки
- **Dark mode** — встроенная поддержка тёмной темы

**Палитра цветов:**
```css
/* Chakra UI Colors (50-900 scale) */
--chakra-blue-500: #3182CE;   /* Primary */
--chakra-red-500: #E53E3E;    /* Error */
--chakra-green-500: #38A169;  /* Success */
--chakra-orange-500: #DD6B20; /* Warning */
```

**Типичные компоненты:**
```
Chakra UI Components:
├── Button (Solid, Outline, Ghost, Link)
├── Box (Базовый контейнер с style props)
├── Flex / Stack (Layout)
├── Input / Textarea / Select
├── Modal / Drawer
├── Toast (Notifications)
├── Menu / Popover
└── Tabs / Accordion
```

**Spacing:** 4px base (scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)

**Typography:** System font stack

**Особенность — Style Props:**
```jsx
// Стилизация через props (не нужен CSS!)
<Box
  bg="blue.500"          // background: blue-500
  p={4}                  // padding: 16px (4 * 4px)
  borderRadius="md"      // border-radius: 8px
  boxShadow="lg"         // box-shadow: large
  _hover={{ bg: "blue.600" }}  // hover styles
>
  Content
</Box>
```

**React библиотека:**
- Chakra UI — https://chakra-ui.com

**Плюсы:**
- ✅ Очень быстрая разработка (style props!)
- ✅ Отличная accessibility из коробки
- ✅ Легко кастомизировать
- ✅ Встроенный dark mode
- ✅ TypeScript support

**Минусы:**
- ❌ Меньше готовых компонентов чем в Ant Design
- ❌ Относительно новая (меньше материалов/примеров)

---

### 4. Bootstrap

**Что это:** Старейшая и самая популярная CSS framework (с 2011 года).

**Философия:** "Mobile first" — сначала мобильная версия, потом десктоп.

**Палитра цветов:**
```css
/* Bootstrap Colors */
--bs-primary: #0D6EFD;
--bs-secondary: #6C757D;
--bs-success: #198754;
--bs-danger: #DC3545;
--bs-warning: #FFC107;
--bs-info: #0DCAF0;
```

**Spacing:** 4px base (scale: 0, 1, 2, 3, 4, 5)

**React библиотеки:**
- React Bootstrap — https://react-bootstrap.github.io
- Reactstrap — https://reactstrap.github.io

**Плюсы:**
- ✅ Огромное community
- ✅ Тонны примеров и шаблонов
- ✅ Хорошо знаком большинству разработчиков

**Минусы:**
- ❌ Выглядит "устаревшим" в 2024 году
- ❌ Сложнее кастомизировать
- ❌ Большой CSS bundle

---

### 5. Tailwind CSS (не совсем Design System, но...)

**Что это:** Utility-first CSS framework — не готовые компоненты, а utility классы.

**Философия:** "Utility-first" — создаёшь дизайн из маленьких utility классов.

**Пример:**
```jsx
// Не компонент, а классы
<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Click me
</button>
```

**Плюсы:**
- ✅ Максимальная гибкость
- ✅ Быстрая разработка
- ✅ Маленький production bundle (удаляет неиспользуемые классы)

**Минусы:**
- ❌ Нет готовых компонентов (нужно создавать самому)
- ❌ HTML выглядит "грязным" (много классов)

**UI библиотеки на базе Tailwind:**
- Headless UI — https://headlessui.com
- DaisyUI — https://daisyui.com
- Shadcn UI — https://ui.shadcn.com

---

### Сравнение популярных Design Systems

| Система | Год | Философия | Компоненты | Кастомизация | Использование |
|---------|-----|-----------|------------|--------------|---------------|
| **Material Design** | 2014 | Physical metaphor | 40+ | Средняя | Gmail, YouTube |
| **Ant Design** | 2016 | Enterprise natural | 60+ | Сложная | Admin panels, dashboards |
| **Chakra UI** | 2019 | Simple & accessible | 50+ | Очень легкая | Modern apps |
| **Bootstrap** | 2011 | Mobile-first | 30+ | Средняя | Legacy projects |
| **Tailwind** | 2017 | Utility-first | 0 (классы) | Максимальная | Any project |

---

## 💬 Работа с Design Systems в Vibe Coding

### Как читать документацию Design System

**Что искать в документации:**

1. **Компоненты** — какие готовые UI элементы есть
2. **Props/API** — какие параметры принимают компоненты
3. **Variants** — варианты компонента (размеры, цвета)
4. **Примеры кода** — как использовать
5. **Accessibility** — как работает keyboard navigation, screen readers

**Пример: Material-UI Button**

Документация: https://mui.com/material-ui/react-button/

```jsx
// Variants
<Button variant="contained">Contained</Button>  // Filled
<Button variant="outlined">Outlined</Button>    // Border
<Button variant="text">Text</Button>            // No background

// Colors
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="error">Error</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>  // Default
<Button size="large">Large</Button>

// With icon
<Button startIcon={<SaveIcon />}>Save</Button>
```

---

### Промпты для Claude Code с Design Systems

#### Шаблон 1: Использование готового компонента

```
📝 PROMPT:
Создай [название страницы/компонента] используя [Design System].

Требования:
- Используй компоненты: [список компонентов]
- Варианты: [variants]
- Цвета: [color tokens]
- Spacing: [spacing tokens]

Пример использования:
[Код пример из документации]
```

**Пример:**
```
Создай форму логина используя Material-UI.

Требования:
- Используй компоненты: TextField, Button, Box, Typography
- TextField variant="outlined"
- Button variant="contained" color="primary"
- Spacing: theme.spacing(2) между элементами
- Центрировать форму на экране

Структура:
- Заголовок "Sign In"
- Поля: Email, Password
- Кнопка "Login"
- Ссылка "Forgot password?"
```

---

#### Шаблон 2: Кастомизация Design System

```
📝 PROMPT:
Создай кастомную тему для [Design System] с такими параметрами:

Colors:
- Primary: [hex]
- Secondary: [hex]
- Error: [hex]

Typography:
- Font family: [название]
- Base size: [значение]

Spacing:
- Base: [значение]

Примени эту тему к компоненту [название].
```

**Пример для Material-UI:**
```
Создай кастомную тему для Material-UI:

Colors:
- Primary: #7C3AED (фиолетовый)
- Secondary: #F59E0B (оранжевый)
- Error: #EF4444 (красный)

Typography:
- Font family: 'Poppins', sans-serif
- Base size: 16px
- H1: 48px, bold

Spacing:
- Base: 8px

Примени эту тему к компоненту Dashboard.
```

**Claude Code ответит:**
```jsx
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#7C3AED' },
    secondary: { main: '#F59E0B' },
    error: { main: '#EF4444' },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 16,
    h1: {
      fontSize: 48,
      fontWeight: 700,
    },
  },
  spacing: 8,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
```

---

#### Шаблон 3: Создание компонента согласно Design System

```
📝 PROMPT:
Создай компонент [название] согласно правилам [Design System].

Функциональность:
[Описание что делает]

Design Tokens:
- Colors: [токены цветов]
- Spacing: [токены отступов]
- Typography: [токены типографики]
- Shadows: [токены теней]

Accessibility:
- ARIA labels: [какие нужны]
- Keyboard navigation: [как работает]
```

**Пример:**
```
Создай компонент UserCard согласно правилам Material Design.

Функциональность:
- Показывает аватар, имя, email пользователя
- При hover показывает кнопку "View Profile"

Design Tokens:
- Colors: primary, text.primary, text.secondary
- Spacing: theme.spacing(2, 3)
- Typography: h6 для имени, body2 для email
- Shadows: elevation 2 default, elevation 4 on hover

Accessibility:
- ARIA label для кнопки
- Keyboard: кнопка доступна через Tab
```

---

#### Шаблон 4: Миграция на Design System

```
📝 PROMPT:
Мигрируй компонент [название] с обычного CSS на [Design System].

Текущий код:
[Твой код]

Замени:
- Хардкоженные цвета → Design Tokens
- Обычные кнопки → Компоненты системы
- Inline стили → Theme props
```

**Пример:**
```
Мигрируй компонент LoginForm с обычного CSS на Chakra UI.

Текущий код:
<form style={{ maxWidth: '400px', margin: '0 auto', padding: '24px' }}>
  <input type="email" style={{ width: '100%', padding: '12px', border: '1px solid #ccc' }} />
  <button style={{ background: '#007BFF', color: 'white', padding: '12px 24px' }}>
    Login
  </button>
</form>

Замени:
- Inline стили → Chakra style props
- <input> → <Input> компонент
- <button> → <Button> компонент
- Используй Stack для layout
```

---

## 🏗️ Создание простой Design System

### Минимальная Design System — что нужно

**Базовый набор:**
```
MINIMAL DESIGN SYSTEM

1. Design Tokens
   ├── Colors (primary, secondary, neutral)
   ├── Spacing (4px scale)
   ├── Typography (2-3 sizes)
   └── Shadows (2 levels)

2. Base Components (Atoms)
   ├── Button
   ├── Input
   ├── Text
   └── Card

3. Documentation
   ├── How to use each component
   └── Code examples
```

---

### Пример: Создание простой Design System

**Шаг 1: Определить Design Tokens**

```css
/* tokens.css */
:root {
  /* Colors */
  --color-primary: #7C3AED;
  --color-primary-dark: #6D28D9;
  --color-secondary: #F59E0B;
  --color-text: #1F2937;
  --color-text-light: #6B7280;
  --color-background: #FFFFFF;
  --color-border: #E5E7EB;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Typography */
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

**Шаг 2: Создать базовые компоненты**

```jsx
// components/Button.jsx
import './Button.css';

function Button({
  children,
  variant = 'primary',  // primary | secondary | outline
  size = 'medium',      // small | medium | large
  onClick
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
```

```css
/* components/Button.css */
.btn {
  /* Base styles */
  font-family: inherit;
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 150ms ease;
}

/* Sizes */
.btn--small {
  font-size: var(--font-size-sm);
  padding: var(--space-2) var(--space-3);
}

.btn--medium {
  font-size: var(--font-size-base);
  padding: var(--space-3) var(--space-4);
}

.btn--large {
  font-size: var(--font-size-lg);
  padding: var(--space-4) var(--space-6);
}

/* Variants */
.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--primary:hover {
  background: var(--color-primary-dark);
}

.btn--secondary {
  background: var(--color-secondary);
  color: white;
}

.btn--outline {
  background: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn--outline:hover {
  background: var(--color-primary);
  color: white;
}
```

**Шаг 3: Документировать**

```markdown
# Button Component

## Usage

```jsx
import { Button } from '@/components';

<Button variant="primary" size="medium" onClick={handleClick}>
  Click me
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' | 'primary' | Button style variant |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Button size |
| onClick | function | - | Click handler |

## Examples

### Primary Button
<Button variant="primary">Primary</Button>

### Secondary Button
<Button variant="secondary">Secondary</Button>

### Outline Button
<Button variant="outline">Outline</Button>

### Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

---

### Промпт для Claude Code: Создать Design System

```
📝 PROMPT:
Создай простую Design System для моего проекта [название].

Design Tokens:
- Primary color: #7C3AED
- Secondary color: #F59E0B
- Spacing base: 8px
- Font: Inter
- Type scale ratio: 1.25

Компоненты:
1. Button (variants: primary, secondary, outline)
2. Input (with label and error state)
3. Card (with shadow)

Структура файлов:
/design-system
  /tokens
    colors.css
    spacing.css
    typography.css
  /components
    Button.jsx + Button.css
    Input.jsx + Input.css
    Card.jsx + Card.css
  /docs
    button.md
    input.md
    card.md

Создай все файлы с полным кодом.
```

**Claude Code создаст полную структуру с рабочим кодом!**

---

## 🎓 Практика: Примеры использования

### Пример 1: Dashboard с Material-UI

**Промпт:**
```
Создай компонент Dashboard используя Material-UI:

Layout:
- AppBar сверху (с заголовком и user menu)
- Drawer слева (с навигацией)
- Основная область с Grid из Card'ов

Cards показывают метрики:
- Total Users: 1,234
- Revenue: $45,678
- Active Sessions: 567

Используй:
- theme.spacing() для отступов
- theme.palette.primary для цветов
- Grid с spacing={3}
- Card с elevation={2}
```

**Результат:**
```jsx
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItem,
  Grid, Card, CardContent, Box
} from '@mui/material';

function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">My Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: 240 }}>
        <Toolbar /> {/* Spacer */}
        <List>
          <ListItem button>Dashboard</ListItem>
          <ListItem button>Users</ListItem>
          <ListItem button>Settings</ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Spacer */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary">Total Users</Typography>
                <Typography variant="h4">1,234</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary">Revenue</Typography>
                <Typography variant="h4">$45,678</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={2}>
              <CardContent>
                <Typography color="textSecondary">Active Sessions</Typography>
                <Typography variant="h4">567</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
```

---

### Пример 2: Form с Chakra UI

**Промпт:**
```
Создай форму регистрации с Chakra UI:

Поля:
- Full Name
- Email
- Password
- Confirm Password

Validation:
- Все поля обязательные
- Email должен быть валидным
- Password минимум 8 символов
- Passwords должны совпадать

Используй:
- FormControl + FormLabel + Input
- FormErrorMessage для ошибок
- Button с isLoading state
- Stack для layout
- useForm из react-hook-form
```

**Результат:**
```jsx
import {
  Box, Stack, FormControl, FormLabel, Input,
  FormErrorMessage, Button, Heading
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <Box maxW="400px" mx="auto" p={6}>
      <Heading mb={6}>Register</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>

          <FormControl isInvalid={errors.fullName}>
            <FormLabel>Full Name</FormLabel>
            <Input
              {...register('fullName', {
                required: 'Full name is required'
              })}
            />
            <FormErrorMessage>
              {errors.fullName?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            <FormErrorMessage>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
            />
            <FormErrorMessage>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: value =>
                  value === watch('password') || 'Passwords do not match'
              })}
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            isLoading={isSubmitting}
          >
            Register
          </Button>

        </Stack>
      </form>
    </Box>
  );
}
```

---

## ✅ Чек-лист: Работа с Design System

### При выборе Design System для проекта:

**Оцени проект:**
- [ ] Тип проекта (landing page / web app / admin panel / e-commerce)
- [ ] Размер команды (solo / small team / large organization)
- [ ] Требования к кастомизации (стандартный вид OK / нужен уникальный дизайн)
- [ ] Требования к accessibility (базовая / критична)

**Выбери подходящую систему:**
- [ ] **Material-UI** — если нужно быстро, много компонентов, OK с Google-стилем
- [ ] **Ant Design** — если enterprise app, сложные таблицы/формы
- [ ] **Chakra UI** — если нужна гибкость, современный вид, важна a11y
- [ ] **Bootstrap** — если legacy проект или нужна максимальная совместимость
- [ ] **Tailwind** — если нужна полная кастомизация, готов создавать компоненты с нуля

### При использовании Design System в коде:

- [ ] Прочитал документацию компонентов, которые буду использовать
- [ ] Знаю какие props/variants доступны
- [ ] Использую design tokens вместо хардкоженных значений
- [ ] Следую spacing scale системы
- [ ] Использую typography tokens
- [ ] Не переопределяю стили без крайней необходимости

### При создании своей Design System:

- [ ] Определил design tokens (colors, spacing, typography)
- [ ] Создал базовые компоненты (Button, Input, Card)
- [ ] Написал документацию с примерами
- [ ] Компоненты переиспользуемые (не хардкожу значения)
- [ ] Компоненты доступны (keyboard navigation, ARIA)

---

## 🚀 Следующие шаги

Ты узнал про Design Systems, Atomic Design, Design Tokens и популярные системы. В следующих уроках:

- **Урок 2.4:** Component Libraries — готовые библиотеки компонентов (Radix UI, Headless UI)
- **Урок 2.5:** Handoff Process — как передавать дизайн из Figma в разработку
- **Урок 2.6:** Prompting with Artifacts — мастер-класс промптинга с артефактами

---

## 📝 Резюме

**Ключевые концепции:**

1. **Design System ≠ Style Guide**
   - Style Guide — правила дизайна
   - Design System — правила + готовые компоненты + документация

2. **Atomic Design** — методология создания дизайн-систем
   - ⚛️ Atoms → 🧪 Molecules → 🦠 Organisms → 📄 Templates → 🖼️ Pages

3. **Design Tokens** — переменные с именами для дизайн-значений
   - Colors, Spacing, Typography, Shadows, Border Radius
   - `var(--color-primary)` вместо `#007BFF`

4. **Популярные системы:**
   - Material-UI — самая популярная, Google-стиль
   - Ant Design — enterprise, много компонентов
   - Chakra UI — современная, гибкая, a11y
   - Bootstrap — legacy, большое community
   - Tailwind — utility-first, максимальная кастомизация

5. **Vibe Coding с Design Systems:**
   - Указывай конкретную систему в промптах
   - Используй названия компонентов из документации
   - Ссылайся на design tokens
   - Показывай примеры кода из документации

**Главное:**
> Design System ускоряет разработку в 2-3 раза и гарантирует консистентность дизайна автоматически.

---

## 🔗 Полезные ресурсы

**Design Systems:**
- **Material Design** - https://material.io/design
- **Ant Design** - https://ant.design
- **Chakra UI** - https://chakra-ui.com
- **Tailwind CSS** - https://tailwindcss.com

**React библиотеки:**
- **Material-UI (MUI)** - https://mui.com
- **Ant Design React** - https://ant.design/docs/react/introduce
- **Chakra UI** - https://chakra-ui.com
- **React Bootstrap** - https://react-bootstrap.github.io

**Инструменты:**
- **Design Tokens** - https://www.designtokens.org
- **Atomic Design** - https://atomicdesign.bradfrost.com
- **Component Driven** - https://componentdriven.org

**Примеры Design Systems:**
- **Airbnb Design** - https://airbnb.design
- **Shopify Polaris** - https://polaris.shopify.com
- **IBM Carbon** - https://carbondesignsystem.com
- **Atlassian Design** - https://atlassian.design

---

**Готов к следующему уроку?** → Переходи к **Lesson 2.4: Component Libraries**
