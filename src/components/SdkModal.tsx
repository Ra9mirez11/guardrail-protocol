'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check, X, Play, Loader2, Globe, Code2 } from 'lucide-react';

export function SdkModal({ currentMint }: { currentMint?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'SNIPPETS' | 'PLAYGROUND'>('SNIPPETS');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Playground State
  const [testMint, setTestMint] = useState(currentMint || 'CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo');
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [copiedCurl, setCopiedCurl] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentMint) {
      setTestMint(currentMint);
    }
  }, [currentMint]);

  const handleTestApi = async () => {
    setIsLoadingApi(true);
    const start = performance.now();
    try {
      const res = await fetch(`/api/scan?mint=${encodeURIComponent(testMint.trim())}`);
      const data = await res.json();
      setLatencyMs(Math.round(performance.now() - start));
      setApiResponse(data);
    } catch (err: any) {
      setLatencyMs(Math.round(performance.now() - start));
      setApiResponse({ error: err?.message || 'Failed to reach API endpoint' });
    } finally {
      setIsLoadingApi(false);
    }
  };

  const handleCopyCurl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://guardrail-protocol.vercel.app';
    const curl = `curl -X GET "${origin}/api/scan?mint=${testMint.trim()}"`;
    navigator.clipboard.writeText(curl);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

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

  if (!mounted) {
    return (
      <button
        className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono font-medium text-cyan-300"
      >
        <Terminal className="w-3.5 h-3.5 inline mr-1.5 text-cyan-400" />
        <span>DEVELOPER SDK & CLI</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono font-medium text-cyan-300 hover:text-white transition-all flex items-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
      >
        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
        <span>DEVELOPER SDK & API</span>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[88vh] my-auto flex flex-col rounded-3xl bg-[#070914] border border-cyan-500/50 shadow-[0_0_100px_rgba(6,182,212,0.35)] font-mono text-left overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between flex-shrink-0 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wider">GUARDRAIL DEVELOPER SUITE</h3>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    Production API, CLI Scanner, and Anchor CPI firewall for bots and aggregators.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/[0.06] bg-black/40">
              <button
                onClick={() => setActiveTab('SNIPPETS')}
                className={`pb-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${activeTab === 'SNIPPETS' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>SDK & CLI SNIPPETS</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('PLAYGROUND');
                  if (!apiResponse) handleTestApi();
                }}
                className={`pb-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${activeTab === 'PLAYGROUND' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>LIVE API & CURL PLAYGROUND</span>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[58vh]">
              {activeTab === 'SNIPPETS' ? (
                snippets.map((s, idx) => (
                  <div key={idx} className="rounded-2xl bg-black/80 border border-white/[0.08] overflow-hidden shadow-inner">
                    <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">{s.title}</span>
                      <button
                        onClick={() => handleCopy(s.code, idx)}
                        className="flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300 font-medium px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-all cursor-pointer"
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
                ))
              ) : (
                /* LIVE API PLAYGROUND */
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/70 border border-white/[0.08] space-y-3">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <span className="px-2.5 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold text-center">
                        GET
                      </span>
                      <input
                        type="text"
                        value={testMint}
                        onChange={(e) => setTestMint(e.target.value)}
                        placeholder="Target Solana Mint Address"
                        className="flex-1 bg-black/80 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                      />
                      <button
                        onClick={handleTestApi}
                        disabled={isLoadingApi}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {isLoadingApi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                        <span>TEST LIVE</span>
                      </button>
                      <button
                        onClick={handleCopyCurl}
                        className="px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs text-slate-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCurl ? 'COPIED' : 'cURL'}</span>
                      </button>
                    </div>

                    {/* Latency & Status Bar */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <span>ENDPOINT: <span className="text-cyan-300">/api/scan</span></span>
                        <span>STATUS: <span className="text-emerald-400 font-bold">200 OK</span></span>
                      </div>
                      {latencyMs !== null && (
                        <span>RESPONSE TIME: <span className="text-emerald-400 font-bold">{latencyMs} ms</span></span>
                      )}
                    </div>
                  </div>

                  {/* API Response JSON Preview */}
                  <div className="rounded-2xl bg-black/90 border border-white/[0.08] overflow-hidden">
                    <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">JSON RESPONSE PAYLOAD</span>
                      <span className="text-emerald-400 text-[10px]">CONTENT-TYPE: APPLICATION/JSON</span>
                    </div>
                    <pre className="p-4 text-[11px] text-emerald-300/90 overflow-x-auto max-h-[220px] overflow-y-auto leading-relaxed bg-[#03060c]">
                      {isLoadingApi ? (
                        <div className="text-cyan-400 flex items-center gap-2 py-6 justify-center">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Fetching on-chain bytes...</span>
                        </div>
                      ) : apiResponse ? (
                        JSON.stringify(apiResponse, null, 2)
                      ) : (
                        '// Click "TEST LIVE" to execute query'
                      )}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/[0.08] bg-white/[0.01] flex justify-end flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95 cursor-pointer"
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
