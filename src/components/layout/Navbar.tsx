'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, ArrowRight, Globe, Linkedin, Facebook } from 'lucide-react';
import { useUIStore } from '@/store';
import { FACEBOOK_URL, LINKEDIN_URL } from '@/lib/utils';
import { TopHeader } from './TopHeader';

export function Navbar({ dict, lang, getStartedText }: { dict: any, lang: string, getStartedText?: string }) {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { isMobileMenuOpen, toggleMobileMenu, setMobileMenu } = useUIStore();

    const navLinks = [
        { href: `/${lang}`, label: dict?.navbar?.home || 'Home' },
        { href: `/${lang}/about`, label: dict?.navbar?.about || 'About' },
        { href: `/${lang}/services`, label: dict?.navbar?.services || 'Services' },
        { href: `/${lang}/portfolio`, label: dict?.navbar?.portfolio || 'Work' },
        { href: `/${lang}/pos`, label: dict?.navbar?.pos || 'POS' },
        { href: `/${lang}/blog`, label: dict?.navbar?.blog || 'Journal' },
        { href: `/${lang}/contact`, label: dict?.navbar?.contact || 'Contact' },
    ];

    const switchLanguage = (newLang: string) => {
        document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
        document.cookie = `NEXT_LOCALE_USER_CHOSEN=1; path=/; max-age=31536000`;
        const segments = pathname.split('/').filter(Boolean);
        if (segments[0] === lang) segments[0] = newLang;
        else segments.unshift(newLang);
        window.location.href = '/' + segments.join('/');
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenu(false);
    }, [pathname, setMobileMenu]);

    const startProject = lang === 'ar' ? 'ابدأ مشروعك' : (getStartedText || 'Start a project');

    return (
        <>
            <TopHeader lang={lang} dict={dict} scrolled={scrolled} />
            <header
                className={cn(
                    'fixed left-0 right-0 z-[100] transition-all duration-300 border-b',
                    scrolled
                        ? 'top-0 bg-brand-primary/90 backdrop-blur-sm border-brand-border'
                        : 'top-0 md:top-10 bg-brand-primary border-brand-border'
                )}
            >
                <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
                    <nav className="h-20 lg:h-[88px] flex items-center justify-between">
                        {/* Logo only — bigger */}
                        <Link href={`/${lang}`} className="flex items-center" aria-label="Barmagly">
                            <div className="relative w-[120px] h-[60px] lg:w-[160px] lg:h-[72px]">
                                <Image
                                    src="/logo.jpg"
                                    alt="Barmagly"
                                    fill
                                    sizes="(min-width: 1024px) 160px, 120px"
                                    priority
                                    className="object-contain object-left"
                                />
                            </div>
                        </Link>

                        {/* Center nav */}
                        <ul className="hidden lg:flex items-center gap-8 xl:gap-10 text-[14px] text-brand-text-soft">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                'relative py-1 transition-colors duration-200',
                                                isActive ? 'text-brand-text' : 'hover:text-brand-text'
                                            )}
                                        >
                                            {link.label}
                                            {isActive && (
                                                <motion.span
                                                    layoutId="navbar-indicator"
                                                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-brand-accent"
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Right CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-brand-accent text-brand-on-ink text-[13px] font-medium hover:bg-brand-accent-hover transition-all duration-200 hover:-translate-y-[1px]"
                            >
                                {startProject}
                                <ArrowRight size={14} className="rtl:rotate-180" />
                            </Link>
                        </div>

                        {/* Mobile toggle */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-md text-brand-text hover:bg-brand-sunken transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </nav>
                </div>
            </header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenu(false)}
                            className="fixed inset-0 bg-brand-ink/30 z-[110] md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                            className="fixed top-0 right-0 bottom-0 w-[320px] z-[120] bg-brand-primary border-l border-brand-border p-6 md:hidden flex flex-col overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-10 shrink-0">
                                <Link href={`/${lang}`} className="flex items-center" onClick={() => setMobileMenu(false)} aria-label="Barmagly">
                                    <div className="relative w-[120px] h-[56px]">
                                        <Image src="/logo.jpg" alt="Barmagly" fill sizes="120px" className="object-contain object-left" />
                                    </div>
                                </Link>
                                <button
                                    onClick={() => setMobileMenu(false)}
                                    className="p-2 rounded-md text-brand-text hover:bg-brand-sunken transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <ul className="flex flex-col gap-1">
                                {navLinks.map((link, i) => {
                                    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
                                    return (
                                        <motion.li
                                            key={link.href}
                                            initial={{ opacity: 0, x: 8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.04 + i * 0.025 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileMenu(false)}
                                                className={cn(
                                                    'flex items-center justify-between px-3 py-3 text-[15px] border-b border-brand-border transition-colors',
                                                    isActive
                                                        ? 'text-brand-accent font-medium'
                                                        : 'text-brand-text hover:text-brand-accent'
                                                )}
                                            >
                                                {link.label}
                                                <ArrowRight size={14} className="opacity-40 rtl:rotate-180" />
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>

                            <Link
                                href={`/${lang}/contact`}
                                onClick={() => setMobileMenu(false)}
                                className="mt-8 inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-brand-accent text-brand-on-ink font-medium hover:bg-brand-accent-hover transition-colors"
                            >
                                {startProject}
                                <ArrowRight size={15} className="rtl:rotate-180" />
                            </Link>

                            <div className="mt-auto pt-8 flex items-center justify-between border-t border-brand-border">
                                <button
                                    onClick={() => switchLanguage(lang === 'en' ? 'ar' : 'en')}
                                    className="flex items-center gap-2 text-[13px] text-brand-text-soft hover:text-brand-text transition-colors"
                                >
                                    <Globe size={14} />
                                    {lang === 'en' ? 'العربية' : 'English'}
                                </button>
                                <div className="flex items-center gap-3">
                                    <Link href={LINKEDIN_URL} target="_blank" className="text-brand-muted hover:text-brand-accent transition-colors" aria-label="LinkedIn">
                                        <Linkedin size={16} />
                                    </Link>
                                    <Link href={FACEBOOK_URL} target="_blank" className="text-brand-muted hover:text-brand-accent transition-colors" aria-label="Facebook">
                                        <Facebook size={16} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
