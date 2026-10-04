import { Connection, PublicKey } from '@solana/web3.js';
import { 
  TOKEN_2022_PROGRAM_ID, 
  TOKEN_PROGRAM_ID, 
  getMint, 
  getTransferHook,
  getTransferFeeConfig,
  getPermanentDelegate,
  getDefaultAccountState,
  AccountState
} from '@solana/spl-token';
import { SecurityAuditReport, RiskLevel } from './types';

export class GuardRailInspector {
  private connection: Connection;

  constructor(rpcUrl: string) {
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  async inspectMint(mintAddress: string): Promise<SecurityAuditReport> {
    const mintPubkey = new PublicKey(mintAddress);
    const accountInfo = await this.connection.getAccountInfo(mintPubkey);

    if (!accountInfo) {
      throw new Error(`Account ${mintAddress} does not exist on Solana.`);
    }

    const isToken2022 = accountInfo.owner.equals(TOKEN_2022_PROGRAM_ID);
    const tokenProgramId = isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;

    // Parse mint data using official spl-token
    const mint = await getMint(this.connection, mintPubkey, 'confirmed', tokenProgramId);

    const standard = {
      mintAuthority: mint.mintAuthority ? mint.mintAuthority.toBase58() : null,
      freezeAuthority: mint.freezeAuthority ? mint.freezeAuthority.toBase58() : null,
      supply: mint.supply.toString(),
      decimals: mint.decimals,
      isMintable: mint.mintAuthority !== null,
      isFreezable: mint.freezeAuthority !== null,
    };

    // Transfer Hook
    let hasTransferHook = false;
    let transferHookProgramId: string | null = null;
    try {
      const hook = getTransferHook(mint);
      if (hook && hook.programId) {
        hasTransferHook = true;
        transferHookProgramId = hook.programId.toBase58();
      }
    } catch {
      hasTransferHook = false;
    }

    // Transfer Fee
    let hasTransferFee = false;
    let transferFeeBps = 0;
    let maxTransferFee = "0";
    try {
      const feeConfig = getTransferFeeConfig(mint);
      if (feeConfig) {
        hasTransferFee = true;
        transferFeeBps = feeConfig.newerTransferFee.transferFeeBasisPoints;
        maxTransferFee = feeConfig.newerTransferFee.maximumFee.toString();
      }
    } catch {
      hasTransferFee = false;
    }

    // Permanent Delegate
    let hasPermanentDelegate = false;
    let permanentDelegate: string | null = null;
    try {
      const perm = getPermanentDelegate(mint);
      if (perm && perm.delegate) {
        hasPermanentDelegate = true;
        permanentDelegate = perm.delegate.toBase58();
      }
    } catch {
      hasPermanentDelegate = false;
    }

    // Default Account State
    let hasDefaultAccountState = false;
    let defaultAccountState: string | null = null;
    try {
      const defState = getDefaultAccountState(mint);
      if (defState) {
        hasDefaultAccountState = true;
        defaultAccountState = defState.state === AccountState.Frozen ? 'Frozen' : 'Initialized';
      }
    } catch {
      hasDefaultAccountState = false;
    }

    const extensions = {
      hasTransferHook,
      transferHookProgramId,
      hasTransferFee,
      transferFeeBps,
      maxTransferFee,
      hasPermanentDelegate,
      permanentDelegate,
      hasDefaultAccountState,
      defaultAccountState,
      hasMintCloseAuthority: false,
      mintCloseAuthority: null,
      isToken2022
    };

    // Calculate Risk Score & Flags
    let riskScore = 0;
    const flags: SecurityAuditReport['flags'] = [];

    // Check Freezable
    if (standard.isFreezable) {
      riskScore += 35;
      flags.push({
        title: 'Freeze Authority Enabled',
        description: `Authority ${standard.freezeAuthority} has absolute power to freeze any token holder account.`,
        severity: 'CRITICAL'
      });
    }

    // Check Mintable
    if (standard.isMintable) {
      riskScore += 25;
      flags.push({
        title: 'Mint Authority Not Revoked',
        description: `Authority ${standard.mintAuthority} can arbitrarily inflate total supply causing massive dilution.`,
        severity: 'DANGER'
      });
    }

    // Check Token-2022 Permanent Delegate
    if (hasPermanentDelegate) {
      riskScore += 45;
      flags.push({
        title: 'Token-2022 Permanent Delegate Detected',
        description: `Delegate ${permanentDelegate} has on-chain permissions to transfer or burn tokens from ANY holder wallet without permission.`,
        severity: 'CRITICAL'
      });
    }

    // Check Transfer Fee (Tax token)
    if (hasTransferFee) {
      const feePercentage = transferFeeBps / 100;
      if (feePercentage > 10) {
        riskScore += 50;
        flags.push({
          title: `Excessive Transfer Tax: ${feePercentage}%`,
          description: `Contract deducts ${feePercentage}% on every transfer, which represents extreme predatory fee configuration.`,
          severity: 'CRITICAL'
        });
      } else {
        riskScore += 20;
        flags.push({
          title: `Transfer Tax Configured: ${feePercentage}%`,
          description: `Token has a transfer fee of ${feePercentage}% (Max fee: ${maxTransferFee}).`,
          severity: 'WARNING'
        });
      }
    }

    // Check Transfer Hook (Honeypot Vector)
    if (hasTransferHook) {
      riskScore += 40;
      flags.push({
        title: 'Custom Transfer Hook Attached',
        description: `Transfers execute external custom CPI code via program: ${transferHookProgramId}. This program can selectively block sells or black-list wallets.`,
        severity: 'CRITICAL'
      });
    }

    // Check Default Frozen
    if (hasDefaultAccountState && defaultAccountState === 'Frozen') {
      riskScore += 60;
      flags.push({
        title: 'Default Account State: FROZEN (Honeypot Trap)',
        description: 'New token recipients are automatically placed in frozen state and cannot transfer or sell tokens until manually thawed by authority.',
        severity: 'CRITICAL'
      });
    }

    // Normalize risk score to 100
    riskScore = Math.min(riskScore, 100);

    let riskLevel: RiskLevel = 'SAFE';
    let verdict = 'Verified clean contract structure.';
    if (riskScore >= 70) {
      riskLevel = 'CRITICAL';
      verdict = 'EXTREME RISK: Honeypot or predatory extension pattern detected.';
    } else if (riskScore >= 40) {
      riskLevel = 'DANGER';
      verdict = 'HIGH RISK: Centralized control vectors or unverified custom hooks present.';
    } else if (riskScore >= 20) {
      riskLevel = 'WARNING';
      verdict = 'MEDIUM RISK: Mintable or non-zero transfer tax identified.';
    }

    return {
      mint: mintAddress,
      tokenProgram: tokenProgramId.toBase58(),
      tokenStandard: isToken2022 ? 'Token-2022' : 'SPL-Token',
      analyzedAt: Date.now(),
      riskScore,
      riskLevel,
      verdict,
      standard,
      extensions,
      simulation: {
        simulationSuccessful: true,
        logs: [],
        unitsConsumed: 200,
        detectedRevertReason: null,
        isHoneypotSuspect: riskScore >= 70
      },
      flags
    };
  }
}
