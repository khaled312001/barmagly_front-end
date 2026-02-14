'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Snappier spring for the ring to reduce latency
    const springConfig = { damping: 20, stiffness: 500, mass: 0.1 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button';

            setIsHovering(!!isClickable);
        };

        const handleMouseLeaveWindow = () => setIsVisible(false);
        const handleMouseEnterWindow = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeaveWindow);
        document.addEventListener('mouseenter', handleMouseEnterWindow);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeaveWindow);
            document.removeEventListener('mouseenter', handleMouseEnterWindow);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-brand-accent rounded-full z-50 pointer-events-none"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    willChange: 'transform',
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 800, mass: 0.05 }}
            />

            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-brand-accent/30 rounded-full z-40 pointer-events-none flex items-center justify-center"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    willChange: 'transform',
                }}
                animate={{
                    width: isHovering ? 50 : 32,
                    height: isHovering ? 50 : 32,
                    borderColor: isHovering ? 'rgba(0, 212, 255, 0.6)' : 'rgba(0, 212, 255, 0.3)',
                    backgroundColor: isHovering ? 'rgba(0, 212, 255, 0.05)' : 'transparent',
                }}
            />

            {/* Subtle Glow Trail */}
            <motion.div
                className="fixed top-0 left-0 w-20 h-20 bg-brand-accent/5 rounded-full blur-xl z-30 pointer-events-none"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    willChange: 'transform',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
            />
        </div>
    );
}
