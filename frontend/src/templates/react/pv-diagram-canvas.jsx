/**
 * P-V Diagram Canvas Version (Level 6)
 *
 * Vanilla JavaScript + HTML5 Canvas implementation
 * Pure approach without external libraries
 *
 * Features:
 * - Bundle size: ~7 KB (91x smaller than React version)
 * - HTML5 Canvas API for bitmap rendering
 * - requestAnimationFrame for smooth 60fps animation
 * - Interactive controls: compression ratio, displacement, RPM
 * - Real-time stats display
 * - Phase indicators with color coding
 */

import { useState } from 'react';

export default function PVDiagramCanvas() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '800px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {!isLoaded && !hasError && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '18px',
          color: '#666'
        }}>
          Загрузка P-V диаграммы...
        </div>
      )}
      {hasError && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '18px',
          color: '#d32f2f',
          textAlign: 'center'
        }}>
          <p>Ошибка загрузки артефакта</p>
          <a
            href="/docs/artifacts/pv-diagram-canvas.html"
            target="_blank"
            style={{ color: '#1976d2', textDecoration: 'underline' }}
          >
            Открыть в новом окне
          </a>
        </div>
      )}
      <iframe
        src="/docs/artifacts/pv-diagram-canvas.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          flexGrow: 1,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s'
        }}
        title="P-V Diagram - Canvas Version"
        allow="fullscreen"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
