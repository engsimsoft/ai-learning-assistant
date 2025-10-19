export default {
  id: 'recharts-line',
  name: 'Recharts Line Chart',
  category: 'interactive',
  description: 'Пример линейного графика на Recharts (React)',

  config: {
    display: 'react-interactive',
    title: 'Recharts: Линейный график',

    component: `
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RechartsLine() {
  const data = [
    { rpm: 1000, power: 80, torque: 150 },
    { rpm: 2000, power: 120, torque: 180 },
    { rpm: 3000, power: 160, torque: 200 },
    { rpm: 4000, power: 200, torque: 220 },
    { rpm: 5000, power: 220, torque: 210 },
    { rpm: 6000, power: 210, torque: 180 }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 p-8 flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Мощность и крутящий момент двигателя</h1>
        <p className="text-gray-400">Зависимость от оборотов (Recharts компоненты)</p>
      </div>

      <div className="flex-1 bg-gray-800 rounded-xl p-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="rpm"
              label={{ value: 'Обороты (RPM)', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
              stroke="#9ca3af"
            />
            <YAxis
              label={{ value: 'Мощность (HP) / Момент (Nm)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
              stroke="#9ca3af"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="power"
              stroke="#6366f1"
              strokeWidth={3}
              name="Мощность (HP)"
              dot={{ fill: '#6366f1', r: 6 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="torque"
              stroke="#ef4444"
              strokeWidth={3}
              name="Крут. момент (Nm)"
              dot={{ fill: '#ef4444', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Особенности Recharts:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>✅ Компонентный подход (не объекты JSON)</li>
          <li>✅ SVG рендеринг (бесконечное масштабирование)</li>
          <li>✅ ResponsiveContainer для адаптивности</li>
          <li>✅ Простая кастомизация через props</li>
        </ul>
      </div>
    </div>
  );
}
    `
  },

  examples: [],

  instructions: `
# Recharts Line Chart

Пример использования Recharts для создания линейных графиков в React.

## Отличия от Plotly:
- Компонентный подход вместо JSON конфигурации
- SVG вместо Canvas (лучше для масштабирования)
- Нативная интеграция с React
- Декларативный стиль

## Код:
\`\`\`jsx
<LineChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="rpm" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="power" stroke="#6366f1" />
  <Line type="monotone" dataKey="torque" stroke="#ef4444" />
</LineChart>
\`\`\`
  `
};
