'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Layers, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, heroTextReveal } from '@/lib/animations';
import Link from 'next/link';
import Image from 'next/image';

interface PortfolioDetailClientProps {
    project: any;
}

export default function PortfolioDetailClient({ project }: PortfolioDetailClientProps) {
    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-primary text-center px-6">
                <div className="max-w-md">
                    <h2 className="text-4xl font-display font-bold text-white mb-6">Project Not Found</h2>
                    <Link href="/portfolio">
                        <Button variant="primary" icon={<ArrowLeft size={20} />}>
                            Back to Portfolio
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-brand-primary overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-10" />
            </div>

            {/* Hero */}
            <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32">
                <div className="section-container relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl"
                    >
                        <motion.div variants={heroTextReveal} className="mb-8">
                            <Link href="/portfolio" className="inline-flex items-center gap-2 text-brand-accent font-mono text-sm hover:gap-3 transition-all">
                                <ArrowLeft size={16} />
                                <span>CASE_STUDY_INDEX</span>
                            </Link>
                        </motion.div>

                        <motion.h1 variants={heroTextReveal} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight">
                            {project.title}
                        </motion.h1>

                        <motion.p variants={heroTextReveal} className="text-xl text-brand-muted leading-relaxed font-light mb-12">
                            {project.description}
                        </motion.p>

                        <motion.div variants={heroTextReveal} className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/10 py-8">
                            <div>
                                <h4 className="text-brand-accent font-mono text-xs uppercase mb-2 flex items-center gap-2">
                                    <Tag size={14} /> Category
                                </h4>
                                <p className="text-white font-medium">{project.category}</p>
                            </div>
                            <div>
                                <h4 className="text-brand-accent font-mono text-xs uppercase mb-2 flex items-center gap-2">
                                    <User size={14} /> Client
                                </h4>
                                <p className="text-white font-medium">{project.client || 'Confidential'}</p>
                            </div>
                            <div>
                                <h4 className="text-brand-accent font-mono text-xs uppercase mb-2 flex items-center gap-2">
                                    <Calendar size={14} /> Duration
                                </h4>
                                <p className="text-white font-medium">{project.duration || 'Ongoing'}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Content & Tech Stack */}
            <section className="section-padding pt-0">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-12">
                            <SectionReveal>
                                <h3 className="text-2xl font-display font-bold text-white mb-6">The Challenge & Solution</h3>
                                <div className="prose prose-invert prose-lg max-w-none text-brand-muted font-light leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: project.content || '<p>Detailed case study content coming soon.</p>' }}
                                />
                            </SectionReveal>

                            {project.results && (
                                <SectionReveal>
                                    <div className="glass-card p-8 border-brand-accent/20 bg-brand-accent/5">
                                        <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
                                            <CheckCircle2 className="text-brand-accent" /> Key Results
                                        </h3>
                                        <p className="text-brand-muted">{project.results}</p>
                                    </div>
                                </SectionReveal>
                            )}
                        </div>

                        <div>
                            <SectionReveal direction="left">
                                <div className="glass-card p-8 sticky top-32">
                                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies && JSON.parse(project.technologies).map((tech: string) => (
                                            <span key={tech} className="px-3 py-1.5 text-xs font-mono bg-white/5 border border-white/10 rounded text-brand-accent">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </SectionReveal>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
