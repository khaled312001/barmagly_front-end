'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ExternalLink,
    Calendar,
    Tag,
    ChevronRight,
    Globe,
    Cpu,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal } from '@/components/ui/SectionReveal';
import Link from 'next/link';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

interface PortfolioDetailClientProps {
    project: any;
    lang: string;
}

export default function PortfolioDetailClient({ project, lang }: PortfolioDetailClientProps) {
    const dict = useDictionary();
    const portfolioDict = dict.portfolio;

    if (!project) return null;

    const title = lang === 'en' && project.titleEn ? project.titleEn : project.title;
    const description = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
    const category = lang === 'en' && project.categoryEn ? project.categoryEn : project.category;

    return (
        <main className="min-h-screen bg-brand-primary">
            {/* Project Hero */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-20" />

                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-sm text-brand-muted/60 mb-10 font-mono tracking-widest uppercase"
                    >
                        <Link href={`/${lang}/portfolio`} className="hover:text-brand-accent transition-colors">Portfolio</Link>
                        <ChevronRight size={14} className="rtl:rotate-180" />
                        <span className="text-brand-accent">{category}</span>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-black text-white mb-8 tracking-tighter leading-none">
                                {title}
                            </h1>
                            <p className="text-xl text-brand-muted max-w-xl leading-relaxed font-light opacity-90">
                                {description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col gap-8 pb-4"
                        >
                            <div className="flex flex-wrap gap-4">
                                {project.technologies?.map((tech: string) => (
                                    <span key={tech} className="px-5 py-2 rounded-xl glass-card bg-brand-primary/50 text-brand-accent border-white/5 text-xs font-bold uppercase tracking-widest">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-10">
                                {project.content && project.content.startsWith('http') && (
                                    <a href={project.content} target="_blank" rel="noopener noreferrer">
                                        <Button variant="primary" size="lg" icon={<ExternalLink size={20} />} className="px-10 h-16 rounded-xl font-bold shadow-neon-cyan">
                                            {portfolioDict.featured.visitSite}
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Case Study Content / Details */}
            <section className="py-32 relative">
                <div className="max-w-4xl mx-auto px-6">
                    <SectionReveal>
                        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-black prose-p:text-brand-muted prose-p:font-light prose-p:leading-relaxed">
                            <h2 className="text-3xl md:text-5xl text-white mb-10 tracking-tight">{portfolioDict.detail.overview}</h2>
                            <p className="text-xl mb-16">
                                {description}
                            </p>

                            {/* Additional structural layout for content if needed */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-20">
                                <div className="p-10 glass-card bg-brand-surface rounded-3xl border-white/5">
                                    <h4 className="text-brand-accent font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-3">
                                        <Globe size={18} />
                                        {portfolioDict.detail.challenge}
                                    </h4>
                                    <p className="text-sm opacity-80 leading-relaxed italic">
                                        {portfolioDict.detail.challengeText || "Creating a highly scalable and secure enterprise solution using modern tech stacks."}
                                    </p>
                                </div>
                                <div className="p-10 glass-card bg-brand-surface rounded-3xl border-brand-accent/10 border shadow-neon-cyan/5">
                                    <h4 className="text-brand-secondary font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-3">
                                        <Cpu size={18} />
                                        {portfolioDict.detail.solution}
                                    </h4>
                                    <p className="text-sm opacity-80 leading-relaxed italic">
                                        {portfolioDict.detail.solutionText || "Leveraging Swiss precision and distributed architecture to ensure maximum reliability."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>

                    {/* Footer Navigation */}
                    <div className="mt-32 pt-20 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-10">
                        <Link href={`/${lang}/portfolio`} className="group flex items-center gap-4 text-brand-muted hover:text-brand-accent transition-colors font-display font-bold text-xl">
                            <ArrowLeft className="group-hover:-translate-x-2 transition-transform rtl:rotate-180" />
                            {portfolioDict.detail.backToPortfolio}
                        </Link>

                        <Link href={`/${lang}/contact`}>
                            <Button variant="neon" size="lg" icon={<ArrowRight size={20} className="rtl:rotate-180" />}>
                                {portfolioDict.detail.startSimilarProject}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
