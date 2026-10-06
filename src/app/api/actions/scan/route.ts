import { NextRequest, NextResponse } from 'next/server';
import { PublicKey, Transaction, TransactionInstruction, Connection } from '@solana/web3.js';
import { ActionGetResponse, ActionPostResponse, ACTION_HEADERS } from '@/lib/actionTypes';
import { GuardRailInspector } from '@/lib/tokenInspector';

export const runtime = 'nodejs';

const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

export async function OPTIONS() {
  return new Response(null, { headers: ACTION_HEADERS });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mint = searchParams.get('mint') || 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';

  let title = 'GuardRail Security Attestation';
  let description = 'Zero-Trust Pre-Execution Firewall for Solana. Inspect Token-2022 Transfer Hooks, Fees, and Honeypot traps.';
  const icon = 'https://raw.githubusercontent.com/solana-developers/brand-kit/main/assets/png/solana-badge-black.png';

  try {
    const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
    const inspector = new GuardRailInspector(rpcUrl);
    const report = await inspector.inspectMint(mint);

    title = `GuardRail: ${report.riskLevel} (${report.riskScore}/100 Risk)`;
    description = `Token: ${mint.slice(0, 4)}...${mint.slice(-4)} | Standard: ${report.tokenStandard} | Freeze: ${report.standard.isFreezable ? 'YES' : 'REVOKED'} | Mint: ${report.standard.isMintable ? 'YES' : 'REVOKED'} | Hooks: ${report.extensions.hasTransferHook ? 'ATTACHED' : 'NONE'}`;
  } catch {
    // Graceful fallback
  }

  const payload: ActionGetResponse = {
    title,
    icon,
    description,
    label: 'Stamp Attestation On-Chain',
    links: {
      actions: [
        {
          label: 'Verify Mint',
          href: '/api/actions/scan?mint={mintInput}',
          parameters: [
            {
              name: 'mintInput',
              label: 'Solana Token Mint Address',
              required: true
            }
          ]
        },
        {
          label: 'Stamp Proof On-Chain',
          href: `/api/actions/scan?mint=${mint}`
        }
      ]
    }
  };

  return NextResponse.json(payload, { headers: ACTION_HEADERS });
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mint = searchParams.get('mint') || 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';

  try {
    const body = await req.json();
    const account = body?.account;

    if (!account) {
      return NextResponse.json(
        { message: 'Missing account in request body.' },
        { status: 400, headers: ACTION_HEADERS }
      );
    }

    let userPubkey: PublicKey;
    try {
      userPubkey = new PublicKey(account);
    } catch {
      return NextResponse.json(
        { message: 'Invalid Solana public key provided in account field.' },
        { status: 400, headers: ACTION_HEADERS }
      );
    }

    const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
    const inspector = new GuardRailInspector(rpcUrl);
    const report = await inspector.inspectMint(mint);

    const memoText = `[GuardRail Attestation] Mint: ${mint.slice(0, 8)}... | Risk: ${report.riskScore}/100 (${report.riskLevel}) | Zero-Trust Firewall Verified`;

    const memoInstruction = new TransactionInstruction({
      keys: [{ pubkey: userPubkey, isSigner: true, isWritable: true }],
      programId: MEMO_PROGRAM_ID,
      data: Buffer.from(memoText, 'utf-8'),
    });

    const connection = new Connection(rpcUrl, 'confirmed');
    const { blockhash } = await connection.getLatestBlockhash('confirmed');

    const transaction = new Transaction();
    transaction.add(memoInstruction);
    transaction.feePayer = userPubkey;
    transaction.recentBlockhash = blockhash;

    const serializedTx = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    }).toString('base64');

    const responsePayload: ActionPostResponse = {
      transaction: serializedTx,
      message: `GuardRail Security Attestation verified: ${report.riskLevel} (${report.riskScore}/100 Risk).`
    };

    return NextResponse.json(responsePayload, { headers: ACTION_HEADERS });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      { message: `Action processing failed: ${errorMessage}` },
      { status: 500, headers: ACTION_HEADERS }
    );
  }
}
