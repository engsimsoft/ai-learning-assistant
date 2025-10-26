/**
 * MathTest Component
 * Test component to verify Math.js integration
 */
import { useState } from 'react';
import * as math from 'mathjs';

export default function MathTest() {
  const [a, setA] = useState(10);
  const [b, setB] = useState(20);
  const [results, setResults] = useState({});

  const calculate = () => {
    try {
      const scope = { a, b, PI: Math.PI };

      const newResults = {
        sum: math.evaluate('a + b', scope),
        product: math.evaluate('a * b', scope),
        power: math.evaluate('a^2 + b^2', scope),
        sqrt: math.evaluate('sqrt(a^2 + b^2)', scope),
        circle: math.evaluate('PI * a^2', scope).toFixed(2)
      };

      setResults(newResults);
    } catch (error) {
      console.error('Math.js error:', error);
    }
  };

  // Calculate on mount and when values change
  useState(() => {
    calculate();
  });

  return (
    <div style={{ padding: '20px', background: '#1a1a1a', color: '#e0e0e0' }}>
      <h2>Math.js Integration Test</h2>

      <div style={{ marginTop: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Value A: {a}
          <input
            type="range"
            min="0"
            max="100"
            value={a}
            onChange={(e) => {
              setA(parseInt(e.target.value));
              calculate();
            }}
            style={{ width: '100%', marginTop: '5px' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '10px' }}>
          Value B: {b}
          <input
            type="range"
            min="0"
            max="100"
            value={b}
            onChange={(e) => {
              setB(parseInt(e.target.value));
              calculate();
            }}
            style={{ width: '100%', marginTop: '5px' }}
          />
        </label>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: '#252525', borderRadius: '8px' }}>
        <h3>Calculated Results:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><strong>Sum (a + b):</strong> {results.sum}</li>
          <li><strong>Product (a × b):</strong> {results.product}</li>
          <li><strong>Sum of squares (a² + b²):</strong> {results.power}</li>
          <li><strong>Hypotenuse (√(a² + b²)):</strong> {results.sqrt?.toFixed(2)}</li>
          <li><strong>Circle area (πa²):</strong> {results.circle}</li>
        </ul>
      </div>

      <p style={{ color: '#999', marginTop: '20px' }}>
        ✅ If calculations update when you move sliders, Math.js is working correctly!
      </p>
    </div>
  );
}
