import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioDetailClient from './PortfolioDetailClient';
import { findOne } from '@/lib/dataStore';
import seedPortfolio from '@/data/seeds/portfolio.json';

// Pre-render every known project at build time and return a REAL 404 for anything
// else (dynamicParams=false). This avoids the soft-404 (200 + "not found") that
// Google leaves un-indexed. New admin projects are picked up on the next deploy.
export const dynamicParams = false;

export function generateStaticParams() {
    const slugs = Array.from(
        new Set(
            (seedPortfolio as any[])
                .filter((p) => p.isActive !== false && p.slug)
                .map((p) => p.slug as string)
        )
    );
    return ['en', 'ar'].flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

interface PageProps {
    params: { slug: string; lang: string };
}

// Server component → read the data store directly (a relative axios URL has no
// host server-side and would always fail).
async function getProjectData(slug: string) {
    return findOne<any>('portfolio', (p) => p.slug === slug && p.isActive !== false);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const project = await getProjectData(params.slug);
    const { lang, slug } = params;

    if (!project) {
        return {
            title: 'Project Not Found | Barmagly',
            robots: { index: false, follow: true },
        };
    }

    const title = lang === 'en' && project.titleEn ? project.titleEn : project.title;
    const description = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
    const url = `https://www.barmagly.tech/${lang}/portfolio/${slug}`;

    return {
        title: `${title} | Barmagly Portfolio`,
        description,
        alternates: {
            canonical: url,
            languages: {
                en: `https://www.barmagly.tech/en/portfolio/${slug}`,
                ar: `https://www.barmagly.tech/ar/portfolio/${slug}`,
                'x-default': `https://www.barmagly.tech/en/portfolio/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            url,
            type: 'article',
            images: project.image ? [{ url: project.image, width: 1200, height: 630, alt: title }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: project.image ? [project.image] : undefined,
        },
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug, lang } = params;
    const project = await getProjectData(slug);

    if (!project) {
        notFound();
    }

    const title = lang === 'en' && project.titleEn ? project.titleEn : project.title;
    const description = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: title,
        description,
        url: `https://www.barmagly.tech/${lang}/portfolio/${slug}`,
        image: project.image,
        dateCreated: project.createdAt,
        dateModified: project.updatedAt || project.createdAt,
        creator: {
            '@type': 'Organization',
            name: 'Barmagly',
            url: 'https://www.barmagly.tech',
        },
        keywords: Array.isArray(project.technologies) ? project.technologies.join(', ') : undefined,
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `https://www.barmagly.tech/${lang}` },
            { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `https://www.barmagly.tech/${lang}/portfolio` },
            { '@type': 'ListItem', position: 3, name: title, item: `https://www.barmagly.tech/${lang}/portfolio/${slug}` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <PortfolioDetailClient project={project} lang={lang} />
        </>
    );
}
