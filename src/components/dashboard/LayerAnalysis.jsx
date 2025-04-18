import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import chroma from 'chroma-js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#3b82f6', // blue-500
  '#8b5cf6', // purple-500
  '#10b981', // green-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
];

export default function LayerAnalysis({ data = [], onAnalyze }) {
  // Use provided data or fallback to empty array
  const chartData = data.length > 0 ? data : [];
  
  // Generate a beautiful color gradient using distinct colors
  const colorScale = chroma.scale(COLORS)
    .mode('lch')
    .colors(chartData.length || 5);
    
  const chartConfig = {
    labels: chartData.map(item => item.name),
    datasets: [
      {
        data: chartData.map(item => item.ratio),
        backgroundColor: colorScale,
        borderColor: 'white',
        borderWidth: 2,
        hoverBorderWidth: 4,
        hoverBorderColor: 'white',
        hoverOffset: 10,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const size = chartData[context.dataIndex]?.size || 0;
            return [
              `${label}: ${value}%`,
              `Size: ${size}MB`
            ];
          },
        },
      },
    },
  };

  return (
    <div className="min-w-0 bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Layer Analysis</h2>
        <button 
          onClick={onAnalyze}
          className="group px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 shadow-green-lg hover:shadow-glow border-2 border-green-500"
        >
          View Details
        </button>
      </div>
      <div className="h-64">
        <Pie data={chartConfig} options={options} />
      </div>
      
      {chartData.length > 0 && (
        <div className="mt-6 border-t border-gray-100 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Layer Details</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Layer</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {chartData.map((layer, index) => (
                  <tr key={index} className="hover:bg-green-50">
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800 flex items-center">
                      <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colorScale[index] }}></span>
                      {layer.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-right">{layer.size}MB</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600 text-right">{layer.ratio}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}