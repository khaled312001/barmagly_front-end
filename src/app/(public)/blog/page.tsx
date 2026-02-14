'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal, SectionHeading } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import { formatDate } from '@/lib/utils';
import { publicApi } from '@/lib/api';

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: { name: string; slug: string } | null;
    tags: { name: string; slug: string }[];
    publishedAt: string | null;
    readTime: string | null;
    image: string | null;
}

const allCategory = 'All';

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [activeCategory, setActiveCategory] = useState(allCategory);
    const [categories, setCategories] = useState<string[]>([allCategory]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await publicApi.getBlog({ status: 'PUBLISHED' });
                // Normalize data
                const mapped = data.map((p: any) => ({
                    id: p.id,
                    slug: p.slug,
                    title: p.title,
                    excerpt: p.excerpt,
                    category: p.category,
                    tags: p.tags || [],
                    publishedAt: p.publishedAt,
                    readTime: p.readTime,
                    image: p.image
                }));
                setPosts(mapped);
                setFilteredPosts(mapped);

                // Extract unique categories from posts
                const uniqueCats = Array.from(new Set(
                    mapped.map((p: any) => p.category?.name).filter(Boolean)
                )).sort() as string[];
                setCategories([allCategory, ...uniqueCats]);
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        let result = posts;

        // Filter by category
        if (activeCategory !== allCategory) {
            result = result.filter(p => p.category?.name === activeCategory);
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.excerpt.toLowerCase().includes(query)
            );
        }

        setFilteredPosts(result);
    }, [activeCategory, searchQuery, posts, setFilteredPosts]);

    return (
        <>
            {/* Hero */}
            <section className="relative pt-48 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-brand-primary">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-30" />
                <div className="absolute inset-0 circuit-pattern opacity-40" />

                {/* Dynamic Geometric Accents */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.15, 0.25, 0.15]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-brand-secondary/20 rounded-full blur-[140px]"
                    />
                </div>

                <div className="section-container relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0"
                    >
                        <motion.div variants={heroTextReveal} className="mb-8">
                            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-glass border border-brand-accent/30 text-brand-accent text-sm font-mono tracking-wider shadow-neon-cyan">
                                <Search size={16} />
                                LATEST INSIGHTS & NEWS
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroTextReveal}
                            className="text-5xl md:text-6xl lg:text-8xl font-display font-bold text-white mb-6 drop-shadow-2xl"
                            style={{ textShadow: '0 0 40px rgba(0, 212, 255, 0.4)' }}
                        >
                            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">Knowledge</span>
                        </motion.h1>
                        <motion.p variants={heroTextReveal} className="text-lg md:text-xl text-brand-muted max-w-2xl leading-relaxed">
                            Stay up to date with the latest in technology, business systems, and digital innovation.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section-padding min-h-[60vh]">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Search Mobile */}
                            <div className="lg:hidden mb-8">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-brand-surface/50 border border-brand-glass-border rounded-xl text-sm text-brand-text focus:outline-none focus:border-brand-accent/50"
                                    />
                                </div>
                            </div>

                            {loading ? (
                                <div className="space-y-8">
                                    {[1, 2].map(i => (
                                        <div key={i} className="h-64 rounded-2xl bg-brand-surface/30 animate-pulse" />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    layout
                                    className="space-y-8"
                                >
                                    <AnimatePresence mode='popLayout'>
                                        {filteredPosts.map((post) => (
                                            <motion.article
                                                layout
                                                key={post.id}
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                className="glass-card p-12 hover-glow group transition-all duration-700 rounded-[2.5rem] border-white/5 hover:border-brand-accent/30 relative overflow-hidden bg-brand-dark/40"
                                            >
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-brand-accent/10 transition-colors duration-700" />
                                                <div className="absolute inset-0 tech-grid opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700" />

                                                <div className="flex flex-wrap items-center gap-6 mb-8 relative z-10 font-mono tracking-tighter">
                                                    {post.category && (
                                                        <span className="px-5 py-2 text-[10px] font-bold uppercase bg-brand-glass border border-brand-accent/30 text-brand-accent rounded-full shadow-neon-cyan">
                                                            {post.category.name}
                                                        </span>
                                                    )}
                                                    {post.publishedAt && (
                                                        <span className="flex items-center gap-2 text-brand-muted/60 text-xs">
                                                            <Calendar size={14} className="text-brand-accent/50" />
                                                            {formatDate(post.publishedAt)}
                                                        </span>
                                                    )}
                                                    {post.readTime && (
                                                        <span className="flex items-center gap-2 text-brand-muted/60 text-xs">
                                                            <Clock size={14} className="text-brand-accent/50" />
                                                            {post.readTime}
                                                        </span>
                                                    )}
                                                </div>

                                                <Link href={`/blog/${post.slug}`} className="block group">
                                                    <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-6 group-hover:text-brand-accent transition-all duration-500 relative z-10 leading-tight tracking-tight">
                                                        {post.title}
                                                    </h2>
                                                </Link>

                                                <p className="text-brand-muted leading-relaxed mb-10 line-clamp-2 text-lg relative z-10 font-light max-w-2xl">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto pt-10 border-t border-white/5 relative z-10">
                                                    <div className="flex flex-wrap gap-3">
                                                        {post.tags.slice(0, 3).map((tag) => (
                                                            <span key={tag.slug} className="text-[10px] font-mono text-brand-muted/40 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-md border border-white/5 group-hover:border-brand-accent/10 group-hover:text-brand-muted/60 transition-colors">
                                                                #{tag.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <Link href={`/blog/${post.slug}`}>
                                                        <Button variant="outline" size="lg" className="border-white/10 hover:border-brand-accent/50 shadow-sm hover:shadow-neon-cyan px-8" icon={<ArrowRight size={18} />}>
                                                            Analyze Intel
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </motion.article>
                                        ))}
                                    </AnimatePresence>

                                    {!loading && filteredPosts.length === 0 && (
                                        <div className="text-center py-24 glass-card border-dashed border-white/10">
                                            <Search size={48} className="mx-auto text-brand-muted/20 mb-6" />
                                            <p className="text-brand-muted text-xl font-light">No classified data found matching your query.</p>
                                            <Button variant="ghost" className="mt-8 text-brand-accent hover:bg-brand-accent/10" onClick={() => { setActiveCategory(allCategory); setSearchQuery(''); }}>
                                                Reset Search Parameters
                                            </Button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-10">
                            {/* Search Desktop */}
                            <div className="hidden lg:block glass-card p-10 bg-brand-dark/40 border-white/5 relative group overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent/20 group-focus-within:bg-brand-accent transition-colors shadow-neon-cyan" />
                                <h3 className="text-xl font-display font-black text-white mb-6 uppercase tracking-wider">Index Search</h3>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted/40" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Enter keywords..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-brand-primary/40 border border-white/5 rounded-2xl text-sm text-brand-text placeholder:text-brand-muted/30 focus:outline-none focus:border-brand-accent/50 transition-all font-mono"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="glass-card p-10 bg-brand-dark/40 border-white/5">
                                <h3 className="text-xl font-display font-black text-white mb-6 uppercase tracking-wider">Classifications</h3>
                                <ul className="space-y-3">
                                    {categories.map((cat) => (
                                        <li key={cat}>
                                            <button
                                                onClick={() => setActiveCategory(cat)}
                                                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-mono tracking-tighter transition-all duration-500 overflow-hidden group/cat relative ${activeCategory === cat
                                                    ? 'text-brand-primary font-bold shadow-neon-cyan'
                                                    : 'text-brand-muted/60 hover:text-white bg-white/5 hover:bg-white/10'
                                                    }`}
                                            >
                                                {activeCategory === cat && (
                                                    <motion.div layoutId="activeBlogCat" className="absolute inset-0 bg-brand-accent" />
                                                )}
                                                <span className="relative z-10">{cat}</span>
                                                <span className={`relative z-10 text-[10px] px-2.5 py-1 rounded-full border ${activeCategory === cat ? 'bg-brand-primary/20 border-brand-primary/30 text-brand-primary' : 'bg-brand-surface border-white/10 text-brand-muted/40 group-hover/cat:border-white/20'}`}>
                                                    {cat === allCategory ? posts.length : posts.filter(p => p.category?.name === cat).length}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Newsletter CTA */}
                            <div className="glass-card p-10 bg-gradient-to-br from-brand-dark to-brand-accent/5 border-brand-accent/10 relative overflow-hidden group">
                                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-brand-accent/5 rounded-full blur-[80px] group-hover:bg-brand-accent/10 transition-colors" />
                                <h3 className="text-2xl font-display font-black text-white mb-4 leading-tight">Join the <br /><span className="text-brand-accent">Inner Circle</span></h3>
                                <p className="text-brand-muted text-sm mb-8 leading-relaxed font-light">Receive bimonthly briefings on digital transformation and system architecture.</p>
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        type="email"
                                        placeholder="secure_email@provider.com"
                                        className="w-full px-5 py-4 bg-brand-primary/50 border border-white/5 rounded-2xl text-sm text-brand-text placeholder:text-brand-muted/20 focus:outline-none focus:border-brand-accent/40 transition-all font-mono"
                                    />
                                    <Button variant="primary" size="xl" className="w-full shadow-neon-cyan font-display tracking-widest text-xs uppercase" icon={<ArrowRight size={16} />}>
                                        Authenticate
                                    </Button>
                                </form>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
