/**
 * Multi-Line Chart Template
 * Universal template for multiple line series with Plotly.js
 *
 * Usage: Perfect for comparing trends, time series, multiple variables
 * Examples: Temperature in multiple cities, stock prices, performance metrics
 */

export default {
  id: 'multi-line',
  name: 'Multi-Line Chart',
  category: 'plots',
  description: 'Multiple line series on one chart for trend comparison',

  // Default configuration
  config: {
    title: 'Multi-Line Chart Example',
    data: [
      {
        x: [1, 2, 3, 4, 5, 6],
        y: [10, 15, 13, 17, 20, 18],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Series 1',
        line: {
          color: '#6366f1',
          width: 2
        },
        marker: {
          size: 6,
          color: '#6366f1'
        }
      },
      {
        x: [1, 2, 3, 4, 5, 6],
        y: [16, 12, 18, 14, 22, 19],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Series 2',
        line: {
          color: '#f59e0b',
          width: 2
        },
        marker: {
          size: 6,
          color: '#f59e0b'
        }
      },
      {
        x: [1, 2, 3, 4, 5, 6],
        y: [8, 11, 9, 13, 16, 14],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Series 3',
        line: {
          color: '#10b981',
          width: 2
        },
        marker: {
          size: 6,
          color: '#10b981'
        }
      }
    ],
    layout: {
      title: 'Multi-Line Chart Example',
      xaxis: {
        title: 'X Axis',
        gridcolor: '#333'
      },
      yaxis: {
        title: 'Y Axis',
        gridcolor: '#333'
      },
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1,
        yanchor: 'top'
      }
    }
  },

  // Example configurations for different use cases
  examples: {
    temperature: {
      title: 'Temperature Comparison (3 Cities)',
      data: [
        {
          x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          y: [18, 20, 19, 22, 24, 23, 21],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'New York',
          line: { color: '#6366f1', width: 3 },
          marker: { size: 8, color: '#6366f1' }
        },
        {
          x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          y: [25, 27, 26, 28, 30, 29, 27],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Los Angeles',
          line: { color: '#f59e0b', width: 3 },
          marker: { size: 8, color: '#f59e0b' }
        },
        {
          x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          y: [15, 16, 14, 17, 19, 18, 16],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Seattle',
          line: { color: '#10b981', width: 3 },
          marker: { size: 8, color: '#10b981' }
        }
      ],
      layout: {
        title: 'Weekly Temperature Comparison',
        xaxis: { title: 'Day of Week' },
        yaxis: { title: 'Temperature (°C)' },
        showlegend: true
      }
    },

    metrics: {
      title: 'System Performance Metrics',
      data: [
        {
          x: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
          y: [45, 38, 62, 75, 68, 52, 48],
          type: 'scatter',
          mode: 'lines',
          name: 'CPU Usage (%)',
          line: { color: '#ef4444', width: 2 }
        },
        {
          x: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
          y: [60, 55, 72, 85, 78, 65, 62],
          type: 'scatter',
          mode: 'lines',
          name: 'Memory Usage (%)',
          line: { color: '#f59e0b', width: 2 }
        },
        {
          x: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
          y: [25, 22, 35, 48, 42, 30, 28],
          type: 'scatter',
          mode: 'lines',
          name: 'Disk I/O (%)',
          line: { color: '#10b981', width: 2 }
        }
      ],
      layout: {
        title: 'Server Metrics Over 24 Hours',
        xaxis: { title: 'Time' },
        yaxis: { title: 'Usage (%)' },
        showlegend: true
      }
    },

    growth: {
      title: 'User Growth by Platform',
      data: [
        {
          x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          y: [100, 150, 230, 350, 520, 780],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Mobile App',
          line: { color: '#6366f1', width: 3 },
          marker: { size: 8 }
        },
        {
          x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          y: [200, 250, 320, 400, 550, 720],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Web Platform',
          line: { color: '#10b981', width: 3 },
          marker: { size: 8 }
        },
        {
          x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          y: [50, 80, 110, 160, 230, 310],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Desktop App',
          line: { color: '#f59e0b', width: 3 },
          marker: { size: 8 }
        }
      ],
      layout: {
        title: 'User Growth Across Platforms',
        xaxis: { title: 'Month' },
        yaxis: { title: 'Active Users' },
        showlegend: true
      }
    },

    financial: {
      title: 'Financial Overview',
      data: [
        {
          x: ['Q1', 'Q2', 'Q3', 'Q4'],
          y: [120000, 150000, 135000, 180000],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Revenue',
          line: { color: '#10b981', width: 3 },
          marker: { size: 10 }
        },
        {
          x: ['Q1', 'Q2', 'Q3', 'Q4'],
          y: [80000, 95000, 88000, 110000],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Expenses',
          line: { color: '#ef4444', width: 3 },
          marker: { size: 10 }
        },
        {
          x: ['Q1', 'Q2', 'Q3', 'Q4'],
          y: [40000, 55000, 47000, 70000],
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Profit',
          line: { color: '#6366f1', width: 3 },
          marker: { size: 10 }
        }
      ],
      layout: {
        title: 'Quarterly Financial Performance',
        xaxis: { title: 'Quarter' },
        yaxis: { title: 'Amount (USD)' },
        showlegend: true
      }
    }
  },

  // Instructions for users
  instructions: `
## Multi-Line Chart Template

Use this template for comparing multiple trends or variables on one chart.

### Quick Start:
1. Add/remove data series as needed
2. Update x and y data for each series
3. Customize colors for each line
4. Set meaningful names for legend
5. Adjust axis labels

### Data Format:
Each series is an object in the \`data\` array:
\`\`\`javascript
{
  x: [1, 2, 3, 4, 5],           // X values
  y: [10, 15, 13, 17, 20],      // Y values
  name: 'Series Name',          // Legend label
  line: { color: '#color' },    // Line style
  marker: { size: 6 }           // Marker style
}
\`\`\`

### Customization Options:

#### Colors:
Use distinct colors for each series:
- \`#6366f1\` - Indigo/Blue
- \`#f59e0b\` - Orange/Amber
- \`#10b981\` - Green/Emerald
- \`#ef4444\` - Red
- \`#8b5cf6\` - Purple/Violet
- \`#06b6d4\` - Cyan

#### Line Styles:
- \`mode: 'lines'\` - Only lines
- \`mode: 'markers'\` - Only points
- \`mode: 'lines+markers'\` - Lines with points
- \`line.width\`: 1-5 (thickness)
- \`line.dash\`: 'solid', 'dash', 'dot'

#### Markers:
- \`marker.size\`: 4-12 (point size)
- \`marker.symbol\`: 'circle', 'square', 'diamond'

#### Legend Position:
\`\`\`javascript
legend: {
  x: 1,              // 0 (left) to 1 (right)
  xanchor: 'right',  // 'left', 'center', 'right'
  y: 1,              // 0 (bottom) to 1 (top)
  yanchor: 'top'     // 'top', 'middle', 'bottom'
}
\`\`\`

### Examples:
- \`artifact:multi-line\` - Basic 3 series
- \`artifact:multi-line:temperature\` - Temperature in 3 cities
- \`artifact:multi-line:metrics\` - System performance (CPU, RAM, Disk)
- \`artifact:multi-line:growth\` - User growth by platform
- \`artifact:multi-line:financial\` - Revenue, expenses, profit

### Tips:
- Use max 5-6 lines for readability
- Choose distinct colors that are easy to tell apart
- Enable legend for labeling series
- Use meaningful series names
  `
};
