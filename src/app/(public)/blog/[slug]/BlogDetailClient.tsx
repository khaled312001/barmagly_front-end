'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

interface BlogDetailClientProps {
    post: any;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
    if (!post) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-display font-bold text-brand-text mb-4">Post Not Found</h1>
                <p className="text-brand-muted mb-8">Post unavailable.</p>
                <Link href="/blog">
                    <Button variant="primary" icon={<ArrowLeft size={18} />}>
                        Back to Blog
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 dot-pattern opacity-20" />

                <div className="section-container relative">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-accent mb-8 transition-colors">
                            <ArrowLeft size={16} />
                            Back to Articles
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {post.category && (
                                <span className="px-3 py-1 text-xs font-medium bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20">
                                    {post.category.name}
                                </span>
                            )}
                            <span className="flex items-center gap-1 text-brand-muted text-sm">
                                <Calendar size={14} />
                                {formatDate(post.publishedAt)}
                            </span>
                            {post.readTime && (
                                <span className="flex items-center gap-1 text-brand-muted text-sm">
                                    <Clock size={14} />
                                    {post.readTime}
                                </span>
                            )}
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-text mb-8 leading-tight"
                        >
                            {post.title}
                        </motion.h1>

                        {/* Author */}
                        <div className="flex items-center gap-4 pt-6 border-t border-brand-glass-border">
                            <div className="w-10 h-10 rounded-full bg-brand-surface border border-brand-glass-border flex items-center justify-center text-brand-muted font-bold">
                                {post.author?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-brand-text">{post.author?.name || 'Admin'}</p>
                                <p className="text-xs text-brand-muted">{post.author?.role || 'Author'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 bg-brand-surface/20">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto">
                        <article className="prose prose-invert prose-lg max-w-none">
                            {/* Render content - safely? For now just text, or dangerouslySetInnerHTML if trusted */}
                            {/* The seed data has plain text "Full blog post content...". 
                                In a real app we'd use a markdown renderer. 
                                For now, simple spacing. */}
                            <div className="whitespace-pre-wrap text-brand-muted leading-loose" dangerouslySetInnerHTML={{ __html: post.content }}>
                            </div>
                        </article>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-brand-glass-border">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag: any) => (
                                        <span key={tag.id} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-brand-surface text-sm text-brand-muted">
                                            <Tag size={14} />
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-12">
                            <Button variant="outline" className="w-full sm:w-auto" icon={<Share2 size={18} />}>
                                Share Article
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
