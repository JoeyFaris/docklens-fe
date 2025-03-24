import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PlayIcon, StopIcon, TrashIcon, CubeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { containerService } from '../api';
import AnalyzeImageModal from './containers/AnalyzeImageModal';
import { toast } from 'react-hot-toast';

export default function Containers() {
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [isActionPending, setIsActionPending] = useState(false);
  
  const { data: containerResponse = { data: [] }, isLoading, error, refetch } = useQuery({
    queryKey: ['containers'],
    queryFn: () => containerService.getContainers(),
    refetchInterval: 5000, // Refresh every 5 seconds
    enabled: hasPermission, // Only start fetching after permission is granted
  });

  // Extract containers from the response data property
  const containers = containerResponse.data || [];

  const handlePermissionGranted = () => {
    setHasPermission(true);
    // Wait a moment before closing the modal to ensure the permission is processed
    setTimeout(() => {
      setIsModalOpen(false);
      refetch(); // Immediately fetch containers after permission is granted
    }, 500);
  };

  const handleStartContainer = async (containerId, event) => {
    event.stopPropagation(); // Prevent row selection
    if (isActionPending) return;
    
    setIsActionPending(true);
    try {
      await containerService.startContainer(containerId);
      toast.success('Container started successfully');
      refetch();
    } catch (error) {
      toast.error(`Failed to start container: ${error.message}`);
    } finally {
      setIsActionPending(false);
    }
  };

  const handleStopContainer = async (containerId, event) => {
    event.stopPropagation(); // Prevent row selection
    if (isActionPending) return;
    
    setIsActionPending(true);
    try {
      await containerService.stopContainer(containerId);
      toast.success('Container stopped successfully');
      refetch();
    } catch (error) {
      toast.error(`Failed to stop container: ${error.message}`);
    } finally {
      setIsActionPending(false);
    }
  };

  const handleRestartContainer = async (containerId, event) => {
    event.stopPropagation(); // Prevent row selection
    if (isActionPending) return;
    
    setIsActionPending(true);
    try {
      await containerService.restartContainer(containerId);
      toast.success('Container restarted successfully');
      refetch();
    } catch (error) {
      toast.error(`Failed to restart container: ${error.message}`);
    } finally {
      setIsActionPending(false);
    }
  };

  const handleRemoveContainer = async (containerId, event) => {
    event.stopPropagation(); // Prevent row selection
    if (isActionPending) return;
    
    if (!window.confirm('Are you sure you want to remove this container?')) {
      return;
    }
    
    setIsActionPending(true);
    try {
      await containerService.removeContainer(containerId);
      toast.success('Container removed successfully');
      // If the deleted container was selected, deselect it
      if (selectedContainer?.id === containerId) {
        setSelectedContainer(null);
      }
      refetch();
    } catch (error) {
      toast.error(`Failed to remove container: ${error.message}`);
    } finally {
      setIsActionPending(false);
    }
  };

  // Show the permission modal if we don't have permission yet
  if (!hasPermission) {
    return (
      <AnalyzeImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPermissionGranted={handlePermissionGranted}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error loading containers: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Containers</h1>
        <button 
          className="btn-primary flex items-center space-x-2"
          onClick={() => refetch()}
          disabled={isActionPending}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      <div className="card overflow-hidden shadow-soft">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-soft rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Container
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ports
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {containers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                          No containers found
                        </td>
                      </tr>
                    ) : (
                      containers.map((container) => (
                        <tr
                          key={container.id}
                          className={`${
                            selectedContainer?.id === container.id ? 'bg-primary-50' : ''
                          } hover:bg-gray-50 cursor-pointer transition-colors duration-150`}
                          onClick={() => setSelectedContainer(container)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <CubeIcon className="h-6 w-6 text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {container.name}
                                </div>
                                <div className="text-sm text-gray-500">{container.id.slice(0, 12)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                container.status === 'running'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <span className={`h-2 w-2 mr-2 rounded-full ${
                                container.status === 'running' ? 'bg-green-400' : 'bg-gray-400'
                              }`}></span>
                              {container.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{container.image}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {container.ports && container.ports.map((port, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs mr-2">
                                {port.PrivatePort}/{port.Type}
                              </span>
                            ))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(container.created).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-3 justify-end">
                              {container.status === 'running' ? (
                                <button 
                                  className="text-red-600 hover:text-red-900 transition-colors duration-150"
                                  onClick={(e) => handleStopContainer(container.id, e)}
                                  disabled={isActionPending}
                                  title="Stop container"
                                >
                                  <StopIcon className="h-5 w-5" />
                                </button>
                              ) : (
                                <button 
                                  className="text-green-600 hover:text-green-900 transition-colors duration-150"
                                  onClick={(e) => handleStartContainer(container.id, e)}
                                  disabled={isActionPending}
                                  title="Start container"
                                >
                                  <PlayIcon className="h-5 w-5" />
                                </button>
                              )}
                              <button 
                                className="text-green-600 hover:text-green-900 transition-colors duration-150"
                                onClick={(e) => handleRestartContainer(container.id, e)}
                                disabled={isActionPending}
                                title="Restart container"
                              >
                                <ArrowPathIcon className="h-5 w-5" />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900 transition-colors duration-150"
                                onClick={(e) => handleRemoveContainer(container.id, e)}
                                disabled={isActionPending}
                                title="Remove container"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedContainer && (
        <div className="bg-white rounded-lg shadow-soft p-6 animate-fadeIn">
          <h2 className="text-xl font-medium mb-4">Container Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Basic Info</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Name:</span> {selectedContainer.name}</div>
                <div><span className="font-medium">ID:</span> {selectedContainer.id}</div>
                <div><span className="font-medium">Image:</span> {selectedContainer.image}</div>
                <div><span className="font-medium">Status:</span> {selectedContainer.status}</div>
                <div><span className="font-medium">Created:</span> {new Date(selectedContainer.created).toLocaleString()}</div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button 
                  className="btn-primary"
                  onClick={() => {
                    window.open(`/container-details/${selectedContainer.id}`, '_blank');
                  }}
                >
                  View Detailed Logs
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    window.open(`/container-stats/${selectedContainer.id}`, '_blank');
                  }}
                >
                  View Stats
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Network & Ports</h3>
              <div className="space-y-2 text-sm">
                {selectedContainer.ports && selectedContainer.ports.length > 0 ? (
                  selectedContainer.ports.map((port, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded">
                      <div><span className="font-medium">Private Port:</span> {port.PrivatePort}</div>
                      <div><span className="font-medium">Public Port:</span> {port.PublicPort || 'None'}</div>
                      <div><span className="font-medium">Type:</span> {port.Type}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No ports exposed</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 