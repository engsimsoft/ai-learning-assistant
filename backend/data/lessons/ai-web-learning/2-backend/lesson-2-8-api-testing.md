# Урок 2.8: Тестирование API (pytest)

> **Модуль 2:** Backend разработка  
> **Урок:** 2.8  
> **Длительность:** 55-70 минут  
> **Prerequisite:** Урок 2.7 (Best Practices)

---

## 🎯 Цели урока

После этого урока ты сможешь:
- ✅ Понимать зачем нужно тестирование API
- ✅ Знать pytest и FastAPI TestClient
- ✅ Писать тесты для endpoints через Claude Code
- ✅ Различать Unit и Integration тесты
- ✅ Использовать fixtures и mocking
- ✅ Запускать тесты и понимать coverage

---

## 📖 Концепция: Зачем тестировать API

### Простое определение

**Тестирование API** - это автоматическая проверка что твои endpoints работают правильно. Тесты запускаются за секунды и проверяют все сценарии.

### Зачем это нужно

**Без тестов (страшно менять код):**
```
Ты: Изменил код endpoint'а
Ты: Надеюсь ничего не сломал... 😰
Ты: Нужно вручную проверить все endpoints...
Ты: Открываешь Swagger UI...
Ты: Тестируешь каждый endpoint по 5 минут...
Ты: Проверяешь edge cases...
Ты: 30 минут потрачено... 😵

Через неделю:
Пользователь: "API сломан! Возвращает 500 ошибку!"
Ты: "Не может быть! Я же проверял!" 😱
```

**С тестами (уверенность в коде):**
```python
# Изменил код
# Запускаю тесты:
pytest

# 15 секунд спустя:
============= test session starts =============
tests/test_cams.py::test_create_cam PASSED
tests/test_cams.py::test_get_cam PASSED
tests/test_cams.py::test_update_cam PASSED
tests/test_cams.py::test_delete_cam PASSED
tests/test_cams.py::test_get_nonexistent PASSED
============= 5 passed in 0.8s =============

✅ Всё работает! Можно деплоить! 🚀
```

**Преимущества тестов:**
- ✅ Быстро проверяют ВСЁ (секунды vs минуты)
- ✅ Не забывают проверить edge cases
- ✅ Документируют как API должен работать
- ✅ Уверенность при рефакторинге
- ✅ Ловят баги до production

### 🏥 Аналогия: Медицинские анализы

```
БЕЗ ТЕСТОВ (гадание)
══════════════════════

👨‍⚕️ Доктор: "Как себя чувствуешь?"
😷 Пациент: "Вроде нормально..."
👨‍⚕️ Доктор: "Ладно, наверное здоров"

Через неделю:
😷💀 Пациент: "Мне стало очень плохо!"
👨‍⚕️ Доктор: "Надо было сделать анализы!"


С ТЕСТАМИ (точная диагностика)
═══════════════════════════════

👨‍⚕️ Доктор: "Как себя чувствуешь?"
😷 Пациент: "Вроде нормально..."
👨‍⚕️ Доктор: "Сделаем анализы"

🧪 Анализ крови: ✅ Норма
🧪 Анализ мочи: ✅ Норма
🧪 Рентген: ✅ Норма
🧪 ЭКГ: ⚠️ Отклонение!

👨‍⚕️ Доктор: "ЭКГ показывает проблему. Назначу лечение!"
😷 Пациент здоров через неделю ✅
```

**API тесты = медицинские анализы:**
- Быстро проверяют все "системы"
- Находят проблемы до того как станет плохо
- Дают точные данные, а не "вроде работает"
- Регулярно запускаются для мониторинга

---

## 🧪 Pytest и FastAPI TestClient

### Установка pytest

```bash
pip install pytest pytest-cov httpx
```

**Зачем эти пакеты:**
- `pytest` - фреймворк для тестирования
- `pytest-cov` - coverage репорты (какой % кода протестирован)
- `httpx` - нужен для FastAPI TestClient

---

### TestClient для FastAPI

FastAPI предоставляет `TestClient` для тестирования без запуска сервера:

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Теперь можно делать запросы:
response = client.get("/api/v1/cams")

# TestClient работает синхронно! Не нужен await
```

**Что делает TestClient:**
- Создаёт fake HTTP requests
- Не запускает реальный сервер (быстрее!)
- Возвращает Response объект с `.status_code`, `.json()`, etc.

---

## 📝 Структура тестов

### Организация папок

```
backend/
├── app/
│   ├── main.py
│   ├── routers/
│   └── models/
├── tests/
│   ├── __init__.py
│   ├── conftest.py         # Fixtures (общие для всех тестов)
│   ├── test_cams.py        # Тесты для cams endpoints
│   ├── test_health.py      # Тесты для health check
│   └── test_calculations.py # Тесты для расчётов
└── pytest.ini              # Настройки pytest
```

---

### Простой тест

```python
# tests/test_cams.py

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_cams():
    """Test GET /api/v1/cams returns list of cams"""
    response = client.get("/api/v1/cams")
    
    assert response.status_code == 200
    assert "data" in response.json()
    assert isinstance(response.json()["data"], list)
```

**Запуск:**
```bash
pytest tests/test_cams.py::test_get_cams -v

# Output:
tests/test_cams.py::test_get_cams PASSED ✅
```

---

## 🔍 Виды тестов

### 1️⃣ Unit Tests (тестируют одну функцию)

**Цель:** Проверить что одна функция работает правильно изолированно

```python
# tests/test_calculations.py

from app.core.calculations import calculate_profile

def test_calculate_profile_basic():
    """Test profile calculation with valid inputs"""
    result = calculate_profile(
        base_radius=50.0,
        lift=10.0,
        duration=180
    )
    
    assert result["max_velocity"] > 0
    assert result["max_acceleration"] > 0
    assert len(result["profile"]) > 0
```

**Что тестируем:**
- ✅ Одну функцию (`calculate_profile`)
- ✅ С mock данными
- ✅ Без HTTP requests
- ✅ Очень быстро (~0.001s)

---

### 2️⃣ Integration Tests (тестируют endpoints целиком)

**Цель:** Проверить что endpoint работает от HTTP request до response

```python
# tests/test_cams.py

def test_create_cam_integration():
    """Test full flow: POST cam, verify in GET"""
    # 1. Создаём cam
    cam_data = {
        "name": "Test Cam",
        "type": "radial",
        "base_radius": 50.0,
        "lift": 10.0,
        "duration": 180
    }
    
    create_response = client.post("/api/v1/cams", json=cam_data)
    assert create_response.status_code == 201
    
    created_cam = create_response.json()["data"]
    cam_id = created_cam["id"]
    
    # 2. Проверяем что cam появился в списке
    get_response = client.get("/api/v1/cams")
    assert get_response.status_code == 200
    
    cams = get_response.json()["data"]
    assert any(c["id"] == cam_id for c in cams)
    
    # 3. Получаем cam по ID
    get_one_response = client.get(f"/api/v1/cams/{cam_id}")
    assert get_one_response.status_code == 200
    assert get_one_response.json()["data"]["name"] == "Test Cam"
```

**Что тестируем:**
- ✅ HTTP endpoints целиком
- ✅ Последовательность операций (CREATE → GET → GET ONE)
- ✅ Полный flow как в реальности
- ✅ Медленнее unit тестов (~0.1s)

---

## 🧩 Fixtures (повторяющийся код)

### Проблема: Дублирование setup кода

```python
def test_create_cam():
    client = TestClient(app)  # ← дублируется
    # ... тест

def test_get_cam():
    client = TestClient(app)  # ← дублируется
    # ... тест

def test_update_cam():
    client = TestClient(app)  # ← дублируется
    # ... тест
```

### Решение: Pytest fixtures

```python
# tests/conftest.py

import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    """Fixture providing TestClient"""
    return TestClient(app)

@pytest.fixture
def sample_cam():
    """Fixture providing sample cam data"""
    return {
        "name": "Test Cam",
        "type": "radial",
        "base_radius": 50.0,
        "lift": 10.0,
        "duration": 180
    }
```

**Теперь тесты чистые:**

```python
# tests/test_cams.py

def test_create_cam(client, sample_cam):  # ← fixtures as params!
    response = client.post("/api/v1/cams", json=sample_cam)
    assert response.status_code == 201

def test_get_cam(client):  # ← fixture!
    response = client.get("/api/v1/cams")
    assert response.status_code == 200
```

**Pytest автоматически:**
- Вызывает fixture функции
- Передаёт результаты в тесты
- Убирает дублирование

---

## ✅ Тестирование всех сценариев

### Happy Path (всё хорошо)

```python
def test_create_cam_success(client, sample_cam):
    """Test successful cam creation"""
    response = client.post("/api/v1/cams", json=sample_cam)
    
    assert response.status_code == 201
    data = response.json()["data"]
    assert data["name"] == sample_cam["name"]
    assert "id" in data
```

---

### Edge Cases (граничные случаи)

```python
def test_get_nonexistent_cam(client):
    """Test getting cam that doesn't exist"""
    response = client.get("/api/v1/cams/999999")
    
    assert response.status_code == 404
    assert "error" in response.json()


def test_create_cam_with_negative_lift(client):
    """Test validation: lift cannot be negative"""
    bad_cam = {
        "name": "Bad Cam",
        "type": "radial",
        "base_radius": 50.0,
        "lift": -10.0,  # ← Negative!
        "duration": 180
    }
    
    response = client.post("/api/v1/cams", json=bad_cam)
    assert response.status_code == 422  # Validation error


def test_pagination_last_page(client):
    """Test pagination when on last page"""
    response = client.get("/api/v1/cams?page=999&limit=20")
    
    assert response.status_code == 200
    data = response.json()["data"]
    assert len(data) == 0  # Empty page, but not error
```

---

### Error Cases (ошибки)

```python
def test_create_cam_missing_fields(client):
    """Test creating cam without required fields"""
    incomplete_cam = {"name": "Incomplete"}
    
    response = client.post("/api/v1/cams", json=incomplete_cam)
    assert response.status_code == 422


def test_update_cam_invalid_type(client, sample_cam):
    """Test updating cam with invalid type"""
    # Create cam first
    create_response = client.post("/api/v1/cams", json=sample_cam)
    cam_id = create_response.json()["data"]["id"]
    
    # Try to update with invalid type
    update_data = {"type": "invalid_type"}
    response = client.put(f"/api/v1/cams/{cam_id}", json=update_data)
    
    assert response.status_code == 422
```

---

## 📊 Test Coverage

### Запуск с coverage

```bash
pytest --cov=app --cov-report=html

# Output:
============= test session starts =============
collected 15 items

tests/test_cams.py ........... PASSED
tests/test_health.py .. PASSED

---------- coverage: 85% ----------
Name                  Stmts   Miss  Cover
-----------------------------------------
app/__init__.py           0      0   100%
app/main.py              25      2    92%
app/routers/cams.py      50      8    84%
app/models.py            20      1    95%
-----------------------------------------
TOTAL                    95     11    88%

Coverage HTML written to htmlcov/index.html
```

**Что такое coverage:**
- Какой % кода выполняется при тестах
- 80%+ coverage = хорошо
- 100% coverage = идеально (но не обязательно)

**Открой отчёт:**
```bash
open htmlcov/index.html  # macOS
xdg-open htmlcov/index.html  # Linux
```

---

## 💡 Применение для EngineCamPro v2

### Полный набор тестов

```python
# tests/conftest.py

import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def sample_cam():
    return {
        "name": "Radial Cam A",
        "type": "radial",
        "base_radius": 50.0,
        "lift": 10.0,
        "duration": 180,
        "status": "active"
    }

@pytest.fixture
def created_cam(client, sample_cam):
    """Fixture that creates a cam and returns its data"""
    response = client.post("/api/v1/cams", json=sample_cam)
    return response.json()["data"]
```

```python
# tests/test_cams.py

import pytest

class TestCamsEndpoints:
    """Test suite for Cams API endpoints"""
    
    # ============================================
    # CRUD Tests
    # ============================================
    
    def test_get_cams_list(self, client):
        """Test GET /api/v1/cams returns list"""
        response = client.get("/api/v1/cams")
        
        assert response.status_code == 200
        data = response.json()
        assert "data" in data
        assert "pagination" in data
        assert isinstance(data["data"], list)
    
    
    def test_create_cam(self, client, sample_cam):
        """Test POST /api/v1/cams creates new cam"""
        response = client.post("/api/v1/cams", json=sample_cam)
        
        assert response.status_code == 201
        data = response.json()["data"]
        assert data["name"] == sample_cam["name"]
        assert "id" in data
        assert "created_at" in data
    
    
    def test_get_cam_by_id(self, client, created_cam):
        """Test GET /api/v1/cams/{id} returns single cam"""
        cam_id = created_cam["id"]
        response = client.get(f"/api/v1/cams/{cam_id}")
        
        assert response.status_code == 200
        data = response.json()["data"]
        assert data["id"] == cam_id
    
    
    def test_update_cam(self, client, created_cam):
        """Test PUT /api/v1/cams/{id} updates cam"""
        cam_id = created_cam["id"]
        update_data = {"name": "Updated Name", "lift": 15.0}
        
        response = client.put(f"/api/v1/cams/{cam_id}", json=update_data)
        
        assert response.status_code == 200
        data = response.json()["data"]
        assert data["name"] == "Updated Name"
        assert data["lift"] == 15.0
    
    
    def test_delete_cam(self, client, created_cam):
        """Test DELETE /api/v1/cams/{id} removes cam"""
        cam_id = created_cam["id"]
        response = client.delete(f"/api/v1/cams/{cam_id}")
        
        assert response.status_code == 204
        
        # Verify cam is gone
        get_response = client.get(f"/api/v1/cams/{cam_id}")
        assert get_response.status_code == 404
    
    
    # ============================================
    # Pagination Tests
    # ============================================
    
    def test_pagination_page_and_limit(self, client):
        """Test pagination with page and limit params"""
        response = client.get("/api/v1/cams?page=1&limit=5")
        
        assert response.status_code == 200
        data = response.json()
        assert len(data["data"]) <= 5
        assert data["pagination"]["page"] == 1
        assert data["pagination"]["limit"] == 5
    
    
    def test_pagination_metadata(self, client):
        """Test pagination metadata is correct"""
        response = client.get("/api/v1/cams?page=1&limit=10")
        
        pagination = response.json()["pagination"]
        assert "total" in pagination
        assert "pages" in pagination
        assert pagination["pages"] >= 1
    
    
    # ============================================
    # Filtering Tests
    # ============================================
    
    def test_filter_by_type(self, client):
        """Test filtering cams by type"""
        response = client.get("/api/v1/cams?type=radial")
        
        assert response.status_code == 200
        cams = response.json()["data"]
        assert all(cam["type"] == "radial" for cam in cams)
    
    
    def test_filter_by_status(self, client):
        """Test filtering cams by status"""
        response = client.get("/api/v1/cams?status=active")
        
        assert response.status_code == 200
        cams = response.json()["data"]
        assert all(cam["status"] == "active" for cam in cams)
    
    
    def test_multiple_filters(self, client):
        """Test combining multiple filters"""
        response = client.get("/api/v1/cams?type=radial&status=active")
        
        assert response.status_code == 200
        cams = response.json()["data"]
        for cam in cams:
            assert cam["type"] == "radial"
            assert cam["status"] == "active"
    
    
    # ============================================
    # Sorting Tests
    # ============================================
    
    def test_sort_ascending(self, client):
        """Test sorting cams by name ascending"""
        response = client.get("/api/v1/cams?sort=name")
        
        assert response.status_code == 200
        cams = response.json()["data"]
        names = [cam["name"] for cam in cams]
        assert names == sorted(names)
    
    
    def test_sort_descending(self, client):
        """Test sorting cams by created_at descending"""
        response = client.get("/api/v1/cams?sort=-created_at")
        
        assert response.status_code == 200
        cams = response.json()["data"]
        dates = [cam["created_at"] for cam in cams]
        assert dates == sorted(dates, reverse=True)
    
    
    # ============================================
    # Error Cases Tests
    # ============================================
    
    def test_get_nonexistent_cam(self, client):
        """Test getting cam that doesn't exist returns 404"""
        response = client.get("/api/v1/cams/999999")
        
        assert response.status_code == 404
        assert "error" in response.json()
    
    
    def test_create_cam_invalid_data(self, client):
        """Test creating cam with invalid data returns 422"""
        invalid_cam = {
            "name": "Invalid",
            "lift": "not a number"  # ← Should be float
        }
        
        response = client.post("/api/v1/cams", json=invalid_cam)
        assert response.status_code == 422
    
    
    def test_create_cam_negative_lift(self, client):
        """Test validation: lift must be positive"""
        cam_with_negative = {
            "name": "Bad Cam",
            "type": "radial",
            "base_radius": 50.0,
            "lift": -10.0,  # ← Negative!
            "duration": 180
        }
        
        response = client.post("/api/v1/cams", json=cam_with_negative)
        assert response.status_code == 422
    
    
    # ============================================
    # Calculation Tests
    # ============================================
    
    def test_calculate_cam_profile(self, client, created_cam):
        """Test POST /api/v1/cams/{id}/calculate"""
        cam_id = created_cam["id"]
        params = {"points": 360}
        
        response = client.post(
            f"/api/v1/cams/{cam_id}/calculate",
            json=params
        )
        
        assert response.status_code == 200
        result = response.json()["data"]
        assert "profile" in result
        assert "max_velocity" in result
        assert "max_acceleration" in result
        assert len(result["profile"]) > 0
```

---

## 🤖 Работа с Claude Code

### Задача: Создать полный набор тестов

### ✅ Хороший диалог (эффективный)

```bash
cd ~/projects/enginecampro-v2/backend
claude
```

```
Ты: Нужно создать pytest тесты для всех endpoints в app/routers/cams_v1.py

Claude Code: Какие тесты нужны?

Ты: Создай полный набор pytest тестов для API.

Структура:
- tests/conftest.py (fixtures)
- tests/test_cams.py (endpoint tests)
- tests/test_calculations.py (unit tests)
- pytest.ini (configuration)

Fixtures (conftest.py):
- client: TestClient fixture
- sample_cam: Sample cam data
- created_cam: Fixture создающий cam и возвращающий его

Test Categories:
1. CRUD tests:
   - test_get_cams_list
   - test_create_cam
   - test_get_cam_by_id
   - test_update_cam
   - test_delete_cam

2. Pagination tests:
   - test_pagination_page_and_limit
   - test_pagination_metadata

3. Filtering tests:
   - test_filter_by_type
   - test_filter_by_status
   - test_multiple_filters

4. Sorting tests:
   - test_sort_ascending
   - test_sort_descending

5. Error cases:
   - test_get_nonexistent_cam (404)
   - test_create_cam_invalid_data (422)
   - test_create_cam_negative_lift (validation)

6. Calculations:
   - test_calculate_cam_profile

Requirements:
- Use pytest fixtures для переиспользования
- Organize tests в classes (TestCamsEndpoints)
- Clear docstrings для каждого теста
- Assert status codes и response structure
- Test both happy path и edge cases

Claude Code: Отлично! План создания тестов:

1. Создам tests/conftest.py с fixtures
2. Создам tests/test_cams.py с 15+ тестами
3. Создам pytest.ini с настройками
4. Организую тесты по категориям в classes
5. Добавлю docstrings и comments

Применить? [Y/n]

Ты: Y

Claude Code: ✅ Создал тесты:

tests/conftest.py:
- client fixture (TestClient)
- sample_cam fixture (sample data)
- created_cam fixture (creates cam)

tests/test_cams.py:
- TestCamsEndpoints class с 18 тестами
- CRUD, Pagination, Filtering, Sorting
- Error cases и validations
- Clear docstrings

pytest.ini:
- Настройки для pytest
- Test discovery
- Output options

Запусти тесты:
pytest -v

Ты: Отлично! Добавь тесты для edge cases: empty results, large pagination, etc.

Claude Code: Добавлю:
- test_pagination_empty_page (page > total_pages)
- test_pagination_max_limit (limit > max allowed)
- test_filter_no_results (фильтр не находит данные)
- test_sort_invalid_field (несуществующее поле)

Применить? [Y/n]

Ты: Y

Claude Code: ✅ Добавил 4 edge case теста!

Запусти с coverage:
pytest --cov=app --cov-report=html -v

Откроешь отчёт: open htmlcov/index.html

Ты: Спасибо!
```

**Почему это эффективно:**
- ✅ Детальные требования к тестам
- ✅ Организация по категориям
- ✅ Fixtures для переиспользования
- ✅ Итеративное добавление edge cases
- ✅ Coverage отчёт

---

## 🛠️ Практическое задание

### Задача

Создай полный набор pytest тестов для EngineCamPro API через диалог с Claude Code. Достигни 80%+ coverage.

### Что нужно создать

- `tests/conftest.py` с fixtures
- `tests/test_cams.py` с 15+ тестами
- `pytest.ini` с настройками
- Coverage > 80%

### Работа с Claude Code

**Шаг 1:** Открой терминал
```bash
cd ~/projects/enginecampro-v2/backend
claude
```

**Шаг 2:** Диалог с Claude Code

```
Ты: Создай полный набор pytest тестов

[Укажи структуру]
[Укажи test categories]
[Укажи fixtures]
[Укажи requirements]

Claude Code: [создаст тесты]

Ты: Добавь edge cases

Claude Code: [добавит дополнительные тесты]
```

**Шаг 3:** Запуск тестов

```bash
# Установи pytest
pip install pytest pytest-cov httpx

# Запусти тесты
pytest -v

# Запусти с coverage
pytest --cov=app --cov-report=html -v

# Открой coverage отчёт
open htmlcov/index.html
```

### Что протестировать

**1. Все тесты проходят**
```bash
pytest -v

============= test session starts =============
tests/test_cams.py::TestCamsEndpoints::test_get_cams_list PASSED
tests/test_cams.py::TestCamsEndpoints::test_create_cam PASSED
...
============= 18 passed in 2.5s =============
```

**2. Coverage достаточный**
```bash
pytest --cov=app

---------- coverage: 85% ----------  ✅ > 80%
```

**3. Конкретные тесты**
```bash
# Один тест
pytest tests/test_cams.py::test_create_cam -v

# Один класс
pytest tests/test_cams.py::TestCamsEndpoints -v

# По keyword
pytest -k "filter" -v  # Только filter tests
```

**4. Fail cases работают**
```python
# Измени код намеренно (сломай endpoint)
# Запусти тесты - должны упасть ✅
pytest -v

# Верни код назад
# Тесты снова проходят ✅
```

### Ожидаемый результат

- ✅ 15+ тестов созданы
- ✅ Все тесты проходят (green)
- ✅ Coverage > 80%
- ✅ Fixtures переиспользуются
- ✅ Tests организованы по категориям
- ✅ Edge cases покрыты
- ✅ Coverage отчёт доступен

### Как проверить

- [ ] `pytest -v` показывает все тесты green
- [ ] Coverage > 80%
- [ ] tests/conftest.py с fixtures существует
- [ ] tests/test_cams.py с 15+ тестами существует
- [ ] Edge cases протестированы (404, 422, negative values)
- [ ] Coverage HTML отчёт создан (htmlcov/)
- [ ] Понимаю что каждый тест проверяет

---

## ❓ Вопросы для самопроверки

1. **Зачем тестирование:**
   - Почему тесты лучше ручной проверки?
   - Как тесты помогают при рефакторинге?
   - Что такое test-driven development?

2. **Pytest basics:**
   - Что такое TestClient?
   - Как pytest находит тесты?
   - Что такое assert?

3. **Fixtures:**
   - Зачем нужны fixtures?
   - Как создать fixture?
   - Где хранить fixtures?

4. **Test types:**
   - В чём разница между unit и integration?
   - Когда писать unit tests?
   - Когда писать integration tests?

5. **Coverage:**
   - Что такое coverage?
   - Какой % coverage нужен?
   - Значит ли 100% coverage что код без багов?

6. **Для EngineCamPro v2:**
   - Какие тесты нужны в первую очередь?
   - Как тестировать математические расчёты?
   - Когда запускать тесты?

---

## 🔗 Связь с другими уроками

**Основано на уроках:**
- Урок 2.2: HTTP методы - тестируем CRUD
- Урок 2.4: Обработка ошибок - тестируем error cases
- Урок 2.7: Best practices - тестируем pagination/filtering

**Подготавливает к урокам:**
- Урок 3.2: База данных - тесты с реальной БД
- Урок 5.1: Frontend интеграция - e2e тесты
- Урок 7.2: Deploy - CI/CD с автоматическими тестами

**Связь с EngineCamPro v2:**
Тесты = уверенность в качестве:
- Можно рефакторить без страха
- Быстрое обнаружение багов
- Документация через примеры
- CI/CD автоматически проверяет код

---

## 🎉 Поздравляем! Модуль 2 завершён!

### Что ты теперь умеешь

✅ **Backend разработка:**
- Создавать FastAPI приложения
- Проектировать RESTful API
- Работать с Pydantic моделями
- Обрабатывать ошибки правильно
- Настраивать CORS
- Генерировать автодокументацию
- Применять best practices
- Тестировать API (pytest)

✅ **Работа с Claude Code:**
- Формулировать детальные требования
- Итеративно улучшать код
- Создавать качественный Backend
- Анализировать решения ИИ

### Что дальше: Модуль 3 - Базы данных

**В Модуле 3 ты научишься:**
- Выбирать между SQL и NoSQL
- Работать с PostgreSQL
- Использовать SQLAlchemy ORM
- Проектировать схему БД
- Делать миграции (Alembic)
- Использовать BaaS (Supabase)

**Текущий EngineCamPro:**
```
✅ FastAPI Backend с REST API
✅ Pydantic модели и валидация
✅ Обработка ошибок
✅ CORS настроен
✅ Автодокументация Swagger
✅ Best practices применены
✅ Тесты написаны
⏸️ Данные в памяти (временно)

→ Модуль 3: Заменим временное хранилище на PostgreSQL!
```

---

## ✅ Критерии завершения урока

**Понимание тестирования:**
- [ ] Знаю зачем нужны тесты
- [ ] Понимаю аналогию с медицинскими анализами
- [ ] Знаю разницу между manual и automated testing

**Pytest basics:**
- [ ] Знаю что такое TestClient
- [ ] Понимаю pytest fixtures
- [ ] Знаю как организовать тесты

**Test types:**
- [ ] Понимаю разницу unit vs integration
- [ ] Знаю когда писать какие тесты
- [ ] Понимаю test coverage

**Практика:**
- [ ] Создал тесты через Claude Code
- [ ] Все тесты проходят (green)
- [ ] Coverage > 80%
- [ ] Протестировал edge cases
- [ ] Понимаю как читать coverage отчёт

**Модуль 2 завершён:**
- [ ] Все 8 уроков Модуля 2 пройдены
- [ ] EngineCamPro Backend готов
- [ ] Готов к Модулю 3 (База данных)

**Документирование:**
- [ ] Записал выводы по Модулю 2
- [ ] Если были сложности - записал их
- [ ] Готов к следующему модулю

---

**Следующий модуль:** Модуль 3 - Базы данных (4 урока)  
**Время на урок:** 55-70 минут  
**Статус:** ⏳ Не начат / 🔄 В процессе / ✅ Завершён  

**Модуль 2 статус:** ✅ ЗАВЕРШЁН! 🎉

---

*Версия урока: 1.0*  
*Дата создания: 11 октября 2025*  
*Формат: Vibe Coding с диалогами Claude Code*
