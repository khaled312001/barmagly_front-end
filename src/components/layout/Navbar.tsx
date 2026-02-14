'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navbarVariants } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store';
import { WHATSAPP_URL } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { isMobileMenuOpen, toggleMobileMenu, setMobileMenu } = useUIStore();

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
                            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center font-display font-bold text-white text-xl">
                                B
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-secondary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                            </div>
                            <span className="text-2xl font-display font-bold text-brand-text">
                                Barm<span className="gradient-text">agly</span>
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative',
                                        pathname === link.href
                                            ? 'text-brand-accent bg-brand-accent/5'
                                            : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
                                    )}
                                >
                                    {link.label}
                                    {pathname === link.href && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-full shadow-neon-cyan"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Link href={WHATSAPP_URL} target="_blank">
                                <Button variant="neon" size="sm" className="px-6">
                                    Get in Touch
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
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center font-display font-bold text-white text-sm">
                                        B
                                    </div>
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
                                {navLinks.map((link, i) => (
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
                                                pathname === link.href
                                                    ? 'text-brand-accent bg-brand-accent/10 border border-brand-accent/20'
                                                    : 'text-brand-muted hover:text-brand-text hover:bg-white/5 border border-transparent'
                                            )}
                                        >
                                            {link.label}
                                            {pathname === link.href && (
                                                <motion.div
                                                    layoutId="mobile-sidebar-active"
                                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-accent shadow-neon-cyan"
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-8"
                                >
                                    <Link href={WHATSAPP_URL} target="_blank">
                                        <Button variant="neon" size="lg" className="w-full shadow-neon-cyan/20">
                                            Get in Touch
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="mt-auto pt-8 border-t border-brand-glass-border">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-center text-brand-muted font-bold opacity-50">
                                    Crafting Digital Excellence
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
