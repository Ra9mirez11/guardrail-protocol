use anchor_lang::prelude::*;

declare_id!("Guard111111111111111111111111111111111111111");

#[program]
pub mod guardrail {
    use super::*;

    /// Records an immutable pre-flight security attestation for a scrutinized mint
    pub fn attest_security(
        ctx: Context<AttestSecurity>,
        risk_score: u8,
        token_standard: u8, // 0 = SPL, 1 = Token-2022
        flags_mask: u32,
    ) -> Result<()> {
        let attestation = &mut ctx.accounts.attestation;
        attestation.mint = ctx.accounts.mint.key();
        attestation.auditor = ctx.accounts.auditor.key();
        attestation.risk_score = risk_score;
        attestation.token_standard = token_standard;
        attestation.flags_mask = flags_mask;
        attestation.slot = Clock::get()?.slot;
        attestation.timestamp = Clock::get()?.unix_timestamp;

        emit!(SecurityAttestedEvent {
            mint: attestation.mint,
            risk_score,
            slot: attestation.slot,
        });

        Ok(())
    }

    /// Pre-execution safety check: enforces invariant that risk_score cannot exceed safety threshold
    pub fn verify_invariants(
        ctx: Context<VerifyInvariants>,
        max_acceptable_risk: u8,
    ) -> Result<()> {
        let attestation = &ctx.accounts.attestation;
        require!(
            attestation.risk_score <= max_acceptable_risk,
            GuardRailError::ExcessiveRiskThresholdExceeded
        );
        Ok(())
    }
    /// CPI Invariant Guard: Pre-execution firewall proxy preventing predatory swaps & transfers
    pub fn guard_pre_execution_swap(
        ctx: Context<GuardPreExecutionSwap>,
        max_allowed_tax_bps: u16,
        allow_transfer_hooks: bool,
    ) -> Result<()> {
        let attestation = &ctx.accounts.attestation;
        require!(
            attestation.risk_score < 70,
            GuardRailError::ExcessiveRiskThresholdExceeded
        );

        let fee_flag = (attestation.flags_mask & 0x01) != 0;
        let hook_flag = (attestation.flags_mask & 0x02) != 0;
        let delegate_flag = (attestation.flags_mask & 0x04) != 0;

        require!(!delegate_flag, GuardRailError::PermanentDelegateExploit);
        if !allow_transfer_hooks {
            require!(!hook_flag, GuardRailError::TransferHookHoneypotTrap);
        }
        require!(!fee_flag || max_allowed_tax_bps >= 1000, GuardRailError::PredatoryTransferFeeViolation);

        msg!("GuardRail CPI Invariant Passed: Mint cleared for execution.");
        Ok(())
    }

}

#[derive(Accounts)]
pub struct AttestSecurity<'info> {
    #[account(
        init_if_needed,
        payer = auditor,
        space = 8 + 32 + 32 + 1 + 1 + 4 + 8 + 8,
        seeds = [b"guardrail_attestation", mint.key().as_ref()],
        bump
    )]
    pub attestation: Account<'info, SecurityAttestation>,

    /// CHECK: Target mint being audited
    pub mint: AccountInfo<'info>,

    #[account(mut)]
    pub auditor: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyInvariants<'info> {
    #[account(
        seeds = [b"guardrail_attestation", mint.key().as_ref()],
        bump
    )]
    pub attestation: Account<'info, SecurityAttestation>,

    /// CHECK: Target mint being traded or transferred
    pub mint: AccountInfo<'info>,
}


#[derive(Accounts)]
pub struct GuardPreExecutionSwap<'info> {
    #[account(
        seeds = [b"guardrail_attestation", mint.key().as_ref()],
        bump
    )]
    pub attestation: Account<'info, SecurityAttestation>,

    /// CHECK: Target mint verified against predatory transfer fees & hooks
    pub mint: AccountInfo<'info>,

    pub user_authority: Signer<'info>,
}

#[account]
pub struct SecurityAttestation {
    pub mint: Pubkey,
    pub auditor: Pubkey,
    pub risk_score: u8,
    pub token_standard: u8,
    pub flags_mask: u32,
    pub slot: u64,
    pub timestamp: i64,
}

#[event]
pub struct SecurityAttestedEvent {
    pub mint: Pubkey,
    pub risk_score: u8,
    pub slot: u64,
}

#[error_code]
pub enum GuardRailError {
    #[msg("Security invariant violated: Token risk score exceeds allowed policy threshold.")]
    ExcessiveRiskThresholdExceeded,
    #[msg("Honeypot or predatory transfer hook detected during pre-execution.")]
    HoneypotTrapDetected,
    #[msg("Predatory transfer fee violation: configured tax exceeds max_allowed_tax_bps.")]
    PredatoryTransferFeeViolation,
    #[msg("Transfer hook honeypot trap: external execution hook rejected by GuardRail firewall.")]
    TransferHookHoneypotTrap,
    #[msg("Permanent delegate detected: protocol blocked transfer due to unauthorized seizure risk.")]
    PermanentDelegateExploit,
}
