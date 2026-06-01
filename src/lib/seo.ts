// Canonical + hreflang helper. Pure function (no headers()) so pages stay
// statically renderable.

const SITE_URL = 'https://www.barmagly.tech';

/**
 * Build canonical + hreflang alternates for a page.
 * @param lang current locale
 * @param path locale-stripped path beginning with "/" (e.g. "/about", "/portfolio/jovero").
 *             Omit or pass "" for the homepage.
 */
export function buildAlternates(lang: string, path = '') {
    const clean = path === '/' ? '' : path;
    const url = (loc: string) => `${SITE_URL}/${loc}${clean}`;
    return {
        canonical: url(lang),
        languages: {
            en: url('en'),
            ar: url('ar'),
            'x-default': url('en'),
        },
    };
}
