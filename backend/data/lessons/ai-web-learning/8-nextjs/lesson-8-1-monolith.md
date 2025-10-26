# Урок 8.1: Монолит vs Разделённая архитектура

> **Модуль 8:** Next.js Full-Stack (опциональный)  
> **Урок:** 8.1  
> **Длительность:** 40-50 минут  
> **Prerequisite:** Урок 8.0 (Node.js, TypeScript, npm)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать разницу между монолитной и разделённой архитектурой
- ✅ Знать плюсы и минусы каждого подхода
- ✅ Понимать как устроен Next.js Full-Stack (монолит)
- ✅ Понимать как устроен FastAPI + React (разделённая архитектура)
- ✅ Осознанно выбирать архитектуру для своего проекта

---

## 📖 Основные концепции

### Главный вопрос урока

**"В чём разница между монолитом и разделённой архитектурой?"**

### Простые определения

**Монолитная архитектура (Monolithic):**
- Frontend и Backend в **одном проекте**
- Один процесс, один порт
- Всё вместе (как единый блок - "монолит")

**Разделённая архитектура (Separated):**
- Frontend и Backend в **разных проектах**
- Два процесса, два порта
- Независимые части, общаются через API

---

## 🏗️ Визуальное сравнение

### Монолитная архитектура (Next.js)

```
┌──────────────────────────────────────────────────────────┐
│                  МОНОЛИТ (Next.js)                       │
│                  Один проект, один процесс                │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │         Next.js Server (Port 3000)                 │ │
│  │                                                    │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │         Frontend + Backend вместе           │ │ │
│  │  │                                              │ │ │
│  │  │  ┌─────────────┐      ┌─────────────┐      │ │ │
│  │  │  │  Frontend   │      │   Backend   │      │ │ │
│  │  │  │  (React)    │◄────►│ (Node.js)   │      │ │ │
│  │  │  │ Components  │      │   Actions   │      │ │ │
│  │  │  └─────────────┘      └─────────────┘      │ │ │
│  │  │                                              │ │ │
│  │  │  Общая кодовая база (codebase)              │ │ │
│  │  │  Нет HTTP между Frontend и Backend          │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  │                                                    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  Один package.json                                       │
│  Один node_modules/                                      │
│  Один deployment                                         │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Разделённая архитектура (FastAPI + React)

```
┌──────────────────────────────────────────────────────────┐
│          РАЗДЕЛЁННАЯ АРХИТЕКТУРА                         │
│          Два проекта, два процесса                       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────┐    ┌──────────────────────┐  │
│  │  Frontend Process    │    │  Backend Process     │  │
│  │  Port 3000           │    │  Port 8000           │  │
│  │                      │    │                      │  │
│  │  ┌────────────────┐ │    │ ┌────────────────┐  │  │
│  │  │   React App    │ │    │ │  FastAPI App   │  │  │
│  │  │                │ │    │ │                │  │  │
│  │  │  Components    │ │HTTP│ │  Endpoints     │  │  │
│  │  │  State         │◄├────┤►│  Business Logic│  │  │
│  │  │  Fetch API     │ │JSON│ │  Database      │  │  │
│  │  │                │ │    │ │                │  │  │
│  │  └────────────────┘ │    │ └────────────────┘  │  │
│  │                      │    │                      │  │
│  │  Отдельная кодовая   │    │  Отдельная кодовая  │  │
│  │  база (JavaScript)   │    │  база (Python)      │  │
│  └──────────────────────┘    └──────────────────────┘  │
│                                                          │
│  package.json                 requirements.txt           │
│  node_modules/                venv/                      │
│  Deploy на Vercel             Deploy на Railway          │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🔍 Детальное сравнение

### 1. Структура проекта

#### Монолит (Next.js)

```
my-nextjs-app/              ← ОДИН проект
├── app/
│   ├── page.tsx           ← Frontend (главная страница)
│   ├── about/
│   │   └── page.tsx       ← Frontend (/about)
│   └── api/
│       └── users/
│           └── route.ts   ← Backend API endpoint
│
├── actions/
│   ├── users.ts           ← Backend logic (Server Actions)
│   └── db.ts              ← Database queries
│
├── components/
│   └── UserList.tsx       ← Frontend components
│
├── lib/
│   └── db.ts              ← Database connection
│
├── package.json           ← Одна зависимость
├── tsconfig.json          ← TypeScript конфиг
└── next.config.js         ← Next.js конфиг
```

**Ключевые особенности:**
- ✅ Всё в одной папке
- ✅ Frontend и Backend используют общие типы
- ✅ Можно импортировать код между Frontend и Backend
- ⚠️ Сложно разделить на команды

#### Разделённая архитектура (FastAPI + React)

```
engine-cam-pro/            ← ОДИН репозиторий

├── backend/               ← Backend проект (Python)
│   ├── main.py           ← FastAPI app
│   ├── models.py         ← Database models
│   ├── routers/
│   │   ├── cams.py       ← API endpoints
│   │   └── users.py
│   ├── database.py       ← DB connection
│   ├── requirements.txt  ← Python зависимости
│   └── .env              ← Backend env vars
│
└── frontend/              ← Frontend проект (JavaScript)
    ├── src/
    │   ├── App.jsx       ← React app
    │   ├── components/
    │   │   └── CamList.jsx
    │   ├── api/
    │   │   └── client.js ← API calls to backend
    │   └── types/
    │       └── Cam.ts    ← TypeScript types
    ├── package.json      ← JavaScript зависимости
    └── .env              ← Frontend env vars
```

**Ключевые особенности:**
- ✅ Два независимых проекта
- ✅ Можно разделить команду (Frontend dev + Backend dev)
- ✅ Разные языки (Python + JavaScript)
- ⚠️ Нужно синхронизировать типы вручную

---

### 2. Как общаются Frontend и Backend

#### Монолит (Next.js) — внутренние вызовы

**Server Action (Backend):**
```typescript
// actions/users.ts
"use server"  // ← Магическая директива Next.js

export async function createUser(name: string) {
  const user = await db.users.create({ name })
  return { success: true, user }
}
```

**Frontend компонент:**
```typescript
// app/users/page.tsx
import { createUser } from '@/actions/users'

export default function UsersPage() {
  async function handleCreate() {
    // Просто вызываем функцию!
    const result = await createUser("Alice")
    console.log(result)  // { success: true, user: {...} }
  }
  
  return <button onClick={handleCreate}>Create User</button>
}
```

**Как это работает под капотом:**
```
1. Пользователь нажимает кнопку
2. Next.js автоматически делает HTTP POST запрос
3. Next.js сервер выполняет createUser()
4. Next.js возвращает результат
5. Frontend получает данные

НО! Разработчик видит просто вызов функции!
```

**Плюсы:**
- ✅ Выглядит как обычный вызов функции
- ✅ Next.js управляет HTTP под капотом
- ✅ TypeScript типы общие (не нужно дублировать)

**Минусы:**
- ❌ Привязка к Next.js (нельзя вызвать из другого приложения)
- ❌ Непонятно что происходит (магия)
- ❌ Нет Swagger документации

---

#### Разделённая архитектура — REST API

**Backend (Python FastAPI):**
```python
# backend/routers/users.py
from fastapi import APIRouter

router = APIRouter()

@router.post("/api/users")
async def create_user(name: str):
    user = await db.users.create(name=name)
    return {"success": True, "user": user}
```

**Frontend (React):**
```javascript
// frontend/src/api/users.js
export async function createUser(name) {
  const response = await fetch('http://localhost:8000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  })
  return response.json()
}

// frontend/src/components/UsersPage.jsx
import { createUser } from '../api/users'

function UsersPage() {
  async function handleCreate() {
    const result = await createUser("Alice")
    console.log(result)  // { success: true, user: {...} }
  }
  
  return <button onClick={handleCreate}>Create User</button>
}
```

**Как это работает:**
```
1. Пользователь нажимает кнопку
2. Frontend делает HTTP POST на localhost:8000
3. Backend (FastAPI) обрабатывает запрос
4. Backend возвращает JSON
5. Frontend парсит JSON и отображает

Разработчик ВИДИТ весь процесс явно!
```

**Плюсы:**
- ✅ Явный HTTP запрос (понятно что происходит)
- ✅ REST API стандарт (можно вызвать откуда угодно)
- ✅ Swagger документация автоматически
- ✅ Можно использовать из MATLAB, Python scripts, мобильных приложений

**Минусы:**
- ❌ Больше кода (fetch, headers, JSON.stringify)
- ❌ Нужна настройка CORS
- ❌ Типы нужно дублировать (Python Pydantic + TypeScript)

---

### 3. Deployment (развёртывание)

#### Монолит (Next.js)

```
┌─────────────────────────────────────────┐
│         ОДИН DEPLOYMENT                 │
├─────────────────────────────────────────┤
│                                         │
│  Git push → Vercel                      │
│     ↓                                   │
│  Vercel собирает Next.js                │
│     ↓                                   │
│  Vercel деплоит всё на один URL         │
│     ↓                                   │
│  https://my-app.vercel.app              │
│     ├── / (Frontend)                    │
│     ├── /about (Frontend)               │
│     └── /api/users (Backend)            │
│                                         │
└─────────────────────────────────────────┘
```

**Плюсы:**
- ✅ Один git push — всё задеплоено
- ✅ Vercel оптимизирован для Next.js
- ✅ CDN, SSL, домены бесплатно

**Минусы:**
- ⚠️ Если Backend упал — весь сайт недоступен
- ⚠️ Нельзя масштабировать Frontend и Backend отдельно

#### Разделённая архитектура (FastAPI + React)

```
┌─────────────────────────────────────────────────────────┐
│              ДВА НЕЗАВИСИМЫХ DEPLOYMENT                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Git push frontend/ → Vercel                            │
│     ↓                                                   │
│  Vercel деплоит React                                   │
│     ↓                                                   │
│  https://engine-cam-pro.vercel.app                      │
│                                                         │
│  ┌────────────────────────────────────┐                │
│  │                                    │                │
│  │  Git push backend/ → Railway       │                │
│  │     ↓                               │                │
│  │  Railway деплоит FastAPI            │                │
│  │     ↓                               │                │
│  │  https://api.engine-cam-pro.railway │                │
│  │                                    │                │
│  └────────────────────────────────────┘                │
│                                                         │
│  Frontend вызывает Backend API через HTTPS              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Плюсы:**
- ✅ Если Backend упал — Frontend всё равно работает (показывает ошибку красиво)
- ✅ Можно масштабировать отдельно (10 серверов для Backend, 1 для Frontend)
- ✅ Разные команды деплоят независимо

**Минусы:**
- ⚠️ Два deployment процесса
- ⚠️ Нужно настроить CORS
- ⚠️ Два домена (или subdomain)

---

## 📊 Сравнительная таблица

| **Аспект** | **Монолит (Next.js)** | **Разделённая (FastAPI + React)** |
|---|---|---|
| **Проектов** | 1 | 2 |
| **Процессов** | 1 | 2 |
| **Языков** | 1 (JavaScript) | 2 (Python + JavaScript) |
| **Портов в dev** | 1 (3000) | 2 (3000 + 8000) |
| **CORS** | Не нужен | Обязателен |
| **API стиль** | Server Actions | REST API |
| **Swagger** | Нет | Есть (автоматически) |
| **Deployment** | Один (Vercel) | Два (Vercel + Railway) |
| **Масштабирование** | Вместе | Независимо |
| **TypeScript типы** | Общие | Дублировать |
| **Скорость разработки** | Быстрее (меньше setup) | Медленнее (больше конфигов) |
| **Подходит для** | SEO сайты, CRUD | API сервисы, математика |
| **Команда** | Full-Stack разработчики | Разделить Frontend/Backend |

---

## 🎯 Когда выбирать каждую архитектуру

### Выбирай Монолит (Next.js) когда:

✅ **1. Новый проект без существующего кода**
```
Начинаешь с нуля → Next.js быстрее настроить
```

✅ **2. Нужен SEO (поисковая оптимизация)**
```
Блог, магазин, портфолио → Next.js SSR из коробки
```

✅ **3. CRUD приложение (Create, Read, Update, Delete)**
```
Простая логика, нет сложных расчётов → Next.js достаточно
```

✅ **4. Маленькая команда (1-3 человека)**
```
Все знают JavaScript → один стек проще
```

✅ **5. Быстрое прототипирование (MVP)**
```
Нужно за неделю → Next.js быстрее
```

✅ **6. Нет сложной математики**
```
Нет NumPy/SciPy задач → JavaScript справится
```

**Примеры проектов:**
- 📝 Блог
- 🛒 Интернет-магазин (e-commerce)
- 📱 Dashboard с простыми графиками
- 🎨 Портфолио дизайнера
- 📋 Todo приложение

---

### Выбирай Разделённую архитектуру (FastAPI + React) когда:

✅ **1. Есть существующий Python код**
```
Streamlit app, Jupyter notebooks → переиспользовать Python
```

✅ **2. Нужны математические расчёты**
```
NumPy, SciPy, Pandas → Python лучший выбор
```

✅ **3. ML/AI приложение**
```
TensorFlow, PyTorch → только Python
```

✅ **4. REST API нужен другим сервисам**
```
MATLAB, мобильное приложение, другие микросервисы → REST API стандарт
```

✅ **5. Большая команда (4+ человек)**
```
Frontend команда отдельно от Backend → удобнее разделить
```

✅ **6. Независимое масштабирование**
```
Backend нужно 10 серверов, Frontend 1 → масштабировать отдельно
```

✅ **7. Разные деплоймент стратегии**
```
Frontend на CDN, Backend на Railway → гибкость
```

**Примеры проектов:**
- 🔬 Научные расчёты (как EngineCamPro)
- 🤖 ML/AI приложения
- 📊 Data Science dashboards
- ⚙️ Инженерные калькуляторы
- 🏢 Enterprise системы с микросервисами

---

## 💡 Практический пример: EngineCamPro

### Почему выбрали Разделённую архитектуру?

**Контекст:**
- Существующий Streamlit код (Python)
- Расчёты кулачковых профилей (NumPy, SciPy)
- Графики (Matplotlib)
- Возможность вызова API из MATLAB

**Анализ:**

#### Если бы выбрали Next.js (Монолит):

❌ **Проблемы:**
```typescript
// Нужно переписать всю математику на JavaScript
function calculateCamProfile(lift: number, duration: number) {
  // ??? Как сделать то, что делает NumPy?
  // JavaScript нет эквивалента scipy.optimize.minimize
  // JavaScript массивы медленнее NumPy arrays
}
```

- ❌ Потеря существующего Python кода
- ❌ Нет NumPy/SciPy для JavaScript
- ❌ JavaScript медленнее для численных расчётов
- ❌ Сложно интегрировать с MATLAB

#### Выбрали FastAPI + React (Разделённая):

✅ **Преимущества:**
```python
# Используем существующий Python код
import numpy as np
from scipy.optimize import minimize

@app.post("/api/calculate-cam")
async def calculate_cam(profile: CamProfile):
    # Весь Streamlit код просто переиспользуем!
    x = np.linspace(0, profile.duration, 1000)
    result = minimize(objective_function, x0=[profile.lift])
    return {"profile": result.x.tolist()}
```

- ✅ Переиспользование Python кода
- ✅ NumPy/SciPy работают как надо
- ✅ REST API можно вызвать из MATLAB
- ✅ Лучшая производительность для расчётов

---

## 🔄 Гибридный подход: Next.js Frontend + FastAPI Backend

### Можно ли совместить лучшее из двух миров?

**Да! Это популярный паттерн:**

```
┌─────────────────────────────────────────────────────────┐
│           ГИБРИДНАЯ АРХИТЕКТУРА                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────┐    ┌──────────────────────┐ │
│  │  Next.js Frontend    │    │  FastAPI Backend     │ │
│  │  (только UI)         │    │  (Python логика)     │ │
│  │                      │    │                      │ │
│  │  • SSR для SEO       │    │  • NumPy расчёты     │ │
│  │  • File-Based routing│    │  • REST API          │ │
│  │  • React components  │HTTP│  • Swagger docs      │ │
│  │  • НЕ используем     │◄──►│  • PostgreSQL        │ │
│  │    Server Actions    │    │  • Background tasks  │ │
│  │                      │    │                      │ │
│  │  Vercel              │    │  Railway             │ │
│  └──────────────────────┘    └──────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Когда использовать:**
- ✅ Нужен SSR для SEO (Next.js)
- ✅ Нужны Python расчёты (FastAPI)
- ✅ Большая команда (Frontend + Backend отдельно)

**Минус:**
- ⚠️ Сложнее настроить чем чистый Next.js
- ⚠️ Не используешь Server Actions (зачем тогда Next.js?)

**Вывод:** Для EngineCamPro это излишне. React достаточно для UI.

---

## 📊 Диаграмма принятия решения

```
Новый проект?
    │
    ├─→ ДА → Есть математика/ML?
    │         │
    │         ├─→ ДА → FastAPI + React ✅
    │         │
    │         └─→ НЕТ → Нужен SEO?
    │                   │
    │                   ├─→ ДА → Next.js Full-Stack ✅
    │                   │
    │                   └─→ НЕТ → Быстрый прототип?
    │                             │
    │                             ├─→ ДА → Next.js ✅
    │                             └─→ НЕТ → FastAPI + React ✅
    │
    └─→ НЕТ (есть код) → На чём написан?
                         │
                         ├─→ Python → FastAPI + React ✅
                         │
                         └─→ JavaScript → Next.js ✅
```

---

## 🎓 Резюме урока

### Ключевые различия

**Монолит (Next.js):**
```
✅ Один проект
✅ Один язык (JavaScript)
✅ Быстрая разработка
✅ SSR из коробки
❌ Нет Python математики
❌ Server Actions вместо REST API
```

**Разделённая архитектура (FastAPI + React):**
```
✅ Два проекта
✅ Python для Backend
✅ REST API стандарт
✅ Независимое масштабирование
✅ NumPy/SciPy доступны
❌ Больше настроек (CORS, два deployment)
```

### Для EngineCamPro

**Выбрана разделённая архитектура (FastAPI + React)** ✅

**Причины:**
1. Математика (NumPy, SciPy, Matplotlib)
2. Существующий Python код
3. REST API для интеграции с MATLAB
4. Лучшая производительность для расчётов

---

## 📝 Проверка понимания

Ответь на вопросы:

1. **В чём главное различие монолита и разделённой архитектуры?**
   - Ответ: Монолит = один проект/процесс, Разделённая = два проекта/процесса

2. **Когда выбирать Next.js Full-Stack?**
   - Ответ: Новый проект, нужен SEO, нет математики, быстрый прототип

3. **Когда выбирать FastAPI + React?**
   - Ответ: Есть Python код, нужна математика/ML, REST API для других сервисов

4. **Почему для EngineCamPro выбрана разделённая архитектура?**
   - Ответ: Математика (NumPy/SciPy), существующий Python код, REST API для MATLAB

5. **Можно ли использовать Next.js Frontend + FastAPI Backend?**
   - Ответ: Да, но для EngineCamPro излишне сложно. React достаточно для UI.

---

## 🚀 Следующий шаг

В **Уроке 8.2** мы детально сравним:
- **Server Actions** (Next.js подход)
- **REST API** (FastAPI подход)
- Как они работают под капотом

**Готов продолжить?** 🎯

---

**Конец урока 8.1** ✅
