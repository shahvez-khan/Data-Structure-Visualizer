
// Fix: Implement the App component to provide application routing.
import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VisualizerPage from './pages/VisualizerPage';

const App: React.FC = () => {
  return (
    <div className="bg-brand-primary min-h-screen text-brand-text font-sans">
       <nav className="bg-brand-secondary/20 border-b border-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-brand-accent">
                AlgoVisual
              </Link>
            </div>
            <div className="flex items-center space-x-4">
               <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'bg-brand-accent text-white' : 'text-brand-text-secondary hover:bg-brand-secondary/50'
                    }`
                  }
                >
                  Home
                </NavLink>
               <NavLink 
                  to="/visualizer"
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'bg-brand-accent text-white' : 'text-brand-text-secondary hover:bg-brand-secondary/50'
                    }`
                  }
                >
                  Visualizer
                </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/visualizer" element={<VisualizerPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
