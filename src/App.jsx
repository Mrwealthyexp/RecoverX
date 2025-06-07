import React from 'react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { polygonMumbai } from 'wagmi/chains';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import RescueDashboard from './components/RescueDashboard';
import '@rainbow-me/rainbowkit/styles.css';
import './index.css';

// --- Wagmi Configuration ---
const { chains, publicClient } = configureChains([polygonMumbai], [publicProvider()]);
const { connectors } = getDefaultWallets({ appName: 'ReclaimX', chains });
const wagmiConfig = createConfig({ autoConnect: true, connectors, publicClient });

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <main className="min-h-screen bg-gray-900 text-white p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">ReclaimX • Token Rescue</h1>
          <RescueDashboard />
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
