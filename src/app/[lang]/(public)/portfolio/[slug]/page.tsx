import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioDetailClient from './PortfolioDetailClient';
import { publicApi } from '@/lib/api';

interface PageProps {
    params: { slug: string };
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

    if (!project) {
        return {
            title: 'Project Not Found | Barmagly',
        };
    }

    return {
        title: `${project.title} | Barmagly Portfolio`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            type: 'article',
            images: project.image ? [{ url: project.image }] : undefined,
        },
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const project = await getProjectData(params.slug);

    if (!project) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
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
            <PortfolioDetailClient project={project} />
        </>
    );
}
