'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    gradient?: boolean;
}

export function Card({
    children,
    className,
    hover = true,
    glow = false,
    gradient = false,
}: CardProps) {
    return (
        <motion.div
            variants={hover ? cardHover : undefined}
            initial="rest"
            whileHover={hover ? 'hover' : undefined}
            className={cn(
                'glass-card p-6 relative overflow-hidden group',
                glow && 'hover:shadow-neon-cyan',
                gradient && 'border-gradient',
                className
            )}
        >
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    color?: 'cyan' | 'purple';
}

export function ServiceCard({
    icon,
    title,
    description,
    href,
    onClick,
    className,
    color = 'cyan'
}: ServiceCardProps) {
    const content = (
        <div onClick={onClick} className="flex flex-col items-start gap-6 h-full">
            {/* Icon Container */}
            <div className={cn(
                'p-4 rounded-2xl bg-brand-surface border border-white/10 group-hover:scale-110 transition-all duration-500 relative',
                color === 'cyan' ? 'shadow-neon-cyan text-brand-accent' : 'shadow-neon-purple text-brand-secondary'
            )}>
                <div className="relative z-10">{icon}</div>
                <div className="absolute inset-0 rounded-2xl bg-current opacity-10 blur-xl group-hover:opacity-20 transition-opacity" />
            </div>

            <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-display font-black text-white group-hover:text-brand-accent transition-colors duration-500 tracking-tight leading-tight">
                    {title}
                </h3>
                <p className="text-brand-muted leading-relaxed text-base opacity-80 group-hover:opacity-100 transition-opacity">
                    {description}
                </p>
            </div>

            <div className="flex items-center gap-3 mt-auto pt-6 group/btn w-full">
                <span className="text-brand-accent font-mono font-bold text-xs uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    Explore Details
                </span>
                <div className={cn(
                    "w-10 h-10 rounded-xl bg-brand-accent/5 border border-brand-accent/10 flex items-center justify-center transition-all duration-500 ml-auto",
                    "group-hover:bg-brand-accent group-hover:text-brand-primary group-hover:shadow-neon-cyan group-hover:scale-110"
                )}>
                    <ArrowRight size={18} />
                </div>
            </div>
        </div>
    );

    return (
        <Card
            hover
            glow
            className={cn(
                'cursor-pointer border-white/5 bg-brand-glass h-full p-8 md:p-10',
                'hover:bg-white/[0.02]',
                className
            )}
        >
            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity" />

            {href ? (
                <Link href={href} className="block h-full">
                    {content}
                </Link>
            ) : content}
        </Card>
    );
}
