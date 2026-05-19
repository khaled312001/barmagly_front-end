import { NextResponse } from 'next/server';
import { readAll } from '@/lib/dataStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
    const all = await readAll<any>('services');
    // Categories format
    if (all.length && Array.isArray(all[0]?.services)) {
        for (const cat of all) {
            const hit = (cat.services || []).find((s: any) => s.slug === params.slug && s.isActive !== false);
            if (hit) return NextResponse.json({ ...hit, category: cat });
        }
    } else {
        const hit = all.find((s: any) => s.slug === params.slug && s.isActive !== false);
        if (hit) return NextResponse.json(hit);
    }
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
}
