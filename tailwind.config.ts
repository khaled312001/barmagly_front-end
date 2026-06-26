import type { Config } from 'tailwindcss';

/**
 * Barmagly — Identity built from the logo.
 *   Navy        #0A2A5C   (the "B" mark + "Barmagly" / "برمجلي" wordmark)
 *   Bright blue #1A6FD9   (the {} brackets + "barmagly.tech" URL)
 * Both colors come literally from the logo file. Background is white,
 * matching the logo canvas.
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
                    // ─── Page surfaces ─────────────────────────────────
                    primary: '#FFFFFF',          // Page BG — same as logo canvas
                    surface: '#F6F8FC',          // Subtle blue-tinted section
                    elevated: '#FFFFFF',
                    sunken: '#ECF1F8',           // Recessed slab BG
                    bg: '#FFFFFF',

                    // ─── Dark surfaces (the navy from the logo) ──────
                    ink: '#0A2A5C',              // Nav top bar, Footer — exact logo navy
                    'ink-soft': '#143A75',       // Lifted ink (cards on ink)
                    'ink-strong': '#051A3E',
                    'on-ink': '#FFFFFF',
                    'on-ink-soft': 'rgba(255, 255, 255, 0.72)',

                    // ─── Text — navy gradient ─────────────────────────
                    text: '#0A2A5C',             // Primary text (matches logo wordmark)
                    'text-soft': '#3D4E72',      // Secondary text
                    muted: '#7B89A3',            // Muted labels
                    subtle: '#A8B3C7',           // Placeholder / fine print

                    // ─── Borders ─────────────────────────────────────
                    border: '#DEE5EF',           // Default hairline
                    'border-strong': '#C5CFDD',
                    'border-ink': '#1F4185',     // Border on navy surfaces

                    // ─── Accent (the bright blue from the brackets) ──
                    accent: '#1A6FD9',           // Primary CTAs + links
                    'accent-hover': '#1356B0',
                    'accent-soft': '#E8F1FD',    // Badge BG / icon tint
                    'accent-ink': '#7FB4F0',     // Accent on ink BG

                    // ─── Secondary (navy as accent on light) ─────────
                    secondary: '#0A2A5C',
                    'secondary-hover': '#051A3E',
                    'secondary-soft': '#E8EDF6',

                    // ─── Status ──────────────────────────────────────
                    success: '#0EA371',
                    warning: '#D97706',
                    danger: '#DC2626',

                    // ─── Legacy aliases ──────────────────────────────
                    dark: '#0A2A5C',
                    glass: 'rgba(255, 255, 255, 0.82)',
                    'glass-border': 'rgba(10, 42, 92, 0.08)',
                    'glass-border-hover': 'rgba(26, 111, 217, 0.35)',
                    glow: 'rgba(26, 111, 217, 0.12)',
                },
            },
            fontFamily: {
                // ONE professional bilingual family: Inter (Latin) + IBM Plex Sans Arabic.
                // Both designed by the same school of geometric humanist sans —
                // they share x-height proportions so EN/AR feel cohesive.
                sans:    ['Inter', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
                body:    ['Inter', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
                display: ['Inter', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
                arabic:  ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
                mono:    ['"JetBrains Mono"', 'monospace'],
            },
            boxShadow: {
                soft:        '0 1px 0 rgba(10, 42, 92, 0.04)',
                card:        '0 1px 0 rgba(10, 42, 92, 0.04), 0 2px 8px rgba(10, 42, 92, 0.05)',
                'card-lg':   '0 2px 0 rgba(10, 42, 92, 0.04), 0 12px 28px -8px rgba(10, 42, 92, 0.10)',
                'card-hover':'0 4px 0 rgba(10, 42, 92, 0.04), 0 18px 36px -10px rgba(10, 42, 92, 0.14)',
                'inner-soft':'inset 0 1px 0 rgba(10, 42, 92, 0.04)',
                'neon-cyan':  '0 6px 18px -3px rgba(26, 111, 217, 0.28)',
                'neon-purple':'0 6px 18px -3px rgba(10, 42, 92, 0.20)',
                'glow-card':  '0 12px 36px -10px rgba(26, 111, 217, 0.25)',
            },
            animation: {
                'fade-in': 'fadeIn 0.35s ease-out forwards',
                'fade-up': 'fadeUp 0.45s ease-out forwards',
                'scale-in': 'scaleIn 0.35s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
                'width-expand': 'widthExpand 0.8s ease-out forwards',
                'marquee': 'marquee 40s linear infinite',
                'marquee-reverse': 'marqueeReverse 40s linear infinite',
            },
            keyframes: {
                // Marquee shifts by exactly 50% — assumes content is duplicated
                // once (`[...arr, ...arr]`) so the loop is seamless.
                marquee:        { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
                marqueeReverse: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0%)' } },
                fadeIn:         { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                fadeUp:         { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                scaleIn:        { '0%': { opacity: '0', transform: 'scale(0.98)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
                float:          { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
                pulseGlow:      { '0%, 100%': { opacity: '0.85' }, '50%': { opacity: '1' } },
                widthExpand:    { '0%': { width: '0%' }, '100%': { width: '100%' } },
            },
            backgroundImage: {
                'hero-gradient': 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(26, 111, 217, 0.06) 0%, transparent 65%)',
                'hero-gradient-ink': 'linear-gradient(180deg, #0A2A5C 0%, #051A3E 100%)',
                'accent-gradient': 'linear-gradient(135deg, #1A6FD9 0%, #0A2A5C 100%)',
                'card-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F6F8FC 100%)',
                'dotted-pattern': 'radial-gradient(circle, rgba(10, 42, 92, 0.07) 1px, transparent 1px)',
            },
            backgroundSize: { 'dotted-grid': '24px 24px' },
            maxWidth: { 'content': '1180px' },
            letterSpacing: { 'eyebrow': '0.18em' },
            lineHeight: { 'editorial': '1.7', 'arabic': '1.85' },
        },
    },
    plugins: [],
};

export default config;
