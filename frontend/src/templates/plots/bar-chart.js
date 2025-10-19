/**
 * Bar Chart Template
 * Universal template for bar charts with Plotly.js
 *
 * Usage: Perfect for comparisons, categorical data, discrete values
 * Examples: Sales by month, scores by category, population by country
 */

export default {
  id: 'bar-chart',
  name: 'Bar Chart',
  category: 'plots',
  description: 'Bar chart for comparing categories and discrete data',

  // Default configuration
  config: {
    title: 'Bar Chart Example',
    data: [
      {
        x: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
        y: [20, 35, 25, 40, 30],
        type: 'bar',
        name: 'Values',
        marker: {
          color: '#6366f1',
          line: {
            color: '#4f46e5',
            width: 1
          }
        }
      }
    ],
    layout: {
      title: 'Bar Chart Example',
      xaxis: {
        title: 'Categories',
        gridcolor: '#333'
      },
      yaxis: {
        title: 'Values',
        gridcolor: '#333'
      },
      showlegend: false,
      bargap: 0.2
    }
  },

  // Example configurations for different use cases
  examples: {
    sales: {
      title: 'Monthly Sales',
      data: [{
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        y: [12000, 15000, 13000, 18000, 22000, 19000],
        type: 'bar',
        name: 'Sales ($)',
        marker: {
          color: '#10b981',
          line: { color: '#059669', width: 1 }
        }
      }],
      layout: {
        title: 'Monthly Sales Report',
        xaxis: { title: 'Month' },
        yaxis: { title: 'Sales (USD)' }
      }
    },

    comparison: {
      title: 'Product Comparison',
      data: [
        {
          x: ['Product A', 'Product B', 'Product C', 'Product D'],
          y: [45, 60, 38, 52],
          type: 'bar',
          name: 'Q1',
          marker: { color: '#6366f1' }
        },
        {
          x: ['Product A', 'Product B', 'Product C', 'Product D'],
          y: [52, 55, 47, 58],
          type: 'bar',
          name: 'Q2',
          marker: { color: '#f59e0b' }
        }
      ],
      layout: {
        title: 'Product Sales Comparison (Q1 vs Q2)',
        xaxis: { title: 'Product' },
        yaxis: { title: 'Units Sold' },
        barmode: 'group',
        showlegend: true
      }
    },

    stacked: {
      title: 'Stacked Bar Chart',
      data: [
        {
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          y: [100, 120, 110, 130],
          type: 'bar',
          name: 'Mobile',
          marker: { color: '#6366f1' }
        },
        {
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          y: [150, 140, 160, 155],
          type: 'bar',
          name: 'Desktop',
          marker: { color: '#10b981' }
        },
        {
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          y: [50, 60, 55, 65],
          type: 'bar',
          name: 'Tablet',
          marker: { color: '#f59e0b' }
        }
      ],
      layout: {
        title: 'Traffic by Device Type (Stacked)',
        xaxis: { title: 'Week' },
        yaxis: { title: 'Visitors' },
        barmode: 'stack',
        showlegend: true
      }
    },

    horizontal: {
      title: 'Horizontal Bar Chart',
      data: [{
        x: [85, 72, 95, 68, 90],
        y: ['Engineering', 'Marketing', 'Sales', 'Support', 'Design'],
        type: 'bar',
        orientation: 'h',
        marker: {
          color: '#8b5cf6',
          line: { color: '#7c3aed', width: 1 }
        }
      }],
      layout: {
        title: 'Department Satisfaction Scores',
        xaxis: { title: 'Score (%)' },
        yaxis: { title: 'Department' }
      }
    }
  },

  // Instructions for users
  instructions: `
## Bar Chart Template

Use this template for comparing discrete categories or showing distributions.

### Quick Start:
1. Replace the example data with your own
2. Update axis labels (xaxis.title, yaxis.title)
3. Customize bar color
4. Adjust chart title

### Data Format:
- \`x\`: Array of category names (strings) or values
- \`y\`: Array of values (numbers)
- Both arrays must have the same length

### Customization Options:

#### Bar Appearance:
- \`marker.color\`: Bar color (hex, rgb, or named color)
- \`marker.line.color\`: Border color
- \`marker.line.width\`: Border thickness

#### Layout Modes:
- \`barmode: 'group'\` - Grouped bars (side by side)
- \`barmode: 'stack'\` - Stacked bars (on top of each other)
- \`barmode: 'relative'\` - Relative bars

#### Orientation:
- \`orientation: 'v'\` - Vertical bars (default)
- \`orientation: 'h'\` - Horizontal bars

#### Spacing:
- \`bargap\`: Gap between bars (0-1, default: 0.2)
- \`bargroupgap\`: Gap between groups (0-1)

### Examples:
- \`artifact:bar-chart\` - Basic vertical bars
- \`artifact:bar-chart:sales\` - Monthly sales example
- \`artifact:bar-chart:comparison\` - Grouped bars (Q1 vs Q2)
- \`artifact:bar-chart:stacked\` - Stacked bars (device types)
- \`artifact:bar-chart:horizontal\` - Horizontal bars
  `
};
