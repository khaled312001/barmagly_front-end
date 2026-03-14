import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import { publicApi } from '@/lib/api';

interface PageProps {
    params: { slug: string; lang: string };
}

async function getPostData(slug: string) {
    try {
        const { data } = await publicApi.getPost(slug);
        return data;
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, lang } = params;
    const post = await getPostData(slug);

    if (!post) {
        return {
            title: 'Post Not Found | Barmagly Blog',
        };
    }

    const title = lang === 'en' && post.titleEn ? post.titleEn : post.title;
    const excerpt = lang === 'en' && post.excerptEn ? post.excerptEn : post.excerpt;

    return {
        title: `${title} | Barmagly Insights`,
        description: excerpt || post.content.substring(0, 160),
        openGraph: {
            title: title,
            description: excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author?.name || 'Barmagly'],
            images: post.image ? [{ url: post.image }] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug, lang } = params;
    const post = await getPostData(slug);

    if (!post) {
        notFound();
    }

    const title = lang === 'en' && post.titleEn ? post.titleEn : post.title;
    const excerpt = lang === 'en' && post.excerptEn ? post.excerptEn : post.excerpt;

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: excerpt,
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
                url: 'https://www.barmagly.tech/logo.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.barmagly.tech/blog/${slug}`
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogDetailClient post={post} lang={lang} />
        </>
    );
}
