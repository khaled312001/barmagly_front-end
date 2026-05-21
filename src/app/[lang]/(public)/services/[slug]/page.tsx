import React from 'react';
import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';
import { getServiceBySlug, type StaticService } from '@/data/services';
import { readAll } from '@/lib/dataStore';

interface PageProps {
    params: { slug: string; lang: string };
}

// Server component → read directly from the rich static catalogue + data store
// (no HTTP; a relative axios URL has no host server-side).
async function getServiceData(slug: string): Promise<any> {
    const fromStatic = getServiceBySlug(slug);

    // Look in the data store (admin-managed services, possibly inside categories).
    let fromStore: any = null;
    try {
        const all = await readAll<any>('services');
        if (all.length && Array.isArray(all[0]?.services)) {
            for (const cat of all) {
                const hit = (cat.services || []).find((s: any) => s.slug === slug && s.isActive !== false);
                if (hit) { fromStore = { ...hit, category: cat }; break; }
            }
        } else {
            fromStore = all.find((s: any) => s.slug === slug && s.isActive !== false) || null;
        }
    } catch {
        /* ignore — static still wins */
    }

    if (!fromStatic && !fromStore) return null;
    if (!fromStore) return fromStatic;
    if (!fromStatic) return fromStore;
    // Static data carries the richer SEO content; layer store fields on top.
    return { ...fromStatic, ...fromStore };
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
        permanentRedirect(`/${lang}/services`);
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

// Allow slugs beyond the pre-rendered set (admin-added services) to render on demand.
export const dynamicParams = true;
