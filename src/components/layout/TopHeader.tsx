'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Facebook, Linkedin, Globe, MessageCircle } from 'lucide-react';
import { cn, OFFICE_PHONE, FACEBOOK_URL, LINKEDIN_URL, WHATSAPP_PHONE, WHATSAPP_URL } from '@/lib/utils';

export function TopHeader({ lang, dict, scrolled = false }: { lang: string, dict: any, scrolled?: boolean }) {
    const pathname = usePathname();

    const switchLanguage = (newLang: string) => {
        document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
        const segments = pathname.split('/').filter(Boolean);
        if (segments[0] === lang) {
            segments[0] = newLang;
        } else {
            segments.unshift(newLang);
        }
        window.location.href = '/' + segments.join('/');
    };

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: scrolled ? -50 : 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 hidden lg:flex items-center h-[45px] w-full bg-brand-dark/80 backdrop-blur-md border-b border-white/5 z-[110]"
        >
            <div className="section-container !py-0 flex items-center justify-between text-xs font-bold tracking-wider">
                <div className="flex items-center gap-6">
                    <a
                        href={`tel:${OFFICE_PHONE.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-brand-muted hover:text-brand-accent transition-colors duration-300"
                    >
                        <Phone size={14} className="text-brand-accent" />
                        <span dir="ltr">{OFFICE_PHONE}</span>
                    </a>
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-brand-muted hover:text-brand-accent transition-colors duration-300"
                    >
                        <MessageCircle size={14} className="text-brand-accent" />
                        <span dir="ltr">{WHATSAPP_PHONE}</span>
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-brand-muted/50 uppercase text-[10px]">{dict?.nav?.followUs || 'Follow Us'}</span>
                    <div className="flex items-center gap-3">
                        <Link
                            href={FACEBOOK_URL}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-white/5 text-brand-muted hover:text-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                        >
                            <Facebook size={14} />
                        </Link>
                        <Link
                            href={LINKEDIN_URL}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-white/5 text-brand-muted hover:text-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                        >
                            <Linkedin size={14} />
                        </Link>
                        <div className="w-px h-4 bg-white/10 mx-1" />

                        <button
                            onClick={() => switchLanguage(lang === 'en' ? 'ar' : 'en')}
                            className="flex items-center gap-2 px-2 py-1 rounded-lg text-[10px] font-black text-brand-muted hover:text-brand-accent hover:bg-brand-accent/5 transition-all duration-300"
                        >
                            <Globe size={12} className="text-brand-accent" />
                            {lang === 'en' ? 'العربية' : 'ENGLISH'}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
