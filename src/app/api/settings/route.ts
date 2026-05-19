import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/dataStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json(getSettings());
}
