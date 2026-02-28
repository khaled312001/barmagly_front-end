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
import { WHATSAPP_URL, WHATSAPP_NUMBER, FACEBOOK_URL, LINKEDIN_URL } from '@/lib/utils';
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
            <TopHeader lang={lang} dict={dict} />
            <motion.nav
                variants={navbarVariants}
                animate={scrolled ? 'scrolled' : 'top'}
                transition={{ duration: 0.3 }}
                className={cn(
                    "fixed left-0 right-0 z-[100] transition-all duration-300",
                    scrolled ? "top-0" : "top-0 lg:top-[45px]"
                )}
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
                            {navLinks.map((link, i) => {
                                // Match active logic safely, preventing e.g. /services matching /
                                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== `/${lang}`);
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            'px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 relative group flex items-center gap-2',
                                            isActive
                                                ? 'text-brand-accent bg-brand-accent/5'
                                                : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
                                        )}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            className={cn(
                                                "p-1.5 rounded-lg transition-colors",
                                                isActive ? "bg-brand-accent/10 text-brand-accent" : "bg-white/5 text-brand-muted group-hover:text-brand-text group-hover:bg-brand-accent/5"
                                            )}
                                        >
                                            <Icon size={16} />
                                        </motion.div>
                                        <span>{link.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-full shadow-neon-cyan"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Link href={WHATSAPP_URL} target="_blank">
                                <Button variant="neon" size="sm" className="px-6">
                                    {getStartedText || dict?.nav?.getInTouch || 'Get in Touch'}
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
                            className="fixed top-0 right-0 bottom-0 w-[300px] z-[120] bg-brand-dark/95 backdrop-blur-2xl border-l border-brand-glass-border p-6 lg:hidden flex flex-col overflow-y-auto custom-scrollbar"
                        >
                            <div className="flex items-center justify-between mb-12 shrink-0">
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
                                                    'flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 relative overflow-hidden',
                                                    isActive
                                                        ? 'text-brand-accent bg-brand-accent/10 border border-brand-accent/20'
                                                        : 'text-brand-muted hover:text-brand-text hover:bg-white/5 border border-transparent'
                                                )}
                                            >
                                                <div className={cn(
                                                    "p-2 rounded-lg",
                                                    isActive ? "bg-brand-accent/20 text-brand-accent" : "bg-white/5 text-brand-muted"
                                                )}>
                                                    <link.icon size={20} />
                                                </div>
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
                                        {lang === 'en' ? (dict?.nav?.switchLanguage || 'العربية') : (dict?.nav?.switchLanguage || 'English')}
                                    </button>
                                    <Link href={WHATSAPP_URL} target="_blank">
                                        <Button variant="neon" size="lg" className="w-full shadow-neon-cyan/20">
                                            {getStartedText || dict?.nav?.getInTouch || 'Get in Touch'}
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Social & Contact Section */}
                            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-6">
                                <Link
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    className="flex items-center gap-4 text-brand-muted hover:text-brand-accent transition-all group"
                                >
                                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-colors">
                                        <Phone size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-brand-muted/50 font-bold">Call Us</span>
                                        <span className="text-sm font-bold tracking-wider">{WHATSAPP_NUMBER}</span>
                                    </div>
                                </Link>

                                <div className="flex flex-col gap-4">
                                    <span className="text-[10px] uppercase tracking-widest text-brand-muted/50 font-bold">Follow Us</span>
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={FACEBOOK_URL}
                                            target="_blank"
                                            className="p-4 rounded-2xl bg-white/5 text-brand-muted hover:text-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                                        >
                                            <Facebook size={22} />
                                        </Link>
                                        <Link
                                            href={LINKEDIN_URL}
                                            target="_blank"
                                            className="p-4 rounded-2xl bg-white/5 text-brand-muted hover:text-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                                        >
                                            <Linkedin size={22} />
                                        </Link>
                                        <Link
                                            href={WHATSAPP_URL}
                                            target="_blank"
                                            className="p-4 rounded-2xl bg-white/5 text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300"
                                        >
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/5 pb-6 shrink-0">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-center text-brand-muted font-bold opacity-30">
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
