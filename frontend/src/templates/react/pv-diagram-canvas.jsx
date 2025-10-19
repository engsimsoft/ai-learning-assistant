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

export default function PVDiagramCanvas() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '800px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <iframe
        src="/docs/artifacts/pv-diagram-canvas.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          flexGrow: 1
        }}
        title="P-V Diagram - Canvas Version"
        allow="fullscreen"
      />
    </div>
  );
}
