import React from 'react';

export default function ContainerList({ containers, selectedContainer, onContainerClick, isLoading, onRefresh }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-gray-700">Current Containers:</h4>
        <button
          onClick={onRefresh}
          className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          <span>Refresh</span>
        </button>
      </div>
      <div className="space-y-2">
        {containers.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No containers found
          </div>
        )}
        {containers.map(container => (
          <div
            key={container.id}
            className={`text-sm text-gray-600 bg-white p-3 rounded-lg border transition-colors cursor-pointer ${
              selectedContainer?.id === container.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => onContainerClick(container)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{container.name}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                container.status === 'running' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {container.status}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <div>Image: {container.image}</div>
              <div>Status: {container.state || container.status}</div>
              {container.ports && container.ports.length > 0 && (
                <div>
                  Ports: {container.ports.map(p => `${p.PrivatePort}/${p.Type}`).join(', ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 