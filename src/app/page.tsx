'use client';

import React, { useState } from 'react';
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
  Flame, 
  Share2, 
  Cpu, 
  Zap,
  RefreshCw
} from 'lucide-react';
import { SecurityAuditReport } from '@/lib/types';

export default function Home() {
  const [mintInput, setMintInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<SecurityAuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const presets = [
    { label: 'BONK (SPL)', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
    { label: 'USDC (SPL)', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
    { label: 'WIF (SPL)', mint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm' },
  ];

  const handleScan = async (targetMint?: string) => {
    const mintToScan = (targetMint || mintInput).trim();
    if (!mintToScan) return;

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

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'SAFE': return 'text-cyber-neon border-cyber-neon/40 bg-cyber-neon/5';
      case 'WARNING': return 'text-cyber-warn border-cyber-warn/40 bg-cyber-warn/5';
      case 'DANGER':
      case 'CRITICAL': return 'text-cyber-danger border-cyber-danger/40 bg-cyber-danger/5';
      default: return 'text-gray-400 border-gray-700 bg-gray-900/40';
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <header className="border-b border-cyber-border pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyber-card border border-cyber-border text-cyber-neon">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wider uppercase text-white flex items-center gap-2">
                GuardRail <span className="text-cyber-neon text-xs font-mono px-2 py-0.5 border border-cyber-neon/30 rounded">PROTOCOL</span>
              </h1>
              <p className="text-xs text-cyber-subtle font-mono mt-0.5">
                Zero-Trust Pre-Execution Firewall & Token-2022 Invariant Inspector
              </p>
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyber-card border border-cyber-border">
            <span className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse"></span>
            <span className="text-cyber-subtle">Engine:</span>
            <span className="text-white font-semibold">Mainnet Pre-Flight</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyber-card border border-cyber-border">
            <Lock className="w-3.5 h-3.5 text-cyber-neon" />
            <span className="text-cyber-subtle">Security:</span>
            <span className="text-white font-semibold">Non-Custodial</span>
          </div>
        </div>
      </header>

      {/* Hero / Search Section */}
      <section className="bg-cyber-card border border-cyber-border rounded-xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-neon/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-cyber-neon text-xs font-mono uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>Target Contract Scrutinizer</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Paste Solana Token Mint Address (e.g., DezXAZ8...)"
                value={mintInput}
                onChange={(e) => setMintInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                className="w-full bg-cyber-dark border border-cyber-border rounded-lg px-4 py-3 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyber-neon/80 transition-colors"
              />
            </div>
            <button
              onClick={() => handleScan()}
              disabled={loading}
              className="bg-cyber-neon text-black font-mono font-bold px-6 py-3 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-cyber-neon/90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AUDITING...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>PRE-FLIGHT AUDIT</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-cyber-subtle">Verified Samples:</span>
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setMintInput(p.mint);
                  handleScan(p.mint);
                }}
                className="px-2.5 py-1 rounded bg-cyber-dark/80 border border-cyber-border hover:border-cyber-neon/40 text-gray-300 hover:text-white transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-lg bg-cyber-danger/10 border border-cyber-danger/40 text-cyber-danger flex items-center gap-3 font-mono text-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Audit Report View */}
      {report && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Verdict Card */}
          <div className={`p-6 rounded-xl border ${getRiskColor(report.riskLevel)} flex flex-col md:flex-row justify-between items-start md:items-center gap-6`}>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {report.riskLevel === 'SAFE' ? (
                  <ShieldCheck className="w-8 h-8 text-cyber-neon" />
                ) : (
                  <ShieldAlert className="w-8 h-8 text-cyber-danger" />
                )}
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest opacity-80">Verdict Status</div>
                  <h2 className="text-2xl font-bold tracking-wide">{report.riskLevel} - {report.verdict}</h2>
                </div>
              </div>
              <div className="font-mono text-xs opacity-75">
                Mint: <span className="font-semibold">{report.mint}</span> | Standard: <span className="font-semibold">{report.tokenStandard}</span>
              </div>
            </div>

            {/* Risk Gauge */}
            <div className="flex items-center gap-4 bg-cyber-dark/60 border border-cyber-border px-6 py-4 rounded-xl">
              <div className="text-right font-mono">
                <div className="text-xs text-cyber-subtle uppercase">Invariant Risk Score</div>
                <div className="text-3xl font-black">{report.riskScore}<span className="text-sm text-cyber-subtle font-normal">/100</span></div>
              </div>
            </div>
          </div>

          {/* Detailed Audit Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Token-2022 Deep Extensions */}
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-cyber-border pb-3">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Cpu className="w-4 h-4 text-cyber-neon" />
                  <span>Token-2022 Extensions Audit</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-dark border border-cyber-border text-cyber-subtle">
                  {report.extensions.isToken2022 ? 'Active' : 'N/A (SPL)'}
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {/* Transfer Hook */}
                <div className="flex items-center justify-between p-2.5 rounded bg-cyber-dark border border-cyber-border/70">
                  <div>
                    <div className="text-white font-medium">Transfer Hook CPI</div>
                    <div className="text-[11px] text-cyber-subtle">
                      {report.extensions.hasTransferHook ? `Program: ${report.extensions.transferHookProgramId?.slice(0, 8)}...` : 'No custom hook attached'}
                    </div>
                  </div>
                  {report.extensions.hasTransferHook ? (
                    <span className="text-cyber-danger flex items-center gap-1 font-bold"><AlertTriangle className="w-3.5 h-3.5" /> DETECTED</span>
                  ) : (
                    <span className="text-cyber-neon flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> NONE</span>
                  )}
                </div>

                {/* Transfer Fee */}
                <div className="flex items-center justify-between p-2.5 rounded bg-cyber-dark border border-cyber-border/70">
                  <div>
                    <div className="text-white font-medium">Transfer Fee (Tax)</div>
                    <div className="text-[11px] text-cyber-subtle">
                      {report.extensions.hasTransferFee ? `Rate: ${(report.extensions.transferFeeBps / 100).toFixed(2)}% | Max: ${report.extensions.maxTransferFee}` : 'Zero transfer fee config'}
                    </div>
                  </div>
                  {report.extensions.hasTransferFee ? (
                    <span className="text-cyber-warn font-bold">{(report.extensions.transferFeeBps / 100).toFixed(2)}%</span>
                  ) : (
                    <span className="text-cyber-neon flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 0% TAX</span>
                  )}
                </div>

                {/* Permanent Delegate */}
                <div className="flex items-center justify-between p-2.5 rounded bg-cyber-dark border border-cyber-border/70">
                  <div>
                    <div className="text-white font-medium">Permanent Delegate</div>
                    <div className="text-[11px] text-cyber-subtle">Arbitrary burn or drain authority</div>
                  </div>
                  {report.extensions.hasPermanentDelegate ? (
                    <span className="text-cyber-danger flex items-center gap-1 font-bold"><AlertTriangle className="w-3.5 h-3.5" /> DETECTED</span>
                  ) : (
                    <span className="text-cyber-neon flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> NONE</span>
                  )}
                </div>

                {/* Default Account State */}
                <div className="flex items-center justify-between p-2.5 rounded bg-cyber-dark border border-cyber-border/70">
                  <div>
                    <div className="text-white font-medium">Default Account State</div>
                    <div className="text-[11px] text-cyber-subtle">Initial state of new recipient wallets</div>
                  </div>
                  {report.extensions.defaultAccountState === 'Frozen' ? (
                    <span className="text-cyber-danger font-bold">FROZEN TRAP</span>
                  ) : (
                    <span className="text-cyber-neon flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> UNRESTRICTED</span>
                  )}
                </div>
              </div>
            </div>

            {/* Standard Authorities & Supply */}
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-cyber-border pb-3">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Lock className="w-4 h-4 text-cyber-neon" />
                  <span>Mint & Freeze Authorities</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-dark border border-cyber-border text-cyber-subtle">
                  Standard SPL
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {/* Freeze Authority */}
                <div className="flex items-center justify-between p-2.5 rounded bg-cyber-dark border border-cyber-border/70">
                  <div>
                    <div className="text-white font-medium">Freeze Authority</div>
                    <div className="text-[11px] text-cyber-subtle">
                      {report.standard.freezeAuthority ? `${report.standard.freezeAuthority.slice(0, 10)}...` : 'Permanently revoked'}
                    </div>
                  </div>
                  {report.standard.isFreezable ? (
                    <span className="text-cyber-danger font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> ACTIVE</span>
                  ) : (
                    <span className="text-cyber-neon font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> REVOKED</span>
                  )}
                </div>

                {/* Mint Authority */}
                <div className="flex items-center justify-between p-2.5 rounded bg-cyber-dark border border-cyber-border/70">
                  <div>
                    <div className="text-white font-medium">Mint Authority</div>
                    <div className="text-[11px] text-cyber-subtle">
                      {report.standard.mintAuthority ? `${report.standard.mintAuthority.slice(0, 10)}...` : 'Permanently revoked'}
                    </div>
                  </div>
                  {report.standard.isMintable ? (
                    <span className="text-cyber-warn font-bold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> ACTIVE</span>
                  ) : (
                    <span className="text-cyber-neon font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> REVOKED</span>
                  )}
                </div>

                {/* Decimals & Units */}
                <div className="flex items-center justify-between p-2.5 rounded bg-cyber-dark border border-cyber-border/70">
                  <div>
                    <div className="text-white font-medium">Decimals</div>
                    <div className="text-[11px] text-cyber-subtle">Precision factor</div>
                  </div>
                  <span className="text-white font-bold">{report.standard.decimals}</span>
                </div>

                {/* Supply Status */}
                <div className="flex items-center justify-between p-2.5 rounded bg-cyber-dark border border-cyber-border/70">
                  <div>
                    <div className="text-white font-medium">Total Supply</div>
                    <div className="text-[11px] text-cyber-subtle">Raw token units</div>
                  </div>
                  <span className="text-white font-bold truncate max-w-[140px]">{report.standard.supply}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Flags Section */}
          {report.flags.length > 0 && (
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm border-b border-cyber-border pb-3">
                <AlertTriangle className="w-4 h-4 text-cyber-warn" />
                <span>Security Anomalies & Risk Vector Breakdown</span>
              </div>
              <div className="space-y-3 font-mono">
                {report.flags.map((flag, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-cyber-dark border border-cyber-border flex items-start gap-3">
                    <div className="mt-0.5">
                      {flag.severity === 'CRITICAL' ? (
                        <XCircle className="w-4 h-4 text-cyber-danger" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-cyber-warn" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{flag.title}</div>
                      <p className="text-xs text-cyber-subtle mt-1 leading-relaxed">{flag.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solana Blink / Twitter Integration Box */}
          <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-cyber-border pb-3">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Share2 className="w-4 h-4 text-cyber-neon" />
                <span>Solana Blink Action Endpoint (Shareable on Twitter/X)</span>
              </div>
              <span className="text-xs font-mono text-cyber-neon">Verified Action Standard</span>
            </div>
            <div className="p-3 bg-cyber-dark border border-cyber-border rounded-lg font-mono text-xs text-cyber-subtle break-all select-all flex items-center justify-between gap-4">
              <span>{typeof window !== 'undefined' ? `${window.location.origin}/api/actions/scan?mint=${report.mint}` : `/api/actions/scan?mint=${report.mint}`}</span>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(`${window.location.origin}/api/actions/scan?mint=${report.mint}`);
                    alert('Blink URL copied to clipboard!');
                  }
                }}
                className="px-3 py-1 bg-cyber-neon/10 hover:bg-cyber-neon/20 border border-cyber-neon/30 text-cyber-neon rounded transition-colors whitespace-nowrap"
              >
                Copy Blink
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-cyber-border pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-cyber-subtle font-mono gap-4">
        <div>GuardRail Protocol © 2026 | Built for Colosseum Crypto World&apos;s Fair & SolanaCZE</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-cyber-neon" /> Zero Data Leakage</span>
          <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-cyber-neon" /> 100% Non-Custodial</span>
        </div>
      </footer>
    </main>
  );
}
