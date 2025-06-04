import React, { useState } from 'react';
import {
  WagmiConfig,
  createConfig,
  configureChains,
  polygonMumbai
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { ethers } from 'ethers';

const routerAddress = '0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B';
const recoveryAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8';

const abiRouter = [
  'function setFallbackAddress(address _fallbackAddress)',
  'function safeTransfer(address token, address to, uint256 amount)'
];

const abiRecovery = [
  'function recoverTokens(address token)'
];

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'ReclaimX',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App() {
  const [fallback, setFallback] = useState('');
  const [token, setToken] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [recoveryToken, setRecoveryToken] = useState('');

  const setFallbackHandler = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(routerAddress, abiRouter, signer);
    await contract.setFallbackAddress(fallback);
    alert('✅ Fallback address set!');
  };

  const safeTransferHandler = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(routerAddress, abiRouter, signer);
    await contract.safeTransfer(token, recipient, ethers.parseUnits(amount));
    alert('✅ Safe transfer sent!');
  };

  const recoverHandler = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(recoveryAddress, abiRecovery, signer);
    await contract.recoverTokens(recoveryToken);
    alert('✅ Token recovery initiated!');
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
          <h1>🔐 ReclaimX</h1>
          <ConnectButton />

          <section style={{ marginTop: '2rem' }}>
            <h2>Set Fallback Address</h2>
            <input
              placeholder='0xFallback'
              value={fallback}
              onChange={e => setFallback(e.target.value)}
            />
            <button onClick={setFallbackHandler}>Set</button>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h2>Safe Transfer</h2>
            <input
              placeholder='Token Address'
              value={token}
              onChange={e => setToken(e.target.value)}
            />
            <input
              placeholder='Recipient Address'
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
            />
            <input
              placeholder='Amount'
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <button onClick={safeTransferHandler}>Send</button>
          </section>

          <section style={{ marginTop: '2rem' }}>
            <h2>Recover Tokens</h2>
            <input
              placeholder='Token Address'
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
