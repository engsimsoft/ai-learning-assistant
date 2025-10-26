# Artifact System - Полная спецификация возможностей

**Версия:** 1.0
**Дата:** 2025-10-19
**Статус:** Актуально
**Назначение:** Справочник по всем возможностям системы артефактов

---

## Содержание

1. [Введение](#введение)
2. [Два способа создания артефактов](#два-способа-создания-артефактов)
3. [Типы артефактов](#типы-артефактов)
4. [Графики (InteractivePlot - Plotly.js)](#графики-interactiveplot---plotlyjs)
5. [Калькуляторы (Calculator - Math.js)](#калькуляторы-calculator---mathjs)
6. [Система шаблонов](#система-шаблонов)
7. [API и события](#api-и-события)
8. [Ограничения и известные баги](#ограничения-и-известные-баги)

---

## Введение

Система артефактов позволяет создавать интерактивные компоненты:
- 📊 **Графики** (Plotly.js) - визуализация данных с zoom, pan, hover
- 🧮 **Калькуляторы** (Math.js) - живые расчёты с параметрами
- 💻 **Code demos** (в разработке)
- 🖼️ **Images** (в разработке)

**Ключевые возможности:**
- Интерактивность (изменение параметров, zoom/pan)
- Экспорт графиков в PNG
- Просмотр кода конфигурации
- Переиспользование через шаблоны

---

## Два способа создания артефактов

### Способ 1: Статические артефакты (из уроков)

**Назначение:** Заранее подготовленные примеры в уроках

**Формат:** Markdown-ссылки с протоколом `artifact:`

**Синтаксис:**
```markdown
[Название](artifact:template-id)
[Название](artifact:template-id:example-name)
```

**Примеры:**
```markdown
[📊 Линейный график](artifact:line-chart)
[📊 График температуры](artifact:line-chart:temperature)
[🧮 Базовый калькулятор](artifact:generic-calculator)
```

**Поведение:**
- Открывается в **SPLIT VIEW** (урок слева + артефакт справа)
- Можно ресайзить панели (drag handle между ними)
- Кнопка `✕` закрывает артефакт (возврат к уроку)

**Реализация:**
- [LessonViewer.jsx:167](../frontend/src/components/center/LessonViewer.jsx#L167) - парсинг `artifact:` ссылок
- [CenterContainer.jsx:49](../frontend/src/components/center/CenterContainer.jsx#L49) - обработка события `artifact:open` с `source: 'lesson'`

---

### Способ 2: Динамические артефакты (из чата)

**Назначение:** Генерируются AI-ботом во время диалога

**Формат:** AI генерирует JSON config и вызывает событие

**Поведение:**
- Открывается в **FULLSCREEN** (только артефакт)
- Кнопка `✕` закрывает артефакт
- Кнопка `📄 Show Lesson` показывает урок рядом (split view)

**Процесс создания:**
1. Пользователь: "Создай график температуры"
2. AI: Генерирует текст + JSON config
3. AI: Вызывает событие `artifact:open`
4. Артефакт открывается в CENTER

**Реализация:**
- [system_prompt.md](../backend/prompts/system_prompt.md#L16) - правила генерации (в разработке)
- [CenterContainer.jsx:58](../frontend/src/components/center/CenterContainer.jsx#L58) - обработка `source: 'chat'`

**Статус:** 🚧 В разработке (Фаза 4 roadmap)

---

## Типы артефактов

Текущая версия поддерживает:

| Тип | Компонент | Библиотека | Описание |
|-----|-----------|------------|----------|
| `plot` | InteractivePlot.jsx | Plotly.js | Интерактивные графики |
| `calculator` | Calculator.jsx | Math.js | Живые расчёты |
| `code` | (в разработке) | iframe | HTML/CSS/JS демо |
| `markdown` | (в разработке) | - | Markdown заметки |
| `images` | (в разработке) | - | Галереи изображений |

**Фокус roadmap:** `plot` и `calculator` (наиболее востребованы)

---

## Графики (InteractivePlot - Plotly.js)

### Общая информация

**Компонент:** [frontend/src/components/artifacts/InteractivePlot.jsx](../frontend/src/components/artifacts/InteractivePlot.jsx)

**Библиотека:** Plotly.js (plotly.js-dist-min)

**Возможности:**
- ✅ Zoom/Pan - масштабирование и перемещение
- ✅ Hover - детали при наведении
- ✅ Export PNG - экспорт графика как изображение
- ✅ Reset view - сброс zoom/pan
- ✅ Fullscreen - полноэкранный режим
- ✅ Toggle legend - вкл/выкл легенды

---

### Структура конфигурации

```javascript
{
  title: "Chart Title",        // Заголовок (показывается в toolbar)
  data: [                       // Массив серий данных
    {
      x: [1, 2, 3, 4, 5],      // Данные по X
      y: [1, 4, 2, 5, 3],      // Данные по Y
      type: 'scatter',          // Тип графика
      mode: 'lines+markers',    // Режим отображения
      name: 'Series 1',         // Название серии (для легенды)
      line: { ... },            // Настройки линии
      marker: { ... }           // Настройки маркеров
    }
  ],
  layout: {                     // Настройки layout
    title: "Chart Title",
    xaxis: { ... },             // Ось X
    yaxis: { ... },             // Ось Y
    showlegend: true,           // Показывать легенду
    legend: { ... }             // Настройки легенды
  }
}
```

---

### Поддерживаемые типы графиков

#### 1. Line Chart (Линейный график)

**Назначение:** Непрерывные данные, тренды, временные ряды

**Параметры:**
```javascript
{
  type: 'scatter',
  mode: 'lines' | 'markers' | 'lines+markers',
  line: {
    color: '#6366f1',       // Цвет линии (hex, rgb, named)
    width: 2,               // Толщина линии (1-5)
    dash: 'solid'           // Стиль: 'solid', 'dash', 'dot', 'dashdot'
  },
  marker: {
    size: 6,                // Размер точек (4-12)
    color: '#6366f1',       // Цвет точек
    symbol: 'circle'        // Форма: 'circle', 'square', 'diamond', 'cross'
  }
}
```

**Примеры использования:**
- Температура за период
- Рост пользователей
- Динамика курса валют
- Показатели производительности

---

#### 2. Scatter Plot (Точечная диаграмма)

**Назначение:** Корреляции, распределение данных, паттерны

**Параметры:**
```javascript
{
  type: 'scatter',
  mode: 'markers',          // Только точки (без линий)
  marker: {
    size: 8,
    color: '#10b981',       // Можно использовать массив цветов для gradients
    opacity: 0.7,           // Прозрачность (0-1)
    line: {                 // Обводка точек
      color: '#059669',
      width: 1
    }
  }
}
```

**Примеры:**
- Корреляция рост/вес
- Распределение оценок
- Scatter matrix для ML
- Кластеризация данных

---

#### 3. Bar Chart (Столбчатая диаграмма)

**Назначение:** Сравнение категорий, дискретные данные

**Параметры:**
```javascript
{
  type: 'bar',              // Вертикальные столбцы
  x: ['Cat A', 'Cat B', 'Cat C'],
  y: [10, 25, 15],
  marker: {
    color: '#f59e0b',       // Цвет столбцов
    line: {                 // Обводка
      color: '#d97706',
      width: 1
    }
  },
  orientation: 'v'          // 'v' - вертикальные, 'h' - горизонтальные
}
```

**Варианты:**
- Grouped bars - несколько серий рядом
- Stacked bars - накопительные столбцы

**Примеры:**
- Сравнение продаж
- Показатели по категориям
- Результаты опросов

---

#### 4. Multi-Line Chart (Несколько линий)

**Назначение:** Сравнение нескольких переменных одновременно

**Параметры:**
```javascript
{
  data: [
    {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter',
      mode: 'lines',
      name: 'Series 1',
      line: { color: '#6366f1', width: 2 }
    },
    {
      x: [1, 2, 3, 4],
      y: [16, 12, 18, 14],
      type: 'scatter',
      mode: 'lines',
      name: 'Series 2',
      line: { color: '#f59e0b', width: 2 }
    }
  ]
}
```

**Примеры:**
- Сравнение температур в разных городах
- Метрики производительности (CPU, RAM, Disk)
- Финансовые показатели (доход, расход, прибыль)

---

#### 5. Area Chart (Площадной график)

**Назначение:** Накопительные данные, объёмы

**Параметры:**
```javascript
{
  type: 'scatter',
  mode: 'lines',
  fill: 'tozeroy',          // Заполнить до оси Y
  fillcolor: 'rgba(99, 102, 241, 0.3)',  // Цвет заливки с прозрачностью
  line: {
    color: '#6366f1',
    width: 2
  }
}
```

**Варианты fill:**
- `'tozeroy'` - до оси Y
- `'tonexty'` - до следующей серии (stacked areas)
- `'toself'` - замкнутая область

**Примеры:**
- Накопительный объём продаж
- Стек метрик (CPU+RAM+Disk)
- Площадь под кривой

---

### Layout - Настройки осей и внешнего вида

#### Оси (xaxis / yaxis)

```javascript
{
  layout: {
    xaxis: {
      title: 'X Axis Label',        // Подпись оси
      gridcolor: '#e5e7eb',         // Цвет сетки
      zerolinecolor: '#d1d5db',     // Цвет нулевой линии
      showgrid: true,               // Показывать сетку
      zeroline: true,               // Показывать нулевую линию
      range: [0, 100],              // Фиксированный диапазон (optional)
      autorange: true,              // Авто-диапазон
      type: 'linear',               // Тип: 'linear', 'log', 'date', 'category'
      tickmode: 'auto',             // 'auto' или 'linear'
      dtick: 10,                    // Шаг между метками
      tickformat: '.2f'             // Формат меток (printf-style)
    },
    yaxis: {
      // Аналогичные параметры
    }
  }
}
```

---

#### Цвета и темы

```javascript
{
  layout: {
    paper_bgcolor: '#ffffff',     // Фон вокруг графика
    plot_bgcolor: '#ffffff',      // Фон области графика
    font: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      size: 14,
      color: '#111827'
    }
  }
}
```

**Текущая тема:** Светлая (white background)

**Поддержка тёмной темы:** Нет (можно добавить в будущем)

---

#### Легенда

```javascript
{
  layout: {
    showlegend: true,
    legend: {
      x: 1,                   // Позиция по X (0-1)
      xanchor: 'right',       // Привязка: 'left', 'center', 'right'
      y: 1,                   // Позиция по Y (0-1)
      yanchor: 'top',         // Привязка: 'top', 'middle', 'bottom'
      bgcolor: 'rgba(255, 255, 255, 0.8)',  // Фон легенды
      bordercolor: '#d1d5db',
      borderwidth: 1
    }
  }
}
```

---

### Опции Plotly (config)

```javascript
{
  responsive: true,               // Адаптивный размер
  displayModeBar: true,           // Показывать тулбар
  displaylogo: false,             // Скрыть логотип Plotly
  modeBarButtonsToRemove: [       // Убрать ненужные кнопки
    'lasso2d',
    'select2d'
  ]
}
```

**Встроенные в компонент:** Кнопки Export PNG, Reset, Fullscreen уже есть в тулбаре

---

### Полный пример конфигурации графика

```javascript
{
  title: "Temperature Over Week",
  data: [
    {
      x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      y: [20, 22, 21, 23, 25, 24, 22],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Temperature (°C)',
      line: {
        color: '#f59e0b',
        width: 3
      },
      marker: {
        size: 8,
        color: '#f59e0b'
      }
    }
  ],
  layout: {
    title: 'Weekly Temperature',
    xaxis: {
      title: 'Day of Week',
      gridcolor: '#e5e7eb'
    },
    yaxis: {
      title: 'Temperature (°C)',
      gridcolor: '#e5e7eb'
    },
    showlegend: true,
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#ffffff'
  }
}
```

---

## Калькуляторы (Calculator - Math.js)

### Общая информация

**Компонент:** [frontend/src/components/artifacts/Calculator.jsx](../frontend/src/components/artifacts/Calculator.jsx)

**Библиотека:** Math.js (mathjs)

**Возможности:**
- ✅ Живые расчёты (результат обновляется при изменении inputs)
- ✅ Слайдеры + числовые поля
- ✅ Отображение формул
- ✅ Поддержка Math.js expressions (sin, cos, sqrt, etc.)
- ✅ Несколько формул одновременно

---

### Структура конфигурации

```javascript
{
  title: "Calculator Title",
  inputs: [                       // Входные параметры
    {
      name: 'a',                  // Имя переменной (для формул)
      label: 'Value A',           // Подпись для UI
      type: 'number',             // Тип (пока только 'number')
      min: 0,                     // Минимум
      max: 100,                   // Максимум
      step: 1,                    // Шаг изменения
      default: 10,                // Значение по умолчанию
      unit: 'kg',                 // Единица измерения (optional)
      description: 'First value'  // Описание (optional)
    }
  ],
  formulas: [                     // Формулы расчёта
    {
      name: 'result',             // Имя результата
      label: 'Result',            // Подпись
      expression: 'a * b + c',    // Math.js expression
      unit: 'm/s',                // Единица результата
      precision: 2,               // Количество знаков после запятой
      description: 'Calculated result'
    }
  ]
}
```

---

### Inputs - Входные параметры

**Текущая реализация:** Slider + Number field (синхронизированы)

```javascript
{
  name: 'radius',           // Имя для использования в формулах
  label: 'Radius',          // Отображаемое название
  type: 'number',           // Тип (пока только 'number')
  min: 1,                   // Минимальное значение
  max: 100,                 // Максимальное значение
  step: 0.1,                // Шаг (может быть дробным: 0.1, 0.01)
  default: 5,               // Значение по умолчанию
  unit: 'cm',               // Единица измерения (показывается рядом)
  description: 'Circle radius in centimeters'  // Описание (optional)
}
```

**Будущие типы inputs (планируется):**
- `'select'` - выпадающий список
- `'checkbox'` - да/нет
- `'text'` - текстовое поле

---

### Formulas - Формулы расчёта

**Движок:** Math.js (поддерживает все стандартные математические функции)

```javascript
{
  name: 'area',                   // Имя результата (уникальное)
  label: 'Circle Area',           // Подпись результата
  expression: 'PI * radius^2',    // Math.js expression
  unit: 'cm²',                    // Единица измерения результата
  precision: 2,                   // Количество знаков после запятой
  showFormula: true,              // Показывать формулу под результатом
  description: 'Area of circle'   // Описание (optional)
}
```

**Доступные переменные в expression:**
- Все `inputs` (по `name`)
- `PI` - число Пи (Math.PI)
- `E` - число Эйлера (Math.E)

**Поддерживаемые функции Math.js:**
- Арифметика: `+`, `-`, `*`, `/`, `^` (степень)
- Математика: `sqrt()`, `abs()`, `round()`, `floor()`, `ceil()`
- Тригонометрия: `sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`
- Логарифмы: `log()`, `log10()`, `exp()`
- Константы: `PI`, `E`

---

### Полный пример конфигурации калькулятора

**Пример: Калькулятор площади круга**

```javascript
{
  title: "Circle Area Calculator",
  inputs: [
    {
      name: 'radius',
      label: 'Radius',
      type: 'number',
      min: 1,
      max: 100,
      step: 0.5,
      default: 10,
      unit: 'cm',
      description: 'Circle radius'
    }
  ],
  formulas: [
    {
      name: 'area',
      label: 'Area',
      expression: 'PI * radius^2',
      unit: 'cm²',
      precision: 2,
      showFormula: true
    },
    {
      name: 'circumference',
      label: 'Circumference',
      expression: '2 * PI * radius',
      unit: 'cm',
      precision: 2,
      showFormula: true
    }
  ]
}
```

---

### Пример: Конвертер единиц

```javascript
{
  title: "Speed Converter",
  inputs: [
    {
      name: 'kmh',
      label: 'Speed (km/h)',
      type: 'number',
      min: 0,
      max: 300,
      step: 1,
      default: 100,
      unit: 'km/h'
    }
  ],
  formulas: [
    {
      name: 'ms',
      label: 'Meters per second',
      expression: 'kmh / 3.6',
      unit: 'm/s',
      precision: 2
    },
    {
      name: 'mph',
      label: 'Miles per hour',
      expression: 'kmh * 0.621371',
      unit: 'mph',
      precision: 2
    }
  ]
}
```

---

## Система шаблонов

### Местоположение

**Frontend-only:** Шаблоны хранятся как JavaScript-модули

```
frontend/src/templates/
├── artifactTemplates.js      # Центральный реестр
├── plots/                    # Графики
│   ├── line-chart.js
│   ├── scatter-plot.js
│   └── ... (новые шаблоны)
└── calculators/              # Калькуляторы
    ├── generic-calculator.js
    └── ... (новые шаблоны)
```

**Backend JSON templates:** НЕ используются (из исходного документа)

---

### Структура шаблона

**Файл шаблона (пример: `line-chart.js`):**

```javascript
export default {
  id: 'line-chart',             // Уникальный ID (для artifact:line-chart)
  name: 'Line Chart',           // Человекочитаемое название
  category: 'plots',            // Категория: 'plots' или 'calculators'
  description: 'Simple line chart for continuous data',

  config: {                     // Конфигурация по умолчанию
    title: 'Line Chart Example',
    data: [...],
    layout: {...}
  },

  examples: {                   // Варианты использования
    temperature: {              // artifact:line-chart:temperature
      title: 'Temperature Over Time',
      data: [...],
      layout: {...}
    },
    growth: {                   // artifact:line-chart:growth
      title: 'User Growth',
      data: [...],
      layout: {...}
    }
  },

  instructions: `              // Markdown-инструкция для пользователя
    ## How to use...
  `
};
```

---

### Регистрация шаблона

**Файл:** `frontend/src/templates/artifactTemplates.js`

```javascript
import lineChart from './plots/line-chart.js';
import scatterPlot from './plots/scatter-plot.js';
import genericCalculator from './calculators/generic-calculator.js';

const TEMPLATES = {
  'line-chart': lineChart,
  'scatter-plot': scatterPlot,
  'generic-calculator': genericCalculator
  // ... добавить новые
};
```

---

### Использование шаблонов

#### В уроках (Markdown)

```markdown
[📊 Базовый график](artifact:line-chart)
[📊 График температуры](artifact:line-chart:temperature)
```

**Парсинг:**
- `artifact:line-chart` → использует `config` из шаблона
- `artifact:line-chart:temperature` → использует `examples.temperature`

**Реализация:** [LessonViewer.jsx:167-222](../frontend/src/components/center/LessonViewer.jsx#L167-L222)

---

#### Из кода (JavaScript)

```javascript
import { getTemplate, getTemplateExample } from '@/templates/artifactTemplates';

// Получить базовый config
const template = getTemplate('line-chart');
const config = template.config;

// Получить example
const exampleConfig = getTemplateExample('line-chart', 'temperature');
```

**API функции:**
- `getTemplate(id)` - получить весь шаблон
- `getAllTemplates()` - список всех шаблонов
- `getTemplatesByCategory(category)` - шаблоны категории ('plots' или 'calculators')
- `hasTemplate(id)` - проверить существование
- `getTemplateConfig(id)` - только config (без examples)
- `getTemplateExample(id, exampleName)` - получить example

**Реализация:** [artifactTemplates.js:38-119](../frontend/src/templates/artifactTemplates.js#L38-L119)

---

## API и события

### Custom Event: `artifact:open`

**Назначение:** Открыть артефакт в CENTER container

**Формат события:**

```javascript
window.dispatchEvent(new CustomEvent('artifact:open', {
  detail: {
    type: 'plot' | 'calculator',    // Тип артефакта
    title: 'Chart Title',            // Заголовок
    config: { ... },                 // Конфигурация
    source: 'lesson' | 'chat',       // Источник
    templateId: 'line-chart',        // ID шаблона (optional)
    exampleName: 'temperature'       // Имя примера (optional)
  }
}));
```

**Обработка:** [CenterContainer.jsx:49-77](../frontend/src/components/center/CenterContainer.jsx#L49-L77)

**Поведение:**
- `source: 'lesson'` → SPLIT VIEW (урок + артефакт)
- `source: 'chat'` → FULLSCREEN (только артефакт)

---

### Toolbar Actions

**ArtifactViewer кнопки:**

1. **`</>`** - Toggle code view
   - Показывает JSON конфигурацию
   - Работает для plot и calculator

2. **`✕`** - Close artifact
   - Закрывает артефакт
   - Возвращает к уроку (LESSON_ONLY state)

3. **`📄 Show Lesson`** - Show lesson alongside artifact
   - Показывается только в FULLSCREEN режиме
   - Переключает в SPLIT VIEW (показывает урок)

**InteractivePlot кнопки:**

1. **`↺ Reset`** - Reset zoom/pan
2. **`📥 Export`** - Export as PNG
3. **`⊞/⊡`** - Toggle fullscreen mode (в рамках артефакта)

---

## Ограничения и известные баги

### Текущие ограничения

#### Графики (Plotly)
- ❌ **Тёмная тема:** Не поддерживается (только светлая)
- ❌ **3D графики:** Не реализованы (Plotly поддерживает, но не включено)
- ❌ **Анимации:** Нет поддержки time-series animations
- ❌ **Интерактивные callbacks:** Нельзя вызвать код при клике на график
- ✅ **Zoom/Pan:** Работает
- ✅ **Export PNG:** Работает

#### Калькуляторы (Math.js)
- ❌ **Select inputs:** Не реализованы (только number/slider)
- ❌ **Checkbox inputs:** Не реализованы
- ❌ **Conditional formulas:** Нельзя выбирать формулу в зависимости от условия
- ❌ **Multi-step calculations:** Нельзя использовать результат одной формулы в другой
- ✅ **Math.js functions:** Все стандартные функции работают
- ✅ **Live updates:** Работает

#### Система шаблонов
- ❌ **Backend templates:** Нет JSON-шаблонов на бэкенде
- ❌ **Template API:** Нет REST endpoints для шаблонов
- ❌ **Dynamic template loading:** Только статические imports
- ✅ **Frontend templates:** Работают как JS-модули
- ✅ **Examples:** Поддержка вариантов через `examples`

#### AI генерация артефактов
- 🚧 **В разработке (Фаза 4):** AI ещё не обучен генерировать артефакты
- ❌ **Нет правил в system prompt:** Нужно добавить
- ❌ **Нет event trigger:** AI не умеет вызывать `artifact:open`

---

### Известные баги

*Будет дополняться в процессе тестирования (Фаза 5)*

**Пока багов не выявлено** (система новая, тестирование в процессе)

---

### Планы развития

**Краткосрочно (Фаза 2-4):**
- [ ] Создать 5 новых шаблонов (bar, multi-line, area, unit-converter, formula-calc)
- [ ] Обучить AI генерировать артефакты
- [ ] Протестировать все сценарии использования

**Среднесрочно:**
- [ ] Добавить Select/Checkbox inputs для калькуляторов
- [ ] Реализовать тёмную тему для графиков
- [ ] Добавить больше типов Plotly графиков (pie, heatmap)

**Долгосрочно (для курса по двигателям):**
- [ ] Специализированные шаблоны: P-V diagram, T-S diagram
- [ ] Калькуляторы для термодинамики
- [ ] 3D визуализации (Three.js?)

---

## Связанные документы

**SSOT-ссылки:**
- [artifact-system-implementation-roadmap.md](../artifact-system-implementation-roadmap.md) - текущий roadmap
- [artifacts.md](artifacts.md) - руководство пользователя (Canvas и артефакты)
- [ARTIFACTS_SPEC.md](artifacts/ARTIFACTS_SPEC.md) - оригинальная спецификация (MVP)

**Код:**
- [InteractivePlot.jsx](../frontend/src/components/artifacts/InteractivePlot.jsx) - компонент графиков
- [Calculator.jsx](../frontend/src/components/artifacts/Calculator.jsx) - компонент калькуляторов
- [ArtifactViewer.jsx](../frontend/src/components/center/ArtifactViewer.jsx) - просмотрщик артефактов
- [LessonViewer.jsx](../frontend/src/components/center/LessonViewer.jsx) - парсинг artifact: ссылок
- [CenterContainer.jsx](../frontend/src/components/center/CenterContainer.jsx) - управление CENTER состоянием
- [artifactTemplates.js](../frontend/src/templates/artifactTemplates.js) - реестр шаблонов

---

## История изменений

| Дата | Версия | Изменения |
|------|--------|-----------|
| 2025-10-19 | 1.0 | Создание документа - Фаза 1 roadmap |

---

**Автор:** Claude Code (Sonnet 4.5)
**Для:** AI Learning Agent - Artifact System Guide
**Статус:** Актуально
**Следующий шаг:** Фаза 2 - Создание новых шаблонов
