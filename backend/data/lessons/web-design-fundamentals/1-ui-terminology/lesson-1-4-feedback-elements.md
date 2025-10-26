# Урок 1.4: Feedback Elements (Элементы обратной связи)

> **Модуль 1:** UI Terminology
> **Урок:** 1.4
> **Длительность:** 45-60 минут
> **Prerequisite:** Урок 1.3 (Interactive Elements)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Правильно называть элементы обратной связи (Modal, Toast, Loading, Progress, Badge, Tooltip)
- ✅ Понимать разницу между Modal и Toast
- ✅ Объяснить когда использовать Loading Spinner vs Progress Bar
- ✅ Формулировать задачи для Claude Code с правильной терминологией feedback элементов

---

## 📖 Концепция: Что такое Feedback Elements?

### Простое определение

**Feedback Elements (элементы обратной связи)** — это элементы интерфейса, которые информируют пользователя о результате действий, состоянии системы или дополнительной информации.

**Важно:** Без feedback элементов пользователь не знает что происходит. Нажал кнопку — загружается? Ошибка? Успех?

**Аналогия:** Светофор — даёт обратную связь (красный = стой, зелёный = иди)

---

## 💬 Основные Feedback Elements

### 1. Modal / Dialog (Модальное окно)

**Что это:**
- Всплывающее окно поверх основного контента
- Блокирует взаимодействие с основным контентом
- Требует действия от пользователя (подтвердить, отменить, закрыть)

**Аналогия:** Дверной звонок — пока не ответишь, он требует внимания

```
┌─────────────────────────────────────────┐
│ Main content (затемнено, заблокировано) │
│                                         │
│     ┌─────────────────────────────┐     │
│     │ Modal Title              ✕ │     │
│     ├─────────────────────────────┤     │
│     │                             │     │
│     │ Modal Content               │     │
│     │                             │     │
│     ├─────────────────────────────┤     │
│     │ [Cancel]     [Confirm]     │     │
│     └─────────────────────────────┘     │
│                                         │
└─────────────────────────────────────────┘
```

**Когда использовать:**
- Важное действие требует подтверждения
- Форма с несколькими полями
- Дополнительная информация не помещается в основной интерфейс
- Удаление данных (подтверждение)

**Компоненты Modal:**
- **Overlay** — затемнённый фон (блокирует клики на основной контент)
- **Modal Content** — белое окно с контентом
- **Close Button** — кнопка "✕" для закрытия
- **Actions** — кнопки внизу (Cancel, Confirm)

**В AI Learning Agent:**

**ContextSelectorModal:**
- Компонент: `ContextSelectorModal.jsx`
- Открывается кликом на "⚙️" в ClaudeAISidebar
- Содержит: Radio buttons, Checkbox tree, Estimate
- Кнопки: "Cancel" (Secondary), "Apply Context" (Primary)
- Закрывается: клик на "✕", клик на Overlay, нажатие Escape

**StatsModal (внутри ClaudeAISidebar):**
- Открывается кликом на "📊"
- Показывает статистику разговора:
  - Количество сообщений
  - Использованные токены (Input, Output, Total)
  - Стоимость (USD, RUB)
- Закрывается: клик на "×", клик на overlay

**Особенности:**
- Блокирует прокрутку основного контента (scroll lock)
- Фокус автоматически переходит в Modal
- Escape закрывает Modal
- Overlay полупрозрачный (rgba(0,0,0,0.5))

**Пример для Claude Code:**
```
Создай Modal компонент с overlay:

СТРУКТУРА:
<div className="modal-overlay" onClick={handleClose}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <div className="modal-header">
      <h2 className="modal-title">Modal Title</h2>
      <button className="modal-close-btn" onClick={handleClose}>✕</button>
    </div>

    <div className="modal-body">
      {/* Контент модального окна */}
    </div>

    <div className="modal-footer">
      <button className="btn-secondary" onClick={handleClose}>Cancel</button>
      <button className="btn-primary" onClick={handleConfirm}>Confirm</button>
    </div>
  </div>
</div>

СТИЛЬ:
Modal Overlay:
- Position: fixed
- Top: 0, Left: 0, Right: 0, Bottom: 0
- Background: rgba(0, 0, 0, 0.5) (полупрозрачный чёрный)
- Display: flex, justify-content: center, align-items: center
- Z-index: 1000

Modal Content:
- Background: white
- Border-radius: 12px
- Max-width: 600px
- Width: 90%
- Box-shadow: 0 20px 60px rgba(0,0,0,0.3)
- Max-height: 80vh
- Display: flex, flex-direction: column

Modal Header:
- Padding: 20px 24px
- Border-bottom: 1px solid #E5E7EB
- Display: flex, justify-content: space-between, align-items: center

Modal Body:
- Padding: 24px
- Overflow-y: auto (прокрутка если много контента)
- Flex: 1 (занимает оставшееся пространство)

Modal Footer:
- Padding: 16px 24px
- Border-top: 1px solid #E5E7EB
- Display: flex, justify-content: flex-end, gap: 12px

Close Button:
- Background: transparent
- Border: none
- Font-size: 24px
- Color: #6B7280
- Cursor: pointer
- Hover: color #374151

ФУНКЦИОНАЛЬНОСТЬ:
- Клик на Overlay → закрыть Modal
- Клик на Modal Content → не закрывать (stopPropagation)
- Escape → закрыть Modal
- Scroll lock (body overflow: hidden)
```

---

### 2. Toast / Notification (Всплывающее уведомление)

**Что это:**
- Небольшое уведомление в углу экрана
- **НЕ блокирует** взаимодействие с контентом
- Автоматически исчезает через несколько секунд
- Используется для быстрой обратной связи

**Аналогия:** SMS уведомление на телефоне — видишь, но не мешает работать

```
┌─────────────────────────────────────────┐
│ Main content (доступен для клика)       │
│                                         │
│                  ┌────────────────────┐ │
│                  │ ✓ Success!         │ │ ← Toast (справа вверху)
│                  │ Changes saved      │ │
│                  └────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

**Типы Toast:**

**Success (успех):**
- Цвет: зелёный
- Иконка: ✓
- Пример: "Changes saved", "Message sent"

**Error (ошибка):**
- Цвет: красный
- Иконка: ✕
- Пример: "Failed to load", "Network error"

**Warning (предупреждение):**
- Цвет: жёлтый/оранжевый
- Иконка: ⚠
- Пример: "Low disk space", "Session expiring"

**Info (информация):**
- Цвет: синий
- Иконка: ℹ
- Пример: "New update available", "5 new messages"

**Когда использовать:**
- Подтверждение действия ("Saved!", "Deleted!")
- Ошибка без блокировки работы
- Информационные уведомления

**Разница Modal vs Toast:**
- **Modal** — важное действие, требует внимания, блокирует контент
- **Toast** — быстрая обратная связь, не блокирует, исчезает сама

**Пример для Claude Code:**
```
Создай Toast/Notification систему:

СТРУКТУРА:
<div className="toast-container">
  {toasts.map(toast => (
    <div key={toast.id} className={`toast toast-${toast.type}`}>
      <span className="toast-icon">{toast.icon}</span>
      <div className="toast-content">
        <div className="toast-title">{toast.title}</div>
        <div className="toast-message">{toast.message}</div>
      </div>
      <button className="toast-close" onClick={() => removeToast(toast.id)}>✕</button>
    </div>
  ))}
</div>

СТИЛЬ:
Toast Container:
- Position: fixed
- Top: 20px, Right: 20px
- Z-index: 9999
- Display: flex, flex-direction: column, gap: 12px

Toast:
- Background: white
- Border-radius: 8px
- Padding: 16px
- Box-shadow: 0 4px 12px rgba(0,0,0,0.15)
- Display: flex, align-items: center, gap: 12px
- Min-width: 300px
- Max-width: 400px
- Animation: slide-in 0.3s ease

Toast Success:
- Border-left: 4px solid #10B981 (зелёный)

Toast Error:
- Border-left: 4px solid #EF4444 (красный)

Toast Warning:
- Border-left: 4px solid #F59E0B (оранжевый)

Toast Info:
- Border-left: 4px solid #3B82F6 (синий)

ФУНКЦИОНАЛЬНОСТЬ:
- Auto-dismiss через 5 секунд
- Можно закрыть вручную (кнопка ✕)
- Несколько Toast одновременно (стек)
- Анимация появления (slide-in from right)
- Анимация исчезновения (fade-out)

ИСПОЛЬЗОВАНИЕ:
showToast({
  type: 'success',
  title: 'Success!',
  message: 'Changes saved successfully',
  duration: 5000
});
```

---

### 3. Loading Spinner / Skeleton (Индикатор загрузки)

**Что это:**
- Показывает что идёт загрузка данных
- **Loading Spinner** — крутящийся кружок
- **Skeleton** — серые блоки на месте будущего контента

**Аналогия:** Песочные часы — подожди, идёт загрузка

**Loading Spinner:**
```
┌─────────────────────┐
│                     │
│        ⟳            │ ← Spinner (крутится)
│   Loading...        │
│                     │
└─────────────────────┘
```

**Skeleton:**
```
┌─────────────────────┐
│ ▓▓▓▓▓▓▓▓ (серая)    │ ← Заголовок (загружается)
│ ▓▓▓▓▓ (серая)       │ ← Подзаголовок
│                     │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ ← Текст
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓     │
└─────────────────────┘
```

**Когда использовать:**
- Загрузка данных с сервера
- Отправка формы
- Генерация AI ответа

**Разница Spinner vs Skeleton:**
- **Spinner** — неизвестно сколько загружается, универсальный
- **Skeleton** — показывает структуру будущего контента, лучше UX

**В AI Learning Agent:**

**Loading в ClaudeAISidebar:**
- Компонент: `ClaudeAISidebar.jsx`
- Показывается пока AI генерирует ответ
- Три точки анимируются: `. . .`
- Классы: `message assistant loading`

**Код:**
```jsx
{isLoading && (
  <div className="message assistant loading">
    <div className="loading-dots">
      <span>.</span><span>.</span><span>.</span>
    </div>
  </div>
)}
```

**Loading в ContextEstimate:**
- Компонент: `ContextEstimate.jsx`
- Показывается пока загружается оценка токенов
- Spinner или текст "Loading estimate..."

**Пример для Claude Code:**
```
Создай Loading Spinner и Skeleton компоненты:

LOADING SPINNER:
<div className="spinner-container">
  <div className="spinner"></div>
  <p className="spinner-text">Loading...</p>
</div>

STYLE (Spinner):
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E5E7EB;
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

LOADING DOTS (как в AI Learning Agent):
<div className="loading-dots">
  <span>.</span>
  <span>.</span>
  <span>.</span>
</div>

STYLE (Dots):
.loading-dots span {
  animation: blink 1.4s infinite;
  animation-delay: calc(var(--i) * 0.2s);
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0.3; }
  40% { opacity: 1; }
}

SKELETON:
<div className="skeleton-container">
  <div className="skeleton skeleton-title"></div>
  <div className="skeleton skeleton-text"></div>
  <div className="skeleton skeleton-text"></div>
</div>

STYLE (Skeleton):
.skeleton {
  background: linear-gradient(
    90deg,
    #E5E7EB 25%,
    #F3F4F6 50%,
    #E5E7EB 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-title {
  height: 24px;
  width: 60%;
  margin-bottom: 12px;
}

.skeleton-text {
  height: 16px;
  width: 100%;
  margin-bottom: 8px;
}

@keyframes shimmer {
  to { background-position: -200% 0; }
}
```

---

### 4. Progress Bar (Прогресс бар)

**Что это:**
- Показывает прогресс выполнения задачи
- Визуализирует процент: 0% → 100%
- Пользователь видит сколько осталось

**Аналогия:** Шкала загрузки файла — 50% из 100%

```
┌────────────────────────────────┐
│ Uploading... 65%               │
│ ████████████████░░░░░░░░░░░░░  │ ← Progress bar
│                                │
└────────────────────────────────┘
```

**Когда использовать:**
- Загрузка/выгрузка файла
- Установка приложения
- Многошаговая форма (Step 2 of 5)

**Типы Progress Bar:**

**Determinate (определённый):**
- Знаем сколько осталось (50% из 100%)
- Показываем процент
- Пример: загрузка файла

**Indeterminate (неопределённый):**
- Не знаем сколько осталось
- Анимация бесконечная
- Пример: "Processing..."

**Пример для Claude Code:**
```
Создай Progress Bar компонент:

DETERMINATE (с процентом):
<div className="progress-container">
  <div className="progress-label">
    <span>Uploading file...</span>
    <span>{progress}%</span>
  </div>
  <div className="progress-bar">
    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
  </div>
</div>

STYLE:
Progress Bar (контейнер):
- Width: 100%
- Height: 8px
- Background: #E5E7EB (серый)
- Border-radius: 8px
- Overflow: hidden

Progress Fill (заполненная часть):
- Height: 100%
- Background: #3B82F6 (синий)
- Transition: width 0.3s ease
- Border-radius: 8px

Progress Label:
- Display: flex, justify-content: space-between
- Margin-bottom: 8px
- Font-size: 14px
- Color: #374151

INDETERMINATE (бесконечная анимация):
<div className="progress-bar">
  <div className="progress-fill-indeterminate"></div>
</div>

STYLE (Indeterminate):
.progress-fill-indeterminate {
  width: 30%;
  height: 100%;
  background: #3B82F6;
  animation: progress-indeterminate 1.5s infinite;
}

@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
```

---

### 5. Badge / Label (Значок / Метка)

**Что это:**
- Небольшой цветной значок с текстом или числом
- Показывает статус, количество, категорию
- Обычно маленький и яркий

**Аналогия:** Ценник на товаре — показывает информацию

```
Примеры Badge:

Status Badge:
┌─────────────────────────────┐
│ Task Title          [Active]│ ← Badge (зелёный)
└─────────────────────────────┘

Counter Badge:
┌─────────────────────────────┐
│ Notifications           (5) │ ← Badge (красный круг с числом)
└─────────────────────────────┘

Category Badge:
┌─────────────────────────────┐
│ Article  [JavaScript] [Web] │ ← Badges (серые теги)
└─────────────────────────────┘
```

**Типы Badge:**

**Status Badge:**
- Показывает состояние (Active, Completed, Pending)
- Цвета: зелёный (success), жёлтый (warning), красный (error), серый (neutral)

**Counter Badge:**
- Показывает количество (5 notifications, 12 messages)
- Обычно красный круг с белым числом

**Tag Badge:**
- Категории, теги (JavaScript, React, Tutorial)
- Обычно серый или цветной фон

**В AI Learning Agent:**

**Token Badge в сообщениях:**
- Компонент: `ClaudeAISidebar.jsx`
- Показывает количество токенов: "1,234 tokens"
- Цвет: серый фон, чёрный текст
- Классы: `.tokens-badge`

**Model Badge в сообщениях:**
- Показывает использованную модель: "claude-3-5-haiku-20241022"
- Цвет: синий фон, белый текст
- Классы: `.model-badge`

**Код:**
```jsx
{msg.metadata && (
  <div className="message-metadata">
    <span className="model-badge">{msg.metadata.model}</span>
    {msg.metadata.tokens && (
      <span className="tokens-badge">
        {msg.metadata.tokens.total} tokens
      </span>
    )}
  </div>
)}
```

**Пример для Claude Code:**
```
Создай Badge компонент:

СТРУКТУРА:
<span className={`badge badge-${type}`}>
  {text}
</span>

TYPES:
- success (зелёный)
- warning (жёлтый)
- error (красный)
- info (синий)
- neutral (серый)

STYLE:
Badge (базовый):
- Display: inline-block
- Padding: 4px 12px
- Border-radius: 12px (закруглённый)
- Font-size: 12px
- Font-weight: 600
- Text-transform: uppercase (опционально)

Badge Success:
- Background: #D1FAE5 (светло-зелёный)
- Color: #065F46 (тёмно-зелёный)

Badge Warning:
- Background: #FEF3C7 (светло-жёлтый)
- Color: #92400E (тёмно-оранжевый)

Badge Error:
- Background: #FEE2E2 (светло-красный)
- Color: #991B1B (тёмно-красный)

Badge Info:
- Background: #DBEAFE (светло-синий)
- Color: #1E40AF (тёмно-синий)

Badge Neutral:
- Background: #F3F4F6 (светло-серый)
- Color: #374151 (тёмно-серый)

COUNTER BADGE (кружок с числом):
<span className="badge-counter">{count}</span>

STYLE (Counter):
- Width: 20px
- Height: 20px
- Border-radius: 50% (круг)
- Background: #EF4444 (красный)
- Color: white
- Display: flex, justify-content: center, align-items: center
- Font-size: 12px
- Font-weight: bold
```

---

### 6. Tooltip (Всплывающая подсказка)

**Что это:**
- Небольшой текст появляется при наведении (hover)
- Дополнительная информация об элементе
- Не требует клика, появляется автоматически

**Аналогия:** Сноска в книге — дополнительная информация

```
┌─────────────────────────────┐
│ [?]  ← Hover на иконку      │
│  └─────────────┐            │
│    │ Tooltip:  │            │ ← Всплывает при hover
│    │ This is   │            │
│    │ help text │            │
│    └───────────┘            │
└─────────────────────────────┘
```

**Когда использовать:**
- Пояснение иконок/кнопок
- Дополнительная информация (не критичная)
- Сокращения, аббревиатуры
- Примеры использования

**В AI Learning Agent:**

**Tooltip на кнопках:**
- Компонент: `ClaudeAISidebar.jsx`
- Кнопка "⚙️" → Tooltip: "Configure context selection"
- Кнопка "📊" → Tooltip: "View conversation statistics"
- Атрибут: `title="..."` (нативный HTML tooltip)

**Код:**
```jsx
<button
  className="btn-configure-context"
  onClick={() => setShowContextModal(true)}
  disabled={isLoading}
  title="Configure context selection"
>
  ⚙️
</button>
```

**Пример для Claude Code:**
```
Создай Tooltip компонент:

СТРУКТУРА:
<div className="tooltip-container">
  <span className="tooltip-trigger">
    Hover me
  </span>
  <div className="tooltip-content">
    This is a tooltip with helpful information
  </div>
</div>

STYLE:
Tooltip Container:
- Position: relative
- Display: inline-block

Tooltip Content:
- Position: absolute
- Bottom: 100% (над элементом)
- Left: 50%
- Transform: translateX(-50%)
- Background: #1F2937 (тёмный)
- Color: white
- Padding: 8px 12px
- Border-radius: 6px
- Font-size: 12px
- White-space: nowrap (не переносить)
- Opacity: 0
- Visibility: hidden
- Transition: opacity 0.2s, visibility 0.2s
- Z-index: 1000

Tooltip Content (after - стрелка):
.tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #1F2937;
}

Tooltip Container:hover .tooltip-content:
- Opacity: 1
- Visibility: visible

POSITION VARIANTS:
- Top: bottom: 100% (над элементом)
- Bottom: top: 100% (под элементом)
- Left: right: 100% (слева)
- Right: left: 100% (справа)

ИСПОЛЬЗОВАНИЕ:
<Tooltip text="Helpful information">
  <button>?</button>
</Tooltip>
```

---

## 🌐 Примеры из AI Learning Agent

### ClaudeAISidebar — Multiple Feedback Elements

**Компонент:** `ClaudeAISidebar.jsx`

**Использует:**

1. **Loading Dots** — пока AI генерирует ответ
   ```jsx
   {isLoading && (
     <div className="message assistant loading">
       <div className="loading-dots">
         <span>.</span><span>.</span><span>.</span>
       </div>
     </div>
   )}
   ```

2. **Badge** — показывает модель и токены в сообщении
   ```jsx
   <span className="model-badge">{msg.metadata.model}</span>
   <span className="tokens-badge">{tokens} tokens</span>
   ```

3. **Tooltip** — подсказка на кнопках
   ```jsx
   <button title="Configure context selection">⚙️</button>
   <button title="View conversation statistics">📊</button>
   ```

4. **Stats Modal** — модальное окно со статистикой
   - Количество сообщений
   - Использованные токены
   - Стоимость разговора

---

### ContextSelectorModal — Modal Example

**Компонент:** `ContextSelectorModal.jsx`

**Структура:**
```
┌────────────────────────────────────────┐
│ Overlay (затемнённый фон)              │
│                                        │
│   ┌──────────────────────────────────┐ │
│   │ Configure Context             ✕ │ │ ← Header
│   ├──────────────────────────────────┤ │
│   │ [Radio buttons]                  │ │
│   │ [Checkbox tree]                  │ │ ← Body
│   │ [Estimate]                       │ │
│   ├──────────────────────────────────┤ │
│   │ [Cancel]      [Apply Context]   │ │ ← Footer
│   └──────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
```

**Feedback элементы:**
- **Modal** — само модальное окно
- **Loading** — в ContextEstimate пока загружается оценка
- **Badge** — показывает количество выбранных уроков

---

## 🤖 Промпт для Claude Code

### Задача: Создать систему уведомлений с Toast и Modal

```
Создай систему уведомлений для веб-приложения:

КОМПОНЕНТЫ:

1. TOAST SYSTEM:
   - Toast Container (fixed, top-right)
   - Toast типы: success, error, warning, info
   - Auto-dismiss через 5 секунд
   - Кнопка закрытия (✕)
   - Анимация появления (slide-in) и исчезновения (fade-out)
   - Несколько Toast одновременно (стек)

2. CONFIRM MODAL:
   - Overlay (затемнённый фон)
   - Modal Content (белое окно)
   - Header: заголовок + кнопка закрытия (✕)
   - Body: текст подтверждения
   - Footer: кнопки Cancel (secondary) и Confirm (danger для удаления)
   - Закрытие: клик на overlay, клик на ✕, Escape

3. LOADING INDICATOR:
   - Spinner (крутящийся кружок)
   - Loading Dots (три точки анимируются)
   - Skeleton (для списка элементов)

4. PROGRESS BAR:
   - Determinate (с процентом)
   - Indeterminate (бесконечная анимация)

ПРИМЕР ИСПОЛЬЗОВАНИЯ:

// Toast
showToast({
  type: 'success',
  title: 'Success!',
  message: 'File uploaded successfully'
});

// Confirm Modal
showConfirmModal({
  title: 'Delete File',
  message: 'Are you sure you want to delete this file? This action cannot be undone.',
  confirmText: 'Delete',
  confirmType: 'danger',
  onConfirm: () => deleteFile()
});

// Loading
<LoadingSpinner text="Loading data..." />
<LoadingDots />
<Skeleton type="list" count={5} />

// Progress
<ProgressBar value={65} max={100} />
<ProgressBar indeterminate />

ТЕХНОЛОГИИ:
- React + useState/useContext
- CSS Animations
- Portal для Modal и Toast (ReactDOM.createPortal)

Создай полностью рабочую систему с примерами.
```

---

## ✅ Критерии завершения урока

**Понимание концепций:**
- [ ] Могу объяснить что такое Feedback Elements
- [ ] Знаю разницу между Modal и Toast
- [ ] Понимаю когда использовать Spinner vs Skeleton vs Progress Bar
- [ ] Знаю типы Badge (Status, Counter, Tag)
- [ ] Понимаю когда использовать Tooltip

**Практическое применение:**
- [ ] Могу назвать feedback элементы на любом сайте
- [ ] Понимаю когда использовать каждый тип элемента
- [ ] Могу сформулировать задачу для Claude Code

**Связь с AI Learning Agent:**
- [ ] Понимаю как работает ContextSelectorModal
- [ ] Знаю где используется Loading в ClaudeAISidebar
- [ ] Знаю где используются Badge для токенов и модели

---

## 📝 Вопросы для самопроверки

1. **Modal vs Toast:**
   - В чём разница?
   - Когда использовать Modal?
   - Когда использовать Toast?
   - Приведи примеры для каждого

2. **Loading индикаторы:**
   - Назови три типа (Spinner, Skeleton, Progress Bar)
   - Когда использовать Spinner?
   - Когда использовать Skeleton?
   - Когда использовать Progress Bar?

3. **Badge:**
   - Назови три типа Badge
   - Приведи примеры использования
   - Где в AI Learning Agent используются Badge?

4. **В AI Learning Agent:**
   - Как показывается загрузка AI ответа?
   - Где используется Modal?
   - Где используются Tooltip?
   - Что показывает Stats Modal?

5. **Для Claude Code:**
   - Как описать Modal с overlay?
   - Как описать Toast систему с анимацией?
   - Как описать Progress Bar?

---

## 🔗 Связь с другими уроками

**Предыдущий урок:** 1.3 Interactive Elements
- Button → открывает Modal (взаимодействие)
- Input → показывает Error Toast (обратная связь)
- Form submit → показывает Loading (обратная связь)

**Следующий урок:** 1.5 Prompting for UI
- Узнаешь как описывать feedback элементы для Claude Code
- Научишься создавать промпты для Modal, Toast, Loading

**Связь с проектом:**
- ContextSelectorModal — центральный Modal в AI Learning Agent
- ClaudeAISidebar — использует Loading, Badge, Tooltip
- StatsModal — показывает статистику разговора

---

## 💡 Итоговые выводы

**Что я понял:**

1. **Feedback Elements** — элементы обратной связи с пользователем
   - **Modal** — блокирует контент, требует действия
   - **Toast** — не блокирует, исчезает сама
   - **Loading** — показывает процесс (Spinner, Skeleton, Progress)
   - **Badge** — показывает статус, количество, категорию
   - **Tooltip** — дополнительная информация при hover

2. **Правильный выбор элемента:**
   - Важное действие → Modal
   - Быстрая обратная связь → Toast
   - Неизвестно сколько ждать → Spinner
   - Известна структура → Skeleton
   - Известен процент → Progress Bar
   - Дополнительная информация → Tooltip

3. **Для работы с ИИ:**
   - Не "всплывающее окно", а **"Modal"**
   - Не "уведомление", а **"Toast"**
   - Не "крутилка", а **"Loading Spinner"**
   - Не "полоска загрузки", а **"Progress Bar"**
   - Не "подсказка", а **"Tooltip"**

---

*Версия урока: 1.0*
*Дата создания: 16 октября 2025*
*Формат: Vibe Coding для веб-дизайна*
