'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ChevronRight, LayoutTemplate, Briefcase, User, Mail, Image, Home } from 'lucide-react';

const pages = [
    { name: 'Home Page', slug: 'home', icon: Home, description: 'Hero, Features, Stats, Testimonials' },
    { name: 'Services Page', slug: 'services', icon: Briefcase, description: 'Header content for Services' },
    { name: 'Portfolio Page', slug: 'portfolio', icon: Image, description: 'Header content for Portfolio' },
    { name: 'About Page', slug: 'about', icon: User, description: 'Company history, values' },
    { name: 'Contact Page', slug: 'contact', icon: Mail, description: 'Contact info, form settings' },
];

export default function AdminPagesList() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-brand-text">Page Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page) => (
                    <Link key={page.slug} href={`/admin/pages/${page.slug}`}>
                        <div className="glass-card p-6 h-full hover:bg-white/5 transition-colors group cursor-pointer border-brand-glass-border">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent group-hover:scale-110 transition-transform">
                                    <page.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-brand-text">{page.name}</h3>
                            </div>
                            <p className="text-brand-muted text-sm">{page.description}</p>
                            <div className="mt-6 flex items-center text-brand-accent text-sm font-semibold">
                                Edit Content <ChevronRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
