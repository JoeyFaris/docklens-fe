import { useState, useEffect, useMemo } from 'react';
import { ShieldCheckIcon, ShieldExclamationIcon, ExclamationTriangleIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import useSecurityScanQuery from '../hooks/useSecurityScanQuery';

export default function SecurityScanModal({ isOpen, onClose, imageId }) {
  // Use the React Query-based hook
  const {
    scanId,
    scanData,
    isStarting,
    isScanning,
    isCompleted,
    isFailed,
    error,
    progress,
    startScan,
    stopPolling,
    resetScan
  } = useSecurityScanQuery({
    pollingInterval: 5000,
    onScanComplete: (data) => {
      console.log('Scan completed:', data);
    },
    onScanError: (err) => {
      console.error('Scan error:', err);
    }
  });

  // Determine current status for UI display
  const status = useMemo(() => {
    if (isStarting) return 'starting';
    if (isScanning) return 'scanning';
    if (isCompleted) return 'completed';
    if (isFailed) return 'error';
    return 'idle';
  }, [isStarting, isScanning, isCompleted, isFailed]);

  // Clean up when modal closes
  useEffect(() => {
    if (!isOpen) {
      stopPolling();
    }
  }, [isOpen, stopPolling]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      resetScan();
    }
  }, [isOpen, resetScan]);

  const handleStartScan = () => {
    startScan(imageId);
  };

  const getTotalVulnerabilities = useMemo(() => {
    if (!scanData || !scanData.vulnerabilities) return 0;
    const { critical, high, medium, low } = scanData.vulnerabilities;
    return (critical || 0) + (high || 0) + (medium || 0) + (low || 0);
  }, [scanData]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100';
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-forest-600 bg-forest-50';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <ShieldCheckIcon className="h-6 w-6 text-forest-500 mr-2" />
            Security Scan {imageId && `- ${imageId}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {status === 'idle' && (
            <div className="text-center py-8">
              <ShieldCheckIcon className="h-16 w-16 text-forest-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Scan</h3>
              <p className="text-gray-600 mb-6">
                This will scan the image for security vulnerabilities using Trivy.
              </p>
              <button
                onClick={handleStartScan}
                className="px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2"
              >
                Start Security Scan
              </button>
            </div>
          )}

          {(status === 'starting' || status === 'scanning') && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-forest-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {status === 'starting' ? 'Starting Scan...' : 'Scanning...'}
              </h3>
              <p className="text-gray-600 mb-2">
                {status === 'starting' 
                  ? 'Preparing to scan the image for vulnerabilities.' 
                  : 'Scanning image for security vulnerabilities.'}
              </p>
              {status === 'scanning' && progress && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 max-w-md mx-auto">
                  <div 
                    className="bg-forest-500 h-2.5 rounded-full" 
                    style={{ width: progress }}
                  ></div>
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {status === 'scanning' && `Progress: ${progress}`}
                {status === 'scanning' && scanId && <span className="block mt-1">Scan ID: {scanId}</span>}
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-8">
              <div className="bg-red-100 p-4 rounded-lg mb-4 max-w-md mx-auto">
                <ExclamationTriangleIcon className="h-10 w-10 text-red-600 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-red-800 mb-2">Scan Failed</h3>
                <p className="text-red-700">{error?.message || 'An unknown error occurred'}</p>
              </div>
              <button
                onClick={handleStartScan}
                className="px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          )}

          {status === 'completed' && scanData && (
            <div className="py-4">
              <div className="flex flex-col md:flex-row md:items-start md:space-x-6 mb-6">
                <div className="flex-1 bg-gray-50 p-4 rounded-lg mb-4 md:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Scan Summary</h3>
                    <span className="text-sm text-gray-600">
                      {new Date(scanData.completedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600">Image ID</div>
                      <div className="font-medium truncate">{scanData.imageId}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600">Scan ID</div>
                      <div className="font-medium truncate">{scanId}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600">Started</div>
                      <div className="font-medium">
                        {new Date(scanData.startTime).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600">Duration</div>
                      <div className="font-medium">
                        {Math.round((new Date(scanData.completedAt) - new Date(scanData.startTime)) / 1000)} seconds
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Vulnerabilities</h3>
                  {scanData.vulnerabilities && (
                    <div className="space-y-3">
                      {Object.entries(scanData.vulnerabilities).map(([severity, count]) => (
                        <div key={severity} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded-md text-sm font-medium ${getSeverityColor(severity)}`}>
                              {severity.charAt(0).toUpperCase() + severity.slice(1)}
                            </span>
                          </div>
                          <div className="font-medium">{count}</div>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Total Vulnerabilities</span>
                          <span className="font-semibold">{getTotalVulnerabilities}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {scanData.warnings && (
                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                  <div className="flex">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2" />
                    <div>
                      <h4 className="text-md font-medium text-yellow-800">Warnings</h4>
                      <p className="text-yellow-700 text-sm mt-1">{scanData.warnings}</p>
                    </div>
                  </div>
                </div>
              )}

              {scanData.fullResults && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Results</h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    {JSON.stringify(scanData.fullResults, null, 2)}
                  </pre>
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleStartScan}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-1" />
                  Scan Again
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 