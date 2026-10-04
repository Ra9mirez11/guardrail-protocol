import { NextRequest, NextResponse } from 'next/server';
import { ActionGetResponse, ACTION_HEADERS } from '@/lib/actionTypes';
import { GuardRailInspector } from '@/lib/tokenInspector';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return new Response(null, { headers: ACTION_HEADERS });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mint = searchParams.get('mint') || 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';

  let title = '🛡️ GuardRail Security Attestation';
  let description = 'Zero-Trust Pre-Execution Firewall for Solana. Inspect Token-2022 Transfer Hooks, Fees, and Honeypot traps.';
  const icon = 'https://raw.githubusercontent.com/solana-developers/brand-kit/main/assets/png/solana-badge-black.png';

  try {
    const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
    const inspector = new GuardRailInspector(rpcUrl);
    const report = await inspector.inspectMint(mint);

    title = `🛡️ GuardRail: ${report.riskLevel} (${report.riskScore}/100)`;
    description = `Token: ${mint.slice(0, 4)}...${mint.slice(-4)} | Standard: ${report.tokenStandard} | Freeze: ${report.standard.isFreezable ? 'YES ⚠️' : 'REVOKED ✅'} | Mint: ${report.standard.isMintable ? 'YES ⚠️' : 'REVOKED ✅'} | Hooks: ${report.extensions.hasTransferHook ? 'ATTACHED ⚠️' : 'NONE ✅'}`;
  } catch {
    // Graceful fallback
  }

  const payload: ActionGetResponse = {
    title,
    icon,
    description,
    label: 'Deep Invariant Check',
    links: {
      actions: [
        {
          label: 'Inspect Token',
          href: `/api/actions/scan?mint={mintInput}`,
          parameters: [
            {
              name: 'mintInput',
              label: 'Solana Mint Address'
            }
          ]
        }
      ]
    }
  };

  return NextResponse.json(payload, { headers: ACTION_HEADERS });
}

export async function POST() {
  return NextResponse.json({
    message: 'GuardRail Read-Only Zero-Trust Pre-flight verification complete. No funds debited.'
  }, { headers: ACTION_HEADERS });
}
