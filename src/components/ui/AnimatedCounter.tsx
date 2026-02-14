'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon?: React.ReactNode;
}

export function AnimatedCounter({
    end,
    duration = 2,
    suffix = '',
    prefix = '',
    label,
    icon,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const hasAnimated = useRef(false);

    const animate = useCallback(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = Date.now();
        const durationMs = duration * 1000;

        const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / durationMs, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(tick);
    }, [end, duration]);

    useEffect(() => {
        if (isInView) {
            animate();
        }
    }, [isInView, animate]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center text-center"
        >
            {icon && (
                <div className="mb-3 text-brand-accent">{icon}</div>
            )}
            <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                {prefix}
                {count.toLocaleString()}
                {suffix}
            </div>
            <div className="text-brand-muted text-sm font-medium uppercase tracking-wider">
                {label}
            </div>
        </motion.div>
    );
}
