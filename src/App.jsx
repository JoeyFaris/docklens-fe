import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Containers from './pages/Containers';
import Images from './pages/Images';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import SecurityScan from './pages/SecurityScan';
import Premium from './pages/Premium';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={
          <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Sidebar />
            <main className="flex-1 overflow-auto w-full">
              <div className="w-full h-full px-8 py-6">
                <div className="bg-white rounded-2xl shadow-soft p-6 min-h-[calc(100vh-3rem)] animate-fadeIn w-full">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/containers" element={<Containers />} />
                    <Route path="/images" element={<Images />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/premium" element={<Premium />} />
                    <Route path="/security-scan/:imageId" element={<SecurityScan />} />
                    <Route path="/security-scan/status/:scanId" element={<SecurityScan />} />
                  </Routes>
                </div>
              </div>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
