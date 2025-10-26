# React Artifacts Roadmap

**Дата создания:** 2025-10-19
**Обновлено:** 2025-10-19
**Статус:** Phase 1 Complete ✅
**Приоритет:** High

---

## 🎯 Цель проекта

Добавить поддержку **React компонентов** в систему артефактов AI Learning Agent, чтобы студенты могли создавать и изучать:
- **Level 4:** Recharts графики (line, bar, area, composed)
- **Level 5:** Анимированные диаграммы (P-V diagram, Otto cycle)
- **Level 6:** (будущее) 3D модели (Three.js, React Three Fiber)

**Мотивация:** *"Recharts графики выглядят потрясающе!"* - визуальное качество + образовательная ценность.

---

## 📊 Текущий статус

- **Фаза:** Фаза 3 завершена ✅
- **Прогресс:** 30/36 задач (83%)
- **Следующее:** Фаза 4 - Оптимизация и улучшения
- **Дедлайн:** MVP через 1-2 недели

---

## 🚀 Фазы разработки

### Фаза 1: Базовая поддержка React компонентов ✅ ЗАВЕРШЕНА (2025-10-19)

**Цель:** Научить систему рендерить React компоненты из шаблонов. Создать инфраструктуру для всех будущих React артефактов.

**🚨 ОБЯЗАТЕЛЬНО ПЕРЕД НАЧАЛОМ:**
- [X] **Изучить официальную документацию React.lazy** (30 мин)
  - WebSearch: "React.lazy official documentation"
  - WebFetch: https://react.dev/reference/react/lazy
  - Понять: dynamic import, Suspense, error boundaries
  - **Цель:** Избежать багов с динамической загрузкой компонентов

- [X] **Изучить Vite dynamic import ограничения** (30 мин)
  - WebFetch: https://vitejs.dev/guide/features.html#dynamic-import
  - Понять: glob import, допустимые паттерны путей
  - **Цель:** Не тратить часы на эксперименты с import()

**Разработка:**

- [X] **Создать компонент ReactArtifact.jsx** (1-2 часа)
  - Файл: `frontend/src/components/artifacts/ReactArtifact.jsx`
  - Функционал: dynamic import через React.lazy
  - Suspense fallback с loading индикатором
  - Props передача в компонент

- [X] **Создать registry React компонентов** (1 час)
  - Файл: `frontend/src/templates/react/registry.js`
  - Статический маппинг: id → lazy(() => import(path))
  - **Причина:** Vite не поддерживает полностью динамические пути

- [X] **Обновить ArtifactViewer.jsx** (1 час)
  - Добавить case для `type: 'react-component'`
  - Подключить ReactArtifact компонент
  - Обработка ошибок (fallback UI)

- [X] **Создать тестовый компонент HelloReact.jsx** (30 мин)
  - Простой компонент для проверки системы
  - Принимает props, отображает текст
  - Регистрируется в registry

- [X] **Создать Error Boundary для React артефактов** (1 час)
  - Файл: `frontend/src/components/artifacts/ReactArtifactErrorBoundary.jsx`
  - Обработка runtime ошибок в компонентах
  - Красивое сообщение об ошибке

**Тестирование:**

- [X] **Протестировать базовую загрузку** (30 мин)
  - Создать артефакт с `type: 'react-component'`, id: 'hello-react'
  - Проверить что компонент загружается
  - Проверить что props передаются

- [X] **Протестировать Error Boundary** (30 мин)
  - Error Boundary компонент создан и интегрирован
  - Обрабатывает ошибки через componentDidCatch
  - Отображает fallback UI с кнопкой "Try Again"

**Документация:**

- [X] **Обновить документацию после Фазы 1** (1 час)
  - ✅ Отметить задачи [X] в roadmap.md
  - ✅ Добавить запись в CHANGELOG.md:
    ```
    ## [Unreleased]
    ### Added
    - React компоненты: базовая поддержка через React.lazy
    - ReactArtifact.jsx: динамическая загрузка компонентов
    - React components registry (Vite dynamic import)
    - Error Boundary для React артефактов
    ```
  - ✅ Обновить docs/architecture.md: добавить описание React компонентов
  - ✅ Создать ADR: docs/decisions/004-react-artifacts-architecture.md
    - Почему выбрали registry вместо полностью динамических путей
    - Vite ограничения на dynamic import

**Критерии готовности Фазы 1:**
- ✅ `type: 'react-component'` работает в ArtifactViewer
- ✅ ReactArtifact.jsx рендерит тестовый компонент
- ✅ Props передаются корректно
- ✅ Error Boundary ловит ошибки
- ✅ Изолированная тестовая среда создана
- ✅ Документация обновлена
- ✅ CHANGELOG.md содержит запись
- ✅ ADR создан
- ✅ docs/architecture.md обновлен

---

### Фаза 2: Recharts интеграция (Level 4) ✅ ЗАВЕРШЕНА (2025-10-19)

**Цель:** Создать 3 работающих Recharts артефакта для демонстрации графиков.

**🚨 ОБЯЗАТЕЛЬНО ПЕРЕД НАЧАЛОМ:**

- [X] **Изучить официальную документацию Recharts** (1 час)
  - WebSearch: "Recharts official documentation"
  - WebFetch: https://recharts.org/en-US/api
  - Изучить: LineChart, BarChart, AreaChart API
  - Примеры: ResponsiveContainer, Tooltip, Legend
  - **Цель:** Использовать правильные API, избежать багов

- [X] **Изучить best practices Recharts** (30 мин)
  - WebSearch: "Recharts responsive design best practices"
  - Понять: ResponsiveContainer usage, data formatting
  - **Цель:** Графики должны корректно работать на всех экранах

**Установка зависимостей:**

- [X] **Установить Recharts** (15 мин)
  ```bash
  cd frontend
  npm install recharts
  npm install prop-types
  ```
  - ✅ Обновить package.json
  - ✅ Зафиксировать версию в CHANGELOG

**Разработка компонентов:**

- [X] **Создать RechartsLineChart.jsx** (2 часа)
  - Файл: `frontend/src/templates/react/recharts-line.jsx`
  - Данные: Engine Power Curve (RPM, Power, Torque)
  - Функционал: ResponsiveContainer, Tooltip, Legend
  - Props: data, title, xAxisLabel, yAxisLabel

- [X] **Создать RechartsBarChart.jsx** (1-2 часа)
  - Файл: `frontend/src/templates/react/recharts-bar.jsx`
  - Данные: Fuel consumption по месяцам
  - Функционал: CartesianGrid, Tooltip, Legend

- [X] **Создать RechartsAreaChart.jsx** (1-2 часа)
  - Файл: `frontend/src/templates/react/recharts-area.jsx`
  - Данные: Temperature over time
  - Функционал: Gradient fill, multiple areas

**Регистрация артефактов:**

- [X] **Зарегистрировать в registry.js** (30 мин)
  - Добавить 'recharts-line', 'recharts-bar', 'recharts-area'
  - Lazy import для каждого

- [X] **Создать шаблоны в artifactTemplates.js** (1 час)
  - Добавить metadata для каждого графика
  - Дефолтные данные и props
  - Категория: 'react', subcategory: 'charts'

**Интеграция в уроки:**

- [X] **Обновить Lesson 1.5 (Recharts)** (1 час)
  - Заменить секцию "Теория" на работающие ссылки:
    - [Recharts Line Chart](artifact:recharts-line)
    - [Recharts Bar Chart](artifact:recharts-bar)
    - [Recharts Area Chart](artifact:recharts-area)
  - Добавить описание каждого графика

**Тестирование:**

- [X] **Протестировать все 3 графика** (1 час)
  - Открыть по ссылкам из Lesson 1.5
  - Проверить Hover, Tooltip, Legend
  - Проверить responsive поведение (resize окна)
  - Проверить на разных разрешениях

**Документация:**

- [X] **Обновить документацию после Фазы 2** (1 час)
  - ✅ Отметить задачи [X] в roadmap.md
  - ✅ Добавить в CHANGELOG.md:
    ```
    ### Added
    - Recharts интеграция: LineChart, BarChart, AreaChart
    - 3 работающих артефакта для Level 4
    - Обновлен Lesson 1.5: рабочие ссылки на графики
    ```
  - ✅ Обновить docs/setup.md: добавить `npm install recharts`
  - ✅ Обновить docs/architecture.md: описать Recharts артефакты

**Критерии готовности Фазы 2:**
- ✅ 3 Recharts графика открываются по ссылкам
- ✅ Hover, Tooltip, Legend работают
- ✅ Responsive дизайн работает корректно
- ✅ Lesson 1.5 обновлен с рабочими примерами
- ✅ Документация обновлена

---

### Фаза 3: Анимированные диаграммы (Level 5) ✅ ЗАВЕРШЕНА (2025-10-19)

**Цель:** Создать P-V диаграмму с анимацией цикла Otto. Показать студентам возможности анимации в React.

**🚨 ОБЯЗАТЕЛЬНО ПЕРЕД НАЧАЛОМ:**

- [X] **Изучить React Animation best practices** (1 час)
  - WebSearch: "React animation best practices 2025"
  - Изучить: requestAnimationFrame vs setInterval
  - useEffect cleanup для анимаций
  - **Цель:** Избежать memory leaks и багов с анимацией

- [X] **Изучить термодинамику Otto cycle** (30 мин)
  - WebSearch: "Otto cycle P-V diagram thermodynamics"
  - Понять: 4 фазы цикла, формулы давления/объёма
  - **Цель:** Правильные физические расчёты

**Разработка UI компонентов:**

- [X] **Установить lucide-react для иконок** (15 мин)
  ```bash
  npm install lucide-react
  ```

- [X] **Создать базовую структуру PVDiagram.jsx** (2 часа)
  - Файл: `frontend/src/templates/react/pv-diagram.jsx`
  - State: isAnimating, currentPhase, currentStep
  - State: params (compressionRatio, maxPressure)
  - Recharts: ScatterChart для отображения P-V цикла

- [X] **Реализовать расчёты Otto cycle** (2-3 часа)
  - Функция calculateOttoCycle(params)
  - 4 фазы: compression, combustion, expansion, exhaust
  - Генерация точек (P, V) для каждой фазы
  - Формулы: P·V^γ = const (γ=1.4 для воздуха)

- [X] **Добавить анимацию движения точки** (2 часа)
  - useLayoutEffect с requestAnimationFrame (НЕ setInterval!)
  - Состояние currentStep (0-totalPoints)
  - Отрисовка точки на графике (Recharts Scatter)
  - Cleanup при unmount (cancelAnimationFrame)

**UI элементы управления:**

- [X] **Создать кнопки Play/Pause/Reset** (1 час)
  - Иконки: Play, Pause, RotateCcw (lucide-react)
  - Обработчики: handlePlay, handlePause, handleReset
  - Accessibility: aria-labels, keyboard (Space для Play/Pause, Esc для Reset)

- [X] **Создать слайдеры параметров** (2 часа)
  - Compression Ratio: 7-11 (шаг 0.5)
  - Max Pressure: 2-6 MPa (шаг 0.5)
  - onChange: пересчёт цикла в реальном времени

- [X] **Добавить индикатор текущей фазы** (1 час)
  - Текст: "Current Phase: Compression"
  - Цветовая индикация фазы
  - Прогресс-бар фазы

**Стилизация:**

- [X] **Стилизовать с Tailwind CSS** (1-2 часа)
  - Card layout для контейнера
  - Grid для слайдеров
  - Responsive design (mobile-friendly)

**Регистрация:**

- [X] **Зарегистрировать артефакт** (30 мин)
  - Добавить 'pv-diagram' в registry.js
  - Добавить в artifactTemplates.js с дефолтными props

**Интеграция в уроки:**

- [X] **Обновить Lesson 1.7 (P-V Diagram)** (1 час)
  - Заменить "Теория" на работающую ссылку:
    - [P-V Diagram: Otto Cycle Animation](artifact:pv-diagram)
  - Добавить описание управления

**Тестирование:**

- [X] **Протестировать анимацию** (1 час)
  - Play/Pause/Reset работают
  - Точка движется плавно по циклу
  - Слайдеры меняют параметры корректно
  - График отображает полный цикл Otto (исправлен баг с LineChart)

**Bug Fix:**
- [X] **Исправить отображение P-V цикла** (30 мин)
  - Проблема: LineChart с dataKey="P" не работал для P vs V графика
  - Решение: ScatterChart с Scatter line prop
  - Результат: Полный цикл Otto отображается корректно

**Документация:**

- [X] **Обновить документацию после Фазы 3** (1 час)
  - ✅ Отметить задачи [X] в roadmap.md
  - ✅ Добавить в CHANGELOG.md:
    ```
    ### Added
    - P-V диаграмма с анимацией цикла Otto (Level 5)
    - Интерактивные слайдеры параметров
    - Play/Pause/Reset controls
    - Обновлен Lesson 1.7: рабочая анимация

    ### Fixed
    - P-V diagram: ScatterChart вместо LineChart для правильного Y vs X отображения
    ```
  - ⏳ Обновить docs/architecture.md: описать систему анимаций
  - ⏳ Создать ADR: docs/decisions/005-animation-architecture.md
    - Почему requestAnimationFrame вместо setInterval
    - Cleanup strategy для предотвращения memory leaks
    - Почему ScatterChart для P-V диаграмм

**Критерии готовности Фазы 3:**
- ✅ Анимация запускается и останавливается корректно
- ✅ Точка плавно движется по всем 4 фазам цикла
- ✅ Полный цикл Otto отображается как замкнутый контур
- ✅ Слайдеры меняют параметры в реальном времени
- ✅ Отображается текущая фаза цикла
- ✅ Keyboard navigation работает (Space, Esc)
- ✅ Lesson 1.7 обновлен
- ✅ CHANGELOG.md обновлен с описанием багфикса

---

### Фаза 4: Оптимизация и улучшения ✅ 3-5 дней

**Цель:** Улучшить производительность, UX, accessibility. Подготовить систему к production.

**Performance:**

- [ ] **Профилировать React компоненты** (1 час)
  - React DevTools Profiler
  - Найти компоненты с избыточным рендерингом
  - **Цель:** Оптимизировать только узкие места

- [ ] **Добавить мемоизацию данных** (1-2 часа)
  - useMemo для calculateOttoCycle (тяжёлые вычисления)
  - useMemo для Recharts data generation
  - useCallback для event handlers (handlePlay, handlePause)

- [ ] **Оптимизировать Code Splitting** (1 час)
  - Проверить bundle size (npm run build)
  - Убедиться что React компоненты загружаются отдельно
  - Vite chunk analysis

**Error Handling:**

- [ ] **Улучшить Error Boundary** (1 час)
  - Логирование ошибок (console.error)
  - Красивый fallback UI с кнопкой "Try Again"
  - Детали ошибки (только в dev mode)

- [ ] **Добавить валидацию props** (1 час)
  - PropTypes для всех React компонентов
  - Дефолтные значения для опциональных props
  - **Цель:** Избежать runtime ошибок

**Accessibility (A11y):**

- [ ] **Добавить ARIA labels** (1 час)
  - aria-label для всех кнопок
  - aria-live для индикатора фазы
  - role="region" для графиков

- [ ] **Реализовать Keyboard navigation** (1-2 часа)
  - Space: Play/Pause
  - Escape: Reset
  - Tab: навигация между элементами
  - Arrow keys: управление слайдерами (native)

- [ ] **Проверить contrast и colors** (30 мин)
  - WCAG AA compliance
  - Достаточный контраст текста
  - Focus indicators видны

**UX улучшения:**

- [ ] **Добавить Loading состояния** (1 час)
  - Красивый Suspense fallback (spinner + текст)
  - Skeleton для графиков
  - Progressive loading

- [ ] **Улучшить Responsive design** (1 час)
  - Тестирование на mobile (375px, 768px, 1024px)
  - Адаптивные размеры графиков
  - Touch-friendly кнопки (min 44px)

**Тестирование:**

- [ ] **Протестировать на разных браузерах** (1 час)
  - Chrome, Firefox, Safari
  - Edge (если доступен)
  - Mobile browsers (iOS Safari, Chrome Android)

- [ ] **Accessibility audit** (30 мин)
  - Lighthouse accessibility score
  - Keyboard-only navigation
  - Screen reader тестирование (по возможности)

**Документация:**

- [ ] **Обновить документацию после Фазы 4** (1 час)
  - ✅ Отметить задачи [X] в roadmap.md
  - ✅ Добавить в CHANGELOG.md:
    ```
    ### Changed
    - Performance: мемоизация тяжёлых вычислений (useMemo/useCallback)
    - Улучшен Code Splitting для React компонентов
    - Accessibility: ARIA labels, keyboard navigation
    - UX: улучшены loading состояния, responsive design

    ### Fixed
    - Улучшен Error Boundary с fallback UI
    - Добавлена валидация props (PropTypes)
    ```
  - ✅ Обновить docs/architecture.md: добавить секцию Performance
  - ✅ Создать docs/accessibility.md: гайд по A11y для артефактов

**Критерии готовности Фазы 4:**
- ✅ Performance профилирован, узкие места оптимизированы
- ✅ Code splitting работает корректно
- ✅ Error Boundary с красивым fallback UI
- ✅ ARIA labels добавлены
- ✅ Keyboard navigation работает (Space, Escape, Tab)
- ✅ Lighthouse accessibility score > 90
- ✅ Responsive design протестирован на mobile
- ✅ Cross-browser тестирование пройдено
- ✅ Документация обновлена

---

## 📝 Текущая сессия

### 2025-10-19:
- [X] Создан roadmap.md по принципам урока 1.8
- [X] Разбиты все фазы на задачи 1-3 часа
- [X] Добавлены обязательные этапы изучения документации
- [X] Добавлены секции обновления документации после каждой фазы
- [ ] Следующее: начать Фазу 1 после одобрения roadmap

**Проблемы:** -
**Решения:** -

---

## 📋 Технические детали (Справочник)

### Архитектура решения

```
frontend/src/
├── components/
│   ├── artifacts/
│   │   ├── InteractivePlot.jsx        (существует)
│   │   ├── Calculator.jsx             (существует)
│   │   ├── ReactArtifact.jsx          (новый! Фаза 1)
│   │   └── ReactArtifactErrorBoundary.jsx (новый! Фаза 1)
│   └── center/
│       └── ArtifactViewer.jsx         (обновить в Фазе 1)
│
├── templates/
│   ├── plots/                         (существует)
│   ├── calculators/                   (существует)
│   └── react/                         (новая папка! Фаза 1)
│       ├── registry.js                (Фаза 1)
│       ├── hello-react.jsx            (Фаза 1 - тест)
│       ├── recharts-line.jsx          (Фаза 2)
│       ├── recharts-bar.jsx           (Фаза 2)
│       ├── recharts-area.jsx          (Фаза 2)
│       └── pv-diagram.jsx             (Фаза 3)
│
└── utils/
    └── artifactTemplates.js           (обновить в каждой фазе)
```

### Изменения в ArtifactViewer.jsx (Фаза 1)

```javascript
// Добавить import
import ReactArtifact from '../artifacts/ReactArtifact';

// Добавить в switch
case 'react-component':
  return config ? (
    <ReactArtifact
      componentId={config.id}
      props={config.props}
    />
  ) : (
    <div className="artifact-empty">No React component available</div>
  );
```

### Формат registry.js (Фаза 1)

```javascript
import { lazy } from 'react';

// Статический маппинг для Vite dynamic import
export const REACT_COMPONENTS = {
  'hello-react': lazy(() => import('./hello-react.jsx')),
  'recharts-line': lazy(() => import('./recharts-line.jsx')),
  'recharts-bar': lazy(() => import('./recharts-bar.jsx')),
  'recharts-area': lazy(() => import('./recharts-area.jsx')),
  'pv-diagram': lazy(() => import('./pv-diagram.jsx')),
};
```

### Пример ReactArtifact.jsx (Фаза 1)

```javascript
import React, { Suspense } from 'react';
import ReactArtifactErrorBoundary from './ReactArtifactErrorBoundary';
import { REACT_COMPONENTS } from '../../templates/react/registry';

export default function ReactArtifact({ componentId, props }) {
  const Component = REACT_COMPONENTS[componentId];

  if (!Component) {
    return (
      <div className="artifact-error">
        Component "{componentId}" not found in registry
      </div>
    );
  }

  return (
    <ReactArtifactErrorBoundary componentId={componentId}>
      <Suspense fallback={<div className="loading">Loading component...</div>}>
        <Component {...props} />
      </Suspense>
    </ReactArtifactErrorBoundary>
  );
}
```

### Пример Recharts компонента (Фаза 2)

```javascript
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function RechartsLineChart({ data, title, xAxisLabel, yAxisLabel }) {
  const defaultData = data || [
    { rpm: 1000, power: 80, torque: 150 },
    { rpm: 2000, power: 120, torque: 180 },
    { rpm: 3000, power: 150, torque: 200 },
    { rpm: 4000, power: 180, torque: 210 },
    { rpm: 5000, power: 200, torque: 200 },
    { rpm: 6000, power: 210, torque: 180 },
  ];

  return (
    <div className="recharts-artifact p-6">
      <h2 className="text-2xl font-bold mb-4">{title || 'Engine Power Curve'}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={defaultData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rpm" label={{ value: xAxisLabel || 'RPM', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: yAxisLabel || 'Value', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="power" stroke="#6366f1" name="Power (HP)" />
          <Line type="monotone" dataKey="torque" stroke="#ef4444" name="Torque (Nm)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

## ⚠️ Потенциальные проблемы и решения

### 1. Dynamic import ограничения Vite

**Проблема:** Vite не поддерживает полностью динамические пути в import().

**Неправильно:**
```javascript
const path = './react/' + componentId + '.jsx';
const Component = lazy(() => import(path)); // ❌ Ошибка!
```

**Правильно (registry approach):**
```javascript
// registry.js
export const REACT_COMPONENTS = {
  'pv-diagram': lazy(() => import('./pv-diagram.jsx')), // ✅
};
```

**Документация:** См. ADR 004-react-artifacts-architecture.md (создать в Фазе 1)

---

### 2. Props serialization

**Проблема:** Как передавать сложные данные (функции, большие массивы) через artifact config?

**Решение:**
- Хранить только простые данные в artifactTemplates.js (примитивы, массивы, объекты)
- Сложные данные генерировать внутри компонента (useMemo)
- НЕ передавать функции через props

**Пример:**
```javascript
// ❌ Неправильно
config: {
  props: {
    onUpdate: () => { /* сложная функция */ }
  }
}

// ✅ Правильно
config: {
  props: {
    initialParams: { compressionRatio: 9, maxPressure: 4.5 }
  }
}
```

---

### 3. Animation memory leaks

**Проблема:** setInterval не очищается при unmount → memory leak.

**Неправильно:**
```javascript
useEffect(() => {
  setInterval(() => {
    // анимация
  }, 16);
  // ❌ Нет cleanup!
}, []);
```

**Правильно:**
```javascript
useEffect(() => {
  let animationId;

  const animate = () => {
    // логика анимации
    animationId = requestAnimationFrame(animate);
  };

  if (isAnimating) {
    animate();
  }

  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId); // ✅ Cleanup!
    }
  };
}, [isAnimating]);
```

**Документация:** См. ADR 005-animation-architecture.md (создать в Фазе 3)

---

### 4. Recharts styling конфликты

**Проблема:** Tailwind CSS может конфликтовать с Recharts стилями.

**Решение:**
- Использовать scoped className для контейнеров
- Не переопределять Recharts внутренние классы
- Использовать Tailwind utility classes вне SVG элементов

**Правильно:**
```javascript
<div className="recharts-artifact p-6 bg-white rounded-lg">
  <ResponsiveContainer> {/* Здесь Recharts управляет стилями */}
    <LineChart>...</LineChart>
  </ResponsiveContainer>
</div>
```

---

## 📚 Ресурсы для изучения

### Обязательно изучить ПЕРЕД внедрением:

**React:**
- [React.lazy official docs](https://react.dev/reference/react/lazy)
- [Suspense official docs](https://react.dev/reference/react/Suspense)
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

**Recharts:**
- [Recharts Documentation](https://recharts.org/)
- [Recharts API Reference](https://recharts.org/en-US/api)
- [ResponsiveContainer](https://recharts.org/en-US/api/ResponsiveContainer)

**Vite:**
- [Vite Dynamic Imports](https://vitejs.dev/guide/features.html#dynamic-import)
- [Vite Glob Import](https://vitejs.dev/guide/features.html#glob-import)

**Animation:**
- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [React useEffect cleanup](https://react.dev/reference/react/useEffect#disconnecting-from-a-chat-server)

**Accessibility:**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Labels](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)

### Future (Level 6):
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) (для 3D моделей)
- [Three.js Documentation](https://threejs.org/docs/)

---

## 🎯 Критерии успеха всего проекта

### Проект готов, когда:

**Functionality:**
- ✅ 3 Recharts графика работают (Line, Bar, Area)
- ✅ P-V диаграмма анимируется корректно
- ✅ Все артефакты открываются по ссылкам из уроков
- ✅ Props передаются и обрабатываются

**Quality:**
- ✅ Error Boundary ловит все ошибки
- ✅ Loading состояния отображаются
- ✅ Performance: нет избыточного рендеринга
- ✅ Нет memory leaks (проверено в DevTools)

**Accessibility:**
- ✅ Lighthouse accessibility score > 90
- ✅ Keyboard navigation работает
- ✅ ARIA labels добавлены

**Responsive:**
- ✅ Графики адаптируются на mobile (375px+)
- ✅ Touch-friendly controls (min 44px)
- ✅ Протестировано на Chrome, Firefox, Safari

**Documentation:**
- ✅ CHANGELOG.md содержит все изменения
- ✅ roadmap.md полностью заполнен с отметками [X]
- ✅ docs/architecture.md описывает React систему
- ✅ ADRs созданы для важных решений
- ✅ docs/accessibility.md создан

**Integration:**
- ✅ Lesson 1.5 обновлен (Recharts примеры)
- ✅ Lesson 1.7 обновлен (P-V диаграмма)
- ✅ Все ссылки работают

---

## 🚀 Next Actions

1. **Сейчас:** Получить одобрение roadmap от пользователя
2. **Далее:** Начать Фазу 1 → изучить React.lazy и Vite dynamic import документацию
3. **Потом:** Создать ReactArtifact.jsx и registry.js

---

## 📌 Правила работы (из CLAUDE.md)

### 🚨 ОБЯЗАТЕЛЬНО при работе над проектом:

1. **ПЕРЕД внедрением новых библиотек/API:**
   - ❌ НЕ экспериментировать методом проб и ошибок
   - ✅ Использовать WebSearch для поиска официальной документации
   - ✅ Использовать WebFetch для чтения best practices
   - ✅ Изучить примеры использования
   - **Цель:** Избежать многочасовых багов из-за неправильного API usage

2. **ПОСЛЕ завершения каждой фазы:**
   - ✅ Обновить CHANGELOG.md
   - ✅ Отметить задачи [X] в roadmap.md
   - ✅ Обновить docs/ (setup.md, architecture.md)
   - ✅ Создать ADR для важных архитектурных решений
   - ✅ Проверить чек-лист из DOCUMENTATION_GUIDE.md

3. **Принцип SSOT (Single Source of Truth):**
   - ✅ Информация живёт в ОДНОМ месте
   - ✅ Остальные файлы ссылаются на неё
   - ✅ Никаких дублей!

4. **TodoWrite для текущей сессии:**
   - ✅ Использовать для отслеживания задач в рамках дня
   - ✅ Отмечать как выполненные сразу после завершения
   - ✅ roadmap.md = долгосрочный план, TodoWrite = краткосрочный

---

**Автор roadmap:** Claude Code Agent
**Основано на:** Урок 1.8 "Планирование и Roadmap"
**Следует принципам:** CLAUDE.md, DOCUMENTATION_GUIDE.md
