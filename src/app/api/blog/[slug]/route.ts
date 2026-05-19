import { NextResponse } from 'next/server';
import { findOne } from '@/lib/dataStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
    const post = await findOne<any>('blog', (p) => p.slug === params.slug && p.status !== 'DRAFT');
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json(post);
}
