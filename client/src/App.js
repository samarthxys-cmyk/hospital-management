import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Patient from './pages/Patient';
import Appoiment from './pages/Appoiment'; 
import Inventory from './pages/Inventory';
import Billing from './pages/Billing';
import Staff from './pages/Staff';
import Doctors from './pages/Doctors';
import Login from './pages/Login';

import './App.css';

function App() {
  // 1. New state to track login status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <Patient />;
      case 'appointments':
        return <Appoiment />;
      case 'inventory':
        return <Inventory />;
      case 'billing':
        return <Billing />;
      case 'staff':
        return <Staff />;
      case 'doctors':
        return <Doctors />;
      default:
        return (
          <div className="coming-soon">
            <h2>{activePage.toUpperCase()} Module</h2>
            <p>This section is under development.</p>
          </div>
        );
    }
  };

  // 2. Conditional Rendering: If not logged in, show only the Login page
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // 3. Authenticated layout helpers
  const handleLogout = () => {
    setIsAuthenticated(false);
    setActivePage('dashboard');
    setIsSidebarOpen(false);
  };

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    setIsSidebarOpen(false);
  };

  // 3. If logged in, show the full Dashboard
  return (
    <div className="app-shell">
      <Navbar
        onLogout={handleLogout}
        onMenuToggle={() => setIsSidebarOpen((open) => !open)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="main-wrapper">
        <button
          type="button"
          className={`sidebar-backdrop ${isSidebarOpen ? 'is-visible' : ''}`}
          aria-label="Close navigation menu"
          onClick={() => setIsSidebarOpen(false)}
        />
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onClose={() => setIsSidebarOpen(false)}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="content-area">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
