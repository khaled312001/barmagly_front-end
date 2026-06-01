import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import { findOne } from '@/lib/dataStore';
import seedBlog from '@/data/seeds/blog.json';

// Pre-render published posts; real 404 for anything else (no soft-404).
export const dynamicParams = false;

export function generateStaticParams() {
    const posts = ((seedBlog as any).posts || []) as any[];
    const slugs = Array.from(
        new Set(posts.filter((p) => p.status !== 'DRAFT' && p.slug).map((p) => p.slug as string))
    );
    return ['en', 'ar'].flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

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
    const url = `https://www.barmagly.tech/${lang}/blog/${slug}`;

    return {
        title: `${title} | Barmagly Insights`,
        description: excerpt || post.content?.substring(0, 160),
        alternates: {
            canonical: url,
            languages: {
                en: `https://www.barmagly.tech/en/blog/${slug}`,
                ar: `https://www.barmagly.tech/ar/blog/${slug}`,
                'x-default': `https://www.barmagly.tech/en/blog/${slug}`,
            },
        },
        openGraph: {
            title,
            description: excerpt,
            url,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author?.name || 'Barmagly'],
            images: post.image ? [{ url: post.image }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: excerpt,
            images: post.image ? [post.image] : undefined,
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
            '@id': `https://www.barmagly.tech/${lang}/blog/${slug}`
        }
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: lang === 'ar' ? 'الرئيسية' : 'Home', item: `https://www.barmagly.tech/${lang}` },
            { '@type': 'ListItem', position: 2, name: lang === 'ar' ? 'المدونة' : 'Blog', item: `https://www.barmagly.tech/${lang}/blog` },
            { '@type': 'ListItem', position: 3, name: title, item: `https://www.barmagly.tech/${lang}/blog/${slug}` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <BlogDetailClient post={post} lang={lang} />
        </>
    );
}
