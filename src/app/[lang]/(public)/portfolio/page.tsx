'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Filter, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import { publicApi } from '@/lib/api';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

interface Project {
    id: string;
    title: string;
    titleEn?: string;
    slug: string;
    description: string;
    descriptionEn?: string;
    category: string;
    categoryEn?: string;
    image?: string;
    technologies: string[];
    isFeatured: boolean;
    projectType?: string;
    content?: string;
    // These are added for display purposes after localization
    displayTitle?: string;
    displayDescription?: string;
    displayCategory?: string;
}

const PROJECT_TYPES = ['website', 'app', 'pos'];

export default function PortfolioPage({ params: { lang } }: { params: { lang: string } }) {
    const dict = useDictionary();
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState(dict.portfolio.grid.allCategory);
    const [activeType, setActiveType] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const { data } = await publicApi.getPortfolio();
                // Map localized fields
                const localizedData: Project[] = data.map((p: any) => ({
                    ...p,
                    image: p.image || '/images/project-placeholder.jpg',
                    technologies: p.technologies || [],
                    displayTitle: lang === 'en' && p.titleEn ? p.titleEn : p.title,
                    displayDescription: lang === 'en' && p.descriptionEn ? p.descriptionEn : p.description,
                    // Use categoryEn (country code) if available, otherwise fallback to the flag emoji string
                    displayCategory: p.categoryEn ?? p.category
                }));

                setProjects(localizedData);
                setFilteredProjects(localizedData);

                // Get unique categories (country codes or raw strings)
                const uniqueCats: string[] = Array.from(new Set(localizedData.map((p: Project) => p.displayCategory || p.category))).sort();
                setCategories(uniqueCats);
            } catch (error) {
                console.error('Failed to fetch portfolio:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolio();
    }, [lang]);

    useEffect(() => {
        let result = projects;

        // Filter by country
        if (activeCategory !== dict.portfolio.grid.allCategory) {
            result = result.filter(p => p.displayCategory === activeCategory);
        }

        // Filter by type
        if (activeType !== 'all') {
            result = result.filter(p => p.projectType === activeType);
        }

        setFilteredProjects(result);
    }, [activeCategory, activeType, projects, dict.portfolio.grid.allCategory]);

    // Helper to get flag from category string or code
    const getFlag = (cat: string) => {
        if (!cat) return '🌐';
        if (cat.length === 2 && /^[A-Z]{2}$/.test(cat)) {
            // It's a country code, convert to emoji
            return cat.toUpperCase().replace(/./g, char =>
                String.fromCodePoint(char.charCodeAt(0) + 127397)
            );
        }
        // Fallback to extraction from string (legacy) or mapping
        if (cat === 'GLOBAL') return '🌐';
        const match = cat.match(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]/);
        return match ? match[0] : '📍';
    };

    // Helper to get localized name
    const getCategoryName = (cat: string) => {
        if (cat === dict.portfolio.grid.allCategory) return dict.portfolio.grid.allCategory;
        if (cat.length === 2 && (dict.portfolio.grid as any).countries?.[cat]) {
            return (dict.portfolio.grid as any).countries[cat];
        }
        if (cat === 'GLOBAL' && (dict.portfolio.grid as any).countries?.GLOBAL) {
            return (dict.portfolio.grid as any).countries.GLOBAL;
        }
        // Fallback: remove emoji from string
        return cat.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]\s*/g, '');
    };

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
                            <button
                                onClick={() => setActiveCategory(dict.portfolio.grid.allCategory)}
                                className={`relative px-6 py-2.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-500 overflow-hidden group ${activeCategory === dict.portfolio.grid.allCategory
                                    ? 'text-brand-primary'
                                    : 'text-brand-muted hover:text-white bg-white/5 border border-white/10'
                                    }`}
                            >
                                {activeCategory === dict.portfolio.grid.allCategory && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-brand-accent shadow-neon-cyan"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{dict.portfolio.grid.allCategory}</span>
                            </button>
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
                                    <div className="relative z-10 flex items-center gap-2">
                                        <span className="text-base leading-none">{getFlag(cat)}</span>
                                        <span>{getCategoryName(cat)}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Type Filters */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 text-brand-muted mr-2">
                                <Layers size={16} className="text-brand-accent" />
                                <span className="text-xs font-mono uppercase tracking-wider">{(dict.portfolio.grid as any).typeFiltersTitle}</span>
                            </div>
                            <button
                                onClick={() => setActiveType('all')}
                                className={`relative px-5 py-2 rounded-lg text-xs font-mono tracking-widest uppercase transition-all duration-500 overflow-hidden ${activeType === 'all'
                                    ? 'text-brand-primary'
                                    : 'text-brand-muted hover:text-white bg-white/5 border border-white/10'
                                    }`}
                            >
                                {activeType === 'all' && (
                                    <motion.div
                                        layoutId="activeTypeFilter"
                                        className="absolute inset-0 bg-brand-secondary shadow-neon-cyan"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{(dict.portfolio.grid as any).allTypes}</span>
                            </button>
                            {PROJECT_TYPES.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setActiveType(type)}
                                    className={`relative px-5 py-2 rounded-lg text-xs font-mono tracking-widest uppercase transition-all duration-500 overflow-hidden ${activeType === type
                                        ? 'text-brand-primary'
                                        : 'text-brand-muted hover:text-white bg-white/5 border border-white/10'
                                        }`}
                                >
                                    {activeType === type && (
                                        <motion.div
                                            layoutId="activeTypeFilter"
                                            className="absolute inset-0 bg-brand-secondary shadow-neon-cyan"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{(dict.portfolio.grid as any).types?.[type] || type}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    {isLoading ? (
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
                                            <div className="px-8 pt-8 pb-4 border-b border-white/5 flex items-center justify-between">
                                                <span className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-brand-accent text-brand-primary rounded-full shadow-neon-cyan/50 transition-transform duration-300 group-hover/card:scale-105">
                                                    <span className="text-base leading-none">{getFlag(project.displayCategory || project.category)}</span>
                                                    <span>{getCategoryName(project.displayCategory || project.category)}</span>
                                                </span>
                                            </div>

                                            <div className="p-8 flex-1 flex flex-col">
                                                <h3 className="text-2xl font-display font-bold text-brand-text mb-4 group-hover/card:text-brand-accent transition-colors leading-tight">
                                                    {project.displayTitle}
                                                </h3>
                                                <p className="text-brand-muted text-sm leading-relaxed mb-8 flex-1 opacity-80 group-hover/card:opacity-100 transition-opacity">
                                                    {project.displayDescription}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-8">
                                                    {project.technologies.slice(0, 3).map((tech) => (
                                                        <span key={tech} className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 rounded-md text-brand-accent/80 hover:bg-brand-accent/10 hover:border-brand-accent/30 transition-colors">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 3 && (
                                                        <span className="px-3 py-1 text-[10px] text-brand-muted font-bold">
                                                            +{project.technologies.length - 3} {dict.portfolio.grid.more}
                                                        </span>
                                                    )}
                                                </div>

                                                <Link href={`/${lang}/portfolio/${project.slug}`} className="mt-auto">
                                                    <Button
                                                        variant="outline"
                                                        size="lg"
                                                        className="w-full group-hover/card:bg-brand-accent group-hover/card:text-brand-primary group-hover/card:border-brand-accent transition-all duration-300 shadow-sm hover:shadow-neon-cyan"
                                                        icon={<ArrowUpRight size={20} className="rtl:rotate-270" />}
                                                    >
                                                        {dict.portfolio.grid.viewCaseStudy}
                                                    </Button>
                                                </Link>
                                                {project.content && project.content.startsWith('http') && (
                                                    <a href={project.content} target="_blank" rel="noopener noreferrer" className="mt-3 block">
                                                        <Button
                                                            variant="ghost"
                                                            size="lg"
                                                            className="w-full border border-white/10 hover:border-brand-accent/50 hover:bg-brand-accent/10 transition-all duration-300"
                                                            icon={<ExternalLink size={18} />}
                                                        >
                                                            {(dict.portfolio.grid as any).visitProject}
                                                        </Button>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {!isLoading && filteredProjects.length === 0 && (
                        <div className="text-center py-20 flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/5 mb-6 flex items-center justify-center text-brand-muted opacity-50">
                                <Filter size={40} />
                            </div>
                            <p className="text-brand-muted text-lg font-light mb-8">{dict.portfolio.grid.emptyState}</p>
                            <Button
                                variant="ghost"
                                size="lg"
                                className="border border-white/10 hover:bg-white/5"
                                onClick={() => { setActiveCategory(dict.portfolio.grid.allCategory); setActiveType('all'); }}
                            >
                                {dict.portfolio.grid.viewAll}
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
