import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    // === BARMAGLY REDESIGN COLORS ===
                    primary: '#030712',         // Almost black (Main BG)
                    accent: '#00D4FF',          // Neon Cyan
                    secondary: '#7B2FF7',       // Neon Purple
                    dark: '#02040a',            // Darkest depth
                    surface: '#0B1120',         // Panel BG (Deep Navy)
                    text: '#F8FAFC',            // White-ish text
                    muted: '#94A3B8',           // Slate-400 for muted text

                    // Specific UI states
                    'accent-hover': '#00B8E0',
                    'secondary-hover': '#6A1FE0',

                    // Glass & Glow
                    glass: 'rgba(3, 7, 18, 0.6)',
                    'glass-border': 'rgba(0, 212, 255, 0.15)',
                    'glass-border-hover': 'rgba(0, 212, 255, 0.3)',
                    glow: 'rgba(0, 212, 255, 0.15)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                'neon-cyan': '0 0 5px rgba(0, 212, 255, 0.2), 0 0 20px rgba(0, 212, 255, 0.1)',
                'neon-purple': '0 0 5px rgba(123, 47, 247, 0.2), 0 0 20px rgba(123, 47, 247, 0.1)',
                'glow-card': '0 0 40px -10px rgba(0, 212, 255, 0.1)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'fade-up': 'fadeUp 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'width-expand': 'widthExpand 1s ease-out forwards',
                'marquee': 'marquee 40s linear infinite',
                'marquee-reverse': 'marqueeReverse 40s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                marqueeReverse: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.6', filter: 'brightness(1)' },
                    '50%': { opacity: '1', filter: 'brightness(1.2)' },
                },
                widthExpand: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                },
            },
            backgroundImage: {
                'hero-gradient': 'radial-gradient(circle at top center, #0F172A 0%, #02040A 100%)',
                'accent-gradient': 'linear-gradient(135deg, #00D4FF 0%, #7B2FF7 100%)',
                'card-gradient': 'linear-gradient(180deg, rgba(11,17,32,0.8) 0%, rgba(2,4,10,0.9) 100%)',
            },
        },
    },
    plugins: [],
};

export default config;
