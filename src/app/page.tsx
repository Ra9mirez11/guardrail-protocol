'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ArrowUpRight,
  Copy,
  Activity,
  Loader2,
  Sparkles,
  Flame,
  Radio,
  Layers,
  TrendingUp,
  Check,
  Radar,
  Terminal,
  FileCode,
  Award,
  PlayCircle
} from 'lucide-react';
import { SecurityAuditReport } from '@/lib/types';
import { TOP_TRADED_TOKENS, TOKEN_2022_RADAR, NEW_RADAR_MINTS, EXPLOIT_VECTORS_RADAR, TrackedToken } from '@/lib/tokenDirectory';
import { AuditExportButton } from '@/components/AuditExportButton';
import { SdkModal } from '@/components/SdkModal';
import { WalletButtonWrapper } from '@/components/WalletButtonWrapper';
import { TiltCard } from '@/components/ui/TiltCard';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { HoloGauge } from '@/components/ui/HoloGauge';
import { BackgroundBeams } from '@/components/ui/BackgroundBeams';
import { MarqueeTicker } from '@/components/ui/Marquee';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { ForensicTlvCard } from '@/components/ForensicTlvCard';
import { SimulatorCard } from '@/components/SimulatorCard';
import { AttestationBadge } from '@/components/AttestationBadge';
import { IntroSplash } from '@/components/IntroSplash';
import { TransferHookDecompiler } from '@/components/TransferHookDecompiler';
// WalletMultiButton handled by SSR-safe WalletButtonWrapper

export default function Home() {
  const handleOpenDialTo = (targetMint?: string) => {
    if (typeof window === 'undefined') return;
    const currentOrigin = window.location.origin;
    if (currentOrigin.includes('localhost') || currentOrigin.includes('127.0.0.1')) {
      alert('Dial.to runner requires your public live Vercel URL, not localhost.');
      return;
    }
    const mintToAudit = targetMint || mintInput;
    const targetUrl = `https://dial.to/?action=solana-action:${encodeURIComponent(`${currentOrigin}/api/actions/scan?mint=${mintToAudit}`)}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };
  const [mintInput, setMintInput] = useState('CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<SecurityAuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'TOKEN22' | 'TOP' | 'NEW' | 'EXPLOITS'>('TOKEN22');
  const [copiedBlink, setCopiedBlink] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const activeTokensList = activeTab === 'TOKEN22' 
    ? TOKEN_2022_RADAR 
    : activeTab === 'TOP' 
      ? TOP_TRADED_TOKENS 
      : activeTab === 'EXPLOITS'
        ? EXPLOIT_VECTORS_RADAR
        : NEW_RADAR_MINTS;

  const isSafe = report?.riskLevel === 'SAFE';
  const isWarn = report?.riskLevel === 'WARNING';
  const isCritical = report?.riskLevel === 'CRITICAL';
  const isInstitutional = report?.securityCategory === 'INSTITUTIONAL_STABLE';

  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden selection:bg-emerald-400 selection:text-black font-sans pb-20">
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}
      {/* Dynamic Deep Space Beams & Particles */}
      <BackgroundBeams />

      {/* Ultra-Luxe Top Navigation */}
      <header className="border-b border-white/[0.06] bg-[#030407]/60 backdrop-blur-2xl sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3.5 group cursor-pointer">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-emerald-400 via-teal-400/30 to-transparent shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-transform group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="GuardRail Logo" 
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-black tracking-widest bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  GUARDRAIL
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-wider text-emerald-400 font-semibold">
                PRE-EXECUTION FIREWALL
              </p>
            </div>
          </div>

          {/* Quick Metrics / Network Status */}
          <div className="flex items-center gap-3">
            <SdkModal currentMint={mintInput} />
            <WalletButtonWrapper />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MAINNET RADAR LIVE</span>
            </div>
            <a
              href="https://github.com/Ra9mirez11/guardrail-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono font-medium text-slate-300 transition-colors flex items-center gap-2"
            >
              <span>DOCS</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            <EncryptedText 
              text="ZERO-TRUST FIREWALL" 
              encryptedClassName="text-emerald-500/50 font-mono"
              revealedClassName="text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
              revealDelayMs={85}
            />
            <br />
            <span className="inline-block mt-1">
              <EncryptedText
                text="FOR SOLANA TOKENS"
                encryptedClassName="text-cyan-500/40 font-mono"
                revealedClassName="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                revealDelayMs={110}
              />
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Decompile on-chain TLV bytes, neutralize stealth transfer hooks, and uncover 99% withholding taxes before signing any transaction.
          </p>
        </motion.div>

        {/* GLOWING COMMAND BAR INPUT (HERO RADAR) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto pt-4"
        >
          <div className="relative p-1.5 rounded-3xl bg-gradient-to-b from-white/[0.15] via-white/[0.05] to-transparent shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="relative flex flex-col sm:flex-row items-center gap-2 bg-[#06080e]/90 backdrop-blur-2xl rounded-[22px] p-2 border border-white/[0.08]">
              <div className="relative flex-1 w-full flex items-center pl-4">
                <Search className="w-5 h-5 text-emerald-400 flex-shrink-0 mr-3" />
                <input
                  type="text"
                  value={mintInput}
                  onChange={(e) => setMintInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                  placeholder="Paste Solana Token Mint Address (e.g., CKfatsP...)"
                  className="w-full bg-transparent border-none text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none font-mono py-3"
                />
              </div>

              {/* 3D Magnetic Button */}
              <button
                onClick={() => handleScan()}
                disabled={loading}
                className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black font-extrabold text-sm font-mono tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] active:scale-95 disabled:opacity-50 whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black relative z-10" />
                    <span className="relative z-10">ANALYZING BYTES...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-black text-black relative z-10" />
                    <span className="relative z-10">RUN DEEP AUDIT</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      
        {/* QUICK HONEYPOT VECTOR SELECTORS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto pt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-mono"
        >
          <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            Honeypot Vectors:
          </span>
          <button
            type="button"
            onClick={() => handleScan('Tax9999999999999999999999999999999999999999')}
            className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 hover:text-white transition-all text-[11px] font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.15)] active:scale-95 cursor-pointer"
          >
            <span>TAX99 (99% Fee Trap)</span>
          </button>
          <button
            type="button"
            onClick={() => handleScan('HookTrap111111111111111111111111111111111111')}
            className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 hover:text-white transition-all text-[11px] font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.15)] active:scale-95 cursor-pointer"
          >
            <span>HOOKTRAP (Hook Revert)</span>
          </button>
          <button
            type="button"
            onClick={() => handleScan('DrainMe1111111111111111111111111111111111111')}
            className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 hover:text-white transition-all text-[11px] font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.15)] active:scale-95 cursor-pointer"
          >
            <span>DRAIN (Freeze Authority)</span>
          </button>
        </motion.div>
      </section>

      {/* COMPACT INFINITE MARQUEE RADAR (DOZENS OF REAL TOKENS) */}
      <section className="max-w-7xl mx-auto px-6 py-2">
        <div className="p-3.5 rounded-2xl bg-[#060810]/70 backdrop-blur-xl border border-white/[0.07] shadow-2xl space-y-2.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Real-Time Market Stream</span>
              <span className="text-[10px] text-slate-400 font-normal lowercase">(hover to pause - click to audit)</span>
            </div>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/[0.06] text-xs font-mono">
              <button
                onClick={() => setActiveTab('TOKEN22')}
                className={`px-3 py-1 rounded-lg transition-all font-semibold text-[11px] ${activeTab === 'TOKEN22' ? 'bg-emerald-400 text-black shadow-md shadow-emerald-400/20' : 'text-slate-400 hover:text-white'}`}
              >
                TOKEN-2022
              </button>
              <button
                onClick={() => setActiveTab('EXPLOITS')}
                className={`px-3 py-1 rounded-lg transition-all font-semibold text-[11px] flex items-center gap-1.5 ${activeTab === 'EXPLOITS' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 ring-1 ring-rose-400' : 'text-rose-400 hover:text-rose-300'}`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                HONEYPOT VECTORS
              </button>
              <button
                onClick={() => setActiveTab('TOP')}
                className={`px-3 py-1 rounded-lg transition-all font-semibold text-[11px] ${activeTab === 'TOP' ? 'bg-emerald-400 text-black shadow-md shadow-emerald-400/20' : 'text-slate-400 hover:text-white'}`}
              >
                TOP VOLUME
              </button>
              <button
                onClick={() => setActiveTab('NEW')}
                className={`px-3 py-1 rounded-lg transition-all font-semibold text-[11px] ${activeTab === 'NEW' ? 'bg-emerald-400 text-black shadow-md shadow-emerald-400/20' : 'text-slate-400 hover:text-white'}`}
              >
                TRENDING
              </button>
            </div>
          </div>

          {/* Infinite Smooth Flowing Stream */}
          <MarqueeTicker 
            tokens={activeTokensList} 
            selectedMint={mintInput} 
            onSelectToken={(mint) => handleScan(mint)} 
          />
        </div>
      </section>

      {/* ASYMMETRICAL 3D BENTO GRID (THE AUDIT & VERDICT ENGINE) */}
      <section className="max-w-7xl mx-auto px-6 py-6 relative">
        {/* Error State */}
        {error && (
          <div className="p-6 mb-6 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-4 font-mono text-sm shadow-xl">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Bento Grid Analytics with Persistent Layout and High-Tech Radar HUD Overlay */}
        <div className="relative">
          {/* Laser Radar Scan Overlay when Loading */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-30 rounded-3xl backdrop-blur-md bg-black/60 border border-emerald-500/30 overflow-hidden flex flex-col items-center justify-center p-6"
              >
                {/* Moving Laser Scan Line */}
                <motion.div
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_25px_#10B981]"
                />

                <div className="p-8 rounded-3xl bg-[#060810]/95 border border-emerald-400/40 shadow-[0_0_80px_rgba(16,185,129,0.25)] flex flex-col items-center text-center max-w-md mx-auto space-y-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 border-t-emerald-400 animate-spin" />
                    <Radar className="w-8 h-8 text-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white font-mono tracking-wider flex items-center justify-center gap-2">
                      <span>SCANNING ON-CHAIN INVARIANTS</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Querying mint TLVs - Dissecting transfer hooks & permissions
                    </p>
                  </div>
                  <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {report && (
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-all duration-300 ${loading ? 'opacity-40 filter blur-[1px]' : 'opacity-100'}`}>
              
              {/* BENTO ITEM 1: HERO VERDICT & 3D HOLO GAUGE (Col 7) */}
              <TiltCard className="lg:col-span-7 bg-[#070912]/80 backdrop-blur-2xl border border-white/[0.08] p-8 shadow-2xl relative">
                <BorderBeam size={250} duration={14} colorFrom="#10B981" colorTo="#06B6D4" />
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4 max-w-sm">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/[0.04] border border-white/[0.08]">
                      <span className={`w-2 h-2 rounded-full ${isSafe ? 'bg-emerald-400' : isWarn ? 'bg-amber-400' : 'bg-rose-400'} animate-ping`} />
                      <span className="text-slate-400">STATUS:</span>
                      <span className={isSafe ? 'text-emerald-400' : isWarn ? 'text-amber-400' : 'text-rose-400'}>
                        {report.riskLevel}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      {report.categoryLabel || (isSafe ? 'VERIFIED SECURE CONTRACT' : isWarn ? 'ELEVATED RISK NOTICE' : 'CRITICAL THREAT / HONEYPOT')}
                    </h2>

                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {report.verdict}
                    </p>

                    <div className="p-3 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-xs text-slate-400 break-all">
                      <span className="text-slate-500 block mb-0.5">AUDITED MINT:</span>
                      <span className="text-white font-bold">{report.mint}</span>
                    </div>
                  </div>

                  {/* 3D Holographic Gauge */}
                  <div className="flex-shrink-0">
                    <HoloGauge score={report.riskScore} />
                  </div>
                </div>

                {/* Cryptographic Audit Proof & Certificate Export */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">CRYPTOGRAPHIC AUDIT PROOF</span>
                  <AuditExportButton report={report} />
                </div>

                {/* On-Chain CPI Invariant Firewall Badge */}
                <div className="mt-3 p-3 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300 font-semibold">ANCHOR CPI FIREWALL PROXY:</span>
                    <span className="text-emerald-400 font-bold">GUARD_PRE_EXECUTION_SWAP ACTIVE</span>
                  </div>
                  <span className="text-[10px] text-slate-500">MAX_TAX: 500 BPS</span>
                </div>

                <AttestationBadge proof={report.attestationProof} mint={report.mint} />
              </TiltCard>

              {/* BENTO ITEM 2: JUPITER SAFE-ROUTE & TWITTER BLINK (Col 5) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Multi-DEX Liquidity & Safe Routing Card */}
                  <TiltCard className="flex-1 bg-gradient-to-br from-emerald-500/[0.08] via-[#070912]/90 to-transparent backdrop-blur-2xl border border-emerald-500/30 p-6 shadow-2xl flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Zap className="w-4 h-4 fill-emerald-400" />
                          Multi-DEX Execution Router
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${isSafe ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30' : isWarn ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' : 'bg-rose-400/20 text-rose-300 border-rose-400/30'}`}>
                          {isCritical ? 'HIGH RISK HONEYPOT' : 'INVARIANTS VERIFIED'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white">Direct Liquidity Access</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {isCritical 
                          ? 'Warning: Token invariants failed safety thresholds. Trading this asset carries severe loss risk.'
                          : 'Pre-flight checks passed. If the asset is new and unindexed by Jupiter, use Raydium or inspect pool depth on DexScreener.'}
                      </p>
                    </div>

                    <div className="mt-5 space-y-2.5">
                      {/* Primary Jupiter Aggregator Route */}
                      <a
                        href={`https://jup.ag/swap/SOL-${report.mint}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3.5 rounded-xl font-extrabold text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-98 ${isCritical ? 'bg-rose-500 hover:bg-rose-400 text-white' : 'bg-emerald-400 hover:bg-emerald-300 text-black'}`}
                      >
                        <span>EXECUTE ON JUPITER (AGGREGATED)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {/* Fallback Direct DEX & Liquidity Links */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <a
                          href={`https://raydium.io/swap/?inputMint=sol&outputMint=${report.mint}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all text-[11px]"
                          title="Direct AMM Swap for new or unindexed token pools"
                        >
                          <span>RAYDIUM SWAP</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>

                        <a
                          href={`https://dexscreener.com/solana/${report.mint}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all text-[11px]"
                          title="View live pool liquidity, market cap, and trading volume"
                        >
                          <span>DEXSCREENER</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      </div>
                    </div>
                  </TiltCard>

                {/* Twitter / Solana Blink Card */}
                <TiltCard className="bg-[#070912]/80 backdrop-blur-2xl border border-white/[0.08] p-6 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-cyan-400" />
                      Solana Blink Action Card
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                      X / TWITTER NATIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Share 1-click verifiable audits directly inside Twitter feeds:
                  </p>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/60 border border-white/[0.08]">
                    <span className="text-xs font-mono text-slate-300 truncate flex-1">
                      /api/actions/scan?mint={report.mint.slice(0, 8)}...
                    </span>
                    <button
                      onClick={() => {
                        const url = typeof window !== 'undefined' ? `${window.location.origin}/api/actions/scan?mint=${report.mint}` : `/api/actions/scan?mint=${report.mint}`;
                        navigator.clipboard.writeText(url);
                        setCopiedBlink(true);
                        setTimeout(() => setCopiedBlink(false), 2000);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-400 text-black font-bold text-xs font-mono flex items-center gap-1 shadow-md"
                    >
                      {copiedBlink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBlink ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenDialTo(report.mint)}
                    className="w-full mt-2.5 py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-[11px] font-mono font-bold text-cyan-300 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>TEST IN DIAL.TO BLINK RUNNER</span>
                  </button>
                </TiltCard>
              </div>

              {/* BENTO ITEM 3: TOKEN-2022 ATTACK VECTOR MATRIX (Col 12 - 4 Columns) */}
              <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Vector 1: Transfer Hook CPI */}
                <TiltCard className="bg-[#070912]/80 backdrop-blur-2xl border border-white/[0.08] p-6 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">Transfer Hook CPI</span>
                    {report.extensions.hasTransferHook ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                        DETECTED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        NONE (SAFE)
                      </span>
                    )}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {report.extensions.hasTransferHook ? 'Active CPI Interceptor' : 'Standard Execution'}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {report.extensions.hasTransferHook 
                      ? `External hook (${report.extensions.transferHookProgramId?.slice(0, 8)}...) executed on every transfer. Honeypot risk high.` 
                      : 'No external program invoked during transfers. Transactions cannot be selectively blocked.'}
                  </p>
                </TiltCard>

                {/* Vector 2: Transfer Fee (Tax) */}
                <TiltCard className="bg-[#070912]/80 backdrop-blur-2xl border border-white/[0.08] p-6 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">Transfer Fee (Tax)</span>
                    {report.extensions.hasTransferFee ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        {(report.extensions.transferFeeBps / 100).toFixed(2)}% TAX
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        0% (CLEAN)
                      </span>
                    )}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {report.extensions.hasTransferFee ? `${(report.extensions.transferFeeBps / 100).toFixed(2)}% Withheld` : 'Zero Withholding'}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {report.extensions.hasTransferFee 
                      ? 'Configured fee is siphoned into creator fee treasury on every single transfer.' 
                      : 'No transfer fee config exists on this token mint.'}
                  </p>
                </TiltCard>

                {/* Vector 3: Permanent Delegate */}
                <TiltCard className="bg-[#070912]/80 backdrop-blur-2xl border border-white/[0.08] p-6 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">Permanent Delegate</span>
                    {report.extensions.hasPermanentDelegate ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                        ACTIVE (RISK)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        REVOKED
                      </span>
                    )}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {report.extensions.hasPermanentDelegate ? 'Arbitrary Seizure' : 'Immutable Ownership'}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {report.extensions.hasPermanentDelegate 
                      ? 'Central authority can confiscate or burn user tokens without wallet signature.' 
                      : 'No master delegate exists. Token balances are strictly non-custodial.'}
                  </p>
                </TiltCard>

                {/* Vector 4: Freeze Authority */}
                <TiltCard className="bg-[#070912]/80 backdrop-blur-2xl border border-white/[0.08] p-6 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">Freeze Authority</span>
                    {report.standard.isFreezable ? (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${isInstitutional ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-amber-500/20 text-amber-400 border-amber-500/40'}`}>
                        {isInstitutional ? 'COMPLIANCE KEY' : 'ENABLED'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        BURNED
                      </span>
                    )}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {report.standard.isFreezable 
                      ? (isInstitutional ? 'Institutional Compliance' : 'Wallets Freezable')
                      : 'Permanently Revoked'}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {report.standard.isFreezable 
                      ? (isInstitutional 
                          ? 'Official regulatory/compliance freeze control retained by issuer (Circle/Tether).'
                          : 'Creator retains power to freeze recipient token accounts at will.')
                      : 'Freeze key is permanently burned. Token transfers cannot be halted.'}
                  </p>
                </TiltCard>

              </div>

              {/* BENTO ROW 3: DECOMPILED TLV BYTECODE & ZERO-RISK TX SIMULATOR */}
              <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6">
                  <ForensicTlvCard tlv={report.tlvInspection} />
                </div>
                <div className="lg:col-span-6">
                  <SimulatorCard simulation={report.simulation} mint={report.mint} />
                </div>
              </div>

              {/* BENTO ROW 4: FORENSIC TRANSFER HOOK DECOMPILER */}
              <div className="lg:col-span-12">
                <TransferHookDecompiler report={report} />
              </div>

            </div>
          )}
        </div>
      </section>

      {/* Ultra-Clean Footer */}
      <footer className="border-t border-white/[0.06] mt-20 py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>GUARDRAIL PROTOCOL - 2026 | BUILT FOR COLOSSEUM CRYPTO WORLD&apos;S FAIR & SOLANACZE TRACK</div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>ZERO-KNOWLEDGE PIPELINE</span>
            <span>-</span>
            <span>100% NON-CUSTODIAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
