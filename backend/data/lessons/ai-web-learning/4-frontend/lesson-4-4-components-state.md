# Урок 4.4: Компоненты и State - Управление данными в React

> **Модуль 4:** Frontend разработка  
> **Урок:** 4.4  
> **Длительность:** 60-70 минут  
> **Prerequisite:** Урок 4.3 (Введение в React)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать разницу между Props и State
- ✅ Объяснить как работает useState hook
- ✅ Знать концепцию Controlled Components
- ✅ Понимать useEffect и побочные эффекты
- ✅ Уметь работать со списками и условным рендерингом
- ✅ Сформулировать задачу для Claude Code с правильным state management
- ✅ Применить концепции для EngineCamPro v2

---

## 📖 Концепция: Props vs State

### Простое определение

**Props (properties)** - данные которые компонент **получает** от родителя (read-only).

**State** - данные которые компонент **хранит и изменяет** сам (mutable).

### Зачем это нужно

Без разделения Props и State:
- ❌ Неясно откуда берутся данные
- ❌ Компоненты сложно переиспользовать
- ❌ Трудно отследить изменения
- ❌ Запутанный поток данных

С Props и State:
- ✅ Чёткий поток данных (сверху вниз)
- ✅ Компоненты независимы и переиспользуемы
- ✅ Легко понять кто отвечает за данные
- ✅ Предсказуемое поведение

### 🎁 Аналогия: Подарок и карман

```
┌─────────────────────────────────────────────────────┐
│            PROPS = ПОДАРОК (получил)                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│  👨 Родитель дал тебе подарок                        │
│      ↓                                              │
│  🎁 Ты получил подарок                               │
│                                                     │
│  Правила:                                           │
│  ❌ Ты НЕ МОЖЕШЬ изменить подарок                    │
│  ✅ Можешь только ИСПОЛЬЗОВАТЬ                       │
│  ✅ Можешь передать дальше другому                   │
│                                                     │
│  Пример:                                            │
│  Папа дал тебе книгу (prop: book="React Guide")    │
│  Ты можешь читать, но не можешь изменить книгу      │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│            STATE = КАРМАН (твоё личное)              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  👤 У тебя свой карман                               │
│      ↓                                              │
│  💰 Ты хранишь деньги в кармане                      │
│                                                     │
│  Правила:                                           │
│  ✅ Ты МОЖЕШЬ изменять содержимое                    │
│  ✅ Только ТЫ управляешь этим                        │
│  ✅ Никто другой не может менять                     │
│                                                     │
│  Пример:                                            │
│  У тебя в кармане 100 рублей (state: money=100)    │
│  Купил мороженое - осталось 50 (setState(50))      │
│  Только ТЫ решаешь сколько потратить               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Схема взаимодействия

```
┌───────────────────────────────────────────────────┐
│         РОДИТЕЛЬСКИЙ КОМПОНЕНТ <App>               │
├───────────────────────────────────────────────────┤
│                                                   │
│  STATE (его личные данные):                        │
│  const [count, setCount] = useState(0)            │
│  const [username, setUsername] = useState("Alex") │
│                                                   │
│  Управляет своим State ✅                          │
│                                                   │
│         ↓ передаёт PROPS ↓                        │
│                                                   │
└───────────────────────────────────────────────────┘
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
┌──────────────────┐    ┌──────────────────┐
│  ДОЧЕРНИЙ <A>    │    │  ДОЧЕРНИЙ <B>    │
├──────────────────┤    ├──────────────────┤
│                  │    │                  │
│  PROPS (получил):│    │  PROPS (получил):│
│  count={0}       │    │  username="Alex" │
│                  │    │                  │
│  НЕ может менять │    │  НЕ может менять │
│  props ❌        │    │  props ❌        │
│                  │    │                  │
│  Может иметь     │    │  Может иметь     │
│  свой STATE ✅   │    │  свой STATE ✅   │
│                  │    │                  │
└──────────────────┘    └──────────────────┘

ПРАВИЛО: Данные текут СВЕРХУ ВНИЗ (one-way data flow)
```

---

## 🔧 useState - Управление State

### Что такое useState

**useState** - это React Hook (встроенная функция) для создания и управления state в компоненте.

### Концепция работы

```
┌─────────────────────────────────────────────────┐
│           КАК РАБОТАЕТ useState                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  1️⃣ Создание State:                             │
│     const [count, setCount] = useState(0)       │
│           ↑       ↑              ↑              │
│        текущее  функция      начальное          │
│        значение изменения    значение           │
│                                                 │
│  2️⃣ Чтение State:                               │
│     <div>{count}</div>                          │
│     → показывает текущее значение               │
│                                                 │
│  3️⃣ Изменение State:                            │
│     setCount(count + 1)                         │
│     → React перерисует компонент                │
│     → count обновится на экране                 │
│                                                 │
│  4️⃣ ВАЖНО - State изменяется асинхронно:        │
│     setCount(5)                                 │
│     console.log(count) // ещё старое значение!  │
│     → обновление произойдёт после рендера       │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Аналогия: Термостат

```
ТЕРМОСТАТ В КОМНАТЕ = useState

┌─────────────────────────────────────┐
│  🌡️ ТЕРМОСТАТ                        │
├─────────────────────────────────────┤
│                                     │
│  Текущая температура: 20°C          │
│  (это как count в useState)         │
│                                     │
│  Кнопки управления:                 │
│  [+] Повысить температуру           │
│  [-] Понизить температуру           │
│  (это как setCount функция)         │
│                                     │
│  Когда нажимаешь кнопку:            │
│  1. Температура меняется            │
│  2. Дисплей АВТОМАТИЧЕСКИ обновится │
│  3. Комната нагревается/остывает    │
│                                     │
│  Ты НЕ МОЖЕШЬ просто написать       │
│  маркером "25°C" на дисплее -       │
│  нужно использовать кнопки!         │
│  (нельзя count = 5, нужен setCount!)│
│                                     │
└─────────────────────────────────────┘
```

### Множественный State

```
Компонент может иметь несколько State:

const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [age, setAge] = useState(0)
const [isLoading, setIsLoading] = useState(false)
const [errors, setErrors] = useState([])

Каждый State независим!
Изменение одного НЕ влияет на другие.
```

---

## 🎮 Controlled Components

### Концепция

**Controlled Component** - элемент формы (input, textarea, select) чьё значение контролируется React State.

### Зачем это нужно

**Uncontrolled (плохо):**
```
HTML сам хранит значение input
→ React не знает что там написано
→ Нет контроля и валидации
→ Трудно работать с формой
```

**Controlled (хорошо):**
```
React State хранит значение input
→ React точно знает что в поле
→ Можем валидировать в реальном времени
→ Полный контроль над данными
```

### Схема работы

```
┌─────────────────────────────────────────────────┐
│         CONTROLLED INPUT (двусторонняя связь)    │
├─────────────────────────────────────────────────┤
│                                                 │
│  STATE (источник истины):                       │
│  const [name, setName] = useState('')           │
│                                                 │
│         ↓ value           onChange ↓            │
│                                                 │
│  ┌────────────────────────────────────┐         │
│  │  <input                            │         │
│  │    value={name}                    │ ◄────┐  │
│  │    onChange={e => setName(e.value)}│      │  │
│  │  />                                │      │  │
│  └────────────────────────────────────┘      │  │
│         │                              │      │  │
│         │                              │      │  │
│  Пользователь печатает "Hello"        │      │  │
│         │                              │      │  │
│         └──────► onChange сработал     │      │  │
│                          ↓             │      │  │
│                  setName("Hello")      │      │  │
│                          ↓             │      │  │
│                  State обновился       │      │  │
│                          ↓             │      │  │
│                  React перерисовал     │      │  │
│                          ↓             │      │  │
│                  Input показывает ─────┘      │  │
│                  новое значение               │  │
│                                                 │
│  РЕЗУЛЬТАТ: State и UI всегда синхронизированы! │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Пример концепции

```
Форма регистрации кулачка:

State хранит все поля:
- name: "Cam-001"
- base_radius: 50
- lift: 10
- duration: 180

Каждый input связан со своим State:
<input value={name} onChange={e => setName(e.target.value)} />
<input value={base_radius} onChange={e => setBaseRadius(e.target.value)} />

Преимущества:
✅ React знает все значения в любой момент
✅ Можно валидировать при вводе
✅ Можно показать ошибки сразу
✅ Легко очистить форму (просто обнули State)
```

---

## ⚡ useEffect - Побочные эффекты

### Что такое useEffect

**useEffect** - Hook для выполнения побочных эффектов (side effects) в компонентах.

**Побочные эффекты** - действия которые выходят за рамки рендеринга:
- HTTP запросы (Fetch)
- Подписки (WebSocket)
- Таймеры (setTimeout, setInterval)
- Изменение document.title
- Работа с localStorage

### Концепция работы

```
┌─────────────────────────────────────────────────┐
│              ЖИЗНЕННЫЙ ЦИКЛ КОМПОНЕНТА           │
├─────────────────────────────────────────────────┤
│                                                 │
│  1️⃣ МОНТИРОВАНИЕ (Mount):                       │
│     Компонент появился на экране в первый раз   │
│     → useEffect запускается                     │
│                                                 │
│  2️⃣ ОБНОВЛЕНИЕ (Update):                        │
│     State изменился → компонент перерисовался   │
│     → useEffect может запуститься снова         │
│       (зависит от dependencies)                 │
│                                                 │
│  3️⃣ РАЗМОНТИРОВАНИЕ (Unmount):                  │
│     Компонент удаляется с экрана                │
│     → cleanup функция выполняется               │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Аналогия: Приход и уход из комнаты

```
┌─────────────────────────────────────────────────┐
│           useEffect = АВТОМАТИЧЕСКИЕ ДЕЙСТВИЯ    │
├─────────────────────────────────────────────────┤
│                                                 │
│  🚪 ТЫ ЗАШЁЛ В КОМНАТУ (Mount):                  │
│     useEffect(() => {                           │
│       console.log("Включил свет")               │
│       console.log("Включил кондиционер")        │
│     }, []) ← пустой массив = только при входе   │
│                                                 │
│  🔄 ТЫ ЧТО-ТО ДЕЛАЕШЬ В КОМНАТЕ (Update):        │
│     useEffect(() => {                           │
│       console.log(`Температура: ${temp}°C`)     │
│     }, [temp]) ← зависимость = при изменении    │
│                                                 │
│  🚪 ТЫ ВЫШЕЛ ИЗ КОМНАТЫ (Unmount):               │
│     useEffect(() => {                           │
│       return () => {                            │
│         console.log("Выключил свет")            │
│         console.log("Выключил кондиционер")     │
│       }                                         │
│     }, [])                                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Практическое применение

```
Для EngineCamPro:

1. Загрузка данных при открытии страницы:
useEffect(() => {
  fetch('/api/cams')
    .then(data => setCams(data))
}, []) // пустой массив = только при mount

2. Обновление заголовка страницы:
useEffect(() => {
  document.title = `Cam Calculator - ${camName}`
}, [camName]) // при изменении camName

3. Автосохранение формы:
useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('draft', JSON.stringify(formData))
  }, 1000)
  
  return () => clearTimeout(timer) // cleanup
}, [formData]) // при изменении formData
```

---

## 📋 Списки и Условный рендеринг

### Рендеринг списков

**Концепция:**
React может рендерить массивы компонентов.

```
Есть массив кулачков:
const cams = [
  {id: 1, name: "Cam-001", radius: 50},
  {id: 2, name: "Cam-002", radius: 60},
  {id: 3, name: "Cam-003", radius: 55}
]

React рендерит каждый элемент:
{cams.map(cam => (
  <CamCard key={cam.id} cam={cam} />
))}

ВАЖНО: key нужен для оптимизации!
React использует key чтобы понять какой элемент изменился.
```

### Зачем нужен key

```
БЕЗ key (плохо):
React не знает какой элемент изменился
→ Перерисовывает ВСЁ заново
→ Медленно и неэффективно
→ Теряется состояние компонентов

С key (хорошо):
React видит что изменился элемент с key=2
→ Перерисовывает ТОЛЬКО его
→ Быстро и эффективно
→ Состояние сохраняется
```

### Условный рендеринг

**Концепция:**
Показывать разные компоненты в зависимости от условий.

```
Паттерны условного рендеринга:

1. If-else (тернарный оператор):
{isLoading ? <Spinner /> : <Results />}

2. Логическое И (&&):
{error && <ErrorMessage text={error} />}

3. Switch через объект:
const views = {
  loading: <Spinner />,
  success: <Results />,
  error: <ErrorMessage />
}
return views[status]

4. Early return:
if (isLoading) return <Spinner />
if (error) return <ErrorMessage />
return <Results />
```

---

## 💡 Контекст применения

### Для EngineCamPro v2

**State management для страницы расчёта:**

```
1. Форма параметров:
const [baseRadius, setBaseRadius] = useState(50)
const [lift, setLift] = useState(10)
const [duration, setDuration] = useState(180)

2. Результаты и загрузка:
const [profile, setProfile] = useState(null)
const [isCalculating, setIsCalculating] = useState(false)
const [error, setError] = useState(null)

3. Список проектов:
const [projects, setProjects] = useState([])
const [selectedProject, setSelectedProject] = useState(null)

4. Побочные эффекты:
useEffect(() => {
  // Загрузить проекты при открытии
  fetchProjects()
}, [])

useEffect(() => {
  // Автосохранение параметров
  saveToLocalStorage(baseRadius, lift, duration)
}, [baseRadius, lift, duration])

5. Условный рендеринг:
{isCalculating && <Spinner />}
{error && <ErrorMessage message={error} />}
{profile && <ProfileChart data={profile} />}

6. Список кулачков:
{cams.map(cam => (
  <CamCard 
    key={cam.id} 
    cam={cam}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
))}
```

---

## 🤖 Работа с Claude Code

### Сценарий: Форма с валидацией и побочными эффектами

#### ✅ Эффективный диалог

```
Ты: Создай React компонент формы для ввода параметров кулачка 
с валидацией и автосохранением.

Требования к State management:

1. Form State (controlled inputs):
const [name, setName] = useState('')
const [baseRadius, setBaseRadius] = useState(50)
const [lift, setLift] = useState(10)
const [duration, setDuration] = useState(180)

2. Validation State:
const [errors, setErrors] = useState({})
const [touched, setTouched] = useState({})

3. Submission State:
const [isSubmitting, setIsSubmitting] = useState(false)
const [submitError, setSubmitError] = useState(null)

Валидация:
- name: обязательно, мин 3 символа
- baseRadius: обязательно, > 0, < 500
- lift: обязательно, > 0, < baseRadius
- duration: обязательно, > 0, <= 360

Валидация в реальном времени:
- Показывать ошибку только после того как поле touched
- При изменении поля - валидировать немедленно
- Цвет рамки: красный если ошибка, зелёный если валидно

useEffect побочные эффекты:
1. Автосохранение в localStorage каждые 2 секунды
useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('camDraft', JSON.stringify({
      name, baseRadius, lift, duration
    }))
  }, 2000)
  return () => clearTimeout(timer)
}, [name, baseRadius, lift, duration])

2. Загрузка draft при mount
useEffect(() => {
  const draft = localStorage.getItem('camDraft')
  if (draft) {
    const data = JSON.parse(draft)
    // предложить восстановить
  }
}, [])

3. Предотвращение закрытия если есть несохранённые изменения
useEffect(() => {
  const handleBeforeUnload = (e) => {
    if (hasUnsavedChanges) {
      e.preventDefault()
    }
  }
  window.addEventListener('beforeunload', handleBeforeUnload)
  return () => window.removeEventListener('beforeunload', handleBeforeUnload)
}, [hasUnsavedChanges])

Submission:
- При submit отправить POST на /api/cams
- Показать loading во время отправки
- При успехе: очистить форму, показать success message
- При ошибке: показать error message

Условный рендеринг:
- Loading spinner при isSubmitting
- Error message если submitError
- Success message после успешной отправки
- Disable кнопки если есть ошибки валидации

UI/UX:
- Используй controlled inputs для всех полей
- Красивый дизайн с Tailwind или CSS
- Индикация валидации (цвет рамки, иконки)
- Адаптивная вёрстка

Claude Code: [создаёт компонент с полным state management]

Создал компонент CamForm.jsx со следующими особенностями:

State management:
- Controlled inputs для всех полей
- Валидация в реальном времени
- Touched tracking для UX

useEffect hooks:
- Автосохранение в localStorage
- Восстановление draft при mount
- beforeunload предупреждение

Validation logic:
- Функция validateField для каждого поля
- Функция validateForm для всей формы
- Custom validation rules

Error handling:
- Красные рамки для ошибок
- Error messages под полями
- Submit errors вверху формы

Хочешь что-то изменить?

Ты: Отлично! Добавь историю отправок - список последних 
5 созданных кулачков

Claude Code: [добавляет State для истории и компонент списка]
Добавил:
- const [history, setHistory] = useState([])
- useEffect для загрузки истории из API
- Компонент <SubmissionHistory history={history} />
- Обновление истории после успешной отправки
```

**Почему это эффективно:**
- ✅ Детально описан весь State
- ✅ useEffect hooks с конкретными задачами
- ✅ Валидация расписана полностью
- ✅ Controlled inputs подход указан
- ✅ Побочные эффекты описаны
- ✅ Условный рендеринг указан

---

## 🛠️ Практическое задание

### Задача

Создай React компонент TODO list с полным state management.

**Цель:** Отработать все концепции урока (State, Props, useEffect, списки, условный рендеринг).

### Работа с Claude Code

**Шаг 1:** Создай проект
```bash
cd ~/projects
mkdir react-todo-app
cd react-todo-app
claude
```

**Шаг 2:** Диалог с Claude Code

```
Ты: Создай React TODO приложение с полным state management.

Требования к структуре:
- Vite проект (React + JavaScript)
- Компоненты: <App />, <TodoForm />, <TodoList />, <TodoItem />

State в <App />:
const [todos, setTodos] = useState([])
const [filter, setFilter] = useState('all') // all, active, completed

State в <TodoForm />:
const [text, setText] = useState('')

Props передача:
<TodoList 
  todos={filteredTodos}
  onToggle={handleToggle}
  onDelete={handleDelete}
/>

<TodoItem
  todo={todo}
  onToggle={() => onToggle(todo.id)}
  onDelete={() => onDelete(todo.id)}
/>

Функциональность:
1. Добавление TODO (controlled input)
2. Отметка как выполненное (toggle completed)
3. Удаление TODO
4. Фильтрация (all, active, completed)
5. Счётчик активных TODO

useEffect:
1. Сохранение в localStorage при изменении todos
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])

2. Загрузка из localStorage при mount
useEffect(() => {
  const saved = localStorage.getItem('todos')
  if (saved) setTodos(JSON.parse(saved))
}, [])

Условный рендеринг:
- Если todos пустой → показать "No todos yet"
- При фильтре active → показать только невыполненные
- При фильтре completed → показать только выполненные

Списки:
- Рендерить todos через .map()
- Использовать key={todo.id}
- Фильтрация через .filter()

Валидация:
- Нельзя добавить пустой TODO
- Trim пробелов
- Минимум 3 символа

UI:
- Современный дизайн
- Зачёркнутый текст для completed
- Кнопки фильтров (подсветка активного)
- Счётчик: "X items left"

Claude Code: [создаёт полноценное TODO приложение]
```

**Шаг 3:** Тестирование

Проверь все функции:
- [ ] Добавление TODO работает
- [ ] Controlled input синхронизирован
- [ ] Toggle меняет состояние
- [ ] Удаление работает
- [ ] Фильтры работают
- [ ] localStorage сохраняет данные
- [ ] При перезагрузке данные восстанавливаются

**Шаг 4:** Эксперименты

```
Ты: Добавь возможность редактирования TODO (double click)

Ты: Добавь drag-and-drop для изменения порядка

Ты: Добавь категории для TODO
```

### Ожидаемый результат

- ✅ Все концепции применены (State, Props, useEffect)
- ✅ Controlled inputs работают
- ✅ localStorage сохраняет данные
- ✅ Списки рендерятся с key
- ✅ Условный рендеринг работает
- ✅ Понимаешь поток данных

---

## ❓ Вопросы для самопроверки

1. **Props vs State - в чём разница?**
   - Когда использовать props, а когда state?
   - Приведи пример из EngineCamPro

2. **Объясни useState своими словами**
   - Почему нельзя просто count = 5?
   - Что происходит после setCount?

3. **Что такое Controlled Component?**
   - Зачем контролировать input через State?
   - Какие преимущества?

4. **Зачем нужен useEffect?**
   - Какие задачи решает?
   - Что такое cleanup функция?

5. **Зачем key в списках?**
   - Что будет если не использовать key?
   - Можно ли использовать index как key?

6. **Для EngineCamPro v2:**
   - Какой State нужен для формы расчёта?
   - Какие useEffect нам понадобятся?
   - Как организовать Props между компонентами?

---

## 🔗 Связь с другими уроками

**Основано на уроках:**
- Урок 4.2: Fetch API - будем использовать в useEffect
- Урок 4.3: React введение - теперь детальный разбор

**Подготавливает к урокам:**
- Урок 4.5: Визуализация данных - State для графиков
- Урок 4.6: UI библиотеки - компоненты с правильным State
- Урок 5.1: Frontend-Backend интеграция - полный state flow

**Связь с EngineCamPro:**
В следующих уроках применим эти концепции:
- State для параметров кулачка
- Controlled inputs для форм
- useEffect для загрузки данных
- Props для передачи данных между компонентами
- Списки для отображения проектов и кулачков

---

## ✅ Критерии завершения урока

**Понимание концепций:**
- [ ] Понимаю разницу между Props и State
- [ ] Могу объяснить как работает useState
- [ ] Понимаю Controlled Components
- [ ] Знаю зачем нужен useEffect
- [ ] Понимаю важность key в списках

**Практические навыки:**
- [ ] Могу описать State для компонента
- [ ] Понимаю когда использовать useEffect
- [ ] Знаю как организовать Props передачу
- [ ] Могу формулировать задачи с правильным State management

**Готовность к следующему уроку:**
- [ ] Создано TODO приложение
- [ ] Все концепции применены на практике
- [ ] localStorage работает
- [ ] Понимаю поток данных в React приложении

---

**Статус урока:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён  
**Дата начала:** _________  
**Дата завершения:** _________

---

## 📚 Дополнительные материалы (опционально)

Если хочешь узнать больше:
- [React Hooks](https://react.dev/reference/react) - официальная документация
- [useState in depth](https://react.dev/reference/react/useState) - детали useState
- [useEffect guide](https://react.dev/reference/react/useEffect) - детали useEffect

**НО!** Главное - понять концепции из этого урока. Claude Code напишет правильный код за тебя!