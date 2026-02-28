'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Gavel, Globe, CheckCircle2 } from 'lucide-react';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, heroTextReveal } from '@/lib/animations';

export default function TermsPage() {
    const lastUpdated = 'February 14, 2026';

    const terms = [
        {
            title: '1. Service Agreement',
            content: 'By engaging with Barmagly, you agree to the terms of our project agreements, which outline scope, timelines, and deliverables. All projects are governed by Swiss law.'
        },
        {
            title: '2. Intellectual Property',
            content: 'Unless otherwise agreed in writing, Barmagly retains ownership of all underlying code and frameworks. Upon full payment, clients are granted a comprehensive license to use the final product for its intended purpose.'
        },
        {
            title: '3. Payment Terms',
            content: 'Payments are typically structured in milestones. Work begins upon receipt of the initial deposit. Late payments may result in project suspension or delays.'
        },
        {
            title: '4. Limitation of Liability',
            content: 'Barmagly provides services "as is" and shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our software.'
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
                                <FileText size={18} />
                                Governance Framework
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroTextReveal}
                            className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-2xl"
                        >
                            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary">Service</span>
                        </motion.h1>
                        <motion.p variants={heroTextReveal} className="text-brand-muted text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                            Agreement Protocol: {lastUpdated} | <span className="text-white">Legal Jurisdiction: Switzerland</span>
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
                                <h2 className="text-2xl font-display font-bold text-brand-text mb-6">Agreement to Terms</h2>
                                <p className="text-brand-muted leading-relaxed">
                                    Welcome to Barmagly. By accessing our website or using our services, you agree to be bound by these Terms of Service. Please read them carefully.
                                </p>
                            </div>
                        </SectionReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {terms.map((term, idx) => (
                                <SectionReveal key={idx} delay={idx * 0.1}>
                                    <div className="glass-card p-8 h-full hover-glow border-brand-accent/10">
                                        <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent w-fit mb-6">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-brand-text mb-4">{term.title}</h3>
                                        <p className="text-brand-muted text-sm leading-relaxed">{term.content}</p>
                                    </div>
                                </SectionReveal>
                            ))}
                        </div>

                        <SectionReveal>
                            <div className="glass-card p-12 border-brand-accent/20 bg-brand-accent/5 relative group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent shadow-neon-cyan" />
                                <div className="flex flex-col md:flex-row items-center gap-10">
                                    <div className="p-8 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 group-hover:shadow-neon-cyan transition-all duration-500">
                                        <Gavel size={56} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-display font-black text-white mb-6 uppercase tracking-wider">Governing Law</h2>
                                        <p className="text-brand-muted leading-relaxed font-light text-lg">
                                            These terms are governed by and construed in accordance with the laws of <span className="text-white font-semibold">Switzerland</span>. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the Swiss federal courts.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>

                        <SectionReveal>
                            <div className="text-center py-10">
                                <p className="text-brand-muted mb-4 flex items-center justify-center gap-2">
                                    <Globe size={16} className="text-brand-accent" />
                                    Barmagly is a Swiss Licensed Software Company (CHE-154.312.079)
                                </p>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
