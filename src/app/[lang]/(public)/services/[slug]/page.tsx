import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';
import { publicApi } from '@/lib/api';
import { getServiceBySlug, type StaticService } from '@/data/services';

interface PageProps {
    params: { slug: string; lang: string };
}

// Static catalogue first (always available); merge with API data if present.
async function getServiceData(slug: string): Promise<any> {
    const fromStatic = getServiceBySlug(slug);
    let fromApi: any = null;
    try {
        const { data } = await publicApi.getService(slug);
        fromApi = data;
    } catch {
        /* swallow — static data still wins below */
    }
    if (!fromStatic && !fromApi) return null;
    if (!fromApi) return fromStatic;
    if (!fromStatic) return fromApi;
    // Static data has richer SEO content; layer API fields on top so admins can override.
    return { ...fromStatic, ...fromApi };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const service = await getServiceData(params.slug);
    const { lang, slug } = params;

    if (!service) {
        return {
            title: 'Service Not Found | Barmagly',
            robots: { index: false, follow: true },
        };
    }

    const title = lang === 'en' && service.titleEn ? service.titleEn : service.title;
    const summary = lang === 'en' && service.summaryEn ? service.summaryEn : service.summary;
    const description = summary || (lang === 'en' && service.descriptionEn ? service.descriptionEn : service.description);
    const keywords = lang === 'en' && service.keywordsEn ? service.keywordsEn : service.keywords;
    const url = `https://www.barmagly.tech/${lang}/services/${slug}`;

    return {
        title: `${title} | Barmagly Swiss Tech`,
        description,
        keywords: Array.isArray(keywords) ? keywords : undefined,
        alternates: {
            canonical: url,
            languages: {
                en: `https://www.barmagly.tech/en/services/${slug}`,
                ar: `https://www.barmagly.tech/ar/services/${slug}`,
                'x-default': `https://www.barmagly.tech/en/services/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            locale: lang === 'ar' ? 'ar_EG' : 'en_US',
            images: service.image ? [{ url: service.image, width: 1200, height: 630, alt: title }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: service.image ? [service.image] : undefined,
        },
    };
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const service = await getServiceData(params.slug);
    const { lang, slug } = params;

    if (!service) {
        notFound();
    }

    const title = lang === 'en' && service.titleEn ? service.titleEn : service.title;
    const description = lang === 'en' && service.descriptionEn ? service.descriptionEn : service.description;
    const url = `https://www.barmagly.tech/${lang}/services/${slug}`;

    // Service schema
    const serviceJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title,
        description,
        url,
        provider: {
            '@type': 'Organization',
            name: 'Barmagly',
            url: 'https://www.barmagly.tech',
        },
        areaServed: ['Switzerland', 'Egypt', 'Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Iraq'],
        serviceType: title,
    };

    // Breadcrumb
    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: lang === 'ar' ? 'الرئيسية' : 'Home', item: `https://www.barmagly.tech/${lang}` },
            { '@type': 'ListItem', position: 2, name: lang === 'ar' ? 'الخدمات' : 'Services', item: `https://www.barmagly.tech/${lang}/services` },
            { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
    };

    // FAQ schema (if present on static data)
    const faqs: any[] = Array.isArray(service.faqs) ? service.faqs : [];
    const faqLd = faqs.length
        ? {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f: any) => ({
                  '@type': 'Question',
                  name: lang === 'ar' ? f.q : (f.qEn || f.q),
                  acceptedAnswer: {
                      '@type': 'Answer',
                      text: lang === 'ar' ? f.a : (f.aEn || f.a),
                  },
              })),
          }
        : null;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            {faqLd && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            )}
            <ServiceDetailClient service={service} lang={lang} />
        </>
    );
}

// Pre-render the static catalogue at build time so each service has a real HTML
// document that crawlers can index even without the API.
export function generateStaticParams() {
    const services = ['web-development', 'mobile-app-development', 'e-commerce-development', 'ui-ux-design', 'digital-marketing', 'erp-business-systems'];
    const langs = ['en', 'ar'];
    return langs.flatMap((lang) => services.map((slug) => ({ lang, slug })));
}
