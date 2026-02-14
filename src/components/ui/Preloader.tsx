'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Preloader() {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-dark overflow-hidden">
            {/* Background Tech Effects */}
            <div className="absolute inset-0 tech-grid opacity-20" />

            {/* Animated Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[100px]"
            />

            <div className="relative flex flex-col items-center">
                {/* Logo Animation */}
                <div className="relative w-24 h-24 mb-8">
                    {/* Rotating Rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-brand-accent/20 border-t-brand-accent rounded-2xl shadow-neon-cyan"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 border border-brand-secondary/20 border-b-brand-secondary rounded-3xl opacity-50"
                    />

                    {/* Brand Initial */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-display font-bold text-white drop-shadow-neon-cyan">B</span>
                    </div>
                </div>

                {/* Progress Text */}
                <div className="flex flex-col items-center gap-2">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "200px" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent rounded-full"
                    />
                    <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase"
                    >
                        Initializing Systems
                    </motion.span>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-brand-accent/20 rounded-tl-3xl" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-brand-secondary/20 rounded-br-3xl" />
        </div>
    );
}
