import React, { useState, useEffect } from 'react';
import { dockerApi } from '../api/dockerApi';
import DiagnosticsConfirmModal from './DiagnosticsConfirmModal';
import PermissionRequestModal from './PermissionRequestModal';
import ContainerList from './ContainerList';

export default function AnalyzeImageModal({ isOpen, onClose, onAnalysisComplete, onPermissionGranted }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStep, setPermissionStep] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [containers, setContainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [showDiagnosticsModal, setShowDiagnosticsModal] = useState(false);
  const MAX_RETRIES = 3;

  useEffect(() => {
    if (isOpen && hasPermission) {
      if (!permissionStep) {
        handlePermissionGrant(true);
      }
    }
  }, [isOpen, hasPermission, permissionStep]);

  // Auto-retry logic for container fetching
  useEffect(() => {
    if (error && retryCount < MAX_RETRIES) {
      const timer = setTimeout(() => {
        handlePermissionGrant(true); // true indicates it's a retry
      }, 2000 * (retryCount + 1)); // Exponential backoff
      
      return () => clearTimeout(timer);
    }
  }, [error, retryCount]);

  const resetState = () => {
    setError(null);
    setContainers([]);
    setIsLoading(false);
    setRetryCount(0);
  };

  const handleGoBack = () => {
    resetState();
    setPermissionStep(true);
    setHasPermission(false);
  };

  const handlePermissionGrant = async (isRetry = false) => {
    if (!isRetry) {
      resetState();
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const containerData = await dockerApi.getContainers();
      
      if (!containerData || !Array.isArray(containerData)) {
        throw new Error('Invalid container data received');
      }

      setContainers(containerData);
      setHasPermission(true);
      setPermissionStep(false);
      setRetryCount(0); // Reset retry count on success
      
      if (onPermissionGranted) {
        onPermissionGranted();
      }
    } catch (error) {
      console.error('Error fetching containers:', error);
      setRetryCount(prev => prev + 1);
      
      let errorMessage = 'Failed to fetch container data. ';
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage += 'Please check your connection to Docker daemon.';
      } else if (error.message.includes('Not Found')) {
        errorMessage += 'Docker API endpoint not found.';
      } else if (error.message.includes('Permission denied')) {
        errorMessage += 'Permission denied. Please check Docker permissions.';
      } else {
        errorMessage += error.message;
      }

      setError(errorMessage);
      
      // Only reset permission state if it's not a retry attempt
      if (!isRetry) {
        setHasPermission(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleContainerClick = (container) => {
    setSelectedContainer(container);
    setShowDiagnosticsModal(true);
  };

  const handleDiagnosticsConfirm = async (container) => {
    setShowDiagnosticsModal(false);
    setSelectedContainer(null);
    if (onAnalysisComplete) {
      onAnalysisComplete(container);
    }
    onClose();
  };

  if (!isOpen) return null;

  if (permissionStep) {
    return (
      <PermissionRequestModal
        onClose={onClose}
        onPermissionGrant={handlePermissionGrant}
        isLoading={isLoading}
        error={error}
        retryCount={retryCount}
        MAX_RETRIES={MAX_RETRIES}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-blue-100/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full border-2 border-blue-200">
        <div className="p-8">
          <header className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-blue-700">Docker Status</h2>
            <button
              onClick={onClose}
              disabled={isAnalyzing}
              className="text-blue-400 hover:text-blue-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="space-y-6">
            <ContainerList
              containers={containers}
              selectedContainer={selectedContainer}
              onContainerClick={handleContainerClick}
              isLoading={isLoading}
              onRefresh={() => handlePermissionGrant(true)}
            />

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 text-sm">
                <div className="font-medium mb-1">Error:</div>
                <div>{error}</div>
                {retryCount > 0 && retryCount < MAX_RETRIES && (
                  <div className="mt-2 text-gray-600">
                    Retrying... Attempt {retryCount} of {MAX_RETRIES}
                  </div>
                )}
                {retryCount >= MAX_RETRIES && (
                  <div className="mt-2 text-gray-600">
                    Max retries reached. Please check your Docker configuration and try again.
                  </div>
                )}
              </div>
            )}

            <footer className="flex justify-between gap-4 pt-6">
              <button
                type="button"
                className="px-6 py-3 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                onClick={handleGoBack}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
              </button>
              <button
                type="button"
                className="px-6 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border-2 border-blue-200"
                onClick={onClose}
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      </div>

      <DiagnosticsConfirmModal
        isOpen={showDiagnosticsModal}
        container={selectedContainer}
        onClose={() => {
          setShowDiagnosticsModal(false);
          setSelectedContainer(null);
        }}
        onConfirm={handleDiagnosticsConfirm}
      />
    </div>
  );
}