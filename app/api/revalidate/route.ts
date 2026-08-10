import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

// Sanity webhook → POST /api/revalidate
// Set SANITY_WEBHOOK_SECRET env var and configure in Sanity dashboard
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('sanity', 'default');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
