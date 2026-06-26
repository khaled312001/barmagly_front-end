'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navbarVariants } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Menu, X, Globe, Home, Users, Cpu, Briefcase, Monitor, FileText, Mail, Phone, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store';
import { FACEBOOK_URL, LINKEDIN_URL } from '@/lib/utils';
import { TopHeader } from './TopHeader';

export function Navbar({ dict, lang, getStartedText }: { dict: any, lang: string, getStartedText?: string }) {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { isMobileMenuOpen, toggleMobileMenu, setMobileMenu } = useUIStore();

    const navLinks = [
        { href: `/${lang}`, label: dict?.navbar?.home || 'Home', icon: Home },
        { href: `/${lang}/about`, label: dict?.navbar?.about || 'About', icon: Users },
        { href: `/${lang}/services`, label: dict?.navbar?.services || 'Services', icon: Cpu },
        { href: `/${lang}/portfolio`, label: dict?.navbar?.portfolio || 'Portfolio', icon: Briefcase },
        { href: `/${lang}/pos`, label: dict?.navbar?.pos || 'POS', icon: Monitor },
        { href: `/${lang}/contact`, label: dict?.navbar?.contact || 'Contact', icon: Mail },
    ];

    const switchLanguage = (newLang: string) => {
        document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
        document.cookie = `NEXT_LOCALE_USER_CHOSEN=1; path=/; max-age=31536000`;
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
            <TopHeader lang={lang} dict={dict} scrolled={scrolled} />
            <motion.nav
                variants={navbarVariants}
                animate={scrolled ? 'scrolled' : 'top'}
                transition={{ duration: 0.3 }}
                className={cn(
                    "fixed left-0 right-0 z-[100] transition-all duration-300",
                    scrolled ? "top-0 bg-white shadow-card border-b border-brand-border" : "top-0 lg:top-[40px] bg-white/85 backdrop-blur-xl border-b border-brand-border/60"
                )}
            >
                <div className="section-container !py-0">
                    <div className={cn(
                        "flex items-center justify-between transition-all duration-300",
                        scrolled ? "h-16" : "h-20"
                    )}>
                        {/* Logo */}
                        <Link href={`/${lang}`} className="flex items-center gap-2.5 group">
                            <div className="relative w-10 h-10">
                                <Image src="/logo.png" alt="Barmagly Logo" width={40} height={40} className="rounded-xl object-contain" priority />
                            </div>
                            <span className="text-xl font-display font-bold text-brand-text tracking-tight">
                                Barmagly
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            'relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                                            isActive
                                                ? 'text-brand-accent'
                                                : 'text-brand-text-soft hover:text-brand-text'
                                        )}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute -bottom-[1px] left-3.5 right-3.5 h-[2px] bg-brand-accent rounded-full"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Link href={`/${lang}/contact`}>
                                <Button variant="primary" size="sm" className="px-5 h-10 rounded-lg">
                                    {getStartedText || dict?.nav?.getInTouch || 'Get in Touch'}
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2.5 rounded-lg bg-brand-surface text-brand-text hover:bg-brand-sunken transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenu(false)}
                            className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-[110] lg:hidden"
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[320px] z-[120] bg-white border-l border-brand-border p-6 lg:hidden flex flex-col overflow-y-auto shadow-card-lg"
                        >
                            <div className="flex items-center justify-between mb-8 shrink-0">
                                <Link href={`/${lang}`} className="flex items-center gap-2.5" onClick={() => setMobileMenu(false)}>
                                    <Image src="/logo.png" alt="Barmagly Logo" width={32} height={32} className="rounded-lg object-contain" />
                                    <span className="text-lg font-display font-bold text-brand-text">Barmagly</span>
                                </Link>
                                <button
                                    onClick={() => setMobileMenu(false)}
                                    className="p-2 rounded-lg bg-brand-surface text-brand-text hover:bg-brand-sunken transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-1">
                                {navLinks.map((link, i) => {
                                    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 + i * 0.03 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileMenu(false)}
                                                className={cn(
                                                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                                                    isActive
                                                        ? 'text-brand-accent bg-brand-accent-soft'
                                                        : 'text-brand-text hover:bg-brand-surface'
                                                )}
                                            >
                                                <link.icon size={18} className={isActive ? 'text-brand-accent' : 'text-brand-muted'} />
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    );
                                })}

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="mt-6 flex flex-col gap-3"
                                >
                                    <button
                                        onClick={() => switchLanguage(lang === 'en' ? 'ar' : 'en')}
                                        className="flex items-center justify-center gap-2 w-full h-11 rounded-lg text-sm font-medium text-brand-text-soft hover:text-brand-text bg-brand-surface hover:bg-brand-sunken transition-colors border border-brand-border"
                                    >
                                        <Globe size={16} />
                                        {lang === 'en' ? 'العربية' : 'English'}
                                    </button>
                                    <Link href={`/${lang}/contact`}>
                                        <Button variant="primary" size="md" className="w-full h-11">
                                            {getStartedText || dict?.nav?.getInTouch || 'Get in Touch'}
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-brand-border flex flex-col gap-4">
                                <span className="text-[11px] uppercase tracking-[0.18em] text-brand-muted font-semibold">
                                    {dict?.nav?.followUs || 'Follow Us'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={FACEBOOK_URL}
                                        target="_blank"
                                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-surface text-brand-text-soft hover:text-brand-accent hover:bg-brand-accent-soft transition-colors"
                                        aria-label="Facebook"
                                    >
                                        <Facebook size={18} />
                                    </Link>
                                    <Link
                                        href={LINKEDIN_URL}
                                        target="_blank"
                                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-surface text-brand-text-soft hover:text-brand-accent hover:bg-brand-accent-soft transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin size={18} />
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 shrink-0">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-center text-brand-subtle font-medium">
                                    {dict?.nav?.craftingExcellence || 'Crafting Excellence'}
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
