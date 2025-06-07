import React, { useState } from 'react';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, ConnectButton, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import '@rainbow-me/rainbowkit/styles.css';
import './index.css';

// === CONTRACT ADDRESSES ===
const routerAddress = "0xD7ACd2a9FD159E69bB102A1ca21C9a3e3A5F771B";
const recoveryAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";

// === ABIs ===
const abiRouter = [
  "function setFallbackAddress(address _fallbackAddress)",
  "function safeTransfer(address token, address to, uint256 amount)"
];

const abiRecovery = [
  "function recoverTokens(address token)"
];

// === wagmi & RainbowKit Setup ===
const { chains, provider } = configureChains([polygonMumbai], [publicProvider()]);
const { connectors } = getDefaultWallets({ appName: "ReclaimX", chains });
const wagmiClient = createClient({ autoConnect: true, connectors, provider });

export default function App() {
  const [fallback, setFallback] = useState('');
  const [token, setToken] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [recoveryToken, setRecoveryToken] = useState('');

  // === Functions ===
  async function setFallbackHandler() {
    const signer = await new ethers.BrowserProvider(window.ethereum).getSigner();
    const contract = new ethers.Contract(routerAddress, abiRouter, signer);
    await contract.setFallbackAddress(fallback);
    alert("✅ Fallback Address Set");
  }

  async function safeTransferHandler() {
    const signer = await new ethers.BrowserProvider(window.ethereum).getSigner();
    const contract = new ethers.Contract(routerAddress, abiRouter, signer);
    await contract.safeTransfer(token, recipient, ethers.parseUnits(amount));
    alert("✅ Safe Transfer Complete");
  }

  async function recoverHandler() {
    const signer = await new ethers.BrowserProvider(window.ethereum).getSigner();
    const contract = new ethers.Contract(recoveryAddress, abiRecovery, signer);
    await contract.recoverTokens(recoveryToken);
    alert("✅ Recovery Triggered");
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <main className="container">
          <h1>ReclaimX Recovery Suite</h1>
          <ConnectButton />

          <section>
            <h2>🛡 Set Fallback Address</h2>
            <input
              placeholder="Enter Fallback Address"
              value={fallback}
              onChange={e => setFallback(e.target.value)}
            />
            <button onClick={setFallbackHandler}>Set Fallback</button>
          </section>

          <section>
            <h2>💸 Safe Transfer</h2>
            <input
              placeholder="Token Address"
              value={token}
              onChange={e => setToken(e.target.value)}
            />
            <input
              placeholder="Recipient Address"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
            />
            <input
              placeholder="Amount (in tokens)"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <button onClick={safeTransferHandler}>Transfer Tokens</button>
          </section>

          <section>
            <h2>🔄 Recover Tokens</h2>
            <input
              placeholder="Token Address to Recover"
              value={recoveryToken}
              onChange={e => setRecoveryToken(e.target.value)}
            />
            <button onClick={recoverHandler}>Recover</button>
          </section>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
