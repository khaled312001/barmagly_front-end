'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, FileText, Briefcase, MessageSquare, Mail, TrendingUp, ArrowUpRight, Zap, Globe, ShieldCheck } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';

interface Stats {
    totalLeads: number;
    newLeads: number;
    totalProjects: number;
    totalPosts: number;
    totalTestimonials: number;
    totalSubscribers: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await adminApi.getStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = stats ? [
        { label: 'Total Leads', value: stats.totalLeads, icon: Mail, color: 'from-blue-500 to-cyan-500', change: `${stats.newLeads} new` },
        { label: 'Projects', value: stats.totalProjects, icon: Briefcase, color: 'from-purple-500 to-pink-500', change: 'Portfolio items' },
        { label: 'Blog Posts', value: stats.totalPosts, icon: FileText, color: 'from-orange-500 to-red-500', change: 'Published articles' },
        { label: 'Testimonials', value: stats.totalTestimonials, icon: MessageSquare, color: 'from-green-500 to-emerald-500', change: 'Client reviews' },
        { label: 'Subscribers', value: stats.totalSubscribers, icon: Users, color: 'from-cyan-500 to-blue-500', change: 'Newsletter' },
    ] : [];

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h2 className="text-2xl font-display font-bold text-brand-text mb-1">Dashboard Overview</h2>
                <p className="text-brand-muted text-sm">Welcome back! Here&apos;s what&apos;s happening with your website.</p>
            </div>

            {/* Stats Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="skeleton h-32 rounded-2xl" />
                    ))}
                </div>
            ) : (
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                >
                    {cards.map((card, i) => (
                        <motion.div key={i} variants={staggerItem}>
                            <div className="glass-card p-5 hover-glow group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} bg-opacity-20`}>
                                        <card.icon size={20} className="text-white" />
                                    </div>
                                    <ArrowUpRight size={16} className="text-brand-muted group-hover:text-brand-accent transition-colors" />
                                </div>
                                <div className="text-2xl font-display font-bold text-brand-text mb-1">
                                    {card.value}
                                </div>
                                <div className="text-sm text-brand-muted">{card.label}</div>
                                <div className="text-xs text-brand-accent mt-2">{card.change}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Quick Actions */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-display font-bold text-brand-text mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: 'New Blog Post', href: '/admin/blog', icon: FileText },
                        { label: 'Manage Leads', href: '/admin/leads', icon: Mail },
                        { label: 'Add Project', href: '/admin/portfolio', icon: Briefcase },
                        { label: 'Site Settings', href: '/admin/settings', icon: TrendingUp },
                    ].map((action) => (
                        <a
                            key={action.label}
                            href={action.href}
                            className="flex items-center gap-3 p-3 rounded-xl bg-brand-surface/50 hover:bg-brand-accent/10 border border-brand-glass-border hover:border-brand-accent/30 transition-all group"
                        >
                            <action.icon size={18} className="text-brand-muted group-hover:text-brand-accent transition-colors" />
                            <span className="text-sm text-brand-muted group-hover:text-brand-text transition-colors">{action.label}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-display font-bold text-brand-text">Latest Leads</h3>
                    <a href="/admin/leads" className="text-sm text-brand-accent hover:underline">View all →</a>
                </div>
                <div className="text-brand-muted text-sm">
                    Leads will appear here once the backend is connected and lead submissions flow in.
                </div>
            </div>
        </div>
    );
}
