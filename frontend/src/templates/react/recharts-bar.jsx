import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/**
 * RechartsBarChart - Bar chart for comparing categorical data
 *
 * Example use case: Fuel Consumption by Month
 */
export default function RechartsBarChart({ data, title, xAxisLabel, yAxisLabel, bars }) {
  // Default data: Monthly Fuel Consumption
  const defaultData = [
    { month: 'Jan', consumption: 450, cost: 540 },
    { month: 'Feb', consumption: 420, cost: 504 },
    { month: 'Mar', consumption: 480, cost: 576 },
    { month: 'Apr', consumption: 510, cost: 612 },
    { month: 'May', consumption: 490, cost: 588 },
    { month: 'Jun', consumption: 520, cost: 624 },
    { month: 'Jul', consumption: 540, cost: 648 },
    { month: 'Aug', consumption: 530, cost: 636 },
    { month: 'Sep', consumption: 500, cost: 600 },
    { month: 'Oct', consumption: 470, cost: 564 },
    { month: 'Nov', consumption: 460, cost: 552 },
    { month: 'Dec', consumption: 480, cost: 576 },
  ];

  // Default bars configuration
  const defaultBars = [
    { dataKey: 'consumption', fill: '#3b82f6', name: 'Fuel (Liters)' },
    { dataKey: 'cost', fill: '#10b981', name: 'Cost ($)' },
  ];

  const chartData = data || defaultData;
  const chartBars = bars || defaultBars;

  return (
    <div className="recharts-artifact p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {title || 'Monthly Fuel Consumption'}
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="month"
            label={{
              value: xAxisLabel || 'Month',
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
            iconType="rect"
          />

          {chartBars.map((bar, index) => (
            <Bar
              key={index}
              dataKey={bar.dataKey}
              fill={bar.fill}
              name={bar.name}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Interactive:</strong> Hover over bars to compare values across months</p>
      </div>
    </div>
  );
}

RechartsBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  bars: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      fill: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

RechartsBarChart.defaultProps = {
  data: null,
  title: 'Monthly Fuel Consumption',
  xAxisLabel: 'Month',
  yAxisLabel: 'Value',
  bars: null,
};
