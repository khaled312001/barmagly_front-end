import { NextRequest, NextResponse } from 'next/server';
import { extractBearer, verifyJWT } from './authJwt';

const stripQuotes = (s?: string) => (s ? s.replace(/^"(.*)"$/, '$1').trim() : s);

export function requireAdmin(req: NextRequest):
    | { ok: true; user: { id: string; email: string; role: string } }
    | { ok: false; res: NextResponse } {
    const token = extractBearer(req.headers.get('authorization'));
    if (!token) {
        return { ok: false, res: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
    }
    const secret = stripQuotes(process.env.JWT_SECRET) || 'change-me-in-production';
    const payload = verifyJWT<{ id: string; email: string; role: string }>(token, secret);
    if (!payload || payload.role !== 'ADMIN') {
        return { ok: false, res: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
    }
    return { ok: true, user: payload };
}
