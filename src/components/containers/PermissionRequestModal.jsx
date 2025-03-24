import React from 'react';
import Modal from '../ui/Modal';
import { Button } from '../ui';
import { getErrorMessage } from '../../utils/errorHandling';

export default function PermissionRequestModal({ 
  onClose, 
  onPermissionGrant, 
  isLoading, 
  error, 
  retryCount,
  MAX_RETRIES
}) {
  const modalFooter = (
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
        onClick={() => onPermissionGrant()}
        isLoading={isLoading}
      >
        Grant Access
      </Button>
    </>
  );

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title="Docker Connection Required" 
      footer={modalFooter}
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-2 rounded-lg">
            <svg className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Connect to Docker</h3>
            <p className="text-gray-600 text-sm">
              To analyze your Docker containers, we need permission to connect to the Docker daemon. 
              This allows us to fetch information about your containers.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">What we'll access:</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>List of running containers</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Container metadata (names, images, status)</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Resource usage statistics</span>
            </li>
          </ul>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 text-sm">
            <div className="font-medium mb-1">Connection Error:</div>
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
      </div>
    </Modal>
  );
} 