import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const routerAddress = 'YOUR_ROUTER_CONTRACT_ADDRESS';
const tokenAbi = ['function balanceOf(address) view returns (uint256)'];
const abiRouter = ['function fallbackAddress() view returns (address)'];

const SmartMonitor = () => {
  const [balance, setBalance] = useState('');
  const [fallbackAddr, setFallbackAddr] = useState('');
  const tokenAddress = 'YOUR_TOKEN_ADDRESS';

  useEffect(() => {
    const loadInfo = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const token = new ethers.Contract(tokenAddress, tokenAbi, provider);
      const bal = await token.balanceOf(userAddress);
      setBalance(ethers.formatUnits(bal));

      const router = new ethers.Contract(routerAddress, abiRouter, provider);
      const fallback = await router.fallbackAddress();
      setFallbackAddr(fallback);
    };
    loadInfo();
  }, []);

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-xl mt-6">
      <h2 className="text-xl font-bold mb-4">Smart Monitor</h2>
      <p><strong>Token Balance:</strong> {balance}</p>
      <p><strong>Fallback Address:</strong> {fallbackAddr}</p>
    </div>
  );
};

export default SmartMonitor;
