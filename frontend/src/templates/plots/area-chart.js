/**
 * Area Chart Template
 * Universal template for area charts with Plotly.js
 *
 * Usage: Perfect for showing volume, cumulative data, trends with magnitude
 * Examples: Sales volume, accumulated metrics, resource usage over time
 */

export default {
  id: 'area-chart',
  name: 'Area Chart',
  category: 'plots',
  description: 'Area chart for showing volume and cumulative data',

  // Default configuration
  config: {
    title: 'Area Chart Example',
    data: [
      {
        x: [1, 2, 3, 4, 5, 6],
        y: [10, 15, 13, 17, 20, 18],
        type: 'scatter',
        mode: 'lines',
        fill: 'tozeroy',
        fillcolor: 'rgba(99, 102, 241, 0.3)',
        name: 'Data Series',
        line: {
          color: '#6366f1',
          width: 2
        }
      }
    ],
    layout: {
      title: 'Area Chart Example',
      xaxis: {
        title: 'X Axis',
        gridcolor: '#333'
      },
      yaxis: {
        title: 'Y Axis',
        gridcolor: '#333'
      },
      showlegend: false
    }
  },

  // Example configurations for different use cases
  examples: {
    sales: {
      title: 'Cumulative Sales Volume',
      data: [{
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        y: [12000, 27000, 40000, 58000, 80000, 99000],
        type: 'scatter',
        mode: 'lines',
        fill: 'tozeroy',
        fillcolor: 'rgba(16, 185, 129, 0.3)',
        line: {
          color: '#10b981',
          width: 3
        },
        name: 'Cumulative Sales'
      }],
      layout: {
        title: 'Cumulative Sales Over Time',
        xaxis: { title: 'Month' },
        yaxis: { title: 'Total Sales (USD)' }
      }
    },

    traffic: {
      title: 'Website Traffic',
      data: [{
        x: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        y: [500, 300, 800, 2500, 3200, 1800, 600],
        type: 'scatter',
        mode: 'lines',
        fill: 'tozeroy',
        fillcolor: 'rgba(99, 102, 241, 0.3)',
        line: {
          color: '#6366f1',
          width: 2
        },
        name: 'Visitors'
      }],
      layout: {
        title: 'Website Traffic Over 24 Hours',
        xaxis: { title: 'Time' },
        yaxis: { title: 'Visitors' }
      }
    },

    stacked: {
      title: 'Stacked Area Chart',
      data: [
        {
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          y: [100, 120, 110, 130],
          type: 'scatter',
          mode: 'lines',
          fill: 'tozeroy',
          fillcolor: 'rgba(99, 102, 241, 0.5)',
          line: { color: '#6366f1', width: 2 },
          name: 'Mobile'
        },
        {
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          y: [150, 140, 160, 155],
          type: 'scatter',
          mode: 'lines',
          fill: 'tonexty',
          fillcolor: 'rgba(16, 185, 129, 0.5)',
          line: { color: '#10b981', width: 2 },
          name: 'Desktop'
        },
        {
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          y: [50, 60, 55, 65],
          type: 'scatter',
          mode: 'lines',
          fill: 'tonexty',
          fillcolor: 'rgba(245, 158, 11, 0.5)',
          line: { color: '#f59e0b', width: 2 },
          name: 'Tablet'
        }
      ],
      layout: {
        title: 'Traffic by Device Type (Stacked)',
        xaxis: { title: 'Week' },
        yaxis: { title: 'Visitors' },
        showlegend: true
      }
    },

    resources: {
      title: 'Server Resource Usage',
      data: [
        {
          x: ['00:00', '06:00', '12:00', '18:00', '24:00'],
          y: [30, 45, 75, 60, 35],
          type: 'scatter',
          mode: 'lines',
          fill: 'tozeroy',
          fillcolor: 'rgba(239, 68, 68, 0.3)',
          line: { color: '#ef4444', width: 2 },
          name: 'CPU'
        },
        {
          x: ['00:00', '06:00', '12:00', '18:00', '24:00'],
          y: [50, 55, 85, 70, 60],
          type: 'scatter',
          mode: 'lines',
          fill: 'tonexty',
          fillcolor: 'rgba(245, 158, 11, 0.3)',
          line: { color: '#f59e0b', width: 2 },
          name: 'Memory'
        }
      ],
      layout: {
        title: 'Server Resource Usage Over 24h',
        xaxis: { title: 'Time' },
        yaxis: { title: 'Usage (%)' },
        showlegend: true
      }
    },

    growth: {
      title: 'User Base Growth',
      data: [{
        x: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
        y: [1000, 2500, 5200, 8900],
        type: 'scatter',
        mode: 'lines+markers',
        fill: 'tozeroy',
        fillcolor: 'rgba(139, 92, 246, 0.3)',
        line: {
          color: '#8b5cf6',
          width: 3
        },
        marker: {
          size: 10,
          color: '#8b5cf6'
        },
        name: 'Total Users'
      }],
      layout: {
        title: 'Cumulative User Growth',
        xaxis: { title: 'Quarter' },
        yaxis: { title: 'Total Users' }
      }
    }
  },

  // Instructions for users
  instructions: `
## Area Chart Template

Use this template for showing volume, magnitude, or cumulative data over time.

### Quick Start:
1. Replace x and y data with your values
2. Choose fill mode (tozeroy, tonexty, toself)
3. Customize fill color and opacity
4. Adjust axis labels and title

### Data Format:
\`\`\`javascript
{
  x: [1, 2, 3, 4, 5],              // X values
  y: [10, 15, 13, 17, 20],         // Y values
  fill: 'tozeroy',                 // Fill mode
  fillcolor: 'rgba(R, G, B, A)',   // Fill color with transparency
  line: { color: '#color' }        // Line color
}
\`\`\`

### Fill Modes:

#### \`fill: 'tozeroy'\`
Fill from line down to Y=0 (most common)
- Best for: Single series showing volume
- Example: Sales over time, traffic volume

#### \`fill: 'tonexty'\`
Fill to the next series (for stacked areas)
- Best for: Multiple series showing composition
- Example: Device types (mobile + desktop + tablet)
- **Important:** First series should use 'tozeroy'

#### \`fill: 'toself'\`
Fill enclosed area (creates closed shape)
- Best for: Closed polygons, radar charts
- Less common for time series

### Customization Options:

#### Fill Color (RGBA):
Format: \`rgba(R, G, B, Alpha)\`
- R, G, B: 0-255 (color components)
- Alpha: 0-1 (transparency)

Examples:
\`\`\`javascript
'rgba(99, 102, 241, 0.3)'   // Indigo, 30% opacity
'rgba(16, 185, 129, 0.5)'   // Green, 50% opacity
'rgba(245, 158, 11, 0.2)'   // Orange, 20% opacity
\`\`\`

**Tip:** Use 0.2-0.4 opacity for single area, 0.4-0.6 for stacked areas

#### Line Appearance:
- \`line.color\`: Solid color (should match fill color but opaque)
- \`line.width\`: 2-3 typical for area charts
- \`mode: 'lines'\` - Smooth area (common)
- \`mode: 'lines+markers'\` - Show data points

### Stacked Area Charts:

To create stacked areas (showing composition):
\`\`\`javascript
data: [
  {
    // Bottom layer
    fill: 'tozeroy',
    fillcolor: 'rgba(99, 102, 241, 0.5)',
    name: 'Layer 1'
  },
  {
    // Middle layer
    fill: 'tonexty',  // ← Stack on previous
    fillcolor: 'rgba(16, 185, 129, 0.5)',
    name: 'Layer 2'
  },
  {
    // Top layer
    fill: 'tonexty',  // ← Stack on previous
    fillcolor: 'rgba(245, 158, 11, 0.5)',
    name: 'Layer 3'
  }
]
\`\`\`

### Examples:
- \`artifact:area-chart\` - Basic single area
- \`artifact:area-chart:sales\` - Cumulative sales volume
- \`artifact:area-chart:traffic\` - Website traffic over 24h
- \`artifact:area-chart:stacked\` - Stacked areas (device types)
- \`artifact:area-chart:resources\` - Server CPU + Memory
- \`artifact:area-chart:growth\` - User base growth

### Use Cases:
✅ **Good for:**
- Showing volume/magnitude over time
- Cumulative data (running totals)
- Emphasizing quantity
- Comparing total composition (stacked)

❌ **Avoid for:**
- Precise value comparison (use line or bar)
- Many overlapping series (gets messy)
- Negative values (can be confusing)
  `
};
