import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-brand-primary px-6 py-24 text-center">
            <div className="max-w-xl">
                <p className="text-sm font-semibold tracking-widest text-brand-accent uppercase mb-3">
                    404 — Not Found
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    We can&apos;t find that page
                </h1>
                <p className="text-white/70 mb-8">
                    The page you requested has been moved or no longer exists. Browse one of
                    our sections below to get back on track.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/en"
                        className="inline-flex items-center justify-center rounded-md bg-brand-accent px-5 py-2.5 text-sm font-semibold text-brand-primary hover:bg-brand-accent/90 transition"
                    >
                        Go to Homepage
                    </Link>
                    <Link
                        href="/en/services"
                        className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                        Our Services
                    </Link>
                    <Link
                        href="/en/blog"
                        className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                        Read the Blog
                    </Link>
                    <Link
                        href="/en/contact"
                        className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </main>
    );
}
