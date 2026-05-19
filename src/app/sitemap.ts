import { MetadataRoute } from 'next';
import { publicApi } from '@/lib/api';
import { getAllProjects } from '@/data/portfolio';

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

    // Static portfolio is always available (no DB needed).
    const staticPortfolio = getAllProjects().map((p) =>
        entry(`/portfolio/${p.slug}`, {
            lastModified: new Date(p.updatedAt),
            changeFrequency: 'monthly',
            priority: 0.8,
        })
    );

    try {
        const [servicesRes, portfolioRes, blogRes] = await Promise.all([
            publicApi.getServices().catch(() => ({ data: [] })),
            publicApi.getPortfolio().catch(() => ({ data: [] })),
            publicApi.getBlog().catch(() => ({ data: { posts: [] } })),
        ]);

        const services = (servicesRes.data || []).map((service: any) =>
            entry(`/services/${service.slug}`, {
                lastModified: new Date(service.updatedAt || Date.now()),
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        );

        const apiPortfolio = (portfolioRes.data || []).map((project: any) =>
            entry(`/portfolio/${project.slug}`, {
                lastModified: new Date(project.updatedAt || Date.now()),
                changeFrequency: 'monthly',
                priority: 0.7,
            })
        );

        // Dedupe by URL — static wins.
        const seen = new Set<string>(staticPortfolio.map((e) => e.url));
        const portfolio = [
            ...staticPortfolio,
            ...apiPortfolio.filter((e: typeof apiPortfolio[number]) => !seen.has(e.url)),
        ];

        const posts = Array.isArray(blogRes.data) ? blogRes.data : (blogRes.data.posts || []);
        const blog = posts.map((post: any) =>
            entry(`/blog/${post.slug}`, {
                lastModified: new Date(post.updatedAt || post.publishedAt || Date.now()),
                changeFrequency: 'weekly',
                priority: 0.7,
            })
        );

        return [...staticRoutes, ...services, ...portfolio, ...blog];
    } catch (error) {
        console.error('Sitemap generation failed to fetch dynamic content:', error);
        return [...staticRoutes, ...staticPortfolio];
    }
}
