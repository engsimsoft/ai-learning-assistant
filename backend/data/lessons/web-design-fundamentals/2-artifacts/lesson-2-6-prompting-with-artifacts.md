# Урок 2.6: Prompting Claude Code with Design Artifacts (Мастер-класс по промптингу с артефактами)

> **Модуль 2:** Artifacts
> **Урок:** 2.6
> **Длительность:** 90-120 минут (Masterclass!)
> **Prerequisite:** Уроки 2.1-2.5 (ВСЕ предыдущие уроки)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Мастерски формулировать задачи для Claude Code используя артефакты
- ✅ Создавать эффективные промпты для каждого типа артефакта (Wireframe, Mockup, Prototype, Design System, Component Library)
- ✅ Использовать прогрессивный промптинг (Lo-Fi → Hi-Fi)
- ✅ Применять шаблоны промптов для типичных задач
- ✅ Избегать анти-паттернов (плохих промптов)
- ✅ Управлять контекстом и итеративной разработкой
- ✅ Применять продвинутые техники (multi-step prompts, context management)
- ✅ Создавать production-ready код с первой попытки

---

## 📖 Философия Artifact-Based Prompting

### Ключевой принцип

**Артефакты — это язык общения между дизайном и кодом.**

```
БЕЗ АРТЕФАКТОВ                  С АРТЕФАКТАМИ
────────────────                ─────────────────

"Сделай красиво"                Wireframe:
     │                          ┌─────────────┐
     ↓                          │ [Logo]      │
Claude: "Что значит             │ [Nav items] │
красиво? Какой layout?          │ [Hero]      │
Какие цвета?"                   │ [Features]  │
     │                          └─────────────┘
     ↓                               │
Неопределённость                    ↓
Много итераций                 Claude: "Понятно!
Не тот результат               Создаю согласно
                               структуре"
                                    │
                                    ↓
                               Точный результат
                               Быстро
```

**Главное правило:**
> Чем четче артефакт → тем точнее промпт → тем лучше результат

---

## 🏗️ Аналогия: Архитектор и Строитель

Представь что создание веб-приложения — это строительство дома:

```
ПЛОХОЙ ЗАКАЗ                    ХОРОШИЙ ЗАКАЗ
────────────                    ─────────────

"Построй дом"                   "Построй дом:
                                - Чертёж (Wireframe)
Claude-Строитель:               - 3D визуализация (Mockup)
"Какой? Где окна?               - Материалы (Design Tokens)
Сколько этажей?"                - Стандарты (Design System)
                                - Примеры (Component Library)"
     ↓
Недопонимание                   Claude-Строитель:
Неправильный дом                "Всё ясно! Начинаю"
Переделки
                                     ↓
                                Правильный дом
                                С первого раза
```

**Вывод:** Артефакты = чёткое техническое задание.

---

## 📐 Часть 1: Структура Эффективного Промпта

### Анатомия идеального промпта

```
┌────────────────────────────────────────────┐
│ ИДЕАЛЬНЫЙ ПРОМПТ                           │
├────────────────────────────────────────────┤
│                                            │
│ 1. ЗАДАЧА (что делать)                     │
│    "Создай компонент ProductCard"          │
│                                            │
│ 2. АРТЕФАКТ (визуальная структура)         │
│    ┌─────────────┐                         │
│    │ [Image]     │                         │
│    │ Title       │  ← ASCII wireframe      │
│    │ $99.99      │                         │
│    │ [Buy]       │                         │
│    └─────────────┘                         │
│                                            │
│ 3. СПЕЦИФИКАЦИИ (детали)                   │
│    Colors: #007BFF, #FFF                   │
│    Font: Inter, 16px                       │
│    Spacing: 16px padding                   │
│                                            │
│ 4. ТЕХНОЛОГИИ (стек)                       │
│    React + TypeScript                      │
│    Tailwind CSS                            │
│                                            │
│ 5. ТРЕБОВАНИЯ (дополнительно)              │
│    - Адаптивность (mobile/desktop)         │
│    - Hover эффект                          │
│    - Loading state                         │
│                                            │
└────────────────────────────────────────────┘
```

### Формула промпта

```
ПРОМПТ = Задача + Артефакт + Спецификации + Технологии + Требования

Где:
- Задача = Глагол + Что
- Артефакт = Визуальное представление
- Спецификации = Design Tokens (цвета, шрифты, отступы)
- Технологии = Стек (React/Vue, CSS/Tailwind)
- Требования = Edge cases, states, responsive
```

---

## 🎨 Часть 2: Промптинг по типам артефактов

### 2.1 Prompting with Wireframes (Lo-Fi)

**Цель:** Создать структуру (layout) без деталей дизайна.

#### Шаблон базового промпта

```
📝 TEMPLATE:

Создай [компонент/страницу] по этому wireframe:

[ASCII схема структуры]

Требования:
- Используй [UI библиотека] для компонентов
- Layout: [Grid/Flexbox/описание]
- Адаптивность: [breakpoints]
- Компоненты: [список базовых компонентов]

Пока НЕ добавляй:
- Детальные стили (только базовые)
- Реальные изображения (placeholder'ы)
- Сложную логику (только UI структура)
```

#### Пример 1: Простая форма

```
📝 ПРОМПТ:

Создай форму логина по этому wireframe:

┌─────────────────────────┐
│                         │
│      [Logo]             │
│                         │
│   Welcome Back!         │
│                         │
│   Email                 │
│   [________________]    │
│                         │
│   Password              │
│   [________________]    │
│                         │
│   [X] Remember me       │
│                         │
│   [═══════Login═══════] │
│                         │
│   Forgot password?      │
│   Don't have account?   │
│                         │
└─────────────────────────┘

Требования:
- React + TypeScript
- Используй Material-UI (TextField, Button, Checkbox)
- Layout: центрированная форма (max-width: 400px)
- Адаптивность: работает на mobile и desktop
- Компоненты: Box, Stack для layout

Пока НЕ добавляй:
- Валидацию (только UI)
- Реальную авторизацию
- Детальные стили (используй базовые MUI)
```

**Что Claude создаст:**
- ✅ Структура компонента
- ✅ Правильное расположение элементов
- ✅ Базовые компоненты MUI
- ❌ Детальный дизайн (это Lo-Fi!)

---

#### Пример 2: Dashboard layout

```
📝 ПРОМПТ:

Создай layout для dashboard по этому wireframe:

┌────────────────────────────────────────────────┐
│ [☰ Logo]                     [🔔] [👤]        │ ← Header
├──────────┬─────────────────────────────────────┤
│          │                                     │
│ Home     │  Dashboard Overview                 │
│ ───      │                                     │
│ Users    │  ┌──────┐ ┌──────┐ ┌──────┐        │
│ Reports  │  │ Card │ │ Card │ │ Card │        │
│ Settings │  │ 1234 │ │ 567  │ │ 89   │        │
│          │  └──────┘ └──────┘ └──────┘        │
│          │                                     │
│          │  Recent Activity                    │
│          │  ─────────────────                  │
│          │  • Item 1                           │
│          │  • Item 2                           │
│          │  • Item 3                           │
│          │                                     │
└──────────┴─────────────────────────────────────┘
  240px      Remaining width

Требования:
- React + TypeScript
- Layout: CSS Grid (header, sidebar, main)
- Sidebar: 240px фиксированная ширина, темный фон
- Header: 64px высота, фиксированный сверху
- Main: scrollable, padding 24px
- Адаптивность:
  - Desktop (>1024px): sidebar видимый
  - Mobile (<1024px): sidebar в burger menu

Используй Material-UI:
- Drawer для sidebar
- AppBar для header
- Grid для карточек (3 колонки на desktop, 1 на mobile)
- Card для метрик

Пока НЕ добавляй:
- Реальные данные (используй mock)
- Сложную логику
- Детальные стили (базовые MUI)
```

---

### 2.2 Prompting with Mockups (Hi-Fi)

**Цель:** Создать pixel-perfect реализацию с точными стилями.

#### Шаблон детального промпта

```
📝 TEMPLATE:

Создай [компонент] по этому mockup:

[Описание или ссылка на изображение]

ТОЧНЫЕ СПЕЦИФИКАЦИИ:

COLORS:
- [Element]: [Hex color]
- [Element]: [Hex color]

TYPOGRAPHY:
- [Element]: [Font], [Size], [Weight], [Line-height]
- [Element]: [Font], [Size], [Weight]

SPACING:
- Padding: [значения]
- Margin: [значения]
- Gap: [значения]

EFFECTS:
- Border-radius: [значения]
- Box-shadow: [значения]
- Transitions: [описание]

STATES:
- Default: [описание]
- Hover: [изменения]
- Active: [изменения]
- Disabled: [изменения]
- Focus: [изменения]

Используй [технологии].
```

#### Пример 1: Button компонент

```
📝 ПРОМПТ:

Создай Button компонент по этому mockup:

DESIGN:
Большая кнопка с градиентным фоном, округлыми углами,
белым текстом и тонкой тенью. При hover поднимается вверх.

ТОЧНЫЕ СПЕЦИФИКАЦИИ:

COLORS:
- Background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%)
- Text: #FFFFFF
- Border: none

TYPOGRAPHY:
- Font: 'Inter', sans-serif
- Size: 18px
- Weight: 600 (Semibold)
- Letter-spacing: 0.5px
- Text-transform: none

SPACING:
- Padding: 16px 48px
- Min-width: 200px
- Height: auto

EFFECTS:
- Border-radius: 12px
- Box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3)
- Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

STATES:
- Default: (как выше)
- Hover:
  - Background: linear-gradient(135deg, #5568D3 0%, #6941A0 100%)
  - Transform: translateY(-2px)
  - Box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4)
- Active:
  - Transform: translateY(0)
  - Box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3)
- Disabled:
  - Background: #E9ECEF
  - Color: #6C757D
  - Cursor: not-allowed
  - Box-shadow: none
  - Opacity: 0.6
- Focus (keyboard):
  - Outline: 3px solid rgba(102, 126, 234, 0.5)
  - Outline-offset: 2px

Используй:
- React + TypeScript
- styled-components для стилей
- Поддержка всех HTML button props
- Accessibility: ARIA attributes

Создай также:
- Варианты: primary, secondary, outline
- Размеры: small, medium, large
```

**Результат:** Pixel-perfect компонент с всеми состояниями!

---

#### Пример 2: Product Card

```
📝 ПРОМПТ:

Создай ProductCard компонент по mockup из Figma:

СТРУКТУРА:
┌─────────────────────┐
│ [Product Image]     │ ← 300×200px
│                     │
│ Category Badge      │ ← Chip верхний правый угол
├─────────────────────┤
│ Product Name        │ ← H3 заголовок
│ Short description   │ ← 2 строки, ellipsis
│                     │
│ ★★★★☆ (4.5) 120    │ ← Rating + reviews count
│                     │
│ $99.99  ~~$149.99~~ │ ← Price + old price
│                     │
│ [Add to Cart 🛒]    │ ← Primary button
└─────────────────────┘

ТОЧНЫЕ СПЕЦИФИКАЦИИ:

LAYOUT:
- Card width: 320px
- Card height: auto
- Padding: 0 (image full width), 20px for content

COLORS:
- Card background: #FFFFFF
- Card border: 1px solid #E5E7EB
- Category badge: #3B82F6 background, #FFFFFF text
- Title: #1F2937
- Description: #6B7280
- Price: #DC2626 (sale), #1F2937 (current)
- Old price: #9CA3AF, line-through
- Rating stars: #FBBF24 (filled), #E5E7EB (empty)

TYPOGRAPHY:
- Category: Inter, 12px, Semibold, uppercase
- Title: Inter, 18px, Bold, line-height 1.4
- Description: Inter, 14px, Regular, line-height 1.6
- Rating: 16px stars, 14px text
- Price: Inter, 24px, Bold (current), 18px, Regular (old)

SPACING:
- Content padding: 20px
- Gap between sections: 12px
- Gap between price and button: 16px

EFFECTS:
- Border-radius: 12px (card)
- Box-shadow:
  - Default: 0 2px 4px rgba(0,0,0,0.06)
  - Hover: 0 8px 16px rgba(0,0,0,0.12)
- Category badge radius: 4px
- Image: object-fit: cover

STATES:
- Default: (как выше)
- Hover:
  - Card elevation: увеличить box-shadow
  - Transform: translateY(-4px)
  - Button: background darker
  - Transition: all 0.3s ease
- Loading:
  - Skeleton loader для image
  - Shimmer эффект
- Out of stock:
  - Overlay на image: rgba(0,0,0,0.5)
  - Badge: "Out of Stock" красный
  - Button: disabled

INTERACTIONS:
- Click on card: открыть product details
- Click on "Add to Cart": добавить в корзину (показать toast)
- Hover на image: zoom 1.05x

Используй:
- React + TypeScript
- Tailwind CSS
- Framer Motion для анимаций
- React Icons для иконок
- Props:
  - product: { id, name, description, price, oldPrice, image, category, rating, reviewsCount, inStock }
  - onAddToCart: (productId: string) => void
  - onClick: (productId: string) => void
```

---

### 2.3 Prompting with Prototypes

**Цель:** Создать интерактивный компонент с анимациями и переходами.

#### Шаблон промпта для прототипа

```
📝 TEMPLATE:

Создай интерактивный прототип [название]:

ЭКРАНЫ/СОСТОЯНИЯ:
1. [State 1] - [описание]
2. [State 2] - [описание]
3. [State 3] - [описание]

USER FLOW:
[State 1] → (action) → [State 2] → (action) → [State 3]

ИНТЕРАКТИВНОСТЬ:
- [Element]: [event] → [действие]
- [Element]: [event] → [действие]

АНИМАЦИИ:
- [Transition 1]: [описание анимации]
- [Transition 2]: [описание анимации]
- Duration: [значение]
- Easing: [функция]

ДИЗАЙН:
[Specs из mockup]

Используй:
- [React/Vue] + TypeScript
- [State management: useState/Context/Redux]
- Framer Motion или React Spring для анимаций
- Mock data (не реальный API)

Это прототип для демонстрации, НЕ production код.
```

#### Пример: Shopping Cart Flow

```
📝 ПРОМПТ:

Создай интерактивный прототип Shopping Cart flow:

ЭКРАНЫ:
1. Product List - список товаров с кнопками "Add to Cart"
2. Cart Badge - показывает количество товаров
3. Cart Panel - sidebar с товарами в корзине
4. Checkout Success - подтверждение

USER FLOW:
Product List → (click "Add") → Badge updates → (click Badge) → Cart Panel opens → (click "Checkout") → Success screen

ИНТЕРАКТИВНОСТЬ:

Product List:
- Click "Add to Cart" на товаре:
  - Добавить в cart state
  - Badge count ++
  - Показать toast "Added to cart"
  - Product button меняется на "Added ✓" на 2 сек
  - Анимация: bounce на badge

Cart Badge (верхний правый угол):
- Click:
  - Открыть Cart Panel (slide-in справа)
  - Показать overlay

Cart Panel:
- Product items:
  - Click "Remove": удалить товар, update badge
  - Change quantity: +/- buttons, update total
- Click "Checkout":
  - Loading 2 секунды
  - Close panel
  - Show Success modal
- Click "X" или overlay: закрыть panel

Success Modal:
- Auto-close через 3 секунды
- Click "Continue Shopping": закрыть и очистить cart

АНИМАЦИИ:

Add to Cart:
- Button: scale(0.95) → scale(1.05) → scale(1)
- Badge: scale(1.2) + rotate(10deg) → scale(1)
- Toast: slide-in from top, fade out after 2s

Cart Panel:
- Open: slide-in from right (translateX(100%) → 0)
- Close: slide-out to right (0 → translateX(100%))
- Overlay: fade (opacity 0 → 0.5)
- Duration: 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

Product Remove:
- Item: fade-out + slide-right (500ms)
- Total: number animation (counting)

Checkout:
- Button: show spinner, disable
- Duration: 2000ms

Success Modal:
- Appear: scale(0.8) + fade → scale(1)
- Disappear: scale(0.9) + fade
- Checkmark: draw animation (SVG stroke)

ДИЗАЙН:

Cart Badge:
- Size: 24×24px, border-radius: 50%
- Background: #DC2626, Color: #FFFFFF
- Font: 12px, Bold
- Position: absolute top-right на icon

Cart Panel:
- Width: 400px
- Background: #FFFFFF
- Shadow: -4px 0 16px rgba(0,0,0,0.1)
- Padding: 24px

Toast:
- Background: #10B981, Color: #FFFFFF
- Padding: 12px 20px
- Border-radius: 8px
- Position: fixed top-4 right-4

Mock Data:
- 5 товаров: название, цена ($10-$100), изображение (placeholder)

Используй:
- React + TypeScript
- Context API для cart state
- Framer Motion для всех анимаций
- React Hot Toast для notifications
- LocalStorage для persist cart (optional)

Добавь кнопки для демонстрации:
- "Reset Cart" - очистить всё
- "Add Random Product" - для тестирования
```

**Результат:** Полностью интерактивный прототип с анимациями!

---

### 2.4 Prompting with Design Systems

**Цель:** Создать компонент следуя правилам Design System.

#### Шаблон промпта для Design System

```
📝 TEMPLATE:

Создай [компонент] согласно [Design System]:

DESIGN TOKENS (используй из системы):

Colors:
- Primary: var(--color-primary)
- Secondary: var(--color-secondary)
- [etc]

Typography:
- Font family: var(--font-primary)
- Heading: var(--font-size-h3), var(--font-weight-bold)
- Body: var(--font-size-base), var(--font-weight-regular)

Spacing:
- Padding: var(--spacing-md)
- Margin: var(--spacing-lg)
- Gap: var(--spacing-sm)

Effects:
- Shadow: var(--shadow-md)
- Radius: var(--radius-lg)

КОМПОНЕНТЫ (переиспользуй):
- [Component 1] из Design System
- [Component 2] из Design System

ACCESSIBILITY:
- ARIA attributes: [какие]
- Keyboard navigation: [как]
- Focus states: следовать системе

Соблюдай принципы [Design System] для консистентности.
```

#### Пример: Material Design Button

```
📝 ПРОМПТ:

Создай Button компонент согласно Material Design System:

DESIGN TOKENS:

Colors:
- Primary: #1976D2 (Material Blue 700)
- Primary Light: #42A5F5 (Blue 400)
- Primary Dark: #1565C0 (Blue 800)
- On Primary: #FFFFFF
- Surface: #FFFFFF
- On Surface: rgba(0,0,0,0.87)
- Disabled: rgba(0,0,0,0.12)
- Disabled Text: rgba(0,0,0,0.26)

Typography:
- Font: 'Roboto', sans-serif
- Size: 14px
- Weight: 500 (Medium)
- Letter-spacing: 0.0892857143em
- Text-transform: uppercase

Spacing (4dp base):
- Padding: 8px 16px (small), 10px 24px (medium), 12px 32px (large)
- Min-width: 64px
- Height: 36px (small), 40px (medium), 48px (large)

Effects:
- Border-radius: 4px
- Elevation (shadows):
  - Resting: 0 2px 4px rgba(0,0,0,0.14), 0 3px 1px rgba(0,0,0,0.12)
  - Hover: 0 4px 8px rgba(0,0,0,0.14), 0 6px 3px rgba(0,0,0,0.12)
  - Active: 0 8px 16px rgba(0,0,0,0.14), 0 12px 6px rgba(0,0,0,0.12)
- Ripple effect: Material ripple on click

ВАРИАНТЫ (согласно Material Design):

1. Contained (filled):
   - Background: primary color
   - Text: on-primary color
   - Elevation: да
   - Use: primary actions

2. Outlined:
   - Background: transparent
   - Border: 1px solid rgba(0,0,0,0.23)
   - Text: primary color
   - Elevation: нет
   - Use: secondary actions

3. Text:
   - Background: transparent
   - Border: нет
   - Text: primary color
   - Elevation: нет
   - Use: low-emphasis actions

СОСТОЯНИЯ:

Default:
- (specs выше)

Hover:
- Contained: overlay rgba(255,255,255,0.08)
- Outlined: overlay rgba(25,118,210,0.04)
- Text: overlay rgba(25,118,210,0.04)
- Elevation: поднять на уровень выше

Focus (keyboard):
- Outline: none (Material не использует outline)
- Overlay: rgba(25,118,210,0.12)

Active (pressed):
- Overlay: rgba(25,118,210,0.16)
- Elevation: высший уровень

Disabled:
- Contained: background disabled, text disabled-text
- Outlined: border disabled, text disabled-text
- Text: text disabled-text
- Cursor: default
- No hover/focus/active states

ИНТЕРАКТИВНОСТЬ:

Ripple Effect:
- Material ripple animation on click
- Origin: click position
- Color: rgba(255,255,255,0.3) for contained, rgba(25,118,210,0.3) for outlined/text
- Duration: 600ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

ACCESSIBILITY:

- Role: button (если не <button>)
- ARIA:
  - aria-label или текст внутри
  - aria-disabled="true" когда disabled
  - aria-pressed для toggle buttons
- Keyboard:
  - Enter/Space: trigger click
  - Tab: focus
- Focus-visible: показывать focus только при keyboard navigation

Icons:
- Size: 18px
- Position: left (startIcon) или right (endIcon)
- Gap: 8px от текста

Используй:
- React + TypeScript
- CSS-in-JS (styled-components или MUI's styled)
- Ripple: Material-UI's ButtonBase или custom
- Forward ref для DOM access
- Поддержка всех HTML button attributes

Props:
- variant: 'contained' | 'outlined' | 'text'
- size: 'small' | 'medium' | 'large'
- color: 'primary' | 'secondary' | 'success' | 'error'
- disabled: boolean
- startIcon: ReactNode
- endIcon: ReactNode
- fullWidth: boolean

Создай также файл с Material Design tokens (colors, spacing, elevation).
```

---

### 2.5 Prompting with Component Libraries

**Цель:** Использовать существующую библиотеку и кастомизировать.

#### Шаблон промпта для библиотеки

```
📝 TEMPLATE:

Создай [компонент] используя [Component Library]:

ИСПОЛЬЗУЙ КОМПОНЕНТЫ:
- [Component 1] из [Library]
- [Component 2] из [Library]

СТРУКТУРА:
[Описание или wireframe]

КАСТОМИЗАЦИЯ:

Theme overrides:
- [Token]: [значение]
- [Token]: [значение]

Styled components:
- [Component]: [кастомные стили]

ТРЕБОВАНИЯ:
- TypeScript types
- Адаптивность
- Accessibility (проверь что библиотека поддерживает)

Сохрани преимущества библиотеки (a11y, interactions).
```

#### Пример: Chakra UI Form

```
📝 ПРОМПТ:

Создай форму регистрации используя Chakra UI:

ИСПОЛЬЗУЙ КОМПОНЕНТЫ:
- Box, VStack для layout
- FormControl, FormLabel, FormErrorMessage для полей
- Input для text inputs
- InputGroup, InputRightElement для password visibility
- Button для submit
- Text, Link для дополнительного текста
- useToast для уведомлений

СТРУКТУРА:
┌──────────────────────────┐
│ Create Account           │ ← Heading
│                          │
│ Full Name                │ ← Label
│ [________________]       │ ← Input
│                          │
│ Email                    │
│ [________________]       │
│                          │
│ Password                 │
│ [____________] [👁]      │ ← Input + toggle visibility
│ ❌ Min 8 characters      │ ← Error message
│                          │
│ Confirm Password         │
│ [____________] [👁]      │
│                          │
│ [X] I agree to Terms     │ ← Checkbox
│                          │
│ [══ Create Account ══]   │ ← Button
│                          │
│ Already have account?    │
│ Sign in                  │ ← Link
└──────────────────────────┘

КАСТОМИЗАЦИЯ:

Theme overrides (создай custom theme):
colors:
  brand:
    500: '#7C3AED' (фиолетовый вместо default blue)
    600: '#6D28D9'
    700: '#5B21B6'

components:
  Button:
    defaultProps:
      colorScheme: 'brand'
    variants:
      solid:
        borderRadius: '12px'
        fontWeight: '600'
        _hover:
          transform: 'translateY(-2px)'
          boxShadow: 'lg'

  Input:
    defaultProps:
      focusBorderColor: 'brand.500'
    variants:
      outline:
        field:
          borderRadius: '8px'
          _hover:
            borderColor: 'brand.300'

ВАЛИДАЦИЯ (используй react-hook-form):

Rules:
- Full Name: required, min 2 chars
- Email: required, valid email format
- Password: required, min 8 chars, must include: uppercase, lowercase, number
- Confirm Password: required, must match password
- Terms: required (must be checked)

Error messages:
- Показывать под полем сразу при blur
- Красный цвет (используй Chakra's FormErrorMessage)
- Icon (используй WarningIcon)

Success:
- После успешной регистрации:
  - Показать toast (green, "Account created!")
  - Redirect на /dashboard через 2 секунды
  - Loading state на кнопке

ИНТЕРАКТИВНОСТЬ:

Password visibility toggle:
- Icon button в InputRightElement
- Toggle между ViewIcon и ViewOffIcon
- Click меняет type: password ↔ text

Real-time validation:
- Password strength indicator (слабый/средний/сильный)
- Показывать как Progress bar под полем
- Цвет: red (weak) → yellow (medium) → green (strong)

Disable submit:
- Пока есть ошибки валидации
- Во время submitting (loading state)

ACCESSIBILITY:
- Все FormControl имеют связку label + input (автоматично в Chakra)
- Error messages связаны через aria-describedby (автоматично)
- Focus management: после submit если ошибка → focus на первое поле с ошибкой
- Keyboard: Tab navigation работает, Enter submit форму

АДАПТИВНОСТЬ:
- Desktop (>768px): form width 400px, centered
- Mobile (<768px): full width, padding 16px

Используй:
- React + TypeScript
- Chakra UI v2
- react-hook-form для управления формой
- zod для schema validation (optional, но рекомендуется)

Mock API:
- registerUser(data) - возвращает Promise, resolve через 2 сек

Создай также:
- Type для формы: RegisterFormData
- Validation schema (zod или yup)
- Кастомный hook: useRegisterForm
```

---

### 2.6 Prompting with Figma Specs

**Цель:** Реализовать по спецификациям из Figma Inspect.

#### Шаблон промпта для Figma

```
📝 TEMPLATE:

Реализуй [компонент] по спецификациям из Figma:

[Можно вставить скриншот или описать детально]

FIGMA SPECS (из Inspect Panel):

LAYOUT:
- Size: [W]×[H]px
- Position: [описание в layout]
- Display: [flex/grid/block]
- Alignment: [значения]

COLORS (точные hex из Figma):
- [Property]: [#HEX]
- [Property]: [#HEX]

TYPOGRAPHY (точные значения):
- Font Family: [название]
- Font Size: [px]
- Font Weight: [значение]
- Line Height: [px или %]
- Letter Spacing: [px]

SPACING (точные px из Figma):
- Padding: [значения]
- Margin: [значения]
- Gap: [значения]

EFFECTS (копировать из Figma):
- Box Shadow: [значения]
- Border Radius: [px]
- Opacity: [значение]
- Blur: [значение]

ASSETS:
- Images: [список для экспорта]
- Icons: [SVG, экспортировать]
- Logo: [формат]

RESPONSIVE (если есть в Figma):
- Desktop: [specs]
- Tablet: [specs]
- Mobile: [specs]

Создай pixel-perfect реализацию.
```

#### Пример: Hero Section из Figma

```
📝 ПРОМПТ:

Реализуй Hero Section по спецификациям из Figma:

[Визуальное описание: большой заголовок по центру,
подзаголовок, 2 кнопки, фоновый градиент]

FIGMA SPECS:

LAYOUT:
- Container: width 100vw, max-width 1440px, margin auto
- Content: max-width 800px, centered
- Height: 600px desktop, auto mobile
- Display: flex, flex-direction column, justify-content center
- Padding: 80px 40px (desktop), 40px 20px (mobile)

COLORS:
- Background: linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #F093FB 100%)
- Heading: #FFFFFF
- Subheading: rgba(255,255,255,0.9)
- Button Primary background: #FFFFFF
- Button Primary text: #667EEA
- Button Secondary background: transparent
- Button Secondary border: 2px solid #FFFFFF
- Button Secondary text: #FFFFFF

TYPOGRAPHY:
Heading:
- Font Family: 'Inter', sans-serif
- Font Size: 64px desktop, 40px tablet, 32px mobile
- Font Weight: 700 (Bold)
- Line Height: 1.2
- Letter Spacing: -1px
- Text Align: center

Subheading:
- Font Family: 'Inter', sans-serif
- Font Size: 24px desktop, 18px mobile
- Font Weight: 400 (Regular)
- Line Height: 1.6
- Letter Spacing: 0
- Text Align: center
- Max Width: 600px

Button text:
- Font Family: 'Inter', sans-serif
- Font Size: 18px
- Font Weight: 600 (Semibold)
- Letter Spacing: 0.5px

SPACING:
- Gap между heading и subheading: 24px
- Gap между subheading и buttons: 40px
- Gap между buttons: 16px
- Button padding: 16px 48px
- Button min-width: 200px

EFFECTS:
Heading:
- Text Shadow: 0 2px 8px rgba(0,0,0,0.1)

Buttons:
- Border Radius: 12px
- Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

Primary Button:
- Box Shadow: 0 8px 24px rgba(255,255,255,0.2)
- Hover:
  - Transform: translateY(-2px)
  - Box Shadow: 0 12px 32px rgba(255,255,255,0.3)

Secondary Button:
- Box Shadow: none
- Hover:
  - Background: rgba(255,255,255,0.1)
  - Transform: translateY(-2px)

BACKGROUND ANIMATION (опционально):
- Animated gradient: shift hue slightly (360 → 380 → 360, 10s loop)
- Subtle particle effect (optional, если время есть)

CONTENT:
Heading: "Build Something Amazing"
Subheading: "Create beautiful web applications with AI-powered tools. Fast, intuitive, and powerful."
Button 1: "Get Started →"
Button 2: "Learn More"

RESPONSIVE:

Desktop (>1024px):
- (specs выше)
- Buttons: horizontal layout

Tablet (768-1023px):
- Heading: 48px
- Subheading: 20px
- Padding: 60px 32px

Mobile (<768px):
- Heading: 32px
- Subheading: 16px
- Padding: 40px 20px
- Buttons: vertical stack, full width
- Gap between buttons: 12px

Используй:
- React + TypeScript
- Tailwind CSS (или styled-components если предпочитаешь)
- Framer Motion для hover анимаций
- Responsive: mobile-first approach

Экспортируй CSS variables для colors в отдельный файл.
```

---

## 🔄 Часть 3: Progressive Prompting (Прогрессивный промптинг)

### Концепция: От Lo-Fi к Hi-Fi

**Progressive Prompting** — это техника поэтапного уточнения, от простой структуры к детальной реализации.

```
ПРОЦЕСС:

Step 1: Lo-Fi Wireframe
  ↓
  "Создай базовую структуру"
  ↓
  ✅ Получил layout

Step 2: Add Basic Styles
  ↓
  "Добавь базовые стили из Material-UI"
  ↓
  ✅ Получил styled components

Step 3: Pixel-Perfect Details
  ↓
  "Примени точные спеки из Figma"
  ↓
  ✅ Получил детальный дизайн

Step 4: Interactions
  ↓
  "Добавь hover эффекты и анимации"
  ↓
  ✅ Получил интерактивность

Step 5: States & Edge Cases
  ↓
  "Реализуй loading, error, empty states"
  ↓
  ✅ Получил production-ready компонент
```

### Пример: Progressive Prompting для Product Page

#### Prompt 1: Structure (Lo-Fi)

```
📝 ПРОМПТ 1:

Создай базовую структуру страницы Product Details:

┌────────────────────────────────────┐
│ [Header]                           │
├────────┬───────────────────────────┤
│        │ [Image Gallery]           │
│ [Nav]  │                           │
│        │ Title                     │
│        │ Price                     │
│        │ Rating                    │
│        │                           │
│        │ [Add to Cart]             │
│        │                           │
│        │ Description               │
│        │                           │
│        │ [Related Products]        │
└────────┴───────────────────────────┘

Используй React + TypeScript.
Только структура, без детальных стилей.
```

**Claude создаст базовый layout.**

---

#### Prompt 2: Apply Design System

```
📝 ПРОМПТ 2:

Обнови Product Details страницу, используя Material-UI компоненты:

Замени:
- Header → AppBar (MUI)
- Nav → Drawer (MUI)
- Image Gallery → ImageList (MUI)
- Buttons → Button (MUI, variant="contained")
- Cards → Card (MUI)

Примени базовую тему Material Design:
- Primary color: #1976D2
- Typography: Roboto
- Spacing: theme.spacing()

Сохрани текущую структуру, только замени компоненты на MUI.
```

**Claude обновит с MUI компонентами.**

---

#### Prompt 3: Detailed Specs

```
📝 ПРОМПТ 3:

Примени точные design specs к Product Details:

IMAGE GALLERY:
- Main image: 600×600px
- Thumbnails: 80×80px, 4 шт в ряд
- Gap: 12px
- Border-radius: 8px
- Hover на thumbnail: border 2px solid primary

TITLE:
- Font: Inter, 32px, Bold
- Color: #1F2937
- Line-height: 1.3

PRICE:
- Current: Inter, 36px, Bold, #DC2626
- Old: Inter, 24px, Regular, #9CA3AF, line-through
- Discount badge: -20% в зелёном badge

RATING:
- Stars: 24px, #FBBF24
- Text: (4.5 out of 5) - Inter, 16px, #6B7280
- Reviews count: (120 reviews) - clickable link

ADD TO CART BUTTON:
- Width: 100%, max-width 400px
- Height: 56px
- Background: #DC2626
- Color: #FFFFFF
- Font: Inter, 18px, Semibold
- Border-radius: 12px
- Shadow: 0 4px 12px rgba(220,38,38,0.3)
- Hover: background #B91C1C, transform translateY(-2px)
- Icon: 🛒 перед текстом

DESCRIPTION:
- Font: Inter, 16px, Regular, #4B5563
- Line-height: 1.8
- Max-width: 700px

Обнови компонент с этими точными значениями.
```

**Claude обновит с pixel-perfect стилями.**

---

#### Prompt 4: Interactions

```
📝 ПРОМПТ 4:

Добавь интерактивность к Product Details:

IMAGE GALLERY:
- Click на thumbnail → меняет main image (fade transition 300ms)
- Hover на main image → zoom cursor
- Click на main image → открыть lightbox (полноэкранный просмотр)
- Lightbox:
  - Backdrop: rgba(0,0,0,0.9)
  - Image: centered, max 90vw/90vh
  - Close: ESC или click outside
  - Navigation: ← → arrows или swipe

QUANTITY SELECTOR:
- Добавь перед кнопкой "Add to Cart"
- [-] [1] [+] buttons
- Min: 1, Max: 10 (показать "Only 10 left in stock")
- Disabled состояния для min/max

ADD TO CART:
- Click:
  - Disabled на 1 сек (loading spinner)
  - Показать toast: "Added to cart! ✓"
  - Update cart count в header
  - Animate cart icon (bounce)
- If out of stock:
  - Button text: "Out of Stock"
  - Disabled
  - Gray background

RELATED PRODUCTS:
- Horizontal scroll (snap scroll)
- Arrows: показывать только если есть overflow
- Click на product: navigate to /product/:id

Используй:
- Framer Motion для анимаций
- React Hot Toast для notifications
- Context API для cart state
```

**Claude добавит все интерактивные функции.**

---

#### Prompt 5: States & Polish

```
📝 ПРОМПТ 5:

Добавь все состояния и финальную полировку:

LOADING STATE:
- Skeleton loader для:
  - Image gallery
  - Title, price, rating
  - Description
- Используй MUI Skeleton или custom
- Shimmer effect

ERROR STATE:
- Если product не найден:
  - Показать error message
  - Icon (❌)
  - Text: "Product not found"
  - Button: "Back to Shop"

EMPTY STATE:
- Если нет related products:
  - Показать empty state
  - Text: "No related products yet"

OUT OF STOCK:
- Badge: "Out of Stock" (red)
- Overlay на image: rgba(0,0,0,0.3)
- Disable all interactions

RESPONSIVE:
Desktop (>1024px):
- (current layout)

Tablet (768-1023px):
- Image gallery: 2 thumbnails per row
- Reduce paddings to 32px

Mobile (<768px):
- Single column layout
- Image gallery: 1 thumbnail per row, horizontal scroll
- Button: full width
- Hide nav sidebar (burger menu)

ACCESSIBILITY:
- Alt text для всех images
- ARIA labels для buttons
- Keyboard navigation для gallery (arrows)
- Focus states: visible outline
- Screen reader announcements для cart updates

PERFORMANCE:
- Lazy load images (ниже fold)
- Image optimization (WebP + fallback)
- Code splitting (React.lazy для lightbox)

Создай production-ready компонент.
```

**Финальный результат: Полноценная страница!**

---

### Преимущества Progressive Prompting

```
ТРАДИЦИОННЫЙ ПОДХОД          PROGRESSIVE PROMPTING
───────────────────          ────────────────────

Один огромный промпт         Маленькие промпты
      ↓                            ↓
Claude перегружен            Claude фокусируется
      ↓                            ↓
Пропускает детали            Точная реализация
      ↓                            ↓
Нужно переделывать           Итеративное улучшение
      ↓                            ↓
Много времени                Быстрее и качественнее
```

**Правило:**
> Лучше 5 маленьких промптов чем 1 огромный!

---

## ⚠️ Часть 4: Anti-Patterns (Плохие промпты и как их исправить)

### Anti-Pattern 1: Vague Request (Неопределённый запрос)

#### ❌ Плохой промпт

```
Сделай красивую кнопку.
```

**Проблемы:**
- Что значит "красивую"?
- Какой размер?
- Какой цвет?
- Какая технология?

**Результат:** Claude угадывает, может быть не то что нужно.

---

#### ✅ Хороший промпт

```
Создай Button компонент:

Дизайн:
- Size: 200×48px
- Background: #007BFF (синий)
- Text: "Click me", белый, Inter 16px Bold
- Border-radius: 8px
- Shadow: 0 2px 4px rgba(0,0,0,0.1)
- Hover: фон темнее (#0056B3)

Используй React + TypeScript + styled-components.
```

**Результат:** Точно то что нужно!

---

### Anti-Pattern 2: Missing Context (Нет контекста)

#### ❌ Плохой промпт

```
Добавь валидацию к форме.
```

**Проблемы:**
- Какой форме? (Claude не видит предыдущий код)
- Какую валидацию?
- Когда проверять?

---

#### ✅ Хороший промпт

```
В компоненте LoginForm (файл: src/components/LoginForm.tsx)
добавь валидацию:

Email field:
- Required: "Email is required"
- Format: должен быть valid email, "Invalid email format"
- Проверять: onBlur (после потери фокуса)

Password field:
- Required: "Password is required"
- Min length: 8 символов, "Password must be at least 8 characters"
- Проверять: onChange (в реальном времени)

Показывать ошибки:
- Под полем, красным цветом
- Использовать компонент ErrorMessage из Material-UI

Disable кнопку Submit если есть ошибки.

Текущий код использует react-hook-form, продолжай использовать его.
```

---

### Anti-Pattern 3: No Artifact (Нет артефакта)

#### ❌ Плохой промпт

```
Создай страницу product details.
```

**Проблемы:**
- Какая структура?
- Где что расположено?
- Сколько секций?

---

#### ✅ Хороший промпт

```
Создай страницу Product Details по этому wireframe:

┌────────────────────────────────┐
│ [Header with cart]             │
├──────┬─────────────────────────┤
│      │ ┌──────┐                │
│ [Nav]│ │Image │  Title         │
│      │ └──────┘  Price         │
│      │ [thumb]   Rating        │
│      │ [thumb]   [Add to Cart] │
│      │           Description   │
│      │           [Related]     │
└──────┴─────────────────────────┘

Используй React + Material-UI.
```

---

### Anti-Pattern 4: Technology Mismatch (Несовместимые технологии)

#### ❌ Плохой промпт

```
Используй Vue компоненты с React hooks.
```

**Проблема:** Vue и React — разные frameworks!

---

#### ✅ Хороший промпт

```
Создай компонент используя React:
- Hooks: useState, useEffect
- TypeScript
- Material-UI для UI
- styled-components для кастомных стилей
```

---

### Anti-Pattern 5: Overloaded Single Prompt (Перегруженный промпт)

#### ❌ Плохой промпт

```
Создай полное e-commerce приложение с главной страницей, каталогом,
страницей товара, корзиной, checkout, профилем пользователя,
admin панелью, аналитикой, уведомлениями, чатом поддержки,
блогом, и всё это с полной адаптивностью, анимациями,
dark mode, multilingual support, и SEO оптимизацией.
```

**Проблема:** Слишком много в одном промпте!

---

#### ✅ Хороший промпт (разбить на шаги)

```
Шаг 1: Создай структуру e-commerce приложения:

Страницы (маршруты):
- / - Home page
- /products - Product catalog
- /product/:id - Product details
- /cart - Shopping cart
- /checkout - Checkout

Создай базовую структуру с React Router, без детальной реализации.
```

Затем для каждой страницы — отдельный промпт!

---

### Anti-Pattern 6: No Specs (Нет спецификаций)

#### ❌ Плохой промпт

```
Реализуй дизайн из Figma.
```

**Проблемы:**
- Claude не видит Figma!
- Какие цвета?
- Какие размеры?

---

#### ✅ Хороший промпт

```
Реализуй Button из Figma по этим specs:

(Извлечённые спецификации из Figma Inspect):

Size: 200×48px
Background: #007BFF
Border-radius: 8px
Text: Inter, 16px, Bold, #FFFFFF
Shadow: 0 2px 4px rgba(0,0,0,0.1)
Padding: 12px 24px

Hover:
- Background: #0056B3
- Shadow: 0 4px 8px rgba(0,0,0,0.15)
- Transform: translateY(-1px)

Используй React + styled-components.
```

---

### Anti-Pattern 7: Ignoring Responsive (Игнорировать адаптивность)

#### ❌ Плохой промпт

```
Создай header с logo и навигацией.
```

**Проблема:** Как выглядит на mobile?

---

#### ✅ Хороший промпт

```
Создай responsive header:

Desktop (>1024px):
[Logo] [Nav Nav Nav Nav] [Search] [User]

Tablet (768-1023px):
[Logo] [Nav Nav] [Search] [☰]

Mobile (<768px):
[☰] [Logo] [🔍]

На mobile: навигация в burger menu, открывается slide-in слева.

Breakpoints: 768px, 1024px.
```

---

### Anti-Pattern 8: No States (Нет состояний)

#### ❌ Плохой промпт

```
Создай форму логина.
```

**Проблемы:**
- Что показывать во время loading?
- Как выглядят ошибки?
- Что если поля пустые?

---

#### ✅ Хороший промпт

```
Создай форму логина со всеми состояниями:

Default:
- Пустые поля
- Button enabled

Validation Error:
- Красная border на поле с ошибкой
- Текст ошибки под полем (красный)
- Button disabled

Loading:
- Button: spinner + "Logging in..."
- Disable всю форму

Success:
- Green toast: "Logged in successfully!"
- Redirect на /dashboard

Server Error:
- Red alert над формой: error message
- Button enabled (можно retry)

Используй React + react-hook-form + Material-UI.
```

---

### Anti-Pattern 9: No Accessibility (Игнорировать доступность)

#### ❌ Плохой промпт

```
Создай modal окно.
```

**Проблема:** Modal без a11y — плохой UX!

---

#### ✅ Хороший промпт

```
Создай accessible Modal компонент:

Functionality:
- Open/close анимация (fade + scale)
- Click outside → close
- ESC key → close
- Focus trap внутри modal

Accessibility:
- Role: "dialog"
- aria-modal="true"
- aria-labelledby: связать с заголовком
- aria-describedby: связать с описанием
- Focus management:
  - При открытии: focus на первый focusable element
  - При закрытии: вернуть focus на trigger button
- Keyboard:
  - Tab: циклично внутри modal
  - ESC: закрыть
  - Enter на кнопках: trigger action

Overlay:
- Background: rgba(0,0,0,0.5)
- Backdrop-filter: blur(4px)
- Click → close modal

Используй React + Chakra UI (Modal компонент уже accessible,
но покажи как правильно использовать).
```

---

### Anti-Pattern 10: No Performance Considerations (Игнорировать производительность)

#### ❌ Плохой промпт

```
Создай галерею с 1000 изображений.
```

**Проблема:** 1000 images загрузятся все сразу = slow!

---

#### ✅ Хороший промпт

```
Создай optimized image gallery с 1000 изображений:

Performance optimizations:
- Virtualization: показывать только видимые images (react-window)
- Lazy loading: загружать images по мере scroll
- Progressive loading:
  - Сначала blur placeholder
  - Потом low-quality image
  - Потом full-quality
- Image optimization:
  - WebP format с JPG fallback
  - Responsive images (srcset)
  - CDN URLs

Pagination (alternative):
- 20 images per page
- Infinite scroll
- Loading spinner во время fetch

Grid:
- Desktop: 4 columns
- Tablet: 3 columns
- Mobile: 2 columns
- Masonry layout (different heights)

Используй:
- React + TypeScript
- react-window для virtualization
- react-lazy-load-image-component для lazy loading
```

---

## 💡 Часть 5: Advanced Techniques (Продвинутые техники)

### Technique 1: Context Management (Управление контекстом)

**Проблема:** Claude забывает предыдущий код.

**Решение:** Напоминай контекст в каждом промпте.

```
📝 ХОРОШИЙ ПРОМПТ:

В проекте AI Learning Agent:

Файл: frontend/src/components/LessonViewer.tsx
Текущий код использует: React + TypeScript + Material-UI

Задача: Добавь прогресс-бар показывающий % прочитанного урока.

Контекст:
- LessonViewer уже рендерит markdown контент
- Используется react-markdown
- Есть scroll container с id "lesson-content"

Требования:
- Fixed position top (под header)
- Progress bar: 0-100% based на scroll position
- Цвет: primary theme color
- Height: 4px
- Transition: smooth

Сохрани существующий функционал, только добавь progress bar.
```

**Ключ:** Указывай файл, текущий стек, и что уже есть.

---

### Technique 2: Multi-Step Workflow (Многошаговый процесс)

**Используй для сложных задач.**

#### Step 1: Plan

```
📝 ПРОМПТ:

Мне нужно создать feature: Multi-step registration form с 3 шагами.

Шаги:
1. Personal Info (name, email)
2. Account Setup (username, password)
3. Preferences (notifications, theme)

Технологии: React + TypeScript + Material-UI

Задача сейчас: НЕ ПИШИ КОД, только составь план:
- Какая структура компонентов?
- Какие state нужны?
- Какая навигация между шагами?
- Какая валидация?

Распиши детальный план реализации.
```

**Claude создаст план.**

---

#### Step 2: Implement Structure

```
📝 ПРОМПТ:

Отлично, план понятен. Начнём реализацию.

Шаг 1: Создай базовую структуру:

Files:
- MultiStepForm.tsx (main component)
- Step1PersonalInfo.tsx
- Step2AccountSetup.tsx
- Step3Preferences.tsx
- useMultiStepForm.ts (custom hook для state management)

Только структура:
- Пустые компоненты с TypeScript types
- Navigation между шагами (next/back buttons)
- Progress indicator (1/3, 2/3, 3/3)
- State management в custom hook

Без детальной реализации полей (добавим в следующих шагах).
```

**Claude создаст структуру.**

---

#### Step 3: Implement Step 1

```
📝 ПРОМПТ:

Шаг 2: Реализуй Step 1 (Personal Info):

Поля:
- First Name (required, min 2 chars)
- Last Name (required, min 2 chars)
- Email (required, valid email)
- Phone (optional, format +1 XXX-XXX-XXXX)

Используй:
- Material-UI TextField
- react-hook-form для валидации
- Error messages под полями

Layout:
- 2 columns на desktop (First Name | Last Name)
- 1 column на mobile (stacked)
- Button "Next" внизу справа
- Disabled если есть ошибки

Файл: Step1PersonalInfo.tsx
```

**Claude реализует Step 1.**

---

#### Step 4: Implement Steps 2 & 3

```
(Аналогично Step 3, но для других шагов)
```

---

#### Step 5: Polish & Integration

```
📝 ПРОМПТ:

Финальный шаг: Полировка и интеграция.

Добавь:
1. Анимации между шагами (slide transitions)
2. Save draft functionality (localStorage)
3. Review screen (показать все данные перед submit)
4. Submit to API (mock function)
5. Success screen с confetti animation

Используй:
- Framer Motion для transitions
- react-confetti для success animation
```

**Claude добавит полировку.**

---

**Результат:** Полноценный multi-step form, созданный пошагово!

---

### Technique 3: Iterative Refinement (Итеративное улучшение)

**Сначала работающий код, потом улучшения.**

#### Iteration 1: Make it work

```
📝 ПРОМПТ:

Создай простой поиск по продуктам:

Input field + кнопка Search.
При клике: filter products array и показать результаты.
Без стилей, без оптимизаций, просто чтобы работало.

React + TypeScript.
```

**Claude создаст базовую версию.**

---

#### Iteration 2: Make it right

```
📝 ПРОМПТ:

Улучшим search:

1. Real-time search (без кнопки, onChange)
2. Debounce 300ms (не искать при каждом символе)
3. Highlight найденные слова в результатах
4. Показывать "No results" если ничего не найдено
5. Loading indicator во время search

Оптимизируй производительность.
```

---

#### Iteration 3: Make it fast

```
📝 ПРОМПТ:

Финальная оптимизация search:

1. Мemoization результатов (useMemo)
2. Виртуализация списка (react-window) если >100 результатов
3. Индекс для быстрого поиска (pre-process data)
4. Web Worker для heavy search (если >10000 items)

Сделай максимально быстрым.
```

---

### Technique 4: Component Composition (Композиция компонентов)

**Создавай маленькие компоненты, затем комбинируй.**

#### Step 1: Atomic Components

```
📝 ПРОМПТ:

Создай атомарные компоненты для Product Card:

1. ProductImage.tsx
   - Props: src, alt, size
   - Lazy loading
   - Placeholder пока грузится

2. ProductTitle.tsx
   - Props: children, level (h1/h2/h3)
   - Ellipsis если длинный (2 строки max)

3. ProductPrice.tsx
   - Props: current, old, discount
   - Formatting: $99.99
   - Red color для current, gray line-through для old

4. ProductRating.tsx
   - Props: value (1-5), count
   - Stars: filled/empty
   - Text: "(4.5 out of 5, 120 reviews)"

5. ProductBadge.tsx
   - Props: text, variant (sale/new/featured)
   - Colors по variant

Каждый компонент в отдельном файле.
Только UI, без логики.
TypeScript с props types.
```

---

#### Step 2: Compose

```
📝 ПРОМПТ:

Теперь создай ProductCard композицией атомарных компонентов:

ProductCard.tsx:
- Использует: ProductImage, ProductTitle, ProductPrice, ProductRating, ProductBadge
- Layout: Card из Material-UI
- Hover эффект: elevation
- Click: navigate to product page

Props:
- product: { id, name, image, price, oldPrice, rating, reviewsCount, badges }
- onClick: (id: string) => void

Compose все атомарные компоненты в один Card.
```

---

**Результат:** Модульный, переиспользуемый код!

---

### Technique 5: Design Patterns (Паттерны дизайна)

**Используй известные паттерны в промптах.**

#### Compound Components Pattern

```
📝 ПРОМПТ:

Создай Accordion компонент используя Compound Components pattern:

API:
<Accordion>
  <Accordion.Item>
    <Accordion.Header>Title 1</Accordion.Header>
    <Accordion.Panel>Content 1</Accordion.Panel>
  </Accordion.Item>

  <Accordion.Item>
    <Accordion.Header>Title 2</Accordion.Header>
    <Accordion.Panel>Content 2</Accordion.Panel>
  </Accordion.Item>
</Accordion>

Реализация:
- Context API для shared state
- Только один panel открыт одновременно (или multiple если allowMultiple=true)
- Анимация expand/collapse
- Keyboard navigation (Arrow keys)

Compound Components даёт гибкость в использовании.
```

---

#### Render Props Pattern

```
📝 ПРОМПТ:

Создай DataFetcher компонент используя Render Props pattern:

API:
<DataFetcher url="/api/products">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <Error message={error} />;
    return <ProductList products={data} />;
  }}
</DataFetcher>

Реализация:
- Fetch data on mount
- Handle loading, error, success states
- Retry mechanism
- Cancel request on unmount
- TypeScript generics для типа data

Render Props даёт контроль над рендерингом.
```

---

#### Custom Hook Pattern

```
📝 ПРОМПТ:

Создай useProductFilters custom hook:

API:
const {
  products,           // filtered products
  filters,            // current filters
  setFilter,          // update single filter
  clearFilters,       // reset all
  isLoading,          // loading state
  count,              // filtered count
} = useProductFilters(allProducts);

Filters:
- category: string[]
- priceRange: [min, max]
- rating: number (min)
- inStock: boolean

Features:
- Multiple filters applied simultaneously (AND logic)
- Debounced filtering (300ms)
- Memoized results
- TypeScript types

Custom Hook инкапсулирует логику фильтрации.
```

---

### Technique 6: Test-Driven Prompts (TDD подход)

**Сначала тесты, потом реализация.**

```
📝 ПРОМПТ:

Создай Button компонент используя TDD подход:

Step 1: Напиши тесты (Button.test.tsx):

Тесты:
1. Рендерится с текстом
2. Вызывает onClick при клике
3. Disabled кнопка не кликается
4. Показывает loading spinner когда isLoading=true
5. Применяет правильный variant class
6. Forward ref работает
7. Keyboard: Enter и Space trigger click

Используй @testing-library/react.

Step 2: После того как тесты написаны,
реализуй Button компонент так, чтобы все тесты прошли.
```

**Результат:** Хорошо протестированный компонент!

---

## ✅ Часть 6: Cheat Sheet (Шпаргалка)

### Quick Reference: Prompt Templates

#### Template 1: Simple Component

```
Создай [Component] компонент:

Props:
- [prop]: [type] - [description]

Visual:
[ASCII or description]

Styles:
- [property]: [value]

Используй: [tech stack]
```

---

#### Template 2: Page/Screen

```
Создай страницу [Name]:

Layout:
[Wireframe]

Sections:
1. [Section 1] - [description]
2. [Section 2] - [description]

Components:
- [Component 1] from [library]
- [Component 2] custom

Data:
- [Data source or mock]

Responsive:
- Desktop: [layout]
- Mobile: [layout]

Используй: [tech stack]
```

---

#### Template 3: Feature

```
Реализуй feature: [Name]

User Story:
Как [role], я хочу [action], чтобы [benefit]

Acceptance Criteria:
- [ ] [Criterion 1]
- [ ] [Criterion 2]

Flow:
[State 1] → (action) → [State 2]

UI:
[Design specs or wireframe]

Tech:
- [Stack]
- [Libraries]

Edge Cases:
- [Case 1]: [handling]
- [Case 2]: [handling]
```

---

#### Template 4: Refactoring

```
Рефакторинг: [File/Component]

Текущий код:
[Описание текущего состояния]

Проблемы:
- [Problem 1]
- [Problem 2]

Цель:
[What to achieve]

Изменения:
1. [Change 1]
2. [Change 2]

Сохрани:
- [Functionality to keep]
- [API compatibility]

Используй: [patterns/techniques]
```

---

### Checklist: Before Sending Prompt

**Проверь что включено:**
- [ ] Задача (что делать)
- [ ] Артефакт (wireframe/mockup/описание)
- [ ] Спецификации (colors, fonts, spacing)
- [ ] Технологии (React, TypeScript, библиотеки)
- [ ] Состояния (default, hover, loading, error)
- [ ] Адаптивность (breakpoints, mobile/desktop)
- [ ] Accessibility (если важно)
- [ ] Контекст (если продолжаешь предыдущую работу)

---

### Checklist: After Receiving Code

**Проверь результат:**
- [ ] Код компилируется без ошибок
- [ ] Визуально соответствует дизайну
- [ ] Все состояния реализованы
- [ ] Responsive работает
- [ ] Interactions работают
- [ ] TypeScript types корректные
- [ ] No console warnings
- [ ] Performance OK (нет лагов)

---

## 🎓 Часть 7: Masterclass Examples (Полные примеры)

### Example 1: E-commerce Product Page (Полный workflow)

#### Context

```
Проект: E-commerce магазин
Технологии: React, TypeScript, Next.js, Tailwind CSS
UI библиотека: Headless UI
Текущий прогресс: Есть header, footer, home page
Задача: Создать Product Details page
```

---

#### Prompt 1: Planning

```
📝 ПРОМПТ 1: ПЛАН

Мне нужно создать Product Details page для e-commerce проекта.

Технологии:
- Next.js 13 (App Router)
- React + TypeScript
- Tailwind CSS
- Headless UI для интерактивных компонентов
- SWR для data fetching
- Framer Motion для анимаций

Задача сейчас: Составь детальный план реализации.

Что должно быть на странице:
- Image gallery (main image + thumbnails)
- Product info (title, price, rating, description)
- Options selector (size, color)
- Quantity selector
- Add to cart button
- Tabs (Description, Specifications, Reviews)
- Related products carousel

НЕ ПИШИ КОД, только распиши:
1. Структуру файлов
2. Компоненты (какие нужны)
3. State management (что хранить где)
4. Data flow (откуда данные)
5. Порядок реализации (что делать первым)
```

**Claude создаст план. Например:**

```
ПЛАН РЕАЛИЗАЦИИ:

1. Структура файлов:
app/
  product/
    [id]/
      page.tsx                    # Main page
      loading.tsx                 # Loading state
      error.tsx                   # Error state
components/
  product/
    ImageGallery.tsx
    ProductInfo.tsx
    OptionsSelector.tsx
    QuantitySelector.tsx
    AddToCartButton.tsx
    ProductTabs.tsx
    RelatedProducts.tsx
lib/
  api/
    products.ts                   # API functions
  store/
    cart-context.tsx              # Cart state
types/
  product.ts                      # TypeScript types

2. Компоненты:
- ProductPage (main container)
- ImageGallery (3 sub-components: MainImage, Thumbnails, Lightbox)
- ProductInfo (displays title, price, rating, short desc)
- OptionsSelector (size, color radios)
- QuantitySelector (+/- buttons)
- AddToCartButton (with loading state)
- ProductTabs (Headless UI Tabs)
- RelatedProducts (horizontal scroll carousel)

3. State:
Global (Context):
- Cart items
- Cart count

Local (component state):
- Selected image (which thumbnail)
- Selected options (size, color)
- Quantity (number)
- Active tab (which tab open)
- Lightbox open (boolean)

4. Data:
- Product data: fetch from API (/api/products/[id])
- Related products: fetch from API (/api/products/related/[id])
- Reviews: fetch on tab open (/api/reviews/[productId])
- Use SWR for caching

5. Порядок:
Step 1: Setup types and API functions
Step 2: Create ProductPage with basic layout
Step 3: Implement ImageGallery
Step 4: Implement ProductInfo
Step 5: Implement Selectors (options, quantity)
Step 6: Implement AddToCart button with cart context
Step 7: Implement Tabs
Step 8: Implement RelatedProducts
Step 9: Add loading/error states
Step 10: Add animations and polish
```

---

#### Prompt 2: Types & API

```
📝 ПРОМПТ 2: TYPES & API

Отлично, план понятен. Начнём с типов и API.

Создай:

1. types/product.ts:
TypeScript types для:
- Product (id, name, description, price, oldPrice, images, options, stock, rating, reviewsCount, category, brand, specifications)
- ProductOption (type: 'size'|'color', values: string[], selected?: string)
- CartItem (productId, quantity, selectedOptions)
- Review (id, userId, userName, rating, comment, date)

2. lib/api/products.ts:
API functions (используй fetch + SWR):
- getProduct(id: string): Promise<Product>
- getRelatedProducts(productId: string): Promise<Product[]>
- getReviews(productId: string): Promise<Review[]>

Mock endpoints пока (реальный API добавим позже):
- /api/products/[id] → return mock product
- /api/products/related/[id] → return 4 mock products
- /api/reviews/[id] → return mock reviews

3. lib/store/cart-context.tsx:
React Context для cart:
- State: items: CartItem[], count: number
- Actions: addToCart, removeFromCart, updateQuantity, clearCart
- Persist в localStorage

Создай эти 3 файла с полным кодом.
```

---

#### Prompt 3: Main Page Structure

```
📝 ПРОМПТ 3: PAGE STRUCTURE

Создай основную структуру страницы:

Файл: app/product/[id]/page.tsx

Layout (используй Tailwind):
┌────────────────────────────────────────┐
│ [Breadcrumbs]                          │
├─────────────────┬──────────────────────┤
│                 │                      │
│  ImageGallery   │  ProductInfo         │
│  (500×500px)    │  - Title             │
│                 │  - Rating            │
│  [Thumbnails]   │  - Price             │
│                 │  - Options           │
│                 │  - Quantity          │
│                 │  - [Add to Cart]     │
│                 │                      │
└─────────────────┴──────────────────────┘
│                                        │
│  [Tabs: Description | Specs | Reviews]│
│                                        │
│  [Related Products Carousel]          │
│                                        │
└────────────────────────────────────────┘

Реализуй:
- Next.js page component с params
- Fetch product data с SWR
- 2-column grid на desktop, 1 column на mobile
- Breadcrumbs (Home > Category > Product Name)
- Передавай данные в дочерние компоненты

Дочерние компоненты пока заглушки:
- <ImageGallery images={product.images} />
- <ProductInfo product={product} />
- <ProductTabs product={product} />
- <RelatedProducts productId={product.id} />

Loading state: Skeleton loader
Error state: Error message с retry button

Responsive:
- Desktop (>1024px): 2 columns (50% / 50%)
- Mobile (<1024px): 1 column (stack)
```

---

#### Prompt 4: ImageGallery Component

```
📝 ПРОМПТ 4: IMAGE GALLERY

Создай ImageGallery компонент:

Файл: components/product/ImageGallery.tsx

Props:
- images: string[] (URLs)

Structure:
┌─────────────────────┐
│                     │
│   Main Image        │ ← 500×500px
│   (selected)        │
│                     │
└─────────────────────┘
┌────┐┌────┐┌────┐┌────┐
│ T1 ││ T2 ││ T3 ││ T4 │ ← Thumbnails, 80×80px each
└────┘└────┘└────┘└────┘

Functionality:
- Click на thumbnail → меняет main image (fade transition)
- Hover на main image → zoom cursor (cursor: zoom-in)
- Click на main image → открыть Lightbox

Lightbox (full-screen):
- Background: rgba(0,0,0,0.95)
- Image: centered, max 90vw×90vh
- Close button: X верхний правый угол
- Click outside → close
- ESC key → close
- Navigation: ← → arrows (prev/next image)
- Swipe на mobile (touch gestures)
- Image counter: "2 / 5" нижний центр

Анимации (Framer Motion):
- Image change: fade (200ms)
- Lightbox open: scale(0.8) → scale(1), fade
- Lightbox close: scale(0.9), fade

Thumbnails:
- Selected: border 2px solid blue
- Hover: border 1px solid gray
- Grid: 4 per row на desktop, 2 on mobile

Используй:
- Framer Motion для анимаций
- Headless UI Dialog для Lightbox
- react-swipeable для touch gestures на mobile

Создай с полным кодом.
```

---

#### Prompt 5: ProductInfo Component

```
📝 ПРОМПТ 5: PRODUCT INFO

Создай ProductInfo компонент:

Файл: components/product/ProductInfo.tsx

Props:
- product: Product

Layout:
Title (H1, 32px, bold)
Rating (★★★★☆ 4.5 out of 5, 120 reviews)
Price ($99.99 ~~$149.99~~ -33%)

Options:
  Size: ○ S  ● M  ○ L  ○ XL
  Color: ○ Black ● Blue ○ Red

Quantity: [-] 1 [+]

[Add to Cart 🛒]

[❤ Add to Wishlist]

Short description...

Styles (Tailwind):
- Title: text-3xl font-bold text-gray-900
- Rating: flex items-center gap-2
  - Stars: text-yellow-400, 20px
  - Text: text-gray-600, 14px
- Price:
  - Current: text-4xl font-bold text-red-600
  - Old: text-2xl text-gray-400 line-through
  - Discount: bg-red-100 text-red-800 px-2 py-1 rounded text-sm

Options Selector:
- Radio buttons styled as buttons
- Selected: bg-blue-600 text-white border-blue-600
- Unselected: bg-white text-gray-700 border-gray-300
- Hover: border-blue-400
- Size: 48×48px (size), 40×40px (color circle)

Quantity:
- [-] [1] [+] buttons
- Center aligned, 40px height
- Min: 1, Max: stock count
- Disable buttons at min/max

Add to Cart Button:
- Full width, 56px height
- bg-blue-600 hover:bg-blue-700
- White text, 18px, semibold
- Icon 🛒 перед текстом
- Loading state: spinner + "Adding..."
- Click → добавить в cart context → show toast

Wishlist Button:
- Outline style
- Heart icon (❤ fill when added)
- Toggle favorite

Используй:
- useCart hook (from cart context)
- react-hot-toast для notifications
- State для selected options и quantity

Создай полный компонент.
```

---

#### Prompt 6: Tabs Component

```
📝 ПРОМПТ 6: PRODUCT TABS

Создай ProductTabs компонент:

Файл: components/product/ProductTabs.tsx

Props:
- product: Product

Tabs (используй Headless UI Tabs):
1. Description
2. Specifications
3. Reviews (count)

Tab content:

Description:
- Full description текст
- Typography: text-gray-700, leading-relaxed
- Max-width: 800px

Specifications:
- Table: 2 columns (Spec name | Value)
- Example:
  Brand        | Nike
  Material     | Cotton
  Weight       | 200g
  Made in      | USA
- Striped rows (alternate bg-gray-50)

Reviews:
- List reviews
- Each review:
  ┌─────────────────────────────┐
  │ [Avatar] John Doe  ★★★★★    │
  │          2 days ago         │
  │                             │
  │ Great product! I love it... │
  │                             │
  │ [👍 Helpful (12)] [Report]  │
  └─────────────────────────────┘
- Pagination: 5 reviews per page
- Sort by: Most recent / Highest rating
- Write review button → opens modal

Styles:
- Tab buttons: border-b-2, active: border-blue-600
- Spacing: py-8 для content
- Animations: fade content при switch

Используй:
- Headless UI Tabs
- Framer Motion для fade
- Modal для write review (Headless UI Dialog)

Создай полный компонент с mock reviews data.
```

---

#### Prompt 7: RelatedProducts Component

```
📝 ПРОМПТ 7: RELATED PRODUCTS

Создай RelatedProducts компонент:

Файл: components/product/RelatedProducts.tsx

Props:
- productId: string

Fetch related products (SWR):
- /api/products/related/[productId]
- Returns 6-8 products

Layout:
Heading: "You might also like"
[←] [Card] [Card] [Card] [Card] [→]

Cards (mini product cards):
┌──────────┐
│ [Image]  │ 150×150px
│ Title    │ 1 line, ellipsis
│ $49.99   │
│ ★★★★☆   │
└──────────┘

Carousel:
- Horizontal scroll
- Snap scroll (scroll-snap-type)
- Navigation arrows (только если overflow)
- Show 4 cards на desktop, 2 на tablet, 1 на mobile
- Gap: 16px

Hover:
- Card elevation (shadow-lg)
- Transform translateY(-4px)

Click:
- Navigate to /product/[id]

Используй:
- SWR для fetch
- Keen-slider или embla-carousel для carousel
- Skeleton loader для loading state

Создай с полным кодом.
```

---

#### Prompt 8: Loading & Error States

```
📝 ПРОМПТ 8: LOADING & ERROR

Создай loading и error states:

1. app/product/[id]/loading.tsx:
Skeleton loader layout повторяющий структуру:
- Image skeleton (500×500px gray rectangle, pulse animation)
- 4 thumbnail skeletons
- Title skeleton (3 lines, different widths)
- Price skeleton
- Button skeletons
- Tabs skeleton

2. app/product/[id]/error.tsx:
Error UI:
┌──────────────────┐
│ ❌ Error Icon    │
│                  │
│ Oops! Product    │
│ not found        │
│                  │
│ [← Back to Shop] │
└──────────────────┘

Используй:
- Tailwind для skeleton animation (animate-pulse)
- Centered layout для error
- Next.js error.tsx conventions

3. Обнови page.tsx:
Обработай edge cases:
- Product не найден → redirect to error page
- Images пустой массив → показать placeholder
- Out of stock → disable "Add to Cart", показать "Out of Stock" badge

Создай эти файлы.
```

---

#### Prompt 9: Polish & Animations

```
📝 ПРОМПТ 9: POLISH

Финальная полировка:

1. Анимации (Framer Motion):
- Page появление: fade + slide up (500ms)
- Add to Cart button: scale(0.95) → scale(1) on click
- Toast notifications: slide-in from top
- Tabs content: fade (200ms)
- Related products: stagger появление (каждая карточка +100ms)

2. Accessibility:
- Alt text для всех images
- ARIA labels для buttons (особенно +/- quantity)
- Focus states: visible outline (ring-2 ring-blue-500)
- Keyboard navigation:
  - Tab через все интерактивные элементы
  - Enter/Space на buttons
  - Arrow keys в image gallery

3. Performance:
- Images: next/image с priority для main image
- Lazy load: thumbnails и related products
- Code splitting: Lightbox (React.lazy)
- Memoization: useMemo для filtered/sorted data

4. SEO (Next.js):
- Metadata: title, description из product
- Open Graph tags для social sharing
- Schema.org structured data (Product schema)

5. Mobile UX:
- Touch-friendly: buttons min 44×44px
- Sticky "Add to Cart" button на mobile (fixed bottom)
- Swipe gestures в gallery
- Pull-to-refresh (optional)

Примени все улучшения к существующему коду.
```

---

#### Prompt 10: Testing (Optional)

```
📝 ПРОМПТ 10: TESTS (OPTIONAL)

Создай тесты для критичных компонентов:

1. ProductInfo.test.tsx:
- Рендерит product data правильно
- Quantity selector работает (min/max)
- Add to cart вызывает cart context
- Options selector меняет state

2. ImageGallery.test.tsx:
- Click на thumbnail меняет main image
- Click на main image открывает lightbox
- ESC закрывает lightbox
- Navigation arrows работают

3. E2E test (Playwright):
- Открыть product page
- Выбрать options
- Изменить quantity
- Add to cart
- Проверить cart count обновился

Используй:
- @testing-library/react
- @testing-library/user-event
- MSW для mock API
- Playwright для E2E

Создай test files.
```

---

**Результат:** Полноценная Product Details page, production-ready!

---

## 📝 Резюме: Key Takeaways

### 1. Структура промпта

```
✅ Задача + Артефакт + Спецификации + Технологии + Требования = Идеальный промпт
```

### 2. Типы артефактов

```
Wireframe  → Структура (Lo-Fi)
Mockup     → Визуал (Hi-Fi)
Prototype  → Интерактивность
Design System → Правила и токены
Component Library → Готовые компоненты
Figma Specs → Pixel-perfect детали
```

### 3. Progressive Prompting

```
Lo-Fi → Add Styles → Hi-Fi → Interactions → States → Polish
(Маленькие шаги лучше чем один большой)
```

### 4. Избегай Anti-Patterns

```
❌ Vague → ✅ Specific
❌ No Context → ✅ Clear Context
❌ No Artifact → ✅ Visual Structure
❌ Overloaded → ✅ Focused
❌ No States → ✅ All States
```

### 5. Продвинутые техники

```
- Context Management (напоминай контекст)
- Multi-Step Workflow (разбивай на шаги)
- Iterative Refinement (сначала работает, потом полируй)
- Component Composition (атомы → молекулы → организмы)
- Design Patterns (используй паттерны)
```

### 6. Checklist перед промптом

```
[ ] Задача понятна
[ ] Артефакт есть (wireframe/mockup/описание)
[ ] Спецификации точные (colors, fonts, spacing)
[ ] Технологии указаны (React, TypeScript, библиотеки)
[ ] Состояния описаны (hover, loading, error)
[ ] Responsive определён (breakpoints)
[ ] Accessibility учтён (если важно)
[ ] Контекст дан (если продолжение)
```

---

## 🚀 Поздравляю! Модуль 2 Завершён!

**Ты прошёл все 6 уроков модуля Artifacts:**

✅ 2.1 - What are Artifacts (Что такое артефакты)
✅ 2.2 - Wireframes, Mockups, Prototypes
✅ 2.3 - Design Systems & Style Guides
✅ 2.4 - Component Libraries & UI Kits
✅ 2.5 - Design → Dev Handoff Process
✅ 2.6 - **Prompting with Artifacts (Masterclass)** ← Ты здесь!

**Теперь ты умеешь:**
- 🎯 Формулировать precise задачи для Claude Code
- 🎨 Использовать все типы артефактов в промптах
- 📐 Создавать production-ready код с первой попытки
- 🔄 Применять progressive prompting
- 💡 Использовать продвинутые техники
- ⚠️ Избегать типичных ошибок

**Что дальше?**

Переходи к **Модулю 3: Responsive Design** где научишься:
- Mobile-first подход
- CSS Grid и Flexbox mastery
- Breakpoints и media queries
- Responsive images
- Touch interactions

---

## 🔗 Полезные ресурсы

**Практика:**
- **Frontend Mentor** - https://www.frontendmentor.io (задачи с дизайном)
- **Dribbble** - https://dribbble.com (дизайн inspiration)
- **CodePen** - https://codepen.io (примеры кода)

**Документация:**
- **React** - https://react.dev
- **TypeScript** - https://www.typescriptlang.org
- **Tailwind CSS** - https://tailwindcss.com
- **Framer Motion** - https://www.framer.com/motion

**Инструменты:**
- **Figma** - https://www.figma.com
- **Material-UI** - https://mui.com
- **Chakra UI** - https://chakra-ui.com
- **shadcn/ui** - https://ui.shadcn.com

**Обучение:**
- **Refactoring UI** - книга о дизайне для разработчиков
- **Every Layout** - https://every-layout.dev (CSS layouts)
- **Laws of UX** - https://lawsofux.com

---

## 💪 Практическое задание

**Финальный проект модуля 2:**

Создай полноценную страницу **Course Details** для AI Learning Agent:

**Требования:**
1. Используй wireframe + mockup + prototype approach
2. Примени прогрессивный промптинг (5+ шагов)
3. Используй Material-UI или Chakra UI
4. Реализуй все состояния (loading, error, success)
5. Полная адаптивность (mobile, tablet, desktop)
6. Анимации (Framer Motion)
7. TypeScript types
8. Accessibility (a11y)

**Секции страницы:**
- Hero (название курса, описание, instructor)
- Stats (уроков, часов, level)
- Syllabus (список modules и lessons)
- Reviews (рейтинг и отзывы)
- Instructor info
- Related courses
- Enroll button (sticky на mobile)

**Workflow:**
1. Создай wireframe (ASCII)
2. Определи design tokens
3. Спланируй компоненты
4. Реализуй step-by-step (6-8 промптов)
5. Добавь polish

**Время:** 2-3 часа (с Claude Code!)

**Дедлайн:** Нет! Делай в своём темпе.

---

**Готов к следующему модулю?** → **Module 3: Responsive Design awaits!** 🚀
