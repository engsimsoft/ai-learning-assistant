# Урок 6.1: Аутентификация с Clerk - Профессиональный Auth из коробки

> **Модуль 6:** Монетизация  
> **Урок:** 6.1  
> **Длительность:** 60-70 минут  
> **Prerequisite:** Модуль 5 (Интеграция Frontend-Backend)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать зачем нужна аутентификация
- ✅ Знать что такое Clerk и почему он удобен
- ✅ Интегрировать Clerk в React и FastAPI
- ✅ Защитить endpoints и routes
- ✅ Сформулировать задачу для Claude Code с Clerk
- ✅ Добавить auth в EngineCamPro v2

---

## 📖 Концепция: Зачем нужна аутентификация

### Простое определение

**Аутентификация** - проверка что пользователь тот, за кого себя выдаёт (логин).

**Авторизация** - проверка что пользователь имеет право делать действие (доступ).

### Зачем это нужно

Без аутентификации:
- ❌ Любой может видеть чужие данные
- ❌ Невозможно персонализировать опыт
- ❌ Нет монетизации (кто платит?)
- ❌ Небезопасно

С аутентификацией:
- ✅ Каждый видит только свои данные
- ✅ Персонализация для пользователя
- ✅ Можно монетизировать (подписки)
- ✅ Безопасность

### 🎫 Аналогия: Вход в кинотеатр

```
┌─────────────────────────────────────────────────┐
│      БЕЗ АУТЕНТИФИКАЦИИ = КИНОТЕАТР БЕЗ БИЛЕТОВ  │
├─────────────────────────────────────────────────┤
│                                                 │
│  🚪 Вход открыт для всех                         │
│     ❌ Любой заходит без билета                  │
│     ❌ Зал переполнен                            │
│     ❌ Кинотеатр не зарабатывает                 │
│     ❌ Невозможно отследить кто пришёл           │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│      С АУТЕНТИФИКАЦИЕЙ = ПРОВЕРКА БИЛЕТОВ        │
├─────────────────────────────────────────────────┤
│                                                 │
│  🎫 АУТЕНТИФИКАЦИЯ (проверка личности):          │
│     "Покажите билет"                            │
│     → Проверяем что билет настоящий             │
│     → Узнаём кто вы (имя на билете)             │
│                                                 │
│  🔐 АВТОРИЗАЦИЯ (проверка прав):                 │
│     "У вас VIP билет?"                          │
│     → VIP зал для VIP билетов                   │
│     → Обычный зал для обычных билетов           │
│                                                 │
│  Преимущества:                                  │
│  ✅ Контроль кто заходит                        │
│  ✅ Персонализация (VIP сервис)                 │
│  ✅ Монетизация (продажа билетов)               │
│  ✅ Аналитика (знаем посетителей)               │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🔐 Что такое Clerk

### Простое определение

**Clerk** - готовое решение для аутентификации, которое даёт:
- Красивые UI компоненты (Sign In/Sign Up)
- Управление пользователями
- JWT токены
- Интеграция с React и Backend

### Почему Clerk, а не свой auth

```
СВОЙ AUTH (сложно):
- Написать регистрацию и логин
- Хранить пароли безопасно (хеширование)
- Сессии и токены
- Email верификация
- Забыли пароль
- OAuth (Google, GitHub)
- 2FA
- Управление пользователями
→ Месяцы работы + риск ошибок безопасности

CLERK (просто):
- npm install @clerk/clerk-react
- Добавить 10 строк кода
- Всё работает!
→ 30 минут работы + профессиональная безопасность
```

### Альтернативы Clerk

| Решение | Сложность | Цена | Для EngineCamPro |
|---------|-----------|------|------------------|
| **Clerk** | ⭐ | Free tier → $25/mo | ✅ Рекомендуется |
| **Auth0** | ⭐⭐ | Free tier → дорого | ⚠️ Излишне |
| **Supabase Auth** | ⭐⭐ | Free tier | ✅ Хорошо |
| **Firebase Auth** | ⭐⭐ | Free tier | ⚠️ Google зависимость |
| **Свой JWT** | ⭐⭐⭐⭐⭐ | Free но время | ❌ Не стоит |

---

## 🌐 Как работает Clerk

### Схема работы

```
┌───────────────────────────────────────────────────┐
│                  CLERK FLOW                        │
├───────────────────────────────────────────────────┤
│                                                   │
│  1️⃣ User кликает "Sign In"                        │
│     ↓                                             │
│  2️⃣ Clerk показывает красивую форму               │
│     (Email + Password или Google OAuth)           │
│     ↓                                             │
│  3️⃣ User вводит credentials                       │
│     ↓                                             │
│  4️⃣ Clerk валидирует и создаёт сессию             │
│     ↓                                             │
│  5️⃣ Clerk выдаёт JWT токен                        │
│     ↓                                             │
│  6️⃣ React получает токен и user данные            │
│     ↓                                             │
│  7️⃣ React сохраняет в state и показывает UI       │
│                                                   │
│  ────────────────────────────────────            │
│                                                   │
│  📤 Запрос к Backend:                              │
│     Headers: {                                    │
│       Authorization: "Bearer <JWT_TOKEN>"         │
│     }                                             │
│     ↓                                             │
│  🔐 Backend проверяет токен через Clerk API        │
│     ↓                                             │
│  ✅ Токен валиден → Возвращает данные              │
│  ❌ Токен невалиден → 401 Unauthorized             │
│                                                   │
└───────────────────────────────────────────────────┘
```

---

## 💡 Интеграция в React

### Setup Clerk

```
1. Регистрация на clerk.com
2. Создать приложение
3. Получить Publishable Key

4. Установка:
npm install @clerk/clerk-react

5. Обернуть App:
import { ClerkProvider } from '@clerk/clerk-react'

<ClerkProvider publishableKey={CLERK_KEY}>
  <App />
</ClerkProvider>

6. Готово!
```

### Компоненты Clerk

```
1. <SignIn /> - форма входа
2. <SignUp /> - форма регистрации
3. <UserButton /> - аватар пользователя с меню
4. <SignedIn> - показать если залогинен
5. <SignedOut> - показать если не залогинен

Пример:
<SignedOut>
  <SignInButton />
</SignedOut>

<SignedIn>
  <UserButton />
  <p>Welcome, {user.firstName}!</p>
</SignedIn>
```

### Защита routes

```
import { useAuth } from '@clerk/clerk-react'

function ProtectedPage() {
  const { isLoaded, isSignedIn } = useAuth()
  
  if (!isLoaded) return <Loading />
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />
  }
  
  return <div>Protected content</div>
}
```

---

## 🔧 Интеграция в FastAPI

### Backend защита

```
1. Установка:
pip install clerk-backend-api

2. Middleware для проверки токена:

from clerk_backend_api import Clerk
from fastapi import HTTPException, Header

clerk = Clerk(bearer_auth="YOUR_SECRET_KEY")

async def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(401, "No auth token")
    
    try:
        token = authorization.replace("Bearer ", "")
        session = clerk.sessions.verify_session(token)
        return session.user_id
    except:
        raise HTTPException(401, "Invalid token")

3. Защита endpoint:

@app.get("/api/cams")
async def get_cams(user_id: str = Depends(verify_token)):
    # Вернуть только кулачки этого user_id
    return get_user_cams(user_id)

4. Готово!
```

---

## 🤖 Работа с Claude Code

### Сценарий: Добавление Clerk в EngineCamPro

#### ✅ Эффективный диалог

```
Ты: Добавь аутентификацию с Clerk в EngineCamPro (React + FastAPI).

Требования к Frontend:

1. Setup:
   - Установить @clerk/clerk-react
   - Создать .env.local с VITE_CLERK_PUBLISHABLE_KEY
   - Обернуть App в ClerkProvider

2. Компоненты:
   - src/components/SignInPage.jsx (страница входа)
   - src/components/SignUpPage.jsx (страница регистрации)
   - src/components/ProtectedRoute.jsx (HOC для защиты)
   - Обновить Header с UserButton

3. Routing:
   - /sign-in → SignInPage
   - /sign-up → SignUpPage
   - / (dashboard) → Protected (redirect если не залогинен)

4. Protected Routes:
   Все страницы приложения должны быть protected:
   - Dashboard
   - Calculator
   - History
   
   Если не залогинен → redirect на /sign-in

5. User Context:
   Использовать useUser() hook от Clerk:
   const { user, isSignedIn, isLoaded } = useUser()
   
   Показывать user.firstName в Header

6. API Calls:
   Обновить src/services/api.js:
   - Добавлять Authorization header с токеном
   - Получать токен через getToken() от useAuth()

─────────────────────────────────────

Требования к Backend:

1. Setup:
   - Установить clerk-backend-api
   - Добавить CLERK_SECRET_KEY в .env
   - Создать middleware для верификации токенов

2. Middleware:
   app/core/auth.py:
   
   from clerk_backend_api import Clerk
   
   clerk = Clerk(bearer_auth=settings.CLERK_SECRET_KEY)
   
   async def get_current_user(
       authorization: str = Header(None)
   ) -> str:
       if not authorization:
           raise HTTPException(401)
       
       token = authorization.replace("Bearer ", "")
       
       try:
           session = clerk.sessions.verify_session(token)
           return session.user_id
       except:
           raise HTTPException(401, "Invalid token")

3. Защита Endpoints:
   Все endpoints должны требовать auth:
   
   @router.get("/api/cams")
   async def get_cams(
       user_id: str = Depends(get_current_user),
       db: Session = Depends(get_db)
   ):
       return db.query(Cam).filter(Cam.user_id == user_id).all()
   
   @router.post("/api/cams")
   async def create_cam(
       cam: CamCreate,
       user_id: str = Depends(get_current_user),
       db: Session = Depends(get_db)
   ):
       new_cam = Cam(**cam.dict(), user_id=user_id)
       db.add(new_cam)
       db.commit()
       return new_cam

4. Database:
   Обновить модели - добавить user_id:
   
   class Cam(Base):
       __tablename__ = "cams"
       
       id: Mapped[int] = mapped_column(primary_key=True)
       user_id: Mapped[str] = mapped_column(String, index=True)
       name: Mapped[str]
       base_radius: Mapped[float]
       # ... остальные поля

5. Migration:
   Создать Alembic миграцию для добавления user_id

─────────────────────────────────────

Testing:

1. Frontend:
   - Открыть приложение → redirect на /sign-in
   - Sign up с новым email
   - Войти в dashboard
   - UserButton показывает имя
   - Sign out → redirect на /sign-in

2. Backend:
   - Запрос без токена → 401
   - Запрос с токеном → данные только этого user
   - Создание кулачка → привязан к user_id

3. Integration:
   - User A создал кулачок
   - User B не видит кулачок User A
   - Каждый видит только свои данные

Claude Code: [устанавливает и интегрирует Clerk]

Установлено:

Frontend:
✅ @clerk/clerk-react
✅ ClerkProvider setup
✅ SignIn/SignUp страницы
✅ ProtectedRoute HOC
✅ UserButton в Header
✅ API calls с Authorization header

Backend:
✅ clerk-backend-api
✅ Auth middleware
✅ Protected endpoints
✅ user_id в моделях
✅ Database migration

Структура:

frontend/
├── src/
│   ├── components/
│   │   ├── SignInPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Header.jsx (updated)
│   ├── services/
│   │   └── api.js (updated with auth)
│   └── App.jsx (updated with routes)

backend/
├── app/
│   ├── core/
│   │   └── auth.py (new)
│   ├── routers/
│   │   └── cams.py (updated)
│   └── models.py (updated with user_id)

Теперь нужно:
1. Создать приложение на clerk.com
2. Скопировать Publishable Key → frontend/.env.local
3. Скопировать Secret Key → backend/.env
4. Запустить backend и frontend
5. Протестировать sign up и sign in

Готово! Хочешь что-то ещё?

Ты: Добавь loading states для auth

Claude Code: [добавляет loading состояния]
Добавил:
- Loading spinner при проверке auth
- Skeleton для protected routes
- Плавные transitions
```

---

## 🛠️ Практическое задание

### Задача

Добавь Clerk аутентификацию в EngineCamPro.

### Шаги

1. **Регистрация на Clerk:**
   - clerk.com → Sign up
   - Create application
   - Копировать keys

2. **Frontend setup:**
   - Используй диалог выше с Claude Code

3. **Backend setup:**
   - Используй диалог выше с Claude Code

4. **Testing:**
   - Sign up с новым аккаунтом
   - Создай кулачок
   - Sign out, sign in другим аккаунтом
   - Проверь что не видишь чужие кулачки

### Ожидаемый результат

- ✅ Аутентификация работает
- ✅ Только свои данные видны
- ✅ Protected routes работают
- ✅ Готов к монетизации!

---

## ❓ Вопросы для самопроверки

1. **Зачем нужна аутентификация?**
2. **Почему Clerk, а не свой auth?**
3. **Как защитить React route?**
4. **Как защитить FastAPI endpoint?**
5. **Что такое JWT токен?**

---

## 🔗 Связь с другими уроками

**Основано на:** Модуль 5 (Интеграция)  
**Подготавливает к:** Урок 6.2 (Stripe платежи)

---

## ✅ Критерии завершения

- [ ] Clerk интегрирован
- [ ] Аутентификация работает
- [ ] Endpoints защищены
- [ ] Каждый видит только свои данные
- [ ] Готов к монетизации

---

**Статус урока:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён