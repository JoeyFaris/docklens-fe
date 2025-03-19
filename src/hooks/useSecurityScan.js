import { useState, useCallback, useEffect } from 'react';
import { dockerApi } from '../api/dockerApi';

export default function useSecurityScan() {
  const [scanId, setScanId] = useState(null);
  const [scanStatus, setScanStatus] = useState('idle'); // idle, starting, scanning, completed, failed
  const [scanData, setScanData] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState('0%');
  const [pollingInterval, setPollingInterval] = useState(5000); // Default 5 seconds
  const [isPolling, setIsPolling] = useState(false);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Cancel any pending timeouts or intervals
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  let timeoutId = null;

  const startScan = useCallback(async (imageId) => {
    if (!imageId) {
      setError('Image ID is required');
      return;
    }

    try {
      // Reset states
      setScanStatus('starting');
      setScanData(null);
      setError(null);
      setProgress('0%');
      
      const result = await dockerApi.startSecurityScan(imageId);
      
      setScanId(result.scanId);
      setScanStatus('scanning');
      
      // Start polling for scan status
      pollScanStatus(result.scanId);
      
      return result;
    } catch (err) {
      setError(err.message || 'Failed to start security scan');
      setScanStatus('failed');
      throw err;
    }
  }, []);

  const pollScanStatus = useCallback(async (scanId) => {
    if (!scanId) return;
    
    setIsPolling(true);
    
    try {
      const statusData = await dockerApi.checkSecurityScanStatus(scanId);
      
      // Update progress if available
      if (statusData.progress) {
        setProgress(statusData.progress);
      }
      
      if (statusData.status === 'completed') {
        setScanData(statusData);
        setScanStatus('completed');
        setIsPolling(false);
      } else if (statusData.status === 'failed') {
        setError(statusData.warnings || 'Scan failed. Please try again.');
        setScanStatus('failed');
        setIsPolling(false);
      } else {
        // Continue polling if still running
        timeoutId = setTimeout(() => {
          pollScanStatus(scanId);
        }, pollingInterval);
      }
    } catch (err) {
      setError(err.message || 'Error checking scan status');
      setScanStatus('failed');
      setIsPolling(false);
    }
  }, [pollingInterval]);

  const stopPolling = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    setIsPolling(false);
  }, []);

  const resetScan = useCallback(() => {
    stopPolling();
    setScanId(null);
    setScanStatus('idle');
    setScanData(null);
    setError(null);
    setProgress('0%');
  }, [stopPolling]);

  const setCustomPollingInterval = useCallback((interval) => {
    if (interval && interval > 1000) {
      setPollingInterval(interval);
    }
  }, []);

  return {
    scanId,
    scanStatus,
    scanData,
    error,
    progress,
    isPolling,
    startScan,
    pollScanStatus,
    stopPolling,
    resetScan,
    setPollingInterval: setCustomPollingInterval,
  };
} 