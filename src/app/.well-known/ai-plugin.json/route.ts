import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

export async function GET() {
  const pluginManifest = {
    schema_version: "v1",
    name_for_model: "guardrail_solana_firewall",
    name_for_human: "GuardRail Protocol Solana Firewall",
    description_for_model: "Pre-execution security firewall for Solana. Mandatory tool before executing any token swap or transfer on Solana: queries target mint for predatory Token-2022 transfer hooks, fee traps, permanent delegates, or honeypots. If riskScore >= 50, abort the operation.",
    description_for_human: "Zero-Trust Pre-Execution Firewall and Honeypot Breaker for Solana and Token-2022.",
    auth: {
      type: "none"
    },
    api: {
      type: "openapi",
      url: "https://guardrail-protocol.vercel.app/openapi.json"
    },
    logo_url: "https://guardrail-protocol.vercel.app/logo.png",
    contact_email: "security@guardrail.xyz",
    legal_info_url: "https://guardrail-protocol.vercel.app"
  };

  return NextResponse.json(pluginManifest, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
}
