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
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                  {formatContainerName(container.name)}
                  <span className="text-xs font-normal text-blue-600 bg-blue-100/50 px-2 py-0.5 rounded-md">
                    {container.id?.slice(0, 12)}
                  </span>
                </h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${
                  container.status === 'running' ? 'bg-green-100 text-green-800 border border-green-200' : 
                  container.status === 'exited' ? 'bg-red-100 text-red-800 border border-red-200' : 
                  'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    container.status === 'running' ? 'bg-green-400' :
                    container.status === 'exited' ? 'bg-red-400' :
                    'bg-gray-400'
                  }`}></span>
                  {container.state || container.status}
                </span>
              </div>

              <dl className="grid gap-y-3 text-sm">
                <div className="flex items-center">
                  <dt className="w-24 flex-shrink-0 text-gray-500 font-medium">Image</dt>
                  <dd className="font-mono text-gray-900 bg-white/50 px-3 py-1 rounded-lg truncate border border-blue-100 flex-1">
                    {container.image}
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-24 flex-shrink-0 text-gray-500 font-medium">Ports</dt>
                  <dd className="font-mono text-gray-900 bg-white/50 px-3 py-1 rounded-lg border border-blue-100 flex-1">
                    {container.ports?.length ? container.ports.map(port => `${port.PublicPort}:${port.PrivatePort}`).join(', ') : 'None'}
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-24 flex-shrink-0 text-gray-500 font-medium">Created</dt>
                  <dd className="font-medium text-gray-900 bg-white/50 px-3 py-1 rounded-lg border border-blue-100 flex-1">
                    {container.created ? formatDate(container.created) : '-'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-yellow-700">
              <p className="font-medium mb-1">Analysis Notice</p>
              <p>This will collect diagnostic information about the container's configuration, resource usage, and potential issues. The process may take a few minutes to complete.</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
} 