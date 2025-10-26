/**
 * Generic Calculator Template
 * Universal template for mathematical calculations with Math.js
 *
 * Usage: Perfect for parametric calculations, converters, financial calculators
 * Examples: Unit converter, loan calculator, physics formulas
 */

export default {
  id: 'generic-calculator',
  name: 'Generic Calculator',
  category: 'calculators',
  description: 'Flexible calculator template for custom formulas',

  // Default configuration
  config: {
    inputs: [
      {
        name: 'x',
        label: 'Input X',
        min: 0,
        max: 100,
        default: 10,
        step: 1,
        unit: ''
      },
      {
        name: 'y',
        label: 'Input Y',
        min: 0,
        max: 100,
        default: 5,
        step: 1,
        unit: ''
      }
    ],
    formulas: [
      {
        name: 'sum',
        expression: 'x + y',
        label: 'Sum',
        unit: ''
      },
      {
        name: 'difference',
        expression: 'x - y',
        label: 'Difference',
        unit: ''
      },
      {
        name: 'product',
        expression: 'x * y',
        label: 'Product',
        unit: ''
      },
      {
        name: 'ratio',
        expression: 'x / y',
        label: 'Ratio',
        unit: ''
      }
    ]
  },

  // Example configurations for different use cases
  examples: {
    unitConverter: {
      inputs: [
        {
          name: 'celsius',
          label: 'Temperature',
          min: -50,
          max: 150,
          default: 25,
          step: 1,
          unit: '°C'
        }
      ],
      formulas: [
        {
          name: 'fahrenheit',
          expression: 'celsius * 9/5 + 32',
          label: 'Fahrenheit',
          unit: '°F'
        },
        {
          name: 'kelvin',
          expression: 'celsius + 273.15',
          label: 'Kelvin',
          unit: 'K'
        }
      ]
    },

    circleCalculator: {
      inputs: [
        {
          name: 'radius',
          label: 'Radius',
          min: 0,
          max: 100,
          default: 10,
          step: 0.1,
          unit: 'm'
        }
      ],
      formulas: [
        {
          name: 'diameter',
          expression: '2 * radius',
          label: 'Diameter',
          unit: 'm'
        },
        {
          name: 'circumference',
          expression: '2 * PI * radius',
          label: 'Circumference',
          unit: 'm'
        },
        {
          name: 'area',
          expression: 'PI * radius^2',
          label: 'Area',
          unit: 'm²'
        }
      ]
    },

    loanCalculator: {
      inputs: [
        {
          name: 'principal',
          label: 'Loan Amount',
          min: 1000,
          max: 1000000,
          default: 100000,
          step: 1000,
          unit: '$'
        },
        {
          name: 'rate',
          label: 'Annual Interest Rate',
          min: 0,
          max: 20,
          default: 5,
          step: 0.1,
          unit: '%'
        },
        {
          name: 'years',
          label: 'Loan Term',
          min: 1,
          max: 30,
          default: 15,
          step: 1,
          unit: 'years'
        }
      ],
      formulas: [
        {
          name: 'monthlyRate',
          expression: 'rate / 100 / 12',
          label: 'Monthly Rate',
          unit: ''
        },
        {
          name: 'months',
          expression: 'years * 12',
          label: 'Total Months',
          unit: ''
        },
        {
          name: 'monthlyPayment',
          expression: 'principal * (rate/100/12) * (1 + rate/100/12)^(years*12) / ((1 + rate/100/12)^(years*12) - 1)',
          label: 'Monthly Payment',
          unit: '$'
        },
        {
          name: 'totalPayment',
          expression: 'principal * (rate/100/12) * (1 + rate/100/12)^(years*12) / ((1 + rate/100/12)^(years*12) - 1) * years * 12',
          label: 'Total Payment',
          unit: '$'
        },
        {
          name: 'totalInterest',
          expression: 'principal * (rate/100/12) * (1 + rate/100/12)^(years*12) / ((1 + rate/100/12)^(years*12) - 1) * years * 12 - principal',
          label: 'Total Interest',
          unit: '$'
        }
      ]
    },

    physicsKinematics: {
      inputs: [
        {
          name: 'v0',
          label: 'Initial Velocity',
          min: 0,
          max: 100,
          default: 20,
          step: 1,
          unit: 'm/s'
        },
        {
          name: 'a',
          label: 'Acceleration',
          min: -20,
          max: 20,
          default: 9.8,
          step: 0.1,
          unit: 'm/s²'
        },
        {
          name: 't',
          label: 'Time',
          min: 0,
          max: 10,
          default: 2,
          step: 0.1,
          unit: 's'
        }
      ],
      formulas: [
        {
          name: 'velocity',
          expression: 'v0 + a * t',
          label: 'Final Velocity (v = v₀ + at)',
          unit: 'm/s'
        },
        {
          name: 'distance',
          expression: 'v0 * t + 0.5 * a * t^2',
          label: 'Distance (s = v₀t + ½at²)',
          unit: 'm'
        }
      ]
    }
  },

  // Instructions for users
  instructions: `
## Generic Calculator Template

Use this template for any mathematical calculations with custom inputs and formulas.

### Quick Start:
1. Define your inputs (variables with sliders)
2. Write formulas using Math.js syntax
3. Add units for better clarity
4. Test with example values

### Input Configuration:
- \`name\`: Variable name (used in formulas)
- \`label\`: Display label for users
- \`min\`, \`max\`: Slider range
- \`default\`: Initial value
- \`step\`: Increment step
- \`unit\`: Display unit (°C, $, m, etc.)

### Formula Configuration:
- \`name\`: Unique identifier
- \`expression\`: Math.js expression
- \`label\`: Display label
- \`unit\`: Result unit

### Math.js Syntax:
- Basic: +, -, *, /, ^
- Functions: sqrt(), sin(), cos(), tan(), log(), abs()
- Constants: PI, E
- All input variables are available in formulas

### Examples:
- Temperature converter (°C ↔ °F ↔ K)
- Circle calculator (radius → area, circumference)
- Loan calculator (principal, rate, term → monthly payment)
- Physics formulas (kinematics, energy, power)
  `
};
