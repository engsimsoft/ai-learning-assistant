# Урок 2.6: Автодокументация API (Swagger)

> **Модуль 2:** Backend разработка  
> **Урок:** 2.6  
> **Длительность:** 35-50 минут  
> **Prerequisite:** Урок 2.5 (Middleware и CORS)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать зачем нужна документация API
- ✅ Знать что такое OpenAPI и Swagger UI
- ✅ Использовать автогенерацию документации FastAPI
- ✅ Улучшать документацию через описания и примеры
- ✅ Тестировать API прямо в браузере

---

## 📖 Концепция: Документация API

### Простое определение

**Документация API** - это инструкция которая объясняет: какие endpoints есть, что они делают, какие данные принимают и возвращают. Это как инструкция по применению для твоего API.

**Swagger UI** - это интерактивный веб-интерфейс который показывает документацию и позволяет тестировать API прямо в браузере.

### Зачем это нужно

Без документации разработчики теряются:
```
Frontend dev: "Какой endpoint для создания кулачка?"
Backend dev:  "POST /api/cams"

Frontend dev: "Какие поля нужны?"
Backend dev:  "name, base_radius, lift, duration"

Frontend dev: "Какие типы данных?"
Backend dev:  "Все float кроме name - string"

Frontend dev: "А какие диапазоны?"
Backend dev:  "base_radius 0-1000, lift 0-100..."

Frontend dev: "А что возвращается?"
Backend dev:  "Объект с id и timestamp..."
```

**Проблема:** Постоянные вопросы! Много времени на коммуникацию! 😵

**Решение:** Документация - все ответы в одном месте:
```
Frontend dev открывает http://localhost:8000/docs
✅ Видит все endpoints
✅ Видит все параметры и типы
✅ Видит примеры запросов
✅ Может протестировать прямо в браузере!
```

### 📱 Аналогия: Инструкция к устройству

```
БЕЗ ДОКУМЕНТАЦИИ (хаос)
════════════════════════

📦 Купил новое устройство
❓ Какие кнопки для чего?
❓ Как включить?
❓ Какие режимы есть?
❓ Что означает красный индикатор?

📞 Звонок в поддержку...
📧 Email разработчикам...
🔍 Гуглить полдня...


С ДОКУМЕНТАЦИЕЙ (порядок)
═══════════════════════════

📦 Купил новое устройство
📘 Открыл инструкцию:
   ✅ Схема устройства
   ✅ Описание каждой кнопки
   ✅ Пошаговые инструкции
   ✅ Примеры использования
   ✅ Решение проблем

✅ Всё понятно за 5 минут!
```

**API документация = инструкция:**
- 📋 Список всех функций (endpoints)
- 🔧 Как использовать каждую
- 📊 Какие данные нужны
- ✅ Примеры запросов и ответов

### Как работает

```
┌──────────────────────────────────────────────────────────┐
│             FASTAPI АВТОДОКУМЕНТАЦИЯ                     │
│                                                          │
│  ТЫ ПИШЕШЬ КОД              FASTAPI ГЕНЕРИРУЕТ           │
│                                                          │
│  @app.post("/api/cams")     ┌──────────────────────┐    │
│  def create_cam(            │ OpenAPI Spec (JSON)  │    │
│    cam: CamCreate           │ {                    │    │
│  ) -> CamResponse:          │   "paths": {         │    │
│    """                      │     "/api/cams": {   │    │
│    Create new cam           │       "post": {...}  │    │
│    """                      │     }                │    │
│    return cam               │   }                  │    │
│                             │ }                    │    │
│                             └──────────────────────┘    │
│                                       ↓                  │
│                             ┌──────────────────────┐    │
│                             │   Swagger UI         │    │
│                             │   /docs              │    │
│                             │                      │    │
│                             │  📋 POST /api/cams   │    │
│                             │     Create new cam   │    │
│                             │                      │    │
│                             │  [Try it out]        │    │
│                             └──────────────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘

Ты пишешь код → FastAPI генерирует документацию АВТОМАТИЧЕСКИ!
```

---

## 💡 Swagger UI в FastAPI

### Доступ к документации

FastAPI создаёт **ДВЕ** документации автоматически:

```
http://localhost:8000/docs       ← Swagger UI (интерактивная)
http://localhost:8000/redoc      ← ReDoc (красивая для чтения)
http://localhost:8000/openapi.json ← OpenAPI спецификация (JSON)
```

### Что видишь в Swagger UI

```
┌────────────────────────────────────────────────────────┐
│  EngineCamPro API                            Version 2.0│
│  Cam profile calculation API                            │
├────────────────────────────────────────────────────────┤
│                                                         │
│  🟢 GET    /api/cams          Get all cams             │
│  🟢 POST   /api/cams          Create new cam           │
│  🟢 GET    /api/cams/{id}     Get cam by ID            │
│  🟠 PUT    /api/cams/{id}     Update cam               │
│  🔴 DELETE /api/cams/{id}     Delete cam               │
│  🟢 POST   /api/cams/{id}/calculate  Calculate profile │
│                                                         │
│  [Schemas] ▼                                            │
│    CamCreate                                            │
│    CamResponse                                          │
│    ProfileResult                                        │
│                                                         │
└────────────────────────────────────────────────────────┘

Цвета:
🟢 GET    - зелёный
🟢 POST   - зелёный
🟠 PUT    - оранжевый
🔴 DELETE - красный
```

### Тестирование в Swagger

```
1. Открой http://localhost:8000/docs
2. Нажми на POST /api/cams
3. Нажми "Try it out"
4. Введи данные:
   {
     "name": "Test Cam",
     "base_radius": 25.0,
     "lift": 10.0,
     "duration": 120.0
   }
5. Нажми "Execute"
6. Видишь ответ:
   Status: 201 Created
   Response body: {...}
```

**Без написания ни строчки Frontend кода!** ✅

---

## 🎨 Улучшение документации

### 1. Описания endpoints

```python
@app.post(
    "/api/cams",
    status_code=201,
    response_model=CamResponse,
    summary="Create new cam",              # ← Краткое описание
    description="""                         # ← Полное описание
    Create a new cam profile.
    
    Parameters:
    - name: Unique cam name
    - base_radius: Base circle radius in mm (0-1000)
    - lift: Cam lift in mm (0-100)
    - duration: Duration in degrees (0-360)
    
    Returns the created cam with generated ID.
    """
)
def create_cam(cam: CamCreate):
    return created_cam
```

### 2. Описания в Pydantic моделях

```python
from pydantic import BaseModel, Field

class CamCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Unique name for the cam",
        example="Intake Cam"               # ← Пример для Swagger
    )
    base_radius: float = Field(
        ...,
        gt=0,
        le=1000,
        description="Base circle radius in millimeters",
        example=25.0
    )
    lift: float = Field(
        ...,
        gt=0,
        le=100,
        description="Cam lift in millimeters",
        example=10.0
    )
    duration: float = Field(
        ...,
        ge=0,
        le=360,
        description="Duration in degrees",
        example=120.0
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Intake Cam",
                "base_radius": 25.0,
                "lift": 10.0,
                "duration": 120.0,
                "project_id": 1
            }
        }
```

### 3. Кастомизация FastAPI приложения

```python
from fastapi import FastAPI

app = FastAPI(
    title="EngineCamPro API",
    description="""
    ## EngineCamPro API v2
    
    REST API for cam profile calculations.
    
    ### Features
    * CRUD operations for cams
    * Profile calculations with NumPy
    * Project management
    * User authentication (coming soon)
    
    ### Documentation
    - Swagger UI: /docs
    - ReDoc: /redoc
    - OpenAPI spec: /openapi.json
    """,
    version="2.0.0",
    contact={
        "name": "EngineCamPro Support",
        "email": "support@enginecampro.com"
    },
    license_info={
        "name": "MIT License",
    }
)
```

### 4. Группировка endpoints (tags)

```python
# app/routers/cams.py

from fastapi import APIRouter

router = APIRouter(
    prefix="/api/cams",
    tags=["Cams"]              # ← Группа в Swagger
)

@router.get("/", tags=["Cams"])
def get_all_cams():
    pass

# app/routers/projects.py

router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]          # ← Другая группа
)
```

**В Swagger endpoints сгруппированы:**
```
📁 Cams
   GET    /api/cams
   POST   /api/cams
   ...

📁 Projects
   GET    /api/projects
   POST   /api/projects
   ...
```

---

## 💡 Контекст применения

### Для EngineCamPro v2

**Кому нужна документация:**

1. **Frontend разработчик** (React)
   - Знает все endpoints
   - Знает форматы данных
   - Может тестировать без Backend кода

2. **Пользователи API** (MATLAB scripts)
   - Видят как вызывать API
   - Знают параметры
   - Примеры запросов готовы

3. **Ты сам** (через 3 месяца)
   - Забыл детали реализации?
   - Открыл /docs → всё вспомнил!

4. **Команда** (новые разработчики)
   - Быстрый onboarding
   - Всё задокументировано
   - Можно экспериментировать

### Swagger vs Postman

| Аспект | Swagger UI | Postman |
|--------|-----------|---------|
| **Где** | В браузере | Отдельное приложение |
| **Автогенерация** | ✅ Да | ❌ Нет (ручная настройка) |
| **Всегда актуально** | ✅ Да | ⚠️ Нужно обновлять |
| **Тестирование** | ✅ Да | ✅ Да |
| **Сохранение запросов** | ❌ Нет | ✅ Да |
| **Для разработки** | ✅ Отлично | ✅ Отлично |
| **Для пользователей** | ✅ Отлично | ❌ Нужно скачать |

**Вывод:** Используй оба!
- Swagger - для документации и быстрого тестирования
- Postman - для сложных сценариев и сохранения коллекций

---

## 🤖 Работа с Claude Code

### Задача: Улучшить документацию API

### ✅ Хороший диалог (эффективный)

```bash
cd ~/projects/enginecampro-v2/backend
claude
```

```
Ты: Нужно улучшить документацию API чтобы она была информативной 
и профессиональной.

Claude Code: Какие части нужно улучшить?

Ты: Улучши документацию EngineCamPro API.

1. Кастомизируй FastAPI app в app/main.py:
   - title: "EngineCamPro API"
   - description: подробное описание с features
   - version: "2.0.0"
   - contact: support email
   - license: MIT

2. Добавь descriptions в app/routers/cams.py:
   - summary для каждого endpoint
   - description с деталями
   - примеры использования

3. Улучши Pydantic модели в app/models/cam.py:
   - Field() с description
   - example для каждого поля
   - Config с json_schema_extra (полный пример)

4. Добавь tags для группировки:
   - "Cams" для кулачков
   - "Projects" для проектов (если есть)

Требования:
- Профессиональный язык
- Конкретные примеры значений
- Указать единицы измерения (mm, degrees)
- Пояснить диапазоны значений

Claude Code: Отлично! Улучшу документацию:

Изменения:
1. app/main.py - кастомизация FastAPI(title, description, ...)
2. app/routers/cams.py - добавлю summary/description к endpoints
3. app/models/cam.py - Field descriptions и examples
4. Tags для группировки

Применить? [Y/n]

Ты: Y

Claude Code: ✅ Обновил документацию:

app/main.py:
- Кастомный title и description
- Contact и license info
- Version 2.0.0

app/routers/cams.py:
- Summary для всех endpoints
- Детальные descriptions
- Examples в docstrings

app/models/cam.py:
- Field descriptions с units
- Examples для каждого поля
- json_schema_extra с полным примером

Проверь: http://localhost:8000/docs
Теперь документация выглядит профессионально!

Ты: Отлично! Теперь добавь endpoint GET /api/health для health check.

Claude Code: Создам simple health check endpoint:
- GET /api/health
- Возвращает {"status": "healthy", "timestamp": ...}
- Без авторизации
- Tags: ["Health"]

Добавить в app/main.py? [Y/n]

Ты: Y

Claude Code: ✅ Добавил health check endpoint:

```python
@app.get(
    "/api/health",
    tags=["Health"],
    summary="Health check",
    description="Check if API is running"
)
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }
```

Протестируй: GET http://localhost:8000/api/health

Ты: Спасибо!
```

**Почему это эффективно:**
- ✅ Комплексное улучшение всех частей
- ✅ Конкретные требования к контенту
- ✅ Итеративное добавление (документация, потом health check)
- ✅ Указаны единицы измерения и диапазоны

---

## 🛠️ Практическое задание

### Задача

Улучши документацию API через диалог с Claude Code. Документация должна быть профессиональной, информативной и с примерами.

### Что нужно создать

- Кастомизация FastAPI app (title, description, contact)
- Descriptions для всех endpoints
- Descriptions в Pydantic моделях
- Examples для полей
- Tags для группировки
- Health check endpoint

### Работа с Claude Code

**Шаг 1:** Открой терминал
```bash
cd ~/projects/enginecampro-v2/backend
claude
```

**Шаг 2:** Диалог с Claude Code

```
Ты: Улучши документацию API

[Укажи что улучшить в app/main.py]
[Укажи что добавить в endpoints]
[Укажи что улучшить в моделях]

Claude Code: [улучшит документацию]

Ты: [итеративно добавляй]
```

**Шаг 3:** Запусти сервер
```bash
uvicorn app.main:app --reload
```

**Шаг 4:** Проверь документацию

Открой в браузере:
```
http://localhost:8000/docs      ← Swagger UI
http://localhost:8000/redoc     ← ReDoc
```

### Что проверить в Swagger

**1. Главная страница**
- ✅ Кастомный title "EngineCamPro API"
- ✅ Детальное description с features
- ✅ Version 2.0.0
- ✅ Contact info

**2. Endpoints сгруппированы**
```
📁 Cams
   🟢 GET    /api/cams
   🟢 POST   /api/cams
   ...

📁 Health
   🟢 GET    /api/health
```

**3. Endpoint documentation**
- Открой POST /api/cams
- ✅ Summary: "Create new cam"
- ✅ Description с деталями
- ✅ Request Body показывает пример
- ✅ Responses показывают 201, 422

**4. Schema documentation**
- Открой Schemas → CamCreate
- ✅ Каждое поле с description
- ✅ Examples указаны
- ✅ Единицы измерения (mm, degrees)
- ✅ Диапазоны указаны

**5. Тестирование**
- Нажми "Try it out" на POST /api/cams
- ✅ Пример данных уже заполнен!
- Нажми "Execute"
- ✅ Создаётся кулачок

### Ожидаемый результат

- ✅ Swagger UI выглядит профессионально
- ✅ Все endpoints документированы
- ✅ Примеры данных есть везде
- ✅ Можно тестировать API прямо в браузере
- ✅ ReDoc тоже работает

### Как проверить

- [ ] Кастомный title и description в /docs
- [ ] Tags группируют endpoints
- [ ] Summaries и descriptions везде
- [ ] Examples в схемах
- [ ] "Try it out" работает
- [ ] ReDoc доступен по /redoc

---

## ❓ Вопросы для самопроверки

1. **Документация API:**
   - Зачем нужна документация?
   - В чём разница между Swagger UI и ReDoc?
   - Где находится OpenAPI spec?

2. **Автогенерация:**
   - Как FastAPI генерирует документацию?
   - Откуда берутся примеры в Swagger?
   - Что такое OpenAPI спецификация?

3. **Улучшение документации:**
   - Как добавить description к endpoint?
   - Как добавить example в Pydantic модель?
   - Как сгруппировать endpoints?

4. **Тестирование:**
   - Как протестировать endpoint в Swagger?
   - В чём преимущество Swagger перед Postman?
   - Когда использовать Postman?

5. **Для EngineCamPro v2:**
   - Кому нужна документация API?
   - Какие tags создать для группировки?
   - Зачем health check endpoint?

---

## 🔗 Связь с другими уроками

**Основано на уроках:**
- Урок 2.2: HTTP методы - endpoints в документации
- Урок 2.3: Pydantic модели - схемы в Swagger

**Подготавливает к урокам:**
- Урок 4.2: Fetch API - Frontend использует документацию
- Урок 5.1: Frontend интеграция - TypeScript из OpenAPI
- Урок 7.2: Production - документация для пользователей

**Связь с EngineCamPro v2:**
Swagger - это "лицо" твоего API:
- Frontend dev понимает как работать с API
- Пользователи MATLAB видят как вызывать
- Демо для потенциальных клиентов

---

## ✅ Критерии завершения урока

**Понимание документации:**
- [ ] Знаю зачем нужна документация API
- [ ] Понимаю аналогию с инструкцией
- [ ] Знаю что такое OpenAPI и Swagger

**Автогенерация:**
- [ ] Понимаю как FastAPI генерирует документацию
- [ ] Знаю где находятся /docs, /redoc, /openapi.json
- [ ] Понимаю связь кода и документации

**Улучшение:**
- [ ] Знаю как добавить descriptions
- [ ] Знаю как добавить examples
- [ ] Знаю как группировать через tags

**Практика:**
- [ ] Улучшил документацию через Claude Code
- [ ] Проверил Swagger UI
- [ ] Протестировал endpoints в браузере
- [ ] Добавил health check endpoint

**Документирование:**
- [ ] Записал выводы
- [ ] Понимаю следующий урок

---

**Следующий урок:** 2.7 Best practices для REST API  
**Время на урок:** 35-50 минут  
**Статус:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён

---

*Версия урока: 1.0*  
*Дата создания: 11 октября 2025*  
*Формат: Vibe Coding с диалогами Claude Code*