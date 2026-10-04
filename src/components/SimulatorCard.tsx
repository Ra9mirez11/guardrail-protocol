import React, { useState } from 'react';
import { Terminal, Loader2, PlayCircle, ShieldCheck } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { SimulationResult } from '@/lib/types';

export function SimulatorCard({ simulation, mint }: { simulation?: SimulationResult; mint?: string }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simComplete, setSimComplete] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimComplete(true);
    }, 900);
  };

  const targetMint = mint || 'CKbatsPMUf8SkiURsDXs7eK6GWb4Jsd5UDbs7twMCWxo';
  const shortMint = targetMint.slice(0, 6) + '...' + targetMint.slice(-6);

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
          <span className={'text-[10px] font-mono px-2 py-0.5 rounded-full border ' + (simulation?.canExecuteSell ? 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30' : 'bg-rose-400/10 text-rose-300 border-rose-400/30')}>
            {simulation?.canExecuteSell ? 'SELL_ROUTE EXECUTIB\E' : 'EXECUTIRN BLOCKED'}
          </span>
        </div>

        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] font-mono text-[11px]">
          <span className="text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>SIMULATED TARGET MINT</span>
          </span>
          <span className="text-emerald-300 font-bold">
            {shortMint}
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Pre-flight swap simulation executed for <span className="text-white font-mono font-bold">{shortMint}</span> without risking funds:
        </p>


        <div className="p-3 rounded-xl bg-black/70 border border-white/[0.06] font-mono text-[11px] space-y-1.5 min-h-[110px]">
          <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/[0.06] pb-1 mb-1">
            <span>SOLANA DIRECT RUNTIME LOG</span>
            <span>COMPUTE UNITS: {simulation?.unitsConsumed || 2150}</span>
          </div>
          {isSimulating ? (
            <div className="text-cyan-400 flex items-center gap-2 py-4 justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Simulating route for {shortMint}...</span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-cyan-300/80">
                {'//0 ExecuteSwap on mint: ' + shortMint}
              </div>
              {simulation?.logs && simulation.logs.map((log, index) => (
                <div key={index} className={log.includes('failed') || log.includes('rejected') ? 'text-rose-400' : 'text-slate-300'}>
                  {'> ' + log}
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
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-extrabold text-xs font-mono tracking-wider flex items-center justify-between gap-2 transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] active:scale-98 disabled:opacity-50"
        >
          <PlayCircle className="w-4 h-4 text-black mr-2" />
          <span>{isSimulating ? 'SIMULATING TOLEN SWAP ROUTE...' : simComplete ? 'RE-RUN SWAP SIMULATION' : 'SIMULATE ZERO-RISK DUMMY SWAP'}</span>
        </button>
      </div>
    </TiltCard>
  );
}
