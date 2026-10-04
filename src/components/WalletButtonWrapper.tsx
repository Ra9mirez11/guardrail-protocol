'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export function WalletButtonWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="bg-emerald-400 text-black font-mono text-xs font-bold rounded-xl h-9 px-4 opacity-75 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
        CONNECT WALLET
      </button>
    );
  }

  return (
    <WalletMultiButtonDynamic className="!bg-emerald-400 !text-black !font-mono !text-xs !font-bold !rounded-xl !h-9 !px-4 hover:!bg-emerald-300 transition-all !shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
  );
}