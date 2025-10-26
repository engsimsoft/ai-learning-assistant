# Урок 2.7: Best Practices для REST API

> **Модуль 2:** Backend разработка  
> **Урок:** 2.7  
> **Длительность:** 50-65 минут  
> **Prerequisite:** Урок 2.6 (Автодокументация API)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать принципы хорошего REST API дизайна
- ✅ Знать best practices для URL naming
- ✅ Понимать версионирование API (v1, v2)
- ✅ Применять pagination, filtering, sorting
- ✅ Проектировать масштабируемое API

---

## 📖 Концепция: Почему Best Practices важны

### Простое определение

**Best Practices** - это проверенные временем правила и подходы, которые делают API понятным, последовательным и удобным для использования.

Хороший API - как хорошо спроектированный город:
- Понятная навигация (URL структура)
- Единый стиль (naming conventions)
- Расширяемость (версионирование)
- Эффективность (pagination, filtering)

### Зачем это нужно

**Плохой API (без best practices):**
```
GET /get-all-cams
GET /getCAM?ID=5
POST /new_cam
PUT /updateCam/7
DELETE /cams/remove/9
GET /api/v2/cams/list?page=1&sort=name_asc&filter_by_type=radial
```

**Проблемы:**
- ❌ Непоследовательные URL
- ❌ Смешанные стили (snake_case, camelCase)
- ❌ Разная структура для похожих операций
- ❌ Frontend разработчик запутается
- ❌ Сложно поддерживать

**Хороший API (с best practices):**
```
GET    /api/v1/cams                # Список кулачков
GET    /api/v1/cams/{id}           # Один кулачок
POST   /api/v1/cams                # Создать
PUT    /api/v1/cams/{id}           # Обновить
DELETE /api/v1/cams/{id}           # Удалить

GET    /api/v1/cams?page=1&sort=name&filter=radial  # С фильтрами
```

**Преимущества:**
- ✅ Предсказуемая структура
- ✅ Единый стиль
- ✅ Легко понять и использовать
- ✅ Масштабируется

### 🏙️ Аналогия: Планировка города

```
ПЛОХАЯ ПЛАНИРОВКА (без правил)
═══════════════════════════════

🏘️ Улица "Первая"
🏘️ Переулок "1-ый"
🏘️ Проспект "One"
🏘️ Аллея "Один"

Все означают одно, но названы по-разному! 
Турист заблудится! 😵


ХОРОШАЯ ПЛАНИРОВКА (с правилами)
════════════════════════════════

📍 1-я улица  → идёт с севера на юг
📍 2-я улица  → идёт с севера на юг
📍 3-я улица  → идёт с севера на юг

📍 Проспект A → идёт с запада на восток
📍 Проспект B → идёт с запада на восток

Понятная система! Легко ориентироваться! ✅
```

**REST API Best Practices = правила планировки города:**
- Единая система именования
- Предсказуемая структура
- Легко найти что нужно
- Новичок сразу понимает логику

---

## 📐 Best Practice #1: RESTful URL Design

### Принципы построения URL

#### 1️⃣ **Используй существительные, а не глаголы**

❌ **ПЛОХО:**
```
GET  /getCams
POST /createCam
PUT  /updateCam/5
DELETE /deleteCam/5
```

✅ **ХОРОШО:**
```
GET    /cams        # Список кулачков
POST   /cams        # Создать кулачок
PUT    /cams/5      # Обновить кулачок 5
DELETE /cams/5      # Удалить кулачок 5
```

**Почему:** HTTP метод уже говорит о действии (GET = получить, POST = создать)

---

#### 2️⃣ **Используй множественное число для коллекций**

❌ **ПЛОХО:**
```
GET /cam         # Один кулачок или все?
GET /cam/5       # Запутанно
```

✅ **ХОРОШО:**
```
GET /cams        # Коллекция кулачков
GET /cams/5      # Конкретный кулачок
```

---

#### 3️⃣ **Иерархия ресурсов через вложенность**

❌ **ПЛОХО:**
```
GET /projectCams?project_id=3
POST /createCamInProject
```

✅ **ХОРОШО:**
```
GET    /projects/3/cams           # Все кулачки проекта 3
POST   /projects/3/cams           # Создать кулачок в проекте 3
GET    /projects/3/cams/7         # Кулачок 7 в проекте 3
DELETE /projects/3/cams/7         # Удалить кулачок 7 из проекта 3
```

**Логика:** URL отражает структуру данных

---

#### 4️⃣ **Используй kebab-case для URL**

❌ **ПЛОХО:**
```
/camProfiles
/cam_profiles
/CamProfiles
```

✅ **ХОРОШО:**
```
/cam-profiles     # Единый стиль
/cam-calculations
/user-settings
```

---

#### 5️⃣ **Не используй trailing slash**

❌ **ПЛОХО:**
```
/api/cams/      # Лишний слэш
```

✅ **ХОРОШО:**
```
/api/cams       # Без слэша
```

**Исключение:** И `/api/cams` и `/api/cams/` должны работать одинаково

---

## 🔢 Best Practice #2: Версионирование API

### Зачем нужно версионирование

**Проблема:** API меняется со временем, но старые клиенты должны продолжать работать!

```
Сейчас:
GET /cams  →  {"id": 1, "name": "Cam A"}

Через год (нужно добавить поля):
GET /cams  →  {"id": 1, "name": "Cam A", "type": "radial", "status": "active"}

Старые клиенты сломаются! ❌
```

**Решение:** Версионирование

```
V1 (старая версия):
GET /api/v1/cams  →  {"id": 1, "name": "Cam A"}

V2 (новая версия):
GET /api/v2/cams  →  {"id": 1, "name": "Cam A", "type": "radial", "status": "active"}

Старые клиенты используют v1 ✅
Новые клиенты используют v2 ✅
```

### Способы версионирования

#### 1️⃣ **В URL (рекомендуется)**

```python
# v1
@router.get("/api/v1/cams")
async def get_cams_v1():
    return {"id": 1, "name": "Cam A"}

# v2  
@router.get("/api/v2/cams")
async def get_cams_v2():
    return {"id": 1, "name": "Cam A", "type": "radial"}
```

**Плюсы:**
- ✅ Явная версия в URL
- ✅ Легко тестировать
- ✅ Видно в логах и мониторинге

---

#### 2️⃣ **В Header**

```python
@router.get("/api/cams")
async def get_cams(version: str = Header(alias="API-Version")):
    if version == "1":
        return {"id": 1, "name": "Cam A"}
    elif version == "2":
        return {"id": 1, "name": "Cam A", "type": "radial"}
```

**Минусы:**
- ⚠️ Сложнее тестировать
- ⚠️ Версия не видна в URL

---

### Стратегия версионирования

**Правило:** Минорные изменения не требуют новой версии

```
✅ Можно добавить БЕЗ новой версии:
- Новые опциональные поля в response
- Новые optional query параметры
- Новые endpoints

❌ Требует новую версию:
- Удаление полей
- Изменение типов данных
- Изменение формата response
- Breaking changes
```

---

## 📄 Best Practice #3: Pagination, Filtering, Sorting

### Pagination (постраничная навигация)

**Проблема:** Возвращать 10,000 кулачков в одном запросе = медленно!

❌ **ПЛОХО:**
```python
GET /cams  # Возвращает ВСЕ 10,000 кулачков 😱
```

✅ **ХОРОШО:**
```python
GET /cams?page=1&limit=20  # Возвращает 20 кулачков (страница 1)

Response:
{
  "data": [...],           # 20 кулачков
  "page": 1,
  "limit": 20,
  "total": 10000,
  "pages": 500
}
```

**Реализация в FastAPI:**

```python
@router.get("/api/v1/cams")
async def get_cams(
    page: int = Query(1, ge=1),           # Страница (минимум 1)
    limit: int = Query(20, ge=1, le=100)  # Лимит (от 1 до 100)
):
    offset = (page - 1) * limit
    cams = db_cams[offset:offset + limit]  # Получить slice
    
    return {
        "data": cams,
        "page": page,
        "limit": limit,
        "total": len(db_cams),
        "pages": ceil(len(db_cams) / limit)
    }
```

---

### Filtering (фильтрация)

**Зачем:** Получить только нужные данные

✅ **ХОРОШО:**
```python
GET /cams?type=radial              # Только radial кулачки
GET /cams?status=active            # Только активные
GET /cams?project_id=5             # Кулачки проекта 5
GET /cams?type=radial&status=active  # Комбинация фильтров
```

**Реализация:**

```python
@router.get("/api/v1/cams")
async def get_cams(
    type: Optional[str] = None,
    status: Optional[str] = None,
    project_id: Optional[int] = None
):
    cams = db_cams
    
    if type:
        cams = [c for c in cams if c["type"] == type]
    if status:
        cams = [c for c in cams if c["status"] == status]
    if project_id:
        cams = [c for c in cams if c["project_id"] == project_id]
        
    return {"data": cams}
```

---

### Sorting (сортировка)

**Зачем:** Получить данные в нужном порядке

✅ **ХОРОШО:**
```python
GET /cams?sort=name             # По имени (ascending)
GET /cams?sort=-created_at      # По дате (descending, "-" означает reverse)
GET /cams?sort=type,name        # Сначала по type, потом по name
```

**Реализация:**

```python
@router.get("/api/v1/cams")
async def get_cams(
    sort: Optional[str] = None
):
    cams = db_cams.copy()
    
    if sort:
        reverse = sort.startswith("-")
        field = sort.lstrip("-")
        cams.sort(key=lambda x: x.get(field), reverse=reverse)
        
    return {"data": cams}
```

---

### Комбинация всех фичей

```python
GET /api/v1/cams?
    page=2
    &limit=10
    &type=radial
    &status=active
    &sort=-created_at

→ Страница 2, по 10 элементов
→ Только radial и active
→ Отсортированы по дате (новые первые)
```

---

## 🎯 Best Practice #4: HTTP Status Codes

### Правильные коды для каждой ситуации

#### **2xx Success**
```python
200 OK          # Успешный GET, PUT, DELETE
201 Created     # Успешный POST (создан новый ресурс)
204 No Content  # Успешно, но нет тела ответа (часто для DELETE)
```

#### **4xx Client Errors**
```python
400 Bad Request       # Неправильный формат запроса
401 Unauthorized      # Нет аутентификации
403 Forbidden         # Аутентификация есть, но доступ запрещён
404 Not Found         # Ресурс не найден
422 Unprocessable     # Валидация не прошла (Pydantic)
429 Too Many Requests # Rate limit превышен
```

#### **5xx Server Errors**
```python
500 Internal Server Error  # Ошибка на сервере
503 Service Unavailable    # Сервис временно недоступен
```

---

## 🔐 Best Practice #5: Security

### API Keys и Rate Limiting

```python
from fastapi import Security, HTTPException
from fastapi.security import APIKeyHeader

API_KEY_HEADER = APIKeyHeader(name="X-API-Key")

@router.get("/api/v1/cams")
async def get_cams(api_key: str = Security(API_KEY_HEADER)):
    if api_key != "secret-key-123":
        raise HTTPException(status_code=403, detail="Invalid API key")
    # ... логика
```

### Rate Limiting

```python
# Лимит: 100 запросов в минуту
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@router.get("/api/v1/cams")
@limiter.limit("100/minute")
async def get_cams():
    # ... логика
```

---

## 🎨 Best Practice #6: Consistent Response Format

### Единый формат ответов

✅ **Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

✅ **Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "CAM_NOT_FOUND",
    "message": "Cam with id 5 not found",
    "details": {}
  }
}
```

**Pydantic модели:**

```python
class SuccessResponse(BaseModel):
    success: bool = True
    data: Any
    message: str = "Success"

class ErrorResponse(BaseModel):
    success: bool = False
    error: Dict[str, Any]
```

---

## 💡 Применение для EngineCamPro v2

### Проектируем правильное API

```python
# app/routers/cams_v1.py

from fastapi import APIRouter, Query, HTTPException, status
from typing import Optional, List
from math import ceil

router = APIRouter(prefix="/api/v1/cams", tags=["Cams V1"])

# ============================================
# PAGINATION + FILTERING + SORTING
# ============================================

@router.get("", response_model=CamListResponse)
async def get_cams(
    # Pagination
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    
    # Filtering
    type: Optional[str] = Query(None, description="Cam type (radial, tangential)"),
    status: Optional[str] = Query(None, description="Status (active, archived)"),
    project_id: Optional[int] = Query(None, description="Filter by project"),
    
    # Sorting
    sort: Optional[str] = Query(None, description="Sort field (prefix with - for desc)")
):
    """
    Get list of cams with pagination, filtering, and sorting.
    
    **Examples:**
    - `/api/v1/cams?page=1&limit=20`
    - `/api/v1/cams?type=radial&status=active`
    - `/api/v1/cams?sort=-created_at`
    """
    # Apply filters
    cams = db_cams
    if type:
        cams = [c for c in cams if c["type"] == type]
    if status:
        cams = [c for c in cams if c["status"] == status]
    if project_id:
        cams = [c for c in cams if c["project_id"] == project_id]
    
    # Apply sorting
    if sort:
        reverse = sort.startswith("-")
        field = sort.lstrip("-")
        cams.sort(key=lambda x: x.get(field, ""), reverse=reverse)
    
    # Pagination
    total = len(cams)
    offset = (page - 1) * limit
    paginated_cams = cams[offset:offset + limit]
    
    return {
        "success": True,
        "data": paginated_cams,
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": ceil(total / limit)
        }
    }


# ============================================
# CRUD OPERATIONS
# ============================================

@router.get("/{cam_id}", response_model=CamResponse)
async def get_cam(cam_id: int):
    """Get single cam by ID"""
    cam = next((c for c in db_cams if c["id"] == cam_id), None)
    if not cam:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "CAM_NOT_FOUND", "message": f"Cam {cam_id} not found"}
        )
    return {"success": True, "data": cam}


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_cam(cam: CamCreate):
    """Create new cam"""
    new_cam = {"id": len(db_cams) + 1, **cam.dict(), "created_at": "2025-10-11"}
    db_cams.append(new_cam)
    return {"success": True, "data": new_cam, "message": "Cam created"}


@router.put("/{cam_id}")
async def update_cam(cam_id: int, cam: CamUpdate):
    """Update existing cam"""
    existing = next((c for c in db_cams if c["id"] == cam_id), None)
    if not existing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    
    existing.update(cam.dict(exclude_unset=True))
    return {"success": True, "data": existing, "message": "Cam updated"}


@router.delete("/{cam_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cam(cam_id: int):
    """Delete cam"""
    global db_cams
    db_cams = [c for c in db_cams if c["id"] != cam_id]
    # 204 No Content - no body returned


# ============================================
# NESTED RESOURCES
# ============================================

@router.post("/{cam_id}/calculate")
async def calculate_profile(cam_id: int, params: CalculationParams):
    """Calculate cam profile"""
    cam = next((c for c in db_cams if c["id"] == cam_id), None)
    if not cam:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    
    # Calculation logic here
    profile = {"points": [...], "max_velocity": 123.45}
    
    return {
        "success": True,
        "data": profile,
        "message": "Profile calculated"
    }
```

---

## 🤖 Работа с Claude Code

### Задача: Рефакторинг API по Best Practices

### ✅ Хороший диалог (эффективный)

```bash
cd ~/projects/enginecampro-v2/backend
claude
```

```
Ты: Нужно отрефакторить API endpoints следуя REST best practices.

Claude Code: Какие endpoints нужно обновить?

Ты: Отрефактори API в app/routers/cams.py следуя best practices:

Best Practices:
1. RESTful URLs:
   - Существительные во множественном числе
   - Иерархия через вложенность
   - Kebab-case для multi-word

2. Версионирование:
   - Добавь /api/v1/ prefix
   - Подготовь структуру для v2

3. Pagination + Filtering + Sorting:
   - page, limit параметры
   - Фильтры: type, status, project_id
   - Сортировка: sort параметр (с поддержкой -)
   - Response с pagination metadata

4. Consistent Response:
   - success: bool
   - data: {}
   - pagination: {} (для списков)
   - message: str

5. HTTP Status Codes:
   - 200 для GET/PUT
   - 201 для POST
   - 204 для DELETE
   - 404 для not found
   - 422 для validation errors

Текущие endpoints для рефакторинга:
- GET /cams → GET /api/v1/cams (с pagination/filtering)
- GET /cams/{id} → GET /api/v1/cams/{id}
- POST /cams → POST /api/v1/cams (201 status)
- PUT /cams/{id} → PUT /api/v1/cams/{id}
- DELETE /cams/{id} → DELETE /api/v1/cams/{id} (204 status)
- POST /calculate → POST /api/v1/cams/{id}/calculate

Сохрани старые endpoints для обратной совместимости.

Claude Code: Отлично! План рефакторинга:

1. Создам app/routers/cams_v1.py с новыми endpoints
2. Добавлю pagination, filtering, sorting в GET /cams
3. Единый response format
4. Правильные HTTP status codes
5. Обновлю Pydantic модели (PaginatedResponse)
6. Сохраню старые endpoints в cams.py (deprecated)

Применить? [Y/n]

Ты: Y

Claude Code: ✅ Создал app/routers/cams_v1.py:

Новые endpoints:
- GET /api/v1/cams (pagination + filtering + sorting)
- GET /api/v1/cams/{id}
- POST /api/v1/cams (201 status)
- PUT /api/v1/cams/{id}
- DELETE /api/v1/cams/{id} (204 status)
- POST /api/v1/cams/{id}/calculate

Response format единый:
{
  "success": true,
  "data": {...},
  "pagination": {...}  // для списков
}

Старые endpoints помечены как deprecated в app/routers/cams.py.

Проверь: http://localhost:8000/docs

Ты: Отлично! Добавь OpenAPI примеры для pagination и filtering.

Claude Code: Добавлю в docstrings:

Examples:
- /api/v1/cams?page=1&limit=20
- /api/v1/cams?type=radial&sort=-created_at
- /api/v1/cams?project_id=5&status=active

Применить? [Y/n]

Ты: Y

Claude Code: ✅ Примеры добавлены в Swagger документацию!
```

**Почему это эффективно:**
- ✅ Детальные best practices в одном месте
- ✅ Сохранена обратная совместимость
- ✅ Итеративное улучшение (рефакторинг → примеры)
- ✅ Единый response format

---

## 🛠️ Практическое задание

### Задача

Отрефактори существующее API следуя всем REST best practices через диалог с Claude Code.

### Что нужно создать

- Versioned API (/api/v1/)
- Pagination + Filtering + Sorting для списков
- Единый response format
- Правильные HTTP status codes
- OpenAPI примеры для всех endpoints

### Работа с Claude Code

**Шаг 1:** Открой терминал
```bash
cd ~/projects/enginecampro-v2/backend
claude
```

**Шаг 2:** Диалог с Claude Code

```
Ты: Отрефактори API следуя REST best practices

[Укажи все 5 best practices]
[Укажи текущие endpoints]
[Укажи требования к новым endpoints]

Claude Code: [создаст новую версию API]

Ты: Добавь примеры в документацию

Claude Code: [добавит примеры в docstrings]
```

**Шаг 3:** Проверка

Запусти сервер:
```bash
uvicorn app.main:app --reload
```

Открой Swagger UI:
```
http://localhost:8000/docs
```

### Что протестировать

**1. Versioning**
- ✅ Endpoints начинаются с /api/v1/
- ✅ Старые endpoints помечены deprecated
- ✅ Оба работают

**2. Pagination**
```bash
GET /api/v1/cams?page=1&limit=5

Response:
{
  "success": true,
  "data": [5 cams],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 50,
    "pages": 10
  }
}
```

**3. Filtering**
```bash
GET /api/v1/cams?type=radial
GET /api/v1/cams?status=active
GET /api/v1/cams?type=radial&status=active
```

**4. Sorting**
```bash
GET /api/v1/cams?sort=name         # Ascending
GET /api/v1/cams?sort=-created_at  # Descending
```

**5. Combined**
```bash
GET /api/v1/cams?page=2&limit=10&type=radial&sort=-created_at

→ Страница 2, 10 элементов, только radial, сортировка по дате
```

**6. HTTP Status Codes**
- POST /api/v1/cams → 201 Created
- DELETE /api/v1/cams/{id} → 204 No Content
- GET /api/v1/cams/999 → 404 Not Found

**7. Response Format**
- Все responses имеют `success`, `data`, `message`
- Списки имеют `pagination`
- Ошибки имеют structured error format

### Ожидаемый результат

- ✅ API follows REST best practices
- ✅ Pagination/filtering/sorting работает
- ✅ Versioning готово для будущих изменений
- ✅ Единый response format
- ✅ Правильные HTTP status codes
- ✅ OpenAPI документация с примерами

### Как проверить

- [ ] /api/v1/cams поддерживает pagination
- [ ] Фильтры работают (type, status, project_id)
- [ ] Сортировка работает (sort, -sort)
- [ ] POST возвращает 201
- [ ] DELETE возвращает 204
- [ ] Все responses в едином формате
- [ ] Swagger показывает примеры

---

## ❓ Вопросы для самопроверки

1. **RESTful URL Design:**
   - Почему используем существительные, а не глаголы?
   - В чём разница между /cam и /cams?
   - Как показать иерархию ресурсов?

2. **Versioning:**
   - Зачем нужно версионирование API?
   - Когда создавать новую версию?
   - Можно ли обновлять v1 после релиза v2?

3. **Pagination:**
   - Почему плохо возвращать все данные сразу?
   - Что такое offset-based pagination?
   - Что должен содержать response с pagination?

4. **Filtering & Sorting:**
   - Как передавать фильтры в query params?
   - Что означает `-` в sort параметре?
   - Можно ли комбинировать фильтры?

5. **Response Format:**
   - Зачем единый формат ответов?
   - Что должен содержать success response?
   - Что должен содержать error response?

6. **Для EngineCamPro v2:**
   - Какие endpoints нужны?
   - Какую версию API создать сейчас?
   - Какие фильтры добавить?

---

## 🔗 Связь с другими уроками

**Основано на уроках:**
- Урок 1.4: REST API концепции - базовые принципы
- Урок 2.2: HTTP методы - CRUD операции
- Урок 2.6: Автодокументация - OpenAPI examples

**Подготавливает к урокам:**
- Урок 2.8: Тестирование - тесты для pagination/filtering
- Урок 3.2: База данных - реальная pagination через БД
- Урок 5.1: Frontend интеграция - использование pagination

**Связь с EngineCamPro v2:**
Best practices = профессиональное API:
- Легко использовать Frontend разработчикам
- Готово к масштабированию
- Документация понятна пользователям
- Можно показать потенциальным клиентам

---

## ✅ Критерии завершения урока

**Понимание best practices:**
- [ ] Знаю 6 главных best practices
- [ ] Понимаю зачем они нужны
- [ ] Могу отличить хороший API от плохого

**RESTful design:**
- [ ] Знаю правила построения URL
- [ ] Понимаю иерархию ресурсов
- [ ] Знаю naming conventions

**Versioning:**
- [ ] Понимаю зачем версионирование
- [ ] Знаю когда создавать новую версию
- [ ] Знаю способы версионирования

**Pagination/Filtering/Sorting:**
- [ ] Понимаю зачем pagination
- [ ] Знаю как реализовать фильтры
- [ ] Знаю как реализовать сортировку
- [ ] Могу комбинировать всё вместе

**Практика:**
- [ ] Отрефакторил API через Claude Code
- [ ] Добавил pagination/filtering/sorting
- [ ] Проверил всё в Swagger UI
- [ ] Протестировал все комбинации параметров

**Документирование:**
- [ ] Записал выводы
- [ ] Понимаю следующий урок

---

**Следующий урок:** 2.8 Тестирование API (pytest)  
**Время на урок:** 50-65 минут  
**Статус:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён

---

*Версия урока: 1.0*  
*Дата создания: 11 октября 2025*  
*Формат: Vibe Coding с диалогами Claude Code*
