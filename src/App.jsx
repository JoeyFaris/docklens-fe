import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { MainLayout } from './components/layout';
import Landing from './pages/Landing';

/**
 * Main application component
 * Sets up routing and global context
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
