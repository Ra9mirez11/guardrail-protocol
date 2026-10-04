import type { Metadata } from 'next';
import './globals.css';
import { SolanaWalletProvider } from '@/components/SolanaWalletProvider';

export const metadata: Metadata = {
  title: 'GuardRail | Zero-Trust Solana & Token-2022 Security Engine',
  description: 'Military-grade pre-execution honeypot, transfer-hook, and predatory fee analysis on Solana.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#050608] text-[#f3f5f8] aurora-bg antialiased selection:bg-[#00ffa3] selection:text-black">
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  );
}