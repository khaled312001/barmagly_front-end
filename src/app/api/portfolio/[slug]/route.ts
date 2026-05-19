import { NextResponse } from 'next/server';
import { findOne } from '@/lib/dataStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
    const project = await findOne<any>('portfolio', (p) => p.slug === params.slug && p.isActive !== false);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json(project);
}
