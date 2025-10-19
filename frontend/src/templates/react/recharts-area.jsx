import React from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * RechartsAreaChart - Area chart for showing trends over time
 *
 * Example use case: Engine Temperature Monitoring
 */
export default function RechartsAreaChart({ data, title, xAxisLabel, yAxisLabel, areas }) {
  // Default data: Engine Temperature over Time
  const defaultData = [
    { time: '0:00', engineTemp: 85, coolantTemp: 75, oilTemp: 80 },
    { time: '0:05', engineTemp: 92, coolantTemp: 82, oilTemp: 85 },
    { time: '0:10', engineTemp: 98, coolantTemp: 88, oilTemp: 90 },
    { time: '0:15', engineTemp: 102, coolantTemp: 92, oilTemp: 94 },
    { time: '0:20', engineTemp: 105, coolantTemp: 95, oilTemp: 97 },
    { time: '0:25', engineTemp: 103, coolantTemp: 93, oilTemp: 96 },
    { time: '0:30', engineTemp: 100, coolantTemp: 90, oilTemp: 93 },
    { time: '0:35', engineTemp: 98, coolantTemp: 88, oilTemp: 91 },
    { time: '0:40', engineTemp: 96, coolantTemp: 86, oilTemp: 89 },
  ];

  // Default areas configuration
  const defaultAreas = [
    {
      dataKey: 'engineTemp',
      stroke: '#ef4444',
      fill: '#ef4444',
      fillOpacity: 0.6,
      name: 'Engine Temp (°C)'
    },
    {
      dataKey: 'coolantTemp',
      stroke: '#3b82f6',
      fill: '#3b82f6',
      fillOpacity: 0.6,
      name: 'Coolant Temp (°C)'
    },
    {
      dataKey: 'oilTemp',
      stroke: '#f59e0b',
      fill: '#f59e0b',
      fillOpacity: 0.6,
      name: 'Oil Temp (°C)'
    },
  ];

  const chartData = data || defaultData;
  const chartAreas = areas || defaultAreas;

  return (
    <div className="recharts-artifact p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {title || 'Engine Temperature Monitoring'}
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
          <defs>
            {chartAreas.map((area, index) => (
              <linearGradient key={index} id={`color-${area.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={area.fill} stopOpacity={area.fillOpacity || 0.8} />
                <stop offset="95%" stopColor={area.fill} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="time"
            label={{
              value: xAxisLabel || 'Time (minutes)',
              position: 'insideBottom',
              offset: -10,
              style: { fontWeight: 600 }
            }}
            tick={{ fill: '#6b7280' }}
          />

          <YAxis
            label={{
              value: yAxisLabel || 'Temperature (°C)',
              angle: -90,
              position: 'insideLeft',
              style: { fontWeight: 600 }
            }}
            tick={{ fill: '#6b7280' }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />

          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
          />

          {chartAreas.map((area, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={area.dataKey}
              stroke={area.stroke}
              fill={`url(#color-${area.dataKey})`}
              name={area.name}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Interactive:</strong> Hover over areas to see temperature trends</p>
      </div>
    </div>
  );
}

RechartsAreaChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  areas: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      stroke: PropTypes.string.isRequired,
      fill: PropTypes.string.isRequired,
      fillOpacity: PropTypes.number,
      name: PropTypes.string.isRequired,
    })
  ),
};

RechartsAreaChart.defaultProps = {
  data: null,
  title: 'Engine Temperature Monitoring',
  xAxisLabel: 'Time (minutes)',
  yAxisLabel: 'Temperature (°C)',
  areas: null,
};
