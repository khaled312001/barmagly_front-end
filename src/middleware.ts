import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

function getCountry(request: NextRequest): string | undefined {
    // Try common geo-IP headers from various platforms/CDNs
    const country =
        request.headers.get('x-vercel-ip-country') ||
        request.headers.get('cf-ipcountry') ||
        request.headers.get('x-country-code') ||
        request.headers.get('x-geo-country') ||
        (request as any).geo?.country;
    return country?.toUpperCase();
}

function prefersArabic(request: NextRequest): boolean {
    // Fallback when no geo-IP header is available: check the browser language.
    // Egyptian users almost always have ar-EG or ar in their accept-language.
    const acceptLang = request.headers.get('accept-language')?.toLowerCase() || '';
    return /\bar(-|_|,|;|$)/.test(acceptLang) || acceptLang.startsWith('ar');
}

function getLocale(request: NextRequest): string | undefined {
    // 1. Respect the user's explicit choice if a cookie is saved
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }

    // 2. Geo-IP: Egyptian visitors get Arabic
    const country = getCountry(request);
    if (country === 'EG') return 'ar';

    // 3. If geo-IP is unavailable, fall back to browser language (covers Egyptian
    //    visitors when the hosting layer doesn't inject a country header)
    if (!country && prefersArabic(request)) return 'ar';

    // 4. Default to English for everyone else
    return 'en';
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
