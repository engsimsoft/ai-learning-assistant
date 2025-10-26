/**
 * InteractivePlot Component
 * Interactive charts and graphs using Plotly.js
 * Supports: line, scatter, bar charts with zoom, pan, hover
 */
import { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist-min';
import './InteractivePlot.css';

export default function InteractivePlot({ config, onUpdate }) {
  const plotRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /**
   * Render Plotly chart
   */
  useEffect(() => {
    if (!plotRef.current || !config) return;

    try {
      const data = config.data || [];
      const layout = {
        ...config.layout,
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff',
        font: {
          family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          size: 14,
          color: '#111827'
        },
        xaxis: {
          ...config.layout?.xaxis,
          gridcolor: '#e5e7eb',
          zerolinecolor: '#d1d5db',
          title: {
            ...config.layout?.xaxis?.title,
            font: { color: '#111827' }
          }
        },
        yaxis: {
          ...config.layout?.yaxis,
          gridcolor: '#e5e7eb',
          zerolinecolor: '#d1d5db',
          title: {
            ...config.layout?.yaxis?.title,
            font: { color: '#111827' }
          }
        },
        autosize: true
      };

      const plotConfig = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['lasso2d', 'select2d']
      };

      Plotly.newPlot(plotRef.current, data, layout, plotConfig);
    } catch (error) {
      console.error('Plotly rendering error:', error);
    }

    // Cleanup on unmount
    return () => {
      if (plotRef.current) {
        Plotly.purge(plotRef.current);
      }
    };
  }, [config]);

  /**
   * Export chart as PNG
   */
  const handleExportPNG = () => {
    if (!plotRef.current) return;

    Plotly.downloadImage(plotRef.current, {
      format: 'png',
      width: 1200,
      height: 800,
      filename: 'chart'
    });
  };

  /**
   * Reset view (zoom/pan)
   */
  const handleResetView = () => {
    if (!plotRef.current) return;
    Plotly.relayout(plotRef.current, { 'xaxis.autorange': true, 'yaxis.autorange': true });
  };

  /**
   * Toggle fullscreen mode
   */
  const handleToggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  return (
    <div className={`interactive-plot ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Toolbar */}
      <div className="plot-toolbar">
        <div className="plot-toolbar-left">
          <span className="plot-title">{config?.title || 'Interactive Chart'}</span>
        </div>
        <div className="plot-toolbar-right">
          <button
            className="plot-btn"
            onClick={handleResetView}
            title="Reset zoom/pan"
          >
            ↺ Reset
          </button>
          <button
            className="plot-btn"
            onClick={handleExportPNG}
            title="Export as PNG"
          >
            📥 Export
          </button>
          <button
            className="plot-btn"
            onClick={handleToggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? '⊡' : '⊞'}
          </button>
        </div>
      </div>

      {/* Plot container */}
      <div className="plot-container">
        <div ref={plotRef} className="plot-chart" />
      </div>

      {/* Instructions */}
      {!config && (
        <div className="plot-empty">
          <p>📊 No chart data</p>
          <p>Configure chart data to display an interactive plot</p>
        </div>
      )}
    </div>
  );
}
