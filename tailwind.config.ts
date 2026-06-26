import type { Config } from 'tailwindcss';

/**
 * Barmagly Professional Identity
 * Inspired by Stripe / Linear / modern Swiss design.
 * Deep navy headers + white content + one confident blue accent.
 */
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
                    // ─── Page surfaces ───────────────────────────────
                    primary: '#FFFFFF',        // Main page BG
                    surface: '#F7F9FC',        // Section / tinted area
                    elevated: '#FFFFFF',       // Card on tinted section
                    sunken: '#F1F4F8',         // Inputs, subtle wells

                    // Strong dark surfaces (for nav, footer, dark cards)
                    ink: '#0A1628',            // Rich near-black navy — primary dark surface
                    'ink-soft': '#15233B',     // Slightly lifted ink (cards on ink BG)
                    'ink-strong': '#050B17',   // Deepest depth (footers)

                    // ─── Text ────────────────────────────────────────
                    text: '#0A1628',           // Primary text on light BG
                    'text-soft': '#3D4759',    // Secondary text (slate-700-ish)
                    muted: '#6B7588',          // Muted text (slate-500-ish)
                    subtle: '#9AA3B5',         // Placeholders / fine print
                    'on-ink': '#FFFFFF',       // Text on dark navy surfaces
                    'on-ink-soft': '#B7C0D2',  // Muted text on dark surfaces

                    // ─── Borders ─────────────────────────────────────
                    border: '#E4E8EF',         // Default border
                    'border-strong': '#CCD3DF',
                    'border-ink': '#1F2D45',   // Border on dark surfaces

                    // ─── Accent: confident blue, not neon ────────────
                    accent: '#2563EB',         // Blue-600 — primary CTA
                    'accent-hover': '#1D4ED8', // Blue-700
                    'accent-soft': '#EFF6FF',  // Blue-50 — badge BG
                    'accent-ink': '#DBEAFE',   // For badges on dark BG

                    // ─── Secondary accent: emerald for Swiss precision ──
                    secondary: '#059669',         // Emerald-600
                    'secondary-hover': '#047857',
                    'secondary-soft': '#ECFDF5',

                    // ─── Status colors ───────────────────────────────
                    success: '#10B981',
                    warning: '#F59E0B',
                    danger: '#DC2626',

                    // ─── Legacy alias map (so existing code still compiles) ──
                    dark: '#0A1628',
                    glass: 'rgba(255, 255, 255, 0.85)',
                    'glass-border': 'rgba(10, 22, 40, 0.08)',
                    'glass-border-hover': 'rgba(37, 99, 235, 0.35)',
                    glow: 'rgba(37, 99, 235, 0.12)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Cairo', 'system-ui', 'sans-serif'],
                display: ['"Plus Jakarta Sans"', 'Cairo', 'system-ui', 'sans-serif'],
                arabic: ['Cairo', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            boxShadow: {
                // Soft, layered shadows — Apple/Stripe style
                soft: '0 1px 2px rgba(10, 22, 40, 0.04)',
                card: '0 1px 2px rgba(10, 22, 40, 0.04), 0 4px 12px -2px rgba(10, 22, 40, 0.06)',
                'card-lg': '0 2px 4px rgba(10, 22, 40, 0.04), 0 12px 32px -8px rgba(10, 22, 40, 0.10)',
                'card-hover': '0 4px 8px rgba(10, 22, 40, 0.06), 0 20px 40px -10px rgba(10, 22, 40, 0.14)',
                'inner-soft': 'inset 0 1px 2px rgba(10, 22, 40, 0.04)',
                'neon-cyan': '0 6px 18px -3px rgba(37, 99, 235, 0.30)',
                'neon-purple': '0 6px 18px -3px rgba(5, 150, 105, 0.25)',
                'glow-card': '0 12px 36px -12px rgba(37, 99, 235, 0.25)',
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
                marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-100%)' } },
                marqueeReverse: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0%)' } },
                fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                scaleIn: { '0%': { opacity: '0', transform: 'scale(0.97)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
                float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
                pulseGlow: { '0%, 100%': { opacity: '0.7' }, '50%': { opacity: '1' } },
                widthExpand: { '0%': { width: '0%' }, '100%': { width: '100%' } },
            },
            backgroundImage: {
                // A subtle radial accent at top — gives the hero quiet depth, no noise.
                'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 0%, #EBF2FF 0%, #FFFFFF 65%)',
                'hero-gradient-ink': 'linear-gradient(180deg, #0A1628 0%, #0F1D33 100%)',
                'accent-gradient': 'linear-gradient(135deg, #2563EB 0%, #059669 100%)',
                'card-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)',
                'dotted-pattern': 'radial-gradient(circle, rgba(10, 22, 40, 0.06) 1px, transparent 1px)',
            },
            backgroundSize: {
                'dotted-grid': '24px 24px',
            },
        },
    },
    plugins: [],
};

export default config;
