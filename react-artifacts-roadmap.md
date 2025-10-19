# React Artifacts Roadmap

**Дата создания:** 2025-10-19
**Статус:** Planning
**Приоритет:** High
**Причина:** Recharts графики выглядят потрясающе! Нужна поддержка React компонентов для Level 4-5.

---

## 🎯 Цель

Добавить поддержку **React компонентов** в систему артефактов, чтобы можно было создавать и отображать:
- **Level 4:** Recharts графики (line, bar, area, composed)
- **Level 5:** Анимированные диаграммы (P-V diagram, Otto cycle)
- **Level 6:** (future) 3D модели (Three.js, React Three Fiber)

---

## 📊 Текущее состояние

### Что работает сейчас:
- ✅ `type: 'plot'` → InteractivePlot (Plotly.js)
- ✅ `type: 'calculator'` → Calculator (Math.js)
- ✅ `type: 'code'` → iframe (HTML)
- ✅ `type: 'markdown'` → plain text
- ✅ `type: 'images'` → image gallery

### Что НЕ работает:
- ❌ `type: 'react'` или `display: 'react-interactive'`
- ❌ React компоненты из строки кода
- ❌ Dynamic import React компонентов
- ❌ Recharts, анимации, любые React-based артефакты

---

## 🛠️ Что нужно реализовать

### Фаза 1: Базовая поддержка React компонентов

**Цель:** Научить систему рендерить React компоненты из шаблонов.

**Задачи:**

1. **Создать новый тип артефакта: `react-component`**
   - Добавить в `ArtifactViewer.jsx` обработку `type: 'react-component'`
   - Создать компонент `ReactArtifact.jsx` для рендеринга

2. **Поддержать dynamic import компонентов**
   ```javascript
   // В template
   {
     type: 'react-component',
     component: './interactive/pv-diagram.jsx',
     props: { initialParams: {...} }
   }

   // В ArtifactViewer
   const Component = React.lazy(() => import(artifact.component));
   return <Suspense fallback={<Loading />}><Component {...props} /></Suspense>;
   ```

3. **Создать ReactArtifact.jsx**
   ```jsx
   import React, { Suspense } from 'react';

   export default function ReactArtifact({ component, props }) {
     const Component = React.lazy(() => import(`../templates/${component}`));

     return (
       <Suspense fallback={<div className="loading">Loading...</div>}>
         <Component {...props} />
       </Suspense>
     );
   }
   ```

**Deliverables:**
- ✅ ArtifactViewer поддерживает `type: 'react-component'`
- ✅ ReactArtifact.jsx создан и работает
- ✅ Dynamic import работает

**Success Criteria:**
- [ ] Можно создать артефакт с `type: 'react-component'`
- [ ] Компонент загружается и рендерится
- [ ] Props передаются корректно

---

### Фаза 2: Recharts интеграция (Level 4)

**Цель:** Создать работающие Recharts артефакты.

**Задачи:**

1. **Установить зависимости**
   ```bash
   cd frontend
   npm install recharts
   ```

2. **Создать Recharts шаблоны**
   - `frontend/src/templates/react/recharts-line.jsx`
   - `frontend/src/templates/react/recharts-bar.jsx`
   - `frontend/src/templates/react/recharts-area.jsx`

3. **Зарегистрировать в artifactTemplates.js**
   ```javascript
   const TEMPLATES = {
     // ... existing
     'recharts-line': {
       id: 'recharts-line',
       type: 'react-component',
       component: './react/recharts-line.jsx',
       props: { /* initial data */ }
     }
   };
   ```

4. **Обновить Lesson 1.5**
   - Заменить "Теория" на работающие ссылки
   - Добавить `[Recharts Line Chart](artifact:recharts-line)`

**Deliverables:**
- ✅ 3 работающих Recharts артефакта
- ✅ Lesson 1.5 обновлен с рабочими ссылками

**Success Criteria:**
- [ ] Recharts графики открываются по ссылкам
- [ ] SVG рендеринг работает корректно
- [ ] Hover, Tooltip, Legend работают

---

### Фаза 3: Анимированные диаграммы (Level 5)

**Цель:** Создать P-V диаграмму с анимацией.

**Задачи:**

1. **Создать компонент P-V Diagram**
   - `frontend/src/templates/react/pv-diagram.jsx`
   - useState для состояния (isAnimating, currentStep, params)
   - useEffect для анимации (setInterval)
   - Recharts + анимированная точка

2. **Добавить UI компоненты (если нужно)**
   ```bash
   npm install lucide-react  # Для иконок Play/Pause
   ```

3. **Зарегистрировать артефакт**
   ```javascript
   'pv-diagram': {
     id: 'pv-diagram',
     type: 'react-component',
     component: './react/pv-diagram.jsx',
     props: {
       compressionRatio: 9,
       maxPressure: 4.5
     }
   }
   ```

4. **Обновить Lesson 1.7**
   - Заменить "Теория" на работающую ссылку
   - Добавить `[P-V Диаграмма](artifact:pv-diagram)`

**Deliverables:**
- ✅ P-V диаграмма с анимацией работает
- ✅ Play/Pause/Reset кнопки функциональны
- ✅ Слайдеры параметров работают
- ✅ Lesson 1.7 обновлен

**Success Criteria:**
- [ ] Анимация запускается и останавливается
- [ ] Точка движется по циклу
- [ ] Параметры меняются в реальном времени
- [ ] Отображается текущая фаза цикла

---

### Фаза 4: Оптимизация и улучшения

**Цель:** Улучшить производительность и UX.

**Задачи:**

1. **Code splitting**
   - React.lazy для всех React артефактов
   - Suspense с красивым Loading экраном

2. **Error boundaries**
   - Обработка ошибок в React компонентах
   - Fallback UI при сбоях

3. **Performance**
   - Мемоизация тяжёлых вычислений
   - useMemo для data generation
   - useCallback для event handlers

4. **Accessibility**
   - ARIA labels для кнопок
   - Keyboard navigation (Space для Play/Pause, стрелки для слайдеров)

**Deliverables:**
- ✅ Code splitting работает
- ✅ Error boundaries на месте
- ✅ Performance оптимизирован
- ✅ A11y добавлен

---

## 📋 Технические детали

### Архитектура решения

```
frontend/src/
├── components/
│   ├── artifacts/
│   │   ├── InteractivePlot.jsx     (существует)
│   │   ├── Calculator.jsx          (существует)
│   │   └── ReactArtifact.jsx       (новый!)
│   └── center/
│       └── ArtifactViewer.jsx      (обновить)
│
├── templates/
│   ├── plots/                      (существует)
│   ├── calculators/                (существует)
│   └── react/                      (новая папка!)
│       ├── recharts-line.jsx       (новый)
│       ├── recharts-bar.jsx        (новый)
│       ├── recharts-area.jsx       (новый)
│       └── pv-diagram.jsx          (новый)
```

### Изменения в ArtifactViewer.jsx

```javascript
// Добавить в switch
case 'react-component':
  return config ? (
    <ReactArtifact
      component={config.component}
      props={config.props}
    />
  ) : (
    <div className="artifact-empty">No React component available</div>
  );
```

### Формат шаблона React артефакта

```javascript
// frontend/src/templates/react/recharts-line.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RechartsLineArtifact({ data, title }) {
  const defaultData = data || [
    { rpm: 1000, power: 80, torque: 150 },
    { rpm: 2000, power: 120, torque: 180 },
    // ...
  ];

  return (
    <div className="recharts-artifact">
      <h2>{title || 'Engine Power Curve'}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={defaultData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rpm" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="power" stroke="#6366f1" />
          <Line type="monotone" dataKey="torque" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### Регистрация в artifactTemplates.js

```javascript
import rechartsLineTemplate from './react/recharts-line.jsx';

const TEMPLATES = {
  // ... existing
  'recharts-line': {
    id: 'recharts-line',
    name: 'Recharts Line Chart',
    category: 'react',
    description: 'Modern React line chart with SVG rendering',
    config: {
      type: 'react-component',
      component: './react/recharts-line.jsx',
      props: {
        title: 'Engine Power Curve',
        data: [ /* ... */ ]
      }
    }
  }
};
```

---

## 🚀 План выполнения

### Краткосрочно (1-2 недели)
1. ✅ Фаза 1: Базовая поддержка React компонентов
2. ✅ Фаза 2: Recharts интеграция (2-3 примера)

### Среднесрочно (2-4 недели)
3. ✅ Фаза 3: Анимированная P-V диаграмма
4. ✅ Фаза 4: Оптимизация

### Долгосрочно (1-3 месяца)
5. 🔮 Level 6: Three.js / React Three Fiber для 3D моделей
6. 🔮 AI генерация React компонентов (более сложная задача)

---

## ⚠️ Потенциальные проблемы

### 1. Dynamic import ограничения
**Проблема:** Vite/Webpack может не поддерживать полностью динамические пути.

**Решение:**
- Использовать статические import с switch/case
- Или создать registry компонентов

```javascript
const REACT_COMPONENTS = {
  'recharts-line': React.lazy(() => import('./react/recharts-line.jsx')),
  'recharts-bar': React.lazy(() => import('./react/recharts-bar.jsx')),
  'pv-diagram': React.lazy(() => import('./react/pv-diagram.jsx'))
};

// В ReactArtifact
const Component = REACT_COMPONENTS[artifact.id];
```

### 2. Передача props
**Проблема:** Как передавать сложные данные (массивы, функции) через artifact config?

**Решение:**
- Хранить только сериализуемые данные в config
- Сложные данные генерировать внутри компонента
- Или использовать Context API

### 3. Стилизация
**Проблема:** Recharts нужен CSS, Tailwind может конфликтовать.

**Решение:**
- Использовать scoped styles или CSS modules
- Или импортировать recharts стили глобально

---

## 📝 Критерии успеха

### Фаза 1 готова, когда:
- [ ] `type: 'react-component'` работает в ArtifactViewer
- [ ] ReactArtifact.jsx рендерит простой компонент
- [ ] Dynamic import работает без ошибок

### Фаза 2 готова, когда:
- [ ] 3 Recharts графика открываются по ссылкам
- [ ] Hover, Tooltip, Legend работают
- [ ] Lesson 1.5 обновлен с работающими примерами

### Фаза 3 готова, когда:
- [ ] P-V диаграмма анимируется
- [ ] Play/Pause/Reset работают
- [ ] Слайдеры меняют параметры
- [ ] Lesson 1.7 обновлен

### Фаза 4 готова, когда:
- [ ] Code splitting оптимизирован
- [ ] Error boundaries добавлены
- [ ] Performance профилирован
- [ ] A11y проверен

---

## 🎉 Почему это важно

> **"Recharts графики выглядят потрясающе!"** — User feedback

1. **Образовательная ценность:** Показать студентам современный React подход
2. **Визуальное качество:** Recharts + Tailwind = красивые графики
3. **Интерактивность:** Анимации делают обучение увлекательным
4. **Масштабируемость:** Открывает путь для Level 6 (3D) и других инноваций

---

## 📚 Ресурсы

- [Recharts Documentation](https://recharts.org/)
- [React.lazy and Suspense](https://react.dev/reference/react/lazy)
- [Vite Dynamic Imports](https://vitejs.dev/guide/features.html#dynamic-import)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) (для Level 6)

---

**Next Action:** Начать Фазу 1 - создать ReactArtifact.jsx и добавить поддержку `type: 'react-component'` в ArtifactViewer.jsx
