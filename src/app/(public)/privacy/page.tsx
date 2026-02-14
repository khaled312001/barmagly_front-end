'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, heroTextReveal } from '@/lib/animations';

export default function PrivacyPage() {
    const lastUpdated = 'February 14, 2026';

    const sections = [
        {
            icon: <Lock size={20} />,
            title: 'Data Collection',
            content: 'We collect only the information necessary to provide our services. This includes personal information provided by you during account creation or via our contact forms, such as name, email address, and phone number.'
        },
        {
            icon: <Eye size={20} />,
            title: 'Use of Information',
            content: 'Your information is used strictly for internal purposes: improving our services, communicating with you about your projects, and ensuring a personalized experience. We do not sell your data to third parties.'
        },
        {
            icon: <Shield size={20} />,
            title: 'Data Security',
            content: 'We implement enterprise-grade security measures to protect your data from unauthorized access, alteration, or disclosure. As a Swiss-licensed company, we adhere to the highest standards of data protection.'
        },
        {
            icon: <FileText size={20} />,
            title: 'Your Rights',
            content: 'You have the right to access, rectify, or delete your personal data at any time. Simply contact us through our official channels to exercise these rights.'
        }
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative pt-48 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-brand-primary">
                {/* Background Effects */}
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
                                Infrastructure Security
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroTextReveal}
                            className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-2xl"
                        >
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary">Protocols</span>
                        </motion.h1>
                        <motion.p variants={heroTextReveal} className="text-brand-muted text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                            System Version: {lastUpdated} | <span className="text-white">Compliance: Swiss Standards</span>
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding relative">
                <div className="section-container max-w-4xl relative z-10">
                    <div className="space-y-12">
                        <SectionReveal>
                            <div className="glass-card p-10 border-white/5">
                                <h2 className="text-2xl font-display font-bold text-brand-text mb-6">Introduction</h2>
                                <p className="text-brand-muted leading-relaxed">
                                    At Barmagly, we take your privacy seriously. This Policy outlines how we collect, use, and safeguard your data. By using our services, you agree to the terms described herein.
                                </p>
                            </div>
                        </SectionReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {sections.map((section, idx) => (
                                <SectionReveal key={idx} delay={idx * 0.1}>
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

                        <SectionReveal>
                            <div className="glass-card p-12 border-brand-accent/20 bg-brand-accent/5 relative group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent shadow-neon-cyan" />
                                <h2 className="text-2xl font-display font-black text-white mb-6 uppercase tracking-widest">Contact Legal Department</h2>
                                <p className="text-brand-muted leading-relaxed mb-8 font-light italic">
                                    If you have any questions regarding our Privacy Policy or data practices, please contact our legal department at:
                                </p>
                                <p className="text-brand-accent font-mono font-black text-xl tracking-tighter shadow-neon-cyan inline-block p-4 bg-white/5 rounded-xl border border-brand-accent/30">legal@barmagly.com</p>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
