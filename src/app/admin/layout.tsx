'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, FileText, Briefcase, MessageSquare, Users, HelpCircle,
    Settings, Image, Search, LogOut, Menu, X, ChevronRight, BarChart3,
    Megaphone, Globe, Mail, Layers
} from 'lucide-react';
import { useAuthStore } from '@/store';
import { adminApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import { ToastProvider } from '@/components/ui/Toast';

const sidebarLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/pages', label: 'Pages', icon: Layers },
    { href: '/admin/services', label: 'Services', icon: Briefcase },
    { href: '/admin/portfolio', label: 'Portfolio', icon: Image },
    { href: '/admin/blog', label: 'Blog', icon: FileText },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/admin/team', label: 'Team', icon: Users },
    { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/admin/leads', label: 'Leads', icon: Mail },
    { href: '/admin/media', label: 'Media', icon: Image },
    { href: '/admin/seo', label: 'SEO', icon: Globe },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, isLoading, setUser, setLoading, logout } = useAuthStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');

            // If on login page and have token, we'll try to verify it
            // If not on login page and no token, redirect to login
            if (!token && pathname !== '/admin/login') {
                router.push('/admin/login');
                setLoading(false);
                return;
            }

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await adminApi.getProfile();
                setUser(data);
                // If on login page and now authenticated, go to dashboard
                if (pathname === '/admin/login') {
                    router.push('/admin/dashboard');
                }
            } catch {
                logout();
                if (pathname !== '/admin/login') {
                    router.push('/admin/login');
                }
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [router, setUser, setLoading, logout, pathname]);

    const handleLogout = () => {
        logout();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated && pathname !== '/admin/login') {
        return null; // Will redirect in useEffect
    }

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col lg:flex-row relative">
            {/* Sidebar */}
            <aside className={cn(
                'fixed lg:sticky top-0 inset-y-0 left-0 z-[60] w-72 bg-brand-surface/80 backdrop-blur-xl border-r border-brand-glass-border flex flex-col transition-all duration-500 ease-in-out lg:translate-x-0 lg:h-screen',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )}>
                {/* Logo */}
                <div className="h-20 flex items-center px-8 border-b border-brand-glass-border gap-4">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center font-display font-bold text-white text-lg shadow-neon-cyan/20">
                            B
                        </div>
                        <span className="font-display font-bold text-xl text-brand-text">
                            Barm<span className="gradient-text">agly</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden ml-auto p-2 rounded-lg bg-white/5 text-brand-muted hover:text-brand-text transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setSidebarOpen(false)}
                                className={cn(
                                    'group flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden',
                                    isActive
                                        ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20'
                                        : 'text-brand-muted hover:text-brand-text hover:bg-white/5 border border-transparent'
                                )}
                            >
                                <link.icon size={20} className={cn(
                                    'transition-transform duration-300 group-hover:scale-110',
                                    isActive ? 'text-brand-accent' : 'text-brand-muted group-hover:text-brand-accent'
                                )} />
                                {link.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="admin-nav-active"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-accent shadow-neon-cyan"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="p-6 border-t border-brand-glass-border bg-black/20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent text-lg font-bold shadow-inner">
                            {user?.name?.[0] || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-brand-text truncate uppercase tracking-wider">{user?.name}</p>
                            <p className="text-[10px] font-medium text-brand-accent/60 uppercase tracking-widest">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-muted border border-white/5 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300"
                    >
                        <LogOut size={14} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
                {/* Top bar */}
                <header className="sticky top-0 z-40 h-20 bg-brand-dark/50 backdrop-blur-xl border-b border-brand-glass-border flex items-center justify-between px-6 lg:px-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2.5 rounded-xl bg-white/5 text-brand-muted hover:text-brand-text transition-colors border border-white/10"
                        >
                            <Menu size={22} />
                        </button>
                        <h1 className="text-xl font-display font-bold text-brand-text capitalize tracking-tight">
                            {pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            target="_blank"
                            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/5 border border-brand-accent/20 hover:bg-brand-accent hover:text-brand-primary transition-all duration-300 shadow-neon-cyan/10"
                        >
                            View Site
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 lg:p-10">
                    <ToastProvider>
                        <div className="max-w-[1600px] mx-auto">
                            {children}
                        </div>
                    </ToastProvider>
                </main>
            </div>
        </div>
    );
}
