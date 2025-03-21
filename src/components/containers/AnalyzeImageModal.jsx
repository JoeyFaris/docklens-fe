import React, { useState, useEffect } from 'react';
import { containerService } from '../../api';
import DiagnosticsConfirmModal from './DiagnosticsConfirmModal';
import PermissionRequestModal from './PermissionRequestModal';
import ContainerList from './ContainerList';
import Modal from '../ui/Modal';
import { Button } from '../ui';
import { getErrorMessage, logError } from '../../utils/errorHandling';

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
      const response = await containerService.getContainers();
      
      // Check if the response has the expected structure
      if (!response || !response.success || !response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid container data received');
      }

      setContainers(response.data);
      setHasPermission(true);
      setPermissionStep(false);
      setRetryCount(0); // Reset retry count on success
      
      if (onPermissionGranted) {
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

  const modalFooter = (
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Docker Status" footer={modalFooter}>
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
            <div>{getErrorMessage(error)}</div>
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
      </Modal>

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