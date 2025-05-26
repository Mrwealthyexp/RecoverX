import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['wagmi', 'viem', '@rainbow-me/rainbowkit', 'ethers']
  }
});
