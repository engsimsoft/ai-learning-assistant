/**
 * Unit Converter Template
 * Universal template for converting between different units
 *
 * Usage: Convert between units of measurement
 * Examples: Temperature, distance, speed, weight, volume
 */

export default {
  id: 'unit-converter',
  name: 'Unit Converter',
  category: 'calculators',
  description: 'Convert between different units of measurement',

  // Default configuration - Temperature converter
  config: {
    title: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',

    inputs: [
      {
        name: 'celsius',
        label: 'Celsius',
        type: 'number',
        min: -273.15,
        max: 1000,
        step: 0.1,
        default: 25,
        unit: '°C',
        description: 'Temperature in Celsius'
      }
    ],

    formulas: [
      {
        name: 'fahrenheit',
        label: 'Fahrenheit',
        expression: 'celsius * 9/5 + 32',
        unit: '°F',
        precision: 2,
        showFormula: true,
        description: 'Temperature in Fahrenheit'
      },
      {
        name: 'kelvin',
        label: 'Kelvin',
        expression: 'celsius + 273.15',
        unit: 'K',
        precision: 2,
        showFormula: true,
        description: 'Temperature in Kelvin'
      }
    ],

    display: {
      showFormula: true,
      showSteps: false,
      highlightResult: true
    }
  },

  // Example configurations for different use cases
  examples: {
    distance: {
      title: 'Distance Converter',
      description: 'Convert between meters, kilometers, miles, and feet',

      inputs: [
        {
          name: 'meters',
          label: 'Meters',
          type: 'number',
          min: 0,
          max: 1000000,
          step: 1,
          default: 1000,
          unit: 'm',
          description: 'Distance in meters'
        }
      ],

      formulas: [
        {
          name: 'kilometers',
          label: 'Kilometers',
          expression: 'meters / 1000',
          unit: 'km',
          precision: 3,
          showFormula: true
        },
        {
          name: 'miles',
          label: 'Miles',
          expression: 'meters / 1609.344',
          unit: 'mi',
          precision: 3,
          showFormula: true
        },
        {
          name: 'feet',
          label: 'Feet',
          expression: 'meters * 3.28084',
          unit: 'ft',
          precision: 2,
          showFormula: true
        },
        {
          name: 'inches',
          label: 'Inches',
          expression: 'meters * 39.3701',
          unit: 'in',
          precision: 2,
          showFormula: true
        }
      ]
    },

    speed: {
      title: 'Speed Converter',
      description: 'Convert between km/h, m/s, mph, and knots',

      inputs: [
        {
          name: 'kmh',
          label: 'Speed',
          type: 'number',
          min: 0,
          max: 500,
          step: 1,
          default: 100,
          unit: 'km/h',
          description: 'Speed in kilometers per hour'
        }
      ],

      formulas: [
        {
          name: 'ms',
          label: 'Meters per second',
          expression: 'kmh / 3.6',
          unit: 'm/s',
          precision: 2,
          showFormula: true
        },
        {
          name: 'mph',
          label: 'Miles per hour',
          expression: 'kmh * 0.621371',
          unit: 'mph',
          precision: 2,
          showFormula: true
        },
        {
          name: 'knots',
          label: 'Knots',
          expression: 'kmh * 0.539957',
          unit: 'kn',
          precision: 2,
          showFormula: true
        }
      ]
    },

    weight: {
      title: 'Weight Converter',
      description: 'Convert between kilograms, pounds, ounces',

      inputs: [
        {
          name: 'kilograms',
          label: 'Kilograms',
          type: 'number',
          min: 0,
          max: 1000,
          step: 0.1,
          default: 70,
          unit: 'kg',
          description: 'Weight in kilograms'
        }
      ],

      formulas: [
        {
          name: 'pounds',
          label: 'Pounds',
          expression: 'kilograms * 2.20462',
          unit: 'lbs',
          precision: 2,
          showFormula: true
        },
        {
          name: 'ounces',
          label: 'Ounces',
          expression: 'kilograms * 35.274',
          unit: 'oz',
          precision: 2,
          showFormula: true
        },
        {
          name: 'grams',
          label: 'Grams',
          expression: 'kilograms * 1000',
          unit: 'g',
          precision: 0,
          showFormula: true
        }
      ]
    },

    volume: {
      title: 'Volume Converter',
      description: 'Convert between liters, gallons, milliliters',

      inputs: [
        {
          name: 'liters',
          label: 'Liters',
          type: 'number',
          min: 0,
          max: 1000,
          step: 0.1,
          default: 10,
          unit: 'L',
          description: 'Volume in liters'
        }
      ],

      formulas: [
        {
          name: 'gallons',
          label: 'Gallons (US)',
          expression: 'liters * 0.264172',
          unit: 'gal',
          precision: 3,
          showFormula: true
        },
        {
          name: 'milliliters',
          label: 'Milliliters',
          expression: 'liters * 1000',
          unit: 'ml',
          precision: 0,
          showFormula: true
        },
        {
          name: 'cubicmeters',
          label: 'Cubic Meters',
          expression: 'liters / 1000',
          unit: 'm³',
          precision: 4,
          showFormula: true
        }
      ]
    },

    engineDisplacement: {
      title: 'Engine Displacement Converter',
      description: 'Convert between cubic centimeters and cubic inches (for engines)',

      inputs: [
        {
          name: 'cc',
          label: 'Displacement',
          type: 'number',
          min: 50,
          max: 10000,
          step: 10,
          default: 2000,
          unit: 'cc',
          description: 'Engine displacement in cubic centimeters'
        }
      ],

      formulas: [
        {
          name: 'cubicInches',
          label: 'Cubic Inches',
          expression: 'cc / 16.387',
          unit: 'ci',
          precision: 2,
          showFormula: true
        },
        {
          name: 'liters',
          label: 'Liters',
          expression: 'cc / 1000',
          unit: 'L',
          precision: 2,
          showFormula: true
        }
      ]
    }
  },

  // Instructions for users
  instructions: `
## Unit Converter Template

Use this template for converting between different units of measurement.

### Quick Start:
1. Choose the base unit (input)
2. Define conversion formulas to other units
3. Use standard conversion factors
4. Set appropriate precision for each result

### Structure:

#### Input (Base Unit):
\`\`\`javascript
{
  name: 'meters',          // Variable name
  label: 'Meters',         // Display label
  min: 0,                  // Minimum value
  max: 1000,               // Maximum value
  step: 1,                 // Step size
  default: 100,            // Default value
  unit: 'm'                // Unit symbol
}
\`\`\`

#### Formulas (Converted Units):
\`\`\`javascript
{
  name: 'feet',
  label: 'Feet',
  expression: 'meters * 3.28084',  // Conversion formula
  unit: 'ft',
  precision: 2,                     // Decimal places
  showFormula: true                 // Show conversion formula
}
\`\`\`

### Common Conversion Factors:

#### Temperature:
- Celsius → Fahrenheit: \`C * 9/5 + 32\`
- Fahrenheit → Celsius: \`(F - 32) * 5/9\`
- Celsius → Kelvin: \`C + 273.15\`

#### Distance:
- Meters → Kilometers: \`m / 1000\`
- Meters → Miles: \`m / 1609.344\`
- Meters → Feet: \`m * 3.28084\`
- Meters → Inches: \`m * 39.3701\`

#### Speed:
- km/h → m/s: \`kmh / 3.6\`
- km/h → mph: \`kmh * 0.621371\`
- km/h → knots: \`kmh * 0.539957\`

#### Weight:
- kg → pounds: \`kg * 2.20462\`
- kg → ounces: \`kg * 35.274\`
- kg → grams: \`kg * 1000\`

#### Volume:
- Liters → Gallons (US): \`L * 0.264172\`
- Liters → ml: \`L * 1000\`
- Liters → m³: \`L / 1000\`

#### Engine (Automotive):
- cc → cubic inches: \`cc / 16.387\`
- cc → liters: \`cc / 1000\`

### Examples:
- \`artifact:unit-converter\` - Temperature (C, F, K)
- \`artifact:unit-converter:distance\` - Distance (m, km, mi, ft)
- \`artifact:unit-converter:speed\` - Speed (km/h, m/s, mph, knots)
- \`artifact:unit-converter:weight\` - Weight (kg, lbs, oz)
- \`artifact:unit-converter:volume\` - Volume (L, gal, ml)
- \`artifact:unit-converter:engineDisplacement\` - Engine displacement (cc, ci, L)

### Tips:
- Always use accurate conversion factors
- Set appropriate \`min\`, \`max\`, and \`step\` for the input
- Choose precision based on typical use (e.g., 2 decimals for most)
- Show formulas for educational purposes
- Use standard unit abbreviations (°C, km, mph, etc.)

### Creating Custom Converters:
1. Pick your base unit (most common or SI unit)
2. List all target units
3. Find accurate conversion factors
4. Test edge cases (min, max, zero)
5. Set appropriate decimal precision
  `
};
