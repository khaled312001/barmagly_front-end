import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

// Per-section canonical + hreflang (overrides the homepage default from the
// parent [lang] layout). Detail pages under here set their own canonical.
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    return { alternates: buildAlternates(params.lang, '/services') };
}

export default function SectionLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
