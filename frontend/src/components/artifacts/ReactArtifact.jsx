import React, { Suspense } from 'react';
import ReactArtifactErrorBoundary from './ReactArtifactErrorBoundary';
import { getReactComponent, hasReactComponent } from '../../templates/react/registry';

/**
 * ReactArtifact - компонент для рендеринга React артефактов
 *
 * Функционал:
 * - Динамическая загрузка React компонентов через registry
 * - Suspense для loading состояния
 * - Error Boundary для обработки ошибок
 * - Передача props в загруженный компонент
 *
 * Архитектура:
 * 1. Проверяет наличие компонента в registry
 * 2. Получает lazy компонент
 * 3. Оборачивает в Error Boundary
 * 4. Оборачивает в Suspense с fallback
 * 5. Рендерит компонент с переданными props
 *
 * Согласно React docs:
 * - lazy() должен быть на уровне модуля (сделано в registry.js)
 * - Suspense требуется для lazy компонентов
 * - Error Boundary ловит ошибки при загрузке/рендере
 *
 * @param {Object} props
 * @param {string} props.componentId - ID компонента из registry
 * @param {Object} props.props - Props для передачи в компонент
 */
export default function ReactArtifact({ componentId, props: componentProps = {} }) {
  // Проверка существования компонента
  if (!hasReactComponent(componentId)) {
    return (
      <div className="artifact-not-found p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-yellow-900 mb-1">
              Component Not Found
            </h3>
            <p className="text-sm text-yellow-700">
              Component "<span className="font-mono">{componentId}</span>" is not registered in the React components registry.
            </p>
            {import.meta.env.DEV && (
              <details className="mt-3">
                <summary className="text-sm font-medium text-yellow-800 cursor-pointer hover:text-yellow-900">
                  Developer Info
                </summary>
                <div className="mt-2 p-3 bg-yellow-100 rounded text-xs">
                  <p className="mb-2">To add this component:</p>
                  <ol className="list-decimal list-inside space-y-1 text-yellow-800">
                    <li>Create component file in <code>frontend/src/templates/react/</code></li>
                    <li>Add lazy import in <code>registry.js</code></li>
                    <li>Add entry to REACT_COMPONENTS object</li>
                  </ol>
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Получаем lazy компонент из registry
  const LazyComponent = getReactComponent(componentId);

  return (
    <ReactArtifactErrorBoundary componentId={componentId}>
      <Suspense fallback={<LoadingFallback componentId={componentId} />}>
        <LazyComponent {...componentProps} />
      </Suspense>
    </ReactArtifactErrorBoundary>
  );
}

/**
 * Loading Fallback для Suspense
 *
 * Отображается пока lazy компонент загружается.
 * Согласно React docs: fallback может быть любым React элементом.
 *
 * @param {Object} props
 * @param {string} props.componentId - ID загружаемого компонента
 */
function LoadingFallback({ componentId }) {
  return (
    <div className="artifact-loading p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-4">
        {/* Spinner */}
        <div className="flex-shrink-0">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>

        {/* Loading text */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Loading component...
          </h3>
          <p className="text-sm text-gray-600">
            Loading <span className="font-mono text-indigo-600">{componentId}</span>
          </p>
        </div>
      </div>

      {/* Progress skeleton */}
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
      </div>
    </div>
  );
}
