import React from 'react';

/**
 * Error Boundary для React артефактов
 *
 * Ловит ошибки при загрузке и рендеринге React компонентов,
 * предотвращая крах всего приложения.
 *
 * Согласно React docs: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
class ReactArtifactErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние при ошибке
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Логирование ошибки (только в dev mode)
    if (import.meta.env.DEV) {
      console.error('React Artifact Error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="artifact-error-boundary p-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Failed to load component
              </h3>
              <p className="text-sm text-red-700 mb-4">
                Component "{this.props.componentId}" encountered an error.
              </p>
              {import.meta.env.DEV && this.state.error && (
                <details className="mb-4">
                  <summary className="text-sm font-medium text-red-800 cursor-pointer hover:text-red-900">
                    Error details (dev mode)
                  </summary>
                  <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                aria-label="Try loading component again"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ReactArtifactErrorBoundary;
