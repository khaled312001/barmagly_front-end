'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

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
        <main className="min-h-screen bg-brand-primary pt-32 pb-20">
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[100px] rounded-full" />
            </div>

            <article className="relative max-w-4xl mx-auto px-6">

                {/* Navigation */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-accent mb-12 transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm uppercase tracking-wider">Back to Articles</span>
                </Link>

                {/* Header Typography */}
                <header className="mb-16 border-b border-white/10 pb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        {post.category && (
                            <span className="px-3 py-1 text-xs font-bold font-mono tracking-wider bg-brand-accent/10 text-brand-accent rounded border border-brand-accent/20 uppercase">
                                {post.category.name}
                            </span>
                        )}
                        <span className="flex items-center gap-2 text-brand-muted text-sm font-mono">
                            <Calendar size={14} />
                            {formatDate(post.publishedAt)}
                        </span>
                        {post.readTime && (
                            <span className="flex items-center gap-2 text-brand-muted text-sm font-mono">
                                <Clock size={14} />
                                {post.readTime}
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-10 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-surface border border-white/10 flex items-center justify-center text-brand-accent font-bold text-xl">
                            {post.author?.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                            <p className="text-base font-bold text-white">{post.author?.name || 'Admin'}</p>
                            <p className="text-xs text-brand-muted uppercase tracking-wider">{post.author?.role || 'Author'}</p>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="prose prose-invert prose-lg max-w-none 
                    prose-headings:font-display prose-headings:font-bold prose-headings:text-white
                    prose-p:text-brand-muted prose-p:leading-loose prose-p:font-light
                    prose-strong:text-white prose-strong:font-semibold
                    prose-blockquote:border-l-brand-accent prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                    prose-li:text-brand-muted prose-ul:list-disc prose-ul:pl-6
                    ">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Footer / Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-white/10">
                        <h4 className="text-sm font-mono text-brand-muted uppercase mb-4">Related Topics</h4>
                        <div className="flex flex-wrap gap-3">
                            {post.tags.map((tag: any) => (
                                <span key={tag.id} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm text-brand-muted transition-colors border border-white/5">
                                    <Tag size={14} />
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </main>
    );
}
