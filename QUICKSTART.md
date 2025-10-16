# Быстрый старт AI Learning Agent

> Пошаговая инструкция по запуску и остановке приложения

## 📋 Содержание

- [Запуск приложения](#-запуск-приложения)
  - [Backend (FastAPI)](#1-backend-fastapi)
  - [Frontend (React)](#2-frontend-react)
- [Остановка приложения](#-остановка-приложения)
- [Проверка работы](#-проверка-работы)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Запуск приложения

### 1. Backend (FastAPI)

**Откройте первый терминал и выполните:**

```bash
# Перейдите в папку backend
cd backend

# Активируйте виртуальное окружение
source venv/bin/activate  # Mac/Linux
# или
venv\Scripts\activate     # Windows

# Запустите сервер
uvicorn main:app --reload
```

**Результат:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [...]
INFO:     Started server process [...]
INFO:     Application startup complete.
2025-10-16 17:02:47,222 - main - INFO - Total lessons loaded: 76
2025-10-16 17:02:47,222 - main - INFO - Backend startup complete!
```

✅ Backend запущен на **http://localhost:8000**

---

### 2. Frontend (React)

**Откройте второй терминал (не закрывая первый!) и выполните:**

```bash
# Перейдите в папку frontend
cd frontend

# Запустите dev-сервер
npm run dev
```

**Результат:**
```
  VITE v5.4.20  ready in 84 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

✅ Frontend запущен на **http://localhost:5173**

---

## 🛑 Остановка приложения

### Способ 1: Остановка через терминал (рекомендуется)

**В каждом терминале (Backend и Frontend):**

```bash
# Нажмите комбинацию клавиш:
Ctrl + C
```

Появится сообщение:
```
^C
INFO:     Shutting down
INFO:     Finished server process [...]
```

**Деактивация виртуального окружения (опционально):**
```bash
# В терминале backend:
deactivate
```

---

### Способ 2: Закрытие терминалов

Просто закройте оба терминала (Backend и Frontend).

**⚠️ Внимание:** Процессы могут остаться запущенными в фоне!

Проверьте и завершите их при необходимости:

```bash
# Найти процессы на портах
lsof -i :8000  # Backend
lsof -i :5173  # Frontend

# Завершить процесс по PID (из вывода lsof)
kill <PID>
```

---

## ✅ Проверка работы

### 1. Проверка Backend

**Откройте браузер:**
- API: http://localhost:8000
- Документация: http://localhost:8000/docs
- Список уроков: http://localhost:8000/lessons
- Модели AI: http://localhost:8000/models

**Или через curl:**
```bash
curl http://localhost:8000/lessons
```

**Ожидаемый результат:**
```json
{"total":76,"lessons":[...]}
```

---

### 2. Проверка Frontend

**Откройте браузер:**
- Приложение: http://localhost:5173

**Проверьте:**
- ✅ Загрузились уроки в левой панели
- ✅ Доступен выбор AI модели (Gemini, Claude, GPT, Grok)
- ✅ Можно отправить сообщение в чат

---

### 3. Проверка связки Backend ↔ Frontend

**В браузере (F12 → Console) не должно быть ошибок:**
```
✅ No errors (всё работает)
❌ ERR_CONNECTION_REFUSED (Backend не запущен)
❌ Failed to fetch (Неправильный порт в .env)
```

**В терминале Backend должны появиться запросы:**
```
INFO:     127.0.0.1:xxxxx - "GET /lessons HTTP/1.1" 200 OK
INFO:     127.0.0.1:xxxxx - "GET /models HTTP/1.1" 200 OK
```

---

## 🔧 Troubleshooting

### Проблема 1: Backend не запускается

**Ошибка:** `No module named 'fastapi'`

**Решение:**
```bash
cd backend
source venv/bin/activate  # Активируйте venv!
pip install -r requirements.txt
```

---

### Проблема 2: Frontend не видит Backend

**Ошибка в консоли:** `ERR_CONNECTION_REFUSED`

**Причины и решения:**

1. **Backend не запущен** → Запустите Backend (см. выше)

2. **Неправильный порт в .env**
   ```bash
   # Проверьте frontend/.env
   cat frontend/.env
   ```
   Должно быть: `VITE_API_URL=http://localhost:8000`

3. **Backend запущен на другом порту**
   ```bash
   # Проверьте backend/.env
   cat backend/.env
   ```
   Должно быть: `PORT=8000`

**Исправление:**
```bash
# Если порты не совпадают:
# 1. Остановите frontend (Ctrl+C)
# 2. Исправьте frontend/.env
# 3. Перезапустите frontend
cd frontend
npm run dev
```

---

### Проблема 3: Порт 8000 или 5173 занят

**Ошибка:** `Address already in use`

**Найти процесс:**
```bash
lsof -i :8000  # Для backend
lsof -i :5173  # Для frontend
```

**Завершить процесс:**
```bash
kill <PID>  # PID из вывода lsof
```

**Или использовать другой порт:**
```bash
# Backend
uvicorn main:app --reload --port 8001

# Frontend автоматически выберет 5174 если 5173 занят
```

---

### Проблема 4: Нет уроков в левой панели

**Причины:**
1. Backend не возвращает уроки
2. Frontend не может подключиться к Backend

**Диагностика:**
```bash
# Проверьте Backend напрямую
curl http://localhost:8000/lessons

# Должен вернуть: {"total":76,"lessons":[...]}
```

**Если возвращает пустой ответ:**
```bash
# Проверьте логи Backend в терминале
# Должно быть: "Total lessons loaded: 76"
```

---

### Проблема 5: AI не отвечает

**Причины:**
1. Нет API ключа OpenRouter
2. Неправильный API ключ

**Решение:**
```bash
# Проверьте backend/.env
cat backend/.env | grep OPENROUTER_API_KEY

# Должен быть валидный ключ:
OPENROUTER_API_KEY=sk-or-v1-xxxxx

# Получить ключ: https://openrouter.ai
```

**После изменения .env:**
```bash
# Перезапустите Backend (Ctrl+C, затем снова uvicorn main:app --reload)
```

---

## 📚 Дополнительная информация

- **Полная документация:** [README.md](README.md)
- **Архитектура проекта:** [docs/architecture.md](docs/architecture.md)
- **Структура курсов:** [docs/course-structure.md](docs/course-structure.md)
- **Детальная установка:** [docs/setup.md](docs/setup.md)

---

## 💡 Полезные команды

### Просмотр логов Backend в реальном времени
```bash
# Backend показывает логи автоматически в терминале
# Каждый запрос виден как:
INFO:     127.0.0.1:xxxxx - "GET /lessons HTTP/1.1" 200 OK
```

### Очистка кэша Frontend
```bash
cd frontend
rm -rf node_modules/.vite
npm run dev
```

### Пересоздание venv Backend
```bash
cd backend
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## ✅ Стандартный процесс работы

**Каждый день при запуске:**

1. Откройте 2 терминала
2. Терминал 1: `cd backend && source venv/bin/activate && uvicorn main:app --reload`
3. Терминал 2: `cd frontend && npm run dev`
4. Откройте браузер: http://localhost:5173

**При завершении работы:**

1. В терминале Backend: `Ctrl + C`
2. В терминале Frontend: `Ctrl + C`
3. В терминале Backend: `deactivate` (опционально)

---

**Последнее обновление:** 2025-10-16
