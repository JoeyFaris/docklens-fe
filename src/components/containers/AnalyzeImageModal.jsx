import React, { useState, useEffect } from 'react';
import { containerService } from '../../api';
import DiagnosticsConfirmModal from './DiagnosticsConfirmModal';
import Modal from '../ui/Modal';
import { Button } from '../ui';
import { getErrorMessage, logError } from '../../utils/errorHandling';
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

  // Reset state when modal is opened
  useEffect(() => {
    if (isOpen) {
      // If no permission yet, always start with permission step
      if (!hasPermission) {
        setPermissionStep(true);
      }
    }
  }, [isOpen, hasPermission]);

  // Refresh container data when modal is opened with permission
  useEffect(() => {
    if (isOpen && hasPermission && !permissionStep) {
      handlePermissionGrant(true);
    }
  }, [isOpen, hasPermission, permissionStep]);

  // Auto-retry logic for container fetching
  useEffect(() => {
    let timer;
    if (error && retryCount < MAX_RETRIES) {
      timer = setTimeout(() => {
        handlePermissionGrant(true); // true indicates it's a retry
      }, 2000 * (retryCount + 1)); // Exponential backoff
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
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
      const response = await containerService.getContainers();
      
      // Check if the response has the expected structure
      if (!response || !response.success || !response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid container data received');
      }

      setContainers(response.data);
      setHasPermission(true);
      setPermissionStep(false);
      setRetryCount(0); // Reset retry count on success
      
      // Only call onPermissionGranted if this is a fresh permission grant (not a refresh)
      if (onPermissionGranted && !isRetry) {
        onPermissionGranted();
      }
    } catch (error) {
      logError('Container fetching', error);
      setRetryCount(prev => prev + 1);
      setError(error);
      
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

  // Permission Step Content
  const renderPermissionContent = () => (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-green-500/20 p-2 rounded-lg">
          <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-white mb-1">Connect to Docker</h3>
          <p className="text-gray-300 text-sm">
            To analyze your Docker containers, we need permission to connect to the Docker daemon. 
            This allows us to fetch information about your containers.
          </p>
        </div>
      </div>

      <div className="bg-[#2a3b61] p-4 rounded-xl border border-green-500/20">
        <h3 className="font-medium text-white mb-2">What we'll access:</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <svg className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>List of running containers</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Container metadata (names, images, status)</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Resource usage statistics</span>
          </li>
        </ul>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
          <div className="font-medium mb-1">Unable to connect to Docker daemon</div>
          {retryCount > 0 && retryCount < MAX_RETRIES && (
            <div className="mt-2 text-gray-300">
              Retrying... Attempt {retryCount} of {MAX_RETRIES}
            </div>
          )}
          {retryCount >= MAX_RETRIES && (
            <div className="mt-2 text-gray-300">
              Max retries reached. Please check your Docker configuration and try again.
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Container List Content
  const renderContainerContent = () => (
    <div>
      <ContainerList
        containers={containers}
        selectedContainer={selectedContainer}
        onContainerClick={handleContainerClick}
        isLoading={isLoading}
        onRefresh={() => handlePermissionGrant(true)}
      />

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm mt-4">
          <div className="font-medium mb-1">Error:</div>
          <div>{getErrorMessage(error)}</div>
          {retryCount > 0 && retryCount < MAX_RETRIES && (
            <div className="mt-2 text-gray-300">
              Retrying... Attempt {retryCount} of {MAX_RETRIES}
            </div>
          )}
          {retryCount >= MAX_RETRIES && (
            <div className="mt-2 text-gray-300">
              Max retries reached. Please check your Docker configuration and try again.
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Dynamic footer based on current step
  const getFooter = () => {
    if (permissionStep) {
      return (
        <>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handlePermissionGrant()}
            isLoading={isLoading}
          >
            Grant Access
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outline"
            onClick={handleGoBack}
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </>
      );
    }
  };

  // Single Modal with dynamic content
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        title={permissionStep ? "Docker Connection Required" : "Docker Status"}
        footer={getFooter()}
      >
        {permissionStep ? renderPermissionContent() : renderContainerContent()}
      </Modal>

      {/* Keep the diagnostics modal separate as it's a different workflow */}
      <DiagnosticsConfirmModal
        isOpen={showDiagnosticsModal}
        container={selectedContainer}
        onClose={() => {
          setShowDiagnosticsModal(false);
          setSelectedContainer(null);
        }}
        onConfirm={handleDiagnosticsConfirm}
      />
    </>
  );
} 