import React from 'react';
import RouterDashboard from './components/RouterDashboard';
import SmartMonitor from './components/SmartMonitor';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">ReclaimX Control Panel</h1>
      <RouterDashboard />
      <SmartMonitor />
    </div>
  );
}
