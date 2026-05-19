import { NextResponse } from 'next/server';
import { readAll } from '@/lib/dataStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    const all = await readAll<any>('blog');
    const published = all.filter((p) => p.status !== 'DRAFT' && p.isActive !== false);
    published.sort((a, b) =>
        new Date(b.publishedAt || b.createdAt || 0).getTime() -
        new Date(a.publishedAt || a.createdAt || 0).getTime()
    );
    return NextResponse.json({ posts: published, pagination: { total: published.length, page: 1, pageSize: published.length } });
}
