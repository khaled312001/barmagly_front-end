import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

function getLocale(request: NextRequest): string | undefined {
    // 1. Check if there is a cookie saved
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }

    // 2. Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // 3. Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    if (!languages || languages.length === 0 || languages[0] === '*') {
        languages = [defaultLocale];
    }

    try {
        return matchLocale(languages, locales, defaultLocale);
    } catch (error) {
        return defaultLocale;
    }
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for API routes, public assets, and static files
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') || // Admin is handled separately or in English
        pathname.includes('.') ||        // Files like .jpg, .png
        pathname.startsWith('/uploads')
    ) {
        return NextResponse.next();
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // e.g. incoming request is /services
        // The new URL is now /en/services or /ar/services
        const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);

        // Preserve existing search params
        newUrl.search = request.nextUrl.search;

        return NextResponse.redirect(newUrl);
    }

    // If the pathname has a locale, let's extract it and save it to the cookie 
    // so the user's preference is remembered
    const currentLocale = locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (currentLocale) {
        const response = NextResponse.next();
        // Only set the cookie if it's different from what's there
        const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
        if (cookieLocale !== currentLocale) {
            response.cookies.set('NEXT_LOCALE', currentLocale, {
                path: '/',
                maxAge: 365 * 24 * 60 * 60, // 1 year
            });
        }
        return response;
    }

    return NextResponse.next();
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
