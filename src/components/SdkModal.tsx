'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, X, ShieldAlert, Code, Cpu } from 'lucide-react';

export function SdkModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const snippets = [
    {
      title: '1. GuardRail CLI (Audit CI/CD Pipeline)',
      lang: 'bash',
      code: [
        '# Run pre-flight check in your GitHub Actions or deployment script',
        'npx guardrail-scanner <TARGET_MINT> \\',
        '  --cluster devnet \\',
        '  --max-tax-bps 500 \\',
        '  --assert-no-transfer-hooks \\',
        '  --strict'
      ].join('\n')
    },
    {
      title: '2. Pre-Execution Swap Firewall (TypeScript / Jupiter SDK)',
      lang: 'typescript',
      code: [
        "import { Connection, PublicKey } from '@solana/web3.js';",
        "import { GuardRailInspector } from '@guardrail/firewall-sdk';",
        "",
        "const inspector = new GuardRailInspector('https://api.devnet.solana.com');",
        "const report = await inspector.inspectMint(targetMint);",
        "",
        "if (report.isHoneypot || report.riskScore > 70) {",
        "  throw new Error(`[GUARDRAIL FIREWALL] Transaction Aborted! Malicious Mint: ${report.classification}`);",
        "}",
        "",
        "// Mint is safe, proceed with atomic swap execution",
        "await executeSwap(targetMint);"
      ].join('\n')
    },
    {
      title: '3. Anchor On-Chain CPI Invariant Verification (Rust)',
      lang: 'rust',
      code: [
        "// Invoke GuardRail CPI Proxy before routing trade on DEX",
        "pub fn safe_swap(ctx: Context<SafeSwap>, max_tax_bps: u16) -> Result<()> {",
        "    guardrail::cpi::guard_pre_execution_swap(",
        "        CpiContext::new(ctx.accounts.guardrail_program.to_account_info(), GuardPreExecutionSwap {",
        "            attestation: ctx.accounts.attestation.to_account_info(),",
        "            mint: ctx.accounts.mint.to_account_info(),",
        "            user_authority: ctx.accounts.user.to_account_info(),",
        "        }),",
        "        max_tax_bps,",
        "        false, // Disallow honeypot transfer hooks",
        "    )?;",
        "",
        "    // Safe to route to Raydium / Orca / Whirlpool CPI",
        "    Ok(())",
        "}"
      ].join('\n')
    }
  ];

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono font-medium text-cyan-300 hover:text-white transition-all flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
      >
        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
        <span>DEVELOPER SDK & CLI</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl bg-[#070914] border border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.25)] font-mono text-left overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between flex-shrink-0 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wider">GUARDRAIL INTEGRATION SDK & CLI</h3>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    Integrate zero-trust pre-execution firewall into your DEX, Telegram trading bot, or CI/CD pipeline.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
              {snippets.map((s, idx) => (
                <div key={idx} className="rounded-2xl bg-black/80 border border-white/[0.08] overflow-hidden shadow-inner">
                  <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">{s.title}</span>
                    <button
                      onClick={() => handleCopy(s.code, idx)}
                      className="flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300 font-medium px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-all"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY CODE</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-[11px] text-slate-300 overflow-x-auto leading-relaxed bg-[#03060c]">
                    <code>{s.code}</code>
                  </pre>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/[0.08] bg-white/[0.01] flex justify-end flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95"
              >
                CLOSE WINDOW
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}