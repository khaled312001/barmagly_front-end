import { NextRequest, NextResponse } from 'next/server';
import { signJWT } from '@/lib/authJwt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripQuotes = (s?: string) => (s ? s.replace(/^"(.*)"$/, '$1').trim() : s);

export async function POST(req: NextRequest) {
    let body: { email?: string; password?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const adminEmail = (stripQuotes(process.env.ADMIN_EMAIL) || 'admin@barmagly.tech').toLowerCase();
    const adminPassword = stripQuotes(process.env.ADMIN_PASSWORD) || '';

    if (!adminPassword) {
        return NextResponse.json(
            { error: 'Admin login is not configured on this deployment.' },
            { status: 503 }
        );
    }

    if (email !== adminEmail || password !== adminPassword) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const jwtSecret = stripQuotes(process.env.JWT_SECRET) || 'change-me-in-production';
    const refreshSecret = stripQuotes(process.env.JWT_REFRESH_SECRET) || 'change-me-refresh';

    const user = { id: 'admin', email: adminEmail, name: 'Admin', role: 'ADMIN' };
    const accessToken = signJWT(user, jwtSecret, 60 * 60);              // 1h
    const refreshToken = signJWT({ id: user.id }, refreshSecret, 7 * 24 * 60 * 60); // 7d

    return NextResponse.json({ accessToken, refreshToken, user });
}
