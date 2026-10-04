import React from 'react';
import { FileCode } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';
import { RawTlvInspection } from '@/lib/types';

export function ForensicTlvCard({ tlv }: { tlv?: RawTlvInspection }) {
  return (
    <TiltCard className="bg-[#070912]/80 backdrop-blur-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
            Decompiled TLV Extension Bytes
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/30">
          {(tlv?.rawAccountBytesLength || 82)} BYTES ON-CHAIN
        </span>
      </div>
      <p className="text-xs text-slate-400">
        Raw SPL / Token-2022 TLV byte headers decompiled directly from mainnet storage:
      </p>
      <div className="p-3 rounded-xl bg-black/70 border border-white/[0.06] font-mono text-[11px] text-slate-400 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/[0.06] pb-1">
          <span>OFFSET [0x00 - 0x80]</span>
          <span>HEX PAYLOAD</span>
        </div>
        <p className="break-all text-emerald-400/80 leading-relaxed font-mono">
          {tlv?.tlvDataHex || '0000000000000000'}
        </p>
      </div>
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
          Parsed Extensions ({tlv?.extensionCount || 0}):
        </span>
        {tlv?.extensionsParsed && tlv.extensionsParsed.length > 0 ? (
          <div className="space-y-1.5">
            {tlv.extensionsParsed.map((ext, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs font-mono">
                <span className="text-emerald-300 font-bold">{ext.typeName}</span>
                <span className="text-slate-400 text-[11px]">{ext.details}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs font-mono text-slate-400 text-center">
            Standard SPL Token (No extra TLV extensions declared)
          </div>
        )}
      </div>
    </TiltCard>
  );
}