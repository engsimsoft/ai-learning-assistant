import { lazy } from 'react';

/**
 * React Components Registry
 *
 * Статический маппинг React артефактов для динамической загрузки.
 *
 * ВАЖНО: Используем статический маппинг вместо полностью динамических путей,
 * т.к. Vite требует статические пути для анализа на этапе сборки.
 *
 * Согласно Vite docs: https://vite.dev/guide/features.html#dynamic-import
 * "переменные представляют только имена файлов на одном уровне глубины"
 *
 * Подход:
 * - Каждый компонент объявлен через lazy() на уровне модуля (требование React)
 * - Статические пути известны на этапе сборки (требование Vite)
 * - Registry возвращает готовый lazy компонент по ID
 *
 * ADR: См. docs/decisions/004-react-artifacts-architecture.md
 */

// ============================================================================
// ТЕСТОВЫЕ КОМПОНЕНТЫ
// ============================================================================

/**
 * HelloReact - тестовый компонент для проверки системы
 */
const HelloReact = lazy(() => import('./HelloReact.jsx'));

// ============================================================================
// RECHARTS КОМПОНЕНТЫ (Фаза 2)
// ============================================================================

/**
 * RechartsLine - LineChart для временных рядов (Engine Power Curve)
 */
const RechartsLine = lazy(() => import('./recharts-line.jsx'));

/**
 * RechartsBar - BarChart для категориальных данных (Fuel Consumption)
 */
const RechartsBar = lazy(() => import('./recharts-bar.jsx'));

/**
 * RechartsArea - AreaChart для трендов (Engine Temperature)
 */
const RechartsArea = lazy(() => import('./recharts-area.jsx'));

// ============================================================================
// АНИМИРОВАННЫЕ КОМПОНЕНТЫ (Фаза 3)
// ============================================================================

/**
 * PVDiagram - Animated P-V Diagram for Otto Cycle (Level 5)
 */
const PVDiagram = lazy(() => import('./pv-diagram.jsx'));

/**
 * PVDiagramCanvas - Vanilla Canvas P-V Diagram (Level 6)
 */
const PVDiagramCanvas = lazy(() => import('./pv-diagram-canvas.jsx'));

// ============================================================================
// REGISTRY
// ============================================================================

/**
 * Маппинг ID → Lazy Component
 *
 * Каждый компонент загружается только при первом использовании.
 * React.lazy обеспечивает code splitting автоматически.
 */
export const REACT_COMPONENTS = {
  // Тестовые
  'hello-react': HelloReact,

  // Recharts (Фаза 2) ✅
  'recharts-line': RechartsLine,
  'recharts-bar': RechartsBar,
  'recharts-area': RechartsArea,

  // Анимации (Фаза 3) ✅
  'pv-diagram': PVDiagram,

  // Canvas (Level 6) ✅
  'pv-diagram-canvas': PVDiagramCanvas,
};

/**
 * Получить lazy компонент по ID
 *
 * @param {string} componentId - ID компонента из artifactTemplates
 * @returns {React.LazyExoticComponent | null} - Lazy компонент или null
 */
export function getReactComponent(componentId) {
  return REACT_COMPONENTS[componentId] || null;
}

/**
 * Проверить существование компонента
 *
 * @param {string} componentId - ID компонента
 * @returns {boolean} - true если компонент зарегистрирован
 */
export function hasReactComponent(componentId) {
  return componentId in REACT_COMPONENTS;
}

/**
 * Получить список всех зарегистрированных ID
 *
 * @returns {string[]} - Массив ID компонентов
 */
export function getRegisteredComponents() {
  return Object.keys(REACT_COMPONENTS);
}
