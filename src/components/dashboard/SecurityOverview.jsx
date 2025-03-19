import { useState } from 'react';
import { ShieldCheckIcon, ExclamationCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import SecurityScanModal from '../SecurityScanModal';

export default function SecurityOverview({ issues, lastScanTime, imageId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openScanModal = () => {
    setIsModalOpen(true);
  };
  
  const closeScanModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Security Overview</h2>
        <div className="flex items-center space-x-2">
          <ShieldCheckIcon className="w-5 h-5 text-green-500" />
          <span className="text-sm text-gray-600">
            {lastScanTime 
              ? `Last scan: ${lastScanTime}` 
              : 'No recent scans'}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {issues && issues.length > 0 ? (
          <>
            {issues.map((issue) => (
              <div key={issue.severity} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ExclamationCircleIcon className="w-5 h-5" style={{ color: issue.color }} />
                  <span className="font-medium">{issue.severity}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{issue.count} issues found</span>
                  <button 
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                    onClick={openScanModal}
                  >
                    Fix Issues
                  </button>
                </div>
              </div>
            ))}
            
            <button
              onClick={openScanModal}
              className="w-full mt-2 flex items-center justify-center py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              Run New Security Scan
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </button>
          </>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <ShieldCheckIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-3">No security scans have been run yet</p>
            <button
              onClick={openScanModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition-colors text-sm font-medium"
            >
              Run Security Scan
            </button>
          </div>
        )}
      </div>
      
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