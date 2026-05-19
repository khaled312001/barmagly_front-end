import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function stripQuotes(s?: string) {
    return s ? s.replace(/^"(.*)"$/, '$1').trim() : s;
}

// Minimal JWT (HS256) so we don't need to ship the full jsonwebtoken dep just for fallback auth.
function base64url(input: Buffer | string) {
    return Buffer.from(input)
        .toString('base64')
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function signJWT(payload: Record<string, any>, secret: string, expiresInSec: number) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const claims = { ...payload, iat: now, exp: now + expiresInSec };
    const enc = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
    const sig = base64url(crypto.createHmac('sha256', secret).update(enc).digest());
    return `${enc}.${sig}`;
}

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

    const userPayload = {
        id: 'fallback-admin',
        email: adminEmail,
        role: 'ADMIN',
    };

    const accessToken = signJWT(userPayload, jwtSecret, 15 * 60); // 15min
    const refreshToken = signJWT({ id: userPayload.id }, refreshSecret, 7 * 24 * 60 * 60); // 7d

    return NextResponse.json({
        accessToken,
        refreshToken,
        user: {
            id: userPayload.id,
            email: adminEmail,
            name: 'Admin',
            role: 'ADMIN',
        },
    });
}
