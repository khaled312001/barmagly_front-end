'use client';

import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    // Note: A full Lenis-like smooth scroll usually requires a specialized library 
    // but we can achieve a premium "fluid" feel using modern CSS and Framer Motion.

    useEffect(() => {
        // Enable smooth scrolling natively as a fallback
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <div className="relative">
            {children}
        </div>
    );
}

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-[110] origin-left shadow-neon-cyan"
            style={{ scaleX }}
        />
    );
}
