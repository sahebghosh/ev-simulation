import React from 'react';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-b from-secondary to-primary text-white p-5">
        <header className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">EV Charging Simulation</h1>
        </header>
      </div>
      <Dashboard />
    </div>
  );
};

export default App;
