/**
 * Calculator Component
 * Mathematical calculator with live calculations using Math.js
 * Features: input sliders/number fields, live results, formulas display
 */
import { useState, useEffect } from 'react';
import * as math from 'mathjs';
import './Calculator.css';

export default function Calculator({ config, onUpdate }) {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  const [errors, setErrors] = useState({});

  /**
   * Initialize inputs with default values
   */
  useEffect(() => {
    if (!config || !config.inputs) return;

    const initialInputs = {};
    config.inputs.forEach(input => {
      initialInputs[input.name] = input.default || input.min || 0;
    });
    setInputs(initialInputs);
  }, [config]);

  /**
   * Calculate results when inputs change
   */
  useEffect(() => {
    if (!config || !config.formulas) return;

    const newResults = {};
    const newErrors = {};

    config.formulas.forEach(formula => {
      try {
        // Create scope with all inputs + Math constants
        const scope = {
          ...inputs,
          PI: Math.PI,
          E: Math.E
        };

        // Evaluate formula
        let result = math.evaluate(formula.expression, scope);

        // Convert Math.js Unit objects to numbers
        if (result && typeof result === 'object' && result.value !== undefined) {
          result = result.value;
        }

        // Convert to number if possible
        if (typeof result !== 'number') {
          result = Number(result);
        }

        newResults[formula.name] = result;
      } catch (error) {
        newErrors[formula.name] = 'Error';
        console.error(`Calculator error for ${formula.name}:`, error);
      }
    });

    setResults(newResults);
    setErrors(newErrors);
  }, [inputs, config]);

  /**
   * Handle input change
   */
  const handleInputChange = (name, value) => {
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));

    // Notify parent of change (if needed)
    if (onUpdate) {
      onUpdate({ ...config, currentInputs: { ...inputs, [name]: value } });
    }
  };

  if (!config || !config.inputs || !config.formulas) {
    return (
      <div className="calculator-empty">
        <p>🧮 No calculator configuration</p>
        <p>Configure inputs and formulas to create a calculator</p>
      </div>
    );
  }

  return (
    <div className="calculator">
      {/* Inputs section */}
      <div className="calculator-inputs">
        <h3 className="calculator-section-title">Inputs</h3>

        {config.inputs.map(input => (
          <div key={input.name} className="calculator-input-group">
            <label className="calculator-label">
              {input.label}
              <span className="calculator-unit">{input.unit}</span>
            </label>

            <div className="calculator-controls">
              {/* Slider */}
              <input
                type="range"
                min={input.min}
                max={input.max}
                step={input.step || 1}
                value={inputs[input.name] || input.default}
                onChange={(e) => handleInputChange(input.name, e.target.value)}
                className="calculator-slider"
              />

              {/* Number input */}
              <input
                type="number"
                min={input.min}
                max={input.max}
                step={input.step || 1}
                value={inputs[input.name] || input.default}
                onChange={(e) => handleInputChange(input.name, e.target.value)}
                className="calculator-number"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Results section */}
      <div className="calculator-results">
        <h3 className="calculator-section-title">Results</h3>

        {config.formulas.map(formula => (
          <div key={formula.name} className="calculator-result-item">
            <div className="calculator-result-label">
              {formula.label}:
            </div>
            <div className="calculator-result-value">
              {errors[formula.name] ? (
                <span className="calculator-error">{errors[formula.name]}</span>
              ) : (
                <>
                  <span className="calculator-value">
                    {typeof results[formula.name] === 'number'
                      ? results[formula.name].toFixed(formula.precision ?? 2)
                      : String(results[formula.name])}
                  </span>
                  {formula.unit && (
                    <span className="calculator-unit">{formula.unit}</span>
                  )}
                </>
              )}
            </div>

            {/* Show formula (optional) */}
            {formula.showFormula !== false && (
              <div className="calculator-formula">
                <code>{formula.expression}</code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
