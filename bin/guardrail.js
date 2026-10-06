#!/usr/bin/env node

/**
 * GuardRail Protocol — Zero-Trust Forensic CLI Scanner
 * Developer CLI Tooling for Solana & SPL Token-2022
 * 
 * Usage:
 *   npx guardrail-scan <MINT_ADDRESS>
 *   node ./bin/guardrail.js <MINT_ADDRESS> [--json] [--rpc <RPC_URL>]
 */

const https = require('https');

const BASE58_REGEX = /^[1-9A-HJ-NP-za-km-z]{32,44}$/;

function printHelp() {
  console.log(`
GuardRail Protocol — Developer CLI Scanner v1.0.0
Zero-Trust Pre-Execution Firewall for Solana & Token-2022

Usage:
  npx guardrail-scan <MINT_ADDRESS> [options]

Options:
  --json           Output raw JSON audit report for CI/CD pipelines
  --rpc <URL>      Custom Solana RPC endpoint (default: public mainnet)
  --help, -h       Display this help message
  --version, -v    Display version

Examples:
  npx guardrail-scan DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263
  npx guardrail-scan CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo --json
`);
}

async function fetchAudit(mint) {
  return new Promise((resolve, reject) => {
    const encodedMint = encodeURIComponent(mint);
    const url = `https://guardrail-protocol.vercel.app/api/scan?mint=${encodedMint}`;

    const req = https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`API responded with HTTP ${res.statusCode}: ${data}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Connection timed out while querying GuardRail engine.'));
    });
  });
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log('guardrail-scan v1.0.0');
    process.exit(0);
  }

  const isJson = args.includes('--json');
  const mint = args.find(a => !a.startsWith('--'));

  if (!mint) {
    console.error('Error: Missing required Solana Mint Address.\nRun "guardrail-scan --help" for usage.');
    process.exit(1);
  }

  if (!BASE58_REGEX.test(mint)) {
    console.error(`Error: Invalid Solana Mint public key: "${mint}". Must be base58 (32-44 chars).`);
    process.exit(1);
  }

  if (!isJson) {
    console.log(`\n======================================================`);
    console.log(`  [GUARDRAIL PROTOCOL] Zero-Trust Pre-Execution Audit `);
    console.log(`======================================================`);
    console.log(`Target Mint : ${mint}`);
    console.log(`Status      : Querying forensic engine...\n`);
  }

  try {
    const report = await fetchAudit(mint);

    if (isJson) {
      console.log(JSON.stringify(report, null, 2));
      process.exit(report.riskScore >= 70 ? 1 : 0);
    }

    const isCritical = report.riskScore >= 70;
    const isSuspicious = report.riskScore >= 20 && report.riskScore < 70;
    const colorStatus = isCritical ? 'CRITICAL (HONEYPOT RISK)' : (isSuspicious ? 'SUSPICIOUS' : 'SAFE');

    console.log(`--- AUDIT RESULT ---`);
    console.log(`Standard        : ${report.tokenStandard}`);
    console.log(`Risk Score      : ${report.riskScore}/100 [${colorStatus}]`);
    console.log(`Risk Level      : ${report.riskLevel}`);
    console.log(`Freeze Authority: ${report.standard?.isFreezable ? 'ACTIVE (FREEZABLE)' : 'REVOKED (CLEAN)'}`);
    console.log(`Mint Authority  : ${report.standard?.isMintable ? 'ACTIVE (MINTABLE)' : 'REVOKED (CLEAN)'}`);
    console.log(`Transfer Fee    : ${report.extensions?.hasTransferFee ? report.extensions.transferFeeBps || report.extensions.feeBasisPoints + ' bps' : 'NONE'}`);
    console.log(`Transfer Hook   : ${report.extensions?.hasTransferHook ? 'DETECTED: ' + report.extensions.transferHookProgramId || report.extensions.hookProgramId : 'NONE'}`);
    console.log(`Permanent Del.  : ${report.extensions?.hasPermanentDelegate ? 'ACTIVE (DANGEROUS)' : 'NONE'}`);
    console.log(`------------------------------------------------------`);
    console.log(`On-Chain Proof  : ${report.attestationProof?.pdaAddress || report.onChainProof?.pdaAddress || 'N/A'}`);
    console.log(`Summary         : ${report.verdict || report.summary || "Verified by GuardRail Zero-Trust Engine"}`);
    console.log(`======================================================\n`);

    if (isCritical) {
      console.error(`FAILED: Token violates GuardRail pre-execution security policy (Score >= 70).`);
      process.exit(1);
    } else {
      console.log(`PASSED: Token approved by GuardRail pre-execution policy.`);
      process.exit(0);
    }
  } catch (err) {
    console.error(`Audit Failure: ${err.message}`);
    process.exit(2);
  }
}

main();
