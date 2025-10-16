# Урок 1.3: Interactive Elements (Интерактивные элементы)

> **Модуль 1:** UI Terminology
> **Урок:** 1.3
> **Длительность:** 45-60 минут
> **Prerequisite:** Урок 1.2 (Navigation Elements)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Правильно называть интерактивные элементы (Button, Input, Select, Checkbox, Radio, Toggle, Slider)
- ✅ Понимать разницу между типами кнопок (Primary, Secondary, Danger)
- ✅ Объяснить когда использовать Checkbox vs Radio vs Toggle
- ✅ Формулировать задачи для Claude Code с правильной терминологией интерактивных элементов

---

## 📖 Концепция: Что такое Interactive Elements?

### Простое определение

**Interactive Elements (интерактивные элементы)** — это элементы интерфейса, с которыми пользователь взаимодействует: кликает, вводит текст, выбирает опции.

**Важно:** Интерактивные элементы — это "органы управления" интерфейса. Без них пользователь не может ничего сделать.

**Аналогия:** Кнопки и рычаги в машине — газ, тормоз, руль. Без них машина бесполезна.

---

## 🎛️ Основные интерактивные элементы

### 1. Button (Кнопка)

**Что это:**
- Элемент для выполнения действия
- Самый важный интерактивный элемент
- Имеет разные типы в зависимости от важности действия

**Аналогия:** Кнопка в лифте — нажал и действие выполнилось

**Типы кнопок:**

```
┌─────────────────────────────────────┐
│ [  Primary Button  ]  ← Главное     │
│                         действие    │
│ [ Secondary Button ]  ← Второстепен-│
│                         ное действие│
│ [  Danger Button   ]  ← Опасное     │
│                         действие    │
└─────────────────────────────────────┘
```

**Primary Button (основная кнопка):**
- Самое важное действие на странице
- Яркий цвет (синий, зелёный)
- На странице обычно только одна Primary кнопка

**Примеры:**
- "Send" в форме сообщения
- "Save" в настройках
- "Apply Context" в модальном окне

**Secondary Button (второстепенная кнопка):**
- Менее важное действие
- Нейтральный цвет (серый, прозрачный фон)
- На странице может быть несколько

**Примеры:**
- "Cancel" рядом с "Save"
- "Back" в навигации
- "Clear All" для очистки выбора

**Danger Button (опасная кнопка):**
- Действие которое сложно отменить
- Красный цвет (предупреждение!)
- Используется редко

**Примеры:**
- "Delete Account"
- "Remove All Data"
- "Reset to Default"

**В AI Learning Agent:**

**Primary Button:**
- Компонент: `ClaudeAISidebar.jsx` → "Send" кнопка
- Компонент: `ContextSelectorModal.jsx` → "Apply Context"
- Цвет: синий (#3B82F6)

**Secondary Button:**
- Компонент: `ContextSelectorModal.jsx` → "Cancel"
- Компонент: `ContextSelectorModal.jsx` → "Clear All"
- Цвет: серый, прозрачный фон

**Пример для Claude Code:**
```
Создай три типа Button компонентов:

PRIMARY BUTTON:
- Background: #3B82F6 (blue)
- Color: white
- Padding: 12px 24px
- Border-radius: 6px
- Hover: background #2563EB (darker blue)
- Пример: "Send", "Save", "Submit"

SECONDARY BUTTON:
- Background: transparent
- Color: #6B7280 (gray)
- Border: 1px solid #D1D5DB
- Padding: 12px 24px
- Hover: background #F3F4F6
- Пример: "Cancel", "Back"

DANGER BUTTON:
- Background: #EF4444 (red)
- Color: white
- Padding: 12px 24px
- Border-radius: 6px
- Hover: background #DC2626 (darker red)
- Пример: "Delete", "Remove"

STATES:
- Disabled: opacity 0.5, cursor not-allowed
- Loading: показать spinner вместо текста
```

---

### 2. Input / Textarea (Поле ввода)

**Что это:**
- Поле для ввода текста
- **Input** — однострочное поле
- **Textarea** — многострочное поле

**Аналогия:** Бланк для заполнения — впишите своё имя

**Input (однострочный):**
```
┌──────────────────────────────┐
│ Enter your name...           │ ← Input
└──────────────────────────────┘
```

**Когда использовать:**
- Имя, email, телефон
- Поиск
- Короткий текст (1 строка)

**Textarea (многострочный):**
```
┌──────────────────────────────┐
│ Enter your message...        │
│                              │
│                              │ ← Textarea
│                              │
└──────────────────────────────┘
```

**Когда использовать:**
- Сообщения, комментарии
- Длинный текст (несколько строк)
- Отзывы, описания

**В AI Learning Agent:**

**Textarea:**
- Компонент: `InputForm.jsx` → многострочное поле для вопроса
- Компонент: `ClaudeAISidebar.jsx` → поле ввода сообщения
- Rows: 3 (3 строки по умолчанию)
- Placeholder: "Ask a question about web development..."

**Особенности:**
- Enter отправляет сообщение
- Shift+Enter переносит строку
- Disabled состояние во время отправки

**Пример для Claude Code:**
```
Создай Input и Textarea компоненты:

INPUT (однострочный):
<input
  type="text"
  placeholder="Enter your name..."
  className="input-field"
/>

STYLE:
- Width: 100%
- Padding: 12px 16px
- Border: 1px solid #D1D5DB
- Border-radius: 6px
- Font-size: 14px
- Focus: border #3B82F6, outline none

TEXTAREA (многострочный):
<textarea
  placeholder="Enter your message..."
  rows={3}
  className="textarea-field"
/>

STYLE:
- Width: 100%
- Padding: 12px 16px
- Border: 1px solid #D1D5DB
- Border-radius: 6px
- Font-size: 14px
- Resize: vertical (можно изменять высоту)
- Focus: border #3B82F6, outline none

STATES:
- Disabled: background #F9FAFB, cursor not-allowed
- Error: border #EF4444 (red)
```

---

### 3. Select / Dropdown (Выпадающий список)

**Что это:**
- Элемент для выбора одной опции из списка
- Экономит место на экране (список скрыт пока не кликнешь)

**Аналогия:** Меню в ресторане — выбираешь одно блюдо из списка

```
ЗАКРЫТ:
┌────────────────────────┐
│ Select option...    ▼ │ ← Dropdown (закрыт)
└────────────────────────┘

ОТКРЫТ:
┌────────────────────────┐
│ Select option...    ▲ │
├────────────────────────┤
│ Option 1               │ ← Список опций
│ Option 2               │
│ ✓ Option 3 (selected)  │
│ Option 4               │
└────────────────────────┘
```

**Когда использовать:**
- Выбор из 5+ опций (если меньше — используй Radio)
- Страны, города, категории
- Настройки, фильтры

**В AI Learning Agent:**

**ModelSelector (Dropdown для выбора AI модели):**
- Компонент: `ModelSelector.jsx`
- Кнопка показывает текущую модель
- Клик открывает список моделей
- Radio buttons внутри списка для выбора
- Закрывается после выбора

**ClaudeAISidebar (Select для моделей):**
- Компонент: `ClaudeAISidebar.jsx`
- HTML `<select>` элемент
- Показывает: название модели, контекст, цену
- Пример: "Claude 3.5 Haiku · 200K · $1 in / $5 out"

**Пример для Claude Code:**
```
Создай Dropdown компонент для выбора модели:

СТРУКТУРА:
<div className="dropdown">
  <button className="dropdown-toggle" onClick={toggleOpen}>
    🤖 Model: {selectedModel.name}
    <span className="arrow">{isOpen ? '▲' : '▼'}</span>
  </button>

  {isOpen && (
    <div className="dropdown-menu">
      {models.map(model => (
        <label className="dropdown-item">
          <input type="radio" name="model" />
          <div className="model-info">
            <div className="model-name">{model.name}</div>
            <div className="model-description">{model.description}</div>
          </div>
        </label>
      ))}
    </div>
  )}
</div>

СТИЛЬ:
Dropdown Toggle:
- Padding: 12px 16px
- Border: 1px solid #D1D5DB
- Border-radius: 6px
- Cursor: pointer
- Hover: background #F3F4F6

Dropdown Menu:
- Position: absolute
- Top: 100% (под кнопкой)
- Background: white
- Box-shadow: 0 4px 12px rgba(0,0,0,0.1)
- Border-radius: 6px
- Max-height: 300px
- Overflow-y: auto

Dropdown Item:
- Padding: 12px 16px
- Cursor: pointer
- Hover: background #F3F4F6
- Selected: background #DBEAFE

ФУНКЦИОНАЛЬНОСТЬ:
- Клик вне Dropdown → закрыть
- Выбор опции → закрыть и обновить selected
- Escape → закрыть
```

---

### 4. Checkbox / Radio (Галочка / Радиокнопка)

**Что это:**
- Элементы для выбора опций
- **Checkbox** — можно выбрать несколько
- **Radio** — можно выбрать только одну

**Аналогия:**
- **Checkbox** — список покупок (выбираешь несколько товаров)
- **Radio** — выбор размера футболки (только один: S, M, L)

**Checkbox (множественный выбор):**
```
☐ Option 1
☑ Option 2  ← Выбрано
☑ Option 3  ← Выбрано
☐ Option 4
```

**Когда использовать:**
- Множественный выбор (0, 1, 2, ... N опций)
- Согласие с условиями
- Фильтры (категории товаров)

**Radio (единственный выбор):**
```
○ Option 1
◉ Option 2  ← Выбрано (только одна!)
○ Option 3
○ Option 4
```

**Когда использовать:**
- Выбор одной опции из 2-5
- Режимы работы (Current / Module / All)
- Пол (Male / Female)

**В AI Learning Agent:**

**Radio в ContextSelectorModal:**
- Компонент: `ContextSelectorModal.jsx`
- Выбор режима контекста:
  - `○ Current Lesson`
  - `○ Current Module`
  - `○ All Lessons`
  - `○ Custom Selection`
- Только один режим активен в момент времени

**Radio в ModelSelector:**
- Компонент: `ModelSelector.jsx`
- Выбор AI модели из списка
- Только одна модель может быть выбрана

**Checkbox в LessonTree (Custom Selection):**
- Компонент: `LessonTree.jsx` (внутри ContextSelectorModal)
- Множественный выбор уроков для контекста
- Можно выбрать несколько уроков одновременно

**Пример для Claude Code:**
```
Создай Checkbox и Radio компоненты:

CHECKBOX (множественный выбор):
<label className="checkbox-label">
  <input type="checkbox" checked={isChecked} onChange={...} />
  <span className="checkbox-text">Option 1</span>
</label>

STYLE:
- Размер checkbox: 16px x 16px
- Border: 2px solid #D1D5DB
- Border-radius: 4px
- Checked: background #3B82F6, border #3B82F6
- Checkmark: white color (✓)
- Label: margin-left 8px, cursor pointer

RADIO (единственный выбор):
<label className="radio-label">
  <input type="radio" name="group" checked={isSelected} onChange={...} />
  <span className="radio-text">Option 1</span>
</label>

STYLE:
- Размер radio: 16px x 16px
- Border: 2px solid #D1D5DB
- Border-radius: 50% (круг!)
- Checked: border #3B82F6, внутри точка #3B82F6
- Label: margin-left 8px, cursor pointer

ПРИМЕР (Radio group для режима контекста):
<div className="radio-group">
  <label>
    <input type="radio" name="mode" value="current" checked={mode === 'current'} />
    Current Lesson
  </label>
  <label>
    <input type="radio" name="mode" value="module" checked={mode === 'module'} />
    Current Module
  </label>
  <label>
    <input type="radio" name="mode" value="all" checked={mode === 'all'} />
    All Lessons
  </label>
</div>
```

---

### 5. Toggle / Switch (Переключатель)

**Что это:**
- Элемент для включения/выключения функции
- Визуально похож на физический переключатель
- Бинарное состояние: ON / OFF

**Аналогия:** Выключатель света — включил/выключил

```
ВЫКЛЮЧЕН:
┌──────────┐
│ ○        │ OFF
└──────────┘

ВКЛЮЧЕН:
┌──────────┐
│        ● │ ON (синий фон)
└──────────┘
```

**Когда использовать:**
- Включение/выключение функций
- Настройки (Dark Mode, Notifications)
- Мгновенное применение (без кнопки "Save")

**Разница Toggle vs Checkbox:**
- **Toggle** — мгновенное действие (включил и сразу работает)
- **Checkbox** — требует подтверждения (нужна кнопка "Save")

**Пример для Claude Code:**
```
Создай Toggle/Switch компонент:

СТРУКТУРА:
<label className="toggle">
  <input type="checkbox" checked={isOn} onChange={handleToggle} />
  <span className="toggle-slider"></span>
</label>

STYLE:
Container:
- Width: 48px
- Height: 24px
- Background: #D1D5DB (OFF), #3B82F6 (ON)
- Border-radius: 24px (закруглённый)
- Position: relative
- Cursor: pointer

Slider (кружок):
- Width: 20px
- Height: 20px
- Background: white
- Border-radius: 50% (круг)
- Position: absolute
- Left: 2px (OFF), 26px (ON)
- Transition: left 0.2s ease

ПРИМЕР С ТЕКСТОМ:
<div className="toggle-container">
  <label className="toggle-label">
    Dark Mode
    <Toggle checked={darkMode} onChange={setDarkMode} />
  </label>
</div>
```

---

### 6. Slider (Ползунок)

**Что это:**
- Элемент для выбора числового значения
- Перетаскиваешь ползунок влево/вправо
- Показывает диапазон значений (min - max)

**Аналогия:** Регулятор громкости — тише/громче

```
┌──────────────────────────────┐
│ 0 ●───────────── 100          │ ← Slider (значение 25)
│     ↑                         │
│   ползунок                    │
└──────────────────────────────┘
```

**Когда использовать:**
- Выбор числа из диапазона (0-100, 1-10)
- Настройки (громкость, яркость)
- Фильтры (цена: от 100 до 1000)

**В AI Learning Agent:**
- Не используется (нет необходимости)
- Но может быть полезен для:
  - Температура модели (0.0 - 1.0)
  - Max tokens (100 - 4000)

**Пример для Claude Code:**
```
Создай Slider компонент:

СТРУКТУРА:
<div className="slider-container">
  <label>Temperature: {value}</label>
  <input
    type="range"
    min={0}
    max={1}
    step={0.1}
    value={value}
    onChange={(e) => setValue(parseFloat(e.target.value))}
    className="slider"
  />
  <div className="slider-labels">
    <span>0.0</span>
    <span>1.0</span>
  </div>
</div>

STYLE:
Slider:
- Width: 100%
- Height: 6px
- Background: #D1D5DB (трек)
- Border-radius: 6px

Thumb (ползунок):
- Width: 20px
- Height: 20px
- Background: #3B82F6
- Border-radius: 50% (круг)
- Cursor: pointer
- Box-shadow: 0 2px 4px rgba(0,0,0,0.1)

Track (заполненная часть):
- Background: #3B82F6 (от min до текущего значения)
- Background: #D1D5DB (от текущего до max)
```

---

## 🌐 Примеры из AI Learning Agent

### ContextSelectorModal — комбинация элементов

**Компонент:** `ContextSelectorModal.jsx`

**Использует:**
1. **Radio buttons** — выбор режима (Current / Module / All / Custom)
2. **Checkbox tree** — множественный выбор уроков (Custom mode)
3. **Primary button** — "Apply Context"
4. **Secondary button** — "Cancel", "Clear All"

**Структура:**
```
┌────────────────────────────────────────┐
│ Configure Context                   ✕ │
├────────────────────────────────────────┤
│ Quick Modes:                           │
│ ○ Current Lesson                       │ ← Radio
│ ○ Current Module                       │
│ ○ All Lessons                          │
│ ◉ Custom Selection                     │
│                                        │
│ Select Lessons:         [Clear All]   │ ← Secondary button
│ ☑ Course 1                             │ ← Checkbox
│   ☑ Module 1                           │
│     ☑ Lesson 1.1                       │
│     ☐ Lesson 1.2                       │
│                                        │
│ Estimate: 5 lessons, ~12K tokens      │
├────────────────────────────────────────┤
│ [Cancel]           [Apply Context]    │ ← Secondary + Primary
└────────────────────────────────────────┘
```

---

### ClaudeAISidebar — Input + Button

**Компонент:** `ClaudeAISidebar.jsx`

**Использует:**
1. **Select** — выбор модели AI
2. **Textarea** — поле ввода сообщения
3. **Primary button** — "Send"
4. **Secondary button** — "📊" (Statistics), "⚙️" (Configure)

**Структура:**
```
┌────────────────────────────────────────┐
│ 🤖 AI Assistant                        │
│ [Select Model ▼]                       │ ← Select
├────────────────────────────────────────┤
│ Context: Current Lesson       [⚙️]    │ ← Secondary button
├────────────────────────────────────────┤
│ [Сообщения...]                         │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │ Ask a question...                  │ │ ← Textarea
│ │                                    │ │
│ └────────────────────────────────────┘ │
│ [📊]                          [Send]  │ ← Secondary + Primary
└────────────────────────────────────────┘
```

---

## 🤖 Промпт для Claude Code

### Задача: Создать форму настроек с разными элементами

```
Создай React компонент SettingsForm с различными интерактивными элементами:

СТРУКТУРА ФОРМЫ:

1. TEXT INPUT:
   - Label: "Username"
   - Placeholder: "Enter your username..."
   - Validation: min 3 characters

2. TEXTAREA:
   - Label: "Bio"
   - Placeholder: "Tell us about yourself..."
   - Rows: 4

3. SELECT:
   - Label: "Country"
   - Options: ["USA", "UK", "Russia", "Germany"]
   - Default: "Select country..."

4. RADIO GROUP:
   - Label: "Theme"
   - Options: ["Light", "Dark", "Auto"]
   - Default: "Light"

5. CHECKBOX:
   - Label: "Subscribe to newsletter"
   - Default: false

6. TOGGLE:
   - Label: "Enable notifications"
   - Default: true

7. BUTTONS:
   - Secondary: "Cancel" (слева)
   - Primary: "Save Changes" (справа)

LAYOUT:
- Vertical form (элементы друг под другом)
- Max-width: 600px
- Spacing между элементами: 20px
- Labels: font-weight bold, margin-bottom 8px

VALIDATION:
- Username: показать error если < 3 символов
- Bio: показать счётчик символов (max 500)
- Form submit: все required поля заполнены

ТЕХНОЛОГИИ:
- React + useState для состояния
- CSS для стилей
- Все стили из предыдущих примеров

Создай полностью рабочий компонент.
```

---

## ✅ Критерии завершения урока

**Понимание концепций:**
- [ ] Могу объяснить что такое Interactive Elements
- [ ] Знаю разницу между Primary, Secondary, Danger кнопками
- [ ] Понимаю когда использовать Input vs Textarea
- [ ] Знаю разницу между Checkbox, Radio, Toggle
- [ ] Понимаю когда использовать Select vs Radio

**Практическое применение:**
- [ ] Могу назвать интерактивные элементы на любом сайте
- [ ] Понимаю когда использовать каждый тип элемента
- [ ] Могу сформулировать задачу для Claude Code

**Связь с AI Learning Agent:**
- [ ] Понимаю как работает ContextSelectorModal
- [ ] Знаю где используются Radio и Checkbox
- [ ] Знаю где используются Primary и Secondary кнопки

---

## 📝 Вопросы для самопроверки

1. **Кнопки:**
   - Назови три типа кнопок
   - Когда использовать Primary button?
   - Когда использовать Danger button?
   - Сколько Primary кнопок должно быть на странице?

2. **Input vs Textarea:**
   - В чём разница?
   - Когда использовать Input?
   - Когда использовать Textarea?

3. **Checkbox vs Radio vs Toggle:**
   - В чём разница?
   - Когда использовать Checkbox? (приведи пример)
   - Когда использовать Radio? (приведи пример)
   - Когда использовать Toggle? (приведи пример)

4. **В AI Learning Agent:**
   - Где используются Radio buttons?
   - Где используются Checkbox?
   - Какой тип кнопки "Send" в ClaudeAISidebar?
   - Какой тип кнопки "Cancel" в ContextSelectorModal?

5. **Для Claude Code:**
   - Как описать Primary button?
   - Как описать Radio group?
   - Как описать Textarea с 3 строками?

---

## 🔗 Связь с другими уроками

**Предыдущий урок:** 1.2 Navigation Elements
- Navigation использует кнопки для раскрытия/сворачивания (Tree)
- Tabs — это специальный вид Radio buttons

**Следующий урок:** 1.4 Feedback Elements
- Feedback элементы показывают результат взаимодействия
- Button → Modal (открывается после клика)
- Input → Validation error (показывается после ввода)

**Связь с проектом:**
- ContextSelectorModal — использует все интерактивные элементы
- ClaudeAISidebar — использует Input, Select, Button

---

## 💡 Итоговые выводы

**Что я понял:**

1. **Interactive Elements** — элементы для взаимодействия с пользователем
   - **Button** — выполнить действие (Primary, Secondary, Danger)
   - **Input/Textarea** — ввести текст (короткий/длинный)
   - **Select** — выбрать из списка (5+ опций)
   - **Radio** — выбрать одну опцию (2-5 опций)
   - **Checkbox** — выбрать несколько опций
   - **Toggle** — включить/выключить (мгновенно)
   - **Slider** — выбрать число из диапазона

2. **Правильный выбор элемента:**
   - Одна опция из 2-5 → Radio
   - Одна опция из 5+ → Select
   - Несколько опций → Checkbox
   - Включить/выключить → Toggle

3. **Для работы с ИИ:**
   - Не "синяя кнопка", а **"Primary Button"**
   - Не "галочка", а **"Checkbox"**
   - Не "кружочек", а **"Radio button"**
   - Не "переключатель", а **"Toggle/Switch"**

---

*Версия урока: 1.0*
*Дата создания: 16 октября 2025*
*Формат: Vibe Coding для веб-дизайна*
