'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Linkedin, Facebook } from 'lucide-react';
import {
    OFFICE_PHONE,
    FACEBOOK_URL,
    LINKEDIN_URL,
    WHATSAPP_PHONE,
    WHATSAPP_URL,
    COMPANY_LICENSE,
} from '@/lib/utils';

export function TopHeader({ lang, dict, scrolled = false }: { lang: string, dict: any, scrolled?: boolean }) {
    const pathname = usePathname();

    const switchLanguage = (newLang: string) => {
        document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
        document.cookie = `NEXT_LOCALE_USER_CHOSEN=1; path=/; max-age=31536000`;
        const segments = pathname.split('/').filter(Boolean);
        if (segments[0] === lang) segments[0] = newLang;
        else segments.unshift(newLang);
        window.location.href = '/' + segments.join('/');
    };

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: scrolled ? -48 : 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 right-0 hidden md:block bg-brand-ink text-brand-on-ink border-b border-brand-ink-soft z-[110]"
        >
            <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10 h-10 flex items-center justify-between text-[12px] tracking-wide">
                <div className="flex items-center gap-5 min-w-0 text-brand-on-ink/85">
                    <a href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-brand-accent transition-colors">
                        <Phone size={12} />
                        <span dir="ltr">{OFFICE_PHONE}</span>
                    </a>
                    <span className="w-px h-3 bg-brand-ink-soft" />
                    <a href={`mailto:info@barmagly.tech`} className="flex items-center gap-2 hover:text-brand-accent transition-colors hidden lg:inline-flex">
                        <Mail size={12} />
                        info@barmagly.tech
                    </a>
                </div>

                <div className="flex items-center gap-5 shrink-0 text-brand-on-ink/70">
                    <span className="hidden lg:inline-flex items-center gap-2">
                        <MapPin size={12} />
                        Zürich, CH
                    </span>
                    <span className="hidden lg:block w-px h-3 bg-brand-ink-soft" />
                    <span className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em]">
                        CR {COMPANY_LICENSE}
                    </span>
                    <span className="w-px h-3 bg-brand-ink-soft" />
                    <div className="flex items-center gap-2">
                        <Link href={LINKEDIN_URL} target="_blank" aria-label="LinkedIn" className="text-brand-on-ink/70 hover:text-brand-accent transition-colors">
                            <Linkedin size={13} />
                        </Link>
                        <Link href={FACEBOOK_URL} target="_blank" aria-label="Facebook" className="text-brand-on-ink/70 hover:text-brand-accent transition-colors">
                            <Facebook size={13} />
                        </Link>
                    </div>
                    <span className="w-px h-3 bg-brand-ink-soft" />
                    <button
                        onClick={() => switchLanguage(lang === 'en' ? 'ar' : 'en')}
                        className="px-2.5 py-0.5 rounded-full border border-brand-ink-soft text-[11px] uppercase tracking-[0.14em] hover:border-brand-accent hover:text-brand-accent transition-colors"
                    >
                        {lang === 'en' ? 'AR' : 'EN'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
