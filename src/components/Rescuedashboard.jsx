// Phase 4: Smart Rescue Dashboard // File: src/components/Rescuedashboard.jsx

import React, { useState } from 'react'; import { ethers } from 'ethers';

const rescueABI = [ 'function recoverTokens(address token)' // Add any additional functions later ];

export default function Rescuedashboard() { const [tokenAddress, setTokenAddress] = useState(''); const [status, setStatus] = useState('');

const contractAddress = '0xFILL_YOUR_RECOVERY_CONTRACT_ADDRESS'; // Replace this with actual address

const handleRecovery = async () => { try { setStatus('Connecting to wallet...'); const provider = new ethers.BrowserProvider(window.ethereum); const signer = await provider.getSigner(); const contract = new ethers.Contract(contractAddress, rescueABI, signer);

const tx = await contract.recoverTokens(tokenAddress);
  setStatus('Transaction sent. Waiting for confirmation...');
  await tx.wait();
  setStatus('✅ Tokens successfully recovered!');
} catch (err) {
  console.error(err);
  setStatus('❌ Error during recovery. See console for details.');
}

};

return ( <div className="border-t border-gray-700 pt-6 mt-8"> <h2 className="text-xl font-semibold mb-4">🛡️ Rescue Dashboard</h2> <input type="text" placeholder="Token Contract Address" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full p-2 bg-gray-900 border border-gray-600 rounded mb-3" /> <button
onClick={handleRecovery}
className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
> Recover Tokens </button> {status && <p className="mt-3 text-sm text-yellow-300">{status}</p>} </div> ); }



