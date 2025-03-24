import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import chroma from 'chroma-js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ResourceUsage({ data = [] }) {
  // Use provided data or fallback to demo data
  const containerData = data.length > 0 ? data : [
    { name: 'nginx:latest', cpu: 65, memory: 45, network: 32 },
    { name: 'mongo:5.0', cpu: 45, memory: 75, network: 18 },
    { name: 'redis:alpine', cpu: 85, memory: 35, network: 12 },
    { name: 'node:16', cpu: 25, memory: 85, network: 42 },
    { name: 'postgres:13', cpu: 55, memory: 65, network: 28 },
  ];

  // Generate color gradients
  const cpuColorScale = chroma.scale(['#16a34a', '#166534']).mode('lch');
  const memoryColorScale = chroma.scale(['#3b82f6', '#1e40af']).mode('lch');
  const networkColorScale = chroma.scale(['#8b5cf6', '#4c1d95']).mode('lch');

  const chartData = {
    labels: containerData.map(item => item.name),
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: containerData.map(item => item.cpu),
        backgroundColor: cpuColorScale(0.6).hex(),
        hoverBackgroundColor: cpuColorScale(0.8).hex(),
        borderWidth: 1,
        borderRadius: 4,
        borderColor: cpuColorScale(0.9).hex(),
      },
      {
        label: 'Memory Usage (%)',
        data: containerData.map(item => item.memory),
        backgroundColor: memoryColorScale(0.6).hex(),
        hoverBackgroundColor: memoryColorScale(0.8).hex(),
        borderWidth: 1,
        borderRadius: 4,
        borderColor: memoryColorScale(0.9).hex(),
      },
      {
        label: 'Network I/O (MB/s)',
        data: containerData.map(item => item.network),
        backgroundColor: networkColorScale(0.6).hex(),
        hoverBackgroundColor: networkColorScale(0.8).hex(),
        borderWidth: 1,
        borderRadius: 4,
        borderColor: networkColorScale(0.9).hex(),
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#334155',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        boxPadding: 4,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}${context.dataset.label.includes('Network') ? ' MB/s' : '%'}`;
          },
          afterLabel: function(context) {
            const containerName = context.label;
            if (context.dataset.label.includes('CPU')) {
              return `Optimize: Consider setting CPU limits for ${containerName}`;
            } else if (context.dataset.label.includes('Memory')) {
              return `Optimize: Adjust memory allocation for ${containerName}`;
            } else {
              return `Optimize: Check for network bottlenecks in ${containerName}`;
            }
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Container Resource Usage</h3>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">
        Monitor container resource consumption to identify optimization opportunities and prevent performance bottlenecks.
      </p>
      
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-600">
        <div className="p-2 bg-gray-50 rounded">
          <span className="font-medium">CPU Usage:</span> Container processing power consumption
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <span className="font-medium">Memory Usage:</span> RAM allocation and consumption
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <span className="font-medium">Network I/O:</span> Data transfer rates
        </div>
      </div>
    </div>
  );
}