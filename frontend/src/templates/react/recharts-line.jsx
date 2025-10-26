import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * RechartsLineChart - Line chart for displaying time series data
 *
 * Example use case: Engine Power Curve (RPM vs Power/Torque)
 */
export default function RechartsLineChart({ data, title, xAxisLabel, yAxisLabel, lines }) {
  // Default data: Engine Power Curve
  const defaultData = [
    { rpm: 1000, power: 80, torque: 150 },
    { rpm: 2000, power: 120, torque: 180 },
    { rpm: 3000, power: 150, torque: 200 },
    { rpm: 4000, power: 180, torque: 210 },
    { rpm: 5000, power: 200, torque: 200 },
    { rpm: 6000, power: 210, torque: 180 },
    { rpm: 7000, power: 205, torque: 150 },
  ];

  // Default lines configuration
  const defaultLines = [
    { dataKey: 'power', stroke: '#6366f1', name: 'Power (HP)' },
    { dataKey: 'torque', stroke: '#ef4444', name: 'Torque (Nm)' },
  ];

  const chartData = data || defaultData;
  const chartLines = lines || defaultLines;

  return (
    <div className="recharts-artifact p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {title || 'Engine Power Curve'}
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="rpm"
            label={{
              value: xAxisLabel || 'RPM',
              position: 'insideBottom',
              offset: -10,
              style: { fontWeight: 600 }
            }}
            tick={{ fill: '#6b7280' }}
          />

          <YAxis
            label={{
              value: yAxisLabel || 'Value',
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
            iconType="line"
          />

          {chartLines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Interactive:</strong> Hover over the chart to see detailed values</p>
      </div>
    </div>
  );
}

RechartsLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      stroke: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

RechartsLineChart.defaultProps = {
  data: null,
  title: 'Engine Power Curve',
  xAxisLabel: 'RPM',
  yAxisLabel: 'Value',
  lines: null,
};
