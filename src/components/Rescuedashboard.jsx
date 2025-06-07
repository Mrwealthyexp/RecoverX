// src/components/Rescuedashboard.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';

// Replace with your actual deployed contract address
const recoveryAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";

const abiRecovery = [
  "function recoverTokens(address token)"
];

const Rescuedashboard = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [status, setStatus] = useState('');

  const handleRecovery = async () => {
    try {
      setStatus('Connecting to wallet...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(recoveryAddress, abiRecovery, signer);

      setStatus('Sending recovery transaction...');
      const tx = await contract.recoverTokens(tokenAddress);
      await tx.wait();
      setStatus('✅ Tokens successfully recovered!');
    } catch (error) {
      console.error(error);
      setStatus(`❌ Recovery failed: ${error.message}`);
    }
  };

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Token Recovery</h2>
      <input
        type="text"
        placeholder="Enter token contract address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
        className="input-field"
      />
      <button onClick={handleRecovery} className="btn-primary">
        Recover Tokens
      </button>
      {status && <p className="status-text">{status}</p>}
    </div>
  );
};

export default Rescuedashboard;
