import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, extractBearer } from '@/lib/authJwt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripQuotes = (s?: string) => (s ? s.replace(/^"(.*)"$/, '$1').trim() : s);

export async function GET(req: NextRequest) {
    const token = extractBearer(req.headers.get('authorization'));
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 401 });

    const secret = stripQuotes(process.env.JWT_SECRET) || 'change-me-in-production';
    const payload = verifyJWT<{ id: string; email: string; role: string }>(token, secret);
    if (!payload) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });

    return NextResponse.json({
        id: payload.id,
        email: payload.email,
        name: 'Admin',
        role: payload.role,
    });
}
