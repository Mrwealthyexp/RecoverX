import React, { useState } from 'react';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, ConnectButton, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import '@rainbow-me/rainbowkit/styles.css';

// === CONTRACT ADDRESSES ===
// 🔁 Router Contract Address
const routerAddress = '"0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";
// 🛡 Recovery Contract Address
const recoveryAddress = '"0xf8e81D47203A594245E36C48e151709F0C19fBe8";

// === ABIs ===
const abiRouter = [
  'function setFallbackAddress(address _fallbackAddress)',
  'function safeTransfer(address token, address to, uint256 amount)'
];

const abiRecovery = [
  'function recoverTokens(address token)'
];

// === Wagmi & RainbowKit Setup ===
const { chains, provider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RecoverX',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// === Main DApp ===
export default function App() {
  const [fallback, setFallback] = useState('');
  const [token, setToken] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [recoveryToken, setRecoveryToken] = useState('');

  // Handler: Set Fallback Address
  async function setFallbackHandler() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(routerAddress, abiRouter, signer);
    await contract.setFallbackAddress(fallback);
    alert('✅ Fallback address set!');
  }

  // Handler: Safe Transfer
  async function safeTransferHandler() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(routerAddress, abiRouter, signer);
    await contract.safeTransfer(token, recipient, ethers.parseUnits(amount));
    alert('✅ Safe transfer executed!');
  }

  // Handler: Recover Tokens
  async function recoverHandler() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(recoveryAddress, abiRecovery, signer);
    await contract.recoverTokens(recoveryToken);
    alert('✅ Recovery attempted!');
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <main style={{ padding: '2rem' }}>
          <h1>RecoverX</h1>
          <ConnectButton />

          <section>
            <h2>🔁 Set Fallback Address</h2>
            <input placeholder="0xFallback" value={fallback} onChange={e => setFallback(e.target.value)} />
            <button onClick={setFallbackHandler}>Set Fallback</button>
          </section>

          <section>
            <h2>💸 Safe Transfer</h2>
            <input placeholder="Token Address" value={token} onChange={e => setToken(e.target.value)} />
            <input placeholder="Recipient Address" value={recipient} onChange={e => setRecipient(e.target.value)} />
            <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            <button onClick={safeTransferHandler}>Transfer</button>
          </section>

          <section>
            <h2>🛡 Recover Tokens</h2>
            <input placeholder="Token Address" value={recoveryToken} onChange={e => setRecoveryToken(e.target.value)} />
            <button onClick={recoverHandler}>Recover</button>
          </section>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
