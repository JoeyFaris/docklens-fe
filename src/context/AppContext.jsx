import React, { createContext, useContext, useState, useEffect } from 'react';

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

// Mock data for development
const mockData = {
  containers: [
    {
      id: '1',
      name: 'web-app',
      status: 'running',
      image: 'nginx:latest',
      ports: ['80:80'],
      created: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'database',
      status: 'running',
      image: 'postgres:13',
      ports: ['5432:5432'],
      created: new Date().toISOString(),
    }
  ],
  images: [
    {
      id: 'nginx:latest',
      size: '133MB',
      created: new Date().toISOString(),
    },
    {
      id: 'postgres:13',
      size: '376MB',
      created: new Date().toISOString(),
    }
  ]
};

// App Provider component
export const AppProvider = ({ children }) => {
  const [dockerConnected, setDockerConnected] = useState(true);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  
  // Get aggregated app state
  const getAppState = async () => {
    return {
      containers: mockData.containers,
      images: mockData.images,
      lastUpdated: new Date()
    };
  };
  
  // Values to provide in the context
  const value = {
    dockerConnected,
    isCheckingConnection,
    connectionError,
    getAppState
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 