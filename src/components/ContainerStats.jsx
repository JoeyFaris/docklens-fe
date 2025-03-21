import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { containerService } from '../api';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function ContainerStats() {
  const { containerId } = useParams();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(2000);
  const [statsHistory, setStatsHistory] = useState([]);
  const maxHistoryLength = 30; // Keep 30 data points for charts (1 minute at 2s refresh rate)

  // Fetch container details
  const { 
    data: containerDetails, 
    isLoading: isLoadingDetails, 
    error: detailsError
  } = useQuery({
    queryKey: ['containerDetails', containerId],
    queryFn: () => containerService.getContainerDetails(containerId),
  });

  // Fetch container stats
  const { 
    data: containerStats, 
    isLoading: isLoadingStats, 
    error: statsError,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['containerStats', containerId],
    queryFn: () => containerService.getContainerStats(containerId),
    refetchInterval: autoRefresh ? refreshInterval : false,
  });

  // Update stats history when new stats arrive
  useEffect(() => {
    if (containerStats) {
      setStatsHistory(prevHistory => {
        const newHistory = [...prevHistory, {
          timestamp: new Date(),
          stats: containerStats
        }];
        
        // Limit history length
        if (newHistory.length > maxHistoryLength) {
          return newHistory.slice(newHistory.length - maxHistoryLength);
        }
        return newHistory;
      });
    }
  }, [containerStats]);

  // Handle manual refresh
  const handleRefresh = () => {
    refetchStats();
  };

  // Calculate CPU usage percentage
  const calculateCpuPercentage = (currentStats) => {
    if (!currentStats || !currentStats.cpu_stats || !currentStats.precpu_stats) {
      return 'N/A';
    }

    const cpuDelta = currentStats.cpu_stats.cpu_usage.total_usage - 
                    currentStats.precpu_stats.cpu_usage.total_usage;
    
    const systemDelta = currentStats.cpu_stats.system_cpu_usage - 
                       currentStats.precpu_stats.system_cpu_usage;
    
    const cpuCount = currentStats.cpu_stats.online_cpus || 
                    (currentStats.cpu_stats.cpu_usage.percpu_usage ? 
                     currentStats.cpu_stats.cpu_usage.percpu_usage.length : 1);
    
    if (systemDelta > 0 && cpuDelta > 0) {
      return ((cpuDelta / systemDelta) * cpuCount * 100).toFixed(2);
    }
    
    return '0.00';
  };

  // Format bytes to human readable format
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

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
          Stats: {containerDetails?.name || containerId}
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
              <option value={1000}>1s</option>
              <option value={2000}>2s</option>
              <option value={5000}>5s</option>
              <option value={10000}>10s</option>
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

      {isLoadingStats && !containerStats ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      ) : statsError ? (
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="text-red-500 p-4">Error loading stats: {statsError.message}</div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CPU Usage Card */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-blue-700 text-lg font-medium mb-1">CPU Usage</h3>
                  <div className="text-3xl font-bold text-blue-800">
                    {containerStats ? `${calculateCpuPercentage(containerStats)}%` : 'N/A'}
                  </div>
                </div>
                <div className="bg-blue-200 p-2 rounded-full">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-sm text-blue-700">
                {containerStats?.cpu_stats && (
                  <>
                    <div className="flex justify-between">
                      <span>Total Usage:</span>
                      <span>{containerStats.cpu_stats.cpu_usage.total_usage.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cores:</span>
                      <span>{containerStats.cpu_stats.online_cpus || 'N/A'}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Memory Usage Card */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-green-700 text-lg font-medium mb-1">Memory Usage</h3>
                  <div className="text-3xl font-bold text-green-800">
                    {containerStats?.memory_stats
                      ? formatBytes(containerStats.memory_stats.usage)
                      : 'N/A'}
                  </div>
                </div>
                <div className="bg-green-200 p-2 rounded-full">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-sm text-green-700">
                {containerStats?.memory_stats && (
                  <>
                    <div className="flex justify-between">
                      <span>Usage / Limit:</span>
                      <span>
                        {((containerStats.memory_stats.usage / containerStats.memory_stats.limit) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Limit:</span>
                      <span>{formatBytes(containerStats.memory_stats.limit)}</span>
                    </div>
                    {containerStats.memory_stats.stats && (
                      <div className="flex justify-between">
                        <span>Cache:</span>
                        <span>{formatBytes(containerStats.memory_stats.stats.cache || 0)}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Network I/O Card */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-purple-700 text-lg font-medium mb-1">Network I/O</h3>
                  <div className="text-xl font-bold text-purple-800">
                    {containerStats?.networks ? 'Active' : 'N/A'}
                  </div>
                </div>
                <div className="bg-purple-200 p-2 rounded-full">
                  <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-4 space-y-3 text-sm">
                {containerStats?.networks && Object.entries(containerStats.networks).map(([iface, data]) => (
                  <div key={iface} className="bg-white bg-opacity-50 p-2 rounded">
                    <div className="font-medium text-purple-700 mb-1">{iface}</div>
                    <div className="grid grid-cols-2 gap-2 text-purple-700">
                      <div>
                        <div className="text-xs opacity-75">RX (Down)</div>
                        <div>{formatBytes(data.rx_bytes)}</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-75">TX (Up)</div>
                        <div>{formatBytes(data.tx_bytes)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block I/O Card */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-amber-700 text-lg font-medium mb-1">Block I/O</h3>
                  <div className="text-xl font-bold text-amber-800">
                    {containerStats?.blkio_stats ? 'Active' : 'N/A'}
                  </div>
                </div>
                <div className="bg-amber-200 p-2 rounded-full">
                  <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-sm text-amber-700">
                {containerStats?.blkio_stats?.io_service_bytes_recursive && (
                  <div className="bg-white bg-opacity-50 p-2 rounded">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs opacity-75">Read</div>
                        <div>
                          {formatBytes(
                            containerStats.blkio_stats.io_service_bytes_recursive
                              .filter(stat => stat.op === 'Read')
                              .reduce((sum, stat) => sum + stat.value, 0)
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs opacity-75">Write</div>
                        <div>
                          {formatBytes(
                            containerStats.blkio_stats.io_service_bytes_recursive
                              .filter(stat => stat.op === 'Write')
                              .reduce((sum, stat) => sum + stat.value, 0)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* History Chart - Could be implemented with a charting library like Chart.js or Recharts */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Stats History</h3>
            <div className="text-xs text-gray-500 mb-2">
              Showing last {statsHistory.length} data points. Last updated: {new Date().toLocaleTimeString()}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPU %</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mem %</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net RX</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net TX</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statsHistory.map((item, index) => {
                    const cpuPercent = calculateCpuPercentage(item.stats);
                    const memoryUsage = item.stats.memory_stats?.usage || 0;
                    const memoryLimit = item.stats.memory_stats?.limit || 1;
                    const memoryPercent = ((memoryUsage / memoryLimit) * 100).toFixed(2);
                    
                    // Get network stats from first interface if exists
                    const networkStats = item.stats.networks ? Object.values(item.stats.networks)[0] : null;
                    
                    return (
                      <tr key={index} className="text-sm">
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.timestamp.toLocaleTimeString()}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {cpuPercent !== 'N/A' ? `${cpuPercent}%` : 'N/A'}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {formatBytes(memoryUsage)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {memoryPercent}%
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {networkStats ? formatBytes(networkStats.rx_bytes) : 'N/A'}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {networkStats ? formatBytes(networkStats.tx_bytes) : 'N/A'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 