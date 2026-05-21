import { MetadataRoute } from 'next';
import { readAll } from '@/lib/dataStore';
import { getAllServices } from '@/data/services';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://www.barmagly.tech';
const LOCALES = ['en', 'ar'] as const;

type Sitemap = MetadataRoute.Sitemap;

// Generate one canonical entry per path with hreflang alternates so Google can
// pick the right language and stop flagging /en and /ar as duplicates.
function entry(
    path: string,
    opts: { lastModified?: Date; changeFrequency?: Sitemap[number]['changeFrequency']; priority?: number }
): Sitemap[number] {
    const suffix = path === '' ? '' : path;
    return {
        url: `${SITE_URL}/en${suffix}`,
        lastModified: opts.lastModified || new Date(),
        changeFrequency: opts.changeFrequency || 'weekly',
        priority: opts.priority ?? 0.7,
        alternates: {
            languages: {
                en: `${SITE_URL}/en${suffix}`,
                ar: `${SITE_URL}/ar${suffix}`,
                'x-default': `${SITE_URL}/en${suffix}`,
            },
        },
    };
}

export default async function sitemap(): Promise<Sitemap> {
    const staticRoutes: Sitemap = [
        { path: '', priority: 1.0, changeFrequency: 'daily' as const },
        { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
        { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
        { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
        { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    ].map(({ path, priority, changeFrequency }) =>
        entry(path, { priority, changeFrequency })
    );

    // Services from the rich static catalogue (always available).
    const services = getAllServices().map((s) =>
        entry(`/services/${s.slug}`, { changeFrequency: 'weekly', priority: 0.8 })
    );

    try {
        const [portfolioItems, blogItems] = await Promise.all([
            readAll<any>('portfolio').catch(() => []),
            readAll<any>('blog').catch(() => []),
        ]);

        const portfolio = portfolioItems
            .filter((p) => p.isActive !== false)
            .map((p) =>
                entry(`/portfolio/${p.slug}`, {
                    lastModified: new Date(p.updatedAt || p.createdAt || Date.now()),
                    changeFrequency: 'monthly',
                    priority: 0.7,
                })
            );

        const blog = blogItems
            .filter((p) => p.status !== 'DRAFT')
            .map((p) =>
                entry(`/blog/${p.slug}`, {
                    lastModified: new Date(p.updatedAt || p.publishedAt || Date.now()),
                    changeFrequency: 'weekly',
                    priority: 0.7,
                })
            );

        return [...staticRoutes, ...services, ...portfolio, ...blog];
    } catch (error) {
        console.error('Sitemap generation failed to read data store:', error);
        return [...staticRoutes, ...services];
    }
}
