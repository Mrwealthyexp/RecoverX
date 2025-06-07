import React, { useState } from 'react';
import { ethers } from 'ethers';

const routerAddress = 'YOUR_ROUTER_CONTRACT_ADDRESS';
const abiRouter = [
  'function setFallbackAddress(address _fallbackAddress)',
  'function safeTransfer(address token, address to, uint256 amount)'
];

const RouterDashboard = () => {
  const [fallback, setFallback] = useState('');
  const [token, setToken] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  async function setFallbackHandler() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(routerAddress, abiRouter, signer);
    await contract.setFallbackAddress(fallback);
    alert('Fallback address set!');
  }

  async function safeTransferHandler() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(routerAddress, abiRouter, signer);
    await contract.safeTransfer(token, recipient, ethers.parseUnits(amount));
    alert('Safe transfer executed!');
  }

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Router Dashboard</h2>

      <div className="mb-4">
        <label className="block mb-1">Fallback Address:</label>
        <input className="w-full p-2 rounded text-black" value={fallback} onChange={e => setFallback(e.target.value)} />
        <button onClick={setFallbackHandler} className="mt-2 bg-blue-600 px-4 py-2 rounded">Set</button>
      </div>

      <div>
        <label className="block mb-1">Token Address:</label>
        <input className="w-full p-2 rounded text-black" value={token} onChange={e => setToken(e.target.value)} />
        <label className="block mb-1 mt-2">Recipient Address:</label>
        <input className="w-full p-2 rounded text-black" value={recipient} onChange={e => setRecipient(e.target.value)} />
        <label className="block mb-1 mt-2">Amount:</label>
        <input className="w-full p-2 rounded text-black" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={safeTransferHandler} className="mt-2 bg-green-600 px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
};

export default RouterDashboard;
