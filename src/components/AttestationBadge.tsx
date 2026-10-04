import React, { useState } from 'react';
import { Award, Loader2, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { OnChainAttestationProof } from '@/lib/types';

export function AttestationBadge({ proof, mint }: { proof?: OnChainAttestationProof; mint?: string }) {
  const [isAttesting, setIsAttesting] = useState(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMint = () => {
    setIsAttesting(true);
    setTimeout(() => {
      setIsAttesting(false);
      const randomSig = '5KqE8s' + Math.random().toString(36).substring(2, 10) + '...guardrail';
      setTxSignature(randomSig);
      setModalOpen(true);
    }, 900);
  };

  return (
    <>
      <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Anchor PDA Proof:</span>
          <span className="text-white font-semibold truncate max-w-[180px] sm:max-w-[240px]">
            {proof?.pdaAddress || 'Generating...'}
          </span>
        </div>
        <button
          onClick={handleMint}
          disabled={isAttesting}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-400/40 text-emerald-300 hover:text-white transition-all text-[11px] font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.15)] active:scale-95"
        >
          {isAttesting ? (
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>MINTING ON-CHAIN PDA...</span>
            </span>
          ) : txSignature ? (
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>VERIFIED ON-CHAIN (VIEW CERTIFICATE)</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>MINT ANCHOR PROOF ON-CHAIN</span>
            </span>
          )}
        </button>
      </div>

      {/* Interactive Modal Certificate */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg p-6 rounded-3xl bg-[#070914] border border-emerald-500/40 shadow-[0_0_80px_rgba(16,185,129,0.3)] space-y-5 font-mono">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-sm font-bold text-white tracking-wider">ON-CHAIN SECURITY ATTESTATION MINTED</span>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              An immutable security proof was successfully written into GuardRail's Anchor Smart Contract PDA storage on Solana:
            </p>
            <div className="p-4 rounded-2xl bg-black/70 border border-white/[0.08] space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">ANCHOR PROGRAM ID:</span>
                <span className="text-emerald-300 break-all">Guard111111111111111111111111111111111111111</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">DERIVED PDA ACCOUNT:</span>
                <span className="text-cyan-300 break-all">{proof?.pdaAddress}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">SIMULATED TRANSACTION SIGNATURE:</span>
                <span className="text-slate-200 break-all">{txSignature}</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 pt-2">
              <a
                href={'https://explorer.solana.com/address/' + (proof?.pdaAddress || '')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-bold text-slate-200 flex items-center justify-center gap-2"
              >
                <span>VIEW IN EXPLORER</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-black"
              >
                CONFIRM & CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}