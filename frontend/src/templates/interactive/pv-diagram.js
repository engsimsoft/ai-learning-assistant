export default {
  id: 'pv-diagram',
  name: 'P-V Диаграмма (Анимированная)',
  category: 'interactive',
  description: 'Анимированная P-V диаграмма цикла Отто с интерактивными параметрами',

  config: {
    display: 'react-interactive',
    title: 'P-V Диаграмма цикла Отто',

    // React component code
    component: `
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function PVDiagram() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [params, setParams] = useState({
    compressionRatio: 9,
    maxPressure: 4.5,
    speed: 100
  });

  // Generate P-V data for Otto cycle
  const generateData = () => {
    const cr = params.compressionRatio;
    const Pmax = params.maxPressure;
    const gamma = 1.4; // Air

    const data = [];
    const steps = 100;

    // State 0→1: Intake (constant pressure)
    for (let i = 0; i <= 20; i++) {
      const V = 0.5 + (cr - 0.5) * (i / 20);
      data.push({ V: V.toFixed(2), P: 1, phase: 'Впуск' });
    }

    // State 1→2: Compression (adiabatic)
    for (let i = 0; i <= 25; i++) {
      const V = cr - (cr - 1) * (i / 25);
      const P = Math.pow(cr / V, gamma);
      data.push({ V: V.toFixed(2), P: P.toFixed(2), phase: 'Сжатие' });
    }

    // State 2→3: Combustion (constant volume)
    for (let i = 0; i <= 10; i++) {
      const P = Math.pow(cr, gamma) + (Pmax - Math.pow(cr, gamma)) * (i / 10);
      data.push({ V: 1, P: P.toFixed(2), phase: 'Сгорание' });
    }

    // State 3→4: Expansion (adiabatic)
    for (let i = 0; i <= 25; i++) {
      const V = 1 + (cr - 1) * (i / 25);
      const P = Pmax * Math.pow(1 / V, gamma);
      data.push({ V: V.toFixed(2), P: P.toFixed(2), phase: 'Расширение' });
    }

    // State 4→1: Exhaust (constant volume)
    for (let i = 0; i <= 10; i++) {
      const P = Pmax * Math.pow(1 / cr, gamma) - (Pmax * Math.pow(1 / cr, gamma) - 1) * (i / 10);
      data.push({ V: cr.toFixed(2), P: P.toFixed(2), phase: 'Выхлоп' });
    }

    // State 1→0: Exhaust (constant pressure)
    for (let i = 0; i <= 10; i++) {
      const V = cr - (cr - 0.5) * (i / 10);
      data.push({ V: V.toFixed(2), P: 1, phase: 'Выхлоп' });
    }

    return data;
  };

  const data = generateData();

  // Animation logic
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= data.length - 1) {
            setIsAnimating(false);
            return prev;
          }
          return prev + 1;
        });
      }, params.speed);

      return () => clearInterval(interval);
    }
  }, [isAnimating, params.speed, data.length]);

  const handlePlayPause = () => {
    if (currentStep >= data.length - 1) {
      setCurrentStep(0);
    }
    setIsAnimating(!isAnimating);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCurrentStep(0);
  };

  // Custom dot for animated point
  const AnimatedDot = (props) => {
    const { cx, cy, index } = props;
    if (index === currentStep) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill="#ef4444"
          stroke="#fff"
          strokeWidth={2}
        >
          <animate
            attributeName="r"
            from="8"
            to="12"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </circle>
      );
    }
    return null;
  };

  const currentData = data.slice(0, currentStep + 1);
  const currentPoint = data[currentStep];

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">P-V Диаграмма цикла Отто</h1>
          <p className="text-gray-400">Анимированная визуализация термодинамического цикла</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePlayPause}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              {isAnimating ? (
                <>
                  <Pause className="w-5 h-5" />
                  Пауза
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Запуск
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Сброс
            </button>
          </div>

          {/* Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="flex items-center justify-between text-white">
                <span>Степень сжатия:</span>
                <span className="font-mono text-indigo-400">{params.compressionRatio}</span>
              </label>
              <input
                type="range"
                min="6"
                max="12"
                step="0.5"
                value={params.compressionRatio}
                onChange={(e) => {
                  setParams({...params, compressionRatio: parseFloat(e.target.value)});
                  setCurrentStep(0);
                  setIsAnimating(false);
                }}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center justify-between text-white">
                <span>Макс. давление:</span>
                <span className="font-mono text-indigo-400">{params.maxPressure} bar</span>
              </label>
              <input
                type="range"
                min="3"
                max="6"
                step="0.1"
                value={params.maxPressure}
                onChange={(e) => {
                  setParams({...params, maxPressure: parseFloat(e.target.value)});
                  setCurrentStep(0);
                  setIsAnimating(false);
                }}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center justify-between text-white">
                <span>Скорость:</span>
                <span className="font-mono text-indigo-400">{params.speed}ms</span>
              </label>
              <input
                type="range"
                min="20"
                max="200"
                step="10"
                value={params.speed}
                onChange={(e) => setParams({...params, speed: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="V"
                label={{ value: 'Объём (V)', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
                stroke="#9ca3af"
              />
              <YAxis
                label={{ value: 'Давление (P, bar)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                stroke="#9ca3af"
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="P"
                stroke="#6366f1"
                strokeWidth={3}
                dot={false}
                name="Давление"
              />
              <Line
                type="monotone"
                dataKey="P"
                stroke="transparent"
                dot={<AnimatedDot />}
                name=""
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Current State Info */}
        {currentPoint && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-gray-400 text-sm">Фаза цикла</div>
                <div className="text-2xl font-bold text-indigo-400 mt-1">{currentPoint.phase}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Объём</div>
                <div className="text-2xl font-bold text-white mt-1">{currentPoint.V} л</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Давление</div>
                <div className="text-2xl font-bold text-white mt-1">{currentPoint.P} bar</div>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Фазы цикла Отто:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="text-indigo-400 font-semibold">0→1 Впуск (Intake)</div>
              <div className="text-gray-400">Поршень движется вниз, впускной клапан открыт, P = const</div>
            </div>
            <div className="space-y-2">
              <div className="text-indigo-400 font-semibold">1→2 Сжатие (Compression)</div>
              <div className="text-gray-400">Оба клапана закрыты, адиабатическое сжатие</div>
            </div>
            <div className="space-y-2">
              <div className="text-indigo-400 font-semibold">2→3 Сгорание (Combustion)</div>
              <div className="text-gray-400">Воспламенение топлива, V = const, P резко растёт</div>
            </div>
            <div className="space-y-2">
              <div className="text-indigo-400 font-semibold">3→4 Расширение (Expansion)</div>
              <div className="text-gray-400">Рабочий ход, адиабатическое расширение газов</div>
            </div>
            <div className="space-y-2">
              <div className="text-indigo-400 font-semibold">4→1 Выхлоп (Exhaust)</div>
              <div className="text-gray-400">Выпускной клапан открывается, V = const, P падает</div>
            </div>
            <div className="space-y-2">
              <div className="text-indigo-400 font-semibold">1→0 Выхлоп (Exhaust)</div>
              <div className="text-gray-400">Поршень выталкивает отработанные газы, P = const</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
    `
  },

  examples: [
    {
      id: 'default',
      name: 'Стандартные параметры',
      description: 'CR=9, Pmax=4.5 bar'
    },
    {
      id: 'high-compression',
      name: 'Высокая степень сжатия',
      description: 'CR=12, Pmax=6 bar',
      compressionRatio: 12,
      maxPressure: 6
    },
    {
      id: 'low-compression',
      name: 'Низкая степень сжатия',
      description: 'CR=6, Pmax=3 bar',
      compressionRatio: 6,
      maxPressure: 3
    }
  ],

  instructions: `
# P-V Диаграмма цикла Отто

Интерактивная анимированная визуализация термодинамического цикла двигателя внутреннего сгорания.

## Возможности:
- ▶️ Анимация движения по циклу
- 🎚️ Изменение степени сжатия (6-12)
- 📊 Изменение максимального давления (3-6 bar)
- ⚡ Регулировка скорости анимации
- 📍 Отображение текущей фазы и параметров

## Технологии:
- Recharts (LineChart, анимированная точка)
- Tailwind CSS (градиенты, flexbox/grid)
- Lucide icons (Play, Pause, RotateCcw)
- React Hooks (useState, useEffect)
- CSS animations (пульсирующая точка)

## Использование:
1. Нажмите "Запуск" для начала анимации
2. Измените параметры для пересчёта цикла
3. Наблюдайте за движением точки по P-V диаграмме
4. Следите за текущей фазой цикла
  `
};
