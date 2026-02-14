import { Variants, Transition } from 'framer-motion';

// ============ TRANSITION PRESETS ============

export const springTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
};

export const smoothTransition: Transition = {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94],
};

export const fastTransition: Transition = {
    duration: 0.3,
    ease: 'easeOut',
};

// ============ VARIANT PRESETS ============

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothTransition,
    },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothTransition,
    },
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: smoothTransition,
    },
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: smoothTransition,
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: smoothTransition,
    },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothTransition,
    },
};

export const slideInFromBottom: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

export const heroTextReveal: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

export const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -8,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
};

export const glowPulse: Variants = {
    initial: {
        boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
    },
    animate: {
        boxShadow: [
            '0 0 20px rgba(0, 212, 255, 0.2)',
            '0 0 40px rgba(0, 212, 255, 0.4)',
            '0 0 20px rgba(0, 212, 255, 0.2)',
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// ============ PAGE TRANSITION ============

export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
        },
    },
};

// ============ NAVBAR ============

export const navbarVariants: Variants = {
    top: {
        backgroundColor: 'rgba(6, 13, 27, 0.4)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.05)',
    },
    scrolled: {
        backgroundColor: 'rgba(6, 13, 27, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
    },
};
