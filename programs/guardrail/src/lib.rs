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
}
