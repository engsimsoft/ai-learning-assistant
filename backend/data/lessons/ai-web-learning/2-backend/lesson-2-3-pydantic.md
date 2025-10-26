# Урок 2.3: Pydantic модели и валидация

> **Модуль 2:** Backend разработка  
> **Урок:** 2.3  
> **Длительность:** 50-70 минут  
> **Prerequisite:** Урок 2.2 (HTTP методы и endpoints)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать зачем нужна валидация данных
- ✅ Знать что такое Pydantic и как он работает
- ✅ Различать Request и Response модели
- ✅ Создавать модели с кастомной валидацией через Claude Code
- ✅ Использовать вложенные модели для сложных данных

---

## 📖 Концепция: Валидация данных

### Простое определение

**Валидация данных** - это проверка что входящие данные правильные и безопасные, ПЕРЕД тем как их обработать. Это как контроль качества на заводе: проверяем детали до сборки.

**Pydantic** - это Python библиотека которая делает валидацию автоматически через type hints.

### Зачем это нужно

Без валидации твой код полон проверок:
```python
def create_cam(data):
    if 'name' not in data:
        return error("name is required")
    if not isinstance(data['name'], str):
        return error("name must be string")
    if 'base_radius' not in data:
        return error("base_radius is required")
    if not isinstance(data['base_radius'], float):
        return error("base_radius must be number")
    if data['base_radius'] <= 0:
        return error("base_radius must be positive")
    # ... ещё 20 проверок
    
    # Наконец-то можем работать с данными!
```

**Проблема:** Код превращается в кашу из `if`/`else`! 😵

**Решение:** Pydantic делает всё это автоматически:
```python
class CamCreate(BaseModel):
    name: str
    base_radius: float = Field(gt=0)  # больше нуля
    lift: float = Field(gt=0)
    duration: float = Field(ge=0, le=360)  # 0-360 градусов

# Всё! Pydantic проверит автоматически
```

### 🏭 Аналогия: Контроль качества на заводе

```
БЕЗ ВАЛИДАЦИИ (хаос на заводе)
════════════════════════════════

📦 Детали поступают
↓
🔧 Сборка начинается
↓
💥 Деталь не подходит! Авария!
↓
🔨 Разобрать всё
↓
🔧 Начать заново
└──► Потеря времени и денег


С ВАЛИДАЦИЕЙ (контроль качества)
═════════════════════════════════

📦 Детали поступают
↓
🔍 КОНТРОЛЬ КАЧЕСТВА
    ├─ Размер правильный? ✅
    ├─ Материал правильный? ✅
    ├─ Нет дефектов? ✅
    └─ Допуск в норме? ✅
↓
✅ Годные → на сборку
❌ Брак → назад поставщику
↓
🔧 Сборка БЕЗ проблем
└──► Качественный продукт
```

**Pydantic = отдел контроля качества:**
- 🔍 Проверяет данные ДО обработки
- ❌ Отклоняет плохие данные (422 ошибка)
- ✅ Пропускает только правильные
- 📋 Даёт понятное сообщение об ошибке

### Как работает

```
┌────────────────────────────────────────────────────────────┐
│                  ВАЛИДАЦИЯ ДАННЫХ                          │
│                                                            │
│  HTTP Request                  Pydantic                   │
│  (JSON)                        Модель                     │
│                                                            │
│  {                            class CamCreate:            │
│    "name": "Intake",             name: str               │
│    "base_radius": 25.0,          base_radius: float      │
│    "lift": 10.0,       ──────►   lift: float             │
│    "duration": 120.0             duration: float          │
│  }                                                        │
│                                     ↓                     │
│                              🔍 ВАЛИДАЦИЯ                  │
│                                                            │
│  ❌ ОШИБКА                    ✅ УСПЕХ                     │
│  422 Unprocessable            Python объект:              │
│  {                            cam = CamCreate(            │
│    "detail": [                  name="Intake",            │
│      {                          base_radius=25.0,         │
│        "field": "lift",         lift=10.0,                │
│        "msg": "must be > 0"     duration=120.0            │
│      }                        )                           │
│    ]                                                      │
│  }                                  ↓                     │
│                            Твоя бизнес-логика             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 💡 Основы Pydantic

### Type hints и автоматическая валидация

```python
from pydantic import BaseModel, Field

class CamCreate(BaseModel):
    name: str                    # Обязательное поле, строка
    base_radius: float           # Обязательное поле, число
    lift: float                  # Обязательное поле, число
    duration: float              # Обязательное поле, число
    project_id: int | None = None  # Опциональное поле
```

**Что проверяет Pydantic автоматически:**
- ✅ Поле присутствует (если обязательное)
- ✅ Тип данных правильный (`str`, `float`, `int`)
- ✅ Конвертация типов (если возможна: `"25"` → `25`)
- ✅ Вложенные модели
- ✅ Списки и словари

**Если ошибка → 422 Unprocessable Entity + детали!**

### Field валидаторы

```python
from pydantic import BaseModel, Field

class CamCreate(BaseModel):
    name: str = Field(
        min_length=1,           # Минимум 1 символ
        max_length=100          # Максимум 100 символов
    )
    base_radius: float = Field(
        gt=0,                   # Greater than (>)
        le=1000,                # Less or equal (<=)
        description="Base radius in mm"
    )
    lift: float = Field(
        gt=0,
        le=100,
        description="Cam lift in mm"
    )
    duration: float = Field(
        ge=0,                   # Greater or equal (>=)
        le=360,                 # 0-360 градусов
        description="Duration in degrees"
    )
```

**Операторы сравнения:**
- `gt` - greater than (>)
- `ge` - greater or equal (>=)
- `lt` - less than (<)
- `le` - less or equal (<=)

### Кастомные валидаторы

```python
from pydantic import BaseModel, field_validator

class CamCreate(BaseModel):
    name: str
    base_radius: float
    lift: float
    duration: float
    
    @field_validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty or whitespace')
        return v.strip()  # Убираем пробелы
    
    @field_validator('lift')
    def lift_must_be_reasonable(cls, v):
        if v > 50:
            raise ValueError('Lift over 50mm is unrealistic')
        return v
```

---

## 🔄 Request vs Response модели

### Зачем разделять?

**Request модель** - что клиент отправляет (без ID, timestamp)
**Response модель** - что сервер возвращает (с ID, timestamp)

```python
# REQUEST - что клиент отправляет
class CamCreate(BaseModel):
    name: str
    base_radius: float
    lift: float
    duration: float
    project_id: int | None = None

# RESPONSE - что сервер возвращает
class CamResponse(BaseModel):
    id: int                      # 👈 добавлено сервером
    name: str
    base_radius: float
    lift: float
    duration: float
    project_id: int | None
    created_at: datetime         # 👈 добавлено сервером
    updated_at: datetime         # 👈 добавлено сервером
    
    class Config:
        from_attributes = True   # для работы с ORM
```

### Иерархия моделей (DRY principle)

```python
# БАЗОВАЯ модель - общие поля
class CamBase(BaseModel):
    name: str
    base_radius: float = Field(gt=0, le=1000)
    lift: float = Field(gt=0, le=100)
    duration: float = Field(ge=0, le=360)
    project_id: int | None = None

# CREATE - для создания (наследует базовую)
class CamCreate(CamBase):
    pass  # все поля из CamBase

# UPDATE - для обновления (все поля опциональны)
class CamUpdate(BaseModel):
    name: str | None = None
    base_radius: float | None = Field(None, gt=0, le=1000)
    lift: float | None = Field(None, gt=0, le=100)
    duration: float | None = Field(None, ge=0, le=360)
    project_id: int | None = None

# RESPONSE - для ответа (добавляем ID и timestamps)
class CamResponse(CamBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
```

**DRY = Don't Repeat Yourself:**
- Общие поля в `CamBase`
- `CamCreate` наследует всё
- `CamUpdate` делает всё опциональным
- `CamResponse` добавляет служебные поля

---

## 🏗️ Вложенные модели

### Для сложных структур

```python
# Модель для точки профиля
class ProfilePoint(BaseModel):
    angle: float = Field(ge=0, le=360)
    radius: float = Field(gt=0)

# Модель для результата расчёта
class ProfileResult(BaseModel):
    profile: list[ProfilePoint]       # Список точек
    max_velocity: float
    max_acceleration: float
    calculation_time: float

# Использование в endpoint
@app.post("/api/cams/{id}/calculate", response_model=ProfileResult)
def calculate_profile(id: int, params: CalculationParams):
    # Расчёт...
    return ProfileResult(
        profile=[
            ProfilePoint(angle=0, radius=25.0),
            ProfilePoint(angle=10, radius=26.5),
            # ...
        ],
        max_velocity=150.5,
        max_acceleration=2500.0,
        calculation_time=0.045
    )
```

---

## 💡 Контекст применения

### Когда использовать Pydantic?

**Pydantic идеален для:**
- ✅ **FastAPI приложений** - встроенная интеграция
- ✅ REST API валидации
- ✅ Конфигурационных файлов
- ✅ Работы с внешними API

**Для EngineCamPro v2:**
```
✅ Валидация параметров кулачков
✅ Валидация расчётных данных
✅ Проверка диапазонов (lift 0-100mm, duration 0-360°)
✅ Автоматическая документация OpenAPI
✅ Type safety - ИИ понимает структуру
```

### Альтернативы Pydantic

| Подход | Когда использовать |
|--------|-------------------|
| **Pydantic** ✅ | FastAPI, REST API, type safety важна |
| **Marshmallow** | Flask, Django REST, legacy проекты |
| **Dataclasses** | Простые структуры данных без валидации |
| **Manual validation** ❌ | Никогда (слишком много кода) |

---

## 🤖 Работа с Claude Code

### Задача: Создать Pydantic модели для EngineCamPro

### ✅ Хороший диалог (эффективный)

```bash
cd ~/projects/enginecampro-v2/backend
claude
```

```
Ты: Привет! Нужно создать Pydantic модели для кулачков с валидацией.

Claude Code: Какие поля нужны и какие требования к валидации?

Ты: Создай Pydantic модели для кулачковых механизмов.

Поля:
- name: str (1-100 символов, не пустое)
- base_radius: float (больше 0, макс 1000 мм)
- lift: float (больше 0, макс 100 мм)
- duration: float (0-360 градусов)
- project_id: int | None (опционально)

Модели (иерархия):
1. CamBase - базовые поля с валидацией
2. CamCreate - для POST запросов (наследует CamBase)
3. CamUpdate - для PUT запросов (все поля опциональны)
4. CamResponse - для ответов (+ id, created_at, updated_at)

Требования:
- Используй Field() для валидации
- Добавь описания (description) для документации
- Кастомный валидатор для name (trim whitespace)
- Config: from_attributes = True для ORM

Структура файлов:
- app/models/__init__.py
- app/models/cam.py       (все модели здесь)

Claude Code: Отлично! Создам иерархию Pydantic моделей.

```
app/models/
├── __init__.py
└── cam.py
    ├── CamBase (базовая)
    ├── CamCreate (для создания)
    ├── CamUpdate (для обновления)
    └── CamResponse (для ответа)
```

Валидация:
- Field с gt/le для диапазонов
- field_validator для name
- from_attributes для ORM compatibility

Применить? [Y/n]

Ты: Y

Claude Code: ✅ Создал app/models/cam.py:
- CamBase с валидацией через Field()
- CamCreate наследует CamBase
- CamUpdate с опциональными полями
- CamResponse с id и timestamps
- Кастомный валидатор для name

Модели готовы! Теперь обновить endpoints?

Ты: Да, обнови app/routers/cams.py чтобы использовать эти модели.

Claude Code: Обновлю:
- Импорты моделей
- Type hints в параметрах
- response_model в декораторах
- Автоматическая валидация запросов

Применить? [Y/n]

Ты: Y

Claude Code: ✅ Обновил app/routers/cams.py:
- Все endpoints используют Pydantic модели
- Автоматическая валидация входных данных
- response_model для типизированных ответов
- 422 ошибки при неверных данных

Протестируй в Swagger - попробуй отправить неверные данные!

Ты: Теперь добавь модели для результата расчёта профиля.

Claude Code: Создам:
- ProfilePoint (angle, radius)
- ProfileResult (profile, max_velocity, max_acceleration)
- CalculationParams (параметры для расчёта)

Добавить в app/models/cam.py? [Y/n]

Ты: Y

Claude Code: ✅ Добавил модели для расчётов.

Теперь можешь использовать в endpoint:
```python
@router.post("/{id}/calculate", response_model=ProfileResult)
def calculate_profile(id: int, params: CalculationParams):
    ...
```

Ты: Отлично! Спасибо!
```

**Почему это эффективно:**
- ✅ Чёткая иерархия моделей
- ✅ Требования к валидации указаны
- ✅ Итеративное добавление (сначала базовые, потом для расчётов)
- ✅ ИИ предлагает следующие шаги

---

## 🛠️ Практическое задание

### Задача

Создай полную иерархию Pydantic моделей для EngineCamPro через диалог с Claude Code. Модели должны включать валидацию и поддержку расчётов.

### Что нужно создать

**Базовые модели:**
- `CamBase` - общие поля
- `CamCreate` - для создания
- `CamUpdate` - для обновления
- `CamResponse` - для ответов

**Модели для расчётов:**
- `ProfilePoint` - точка профиля (angle, radius)
- `CalculationParams` - параметры расчёта
- `ProfileResult` - результат расчёта

**Валидация:**
- Field() валидаторы для диапазонов
- Кастомный валидатор для name
- Описания для документации

### Работа с Claude Code

**Шаг 1:** Открой терминал
```bash
cd ~/projects/enginecampro-v2/backend
claude
```

**Шаг 2:** Диалог с Claude Code

```
Ты: Создай Pydantic модели для кулачков с валидацией.

[Укажи поля и требования]
[Укажи иерархию моделей]
[Укажи валидацию]

Claude Code: [создаст модели]

Ты: [итеративно добавляй функции]
```

**Шаг 3:** Обнови endpoints
```
Ты: Обнови endpoints чтобы использовать эти модели

Claude Code: [обновит routers/cams.py]
```

**Шаг 4:** Запусти сервер
```bash
uvicorn app.main:app --reload
```

**Шаг 5:** Тестирование валидации в Swagger

### Что протестировать

**1. Валидация типов**
```json
POST /api/cams
{
  "name": "Test Cam",
  "base_radius": "not a number",  ← должна быть ошибка
  "lift": 10.0,
  "duration": 120.0
}
```
→ 422 с сообщением об ошибке

**2. Валидация диапазонов**
```json
{
  "name": "Test",
  "base_radius": -5.0,    ← отрицательное
  "lift": 150.0,          ← больше 100
  "duration": 400.0       ← больше 360
}
```
→ 422 для каждого поля

**3. Обязательные поля**
```json
{
  "name": "Test"
  // base_radius, lift, duration отсутствуют
}
```
→ 422 с перечислением отсутствующих полей

**4. Кастомная валидация**
```json
{
  "name": "   ",          ← только пробелы
  "base_radius": 25.0,
  "lift": 10.0,
  "duration": 120.0
}
```
→ 422 с сообщением "Name cannot be empty"

**5. Успешная валидация**
```json
{
  "name": "Intake Cam",
  "base_radius": 25.0,
  "lift": 10.0,
  "duration": 120.0,
  "project_id": 1
}
```
→ 201 Created

### Ожидаемый результат

- ✅ Модели созданы с правильной иерархией
- ✅ Все endpoints используют Pydantic модели
- ✅ Валидация типов работает (422 для неверных типов)
- ✅ Валидация диапазонов работает
- ✅ Кастомный валидатор работает
- ✅ Swagger показывает красивую документацию

### Как проверить

- [ ] Модели созданы в app/models/cam.py
- [ ] Endpoints обновлены в app/routers/cams.py
- [ ] Swagger показывает модели с описаниями
- [ ] Неверные типы → 422
- [ ] Неверные диапазоны → 422
- [ ] Пустое имя → 422
- [ ] Правильные данные → 201/200

---

## ❓ Вопросы для самопроверки

1. **Валидация данных:**
   - Зачем нужна валидация?
   - Что происходит без валидации?
   - Как Pydantic упрощает валидацию?

2. **Pydantic основы:**
   - Что такое BaseModel?
   - Как работают type hints?
   - Что такое Field()?

3. **Валидаторы:**
   - В чём разница между gt и ge?
   - Как создать кастомный валидатор?
   - Когда использовать field_validator?

4. **Request vs Response:**
   - В чём разница между CamCreate и CamResponse?
   - Зачем разделять модели?
   - Что такое DRY principle?

5. **Для EngineCamPro v2:**
   - Какие диапазоны для параметров кулачков?
   - Какие модели нужны для расчётов?
   - Зачем вложенные модели для профиля?

6. **Работа с Claude Code:**
   - Как указать требования к валидации?
   - Как итеративно добавлять модели?
   - Как тестировать валидацию в Swagger?

---

## 🔗 Связь с другими уроками

**Основано на уроках:**
- Урок 2.1: Введение в FastAPI - базовая структура
- Урок 2.2: HTTP методы - endpoints для CRUD

**Подготавливает к урокам:**
- Урок 2.4: Обработка ошибок - 422 validation errors
- Урок 3.2: SQLAlchemy ORM - from_attributes для БД
- Урок 5.1: Frontend интеграция - TypeScript types из моделей

**Связь с EngineCamPro v2:**
Pydantic модели - это "контракт" между Frontend и Backend:
- Frontend знает какие данные отправлять
- Backend знает что ожидать
- Swagger генерирует документацию автоматически
- TypeScript типы можно сгенерировать из Pydantic

---

## ✅ Критерии завершения урока

**Понимание валидации:**
- [ ] Знаю зачем нужна валидация
- [ ] Понимаю аналогию с контролем качества
- [ ] Знаю как Pydantic работает

**Pydantic основы:**
- [ ] Понимаю BaseModel и type hints
- [ ] Знаю как использовать Field()
- [ ] Могу создать кастомный валидатор

**Иерархия моделей:**
- [ ] Понимаю разницу Request vs Response
- [ ] Знаю зачем CamBase, CamCreate, CamUpdate
- [ ] Понимаю DRY principle

**Практика:**
- [ ] Создал модели через Claude Code
- [ ] Обновил endpoints
- [ ] Протестировал валидацию в Swagger
- [ ] Видел 422 ошибки с деталями

**Документирование:**
- [ ] Записал выводы
- [ ] Понимаю следующий урок

---

**Следующий урок:** 2.4 Обработка ошибок и HTTP статус коды  
**Время на урок:** 50-70 минут  
**Статус:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён

---

*Версия урока: 1.0*  
*Дата создания: 11 октября 2025*  
*Формат: Vibe Coding с диалогами Claude Code*