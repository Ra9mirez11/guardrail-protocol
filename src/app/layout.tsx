import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GuardRail Protocol | Zero-Trust Solana & Token-2022 Security Engine',
  description: 'Military-grade pre-execution honeypot, transfer-hook, and predatory fee analysis on Solana.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cyber-dark bg-cyber-grid selection:bg-cyber-neon selection:text-black">
        {children}
      </body>
    </html>
  );
}
