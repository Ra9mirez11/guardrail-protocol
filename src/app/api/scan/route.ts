import { NextRequest, NextResponse } from 'next/server';
import { GuardRailInspector } from '@/lib/tokenInspector';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mint = searchParams.get('mint');

    if (!mint) {
      return NextResponse.json({ error: 'Missing mint parameter' }, { status: 400 });
    }

    // 1000% Security: RPC endpoint is strictly isolated server-side
    const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
    const inspector = new GuardRailInspector(rpcUrl);

    const report = await inspector.inspectMint(mint);
    return NextResponse.json(report, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ 
      error: 'Failed to inspect token', 
      details: err?.message || 'Unknown error' 
    }, { status: 500 });
  }
}
