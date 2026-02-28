'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Facebook, Linkedin, Globe } from 'lucide-react';
import { cn, WHATSAPP_NUMBER, WHATSAPP_URL, FACEBOOK_URL, LINKEDIN_URL } from '@/lib/utils';

export function TopHeader({ lang, dict }: { lang: string, dict: any }) {
    const [scrolled, setScrolled] = React.useState(false);
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
                    <Link
                        href={WHATSAPP_URL}
                        target="_blank"
                        className="flex items-center gap-2 text-brand-muted hover:text-brand-accent transition-colors duration-300"
                    >
                        <Phone size={14} className="text-brand-accent" />
                        <span>{WHATSAPP_NUMBER}</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-brand-muted/50 uppercase text-[10px]">Follow Us</span>
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
                        {/* WhatsApp icon as requested */}
                        <Link
                            href={WHATSAPP_URL}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-white/5 text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
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
