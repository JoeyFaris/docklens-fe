import React from 'react';

export default function DiagnosticsConfirmModal({ container, onClose, onConfirm, isOpen }) {
  console.log(container);
  console.log(isOpen);
  console.log(onClose);
  console.log(onConfirm);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full border-2 border-blue-200">
        <div className="p-8">
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Run Diagnostics</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-blue-800">Confirm Diagnostics</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Would you like to run diagnostics on:</p>
                    <div className="mt-2 p-3 bg-white rounded-lg border border-blue-200">
                      <div className="font-medium">{container.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>Image: {container.image}</div>
                        <div>Status: {container.status}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-500">
              This will analyze the container's performance, configuration, and security settings.
            </div>

            <footer className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-xl transition-colors shadow-lg shadow-blue-200"
                onClick={() => onConfirm(container)}
              >
                Run Diagnostics
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
} 