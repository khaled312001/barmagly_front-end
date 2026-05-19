import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/requireAdmin';
import { getStats } from '@/lib/dataStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const auth = requireAdmin(req);
    if (!auth.ok) return auth.res;

    const stats = await getStats();
    return NextResponse.json(stats);
}
