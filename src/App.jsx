import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { MainLayout } from './components/layout';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';

/**
 * Main application component
 * Sets up routing and global context
 */
export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
