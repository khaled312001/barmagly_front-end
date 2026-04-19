'use client';

import { useEffect } from 'react';

/**
 * One-time IP check after paint. If the user is in Egypt but the middleware
 * picked the wrong locale (e.g. English browser on an Egyptian IP), flip the
 * cookie and redirect. Skipped if the user has explicitly picked a language.
 *
 * Why client-side: Hostinger doesn't inject geo-IP headers, and calling an
 * IP-geo API inside middleware would add ~200ms to every cold request.
 * Doing it once per session in the browser keeps the page fast.
 */
export function GeoLocaleCorrector({ currentLang }: { currentLang: string }) {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const cookies = document.cookie;
        if (cookies.includes('NEXT_LOCALE_USER_CHOSEN=1')) return;
        if (sessionStorage.getItem('geoLocaleChecked') === '1') return;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1500);

        // ipapi.co returns a plain-text country code. Free, no API key, CORS-enabled.
        fetch('https://ipapi.co/country/', { signal: controller.signal, cache: 'no-store' })
            .then((r) => (r.ok ? r.text() : ''))
            .then((country) => {
                clearTimeout(timeout);
                sessionStorage.setItem('geoLocaleChecked', '1');

                const desired = country.trim().toUpperCase() === 'EG' ? 'ar' : 'en';
                if (desired === currentLang) return;

                document.cookie = `NEXT_LOCALE=${desired}; path=/; max-age=31536000`;
                const nextPath = window.location.pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${desired}`);
                const finalPath = nextPath.startsWith(`/${desired}`) ? nextPath : `/${desired}${nextPath}`;
                window.location.replace(finalPath + window.location.search);
            })
            .catch(() => {
                clearTimeout(timeout);
                sessionStorage.setItem('geoLocaleChecked', '1');
            });

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [currentLang]);

    return null;
}
