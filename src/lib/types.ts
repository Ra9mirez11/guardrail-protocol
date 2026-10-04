export type RiskLevel = 'SAFE' | 'WARNING' | 'DANGER' | 'CRITICAL';

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
  logs: string[];
  unitsConsumed: number;
  detectedRevertReason: string | null;
  isHoneypotSuspect: boolean;
}

export interface SecurityAuditReport {
  mint: string;
  tokenProgram: string;
  tokenStandard: 'SPL-Token' | 'Token-2022';
  analyzedAt: number;
  riskScore: number; // 0 (safest) to 100 (critical honeypot/scam)
  riskLevel: RiskLevel;
  verdict: string;
  standard: StandardSecurityAnalysis;
  extensions: TokenExtensionAnalysis;
  simulation: SimulationResult;
  flags: {
    title: string;
    description: string;
    severity: RiskLevel;
  }[];
}
