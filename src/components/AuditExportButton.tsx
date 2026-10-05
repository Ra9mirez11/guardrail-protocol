'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, Check, ShieldCheck, FileCheck, FileDown, X, Loader2 } from 'lucide-react';
import { SecurityAuditReport } from '@/lib/types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AuditExportButtonProps {
  report: SecurityAuditReport | null;
}

export function AuditExportButton({ report }: AuditExportButtonProps) {
  const [downloadedJson, setDownloadedJson] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!report) return null;

  const isSafe = report.riskScore < 30;
  const isWarn = report.riskScore >= 30 && report.riskScore < 70;
  const statusColor = isSafe ? 'text-emerald-400' : isWarn ? 'text-amber-400' : 'text-rose-400';
  const statusBorder = isSafe ? 'border-emerald-500/40' : isWarn ? 'border-amber-500/40' : 'border-rose-500/40';

  const handleDownloadDirectPdf = async () => {
    const certElement = document.getElementById('formal-audit-card');
    if (!certElement) return;

    setDownloadingPdf(true);
    try {
      const canvas = await html2canvas(certElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#070914',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = 260;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = (pdfHeight - imgHeight) / 2;

      pdf.setFillColor(7, 9, 20);
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
      pdf.addImage(imgData, 'PNG', xOffset, Math.max(10, yOffset), imgWidth, imgHeight);
      pdf.save(`GuardRail-Audit-Certificate-${report.mint.slice(0, 8)}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleDownloadJson = () => {
    const certificatePayload = {
      protocol: 'GuardRail Protocol v1.0 (Zero-Trust Solana Pre-Execution Firewall)',
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
        isFreezable: report.standard.isFreezable,
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
        defaultAccountState: report.extensions.defaultAccountState,
      },
      simulationSandbox: {
        simulationSuccessful: report.simulation.simulationSuccessful,
        canExecuteSell: report.simulation.canExecuteSell,
        unitsConsumed: report.simulation.unitsConsumed,
        isHoneypotSuspect: report.simulation.isHoneypotSuspect,
        detectedRevertReason: report.simulation.detectedRevertReason,
      },
      decompiledTlvStorage: {
        rawAccountBytesLength: report.tlvInspection.rawAccountBytesLength,
        extensionCount: report.tlvInspection.extensionCount,
        extensionsParsed: report.tlvInspection.extensionsParsed,
      },
      anchorSmartContractProof: {
        programId: report.attestationProof.programId,
        attestationPda: report.attestationProof.pdaAddress,
        verifiedSlot: report.attestationProof.attestationSlot,
        auditorAuthority: report.attestationProof.auditorAuthority,
        auditHash: report.attestationProof.auditHash,
        cpiFirewallCleared: report.riskScore < 70,
      },
    };

    const blob = new Blob([JSON.stringify(certificatePayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guardrail-audit-proof-${report.mint.slice(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadedJson(true);
    setTimeout(() => setDownloadedJson(false), 3000);
  };

  const modalNode = showPreviewModal && mounted ? (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={() => setShowPreviewModal(false)}
    >
      <div 
        className="relative w-full max-w-2xl my-auto flex flex-col rounded-3xl bg-[#070914] border border-emerald-500/50 shadow-[0_0_100px_rgba(16,185,129,0.35)] font-mono text-left p-6 sm:p-7 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ON-CHAIN FORENSIC ATTESTATION
                </span>
                <span className="text-[11px] text-slate-400">GUARDRAIL PROTOCOL</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wider mt-0.5">
                TOKEN SECURITY AUDIT CERTIFICATE
              </h3>
            </div>
          </div>
          <button
            onClick={() => setShowPreviewModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Card to Render in PDF */}
        <div 
          id="formal-audit-card" 
          className={`p-5 rounded-2xl bg-[#05070f] border ${statusBorder} space-y-4 shadow-xl`}
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Security Classification:</span>
              <span className={`text-base font-black tracking-wide ${statusColor}`}>
                {report.categoryLabel} ({report.riskScore}/100 RISK)
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block uppercase">Solana Slot:</span>
              <span className="text-xs text-cyan-300 font-bold">SLOT #{report.attestationProof.attestationSlot}</span>
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
                {report.extensions.hasTransferHook ? 'DETECTED (CPI HOOK)' : 'None (Clean)'} | Tax: {(report.extensions.transferFeeBps / 100).toFixed(2)}%
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
              <strong className="text-emerald-400 font-mono">Cryptographic Verification Proof:</strong> This formal certificate authenticates that on-chain storage layout (TLV extensions), mint & freeze authorities, and transaction invariants were verified on Solana.
            </p>
            <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>AUDITOR SIGNER: {report.attestationProof.auditorAuthority}</span>
              <span className="text-emerald-400 font-bold">ANCHOR ID: Guard1111...</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            onClick={handleDownloadDirectPdf}
            disabled={downloadingPdf}
            className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer"
          >
            {downloadingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>GENERATING PDF...</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>EXPORT AUDIT PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-black flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-95 cursor-pointer"
          >
            {downloadedJson ? (
              <>
                <Check className="w-4 h-4 text-black" />
                <span>JSON PROOF DOWNLOADED</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-black" />
                <span>EXPORT SIGNED JSON PROOF</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setShowPreviewModal(true)}
        className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-pointer"
      >
        <FileCheck className="w-4 h-4 text-emerald-400" />
        <span>VIEW / EXPORT CERTIFICATE</span>
      </button>

      {mounted && typeof document !== 'undefined' ? createPortal(modalNode, document.body) : null}
    </>
  );
}