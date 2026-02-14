import { MetadataRoute } from 'next';
import { adminApi, publicApi } from '@/lib/api'; // Or direct fetch if possible, but api client works

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://barmagly.com';

    // Static routes
    const routes = [
        '',
        '/about',
        '/services',
        '/portfolio',
        '/blog',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes (fetch from API ideally, but for now placeholder or try fetch)
    // Since this runs at build time or request time on server, we can fetch
    // But let's keep it simple and robust for now given limited context access to exact API shape here without complex setup

    return [...routes];
}
