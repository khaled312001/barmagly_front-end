import { NextRequest, NextResponse } from 'next/server';
import { signJWT, verifyJWT } from '@/lib/authJwt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripQuotes = (s?: string) => (s ? s.replace(/^"(.*)"$/, '$1').trim() : s);

export async function POST(req: NextRequest) {
    let body: { refreshToken?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    const refreshToken = String(body.refreshToken || '');
    if (!refreshToken) {
        return NextResponse.json({ error: 'Refresh token required' }, { status: 400 });
    }

    const refreshSecret = stripQuotes(process.env.JWT_REFRESH_SECRET) || 'change-me-refresh';
    const payload = verifyJWT<{ id: string }>(refreshToken, refreshSecret);
    if (!payload) return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });

    const adminEmail = (stripQuotes(process.env.ADMIN_EMAIL) || 'admin@barmagly.tech').toLowerCase();
    const jwtSecret = stripQuotes(process.env.JWT_SECRET) || 'change-me-in-production';

    const user = { id: payload.id, email: adminEmail, name: 'Admin', role: 'ADMIN' };
    const accessToken = signJWT(user, jwtSecret, 60 * 60);
    const newRefresh = signJWT({ id: payload.id }, refreshSecret, 7 * 24 * 60 * 60);

    return NextResponse.json({ accessToken, refreshToken: newRefresh, user });
}
