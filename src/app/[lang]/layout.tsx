import type { Metadata } from 'next';
import '../globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { buildAlternates } from '@/lib/seo';

const SITE_URL = 'https://www.barmagly.tech';

export async function generateMetadata({
    params,
}: {
    params: { lang: string };
}): Promise<Metadata> {
    const lang = params.lang || 'en';
    const isAr = lang === 'ar';

    const homeTitle = isAr
        ? 'برمجلي - شركة برمجيات لتطوير المواقع والتطبيقات وحلول الأعمال'
        : 'Barmagly | Software Company — Websites, Mobile Apps, E-commerce & ERP';
    const homeDescription = isAr
        ? 'شركة برمجلي متخصصة في تطوير المواقع الإلكترونية وتطبيقات iOS و Android وتصميم UI/UX وأنظمة ERP و CRM و POS والمتاجر الإلكترونية والتسويق الرقمي. نقدّم حلول برمجية متكاملة للشركات والـ Startups.'
        : 'Barmagly is a software company building websites, iOS / Android apps, UI/UX, ERP / CRM / POS systems, e-commerce stores, and digital marketing campaigns for startups and growing businesses.';

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: homeTitle,
            template: '%s | Barmagly',
        },
        description: homeDescription,
        keywords: [
            // English — service-led, not country-led
            'Barmagly', 'software company', 'software development company',
            'web development', 'website design', 'next.js development', 'react development',
            'mobile app development', 'iOS app development', 'Android app development',
            'flutter development', 'react native development',
            'UI/UX design', 'product design', 'web app design',
            'e-commerce development', 'shopify development', 'woocommerce', 'magento',
            'online store development', 'B2B ecommerce',
            'custom ERP', 'ERP system development', 'CRM development', 'POS system',
            'restaurant POS', 'retail POS', 'inventory management', 'business automation',
            'digital marketing', 'SEO services', 'google ads management', 'meta ads',
            'content marketing', 'social media marketing', 'performance marketing',
            // Arabic — service-led
            'برمجلي', 'شركة برمجيات', 'شركة برمجة',
            'تصميم مواقع', 'تطوير مواقع', 'برمجة مواقع', 'تصميم موقع احترافي',
            'تصميم تطبيقات', 'تطوير تطبيقات', 'تطبيقات اندرويد', 'تطبيقات ايفون', 'تطبيقات flutter',
            'تصميم متجر الكتروني', 'انشاء متجر اون لاين', 'تجارة الكترونية', 'shopify',
            'تصميم تجربة مستخدم', 'تصميم واجهات', 'ux/ui',
            'نظام erp', 'نظام crm', 'نقاط بيع', 'نظام pos', 'نظام مطاعم', 'نظام مخازن',
            'تسويق رقمي', 'سيو', 'تحسين محركات البحث', 'اعلانات جوجل', 'اعلانات فيسبوك',
            'شركة تصميم مواقع', 'شركة تطوير تطبيقات', 'افضل شركة برمجة',
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
            title: homeTitle,
            description: homeDescription,
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: 'Barmagly — Software Development Company',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: homeTitle,
            description: homeDescription,
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
                                    alternateName: ['برمجلي'],
                                    url: 'https://www.barmagly.tech',
                                    logo: {
                                        '@type': 'ImageObject',
                                        url: 'https://www.barmagly.tech/logo.png',
                                        width: 512,
                                        height: 512,
                                    },
                                    image: 'https://www.barmagly.tech/og-image.png',
                                    description:
                                        'Software company building websites, mobile apps, e-commerce stores, ERP/CRM/POS systems, UI/UX, and digital marketing campaigns for startups and growing businesses.',
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
