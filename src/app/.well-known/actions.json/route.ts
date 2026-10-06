import { NextResponse } from 'next/server';
import { ACTION_HEADERS } from '@/lib/actionTypes';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return new Response(null, { headers: ACTION_HEADERS });
}

export async function GET() {
  const payload = {
    rules: [
      {
        pathPattern: "/scan/**",
        apiPath: "/api/actions/scan/**"
      },
      {
        pathPattern: "/api/actions/**",
        apiPath: "/api/actions/**"
      }
    ]
  };

  return NextResponse.json(payload, { headers: ACTION_HEADERS });
}
