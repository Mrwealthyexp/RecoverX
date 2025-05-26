# ReclaimX

**Mistakes are no longer final.**  
ReclaimX is a decentralized Web3 solution designed to prevent the permanent loss of digital assets caused by failed or misdirected ERC-20 token transfers. It introduces a smart fallback system and a recovery mechanism that empowers users to reclaim control over their funds, even in the event of accidental mistakes.

---

## Overview

Every year, millions in cryptocurrency are lost due to sending tokens to contracts or wallets that do not support them. ReclaimX eliminates this problem through:

- A **Router Contract** that performs `safeTransfer()` with a fallback address.
- A **Recovery Contract** that enables token holders to reclaim stuck tokens from contract wallets, applying a customizable fee.

The goal: give users and platforms a way to eliminate "lost forever" as a result of user error.

---

## Features

- **Set Fallback Address**  
  Attach a secondary address to ERC-20 token transfers to automatically reroute failed transactions.

- **Safe Token Transfer**  
  Send tokens with confidence using the ReclaimX Router — success or fallback execution guaranteed.

- **Token Recovery**  
  Use the ReclaimX Recovery Contract to reclaim previously locked or stuck tokens from the contract’s balance.

- **Fee Customization**  
  Admins can configure the percentage of tokens deducted as a recovery fee (default: 10%).

- **Fully Decentralized**  
  Built using Solidity, deployed on the Polygon Mumbai testnet, and available for multi-chain compatibility.

---

## Technologies Used

- **Frontend:** React + Vite + RainbowKit + Wagmi + Ethers.js  
- **Contracts:** Solidity  
- **Deployment:** Remix, StackBlitz, Vercel  
- **Wallets Supported:** MetaMask, Rainbow, Coinbase, WalletConnect

---

## Smart Contracts

- [`ReclaimXRouter.sol`](https://mumbai.polygonscan.com)  
  Handles `safeTransfer()` and `setFallbackAddress()`

- [`ReclaimXRecovery.sol`](https://mumbai.polygonscan.com)  
  Handles recovery of stuck tokens with optional recovery fee

---

## How It Works

1. **Install and Connect Wallet** via RainbowKit  
2. **Set a Fallback Address** using your wallet  
3. **Send a Token Transfer** through the ReclaimX Router  
4. **If it fails, fallback kicks in automatically**  
5. **Lost tokens from earlier transactions?** Use the recovery tab

---

## Live Demo

Visit: [https://reclaimx.vercel.app](https://reclaimx.vercel.app)  
Tested on Polygon Mumbai — Mainnet version coming soon.

---

## Roadmap

- [x] Testnet Launch  
- [x] Manual Recovery Fee Adjustment  
- [ ] NFT Access Control for Premium Recovery  
- [ ] Multi-chain Integration (Base, BNB, Ethereum)  
- [ ] Launch DAO Vote to manage protocol upgrades

---

## License

MIT — Open-source. Fork, build, improve.

---

## Author

**Carlos Walker**  
Founder, Wealthy Express  
Web3 Innovator & Probl
