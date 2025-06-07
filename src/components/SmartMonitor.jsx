import React, { useEffect, useState } from 'react';

const Smartmonitor = ({ contractAddress }) => {
  const [status, setStatus] = useState('Checking...');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const simulateCheck = setTimeout(() => {
      setStatus('All systems operational');
      setLastUpdated(new Date().toLocaleString());
    }, 2000);

    return () => clearTimeout(simulateCheck);
  }, [contractAddress]);

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-md max-w-xl mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Smart Monitor</h2>
        <p className="text-sm text-zinc-400">Live contract watch status</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-zinc-300 font-medium">Contract Address:</span>
          <span className="text-sky-400 font-mono text-sm break-all">{contractAddress}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-300 font-medium">Status:</span>
          <span className={`font-bold ${status === 'All systems operational' ? 'text-green-400' : 'text-yellow-400'}`}>
            {status}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-300 font-medium">Last Updated:</span>
          <span className="text-sm text-sky-300">{lastUpdated || 'Loading...'}</span>
        </div>
      </div>
    </div>
  );
};

export default Smartmonitor;
