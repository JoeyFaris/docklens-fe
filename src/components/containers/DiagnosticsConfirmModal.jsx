import React from 'react';
import Modal from '../ui/Modal';
import { Button } from '../ui';
import { formatContainerName, formatDate } from '../../utils/formatters';

export default function DiagnosticsConfirmModal({ isOpen, container, onClose, onConfirm }) {
  if (!isOpen || !container) return null;

  const handleConfirm = () => {
    onConfirm(container);
  };

  const modalFooter = (
    <>
      <Button
        variant="outline"
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={handleConfirm}
      >
        Analyze
      </Button>
    </>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Analyze Container" 
      footer={modalFooter}
    >
      <div className="space-y-6">
        <p className="text-gray-700">
          You're about to analyze container: <br />
          <span className="font-mono bg-gray-100 px-2 py-1 rounded mt-2 block overflow-hidden text-ellipsis">
            {formatContainerName(container.name)}
          </span>
        </p>
        
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">Container Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-600">Image:</div>
            <div className="font-medium truncate">{container.image}</div>
            <div className="text-gray-600">Status:</div>
            <div className="font-medium">{container.status}</div>
            <div className="text-gray-600">Created:</div>
            <div className="font-medium">{container.created ? formatDate(container.created * 1000) : '-'}</div>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          This will collect diagnostic information about the container's configuration, resource usage, and potential issues.
        </p>
      </div>
    </Modal>
  );
} 