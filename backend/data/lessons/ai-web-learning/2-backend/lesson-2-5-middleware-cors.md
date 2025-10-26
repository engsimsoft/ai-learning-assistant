# Урок 2.5: Middleware и CORS

> **Модуль 2:** Backend разработка  
> **Урок:** 2.5  
> **Длительность:** 40-55 минут  
> **Prerequisite:** Урок 2.4 (Обработка ошибок)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать что такое middleware и зачем он нужен
- ✅ Знать проблему Same-Origin Policy
- ✅ Понимать зачем нужен CORS
- ✅ Настраивать CORS в FastAPI через Claude Code
- ✅ Понимать security implications CORS

---

## 📖 Концепция: Middleware

### Простое определение

**Middleware** (промежуточное ПО) - это функция которая выполняется ПЕРЕД или ПОСЛЕ каждого запроса. Это как checkpoint - все запросы проходят через него.

### Зачем это нужно

Без middleware тебе пришлось бы добавлять одинаковый код в каждый endpoint:
```python
@app.get("/cams")
def get_cams():
    log_request()           # ← дублируется
    check_authentication()  # ← дублируется
    add_cors_headers()      # ← дублируется
    # Твоя логика
    return cams

@app.post("/cams")
def create_cam():
    log_request()           # ← дублируется снова!
    check_authentication()  # ← дублируется снова!
    add_cors_headers()      # ← дублируется снова!
    # Твоя логика
```

**Проблема:** Дублирование кода везде! 😱

**Решение:** Middleware - пишешь один раз, работает для всех:
```python
# Middleware один раз
@app.middleware("http")
async def log_requests(request, call_next):
    log_request()
    response = await call_next(request)
    return response

# Endpoints чистые!
@app.get("/cams")
def get_cams():
    return cams  # Логирование автоматически!
```

### 🛂 Аналогия: Охранник на входе

```
БЕЗ MIDDLEWARE (проверка в каждой комнате)
═══════════════════════════════════════════

🚪 Комната A
   👮 Охранник проверяет пропуск
   ✅ Входишь
   
🚪 Комната B
   👮 Охранник проверяет пропуск СНОВА
   ✅ Входишь
   
🚪 Комната C
   👮 Охранник проверяет пропуск СНОВА
   ✅ Входишь
   
Неэффективно! В каждой комнате охранник!


С MIDDLEWARE (один охранник на входе)
═════════════════════════════════════

🚪 ВХОД В ЗДАНИЕ
   👮 Охранник проверяет ОДИН РАЗ
   ✅ Дал пропуск
   
🚪 Комната A - заходишь свободно
🚪 Комната B - заходишь свободно  
🚪 Комната C - заходишь свободно

Эффективно! Проверка на входе!
```

**Middleware = охранник на входе:**
- Проверяет ВСЕ запросы
- Добавляет общую логику
- Пропускает дальше или блокирует

### Как работает

```
┌──────────────────────────────────────────────────────────┐
│              MIDDLEWARE В FASTAPI                        │
│                                                          │
│  HTTP Request                                            │
│      ↓                                                   │
│  ┌──────────────────────────────────┐                   │
│  │   MIDDLEWARE STACK                │                   │
│  │                                   │                   │
│  │  1. Logging Middleware            │                   │
│  │     • Логирует запрос             │                   │
│  │     ↓                             │                   │
│  │  2. CORS Middleware               │                   │
│  │     • Добавляет CORS headers      │                   │
│  │     ↓                             │                   │
│  │  3. Authentication Middleware     │                   │
│  │     • Проверяет токен             │                   │
│  │     ↓                             │                   │
│  └──────────────────────────────────┘                   │
│      ↓                                                   │
│  ┌──────────────────────────────────┐                   │
│  │   ТВОЙ ENDPOINT                   │                   │
│  │   def get_cams():                 │                   │
│  │       return cams                 │                   │
│  └──────────────────────────────────┘                   │
│      ↓                                                   │
│  ┌──────────────────────────────────┐                   │
│  │   MIDDLEWARE (обратный путь)      │                   │
│  │   • Добавляет headers             │                   │
│  └──────────────────────────────────┘                   │
│      ↓                                                   │
│  HTTP Response                                           │
│                                                          │
└──────────────────────────────────────────────────────────┘

Запрос проходит через ВСЕ middleware
Ответ тоже проходит обратно
```

---

## 📖 Концепция: CORS

### Простое определение

**CORS** (Cross-Origin Resource Sharing) - это механизм который разрешает или блокирует запросы между разными доменами. По умолчанию браузеры блокируют такие запросы для безопасности.

### Проблема: Same-Origin Policy

Браузеры имеют правило безопасности: **Same-Origin Policy**

```
🌐 ORIGIN = протокол + домен + порт

http://localhost:3000     ← Origin 1 (Frontend React)
http://localhost:8000     ← Origin 2 (Backend FastAPI)
                             ↑
                        РАЗНЫЕ origins!
```

**Без CORS:**
```javascript
// Frontend на http://localhost:3000
fetch('http://localhost:8000/api/cams')

❌ ОШИБКА В КОНСОЛИ:
Access to fetch at 'http://localhost:8000/api/cams' 
from origin 'http://localhost:3000' has been blocked 
by CORS policy: No 'Access-Control-Allow-Origin' header 
is present on the requested resource.
```

**Браузер блокирует запрос!** 🚫

### Зачем это нужно

**Проблема безопасности без CORS:**
```
1. Ты заходишь на bank.com (логинишься)
2. Открываешь новую вкладку: evil.com
3. evil.com делает запрос к bank.com/transfer-money
4. Без CORS браузер отправит твои cookies!
5. 💰 Деньги украдены!
```

**Same-Origin Policy защищает от этого!**

### Решение: CORS headers

Backend добавляет специальные headers:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

**Теперь браузер:**
```javascript
// Frontend на http://localhost:3000
fetch('http://localhost:8000/api/cams')

✅ УСПЕХ! Backend разрешил запросы с localhost:3000
```

---

## 💡 CORS в FastAPI

### Настройка CORS Middleware

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",    # React Dev Server
        "http://localhost:3001",    # Дополнительный порт
    ],
    allow_credentials=True,         # Разрешить cookies
    allow_methods=["*"],            # Все HTTP методы
    allow_headers=["*"],            # Все headers
)
```

### Параметры CORS

#### `allow_origins`
**Какие домены могут делать запросы**

```python
# ❌ ОПАСНО - разрешает ВСЕ домены
allow_origins=["*"]

# ✅ БЕЗОПАСНО - только твой Frontend
allow_origins=[
    "http://localhost:3000",           # Development
    "https://enginecampro.com",        # Production
]
```

#### `allow_methods`
**Какие HTTP методы разрешены**

```python
allow_methods=["*"]              # Все методы
allow_methods=["GET", "POST"]    # Только GET и POST
```

#### `allow_headers`
**Какие headers может отправлять Frontend**

```python
allow_headers=["*"]              # Все headers
allow_headers=["Content-Type"]   # Только Content-Type
```

#### `allow_credentials`
**Разрешить отправку cookies и авторизационных headers**

```python
allow_credentials=True   # С cookies (для аутентификации)
allow_credentials=False  # Без cookies
```

---

## 🎯 CORS для EngineCamPro v2

### Development настройки

```python
# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="EngineCamPro API", version="2.0")

# CORS для Development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",      # React Dev Server
        "http://localhost:3001",      # Альтернативный порт
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

### Production настройки

```python
import os

# Получить origins из переменных окружения
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "https://enginecampro.com,https://www.enginecampro.com"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # Из переменных окружения
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)
```

---

## 🛡️ Security Best Practices

### ❌ НЕ делай так (небезопасно)

```python
# ОПАСНО! Разрешает запросы с любого сайта!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # ← Любой сайт может делать запросы!
    allow_credentials=True,   # ← С cookies!
)
```

**Почему опасно:**
- Любой сайт может отправлять запросы к твоему API
- Evil.com может украсть данные пользователей
- Нет защиты от CSRF атак

### ✅ Делай так (безопасно)

```python
# БЕЗОПАСНО! Только твои домены
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",        # Dev
        "https://enginecampro.com",     # Production
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Конкретные методы
    allow_headers=["Content-Type", "Authorization"], # Конкретные headers
)
```

### Preflight requests

Браузер иногда делает **preflight request** (OPTIONS):
```
1. Frontend делает POST /api/cams
2. Браузер СНАЧАЛА отправляет OPTIONS /api/cams (preflight)
3. Backend отвечает с CORS headers
4. Браузер отправляет реальный POST /api/cams
```

**FastAPI обрабатывает OPTIONS автоматически!** ✅

---

## 💡 Контекст применения

### Когда нужен CORS?

**CORS нужен когда:**
- ✅ Frontend и Backend на разных портах (localhost:3000 + localhost:8000)
- ✅ Frontend и Backend на разных доменах (enginecampro.com + api.enginecampro.com)
- ✅ Разделённая архитектура (React + FastAPI)

**CORS НЕ нужен когда:**
- ⚠️ Next.js Full-Stack (всё в одном origin)
- ⚠️ Server-side rendering (SSR)
- ⚠️ Монолит (Frontend и Backend в одном процессе)

### Для EngineCamPro v2

```
┌──────────────────────────────────────────────────────────┐
│          ENGINECAMPRO V2 АРХИТЕКТУРА                     │
│                                                          │
│  FRONTEND (React)          BACKEND (FastAPI)             │
│  localhost:3000            localhost:8000                │
│        ↓                         ↑                       │
│        │   HTTP Request          │                       │
│        └─────────────────────────┘                       │
│                                                          │
│        ❌ БЕЗ CORS - блокируется браузером               │
│        ✅ С CORS - работает!                             │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🤖 Работа с Claude Code

### Задача: Настроить CORS для EngineCamPro

### ✅ Хороший диалог (эффективный)

```bash
cd ~/projects/enginecampro-v2/backend
claude
```

```
Ты: Нужно настроить CORS чтобы Frontend мог обращаться к Backend.

Claude Code: Какие origins нужно разрешить?

Ты: Настрой CORS Middleware в app/main.py

Требования:

Development origins:
- http://localhost:3000 (React Dev Server)
- http://localhost:3001 (альтернативный порт)

Settings:
- allow_credentials: True (для аутентификации в будущем)
- allow_methods: ["GET", "POST", "PUT", "DELETE"]
- allow_headers: ["*"] (для dev, потом уточним)

Production:
- Добавь комментарий что origins нужно будет взять из env переменных

Best practices:
- НЕ использовать allow_origins=["*"]
- Конкретные методы, не ["*"]
- Комментарии почему выбраны эти настройки

Claude Code: Отлично! Настрою CORS Middleware:

Добавлю в app/main.py:
- Импорт CORSMiddleware
- app.add_middleware() с указанными параметрами
- Комментарии для dev/prod
- Best practices соблюдены

Применить? [Y/n]

Ты: Y

Claude Code: ✅ Добавил CORS Middleware в app/main.py:

```python
from fastapi.middleware.cors import CORSMiddleware

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",    # React Dev Server
        "http://localhost:3001",    # Alternative port
        # Production: use environment variables
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],  # Dev: allow all, Prod: specify
)
```

Теперь Frontend может делать запросы!

Протестируй:
1. Запусти Backend: uvicorn app.main:app --reload
2. Запусти Frontend: npm run dev
3. Попробуй сделать fetch() запрос

Ты: Отлично! Теперь добавь logging middleware чтобы логировать 
все запросы.

Claude Code: Создам custom middleware:
- Логирует метод и URL
- Логирует время выполнения
- Добавлю перед CORS middleware

Применить? [Y/n]

Ты: Y

Claude Code: ✅ Добавил logging middleware:

```python
import time
import logging

@app.middleware("http")
async def log_requests(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    
    logging.info(
        f"{request.method} {request.url.path} "
        f"completed in {duration:.3f}s"
    )
    return response
```

Теперь все запросы логируются! Проверь консоль при запросах.

Ты: Спасибо!
```

**Почему это эффективно:**
- ✅ Чёткие требования для dev и prod
- ✅ Best practices упомянуты
- ✅ Итеративное добавление (CORS, потом logging)
- ✅ Инструкции как тестировать

---

## 🛠️ Практическое задание

### Задача

Настрой CORS и добавь logging middleware через диалог с Claude Code. Frontend должен успешно обращаться к Backend.

### Что нужно создать

- CORS Middleware с правильными настройками
- Logging Middleware для мониторинга запросов
- Комментарии для dev/prod настроек

### Работа с Claude Code

**Шаг 1:** Открой терминал
```bash
cd ~/projects/enginecampro-v2/backend
claude
```

**Шаг 2:** Диалог с Claude Code

```
Ты: Настрой CORS в app/main.py

[Укажи origins]
[Укажи настройки]
[Укажи best practices]

Claude Code: [добавит CORS middleware]

Ты: Добавь logging middleware

Claude Code: [добавит logging]
```

**Шаг 3:** Запусти Backend
```bash
uvicorn app.main:app --reload
```

**Шаг 4:** Тестирование CORS

Создай простой HTML файл для теста:
```html
<!-- test-cors.html -->
<!DOCTYPE html>
<html>
<body>
  <button onclick="testAPI()">Test API</button>
  <script>
    async function testAPI() {
      try {
        const response = await fetch('http://localhost:8000/api/cams');
        const data = await response.json();
        console.log('✅ CORS работает!', data);
        alert('CORS работает! Смотри консоль.');
      } catch (error) {
        console.error('❌ CORS ошибка:', error);
        alert('CORS ошибка! Смотри консоль.');
      }
    }
  </script>
</body>
</html>
```

Открой файл в браузере и нажми кнопку.

### Что протестировать

**1. CORS работает**
- Открой test-cors.html в браузере
- Нажми "Test API"
- Проверь консоль - НЕ должно быть CORS ошибки
- ✅ Запрос прошёл успешно

**2. CORS блокирует неразрешённые origins**
- Измени в CORS: `allow_origins=["http://example.com"]`
- Перезапусти сервер
- Нажми "Test API" снова
- ❌ Должна быть CORS ошибка в консоли
- Верни `localhost:3000` обратно

**3. Logging работает**
- Сделай несколько запросов к API
- Проверь консоль Backend
- ✅ Видишь логи: "GET /api/cams completed in 0.XXXs"

**4. Preflight requests**
- Открой DevTools → Network
- Сделай POST запрос к /api/cams
- ✅ Видишь OPTIONS запрос (preflight)
- ✅ Потом идёт POST запрос

### Ожидаемый результат

- ✅ CORS Middleware настроен
- ✅ Frontend может делать запросы к Backend
- ✅ Logging Middleware логирует все запросы
- ✅ Preflight requests обрабатываются автоматически
- ✅ Неразрешённые origins блокируются

### Как проверить

- [ ] CORS middleware добавлен в app/main.py
- [ ] Test-cors.html работает без ошибок
- [ ] Неразрешённый origin блокируется
- [ ] Логи появляются в консоли Backend
- [ ] OPTIONS requests видны в DevTools

---

## ❓ Вопросы для самопроверки

1. **Middleware:**
   - Что такое middleware?
   - Зачем он нужен?
   - Как middleware работает в FastAPI?

2. **CORS:**
   - Что такое Same-Origin Policy?
   - Зачем нужен CORS?
   - Что произойдёт без CORS?

3. **CORS настройки:**
   - В чём разница между allow_origins=["*"] и конкретными origins?
   - Что такое preflight request?
   - Когда использовать allow_credentials=True?

4. **Security:**
   - Почему allow_origins=["*"] опасно?
   - Какие origins указать для dev?
   - Какие origins указать для production?

5. **Для EngineCamPro v2:**
   - На каких портах будут Frontend и Backend?
   - Нужен ли CORS?
   - Какие настройки использовать?

---

## 🔗 Связь с другими уроками

**Основано на уроках:**
- Урок 1.1: Client-Server - понимание разделённой архитектуры
- Урок 2.1: Введение в FastAPI - структура приложения

**Подготавливает к урокам:**
- Урок 4.2: Fetch API - Frontend будет делать запросы
- Урок 5.1: Frontend-Backend интеграция - CORS важен здесь
- Урок 6.1: Аутентификация - allow_credentials для токенов

**Связь с EngineCamPro v2:**
CORS - это мост между Frontend и Backend:
- React на :3000 → FastAPI на :8000
- Без CORS браузер блокирует запросы
- С CORS всё работает гладко

---

## ✅ Критерии завершения урока

**Понимание middleware:**
- [ ] Знаю что такое middleware
- [ ] Понимаю аналогию с охранником
- [ ] Знаю зачем он нужен

**Понимание CORS:**
- [ ] Знаю что такое Same-Origin Policy
- [ ] Понимаю зачем нужен CORS
- [ ] Знаю как настроить CORS в FastAPI

**Security:**
- [ ] Понимаю почему ["*"] опасно
- [ ] Знаю правильные настройки для dev/prod
- [ ] Понимаю preflight requests

**Практика:**
- [ ] Настроил CORS через Claude Code
- [ ] Добавил logging middleware
- [ ] Протестировал через test-cors.html
- [ ] Видел CORS ошибку при неправильных настройках

**Документирование:**
- [ ] Записал выводы
- [ ] Понимаю следующий урок

---

**Следующий урок:** 2.6 Автодокументация API (Swagger)  
**Время на урок:** 40-55 минут  
**Статус:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён

---

*Версия урока: 1.0*  
*Дата создания: 11 октября 2025*  
*Формат: Vibe Coding с диалогами Claude Code*