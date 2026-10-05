'use client';

import React, { useState } from 'react';
import { Share2, ExternalLink, Copy, Check, Send, Terminal } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { SecurityAuditReport } from '@/lib/types';

export function SolanaBlinkCard({ report, onScanMint }: { report?: SecurityAuditReport | null; onScanMint: (mint: string) => void }) {
  const [copiedBlink, setCopiedBlink] = useState(false);
  const [blinkInput, setBlinkInput] = useState('');

  if (!report) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://guardrail-protocol.vercel.app';
  const actionUrl = `${origin}/api/actions/scan?mint=${report.mint}`;

  const handleCopyBlink = () => {
    navigator.clipboard.writeText(actionUrl);
    setCopiedBlink(true);
    setTimeout(() => setCopiedBlink(false), 2000);
  };

  const handleExecuteBlink = () => {
    const target = blinkInput.trim() || report.mint;
    onScanMint(target);
    setBlinkInput('');
  };

  const handleOpenInspector = () => {
    const targetUrl = `https://blinks.xyz/inspector?url=${encodeURIComponent(actionUrl)}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <TiltCard className="bg-[#070912]/80 backdrop-blur-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Share2 className="w-4 h-4 text-cyan-400" />
          Native Solana Blink Action
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
          X / TWITTER & PHANTOM NATIVE
        </span>
      </div>

      <p className="text-xs text-slate-400">
        Live interactive rendering of how GuardRail unrolls inside Twitter/X feeds and Solana wallets:
      </p>

      {/* Interactive Blink Preview Box */}
      <div className="rounded-2xl bg-black/85 border border-cyan-500/30 p-4 space-y-3 font-mono shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        {/* Blink Metadata Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-white/[0.1] flex-shrink-0 p-1">
            <img 
              src="https://raw.githubusercontent.com/solana-developers/brand-kit/main/assets/png/solana-badge-black.png" 
              alt="Blink Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-cyan-400 font-semibold truncate">guardrail-protocol.vercel.app</span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">Action Verified</span>
            </div>
            <h4 className="text-xs font-bold text-white tracking-wide truncate">
              {`GuardRail: ${report.riskLevel} (${report.riskScore}/100 Risk)`}
            </h4>
          </div>
        </div>

        {/* Action Description */}
        <p className="text-[11px] text-slate-300 font-sans leading-relaxed border-l-2 border-cyan-500/40 pl-2.5 py-0.5">
          {`Token: ${report.mint.slice(0, 4)}...${report.mint.slice(-4)} | Standard: ${report.tokenStandard} | Freeze: ${report.standard.isFreezable ? 'YES' : 'REVOKED'} | Mint: ${report.standard.isMintable ? 'YES' : 'REVOKED'} | Hooks: ${report.extensions.hasTransferHook ? 'ATTACHED' : 'NONE'}`}
        </p>

        {/* Parameter Input */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>INPUT: Solana Mint Address</span>
            <span className="text-slate-500">Optional</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={blinkInput}
              onChange={(e) => setBlinkInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExecuteBlink()}
              placeholder={report.mint.slice(0, 14) + '...'}
              className="flex-1 bg-black/60 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              onClick={handleExecuteBlink}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>AUDIT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
        <button
          onClick={handleCopyBlink}
          className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all text-[11px] active:scale-95 cursor-pointer"
        >
          {copiedBlink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span>{copiedBlink ? 'COPIED BLINK' : 'COPY BLINK URL'}</span>
        </button>

        <a
          href="/actions.json"
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all text-[11px] active:scale-95 cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          <span>VIEW ACTIONS.JSON</span>
        </a>
      </div>

      {/* Official Solana Foundation Blinks Inspector (blinks.xyz) */}
      <button
        onClick={handleOpenInspector}
        className="w-full py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-[11px] font-mono font-bold text-cyan-300 hover:text-cyan-200 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)]"
      >
        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        <span>TEST IN OFFICIAL BLINKS INSPECTOR (BLINKS.XYZ)</span>
      </button>
    </TiltCard>
  );
}
