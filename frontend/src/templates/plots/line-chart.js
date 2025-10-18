/**
 * Line Chart Template
 * Universal template for line charts with Plotly.js
 *
 * Usage: Perfect for time series, trends, continuous data
 * Examples: Temperature over time, stock prices, sensor readings
 */

export default {
  id: 'line-chart',
  name: 'Line Chart',
  category: 'plots',
  description: 'Simple line chart for continuous data visualization',

  // Default configuration
  config: {
    title: 'Line Chart Example',
    data: [
      {
        x: [1, 2, 3, 4, 5],
        y: [1, 4, 2, 5, 3],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Data Series',
        line: {
          color: '#6366f1',
          width: 2
        },
        marker: {
          size: 6,
          color: '#6366f1'
        }
      }
    ],
    layout: {
      title: 'Line Chart Example',
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
        y: 1
      }
    }
  },

  // Example configurations for different use cases
  examples: {
    temperature: {
      title: 'Temperature Over Time',
      data: [{
        x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        y: [20, 22, 21, 23, 25, 24, 22],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Temperature (°C)',
        line: { color: '#f59e0b', width: 3 },
        marker: { size: 8, color: '#f59e0b' }
      }],
      layout: {
        title: 'Weekly Temperature',
        xaxis: { title: 'Day' },
        yaxis: { title: 'Temperature (°C)' }
      }
    },

    growth: {
      title: 'User Growth',
      data: [{
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        y: [100, 150, 230, 380, 580, 850],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Users',
        line: { color: '#10b981', width: 3 },
        marker: { size: 8, color: '#10b981' }
      }],
      layout: {
        title: 'User Growth Over Time',
        xaxis: { title: 'Month' },
        yaxis: { title: 'Total Users' }
      }
    }
  },

  // Instructions for users
  instructions: `
## Line Chart Template

Use this template for visualizing continuous data over time or any ordered dimension.

### Quick Start:
1. Replace the example data with your own
2. Update axis labels (xaxis.title, yaxis.title)
3. Customize line color and style
4. Adjust chart title

### Data Format:
- \`x\`: Array of x-axis values (numbers, strings, dates)
- \`y\`: Array of y-axis values (numbers)
- Both arrays must have the same length

### Customization Options:
- \`line.color\`: Line color (hex, rgb, or named color)
- \`line.width\`: Line thickness (1-5)
- \`marker.size\`: Point size (4-12)
- \`mode\`: 'lines', 'markers', or 'lines+markers'
  `
};
