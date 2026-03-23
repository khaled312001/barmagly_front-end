'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ExternalLink, Filter, Search, ArrowRight, Code } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal, SectionHeading } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem } from '@/lib/animations';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

// --- Types ---
interface Project {
    id: string;
    slug: string;
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    category: string;
    categoryEn?: string;
    image?: string;
    technologies: string[];
    content?: string;
    isFeatured?: boolean;
    // Client-side display fields
    displayTitle?: string;
    displayDescription?: string;
    displayCategory?: string;
}

// --- Helpers ---
const getCategoryName = (cat: string) => {
    switch (cat.toLowerCase()) {
        case 'fintech': case 'تطوير التكنولوجيا المالية': return 'FinTech';
        case 'e-commerce': case 'التجارة الإلكترونية': return 'E-Commerce';
        case 'saas': case 'منصات سحابية (SaaS)': return 'SaaS';
        case 'ai': case 'الذكاء الاصطناعي': return 'AI & Automation';
        default: return 'Innovation';
    }
};

const getFlag = (cat: string) => {
    switch (cat.toLowerCase()) {
        case 'fintech': return '🏦';
        case 'e-commerce': return '🛍️';
        case 'saas': return '☁️';
        case 'ai': return '🤖';
        default: return '🚀';
    }
};

export default function PortfolioPage() {
    const params = useParams();
    const lang = params?.lang as string;
    const dict = useDictionary();
    const portfolioDict = dict.portfolio;

    const [projects, setProjects] = React.useState<Project[]>([]);
    const [filter, setFilter] = React.useState('all');
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        publicApi.getPortfolio().then(({ data }) => {
            const mapped = data.map((p: any) => ({
                id: p.id,
                slug: p.slug,
                title: p.title,
                titleEn: p.titleEn,
                description: p.description,
                descriptionEn: p.descriptionEn,
                category: p.category,
                categoryEn: p.categoryEn,
                image: p.image,
                technologies: p.technologies || [],
                content: p.content,
                // Localized display fields
                displayTitle: lang === 'en' && p.titleEn ? p.titleEn : p.title,
                displayDescription: lang === 'en' && p.descriptionEn ? p.descriptionEn : p.description,
                displayCategory: lang === 'en' && p.categoryEn ? p.categoryEn : p.category
            }));
            setProjects(mapped);
        }).catch(err => console.error(err));
    }, [lang]);

    const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

    const filteredProjects = projects.filter(p => {
        const matchesFilter = filter === 'all' || p.category === filter;
        const matchesSearch = p.displayTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.displayDescription?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const featuredProject = projects.find(p => p.isFeatured) || null;

    return (
        <main className="min-h-screen bg-brand-primary">
            {/* Header / Hero */}
            <section className="relative pt-48 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-brand-primary">
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[140px] animate-pulse-glow" />

                <div className="section-container relative z-10 text-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto"
                    >
                        <motion.span variants={staggerItem} className="text-brand-accent font-mono text-sm tracking-[0.5em] uppercase mb-6 block">
                            {portfolioDict.hero.badge}
                        </motion.span>
                        <motion.h1 variants={staggerItem} className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter">
                            {portfolioDict.hero.titleLine1} <br />
                            <span className="gradient-text italic opacity-90">{portfolioDict.hero.titleHighlight}</span>
                        </motion.h1>
                        <motion.p variants={staggerItem} className="text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: portfolioDict.hero.subtitle }} />
                    </motion.div>
                </div>
            </section>

            {/* Featured Showcase */}
            {featuredProject && (
                <section className="pb-32 relative">
                    <div className="section-container">
                        <SectionReveal>
                            <div className="group relative glass-card p-2 rounded-[2.5rem] overflow-hidden bg-brand-dark/50 border-white/5 shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent pointer-events-none" />
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.2rem]">
                                    {/* Project Preview Image */}
                                    <div className="relative h-[400px] lg:h-auto overflow-hidden group/img">
                                        <Image
                                            src={featuredProject.image || "/images/blog/project-placeholder.jpg"}
                                            alt={featuredProject.displayTitle || ""}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover/img:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-10 left-10">
                                            <div className="flex gap-3 mb-4">
                                                {featuredProject.technologies.slice(0, 3).map(tech => (
                                                    <span key={tech} className="px-4 py-1.5 glass-card bg-brand-primary/80 backdrop-blur-xl border-white/10 text-brand-accent text-[10px] font-bold uppercase tracking-widest rounded-lg">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="p-12 lg:p-20 flex flex-col justify-center bg-brand-surface relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-10 font-display font-black text-[120px] leading-none text-white/[0.03] select-none pointer-events-none">
                                            01
                                        </div>
                                        <div className="relative z-10">
                                            <span className="inline-flex items-center gap-2 text-brand-accent font-mono text-xs tracking-[0.3em] uppercase mb-6">
                                                <span className="w-12 h-px bg-brand-accent/50" />
                                                {portfolioDict.featured.badge}
                                            </span>
                                            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-8 tracking-tight">
                                                {featuredProject.displayTitle}
                                            </h2>
                                            <p className="text-brand-muted text-lg leading-relaxed mb-10 font-light opacity-90">
                                                {featuredProject.displayDescription}
                                            </p>
                                            <div className="flex flex-wrap gap-6">
                                                <Link href={`/${lang}/portfolio/${featuredProject.slug}`}>
                                                    <Button variant="primary" size="lg" icon={<ArrowRight size={20} className="rtl:rotate-180" />} className="px-10 h-16 rounded-xl font-bold shadow-neon-cyan transition-all hover:scale-105">
                                                        {portfolioDict.featured.viewProject}
                                                    </Button>
                                                </Link>
                                                {featuredProject.content && featuredProject.content.startsWith('http') && (
                                                    <a href={featuredProject.content} target="_blank" rel="noopener noreferrer">
                                                        <Button variant="outline" size="lg" icon={<ExternalLink size={20} />} className="px-10 h-16 rounded-xl font-bold border-white/10 hover:border-brand-accent/30 transition-all">
                                                            {portfolioDict.featured.visitSite}
                                                        </Button>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>
                </section>
            )}

            {/* Grid & Filters */}
            <section className="pb-40 relative">
                <div className="section-container">
                    {/* Filter Bar */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-20">
                        <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-8 py-3 rounded-xl font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 border ${filter === cat
                                        ? 'bg-brand-accent text-brand-primary border-brand-accent shadow-neon-cyan scale-105'
                                        : 'bg-brand-surface/50 text-brand-muted border-white/5 hover:border-brand-accent/30'
                                        }`}
                                >
                                    {cat === 'all' ? portfolioDict.filters.all : getCategoryName(cat)}
                                </button>
                            ))}
                        </div>

                        <div className="relative group w-full lg:w-96">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-accent transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder={portfolioDict.filters.search}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 bg-brand-surface border border-white/5 rounded-2xl pl-14 pr-6 text-white placeholder:text-brand-muted/40 focus:outline-none focus:border-brand-accent/30 focus:shadow-neon-cyan/20 transition-all font-light"
                            />
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative h-full glass-card overflow-hidden hover:border-brand-accent/50 transition-all duration-500 rounded-2xl flex flex-col group/card">
                                        <Link href={`/${lang}/portfolio/${project.slug}`}>
                                            <div className="px-8 pt-8 pb-4 border-b border-white/5 flex items-center justify-between">
                                                <span className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-brand-accent text-brand-primary rounded-full shadow-neon-cyan/50 transition-transform duration-300 group-hover/card:scale-105">
                                                    <span className="text-base leading-none">{getFlag(project.displayCategory || project.category)}</span>
                                                    <span>{getCategoryName(project.displayCategory || project.category)}</span>
                                                </span>
                                            </div>

                                            <div className="p-8 flex-1 flex flex-col">
                                                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover/card:text-brand-accent transition-colors leading-tight">
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
                                                            +{project.technologies.length - 3} {portfolioDict.grid.more}
                                                        </span>
                                                    )}
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    className="w-full border-white/10 group-hover/card:border-brand-accent/50 group-hover/card:bg-brand-accent/5"
                                                >
                                                    {portfolioDict.grid.viewCaseStudy}
                                                </Button>
                                            </div>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
