// src/components/Rescuedashboard.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';

// Replace with your actual contract address
const recoveryAddress = '0xF8e81D47203A594245E36C48e151709F0C19fBe8';

const abiRecovery = [
  'function recoverTokens(address token)'
];

export default function Rescuedashboard() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [status, setStatus] = useState('');

  const recoverHandler = async () => {
    try {
      if (!window.ethereum) {
        return setStatus('❌ MetaMask is not available');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(recoveryAddress, abiRecovery, signer);

      const tx = await contract.recoverTokens(tokenAddress);
      await tx.wait();

      setStatus('✅ Recovery successful!');
    } catch (error) {
      console.error(error);
      setStatus('❌ Error occurred. See console for details.');
    }
  };

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Token Recovery</h2>

      <input
        className="input-field"
        type="text"
        placeholder="Enter Token Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />

      <button className="btn-primary" onClick={recoverHandler}>
        Recover Tokens
      </button>

      <p className="status-text">{status}</p>
    </div>
  );
}
