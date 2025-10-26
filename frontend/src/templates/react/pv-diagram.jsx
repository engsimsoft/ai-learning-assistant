import React, { useState, useRef, useLayoutEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ZAxis
} from 'recharts';
import { Play, Pause, RotateCcw } from 'lucide-react';

/**
 * PVDiagram - Animated P-V Diagram for Otto Cycle
 *
 * Shows 4 phases of Otto cycle with animated point moving through the cycle.
 * Interactive controls: Play/Pause/Reset
 * Adjustable parameters: Compression Ratio, Max Pressure
 */

// Otto cycle calculation based on thermodynamics
// γ (gamma) = 1.4 for air (cp/cv ratio)
const GAMMA = 1.4;

/**
 * Calculate Otto cycle data points
 * @param {number} compressionRatio - Compression ratio (7-11)
 * @param {number} maxPressure - Maximum pressure in MPa (2-6)
 * @returns {Array} Array of {V, P, phase} data points
 */
function calculateOttoCycle(compressionRatio, maxPressure) {
  const points = [];
  const V1 = 100; // Initial volume (arbitrary units)
  const V2 = V1 / compressionRatio; // Volume at TDC
  const P1 = 0.1; // Initial pressure (MPa)

  // Phase 1-2: Isentropic Compression (adiabatic)
  // P * V^γ = const
  const numPoints = 25;

  // 1-2: Compression
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const V = V1 - t * (V1 - V2);
    const P = P1 * Math.pow(V1 / V, GAMMA);
    points.push({ V, P, phase: 'compression' });
  }

  // 2-3: Combustion (constant volume heat addition)
  const P2 = P1 * Math.pow(compressionRatio, GAMMA);
  const P3 = maxPressure;

  for (let i = 1; i <= numPoints; i++) {
    const t = i / numPoints;
    const V = V2;
    const P = P2 + t * (P3 - P2);
    points.push({ V, P, phase: 'combustion' });
  }

  // 3-4: Expansion (isentropic)
  for (let i = 1; i <= numPoints; i++) {
    const t = i / numPoints;
    const V = V2 + t * (V1 - V2);
    const P = P3 * Math.pow(V2 / V, GAMMA);
    points.push({ V, P, phase: 'expansion' });
  }

  // 4-1: Exhaust (constant volume heat rejection)
  const P4 = P3 * Math.pow(1 / compressionRatio, GAMMA);

  for (let i = 1; i <= numPoints; i++) {
    const t = i / numPoints;
    const V = V1;
    const P = P4 - t * (P4 - P1);
    points.push({ V, P, phase: 'exhaust' });
  }

  return points;
}

export default function PVDiagram({
  initialCompressionRatio = 9,
  initialMaxPressure = 4.5
}) {
  // State
  const [compressionRatio, setCompressionRatio] = useState(initialCompressionRatio);
  const [maxPressure, setMaxPressure] = useState(initialMaxPressure);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Refs for animation
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Calculate cycle data (memoized for performance)
  const cycleData = useMemo(() =>
    calculateOttoCycle(compressionRatio, maxPressure),
    [compressionRatio, maxPressure]
  );

  // Get current point for animation
  const currentPoint = cycleData[Math.floor(currentStep % cycleData.length)];

  // Get current phase
  const getCurrentPhase = () => {
    const index = Math.floor(currentStep % cycleData.length);
    return cycleData[index]?.phase || 'compression';
  };

  const currentPhase = getCurrentPhase();

  // Phase colors
  const phaseColors = {
    compression: '#3b82f6', // blue
    combustion: '#ef4444',  // red
    expansion: '#10b981',   // green
    exhaust: '#8b5cf6'      // purple
  };

  // Phase names
  const phaseNames = {
    compression: 'Compression (1-2)',
    combustion: 'Combustion (2-3)',
    expansion: 'Expansion (3-4)',
    exhaust: 'Exhaust (4-1)'
  };

  // Animation loop using requestAnimationFrame
  // IMPORTANT: Using useLayoutEffect + cleanup to prevent memory leaks
  useLayoutEffect(() => {
    if (!isAnimating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const animate = (currentTime) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;

      // Update every 16ms (roughly 60fps), move by 0.5 steps per frame
      if (deltaTime >= 16) {
        setCurrentStep(prev => (prev + 0.5) % cycleData.length);
        lastTimeRef.current = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // CRITICAL: Cleanup function to prevent memory leaks
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      lastTimeRef.current = 0;
    };
  }, [isAnimating, cycleData.length]);

  // Control handlers
  const handlePlay = () => setIsAnimating(true);
  const handlePause = () => setIsAnimating(false);
  const handleReset = () => {
    setIsAnimating(false);
    setCurrentStep(0);
  };

  // Keyboard navigation
  useLayoutEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsAnimating(prev => !prev);
      } else if (e.code === 'Escape') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="pv-diagram p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        P-V Diagram: Otto Cycle Animation
      </h2>

      {/* Current Phase Indicator */}
      <div className="mb-4 p-4 rounded" style={{ backgroundColor: phaseColors[currentPhase] + '20' }}>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-700">Current Phase:</span>
          <span
            className="font-bold text-lg"
            style={{ color: phaseColors[currentPhase] }}
          >
            {phaseNames[currentPhase]}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-200"
            style={{
              width: `${(currentStep / cycleData.length) * 100}%`,
              backgroundColor: phaseColors[currentPhase]
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handlePlay}
          disabled={isAnimating}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Play animation"
        >
          <Play size={20} />
          Play
        </button>

        <button
          onClick={handlePause}
          disabled={!isAnimating}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Pause animation"
        >
          <Pause size={20} />
          Pause
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          aria-label="Reset animation"
        >
          <RotateCcw size={20} />
          Reset
        </button>

        <span className="ml-auto text-sm text-gray-500 flex items-center">
          Keyboard: Space (Play/Pause), Esc (Reset)
        </span>
      </div>

      {/* Parameters */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compression Ratio: {compressionRatio.toFixed(1)}:1
          </label>
          <input
            type="range"
            min="7"
            max="11"
            step="0.5"
            value={compressionRatio}
            onChange={(e) => {
              setCompressionRatio(Number(e.target.value));
              setCurrentStep(0);
            }}
            className="w-full"
            disabled={isAnimating}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Pressure: {maxPressure.toFixed(1)} MPa
          </label>
          <input
            type="range"
            min="2"
            max="6"
            step="0.5"
            value={maxPressure}
            onChange={(e) => {
              setMaxPressure(Number(e.target.value));
              setCurrentStep(0);
            }}
            className="w-full"
            disabled={isAnimating}
          />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="V"
            type="number"
            label={{
              value: 'Volume (V)',
              position: 'insideBottom',
              offset: -10,
              style: { fontWeight: 600 }
            }}
            tick={{ fill: '#6b7280' }}
            domain={['dataMin - 5', 'dataMax + 5']}
          />

          <YAxis
            dataKey="P"
            type="number"
            label={{
              value: 'Pressure (P, MPa)',
              angle: -90,
              position: 'insideLeft',
              style: { fontWeight: 600 }
            }}
            tick={{ fill: '#6b7280' }}
            domain={[0, 'dataMax + 1']}
          />

          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value, name) => {
              if (name === 'P') return [value.toFixed(2) + ' MPa', 'Pressure'];
              if (name === 'V') return [value.toFixed(1), 'Volume'];
              return [value, name];
            }}
          />

          <Legend />

          {/* Otto Cycle path - using Scatter with line */}
          <Scatter
            data={cycleData}
            fill="#6366f1"
            line={{ stroke: '#6366f1', strokeWidth: 3 }}
            shape="dot"
            isAnimationActive={false}
            name="Otto Cycle"
          />

          {/* Current point - highlighted */}
          <Scatter
            data={[currentPoint]}
            fill={phaseColors[currentPhase]}
            shape="circle"
            isAnimationActive={false}
            name="Current State"
          >
            <ZAxis type="number" range={[400, 400]} />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Description */}
      <div className="mt-4 text-sm text-gray-600 space-y-2">
        <p><strong>Otto Cycle:</strong> Idealized thermodynamic cycle for spark-ignition engines</p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li><span style={{ color: phaseColors.compression }}>●</span> <strong>1-2 Compression:</strong> Isentropic compression (P·V^γ = const)</li>
          <li><span style={{ color: phaseColors.combustion }}>●</span> <strong>2-3 Combustion:</strong> Constant volume heat addition</li>
          <li><span style={{ color: phaseColors.expansion }}>●</span> <strong>3-4 Expansion:</strong> Isentropic expansion (power stroke)</li>
          <li><span style={{ color: phaseColors.exhaust }}>●</span> <strong>4-1 Exhaust:</strong> Constant volume heat rejection</li>
        </ul>
      </div>
    </div>
  );
}

PVDiagram.propTypes = {
  initialCompressionRatio: PropTypes.number,
  initialMaxPressure: PropTypes.number,
};

PVDiagram.defaultProps = {
  initialCompressionRatio: 9,
  initialMaxPressure: 4.5,
};
