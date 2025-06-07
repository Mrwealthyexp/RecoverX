import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CONTRACT_ABI from '../abis/ReclaimX.json'; // Adjust path as needed

const Rescuedashboard = ({ contractAddress }) => {
  const [rescuedTokens, setRescuedTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRescuedTokens = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use window.ethereum from MetaMask or inject provider from Wagmi/RainbowKit
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);

        const tokens = await contract.getRescuedTokens(); // Adjust function name if needed
        const formatted = tokens.map((token, index) => ({
          id: index,
          token: token.symbol,
          amount: ethers.utils.formatUnits(token.amount, token.decimals || 18),
          time: new Date(Number(token.timestamp) * 1000).toLocaleString()
        }));

        setRescuedTokens(formatted);
      } catch (err) {
        console.error('Failed to load rescued tokens:', err);
        setError('Unable to load token data.');
      } finally {
        setLoading(false);
      }
    };

    if (window.ethereum && contractAddress) {
      fetchRescuedTokens();
    }
  }, [contractAddress]);

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto mt-8">
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Rescue Dashboard</h2>
        <p className="text-sm text-zinc-400">Smart contract monitoring</p>
        <p className="text-sm text-sky-400 mt-1 font-mono truncate">{contractAddress}</p>
      </div>

      {loading ? (
        <div className="text-yellow-400 animate-pulse">Loading rescued tokens...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : rescuedTokens.length === 0 ? (
        <div className="text-zinc-400">No tokens rescued yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full mt-4 table-auto border-collapse">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-4 py-2 border-b border-zinc-700">Token</th>
                <th className="px-4 py-2 border-b border-zinc-700">Amount</th>
                <th className="px-4 py-2 border-b border-zinc-700">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {rescuedTokens.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800">
                  <td className="px-4 py-2 border-b border-zinc-800">{item.token}</td>
                  <td className="px-4 py-2 border-b border-zinc-800">{item.amount}</td>
                  <td className="px-4 py-2 border-b border-zinc-800">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Rescuedashboard;
