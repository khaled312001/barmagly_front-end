/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    // Force-include nodemailer in the standalone bundle so the contact / newsletter
    // API routes have it at runtime even though it's only referenced server-side.
    outputFileTracingIncludes: {
        '/api/leads': ['./node_modules/nodemailer/**/*'],
        '/api/newsletter': ['./node_modules/nodemailer/**/*'],
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                ],
            },
            // Admin pages must never be cached by the CDN — the build hash bakes asset
            // URLs into the HTML, and a stale CDN entry would point at chunks that no
            // longer exist after redeploy.
            {
                source: '/admin/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, max-age=0' },
                    { key: 'CDN-Cache-Control', value: 'no-store' },
                    { key: 'Surrogate-Control', value: 'no-store' },
                    { key: 'Pragma', value: 'no-cache' },
                ],
            },
            // Same protection for the API routes (especially auth/admin endpoints).
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, max-age=0' },
                    { key: 'CDN-Cache-Control', value: 'no-store' },
                    { key: 'Surrogate-Control', value: 'no-store' },
                ],
            },
        ];
    },
};

export default nextConfig;
