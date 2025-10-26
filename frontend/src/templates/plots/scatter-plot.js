/**
 * Scatter Plot Template
 * Universal template for scatter plots with Plotly.js
 *
 * Usage: Perfect for correlation analysis, data distribution, clustering
 * Examples: Height vs Weight, Price vs Quality, Test Scores comparison
 */

export default {
  id: 'scatter-plot',
  name: 'Scatter Plot',
  category: 'plots',
  description: 'Scatter plot for visualizing correlations and distributions',

  // Default configuration
  config: {
    title: 'Scatter Plot Example',
    data: [
      {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [2, 4, 3, 6, 5, 8, 7, 9, 10, 11],
        type: 'scatter',
        mode: 'markers',
        name: 'Data Points',
        marker: {
          size: 10,
          color: '#6366f1',
          opacity: 0.7,
          line: {
            color: '#fff',
            width: 1
          }
        }
      }
    ],
    layout: {
      title: 'Scatter Plot Example',
      xaxis: {
        title: 'X Variable',
        gridcolor: '#333',
        zeroline: false
      },
      yaxis: {
        title: 'Y Variable',
        gridcolor: '#333',
        zeroline: false
      },
      showlegend: true,
      hovermode: 'closest'
    }
  },

  // Example configurations for different use cases
  examples: {
    correlation: {
      title: 'Study Time vs Test Score',
      data: [{
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y: [55, 62, 68, 70, 75, 78, 85, 88, 92, 95],
        type: 'scatter',
        mode: 'markers',
        name: 'Students',
        marker: {
          size: 12,
          color: '#10b981',
          opacity: 0.6
        },
        text: ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5',
               'Student 6', 'Student 7', 'Student 8', 'Student 9', 'Student 10']
      }],
      layout: {
        title: 'Study Time vs Test Score',
        xaxis: { title: 'Study Time (hours)' },
        yaxis: { title: 'Test Score (%)' }
      }
    },

    multiSeries: {
      title: 'Product Analysis',
      data: [
        {
          x: [100, 150, 200, 250, 300],
          y: [4.2, 4.5, 4.3, 4.7, 4.8],
          type: 'scatter',
          mode: 'markers',
          name: 'Product A',
          marker: { size: 12, color: '#6366f1' }
        },
        {
          x: [120, 180, 220, 280, 320],
          y: [3.8, 4.1, 4.0, 4.3, 4.5],
          type: 'scatter',
          mode: 'markers',
          name: 'Product B',
          marker: { size: 12, color: '#f59e0b' }
        }
      ],
      layout: {
        title: 'Price vs Rating by Product',
        xaxis: { title: 'Price ($)' },
        yaxis: { title: 'Rating (stars)' }
      }
    },

    bubbleChart: {
      title: 'Population vs GDP',
      data: [{
        x: [10000, 25000, 35000, 50000, 75000],
        y: [20, 35, 50, 80, 120],
        type: 'scatter',
        mode: 'markers',
        name: 'Countries',
        marker: {
          size: [20, 30, 40, 60, 80],
          color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
          opacity: 0.6,
          line: { color: '#fff', width: 2 }
        },
        text: ['Country A', 'Country B', 'Country C', 'Country D', 'Country E']
      }],
      layout: {
        title: 'GDP per Capita vs Life Expectancy',
        xaxis: { title: 'GDP per Capita ($)' },
        yaxis: { title: 'Life Expectancy (years)' }
      }
    }
  },

  // Instructions for users
  instructions: `
## Scatter Plot Template

Use this template for visualizing relationships between two variables.

### Quick Start:
1. Replace x and y arrays with your data
2. Update axis labels
3. Customize marker appearance
4. Add hover text for context

### Data Format:
- \`x\`: Array of x-axis values (numbers)
- \`y\`: Array of y-axis values (numbers)
- \`text\`: (Optional) Array of labels for hover tooltips
- All arrays must have the same length

### Marker Customization:
- \`marker.size\`: Point size (8-16 recommended)
- \`marker.color\`: Single color or array of colors
- \`marker.opacity\`: Transparency (0-1)
- \`marker.line\`: Border around markers

### Advanced: Bubble Chart
Set \`marker.size\` to an array to create bubble chart where size represents a third dimension.

### Multiple Series:
Add multiple objects to the \`data\` array to compare different groups or categories.
  `
};
