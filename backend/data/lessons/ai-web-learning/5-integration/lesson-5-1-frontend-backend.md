# Урок 5.1: Соединение Frontend и Backend - Полный цикл

> **Модуль 5:** Интеграция Frontend-Backend  
> **Урок:** 5.1  
> **Длительность:** 70-80 минут  
> **Prerequisite:** Модули 1-4 (все предыдущие концепции)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать полный цикл взаимодействия Frontend-Backend
- ✅ Соединить React приложение с FastAPI
- ✅ Организовать API вызовы в React правильно
- ✅ Управлять состоянием загрузки и ошибок
- ✅ Сформулировать задачу для Claude Code на полную интеграцию
- ✅ Создать рабочий прототип EngineCamPro v2

---

## 📖 Концепция: Полный цикл запрос-ответ

### Простое определение

**Frontend-Backend интеграция** - это организация взаимодействия между React приложением (frontend) и FastAPI сервером (backend) для полноценной работы веб-приложения.

### Зачем это нужно

Без интеграции:
- ❌ Frontend и Backend живут отдельно
- ❌ Нет реальных данных в приложении
- ❌ Невозможно выполнить расчёты
- ❌ Приложение не функционально

С интеграцией:
- ✅ Frontend отправляет данные на Backend
- ✅ Backend обрабатывает и возвращает результаты
- ✅ Frontend отображает результаты пользователю
- ✅ Полноценное работающее приложение

### 🔄 Аналогия: Ресторан (полный цикл)

```
┌─────────────────────────────────────────────────────┐
│        ПОЛНЫЙ ЦИКЛ ОБСЛУЖИВАНИЯ В РЕСТОРАНЕ          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  👤 КЛИЕНТ (User)                                    │
│     ↓                                               │
│  📱 "Хочу пиццу Маргарита"                           │
│     ↓                                               │
│                                                     │
│  💻 ОФИЦИАНТ (Frontend/React)                        │
│     ↓                                               │
│  1️⃣ Принимает заказ                                 │
│  2️⃣ Проверяет (валидация): есть ли такое в меню?    │
│  3️⃣ Показывает "Готовим..." (loading state)         │
│  4️⃣ Передаёт на кухню (HTTP POST запрос)            │
│     ↓                                               │
│     🌐 ЧЕРЕЗ ИНТЕРНЕТ (HTTP)                         │
│     ↓                                               │
│  🍳 КУХНЯ (Backend/FastAPI)                          │
│     ↓                                               │
│  1️⃣ Получает заказ                                  │
│  2️⃣ Проверяет ингредиенты (валидация параметров)    │
│  3️⃣ Готовит пиццу (математические расчёты)          │
│  4️⃣ Отдаёт готовое (JSON response)                  │
│     ↓                                               │
│     🌐 ЧЕРЕЗ ИНТЕРНЕТ (HTTP)                         │
│     ↓                                               │
│  💻 ОФИЦИАНТ (Frontend/React)                        │
│     ↓                                               │
│  1️⃣ Получает готовое блюдо (response data)          │
│  2️⃣ Проверяет всё ли в порядке (error handling)     │
│  3️⃣ Убирает "Готовим..." (loading = false)          │
│  4️⃣ Красиво подаёт клиенту (render results)         │
│     ↓                                               │
│  👤 КЛИЕНТ (User)                                    │
│     ↓                                               │
│  😋 Видит пиццу на тарелке (график профиля)         │
│                                                     │
│  ⏱️ ВРЕМЯ ЦИКЛА: ~2-5 секунд                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 Детальная схема интеграции

### Полный цикл для EngineCamPro

```
┌───────────────────────────────────────────────────────┐
│              FRONTEND (React на localhost:5173)        │
├───────────────────────────────────────────────────────┤
│                                                       │
│  👤 User вводит параметры:                             │
│     base_radius: 50                                   │
│     lift: 10                                          │
│     duration: 180                                     │
│                                                       │
│  ⬇️ onClick кнопки "Calculate"                        │
│                                                       │
│  📦 State изменяется:                                  │
│     setIsLoading(true)                                │
│     setError(null)                                    │
│                                                       │
│  ⬇️                                                    │
│                                                       │
│  🌐 Fetch API отправляет:                             │
│     POST http://localhost:8000/api/cams/calculate     │
│     Body: {                                           │
│       base_radius: 50,                                │
│       lift: 10,                                       │
│       duration: 180                                   │
│     }                                                 │
│     Headers: {                                        │
│       'Content-Type': 'application/json'              │
│     }                                                 │
│                                                       │
│  ⏳ ОЖИДАНИЕ... (spinner показывается)                │
│                                                       │
└───────────────────────────────────────────────────────┘
                        ⬇️
         🌐 HTTP через сеть (обычно мгновенно локально)
                        ⬇️
┌───────────────────────────────────────────────────────┐
│              BACKEND (FastAPI на localhost:8000)       │
├───────────────────────────────────────────────────────┤
│                                                       │
│  📥 Endpoint получает запрос:                          │
│     @app.post("/api/cams/calculate")                  │
│                                                       │
│  ⬇️                                                    │
│                                                       │
│  ✅ Pydantic валидация:                                │
│     - base_radius > 0 ✅                              │
│     - lift > 0 ✅                                     │
│     - duration > 0 and <= 360 ✅                      │
│                                                       │
│  ⬇️                                                    │
│                                                       │
│  🔢 Математические расчёты:                            │
│     - Генерация профиля (NumPy)                       │
│     - Расчёт скорости                                 │
│     - Расчёт ускорения                                │
│     - Поиск максимумов                                │
│                                                       │
│  ⬇️                                                    │
│                                                       │
│  📤 Формирование ответа:                               │
│     {                                                 │
│       "profile": [                                    │
│         {"angle": 0, "radius": 50},                   │
│         {"angle": 10, "radius": 51.2},                │
│         ...                                           │
│       ],                                              │
│       "max_velocity": 23.5,                           │
│       "max_acceleration": 15.2                        │
│     }                                                 │
│     Status: 200 OK                                    │
│                                                       │
└───────────────────────────────────────────────────────┘
                        ⬇️
         🌐 HTTP через сеть
                        ⬇️
┌───────────────────────────────────────────────────────┐
│              FRONTEND (React на localhost:5173)        │
├───────────────────────────────────────────────────────┤
│                                                       │
│  📥 Fetch получает ответ:                              │
│     response.json()                                   │
│                                                       │
│  ⬇️                                                    │
│                                                       │
│  📦 State обновляется:                                 │
│     setProfileData(response.profile)                  │
│     setMaxVelocity(response.max_velocity)             │
│     setMaxAcceleration(response.max_acceleration)     │
│     setIsLoading(false)                               │
│                                                       │
│  ⬇️                                                    │
│                                                       │
│  🎨 React перерисовывает UI:                           │
│     - Скрывает spinner                                │
│     - Показывает график профиля (Chart.js)            │
│     - Отображает характеристики                       │
│                                                       │
│  ⬇️                                                    │
│                                                       │
│  👤 User видит результат! 🎉                           │
│                                                       │
└───────────────────────────────────────────────────────┘

ВРЕМЯ ПОЛНОГО ЦИКЛА: ~2-3 секунды
```

---

## 🏗️ Архитектура проекта

### Структура файлов

```
enginecampro-v2/
│
├── backend/                    ← FastAPI сервер
│   ├── app/
│   │   ├── main.py            ← FastAPI app, CORS
│   │   ├── models.py          ← Pydantic модели
│   │   ├── routers/
│   │   │   └── cams.py        ← /api/cams endpoints
│   │   └── core/
│   │       └── calculations.py ← Математика
│   ├── requirements.txt
│   └── .env
│
├── frontend/                   ← React приложение
│   ├── src/
│   │   ├── components/
│   │   │   ├── CamForm.jsx           ← Форма ввода
│   │   │   ├── ProfileChart.jsx      ← График
│   │   │   └── ResultsPanel.jsx      ← Результаты
│   │   ├── services/
│   │   │   └── api.js                ← API функции
│   │   ├── hooks/
│   │   │   └── useCamCalculation.js  ← Custom hook
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

### Разделение ответственности

```
┌─────────────────────────────────────────────────┐
│              BACKEND ОТВЕЧАЕТ ЗА:                │
├─────────────────────────────────────────────────┤
│  ✅ Бизнес-логика (математика)                   │
│  ✅ Валидация данных                            │
│  ✅ Работа с базой данных                       │
│  ✅ Безопасность (аутентификация)               │
│  ✅ Обработка ошибок                            │
│  ✅ Производительность расчётов                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              FRONTEND ОТВЕЧАЕТ ЗА:               │
├─────────────────────────────────────────────────┤
│  ✅ UI/UX (как выглядит)                         │
│  ✅ Интерактивность (клики, ввод)               │
│  ✅ Визуализация (графики)                      │
│  ✅ Клиентская валидация (быстрая)              │
│  ✅ State management                            │
│  ✅ Routing (навигация)                         │
└─────────────────────────────────────────────────┘

КОММУНИКАЦИЯ: HTTP/JSON через Fetch API
```

---

## 💡 Организация API вызовов в React

### Подход 1: Прямой Fetch в компоненте (плохо)

```
❌ НЕ ДЕЛАЙ ТАК:

function CamForm() {
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/cams', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      const result = await response.json()
      setResult(result)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }
}

ПРОБЛЕМЫ:
- URL захардкожен в компоненте
- Дублирование логики в каждом компоненте
- Сложно поддерживать
- Нет централизованной обработки ошибок
```

### Подход 2: API service (хорошо)

```
✅ ДЕЛАЙ ТАК:

// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  'http://localhost:8000'

export const camAPI = {
  async calculate(params) {
    const response = await fetch(`${API_BASE_URL}/api/cams/calculate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Calculation failed')
    }
    
    return response.json()
  },
  
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/api/cams`)
    if (!response.ok) throw new Error('Failed to fetch cams')
    return response.json()
  }
}

// Использование в компоненте
import { camAPI } from '../services/api'

function CamForm() {
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const result = await camAPI.calculate(formData)
      setResult(result)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
}

ПРЕИМУЩЕСТВА:
✅ Централизованное управление API
✅ URL в одном месте
✅ Легко изменить backend URL
✅ Единая обработка ошибок
✅ Переиспользуемый код
```

### Подход 3: Custom Hook (лучшее)

```
✅✅ ЕЩЁ ЛУЧШЕ - CUSTOM HOOK:

// src/hooks/useCamCalculation.js
export function useCamCalculation() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const calculate = async (params) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await camAPI.calculate(params)
      setResult(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  return { result, loading, error, calculate }
}

// Использование в компоненте
function CamForm() {
  const { result, loading, error, calculate } = useCamCalculation()
  
  const handleSubmit = async () => {
    await calculate(formData)
  }
  
  return (
    <>
      {loading && <Spinner />}
      {error && <ErrorMessage text={error} />}
      {result && <ProfileChart data={result.profile} />}
    </>
  )
}

ПРЕИМУЩЕСТВА:
✅ Вся логика API в одном месте
✅ State management встроен
✅ Легко переиспользовать
✅ Тестируемый код
✅ React patterns
```

---

## 🌐 CORS настройка

### Что такое CORS

**CORS (Cross-Origin Resource Sharing)** - механизм безопасности браузера, который блокирует запросы между разными доменами.

### Проблема

```
Frontend: http://localhost:5173
Backend:  http://localhost:8000

Браузер блокирует:
❌ Frontend не может обратиться к Backend
❌ Ошибка: "CORS policy: No 'Access-Control-Allow-Origin'"
```

### Решение в FastAPI

```
Backend нужно разрешить Frontend:

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE
    allow_headers=["*"],  # Content-Type, Authorization
)

Теперь браузер разрешает запросы!
```

### Development vs Production

```
Development:
allow_origins=["http://localhost:5173", "http://localhost:3000"]

Production:
allow_origins=["https://enginecampro.com"]

НИКОГДА:
allow_origins=["*"]  # ❌ Небезопасно в продакшене!
```

---

## 🤖 Работа с Claude Code

### Сценарий: Создание полной интеграции

#### ✅ Эффективный диалог

```
Ты: Создай полную интеграцию Frontend (React) и Backend (FastAPI) 
для EngineCamPro калькулятора.

Требования к Backend:

Проект:
- FastAPI приложение
- Структура: app/main.py, app/routers/cams.py, app/models.py, 
  app/core/calculations.py

CORS:
- Allow origins: http://localhost:5173
- Allow methods: все
- Allow headers: все

Endpoints:
POST /api/cams/calculate
Request body (Pydantic):
  - base_radius: float (>0, <500)
  - lift: float (>0, <base_radius)
  - duration: float (>0, <=360)

Response:
  - profile: List[{angle: float, radius: float}]
  - max_velocity: float
  - max_acceleration: float

Математика (в calculations.py):
- Генерация профиля: синусоида для подъёма
- Расчёт скорости: производная
- Расчёт ускорения: вторая производная
- 360 точек данных (по 1° каждая)

Error handling:
- 422 для валидации
- 500 для ошибок расчёта
- Информативные сообщения

─────────────────────────────────────

Требования к Frontend:

Проект:
- Vite + React + JavaScript
- Tailwind CSS + shadcn/ui
- Chart.js для графиков

Структура:
src/
├── components/
│   ├── CamForm.jsx
│   ├── ProfileChart.jsx
│   ├── StatsCard.jsx
│   └── ErrorMessage.jsx
├── services/
│   └── api.js
├── hooks/
│   └── useCamCalculation.js
└── App.jsx

API Service (api.js):
- Base URL: http://localhost:8000
- Function calculateCam(params)
- Error handling с информативными сообщениями
- Environment variable для API_URL

Custom Hook (useCamCalculation.js):
- State: result, loading, error
- Function: calculate(params)
- Automatic error handling
- Return all states

Components:

1. <CamForm />
   - Controlled inputs для base_radius, lift, duration
   - Валидация полей
   - shadcn/ui Input и Button
   - Показывать loading во время расчёта
   - Disable кнопки при loading
   - Показывать error если есть

2. <ProfileChart />
   - Chart.js Line chart
   - Props: data (profile array)
   - X-axis: angle, Y-axis: radius
   - Smooth curve
   - Responsive

3. <StatsCard />
   - Отображение max_velocity и max_acceleration
   - Tailwind стили с gradient
   - Icons (lucide-react)

App.jsx:
- Layout с Tailwind
- Условный рендеринг:
  * Форма всегда видна
  * Loading spinner во время расчёта
  * Error message если ошибка
  * График и статистика если есть результат

Environment variables:
- .env файл с VITE_API_URL=http://localhost:8000
- Использовать import.meta.env.VITE_API_URL

─────────────────────────────────────

Интеграция:

1. Backend запускается на :8000
2. Frontend запускается на :5173
3. CORS настроен правильно
4. Environment variables настроены
5. Полный цикл работает:
   User input → Fetch → Backend calc → Response → Display

Тестирование:
- Backend: curl или Postman
- Frontend: ввести параметры и проверить результат
- Проверить CORS (открыть Network tab в DevTools)

Claude Code: [анализирует задачу]

Создам полную интеграцию:

Backend:
- FastAPI с правильной структурой
- CORS middleware
- Pydantic модели с валидацией
- Endpoints с error handling
- Математические расчёты (NumPy)

Frontend:
- React с Vite
- API service layer
- Custom hook для state management
- Компоненты с Tailwind + shadcn/ui
- Chart.js интеграция

Создать оба проекта? [Y/n]

Ты: Y

Claude Code: [создаёт backend и frontend]

Создана структура:

enginecampro-v2/
├── backend/
│   ├── app/
│   │   ├── main.py (✅ CORS настроен)
│   │   ├── routers/cams.py (✅ Endpoints)
│   │   ├── models.py (✅ Pydantic)
│   │   └── core/calculations.py (✅ Математика)
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/ (✅ Все компоненты)
    │   ├── services/api.js (✅ API layer)
    │   ├── hooks/useCamCalculation.js (✅ Hook)
    │   └── App.jsx
    ├── .env (✅ API_URL настроен)
    └── package.json

Запустить оба сервера? [Y/n]

Ты: Y

Claude Code: [запускает backend и frontend]

Backend: http://localhost:8000
Docs: http://localhost:8000/docs
Frontend: http://localhost:5173

Всё работает! Протестируй:
1. Открой http://localhost:5173
2. Введи параметры
3. Нажми Calculate
4. Увидишь график профиля

Хочешь что-то добавить?

Ты: Добавь возможность сохранять результаты в localStorage

Claude Code: [добавляет localStorage функционал]
Добавил:
- useEffect для сохранения в localStorage
- Компонент <History /> для отображения истории
- Кнопка "Load from history"
```

**Почему это эффективно:**
- ✅ Полная картина обоих проектов
- ✅ CORS упомянут явно
- ✅ Структура обоих проектов детальна
- ✅ API layer правильно организован
- ✅ Custom hook для state management
- ✅ Environment variables настроены
- ✅ Тестирование включено

---

## 🛠️ Практическое задание

### Задача

Создай полную интеграцию Frontend-Backend для калькулятора кулачков.

### Работа с Claude Code

**Шаг 1:** Создай проект
```bash
cd ~/projects
mkdir enginecampro-integration
cd enginecampro-integration
claude
```

**Шаг 2:** Используй диалог выше
Скопируй диалог из секции "Работа с Claude Code" и адаптируй под свои нужды.

**Шаг 3:** Тестирование интеграции

```bash
# Terminal 1 - Backend
cd backend
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Проверь:
- [ ] Backend доступен на localhost:8000
- [ ] Swagger docs работает на /docs
- [ ] Frontend доступен на localhost:5173
- [ ] Форма отображается
- [ ] При вводе параметров и клике Calculate:
  - [ ] Показывается loading spinner
  - [ ] Запрос отправляется на backend (Network tab)
  - [ ] Backend возвращает данные
  - [ ] График отображается
  - [ ] Статистика показывается
- [ ] При ошибке валидации:
  - [ ] Показывается error message
  - [ ] UI не ломается
- [ ] Если backend выключен:
  - [ ] Показывается network error
  - [ ] Предлагается повторить

### Ожидаемый результат

- ✅ Полная интеграция работает
- ✅ Понимаешь полный цикл запрос-ответ
- ✅ API организован правильно
- ✅ State management работает
- ✅ Готов к следующим модулям

---

## ❓ Вопросы для самопроверки

1. **Объясни полный цикл взаимодействия**
   - От клика до отображения результата
   - Что происходит на каждом этапе?

2. **Зачем API service layer?**
   - Почему не Fetch прямо в компоненте?
   - Какие преимущества?

3. **Что такое CORS и зачем он нужен?**
   - Какую проблему решает?
   - Как настроить в FastAPI?

4. **Custom Hook vs прямой Fetch:**
   - Какие преимущества hook?
   - Когда использовать каждый подход?

5. **Для EngineCamPro v2:**
   - Как организована интеграция?
   - Где живёт логика API вызовов?
   - Как управляется State?

6. **Environment variables:**
   - Зачем они нужны?
   - Как использовать в React?
   - Development vs Production?

---

## 🔗 Связь с другими уроками

**Основано на уроках:**
- Модуль 2: Backend - FastAPI endpoints
- Урок 4.2: Fetch API - HTTP запросы
- Урок 4.4: State - управление данными
- Урок 4.5: Визуализация - отображение результатов

**Подготавливает к урокам:**
- Урок 5.2: Error handling и Loading states - улучшаем UX
- Урок 5.3: State Management - сложное управление состоянием
- Модуль 6: Монетизация - добавим аутентификацию

**Связь с EngineCamPro:**
Это КЛЮЧЕВОЙ урок! Здесь всё соединяется:
- React frontend общается с FastAPI backend
- Пользователь может делать реальные расчёты
- Результаты визуализируются
- Приложение становится функциональным!

---

## ✅ Критерии завершения урока

**Понимание концепций:**
- [ ] Понимаю полный цикл Frontend-Backend
- [ ] Знаю как организовать API вызовы
- [ ] Понимаю зачем нужен CORS
- [ ] Знаю паттерны интеграции (service, hook)

**Практические навыки:**
- [ ] Могу создать API service layer
- [ ] Могу написать custom hook для API
- [ ] Понимаю как настроить CORS
- [ ] Знаю как использовать environment variables

**Готовность к следующему уроку:**
- [ ] Создана полная интеграция
- [ ] Frontend и Backend общаются
- [ ] Полный цикл работает
- [ ] Понимаю как улучшить error handling

---

**Статус урока:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён  
**Дата начала:** _________  
**Дата завершения:** _________

---

## 📚 Дополнительные материалы (опционально)

Если хочешь узнать больше:
- [CORS explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) - детальное объяснение
- [React Hooks patterns](https://react.dev/learn/reusing-logic-with-custom-hooks) - custom hooks
- [API integration best practices](https://www.patterns.dev/) - паттерны

**НО!** Главное - понять концепции из этого урока. Claude Code создаст интеграцию за тебя!