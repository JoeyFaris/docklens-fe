import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Containers from './pages/Containers';
import Images from './pages/Images';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="bg-white rounded-2xl shadow-soft p-6 min-h-[calc(100vh-3rem)] animate-fadeIn">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/containers" element={<Containers />} />
                <Route path="/images" element={<Images />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
