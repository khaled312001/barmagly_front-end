import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://www.barmagly.tech';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/api/',
                '/uploads/',
                // Legacy listing URLs that 404 today; block re-crawl while
                // 301 redirects do their job.
                '/blogs',
                '/blogs/',
                '/blogs?*',
                '/custom-page/',
                '/team/',
                '/service/',
            ],
        },
        host: baseUrl,
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
