import React, { useEffect, useState } from 'react';
import './Smartmonitor.css';

const Smartmonitor = ({ contractAddress }) => {
  const [status, setStatus] = useState('Checking...');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Simulate contract monitoring
    const simulateCheck = setTimeout(() => {
      setStatus('All systems operational');
      setLastUpdated(new Date().toLocaleString());
    }, 2000);

    return () => clearTimeout(simulateCheck);
  }, [contractAddress]);

  return (
    <div className="smartmonitor-container">
      <div className="smartmonitor-header">
        <h2>Smart Monitor</h2>
        <p>Live contract watch status</p>
      </div>

      <div className="smartmonitor-body">
        <div className="monitor-row">
          <span className="monitor-label">Contract Address:</span>
          <span className="monitor-value">{contractAddress}</span>
        </div>

        <div className="monitor-row">
          <span className="monitor-label">Status:</span>
          <span className={`monitor-status ${status === 'All systems operational' ? 'ok' : 'pending'}`}>
            {status}
          </span>
        </div>

        <div className="monitor-row">
          <span className="monitor-label">Last Updated:</span>
          <span className="monitor-value">{lastUpdated || 'Loading...'}</span>
        </div>
      </div>
    </div>
  );
};

export default Smartmonitor;

