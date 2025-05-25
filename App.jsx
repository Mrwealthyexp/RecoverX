import React, { useState } from 'react';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { polygonMumbai } from 'wagmi/chains';
import { ConnectButton, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import '@rainbow-me/rainbowkit/styles.css';

const routerAddress = 'YOUR_ROUTER_CONTRACT_ADDRESS';
const recoveryAddress = 'YOUR_RECOVERY_CONTRACT_ADDRESS';

const abiRouter = [
  'function setFallbackAddress(address _fallbackAddress)',
  'function safeTransfer(address token, address to, uint256 amount)'
];

const abiRecovery = [
  'function recoverTokens(address token)'
];

const { chains, provider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({ appName: 'ReclaimX', chains });
const wagmiClient = createClient({ autoConnect: true, connectors, provider });

export default function App() {
  const [fallback, setFallback] = useState('');
  const [token, setToken] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [recoveryToken, setRecoveryToken] = useState('');

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

  async function recoverHandler() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(recoveryAddress, abiRecovery, signer);
    await contract.recoverTokens(recoveryToken);
    alert('Recovery attempted!');
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <main style={{ padding: '20px', fontFamily: 'Arial' }}>
          <h1>ReclaimX DApp</h1>
          <ConnectButton />

          <h2>Set Fallback Address</h2>
          <input placeholder='0xFallback' value={fallback} onChange={e => setFallback(e.target.value)} />
          <button onClick={setFallbackHandler}>Set</button>

          <h2>Safe Transfer</h2>
          <input placeholder='Token Address' value={token} onChange={e => setToken(e.target.value)} />
          <input placeholder='Recipient Address' value={recipient} onChange={e => setRecipient(e.target.value)} />
          <input placeholder='Amount' value={amount} onChange={e => setAmount(e.target.value)} />
          <button onClick={safeTransferHandler}>Send</button>

          <h2>Recover Tokens</h2>
          <input placeholder='Token Address' value={recoveryToken} onChange={e => setRecoveryToken(e.target.value)} />
          <button onClick={recoverHandler}>Recover</button>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
