# Урок 2.2: Wireframes, Mockups, and Prototypes (Вайрфреймы, Макеты и Прототипы)

> **Модуль 2:** Artifacts
> **Урок:** 2.2
> **Длительность:** 45-60 минут
> **Prerequisite:** Урок 2.1 (What are Design Artifacts)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Различать Wireframe, Mockup и Prototype (в чём разница)
- ✅ Понимать когда использовать каждый тип артефакта
- ✅ Создавать простые wireframes в ASCII для промптов
- ✅ Формулировать задачи для Claude Code с использованием разных артефактов
- ✅ Понимать уровни детализации (low-fi, mid-fi, high-fi)
- ✅ Избегать типичных ошибок при работе с артефактами

---

## 📖 Ключевая концепция: Fidelity (Детализация)

### Что такое Fidelity?

**Fidelity (детализация)** — это уровень реалистичности и проработанности артефакта.

```
LOW FIDELITY          MID FIDELITY           HIGH FIDELITY
(Lo-Fi)               (Mid-Fi)               (Hi-Fi)

[Button]       →      [═══Button═══]    →    [🔵 Beautiful Button]
Схематично            Полу-детально          Реалистично

⏱️ Быстро             ⏱️ Средне              ⏱️ Долго
💰 Дёшево             💰 Средне              💰 Дорого
✏️ Легко менять       ✏️ Сложнее             ✏️ Трудно менять
```

**Ключевое правило:**
> Начинай с Lo-Fi → переходи к Hi-Fi по мере уточнения требований

**Почему это важно:**
- Изменения в Lo-Fi → 5 минут
- Изменения в Hi-Fi → часы работы
- Ошибка найденная в Lo-Fi → дёшево исправить
- Ошибка найденная в Hi-Fi → дорого переделывать

---

## 🏗️ Аналогия: Ресторан

Представь, что ты открываешь ресторан:

```
📝 МЕНЮ (Wireframe)        🎨 ДИЗАЙН МЕНЮ (Mockup)      🍽️ ДЕГУСТАЦИЯ (Prototype)

Закуски:                   ╔════════════════╗            Вы пробуете:
- Салат                    ║   ЗАКУСКИ      ║            ✅ Салат "Цезарь"
- Суп                      ║                ║            → Вкус, подача
                           ║ 🥗 Салат Цезарь║            → Температура
Основное:                  ║    350₽        ║            → Размер порции
- Стейк                    ║                ║
- Паста                    ║ 🍜 Томатный суп║            "Нужно больше
                           ║    250₽        ║            соли, меньше
Десерты:                   ║                ║            порция"
- Тирамису                 ╚════════════════╝
```

**Wireframe** = список блюд (что есть)
**Mockup** = красивое меню с фото (как выглядит)
**Prototype** = дегустация (как работает/ощущается)

---

## 📐 Часть 1: WIREFRAME (Вайрфрейм)

### Что такое Wireframe?

**Wireframe** — это схематичное изображение интерфейса, показывающее структуру и расположение элементов БЕЗ визуального дизайна.

**Характеристики:**
- ⬛ Черно-белый (или оттенки серого)
- 📦 Блоки и рамки вместо реальных элементов
- 📝 Простой текст (Lorem ipsum или реальный)
- ❌ НЕТ цветов, картинок, иконок, шрифтов
- ⚡ Быстро создаётся (минуты)

### Что показывает Wireframe?

✅ **Показывает:**
- Layout (расположение блоков)
- Иерархию элементов
- Навигацию
- Контент (что где находится)
- Размеры и пропорции блоков

❌ **НЕ показывает:**
- Цвета
- Реальные картинки
- Шрифты и типографику
- Тени, градиенты, эффекты
- Брендинг

---

### ASCII Wireframe Examples

#### Пример 1: Простая форма входа

```
┌──────────────────────────────┐
│                              │
│         [LOGO]               │
│                              │
│    Welcome Back!             │
│                              │
│    Email                     │
│    [____________________]    │
│                              │
│    Password                  │
│    [____________________]    │
│                              │
│    [ ] Remember me           │
│                              │
│    [═══════Login═══════]     │
│                              │
│    Forgot password?          │
│                              │
│    Don't have an account?    │
│    Sign up                   │
│                              │
└──────────────────────────────┘
```

**Что видно:**
- Логотип сверху
- Заголовок
- 2 поля ввода
- Чекбокс
- Кнопка
- 2 ссылки

**Что НЕ видно:**
- Какого цвета кнопка
- Какой шрифт у заголовка
- Как выглядит логотип
- Какие иконки в полях

---

#### Пример 2: Dashboard с боковым меню

```
┌────────────────────────────────────────────────────────────┐
│ [☰ Logo]                                          [🔔] [👤] │ ← Header
├────────┬───────────────────────────────────────────────────┤
│        │                                                   │
│ Home   │  Dashboard Overview                              │
│ ───    │                                                   │
│        │  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│ Users  │  │  Total   │ │  Active  │ │   New    │         │
│        │  │  Users   │ │  Users   │ │  Users   │         │
│ Reports│  │          │ │          │ │          │         │
│        │  │  1,234   │ │   567    │ │   89     │         │
│ Settings│ └──────────┘ └──────────┘ └──────────┘         │
│        │                                                   │
│        │  Recent Activity                                 │
│        │  ─────────────────────────────────────────       │
│        │                                                   │
│        │  [Icon] User 1 registered                        │
│        │  [Icon] User 2 made a purchase                   │
│        │  [Icon] User 3 updated profile                   │
│        │  [Icon] User 4 logged in                         │
│        │                                                   │
│        │                            [View All →]          │
│        │                                                   │
└────────┴───────────────────────────────────────────────────┘
  200px    Remaining width
```

**Промпт для Claude Code:**
```
Создай React layout для dashboard приложения по этому wireframe:

Структура:
- Header (60px height): логотип слева, меню-бургер, иконки notifications и user справа
- Sidebar (200px width): вертикальное меню с пунктами Home, Users, Reports, Settings
- Main content area:
  - 3 карточки статистики (равной ширины, flex layout)
  - Секция "Recent Activity" со списком событий
  - Кнопка "View All" справа

Требования:
- Используй CSS Grid для общего layout
- Sidebar фиксированный
- Main content scrollable
- Responsive: на mobile sidebar скрывается в бургер-меню

Используй Material-UI компоненты.
```

---

#### Пример 3: E-commerce Product Page

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo]  Categories ▼  Search [____________]  [Cart] [User]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Home > Category > Product Name                                 │
│                                                                 │
│  ┌────────────────────┐  Product Name                          │
│  │                    │                                         │
│  │                    │  ★★★★☆ (42 reviews)                    │
│  │   Product Image    │                                         │
│  │                    │  Price: $99.99                          │
│  │                    │                                         │
│  │                    │  Color: ○ ○ ○                          │
│  └────────────────────┘  Size:  S  M  L  XL                    │
│  [img][img][img][img]                                           │
│                         Quantity: [-] 1 [+]                     │
│                                                                 │
│                         [═══ Add to Cart ═══]                   │
│                         [ Add to Wishlist  ]                    │
│                                                                 │
│  Description                                                    │
│  ──────────────────────────────────────────                    │
│  Lorem ipsum dolor sit amet, consectetur                        │
│  adipiscing elit. Sed do eiusmod tempor                         │
│  incididunt ut labore et dolore magna.                          │
│                                                                 │
│  Specifications                                                 │
│  ──────────────────────────────────────────                    │
│  - Material: Cotton                                             │
│  - Weight: 200g                                                 │
│  - Made in: USA                                                 │
│                                                                 │
│  Reviews (42)                                                   │
│  ──────────────────────────────────────────                    │
│  ★★★★★ John Doe                                                │
│  Great product! Highly recommend...                             │
│                                                                 │
│  ★★★★☆ Jane Smith                                              │
│  Good quality but...                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Типы Wireframes по детализации

#### 1. Low-Fi Wireframe (Минимальная детализация)

```
┌─────────────┐
│ [Logo] Menu │
├─────────────┤
│ Hero Image  │
│ [Button]    │
├─────────────┤
│ Feature 1   │
│ Feature 2   │
│ Feature 3   │
├─────────────┤
│ Footer      │
└─────────────┘
```

**Когда использовать:**
- ⚡ Brainstorming — быстрая генерация идей
- 💬 Первая встреча с клиентом
- 🤔 Не уверен в структуре — нужны варианты

**Преимущества:**
- Создаётся за 5-10 минут
- Легко сделать 10 вариантов
- Не отвлекает деталями

---

#### 2. Mid-Fi Wireframe (Средняя детализация)

```
┌─────────────────────────────────────────┐
│ [🏠 Logo]  Home  About  Contact  [Btn] │
├─────────────────────────────────────────┤
│                                         │
│  [===============================]      │
│  [   Hero Image Placeholder     ]      │
│  [===============================]      │
│                                         │
│  Main Heading Text                      │
│  Subheading description text            │
│                                         │
│  [═════ Call to Action ═════]           │
│                                         │
├─────────────────────────────────────────┤
│  Feature 1        Feature 2        F3   │
│  ──────────       ──────────       ──   │
│  [Icon]           [Icon]        [Icon]  │
│  Description      Description   Desc    │
│  text here        text here     text    │
└─────────────────────────────────────────┘
```

**Когда использовать:**
- 📋 Презентация клиенту для утверждения структуры
- 👥 Обсуждение с командой
- 📐 Передача задачи дизайнеру

**Преимущества:**
- Понятно что где находится
- Видны размеры и пропорции
- Можно обсуждать детали

---

#### 3. High-Fi Wireframe (Высокая детализация)

```
┌──────────────────────────────────────────────────────────────┐
│ [🏠 MyApp]  Home  Products  About  Contact    [Sign In]     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │                                                    │     │
│  │         Revolutionize Your Workflow                │     │
│  │         The all-in-one solution for teams          │     │
│  │                                                    │     │
│  │         [═══════ Get Started ═══════]              │     │
│  │         [      Learn More        ]                 │     │
│  │                                                    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Why Choose Us?                                              │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   [Icon]    │  │   [Icon]    │  │   [Icon]    │         │
│  │             │  │             │  │             │         │
│  │ Fast Setup  │  │   Secure    │  │  24/7 Support│        │
│  │             │  │             │  │             │         │
│  │ Get started │  │ Bank-level  │  │ We're here  │         │
│  │ in minutes  │  │ encryption  │  │ to help     │         │
│  │             │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                              │
│  Trusted by 10,000+ companies worldwide                      │
│                                                              │
│  [Logo] [Logo] [Logo] [Logo] [Logo]                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Когда использовать:**
- 🎨 Финальное утверждение перед mockup
- 💻 Передача в разработку (если нет дизайнера)
- 📱 Прототипирование UX-flow

**Преимущества:**
- Максимум информации о структуре
- Близко к финальному виду (без дизайна)
- Можно использовать вместо mockup для простых проектов

---

### Инструменты для создания Wireframe

| Инструмент | Тип | Цена | Особенности |
|-----------|-----|------|-------------|
| **Balsamiq** | Специализированный | $89/год | "Sketch style", быстро |
| **Figma** | Универсальный | Free/Paid | Лучший для команд |
| **Sketch** | Универсальный | $99/год | Mac only |
| **Adobe XD** | Универсальный | Free/Paid | Интеграция с Adobe |
| **Whimsical** | Специализированный | Free/Paid | Очень быстрый |
| **Paper + Pen** | Аналоговый | Free | Самый быстрый! |

**Рекомендация для начинающих:**
1. **Figma** (бесплатная) — для всего
2. **Whimsical** — для быстрых wireframes
3. **Paper + Pen** — для brainstorming

---

### Промпты Claude Code для Wireframe

#### Шаблон 1: Создание страницы по ASCII wireframe

```
📝 PROMPT TEMPLATE:

Создай React компонент для страницы [название] по этому wireframe:

[ASCII wireframe]

Требования:
- Используй [UI библиотека]
- Layout: [описание layout системы]
- Responsive: [breakpoints]
- Компоненты: [какие использовать]

Пока НЕ добавляй:
- Реальные стили (используй базовые)
- Картинки (используй placeholders)
- Сложную логику (только структура)
```

**Пример:**
```
Создай React компонент для страницы ProductCard по этому wireframe:

┌─────────────────────┐
│ [Image]             │
│                     │
│ Product Name        │
│ $99.99              │
│ ★★★★☆              │
│                     │
│ [Add to Cart]       │
└─────────────────────┘

Требования:
- Используй Material-UI
- Layout: CSS Flexbox, vertical direction
- Responsive: 300px width на mobile, 400px на desktop
- Компоненты: Card, Typography, Button, Rating

Пока НЕ добавляй:
- Реальные стили (используй базовые MUI)
- Картинки (используй placeholder.com)
- Логику добавления в корзину (только UI)
```

---

#### Шаблон 2: Преобразование описания в wireframe

```
📝 PROMPT TEMPLATE:

Создай ASCII wireframe для [тип страницы]:

Требования:
- [Элемент 1]
- [Элемент 2]
- [Элемент 3]

Layout:
- [Описание расположения]

Сначала нарисуй wireframe, потом спроси хочу ли я изменения.
```

**Пример:**
```
Создай ASCII wireframe для страницы регистрации:

Требования:
- Форма с полями: Email, Password, Confirm Password
- Кнопка Sign Up
- Ссылка на страницу Login
- Чекбокс "I agree to Terms"

Layout:
- Форма по центру экрана
- Logo сверху
- Все поля вертикально

Сначала нарисуй wireframe, потом спроси хочу ли я изменения.
```

---

## 🎨 Часть 2: MOCKUP (Макет)

### Что такое Mockup?

**Mockup** — это детальное статичное изображение интерфейса с финальным визуальным дизайном.

**Характеристики:**
- 🎨 Полноцветный (реальные цвета бренда)
- 🖼️ Реальные картинки (или близкие к реальным)
- 📝 Реальная типографика (шрифты, размеры, weights)
- ✨ Визуальные эффекты (тени, градиенты, скругления)
- 🎯 Pixel-perfect (точные размеры)
- ❌ НЕ кликабельный (статичная картинка)

### Что показывает Mockup?

✅ **Показывает:**
- Финальный визуальный вид
- Цветовую схему
- Типографику
- Брендинг
- Иконки и иллюстрации
- Тени, градиенты, эффекты
- Spacing (отступы)

❌ **НЕ показывает:**
- Интерактивность (hover, click)
- Анимации и переходы
- Как работает UX-flow
- Разные состояния (loading, error)

---

### Mockup vs Wireframe: Визуальное сравнение

```
WIREFRAME                          MOCKUP
─────────────────────────────────────────────────────────────

┌─────────────────┐               ╔═══════════════════╗
│ [Logo]          │               ║ 🎨 Beautiful Logo ║
├─────────────────┤               ╠═══════════════════╣
│ Welcome         │               ║ Welcome Back!     ║
│                 │               ║ (Roboto, 32px)    ║
│ Email:          │               ║                   ║
│ [___________]   │               ║ Email             ║
│                 │               ║ ┌───────────────┐ ║
│ Password:       │               ║ │ 📧            │ ║
│ [___________]   │               ║ └───────────────┘ ║
│                 │               ║                   ║
│ [Login]         │               ║ Password          ║
│                 │               ║ ┌───────────────┐ ║
└─────────────────┘               ║ │ 🔒            │ ║
                                  ║ └───────────────┘ ║
Схематично                        ║                   ║
Черно-белое                       ║ [🔵 Login →]     ║
Быстро (минуты)                   ║                   ║
                                  ╚═══════════════════╝

                                  Детальный дизайн
                                  Цвета: #007BFF, #FFF
                                  Шрифты: Roboto, Inter
                                  Тени, иконки, эффекты
                                  Долго (часы)
```

---

### Уровни детализации Mockup

#### 1. Low-Fi Mockup (базовый дизайн)

**Характеристики:**
- Основные цвета (primary, secondary)
- Базовая типографика
- Простые формы
- Минимум эффектов

**Когда использовать:**
- Быстрое A/B тестирование дизайна
- Проверка цветовой схемы
- Ранние итерации

**Пример описания для Claude:**
```
Цвета:
- Primary: #007BFF (синий)
- Secondary: #6C757D (серый)
- Background: #FFFFFF

Типографика:
- Заголовки: 24px, Bold
- Текст: 16px, Regular

Кнопки:
- Прямоугольные, 8px border-radius
- Primary color background
```

---

#### 2. Mid-Fi Mockup (проработанный дизайн)

**Характеристики:**
- Полная цветовая палитра
- Типографическая система
- Базовые UI-компоненты
- Некоторые эффекты (тени, hover)

**Когда использовать:**
- Утверждение дизайна с клиентом
- Передача в разработку
- База для Design System

**Пример описания для Claude:**
```
Цветовая палитра:
- Primary: #007BFF
- Primary Dark: #0056B3
- Primary Light: #66B3FF
- Secondary: #6C757D
- Success: #28A745
- Danger: #DC3545
- Background: #F8F9FA
- Surface: #FFFFFF

Типографика:
- H1: 32px, Bold, Letter-spacing: -0.5px
- H2: 24px, Bold
- Body: 16px, Regular, Line-height: 1.5
- Small: 14px, Regular

Кнопки:
- Border-radius: 8px
- Padding: 12px 24px
- Box-shadow: 0 2px 4px rgba(0,0,0,0.1)
- Hover: поднять на 2px, увеличить тень

Spacing:
- Small: 8px
- Medium: 16px
- Large: 24px
- XLarge: 32px
```

---

#### 3. High-Fi Mockup (финальный дизайн)

**Характеристики:**
- Pixel-perfect дизайн
- Все состояния (default, hover, active, disabled)
- Микро-анимации (в описании)
- Все edge cases
- Адаптивность (mobile, tablet, desktop)

**Когда использовать:**
- Финальная передача в разработку
- Документация дизайна
- Создание Design System

**Пример спецификации:**
```
Button Component - Primary Variant

Default State:
- Background: linear-gradient(135deg, #007BFF 0%, #0056B3 100%)
- Color: #FFFFFF
- Font: Inter, 16px, Weight: 600
- Padding: 12px 24px
- Border-radius: 8px
- Box-shadow: 0 4px 8px rgba(0,123,255,0.2)
- Transition: all 0.3s ease

Hover State:
- Background: linear-gradient(135deg, #0056B3 0%, #004085 100%)
- Transform: translateY(-2px)
- Box-shadow: 0 6px 12px rgba(0,123,255,0.3)

Active State:
- Transform: translateY(0)
- Box-shadow: 0 2px 4px rgba(0,123,255,0.2)

Disabled State:
- Background: #E9ECEF
- Color: #6C757D
- Cursor: not-allowed
- Box-shadow: none

Focus State:
- Outline: 2px solid #007BFF
- Outline-offset: 2px
```

---

### Создание Mockup: Пошаговый процесс

#### Шаг 1: От Wireframe к Style Guide

**Wireframe (есть):**
```
┌─────────────┐
│ [Button]    │
└─────────────┘
```

**Style Guide (создаём):**
```
Brand Colors:
- Primary: #FF6B6B (coral red)
- Secondary: #4ECDC4 (turquoise)
- Accent: #FFE66D (yellow)

Typography:
- Heading: "Poppins", Bold
- Body: "Inter", Regular
- Button: "Inter", SemiBold

Button Style:
- Large, rounded (16px radius)
- Primary color
- White text
- Subtle shadow
```

#### Шаг 2: Применяем стиль

**Mockup (результат):**
```
╔═════════════════════════════╗
║                             ║
║   [🔴 Call to Action 🚀]    ║
║                             ║
╚═════════════════════════════╝

CSS Specs:
background: #FF6B6B;
color: #FFFFFF;
font-family: 'Inter', sans-serif;
font-size: 18px;
font-weight: 600;
padding: 16px 32px;
border-radius: 16px;
box-shadow: 0 4px 12px rgba(255,107,107,0.3);
```

---

### Инструменты для создания Mockup

| Инструмент | Лучше для | Стоимость | Сложность |
|-----------|-----------|-----------|-----------|
| **Figma** | Всё | Free → $12/мес | ⭐⭐ Средняя |
| **Sketch** | Mac users | $99/год | ⭐⭐ Средняя |
| **Adobe XD** | Adobe экосистема | Free → $10/мес | ⭐⭐⭐ Высокая |
| **Adobe Photoshop** | Детальный дизайн | $21/мес | ⭐⭐⭐⭐ Очень высокая |
| **Canva** | Быстрые mockups | Free → $13/мес | ⭐ Легко |

**Рекомендация:**
- **Новичок** → Canva (легко, красиво)
- **Профи** → Figma (индустриальный стандарт)
- **Mac only** → Sketch (быстрый, мощный)

---

### Промпты Claude Code для Mockup

#### Шаблон 1: Реализация детального mockup

```
📝 PROMPT TEMPLATE:

Реализуй этот mockup в React:

[Описание или ссылка на изображение]

Точные спецификации:

COLORS:
- [Element]: [Hex color]
- [Element]: [Hex color]

TYPOGRAPHY:
- [Element]: [Font family], [Size], [Weight]
- [Element]: [Font family], [Size], [Weight]

SPACING:
- [Element]: [Padding/Margin values]

EFFECTS:
- [Element]: [Box-shadow, border-radius, etc]

STATES:
- Hover: [изменения]
- Active: [изменения]
- Disabled: [изменения]

Используй [UI библиотека] и кастомизируй под эти спеки.
```

**Пример:**
```
Реализуй кнопку Hero CTA в React:

COLORS:
- Background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%)
- Text: #FFFFFF

TYPOGRAPHY:
- Font: 'Inter', sans-serif
- Size: 18px
- Weight: 600
- Letter-spacing: 0.5px

SPACING:
- Padding: 16px 48px
- Margin: 0

EFFECTS:
- Border-radius: 12px
- Box-shadow: 0 8px 16px rgba(102,126,234,0.3)
- Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

STATES:
- Hover:
  - Transform: translateY(-2px)
  - Box-shadow: 0 12px 24px rgba(102,126,234,0.4)
- Active:
  - Transform: translateY(0)
  - Box-shadow: 0 4px 8px rgba(102,126,234,0.3)

Используй styled-components.
```

---

#### Шаблон 2: Создание по референсу

```
📝 PROMPT TEMPLATE:

Создай компонент похожий на [известный сайт/сервис]:

Референс: [описание или скриншот]

Стиль:
- Цветовая схема: [описание]
- Настроение: [minimalist/playful/professional/etc]
- Типографика: [sans-serif/serif/monospace]

Адаптируй под наш бренд:
- Цвета: [наши цвета]
- Логотип: [описание]

НЕ копируй полностью, вдохновись концепцией.
```

**Пример:**
```
Создай Hero секцию похожую на Stripe.com:

Референс: чистый, минималистичный дизайн с градиентной сеткой на фоне

Стиль:
- Цветовая схема: светлый фон с тонким фиолетовым градиентом
- Настроение: professional, modern, tech-forward
- Типографика: крупные sans-serif заголовки, легко читаемый body text

Адаптируй под наш бренд:
- Цвета: primary #FF6B6B, secondary #4ECDC4
- Логотип: текстовый "MyApp" с иконкой ракеты

Элементы:
- Заголовок: крупный, bold
- Подзаголовок: описание продукта
- 2 кнопки: Primary CTA, Secondary (Learn More)
- Фон: тонкая сетка или геометрический паттерн

НЕ копируй Stripe, вдохновись их чистотой и простотой.
```

---

## 🎬 Часть 3: PROTOTYPE (Прототип)

### Что такое Prototype?

**Prototype** — это интерактивный mockup, имитирующий работу реального интерфейса.

**Характеристики:**
- 🖱️ Кликабельный (можно нажимать кнопки)
- 🔄 Переходы между экранами
- ✨ Анимации и transitions
- 📱 Интерактивные элементы (hover, scroll)
- ❌ НЕ настоящий код (имитация)
- ❌ НЕ подключен к backend

### Что показывает Prototype?

✅ **Показывает:**
- User flow (как пользователь проходит путь)
- Интерактивность (что происходит при клике)
- Анимации и transitions
- Микро-взаимодействия
- Navigation (навигация между экранами)
- Edge cases (error states, loading)

❌ **НЕ показывает:**
- Реальную работу с данными
- Реальную производительность
- Реальную логику (только имитация)

---

### Уровни детализации Prototype

#### 1. Low-Fi Prototype (кликабельный wireframe)

**Характеристики:**
- Базовые переходы между экранами
- Простые кнопки (кликабельные)
- Минимум анимаций
- Фокус на UX-flow

**Когда использовать:**
- ⚡ Быстрая проверка UX-flow
- 🧪 Ранее тестирование на пользователях
- 💬 Обсуждение навигации

**Пример flow:**
```
Screen 1: Login          Click [Login] →      Screen 2: Dashboard
┌─────────────┐                              ┌─────────────┐
│ Email: [__] │                              │ Welcome!    │
│ Pass:  [__] │          Transition:         │             │
│             │          Simple fade         │ [Content]   │
│ [Login]     │ ─────────────────────────→  │             │
└─────────────┘                              └─────────────┘
```

---

#### 2. Mid-Fi Prototype (интерактивный mockup)

**Характеристики:**
- Детальный дизайн (как mockup)
- Все основные переходы
- Базовые анимации
- Hover эффекты
- Loading states

**Когда использовать:**
- 🎯 Презентация клиенту/инвесторам
- 🧪 Детальное UX-тестирование
- 📋 Брифинг команды разработки

**Пример взаимодействия:**
```
State 1: Default          State 2: Hover          State 3: Clicked
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│ [Button]     │   →     │ [Button]     │    →    │ Loading...   │
│              │  hover  │ (lifted)     │  click  │ [Spinner]    │
└──────────────┘         └──────────────┘         └──────────────┘
                         ↑ color change           ↓
                         ↑ shadow increase        ↓
                                                  State 4: Success
                                                  ┌──────────────┐
                                                  │ ✅ Success!  │
                                                  │              │
                                                  └──────────────┘
```

---

#### 3. High-Fi Prototype (почти готовое приложение)

**Характеристики:**
- Полный UX-flow (все экраны)
- Все состояния (success, error, loading, empty)
- Сложные анимации
- Микро-интеракции
- Реалистичные данные
- Адаптивность (разные устройства)

**Когда использовать:**
- 🚀 Финальная демонстрация перед разработкой
- 💰 Привлечение инвестиций
- 📊 Масштабное UX-тестирование

**Пример полного flow:**
```
[Landing Page]
     ↓ Click "Sign Up"
[Registration Form]
     ↓ Fill form + Submit
[Loading State]
     ↓ Success
[Welcome Email Sent]
     ↓ Confirm email (click link)
[Email Confirmed]
     ↓ Redirect
[Onboarding Step 1]
     ↓ Next
[Onboarding Step 2]
     ↓ Next
[Onboarding Step 3]
     ↓ Complete
[Dashboard - First Time]
     ↓ Tutorial overlay
[Dashboard - Normal]
```

---

### Типы Prototype по способу реализации

#### 1. Click-through Prototype (переходы между экранами)

**Описание:**
- Связанные между собой mockup'ы
- Кликабельные hotspots
- Простые transitions

**Инструменты:**
- Figma (Smart Animate)
- InVision
- Marvel App

**Пример в Figma:**
```
Frame 1: Login               Frame 2: Dashboard
┌─────────────┐              ┌─────────────┐
│ [Button] ────────────────→ │ Dashboard   │
└─────────────┘              └─────────────┘
    ↑
    └─ Hotspot: onclick navigate to Frame 2
```

---

#### 2. Interactive Prototype (с логикой)

**Описание:**
- Условные переходы (if/else)
- Переменные и state
- Формы с валидацией
- Динамический контент

**Инструменты:**
- Figma (Variables & Conditional logic)
- ProtoPie
- Framer

**Пример логики:**
```
IF email is empty
  THEN show error "Email required"
ELSE IF password is empty
  THEN show error "Password required"
ELSE IF password.length < 8
  THEN show error "Password too short"
ELSE
  THEN navigate to Dashboard
```

---

#### 3. Code Prototype (настоящий код)

**Описание:**
- React/Vue/HTML компоненты
- Реальные анимации (CSS/JS)
- Может быть подключен к mock API
- Переиспользуется в production

**Инструменты:**
- React + Storybook
- CodeSandbox
- Framer (export to React)

**Преимущества:**
- Максимально близко к реальности
- Можно тестировать производительность
- Легко переносится в production

**Недостатки:**
- Требует навыков программирования
- Дольше создавать
- Сложнее вносить изменения

---

### Промпты Claude Code для Prototype

#### Шаблон 1: Создание интерактивного прототипа

```
📝 PROMPT TEMPLATE:

Создай интерактивный React прототип для [feature]:

Экраны:
1. [Screen 1] - [описание]
2. [Screen 2] - [описание]
3. [Screen 3] - [описание]

User Flow:
[Screen 1] → (action) → [Screen 2] → (action) → [Screen 3]

Интерактивность:
- [Element]: onClick → [действие]
- [Element]: onChange → [действие]
- [Element]: onHover → [эффект]

Анимации:
- Переходы между экранами: [тип transition]
- Появление элементов: [анимация]
- Loading states: [spinner/skeleton]

Используй:
- React + React Router (для навигации)
- Framer Motion (для анимаций)
- Mock data (не реальный API)

Это прототип, НЕ production код.
```

**Пример:**
```
Создай интерактивный React прототип для Shopping Cart flow:

Экраны:
1. Product List - список товаров с кнопками "Add to Cart"
2. Cart - корзина с товарами и кнопкой "Checkout"
3. Checkout Success - подтверждение заказа

User Flow:
[Product List] → (click Add to Cart) → (cart badge updates) → (click Cart icon) → [Cart] → (click Checkout) → [Success]

Интерактивность:
- Product Card: onClick "Add to Cart" → добавить в state + показать badge
- Cart Icon: onClick → navigate to Cart page
- Cart Item: onClick "Remove" → удалить из state
- Checkout Button: onClick → navigate to Success page

Анимации:
- Переходы между экранами: fade + slide
- Добавление в корзину: scale + bounce эффект на badge
- Loading при checkout: spinner 2 секунды → success

Используй:
- React + React Router
- Framer Motion
- Mock data: 5 товаров (название, цена, картинка)
- Context API для cart state

Это прототип для демонстрации UX, НЕ production код.
```

---

#### Шаблон 2: Прототип с различными состояниями

```
📝 PROMPT TEMPLATE:

Создай прототип компонента [название] со всеми состояниями:

Состояния:
1. Default - [описание]
2. Loading - [описание]
3. Success - [описание]
4. Error - [описание]
5. Empty - [описание]

Переключение состояний:
- Кнопки для ручного переключения (для демонстрации)
- Автоматические transitions

Анимации между состояниями:
- [State 1] → [State 2]: [transition]
- [State 2] → [State 3]: [transition]

Используй Storybook для демонстрации всех состояний.
```

**Пример:**
```
Создай прототип компонента Data Table со всеми состояниями:

Состояния:
1. Default - таблица с данными (5 строк mock data)
2. Loading - skeleton loader (3 мерцающих строки)
3. Success - данные загружены, анимация появления
4. Error - сообщение об ошибке + кнопка "Retry"
5. Empty - "No data available" + иллюстрация

Переключение состояний:
- Кнопки сверху: [Loading] [Success] [Error] [Empty]
- "Retry" button в Error state → Loading → Success

Анимации:
- Loading → Success: skeleton fade out, данные fade in
- Default → Error: shake animation
- Empty → Loading: fade transition

Mock Data:
- 5 пользователей: name, email, role

Используй:
- React + TypeScript
- React Query (для имитации async загрузки)
- Framer Motion
```

---

## 📊 Сравнение: Wireframe vs Mockup vs Prototype

### Таблица сравнения

| Критерий | Wireframe | Mockup | Prototype |
|---------|-----------|---------|-----------|
| **Fidelity** | Low | High | High |
| **Детализация дизайна** | ❌ Минимальная | ✅ Полная | ✅ Полная |
| **Цвета** | ❌ Нет (ч/б) | ✅ Да | ✅ Да |
| **Интерактивность** | ❌ Нет | ❌ Нет | ✅ Да |
| **Время создания** | ⚡ Минуты | 🕐 Часы | 🕐🕐 Дни |
| **Стоимость изменений** | 💰 Очень низкая | 💰💰 Средняя | 💰💰💰 Высокая |
| **Цель** | Структура | Визуал | UX-flow |
| **Для кого** | Команда | Клиент | Пользователи |
| **Когда использовать** | Brainstorming | Презентация | Тестирование |

---

### Выбор правильного артефакта

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Вопрос: Что тебе нужно проверить?                          │
│                                                             │
│  ┌─────────────────┐  ┌────────────────┐  ┌──────────────┐ │
│  │ СТРУКТУРА       │  │ ВИЗУАЛ         │  │ UX-FLOW      │ │
│  │ Layout          │  │ Цвета          │  │ Навигация    │ │
│  │ Hierarchy       │  │ Шрифты         │  │ Интеракции   │ │
│  │ Content         │  │ Стиль          │  │ Анимации     │ │
│  │                 │  │ Брендинг       │  │ User Journey │ │
│  │                 │  │                │  │              │ │
│  │    ↓            │  │    ↓           │  │    ↓         │ │
│  │ WIREFRAME       │  │ MOCKUP         │  │ PROTOTYPE    │ │
│  └─────────────────┘  └────────────────┘  └──────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Когда использовать что?

#### Сценарий 1: Новый проект с нуля

```
Week 1:  Wireframes (структура всех экранов)
         ↓ Утверждение структуры
Week 2:  Mockups ключевых экранов (Homepage, Dashboard)
         ↓ Утверждение дизайна
Week 3:  Prototype основного user flow
         ↓ UX-тестирование
Week 4+: Development
```

---

#### Сценарий 2: Улучшение существующего feature

```
Есть проблема с UX

    ↓

Wireframe новой версии (быстро набросать идеи)

    ↓ Выбрать лучшую идею

Mockup с новым дизайном

    ↓ Утвердить с командой

Prototype (если сложные интеракции)

    ↓ Протестировать

Development
```

---

#### Сценарий 3: Маленький проект (MVP)

```
Быстрый вариант:

Wireframe → Development
           ↓
           Использовать готовую UI-библиотеку (Material-UI, Chakra UI)
```

---

#### Сценарий 4: Большой корпоративный проект

```
Полный цикл:

1. Lo-Fi Wireframes (все экраны) - 1 неделя
2. Утверждение со stakeholders
3. Hi-Fi Mockups (все экраны) - 2-3 недели
4. Design System создание
5. Interactive Prototype (ключевые flows) - 1-2 недели
6. UX-тестирование с реальными пользователями
7. Итерации на основе feedback
8. Финальное утверждение
9. Development (используя Design System)
```

---

## ⚠️ Типичные ошибки и как их избежать

### Ошибка 1: Сразу в High-Fi

❌ **Неправильно:**
```
Идея → Сразу детальный Mockup в Figma
       ↓
       Клиент: "А давайте всё по-другому"
       ↓
       😭 Переделывать 20 часов работы
```

✅ **Правильно:**
```
Идея → Lo-Fi Wireframe (30 минут)
       ↓
       Клиент: "Давайте по-другому"
       ↓
       😊 Переделать за 10 минут
       ↓ Утвердили
       Mockup (уже финальная версия)
```

---

### Ошибка 2: Wireframe слишком детальный

❌ **Неправильно:**
```
Тратить 3 часа на идеальный wireframe
- Точные размеры
- Выбор шрифтов
- Подбор картинок
```

✅ **Правильно:**
```
Простой схематичный wireframe за 15 минут
- Блоки и рамки
- Placeholder текст
- Фокус на layout
```

**Правило:**
> Wireframe должен быть некрасивым. Если он красивый — ты тратишь слишком много времени.

---

### Ошибка 3: Mockup без системы

❌ **Неправильно:**
```
Каждый элемент дизайнить отдельно
- Кнопка 1: border-radius 8px
- Кнопка 2: border-radius 12px (забыл про первую)
- Отступы: random (8px, 12px, 15px, 20px...)
```

✅ **Правильно:**
```
Создать систему СНАЧАЛА
- Border-radius: 8px (везде)
- Spacing: 8px, 16px, 24px, 32px (кратно 8)
- Цвета: 5 основных (не 50 оттенков)
```

---

### Ошибка 4: Prototype вместо MVP

❌ **Неправильно:**
```
Тратить месяц на детальный prototype
со всеми анимациями и микро-интеракциями

Вместо того чтобы...
```

✅ **Правильно:**
```
Сделать простой MVP в коде за неделю
и протестировать на реальных пользователях
```

**Правило:**
> Prototype нужен когда тестировать реальный код слишком дорого. Для MVP часто проще написать код, чем прототип.

---

### Ошибка 5: Не показывать все состояния

❌ **Неправильно:**
```
Mockup показывает только default state
- Кнопка: [Submit]

Разработчик: "А что при hover? При disabled? При loading?"
```

✅ **Правильно:**
```
Mockup всех состояний:
- Default:  [Submit]
- Hover:    [Submit] (поднята, светлее)
- Active:   [Submit] (нажата)
- Loading:  [⏳ Submitting...]
- Disabled: [Submit] (серая)
```

---

## 🎯 Практические примеры: AI Learning Agent

### Пример 1: Lesson Viewer (прогрессия от Wireframe до Prototype)

#### Шаг 1: Lo-Fi Wireframe (структура)

```
┌────────────────────────────────────────────────┐
│ [☰] AI Learning Agent              [User ▼]   │
├──────┬────────────────────────────┬────────────┤
│      │                            │            │
│ Nav  │  Lesson Title              │ Claude AI  │
│      │  ──────────────            │            │
│ > M1 │                            │ Ask me...  │
│   L1 │  ## Section 1              │            │
│   L2 │  Text content...           │ [________] │
│   L3 │                            │            │
│      │  ```code```                │ [Send]     │
│ > M2 │                            │            │
│   L1 │  ## Section 2              │            │
│      │  More content...           │            │
│      │                            │            │
│      │  [◀ Previous] [Next ▶]     │            │
└──────┴────────────────────────────┴────────────┘
```

**Промпт для Claude:**
```
Создай three-column layout для образовательной платформы по этому wireframe:

[ASCII схема выше]

Требования:
- React + CSS Grid
- Left sidebar: 250px фиксированная ширина
- Right sidebar: 350px фиксированная ширина
- Center: flex (оставшееся пространство)
- Mobile: sidebars скрываются в бургер-меню

Пока используй только базовые стили.
```

---

#### Шаг 2: Mockup (визуальный дизайн)

**Design Specs:**
```
COLORS:
- Primary: #3B82F6 (blue)
- Secondary: #8B5CF6 (purple)
- Background: #F9FAFB
- Surface: #FFFFFF
- Text: #1F2937
- Text Secondary: #6B7280

LEFT SIDEBAR:
- Background: #1F2937 (dark)
- Text: #F9FAFB
- Active item: #3B82F6 background
- Hover: rgba(59, 130, 246, 0.1)

MAIN CONTENT:
- Background: #FFFFFF
- Max-width: 800px
- Padding: 48px
- Typography:
  - H1: 32px, bold, #1F2937
  - H2: 24px, semibold, #1F2937
  - Body: 16px, regular, #4B5563
  - Code: Monaco, 14px, #F9FAFB bg

RIGHT SIDEBAR (Claude Chat):
- Background: #F9FAFB
- Chat bubble (user): #3B82F6, white text
- Chat bubble (AI): #FFFFFF, dark text
- Input: border #E5E7EB, focus #3B82F6

BUTTONS:
- Primary: #3B82F6, white text, 8px radius
- Hover: #2563EB
- Previous/Next: outline style

SHADOWS:
- Sidebar: none
- Main content: 0 1px 3px rgba(0,0,0,0.1)
- Chat bubbles: 0 1px 2px rgba(0,0,0,0.05)
```

**Промпт для Claude:**
```
Обнови layout с этими дизайн-спеками:

[Вся секция Design Specs выше]

Используй:
- Styled-components
- Кастомный компонент Sidebar с темной темой
- Markdown renderer для контента урока
- Chat компонент с bubble стилем

Добавь:
- Smooth scrolling
- Syntax highlighting для code blocks (prism.js)
- Responsive: breakpoint 1024px
```

---

#### Шаг 3: Prototype (интерактивность)

**Interaction Specs:**
```
NAVIGATION:
- Click на Module → expand/collapse уроки
- Click на Lesson → загрузить урок (fade transition)
- Active lesson: подсвечен синим

CHAT:
- Type message + Enter → отправить
- Message появляется с animation (slide up)
- AI response: typing indicator → message (slide up)
- Auto-scroll to bottom

LESSON CONTENT:
- Code blocks: hover → show "Copy" button
- Click "Copy" → копировать + показать "Copied!" tooltip
- Previous/Next buttons: disabled если нет урока
- Smooth scroll при навигации

STATES:
- Loading lesson: skeleton loader
- Error: error message + retry button
- Empty chat: "Ask me anything..." placeholder
```

**Промпт для Claude:**
```
Добавь интерактивность к компоненту:

[Interaction Specs выше]

Реализуй:
1. Sidebar navigation:
   - useState для expanded modules
   - onClick handlers для expand/collapse
   - useRouter для navigation

2. Chat:
   - useState для messages
   - Mock AI response (setTimeout 1s)
   - Auto-scroll useEffect
   - Framer Motion для animations

3. Content:
   - react-copy-to-clipboard для code blocks
   - react-markdown с syntax highlighting
   - Loading states с skeleton

4. Navigation:
   - Previous/Next logic
   - Keyboard shortcuts (← →)

Это прототип, используй mock data.
```

---

### Пример 2: Course Selection Page

#### ASCII Wireframe → Claude Prompt

```
Создай страницу выбора курсов по этому wireframe:

┌──────────────────────────────────────────────────────────┐
│                    AI Learning Agent                     │
│                                                          │
│              Start Your Learning Journey                 │
│                                                          │
│  [Search courses...]                    [Filter ▼]      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │ [Image]    │  │ [Image]    │  │ [Image]    │        │
│  │            │  │            │  │            │        │
│  │ Course 1   │  │ Course 2   │  │ Course 3   │        │
│  │ ────────   │  │ ────────   │  │ ────────   │        │
│  │ 12 lessons │  │ 8 lessons  │  │ 15 lessons │        │
│  │ ■■■□□ 60%  │  │ ■□□□□ 20%  │  │ □□□□□ 0%   │        │
│  │            │  │            │  │            │        │
│  │ [Continue] │  │ [Continue] │  │ [Start]    │        │
│  └────────────┘  └────────────┘  └────────────┘        │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐        │
│  │ [Image]    │  │ [Image]    │  │ [Image]    │        │
│  │ Course 4   │  │ Course 5   │  │ Course 6   │        │
│  │ ...        │  │ ...        │  │ ...        │        │
└──────────────────────────────────────────────────────────┘

Требования:
- React + TypeScript
- Grid: 3 columns на desktop, 2 на tablet, 1 на mobile
- Card компоненты с hover эффектом
- Progress bar для каждого курса
- Search и Filter функциональность (UI only)

Используй Material-UI или Chakra UI.
```

---

## ✅ Чек-лист: Выбор правильного артефакта

### Перед началом работы спроси себя:

**1. Какая фаза проекта?**
- [ ] Brainstorming / ранняя фаза → Wireframe
- [ ] Утверждение дизайна → Mockup
- [ ] Тестирование UX → Prototype
- [ ] Development → Mockup + specs или Design System

**2. Что нужно проверить?**
- [ ] Структура и layout → Wireframe
- [ ] Визуальный дизайн → Mockup
- [ ] User flow и навигация → Prototype
- [ ] Интерактивность → Prototype

**3. Кто audience?**
- [ ] Команда (внутреннее обсуждение) → Wireframe
- [ ] Клиент (презентация) → Mockup
- [ ] Пользователи (тестирование) → Prototype
- [ ] Разработчики → Mockup + specs

**4. Сколько есть времени?**
- [ ] Минуты → Lo-Fi Wireframe
- [ ] Часы → Hi-Fi Wireframe или Lo-Fi Mockup
- [ ] Дни → Hi-Fi Mockup
- [ ] Недели → Prototype

**5. Насколько гибкие требования?**
- [ ] Всё может измениться → Lo-Fi (легко менять)
- [ ] Основная структура понятна → Mid-Fi
- [ ] Всё зафиксировано → Hi-Fi

---

## 🎓 Практическое задание

### Задание 1: Создай Wireframe

**Задача:** Нарисуй ASCII wireframe для страницы профиля пользователя.

**Должно быть:**
- Header с навигацией
- Аватар пользователя
- Информация: имя, email, bio
- Список курсов (в процессе / завершённые)
- Кнопка "Edit Profile"

**Попробуй сначала сам, потом используй Claude:**
```
Создай ASCII wireframe для страницы User Profile со следующими элементами:
[твой список элементов]

Структура:
- Header сверху
- Centered layout (макс. ширина 800px)
- Grid для списка курсов (2 колонки)
```

---

### Задание 2: Преврати Wireframe в Mockup

**Задача:** Возьми wireframe из задания 1 и создай дизайн-спеки для mockup.

**Определи:**
- Цветовую палитру (5-6 цветов)
- Типографику (заголовки, body text)
- Spacing систему (отступы)
- Стиль кнопок и карточек

**Промпт для Claude:**
```
У меня есть wireframe для User Profile [описание или ASCII].

Создай дизайн-спеки для mockup:
- Цветовая схема: modern, professional (синие тона)
- Типографика: sans-serif, clean
- Стиль: minimalist, cards with shadows
- Spacing: consistent system

Выдай мне:
1. Цвета (primary, secondary, backgrounds, text) в hex
2. Typography (sizes, weights, line-heights)
3. Components specs (buttons, cards, avatars)
4. Spacing scale (8px system)
```

---

### Задание 3: Сделай интерактивный Prototype

**Задача:** Создай simple prototype для Login → Dashboard flow.

**User Flow:**
1. Login page (email + password)
2. Click "Login" → Loading state
3. Redirect → Dashboard

**Промпт для Claude:**
```
Создай интерактивный React прототип для Login flow:

Экраны:
1. Login page - форма с email/password
2. Loading - 2 секунды spinner
3. Dashboard - welcome message + user info

User Flow:
Login page → click [Login] → Loading → Dashboard

Анимации:
- Screen transitions: fade
- Loading: spinner
- Dashboard появление: slide up

Используй:
- React + React Router
- Framer Motion
- Mock authentication (любой email/password = success)

Добавь кнопки для перехода между экранами (для демонстрации).
```

---

## 📝 Резюме

### Ключевые концепции

**1. Wireframe (Вайрфрейм):**
- Схематичное изображение структуры
- Черно-белый, без деталей дизайна
- Быстро создаётся, легко меняется
- Для обсуждения layout и навигации

**2. Mockup (Макет):**
- Детальное изображение финального дизайна
- Полноцветный, со всеми визуальными элементами
- Статичный (не кликабельный)
- Для утверждения визуала и передачи в разработку

**3. Prototype (Прототип):**
- Интерактивная имитация интерфейса
- Кликабельный, с переходами и анимациями
- Для UX-тестирования и демонстрации
- Не настоящий код (хотя может быть code prototype)

**4. Fidelity (Детализация):**
- Low-Fi → Mid-Fi → High-Fi
- Начинай с Lo-Fi, увеличивай детализацию по мере уточнения
- Чем ниже fidelity, тем дешевле изменения

**5. Прогрессия:**
```
Lo-Fi Wireframe → Hi-Fi Wireframe → Mockup → Prototype → Development
(минуты)          (часы)            (дни)     (недели)    (месяцы)
```

### Vibe Coding подход

**Для работы с Claude Code:**
1. **Wireframe** → используй ASCII в промптах (быстро, понятно)
2. **Mockup** → давай детальные спеки (цвета, шрифты, spacing)
3. **Prototype** → проси интерактивный React код с анимациями

**Золотое правило:**
> Чем четче артефакт, тем точнее Claude реализует твою идею

---

## 🚀 Следующие шаги

Ты научился различать и использовать Wireframes, Mockups и Prototypes! В следующих уроках:

- **Урок 2.3:** Design Systems — как создавать и использовать дизайн-системы
- **Урок 2.4:** Component Libraries — работа с готовыми UI-библиотеками
- **Урок 2.5:** Handoff Process — как передавать дизайн из Figma в код
- **Урок 2.6:** Prompting with Artifacts — мастер-класс по промптам с артефактами

---

## 🔗 Полезные ресурсы

**Инструменты:**
- **Figma** - https://www.figma.com (всё в одном)
- **Balsamiq** - https://balsamiq.com (быстрые wireframes)
- **Framer** - https://www.framer.com (code prototypes)
- **ProtoPie** - https://www.protopie.io (advanced prototypes)

**Обучение:**
- **Figma YouTube** - официальные туториалы
- **Refactoring UI** - книга о дизайне для разработчиков
- **Laws of UX** - https://lawsofux.com (UX принципы)

**Вдохновение:**
- **Dribbble** - https://dribbble.com (дизайн примеры)
- **Mobbin** - https://mobbin.com (мобильные UI паттерны)
- **Land-book** - https://land-book.com (landing pages)

---

**Готов к следующему уроку?** → Переходи к **Lesson 2.3: Design Systems**
