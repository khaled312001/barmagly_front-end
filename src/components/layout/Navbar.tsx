'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navbarVariants } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store';
import { WHATSAPP_URL } from '@/lib/utils';

import { Globe } from 'lucide-react';

export function Navbar({ dict, lang, getStartedText }: { dict: any, lang: string, getStartedText?: string }) {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { isMobileMenuOpen, toggleMobileMenu, setMobileMenu } = useUIStore();

    const navLinks = [
        { href: `/${lang}`, label: dict.home },
        { href: `/${lang}/about`, label: dict.about },
        { href: `/${lang}/services`, label: dict.services },
        { href: `/${lang}/portfolio`, label: dict.portfolio },
        { href: `/${lang}/blog`, label: dict.blog },
        { href: `/${lang}/contact`, label: dict.contact },
    ];

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

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenu(false);
    }, [pathname, setMobileMenu]);

    return (
        <>
            <motion.nav
                variants={navbarVariants}
                animate={scrolled ? 'scrolled' : 'top'}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 z-[100] transition-colors duration-300"
            >
                <div className="section-container !py-0">
                    <div className="flex items-center justify-between h-24">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-12 h-12">
                                <Image src="/logo.png" alt="Barmagly Logo" width={48} height={48} className="rounded-2xl object-contain" priority />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-secondary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                            </div>
                            <span className="text-2xl font-display font-bold text-brand-text">
                                Barm<span className="gradient-text">agly</span>
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navLinks.map((link) => {
                                // Match active logic safely, preventing e.g. /services matching /
                                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative',
                                            isActive
                                                ? 'text-brand-accent bg-brand-accent/5'
                                                : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
                                        )}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-full shadow-neon-cyan"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-3">
                            <button
                                onClick={() => switchLanguage(lang === 'en' ? 'ar' : 'en')}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-brand-muted hover:text-brand-text hover:bg-white/5 transition-colors border border-transparent"
                            >
                                <Globe size={16} />
                                {lang === 'en' ? dict.nav.switchShort : dict.nav.switchShort}
                            </button>
                            <Link href={WHATSAPP_URL} target="_blank">
                                <Button variant="neon" size="sm" className="px-6">
                                    {getStartedText || dict.nav.getInTouch}
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-3 rounded-xl bg-white/5 text-brand-muted hover:text-brand-text transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenu(false)}
                            className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[110] lg:hidden"
                        />

                        {/* Sidebar Content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[300px] z-[120] bg-brand-dark/90 backdrop-blur-2xl border-l border-brand-glass-border p-8 lg:hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenu(false)}>
                                    <Image src="/logo.png" alt="Barmagly Logo" width={32} height={32} className="rounded-lg object-contain" />
                                    <span className="text-xl font-display font-bold text-brand-text">
                                        Barm<span className="gradient-text">agly</span>
                                    </span>
                                </Link>
                                <button
                                    onClick={() => setMobileMenu(false)}
                                    className="p-2 rounded-lg bg-white/5 text-brand-muted hover:text-brand-text transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-2">
                                {navLinks.map((link, i) => {
                                    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileMenu(false)}
                                                className={cn(
                                                    'flex items-center px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 relative overflow-hidden',
                                                    isActive
                                                        ? 'text-brand-accent bg-brand-accent/10 border border-brand-accent/20'
                                                        : 'text-brand-muted hover:text-brand-text hover:bg-white/5 border border-transparent'
                                                )}
                                            >
                                                {link.label}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="mobile-sidebar-active"
                                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-accent shadow-neon-cyan"
                                                    />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-8 flex flex-col gap-4"
                                >
                                    <button
                                        onClick={() => switchLanguage(lang === 'en' ? 'ar' : 'en')}
                                        className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl text-lg font-bold text-brand-muted hover:text-brand-text hover:bg-white/5 transition-colors border border-brand-glass-border"
                                    >
                                        <Globe size={20} />
                                        {lang === 'en' ? dict.nav.switchLanguage : dict.nav.switchLanguage}
                                    </button>
                                    <Link href={WHATSAPP_URL} target="_blank">
                                        <Button variant="neon" size="lg" className="w-full shadow-neon-cyan/20">
                                            {getStartedText || dict.nav.getInTouch}
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="mt-auto pt-8 border-t border-brand-glass-border">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-center text-brand-muted font-bold opacity-50">
                                    {dict.nav.craftingExcellence}
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
