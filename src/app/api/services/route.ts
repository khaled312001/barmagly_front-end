import { NextResponse } from 'next/server';
import { readAll } from '@/lib/dataStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// The legacy API returned categories with a `.services` array. The admin UI
// flattens via `cat.services || []`, so we preserve the same shape.
export async function GET() {
    const all = await readAll<any>('services');
    const active = all.filter((s) => s.isActive !== false);

    // If items look like categories already, pass through. Otherwise wrap.
    if (active.length && Array.isArray(active[0]?.services)) {
        return NextResponse.json(active);
    }
    return NextResponse.json([
        {
            id: 'cat-default',
            name: 'All Services',
            nameEn: 'All Services',
            slug: 'all',
            services: active,
        },
    ]);
}
