# 🛡️ GuardRail Protocol

> **Zero-Trust Pre-Execution Firewall, Honeypot Breaker & Token-2022 Invariant Inspector for Solana.**

Built for **Colosseum Crypto World's Fair Hackathon** & **SolanaCZE Track**.

---

## 🚨 The Critical Problem on Solana

As Solana transitions toward the modern **Token-2022 (SPL Token Extensions)** standard, attackers have shifted their exploit methodologies from traditional vectors (mint/freeze authority scams) to advanced, subtle traps that conventional scanners cannot detect:

1. **Malicious Transfer Hooks:** Attackers attach custom on-chain programs via Cross-Program Invocations (CPI) that selectively revert transactions when regular users try to sell tokens on AMMs, creating uncrackable honeypots.
2. **Predatory Transfer Fees:** Stealthy token tax configurations (often reaching 99% basis points) configured in `TransferFeeConfig` that drain capital during token transfers.
3. **Permanent Delegate Exploits:** Authority delegation allowing central entities to arbitrarily confiscate or burn user balances without signature authorization.
4. **Default Frozen State Traps:** New recipient token accounts are initialized in a `Frozen` state, preventing subsequent transfers or liquidations.

Existing scanners and wallet popups only inspect standard SPL parameters and fail to detect these Token-2022 attack vectors in real-time.

---

## ⚡ The GuardRail Solution

**GuardRail Protocol** introduces an end-to-end, zero-trust security framework:

- **100% Non-Custodial & Zero Data Leakage:** The engine never touches private keys or tracks user wallets. All analytical pipelines run via stateless pre-flight inspections and read-only on-chain state analysis.
- **Deep Token-2022 Extension Parser:** Direct byte-level inspection of Solana Mint accounts identifying Transfer Hooks, Fee Configurations, Permanent Delegates, and Default Frozen states.
- **On-Chain Anchor Attestation Program:** An immutable registry contract on Solana verifying invariants and recording slot-indexed attestation badges.
- **Solana Actions & Blinks Integration:** Native `/api/actions/scan` endpoint allowing immediate, 1-click token security audits directly within Twitter/X feeds and Discord without third-party web redirects.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Layer                          │
│   Web Dashboard (Next.js 14)  │   Solana Blinks (Twitter/X) │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    GuardRail Engine (API)                   │
│   • Token-2022 Deep Parser   • Authority State Verifier     │
│   • Transfer Fee Extractor   • Zero-Leakage RPC Proxy       │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌──────────────────────────────┐    ┌─────────────────────────┐
│     Solana Mainnet-Beta      │    │  On-Chain Anchor Program│
│  • AccountInfo & Mint State  │    │  • AttestSecurity       │
│  • Token Extensions Registry │    │  • VerifyInvariants     │
└──────────────────────────────┘    └─────────────────────────┘
```

---

## 🛠️ Security Matrix & Scoring

| Risk Level | Score Range | Criteria |
| :--- | :--- | :--- |
| **SAFE** | 0 - 19 | Mint & Freeze revoked, 0% tax, no predatory hooks. |
| **WARNING** | 20 - 39 | Active mint authority or low (<10%) transfer tax. |
| **DANGER** | 40 - 69 | Active freeze authority, unverified transfer hook attached. |
| **CRITICAL** | 70 - 100 | Default Frozen state, predatory tax (>10%), permanent delegate. |

---

## 🚀 Quickstart & Local Development

### 1. Clone repository
```bash
git clone https://github.com/your-username/guardrail-protocol.git
cd guardrail-protocol
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env.local
# Set your SOLANA_RPC_URL (Helius / QuickNode)
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the dashboard.

---

## 🧪 Testing the Blink Action Endpoint

Test the Dialect-compliant Blink Action:
```bash
curl -X GET "http://localhost:3000/api/actions/scan?mint=DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
```

---

## 📜 Smart Contract (Anchor)

The Anchor program is located in `programs/guardrail`:
- **AttestSecurity:** Records pre-flight audit proofs on-chain.
- **VerifyInvariants:** CPI-callable guard that aborts transactions if token risk exceeds configured thresholds.

---

## ⚖️ License
Apache-2.0. Built by the GuardRail team for SolanaCZE & Colosseum 2026.
