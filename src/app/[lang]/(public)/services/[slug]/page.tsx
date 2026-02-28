import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';
import { publicApi } from '@/lib/api';

interface PageProps {
    params: { slug: string };
}

async function getServiceData(slug: string) {
    try {
        const { data } = await publicApi.getService(slug);
        return data;
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const service = await getServiceData(params.slug);

    if (!service) {
        return {
            title: 'Service Not Found | Barmagly',
        };
    }

    return {
        title: `${service.title} | Barmagly Swiss Tech`,
        description: service.description,
        openGraph: {
            title: service.title,
            description: service.description,
            type: 'website',
            images: service.image ? [{ url: service.image }] : undefined,
        },
    };
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const service = await getServiceData(params.slug);

    if (!service) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
            '@type': 'Organization',
            name: 'Barmagly',
            url: 'https://www.barmagly.tech'
        },
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
        },
        serviceType: service.category?.name || 'Software Development'
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ServiceDetailClient service={service} />
        </>
    );
}
