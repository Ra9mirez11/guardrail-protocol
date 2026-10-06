<div align="center">

# GuardRail Protocol
### Zero-Trust Pre-Execution Firewall, Honeypot Breaker & Token-2022 Forensic Auditor on Solana

[![Solana](https://img.shields.io/badge/Solana-Mainnet%20%7C%20Devnet-14F195?logo=solana&logoColor=white)](https://solana.com)
[![Anchor](https://img.shields.io/badge/Anchor-v0.30-3B82F6)](https://anchor-lang.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![Solana Actions](https://img.shields.io/badge/Solana%20Actions-Dialect%20Blinks-9945FF)](https://dial.to)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Track](https://img.shields.io/badge/Colosseum-Crypto%20World's%20Fair-purple)](https://colosseum.org)

**Built for Colosseum Crypto World's Fair & Superteam SolanaCZE Hackathon Track.**

[Live Application](https://guardrail-protocol.vercel.app) • [Developer Suite & Playground](#-developer-suite--live-api-playground) • [Solana Blinks](#-certified-solana-actions--blinks) • [Smart Contract Architecture](#-smart-contract-architecture) • [Security Threat Model](#-zero-trust-threat-model)

</div>

---

## Executive Summary

With the explosive ecosystem adoption of the **SPL Token-2022** standard, malicious actors deploy sophisticated, stealth honeypots and drain vectors that standard Solana wallets (Phantom, Solflare) and DEX interfaces fail to detect prior to transaction signature:

- **99% Hidden Transfer Fees (Taxes)** siphoned directly to fee collectors.
- **Predatory Transfer Hook CPIs** that execute external program bytecode on every trade, allowing arbitrary wallet blacklisting or selective sell reverts.
- **Permanent Delegate Confiscation** allowing central authorities to burn or seize token holder balances without approval.
- **Default Account Freezing** locking newly minted recipient accounts.

**GuardRail Protocol** provides an immutable, pre-execution security layer. It acts as an active **on-chain firewall, byte-level decompiler, and real-time transaction interceptor**, verifying contract invariants before downstream transactions occur.

---

## Core Features & Forensic Architecture

### 1. Active Anchor CPI Invariant Firewall (`programs/guardrail`)
An on-chain Anchor smart contract deployed on Solana Devnet. Protocols, DEX routers (Raydium, Orca), and trading bots can call `guard_pre_execution_swap` via Cross-Program Invocation (CPI) to atomically abort malicious transactions before funds are committed:
- Enforces strict `max_allowed_tax_bps` (e.g., max 500 BPS / 5.00%).
- Enforces `assert_no_transfer_hooks`.
- Blocks tokens utilizing active `PermanentDelegate` seizure keys.
- Records verifiable audit attestations in Program Derived Addresses (PDAs: `[b"guardrail_attestation", mint]`) with cryptographic hash proofs permanently linked to the Solana Devnet ledger.

### 2. Interactive Pre-Execution Firewall Interceptor Sandbox
Simulates swap execution against live Solana RPC nodes without risking funds:
- **Real-Time Intervention**: If an asset violates invariants (such as `Tax99` or `HookTrap`), the simulator executes headless CPI analysis and visually drops the transaction locally before wallet signature.
- **Capital Preservation Proof**: Demonstrates 100% loss prevention (0 SOL lost to honeypots).
- **Execution Log Inspector**: Displays runtime instruction traces and Compute Units consumed.

### 3. Transfer Hook Bytecode & Authority Decompiler
Deep-dive forensic disassembly of Token-2022 transfer hooks:
- **Target Program ID**: Identifies external program invoked on every transfer.
- **Bytecode Upgrade Authority Analysis**: Distinguishes between `IMMUTABLE (Burned)` contracts and `MUTABLE` authorities (where an admin can stealthily update logic to block trading post-launch).
- **CPI Dispatch Specification**: Verifies adherence to `spl_transfer_hook_interface::execute`.
- **Extra Account Metas PDA Mapping**: Traces dynamic account requirements.

### 4. Certified Solana Actions & Native Blinks (Blinks.xyz Standard)
- **Official Blinks Inspector Compliance**: Root `/actions.json` and `/api/actions/scan` implementation compliant with Solana Actions standard.
- **1-Click Audit in Social Feeds**: Enables instant preview and deep-invariant scans directly within Twitter/X feeds and Discord.
- **Native Inline Blink Card**: Interactive live card in the UI demonstrating exact Twitter and Phantom unrolling.
- **Official Validator Link**: One-click integration with Dialect Blinks (`dial.to`).

### 5. Developer Suite & Live cURL / API Playground
Integrated developer console inside the web application:
- **Interactive REST Testing**: Test `/api/scan?mint=<MINT>` live with real-time latency reporting (ms) and formatted JSON response inspection.
- **1-Click cURL Generator**: Ready-to-use cURL commands for backend bot integrations.
- **Multi-Language SDK Snippets**: Ready-made integration templates for CLI, TypeScript (Jupiter SDK), and Rust (Anchor CPI).

### 6. Live Exploit Vector Testbed (One-Click Honeypot Verification)
Pre-configured attack vectors ready for real-time demonstration:
- **TAX99 (`Tax99...`)**: 99.00% transfer fee extortion trap.
- **HOOKTRAP (`HookTrap...`)**: Blacklist transfer hook with `0x1337 (BlacklistRevert)` error.
- **DRAIN (`DrainMe...`)**: Permanent delegate custodial confiscation backdoor.

### 7. Cryptographic Proofs & High-Res PDF Audit Certificate
- Generates downloadable, verifiable **JSON Cryptographic Proofs** for CI/CD pipelines.
- Instant export to **formal landscape A4 PDF Audit Certificates** featuring the official GuardRail seal, Solana logo, attestation slot, and forensic breakdown.

---

## Smart Contract Architecture

```mermaid
flowchart TD
    User([User / Trader / Bot]) -->|1. Request Swap / Transfer| Firewall[GuardRail CPI Firewall Proxy]
    
    subgraph GuardRail Core Program
        Firewall -->|2. Verify PDA Attestation| InvariantCheck{Invariant Check}
        InvariantCheck -->|Fee > Max BPS| RevertFee[Abort: PredatoryTransferFeeViolation]
        InvariantCheck -->|Hostile Transfer Hook| RevertHook[Abort: TransferHookHoneypotTrap]
        InvariantCheck -->|Permanent Delegate| RevertDelegate[Abort: PermanentDelegateExploit]
        InvariantCheck -->|All Invariants Pass| Cleared[Clear For Downstream Execution]
    end

    Cleared -->|3. Route Atomic Trade| DEX[Raydium / Orca / Whirlpool CPI]
    DEX -->|4. Finalized Settlement| SolanaValidator[(Solana Validator Cluster)]
```

---

## Developer Integration SDK & CLI

### 1. Automated CI/CD Audit CLI
Add GuardRail security verification to your GitHub Actions or deployment pipeline:

```bash
npx guardrail-scan <TARGET_MINT> \
  --cluster devnet \
  --max-tax-bps 500 \
  --assert-no-transfer-hooks \
  --strict
```

### 2. Pre-Execution TypeScript Integration (Jupiter / Trading Bots)

```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { GuardRailInspector } from '@guardrail/firewall-sdk';

const inspector = new GuardRailInspector('https://api.devnet.solana.com');
const report = await inspector.inspectMint(targetMint);

if (report.isHoneypot || report.riskScore > 70) {
  throw new Error(`[GUARDRAIL FIREWALL] Transaction Aborted! Malicious Mint: ${report.classification}`);
}

// Mint is safe, proceed with atomic swap execution
await executeSwap(targetMint);
```

### 3. Anchor On-Chain CPI Invariant Verification (Rust)

```rust
// Invoke GuardRail CPI Proxy before routing trade on DEX
pub fn safe_swap(ctx: Context<SafeSwap>, max_tax_bps: u16) -> Result<()> {
    guardrail::cpi::guard_pre_execution_swap(
        CpiContext::new(ctx.accounts.guardrail_program.to_account_info(), GuardPreExecutionSwap {
            attestation: ctx.accounts.attestation.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
            user_authority: ctx.accounts.user.to_account_info(),
        }),
        max_tax_bps,
        false, // Disallow honeypot transfer hooks
    )?;

    // Safe to route to Raydium / Orca / Whirlpool CPI
    Ok(())
}
```

### 4. REST API Endpoint

```bash
curl -X GET "https://guardrail-protocol.vercel.app/api/scan?mint=CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo"
```

### 5. AI Agent Security Tool (Solana Agent Kit & ElizaOS)
Autonomous AI agents trading or interacting on Solana can enforce zero-trust pre-execution gating via standardized manifests:
- **OpenAPI 3.1 Schema**: `https://guardrail-protocol.vercel.app/openapi.json`
- **AI Plugin Manifest**: `https://guardrail-protocol.vercel.app/.well-known/ai-plugin.json`

### 6. Embeddable Dynamic Security Badge
Token creators and DeFi interfaces can embed verifiable, live-updating SVG security badges:

```markdown
[![GuardRail Security](https://guardrail-protocol.vercel.app/api/badge?mint=CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo)](https://guardrail-protocol.vercel.app)
```
Direct SVG Endpoint: `https://guardrail-protocol.vercel.app/api/badge?mint=<MINT_ADDRESS>`

---

## Solana Actions & Blinks Specification

GuardRail is certified for Solana Blinks via the official specification:

- **Actions Root Definition**: `https://guardrail-protocol.vercel.app/actions.json`
- **Actions Endpoint**: `https://guardrail-protocol.vercel.app/api/actions/scan`
- **Official Blinks Inspector (dial.to)**: `https://dial.to/?action=solana-action:https://guardrail-protocol.vercel.app/api/actions/scan?mint=CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo`

---

## Hackathon Submission Details

- **Project Name:** GuardRail Protocol
- **Track:** Colosseum Crypto World's Fair / Superteam SolanaCZE Hackathon (Security & Infrastructure)
- **Repository:** [https://github.com/Ra9mirez11/guardrail-protocol](https://github.com/Ra9mirez11/guardrail-protocol)
- **Live Demo:** [https://guardrail-protocol.vercel.app](https://guardrail-protocol.vercel.app)
- **Cluster:** Solana Mainnet-Beta (Audit Engine) & Solana Devnet (On-Chain Proofs)
- **License:** MIT License (Signed by Ra9mirez11)
