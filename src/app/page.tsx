'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Search, 
  ExternalLink, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Share2, 
  Cpu, 
  Zap,
  Radio,
  ArrowUpRight,
  Copy,
  Activity,
  Loader2,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SecurityAuditReport } from '@/lib/types';
import { TOP_TRADED_TOKENS, TOKEN_2022_RADAR, NEW_RADAR_MINTS } from '@/lib/tokenDirectory';

export default function Home() {
  const [mintInput, setMintInput] = useState('CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<SecurityAuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'TOKEN22' | 'TOP' | 'NEW'>('TOKEN22');
  const [copiedBlink, setCopiedBlink] = useState(false);

  useEffect(() => {
    // Initial scan on load
    handleScan('CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo');
  }, []);

  const handleScan = async (targetMint?: string) => {
    const mintToScan = (targetMint || mintInput).trim();
    if (!mintToScan) return;

    setMintInput(mintToScan);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/scan?mint=${encodeURIComponent(mintToScan)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || 'Failed to inspect token');
      }

      setReport(data);
    } catch (err: any) {
      setError(err?.message || 'Error occurred while contacting Solana network');
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const activeTokensList = activeTab === 'TOKEN22' 
    ? TOKEN_2022_RADAR 
    : activeTab === 'TOP' 
      ? TOP_TRADED_TOKENS 
      : NEW_RADAR_MINTS;

  const isSafe = report?.riskLevel === 'SAFE';
  const isWarn = report?.riskLevel === 'WARNING';
  const isDanger = report?.riskLevel === 'DANGER' || report?.riskLevel === 'CRITICAL';

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="border-b border-white/[0.08] bg-[#07090e]/70 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00ffa3] via-[#00ffa3]/20 to-transparent p-px shadow-[0_0_25px_rgba(0,255,163,0.3)]">
              <div className="w-full h-full bg-[#090c14] rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#00ffa3]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">GuardRail</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#00ffa3]/10 text-[#00ffa3] border border-[#00ffa3]/30">
                  Protocol
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal">Zero-Trust Pre-Execution Firewall for Solana</p>
            </div>
          </div>

          {/* Network Indicators */}
          <div className="hidden md:flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse"></span>
              <span className="text-slate-400">Network:</span>
              <span className="text-white font-medium">Mainnet-Beta</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <Lock className="w-3.5 h-3.5 text-[#00ffa3]" />
              <span className="text-slate-300 font-medium">Non-Custodial</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full space-y-8">
        
        {/* Hero Search Section */}
        <div className="relative rounded-3xl glass-panel p-8 overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#00ffa3]/10 rounded-full blur-3xl pointer-events-none animate-glow"></div>
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ffa3]/10 border border-[#00ffa3]/20 text-[#00ffa3] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Token-2022 & SPL Invariant Inspection Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Pre-Flight Security Radar
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Analyze Token-2022 transfer hooks, hidden predatory fees, and honeypot traps on Solana in real time before signing.
            </p>

            {/* Search Input Bar */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={mintInput}
                  onChange={(e) => setMintInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                  placeholder="Enter Solana Token Mint Address (e.g., CKfatsP...)"
                  className="w-full bg-[#0a0d14]/90 border border-white/[0.12] rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00ffa3] focus:ring-1 focus:ring-[#00ffa3] transition-all font-mono shadow-inner"
                />
              </div>
              <button
                onClick={() => handleScan()}
                disabled={loading}
                className="bg-[#00ffa3] hover:bg-[#00ffa3]/90 text-black font-semibold text-sm px-8 py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(0,255,163,0.35)] disabled:opacity-50 whitespace-nowrap active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Auditing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-black" />
                    <span>Run Deep Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Curated Token Feed (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl glass-panel p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#00ffa3] animate-pulse" />
                <h2 className="text-sm font-bold tracking-tight text-white uppercase">Live Token Feed</h2>
              </div>
              <span className="text-[11px] font-medium text-[#00ffa3] bg-[#00ffa3]/10 px-2.5 py-1 rounded-full border border-[#00ffa3]/20">
                1-Click Select
              </span>
            </div>

            {/* Category Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-2xl border border-white/[0.06] text-xs">
              <button
                onClick={() => setActiveTab('TOKEN22')}
                className={`py-2 rounded-xl font-medium transition-all ${activeTab === 'TOKEN22' ? 'bg-[#00ffa3] text-black shadow-md shadow-[#00ffa3]/20' : 'text-slate-400 hover:text-white'}`}
              >
                Token-2022
              </button>
              <button
                onClick={() => setActiveTab('TOP')}
                className={`py-2 rounded-xl font-medium transition-all ${activeTab === 'TOP' ? 'bg-[#00ffa3] text-black shadow-md shadow-[#00ffa3]/20' : 'text-slate-400 hover:text-white'}`}
              >
                Top Volume
              </button>
              <button
                onClick={() => setActiveTab('NEW')}
                className={`py-2 rounded-xl font-medium transition-all ${activeTab === 'NEW' ? 'bg-[#00ffa3] text-black shadow-md shadow-[#00ffa3]/20' : 'text-slate-400 hover:text-white'}`}
              >
                Trending
              </button>
            </div>

            {/* Token List Cards */}
            <div className="space-y-2.5">
              {activeTokensList.map((token) => (
                <div
                  key={token.mint}
                  onClick={() => handleScan(token.mint)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    mintInput === token.mint 
                      ? 'glass-panel-active' 
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/[0.08] flex items-center justify-center font-bold text-xs text-white group-hover:border-[#00ffa3]/50 transition-colors">
                      {token.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white group-hover:text-[#00ffa3] transition-colors">
                          {token.symbol}
                        </span>
                        <span className="text-xs text-slate-400">{token.name}</span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 font-medium">
                        <span>{token.price}</span>
                        <span className={token.isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                          {token.change24h}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-md border border-white/[0.08] bg-black/40 text-slate-300 font-mono">
                      {token.standard}
                    </span>
                    <div className="text-xs text-slate-500 mt-1 flex items-center justify-end gap-1 group-hover:text-[#00ffa3] transition-colors font-medium">
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Detailed Security Canvas (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Loading Banner */}
            {loading && (
              <div className="rounded-3xl glass-panel p-8 text-center space-y-3 animate-pulse border border-[#00ffa3]/30">
                <Loader2 className="w-8 h-8 text-[#00ffa3] animate-spin mx-auto" />
                <h3 className="text-lg font-bold text-white">Extracting On-Chain TLV Extensions...</h3>
                <p className="text-xs text-slate-400 font-mono">Reading mint bytes from Solana Mainnet validator cluster</p>
              </div>
            )}

            {/* Error Message */}
            {error && !loading && (
              <div className="rounded-3xl p-6 bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-4 text-sm">
                <AlertTriangle className="w-6 h-6 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Audit Results View */}
            {report && !loading && (
              <div className="space-y-6">
                
                {/* Threat Banner & Score Card */}
                <div className={`rounded-3xl p-7 border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                  isSafe ? 'bg-emerald-500/[0.07] border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]' :
                  isWarn ? 'bg-amber-500/[0.07] border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]' :
                  'bg-rose-500/[0.07] border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.2)]'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      {isSafe ? (
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                      ) : isWarn ? (
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                          <ShieldAlert className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Security Verdict</div>
                        <h2 className="text-2xl font-extrabold text-white tracking-tight">
                          {isSafe ? 'Clean & Verified Contract' : isWarn ? 'Warning: Elevated Risk Vector' : 'High Threat: Honeypot Pattern'}
                        </h2>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 pl-1 font-normal leading-relaxed">
                      {report.verdict}
                    </p>
                    <div className="text-xs text-slate-400 pl-1 font-mono pt-1">
                      Target: <span className="text-white font-semibold">{report.mint}</span>
                    </div>
                  </div>

                  {/* Circular Threat Index */}
                  <div className="flex items-center gap-4 bg-black/60 border border-white/[0.1] px-6 py-4 rounded-2xl">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Threat Index</div>
                      <div className="text-3xl font-black text-white">
                        {report.riskScore}<span className="text-sm text-slate-500 font-normal">/100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Attack Vector Cards (2x2 Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Vector 1: Transfer Hook */}
                  <div className="rounded-2xl glass-panel p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Transfer Hook CPI</span>
                      {report.extensions.hasTransferHook ? (
                        <span className="text-rose-400 text-xs font-bold flex items-center gap-1"><XCircle className="w-4 h-4" /> Detected</span>
                      ) : (
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> None (Safe)</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {report.extensions.hasTransferHook 
                        ? `Custom CPI program (${report.extensions.transferHookProgramId?.slice(0, 8)}...) intercepts transfers and can revert sales.`
                        : 'No external program hook is invoked during token transfers.'}
                    </p>
                  </div>

                  {/* Vector 2: Transfer Fee (Tax) */}
                  <div className="rounded-2xl glass-panel p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Transfer Fee Rate</span>
                      {report.extensions.hasTransferFee ? (
                        <span className="text-amber-400 text-xs font-bold">{(report.extensions.transferFeeBps / 100).toFixed(2)}% Tax</span>
                      ) : (
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> 0% (Clean)</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {report.extensions.hasTransferFee
                        ? `Configured tax of ${(report.extensions.transferFeeBps / 100).toFixed(2)}% is deducted from every user transfer into creator vaults.`
                        : 'No transfer fee withholding configured on this token mint.'}
                    </p>
                  </div>

                  {/* Vector 3: Permanent Delegate */}
                  <div className="rounded-2xl glass-panel p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Permanent Delegate</span>
                      {report.extensions.hasPermanentDelegate ? (
                        <span className="text-rose-400 text-xs font-bold flex items-center gap-1"><XCircle className="w-4 h-4" /> Active</span>
                      ) : (
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Revoked</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {report.extensions.hasPermanentDelegate
                        ? 'Authority can arbitrarily seize, burn, or transfer tokens without holder signature.'
                        : 'No permanent delegate exists. Token holdings are non-custodial and secure.'}
                    </p>
                  </div>

                  {/* Vector 4: Mint & Freeze Control */}
                  <div className="rounded-2xl glass-panel p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Freeze Authority</span>
                      {report.standard.isFreezable ? (
                        <span className="text-rose-400 text-xs font-bold flex items-center gap-1"><XCircle className="w-4 h-4" /> Active</span>
                      ) : (
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Revoked</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {report.standard.isFreezable
                        ? 'Wallet freeze authority is active and can freeze token balances at any time.'
                        : 'Freeze authority is permanently burned and revoked.'}
                    </p>
                  </div>

                </div>

                {/* Safe Trade Action (Jupiter DEX integration) */}
                {isSafe && (
                  <div className="rounded-2xl bg-gradient-to-r from-emerald-500/10 via-black/40 to-transparent border border-emerald-500/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Pre-Flight Verification Passed</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        This token has 0% tax, no transfer hooks, and revoked authorities.
                      </p>
                    </div>
                    <a
                      href={`https://jup.ag/swap/SOL-${report.mint}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <span>Trade on Jupiter</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Twitter / Solana Blink Card */}
                <div className="rounded-2xl glass-panel p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div className="flex items-center gap-2 text-white text-xs font-bold uppercase">
                      <Share2 className="w-4 h-4 text-[#00ffa3]" />
                      <span>Solana Action / Blink URL</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#00ffa3] bg-[#00ffa3]/10 px-2 py-0.5 rounded border border-[#00ffa3]/20">
                      Standard API
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Paste this endpoint into tweets on Twitter/X to generate a 1-click verification card for traders:
                  </p>
                  <div className="flex items-center gap-2 bg-black/60 border border-white/[0.08] p-3 rounded-xl">
                    <div className="text-xs font-mono text-slate-300 flex-1 truncate select-all">
                      {typeof window !== 'undefined' ? `${window.location.origin}/api/actions/scan?mint=${report.mint}` : `/api/actions/scan?mint=${report.mint}`}
                    </div>
                    <button
                      onClick={() => {
                        const url = typeof window !== 'undefined' ? `${window.location.origin}/api/actions/scan?mint=${report.mint}` : `/api/actions/scan?mint=${report.mint}`;
                        navigator.clipboard.writeText(url);
                        setCopiedBlink(true);
                        setTimeout(() => setCopiedBlink(false), 2000);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#00ffa3] text-black font-semibold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedBlink ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </main>

      {/* Sleek Minimal Footer */}
      <footer className="border-t border-white/[0.08] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>GuardRail Protocol © 2026 | Built for Colosseum Crypto World&apos;s Fair & SolanaCZE Track</div>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <span>Zero-Knowledge Pipeline</span>
            <span>•</span>
            <span>100% Non-Custodial</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
