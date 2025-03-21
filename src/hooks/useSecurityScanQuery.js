import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { securityService } from '../api';

export default function useSecurityScanQuery(options = {}) {
  const { 
    pollingInterval = 5000, 
    onScanComplete,
    onScanError 
  } = options;
  
  const [scanId, setScanId] = useState(null);
  const [imageId, setImageId] = useState(null);
  const queryClient = useQueryClient();

  // Mutation for starting a security scan
  const startScanMutation = useMutation({
    mutationFn: (imageToScan) => {
      setImageId(imageToScan);
      return securityService.startSecurityScan(imageToScan);
    },
    onSuccess: (data) => {
      setScanId(data.scanId);
      // Invalidate the scan status query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['securityScanStatus', data.scanId] });
    },
    onError: (error) => {
      if (onScanError) {
        onScanError(error);
      }
    }
  });

  // Query for checking scan status
  const scanStatusQuery = useQuery({
    queryKey: ['securityScanStatus', scanId],
    queryFn: () => securityService.checkSecurityScanStatus(scanId),
    enabled: !!scanId, // Only run when scanId is available
    refetchInterval: (data) => {
      // Stop polling when scan is completed or failed
      if (data?.status === 'completed' || data?.status === 'failed') {
        if (data?.status === 'completed' && onScanComplete) {
          onScanComplete(data);
        } else if (data?.status === 'failed' && onScanError) {
          onScanError(new Error(data.warnings || 'Scan failed'));
        }
        return false;
      }
      return pollingInterval;
    },
    refetchIntervalInBackground: true,
    staleTime: Infinity, // Consider the data fresh indefinitely until invalidated
  });

  // Function to start a new scan
  const startScan = useCallback((imageToScan) => {
    // Reset state
    setScanId(null);
    setImageId(null);
    // Start new scan
    return startScanMutation.mutate(imageToScan);
  }, [startScanMutation]);

  // Function to stop the current scan polling
  const stopPolling = useCallback(() => {
    if (scanId) {
      queryClient.cancelQueries({ queryKey: ['securityScanStatus', scanId] });
    }
  }, [queryClient, scanId]);

  // Reset the scan state
  const resetScan = useCallback(() => {
    stopPolling();
    setScanId(null);
    setImageId(null);
  }, [stopPolling]);

  return {
    // State
    scanId,
    imageId,
    scanData: scanStatusQuery.data,
    isStarting: startScanMutation.isPending,
    isScanning: scanStatusQuery.isFetching && scanStatusQuery.data?.status === 'running',
    isCompleted: scanStatusQuery.data?.status === 'completed',
    isFailed: scanStatusQuery.data?.status === 'failed' || startScanMutation.isError,
    error: startScanMutation.error || (scanStatusQuery.data?.status === 'failed' ? new Error(scanStatusQuery.data.warnings || 'Scan failed') : null),
    progress: scanStatusQuery.data?.progress || '0%',
    // Actions
    startScan,
    stopPolling,
    resetScan,
  };
} 