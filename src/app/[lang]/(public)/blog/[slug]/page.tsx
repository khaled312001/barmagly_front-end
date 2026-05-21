import React from 'react';
import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import { findOne } from '@/lib/dataStore';

// Read fresh from the data store on every request so admin edits appear instantly.
export const dynamic = 'force-dynamic';

interface PageProps {
    params: { slug: string; lang: string };
}

// Server component → read the data store directly (relative axios URL fails server-side).
async function getPostData(slug: string) {
    return findOne<any>('blog', (p) => p.slug === slug && p.status !== 'DRAFT');
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
        // Legacy / deleted slug → redirect to the blog index instead of a soft-404.
        permanentRedirect(`/${lang}/blog`);
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
