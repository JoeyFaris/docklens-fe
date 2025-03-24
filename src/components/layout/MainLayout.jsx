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
const MainLayout = () => {
  const { dockerConnected } = useAppContext();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="min-w-0 h-full p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/containers" element={<Containers />} />
            <Route path="/containers/:id" element={<ContainerDetails />} />
            <Route path="/containers/:id/stats" element={<ContainerStats />} />
            <Route path="/images" element={<Images />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/security-scan" element={<SecurityScan />} />
            <Route path="/premium" element={<Premium />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default MainLayout; 