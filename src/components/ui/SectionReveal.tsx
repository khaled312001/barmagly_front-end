'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn } from '@/lib/animations';

interface SectionRevealProps {
    children: React.ReactNode;
    direction?: 'up' | 'left' | 'right' | 'scale';
    delay?: number;
    className?: string;
}

const directionVariants = {
    up: fadeInUp,
    left: fadeInLeft,
    right: fadeInRight,
    scale: scaleIn,
};

export function SectionReveal({
    children,
    direction = 'up',
    delay = 0,
    className,
}: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            variants={directionVariants[direction]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface SectionHeadingProps {
    badge?: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
}

export function SectionHeading({
    badge,
    title,
    description,
    align = 'center',
}: SectionHeadingProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
        >
            {badge && (
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-accent/10 text-brand-accent border border-brand-accent/20 mb-4">
                    {badge}
                </span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-text mb-4 text-balance">
                {title}
            </h2>
            {description && (
                <p className={`text-brand-muted text-lg max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
                    {description}
                </p>
            )}
        </motion.div>
    );
}
