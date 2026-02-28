import { SiteProvider } from '@/lib/contexts/SiteContext';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { SmoothScroll, ScrollProgress } from '@/components/ui/SmoothScroll';
import { getDictionary, Locale } from '@/i18n/getDictionary';
import { DictionaryProvider } from '@/lib/contexts/DictionaryContext';

export default async function PublicLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string }
}) {
    const lang = (params.lang || 'en') as Locale;
    const dict = await getDictionary(lang);

    return (
        <div className="lg:cursor-none">
            <ScrollProgress />
            <CustomCursor />
            <MouseGlow />
            <MouseGlow />
            <SiteProvider>
                <DictionaryProvider dict={dict}>
                    <Navbar dict={dict} lang={lang} getStartedText={dict.hero.ctaSecondary} />
                    <SmoothScroll>
                        {children}
                        <Footer dict={dict} lang={lang} />
                    </SmoothScroll>
                </DictionaryProvider>
            </SiteProvider>
            <WhatsAppButton />
            <WhatsAppButton />
        </div>
    );
}
