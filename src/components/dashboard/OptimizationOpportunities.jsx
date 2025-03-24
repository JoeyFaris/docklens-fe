import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import chroma from 'chroma-js';

export default function OptimizationOpportunities() {
  // Generate color gradients for visual appeal
  const forestColorScale = chroma.scale(['#16a34a', '#166534']).mode('lch');
  const greenColorScale = chroma.scale(['#22c55e', '#166534']).mode('lch');
  
  const optimizations = [
    {
      title: 'Large Base Image',
      description: 'Consider using a smaller base image like alpine to reduce size by up to 70%',
      icon: (
        <svg className="h-6 w-6 text-forest-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      actionText: 'Optimize Image',
      impact: 'High Impact',
      savings: '120MB reduction',
      colorScheme: 'forest'
    },
    {
      title: 'Unused Files',
      description: "30MB of files haven't been accessed in 30 days and can be safely removed",
      icon: (
        <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      ),
      actionText: 'Clean Files',
      impact: 'Medium Impact',
      savings: '30MB reduction',
      colorScheme: 'green'
    }
  ];

  const getColorScheme = (scheme) => {
    switch(scheme) {
      case 'forest':
        return {
          bg: 'bg-gradient-to-br from-forest-50 to-forest-100',
          border: 'border-forest-200',
          button: 'bg-forest-100 text-forest-700 hover:bg-forest-200',
          icon: 'text-forest-500',
          title: 'text-forest-800',
          text: 'text-forest-700'
        };
      case 'green':
        return {
          bg: 'bg-gradient-to-br from-green-50 to-green-100',
          border: 'border-green-200',
          button: 'bg-green-100 text-green-700 hover:bg-green-200',
          icon: 'text-green-500',
          title: 'text-green-800',
          text: 'text-green-700'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
          border: 'border-gray-200',
          button: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          icon: 'text-gray-500',
          title: 'text-gray-800',
          text: 'text-gray-700'
        };
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900 mr-3">Optimization Opportunities</h2>
      </div>
      
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        Improve container efficiency and reduce resource consumption with these personalized recommendations.
      </p>
      
      <div className="space-y-5">
        {optimizations.map((opt, index) => {
          const colors = getColorScheme(opt.colorScheme);
          
          return (
            <div 
              key={index} 
              className={`p-5 ${colors.bg} rounded-xl border ${colors.border} transition-all duration-300 hover:shadow-sm`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className={`p-2 bg-white rounded-lg shadow-sm ${colors.icon}`}>
                    {opt.icon}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-base font-semibold ${colors.title}`}>{opt.title}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white ${colors.text}`}>
                      {opt.impact}
                    </span>
                  </div>
                  
                  <p className={`text-sm ${colors.text} mb-3`}>{opt.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-gray-600">
                      {opt.savings}
                    </span>
                    
                    <button className={`px-3 py-1.5 ${colors.button} rounded-lg transition-colors text-sm font-medium flex items-center space-x-1 shadow-sm`}>
                      <span>{opt.actionText}</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}