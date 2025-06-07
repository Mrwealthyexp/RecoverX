import React, { useState, useEffect } from 'react';

const Rescuedashboard = ({ contractAddress }) => {
  const [rescuedTokens, setRescuedTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchRescuedTokens = () => {
      setTimeout(() => {
        setRescuedTokens([
          { id: 1, token: 'USDT', amount: 150, time: '2025-06-30 14:45' },
          { id: 2, token: 'ETH', amount: 0.8, time: '2025-06-30 15:12' },
          { id: 3, token: 'MATIC', amount: 300, time: '2025-06-30 15:45' },
        ]);
        setLoading(false);
      }, 1500);
    };

    fetchRescuedTokens();
  }, []);

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto mt-8">
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Rescue Dashboard</h2>
        <p className="text-sm text-zinc-400">Monitoring rescued tokens from smart contract</p>
        <p className="text-sm text-sky-400 mt-1">Contract: <span className="font-mono">{contractAddress}</span></p>
      </div>

      {loading ? (
        <div className="text-yellow-400 animate-pulse">Loading rescued tokens...</div>
      ) : rescuedTokens.length === 0 ? (
        <div className="text-red-400">No tokens have been rescued yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse mt-4">
            <thead>
              <tr className="bg-zinc-800 text-left">
                <th className="px-4 py-2 border-b border-zinc-700">Token</th>
                <th className="px-4 py-2 border-b border-zinc-700">Amount</th>
                <th className="px-4 py-2 border-b border-zinc-700">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {rescuedTokens.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800 transition">
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
