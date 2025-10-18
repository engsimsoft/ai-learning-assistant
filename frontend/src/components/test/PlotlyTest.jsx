/**
 * PlotlyTest Component
 * Test component to verify Plotly.js integration
 */
import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

export default function PlotlyTest() {
  const plotRef = useRef(null);

  useEffect(() => {
    if (!plotRef.current) return;

    // Test data: y = x²
    const data = [{
      x: [0, 1, 2, 3, 4, 5],
      y: [0, 1, 4, 9, 16, 25],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'y = x²',
      line: { color: '#667eea' }
    }];

    const layout = {
      title: 'Plotly.js Test: y = x²',
      xaxis: { title: 'X' },
      yaxis: { title: 'Y' },
      paper_bgcolor: '#1a1a1a',
      plot_bgcolor: '#252525',
      font: { color: '#e0e0e0' }
    };

    const config = {
      responsive: true,
      displayModeBar: true
    };

    Plotly.newPlot(plotRef.current, data, layout, config);

    return () => {
      if (plotRef.current) {
        Plotly.purge(plotRef.current);
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px', background: '#1a1a1a', height: '100%' }}>
      <h2 style={{ color: '#e0e0e0' }}>Plotly.js Integration Test</h2>
      <div ref={plotRef} style={{ width: '100%', height: '400px' }} />
      <p style={{ color: '#999', marginTop: '20px' }}>
        ✅ If you see a chart above, Plotly.js is working correctly!
      </p>
    </div>
  );
}
