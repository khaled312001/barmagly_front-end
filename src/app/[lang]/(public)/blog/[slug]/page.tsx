import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import { publicApi } from '@/lib/api';

interface PageProps {
    params: { slug: string };
}

async function getPostData(slug: string) {
    try {
        const { data } = await publicApi.getPost(slug);
        return data; // Usually API returns data wrapper
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = await getPostData(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found | Barmagly Blog',
        };
    }

    return {
        title: `${post.title} | Barmagly Insights`,
        description: post.excerpt || post.content.substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author?.name || 'Barmagly'],
            images: post.image ? [{ url: post.image }] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const post = await getPostData(params.slug);

    if (!post) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.publishedAt,
        author: {
            '@type': 'Person',
            name: post.author?.name || 'Barmagly'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Barmagly',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.barmagly.tech/logo.png' // Ensure this exists or use a variable
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.barmagly.tech/blog/${params.slug}`
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogDetailClient post={post} />
        </>
    );
}
