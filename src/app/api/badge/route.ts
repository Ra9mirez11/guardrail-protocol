import { NextRequest } from 'next/server';
import { GuardRailInspector } from '@/lib/tokenInspector';

export const runtime = 'nodejs';

const BASE58_REGEX = /^[1-9A-HJ-NP-za-km-z]{32,44}$/;

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS'
    }
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mint = searchParams.get('mint') || 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';

  let riskScore = 0;
  let riskLevel = 'SAFE';

  if (BASE58_REGEX.test(mint)) {
    try {
      const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
      const inspector = new GuardRailInspector(rpcUrl);
      const report = await inspector.inspectMint(mint);
      riskScore = report.riskScore;
      riskLevel = report.riskLevel;
    } catch {
      // Fallback
    }
  }

  let statusColor = '#10B981'; // Emerald
  let bgGradient = 'rgba(16, 185, 129, 0.15)';
  let borderColor = '#059669';

  if (riskScore >= 70 || riskLevel === 'CRITICAL') {
    statusColor = '#EF4444'; // Red
    bgGradient = 'rgba(239, 68, 68, 0.15)';
    borderColor = '#DC2626';
  } else if (riskScore >= 20 || riskLevel === 'SUSPICIOUS') {
    statusColor = '#F59E0B'; // Amber
    bgGradient = 'rgba(245, 158, 11, 0.15)';
    borderColor = '#D97706';
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="36" viewBox="0 0 260 36" fill="none">
    <rect width="260" height="36" rx="8" fill="#070912" stroke="${borderColor}" stroke-width="1.2"/>
    <rect x="1" y="1" width="258" height="34" rx="7" fill="${bgGradient}"/>
    <g transform="translate(10, 8)">
      <path d="M10 2L3 5.5V11C3 15.5 6 19.5 10 20.5C14 19.5 17 15.5 17 11V5.5L10 2Z" fill="${statusColor}" fill-opacity="0.2" stroke="${statusColor}" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M7.5 11L9.5 13L13 9" stroke="${statusColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <text x="36" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#E2E8F0" letter-spacing="0.5">GUARDRAIL</text>
    <line x1="116" y1="8" x2="116" y2="28" stroke="#334155" stroke-width="1"/>
    <text x="126" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="${statusColor}" letter-spacing="0.5">${riskLevel} (${riskScore}/100)</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=600',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
