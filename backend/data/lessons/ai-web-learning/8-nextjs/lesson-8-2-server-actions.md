# Урок 8.2: Server Actions vs REST API

> **Модуль 8:** Next.js Full-Stack (опциональный)  
> **Урок:** 8.2  
> **Длительность:** 45-55 минут  
> **Prerequisite:** Уроки 8.0, 8.1

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать что такое Server Actions в Next.js
- ✅ Знать как работает REST API в FastAPI (повторение из Модуля 1)
- ✅ Видеть различия между двумя подходами
- ✅ Понимать плюсы и минусы каждого метода
- ✅ Осознанно выбирать подход для своего проекта

---

## 📖 Основные концепции

### Главный вопрос урока

**"Как Frontend общается с Backend?"**

### Два подхода

**1. Server Actions (Next.js):**
- Frontend вызывает функцию напрямую
- Next.js автоматически превращает это в HTTP запрос
- Выглядит как обычный JavaScript код

**2. REST API (FastAPI):**
- Frontend делает HTTP запрос явно
- Backend обрабатывает через endpoint
- Стандартный протокол HTTP

---

## 🔄 Часть 1: REST API (FastAPI) — что ты уже знаешь

### Вспомним из Модуля 1

В **Модуле 1.4** ты изучал REST API концепции:
- HTTP методы: GET, POST, PUT, DELETE
- Endpoints: `/api/users`, `/api/users/{id}`
- JSON формат для обмена данными
- Request/Response цикл

### Архитектура REST API

```
┌─────────────────────────────────────────────────────────┐
│              REST API АРХИТЕКТУРА                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Frontend (React)                Backend (FastAPI)     │
│  Port 3000                       Port 8000             │
│                                                         │
│  ┌──────────────┐               ┌──────────────┐      │
│  │              │   HTTP/JSON   │              │      │
│  │  Component   │──────────────►│  Endpoint    │      │
│  │              │               │              │      │
│  │  fetch()     │               │  @app.post() │      │
│  │              │◄──────────────│              │      │
│  │              │   Response    │  return JSON │      │
│  └──────────────┘               └──────────────┘      │
│                                                         │
│  Явный HTTP запрос              Явный HTTP response    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Пример REST API

**Backend (FastAPI):**
```python
# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.post("/api/users")
async def create_user(user: User):
    # Сохраняем в БД
    new_user = {"id": 1, "name": user.name, "email": user.email}
    return {"success": True, "data": new_user}
```

**Frontend (React):**
```javascript
// frontend/src/api/users.js
export async function createUser(name, email) {
  const response = await fetch('http://localhost:8000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email })
  })
  
  if (!response.ok) {
    throw new Error('Failed to create user')
  }
  
  return response.json()
}

// frontend/src/components/UserForm.jsx
import { createUser } from '../api/users'

function UserForm() {
  async function handleSubmit(e) {
    e.preventDefault()
    const result = await createUser("Alice", "alice@example.com")
    console.log(result)  // { success: true, data: {...} }
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

### Что происходит под капотом

```
1. Пользователь нажимает кнопку
   ↓
2. React вызывает createUser()
   ↓
3. fetch() делает HTTP POST запрос
   POST http://localhost:8000/api/users
   Headers: { Content-Type: application/json }
   Body: { "name": "Alice", "email": "alice@example.com" }
   ↓
4. FastAPI получает запрос
   ↓
5. FastAPI валидирует данные (Pydantic)
   ↓
6. FastAPI выполняет create_user()
   ↓
7. FastAPI возвращает JSON
   Status: 200 OK
   Body: { "success": true, "data": {...} }
   ↓
8. React получает response.json()
   ↓
9. UI обновляется
```

**Ключевое:** Разработчик **видит и контролирует** каждый шаг!

---

## 🆕 Часть 2: Server Actions (Next.js) — новый подход

### Что такое Server Actions?

**Простое определение:**
Server Actions = функции на сервере, которые вызываются как обычные JavaScript функции с клиента.

**Ключевая идея:**
- Пишешь функцию на сервере
- Вызываешь её с клиента **как обычную функцию**
- Next.js **автоматически** превращает это в HTTP запрос

### Магическая директива `"use server"`

```typescript
// actions/users.ts
"use server"  // ← Эта строчка говорит Next.js:
              //   "Эта функция выполняется ТОЛЬКО на сервере"

export async function createUser(name: string, email: string) {
  // Этот код НИКОГДА не попадёт в браузер!
  const user = await db.users.create({ name, email })
  return { success: true, data: user }
}
```

**Что делает `"use server"`:**
- ✅ Функция выполняется только на сервере (Node.js)
- ✅ Функцию можно импортировать в клиентских компонентах
- ✅ Next.js автоматически создаёт HTTP endpoint
- ✅ Next.js автоматически сериализует данные

### Архитектура Server Actions

```
┌─────────────────────────────────────────────────────────┐
│           SERVER ACTIONS АРХИТЕКТУРА                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────────────────────────────────────────────┐   │
│  │           Next.js Server (Port 3000)           │   │
│  │                                                │   │
│  │  Client Component        Server Action        │   │
│  │  ┌──────────────┐       ┌──────────────┐     │   │
│  │  │              │       │              │     │   │
│  │  │  onClick     │──────►│ "use server" │     │   │
│  │  │              │ RPC   │              │     │   │
│  │  │  Вызов       │       │  async fn    │     │   │
│  │  │  функции     │◄──────│              │     │   │
│  │  │              │Result │  return data │     │   │
│  │  └──────────────┘       └──────────────┘     │   │
│  │                                                │   │
│  │  Выглядит как локальный вызов функции         │   │
│  │  но выполняется на сервере!                   │   │
│  └────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Пример Server Actions

**Server Action:**
```typescript
// actions/users.ts
"use server"

import { db } from '@/lib/db'

export async function createUser(name: string, email: string) {
  // Выполняется на сервере (Node.js)
  const user = await db.users.create({
    data: { name, email }
  })
  
  return { success: true, data: user }
}
```

**Client Component:**
```typescript
// app/users/page.tsx
'use client'  // ← Клиентский компонент (выполняется в браузере)

import { createUser } from '@/actions/users'
import { useState } from 'react'

export default function UserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Просто вызываем функцию!
    const result = await createUser(name, email)
    
    console.log(result)  // { success: true, data: {...} }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Create User</button>
    </form>
  )
}
```

### Что происходит под капотом

```
1. Пользователь нажимает кнопку
   ↓
2. React вызывает createUser(name, email)
   ↓
3. Next.js АВТОМАТИЧЕСКИ:
   - Сериализует аргументы в JSON
   - Делает HTTP POST запрос
   - Отправляет на внутренний endpoint
   POST http://localhost:3000/_next/data/...
   Body: { args: ["Alice", "alice@example.com"] }
   ↓
4. Next.js Server получает запрос
   ↓
5. Next.js находит соответствующую Server Action
   ↓
6. Next.js выполняет createUser() на сервере
   ↓
7. Next.js сериализует результат в JSON
   ↓
8. Next.js возвращает результат
   Status: 200 OK
   Body: { success: true, data: {...} }
   ↓
9. Client получает результат как Promise resolved
   ↓
10. UI обновляется
```

**Ключевое:** Разработчик **НЕ видит** HTTP! Всё работает "магически".

---

## 🔬 Детальное сравнение

### 1. Написание кода

#### REST API (FastAPI + React)

**Backend endpoint:**
```python
# backend/routers/posts.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class PostCreate(BaseModel):
    title: str
    content: str

@router.post("/api/posts")
async def create_post(post: PostCreate):
    # Валидация автоматическая (Pydantic)
    new_post = await db.posts.create(
        title=post.title,
        content=post.content
    )
    return {"id": new_post.id, "title": new_post.title}
```

**Frontend API client:**
```typescript
// frontend/src/api/posts.ts
export async function createPost(title: string, content: string) {
  const response = await fetch('http://localhost:8000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`  // JWT token
    },
    body: JSON.stringify({ title, content })
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }
  
  return response.json()
}
```

**Frontend component:**
```typescript
// frontend/src/components/PostForm.tsx
import { createPost } from '@/api/posts'

function PostForm() {
  async function handleSubmit(data: FormData) {
    try {
      const result = await createPost(
        data.get('title') as string,
        data.get('content') as string
      )
      toast.success('Post created!')
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

**Итого: 3 файла**
1. Backend endpoint (`routers/posts.py`)
2. Frontend API client (`api/posts.ts`)
3. Frontend component (`components/PostForm.tsx`)

---

#### Server Actions (Next.js)

**Server Action:**
```typescript
// actions/posts.ts
"use server"

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createPost(title: string, content: string) {
  const post = await db.posts.create({
    data: { title, content }
  })
  
  revalidatePath('/posts')  // Обновить кэш
  return { id: post.id, title: post.title }
}
```

**Frontend component:**
```typescript
// app/posts/new/page.tsx
'use client'

import { createPost } from '@/actions/posts'
import { useRouter } from 'next/navigation'

export default function PostForm() {
  const router = useRouter()
  
  async function handleSubmit(formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    
    const result = await createPost(title, content)
    router.push('/posts')
  }
  
  return <form action={handleSubmit}>...</form>
}
```

**Итого: 2 файла**
1. Server Action (`actions/posts.ts`)
2. Frontend component (`app/posts/new/page.tsx`)

**Вывод:** Server Actions = меньше кода (нет API client слоя)

---

### 2. Обработка ошибок

#### REST API (FastAPI + React)

**Backend:**
```python
@router.post("/api/posts")
async def create_post(post: PostCreate):
    if len(post.title) < 3:
        raise HTTPException(
            status_code=400,
            detail="Title too short"
        )
    
    return {"success": True}
```

**Frontend:**
```typescript
async function createPost(title: string) {
  const response = await fetch('http://localhost:8000/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title })
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)  // "Title too short"
  }
  
  return response.json()
}

// В компоненте
try {
  await createPost(title)
} catch (error) {
  alert(error.message)  // Показать ошибку пользователю
}
```

**Плюсы:**
- ✅ Явная обработка HTTP статусов (400, 500, etc.)
- ✅ Можно различать типы ошибок (ValidationError, AuthError)

---

#### Server Actions (Next.js)

**Server Action:**
```typescript
"use server"

export async function createPost(title: string) {
  if (title.length < 3) {
    return { error: "Title too short" }
  }
  
  try {
    const post = await db.posts.create({ data: { title } })
    return { success: true, data: post }
  } catch (error) {
    return { error: "Database error" }
  }
}
```

**Frontend:**
```typescript
async function handleSubmit(formData: FormData) {
  const title = formData.get('title') as string
  const result = await createPost(title)
  
  if (result.error) {
    alert(result.error)  // Показать ошибку
  } else {
    console.log('Success!', result.data)
  }
}
```

**Плюсы:**
- ✅ Проще (нет try/catch для HTTP)
- ✅ TypeScript типы для ошибок

**Минусы:**
- ❌ Нет HTTP статусов (всегда 200 OK)
- ❌ Нужно вручную возвращать { error: ... }

---

### 3. Типизация (TypeScript)

#### REST API (FastAPI + React)

**Backend (Python Pydantic):**
```python
# backend/models.py
from pydantic import BaseModel

class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
```

**Frontend (TypeScript):**
```typescript
// frontend/src/types/Post.ts
export interface PostCreate {
  title: string
  content: string
}

export interface PostResponse {
  id: number
  title: string
  content: string
}
```

**Проблема:** Типы ДУБЛИРУЮТСЯ! Нужно синхронизировать вручную.

**Решение (продвинутое):**
- Использовать OpenAPI генератор
- Автоматически генерировать TypeScript типы из Pydantic

---

#### Server Actions (Next.js)

**Server Action:**
```typescript
// actions/posts.ts
"use server"

interface PostCreate {
  title: string
  content: string
}

interface PostResponse {
  id: number
  title: string
  content: string
}

export async function createPost(
  data: PostCreate
): Promise<PostResponse> {
  const post = await db.posts.create({ data })
  return { id: post.id, title: post.title, content: post.content }
}
```

**Frontend:**
```typescript
// app/posts/new/page.tsx
import { createPost } from '@/actions/posts'

// TypeScript ЗНАЕТ тип результата!
const result = await createPost({ title: "Hello", content: "World" })
console.log(result.id)  // TypeScript знает что это number
```

**Плюсы:**
- ✅ Один язык = одни типы
- ✅ TypeScript автоматически типизирует всё
- ✅ Автодополнение IDE работает идеально

---

### 4. Документация API

#### REST API (FastAPI)

**Swagger автоматически:**
```python
# backend/main.py
from fastapi import FastAPI

app = FastAPI(
    title="EngineCamPro API",
    description="API for cam profile calculations",
    version="1.0.0"
)

@app.post("/api/posts", tags=["Posts"])
async def create_post(post: PostCreate):
    """
    Create a new post.
    
    - **title**: Post title (min 3 chars)
    - **content**: Post content
    """
    return {"success": True}
```

**Результат:**
- ✅ Swagger UI на `/docs`
- ✅ ReDoc на `/redoc`
- ✅ OpenAPI schema на `/openapi.json`

**Можно тестировать API прямо в браузере!**

---

#### Server Actions (Next.js)

**Нет автодокументации! ❌**

**Почему:**
- Server Actions = внутренние функции
- Не предназначены для внешнего использования
- Нет стандартного API endpoint

**Если нужна документация:**
- Писать вручную (JSDoc комментарии)
- Или создавать отдельные REST endpoints

**Вывод:** Для публичного API — REST API лучше.

---

### 5. Вызов из других сервисов

#### REST API (FastAPI)

**Можно вызвать откуда угодно:**

**Из Python:**
```python
import requests

response = requests.post(
    "https://api.enginecampro.com/api/posts",
    json={"title": "Hello", "content": "World"}
)
print(response.json())
```

**Из MATLAB:**
```matlab
url = 'https://api.enginecampro.com/api/posts';
data = struct('title', 'Hello', 'content', 'World');
options = weboptions('MediaType', 'application/json');
response = webwrite(url, data, options);
```

**Из мобильного приложения (Swift):**
```swift
let url = URL(string: "https://api.enginecampro.com/api/posts")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
// ... send request
```

**Вывод:** REST API = универсальный стандарт ✅

---

#### Server Actions (Next.js)

**НЕ МОЖЕШЬ вызвать извне! ❌**

**Почему:**
- Server Actions используют внутренний протокол Next.js
- Endpoint не документирован
- Формат запроса может измениться

**Если нужно:**
- Создавать отдельные API Routes (`app/api/posts/route.ts`)
- Или использовать REST API

**Вывод:** Server Actions = только для Next.js приложения

---

## 📊 Итоговая таблица сравнения

| **Аспект** | **REST API (FastAPI)** | **Server Actions (Next.js)** |
|---|---|---|
| **Код** | Больше (3 файла) | Меньше (2 файла) |
| **Явность** | Явный HTTP | "Магия" Next.js |
| **Типизация** | Дублируется | Общая (TypeScript) |
| **Документация** | Swagger автоматически | Нет |
| **Внешний доступ** | Да (REST стандарт) | Нет |
| **Обработка ошибок** | HTTP статусы | Объекты { error } |
| **CORS** | Нужна настройка | Не нужен |
| **Тестирование** | Swagger UI, Postman | Только в приложении |
| **Масштабирование** | Независимо | Вместе с Frontend |
| **Для EngineCamPro** | ✅ Идеально | ❌ Не подходит |
| **Для простого CRUD** | ⚠️ Можно | ✅ Идеально |

---

## 🎯 Когда использовать каждый подход

### Используй REST API (FastAPI) когда:

✅ **1. API нужен другим сервисам**
```
MATLAB, Python scripts, мобильное приложение → REST API
```

✅ **2. Публичный API**
```
Сторонние разработчики → нужна документация (Swagger)
```

✅ **3. Микросервисная архитектура**
```
Несколько Backend сервисов → REST стандарт
```

✅ **4. Независимое масштабирование**
```
Backend на 10 серверах, Frontend на 1 → разделить
```

✅ **5. Python Backend**
```
Математика, ML → FastAPI
```

**Пример: EngineCamPro**
- Нужен вызов из MATLAB ✅
- Swagger документация для инженеров ✅
- Python для расчётов ✅

---

### Используй Server Actions (Next.js) когда:

✅ **1. Только внутреннее использование**
```
API только для твоего Next.js приложения → Server Actions
```

✅ **2. Быстрое прототипирование**
```
MVP за неделю → меньше кода
```

✅ **3. CRUD приложение**
```
Простые операции Create/Read/Update/Delete → Server Actions проще
```

✅ **4. Нет внешних интеграций**
```
Не нужен MATLAB, Python, мобильные приложения → Server Actions ОК
```

✅ **5. Команда знает только JavaScript**
```
Нет Python разработчиков → Next.js Full-Stack
```

**Пример: Блог**
- API только для самого блога ✅
- Нет внешних интеграций ✅
- JavaScript Full-Stack ✅

---

## 💡 Практический пример: Одна задача, два подхода

### Задача: Создать функционал "Like" для постов

#### Подход 1: REST API (FastAPI + React)

**Backend:**
```python
# backend/routers/posts.py
@router.post("/api/posts/{post_id}/like")
async def like_post(post_id: int):
    post = await db.posts.find_one(id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post.likes += 1
    await db.posts.update(post)
    return {"likes": post.likes}
```

**Frontend:**
```typescript
// frontend/src/api/posts.ts
export async function likePost(postId: number): Promise<{ likes: number }> {
  const response = await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
    method: 'POST'
  })
  return response.json()
}

// frontend/src/components/LikeButton.tsx
import { likePost } from '@/api/posts'

function LikeButton({ postId }: { postId: number }) {
  const [likes, setLikes] = useState(0)
  
  async function handleLike() {
    const result = await likePost(postId)
    setLikes(result.likes)
  }
  
  return <button onClick={handleLike}>👍 {likes}</button>
}
```

**Swagger документация:**
```
POST /api/posts/{post_id}/like
Parameters:
  - post_id (path, integer, required)
Response:
  { "likes": 42 }
```

---

#### Подход 2: Server Actions (Next.js)

**Server Action:**
```typescript
// actions/posts.ts
"use server"

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function likePost(postId: number) {
  const post = await db.posts.findUnique({ where: { id: postId } })
  
  if (!post) {
    return { error: "Post not found" }
  }
  
  const updated = await db.posts.update({
    where: { id: postId },
    data: { likes: post.likes + 1 }
  })
  
  revalidatePath('/posts')
  return { likes: updated.likes }
}
```

**Frontend:**
```typescript
// app/components/LikeButton.tsx
'use client'

import { likePost } from '@/actions/posts'
import { useState } from 'react'

export default function LikeButton({ postId }: { postId: number }) {
  const [likes, setLikes] = useState(0)
  
  async function handleLike() {
    const result = await likePost(postId)
    if (!result.error) {
      setLikes(result.likes)
    }
  }
  
  return <button onClick={handleLike}>👍 {likes}</button>
}
```

**Нет документации** (Server Action внутренний)

---

### Сравнение

**REST API:**
- ✅ Можно вызвать из мобильного приложения
- ✅ Swagger документация
- ❌ Больше кода (API client слой)

**Server Actions:**
- ✅ Меньше кода
- ✅ TypeScript типы общие
- ❌ Только для Next.js приложения

---

## 🎓 Резюме урока

### Ключевые различия

**REST API (FastAPI):**
```
✅ Явный HTTP запрос
✅ Swagger документация
✅ Универсальный доступ
✅ HTTP статусы для ошибок
✅ Можно тестировать отдельно
❌ Больше кода
❌ Нужна настройка CORS
```

**Server Actions (Next.js):**
```
✅ Меньше кода
✅ Выглядит как функция
✅ TypeScript типы общие
✅ Не нужен CORS
❌ Нет документации
❌ Только для Next.js
❌ "Магия" (непонятно что под капотом)
```

### Для EngineCamPro

**REST API (FastAPI) выбран потому что:**
1. Нужен вызов из MATLAB
2. Swagger документация для инженеров
3. Python Backend для математики
4. Стандартный подход в инженерии

---

## 📝 Проверка понимания

1. **Что такое Server Actions?**
   - Ответ: Функции на сервере (Node.js) которые вызываются как обычные функции с клиента

2. **Чем Server Actions отличаются от REST API?**
   - Ответ: Server Actions выглядят как вызов функции, REST API = явный HTTP запрос

3. **Когда выбирать REST API?**
   - Ответ: Нужен внешний доступ, документация, Python Backend, микросервисы

4. **Когда выбирать Server Actions?**
   - Ответ: Только внутреннее использование, быстрый прототип, JavaScript Full-Stack

5. **Почему для EngineCamPro REST API?**
   - Ответ: Нужен вызов из MATLAB, Swagger для инженеров, Python для математики

---

## 🚀 Следующий шаг

В **Уроке 8.3** мы изучим:
- **SSR vs CSR** (Server-Side vs Client-Side Rendering)
- Что такое Hydration (гидратация)
- Server Components vs Client Components
- Когда нужен SSR, когда CSR достаточно

**Готов продолжить?** 🎯

---

**Конец урока 8.2** ✅
