// Tiny HS256 JWT — keeps us from shipping the full jsonwebtoken dep for fallback auth.

import * as crypto from 'crypto';

function b64url(input: Buffer | string) {
    return Buffer.from(input)
        .toString('base64')
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function b64urlDecode(input: string): Buffer {
    const padded = input.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((input.length + 3) % 4);
    return Buffer.from(padded, 'base64');
}

export function signJWT(payload: Record<string, any>, secret: string, expiresInSec: number): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const claims = { ...payload, iat: now, exp: now + expiresInSec };
    const enc = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claims))}`;
    const sig = b64url(crypto.createHmac('sha256', secret).update(enc).digest());
    return `${enc}.${sig}`;
}

export function verifyJWT<T = any>(token: string, secret: string): T | null {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const expectedSig = b64url(crypto.createHmac('sha256', secret).update(`${parts[0]}.${parts[1]}`).digest());
    if (expectedSig !== parts[2]) return null;

    try {
        const payload = JSON.parse(b64urlDecode(parts[1]).toString('utf-8'));
        if (typeof payload.exp === 'number' && payload.exp < Math.floor(Date.now() / 1000)) return null;
        return payload as T;
    } catch {
        return null;
    }
}

export function extractBearer(authHeader: string | null | undefined): string | null {
    if (!authHeader) return null;
    const m = authHeader.match(/^Bearer\s+(\S+)$/i);
    return m ? m[1] : null;
}
