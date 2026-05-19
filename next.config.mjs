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
        ];
    },
};

export default nextConfig;
