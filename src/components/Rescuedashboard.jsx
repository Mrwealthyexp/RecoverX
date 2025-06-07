// src/components/RescueDashboard.jsx import React, { useState } from 'react'; import { useAccount, useSigner } from 'wagmi'; import { ethers } from 'ethers';

const recoveryAddress = 'YOUR_RECOVERY_CONTRACT_ADDRESS'; const abiRecovery = [ 'function recoverTokens(address token)' // ABI for recovery contract ];

export default function RescueDashboard() { const { isConnected } = useAccount(); const { data: signer } = useSigner();

const [tokenAddress, setTokenAddress] = useState(''); const [status, setStatus] = useState('');

async function recoverTokensHandler() { try { if (!signer) throw new Error('Wallet not connected');

const contract = new ethers.Contract(recoveryAddress, abiRecovery, signer);
  const tx = await contract.recoverTokens(tokenAddress);
  setStatus('Waiting for confirmation...');
  await tx.wait();
  setStatus('✅ Tokens successfully recovered!');
} catch (error) {
  setStatus(`❌ Error: ${error.message}`);
}

}

return ( <div className="bg-gray-900 text-white p-4 rounded shadow-md w-full max-w-xl mx-auto mt-10"> <h2 className="text-xl font-semibold mb-4">🛠 ReclaimX Token Recovery</h2>

<input
    type="text"
    placeholder="Enter token contract address"
    className="w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded"
    value={tokenAddress}
    onChange={(e) => setTokenAddress(e.target.value)}
  />

  <button
    onClick={recoverTokensHandler}
    disabled={!isConnected}
    className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 disabled:opacity-50"
  >
    Recover Tokens
  </button>

  {status && <p className="mt-4 text-sm">{status}</p>}
</div>

); }

