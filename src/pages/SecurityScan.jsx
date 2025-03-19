import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, ArrowLeftIcon, DocumentTextIcon, ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import useSecurityScanQuery from '../hooks/useSecurityScanQuery';
import { formatSecurityScanData, formatRelativeTime } from '../utils/securityScanUtils';

export default function SecurityScan() {
  const { imageId, scanId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('summary');
  const [formattedData, setFormattedData] = useState(null);

  // Use the React Query-based hook for security scanning
  const {
    scanData,
    isStarting,
    isScanning,
    isCompleted,
    isFailed,
    error,
    progress,
    startScan,
  } = useSecurityScanQuery({
    pollingInterval: 3000, // Poll more frequently on dedicated page
    onScanComplete: (data) => {
      // Format scan data when completed
      setFormattedData(formatSecurityScanData(data));
    },
  });

  useEffect(() => {
    // If we have scan data, format it
    if (scanData) {
      setFormattedData(formatSecurityScanData(scanData));
    }
  }, [scanData]);

  // Handle the case when neither imageId nor scanId is provided
  if (!imageId && !scanId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Missing Information</h2>
          <p className="text-gray-600 mb-6">No image ID or scan ID provided. Unable to display security scan information.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Determine loading state
  const isLoading = isStarting || isScanning;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 mr-4 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <ShieldCheckIcon className="h-7 w-7 text-blue-500 mr-2" />
          Security Scan
          {imageId && <span className="ml-2 text-gray-600 font-normal">- {imageId}</span>}
        </h1>
      </div>

      {isLoading && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isStarting ? 'Starting Security Scan...' : 'Scanning...'}
            </h3>
            <p className="text-gray-600 mb-4 max-w-md text-center">
              {isStarting 
                ? 'Preparing to scan the image for security vulnerabilities.' 
                : 'Analyzing image for security vulnerabilities. This may take a few minutes.'}
            </p>
            {isScanning && progress && (
              <div className="w-full max-w-md mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{progress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: progress }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isFailed && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <div className="flex">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
              <div>
                <h3 className="text-lg font-medium text-red-800 mb-1">Scan Failed</h3>
                <p className="text-red-700">{error?.message || 'An unknown error occurred during the security scan.'}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <button
              onClick={() => startScan(imageId)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              <ArrowPathIcon className="h-5 w-5 mr-1" />
              Retry Scan
            </button>
          </div>
        </div>
      )}

      {isCompleted && formattedData && (
        <>
          {/* Scan info header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Image</div>
                <div className="font-medium truncate">{formattedData.imageId}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Scan Completed</div>
                <div className="font-medium">{formatRelativeTime(formattedData.rawData.completedAt)}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Duration</div>
                <div className="font-medium">{formattedData.duration} seconds</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Risk Level</div>
                <div className={`font-medium ${formattedData.riskLevel.color === 'red' ? 'text-red-600' : 
                  formattedData.riskLevel.color === 'orange' ? 'text-orange-600' : 
                  formattedData.riskLevel.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {formattedData.riskLevel.level}
                </div>
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'summary'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab('vulnerabilities')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'vulnerabilities'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vulnerabilities
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'details'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Details
              </button>
            </nav>
          </div>

          {/* Tab content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'summary' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Vulnerability Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Vulnerability counts */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-medium text-gray-900 mb-3">Vulnerabilities by Severity</h3>
                    <div className="space-y-4">
                      {formattedData.vulnerabilities.map((vuln) => (
                        <div key={vuln.severity} className="flex items-center">
                          <div className="w-24">
                            <span className="px-2 py-1 rounded-md text-xs font-medium" style={{ 
                              backgroundColor: `${vuln.color}20`, // Add 20% opacity
                              color: vuln.color 
                            }}>
                              {vuln.severity}
                            </span>
                          </div>
                          <div className="flex-grow ml-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="rounded-full h-2" 
                                style={{ 
                                  backgroundColor: vuln.color,
                                  width: `${(vuln.count / formattedData.totalVulnerabilities) * 100}%`
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="ml-4 w-12 text-right font-medium">{vuln.count}</div>
                        </div>
                      ))}
                      
                      <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">{formattedData.totalVulnerabilities}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Risk assessment */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-medium text-gray-900 mb-3">Risk Assessment</h3>
                    <div className={`p-4 rounded-lg mb-4 ${
                      formattedData.riskLevel.color === 'red' ? 'bg-red-50' : 
                      formattedData.riskLevel.color === 'orange' ? 'bg-orange-50' :
                      formattedData.riskLevel.color === 'yellow' ? 'bg-yellow-50' : 'bg-green-50'
                    }`}>
                      <div className="flex items-start">
                        <ExclamationTriangleIcon className={`h-5 w-5 mr-2 ${
                          formattedData.riskLevel.color === 'red' ? 'text-red-500' : 
                          formattedData.riskLevel.color === 'orange' ? 'text-orange-500' :
                          formattedData.riskLevel.color === 'yellow' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                        <div>
                          <h4 className={`font-medium ${
                            formattedData.riskLevel.color === 'red' ? 'text-red-800' : 
                            formattedData.riskLevel.color === 'orange' ? 'text-orange-800' :
                            formattedData.riskLevel.color === 'yellow' ? 'text-yellow-800' : 'text-green-800'
                          }`}>
                            {formattedData.riskLevel.level} Risk
                          </h4>
                          <p className="text-sm mt-1 text-gray-600">
                            {formattedData.riskLevel.level === 'Critical' ? 
                              'Critical vulnerabilities must be addressed immediately.' :
                              formattedData.riskLevel.level === 'High' ?
                              'High-risk vulnerabilities should be remediated soon.' :
                              formattedData.riskLevel.level === 'Medium' ?
                              'Medium-risk vulnerabilities should be addressed in your next update cycle.' :
                              formattedData.riskLevel.level === 'Low' ?
                              'Low-risk vulnerabilities can be addressed as time permits.' :
                              'No vulnerabilities were found in this image.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {formattedData.rawData.warnings && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                          <div>
                            <h4 className="font-medium text-yellow-800">Warnings</h4>
                            <p className="text-sm mt-1 text-yellow-700">{formattedData.rawData.warnings}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => startScan(imageId)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                  >
                    <ArrowPathIcon className="h-5 w-5 mr-1" />
                    Scan Again
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'vulnerabilities' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Vulnerability Details</h2>
                {formattedData.totalVulnerabilities > 0 ? (
                  <div className="overflow-x-auto">
                    {/* This would display the actual vulnerability details from the scan */}
                    <div className="text-gray-600 mb-4">
                      Displaying the full list of vulnerabilities from the scan results.
                    </div>
                    
                    {/* In a real implementation, you would map through the vulnerabilities in scanData.fullResults */}
                    <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                      {JSON.stringify(formattedData.rawData.fullResults, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex">
                      <ShieldCheckIcon className="h-6 w-6 text-green-500 mr-2" />
                      <div>
                        <h3 className="font-medium text-green-800">No Vulnerabilities Found</h3>
                        <p className="text-green-700 text-sm mt-1">
                          Great news! No vulnerabilities were detected in this scan.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'details' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Scan Details</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-3">Scan Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Scan ID</div>
                      <div className="font-medium">{scanId || formattedData.rawData.scanId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Image ID</div>
                      <div className="font-medium">{formattedData.imageId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Start Time</div>
                      <div className="font-medium">{formattedData.startTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Completion Time</div>
                      <div className="font-medium">{formattedData.completedAt}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Duration</div>
                      <div className="font-medium">{formattedData.duration} seconds</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Status</div>
                      <div className="font-medium capitalize">{formattedData.status}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-md font-medium text-gray-900">Raw Scan Data</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                      <DocumentTextIcon className="h-4 w-4 mr-1" />
                      Export JSON
                    </button>
                  </div>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                    {JSON.stringify(formattedData.rawData, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {!isLoading && !isFailed && !isCompleted && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center py-8">
            <ShieldCheckIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Start a New Security Scan
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Scan this Docker image for security vulnerabilities using Trivy.
              This will analyze the image layers for known CVEs and security issues.
            </p>
            <button
              onClick={() => startScan(imageId)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Security Scan
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 