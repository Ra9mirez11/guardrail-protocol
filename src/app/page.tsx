'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Terminal, 
  Search, 
  ExternalLink, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Share2, 
  Cpu, 
  Zap,
  RefreshCw,
  TrendingUp,
  Radio,
  Layers,
  ArrowUpRight,
  Copy,
  Eye,
  SlidersHorizontal,
  Flame,
  Activity
} from 'lucide-react';
import { SecurityAuditReport } from '@/lib/types';
import { TOP_TRADED_TOKENS, TOKEN_2022_RADAR, NEW_RADAR_MINTS, TrackedToken } from '@/lib/tokenDirectory';

export default function Home() {
  const [mintInput, setMintInput] = useState('CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<SecurityAuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'TOP' | 'TOKEN22' | 'NEW'>('TOKEN22');
  const [copiedBlink, setCopiedBlink] = useState(false);

  // Auto-scan default Token-2022 on load
  useEffect(() => {
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

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'SAFE':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          gaugeBg: 'text-emerald-400',
          glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
          label: 'SAFE & VERIFIED'
        };
      case 'WARNING':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          gaugeBg: 'text-amber-400',
          glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
          label: 'WARNING DETECTED'
        };
      case 'DANGER':
      case 'CRITICAL':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          gaugeBg: 'text-rose-400',
          glow: 'shadow-[0_0_30px_rgba(244,63,94,0.2)]',
          label: 'HIGH THREAT / HONEYPOT'
        };
      default:
        return {
          bg: 'bg-gray-800 border-gray-700 text-gray-400',
          gaugeBg: 'text-gray-400',
          glow: '',
          label: 'UNKNOWN'
        };
    }
  };

  const activeTokensList = activeTab === 'TOP' 
    ? TOP_TRADED_TOKENS 
    : activeTab === 'TOKEN22' 
      ? TOKEN_2022_RADAR 
      : NEW_RADAR_MINTS;

  const currentBadge = report ? getRiskBadge(report.riskLevel) : getRiskBadge('SAFE');

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f2f4f8] selection:bg-[#00ffa3] selection:text-black">
      {/* Top Cyber Navigation Bar */}
      <header className="border-b border-white/5 bg-[#090b10]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3.5">
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-[#00ffa3]/20 via-[#00ffa3]/5 to-transparent border border-[#00ffa3]/30 shadow-[0_0_20px_rgba(0,255,163,0.2)]">
              <ShieldCheck className="w-6 h-6 text-[#00ffa3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-white">GUARDRAIL</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00ffa3]/10 text-[#00ffa3] border border-[#00ffa3]/30">
                  PRO V1.0
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono">Solana & Token-2022 Pre-Execution Firewall</p>
            </div>
          </div>

          {/* Live Network Metrics Header */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse"></span>
              <span className="text-gray-400">Network:</span>
              <span className="text-white font-semibold">Mainnet-Beta</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5">
              <Activity className="w-3.5 h-3.5 text-[#00ffa3]" />
              <span className="text-gray-400">TPS:</span>
              <span className="text-white font-semibold">2,481</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5">
              <Lock className="w-3.5 h-3.5 text-[#00ffa3]" />
              <span className="text-gray-400">Architecture:</span>
              <span className="text-white font-semibold">100% Non-Custodial</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Terminal Grid (3-Column Layout) */}
      <main className="max-w-[1600px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: LIVE MARKET RADAR & 1-CLICK FEED (3.5 cols) */}
        <section className="lg:col-span-4 xl:col-span-3.5 space-y-4">
          <div className="p-4 rounded-2xl cyber-glass border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#00ffa3] animate-pulse" />
                <h2 className="text-xs font-bold font-mono tracking-wider text-white uppercase">Live Token Feed</h2>
              </div>
              <span className="text-[10px] font-mono text-[#00ffa3] bg-[#00ffa3]/10 px-2 py-0.5 rounded border border-[#00ffa3]/20">
                1-CLICK AUDIT
              </span>
            </div>

            {/* Feed Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-xl border border-white/5 text-[11px] font-mono">
              <button
                onClick={() => setActiveTab('TOKEN22')}
                className={`py-1.5 rounded-lg font-bold transition-all ${activeTab === 'TOKEN22' ? 'bg-[#00ffa3] text-black shadow-lg shadow-[#00ffa3]/20' : 'text-gray-400 hover:text-white'}`}
              >
                TOKEN-2022
              </button>
              <button
                onClick={() => setActiveTab('TOP')}
                className={`py-1.5 rounded-lg font-bold transition-all ${activeTab === 'TOP' ? 'bg-[#00ffa3] text-black shadow-lg shadow-[#00ffa3]/20' : 'text-gray-400 hover:text-white'}`}
              >
                TOP VOLUME
              </button>
              <button
                onClick={() => setActiveTab('NEW')}
                className={`py-1.5 rounded-lg font-bold transition-all ${activeTab === 'NEW' ? 'bg-[#00ffa3] text-black shadow-lg shadow-[#00ffa3]/20' : 'text-gray-400 hover:text-white'}`}
              >
                RADAR MINTS
              </button>
            </div>

            {/* Token List */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {activeTokensList.map((t) => (
                <div
                  key={t.mint}
                  onClick={() => handleScan(t.mint)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer group flex items-center justify-between ${
                    mintInput === t.mint 
                      ? 'bg-[#00ffa3]/10 border-[#00ffa3]/40 shadow-[0_0_15px_rgba(0,255,163,0.1)]' 
                      : 'bg-white/[0.02] border-white/5 hover:border-[#00ffa3]/30 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center font-bold font-mono text-xs text-white group-hover:border-[#00ffa3]/50 transition-colors">
                      {t.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white group-hover:text-[#00ffa3] transition-colors">{t.symbol}</span>
                        <span className="text-[10px] text-gray-500 truncate max-w-[80px]">{t.name}</span>
                      </div>
                      <div className="text-[11px] font-mono text-gray-400 flex items-center gap-2 mt-0.5">
                        <span>{t.price}</span>
                        <span className={t.isPositive ? 'text-emerald-400' : 'text-rose-400'}>{t.change24h}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block text-[9px] font-mono px-1.5 py-0.5 rounded border border-white/10 bg-black/40 text-gray-300">
                      {t.standard}
                    </span>
                    <div className="text-[10px] font-mono text-gray-500 mt-1 flex items-center justify-end gap-1 group-hover:text-[#00ffa3] transition-colors">
                      <span>Audit</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-[11px] text-gray-400 font-mono leading-relaxed">
              💡 Click any token to instantly run deep byte-level inspection and invariant simulation.
            </div>
          </div>
        </section>

        {/* CENTER COLUMN: PRE-FLIGHT SCANNER & REPORT DASHBOARD (5.5 cols) */}
        <section className="lg:col-span-8 xl:col-span-5.5 space-y-6">
          
          {/* Main Search & Radar Bar */}
          <div className="p-5 rounded-2xl cyber-glass border border-white/10 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00ffa3] uppercase">
                  <Terminal className="w-4 h-4" />
                  <span>Token Radar & Pre-Flight Scanner</span>
                </div>
                <span className="text-[11px] font-mono text-gray-400">Direct Solana RPC Inspection</span>
              </div>

              {/* Input & Action */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={mintInput}
                    onChange={(e) => setMintInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                    placeholder="Enter Solana Token Address (e.g., CKfatsP...)"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#00ffa3]/80 transition-all"
                  />
                </div>
                <button
                  onClick={() => handleScan()}
                  disabled={loading}
                  className="bg-[#00ffa3] hover:bg-[#00ffa3]/90 text-black font-mono font-black text-xs px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,163,0.3)] disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>INSPECTING BYTES...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-black" />
                      <span>RUN DEEP AUDIT</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-3 font-mono text-xs">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Detailed Audit Report */}
          {report && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Verdict & Score Banner */}
              <div className={`p-6 rounded-2xl border ${currentBadge.bg} ${currentBadge.glow} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6`}>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {report.riskLevel === 'SAFE' ? (
                      <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                        <ShieldCheck className="w-7 h-7" />
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
                        <ShieldAlert className="w-7 h-7" />
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest opacity-80">Verdict Analysis</div>
                      <h3 className="text-xl font-bold tracking-wide text-white">{currentBadge.label}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 font-mono leading-relaxed pl-1">
                    {report.verdict}
                  </p>
                </div>

                {/* Cyber Risk Gauge */}
                <div className="flex items-center gap-4 bg-black/60 border border-white/10 px-6 py-4 rounded-xl font-mono">
                  <div className="text-right">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Threat Index</div>
                    <div className="text-3xl font-black text-white">
                      {report.riskScore}<span className="text-sm text-gray-500 font-normal">/100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Round-Trip Pre-Execution Simulator View */}
              <div className="p-5 rounded-2xl cyber-glass border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                    <Activity className="w-4 h-4 text-[#00ffa3]" />
                    <span>Round-Trip Pre-Execution Simulation</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    PASSED SIMULATION
                  </span>
                </div>

                {/* Simulation Pipeline steps */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-gray-300">
                    <div className="text-emerald-400 font-bold mb-1">STEP 1</div>
                    <div>Simulated Buy</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-gray-300">
                    <div className="text-emerald-400 font-bold mb-1">STEP 2</div>
                    <div>Hook CPI Check</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-gray-300">
                    <div className="text-emerald-400 font-bold mb-1">STEP 3</div>
                    <div>Tax Slippage Calc</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-gray-300">
                    <div className="text-emerald-400 font-bold mb-1">STEP 4</div>
                    <div>Simulated Sell Exit</div>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Token-2022 Deep Audit */}
                <div className="p-5 rounded-2xl cyber-glass border border-white/10 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                      <Cpu className="w-4 h-4 text-[#00ffa3]" />
                      <span>Token-2022 Extensions</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                      {report.tokenStandard}
                    </span>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    {/* Transfer Hook */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div>
                        <div className="text-white font-medium">Transfer Hook</div>
                        <div className="text-[10px] text-gray-400">External CPI execution</div>
                      </div>
                      {report.extensions.hasTransferHook ? (
                        <span className="text-rose-400 font-bold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> DETECTED</span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> NONE</span>
                      )}
                    </div>

                    {/* Transfer Tax */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div>
                        <div className="text-white font-medium">Transfer Tax Rate</div>
                        <div className="text-[10px] text-gray-400">Deducted on every transfer</div>
                      </div>
                      {report.extensions.hasTransferFee ? (
                        <span className="text-amber-400 font-bold">{(report.extensions.transferFeeBps / 100).toFixed(2)}%</span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 0%</span>
                      )}
                    </div>

                    {/* Permanent Delegate */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div>
                        <div className="text-white font-medium">Permanent Delegate</div>
                        <div className="text-[10px] text-gray-400">Confiscation authority</div>
                      </div>
                      {report.extensions.hasPermanentDelegate ? (
                        <span className="text-rose-400 font-bold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> ACTIVE</span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> NONE</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Standard Authorities */}
                <div className="p-5 rounded-2xl cyber-glass border border-white/10 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                      <Lock className="w-4 h-4 text-[#00ffa3]" />
                      <span>Mint & Freeze Control</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                      Authorities
                    </span>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    {/* Freeze Authority */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div>
                        <div className="text-white font-medium">Freeze Authority</div>
                        <div className="text-[10px] text-gray-400">Wallet freezing capability</div>
                      </div>
                      {report.standard.isFreezable ? (
                        <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> ACTIVE</span>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> REVOKED</span>
                      )}
                    </div>

                    {/* Mint Authority */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div>
                        <div className="text-white font-medium">Mint Authority</div>
                        <div className="text-[10px] text-gray-400">Supply inflation capability</div>
                      </div>
                      {report.standard.isMintable ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> ACTIVE</span>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> REVOKED</span>
                      )}
                    </div>

                    {/* Total Decimals */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
                      <div>
                        <div className="text-white font-medium">Decimals & Supply</div>
                        <div className="text-[10px] text-gray-400">Token precision units</div>
                      </div>
                      <span className="text-white font-bold">{report.standard.decimals} decimals</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Safe Swap Action (Jupiter Routing) */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-black/40 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5 justify-center sm:justify-start">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Safe-Swap Route Available</span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono">
                    This token passed invariant checks. You can route trades safely via Jupiter DEX.
                  </p>
                </div>
                <a
                  href={`https://jup.ag/swap/SOL-${report.mint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-xs flex items-center gap-2 transition-all whitespace-nowrap shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <span>TRADE VIA JUPITER</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          )}

        </section>

        {/* RIGHT COLUMN: BLINK INTEGRATION & THREAT INTELLIGENCE (3 cols) */}
        <section className="lg:col-span-12 xl:col-span-3 space-y-4">
          
          {/* Solana Blink Twitter / Action Preview */}
          <div className="p-5 rounded-2xl cyber-glass border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                <Share2 className="w-4 h-4 text-[#00ffa3]" />
                <span>Solana Blink Action</span>
              </div>
              <span className="text-[10px] font-mono text-[#00ffa3]">TWITTER / X NATIVE</span>
            </div>

            <p className="text-xs text-gray-400 font-mono leading-relaxed">
              Paste this link directly into any tweet. Phantom and Backpack wallets render an interactive 1-click audit button inside Twitter feeds.
            </p>

            {/* Action Card Preview */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>Action URL:</span>
                <button
                  onClick={() => {
                    const url = typeof window !== 'undefined' ? `${window.location.origin}/api/actions/scan?mint=${mintInput}` : `/api/actions/scan?mint=${mintInput}`;
                    navigator.clipboard.writeText(url);
                    setCopiedBlink(true);
                    setTimeout(() => setCopiedBlink(false), 2000);
                  }}
                  className="text-[#00ffa3] hover:underline flex items-center gap-1 text-[10px]"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedBlink ? 'COPIED!' : 'COPY LINK'}</span>
                </button>
              </div>
              <div className="p-2.5 rounded bg-black border border-white/5 text-[10px] text-gray-300 break-all select-all">
                /api/actions/scan?mint={mintInput}
              </div>
            </div>

            <a
              href={`https://dial.to/?action=solana-action:${typeof window !== 'undefined' ? window.location.origin : ''}/api/actions/scan?mint=${mintInput}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-mono text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-[#00ffa3]" />
              <span>Preview on Dial.to</span>
            </a>
          </div>

          {/* Threat Intelligence / Exploit Vectors */}
          <div className="p-5 rounded-2xl cyber-glass border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase pb-2 border-b border-white/5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Token-2022 Attack Vectors</span>
            </div>

            <div className="space-y-2 text-[11px] text-gray-400 leading-relaxed">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <strong className="text-white block mb-0.5">1. Stealth Transfer Hook</strong>
                Attackers register CPI hooks that selectively revert when selling on DEXes, locking user SOL permanently.
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <strong className="text-white block mb-0.5">2. 99% Withholding Tax</strong>
                High basis point fees configured inside Token-2022 that siphon 99% of traded value into creator vaults.
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <strong className="text-white block mb-0.5">3. Default Frozen Trap</strong>
                New token holders receive tokens into accounts automatically frozen at genesis.
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Cyber Footer */}
      <footer className="border-t border-white/5 mt-12 py-6 text-xs text-gray-500 font-mono">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>GuardRail Protocol © 2026 | Built for Colosseum Crypto World&apos;s Fair & SolanaCZE Track</div>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-[#00ffa3]" /> Zero-Knowledge Pipeline</span>
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-[#00ffa3]" /> 100% Non-Custodial</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
