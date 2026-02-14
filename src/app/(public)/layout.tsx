"use client";
import { SiteProvider } from '@/lib/contexts/SiteContext';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { SmoothScroll, ScrollProgress } from '@/components/ui/SmoothScroll';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="lg:cursor-none">
            <ScrollProgress />
            <CustomCursor />
            <MouseGlow />
            <MouseGlow />
            <SiteProvider>
                <Navbar />
                <SmoothScroll>
                    {children}
                    <Footer />
                </SmoothScroll>
            </SiteProvider>
            <WhatsAppButton />
            <WhatsAppButton />
        </div>
    );
}
