import { useState, useEffect, useCallback } from 'react';
import { containerService } from '../api';

/**
 * Custom hook for fetching and managing Docker containers
 * 
 * @param {Object} options - Hook options
 * @param {boolean} options.autoRefresh - Whether to auto-refresh the containers list periodically
 * @param {number} options.refreshInterval - Refresh interval in milliseconds
 * @returns {Object} Container data and utility functions
 */
export default function useContainers({ 
  autoRefresh = false, 
  refreshInterval = 5000 
} = {}) {
  const [containers, setContainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchContainers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await containerService.getContainers();
      
      if (!response || !response.success || !response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid container data received');
      }
      
      setContainers(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching containers:', err);
      setError(err.message || 'Failed to fetch container data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchContainers();
  }, [fetchContainers]);

  // Auto-refresh if enabled
  useEffect(() => {
    if (!autoRefresh) return;
    
    const intervalId = setInterval(() => {
      fetchContainers();
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [autoRefresh, refreshInterval, fetchContainers]);

  // Container actions
  const startContainer = async (containerId) => {
    try {
      await containerService.startContainer(containerId);
      await fetchContainers(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.message || 'Failed to start container');
      return false;
    }
  };

  const stopContainer = async (containerId) => {
    try {
      await containerService.stopContainer(containerId);
      await fetchContainers(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.message || 'Failed to stop container');
      return false;
    }
  };

  const removeContainer = async (containerId) => {
    try {
      await containerService.removeContainer(containerId);
      await fetchContainers(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.message || 'Failed to remove container');
      return false;
    }
  };

  const restartContainer = async (containerId) => {
    try {
      await containerService.restartContainer(containerId);
      await fetchContainers(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.message || 'Failed to restart container');
      return false;
    }
  };

  return {
    containers,
    isLoading,
    error,
    lastUpdated,
    fetchContainers,
    startContainer,
    stopContainer,
    removeContainer,
    restartContainer,
  };
} 