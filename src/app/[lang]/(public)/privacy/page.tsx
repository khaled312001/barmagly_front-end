'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Database, UserCheck, Bell, Settings } from 'lucide-react';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, heroTextReveal } from '@/lib/animations';

export default function PrivacyPage() {
    const lastUpdated = 'March 16, 2026';

    const sections = [
        {
            icon: <Database size={20} />,
            title: 'Information We Collect',
            content: 'Barmagly POS collects business data you enter directly into the app, including sales transactions, product/inventory data, customer names and contact info, and employee accounts. We do not collect data without your knowledge.'
        },
        {
            icon: <Eye size={20} />,
            title: 'How We Use Your Data',
            content: 'Your data is used solely to operate the POS system: processing sales, managing inventory, generating reports, and powering notifications. We do not sell, rent, or share your data with third parties for advertising purposes.'
        },
        {
            icon: <Shield size={20} />,
            title: 'Data Security',
            content: 'All data transmitted between the app and our servers is encrypted using industry-standard TLS. Business data is stored securely in the cloud with regular backups. We implement role-based access control so employees only see what they need.'
        },
        {
            icon: <UserCheck size={20} />,
            title: 'Customer Data',
            content: 'Customer profiles and loyalty point data you add to the system are owned by your business. You can export or delete customer data at any time from within the app settings.'
        },
        {
            icon: <Bell size={20} />,
            title: 'Notifications & Permissions',
            content: 'The app may request permission for push notifications (for low-stock alerts and online orders), camera (for barcode scanning), and local storage. These permissions are optional and can be revoked from your device settings.'
        },
        {
            icon: <Settings size={20} />,
            title: 'Third-Party Services',
            content: 'We may use trusted third-party services for cloud storage, analytics, and payment processing. These partners are contractually obligated to keep your data confidential and may not use it for any other purpose.'
        },
        {
            icon: <Lock size={20} />,
            title: 'Data Retention',
            content: 'Your business data is retained as long as your account is active. Upon account deletion, your data will be permanently removed from our servers within 30 days, except where required by law.'
        },
        {
            icon: <FileText size={20} />,
            title: 'Your Rights',
            content: 'You have the right to access, correct, export, or delete your data at any time. To exercise these rights, contact us through the app\'s support channel or at the email below.'
        },
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative pt-48 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-brand-primary">
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-20" />
                <div className="absolute inset-0 circuit-pattern opacity-10" />

                <div className="section-container relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-5xl mx-auto text-center"
                    >
                        <motion.div variants={heroTextReveal} className="mb-8">
                            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-brand-glass border border-brand-accent/30 text-brand-accent text-sm font-mono tracking-[0.2em] shadow-neon-cyan uppercase">
                                <Shield size={18} />
                                Barmagly POS
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroTextReveal}
                            className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-2xl"
                        >
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary">Policy</span>
                        </motion.h1>
                        <motion.p variants={heroTextReveal} className="text-brand-muted text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                            Last Updated: {lastUpdated}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding relative">
                <div className="section-container max-w-4xl relative z-10">
                    <div className="space-y-12">

                        {/* Introduction */}
                        <SectionReveal>
                            <div className="glass-card p-10 border-white/5">
                                <h2 className="text-2xl font-display font-bold text-brand-text mb-6">Introduction</h2>
                                <p className="text-brand-muted leading-relaxed mb-4">
                                    Barmagly POS is a comprehensive Point of Sale system designed for modern restaurants, cafes, pharmacies, and retail stores. This Privacy Policy explains how we collect, use, and protect your information when you use the Barmagly POS mobile application and related services.
                                </p>
                                <p className="text-brand-muted leading-relaxed">
                                    By using Barmagly POS, you agree to the practices described in this policy. If you do not agree, please discontinue use of the app.
                                </p>
                            </div>
                        </SectionReveal>

                        {/* App Description */}
                        <SectionReveal>
                            <div className="glass-card p-10 border-brand-accent/10">
                                <h2 className="text-2xl font-display font-bold text-brand-text mb-6">About Barmagly POS</h2>
                                <p className="text-brand-muted leading-relaxed mb-6">
                                    Barmagly POS provides business owners with a reliable, professional solution including:
                                </p>
                                <ul className="space-y-2 text-brand-muted text-sm">
                                    {[
                                        'Fast & intuitive checkout with product search and barcode scanning',
                                        'Multi-payment methods: Cash, Card, and more',
                                        'Real-time inventory management with low-stock alerts',
                                        'Customer management with loyalty points',
                                        'Online order management with real-time notifications',
                                        'Detailed sales reports and analytics',
                                        'Employee management with role-based access control',
                                        'Multi-branch support',
                                        'Available in English, Arabic (RTL), and German',
                                        'Dark mode UI optimized for tablets',
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-brand-accent mt-0.5">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </SectionReveal>

                        {/* Policy Sections Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {sections.map((section, idx) => (
                                <SectionReveal key={idx} delay={idx * 0.05}>
                                    <div className="glass-card p-8 h-full hover-glow border-brand-accent/10">
                                        <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent w-fit mb-6">
                                            {section.icon}
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-brand-text mb-4">{section.title}</h3>
                                        <p className="text-brand-muted text-sm leading-relaxed">{section.content}</p>
                                    </div>
                                </SectionReveal>
                            ))}
                        </div>

                        {/* Children's Privacy */}
                        <SectionReveal>
                            <div className="glass-card p-10 border-white/5">
                                <h2 className="text-2xl font-display font-bold text-brand-text mb-6">Children's Privacy</h2>
                                <p className="text-brand-muted leading-relaxed">
                                    Barmagly POS is a business application intended for use by adults (18+). We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.
                                </p>
                            </div>
                        </SectionReveal>

                        {/* Policy Changes */}
                        <SectionReveal>
                            <div className="glass-card p-10 border-white/5">
                                <h2 className="text-2xl font-display font-bold text-brand-text mb-6">Changes to This Policy</h2>
                                <p className="text-brand-muted leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of significant changes through the app or via email. Continued use of Barmagly POS after changes are posted constitutes your acceptance of the revised policy.
                                </p>
                            </div>
                        </SectionReveal>

                        {/* Contact */}
                        <SectionReveal>
                            <div className="glass-card p-12 border-brand-accent/20 bg-brand-accent/5 relative group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent shadow-neon-cyan" />
                                <h2 className="text-2xl font-display font-black text-white mb-6 uppercase tracking-widest">Contact Us</h2>
                                <p className="text-brand-muted leading-relaxed mb-8 font-light">
                                    If you have any questions about this Privacy Policy or how we handle your data, please reach out:
                                </p>
                                <div className="flex flex-col gap-3">
                                    <p className="text-brand-accent font-mono font-black text-xl tracking-tighter shadow-neon-cyan inline-block p-4 bg-white/5 rounded-xl border border-brand-accent/30">
                                        legal@barmagly.com
                                    </p>
                                    <p className="text-brand-muted text-sm mt-2">Barmagly — Swiss Licensed Software Company (CHE-154.312.079)</p>
                                </div>
                            </div>
                        </SectionReveal>

                    </div>
                </div>
            </section>
        </>
    );
}
