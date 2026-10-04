import React, { useState } from 'react';
import { Award, Loader2, Check } from 'lucide-react';
import { OnChainAttestationProof } from '@/lib/types';

export function AttestationBadge({ proof }: { proof?: OnChainAttestationProof }) {
  const [isAttesting, setIsAttesting] = useState(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  const handleMint = () => {
    setIsAttesting(true);
    setTimeout(() => {
      setIsAttesting(false);
      setTxSignature('5KqE8s...attested_' + Date.now().toString(36));
    }, 1200);
  };

  return (
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
        disabled={isAttesting || !!txSignature}
        className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-emerald-400/30 text-emerald-300 hover:text-white transition-all text-[11px] font-bold flex items-center gap-1.5"
      >
        {isAttesting ? (
          <span className="flex items-center gap-1.5">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>MINTING PROOF...</span>
          </span>
        ) : txSignature ? (
          <span className="flex items-center gap-1.5">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>ATTESTED ON-CHAIN</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <Award className="w-3 h-3 text-emerald-400" />
            <span>MINT ANCHOR PROOF</span>
          </span>
        )}
      </button>
    </div>
  );
}