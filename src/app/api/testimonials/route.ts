import { NextResponse } from 'next/server';
import { readAll } from '@/lib/dataStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    const all = await readAll<any>('testimonials');
    return NextResponse.json(all.filter((t) => t.isActive !== false));
}
