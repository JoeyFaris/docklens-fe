import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, ShieldCheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import AnalyzeImageModal from '../components/AnalyzeImageModal';

const mockData = {
  stats: [
    { title: 'Total Containers', value: '12', change: '+2', changeType: 'increase' },
    { title: 'Running Containers', value: '8', change: '-1', changeType: 'decrease' },
    { title: 'Total Images', value: '24', change: '+5', changeType: 'increase' },
    { title: 'Optimization Score', value: '85%', change: '+12%', changeType: 'increase' },
  ],
  resourceUsage: [
    { name: 'Container 1', cpu: 65, memory: 45 },
    { name: 'Container 2', cpu: 35, memory: 28 },
    { name: 'Container 3', cpu: 85, memory: 72 },
    { name: 'Container 4', cpu: 45, memory: 38 },
  ],
  securityIssues: [
    { severity: 'High', count: 2, color: '#ef4444' },
    { severity: 'Medium', count: 5, color: '#f97316' },
    { severity: 'Low', count: 8, color: '#eab308' },
  ],
  layerAnalysis: [
    { name: 'Base Image', size: 150, ratio: 35 },
    { name: 'Dependencies', size: 120, ratio: 28 },
    { name: 'Application', size: 85, ratio: 20 },
    { name: 'Configuration', size: 45, ratio: 12 },
    { name: 'Other', size: 20, ratio: 5 },
  ],
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
        <p className="text-gray-600">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

export default function Dashboard() {
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
  const [analysisData, setAnalysisData] = useState(mockData);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (results) => {
    // Transform the backend data to match our frontend data structure
    const transformedData = {
      stats: [
        { 
          title: 'Total Containers', 
          value: results.containerCount || '0',
          change: '+0',
          changeType: 'neutral'
        },
        { 
          title: 'Running Containers',
          value: results.runningContainers || '0',
          change: '+0',
          changeType: 'neutral'
        },
        { 
          title: 'Total Images',
          value: results.imageCount || '0',
          change: '+0',
          changeType: 'neutral'
        },
        { 
          title: 'Optimization Score',
          value: `${results.optimizationScore || 0}%`,
          change: '+0%',
          changeType: 'neutral'
        },
      ],
      layerAnalysis: results.layers.map(layer => ({
        name: layer.name,
        size: layer.size,
        ratio: layer.percentage,
      })),
      securityIssues: results.securityScan.vulnerabilities.map(vuln => ({
        severity: vuln.severity,
        count: vuln.count,
        color: vuln.severity === 'High' ? '#ef4444' : 
               vuln.severity === 'Medium' ? '#f97316' : '#eab308',
      })),
      resourceUsage: results.containerStats || mockData.resourceUsage,
    };

    setAnalysisData(transformedData);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Overview of your Docker environment</p>
        </div>
        <button 
          className="btn-primary flex items-center space-x-2 group"
          onClick={() => setShowAnalyzeModal(true)}
        >
          <span>Analyze & Optimize</span>
          <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {analysisData.stats.map((stat) => (
          <div key={stat.title} className="card hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <div className={`flex items-center space-x-1 ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Layer Analysis</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">View Details</button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analysisData.layerAnalysis}
                  dataKey="size"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, value }) => `${name} (${value}MB)`}
                >
                  {analysisData.layerAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm text-gray-600">Size: {data.size}MB</p>
                          <p className="text-sm text-gray-600">Ratio: {data.ratio}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Security Overview</h2>
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Last scan: 2h ago</span>
            </div>
          </div>
          <div className="space-y-4">
            {analysisData.securityIssues.map((issue) => (
              <div key={issue.severity} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ExclamationCircleIcon className="w-5 h-5" style={{ color: issue.color }} />
                  <span className="font-medium">{issue.severity}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{issue.count} issues found</span>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">Fix</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Resource Usage</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analysisData.resourceUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="cpu" fill="#0ea5e9" name="CPU %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="memory" fill="#6366f1" name="Memory %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Optimization Opportunities</h2>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Large Base Image</h3>
                    <p className="text-sm text-yellow-700">Consider using a smaller base image like alpine</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">Optimize</button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Unused Files</h3>
                    <p className="text-sm text-blue-700">30MB of files haven't been accessed in 30 days</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">Clean</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnalyzeImageModal
        isOpen={showAnalyzeModal}
        onClose={() => setShowAnalyzeModal(false)}
        onAnalysisComplete={handleAnalysisComplete}
      />
    </div>
  );
} 