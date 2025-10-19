export default {
  id: 'recharts-bar',
  name: 'Recharts Bar Chart',
  category: 'interactive',
  description: 'Пример столбчатой диаграммы на Recharts (React)',

  config: {
    display: 'react-interactive',
    title: 'Recharts: Столбчатая диаграмма',

    component: `
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function RechartsBar() {
  const data = [
    { engine: 'Бензин', fuel: 8.5, co2: 180 },
    { engine: 'Дизель', fuel: 6.2, co2: 150 },
    { engine: 'Гибрид', fuel: 4.1, co2: 80 },
    { engine: 'Электро', fuel: 0, co2: 0 }
  ];

  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Сравнение типов двигателей</h1>
        <p className="text-gray-400">Расход топлива и выбросы CO₂</p>
      </div>

      <div className="flex-1 bg-gray-800 rounded-xl p-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="engine"
              stroke="#9ca3af"
            />
            <YAxis
              label={{ value: 'Расход (л/100км) / CO₂ (г/км)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
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
            <Bar dataKey="fuel" name="Расход топлива (л/100км)">
              {data.map((entry, index) => (
                <Cell key={\`cell-\${index}\`} fill={colors[index]} />
              ))}
            </Bar>
            <Bar dataKey="co2" name="Выбросы CO₂ (г/км)" fill="#6366f1" opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg p-4 text-center">
            <div
              className="w-4 h-4 rounded-full mx-auto mb-2"
              style={{ backgroundColor: colors[idx] }}
            />
            <div className="text-white font-semibold">{item.engine}</div>
            <div className="text-gray-400 text-sm mt-1">{item.fuel} л/100км</div>
            <div className="text-gray-400 text-sm">{item.co2} г CO₂/км</div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Recharts Bar Chart:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>✅ Кастомные цвета через &lt;Cell&gt; компонент</li>
          <li>✅ Множество серий данных (fuel, co2)</li>
          <li>✅ Адаптивная легенда и подписи</li>
          <li>✅ Красивые тултипы с кастомным стилем</li>
        </ul>
      </div>
    </div>
  );
}
    `
  },

  examples: [],

  instructions: `
# Recharts Bar Chart

Пример использования Recharts для создания столбчатых диаграмм.

## Особенности:
- Кастомные цвета для каждого столбца через <Cell>
- Множество серий данных на одном графике
- Адаптивный дизайн с ResponsiveContainer

## Когда использовать:
- Сравнение категориальных данных
- Показ нескольких метрик (расход + выбросы)
- Когда нужна React-интеграция

## Код:
\`\`\`jsx
<BarChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="engine" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="fuel">
    {data.map((entry, index) => (
      <Cell key={\`cell-\${index}\`} fill={colors[index]} />
    ))}
  </Bar>
  <Bar dataKey="co2" fill="#6366f1" />
</BarChart>
\`\`\`
  `
};
