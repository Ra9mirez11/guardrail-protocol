'use client';

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
  TrustWalletAdapter,
  BitgetWalletAdapter,
  LedgerWalletAdapter,
  TrezorWalletAdapter,
  SafePalWalletAdapter,
  TokenPocketWalletAdapter,
  Coin98WalletAdapter,
  MathWalletAdapter,
  NightlyWalletAdapter,
  NufiWalletAdapter,
  XDEFIWalletAdapter,
  TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';

export function SolanaWalletProvider({ children }: { children: any }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new TrustWalletAdapter(),
      new BitgetWalletAdapter(),
      new LedgerWalletAdapter(),
      new TrezorWalletAdapter(),
      new SafePalWalletAdapter(),
      new TokenPocketWalletAdapter(),
      new Coin98WalletAdapter(),
      new MathWalletAdapter(),
      new NightlyWalletAdapter(),
      new NufiWalletAdapter(),
      new XDEFIWalletAdapter(),
      new TorusWalletAdapter()
    ],
    []
  );

  const ConnProv: any = ConnectionProvider;
  const WallProv: any = WalletProvider;
  const ModalProv: any = WalletModalProvider;

  return (
    <ConnProv endpoint={endpoint}>
      <WallProv wallets={wallets} autoConnect>
        <ModalProv>{children}</ModalProv>
      </WallProv>
    </ConnProv>
  );
}