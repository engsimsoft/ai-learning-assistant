# Урок 2.4: Обработка ошибок и HTTP статус коды

> **Модуль 2:** Backend разработка  
> **Урок:** 2.4  
> **Длительность:** 45-60 минут  
> **Prerequisite:** Урок 2.3 (Pydantic модели и валидация)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать систему HTTP статус кодов
- ✅ Знать когда использовать какой код
- ✅ Создавать информативные сообщения об ошибках
- ✅ Использовать HTTPException в FastAPI
- ✅ Обрабатывать ошибки через диалог с Claude Code

---

## 📖 Концепция: HTTP статус коды

### Простое определение

**HTTP статус код** - это трёхзначное число которое сервер возвращает вместе с ответом, показывая ЧТО случилось с запросом. Это как "смайлик" от сервера: 😊 всё хорошо, 🤔 не нашёл, 😡 ошибка.

### Зачем это нужно

Без правильных статус кодов клиент не знает что произошло:
```json
// Всегда возвращается 200 OK, даже при ошибке
{
  "success": false,
  "error": "User not found"
}
```

**Проблема:** 
- Браузер думает что всё OK (200)
- Сложно обрабатывать ошибки на Frontend
- Нет стандарта - каждый API свой формат

**Решение:** HTTP статус коды - стандартная система:
```
GET /api/users/999

404 Not Found  ← статус код говорит "не нашёл"
{
  "detail": "User not found"
}
```

### 🧭 Аналогия: GPS навигатор

Представь GPS навигатор в машине:

```
БЕЗ СТАТУС КОДОВ (плохой GPS)
═══════════════════════════════

"Едь прямо"
"Едь прямо"
"Едь прямо"
"Произошла ошибка"   ← что случилось? непонятно!


С СТАТУС КОДАМИ (хороший GPS)
════════════════════════════════

200: "✅ Маршрут построен успешно"
404: "🤔 Адрес не найден в базе"
400: "❌ Некорректный адрес"
500: "💥 Ошибка системы GPS"
503: "⏸️ GPS сервис недоступен"

Водитель МОМЕНТАЛЬНО понимает ЧТО случилось!
```

**HTTP коды = понятные сигналы:**
- 2xx = ✅ Успешно
- 4xx = ❌ Ошибка клиента (ты что-то не так отправил)
- 5xx = 💥 Ошибка сервера (у нас проблемы)

### Как работает

```
┌──────────────────────────────────────────────────────────┐
│                   HTTP ОТВЕТ                             │
│                                                          │
│   СТАТУС КОД  +  ТЕЛО ОТВЕТА                             │
│       ↓             ↓                                    │
│                                                          │
│  ✅ 200 OK                                                │
│  {                                                       │
│    "id": 123,                                            │
│    "name": "Intake Cam"                                  │
│  }                                                       │
│                                                          │
│  ❌ 404 Not Found                                         │
│  {                                                       │
│    "detail": "Cam with ID 999 not found"                 │
│  }                                                       │
│                                                          │
│  ⚠️ 422 Validation Error                                 │
│  {                                                       │
│    "detail": [                                           │
│      {                                                   │
│        "loc": ["body", "lift"],                          │
│        "msg": "ensure this value is greater than 0"      │
│      }                                                   │
│    ]                                                     │
│  }                                                       │
│                                                          │
└──────────────────────────────────────────────────────────┘

Код говорит ЧТО случилось
Тело объясняет ПОДРОБНОСТИ
```

---

## 💡 Основные HTTP статус коды

### 2xx - Успешные ответы ✅

#### 200 OK - Успешно
**Когда:** GET, PUT, DELETE успешны
```python
@router.get("/cams/{id}", status_code=200)
def get_cam(id: int):
    cam = find_cam(id)
    return cam
```

#### 201 Created - Создано
**Когда:** POST успешно создал новый ресурс
```python
@router.post("/cams", status_code=201)
def create_cam(cam: CamCreate):
    new_cam = save_cam(cam)
    return new_cam
```

#### 204 No Content - Без содержимого
**Когда:** DELETE успешно удалил, ничего не возвращается
```python
@router.delete("/cams/{id}", status_code=204)
def delete_cam(id: int):
    delete_from_db(id)
    # return ничего не нужно
```

---

### 4xx - Ошибки клиента ❌

#### 400 Bad Request - Плохой запрос
**Когда:** Запрос синтаксически неправильный
```python
raise HTTPException(
    status_code=400,
    detail="Invalid JSON format"
)
```

#### 404 Not Found - Не найдено
**Когда:** Ресурс не существует
```python
cam = find_cam(id)
if cam is None:
    raise HTTPException(
        status_code=404,
        detail=f"Cam with ID {id} not found"
    )
return cam
```

#### 422 Unprocessable Entity - Ошибка валидации
**Когда:** Pydantic не смог провалидировать данные
```python
# FastAPI делает автоматически!
@router.post("/cams")
def create_cam(cam: CamCreate):  # ← если неверные данные → 422
    ...
```

---

### 5xx - Ошибки сервера 💥

#### 500 Internal Server Error - Внутренняя ошибка
**Когда:** Неожиданная ошибка в коде
```python
try:
    result = complex_calculation()
except Exception as e:
    raise HTTPException(
        status_code=500,
        detail=f"Calculation error: {str(e)}"
    )
```

#### 503 Service Unavailable - Сервис недоступен
**Когда:** База данных недоступна, внешний сервис не отвечает
```python
if not database.is_connected():
    raise HTTPException(
        status_code=503,
        detail="Database is temporarily unavailable"
    )
```

---

## 📋 Таблица статус кодов для REST API

| Код | Название | Когда использовать | Пример |
|-----|----------|-------------------|--------|
| **200** | OK | GET, PUT, DELETE успешны | `GET /api/cams/5` |
| **201** | Created | POST создал ресурс | `POST /api/cams` |
| **204** | No Content | DELETE без возврата данных | `DELETE /api/cams/5` |
| **400** | Bad Request | Неверный формат запроса | Некорректный JSON |
| **404** | Not Found | Ресурс не найден | `GET /api/cams/999` |
| **422** | Validation Error | Pydantic валидация не прошла | `lift: -5` |
| **500** | Internal Error | Ошибка в коде сервера | Деление на ноль |
| **503** | Service Unavailable | БД недоступна | Connection timeout |

---

## 🛠️ HTTPException в FastAPI

### Базовое использование

```python
from fastapi import HTTPException

@router.get("/cams/{id}")
def get_cam(id: int):
    cam = find_cam_in_db(id)
    
    if cam is None:
        raise HTTPException(
            status_code=404,
            detail=f"Cam with ID {id} not found"
        )
    
    return cam
```

### С дополнительными headers

```python
raise HTTPException(
    status_code=401,
    detail="Not authenticated",
    headers={"WWW-Authenticate": "Bearer"}
)
```

### Информативные сообщения

```python
# ❌ ПЛОХО - неясное сообщение
raise HTTPException(status_code=404, detail="Not found")

# ✅ ХОРОШО - понятное сообщение
raise HTTPException(
    status_code=404,
    detail=f"Cam with ID {cam_id} does not exist in project {project_id}"
)

# ✅ ОТЛИЧНО - с подсказкой
raise HTTPException(
    status_code=404,
    detail=f"Cam with ID {cam_id} not found. Use GET /api/cams to see all available cams."
)
```

---

## 🎯 Паттерны обработки ошибок

### 1. Проверка существования ресурса

```python
@router.get("/cams/{id}")
def get_cam(id: int):
    cam = db.get(id)
    
    if cam is None:
        raise HTTPException(
            status_code=404,
            detail=f"Cam {id} not found"
        )
    
    return cam
```

### 2. Обработка ошибок расчётов

```python
@router.post("/cams/{id}/calculate")
def calculate_profile(id: int, params: CalcParams):
    cam = db.get(id)
    if not cam:
        raise HTTPException(404, f"Cam {id} not found")
    
    try:
        profile = calculate_cam_profile(cam, params)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid calculation parameters: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Calculation failed: {str(e)}"
        )
    
    return profile
```

### 3. Проверка бизнес-правил

```python
@router.put("/cams/{id}")
def update_cam(id: int, cam_update: CamUpdate):
    existing_cam = db.get(id)
    if not existing_cam:
        raise HTTPException(404, f"Cam {id} not found")
    
    # Проверка бизнес-правил
    if cam_update.lift and cam_update.lift > existing_cam.base_radius:
        raise HTTPException(
            status_code=400,
            detail="Lift cannot be greater than base radius"
        )
    
    updated_cam = db.update(id, cam_update)
    return updated_cam
```

---

## 💡 Контекст применения

### Для EngineCamPro v2

```
┌──────────────────────────────────────────────────────────┐
│         ОШИБКИ В ENGINECAMPRO V2                         │
│                                                          │
│  200 ✅ GET /api/cams/5                                   │
│         → Кулачок найден и возвращён                     │
│                                                          │
│  201 ✅ POST /api/cams                                    │
│         → Новый кулачок создан                           │
│                                                          │
│  404 ❌ GET /api/cams/999                                 │
│         → "Cam with ID 999 not found"                    │
│                                                          │
│  422 ❌ POST /api/cams {lift: -5}                         │
│         → "lift must be greater than 0"                  │
│                                                          │
│  400 ❌ POST /api/cams/{id}/calculate {duration: 500}    │
│         → "Duration must be between 0-360 degrees"       │
│                                                          │
│  500 💥 POST /api/cams/{id}/calculate                     │
│         → "NumPy calculation error: division by zero"    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Best Practices для сообщений

**Принципы:**
1. **Конкретность** - укажи что именно не так
2. **Контекст** - добавь ID, параметры
3. **Помощь** - подскажи как исправить
4. **Профессионализм** - не используй сленг

```python
# ❌ ПЛОХО
"Error"
"Something went wrong"
"Invalid input"

# ✅ ХОРОШО
"Cam with ID 123 not found"
"Lift value -5.0 must be positive"
"Calculation failed: duration exceeds 360 degrees"

# ✅ ОТЛИЧНО (с подсказкой)
"Cam with ID 123 not found. Use GET /api/cams to see all available cams."
"Lift value -5.0 must be positive (0-100mm). Please check your input."
"Calculation failed: duration 400° exceeds maximum 360°. Adjust duration parameter."
```

---

## 🤖 Работа с Claude Code

### Задача: Добавить обработку ошибок в CRUD endpoints

### ✅ Хороший диалог (эффективный)

```bash
cd ~/projects/enginecampro-v2/backend
claude
```

```
Ты: Нужно добавить правильную обработку ошибок в CRUD endpoints для 
кулачков.

Claude Code: Какие проверки и статус коды нужны?

Ты: Добавь обработку ошибок в app/routers/cams.py

Требования:

1. GET /api/cams/{id}:
   - 404 если кулачок не найден
   - Сообщение: "Cam with ID {id} not found"

2. POST /api/cams:
   - 422 автоматически (Pydantic)
   - 201 при успехе

3. PUT /api/cams/{id}:
   - 404 если кулачок не найден
   - 400 если lift > base_radius (бизнес-правило)
   - 200 при успехе

4. DELETE /api/cams/{id}:
   - 404 если кулачок не найден
   - 200 при успехе

5. POST /api/cams/{id}/calculate:
   - 404 если кулачок не найден
   - 400 для ошибок параметров (ValueError)
   - 500 для ошибок расчёта (Exception)
   - 200 при успехе

Используй HTTPException с информативными сообщениями.

Claude Code: Отлично! Добавлю обработку ошибок:

Изменения:
- GET /api/cams/{id} - проверка на None → 404
- PUT /api/cams/{id} - проверка на None → 404, бизнес-правила → 400
- DELETE /api/cams/{id} - проверка на None → 404
- POST /api/cams/{id}/calculate - try/except для расчётов

Применить? [Y/n]

Ты: Y

Claude Code: ✅ Обновил app/routers/cams.py:
- Все endpoints проверяют существование ресурса
- HTTPException с информативными сообщениями
- Правильные статус коды
- Try/except для расчётов

Протестируй в Swagger:
- Попробуй несуществующий ID → 404
- Попробуй неверные данные → 422
- Попробуй lift > base_radius → 400

Ты: Отлично! Теперь добавь глобальный error handler для 
неожиданных ошибок.

Claude Code: Создам custom exception handler:
- Ловит все необработанные Exception
- Возвращает 500 с безопасным сообщением
- Логирует детали для разработчиков

Добавить в app/main.py? [Y/n]

Ты: Y

Claude Code: ✅ Добавил глобальный exception handler:
```python
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An unexpected error occurred. Please try again later."
        }
    )
```

Теперь любая необработанная ошибка вернёт безопасное сообщение!

Ты: Спасибо!
```

**Почему это эффективно:**
- ✅ Все cases перечислены
- ✅ Статус коды указаны
- ✅ Бизнес-правила включены
- ✅ Итеративное улучшение (сначала основные, потом глобальный handler)

---

## 🛠️ Практическое задание

### Задача

Добавь правильную обработку ошибок во все CRUD endpoints через диалог с Claude Code. API должен возвращать информативные сообщения и правильные статус коды.

### Что нужно создать

- Проверки существования ресурсов (404)
- Валидация бизнес-правил (400)
- Обработка ошибок расчётов (400/500)
- Информативные сообщения об ошибках
- Глобальный exception handler

### Работа с Claude Code

**Шаг 1:** Открой терминал
```bash
cd ~/projects/enginecampro-v2/backend
claude
```

**Шаг 2:** Диалог с Claude Code

```
Ты: Добавь обработку ошибок в CRUD endpoints

[Перечисли все endpoints]
[Укажи какие проверки нужны]
[Укажи статус коды]
[Укажи формат сообщений]

Claude Code: [добавит error handling]

Ты: [итеративно улучшай]
```

**Шаг 3:** Запусти сервер
```bash
uvicorn app.main:app --reload
```

**Шаг 4:** Тестирование в Swagger

### Что протестировать

**1. 404 Not Found**
```
GET /api/cams/999
```
→ 404 с сообщением "Cam with ID 999 not found"

**2. 422 Validation Error**
```json
POST /api/cams
{
  "name": "Test",
  "base_radius": -5.0,  ← отрицательное
  "lift": 10.0,
  "duration": 120.0
}
```
→ 422 с деталями ошибки

**3. 400 Bad Request (бизнес-правило)**
```json
PUT /api/cams/1
{
  "name": "Test",
  "base_radius": 25.0,
  "lift": 30.0,        ← больше base_radius
  "duration": 120.0
}
```
→ 400 с сообщением "Lift cannot be greater than base radius"

**4. 500 Internal Error**
```
POST /api/cams/1/calculate
{
  "duration": 0  ← вызовет деление на ноль в расчётах
}
```
→ 500 с безопасным сообщением

**5. 201 Created (успех)**
```json
POST /api/cams
{
  "name": "Test Cam",
  "base_radius": 25.0,
  "lift": 10.0,
  "duration": 120.0
}
```
→ 201 с созданным объектом

### Ожидаемый результат

- ✅ Все endpoints возвращают правильные статус коды
- ✅ Сообщения об ошибках информативные
- ✅ 404 для несуществующих ресурсов
- ✅ 400 для нарушения бизнес-правил
- ✅ 422 для ошибок валидации (автоматически)
- ✅ 500 для неожиданных ошибок

### Как проверить

- [ ] GET несуществующего → 404
- [ ] POST с неверными данными → 422
- [ ] PUT с нарушением правил → 400
- [ ] DELETE несуществующего → 404
- [ ] Расчёт с ошибкой → 500
- [ ] Успешные операции → 200/201
- [ ] Сообщения понятные и конкретные

---

## ❓ Вопросы для самопроверки

1. **HTTP статус коды:**
   - В чём разница между 2xx, 4xx, 5xx?
   - Когда использовать 200 vs 201?
   - В чём разница между 400 и 422?

2. **Обработка ошибок:**
   - Что такое HTTPException?
   - Как правильно составить сообщение об ошибке?
   - Зачем нужен глобальный exception handler?

3. **Для EngineCamPro v2:**
   - Какие ошибки могут возникнуть при расчётах?
   - Какой код для "кулачок не найден"?
   - Какие бизнес-правила нужно проверять?

4. **Best practices:**
   - Как сделать сообщение информативным?
   - Когда использовать 400 vs 500?
   - Зачем указывать контекст в ошибке?

---

## 🔗 Связь с другими уроками

**Основано на уроках:**
- Урок 2.2: HTTP методы - статус коды для CRUD
- Урок 2.3: Pydantic - автоматические 422 ошибки

**Подготавливает к урокам:**
- Урок 3.2: База данных - обработка DB ошибок
- Урок 5.2: Frontend ошибки - как Frontend обрабатывает коды
- Урок 6.1: Аутентификация - 401, 403 ошибки

**Связь с EngineCamPro v2:**
Правильные ошибки = хороший UX:
- Frontend понимает что случилось
- Пользователь видит понятное сообщение
- Разработчик может дебажить быстрее

---

## ✅ Критерии завершения урока

**Понимание статус кодов:**
- [ ] Знаю систему HTTP кодов (2xx, 4xx, 5xx)
- [ ] Понимаю когда какой код использовать
- [ ] Знаю разницу между 400, 404, 422, 500

**Обработка ошибок:**
- [ ] Понимаю HTTPException в FastAPI
- [ ] Знаю как создавать информативные сообщения
- [ ] Понимаю try/except для расчётов

**Практика:**
- [ ] Добавил error handling через Claude Code
- [ ] Протестировал все коды в Swagger
- [ ] Проверил сообщения об ошибках

**Документирование:**
- [ ] Записал выводы
- [ ] Понимаю следующий урок

---

**Следующий урок:** 2.5 Middleware и CORS  
**Время на урок:** 45-60 минут  
**Статус:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён

---

*Версия урока: 1.0*  
*Дата создания: 11 октября 2025*  
*Формат: Vibe Coding с диалогами Claude Code*