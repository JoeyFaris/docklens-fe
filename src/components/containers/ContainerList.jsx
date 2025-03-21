import React from 'react';
import { formatContainerName } from '../../utils/formatters';
import { Button } from '../ui';

/**
 * Displays a list of Docker containers with their status
 * 
 * @param {Object} props
 * @param {Array} props.containers - List of container objects to display
 * @param {Object} props.selectedContainer - Currently selected container if any
 * @param {Function} props.onContainerClick - Function to call when a container is clicked
 * @param {boolean} props.isLoading - Whether containers are currently loading
 * @param {Function} props.onRefresh - Function to call to refresh the container list
 */
export default function ContainerList({ 
  containers = [], 
  selectedContainer, 
  onContainerClick, 
  isLoading = false,
  onRefresh 
}) {
  // Helper function to get container status color
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800 border-gray-200';
    if (status === 'running') return 'bg-green-100 text-green-800 border-green-200';
    if (status === 'exited') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (isLoading) {
    return (
      <div className="py-6 flex justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600">Loading containers...</span>
        </div>
      </div>
    );
  }


  if (!containers.length) {
    return (
      <div className="py-6 flex flex-col items-center text-center">
        <div className="bg-gray-100 p-3 rounded-full mb-4">
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No Containers Found</h3>
        <p className="text-gray-600 text-sm mb-4">
          No Docker containers were detected running on your system.
        </p>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onRefresh}
        >
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Available Containers ({containers.length})
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRefresh}
          disabled={isLoading}
        >
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </Button>
      </div>

      <div className="overflow-auto max-h-80 -mx-4 px-4">
        <ul className="space-y-2">
          {containers.map((container) => (
            <li key={container.id}>
              <button
                className={`w-full text-left p-3 rounded-xl border hover:border-blue-300 transition-colors ${
                  selectedContainer && selectedContainer.id === container.id
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-white border-gray-200'
                }`}
                onClick={() => onContainerClick(container)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 mb-1 truncate">
                      {container.name ? formatContainerName(container.name) : 'Unnamed container'}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">{container.image}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(container.status)}`}>
                    {container.status || 'Unknown'}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 