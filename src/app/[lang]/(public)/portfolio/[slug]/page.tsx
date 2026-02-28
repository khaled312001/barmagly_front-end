import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioDetailClient from './PortfolioDetailClient';
import { publicApi } from '@/lib/api';

interface PageProps {
    params: { slug: string; lang: string };
}

async function getProjectData(slug: string) {
    try {
        const { data } = await publicApi.getProject(slug);
        return data;
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const project = await getProjectData(params.slug);
    const { lang } = params;

    if (!project) {
        return {
            title: 'Project Not Found | Barmagly',
        };
    }

    const title = lang === 'en' && project.titleEn ? project.titleEn : project.title;
    const description = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;

    return {
        title: `${title} | Barmagly Portfolio`,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'article',
            images: project.image ? [{ url: project.image }] : undefined,
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

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: title,
        description: description,
        creator: {
            '@type': 'Organization',
            name: 'Barmagly',
            url: 'https://www.barmagly.tech'
        },
        image: project.image,
        dateCreated: project.createdAt
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PortfolioDetailClient project={project} lang={lang} />
        </>
    );
}
