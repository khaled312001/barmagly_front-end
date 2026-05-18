import type { Metadata } from 'next';
import { headers } from 'next/headers';
import '../globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { locales } from '@/middleware';

const SITE_URL = 'https://www.barmagly.tech';

function buildAlternates(lang: string) {
    const h = headers();
    const pathname = h.get('x-pathname') || `/${lang}`;

    // Strip the locale prefix so we can rebuild URLs for both languages.
    let restOfPath = pathname;
    for (const loc of locales) {
        if (pathname === `/${loc}`) { restOfPath = ''; break; }
        if (pathname.startsWith(`/${loc}/`)) { restOfPath = pathname.slice(loc.length + 1); break; }
    }
    const trimmed = restOfPath === '/' ? '' : restOfPath;

    const url = (loc: string) => `${SITE_URL}/${loc}${trimmed}`;

    return {
        canonical: url(lang),
        languages: {
            en: url('en'),
            ar: url('ar'),
            'x-default': url('en'),
        },
    };
}

export async function generateMetadata({
    params,
}: {
    params: { lang: string };
}): Promise<Metadata> {
    const lang = params.lang || 'en';
    const isAr = lang === 'ar';

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: 'Barmagly | Swiss Licensed Software Development Company',
            template: '%s | Barmagly',
        },
        description:
            'Barmagly is a Swiss-licensed software development company specializing in web development, mobile apps, UI/UX design, business systems, and digital marketing solutions.',
        keywords: [
            'software development',
            'Swiss software company',
            'web development',
            'mobile app development',
            'UI/UX design',
            'ERP systems',
            'POS systems',
            'digital marketing',
            'Barmagly',
            'Zürich',
        ],
        authors: [{ name: 'Barmagly' }],
        creator: 'Barmagly',
        publisher: 'Barmagly',
        alternates: buildAlternates(lang),
        openGraph: {
            type: 'website',
            locale: isAr ? 'ar_EG' : 'en_US',
            url: buildAlternates(lang).canonical,
            siteName: 'Barmagly',
            title: 'Barmagly | Swiss Licensed Software Development Company',
            description:
                'Swiss-licensed software development company delivering enterprise-grade web, mobile, and business solutions.',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'Barmagly - Swiss Licensed Software Development',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Barmagly | Swiss Licensed Software Development Company',
            description:
                'Swiss-licensed software development company delivering enterprise-grade web, mobile, and business solutions.',
            images: ['/og-image.png'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    const lang = params.lang || 'en';
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={lang} dir={dir} className="scroll-smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'Barmagly',
                            url: 'https://www.barmagly.tech',
                            logo: 'https://www.barmagly.tech/logo.png',
                            description:
                                'Swiss-licensed software development company specializing in enterprise solutions.',
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'Hardstrasse 201',
                                addressLocality: 'Zürich',
                                postalCode: '8005',
                                addressCountry: 'CH',
                            },
                            contactPoint: {
                                '@type': 'ContactPoint',
                                telephone: '+41-779412126',
                                contactType: 'customer service',
                            },
                            sameAs: [],
                        }),
                    }}
                />
            </head>
            <body className="antialiased">
                <ToastProvider>
                    {children}
                </ToastProvider>
            </body>
        </html>
    );
}
