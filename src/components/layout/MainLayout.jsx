import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../';
import { useAppContext } from '../../context/AppContext';

// Import pages
import Dashboard from '../../pages/Dashboard';
import Containers from '../../pages/Containers';
import ContainerDetails from '../../pages/ContainerDetails';
import ContainerStats from '../../pages/ContainerStats';
import Images from '../../pages/Images';
import Settings from '../../pages/Settings';
import SecurityScan from '../../pages/SecurityScan';
import Premium from '../../pages/Premium';

/**
 * Main layout for the application
 * Contains the sidebar and main content area
 */
export default function MainLayout() {
  const { dockerConnected, isCheckingConnection, connectionError } = useAppContext();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto w-full">
        <div className="w-full h-full px-8 py-6">
          {isCheckingConnection ? (
            <div className="bg-white rounded-2xl shadow-soft p-6 min-h-[calc(100vh-3rem)] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin h-12 w-12 mb-4 mx-auto">
                  <svg className="h-full w-full text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-700">Connecting to Docker...</h2>
                <p className="text-gray-500 mt-2">Please wait while we establish a connection.</p>
              </div>
            </div>
          ) : !dockerConnected ? (
            <div className="bg-white rounded-2xl shadow-soft p-6 min-h-[calc(100vh-3rem)] flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="bg-red-100 rounded-full p-3 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                  <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-700">Docker Connection Error</h2>
                <p className="text-gray-500 mt-2">{connectionError || 'Unable to connect to Docker. Please ensure Docker is running and try again.'}</p>
                <button 
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => window.location.reload()}
                >
                  Retry Connection
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-soft p-6 min-h-[calc(100vh-3rem)] animate-fadeIn w-full">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/containers" element={<Containers />} />
                <Route path="/container-details/:containerId" element={<ContainerDetails />} />
                <Route path="/container-stats/:containerId" element={<ContainerStats />} />
                <Route path="/images" element={<Images />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/security-scan/:imageId" element={<SecurityScan />} />
                <Route path="/security-scan/status/:scanId" element={<SecurityScan />} />
              </Routes>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 