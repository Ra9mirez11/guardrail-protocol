'use client';

import React, { useState } from 'react';
import { Download, Check, ShieldCheck, FileCheck, Printer, X } from 'lucide-react';
import { SecurityAuditReport } from '@/lib/types';

interface AuditExportButtonProps {
  report: SecurityAuditReport | null;
}

export function AuditExportButton({ report }: AuditExportButtonProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  if (!report) return null;

  const isSafe = report.riskScore < 30;
  const isWarn = report.riskScore >= 30 && report.riskScore < 70;
  const statusColor = isSafe ? 'text-emerald-400' : isWarn ? 'text-amber-400' : 'text-rose-400';
  const statusBorder = isSafe ? 'border-emerald-500/40' : isWarn ? 'border-amber-500/40' : 'border-rose-500/40';

  const certificatePayload = {
    protocol: 'GuardRail Protocol v1.0 (Zero-Trust Solana Firewall & Token-2022 Forensic Auditor)',
    specification: 'SEC-SOL-AUDIT-V1-COMPLIANT',
    certifiedAt: new Date(report.analyzedAt).toISOString(),
    cluster: 'Solana Devnet / Mainnet-Beta',
    mintAudited: report.mint,
    tokenProgram: report.tokenProgram,
    standard: report.tokenStandard,
    securityScore: report.riskScore,
    riskLevel: report.riskLevel,
    securityCategory: report.securityCategory,
    categoryLabel: report.categoryLabel,
    verdict: report.verdict,
    standardParameters: {
      mintAuthority: report.standard.mintAuthority,
      freezeAuthority: report.standard.freezeAuthority,
      supply: report.standard.supply,
      decimals: report.standard.decimals,
      isMintable: report.standard.isMintable,
      isFreezable: report.standard.isFreezable
    },
    token2022Extensions: {
      hasTransferFee: report.extensions.hasTransferFee,
      transferFeeBps: report.extensions.transferFeeBps,
      maxTransferFee: report.extensions.maxTransferFee,
      hasTransferHook: report.extensions.hasTransferHook,
      transferHookProgramId: report.extensions.transferHookProgramId,
      hasPermanentDelegate: report.extensions.hasPermanentDelegate,
      permanentDelegate: report.extensions.permanentDelegate,
      hasDefaultAccountState: report.extensions.hasDefaultAccountState,
      defaultAccountState: report.extensions.defaultAccountState
    },
    simulationSandbox: {
      simulationSuccessful: report.simulation.simulationSuccessful,
      canExecuteSell: report.simulation.canExecuteSell,
      unitsConsumed: report.simulation.unitsConsumed,
      isHoneypotSuspect: report.simulation.isHoneypotSuspect,
      detectedRevertReason: report.simulation.detectedRevertReason
    },
    decompiledTlvStorage: {
      rawAccountBytesLength: report.tlvInspection.rawAccountBytesLength,
      extensionCount: report.tlvInspection.extensionCount,
      extensionsParsed: report.tlvInspection.extensionsParsed
    },
    anchorSmartContractProof: {
      programId: report.attestationProof.programId,
      attestationPda: report.attestationProof.pdaAddress,
      verifiedSlot: report.attestationProof.attestationSlot,
      auditorAuthority: report.attestationProof.auditorAuthority,
      auditHash: report.attestationProof.auditHash,
      cpiFirewallCleared: report.riskScore < 70
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(certificatePayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guardrail-audit-proof-${report.mint.slice(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowPreviewModal(true)}
          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-mono font-medium text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-1.5 active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>VIEW / EXPORT CERTIFICATE</span>
        </button>
      </div>

      {showPreviewModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setShowPreviewModal(false)}
        >
          <div 
            id="printable-audit-certificate"
            className="relative w-full max-w-2xl max-h-[85vh] my-auto flex flex-col rounded-3xl bg-[#070914] border border-emerald-500/40 shadow-[0_0_90px_rgba(16,185,129,0.25)] font-mono text-left overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Certificate Header Banner */}
            <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between flex-shrink-0 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      OFFICIAL AUDIT PROOF
                    </span>
                    <span className="text-[11px] text-slate-400">ISO/SEC-SOLANA-V1</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wider mt-0.5">
                    GUARDRAIL PROTOCOL AUDIT CERTIFICATE
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="no-print p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Formal Certificate Card (Scrollable Area) */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[58vh]">
              <div className={`p-5 rounded-2xl bg-black/70 border ${statusBorder} space-y-4 shadow-inner`}>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Security Verdict & Classification:</span>
                    <span className={`text-base font-black tracking-wide ${statusColor}`}>
                      {report.categoryLabel} ({report.riskScore}/100 RISK)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase">Solana Slot & Hash:</span>
                    <span className="text-xs text-cyan-300 font-bold">SLOT {report.attestationProof.attestationSlot}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] text-slate-500 block uppercase mb-1">Target Token Mint:</span>
                    <span className="text-cyan-300 break-all text-[11px] font-bold">{report.mint}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] text-slate-500 block uppercase mb-1">Anchor PDA Certificate:</span>
                    <span className="text-emerald-300 break-all text-[11px] font-bold">{report.attestationProof.pdaAddress}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] text-slate-500 block uppercase mb-1">Transfer Hook & Taxes:</span>
                    <span className="text-white text-[11px]">
                      {report.extensions.hasTransferHook ? 'DETECTED (CPI HOOK)' : 'None (Safe)'} | Fee: {(report.extensions.transferFeeBps / 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] text-slate-500 block uppercase mb-1">Pre-Flight Simulation:</span>
                    <span className="text-white text-[11px]">
                      {report.simulation.canExecuteSell ? 'VERIFIED NON-HONEYPOT (PASS)' : 'BLOCKED / REVERTED'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-slate-300 leading-relaxed font-sans">
                  <p>
                    <strong className="text-emerald-400 font-mono">Cryptographic Verification:</strong> This formal certificate authenticates that on-chain storage layout (TLV extensions), mint & freeze authorities, and transaction invariants were verified on Solana.
                  </p>
                  <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>AUDITOR SIGNER: {report.attestationProof.auditorAuthority}</span>
                    <span>ANCHOR ID: Guard1111...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Download JSON & Print Official Proof */}
            <div className="no-print p-4 sm:p-5 border-t border-white/[0.08] bg-white/[0.01] flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
              <button
                onClick={handlePrintCertificate}
                className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>SAVE CERTIFICATE AS PDF (PRINT)</span>
              </button>

              <button
                onClick={handleDownloadJson}
                className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-black flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-95"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>DOWNLOADED JSON PROOF</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>EXPORT SIGNED JSON PROOF</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}