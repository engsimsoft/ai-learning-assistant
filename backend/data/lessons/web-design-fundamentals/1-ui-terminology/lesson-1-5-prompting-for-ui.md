# Урок 1.5: Prompting for UI (Промпты для создания интерфейсов)

> **Модуль 1:** UI Terminology
> **Урок:** 1.5
> **Длительность:** 60-90 минут
> **Prerequisite:** Уроки 1.1-1.4 (Layout, Navigation, Interactive, Feedback Elements)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Формулировать чёткие промпты для создания UI компонентов
- ✅ Понимать разницу между плохими и хорошими промптами
- ✅ Описывать layout, стили, состояния компонентов правильно
- ✅ Использовать шаблоны промптов для типовых задач
- ✅ Создавать промпты для Claude Code с правильной терминологией

---

## 📖 Концепция: Что такое Prompting for UI?

### Простое определение

**Prompting for UI** — это навык формулирования задач для AI (Claude Code) так, чтобы получить нужный результат с первого раза.

**Важно:** Хороший промпт = точный результат. Плохой промпт = переделывать несколько раз.

**Аналогия:** Заказ в ресторане:
- ❌ Плохо: "Дай что-нибудь вкусное" (официант не знает что принести)
- ✅ Хорошо: "Цезарь с курицей, без анчоусов, соус отдельно" (точно знаешь что получишь)

---

## 🎨 Структура хорошего промпта для UI

### Шаблон промпта

```
Создай [ЧТО] компонент:

СТРУКТУРА:
- [Описание layout и элементов]
- [HTML разметка или псевдокод]

СТИЛЬ:
- [Цвета, размеры, отступы]
- [Typography]
- [Состояния: hover, active, disabled]

ФУНКЦИОНАЛЬНОСТЬ:
- [Поведение при клике]
- [Обработка данных]
- [Валидация]

ТЕХНОЛОГИИ:
- [React/Vue/vanilla JS]
- [CSS/TailwindCSS/styled-components]

[Опционально: пример использования]
```

---

## ❌ vs ✅ Плохие vs Хорошие промпты

### Пример 1: Кнопка

**❌ Плохой промпт:**
```
Создай кнопку
```

**Проблема:**
- Не указан тип (Primary, Secondary, Danger)
- Не указаны размеры, цвета
- Не указаны состояния (hover, disabled)
- Не указана технология (React, HTML, CSS)

**✅ Хороший промпт:**
```
Создай Primary Button компонент:

СТИЛЬ:
- Background: #3B82F6 (синий)
- Color: white
- Padding: 12px 24px
- Border-radius: 6px
- Font-size: 14px
- Font-weight: 600

СОСТОЯНИЯ:
- Hover: background #2563EB (темнее)
- Active: scale 0.98
- Disabled: opacity 0.5, cursor not-allowed

PROPS:
- text: string (текст кнопки)
- onClick: function
- disabled: boolean (default false)

ТЕХНОЛОГИИ:
- React component
- CSS для стилей

ПРИМЕР ИСПОЛЬЗОВАНИЯ:
<PrimaryButton
  text="Save Changes"
  onClick={handleSave}
  disabled={isLoading}
/>
```

---

### Пример 2: Modal

**❌ Плохой промпт:**
```
Сделай модальное окно для подтверждения удаления
```

**Проблема:**
- Не описана структура (header, body, footer)
- Не указаны размеры, отступы
- Не описано поведение (закрытие, overlay)
- Не указаны типы кнопок

**✅ Хороший промпт:**
```
Создай Confirm Modal компонент для подтверждения удаления:

СТРУКТУРА:
<div className="modal-overlay" onClick={handleClose}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <div className="modal-header">
      <h2>Delete File</h2>
      <button className="close-btn">✕</button>
    </div>
    <div className="modal-body">
      <p>Are you sure you want to delete this file?</p>
      <p>This action cannot be undone.</p>
    </div>
    <div className="modal-footer">
      <button className="btn-secondary">Cancel</button>
      <button className="btn-danger">Delete</button>
    </div>
  </div>
</div>

СТИЛЬ:
Modal Overlay:
- Position: fixed, top: 0, left: 0, right: 0, bottom: 0
- Background: rgba(0, 0, 0, 0.5)
- Display: flex, justify-content: center, align-items: center
- Z-index: 1000

Modal Content:
- Max-width: 500px
- Width: 90%
- Background: white
- Border-radius: 12px
- Box-shadow: 0 20px 60px rgba(0,0,0,0.3)

Modal Header:
- Padding: 20px 24px
- Border-bottom: 1px solid #E5E7EB
- Display: flex, justify-content: space-between

Modal Body:
- Padding: 24px

Modal Footer:
- Padding: 16px 24px
- Border-top: 1px solid #E5E7EB
- Display: flex, justify-content: flex-end, gap: 12px

Кнопки:
- Secondary: серый фон, серый текст
- Danger: красный фон (#EF4444), белый текст

ФУНКЦИОНАЛЬНОСТЬ:
- Клик на Overlay → закрыть Modal
- Клик на ✕ → закрыть Modal
- Escape → закрыть Modal
- Клик Cancel → закрыть Modal
- Клик Delete → вызвать onConfirm, затем закрыть

PROPS:
- isOpen: boolean
- onClose: function
- onConfirm: function

ТЕХНОЛОГИИ:
- React + useState
- CSS для стилей
- useEffect для Escape listener

ПРИМЕР ИСПОЛЬЗОВАНИЯ:
<ConfirmModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={handleDelete}
/>
```

---

### Пример 3: Input с валидацией

**❌ Плохой промпт:**
```
Создай поле для email с проверкой
```

**Проблема:**
- Не описан стиль (border, padding, font)
- Не указана логика валидации
- Не описаны состояния (error, success)
- Не указано когда показывать ошибку

**✅ Хороший промпт:**
```
Создай Email Input компонент с валидацией:

СТРУКТУРА:
<div className="input-container">
  <label className="input-label">Email</label>
  <input
    type="email"
    placeholder="Enter your email..."
    className={`input-field ${error ? 'input-error' : ''}`}
    value={email}
    onChange={handleChange}
    onBlur={validateEmail}
  />
  {error && <span className="error-message">{error}</span>}
</div>

СТИЛЬ:
Input Label:
- Font-size: 14px
- Font-weight: 600
- Color: #374151
- Margin-bottom: 8px

Input Field:
- Width: 100%
- Padding: 12px 16px
- Border: 1px solid #D1D5DB
- Border-radius: 6px
- Font-size: 14px
- Transition: border-color 0.2s

Input Field (focus):
- Border: 1px solid #3B82F6
- Outline: none

Input Field (error):
- Border: 1px solid #EF4444

Error Message:
- Font-size: 12px
- Color: #EF4444
- Margin-top: 4px

ВАЛИДАЦИЯ:
- Проверка при onBlur (когда убрал фокус)
- Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- Если невалидный → показать ошибку "Invalid email address"
- Если пустой → показать ошибку "Email is required"
- Если валидный → убрать ошибку

PROPS:
- value: string
- onChange: function
- required: boolean (default false)

СОСТОЯНИЕ:
- email: string (текущее значение)
- error: string (текст ошибки или null)

ТЕХНОЛОГИИ:
- React + useState
- CSS для стилей

ПРИМЕР ИСПОЛЬЗОВАНИЯ:
<EmailInput
  value={email}
  onChange={setEmail}
  required={true}
/>
```

---

## 🏗️ Промпты для разных типов компонентов

### 1. Layout Components (Three-Panel Layout)

```
Создай Three-Panel Layout компонент:

СТРУКТУРА:
┌────────────────────────────────────────────┐
│ Header (fixed top, height: 60px)          │
├──────────┬───────────────┬─────────────────┤
│ Left     │ Center        │ Right           │
│ Sidebar  │ Main          │ Sidebar         │
│ 280px    │ flexible      │ 600px           │
│ fixed    │ (auto)        │ (resizable)     │
└──────────┴───────────────┴─────────────────┘

КОМПОНЕНТЫ:
- Header: фиксированный вверху, всегда видим
- Left Sidebar: фиксированная ширина 280px, можно свернуть
- Center Panel: занимает оставшееся пространство
- Right Sidebar: ширина 600px, можно изменять (400-800px), можно свернуть

СТИЛЬ:
Header:
- Position: fixed, top: 0, left: 0, right: 0
- Height: 60px
- Background: white
- Border-bottom: 1px solid #E5E7EB
- Z-index: 100

Left Sidebar:
- Width: 280px (если открыт), 0px (если свёрнут)
- Background: #F9FAFB
- Height: calc(100vh - 60px) (высота минус header)
- Position: fixed, top: 60px, left: 0
- Overflow-y: auto
- Transition: width 0.3s ease

Center Panel:
- Margin-left: 280px (или 0 если левый sidebar свёрнут)
- Margin-right: 600px (или 0 если правый sidebar свёрнут)
- Padding: 20px
- Min-height: calc(100vh - 60px)

Right Sidebar:
- Width: 600px (по умолчанию)
- Min-width: 400px, Max-width: 800px
- Background: white
- Height: calc(100vh - 60px)
- Position: fixed, top: 60px, right: 0
- Border-left: 1px solid #E5E7EB
- Overflow-y: auto

Resize Handle (для правого sidebar):
- Width: 4px
- Background: #D1D5DB (на hover)
- Cursor: col-resize
- Position: absolute, left: 0, top: 0, bottom: 0

ФУНКЦИОНАЛЬНОСТЬ:
- Left Sidebar: toggle открыт/свёрнут (кнопка в Header)
- Right Sidebar: toggle открыт/свёрнут (кнопка в Header)
- Right Sidebar: resizable (drag handle слева)
- Сохранять состояние в localStorage:
  - leftSidebarOpen: boolean
  - rightSidebarOpen: boolean
  - rightSidebarWidth: number (400-800)

СОСТОЯНИЕ:
- leftSidebarOpen: boolean (default true)
- rightSidebarOpen: boolean (default true)
- rightSidebarWidth: number (default 600)

ТЕХНОЛОГИИ:
- React + useState + useEffect
- CSS для стилей
- localStorage для сохранения состояния
- Mouse events для resizing

ПРИМЕР ИСПОЛЬЗОВАНИЯ:
<ThreePanelLayout
  header={<Header />}
  leftSidebar={<CourseTree />}
  center={<LessonViewer />}
  rightSidebar={<AIChat />}
/>
```

---

### 2. Navigation Components (Tree Navigation)

```
Создай Tree Navigation компонент для иерархической структуры:

СТРУКТУРА ДАННЫХ:
const courses = [
  {
    id: 1,
    title: "AI Web Learning",
    modules: [
      {
        id: 1,
        title: "Module 1: Basics",
        lessons: [
          { id: 1, title: "Lesson 1.1: Client-Server" },
          { id: 2, title: "Lesson 1.2: HTTP Basics" }
        ]
      },
      {
        id: 2,
        title: "Module 2: Backend",
        lessons: [
          { id: 3, title: "Lesson 2.1: FastAPI Intro" }
        ]
      }
    ]
  }
];

ВИЗУАЛЬНАЯ СТРУКТУРА:
📁 AI Web Learning                      ← Course (кликабельный)
  📂 Module 1: Basics                   ← Module (кликабельный)
    📄 Lesson 1.1: Client-Server        ← Lesson (кликабельный)
    📄 Lesson 1.2: HTTP Basics
  📂 Module 2: Backend
    📄 Lesson 2.1: FastAPI Intro

СТИЛЬ:
Tree Item (общий):
- Padding: 8px 12px
- Cursor: pointer
- Transition: background 0.2s
- Display: flex, align-items: center, gap: 8px

Tree Item (hover):
- Background: #F3F4F6

Tree Item (active lesson):
- Background: #DBEAFE
- Border-left: 3px solid #3B82F6
- Font-weight: 600

Отступы для вложенности:
- Course (Level 1): padding-left: 12px
- Module (Level 2): padding-left: 28px
- Lesson (Level 3): padding-left: 44px

Иконки:
- Closed course/module: ► (rotate 0deg)
- Opened course/module: ▼ (rotate 90deg)
- Transition: transform 0.2s

ФУНКЦИОНАЛЬНОСТЬ:
- Клик на Course → toggle раскрыть/свернуть modules
- Клик на Module → toggle раскрыть/свернуть lessons
- Клик на Lesson → вызвать onLessonSelect(lessonId)
- Подсветить активный lesson
- Запомнить раскрытые курсы/модули в localStorage

СОСТОЯНИЕ:
- expandedCourses: Set<number> (ID раскрытых курсов)
- expandedModules: Set<number> (ID раскрытых модулей)
- activeLessonId: number (ID текущего урока)

PROPS:
- courses: array (структура курсов)
- activeLessonId: number (текущий урок)
- onLessonSelect: function(lessonId)

ТЕХНОЛОГИИ:
- React + useState + useEffect
- CSS для стилей
- localStorage для сохранения раскрытых элементов

ПРИМЕР ИСПОЛЬЗОВАНИЯ:
<TreeNavigation
  courses={courses}
  activeLessonId={1}
  onLessonSelect={(id) => console.log('Selected lesson:', id)}
/>
```

---

### 3. Interactive Components (Dropdown / Select)

```
Создай Dropdown компонент для выбора AI модели:

СТРУКТУРА:
<div className="dropdown">
  <button className="dropdown-toggle" onClick={toggleOpen}>
    🤖 Model: {selectedModel.name}
    <span className="arrow">{isOpen ? '▲' : '▼'}</span>
  </button>

  {isOpen && (
    <div className="dropdown-menu">
      {models.map(model => (
        <label key={model.id} className="dropdown-item">
          <input
            type="radio"
            name="model"
            checked={selected === model.id}
            onChange={() => handleSelect(model.id)}
          />
          <div className="model-info">
            <div className="model-name">{model.name}</div>
            <div className="model-description">{model.description}</div>
            <div className="model-context">
              Context: {model.context_length.toLocaleString()} tokens
            </div>
          </div>
        </label>
      ))}
    </div>
  )}
</div>

СТИЛЬ:
Dropdown Container:
- Position: relative
- Width: 100%

Dropdown Toggle:
- Width: 100%
- Padding: 12px 16px
- Background: white
- Border: 1px solid #D1D5DB
- Border-radius: 6px
- Display: flex, justify-content: space-between, align-items: center
- Cursor: pointer
- Transition: background 0.2s

Dropdown Toggle (hover):
- Background: #F9FAFB

Dropdown Toggle (open):
- Border-color: #3B82F6

Arrow:
- Transition: transform 0.2s
- Transform: rotate(0deg) если закрыт, rotate(180deg) если открыт

Dropdown Menu:
- Position: absolute
- Top: 100% + 4px (под кнопкой с отступом)
- Left: 0, Right: 0
- Background: white
- Border: 1px solid #D1D5DB
- Border-radius: 6px
- Box-shadow: 0 4px 12px rgba(0,0,0,0.1)
- Max-height: 400px
- Overflow-y: auto
- Z-index: 100

Dropdown Item:
- Padding: 12px 16px
- Cursor: pointer
- Display: flex, gap: 12px, align-items: flex-start
- Transition: background 0.2s

Dropdown Item (hover):
- Background: #F3F4F6

Dropdown Item (selected):
- Background: #DBEAFE

Model Info:
- Display: flex, flex-direction: column, gap: 4px

Model Name:
- Font-size: 14px
- Font-weight: 600
- Color: #111827

Model Description:
- Font-size: 12px
- Color: #6B7280

Model Context:
- Font-size: 11px
- Color: #9CA3AF

ФУНКЦИОНАЛЬНОСТЬ:
- Клик на Toggle → открыть/закрыть Menu
- Клик на Item → выбрать модель, закрыть Menu
- Клик вне Dropdown → закрыть Menu
- Escape → закрыть Menu
- Показать стрелку (▼/▲) в зависимости от состояния

СОСТОЯНИЕ:
- isOpen: boolean (открыт/закрыт)
- selected: number (ID выбранной модели)

PROPS:
- models: array (список моделей)
- selected: number (ID выбранной модели)
- onChange: function(modelId)

ТЕХНОЛОГИИ:
- React + useState + useEffect
- CSS для стилей
- useRef для закрытия при клике вне

ПРИМЕР ИСПОЛЬЗОВАНИЯ:
<Dropdown
  models={models}
  selected={selectedModel}
  onChange={setSelectedModel}
/>
```

---

### 4. Feedback Components (Toast System)

```
Создай Toast Notification систему:

СТРУКТУРА:
<div className="toast-container">
  {toasts.map(toast => (
    <div key={toast.id} className={`toast toast-${toast.type}`}>
      <span className="toast-icon">{getIcon(toast.type)}</span>
      <div className="toast-content">
        <div className="toast-title">{toast.title}</div>
        {toast.message && (
          <div className="toast-message">{toast.message}</div>
        )}
      </div>
      <button className="toast-close" onClick={() => removeToast(toast.id)}>
        ✕
      </button>
    </div>
  ))}
</div>

ТИПЫ TOAST:
- success: зелёный, иконка ✓
- error: красный, иконка ✕
- warning: оранжевый, иконка ⚠
- info: синий, иконка ℹ

СТИЛЬ:
Toast Container:
- Position: fixed
- Top: 20px, Right: 20px
- Z-index: 9999
- Display: flex, flex-direction: column, gap: 12px
- Pointer-events: none

Toast:
- Background: white
- Border-radius: 8px
- Padding: 16px
- Box-shadow: 0 4px 12px rgba(0,0,0,0.15)
- Display: flex, align-items: flex-start, gap: 12px
- Min-width: 300px
- Max-width: 400px
- Pointer-events: auto
- Animation: slide-in 0.3s ease

Toast Success:
- Border-left: 4px solid #10B981

Toast Error:
- Border-left: 4px solid #EF4444

Toast Warning:
- Border-left: 4px solid #F59E0B

Toast Info:
- Border-left: 4px solid #3B82F6

Toast Icon:
- Font-size: 20px
- Flex-shrink: 0

Toast Content:
- Flex: 1

Toast Title:
- Font-size: 14px
- Font-weight: 600
- Color: #111827
- Margin-bottom: 4px

Toast Message:
- Font-size: 12px
- Color: #6B7280

Toast Close:
- Background: transparent
- Border: none
- Font-size: 18px
- Color: #9CA3AF
- Cursor: pointer
- Transition: color 0.2s
- Flex-shrink: 0

Toast Close (hover):
- Color: #374151

АНИМАЦИИ:
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

ФУНКЦИОНАЛЬНОСТЬ:
- showToast({ type, title, message, duration }) → добавить Toast
- removeToast(id) → удалить Toast
- Auto-dismiss через duration (default 5000ms)
- Анимация появления (slide-in)
- Анимация исчезновения (fade-out)
- Несколько Toast одновременно (стек)
- Можно закрыть вручную (кнопка ✕)

СОСТОЯНИЕ:
- toasts: array (список активных toast)
  - id: number (уникальный)
  - type: string (success, error, warning, info)
  - title: string
  - message: string (опционально)
  - duration: number (ms до auto-dismiss)

ТЕХНОЛОГИИ:
- React + useState + useEffect
- CSS для стилей и анимаций
- setTimeout для auto-dismiss

API:
// Context Provider
<ToastProvider>
  <App />
</ToastProvider>

// Usage
const { showToast } = useToast();

showToast({
  type: 'success',
  title: 'Success!',
  message: 'Changes saved successfully',
  duration: 5000
});

showToast({
  type: 'error',
  title: 'Error',
  message: 'Failed to save changes',
  duration: 7000
});
```

---

## 📋 Чек-лист хорошего промпта

Используй этот чек-лист перед отправкой промпта:

**Структура:**
- [ ] Описана HTML разметка или псевдокод
- [ ] Указаны основные элементы и их расположение
- [ ] Понятна иерархия (что внутри чего)

**Стиль:**
- [ ] Указаны цвета (hex/rgb/named)
- [ ] Указаны размеры (width, height, padding, margin)
- [ ] Указаны шрифты (font-size, font-weight)
- [ ] Описаны состояния (hover, active, focus, disabled)
- [ ] Указаны анимации/transitions (если нужны)

**Функциональность:**
- [ ] Описано поведение при взаимодействии
- [ ] Указаны события (onClick, onChange, onBlur)
- [ ] Описана логика (валидация, обработка данных)
- [ ] Указано управление состоянием (useState, props)

**Технологии:**
- [ ] Указан фреймворк (React, Vue, vanilla JS)
- [ ] Указан подход к стилям (CSS, TailwindCSS, CSS-in-JS)
- [ ] Указаны зависимости (если нужны)

**Опционально:**
- [ ] Приведён пример использования
- [ ] Указаны props и их типы
- [ ] Описаны edge cases

---

## 💡 Советы для создания промптов

### 1. Используй ASCII диаграммы

```
✅ Хорошо:
┌────────────────────────────┐
│ Header                  ✕ │
├────────────────────────────┤
│ Content                    │
├────────────────────────────┤
│ [Cancel]      [Confirm]   │
└────────────────────────────┘

❌ Плохо:
Модальное окно с заголовком, контентом и двумя кнопками внизу
```

### 2. Указывай точные значения

```
✅ Хорошо:
- Padding: 12px 24px
- Border-radius: 6px
- Font-size: 14px
- Color: #3B82F6

❌ Плохо:
- Немного padding
- Закруглённые углы
- Средний размер шрифта
- Синий цвет
```

### 3. Описывай все состояния

```
✅ Хорошо:
СОСТОЯНИЯ:
- Default: background white, border #D1D5DB
- Hover: background #F9FAFB
- Focus: border #3B82F6, outline none
- Disabled: opacity 0.5, cursor not-allowed
- Error: border #EF4444

❌ Плохо:
Кнопка должна меняться при наведении
```

### 4. Приводи примеры использования

```
✅ Хорошо:
ПРИМЕР ИСПОЛЬЗОВАНИЯ:
<Button
  text="Save Changes"
  type="primary"
  onClick={handleSave}
  disabled={isLoading}
/>

❌ Плохо:
Компонент должен принимать props
```

### 5. Указывай технологии явно

```
✅ Хорошо:
ТЕХНОЛОГИИ:
- React functional component + hooks
- TypeScript для типов
- CSS Modules для стилей
- useState для локального состояния

❌ Плохо:
Создай компонент на React
```

---

## 🎓 Практика: Создай промпты для этих задач

### Задача 1: Search Input с иконкой

Создай промпт для Search Input компонента:
- Иконка лупы слева
- Placeholder: "Search lessons..."
- Кнопка очистки (✕) справа (показывать только если есть текст)
- Размытие при потере фокуса
- При Enter → вызвать onSearch

### Задача 2: Stats Card

Создай промпт для Stats Card компонента:
- Показывает: иконку, заголовок, значение, изменение (↑ +12%)
- Типы: success (зелёный), warning (оранжевый), danger (красный)
- Hover: лёгкий shadow
- Click: открывает детальную статистику

### Задача 3: Multi-Step Form

Создай промпт для Multi-Step Form компонента:
- 3 шага: Personal Info → Account → Confirmation
- Progress bar вверху
- Кнопки: Back, Next, Submit
- Валидация на каждом шаге
- Сохранение в localStorage

---

## ✅ Критерии завершения урока

**Понимание концепций:**
- [ ] Могу объяснить что такое Prompting for UI
- [ ] Понимаю разницу между плохими и хорошими промптами
- [ ] Знаю структуру хорошего промпта
- [ ] Понимаю зачем нужен чек-лист

**Практическое применение:**
- [ ] Могу создать промпт для Layout компонента
- [ ] Могу создать промпт для Interactive компонента
- [ ] Могу создать промпт для Feedback компонента
- [ ] Использую правильную терминологию из уроков 1.1-1.4

**Навыки формулирования:**
- [ ] Описываю структуру через ASCII диаграммы
- [ ] Указываю точные значения (цвета, размеры)
- [ ] Описываю все состояния (hover, active, disabled)
- [ ] Привожу примеры использования

---

## 📝 Вопросы для самопроверки

1. **Структура промпта:**
   - Какие разделы должны быть в хорошем промпте?
   - Зачем нужна секция "Пример использования"?
   - Зачем описывать все состояния компонента?

2. **Плохие vs Хорошие промпты:**
   - В чём разница между "синий цвет" и "#3B82F6"?
   - Зачем использовать ASCII диаграммы?
   - Почему "немного padding" — плохо?

3. **Практика:**
   - Создай промпт для Primary Button
   - Создай промпт для Modal с подтверждением
   - Создай промпт для Toast notification

4. **Терминология:**
   - Используешь ли правильные термины из уроков 1.1-1.4?
   - Говоришь "модальное окно" или "Modal"?
   - Говоришь "синяя кнопка" или "Primary Button"?

---

## 🔗 Связь с другими уроками

**Предыдущие уроки:**
- **1.1 Layout Elements** — используй термины: Header, Footer, Sidebar, Main, Container
- **1.2 Navigation Elements** — используй термины: Tree, Breadcrumbs, Tabs, Prev/Next
- **1.3 Interactive Elements** — используй термины: Button (Primary/Secondary/Danger), Input, Select, Radio, Checkbox, Toggle
- **1.4 Feedback Elements** — используй термины: Modal, Toast, Loading, Progress Bar, Badge, Tooltip

**Применение:**
- Все термины из уроков 1.1-1.4 → использовать в промптах
- Хороший промпт = правильная терминология + чёткие детали
- Плохой промпт = расплывчатые описания без деталей

---

## 💡 Итоговые выводы

**Что я понял:**

1. **Хороший промпт состоит из:**
   - Структура (что и где)
   - Стиль (как выглядит)
   - Функциональность (как работает)
   - Технологии (на чём делать)
   - Пример использования

2. **Ключевые принципы:**
   - Точные значения вместо расплывчатых описаний
   - ASCII диаграммы для визуализации
   - Все состояния (hover, active, disabled, error)
   - Правильная терминология из уроков 1.1-1.4

3. **Плохие промпты:**
   - "Создай кнопку" (нет деталей)
   - "Синий цвет" (нет точного значения)
   - "Немного padding" (непонятно сколько)
   - "Должна меняться при наведении" (как именно?)

4. **Хорошие промпты:**
   - Детальное описание структуры
   - Точные цвета, размеры, отступы
   - Описание всех состояний
   - Пример использования
   - Чёткие технологии

5. **Чек-лист перед отправкой:**
   - [ ] Структура описана
   - [ ] Стили указаны (цвета, размеры)
   - [ ] Функциональность описана
   - [ ] Технологии указаны
   - [ ] Пример использования приведён

---

## 🚀 Следующие шаги

После завершения Модуля 1 (UI Terminology), ты сможешь:
1. Правильно называть все элементы интерфейса
2. Формулировать чёткие задачи для Claude Code
3. Создавать промпты с первого раза без переделок
4. Использовать правильную терминологию в работе

**Далее:**
- Модуль 2: UI Design Principles (скоро)
- Модуль 3: Responsive Design (скоро)
- Модуль 4: UI Animation (скоро)

---

*Версия урока: 1.0*
*Дата создания: 16 октября 2025*
*Формат: Vibe Coding для веб-дизайна*
