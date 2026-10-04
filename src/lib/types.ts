export type RiskLevel = 'SAFE' | 'WARNING' | 'DANGER' | 'CRITICAL';
export type SecurityCategory = 'VERIFIED_SECURE' | 'INSTITUTIONAL_STABLE' | 'CENTRALIZED_GOVERNANCE' | 'TAX_WARNING' | 'HONEYPOT_RISK';

export interface TokenExtensionAnalysis {
  hasTransferHook: boolean;
  transferHookProgramId: string | null;
  hasTransferFee: boolean;
  transferFeeBps: number;
  maxTransferFee: string;
  hasPermanentDelegate: boolean;
  permanentDelegate: string | null;
  hasDefaultAccountState: boolean;
  defaultAccountState: string | null; // e.g. "Frozen"
  hasMintCloseAuthority: boolean;
  mintCloseAuthority: string | null;
  isToken2022: boolean;
}

export interface StandardSecurityAnalysis {
  mintAuthority: string | null;
  freezeAuthority: string | null;
  supply: string;
  decimals: number;
  isMintable: boolean;
  isFreezable: boolean;
}

export interface SimulationResult {
  simulationSuccessful: boolean;
  canExecuteSell: boolean;
  expectedOutputLamports: number;
  unitsConsumed: number;
  logs: string[];
  detectedRevertReason: string | null;
  isHoneypotSuspect: boolean;
  simulatedAt: number;
}

export interface RawTlvInspection {
  rawAccountBytesLength: number;
  tlvDataHex: string;
  extensionCount: number;
  extensionsParsed: {
    typeId: number;
    typeName: string;
    byteLength: number;
    details: string;
  }[];
}

export interface OnChainAttestationProof {
  pdaAddress: string;
  programId: string;
  auditorAuthority: string;
  attestationSlot: number;
  auditHash: string;
  isAttestedOnChain: boolean;
  txSignature?: string;
}

export interface SecurityAuditReport {
  mint: string;
  tokenProgram: string;
  tokenStandard: 'SPL-Token' | 'Token-2022';
  analyzedAt: number;
  riskScore: number; // 0 (safest) to 100 (critical honeypot/scam)
  riskLevel: RiskLevel;
  securityCategory: SecurityCategory;
  categoryLabel: string;
  verdict: string;
  standard: StandardSecurityAnalysis;
  extensions: TokenExtensionAnalysis;
  simulation: SimulationResult;
  tlvInspection: RawTlvInspection;
  attestationProof: OnChainAttestationProof;
  flags: {
    title: string;
    description: string;
    severity: RiskLevel;
  }[];
}
