/**
 * Formula Calculator Template
 * Universal template for mathematical formulas and calculations
 *
 * Usage: Calculate results from mathematical formulas
 * Examples: Geometry, physics, finance, engineering formulas
 */

export default {
  id: 'formula-calculator',
  name: 'Formula Calculator',
  category: 'calculators',
  description: 'Calculate results from mathematical formulas',

  // Default configuration - Quadratic formula
  config: {
    title: 'Quadratic Formula Calculator',
    description: 'Calculate roots of quadratic equation: ax² + bx + c = 0',

    inputs: [
      {
        name: 'a',
        label: 'Coefficient a',
        type: 'number',
        min: -100,
        max: 100,
        step: 0.1,
        default: 1,
        unit: '',
        description: 'Coefficient of x²'
      },
      {
        name: 'b',
        label: 'Coefficient b',
        type: 'number',
        min: -100,
        max: 100,
        step: 0.1,
        default: -3,
        unit: '',
        description: 'Coefficient of x'
      },
      {
        name: 'c',
        label: 'Coefficient c',
        type: 'number',
        min: -100,
        max: 100,
        step: 0.1,
        default: 2,
        unit: '',
        description: 'Constant term'
      }
    ],

    formulas: [
      {
        name: 'discriminant',
        label: 'Discriminant (D)',
        expression: 'b^2 - 4*a*c',
        unit: '',
        precision: 2,
        showFormula: true,
        description: 'Discriminant = b² - 4ac'
      },
      {
        name: 'root1',
        label: 'Root 1',
        expression: '(-b + sqrt(b^2 - 4*a*c)) / (2*a)',
        unit: '',
        precision: 3,
        showFormula: true,
        description: 'First root (if D ≥ 0)'
      },
      {
        name: 'root2',
        label: 'Root 2',
        expression: '(-b - sqrt(b^2 - 4*a*c)) / (2*a)',
        unit: '',
        precision: 3,
        showFormula: true,
        description: 'Second root (if D ≥ 0)'
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
    circle: {
      title: 'Circle Calculator',
      description: 'Calculate circle properties from radius',

      inputs: [
        {
          name: 'radius',
          label: 'Radius',
          type: 'number',
          min: 0.1,
          max: 100,
          step: 0.1,
          default: 5,
          unit: 'cm',
          description: 'Circle radius'
        }
      ],

      formulas: [
        {
          name: 'diameter',
          label: 'Diameter',
          expression: '2 * radius',
          unit: 'cm',
          precision: 2,
          showFormula: true
        },
        {
          name: 'circumference',
          label: 'Circumference',
          expression: '2 * PI * radius',
          unit: 'cm',
          precision: 2,
          showFormula: true
        },
        {
          name: 'area',
          label: 'Area',
          expression: 'PI * radius^2',
          unit: 'cm²',
          precision: 2,
          showFormula: true
        }
      ]
    },

    triangle: {
      title: 'Triangle Calculator',
      description: 'Calculate triangle area and perimeter',

      inputs: [
        {
          name: 'base',
          label: 'Base',
          type: 'number',
          min: 0.1,
          max: 100,
          step: 0.1,
          default: 10,
          unit: 'cm',
          description: 'Triangle base'
        },
        {
          name: 'height',
          label: 'Height',
          type: 'number',
          min: 0.1,
          max: 100,
          step: 0.1,
          default: 8,
          unit: 'cm',
          description: 'Triangle height'
        },
        {
          name: 'sideA',
          label: 'Side A',
          type: 'number',
          min: 0.1,
          max: 100,
          step: 0.1,
          default: 10,
          unit: 'cm',
          description: 'First side'
        },
        {
          name: 'sideB',
          label: 'Side B',
          type: 'number',
          min: 0.1,
          max: 100,
          step: 0.1,
          default: 10,
          unit: 'cm',
          description: 'Second side'
        }
      ],

      formulas: [
        {
          name: 'area',
          label: 'Area',
          expression: '(base * height) / 2',
          unit: 'cm²',
          precision: 2,
          showFormula: true
        },
        {
          name: 'perimeter',
          label: 'Perimeter',
          expression: 'base + sideA + sideB',
          unit: 'cm',
          precision: 2,
          showFormula: true
        }
      ]
    },

    physics: {
      title: 'Physics: Kinetic Energy',
      description: 'Calculate kinetic energy from mass and velocity',

      inputs: [
        {
          name: 'mass',
          label: 'Mass',
          type: 'number',
          min: 0.1,
          max: 1000,
          step: 0.1,
          default: 10,
          unit: 'kg',
          description: 'Object mass'
        },
        {
          name: 'velocity',
          label: 'Velocity',
          type: 'number',
          min: 0,
          max: 100,
          step: 0.1,
          default: 20,
          unit: 'm/s',
          description: 'Object velocity'
        }
      ],

      formulas: [
        {
          name: 'kineticEnergy',
          label: 'Kinetic Energy',
          expression: '0.5 * mass * velocity^2',
          unit: 'J',
          precision: 2,
          showFormula: true,
          description: 'E = ½mv²'
        },
        {
          name: 'momentum',
          label: 'Momentum',
          expression: 'mass * velocity',
          unit: 'kg·m/s',
          precision: 2,
          showFormula: true,
          description: 'p = mv'
        }
      ]
    },

    finance: {
      title: 'Compound Interest Calculator',
      description: 'Calculate compound interest and final amount',

      inputs: [
        {
          name: 'principal',
          label: 'Principal (P)',
          type: 'number',
          min: 100,
          max: 1000000,
          step: 100,
          default: 10000,
          unit: '$',
          description: 'Initial investment'
        },
        {
          name: 'rate',
          label: 'Annual Rate',
          type: 'number',
          min: 0,
          max: 20,
          step: 0.1,
          default: 5,
          unit: '%',
          description: 'Annual interest rate'
        },
        {
          name: 'years',
          label: 'Years',
          type: 'number',
          min: 1,
          max: 50,
          step: 1,
          default: 10,
          unit: 'years',
          description: 'Investment period'
        }
      ],

      formulas: [
        {
          name: 'finalAmount',
          label: 'Final Amount',
          expression: 'principal * (1 + rate/100)^years',
          unit: '$',
          precision: 2,
          showFormula: true,
          description: 'A = P(1 + r)^t'
        },
        {
          name: 'totalInterest',
          label: 'Total Interest',
          expression: 'principal * (1 + rate/100)^years - principal',
          unit: '$',
          precision: 2,
          showFormula: true,
          description: 'Interest earned'
        }
      ]
    },

    pythagoras: {
      title: 'Pythagorean Theorem',
      description: 'Calculate hypotenuse or find missing side',

      inputs: [
        {
          name: 'sideA',
          label: 'Side a',
          type: 'number',
          min: 0.1,
          max: 100,
          step: 0.1,
          default: 3,
          unit: 'cm',
          description: 'First side'
        },
        {
          name: 'sideB',
          label: 'Side b',
          type: 'number',
          min: 0.1,
          max: 100,
          step: 0.1,
          default: 4,
          unit: 'cm',
          description: 'Second side'
        }
      ],

      formulas: [
        {
          name: 'hypotenuse',
          label: 'Hypotenuse (c)',
          expression: 'sqrt(sideA^2 + sideB^2)',
          unit: 'cm',
          precision: 2,
          showFormula: true,
          description: 'c = √(a² + b²)'
        }
      ]
    },

    bmi: {
      title: 'BMI Calculator',
      description: 'Calculate Body Mass Index',

      inputs: [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number',
          min: 30,
          max: 200,
          step: 0.1,
          default: 70,
          unit: 'kg',
          description: 'Body weight'
        },
        {
          name: 'height',
          label: 'Height',
          type: 'number',
          min: 100,
          max: 250,
          step: 1,
          default: 170,
          unit: 'cm',
          description: 'Height in centimeters'
        }
      ],

      formulas: [
        {
          name: 'heightMeters',
          label: 'Height (m)',
          expression: 'height / 100',
          unit: 'm',
          precision: 2,
          showFormula: false
        },
        {
          name: 'bmi',
          label: 'BMI',
          expression: 'weight / (height/100)^2',
          unit: 'kg/m²',
          precision: 1,
          showFormula: true,
          description: 'BMI = weight / height²'
        }
      ]
    }
  },

  // Instructions for users
  instructions: `
## Formula Calculator Template

Use this template for calculating results from mathematical formulas.

### Quick Start:
1. Define input parameters (variables)
2. Write formula expressions using Math.js syntax
3. Set appropriate ranges and defaults
4. Choose precision for results

### Structure:

#### Inputs (Variables):
\`\`\`javascript
{
  name: 'radius',          // Variable name (use in formulas)
  label: 'Radius',         // Display label
  min: 0.1,                // Minimum value
  max: 100,                // Maximum value
  step: 0.1,               // Step size
  default: 5,              // Default value
  unit: 'cm'               // Unit symbol
}
\`\`\`

#### Formulas (Calculations):
\`\`\`javascript
{
  name: 'area',
  label: 'Circle Area',
  expression: 'PI * radius^2',    // Math.js expression
  unit: 'cm²',
  precision: 2,                    // Decimal places
  showFormula: true                // Show formula text
}
\`\`\`

### Math.js Expression Syntax:

#### Arithmetic Operators:
- \`+\` - Addition
- \`-\` - Subtraction
- \`*\` - Multiplication
- \`/\` - Division
- \`^\` - Exponentiation (power)
- \`%\` - Modulo

#### Mathematical Functions:
- \`sqrt(x)\` - Square root
- \`abs(x)\` - Absolute value
- \`round(x)\` - Round to nearest integer
- \`floor(x)\` - Round down
- \`ceil(x)\` - Round up
- \`exp(x)\` - e^x
- \`log(x)\` - Natural logarithm
- \`log10(x)\` - Base-10 logarithm

#### Trigonometric Functions:
- \`sin(x)\`, \`cos(x)\`, \`tan(x)\` - Trig functions (radians)
- \`asin(x)\`, \`acos(x)\`, \`atan(x)\` - Inverse trig

#### Constants:
- \`PI\` - π (3.14159...)
- \`E\` - e (2.71828...)

#### Examples:
\`\`\`javascript
'2 * PI * radius'              // Circumference
'PI * radius^2'                // Circle area
'sqrt(a^2 + b^2)'              // Pythagorean theorem
'0.5 * mass * velocity^2'      // Kinetic energy
'principal * (1 + rate/100)^years'  // Compound interest
\`\`\`

### Common Formulas:

#### Geometry:
- Circle area: \`PI * radius^2\`
- Circle circumference: \`2 * PI * radius\`
- Triangle area: \`(base * height) / 2\`
- Sphere volume: \`(4/3) * PI * radius^3\`

#### Physics:
- Kinetic energy: \`0.5 * mass * velocity^2\`
- Potential energy: \`mass * 9.81 * height\`
- Force: \`mass * acceleration\`
- Power: \`work / time\`

#### Finance:
- Simple interest: \`principal * rate * time / 100\`
- Compound interest: \`principal * (1 + rate/100)^years\`

### Examples:
- \`artifact:formula-calculator\` - Quadratic equation solver
- \`artifact:formula-calculator:circle\` - Circle properties
- \`artifact:formula-calculator:triangle\` - Triangle area/perimeter
- \`artifact:formula-calculator:physics\` - Kinetic energy
- \`artifact:formula-calculator:finance\` - Compound interest
- \`artifact:formula-calculator:pythagoras\` - Pythagorean theorem
- \`artifact:formula-calculator:bmi\` - BMI calculator

### Tips:
- Test formulas with known values
- Set realistic min/max ranges
- Use appropriate step sizes (1 for integers, 0.1 for decimals)
- Choose meaningful default values
- Set precision based on typical accuracy needed
- Use standard unit symbols
- Show formulas for educational purposes

### Error Handling:
Math.js will show "Error" if:
- Division by zero
- Square root of negative number
- Invalid mathematical operation

Make sure your formulas handle edge cases gracefully.
  `
};
