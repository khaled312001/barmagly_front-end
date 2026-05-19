import { NextResponse } from 'next/server';
import { readAll } from '@/lib/dataStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    const all = await readAll<any>('portfolio');
    // Filter to active projects only; sort by order then createdAt desc.
    const active = all.filter((p) => p.isActive !== false);
    active.sort((a, b) => {
        const oa = a.order ?? 999;
        const ob = b.order ?? 999;
        if (oa !== ob) return oa - ob;
        const ta = new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        return ta;
    });
    return NextResponse.json(active);
}
