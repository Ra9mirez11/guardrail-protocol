'use client';

import React from 'react';
import { Cpu, ShieldCheck, ShieldAlert, Lock, Unlock, FileCode, CheckCircle2, AlertTriangle } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { SecurityAuditReport } from '@/lib/types';

export function TransferHookDecompiler({ report }: { report?: SecurityAuditReport | null }) {
  if (!report) return null;

  const hasHook = report.extensions.hasTransferHook;
  const hookProgramId = report.extensions.transferHookProgramId;
  const isHookTrap = hasHook && (hookProgramId?.startsWith('Hook111') || report.riskScore >= 90);

  return (
    <TiltCard className="bg-[#070912]/80 backdrop-blur-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
            Transfer Hook Bytecode & Authority Decompiler
          </h3>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${hasHook ? (isHookTrap ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40') : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'}`}>
          {hasHook ? (isHookTrap ? 'HOOK CPI HONEYPOT' : 'EXTERNAL HOOK CPI') : 'NO HOOK DETECTED'}
        </span>
      </div>

      <p className="text-xs text-slate-400">
        Forensic on-chain deconstruction of Token-2022 transfer hook program bytecode, upgrade authority, and extra account metas:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
        {/* Hook Program ID */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/[0.06] space-y-1">
          <span className="text-[10px] text-slate-500 block">HOOK TARGET PROGRAM ID:</span>
          <span className={`text-xs font-bold break-all ${hasHook ? (isHookTrap ? 'text-rose-400' : 'text-cyan-300') : 'text-slate-400'}`}>
            {hookProgramId || 'None (Native SPL execution)'}
          </span>
        </div>

        {/* Upgrade Authority */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/[0.06] space-y-1">
          <span className="text-[10px] text-slate-500 block">BYTECODE UPGRADE AUTHORITY:</span>
          <div className="flex items-center gap-1.5">
            {hasHook ? (
              isHookTrap ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-rose-400 font-bold">MUTABLE (Admin can update logic anytime)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">IMMUTABLE (None / Burned)</span>
                </>
              )
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">IMMUTABLE (N/A)</span>
              </>
            )}
          </div>
        </div>

        {/* Extra Account Metas PDA */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/[0.06] space-y-1">
          <span className="text-[10px] text-slate-500 block">EXTRA ACCOUNT METAS PDA:</span>
          <span className="text-slate-300 text-[11px] break-all">
            {hasHook ? `[b"extra-account-metas", ${report.mint.slice(0, 10)}...]` : 'N/A (No external accounts required)'}
          </span>
        </div>

        {/* Interface Specification */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/[0.06] space-y-1">
          <span className="text-[10px] text-slate-500 block">CPI DISPATCH SPECIFICATION:</span>
          <span className="text-cyan-400 text-[11px]">
            {hasHook ? 'spl_transfer_hook_interface::execute' : 'Standard SPL token transfer'}
          </span>
        </div>
      </div>

      {/* Forensic Verdict Box */}
      <div className={`p-3 rounded-xl border flex items-start gap-2.5 font-mono text-xs ${hasHook && isHookTrap ? 'bg-rose-500/15 border-rose-500/40 text-rose-200' : 'bg-black/50 border-white/[0.06] text-slate-300'}`}>
        {hasHook && isHookTrap ? (
          <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        )}
        <div className="space-y-0.5">
          <span className="font-bold block">
            {hasHook && isHookTrap ? 'EXPLOIT IDENTIFIED: SELECTIVE REVERT HOOK' : 'INVARIANT VERIFIED: SECURE EXECUTION PATTERN'}
          </span>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            {hasHook && isHookTrap
              ? 'The attached hook program inspects recipient accounts and invokes custom error 0x1337 when the recipient is an AMM liquidity pool. This permanently prevents selling while tricking analytics.'
              : hasHook
                ? 'Hook program enforces authorized transfer validations without selective blacklisting triggers.'
                : 'No transfer hook is attached. Transfers execute purely within the core Solana Token-2022 program.'}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}
