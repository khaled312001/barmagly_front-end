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

    const homeTitle = isAr
        ? 'برمجلي - شركة سويسرية لتطوير المواقع والتطبيقات وحلول البرمجيات'
        : 'Barmagly | Swiss Licensed Software Development Company';
    const homeDescription = isAr
        ? 'برمجلي شركة برمجيات سويسرية مرخصة متخصصة في تصميم وتطوير المواقع الإلكترونية وتطبيقات الموبايل (iOS و Android)، تصميم UI/UX، أنظمة ERP و CRM و POS، التجارة الإلكترونية، والتسويق الرقمي وSEO. نخدم العملاء في سويسرا، مصر، السعودية، الإمارات وحول العالم.'
        : 'Barmagly is a Swiss-licensed software development company building websites, iOS / Android apps, UI/UX, ERP / CRM / POS systems, e-commerce stores, and digital marketing / SEO campaigns for clients in Switzerland, Egypt, Saudi Arabia, UAE, and worldwide.';

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: homeTitle,
            template: '%s | Barmagly',
        },
        description: homeDescription,
        keywords: [
            // English
            'software development', 'Swiss software company', 'Barmagly',
            'web development', 'website design', 'mobile app development',
            'iOS app development', 'Android app development', 'Flutter development',
            'React Native', 'Next.js development', 'UI/UX design', 'product design',
            'e-commerce development', 'Shopify development', 'WooCommerce', 'Magento',
            'custom ERP', 'CRM development', 'POS system', 'business automation',
            'digital marketing', 'SEO agency', 'Google Ads', 'Meta Ads', 'TikTok Ads',
            'content marketing', 'web design Switzerland', 'web design Zurich',
            // Arabic
            'برمجلي', 'تصميم مواقع', 'تطوير مواقع', 'برمجة مواقع',
            'تصميم تطبيقات', 'تطوير تطبيقات الموبايل', 'تطبيقات اندرويد', 'تطبيقات ايفون',
            'تصميم متجر الكتروني', 'انشاء متجر', 'تجارة الكترونية',
            'تصميم تجربة مستخدم', 'تصميم واجهات', 'ux', 'ui',
            'نظام erp', 'نظام crm', 'نقاط بيع', 'pos', 'نظام محاسبة',
            'تسويق رقمي', 'سيو', 'تحسين محركات البحث', 'اعلانات جوجل', 'اعلانات فيسبوك',
            'شركة برمجة سويسرا', 'شركة تطوير مواقع', 'شركة تصميم تطبيقات',
            'تصميم موقع شركة', 'تصميم موقع احترافي', 'افضل شركة برمجة',
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
                            '@graph': [
                                {
                                    '@type': ['Organization', 'ProfessionalService'],
                                    '@id': 'https://www.barmagly.tech/#organization',
                                    name: 'Barmagly',
                                    alternateName: ['برمجلي', 'Barmagly Swiss Tech'],
                                    url: 'https://www.barmagly.tech',
                                    logo: {
                                        '@type': 'ImageObject',
                                        url: 'https://www.barmagly.tech/logo.png',
                                        width: 512,
                                        height: 512,
                                    },
                                    image: 'https://www.barmagly.tech/og-image.png',
                                    description:
                                        'Swiss-licensed software development company building websites, mobile apps, e-commerce, ERP/CRM/POS systems, UI/UX, and digital marketing campaigns.',
                                    address: {
                                        '@type': 'PostalAddress',
                                        streetAddress: 'Hardstrasse 201',
                                        addressLocality: 'Zürich',
                                        postalCode: '8005',
                                        addressCountry: 'CH',
                                    },
                                    contactPoint: [
                                        {
                                            '@type': 'ContactPoint',
                                            telephone: '+41-779412126',
                                            email: 'info@barmagly.tech',
                                            contactType: 'customer service',
                                            availableLanguage: ['en', 'ar', 'de', 'fr'],
                                            areaServed: ['CH', 'EG', 'SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'IQ'],
                                        },
                                    ],
                                    sameAs: [
                                        'https://linkedin.com/company/barmagly',
                                        'https://www.facebook.com/barmagly',
                                        'https://www.instagram.com/barmagly',
                                    ],
                                    knowsAbout: [
                                        'Web Development', 'Mobile App Development', 'UI/UX Design',
                                        'E-commerce Development', 'ERP Systems', 'CRM Systems',
                                        'POS Systems', 'Digital Marketing', 'SEO', 'Cloud Hosting',
                                    ],
                                    areaServed: [
                                        { '@type': 'Country', name: 'Switzerland' },
                                        { '@type': 'Country', name: 'Egypt' },
                                        { '@type': 'Country', name: 'Saudi Arabia' },
                                        { '@type': 'Country', name: 'United Arab Emirates' },
                                        { '@type': 'Country', name: 'Qatar' },
                                        { '@type': 'Country', name: 'Kuwait' },
                                        { '@type': 'Country', name: 'Iraq' },
                                    ],
                                    hasOfferCatalog: {
                                        '@type': 'OfferCatalog',
                                        name: 'Barmagly Services',
                                        itemListElement: [
                                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development', url: 'https://www.barmagly.tech/en/services/web-development' } },
                                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development', url: 'https://www.barmagly.tech/en/services/mobile-app-development' } },
                                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Commerce Development', url: 'https://www.barmagly.tech/en/services/e-commerce-development' } },
                                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design', url: 'https://www.barmagly.tech/en/services/ui-ux-design' } },
                                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing & SEO', url: 'https://www.barmagly.tech/en/services/digital-marketing' } },
                                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ERP & Business Systems', url: 'https://www.barmagly.tech/en/services/erp-business-systems' } },
                                        ],
                                    },
                                },
                                {
                                    '@type': 'WebSite',
                                    '@id': 'https://www.barmagly.tech/#website',
                                    url: 'https://www.barmagly.tech',
                                    name: 'Barmagly',
                                    inLanguage: lang,
                                    publisher: { '@id': 'https://www.barmagly.tech/#organization' },
                                    potentialAction: {
                                        '@type': 'SearchAction',
                                        target: {
                                            '@type': 'EntryPoint',
                                            urlTemplate: 'https://www.barmagly.tech/en/blog?q={search_term_string}',
                                        },
                                        'query-input': 'required name=search_term_string',
                                    },
                                },
                            ],
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
