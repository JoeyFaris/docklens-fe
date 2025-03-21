import React, { createContext, useContext, useState, useEffect } from 'react';
import { containerService, imageService } from '../api';

// Create the context
const AppContext = createContext();

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// App Provider component
export const AppProvider = ({ children }) => {
  const [dockerConnected, setDockerConnected] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);
  const [connectionError, setConnectionError] = useState(null);
  
  // Check Docker connection on app start
  useEffect(() => {
    const checkDockerConnection = async () => {
      setIsCheckingConnection(true);
      setConnectionError(null);
      
      try {
        // Try to fetch containers as a connection test
        const response = await containerService.getContainers();
        setDockerConnected(
          response && response.success && Array.isArray(response.data)
        );
      } catch (error) {
        console.error('Docker connection check failed:', error);
        setDockerConnected(false);
        setConnectionError(error.message || 'Failed to connect to Docker');
      } finally {
        setIsCheckingConnection(false);
      }
    };
    
    checkDockerConnection();
  }, []);
  
  // Retry connection
  const retryConnection = async () => {
    await checkDockerConnection();
  };
  
  // Get aggregated app state
  const getAppState = async () => {
    if (!dockerConnected) return null;
    
    try {
      const [containersResponse, imagesResponse] = await Promise.all([
        containerService.getContainers(),
        imageService.getLocalImages()
      ]);
      
      return {
        containers: containersResponse?.data || [],
        images: imagesResponse?.data || [],
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Error fetching app state:', error);
      return null;
    }
  };
  
  // Values to provide in the context
  const value = {
    dockerConnected,
    isCheckingConnection,
    connectionError,
    retryConnection,
    getAppState
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 