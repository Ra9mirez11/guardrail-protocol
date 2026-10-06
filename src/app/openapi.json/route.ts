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
  const schema = {
    openapi: "3.1.0",
    info: {
      title: "GuardRail Protocol AI Security Tool",
      version: "1.0.0",
      description: "Zero-Trust Pre-Execution Firewall for AI Trading Agents on Solana. Inspects tokens for honeypot transfer hooks, predatory fees, and freeze vectors."
    },
    servers: [
      {
        url: "https://guardrail-protocol.vercel.app",
        description: "Production Gateway"
      }
    ],
    paths: {
      "/api/scan": {
        get: {
          operationId: "auditSolanaToken",
          summary: "Audit a Solana token mint address for honeypots, transfer fees, and security traps.",
          description: "Inspects Solana SPL and Token-2022 mint accounts on-chain. Returns risk score (0-100), risk level (SAFE, SUSPICIOUS, CRITICAL), transfer hook analysis, fee configuration, freeze authority status, and on-chain Anchor PDA proof.",
          parameters: [
            {
              name: "mint",
              in: "query",
              required: true,
              description: "Base58-encoded public key address of the Solana token mint to audit.",
              schema: {
                type: "string",
                example: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
              }
            }
          ],
          responses: {
            "200": {
              description: "Audit completed successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      mint: { type: "string" },
                      tokenStandard: { type: "string", enum: ["SPL-Token", "Token-2022"] },
                      riskScore: { type: "integer", minimum: 0, maximum: 100 },
                      riskLevel: { type: "string", enum: ["SAFE", "SUSPICIOUS", "CRITICAL"] },
                      summary: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/actions/scan": {
        get: {
          operationId: "getSolanaActionBlink",
          summary: "Solana Action Blink metadata for social and wallet unrolling.",
          parameters: [
            {
              name: "mint",
              in: "query",
              required: false,
              schema: { type: "string" }
            }
          ]
        },
        post: {
          operationId: "executeBlinkAttestation",
          summary: "Builds a serialized SPL Memo transaction storing cryptographic audit attestation on Solana.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    account: { type: "string", description: "User wallet public key" }
                  },
                  required: ["account"]
                }
              }
            }
          }
        }
      }
    }
  };

  return NextResponse.json(schema, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
}
