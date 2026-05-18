import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

const CANONICAL_HOST = 'www.barmagly.tech';

// Legacy URLs that 404 today → permanent redirects to the live equivalent.
// Keys are lower-cased, locale-stripped, query-less pathnames.
const LEGACY_EXACT: Record<string, string> = {
    '/about-us': '/about',
    '/contact-us': '/contact',
    '/blogs': '/blog',
};

const LEGACY_PREFIX: Array<{ from: string; to: string; keepTail: boolean }> = [
    { from: '/service/', to: '/services/', keepTail: true },   // /service/x → /services/x
    { from: '/team/', to: '/about', keepTail: false },          // team members no longer exist
    { from: '/custom-page/', to: '/', keepTail: false },        // custom pages removed
    { from: '/blogs/', to: '/blog', keepTail: false },          // /blogs/foo → /blog
];

function getCountry(request: NextRequest): string | undefined {
    const country =
        request.headers.get('x-vercel-ip-country') ||
        request.headers.get('cf-ipcountry') ||
        request.headers.get('x-country-code') ||
        request.headers.get('x-geo-country') ||
        (request as any).geo?.country;
    return country?.toUpperCase();
}

function prefersArabic(request: NextRequest): boolean {
    const acceptLang = request.headers.get('accept-language')?.toLowerCase() || '';
    return /\bar(-|_|,|;|$)/.test(acceptLang) || acceptLang.startsWith('ar');
}

function getLocale(request: NextRequest): string {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

    const country = getCountry(request);
    if (country === 'EG') return 'ar';
    if (!country && prefersArabic(request)) return 'ar';
    return defaultLocale;
}

function stripLocale(pathname: string): { locale: string | null; rest: string } {
    for (const loc of locales) {
        if (pathname === `/${loc}`) return { locale: loc, rest: '/' };
        if (pathname.startsWith(`/${loc}/`)) return { locale: loc, rest: pathname.slice(loc.length + 1) };
    }
    return { locale: null, rest: pathname };
}

function legacyTarget(rest: string): string | null {
    const lower = rest.toLowerCase();

    if (LEGACY_EXACT[lower]) return LEGACY_EXACT[lower];

    for (const { from, to, keepTail } of LEGACY_PREFIX) {
        if (lower.startsWith(from)) {
            if (!keepTail) return to;
            return `${to}${rest.slice(from.length)}`;
        }
    }

    // Trim trailing dashes / dots on detail slugs (e.g. /portfolio/king-kebab-, /blog/-)
    const slugClean = rest.match(/^(\/(?:blog|portfolio|services))\/([^/?#]*?)[-.]+\/?$/);
    if (slugClean) {
        const cleanedSlug = slugClean[2];
        // If the slug becomes empty after trimming, redirect to the listing page.
        if (!cleanedSlug) return slugClean[1];
        return `${slugClean[1]}/${cleanedSlug}`;
    }

    return null;
}

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    const host = (request.headers.get('host') || '').toLowerCase();

    // Skip middleware for API routes, admin, static files, and asset paths
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/uploads') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // 1. Canonical host: non-www → www (permanent).
    if (host === 'barmagly.tech') {
        const url = new URL(request.url);
        url.host = CANONICAL_HOST;
        url.port = '';
        return NextResponse.redirect(url, 308);
    }

    // 2. Legacy URL rewrites — handled before locale logic so /about-us → /en/about
    //    (rather than the broken /en/about-us).
    const { locale: pathLocale, rest } = stripLocale(pathname);
    const target = legacyTarget(rest);
    if (target !== null) {
        const targetLocale = pathLocale || getLocale(request);
        const targetPath = target === '/' ? `/${targetLocale}` : `/${targetLocale}${target}`;
        return NextResponse.redirect(new URL(targetPath, request.url), 301);
    }

    // 3. Inject locale if missing (permanent so Google consolidates).
    if (!pathLocale) {
        const locale = getLocale(request);
        const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
        newUrl.search = search;
        return NextResponse.redirect(newUrl, 308);
    }

    // 4. Locale already in path — expose pathname so pages can build canonical/hreflang,
    //    and persist the user's choice.
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);

    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale !== pathLocale) {
        response.cookies.set('NEXT_LOCALE', pathLocale, {
            path: '/',
            maxAge: 365 * 24 * 60 * 60,
        });
    }
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
