'use client';
import React from 'react';
import { TrackedToken } from '@/lib/tokenDirectory';

export const MarqueeTicker = ({
  tokens,
  selectedMint,
  onSelectToken,
}: {
  tokens: TrackedToken[];
  selectedMint: string;
  onSelectToken: (mint: string) => void;
}) => {
  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] py-1">
      <div className="flex w-max gap-3 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {/* Render twice for infinite seamless loop */}
        {[...tokens, ...tokens].map((token, idx) => {
          const isSelected = selectedMint === token.mint;
          return (
            <div
              key={`${token.mint}-${idx}`}
              onClick={() => onSelectToken(token.mint)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl border transition-all flex items-center gap-3 select-none ${
                isSelected
                  ? 'bg-emerald-500/15 border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-[#080b12]/80 border-white/[0.08] hover:border-emerald-400/40 hover:bg-[#0c101a]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-xs text-white">{token.symbol}</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-black/60 text-slate-400 border border-white/[0.06]">
                  {token.standard}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="text-slate-300">{token.price}</span>
                <span className={`text-[10px] font-semibold ${token.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {token.change24h}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
