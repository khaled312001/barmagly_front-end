'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import { publicApi } from '@/lib/api';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    technologies: string[];
    slug: string;
}

export default function PortfolioPage() {
    const dict = useDictionary();
    const allCategory = dict.portfolio.allCategory;
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [activeCategory, setActiveCategory] = useState(allCategory);
    const [categories, setCategories] = useState<string[]>([allCategory]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await publicApi.getPortfolio();
                // Normalize data
                const mapped = data.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    category: p.category, // Assuming category name string
                    image: p.image || '/images/project-placeholder.jpg',
                    technologies: p.technologies || [],
                    slug: p.slug
                }));
                setProjects(mapped);
                setFilteredProjects(mapped);

                // Extract unique categories
                const uniqueCats = Array.from(new Set(mapped.map((p: any) => p.category))).sort() as string[];
                setCategories([allCategory, ...uniqueCats]);
            } catch (error) {
                console.error('Failed to fetch portfolio:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (activeCategory === allCategory) {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.category === activeCategory));
        }
    }, [activeCategory, projects]);

    return (
        <>
            {/* Hero */}
            <section className="relative pt-48 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-brand-primary">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-20" />
                <div className="absolute inset-0 circuit-pattern opacity-10" />

                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[128px] animate-pulse-glow" />

                <div className="section-container relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-5xl mx-auto text-center"
                    >
                        <motion.div variants={heroTextReveal} className="mb-8">
                            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-brand-glass border border-brand-accent/30 text-brand-accent text-sm font-mono tracking-[0.2em] shadow-neon-cyan">
                                <ArrowUpRight size={18} className="animate-bounce" />
                                <span className="uppercase">{dict.portfolio.hero.badge}</span>
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroTextReveal}
                            className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-2xl"
                        >
                            {dict.portfolio.hero.titleLine1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary">{dict.portfolio.hero.titleHighlight}</span>
                        </motion.h1>
                        <motion.p variants={heroTextReveal} className="text-xl md:text-2xl text-brand-muted max-w-3xl mx-auto leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: dict.portfolio.hero.subtitle }} />
                    </motion.div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="section-padding min-h-[60vh] relative overflow-hidden">
                <div className="absolute inset-0 tech-grid opacity-5" />
                <div className="section-container relative z-10">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20 border-b border-white/5 pb-10">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-display font-black text-white flex items-center gap-3">
                                <Filter size={24} className="text-brand-accent" />
                                {dict.portfolio.grid.filtersTitle}
                            </h2>
                            <p className="text-brand-muted text-sm font-light">{dict.portfolio.grid.filtersDesc}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`relative px-6 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-500 overflow-hidden group ${activeCategory === cat
                                        ? 'text-brand-primary'
                                        : 'text-brand-muted hover:text-white bg-white/5 border border-white/10'
                                        }`}
                                >
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-brand-accent shadow-neon-cyan"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{cat}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-96 rounded-2xl bg-brand-surface/30 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode='popLayout'>
                                {filteredProjects.map((project) => (
                                    <motion.div
                                        layout
                                        key={project.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="group relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative h-full glass-card overflow-hidden hover:border-brand-accent/50 transition-all duration-500 rounded-2xl flex flex-col group/card">
                                            {/* Category Badge Header */}
                                            <div className="px-8 pt-8 pb-4 border-b border-white/5">
                                                <span className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-brand-accent text-brand-primary rounded-full shadow-neon-cyan">
                                                    {project.category}
                                                </span>
                                            </div>

                                            <div className="p-8 flex-1 flex flex-col">
                                                <h3 className="text-2xl font-display font-bold text-brand-text mb-4 group-hover/card:text-brand-accent transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-brand-muted text-sm leading-relaxed mb-8 flex-1">
                                                    {project.description}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {project.technologies.slice(0, 3).map((tech) => (
                                                        <span key={tech} className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 rounded-md text-brand-accent/80 hover:bg-brand-accent/10 hover:border-brand-accent/30 transition-colors">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 3 && (
                                                        <span className="px-3 py-1 text-[10px] text-brand-muted font-bold">+{project.technologies.length - 3} {dict.portfolio.grid.more}</span>
                                                    )}
                                                </div>

                                                <Link href={`/portfolio/${project.slug}`} className="mt-auto">
                                                    <Button variant="outline" size="lg" className="w-full group-hover/card:bg-brand-accent group-hover/card:text-brand-primary group-hover/card:border-brand-accent transition-all duration-300 shadow-sm hover:shadow-neon-cyan" icon={<ArrowUpRight size={20} className="rtl:rotate-270" />}>
                                                        {dict.portfolio.grid.viewCaseStudy}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {!loading && filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-brand-muted text-lg">{dict.portfolio.grid.emptyState}</p>
                            <Button variant="ghost" className="mt-4" onClick={() => setActiveCategory(allCategory)}>
                                {dict.portfolio.grid.viewAll}
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
