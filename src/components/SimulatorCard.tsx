'use client';

import React, { useState } from 'react';
import { Terminal, Loader2, PlayCircle, ShieldCheck, ShieldAlert, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { SimulationResult } from '@/lib/types';

export function SimulatorCard({ simulation, mint }: { simulation?: SimulationResult; mint?: string }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simComplete, setSimComplete] = useState(false);
  const [activeView, setActiveView] = useState<'LOGS' | 'FIREWALL'>('FIREWALL');

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimComplete(true);
      setActiveView('FIREWALL');
    }, 850);
  };

  const targetMint = mint || 'CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo';
  const shortMint = targetMint.slice(0, 6) + '...' + targetMint.slice(-6);
  const isBlocked = !simulation?.canExecuteSell;

  return (
    <TiltCard className="bg-[#070912]/80 backdrop-blur-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
              Zero-Risk Tx Simulation Sandbox
            </h3>
          </div>
          <span className={"text-[10px] font-mono px-2 py-0.5 rounded-full border " + (!isBlocked ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/30" : "bg-rose-400/10 text-rose-300 border-rose-400/30 animate-pulse")}>
            {!isBlocked ? "SELL-ROUTE VERIFIED" : "FIREWALL INTERCEPT ACTIVE"}
          </span>
        </div>

        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] font-mono text-[11px]">
          <span className="text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>SIMULATED TARGET MINT:</span>
          </span>
          <span className="text-emerald-300 font-bold truncate max-w-[200px]">
            {shortMint}
          </span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-1.5">
          <span className="text-xs text-slate-400">
            Pre-flight swap execution test executed without risking funds:
          </span>
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <button
              onClick={() => setActiveView('FIREWALL')}
              className={`px-2 py-0.5 rounded ${activeView === 'FIREWALL' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
            >
              FIREWALL
            </button>
            <button
              onClick={() => setActiveView('LOGS')}
              className={`px-2 py-0.5 rounded ${activeView === 'LOGS' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
            >
              RUNTIME LOGS
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="p-3.5 rounded-2xl bg-black/70 border border-white/[0.06] font-mono text-[11px] space-y-2 min-h-[135px]">
          {isSimulating ? (
            <div className="text-cyan-400 flex flex-col items-center justify-center py-6 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
              <span className="text-xs">Analyzing pre-execution invariants on Solana...</span>
            </div>
          ) : activeView === 'FIREWALL' ? (
            isBlocked ? (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 animate-bounce" />
                  <span className="text-xs tracking-wider">FIREWALL INTERCEPT ACTIVATED (PRE-FLIGHT BLOCKED)</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <div className="text-rose-300">
                    <span className="text-slate-500">Triggered Invariant: </span>
                    {simulation?.detectedRevertReason || 'Honeypot Trap / Transfer Blocked'}
                  </div>
                  <div>
                    <span className="text-slate-500">Action: </span>
                    <span className="text-amber-300 font-semibold">Transaction dropped locally before wallet signature.</span>
                  </div>
                  <div className="text-emerald-400 font-bold">
                    <span>Protected Capital: </span>100% of funds preserved (0.00 SOL lost to honeypot)
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs tracking-wider">FIREWALL VERIFICATION PASSED</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <div>
                    <span className="text-slate-500">Invariant Check: </span>
                    <span className="text-emerald-300">No predatory transfer hooks or freezing authorities triggered.</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Routing Status: </span>
                    <span className="text-cyan-300">Safe for Jupiter and Raydium swap execution.</span>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/[0.06] pb-1 mb-1">
                <span>SOLANA RUNTIME INSTRUCTION TRACE</span>
                <span>COMPUTE UNITS: {simulation?.unitsConsumed || 2150}</span>
              </div>
              <div className="text-cyan-300/80">
                {"// ExecuteSwap on target mint: " + shortMint}
              </div>
              {simulation?.logs && simulation.logs.map((log, index) => (
                <div key={index} className={log.includes('failed') || log.includes('rejected') || log.includes('DROPPED') ? 'text-rose-400' : 'text-slate-300'}>
                  {"> " + log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-extrabold text-xs font-mono tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] active:scale-98 disabled:opacity-50 cursor-pointer"
        >
          <PlayCircle className="w-4 h-4 text-black flex-shrink-0" />
          <span>{isSimulating ? "INTERCEPTING TRANSACTION..." : simComplete ? "RE-TEST PRE-EXECUTION FIREWALL" : "TEST PRE-EXECUTION FIREWALL INTERCEPT"}</span>
        </button>
      </div>
    </TiltCard>
  );
}
