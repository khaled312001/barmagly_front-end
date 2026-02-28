'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, Share2, User, Twitter, Linkedin, Link2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

interface BlogDetailClientProps {
    post: any;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
    const dict = useDictionary();
    const blogDict = dict.blog;
    const [copied, setCopied] = React.useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    const handleShareLinkedin = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    if (!post) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 bg-brand-primary">
                <div className="w-20 h-20 rounded-full bg-brand-accent/10 flex items-center justify-center mb-8">
                    <span className="text-4xl">📄</span>
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-4">{blogDict.detail.notFound}</h1>
                <p className="text-brand-muted mb-8 max-w-md">{blogDict.detail.notFoundDesc}</p>
                <Link href="/blog">
                    <Button variant="primary" icon={<ArrowLeft size={18} className="rtl:rotate-180" />} className="rtl:flex-row flex-row-reverse gap-2">
                        {blogDict.detail.backToArticles}
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-brand-primary">
            {/* Hero Section with Featured Image */}
            <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-20" />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[120px]"
                />

                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 text-sm text-brand-muted/60 mb-8"
                    >
                        <Link href="/blog" className="hover:text-brand-accent transition-colors">Blog</Link>
                        <ChevronRight size={14} className="rtl:rotate-180" />
                        {post.category && (
                            <>
                                <span className="text-brand-accent/80">{post.category.name}</span>
                                <ChevronRight size={14} className="rtl:rotate-180" />
                            </>
                        )}
                        <span className="text-brand-muted/40 truncate max-w-[200px]">{post.title}</span>
                    </motion.div>

                    {/* Category & Meta */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-wrap items-center gap-4 mb-6"
                    >
                        {post.category && (
                            <span className="px-4 py-1.5 text-xs font-bold font-mono tracking-wider bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20 uppercase">
                                {post.category.name}
                            </span>
                        )}
                        {post.publishedAt && (
                            <span className="flex items-center gap-2 text-brand-muted/60 text-sm">
                                <Calendar size={14} className="text-brand-accent/50" />
                                {formatDate(post.publishedAt)}
                            </span>
                        )}
                        {post.readTime && (
                            <span className="flex items-center gap-2 text-brand-muted/60 text-sm">
                                <Clock size={14} className="text-brand-accent/50" />
                                {post.readTime}
                            </span>
                        )}
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8 leading-tight"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-lg md:text-xl text-brand-muted/80 leading-relaxed mb-10 max-w-3xl font-light"
                        >
                            {post.excerpt}
                        </motion.p>
                    )}

                    {/* Author & Share */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center justify-between flex-wrap gap-6 pt-8 border-t border-white/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 border border-white/10 flex items-center justify-center text-brand-accent font-bold text-lg">
                                {post.author?.name?.charAt(0) || 'B'}
                            </div>
                            <div>
                                <p className="text-base font-semibold text-white">{post.author?.name || 'Barmagly Team'}</p>
                                <p className="text-xs text-brand-muted/60">{blogDict.detail.publishedOn} {formatDate(post.publishedAt)}</p>
                            </div>
                        </div>

                        {/* Share Buttons */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-brand-muted/40 uppercase tracking-wider mx-2 hidden sm:block">{blogDict.detail.share}</span>
                            <button
                                onClick={handleShareTwitter}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-accent/10 border border-white/10 hover:border-brand-accent/30 flex items-center justify-center text-brand-muted hover:text-brand-accent transition-all"
                                title={blogDict.detail.shareTwitter}
                            >
                                <Twitter size={16} />
                            </button>
                            <button
                                onClick={handleShareLinkedin}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-accent/10 border border-white/10 hover:border-brand-accent/30 flex items-center justify-center text-brand-muted hover:text-brand-accent transition-all"
                                title={blogDict.detail.shareLinkedin}
                            >
                                <Linkedin size={16} />
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-accent/10 border border-white/10 hover:border-brand-accent/30 flex items-center justify-center text-brand-muted hover:text-brand-accent transition-all relative"
                                title={blogDict.detail.copyLink}
                            >
                                <Link2 size={16} />
                                {copied && (
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-brand-accent text-brand-primary text-[10px] font-bold rounded whitespace-nowrap">
                                        {blogDict.detail.copied}
                                    </span>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <article className="relative max-w-4xl mx-auto px-6 pb-20">
                {/* Main Content — Enhanced Prose Styling */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="prose prose-invert prose-lg max-w-none
                        prose-headings:font-display prose-headings:font-bold prose-headings:text-white
                        prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/10
                        prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-brand-accent/90
                        prose-p:text-brand-muted prose-p:leading-[1.85] prose-p:mb-6
                        prose-strong:text-white prose-strong:font-semibold
                        prose-a:text-brand-accent prose-a:no-underline prose-a:hover:underline prose-a:font-medium prose-a:transition-colors
                        prose-blockquote:border-l-4 prose-blockquote:border-l-brand-accent prose-blockquote:bg-brand-accent/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-8
                        prose-blockquote:text-white/80 prose-blockquote:font-medium prose-blockquote:text-lg
                        prose-li:text-brand-muted prose-li:mb-2 prose-li:leading-relaxed
                        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
                        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
                        prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-10
                        prose-table:border-collapse prose-table:my-8 prose-table:w-full
                        prose-th:bg-brand-accent/10 prose-th:text-brand-accent prose-th:font-bold prose-th:text-sm prose-th:uppercase prose-th:tracking-wider prose-th:px-4 prose-th:py-3 prose-th:border prose-th:border-white/10 prose-th:text-left
                        prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-white/10 prose-td:text-brand-muted prose-td:text-sm
                    "
                >
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </motion.div>

                {/* Tags Section */}
                {post.tags && post.tags.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-16 pt-10 border-t border-white/10"
                    >
                        <h4 className="text-sm font-mono text-brand-muted/60 uppercase tracking-widest mb-5 flex items-center gap-2">
                            <Tag size={14} className="text-brand-accent/50" />
                            {blogDict.detail.relatedTopics}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {post.tags.map((tag: any) => (
                                <span
                                    key={tag.id}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-brand-accent/10 text-sm text-brand-muted hover:text-brand-accent transition-all duration-300 border border-white/5 hover:border-brand-accent/20 cursor-default"
                                >
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-brand-dark to-brand-accent/5 border border-brand-accent/10 relative overflow-hidden"
                >
                    <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-brand-accent/5 rounded-full blur-[60px]" />
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                            {blogDict.detail.ctaTitle}
                        </h3>
                        <p className="text-brand-muted mb-8 max-w-2xl leading-relaxed">
                            {blogDict.detail.ctaDesc}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact">
                                <Button variant="primary" size="lg" className="shadow-neon-cyan">
                                    {blogDict.detail.contactTeam}
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button variant="outline" size="lg" className="border-white/10 hover:border-brand-accent/50">
                                    {blogDict.detail.viewServices}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Back to Blog */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-accent transition-colors group text-sm font-mono uppercase tracking-wider"
                    >
                        <ArrowLeft size={16} className="rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
                        {blogDict.detail.backToArticles}
                    </Link>
                </div>
            </article>
        </main>
    );
}
