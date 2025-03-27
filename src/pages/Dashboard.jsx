import { useState } from 'react';
import AnalyzeImageModal from '../components/containers/AnalyzeImageModal';
import StatsCards from '../components/dashboard/StatsCards';
import LayerAnalysis from '../components/dashboard/LayerAnalysis';
import SecurityOverview from '../components/dashboard/SecurityOverview';
import ResourceUsage from '../components/dashboard/ResourceUsage';
import OptimizationOpportunities from '../components/dashboard/OptimizationOpportunities';

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

export default function Dashboard() {
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
  const [analysisData, setAnalysisData] = useState(mockData);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (results) => {
    // Log the raw results
    console.log('Dashboard - Raw Analysis Results:', results);

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

    // Log the transformed data
    console.log('Dashboard - Transformed Data:', {
      stats: transformedData.stats,
      layerAnalysis: transformedData.layerAnalysis,
      securityIssues: transformedData.securityIssues,
      resourceUsage: transformedData.resourceUsage
    });

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
          className="group px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-sm transition-all duration-300 shadow-green-lg hover:shadow-glow text-white flex items-center space-x-2 border-2 border-green-500"
          onClick={() => setShowAnalyzeModal(true)}
        >
          <span>Analyze Environment</span>
          <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <StatsCards stats={analysisData.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LayerAnalysis 
          data={analysisData.layerAnalysis} 
          onAnalyze={() => setShowAnalyzeModal(true)} 
        />
        <SecurityOverview issues={analysisData.securityIssues} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResourceUsage data={analysisData.resourceUsage} />
        <OptimizationOpportunities />
      </div>
      <AnalyzeImageModal
        isOpen={showAnalyzeModal}
        onClose={() => setShowAnalyzeModal(false)}
        onAnalysisComplete={handleAnalysisComplete}
      />
    </div>
  );
} 