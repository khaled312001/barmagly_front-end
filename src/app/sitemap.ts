import { MetadataRoute } from 'next';
import { publicApi } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://www.barmagly.tech';

    // Static routes
    const routes = [
        '',
        '/about',
        '/services',
        '/portfolio',
        '/blog',
        '/contact',
        '/repair', // Utility page
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    try {
        // Fetch dynamic routes concurrently
        const [servicesRes, portfolioRes, blogRes] = await Promise.all([
            publicApi.getServices().catch(() => ({ data: [] })),
            publicApi.getPortfolio().catch(() => ({ data: [] })),
            publicApi.getBlog().catch(() => ({ data: { posts: [] } })), // Blog usually returns { posts: [], meta: ... }
        ]);

        const services = (servicesRes.data || []).map((service: any) => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: new Date(service.updatedAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }));

        const portfolio = (portfolioRes.data || []).map((project: any) => ({
            url: `${baseUrl}/portfolio/${project.slug}`,
            lastModified: new Date(project.updatedAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        // Handle potential different response structure for blog (pagination etc)
        const blogPosts = (Array.isArray(blogRes.data) ? blogRes.data : (blogRes.data.posts || [])).map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updatedAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        return [...routes, ...services, ...portfolio, ...blogPosts];

    } catch (error) {
        console.error('Sitemap generation failed to fetch dynamic content:', error);
        return [...routes];
    }
}
