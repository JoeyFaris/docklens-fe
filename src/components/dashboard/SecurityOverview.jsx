import { useState } from 'react';
import { ShieldCheckIcon, ExclamationCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import SecurityScanModal from '../SecurityScanModal';
import chroma from 'chroma-js';

export default function SecurityOverview({ issues = [], lastScanTime, imageId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openScanModal = () => setIsModalOpen(true);
  const closeScanModal = () => setIsModalOpen(false);

  // Generate color gradients for severity levels
  const highSeverityGradient = chroma.scale(['#fee2e2', '#ef4444', '#b91c1c']).mode('lch');
  const mediumSeverityGradient = chroma.scale(['#ffedd5', '#f97316', '#c2410c']).mode('lch');
  const lowSeverityGradient = chroma.scale(['#fef9c3', '#eab308', '#a16207']).mode('lch');

  // Get severity badge styling with enhanced visual appeal
  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'High': 
        return {
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          iconColor: highSeverityGradient(0.7).hex(),
          hoverBg: 'hover:bg-red-100',
          gradient: `from-red-50 to-red-100`
        };
      case 'Medium': 
        return {
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700',
          borderColor: 'border-orange-200',
          iconColor: mediumSeverityGradient(0.7).hex(),
          hoverBg: 'hover:bg-orange-100',
          gradient: `from-orange-50 to-orange-100`
        };
      case 'Low': 
        return {
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          borderColor: 'border-yellow-200',
          iconColor: lowSeverityGradient(0.7).hex(),
          hoverBg: 'hover:bg-yellow-100',
          gradient: `from-yellow-50 to-yellow-100`
        };
      default: 
        return {
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200',
          iconColor: '#9ca3af',
          hoverBg: 'hover:bg-gray-100',
          gradient: `from-gray-50 to-gray-100`
        };
    }
  };

  // Calculate total vulnerabilities
  const totalIssues = issues.reduce((sum, issue) => sum + issue.count, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ShieldCheckIcon className="w-6 h-6 text-forest-500" />
          <h2 className="text-lg font-semibold text-gray-900">Security Overview</h2>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-full">
          <span className="text-sm text-gray-600 font-medium">
            {lastScanTime 
              ? `Last scan: ${lastScanTime}` 
              : 'No recent scans'}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-5 leading-relaxed">
        Monitor security vulnerabilities and take proactive measures to protect your container environment.
      </p>
      
      {issues && issues.length > 0 ? (
        <>
          {/* Summary bar */}
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
                <ShieldCheckIcon className="w-5 h-5 text-forest-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Vulnerabilities</p>
                <p className="text-xl font-bold text-gray-900">{totalIssues}</p>
              </div>
            </div>
            <button
              onClick={openScanModal}
              className="px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors text-sm font-medium shadow-sm flex items-center group"
            >
              Run New Scan
              <ArrowRightIcon className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Vulnerabilities list */}
          <div className="space-y-3 mb-4">
            {issues.map((issue) => {
              const styles = getSeverityStyles(issue.severity);
              return (
                <div 
                  key={issue.severity} 
                  className={`flex items-center justify-between p-4 ${styles.bgColor} rounded-lg border ${styles.borderColor} ${styles.hoverBg} transition-all duration-200 bg-gradient-to-r ${styles.gradient}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm`}>
                      <ExclamationCircleIcon className="w-5 h-5" style={{ color: styles.iconColor }} />
                    </div>
                    <div>
                      <span className={`font-semibold ${styles.textColor}`}>{issue.severity} Risk</span>
                      <p className="text-xs text-gray-500">
                        {issue.severity === 'High' ? 'Requires immediate attention' : 
                         issue.severity === 'Medium' ? 'Should be addressed soon' : 
                         'Monitor and plan remediation'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
                      <span className={`text-sm font-bold ${styles.textColor}`}>{issue.count}</span>
                    </div>
                    <button 
                      className={`px-3 py-1.5 bg-white/80 backdrop-blur-sm ${styles.textColor} rounded-lg hover:bg-white transition-colors text-sm font-medium flex items-center shadow-sm`}
                      onClick={openScanModal}
                    >
                      Fix Issues
                      <ArrowRightIcon className="w-3.5 h-3.5 ml-1.5 opacity-70" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
            
          <button
            onClick={openScanModal}
            className="w-full mt-2 flex items-center justify-center py-3 bg-forest-50 text-forest-600 rounded-lg hover:bg-forest-100 transition-colors text-sm font-medium group border border-forest-100"
          >
            View Detailed Security Report
            <ArrowRightIcon className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </>
      ) : (
        <div className="text-center py-10 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-gray-100">
          <div className="bg-forest-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <ShieldCheckIcon className="w-10 h-10 text-forest-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Your Environment is Secure</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">No security scans have been run yet. Run your first scan to identify potential vulnerabilities.</p>
          <button
            onClick={openScanModal}
            className="px-6 py-3 bg-forest-500 text-white rounded-lg hover:bg-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-300 transition-colors text-sm font-medium shadow-md group"
          >
            <span className="flex items-center">
              Run Security Scan
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      )}
      
      {imageId && (
        <SecurityScanModal
          isOpen={isModalOpen}
          onClose={closeScanModal}
          imageId={imageId}
        />
      )}
    </div>
  );
}