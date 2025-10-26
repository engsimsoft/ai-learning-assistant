import React from 'react';

/**
 * Тестовый React компонент для проверки системы артефактов
 *
 * Простой компонент, который принимает props и отображает их.
 * Используется для тестирования:
 * - Загрузки через React.lazy
 * - Передачи props
 * - Suspense fallback
 * - Error Boundary
 */
export default function HelloReact({ title, message, timestamp }) {
  const defaultTitle = title || 'Hello from React Artifact!';
  const defaultMessage = message || 'This is a dynamically loaded React component.';

  return (
    <div className="hello-react-artifact p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-indigo-900 mb-2">
            {defaultTitle}
          </h2>
          <p className="text-indigo-700 mb-4">
            {defaultMessage}
          </p>
          <div className="bg-white/50 p-4 rounded border border-indigo-100">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Component Info:</h3>
            <ul className="text-sm text-indigo-600 space-y-1">
              <li>✅ Loaded via React.lazy</li>
              <li>✅ Props passed successfully</li>
              <li>✅ Wrapped in Suspense</li>
              <li>✅ Protected by Error Boundary</li>
              {timestamp && (
                <li className="mt-2 pt-2 border-t border-indigo-200">
                  Loaded at: {new Date(timestamp).toLocaleTimeString()}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
