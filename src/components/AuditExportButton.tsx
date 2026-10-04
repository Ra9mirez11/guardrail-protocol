'use client';

import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { SecurityAuditReport } from '@/lib/types';

interface AuditExportButtonProps {
  report: SecurityAuditReport | null;
}

export function AuditExportButton({ report }: AuditExportButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  if (!report) return null;

  const handleExportProof = () => {
    const certificatePayload = {
      protocol: 'GuardRail Protocol v1.0 (Zero-Trust Solana Firewall)',
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

    const blob = new Blob([JSON.stringify(certificatePayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guardrail-audit-proof-' + report.mint.slice(0, 8) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <button
      onClick={handleExportProof}
      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-mono font-medium text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-1.5 active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
      title="Download verifiable JSON cryptographic audit certificate"
    >
      {downloaded ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>PROOF DOWNLOADED</span>
        </>
      ) : (
        <>
          <Download className="w-3.5 h-3.5" />
          <span>EXPORT AUDIT PROOF</span>
        </>
      )}
    </button>
  );
}