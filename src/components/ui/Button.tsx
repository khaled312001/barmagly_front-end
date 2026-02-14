'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'neon' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
    isLoading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    fullWidth = false,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const target = e.currentTarget;
        const { left, top, width, height } = target.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        const strength = 0.2;
        setPosition({ x: distanceX * strength, y: distanceY * strength });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const variants = {
        primary: 'bg-brand-accent text-brand-primary font-bold hover:bg-white shadow-neon-cyan border-b-2 border-white/20',
        secondary: 'bg-brand-secondary text-white font-bold hover:bg-brand-accent shadow-neon-purple transition-all',
        outline: 'bg-transparent text-brand-text border-2 border-brand-accent/50 hover:border-brand-accent hover:bg-brand-accent/10',
        ghost: 'bg-transparent text-brand-muted hover:text-brand-text hover:bg-white/5',
        neon: 'bg-brand-accent text-brand-primary shadow-neon-cyan animate-pulse font-bold',
        danger: 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white',
    };

    const sizes = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
        xl: 'px-10 py-5 text-lg',
        icon: 'p-2',
    };

    return (
        <motion.button
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', damping: 20, stiffness: 150, mass: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'relative inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
                fullWidth ? 'w-full' : '',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}
            {icon && !isLoading && <span className="shrink-0">{icon}</span>}
            <span className="font-semibold">{children}</span>
        </motion.button>
    );
}
