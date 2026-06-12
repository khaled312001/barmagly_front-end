import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://www.barmagly.tech';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // Block only genuinely-private paths. Legacy URLs (`/blogs`, `/team/`,
            // `/service/`, `/custom-page/`) MUST stay crawlable so Google can follow
            // their 301 redirects and drop the dead URLs from its index. Disallowing
            // them traps the URLs in "Blocked by robots.txt" indefinitely.
            disallow: ['/admin/', '/api/', '/uploads/'],
        },
        host: baseUrl,
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
