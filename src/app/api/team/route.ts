import { NextResponse } from 'next/server';
import { readAll } from '@/lib/dataStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    const all = await readAll<any>('team');
    return NextResponse.json(all.filter((m) => m.isActive !== false));
}
