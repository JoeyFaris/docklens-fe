import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { containerService } from '../api';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function ContainerDetails() {
  const { containerId } = useParams();
  const [activeTab, setActiveTab] = useState('logs');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  // Fetch container details
  const { 
    data: containerDetails, 
    isLoading: isLoadingDetails, 
    error: detailsError,
    refetch: refetchDetails
  } = useQuery({
    queryKey: ['containerDetails', containerId],
    queryFn: () => containerService.getContainerDetails(containerId),
    refetchInterval: autoRefresh ? refreshInterval : false,
  });

  // Fetch container logs
  const { 
    data: containerLogs, 
    isLoading: isLoadingLogs, 
    error: logsError,
    refetch: refetchLogs
  } = useQuery({
    queryKey: ['containerLogs', containerId],
    queryFn: () => containerService.getContainerLogs(containerId),
    refetchInterval: activeTab === 'logs' && autoRefresh ? refreshInterval : false,
  });

  // Fetch container stats
  const { 
    data: containerStats, 
    isLoading: isLoadingStats, 
    error: statsError,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['containerStats', containerId],
    queryFn: () => dockerApi.getContainerStats(containerId),
    refetchInterval: activeTab === 'stats' && autoRefresh ? refreshInterval : false,
  });

  // Handle manual refresh
  const handleRefresh = () => {
    if (activeTab === 'logs') {
      refetchLogs();
    } else if (activeTab === 'stats') {
      refetchStats();
    } else {
      refetchDetails();
    }
  };

  // Effect to auto-scroll logs to bottom when they update
  useEffect(() => {
    if (activeTab === 'logs' && containerLogs) {
      const logsContainer = document.getElementById('logs-container');
      if (logsContainer) {
        logsContainer.scrollTop = logsContainer.scrollHeight;
      }
    }
  }, [containerLogs, activeTab]);

  if (isLoadingDetails && !containerDetails) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (detailsError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error loading container details: {detailsError.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Container: {containerDetails?.name || containerId}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="auto-refresh"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="auto-refresh" className="text-sm text-gray-700">Auto-refresh</label>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              disabled={!autoRefresh}
              className="rounded border border-gray-300 p-1 text-sm"
            >
              <option value={2000}>2s</option>
              <option value={5000}>5s</option>
              <option value={10000}>10s</option>
              <option value={30000}>30s</option>
            </select>
          </div>
          <button
            className="btn-primary flex items-center space-x-2"
            onClick={handleRefresh}
          >
            <ArrowPathIcon className="h-5 w-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {containerDetails && (
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Basic Info</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Name:</span> {containerDetails.name}</div>
                <div><span className="font-medium">ID:</span> {containerDetails.id}</div>
                <div><span className="font-medium">Image:</span> {containerDetails.image}</div>
                <div><span className="font-medium">Status:</span> {containerDetails.state?.status || containerDetails.status}</div>
                <div><span className="font-medium">Created:</span> {new Date(containerDetails.created).toLocaleString()}</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Network</h3>
              <div className="space-y-2 text-sm">
                {containerDetails.NetworkSettings?.Networks ? (
                  Object.entries(containerDetails.NetworkSettings.Networks).map(([network, details]) => (
                    <div key={network} className="bg-gray-50 p-2 rounded">
                      <div><span className="font-medium">Network:</span> {network}</div>
                      <div><span className="font-medium">IP Address:</span> {details.IPAddress}</div>
                      <div><span className="font-medium">Gateway:</span> {details.Gateway}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No network information available</div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Ports</h3>
              <div className="space-y-2 text-sm">
                {containerDetails.ports && containerDetails.ports.length > 0 ? (
                  containerDetails.ports.map((port, index) => (
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
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`${
                  activeTab === 'logs'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('logs')}
              >
                Logs
              </button>
              <button
                className={`${
                  activeTab === 'stats'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('stats')}
              >
                Stats
              </button>
              <button
                className={`${
                  activeTab === 'env'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('env')}
              >
                Environment
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'logs' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Container Logs</h3>
              {isLoadingLogs && !containerLogs ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
              ) : logsError ? (
                <div className="text-red-500 p-4">Error loading logs: {logsError.message}</div>
              ) : (
                <div 
                  id="logs-container"
                  className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto"
                >
                  {containerLogs && containerLogs.length > 0 ? (
                    <pre>{containerLogs}</pre>
                  ) : (
                    <div className="text-gray-400">No logs available</div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Container Stats</h3>
              {isLoadingStats && !containerStats ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
              ) : statsError ? (
                <div className="text-red-500 p-4">Error loading stats: {statsError.message}</div>
              ) : (
                <div className="space-y-4">
                  {containerStats ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-gray-500 text-sm">CPU Usage</div>
                          <div className="text-2xl font-semibold">
                            {containerStats.cpu_stats && containerStats.precpu_stats
                              ? `${(containerStats.cpu_stats.cpu_usage.total_usage / containerStats.precpu_stats.cpu_usage.total_usage * 100).toFixed(2)}%`
                              : 'N/A'}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-gray-500 text-sm">Memory Usage</div>
                          <div className="text-2xl font-semibold">
                            {containerStats.memory_stats
                              ? `${(containerStats.memory_stats.usage / (1024 * 1024)).toFixed(2)} MB`
                              : 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {containerStats.memory_stats
                              ? `Limit: ${(containerStats.memory_stats.limit / (1024 * 1024)).toFixed(2)} MB`
                              : ''}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-gray-500 text-sm">Network I/O</div>
                          <div className="text-sm">
                            {containerStats.networks
                              ? Object.entries(containerStats.networks).map(([iface, data]) => (
                                  <div key={iface}>
                                    <div><b>In:</b> {(data.rx_bytes / (1024 * 1024)).toFixed(2)} MB</div>
                                    <div><b>Out:</b> {(data.tx_bytes / (1024 * 1024)).toFixed(2)} MB</div>
                                  </div>
                                ))
                              : 'N/A'}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-gray-500 text-sm">Block I/O</div>
                          <div className="text-sm">
                            {containerStats.blkio_stats && containerStats.blkio_stats.io_service_bytes_recursive
                              ? (
                                  <div>
                                    <div>
                                      <b>Read:</b> {(containerStats.blkio_stats.io_service_bytes_recursive
                                        .filter(stat => stat.op === 'Read')
                                        .reduce((sum, stat) => sum + stat.value, 0) / (1024 * 1024)).toFixed(2)} MB
                                    </div>
                                    <div>
                                      <b>Write:</b> {(containerStats.blkio_stats.io_service_bytes_recursive
                                        .filter(stat => stat.op === 'Write')
                                        .reduce((sum, stat) => sum + stat.value, 0) / (1024 * 1024)).toFixed(2)} MB
                                    </div>
                                  </div>
                                )
                              : 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Stats last updated: {new Date().toLocaleString()}
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-500">No stats available</div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'env' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Environment Variables</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {containerDetails.Config?.Env ? (
                  <div className="font-mono text-sm">
                    {containerDetails.Config.Env.map((env, index) => (
                      <div key={index} className="py-1 border-b border-gray-200 last:border-0">
                        {env}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No environment variables available</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 